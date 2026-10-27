import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../content/site';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<'interactive' | 'pdf'>('interactive');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center p-3 sm:p-6 lg:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-graphite/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col rounded-[3px] border border-white/10 bg-ink text-bone shadow-2xl overflow-hidden"
            data-debug="framer: cv modal"
          >
            {/* Modal Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-graphite/95 px-5 py-3.5">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-signal shadow-signal-glow animate-pulse" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-bone">
                  CURRICULUM VITAE // {siteConfig.profile.fullName.toUpperCase()}
                </span>
                <span className="hidden sm:inline font-mono text-[10px] text-mist/70">
                  · VERIFIED RECORD
                </span>
              </div>

              {/* View Toggle & Actions */}
              <div className="flex items-center gap-2">
                {/* Segmented view switch */}
                <div className="flex items-center rounded border border-white/10 bg-graphite p-0.5 font-mono text-[11px]">
                  <button
                    onClick={() => setViewMode('interactive')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      viewMode === 'interactive'
                        ? 'bg-signal text-white font-medium'
                        : 'text-mist hover:text-bone'
                    }`}
                  >
                    Interactive Spec
                  </button>
                  <button
                    onClick={() => setViewMode('pdf')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      viewMode === 'pdf'
                        ? 'bg-signal text-white font-medium'
                        : 'text-mist hover:text-bone'
                    }`}
                  >
                    Original PDF
                  </button>
                </div>

                {/* Direct Download Button */}
                <a
                  href={siteConfig.links.resumePdf}
                  download="Ukemeobong_Umoudofia_CV.pdf"
                  className="flex items-center gap-1.5 rounded bg-bone px-3 py-1 font-mono text-xs font-semibold text-graphite hover:bg-signal hover:text-white transition-colors"
                  data-cursor="cta"
                >
                  <span>Download PDF</span>
                  <span>↓</span>
                </a>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="rounded bg-white/5 px-2.5 py-1 font-mono text-xs text-mist hover:bg-white/10 hover:text-bone transition-colors"
                  data-cursor="cta"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            {viewMode === 'pdf' ? (
              <div className="flex-1 w-full h-[75vh] bg-graphite flex flex-col items-center justify-center">
                <iframe
                  src={`${siteConfig.links.resumePdf}#toolbar=1&navpanes=0`}
                  title="Ukemeobong Umo-Udofia CV PDF"
                  className="w-full h-full border-0"
                />
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 font-sans">
                {/* Header Information */}
                <div className="border-b border-white/10 pb-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <div>
                      <h2 className="font-serif text-3xl sm:text-4xl text-bone">
                        {siteConfig.profile.fullName}
                      </h2>
                      <p className="mt-1 font-mono text-sm text-signal font-medium">
                        {siteConfig.profile.title}
                      </p>
                    </div>
                    <div className="text-right font-mono text-xs text-mist space-y-1">
                      <p>📍 {siteConfig.profile.location}</p>
                      <p>📞 {siteConfig.profile.phone}</p>
                      <p>✉ {siteConfig.links.email}</p>
                      <p>
                        <a
                          href={siteConfig.links.github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-signal hover:underline"
                        >
                          github.com/Keme28
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="mt-4 rounded border border-white/5 bg-graphite/40 p-4">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-signal font-semibold">
                      // PROFESSIONAL SUMMARY
                    </span>
                    <p className="mt-2 text-xs sm:text-sm text-bone/90 leading-relaxed font-sans">
                      {siteConfig.summary}
                    </p>
                  </div>
                </div>

                {/* Technical Skills */}
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-mist mb-3 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-signal rounded-full" />
                    TECHNICAL SKILLS &amp; CAPABILITIES
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="rounded border border-white/5 bg-graphite/50 p-3">
                      <span className="text-signal font-semibold uppercase text-[10px]">Languages</span>
                      <p className="mt-1 text-bone/90">{siteConfig.technicalSkills.languages.join(' · ')}</p>
                    </div>
                    <div className="rounded border border-white/5 bg-graphite/50 p-3">
                      <span className="text-phosphor font-semibold uppercase text-[10px]">Automation &amp; AI</span>
                      <p className="mt-1 text-bone/90">{siteConfig.technicalSkills.automation.join(' · ')}</p>
                    </div>
                    <div className="rounded border border-white/5 bg-graphite/50 p-3">
                      <span className="text-bone font-semibold uppercase text-[10px]">Data &amp; Infrastructure</span>
                      <p className="mt-1 text-bone/90">{siteConfig.technicalSkills.dataInfra.join(' · ')}</p>
                    </div>
                    <div className="rounded border border-white/5 bg-graphite/50 p-3">
                      <span className="text-mist font-semibold uppercase text-[10px]">Practices</span>
                      <p className="mt-1 text-bone/90">{siteConfig.technicalSkills.practices.join(' · ')}</p>
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-mist mb-4 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-signal rounded-full" />
                    PROFESSIONAL EXPERIENCE
                  </h3>
                  <div className="space-y-6">
                    {siteConfig.experience.map((exp) => (
                      <div key={exp.id} className="relative pl-5 border-l border-white/10 space-y-2">
                        <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-signal" />
                        
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h4 className="font-serif text-lg text-bone font-normal">
                            {exp.role}
                          </h4>
                          <span className="font-mono text-[11px] text-mist">{exp.period}</span>
                        </div>

                        <div className="flex items-center gap-2 font-mono text-xs text-signal">
                          <span>{exp.company}</span>
                          <span className="text-mist/50">·</span>
                          <span className="text-mist">{exp.location}</span>
                          {exp.status === 'CURRENT' && (
                            <span className="rounded bg-signal/15 px-1.5 py-0.5 text-[9px] text-signal font-semibold uppercase">
                              Active
                            </span>
                          )}
                        </div>

                        <ul className="space-y-1.5 text-xs text-bone/85 leading-relaxed list-disc list-outside ml-4">
                          {exp.bullets.map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects Feature from CV */}
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-mist mb-3 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-signal rounded-full" />
                    KEY PROJECT HIGHLIGHT
                  </h3>
                  <div className="rounded border border-white/5 bg-graphite/40 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-base text-bone">
                        EduNotify – School Portal Web Application
                      </h4>
                      <span className="font-mono text-[10px] text-signal uppercase tracking-wider">
                        Full-Stack / Vercel
                      </span>
                    </div>
                    <ul className="space-y-1 text-xs text-bone/85 list-disc list-outside ml-4">
                      <li>Designed and developed a full-stack school management portal using Next.js 15, TypeScript, Tailwind CSS, and Airtable as the backend.</li>
                      <li>Implemented secure server-side data fetching, role-based authentication (School Admin &amp; Parent), and a responsive modern UI.</li>
                      <li>Deployed the application on Vercel with environment variable protection for sensitive API keys.</li>
                    </ul>
                  </div>
                </div>

                {/* Education & Certifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-mist mb-3 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 bg-signal rounded-full" />
                      EDUCATION
                    </h3>
                    <div className="space-y-3">
                      {siteConfig.education.map((edu, idx) => (
                        <div key={idx} className="rounded border border-white/5 bg-graphite/40 p-3 space-y-1">
                          <h4 className="font-sans text-xs font-semibold text-bone">{edu.institution}</h4>
                          <p className="font-mono text-[11px] text-signal">{edu.degree}</p>
                          <p className="font-mono text-[10px] text-mist">{edu.location} · {edu.period}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-mist mb-3 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 bg-phosphor rounded-full" />
                      CERTIFICATIONS
                    </h3>
                    <div className="space-y-2">
                      {siteConfig.certifications.map((cert, idx) => (
                        <div key={idx} className="flex items-center gap-2 rounded border border-white/5 bg-graphite/40 p-3 font-mono text-xs text-bone">
                          <span className="text-phosphor font-bold">✓</span>
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-graphite/95 px-5 py-3 font-mono text-xs text-mist">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-phosphor" />
                <span>ORIGINAL CV ATTACHED · {siteConfig.profile.phone}</span>
              </div>
              <a
                href={siteConfig.links.resumePdf}
                target="_blank"
                rel="noreferrer"
                className="text-signal hover:underline flex items-center gap-1"
              >
                <span>Open in Full Browser Tab</span>
                <span>↗</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
