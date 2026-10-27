import React from 'react';
import { siteConfig } from '../content/site';

export const ToolboxSection: React.FC = () => {
  return (
    <section
      id="toolbox"
      className="relative w-full py-28 overflow-hidden bg-graphite text-bone border-t border-white/[0.08]"
      data-debug="css: opposing marquees"
    >
      {/* Node Tag Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.08] pb-4 mb-16 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative rounded px-2.5 py-1 bg-ink hairline-border font-mono text-[11px] uppercase tracking-widest text-mist">
            <span className="node-port node-port-left" />
            <span className="node-port node-port-right" />
            <span className="text-signal font-semibold mr-1.5">// NODE: TOOLBOX 05</span>
            <span>CAPABILITY_MATRIX</span>
          </div>
          <span className="hidden sm:inline font-mono text-[11px] text-mist/60">
            NO SKILL BARS · ZERO VANITY PERCENTAGES
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-mist">
          <span className="h-2 w-2 rounded-full bg-phosphor" />
          <span>PRODUCTION-PROVEN TOOLS</span>
        </div>
      </div>

      {/* Editorial Plain-Language Context (3 sentences) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-20">
        <h2 className="font-serif fluid-headline font-normal tracking-tight text-bone">
          Tools are precision levers, not identity badges.
        </h2>
        <div className="space-y-2 max-w-2xl mx-auto font-sans text-base sm:text-lg text-mist leading-relaxed">
          <p>“{siteConfig.toolbox.contextText[0]}”</p>
          <p>“{siteConfig.toolbox.contextText[1]}”</p>
          <p className="text-bone/90 font-medium">“{siteConfig.toolbox.contextText[2]}”</p>
        </div>
      </div>

      {/* Marquee Row 1: BUILD (Scrolling Left) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-mono text-xs text-mist">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            <span className="text-bone uppercase tracking-wider font-semibold">STREAM A: BUILD // FRONTEND &amp; SYSTEMS</span>
          </span>
          <span className="text-[10px] text-mist/60">[HOVER TO PAUSE &amp; COLORIZE]</span>
        </div>

        {/* Continuous Marquee Track A */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused]">
            {[...siteConfig.toolbox.build, ...siteConfig.toolbox.build, ...siteConfig.toolbox.build].map((tool, idx) => (
              <div
                key={`b-${idx}`}
                className="group flex items-center gap-3 rounded-[3px] bg-ink hairline-border px-5 py-3 transition-all duration-300 hover:border-signal/60 hover:bg-white/[0.04]"
                data-cursor="view"
              >
                <div className="h-6 w-6 rounded flex items-center justify-center bg-white/5 text-mist font-mono text-xs font-bold transition-colors group-hover:text-signal group-hover:bg-signal/15">
                  {tool.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-serif text-base text-bone tracking-tight group-hover:text-signal transition-colors">
                    {tool.name}
                  </div>
                  <div className="font-mono text-[10px] uppercase text-mist/70 tracking-wider">
                    {tool.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee Row 2: AUTOMATE (Scrolling Right) */}
      <div className="space-y-6 mt-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-mono text-xs text-mist">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-phosphor" />
            <span className="text-bone uppercase tracking-wider font-semibold">STREAM B: AUTOMATE // ORCHESTRATION &amp; AI</span>
          </span>
          <span className="text-[10px] text-mist/60">[DIRECTION: OPPOSING REVERSE]</span>
        </div>

        {/* Continuous Marquee Track B (Opposing Direction) */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max gap-4 animate-marquee-reverse hover:[animation-play-state:paused]">
            {[...siteConfig.toolbox.automate, ...siteConfig.toolbox.automate, ...siteConfig.toolbox.automate].map((tool, idx) => (
              <div
                key={`a-${idx}`}
                className="group flex items-center gap-3 rounded-[3px] bg-ink hairline-border px-5 py-3 transition-all duration-300 hover:border-phosphor/60 hover:bg-white/[0.04]"
                data-cursor="view"
              >
                <div className="h-6 w-6 rounded flex items-center justify-center bg-white/5 text-mist font-mono text-xs font-bold transition-colors group-hover:text-phosphor group-hover:bg-phosphor/15">
                  {tool.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-serif text-base text-bone tracking-tight group-hover:text-phosphor transition-colors">
                    {tool.name}
                  </div>
                  <div className="font-mono text-[10px] uppercase text-mist/70 tracking-wider">
                    {tool.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
