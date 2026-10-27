import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../content/site';

export const WatchMeAutomate: React.FC = () => {
  const [copied, setCopied] = useState(false);

  // Link priority: environment variable -> siteConfig -> default fallback
  const driveUrl =
    import.meta.env.VITE_GOOGLE_DRIVE_URL ||
    siteConfig.links.googleDrive ||
    'https://drive.google.com/drive/folders/YOUR_GOOGLE_DRIVE_FOLDER_ID';

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(driveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div
      className="relative rounded-[3px] border border-white/10 bg-ink p-7 sm:p-10 shadow-2xl overflow-hidden crop-mark crop-mark-tl crop-mark-br group"
      data-debug="framer: watch me automate"
    >
      {/* 4 Corner Node Ports */}
      <span className="node-port node-port-top" />
      <span className="node-port node-port-bottom" />
      <span className="node-port node-port-left" />
      <span className="node-port node-port-right" />

      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5 mb-8 font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="relative rounded px-2.5 py-1 bg-graphite hairline-border uppercase tracking-widest text-mist">
            <span className="node-port node-port-left" />
            <span className="node-port node-port-right" />
            <span className="text-signal font-semibold mr-1.5">// VIDEO VAULT</span>
            <span>AUTOMATION_SCREEN_RECORDINGS</span>
          </div>
          <span className="hidden sm:inline text-[11px] text-mist/60">
            RAW SCREEN CAPTURES &amp; WORKFLOW DEMOS
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          {/* Subtle audio equalizer animation in header */}
          <div className="flex items-end gap-1 h-3.5">
            <span className="w-1 bg-phosphor rounded-full animate-eq-1" />
            <span className="w-1 bg-phosphor rounded-full animate-eq-2" />
            <span className="w-1 bg-phosphor rounded-full animate-eq-3" />
            <span className="w-1 bg-phosphor rounded-full animate-eq-4" />
            <span className="w-1 bg-phosphor rounded-full animate-eq-5" />
          </div>
          <span className="h-2 w-2 rounded-full bg-signal animate-ping" />
          <span className="text-bone">GOOGLE DRIVE REPOSITORY SYNCED</span>
        </div>
      </div>

      {/* Main Content: Editorial Heading, Description & Action CTAs */}
      <div className="space-y-6 max-w-4xl">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-signal font-semibold tracking-wider uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            <span>LIVE DEMONSTRATION REPOSITORY</span>
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-bone font-normal tracking-tight leading-[1.08]">
            Watch Me Automate.
          </h3>
          <p className="font-sans text-sm sm:text-base text-mist leading-relaxed max-w-2xl">
            Step inside my dedicated Google Drive video vault where I store raw screen recordings and workflow walkthroughs. Watch live, uncut video captures of my n8n builds, custom Python RPA scripts, browser automation pipelines, and multi-agent systems executing in real production environments.
          </p>
        </div>

        {/* Feature Highlights Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs text-bone/90 pt-1">
          <div className="flex items-center gap-2 rounded bg-graphite/60 border border-white/5 p-3">
            <span className="text-phosphor font-bold">✓</span>
            <span>Live n8n canvas builds</span>
          </div>
          <div className="flex items-center gap-2 rounded bg-graphite/60 border border-white/5 p-3">
            <span className="text-phosphor font-bold">✓</span>
            <span>Python RPA &amp; daemons</span>
          </div>
          <div className="flex items-center gap-2 rounded bg-graphite/60 border border-white/5 p-3">
            <span className="text-phosphor font-bold">✓</span>
            <span>Zero cuts / Full runs</span>
          </div>
          <div className="flex items-center gap-2 rounded bg-graphite/60 border border-white/5 p-3">
            <span className="text-phosphor font-bold">✓</span>
            <span>Walkthroughs &amp; telemetry</span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="pt-3 flex flex-wrap items-center gap-4 font-mono">
          {/* Primary Google Drive Link Button */}
          <a
            href={driveUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center gap-3 rounded bg-signal px-8 py-3.5 text-xs font-bold tracking-widest text-white shadow-signal-glow transition-all hover:scale-[1.02] active:scale-95"
            data-cursor="cta"
            title="Open Google Drive automation folder in new tab"
          >
            <span className="node-port node-port-left !bg-white" />
            <span className="node-port node-port-right !bg-white" />
            <span>ACCESS GOOGLE DRIVE VAULT</span>
            <span className="transition-transform group-hover:translate-x-1">↗</span>
          </a>

          {/* Copy Link Button */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 rounded bg-white/5 border border-white/10 px-5 py-3.5 text-xs text-mist hover:text-bone hover:bg-white/10 transition-colors"
            data-cursor="cta"
            title="Copy Google Drive URL to clipboard"
          >
            <span>{copied ? '✓ COPIED TO CLIPBOARD' : 'COPY DRIVE LINK'}</span>
          </button>

          <span className="text-[11px] text-mist/60 truncate max-w-xs sm:max-w-md hidden sm:inline">
            drive.google.com/drive/folders/1FVFIONSv3IdPPicoFdv7aD632j9Y1Tkq
          </span>
        </div>
      </div>
    </div>
  );
};
