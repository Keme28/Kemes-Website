import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig, ProjectItem } from '../content/site';

gsap.registerPlugin(ScrollTrigger);

interface WorkSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  onOpenChatbot: () => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({
  onSelectProject,
  onOpenChatbot,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const horizontalTrackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = horizontalTrackRef.current;
    if (!section || !track) return;

    // Check if desktop screen for horizontal pinning
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isDesktop || prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      const scrollWidth = track.scrollWidth - window.innerWidth + 120;

      gsap.to(track, {
        x: () => -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollWidth + 300}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-0 overflow-hidden bg-graphite text-bone"
      data-debug="gsap: pinned horizontal scroll"
    >
      {/* Desktop Wrapper for Pinned Scroll / Mobile Normal Flow */}
      <div className="w-full lg:h-screen lg:flex lg:flex-col lg:justify-center px-4 sm:px-6 lg:px-12">
        {/* Section Node Header */}
        <div className="max-w-7xl mx-auto w-full border-b border-white/[0.08] pb-4 mb-8 sm:mb-12 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative rounded px-2.5 py-1 bg-ink hairline-border font-mono text-[11px] uppercase tracking-widest text-mist">
              <span className="node-port node-port-left" />
              <span className="node-port node-port-right" />
              <span className="text-signal font-semibold mr-1.5">// NODE: WORK 04</span>
              <span>PRACTICALIZED_SYSTEMS</span>
            </div>
            <span className="hidden sm:inline font-mono text-[11px] text-mist/60">
              DEPLOYED WORKFLOWS &amp; WEB APPS
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-mist hidden md:inline">DRAG OR SCROLL HORIZONTALLY →</span>
            <button
              onClick={onOpenChatbot}
              className="flex items-center gap-1.5 rounded bg-signal/15 border border-signal/40 px-3 py-1 font-mono text-xs text-signal hover:bg-signal hover:text-white transition-all shadow-signal-glow/20"
              data-cursor="cta"
            >
              <span className="h-2 w-2 rounded-full bg-signal animate-pulse" />
              <span>LAUNCH AI COPILOT</span>
            </button>
          </div>
        </div>

        {/* Horizontal Track (pinned on Desktop, stacked on Mobile) */}
        <div
          ref={horizontalTrackRef}
          className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full lg:w-max pb-6 items-stretch"
        >
          {/* Card 0: Live AI Chatbot Interactive Banner Card */}
          <div
            className="w-full lg:w-[480px] shrink-0 rounded-[3px] bg-gradient-to-br from-ink to-graphite border border-signal/50 p-7 shadow-2xl relative flex flex-col justify-between crop-mark crop-mark-tl crop-mark-br group transition-all duration-300 hover:border-signal"
            data-cursor="cta"
          >
            {/* 4 Port Dots */}
            <span className="node-port node-port-top !bg-signal" />
            <span className="node-port node-port-bottom !bg-signal" />
            <span className="node-port node-port-left !bg-signal" />
            <span className="node-port node-port-right !bg-signal" />

            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
                <span className="text-signal font-bold uppercase tracking-wider">
                  LIVE INTERACTIVE AUTOMATION
                </span>
                <span className="rounded bg-phosphor/15 px-2 py-0.5 text-[10px] text-phosphor uppercase font-semibold">
                  RUNNING ON SITE
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <h3 className="font-serif text-3xl sm:text-4xl text-bone tracking-tight">
                  Keme's Automated Chatbot
                </h3>
                <p className="font-sans text-sm text-mist leading-relaxed">
                  “Check out my AI chatbot; ask this bot any question about AI automation.”
                </p>
                <p className="font-sans text-xs text-bone/80 leading-relaxed border-l-2 border-signal pl-3 pt-1">
                  Wired with a simulated Retrieval-Augmented Generation (RAG) vector repository and Model Context Protocol (MCP) tool execution. Test its real-time responses and telemetry traces.
                </p>
              </div>

              {/* Chatbot Pipeline Micro-strip */}
              <div className="mt-6 rounded border border-white/10 bg-graphite/60 p-3 font-mono text-[11px] space-y-1.5">
                <div className="flex items-center justify-between text-mist">
                  <span>INPUT:</span>
                  <span className="text-bone">User Query on Architecture / n8n / MCP</span>
                </div>
                <div className="flex items-center justify-between text-mist">
                  <span>PROCESS:</span>
                  <span className="text-signal">Semantic Vector RAG + MCP Routing</span>
                </div>
                <div className="flex items-center justify-between text-mist">
                  <span>OUTPUT:</span>
                  <span className="text-phosphor">Structured Answer + Telemetry</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={onOpenChatbot}
                className="w-full flex items-center justify-center gap-2 rounded bg-signal py-3 font-mono text-xs font-bold tracking-widest text-white shadow-signal-glow transition-all hover:bg-signal/90"
              >
                <span>TEST CHATBOT LIVE</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Cards 1 to N: Selected Work Projects */}
          {siteConfig.projects.map((project: ProjectItem, index: number) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="w-full lg:w-[500px] shrink-0 rounded-[3px] bg-ink hairline-border p-7 shadow-2xl relative flex flex-col justify-between crop-mark crop-mark-tl crop-mark-br group cursor-pointer transition-all duration-300 hover:border-signal/60"
              data-cursor="view"
              data-debug="framer: project card"
            >
              {/* 4 Node Port Dots */}
              <span className="node-port node-port-top" />
              <span className="node-port node-port-bottom" />
              <span className="node-port node-port-left" />
              <span className="node-port node-port-right" />

              <div>
                {/* Header: Oversized Number + Category Tag */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 font-mono">
                  <span className="text-3xl sm:text-4xl font-serif text-signal font-normal leading-none">
                    (0{index + 1})
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-mist px-2 py-0.5 rounded bg-white/5 border border-white/5">
                    {project.category}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div className="mt-5 space-y-2">
                  <h3 className="font-serif text-2xl sm:text-3xl text-bone tracking-tight font-normal group-hover:text-signal transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-mist leading-relaxed line-clamp-2">
                    {project.tagline}
                  </p>
                </div>

                {/* Input > Process > Output Micro-Strip */}
                <div className="mt-5 rounded border border-white/[0.06] bg-graphite/60 p-3 font-mono text-[11px] space-y-1">
                  <div className="text-mist truncate">
                    <span className="text-signal font-semibold mr-1.5">IN:</span>
                    <span>{project.pipeline.input}</span>
                  </div>
                  <div className="text-mist truncate">
                    <span className="text-phosphor font-semibold mr-1.5">PROC:</span>
                    <span>{project.pipeline.process}</span>
                  </div>
                  <div className="text-mist truncate">
                    <span className="text-bone font-semibold mr-1.5">OUT:</span>
                    <span>{project.pipeline.output}</span>
                  </div>
                </div>

                {/* Animated Metric Counters */}
                <div className="mt-5 grid grid-cols-2 gap-3 font-mono">
                  {project.metrics.slice(0, 2).map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="rounded border border-white/5 bg-graphite/40 p-2.5"
                    >
                      <span className="text-[9px] uppercase tracking-wider text-mist/70 block">
                        {m.label}
                      </span>
                      <div className="mt-0.5 flex items-baseline gap-1">
                        <span className="text-lg font-serif text-bone font-semibold group-hover:text-signal transition-colors">
                          {m.value}
                        </span>
                        {m.unit && <span className="text-[10px] text-mist">{m.unit}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="pt-6 border-t border-white/[0.08] mt-6 flex items-center justify-between font-mono text-xs gap-3">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 rounded bg-signal px-3.5 py-1.5 font-mono text-[11px] font-bold text-white shadow-signal-glow hover:bg-signal/90 transition-all"
                    data-cursor="cta"
                    title={`Open live ${project.title} website in new tab`}
                  >
                    <span>VISIT LIVE SITE</span>
                    <span className="text-xs">↗</span>
                  </a>
                ) : (
                  <span className="text-mist group-hover:text-bone transition-colors">
                    INSPECT ARCHITECTURE
                  </span>
                )}
                <span className="text-signal font-bold transition-transform group-hover:translate-x-1 flex items-center gap-1">
                  <span>CASE STUDY</span>
                  <span>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
