import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { siteConfig } from '../content/site';
import { useLenis } from './SmoothScroll';

interface CommandPaletteProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onOpenCv: () => void;
  onReplayIntro: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  setIsOpen,
  onOpenCv,
  onReplayIntro,
}) => {
  const { scrollTo } = useLenis();
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger slash if typing in an input
      const target = e.target as HTMLElement | null;
      const isInput =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      } else if (e.key === '/' && !isInput) {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.links.email);
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
      setIsOpen(false);
    }, 1200);
  };

  const handleNavigate = (hash: string) => {
    setIsOpen(false);
    scrollTo(hash);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-graphite/80 backdrop-blur-md"
        onClick={() => setIsOpen(false)}
      />

      {/* CMDK Dialog */}
      <div
        className="relative w-full max-w-xl rounded-md border border-white/10 bg-ink text-bone shadow-2xl overflow-hidden font-mono z-10"
        data-debug="cmdk: palette"
      >
        <Command label="Command Palette" className="w-full">
          {/* Search Input Bar */}
          <div className="flex items-center border-b border-white/10 px-4 py-3">
            <span className="text-signal mr-3 font-mono text-sm">&gt;</span>
            <Command.Input
              autoFocus
              placeholder="Type a command or jump to node..."
              className="w-full bg-transparent text-sm text-bone outline-none placeholder:text-mist/50 font-mono"
            />
            <kbd className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-mist">ESC</kbd>
          </div>

          {/* Command List */}
          <Command.List className="max-h-80 overflow-y-auto p-2 text-xs">
            <Command.Empty className="p-4 text-center text-mist">
              No matching commands found.
            </Command.Empty>

            <Command.Group heading="Navigation Nodes" className="px-2 py-1.5 text-[10px] text-mist/60 uppercase tracking-widest">
              {siteConfig.navigation.map((item) => (
                <Command.Item
                  key={item.number}
                  onSelect={() => handleNavigate(item.href)}
                  className="flex cursor-pointer items-center justify-between rounded px-3 py-2 text-bone aria-selected:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-signal font-semibold">({item.number})</span>
                    <span>Jump to {item.label}</span>
                  </div>
                  <span className="text-[10px] text-mist">{item.href}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="System Actions" className="mt-2 px-2 py-1.5 text-[10px] text-mist/60 uppercase tracking-widest border-t border-white/5">
              <Command.Item
                onSelect={() => {
                  setIsOpen(false);
                  window.dispatchEvent(new CustomEvent('open-chatbot-modal'));
                }}
                className="flex cursor-pointer items-center justify-between rounded px-3 py-2 text-bone aria-selected:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                  <span>Launch Live AI Automation Copilot (RAG + MCP)</span>
                </div>
                <span className="text-signal text-[10px]">[AGENT]</span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  setIsOpen(false);
                  onOpenCv();
                }}
                className="flex cursor-pointer items-center justify-between rounded px-3 py-2 text-bone aria-selected:bg-white/10 transition-colors"
              >
                <span>View Full Curriculum Vitae (Résumé)</span>
                <span className="text-signal text-[10px]">[SPEC]</span>
              </Command.Item>

              <Command.Item
                onSelect={handleCopyEmail}
                className="flex cursor-pointer items-center justify-between rounded px-3 py-2 text-bone aria-selected:bg-white/10 transition-colors"
              >
                <span>{copiedEmail ? "✓ Copied to Clipboard!" : `Copy Email (${siteConfig.links.email})`}</span>
                <span className="text-mist text-[10px]">{copiedEmail ? "SUCCESS" : "CLIPBOARD"}</span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  setIsOpen(false);
                  onReplayIntro();
                }}
                className="flex cursor-pointer items-center justify-between rounded px-3 py-2 text-bone aria-selected:bg-white/10 transition-colors"
              >
                <span>Re-execute System Intro Gate</span>
                <span className="text-signal text-[10px]">[BOOT]</span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  setIsOpen(false);
                  const isCurrentlyDebug = document.documentElement.classList.toggle('debug-view');
                  window.dispatchEvent(new CustomEvent('debug-toggle', { detail: isCurrentlyDebug }));
                }}
                className="flex cursor-pointer items-center justify-between rounded px-3 py-2 text-bone aria-selected:bg-white/10 transition-colors"
              >
                <span>Toggle Internal Debug View [D]</span>
                <span className="text-phosphor text-[10px]">DEBUG_SYS</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="External Channels" className="mt-2 px-2 py-1.5 text-[10px] text-mist/60 uppercase tracking-widest border-t border-white/5">
              <Command.Item
                onSelect={() => window.open(siteConfig.links.github, '_blank')}
                className="flex cursor-pointer items-center justify-between rounded px-3 py-2 text-bone aria-selected:bg-white/10 transition-colors"
              >
                <span>GitHub ({siteConfig.links.githubHandle})</span>
                <span className="text-mist text-[10px]">↗</span>
              </Command.Item>

              <Command.Item
                onSelect={() => window.open(siteConfig.links.linkedin, '_blank')}
                className="flex cursor-pointer items-center justify-between rounded px-3 py-2 text-bone aria-selected:bg-white/10 transition-colors"
              >
                <span>LinkedIn Profile</span>
                <span className="text-mist text-[10px]">↗</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          {/* Palette Footer */}
          <div className="flex items-center justify-between border-t border-white/10 bg-graphite px-4 py-2 text-[10px] text-mist/70">
            <span>Navigate: ↑ ↓ · Select: ↵</span>
            <span className="text-signal">UKEME_ENGINE // v1.0.0</span>
          </div>
        </Command>
      </div>
    </div>
  );
};
