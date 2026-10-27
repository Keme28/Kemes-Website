import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../content/site';
import { TurnstileWidget } from './TurnstileWidget';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().max(0, 'Spam detected'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactSection: React.FC = () => {
  const [submissionState, setSubmissionState] = useState<'idle' | 'transmitting' | 'success' | 'fallback'>('idle');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false);
  const [turnstileToken, setTurnstileToken] = useState<string>('1x00000000000000000000AA');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // Honeypot check
    if (data.honeypot && data.honeypot.length > 0) {
      return;
    }

    setSubmittedData(data);
    setSubmissionState('transmitting');
    setActiveStep(1); // [Your message]
    setErrorMessage(null);
    setIsRateLimited(false);

    const stepTimer = setTimeout(() => {
      setActiveStep(2); // [Validated]
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
      setActiveStep(3); // [Dispatched]

      const resJson = await res.json().catch(() => ({}));

      if (res.ok && resJson.ok) {
        setTimeout(() => {
          setSubmissionState('success');
        }, 300);
      } else {
        // Do not fake success
        const errText = resJson.error || 'Serverless dispatch rejected payload.';
        setErrorMessage(errText);
        setIsRateLimited(res.status === 429);
        setTimeout(() => {
          setSubmissionState('fallback');
        }, 300);
      }
    } catch (err: any) {
      clearTimeout(stepTimer);
      console.warn('Live dispatch endpoint unreachable, activating mail client fallback:', err);
      setErrorMessage(err?.message || 'Network unreachable');
      setSubmissionState('fallback');
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.links.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleResetForm = () => {
    reset();
    setSubmissionState('idle');
    setActiveStep(0);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden bg-graphite text-bone border-t border-white/[0.08]"
      data-debug="framer: contact webhook"
    >
      {/* Node Tag Header */}
      <div className="border-b border-white/[0.08] pb-4 mb-16 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative rounded px-2.5 py-1 bg-ink hairline-border font-mono text-[11px] uppercase tracking-widest text-mist">
            <span className="node-port node-port-left" />
            <span className="node-port node-port-right" />
            <span className="text-signal font-semibold mr-1.5">// NODE: DISPATCH 09</span>
            <span>CONTACT_INGESTION</span>
          </div>
          <span className="hidden sm:inline font-mono text-[11px] text-mist/60">
            ENV: VITE_WEBHOOK_URL (N8N/MAKE/TELEGRAM)
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-mist">
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
          <span>INBOX AUTOMATION ARMED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Editorial Headline & Direct Contacts (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-signal font-semibold">
              // SAY HI, WATCH IT RUN
            </span>
            <h2 className="font-serif fluid-headline font-normal tracking-tight text-bone leading-[1.05]">
              Let’s automate the boring and build the exceptional.
            </h2>
            <p className="font-sans text-sm sm:text-base text-mist leading-relaxed">
              Have a web application to ship or manual workflows stealing your team’s time? Send a payload through the webhook form, or connect directly.
            </p>
          </div>

          {/* Contact Direct Cards */}
          <div className="space-y-3 font-mono text-xs">
            {/* Email */}
            <div className="rounded-[3px] bg-ink hairline-border p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-mist/70 uppercase tracking-wider block">
                  DIRECT EMAIL
                </span>
                <a
                  href={`mailto:${siteConfig.links.email}`}
                  className="text-bone hover:text-signal transition-colors font-medium text-xs mt-0.5 block"
                >
                  {siteConfig.links.email}
                </a>
              </div>
              <button
                onClick={handleCopyEmail}
                className="rounded bg-white/5 px-2.5 py-1 text-[11px] text-mist hover:text-bone hover:bg-white/10 transition-colors"
                data-cursor="cta"
              >
                {copiedEmail ? '✓ COPIED' : 'COPY'}
              </button>
            </div>

            {/* Phone */}
            <div className="rounded-[3px] bg-ink hairline-border p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-mist/70 uppercase tracking-wider block">
                  PHONE / WHATSAPP
                </span>
                <span className="text-bone font-medium text-xs mt-0.5 block">
                  {siteConfig.links.phone}
                </span>
              </div>
              <span className="text-[10px] text-phosphor">LAGOS, NG (WAT)</span>
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-[3px] bg-ink hairline-border p-3.5 hover:border-signal/50 transition-colors flex items-center justify-between"
                data-cursor="cta"
              >
                <div>
                  <span className="text-[10px] text-mist/60 uppercase block">CODE</span>
                  <span className="text-xs text-bone font-medium">GitHub ↗</span>
                </div>
                <span className="text-[11px] text-mist">@Keme28</span>
              </a>

              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-[3px] bg-ink hairline-border p-3.5 hover:border-signal/50 transition-colors flex items-center justify-between"
                data-cursor="cta"
              >
                <div>
                  <span className="text-[10px] text-mist/60 uppercase block">NETWORK</span>
                  <span className="text-xs text-bone font-medium">LinkedIn ↗</span>
                </div>
                <span className="text-[11px] text-mist">Connect</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Webhook Form & Animated Packet Trace (7 cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-[3px] border border-white/10 bg-ink p-6 sm:p-8 shadow-2xl relative crop-mark crop-mark-tl crop-mark-br">
            {/* 4 Port Dots */}
            <span className="node-port node-port-top" />
            <span className="node-port node-port-bottom" />
            <span className="node-port node-port-left" />
            <span className="node-port node-port-right" />

            {/* Header of Form Box */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-6 font-mono text-xs">
              <span className="text-signal font-semibold uppercase tracking-wider">
                LIVE PRODUCTION DISPATCHER
              </span>
              <span className="text-[10px] text-mist/60">
                STATE: {submissionState.toUpperCase()}
              </span>
            </div>

            {/* Live Packet Animation Container when transmitting */}
            <AnimatePresence mode="wait">
              {submissionState === 'transmitting' ? (
                <motion.div
                  key="transmitting"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="py-12 flex flex-col items-center justify-center space-y-8 font-mono"
                >
                  <span className="text-xs font-semibold text-signal uppercase tracking-wider animate-pulse">
                    PACKET IN TRANSIT ACROSS WORKFLOW WIRES...
                  </span>

                  {/* 3 Nodes Wire Animation */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-lg">
                    {/* Node 1 */}
                    <div
                      className={`rounded border px-3 py-2 text-xs transition-colors ${
                        activeStep >= 1
                          ? 'border-signal bg-signal/15 text-signal font-semibold'
                          : 'border-white/10 bg-graphite text-mist'
                      }`}
                    >
                      [Your Message]
                    </div>

                    <div className="h-4 sm:h-[1.5px] w-[1.5px] sm:w-10 bg-signal/50 overflow-hidden relative">
                      <div className="w-full h-full bg-signal animate-ping" />
                    </div>

                    {/* Node 2 */}
                    <div
                      className={`rounded border px-3 py-2 text-xs transition-colors ${
                        activeStep >= 2
                          ? 'border-phosphor bg-phosphor/15 text-phosphor font-semibold'
                          : 'border-white/10 bg-graphite text-mist'
                      }`}
                    >
                      [Validated]
                    </div>

                    <div className="h-4 sm:h-[1.5px] w-[1.5px] sm:w-10 bg-signal/50 overflow-hidden relative">
                      <div className="w-full h-full bg-signal animate-ping" />
                    </div>

                    {/* Node 3 */}
                    <div
                      className={`rounded border px-3 py-2 text-xs transition-colors ${
                        activeStep >= 3
                          ? 'border-signal bg-signal text-white font-bold'
                          : 'border-white/10 bg-graphite text-mist'
                      }`}
                    >
                      [Dispatched to kemeumoudofia@gmail.com ✓]
                    </div>
                  </div>

                  <span className="text-[11px] text-mist">
                    Tracing packet payload through edge router to kemeumoudofia@gmail.com...
                  </span>
                </motion.div>
              ) : submissionState === 'success' ? (
                /* Success Screen */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="py-12 space-y-6 text-center font-mono"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-phosphor/20 text-phosphor text-2xl font-bold shadow-phosphor-glow">
                    ✓
                  </div>

                  <div>
                    <h3 className="font-serif text-3xl sm:text-4xl text-bone">
                      Message Dispatched Successfully
                    </h3>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleResetForm}
                      className="rounded bg-white/5 border border-white/10 px-5 py-2 text-xs font-mono text-bone hover:bg-white/10 transition-colors"
                      data-cursor="cta"
                    >
                      Send Another Dispatch ↺
                    </button>
                  </div>
                </motion.div>
              ) : submissionState === 'fallback' ? (
                /* Fallback Screen if Webhook Offline or Rate Limited */
                <motion.div
                  key="fallback"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-6 space-y-4 text-center font-mono"
                >
                  <h3 className="font-serif text-2xl text-bone">
                    {isRateLimited ? 'Rate Limit Reached (429)' : 'Direct Mail Dispatch Fallback'}
                  </h3>
                  <p className="text-xs text-signal font-mono font-semibold max-w-md mx-auto">
                    {errorMessage || 'Live serverless endpoint was unreachable.'}
                  </p>
                  <p className="text-xs text-mist max-w-md mx-auto">
                    {isRateLimited
                      ? 'Maximum 3 submissions per IP per hour or 1 per email per day. Click below to instantly launch your mail client:'
                      : 'Click below to instantly launch your email client with your exact typed message addressed to kemeumoudofia@gmail.com:'}
                  </p>
                  <a
                    href={`mailto:kemeumoudofia@gmail.com?subject=${encodeURIComponent(
                      `Portfolio Inquiry from ${submittedData?.name || 'Visitor'}`
                    )}&body=${encodeURIComponent(
                      `From: ${submittedData?.name || ''} (${submittedData?.email || ''})\nWebsite: ${siteConfig.links.email}\n\nMessage:\n${submittedData?.message || ''}`
                    )}`}
                    className="inline-block rounded bg-signal px-6 py-2.5 text-xs text-white font-bold shadow-signal-glow hover:bg-signal/90 transition-all"
                  >
                    Open Mail Client (kemeumoudofia@gmail.com) ✉
                  </a>
                  <div>
                    <button
                      onClick={handleResetForm}
                      className="text-[11px] text-mist underline mt-2 block mx-auto"
                    >
                      Reset Form ↺
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Standard Webhook Form */
                <form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5 font-mono"
                >
                  {/* Honeypot field (hidden from real users) */}
                  <input
                    type="text"
                    {...register('honeypot')}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {/* Name Field */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-mist flex items-center justify-between">
                      <span>NAME // CLIENT_OR_TEAM</span>
                      {errors.name && <span className="text-signal text-[10px]">{errors.name.message}</span>}
                    </label>
                    <input
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      placeholder="e.g. Alex Vance"
                      className="w-full rounded-[2px] border border-white/10 bg-graphite p-3 text-xs text-bone outline-none focus:border-signal transition-colors font-mono placeholder:text-mist/40"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-mist flex items-center justify-between">
                      <span>EMAIL // RETURN_ADDRESS</span>
                      {errors.email && <span className="text-signal text-[10px]">{errors.email.message}</span>}
                    </label>
                    <input
                      type="email"
                      {...register('email', { required: 'Valid email is required' })}
                      placeholder="e.g. alex@studio.co"
                      className="w-full rounded-[2px] border border-white/10 bg-graphite p-3 text-xs text-bone outline-none focus:border-signal transition-colors font-mono placeholder:text-mist/40"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-mist flex items-center justify-between">
                      <span>MESSAGE // PROJECT_SCOPE</span>
                      {errors.message && <span className="text-signal text-[10px]">{errors.message.message}</span>}
                    </label>
                    <textarea
                      rows={4}
                      {...register('message', { required: 'Message is required' })}
                      placeholder="Tell me what you're looking to build or automate..."
                      className="w-full rounded-[2px] border border-white/10 bg-graphite p-3 text-xs text-bone outline-none focus:border-signal transition-colors font-mono placeholder:text-mist/40 resize-none"
                    />
                  </div>

                  {/* Turnstile Widget */}
                  <TurnstileWidget
                    onVerify={(token) => setTurnstileToken(token)}
                    onExpire={() => setTurnstileToken('')}
                  />

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="submit"
                      className="group relative flex items-center gap-3 rounded bg-signal px-8 py-3.5 font-mono text-xs font-bold tracking-widest text-white shadow-signal-glow transition-all hover:scale-[1.02] active:scale-95"
                      data-cursor="cta"
                    >
                      <span className="node-port node-port-left !bg-white" />
                      <span className="node-port node-port-right !bg-white" />
                      <span>DISPATCH WEBHOOK</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </button>

                    <span className="text-[10px] text-mist/60 hidden sm:inline">
                      RATE LIMIT: 3/IP/HR · 1/EMAIL/DAY
                    </span>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
