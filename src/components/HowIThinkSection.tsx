import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../content/site';

export const HowIThinkSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [resetKey, setResetKey] = useState(0);

  // Initial offsets and rotations for realistic sticky paper arrangement
  const stickyStyles = [
    { bg: 'bg-[#18181B]', rotate: -3, border: 'border-white/10', pinColor: '#FF4F1F' },
    { bg: 'bg-[#1C1A17]', rotate: 2.5, border: 'border-white/10', pinColor: '#EFEAE0' },
    { bg: 'bg-[#181A1B]', rotate: -2, border: 'border-white/10', pinColor: '#B6FF5C' },
    { bg: 'bg-[#1F1C18]', rotate: 3, border: 'border-white/10', pinColor: '#FF4F1F' },
    { bg: 'bg-[#17181A]', rotate: -1.5, border: 'border-white/10', pinColor: '#A8A398' },
  ];

  return (
    <section
      id="principles"
      className="relative w-full py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden bg-graphite text-bone"
      data-debug="framer: draggable notes"
    >
      {/* Node Tag Header */}
      <div className="border-b border-white/[0.08] pb-4 mb-16 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative rounded px-2.5 py-1 bg-ink hairline-border font-mono text-[11px] uppercase tracking-widest text-mist">
            <span className="node-port node-port-left" />
            <span className="node-port node-port-right" />
            <span className="text-signal font-semibold mr-1.5">// NODE: LOGIC 06</span>
            <span>FIRST_PRINCIPLES</span>
          </div>
          <span className="hidden sm:inline font-mono text-[11px] text-mist/60">
            SPRING PHYSICS ACTIVE · GRAB &amp; REORGANIZE
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <button
            onClick={() => setResetKey((prev) => prev + 1)}
            className="text-mist hover:text-signal transition-colors text-[11px] flex items-center gap-1"
          >
            <span>↺</span>
            <span>RESET ARRANGEMENT</span>
          </button>
        </div>
      </div>

      {/* Editorial Title */}
      <div className="max-w-2xl mb-12 space-y-3">
        <span className="font-mono text-xs uppercase tracking-widest text-signal font-semibold">
          // HOW I THINK &amp; OPERATE
        </span>
        <h2 className="font-serif fluid-headline font-normal tracking-tight text-bone leading-[1.05]">
          Five principles I hold when building systems.
        </h2>
        <p className="font-sans text-sm text-mist leading-relaxed">
          Tactile notes from my workbench. Drag them around the canvas to inspect my mental models.
        </p>
      </div>

      {/* Draggable Sticky Notes Sandbox Canvas */}
      <div
        ref={containerRef}
        key={resetKey}
        className="relative w-full min-h-[580px] sm:min-h-[520px] rounded-[3px] border border-white/[0.08] bg-ink/30 p-4 sm:p-8 overflow-hidden select-none"
      >
        {/* Subtle grid background inside sandbox */}
        <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

        {/* Drag Hint Watermark */}
        <div className="absolute bottom-4 right-6 font-mono text-[10px] text-mist/40 pointer-events-none">
          [DRAG WITH SPRING DAMPING]
        </div>

        {/* Grid of Draggable Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
          {siteConfig.principles.map((p, idx) => {
            const style = stickyStyles[idx % stickyStyles.length];

            return (
              <motion.div
                key={p.number}
                drag
                dragConstraints={containerRef}
                dragElastic={0.2}
                whileHover={{ scale: 1.02 }}
                whileDrag={{ scale: 1.06, rotate: 0, zIndex: 40 }}
                initial={{ rotate: style.rotate }}
                className={`relative rounded-[3px] ${style.bg} border ${style.border} p-6 shadow-xl cursor-grab active:cursor-grabbing crop-mark crop-mark-tl crop-mark-br group`}
                data-cursor="drag"
              >
                {/* Visual Pin / Tape Header */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4 font-mono text-[11px]">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full shadow-sm"
                      style={{ backgroundColor: style.pinColor }}
                    />
                    <span className="text-signal font-bold">({p.number})</span>
                  </div>

                  <span className="rounded bg-white/5 px-2 py-0.5 text-[9px] uppercase tracking-wider text-mist font-semibold">
                    {p.tag}
                  </span>
                </div>

                {/* Primary Principle Headline */}
                <h3 className="font-serif text-xl sm:text-2xl text-bone tracking-tight font-normal leading-snug group-hover:text-signal transition-colors">
                  “{p.title}”
                </h3>

                {/* Handwritten Annotation in Caveat */}
                <div className="mt-4 pt-3 border-t border-white/[0.04]">
                  <p className="font-hand text-2xl text-bone/90 leading-relaxed">
                    {p.note}
                  </p>
                </div>

                {/* Bottom Corner Tag */}
                <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-mist/40">
                  <span>SPEC // RULE_{p.number}</span>
                  <span className="text-signal/70">HOLD &amp; DRAG ✥</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
