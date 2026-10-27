import React from 'react';
import { siteConfig } from '../content/site';
import { useLenis } from './SmoothScroll';

export const WorkWithMeSection: React.FC = () => {
  const { scrollTo } = useLenis();

  return (
    <section
      id="services"
      className="relative w-full py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden bg-graphite text-bone border-t border-white/[0.08]"
      data-debug="framer: engagement tiers"
    >
      {/* Node Tag Header */}
      <div className="border-b border-white/[0.08] pb-4 mb-16 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative rounded px-2.5 py-1 bg-ink hairline-border font-mono text-[11px] uppercase tracking-widest text-mist">
            <span className="node-port node-port-left" />
            <span className="node-port node-port-right" />
            <span className="text-signal font-semibold mr-1.5">// NODE: ENGAGEMENT 08</span>
            <span>WORK_WITH_ME</span>
          </div>
          <span className="hidden sm:inline font-mono text-[11px] text-mist/60">
            THREE COLLABORATION BLUEPRINTS
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-mist">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" />
          <span>CURRENT CAPACITY: OPEN FOR SELECT WORK</span>
        </div>
      </div>

      {/* Editorial Title */}
      <div className="max-w-3xl mb-16 space-y-3">
        <span className="font-mono text-xs uppercase tracking-widest text-signal font-semibold">
          // HOW WE WORK TOGETHER
        </span>
        <h2 className="font-serif fluid-headline font-normal tracking-tight text-bone leading-[1.05]">
          Clear scope. Zero friction. Fast delivery.
        </h2>
        <p className="font-sans text-sm sm:text-base text-mist leading-relaxed">
          I don't sell bloated monthly retainers for simple jobs. We identify the bottleneck, engineer the automated solution, and ship it so your team can focus on work only humans can do.
        </p>
      </div>

      {/* 3 Cards Grid Matching User Reference Image */}
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-stretch">
        {siteConfig.services.map((service, idx) => (
          <div
            key={service.index}
            className="group relative rounded-[2px] bg-[#141416] border border-white/[0.08] p-8 sm:p-10 shadow-2xl flex flex-col justify-between transition-all duration-300 hover:border-white/20 min-h-[560px]"
            data-cursor="view"
          >
            {/* Horizontal Port Dots on side edges */}
            <div className="hidden lg:flex items-center justify-center absolute -left-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border border-white/25 bg-[#141416] z-20 group-hover:border-signal transition-colors" />
            <div className="hidden lg:flex items-center justify-center absolute -right-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border border-white/25 bg-[#141416] z-20 group-hover:border-signal transition-colors" />

            {/* Connecting Hairline trace between cards (for cards 1 and 2) */}
            {idx < 2 && (
              <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 w-6 h-[1px] bg-white/10 pointer-events-none z-10" />
            )}

            {/* Bottom Corner Crop-Marks (Engineering style) */}
            <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-white/30 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-white/30 pointer-events-none" />

            <div>
              {/* Top mono index spaced like "0 1" */}
              <div className="font-mono text-xs text-mist/70 tracking-[0.25em] mb-6 select-none">
                {service.index.split('').join(' ')}
              </div>

              {/* Title in large Instrument Serif */}
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-bone font-normal leading-[1.08] tracking-tight whitespace-pre-line mb-4 group-hover:text-signal transition-colors">
                {service.title}
              </h3>

              {/* Subtitle / Plain Description */}
              <p className="font-sans text-sm sm:text-base text-mist leading-relaxed min-h-[48px]">
                {service.description}
              </p>

              {/* Subtle Horizontal Divider */}
              <div className="h-[1px] w-full bg-white/[0.08] my-8 sm:my-10" />

              {/* 3 Step List with Signal Orange Numbers */}
              <div className="space-y-6 sm:space-y-8 font-sans">
                {service.steps.map((step, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-4">
                    <span className="font-mono text-xs sm:text-sm text-signal font-semibold tracking-widest shrink-0 mt-0.5">
                      0 {sIdx + 1}
                    </span>
                    <span className="text-sm sm:text-base text-bone/90 leading-snug">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action Trigger */}
            <div className="pt-10 mt-6 border-t border-white/[0.06]">
              <button
                onClick={() => scrollTo('#contact')}
                className="w-full flex items-center justify-between rounded bg-white/[0.03] border border-white/[0.08] px-4 py-2.5 font-mono text-xs text-mist hover:text-bone hover:border-signal/50 hover:bg-white/[0.06] transition-all"
                data-cursor="cta"
              >
                <span>INITIATE BLUEPRINT</span>
                <span className="text-signal">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
