import React, { useState, useEffect } from 'react';
import { SmoothScroll } from './components/SmoothScroll';
import { GridBackground } from './components/GridBackground';
import { CustomCursor } from './components/CustomCursor';
import { TopBar } from './components/TopBar';
import { IntroGate } from './components/IntroGate';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { JourneySection } from './components/JourneySection';
import { WorkSection } from './components/WorkSection';
import { ToolboxSection } from './components/ToolboxSection';
import { HowIThinkSection } from './components/HowIThinkSection';
import { SimpleAutomationSection } from './components/SimpleAutomationSection';
import { WorkWithMeSection } from './components/WorkWithMeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { AiChatbotModal } from './components/AiChatbotModal';
import { CvModal } from './components/CvModal';
import { CommandPalette } from './components/CommandPalette';
import { DebugOverlay } from './components/DebugOverlay';
import { ProjectItem } from './content/site';

export const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState('01/10 // TRIGGER');
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [forcePlayIntro, setForcePlayIntro] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // Listen for custom modal events
  useEffect(() => {
    const handleOpenCv = () => setIsCvOpen(true);
    const handleOpenChat = () => setIsChatbotOpen(true);
    window.addEventListener('open-cv-modal', handleOpenCv);
    window.addEventListener('open-chatbot-modal', handleOpenChat);
    return () => {
      window.removeEventListener('open-cv-modal', handleOpenCv);
      window.removeEventListener('open-chatbot-modal', handleOpenChat);
    };
  }, []);

  const handleReplayIntro = () => {
    sessionStorage.removeItem('has_executed_intro');
    setForcePlayIntro(true);
    setIsIntroComplete(false);
  };

  const handleIntroComplete = () => {
    setIsIntroComplete(true);
    setForcePlayIntro(false);
  };

  // Track current execution step dynamically on scroll
  useEffect(() => {
    const handleScrollStep = () => {
      const scrollY = window.scrollY;
      const aboutEl = document.getElementById('about');
      const journeyEl = document.getElementById('journey');
      const workEl = document.getElementById('work');
      const toolboxEl = document.getElementById('toolbox');
      const principlesEl = document.getElementById('principles');
      const liveAutoEl = document.getElementById('live-automation');
      const servicesEl = document.getElementById('services');
      const contactEl = document.getElementById('contact');

      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 80) {
        setCurrentStep('10/10 // COMPLETE');
      } else if (contactEl && scrollY >= contactEl.offsetTop - 300) {
        setCurrentStep('09/10 // CONTACT');
      } else if (servicesEl && scrollY >= servicesEl.offsetTop - 300) {
        setCurrentStep('08/10 // ENGAGEMENT');
      } else if (liveAutoEl && scrollY >= liveAutoEl.offsetTop - 300) {
        setCurrentStep('07/10 // LIVE AUTOMATION');
      } else if (principlesEl && scrollY >= principlesEl.offsetTop - 300) {
        setCurrentStep('06/10 // PRINCIPLES');
      } else if (toolboxEl && scrollY >= toolboxEl.offsetTop - 300) {
        setCurrentStep('05/10 // TOOLBOX');
      } else if (workEl && scrollY >= workEl.offsetTop - 300) {
        setCurrentStep('04/10 // SELECTED WORK');
      } else if (journeyEl && scrollY >= journeyEl.offsetTop - 300) {
        setCurrentStep('03/10 // JOURNEY');
      } else if (aboutEl && scrollY >= aboutEl.offsetTop - 300) {
        setCurrentStep('02/10 // SPECIFICATION');
      } else {
        setCurrentStep('01/10 // TRIGGER');
      }
    };

    window.addEventListener('scroll', handleScrollStep, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollStep);
  }, []);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-graphite text-bone selection:bg-signal selection:text-white">
        {/* Film grain and vignette overlays */}
        <div className="film-grain" />
        <div className="vignette-overlay" />

        {/* 2D Canvas Interactive Grid Background */}
        <GridBackground />

        {/* Custom Spring Morphing Cursor */}
        <CustomCursor />

        {/* System Easter Egg: Debug View toggled via 'D' */}
        <DebugOverlay />

        {/* Fixed Top Bar */}
        <TopBar
          onReplayIntro={handleReplayIntro}
          onOpenCommandPalette={() => setIsCommandOpen(true)}
          onOpenChatbot={() => setIsChatbotOpen(true)}
          currentStep={currentStep}
        />

        {/* Intro Gate (Executes once per session, max 4s, skippable) */}
        <IntroGate
          onComplete={handleIntroComplete}
          forcePlay={forcePlayIntro}
        />

        {/* Main Content Sections */}
        <main className="relative z-10 flex flex-col">
          {/* Section 01: Hero (Trigger) */}
          <HeroSection onOpenCv={() => setIsCvOpen(true)} />

          {/* Section 02: About (Bone paper scrub + sticky spec + word scrub) */}
          <AboutSection />

          {/* Section 03: Journey (Self-drawing SVG wire + traveling pulse + expanding nodes) */}
          <JourneySection />

          {/* Section 04: Work (Desktop horizontal pinned scroll / mobile stack) */}
          <WorkSection
            onSelectProject={(project) => setSelectedProject(project)}
            onOpenChatbot={() => setIsChatbotOpen(true)}
          />

          {/* Section 05: Toolbox (Two opposing marquees with hover pause & colorize) */}
          <ToolboxSection />

          {/* Section 06: How I Think (Draggable handwritten sticky notes with spring physics) */}
          <HowIThinkSection />

          {/* Section 07: Simple Live Automation (Interactive 3-step intake & triage engine) */}
          <SimpleAutomationSection />

          {/* Section 08: Work With Me (3 engagement blueprints with execution steps) */}
          <WorkWithMeSection />

          {/* Section 09: Contact ("Say hi, watch it run" Webhook Dispatcher) */}
          <ContactSection />
        </main>

        {/* Section 10: Footer (Execution Complete Telemetry, Links, Re-Run Trigger) */}
        <Footer onReplayIntro={handleReplayIntro} />

        {/* Full-Screen Case Study Route Modal */}
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(next) => setSelectedProject(next)}
        />

        {/* Live Interactive AI Automation Copilot (RAG + MCP) */}
        <AiChatbotModal
          isOpen={isChatbotOpen}
          onClose={() => setIsChatbotOpen(false)}
        />

        {/* Global Interactive Résumé / CV Modal */}
        <CvModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />

        {/* Command Palette (⌘K or /) */}
        <CommandPalette
          isOpen={isCommandOpen}
          setIsOpen={setIsCommandOpen}
          onOpenCv={() => setIsCvOpen(true)}
          onReplayIntro={handleReplayIntro}
        />
      </div>
    </SmoothScroll>
  );
};

export default App;
