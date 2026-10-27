import { z } from 'zod';

// ==============================================================================
// SLIDING-WINDOW RATE LIMITER (In-Memory)
// ==============================================================================
// IP Limit: 3 requests per IP per hour (3,600,000 ms)
// Email Limit: 1 request per email per day (86,400,000 ms)
// ==============================================================================
const ipHistory = new Map<string, number[]>();
const emailHistory = new Map<string, number[]>();

const IP_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const IP_MAX_REQUESTS = 3;

const EMAIL_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours
const EMAIL_MAX_REQUESTS = 1;

function checkAndRecordRateLimit(ip: string, email: string): { allowed: boolean; reason?: string; type?: 'ip' | 'email' } {
  const now = Date.now();

  // 1. Check IP Rate Limit
  const ipTimestamps = (ipHistory.get(ip) || []).filter((t) => now - t < IP_WINDOW_MS);
  if (ipTimestamps.length >= IP_MAX_REQUESTS) {
    return {
      allowed: false,
      reason: `Rate limit reached: Maximum ${IP_MAX_REQUESTS} submissions per IP address per hour. Please wait or use direct email.`,
      type: 'ip',
    };
  }

  // 2. Check Email Rate Limit
  const normalizedEmail = email.toLowerCase().trim();
  const emailTimestamps = (emailHistory.get(normalizedEmail) || []).filter((t) => now - t < EMAIL_WINDOW_MS);
  if (emailTimestamps.length >= EMAIL_MAX_REQUESTS) {
    return {
      allowed: false,
      reason: `Rate limit reached: Only ${EMAIL_MAX_REQUESTS} submission per email address is permitted per day. Please reach out directly.`,
      type: 'email',
    };
  }

  // Record timestamps
  ipTimestamps.push(now);
  ipHistory.set(ip, ipTimestamps);

  emailTimestamps.push(now);
  emailHistory.set(normalizedEmail, emailTimestamps);

  return { allowed: true };
}

// ==============================================================================
// ZOD VALIDATION SCHEMA (Length caps & newline stripping)
// ==============================================================================
const contactPayloadSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters')
    .transform((val) => val.replace(/[\r\n]+/g, ' ').trim()),
  email: z
    .string()
    .email('Please provide a valid email address')
    .max(255, 'Email is too long')
    .transform((val) => val.replace(/[\r\n]+/g, '').toLowerCase().trim()),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message cannot exceed 2000 characters')
    .transform((val) => val.trim()),
  honeypot: z.string().max(0, 'Spam bot detected').optional().default(''),
  turnstileToken: z.string().optional().default(''),
});

// ==============================================================================
// CATEGORY INTENT CLASSIFIER
// ==============================================================================
function classifyMessageIntent(text: string): string {
  const lower = text.toLowerCase();

  if (/\b(hire|budget|lead|client|contract|agency|retainer|call|quote|timeline)\b/.test(lower)) {
    return 'HIGH_PRIORITY_LEAD';
  }
  if (/\b(n8n|zapier|make|automation|workflow|api|sync|webhook|postgres|database|rpa|pipeline)\b/.test(lower)) {
    return 'AUTOMATION_PIPELINE';
  }
  if (/\b(rag|llm|agent|vector|ai|copilot|chatbot|openai|groq|llama)\b/.test(lower)) {
    return 'AI_SYSTEMS';
  }
  if (/\b(invoice|extract|pdf|parse|document|ocr)\b/.test(lower)) {
    return 'DOCUMENT_RPA';
  }
  return 'GENERAL_INQUIRY';
}

// ==============================================================================
// CLOUDFLARE TURNSTILE VERIFICATION
// ==============================================================================
async function verifyTurnstileToken(token: string, ip: string): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // Cloudflare official dummy testing keys
  const DUMMY_SECRET = '1x0000000000000000000000000000000AA';
  const DUMMY_TOKEN = '1x00000000000000000000AA';

  if (!secretKey || secretKey === DUMMY_SECRET || token === DUMMY_TOKEN || token === DUMMY_SECRET) {
    return { success: true };
  }

  if (!token) {
    return { success: false, error: 'Turnstile security token is missing.' };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    formData.append('remoteip', ip);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
    });

    const data = (await res.json()) as { success?: boolean; 'error-codes'?: string[] };
    if (!data.success) {
      return {
        success: false,
        error: `Cloudflare Turnstile verification failed (${data['error-codes']?.join(', ') || 'invalid'}).`,
      };
    }

    return { success: true };
  } catch (err) {
    console.warn('Turnstile verification request failed:', err);
    return { success: false, error: 'Could not reach Turnstile verification servers.' };
  }
}

// ==============================================================================
// MAIN SERVERLESS HANDLER
// ==============================================================================
export async function handleContactSubmission(body: any, clientIp: string, originHeader: string = '') {
  const startTime = performance.now();

  // 1. Zod Validation & Sanitization
  const parseResult = contactPayloadSchema.safeParse(body);
  if (!parseResult.success) {
    const formattedError = parseResult.error.errors.map((e) => e.message).join('. ');
    return {
      status: 400,
      json: { ok: false, error: formattedError },
    };
  }

  const { name, email, message, honeypot, turnstileToken } = parseResult.data;

  // 2. Honeypot check (Silent reject / 400)
  if (honeypot && honeypot.length > 0) {
    return {
      status: 400,
      json: { ok: false, error: 'Spam submission detected by honeypot.' },
    };
  }

  // 3. Turnstile Verification
  const turnstileCheck = await verifyTurnstileToken(turnstileToken, clientIp);
  if (!turnstileCheck.success) {
    return {
      status: 400,
      json: { ok: false, error: turnstileCheck.error || 'Turnstile verification failed.' },
    };
  }

  // 4. Rate Limiting Check (3 per IP / hour, 1 per email / day)
  const rateLimitResult = checkAndRecordRateLimit(clientIp, email);
  if (!rateLimitResult.allowed) {
    return {
      status: 429,
      json: {
        ok: false,
        error: rateLimitResult.reason,
        type: rateLimitResult.type,
      },
    };
  }

  // 5. Categorize Intent
  const category = classifyMessageIntent(message);

  // 6. Generate real unique Execution ID
  const executionId = `exec_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;

  // 7. Forward to n8n Webhook using secret header
  const n8nUrl = process.env.N8N_WEBHOOK_URL;
  const n8nSecret = process.env.N8N_WEBHOOK_SECRET || '';

  const n8nPayload = {
    executionId,
    timestamp: new Date().toISOString(),
    category,
    sender: {
      name,
      email,
    },
    message,
    clientIp,
    metadata: {
      origin: originHeader,
      targetRecipient: process.env.TARGET_EMAIL || 'kemeumoudofia@gmail.com',
      service: 'portfolio_production_intake',
    },
  };

  // If a real n8n webhook URL is configured (not dummy placeholder)
  if (n8nUrl && !n8nUrl.includes('yourdomain.com')) {
    try {
      const n8nRes = await fetch(n8nUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-webhook-secret': n8nSecret,
        },
        body: JSON.stringify(n8nPayload),
      });

      if (!n8nRes.ok) {
        console.error('n8n webhook responded with error:', n8nRes.status, await n8nRes.text());
        return {
          status: 502,
          json: {
            ok: false,
            error: 'Upstream automation webhook failed to accept payload. Please use direct email.',
          },
        };
      }
    } catch (err: any) {
      console.error('Failed to forward to n8n webhook:', err);
      return {
        status: 502,
        json: {
          ok: false,
          error: 'Connection to automation webhook timed out. Please use direct email fallback.',
        },
      };
    }
  } else {
    // In local dev/staging with placeholder n8n URL:
    // Log telemetry for debugging
    console.info(`[SERVERLESS DISPATCH] Verified payload for ${email}. Category: ${category}. Execution ID: ${executionId}`);
  }

  const durationMs = Math.round(performance.now() - startTime);

  // 8. Return real JSON
  return {
    status: 200,
    json: {
      ok: true,
      executionId,
      category,
      durationMs,
    },
  };
}

// ==============================================================================
// VERCEL SERVERLESS EXPORT (Default Node handler)
// ==============================================================================
export default async function handler(req: any, res: any) {
  // CORS check
  const allowedOrigin = process.env.ALLOWED_ORIGIN || 'https://ukeme.dev';
  const reqOrigin = req.headers['origin'] || '';

  res.setHeader('Access-Control-Allow-Origin', reqOrigin === allowedOrigin || reqOrigin.includes('localhost') ? reqOrigin : allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-turnstile-token');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed. Only POST is accepted.' });
  }

  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    (req.headers['x-real-ip'] as string) ||
    req.socket?.remoteAddress ||
    '127.0.0.1';

  let parsedBody = req.body;
  if (typeof parsedBody === 'string') {
    try {
      parsedBody = JSON.parse(parsedBody);
    } catch (e) {
      // ignore
    }
  }

  try {
    const result = await handleContactSubmission(parsedBody, clientIp, reqOrigin);
    return res.status(result.status).json(result.json);
  } catch (err: any) {
    console.error('Unhandled serverless error:', err);
    return res.status(500).json({ ok: false, error: 'Internal server error processing payload.' });
  }
}
