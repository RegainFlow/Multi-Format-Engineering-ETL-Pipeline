import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Icon } from './Icons';

// Mock data for sources
const SOURCES = [
    { id: 's3', name: 'S3 Bucket', sub: 'raw-documents', icon: 'Database', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { id: 'sql', name: 'PostgreSQL', sub: 'client_records', icon: 'Database', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { id: 'api', name: 'REST API', sub: 'webhook_v2', icon: 'Activity', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
];

const PIPELINE_NODES = [
    { id: 'convert', name: 'PDF Converter', tech: 'C# Lib', icon: 'FileText' },
    { id: 'parse', name: 'Intell. Parser', tech: 'Python', icon: 'Code' },
    { id: 'nlp', name: 'NLP Processor', tech: 'LangChain', icon: 'Brain' },
    { id: 'index', name: 'Search Index', tech: 'Elastic', icon: 'Search' },
];

const PipelineVisualizer: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [sourcePaths, setSourcePaths] = useState<Array<{ id: string; start: { x: number; y: number }; end: { x: number; y: number; } }>>([]);
    const [nodePaths, setNodePaths] = useState<Array<{ id: string; start: { x: number; y: number }; end: { x: number; y: number; } }>>([]);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const sourceConnectorRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const nodeInputRefs = useRef<Array<HTMLDivElement | null>>([]);
    const nodeOutputRefs = useRef<Array<HTMLDivElement | null>>([]);

    const getCenter = (el: HTMLElement | null, containerRect: DOMRect | null) => {
        if (!el || !containerRect) return null;
        const rect = el.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.top + rect.height / 2 - containerRect.top,
        };
    };

    const refreshPaths = () => {
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (!containerRect) return;

        const firstNodeInput = nodeInputRefs.current[0] || null;
        const firstNodeInputCenter = getCenter(firstNodeInput, containerRect);

        // Map source connector to first pipeline node input
        const computedSourcePaths = SOURCES.map((source) => {
            const start = getCenter(sourceConnectorRefs.current[source.id], containerRect);
            if (!start || !firstNodeInputCenter) return null;
            return { id: source.id, start, end: firstNodeInputCenter };
        }).filter(Boolean) as Array<{ id: string; start: { x: number; y: number }; end: { x: number; y: number; } }>;

        setSourcePaths(computedSourcePaths);

        // Map pipeline node outputs to next node inputs
        const computedNodePaths = PIPELINE_NODES.map((node, index) => {
            const output = nodeOutputRefs.current[index];
            const nextInput = nodeInputRefs.current[index + 1];
            if (!output || !nextInput) return null;

            const start = getCenter(output, containerRect);
            const end = getCenter(nextInput, containerRect);
            if (!start || !end) return null;

            return { id: node.id, start, end };
        }).filter(Boolean) as Array<{ id: string; start: { x: number; y: number }; end: { x: number; y: number }; }>;

        setNodePaths(computedNodePaths);
    };

    // Simulation Loop
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % (PIPELINE_NODES.length + 1));
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    // Recompute paths when layout changes
    useLayoutEffect(() => {
        const handleResize = () => {
            window.requestAnimationFrame(refreshPaths);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Recompute on active step (scale changes when active)
    useEffect(() => {
        refreshPaths();
    }, [activeStep]);

    return (
        <div className="w-full overflow-x-auto custom-scrollbar pb-6 pt-2">
            {/* Container with min-width to ensure layout integrity */}
            <div ref={containerRef} className="min-w-[1000px] flex items-center p-8 relative min-h-[400px]">

                {/* SVG Layer for Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                            <stop offset="100%" stopColor="#00d6cb" />
                        </linearGradient>
                    </defs>

                    {/* Draw lines from Sources to Converter */}
                    {sourcePaths.map((path) => {
                        const { start, end } = path;
                        const curveOffset = Math.max(40, Math.abs(end.x - start.x) * 0.35);

                        // Simulation: Active if step is 0 (Source -> Node 1)
                        const isFlowing = activeStep === 0;

                        return (
                            <g key={path.id}>
                                {/* Base Line */}
                                <path
                                    d={`M ${start.x} ${start.y} C ${start.x + curveOffset} ${start.y}, ${end.x - curveOffset} ${end.y}, ${end.x} ${end.y}`}
                                    fill="none"
                                    stroke={isFlowing ? "url(#lineGradient)" : "rgba(255,255,255,0.1)"}
                                    strokeWidth={isFlowing ? "2" : "1"}
                                    strokeOpacity={isFlowing ? "1" : "0.3"}
                                    className="transition-all duration-500"
                                />
                                {/* Animated Flow Particle */}
                                {isFlowing && (
                                    <circle r="3" fill="#00d6cb">
                                        <animateMotion
                                            dur="1.5s"
                                            repeatCount="indefinite"
                                            path={`M ${start.x} ${start.y} C ${start.x + curveOffset} ${start.y}, ${end.x - curveOffset} ${end.y}, ${end.x} ${end.y}`}
                                        />
                                    </circle>
                                )}
                            </g>
                        );
                    })}

                    {/* Draw lines between pipeline nodes */}
                    {nodePaths.map((path, index) => {
                        const { start, end } = path;
                        const isFlowing = activeStep === index + 1;

                        return (
                            <g key={`pipe-${index}`}>
                                <path
                                    d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`}
                                    stroke={isFlowing ? "#00d6cb" : "rgba(255,255,255,0.1)"}
                                    strokeWidth={isFlowing ? "2" : "1"}
                                    strokeDasharray="4 4"
                                    className="transition-all duration-300"
                                />
                                {isFlowing && (
                                    <circle r="3" fill="#00d6cb">
                                        <animateMotion
                                            dur="1s"
                                            repeatCount="indefinite"
                                            path={`M ${start.x} ${start.y} L ${end.x} ${end.y}`}
                                        />
                                    </circle>
                                )}
                            </g>
                        );
                    })}
                </svg>

                {/* Column 1: Sources */}
                <div className="flex flex-col gap-6 w-[220px] relative z-10 mr-16">
                    <h3 className="text-gray-400 text-xs font-mono uppercase mb-2 pl-2">Ingestion Sources</h3>

                    {SOURCES.map((source, index) => {
                        const isActive = activeStep === 0;
                        return (
                            <div key={source.id} className={`glass-card p-4 flex items-center gap-3 border transition-all duration-500 hover:scale-105 cursor-pointer group ${isActive ? 'border-primary/50 shadow-[0_0_15px_rgba(0,214,203,0.15)]' : source.border}`}>
                                <div className={`p-2 rounded-lg ${source.bg} ${source.color}`}>
                                    <Icon name={source.icon} size={18} />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-200">{source.name}</div>
                                    <div className="text-xs text-gray-500 font-mono">{source.sub}</div>
                                </div>
                                {/* Connector Dot */}
                                <div
                                    ref={(el) => {
                                        sourceConnectorRefs.current[source.id] = el;
                                    }}
                                    className={`absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border transition-colors duration-500 ${isActive ? 'bg-primary border-primary' : 'bg-gray-700 border-gray-500'}`}
                                ></div>
                            </div>
                        );
                    })}

                    {/* Add Source Button */}
                    <button className="flex items-center gap-3 p-4 rounded-xl border border-dashed border-gray-700 text-gray-500 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all group">
                        <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-primary/20">
                            <span className="text-xl leading-none mb-0.5">+</span>
                        </div>
                        <span className="text-sm font-medium">Connect Source</span>
                    </button>
                </div>

                {/* Column 2: The Main Pipeline */}
                <div className="flex items-center gap-12 relative z-10">

                    {PIPELINE_NODES.map((node, index) => {
                        // Node is active if the flow has reached it
                        const isActive = activeStep === index + 1 || (activeStep === 0 && index === 0);

                        return (
                            <div key={node.id} className="relative group">
                                {/* Node Card */}
                                <div className={`
                   w-44 p-4 rounded-2xl border backdrop-blur-xl transition-all duration-500
                   flex flex-col items-center text-center gap-3
                   ${isActive
                                        ? 'bg-bg-primary border-primary shadow-[0_0_20px_rgba(0,214,203,0.3)] scale-105 z-20'
                                        : 'bg-bg-secondary border-white/10'
                                    }
                `}>
                                    {/* Status Indicator */}
                                    <div className={`absolute top-3 right-3 w-2 h-2 rounded-full transition-colors duration-300 ${isActive ? 'bg-primary animate-pulse' : 'bg-gray-600'}`}></div>

                                    <div className={`p-3 rounded-xl transition-colors duration-300 ${isActive ? 'bg-primary/10 text-primary' : 'bg-white/5 text-gray-400'}`}>
                                        <Icon name={node.icon} size={28} />
                                    </div>

                                    <div>
                                        <h4 className={`font-bold text-sm transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-300'}`}>{node.name}</h4>
                                        <span className="text-[10px] font-mono text-gray-500 bg-black/30 px-2 py-0.5 rounded mt-1 inline-block border border-white/5">
                                            {node.tech}
                                        </span>
                                    </div>
                                </div>

                                {/* Input Connector (Left) */}
                                <div
                                    ref={(el) => {
                                        nodeInputRefs.current[index] = el;
                                    }}
                                    className={`absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 rounded-full border bg-bg-primary transition-colors duration-500 ${isActive ? 'border-primary bg-primary' : 'border-gray-600'}`}
                                ></div>

                                {/* Output Connector (Right) */}
                                {index !== PIPELINE_NODES.length - 1 && (
                                    <div
                                        ref={(el) => {
                                            nodeOutputRefs.current[index] = el;
                                        }}
                                        className={`absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 rounded-full border bg-bg-primary transition-colors duration-500 ${isActive ? 'border-primary bg-primary' : 'border-gray-600'}`}
                                    ></div>
                                )}
                            </div>
                        );
                    })}

                </div>
            </div>
        </div>
    );
};

export default PipelineVisualizer;
