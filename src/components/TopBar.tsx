import React, { useEffect, useState } from 'react';
import { siteConfig } from '../content/site';
import { useLenis } from './SmoothScroll';

interface TopBarProps {
  onReplayIntro?: () => void;
  onOpenCommandPalette?: () => void;
  onOpenChatbot?: () => void;
  currentStep?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  onReplayIntro,
  onOpenCommandPalette,
  onOpenChatbot,
  currentStep = '01/10',
}) => {
  const { scrollTo } = useLenis();
  const [lagosTime, setLagosTime] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Live Lagos local time ticker
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Africa/Lagos',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        setLagosTime(formatter.format(now));
      } catch (err) {
        setLagosTime('14:45:00');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll progress listener
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) {
        setScrollProgress(0);
        return;
      }
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollTo(href);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-graphite/80 backdrop-blur-md hairline-border-b"
        data-debug="gsap: header pin"
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Monogram and Status */}
          <div className="flex items-center gap-4">
            <button
              onClick={onReplayIntro}
              title="Click to re-run execution sequence"
              className="group flex items-center gap-1.5 rounded bg-ink px-2.5 py-1 text-xs font-mono font-medium text-bone hairline-border transition-all hover:border-signal hover:text-signal"
              data-cursor="cta"
            >
              <span className="text-signal transition-transform group-hover:scale-110">▶</span>
              <span className="tracking-widest font-semibold">KM_</span>
              <span className="hidden sm:inline text-[10px] text-mist group-hover:text-signal/80">
                [REPLAY]
              </span>
            </button>

            {/* Chatbot Action Trigger (replaces Available for Q4/Q1 pill) */}
            <button
              onClick={() => {
                if (onOpenChatbot) onOpenChatbot();
                window.dispatchEvent(new CustomEvent('open-chatbot-modal'));
              }}
              title="Click to open Keme's Automated Chatbot"
              className="flex items-center gap-2 rounded-full border border-white/10 bg-ink/70 hover:border-signal/70 hover:bg-signal/10 px-3 py-1 text-[11px] font-mono text-mist hover:text-bone transition-all shadow-sm group"
              data-cursor="cta"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-signal" />
              </span>
              <span className="text-bone font-medium group-hover:text-signal transition-colors">
                Chatbot
              </span>
              <span className="hidden sm:inline text-mist/60 text-[10px]">
                [ASK ME]
              </span>
            </button>
          </div>

          {/* Center: Numbered Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 text-[12px] font-mono tracking-wider">
            {siteConfig.navigation.map((item) => (
              <a
                key={item.number}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="group flex items-center gap-1.5 text-mist transition-colors hover:text-bone"
                data-cursor="cta"
              >
                <span className="text-[10px] text-mist/60 group-hover:text-signal">
                  ({item.number})
                </span>
                <span className="uppercase">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Right: Local time, Command Palette hint, CV CTA */}
          <div className="flex items-center gap-3">
            {/* Lagos Live Local Time */}
            <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-mist hairline-border px-2 py-0.5 rounded bg-ink/40">
              <span className="text-[10px] text-mist/70">LAGOS (WAT)</span>
              <span className="text-bone font-medium">{lagosTime || '14:45:00'}</span>
            </div>

            {/* ⌘K Command Palette trigger */}
            <button
              onClick={onOpenCommandPalette}
              title="Open command palette (⌘K or /)"
              className="flex items-center gap-1 rounded bg-white/[0.04] px-2 py-1 font-mono text-[11px] text-mist hover:bg-white/[0.08] hover:text-bone transition-colors"
              data-cursor="cta"
            >
              <span className="text-signal text-[10px]">⌘</span>
              <span>K</span>
            </button>

            {/* CV Download / View */}
            <a
              href="#cv"
              onClick={(e) => {
                e.preventDefault();
                const cvEvent = new CustomEvent('open-cv-modal');
                window.dispatchEvent(cvEvent);
              }}
              className="group flex items-center gap-1.5 rounded bg-bone px-3 py-1 text-xs font-mono font-medium text-graphite transition-all hover:bg-signal hover:text-white"
              data-cursor="cta"
            >
              <span>Résumé</span>
              <span className="transition-transform group-hover:translate-y-0.5">↓</span>
            </a>
          </div>
        </div>

        {/* Thin Signal scroll-progress line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white/5">
          <div
            className="h-full bg-signal transition-all duration-75 ease-out shadow-[0_0_8px_#FF4F1F]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Floating Side Rail indicating Current Step */}
      <aside
        className="fixed right-4 bottom-8 z-40 hidden xl:flex flex-col items-end gap-2 font-mono text-[10px] text-mist"
        data-debug="framer: side rail"
      >
        <div className="flex items-center gap-2 rounded bg-graphite/90 px-2.5 py-1 hairline-border backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
          <span className="tracking-widest text-mist">EXECUTION STAGE:</span>
          <span className="text-bone font-semibold">{currentStep}</span>
        </div>
        <div className="h-16 w-[1px] bg-white/10 mr-4" />
      </aside>
    </>
  );
};
