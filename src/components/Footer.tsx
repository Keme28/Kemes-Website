import React, { useEffect, useState } from 'react';
import { siteConfig } from '../content/site';
import { useLenis } from './SmoothScroll';
import { WatchMeAutomate } from './WatchMeAutomate';

interface FooterProps {
  onReplayIntro: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplayIntro }) => {
  const { scrollTo } = useLenis();
  const [pageLoadTime, setPageLoadTime] = useState<number>(380);

  useEffect(() => {
    // Calculate realistic client page load timing
    const calcLoadTime = () => {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      if (nav && nav.loadEventEnd > 0) {
        setPageLoadTime(Math.round(nav.loadEventEnd - nav.startTime));
      } else {
        setPageLoadTime(Math.round(performance.now()));
      }
    };

    if (document.readyState === 'complete') {
      calcLoadTime();
    } else {
      window.addEventListener('load', calcLoadTime);
      return () => window.removeEventListener('load', calcLoadTime);
    }
  }, []);

  const handleRerunTrigger = () => {
    scrollTo('#hero');
    setTimeout(() => {
      onReplayIntro();
    }, 400);
  };

  return (
    <footer
      className="relative w-full border-t border-white/10 bg-graphite text-bone py-16 px-4 sm:px-6 lg:px-8 font-mono"
      data-debug="gsap: footer status"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Row: Execution Complete Status + Re-Run Trigger Button */}
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/[0.08] pb-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-phosphor shadow-phosphor-glow animate-pulse" />
              <span className="text-sm sm:text-base font-bold text-phosphor tracking-wider uppercase">
                EXECUTION COMPLETE ✓
              </span>
            </div>
            <p className="text-xs text-mist">
              Telemetry: Page loaded in <span className="text-bone font-semibold">{pageLoadTime}ms</span> · 0 dropped packets · 10/10 nodes armed
            </p>
          </div>

          <button
            onClick={handleRerunTrigger}
            className="group flex items-center gap-2 rounded bg-ink hairline-border px-5 py-2.5 text-xs text-bone hover:border-signal hover:text-signal transition-all shadow-md"
            data-cursor="cta"
          >
            <span className="text-signal transition-transform group-hover:rotate-180 duration-500">↺</span>
            <span className="font-semibold uppercase tracking-wider">RE-RUN FROM TRIGGER</span>
          </button>
        </div>

        {/* Watch Me Automate — Google Drive Video Archive */}
        <WatchMeAutomate />

        {/* Middle Row: Monogram, Nav Links, and Socials */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Monogram and Statement (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="rounded bg-signal px-2 py-0.5 text-xs font-bold text-white">
                KM_
              </span>
              <span className="font-serif text-xl text-bone">
                {siteConfig.profile.fullName}
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-mist max-w-sm leading-relaxed">
              Software programmer and AI automation specialist based in Lagos, Nigeria. Building web applications with automation engineered directly into the core.
            </p>
          </div>

          {/* Quick Section Nav (3 cols) */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <span className="text-[10px] uppercase text-mist/60 tracking-widest block mb-2">
              // CANVASES
            </span>
            <ul className="space-y-1.5 text-mist">
              {siteConfig.navigation.map((n) => (
                <li key={n.number}>
                  <a
                    href={n.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(n.href);
                    }}
                    className="hover:text-signal transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[10px] text-mist/50">({n.number})</span>
                    <span>{n.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Verified Links (4 cols) */}
          <div className="md:col-span-4 space-y-2 text-xs">
            <span className="text-[10px] uppercase text-mist/60 tracking-widest block mb-2">
              // CHANNELS &amp; VERIFICATION
            </span>
            <div className="space-y-2">
              <a
                href={`mailto:${siteConfig.links.email}`}
                className="block text-mist hover:text-bone transition-colors truncate"
              >
                ✉ {siteConfig.links.email}
              </a>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="block text-mist hover:text-bone transition-colors"
              >
                ⌥ GitHub (@Keme28) ↗
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="block text-mist hover:text-bone transition-colors"
              >
                ⌘ LinkedIn Profile ↗
              </a>
              <a
                href={siteConfig.links.resumePdf}
                target="_blank"
                rel="noreferrer"
                className="block text-signal hover:underline"
              >
                ↓ Curriculum Vitae (PDF)
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row: Lagos Local Time & Copyright */}
        <div className="border-t border-white/[0.08] pt-8 flex flex-wrap items-center justify-between gap-4 text-[11px] text-mist/60">
          <div>
            © {new Date().getFullYear()} {siteConfig.profile.fullName}. Machine precision × Human warmth.
          </div>
          <div className="flex items-center gap-2">
            <span>LAGOS, NIGERIA (WAT UTC+1)</span>
            <span>·</span>
            <span className="text-signal">STATUS: PRODUCTION ACTIVE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
