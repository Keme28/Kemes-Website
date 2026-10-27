import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { TurnstileWidget } from './TurnstileWidget';

interface DemoFormData {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}

interface ExecutionResult {
  executionId: string;
  category: string;
  durationMs: number;
}

const PRESET_TEMPLATES = [
  {
    id: 'lead',
    label: 'Agency Lead Intake',
    name: 'Alex Vance',
    email: 'alex@vancestudio.co',
    message: 'Hi Ukeme! We need an automated lead triage and CRM pipeline for our 20-person agency. Can we set up an introductory call?',
  },
  {
    id: 'invoice',
    label: 'Invoice Parsing Scope',
    name: 'Marcus Chen',
    email: 'marcus@chencapital.io',
    message: 'We have 400 PDF vendor invoices arriving monthly. Can you build an automated n8n pipeline to parse and commit to Postgres?',
  },
  {
    id: 'custom',
    label: 'Custom Payload // Your Inquiry',
    name: '',
    email: '',
    message: '',
  },
];

export const SimpleAutomationSection: React.FC = () => {
  const [activeTemplate, setActiveTemplate] = useState<string>('lead');
  const [submissionState, setSubmissionState] = useState<'idle' | 'transmitting' | 'success' | 'error'>('idle');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false);
  const [turnstileToken, setTurnstileToken] = useState<string>('1x00000000000000000000AA');
  const [submittedData, setSubmittedData] = useState<DemoFormData | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<DemoFormData>({
    defaultValues: {
      name: PRESET_TEMPLATES[0].name,
      email: PRESET_TEMPLATES[0].email,
      message: PRESET_TEMPLATES[0].message,
      honeypot: '',
    },
  });

  const currentMessage = watch('message');

  const handleSelectTemplate = (template: typeof PRESET_TEMPLATES[0]) => {
    setActiveTemplate(template.id);
    setValue('name', template.name, { shouldValidate: true });
    setValue('email', template.email, { shouldValidate: true });
    setValue('message', template.message, { shouldValidate: true });
    if (submissionState !== 'idle') {
      setSubmissionState('idle');
      setExecutionResult(null);
      setErrorMessage(null);
      setIsRateLimited(false);
    }
  };

  const onSubmit = async (data: DemoFormData) => {
    // 1. Client honeypot check
    if (data.honeypot && data.honeypot.length > 0) {
      return;
    }

    setSubmittedData(data);
    setSubmissionState('transmitting');
    setErrorMessage(null);
    setIsRateLimited(false);
    setActiveStep(1); // Node 1: Ingestion & Honeypot

    // Step 1 -> Step 2 animation transition
    const stepTimer = setTimeout(() => {
      setActiveStep(2); // Node 2: Serverless Verification & Rate Limiting
    }, 280);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          honeypot: data.honeypot,
          turnstileToken,
        }),
      });

      clearTimeout(stepTimer);
      setActiveStep(3); // Node 3: n8n Multi-Channel Dispatch

      const resJson = await res.json().catch(() => ({}));

      if (res.ok && resJson.ok) {
        // Real JSON received: { executionId, category, durationMs }
        setExecutionResult({
          executionId: resJson.executionId || `exec_${Date.now().toString(36)}`,
          category: resJson.category || 'AUTOMATION_PIPELINE',
          durationMs: resJson.durationMs || 210,
        });
        setTimeout(() => {
          setSubmissionState('success');
        }, 320);
      } else {
        // Do not fake success! Show real error state
        const errText = resJson.error || 'Server rejected intake payload.';
        setErrorMessage(errText);
        setIsRateLimited(res.status === 429);
        setTimeout(() => {
          setSubmissionState('error');
        }, 300);
      }
    } catch (err: any) {
      clearTimeout(stepTimer);
      console.error('Pipeline intake failed:', err);
      setErrorMessage(err?.message || 'Network error reaching serverless endpoint.');
      setSubmissionState('error');
    }
  };

  const handleReset = () => {
    setSubmissionState('idle');
    setExecutionResult(null);
    setErrorMessage(null);
    setIsRateLimited(false);
    setActiveStep(0);
    reset({
      name: '',
      email: '',
      message: '',
      honeypot: '',
    });
    setActiveTemplate('custom');
  };

  return (
    <section
      id="live-automation"
      className="relative w-full py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden bg-graphite text-bone border-t border-white/[0.08]"
      data-debug="framer: practical live automation"
    >
      {/* Node Tag Header */}
      <div className="border-b border-white/[0.08] pb-4 mb-14 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative rounded px-2.5 py-1 bg-ink hairline-border font-mono text-[11px] uppercase tracking-widest text-mist">
            <span className="node-port node-port-left" />
            <span className="node-port node-port-right" />
            <span className="text-signal font-semibold mr-1.5">// NODE: LIVE DEMO 07</span>
            <span>PIPELINE_VERIFIED</span>
          </div>
          <span className="hidden sm:inline font-mono text-[11px] text-mist/60">
            SERVERLESS /API/CONTACT + N8N WEBHOOK
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-mist">
          <span className="h-2 w-2 rounded-full bg-phosphor shadow-phosphor-glow" />
          <span className="text-bone">PRODUCTION ENGINE LIVE</span>
        </div>
      </div>

      {/* Title & Introduction */}
      <div className="max-w-3xl mb-12 space-y-4">
        <span className="font-mono text-xs uppercase tracking-widest text-signal font-semibold">
          // INTERACTIVE PIPELINE DEMO
        </span>
        <h2 className="font-serif fluid-headline font-normal tracking-tight text-bone leading-[1.05]">
          Practical Automation Workflows Engineered Just For You.
        </h2>
        <p className="font-sans text-sm sm:text-base text-mist leading-relaxed">
          Test out real-world automation yourself: Choose a test scenario or craft your own payload below, then watch our hardened serverless pipeline validate, classify, and dispatch in real time.
        </p>
      </div>

      {/* Main Interactive Playground Box */}
      <div className="rounded-[3px] border border-white/10 bg-ink p-6 sm:p-10 shadow-2xl relative space-y-8 crop-mark crop-mark-tl crop-mark-br">
        {/* 4 Port Dots */}
        <span className="node-port node-port-top" />
        <span className="node-port node-port-bottom" />
        <span className="node-port node-port-left" />
        <span className="node-port node-port-right" />

        {/* Top Scenario Pills */}
        <div className="space-y-2 border-b border-white/[0.08] pb-6">
          <span className="font-mono text-[10px] text-mist/70 uppercase tracking-wider block">
            SELECT AN INTAKE SCENARIO (OR TYPE YOUR OWN):
          </span>
          <div className="flex flex-wrap gap-2.5 pt-1">
            {PRESET_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => handleSelectTemplate(tmpl)}
                className={`rounded-[2px] px-3.5 py-1.5 font-mono text-xs transition-all duration-200 ${
                  activeTemplate === tmpl.id
                    ? 'bg-signal text-white font-semibold shadow-signal-glow'
                    : 'bg-graphite text-mist hover:text-bone hover:bg-white/5 border border-white/5'
                }`}
                data-cursor="cta"
              >
                {tmpl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area: Form / In-Transit Animation / Real Success Screen / Error State */}
        <AnimatePresence mode="wait">
          {submissionState === 'transmitting' ? (
            /* In-Transit 3-Node Packet Animation */
            <motion.div
              key="transmitting"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="py-16 flex flex-col items-center justify-center space-y-8 font-mono"
            >
              <div className="space-y-1.5 text-center">
                <span className="text-xs font-semibold text-signal uppercase tracking-wider animate-pulse block">
                  PACKET IN TRANSIT ACROSS HARDENED SERVERLESS WIRES...
                </span>
                <span className="text-[11px] text-mist/70">
                  Executing Cloudflare Turnstile token validation, rate-limit check, and Zod schema verification
                </span>
              </div>

              {/* 3 Nodes Wire Visualizer */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-2xl py-4">
                {/* Node 1 */}
                <div
                  className={`rounded border px-3.5 py-2.5 text-xs transition-all duration-300 ${
                    activeStep >= 1
                      ? 'border-signal bg-signal/15 text-signal font-semibold shadow-signal-glow'
                      : 'border-white/10 bg-graphite text-mist'
                  }`}
                >
                  [01. Ingestion &amp; Honeypot]
                </div>

                <div className="h-4 sm:h-[1.5px] w-[1.5px] sm:w-12 bg-signal/50 overflow-hidden relative">
                  <div className="w-full h-full bg-signal animate-ping" />
                </div>

                {/* Node 2 */}
                <div
                  className={`rounded border px-3.5 py-2.5 text-xs transition-all duration-300 ${
                    activeStep >= 2
                      ? 'border-phosphor bg-phosphor/15 text-phosphor font-semibold shadow-phosphor-glow'
                      : 'border-white/10 bg-graphite text-mist'
                  }`}
                >
                  [02. Turnstile &amp; Rate-Limit]
                </div>

                <div className="h-4 sm:h-[1.5px] w-[1.5px] sm:w-12 bg-signal/50 overflow-hidden relative">
                  <div className="w-full h-full bg-signal animate-ping" />
                </div>

                {/* Node 3 */}
                <div
                  className={`rounded border px-3.5 py-2.5 text-xs transition-all duration-300 ${
                    activeStep >= 3
                      ? 'border-signal bg-signal text-white font-bold'
                      : 'border-white/10 bg-graphite text-mist'
                  }`}
                >
                  [03. n8n Webhook Dispatch]
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-mist font-mono">
                <span className="h-2 w-2 rounded-full bg-signal animate-pulse" />
                <span>Forwarding to n8n webhook using secure server header...</span>
              </div>
            </motion.div>
          ) : submissionState === 'success' && executionResult ? (
            /* Real Success Screen with Real JSON Telemetry */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="py-8 space-y-6 text-center font-mono"
            >
              {/* Phosphor Checkmark Icon */}
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-phosphor/20 text-phosphor text-2xl font-bold shadow-phosphor-glow">
                ✓
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-3xl sm:text-4xl text-bone">
                  Message Dispatched Successfully
                </h3>
                {/* Real Server Response Output */}
                <p className="font-mono text-xs text-signal font-semibold tracking-wider">
                  Execution #{executionResult.executionId} · {(executionResult.durationMs / 1000).toFixed(2)}s
                </p>
              </div>

              {/* Telemetry Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto text-left pt-2">
                <div className="rounded border border-white/10 bg-graphite/60 p-3">
                  <span className="text-[10px] text-mist/60 uppercase block">EXECUTION ID</span>
                  <span className="text-xs text-bone font-mono font-medium truncate block">
                    {executionResult.executionId}
                  </span>
                </div>

                <div className="rounded border border-white/10 bg-graphite/60 p-3">
                  <span className="text-[10px] text-mist/60 uppercase block">INTENT CATEGORY</span>
                  <span className="text-xs text-signal font-mono font-semibold block">
                    {executionResult.category}
                  </span>
                </div>

                <div className="rounded border border-white/10 bg-graphite/60 p-3">
                  <span className="text-[10px] text-mist/60 uppercase block">MEASURED LATENCY</span>
                  <span className="text-xs text-phosphor font-mono font-semibold block">
                    {executionResult.durationMs}ms
                  </span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded bg-white/5 border border-white/10 px-5 py-2.5 text-xs font-mono text-bone hover:bg-white/10 transition-colors"
                  data-cursor="cta"
                >
                  Run Another Automation Test ↺
                </button>
              </div>
            </motion.div>
          ) : submissionState === 'error' ? (
            /* Clear Error State & Mailto Fallback (Never Fakes Success) */
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="py-8 space-y-6 text-center font-mono"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-signal/20 text-signal text-2xl font-bold shadow-signal-glow">
                ⚠
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <h3 className="font-serif text-3xl text-bone">
                  {isRateLimited ? 'Rate Limit Reached (429)' : 'Pipeline Dispatch Failed'}
                </h3>
                <p className="font-mono text-xs text-signal font-semibold">
                  {errorMessage || 'Upstream serverless handler was unable to deliver payload.'}
                </p>
                <p className="font-sans text-xs text-mist leading-relaxed pt-1">
                  {isRateLimited
                    ? 'Security rate-limit active (3 dispatches per IP per hour, 1 per email per day). You can launch your mail client below to deliver your exact message directly.'
                    : 'The serverless endpoint reported an issue. Click below to instantly launch your email client with your exact typed message pre-filled to Ukeme:'}
                </p>
              </div>

              {/* Direct Mail Fallback */}
              <div className="pt-2">
                <a
                  href={`mailto:kemeumoudofia@gmail.com?subject=${encodeURIComponent(
                    `Inquiry from ${submittedData?.name || 'Visitor'} (Live Automation Demo)`
                  )}&body=${encodeURIComponent(
                    `From: ${submittedData?.name || ''} (${submittedData?.email || ''})\n\nMessage:\n${submittedData?.message || ''}`
                  )}`}
                  className="inline-block rounded bg-signal px-6 py-3 text-xs text-white font-bold shadow-signal-glow hover:bg-signal/90 transition-all font-mono"
                  data-cursor="cta"
                >
                  Launch Direct Mail Client (kemeumoudofia@gmail.com) ✉
                </a>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[11px] text-mist underline hover:text-bone transition-colors"
                >
                  Reset &amp; Try Again ↺
                </button>
              </div>
            </motion.div>
          ) : (
            /* Live Demo Form */
            <form
              key="form"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 font-mono"
            >
              {/* Honeypot field (hidden from screen readers & human visitors) */}
              <input
                type="text"
                {...register('honeypot')}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* Two-Column Grid: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[11px] text-mist flex items-center justify-between">
                    <span>NAME // INTAKE_SENDER</span>
                    {errors.name && <span className="text-signal text-[10px]">{errors.name.message}</span>}
                  </label>
                  <input
                    type="text"
                    {...register('name', {
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Min 2 characters' },
                      maxLength: { value: 100, message: 'Max 100 characters' },
                    })}
                    placeholder="e.g. Alex Vance"
                    className="w-full rounded-[2px] border border-white/10 bg-graphite p-3 text-xs text-bone outline-none focus:border-signal transition-colors font-mono placeholder:text-mist/40"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[11px] text-mist flex items-center justify-between">
                    <span>EMAIL // RETURN_ADDRESS</span>
                    {errors.email && <span className="text-signal text-[10px]">{errors.email.message}</span>}
                  </label>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Valid email required',
                      },
                    })}
                    placeholder="e.g. alex@vancestudio.co"
                    className="w-full rounded-[2px] border border-white/10 bg-graphite p-3 text-xs text-bone outline-none focus:border-signal transition-colors font-mono placeholder:text-mist/40"
                  />
                </div>
              </div>

              {/* Message / Project Scope */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-mist">
                  <label>PAYLOAD // INTAKE_MESSAGE_SCOPE</label>
                  <span className="text-[10px] text-mist/60">
                    {(currentMessage || '').length}/2000 CHARS
                  </span>
                </div>
                <textarea
                  rows={4}
                  {...register('message', {
                    required: 'Payload message is required',
                    minLength: { value: 10, message: 'Min 10 characters' },
                    maxLength: { value: 2000, message: 'Max 2000 characters' },
                  })}
                  placeholder="Describe your automation goal or send a live intake event..."
                  className="w-full rounded-[2px] border border-white/10 bg-graphite p-3 text-xs text-bone outline-none focus:border-signal transition-colors font-mono placeholder:text-mist/40 resize-none"
                />
                {errors.message && (
                  <span className="text-signal text-[10px] block">{errors.message.message}</span>
                )}
              </div>

              {/* Cloudflare Turnstile Bot Verification Widget */}
              <TurnstileWidget
                onVerify={(token) => setTurnstileToken(token)}
                onExpire={() => setTurnstileToken('')}
              />

              {/* Submit CTA Bar */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  className="group relative flex items-center gap-3 rounded bg-signal px-8 py-3.5 font-mono text-xs font-bold tracking-widest text-white shadow-signal-glow transition-all hover:scale-[1.02] active:scale-95"
                  data-cursor="cta"
                >
                  <span className="node-port node-port-left !bg-white" />
                  <span className="node-port node-port-right !bg-white" />
                  <span>DISPATCH PAYLOAD</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>

                <div className="flex flex-col sm:items-end text-[10px] font-mono text-mist/60 space-y-0.5">
                  <span>RATE LIMIT: 3/IP/HR · 1/EMAIL/DAY</span>
                  <span className="text-phosphor">FORWARDING TO N8N VIA SERVERLESS SECRET HEADER</span>
                </div>
              </div>
            </form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
