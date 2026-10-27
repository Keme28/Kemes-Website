import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ProjectItem } from '../content/site';

interface ArchitectureDiagramProps {
  project: ProjectItem;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ project }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const wiresRef = useRef<(SVGPathElement | null)[]>([]);
  const pulsesRef = useRef<(SVGCircleElement | null)[]>([]);

  const { nodes, edges } = project.architecture;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw wires with staggered ease
      wiresRef.current.forEach((wire, idx) => {
        if (!wire) return;
        const length = wire.getTotalLength();
        gsap.set(wire, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(wire, {
          strokeDashoffset: 0,
          duration: 1.0,
          delay: idx * 0.25 + 0.3,
          ease: 'power2.inOut',
        });
      });

      // Animate continuous pulse along edges
      pulsesRef.current.forEach((pulse, idx) => {
        const wire = wiresRef.current[idx];
        if (!pulse || !wire) return;
        const length = wire.getTotalLength();

        gsap.to(
          {},
          {
            duration: 2.2,
            repeat: -1,
            delay: idx * 0.4 + 0.6,
            ease: 'linear',
            onUpdate: function () {
              const progress = this.progress();
              const pt = wire.getPointAtLength(progress * length);
              pulse.setAttribute('cx', String(pt.x));
              pulse.setAttribute('cy', String(pt.y));
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [project]);

  const handleSimulate = () => {
    setIsSimulating(true);
    // Flash each node in sequence
    nodes.forEach((node, idx) => {
      setTimeout(() => {
        setSelectedNodeId(node.id);
        if (idx === nodes.length - 1) {
          setTimeout(() => {
            setIsSimulating(false);
          }, 1000);
        }
      }, idx * 600);
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-[3px] border border-white/10 bg-graphite p-6 sm:p-8 font-mono overflow-hidden shadow-2xl"
      data-debug="gsap: architecture diagram"
    >
      {/* Header bar of Diagram */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-signal shadow-signal-glow animate-pulse" />
          <span className="text-xs font-semibold tracking-wider text-bone uppercase">
            ANIMATED ARCHITECTURE TOPOLOGY // {project.slug.toUpperCase()}
          </span>
          <span className="hidden sm:inline text-[10px] text-mist/60">
            · {nodes.length} NODES · {edges.length} PIPELINES
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="flex items-center gap-1.5 rounded bg-signal/15 border border-signal/40 px-3 py-1 text-[11px] font-semibold text-signal hover:bg-signal hover:text-white transition-all disabled:opacity-50"
            data-cursor="cta"
          >
            <span>▶</span>
            <span>{isSimulating ? 'EXECUTING PIPELINE...' : 'TRIGGER FLOW SIMULATION'}</span>
          </button>
        </div>
      </div>

      {/* SVG Canvas for Nodes and Wires */}
      <div className="relative w-full min-h-[300px] sm:min-h-[340px] flex items-center justify-center bg-ink/40 rounded border border-white/[0.04] p-4 overflow-x-auto">
        {/* Connection Wires SVG Layer */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF4F1F" />
              <stop offset="100%" stopColor="#B6FF5C" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Render Edges */}
          {edges.map((edge, idx) => {
            const fromNode = nodes.find((n) => n.id === edge.from);
            const toNode = nodes.find((n) => n.id === edge.to);
            if (!fromNode || !toNode) return null;

            // Generate bezier curve path
            const dx = toNode.x - fromNode.x;
            const pathData = `M ${fromNode.x} ${fromNode.y} C ${fromNode.x + dx * 0.5} ${fromNode.y}, ${toNode.x - dx * 0.5} ${toNode.y}, ${toNode.x} ${toNode.y}`;

            return (
              <g key={`${edge.from}-${edge.to}`}>
                {/* Background hairline wire */}
                <path
                  d={pathData}
                  stroke="rgba(255, 255, 255, 0.12)"
                  strokeWidth="1.2"
                  fill="none"
                  strokeDasharray="2 2"
                />

                {/* Animated colored wire */}
                <path
                  ref={(el) => (wiresRef.current[idx] = el)}
                  d={pathData}
                  stroke="#FF4F1F"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Animated Data Pulse */}
                <circle
                  ref={(el) => (pulsesRef.current[idx] = el)}
                  cx={fromNode.x}
                  cy={fromNode.y}
                  r="2.5"
                  fill="#FF4F1F"
                  filter="url(#glow)"
                />
              </g>
            );
          })}
        </svg>

        {/* Nodes Layer */}
        <div className="relative w-full h-[280px]">
          {nodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            let borderColor = 'border-white/15';
            let badgeColor = 'text-mist bg-white/5';
            let tag = 'STEP';

            if (node.type === 'trigger') {
              borderColor = 'border-signal';
              badgeColor = 'text-signal bg-signal/15';
              tag = 'TRIGGER';
            } else if (node.type === 'ai') {
              borderColor = 'border-phosphor';
              badgeColor = 'text-phosphor bg-phosphor/15';
              tag = 'NEURAL AGENT';
            } else if (node.type === 'database') {
              borderColor = 'border-bone';
              badgeColor = 'text-bone bg-white/10';
              tag = 'VECTOR / DB';
            } else if (node.type === 'action') {
              borderColor = 'border-signal/70';
              badgeColor = 'text-signal bg-signal/10';
              tag = 'DISPATCH';
            }

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className={`absolute z-10 cursor-pointer rounded-[3px] bg-ink border p-3.5 shadow-xl transition-all duration-300 hover:scale-105 ${borderColor} ${
                  isSelected ? 'ring-2 ring-signal scale-105 shadow-signal-glow' : ''
                }`}
                data-cursor="view"
              >
                {/* 4 Port dots on node */}
                <span className="node-port node-port-left" />
                <span className="node-port node-port-right" />

                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className={`text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded ${badgeColor}`}>
                    {tag}
                  </span>
                  <span className="text-[9px] text-mist/60">{node.id}</span>
                </div>

                <div className="text-xs font-semibold text-bone whitespace-nowrap">
                  {node.label}
                </div>

                <div className="mt-1 flex items-center gap-2 text-[10px] text-mist/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-phosphor animate-ping" />
                  <span>200 OK · &lt; 2ms</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Telemetry Inspector */}
      <div className="mt-4 rounded border border-white/[0.06] bg-ink/70 p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-mist">
        <div className="flex items-center gap-2">
          <span className="text-signal font-semibold">// INSPECT PAYLOAD:</span>
          <span className="text-bone">
            {selectedNodeId
              ? `Node [${selectedNodeId}] · Verified JSON Schema · Type: ${nodes.find((n) => n.id === selectedNodeId)?.type.toUpperCase()}`
              : 'Hover or click any architecture node above to inspect its payload specification.'}
          </span>
        </div>
        <span className="text-[10px] text-phosphor">HEALTH: NOMINAL</span>
      </div>
    </div>
  );
};
