import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig, ExperienceItem } from '../content/site';

gsap.registerPlugin(ScrollTrigger);

export const JourneySection: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const wirePathRef = useRef<SVGPathElement | null>(null);
  const pulseCircleRef = useRef<SVGCircleElement | null>(null);
  const [activeNodeId, setActiveNodeId] = useState<string>(siteConfig.experience[0]?.id || '');

  useEffect(() => {
    const container = containerRef.current;
    const wirePath = wirePathRef.current;
    const pulseCircle = pulseCircleRef.current;
    if (!container || !wirePath) return;

    const ctx = gsap.context(() => {
      const length = wirePath.getTotalLength();

      // Initialize wire hidden
      gsap.set(wirePath, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      // Scrub wire drawing as user scrolls through the Journey section
      gsap.to(wirePath, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top 70%',
          end: 'bottom 80%',
          scrub: 0.6,
        },
      });

      // Pulse traveling along the wire on scroll
      if (pulseCircle) {
        ScrollTrigger.create({
          trigger: container,
          start: 'top 70%',
          end: 'bottom 80%',
          scrub: 0.6,
          onUpdate: (self) => {
            const distance = self.progress * length;
            const point = wirePath.getPointAtLength(distance);
            pulseCircle.setAttribute('cx', String(point.x));
            pulseCircle.setAttribute('cy', String(point.y));
          },
        });
      }
    }, container);

    return () => ctx.revert();
  }, []);

  const toggleNode = (id: string) => {
    setActiveNodeId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative w-full min-h-screen py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden text-bone"
      data-debug="gsap: draw wire + pulse"
    >
      {/* Node Tag Header */}
      <div className="border-b border-white/[0.08] pb-4 mb-20 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative rounded px-2.5 py-1 bg-ink hairline-border font-mono text-[11px] uppercase tracking-widest text-mist">
            <span className="node-port node-port-left" />
            <span className="node-port node-port-right" />
            <span className="text-signal font-semibold mr-1.5">// NODE: JOURNEY 03</span>
            <span>EXECUTION_PATH &amp; TIMELINE</span>
          </div>
          <span className="hidden sm:inline font-mono text-[11px] text-mist/60">
            NETWORK: CHRONOLOGICAL_DISPATCH
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-mist">
          <span className="h-2 w-2 rounded-full bg-signal animate-ping" />
          <span className="text-bone">3 VERIFIED STAGES</span>
        </div>
      </div>

      {/* Main Grid: Headline & Interactive Wire Nodes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Editorial Statement (4 cols) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
          <span className="font-mono text-xs uppercase tracking-widest text-signal font-semibold">
            // EXPERIENCE AS A WORKFLOW
          </span>
          <h2 className="font-serif fluid-headline font-normal tracking-tight text-bone leading-[1.05]">
            Every role is a system designed to run without friction.
          </h2>
          <p className="font-sans text-sm text-mist leading-relaxed max-w-md">
            Click or tap each milestone node on the execution wire to inspect outcomes, automated pipelines shipped, and measured impact.
          </p>

          {/* Quick Legend */}
          <div className="pt-4 border-t border-white/[0.08] space-y-2 font-mono text-[11px] text-mist">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-signal" />
              <span>CURRENT ACTIVE DISPATCH</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-phosphor" />
              <span>DELIVERED &amp; COMPLETED SYSTEM</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Wire and Expanding Nodes (8 cols) */}
        <div className="lg:col-span-8 relative pl-8 sm:pl-16">
          {/* Continuous SVG Wire drawing vertically */}
          <div className="absolute left-2 sm:left-6 top-0 bottom-0 w-8 pointer-events-none">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 20 1000"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Ghost wire background */}
              <path
                d="M 10 0 L 10 1000"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Main self-drawing wire with Signal glow */}
              <path
                ref={wirePathRef}
                d="M 10 0 L 10 1000"
                stroke="#FF4F1F"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Traveling Signal Pulse Dot */}
              <circle
                ref={pulseCircleRef}
                cx="10"
                cy="0"
                r="4.5"
                fill="#FF4F1F"
                filter="drop-shadow(0 0 6px #FF4F1F)"
              />
            </svg>
          </div>

          {/* Experience Nodes Stack */}
          <div className="space-y-10 relative">
            {siteConfig.experience.map((exp: ExperienceItem, index: number) => {
              const isExpanded = activeNodeId === exp.id;
              const isCurrent = exp.status === 'CURRENT';

              return (
                <motion.div
                  layout
                  key={exp.id}
                  onClick={() => toggleNode(exp.id)}
                  transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                  className={`group relative rounded-[3px] bg-ink hairline-border p-6 sm:p-7 shadow-2xl cursor-pointer transition-all duration-300 hover:border-signal/50 ${
                    isExpanded ? 'border-signal/60 bg-ink/95 shadow-signal-glow/20' : ''
                  }`}
                  data-debug="framer: layoutId node"
                >
                  {/* Branching wire connector to main path */}
                  <div className="absolute -left-6 sm:-left-10 top-8 w-6 sm:w-10 h-[1.5px] bg-signal/60 group-hover:bg-signal transition-colors pointer-events-none" />

                  {/* 4 Node Ports */}
                  <span className="node-port node-port-top" />
                  <span className="node-port node-port-bottom" />
                  <span className="node-port node-port-left" />
                  <span className="node-port node-port-right" />

                  {/* Card Corner Crop Marks */}
                  <div className="crop-mark crop-mark-tl crop-mark-br" />

                  {/* Top Bar of Node */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-signal">
                        (0{index + 1})
                      </span>
                      <span className="font-mono text-[11px] tracking-wider text-mist uppercase">
                        NODE_ID: {exp.id.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      {isCurrent ? (
                        <span className="flex items-center gap-1.5 rounded-full bg-signal/15 px-2.5 py-0.5 text-signal font-semibold">
                          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                          <span>ACTIVE DISPATCH</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-phosphor font-medium">
                          <span>✓</span>
                          <span>COMPLETED</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Role Title and Company Info */}
                  <div className="pt-4 space-y-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-serif text-2xl sm:text-3xl text-bone tracking-tight font-normal group-hover:text-signal transition-colors">
                        {exp.role}
                      </h3>
                      <span className="font-mono text-xs text-mist font-medium">
                        {exp.period}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-signal/90">
                      <span>{exp.company}</span>
                      <span className="text-white/20">·</span>
                      <span className="text-mist">{exp.location}</span>
                    </div>
                  </div>

                  {/* Unfolding Outcomes using Framer Motion layout */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                        className="overflow-hidden pt-5 border-t border-white/[0.08] mt-5 space-y-4"
                      >
                        <span className="font-mono text-[10px] uppercase tracking-wider text-mist/70 font-semibold block">
                          // MEASURED OUTCOMES &amp; SYSTEM ARCHITECTURE
                        </span>

                        <ul className="space-y-2.5 text-sm sm:text-base text-bone/90 leading-relaxed font-sans">
                          {exp.bullets.map((bullet: string, bIdx: number) => (
                            <li key={bIdx} className="flex items-start gap-2.5">
                              <span className="text-signal font-mono text-xs mt-1 shrink-0">→</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Telemetry Footer */}
                        <div className="pt-3 flex items-center justify-between font-mono text-[10px] text-mist/60 border-t border-white/[0.04]">
                          <span>VERIFIED PRODUCTION COMMIT</span>
                          <span className="text-signal">STATUS: RUNNING STABLE</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Expand / Collapse Indicator */}
                  <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-mist/60 group-hover:text-mist transition-colors pt-2">
                    <span>{isExpanded ? 'CLICK TO COLLAPSE NODE' : 'CLICK TO UNFOLD OUTCOMES'}</span>
                    <span className="text-signal transition-transform duration-200">
                      {isExpanded ? '▲' : '▼'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
