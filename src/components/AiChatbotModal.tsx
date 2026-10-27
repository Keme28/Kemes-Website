import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { queryKnowledgeBase } from '../content/chatbotKnowledge';

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  telemetry?: {
    ragDocs?: number;
    mcpTool?: string;
    latencyMs?: number;
  };
  followUps?: string[];
}

const PRESET_QUERIES = [
  "What is AI automation and how does it work?",
  "How can I contact Ukeme or hire him?",
  "Who is Ukeme and what is his background?",
  "What is the difference between traditional automation and AI automation?",
  "Explain your 40k+ doc RAG support agent architecture.",
  "What is Model Context Protocol (MCP) and why do you use it?",
  "How do you design an automation without brittle failures?",
  "What tools and languages are in Ukeme's tech stack?",
];

interface AiChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiChatbotModal: React.FC<AiChatbotModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'agent',
      text: "I am Keme's AI Automation Copilot.\n\nA chatbot is a classic automated system: instead of a human manually reading every inquiry, searching through documents, drafting a response, and typing replies, this system automatically ingests your question, semantically retrieves knowledge, formulates the answer, and dispatches it in seconds—operating 24/7 with zero human latency.\n\nAsk me anything about AI automation, systems architecture, or how to contact and work with Ukeme.",
      timestamp: 'NOW',
      telemetry: {
        ragDocs: 48,
        mcpTool: 'mcp://init/knowledge_index',
        latencyMs: 16,
      },
      followUps: [
        "What is AI automation and how does it work?",
        "How can I contact Ukeme or hire him?",
        "Who is Ukeme and what is his background?",
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isProcessing) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsProcessing(true);

    // Query our comprehensive intelligent knowledge base
    const match = queryKnowledgeBase(query);
    const latency = Math.floor(Math.random() * 180) + 210;

    setTimeout(() => {
      const agentMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'agent',
        text: match.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        telemetry: {
          ragDocs: match.docs,
          mcpTool: match.mcpTool,
          latencyMs: latency,
        },
        followUps: match.suggestedFollowUps,
      };
      setMessages((prev) => [...prev, agentMsg]);
      setIsProcessing(false);
    }, 550);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 lg:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-graphite/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          className="relative z-10 w-full max-w-3xl h-[88vh] flex flex-col rounded-[3px] border border-white/10 bg-ink text-bone shadow-2xl overflow-hidden font-mono"
          data-debug="framer: ai copilot modal"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-graphite px-5 py-3.5">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-signal shadow-signal-glow animate-pulse" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-semibold tracking-wider text-bone uppercase">
                    AI Automated Chatbot
                  </h3>
                  <span className="rounded bg-phosphor/10 px-1.5 py-0.5 text-[9px] text-phosphor uppercase font-medium">
                    ACTIVE
                  </span>
                </div>
                <p className="text-[10px] text-mist/70 font-sans mt-0.5">
                  Connected to verified knowledge base · Query AI automation, architectures &amp; contact info
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-mist/70 border border-white/10 px-2 py-1 rounded bg-ink">
                <span>WAT</span>
                <span className="text-signal">UTC+1</span>
              </div>
              <button
                onClick={onClose}
                className="rounded bg-white/5 px-2.5 py-1 text-xs text-mist hover:bg-white/10 hover:text-bone transition-colors"
                data-cursor="cta"
              >
                ✕ [ESC]
              </button>
            </div>
          </div>

          {/* Quick Notice Tagline */}
          <div className="border-b border-white/[0.06] bg-black/30 px-5 py-2 text-[11px] text-mist">
            <span className="text-bone/90">
              💡 “Check out my AI chatbot; ask this bot any question about AI automation.”
            </span>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 font-sans text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {/* Clean Message Timestamp */}
                <div className="font-mono text-[10px] text-mist/40 mb-1 px-1">
                  <span>{msg.timestamp}</span>
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[85%] rounded-[3px] p-4 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-signal text-white font-medium shadow-signal-glow/30'
                      : 'bg-graphite hairline-border text-bone/90 shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Follow-up Inquiry Chips */}
                  {msg.followUps && msg.followUps.length > 0 && (
                    <div className="mt-3.5 pt-2.5 border-t border-white/[0.08] flex flex-wrap gap-1.5">
                      <span className="font-mono text-[9px] text-mist/60 uppercase tracking-wider w-full mb-0.5">
                        Suggested follow-ups:
                      </span>
                      {msg.followUps.map((fu, fIdx) => (
                        <button
                          key={fIdx}
                          disabled={isProcessing}
                          onClick={() => handleSend(fu)}
                          className="rounded bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] font-sans text-mist hover:text-bone hover:border-signal/50 transition-colors disabled:opacity-50 text-left"
                        >
                          ↳ {fu}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Telemetry Footer on Agent Messages */}
                  {msg.telemetry && (
                    <div className="mt-3 pt-2.5 border-t border-white/10 font-mono text-[10px] text-mist flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-phosphor font-semibold">✓ RAG: {msg.telemetry.ragDocs} chunks</span>
                        <span>·</span>
                        <span className="text-bone/70 truncate max-w-[200px]">{msg.telemetry.mcpTool}</span>
                      </div>
                      <span className="text-signal">{msg.telemetry.latencyMs}ms</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isProcessing && (
              <div className="flex flex-col items-start space-y-1">
                <span className="font-mono text-[10px] text-signal animate-pulse">
                  EXECUTING RAG EMBEDDING SEARCH &amp; MCP TOOL QUERY...
                </span>
                <div className="rounded-[3px] bg-graphite hairline-border px-4 py-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-signal animate-bounce [animation-delay:0.15s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-signal animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Preset Prompts Shelf */}
          <div className="border-t border-white/[0.06] bg-graphite/40 px-5 py-2.5 overflow-x-auto whitespace-nowrap space-x-2 scrollbar-none">
            <span className="font-mono text-[10px] text-mist/60 uppercase tracking-wider mr-1">
              QUICK INQUIRIES:
            </span>
            {PRESET_QUERIES.map((q, idx) => (
              <button
                key={idx}
                disabled={isProcessing}
                onClick={() => handleSend(q)}
                className="inline-block rounded border border-white/10 bg-ink px-2.5 py-1 text-[11px] font-sans text-mist hover:text-bone hover:border-signal/50 transition-colors disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="border-t border-white/10 bg-graphite p-3 sm:p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-signal text-xs">
                  &gt;
                </span>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about AI automation, how to contact Ukeme, projects, RAG, or MCP..."
                  className="w-full rounded-[2px] border border-white/10 bg-ink pl-8 pr-4 py-2.5 text-xs text-bone font-mono outline-none focus:border-signal placeholder:text-mist/40 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={!inputValue.trim() || isProcessing}
                className="rounded bg-signal px-5 py-2.5 font-mono text-xs font-semibold text-white hover:bg-signal/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-signal-glow"
                data-cursor="cta"
              >
                EXECUTE ↵
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
