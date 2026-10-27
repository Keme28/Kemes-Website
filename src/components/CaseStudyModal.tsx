import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem, siteConfig } from '../content/site';
import { ArchitectureDiagram } from './ArchitectureDiagram';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSelectProject: (p: ProjectItem) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onSelectProject,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  // Find next project in list
  const currentIndex = siteConfig.projects.findIndex((p) => p.id === project.id);
  const nextProject = siteConfig.projects[(currentIndex + 1) % siteConfig.projects.length];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9998] flex items-center justify-center p-3 sm:p-6 lg:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-graphite/90 backdrop-blur-md"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="relative z-10 w-full max-w-5xl max-h-[92vh] flex flex-col rounded-[3px] border border-white/10 bg-ink text-bone shadow-2xl overflow-hidden font-sans"
          data-debug="framer: case study route"
        >
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-graphite px-6 py-4 font-mono">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-signal" />
              <span className="text-xs uppercase tracking-wider text-mist">
                CASE STUDY // {project.category.toUpperCase()}
              </span>
              <span className="text-white/20">·</span>
              <span className="text-bone font-semibold text-xs">{project.year}</span>
            </div>

            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded bg-signal px-3 py-1 text-xs text-white font-bold font-mono shadow-signal-glow hover:bg-signal/90 transition-all flex items-center gap-1"
                  data-cursor="cta"
                >
                  <span>Live App</span>
                  <span>↗</span>
                </a>
              )}
              <span className="hidden sm:inline text-[11px] text-mist/60">
                SLUG: /work/{project.slug}
              </span>
              <button
                onClick={onClose}
                className="rounded bg-white/5 px-2.5 py-1 text-xs text-mist hover:bg-white/10 hover:text-bone transition-colors"
                data-cursor="cta"
              >
                ✕ [ESC]
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-12">
            {/* Title & Tagline */}
            <div className="space-y-4 border-b border-white/10 pb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-signal font-semibold">
                SYSTEM IDENTIFIER: {project.id.toUpperCase()}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-bone font-normal tracking-tight">
                {project.title}
              </h2>
              <p className="font-sans text-base sm:text-lg text-mist leading-relaxed max-w-3xl">
                {project.tagline}
              </p>

              {/* Real Metric Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="rounded border border-white/5 bg-graphite/40 p-4 font-mono">
                    <span className="text-[10px] uppercase text-mist/70 tracking-wider block">
                      {m.label}
                    </span>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-serif text-signal">
                        {m.value}
                      </span>
                      {m.unit && <span className="text-xs text-mist">{m.unit}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input > Process > Output Micro-Strip */}
            <div className="space-y-3 font-mono">
              <span className="text-xs uppercase tracking-wider text-mist/80 block">
                // SYSTEM PIPELINE FLOW
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="rounded border border-white/5 bg-graphite/40 p-4">
                  <span className="text-[10px] text-signal font-semibold uppercase block mb-1">
                    01. INPUT INGESTION
                  </span>
                  <p className="text-xs text-bone font-sans">{project.pipeline.input}</p>
                </div>
                <div className="rounded border border-white/5 bg-graphite/40 p-4">
                  <span className="text-[10px] text-phosphor font-semibold uppercase block mb-1">
                    02. DETERMINISTIC PROCESS
                  </span>
                  <p className="text-xs text-bone font-sans">{project.pipeline.process}</p>
                </div>
                <div className="rounded border border-white/5 bg-graphite/40 p-4">
                  <span className="text-[10px] text-bone font-semibold uppercase block mb-1">
                    03. DISPATCH OUTPUT
                  </span>
                  <p className="text-xs text-bone font-sans">{project.pipeline.output}</p>
                </div>
              </div>
            </div>

            {/* Problem & What Was Built */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed">
              <div className="space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-wider text-signal font-semibold">
                  // THE BOTTLENECK &amp; FRICTION
                </h3>
                <p className="text-bone/85">{project.overview.problem}</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-wider text-phosphor font-semibold">
                  // WHAT I ARCHITECTED &amp; SHIPPED
                </h3>
                <p className="text-bone/85">{project.overview.built}</p>
              </div>
            </div>

            {/* ANIMATED ARCHITECTURE DIAGRAM */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs uppercase tracking-widest text-mist">
                  // LIVE SYSTEM TOPOLOGY &amp; WIRE MAPPING
                </h3>
                <span className="font-mono text-[10px] text-signal">
                  INTERACTIVE NODES
                </span>
              </div>
              <ArchitectureDiagram project={project} />
            </div>

            {/* Tech Stack */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-mist">
                // TECHNOLOGIES &amp; PROTOCOLS DEPLOYED
              </h3>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {project.stack.map((s, idx) => (
                  <span
                    key={idx}
                    className="rounded border border-white/10 bg-graphite px-3 py-1 text-bone"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Measurable Result */}
            <div className="rounded-[3px] border border-signal/30 bg-signal/5 p-6 space-y-2">
              <span className="font-mono text-xs font-semibold text-signal uppercase tracking-wider">
                // PRODUCTION VERDICT &amp; OUTCOME
              </span>
              <p className="text-base text-bone/90 leading-relaxed font-sans">
                {project.overview.result}
              </p>
            </div>
          </div>

          {/* Footer & Next Project Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-graphite px-6 py-4 font-mono text-xs">
            <button
              onClick={onClose}
              className="text-mist hover:text-bone transition-colors"
              data-cursor="cta"
            >
              ← Back to Overview
            </button>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded bg-signal px-4 py-1.5 text-xs text-white font-bold font-mono shadow-signal-glow hover:bg-signal/90 transition-all flex items-center gap-1.5"
                data-cursor="cta"
              >
                <span>VISIT LIVE APPLICATION</span>
                <span>↗</span>
              </a>
            )}

            <button
              onClick={() => onSelectProject(nextProject)}
              className="group flex items-center gap-2 text-signal hover:underline"
              data-cursor="cta"
            >
              <span className="hidden sm:inline">Next Project: {nextProject.title}</span>
              <span className="sm:hidden">Next Project</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
