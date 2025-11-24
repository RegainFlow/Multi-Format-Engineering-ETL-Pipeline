import React from 'react';
import { Icon } from './Icons';

// Mock data for sources
const SOURCES = [
  { id: 's3', name: 'S3 Bucket', sub: 'raw-documents', icon: 'Database', status: 'active', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { id: 'sql', name: 'PostgreSQL', sub: 'client_records', icon: 'Database', status: 'active', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { id: 'api', name: 'REST API', sub: 'webhook_v2', icon: 'Activity', status: 'idle', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
];

const PIPELINE_NODES = [
  { id: 'convert', name: 'PDF Converter', tech: 'C# Lib', icon: 'FileText', status: 'processing' },
  { id: 'parse', name: 'Intell. Parser', tech: 'Python', icon: 'Code', status: 'processing' },
  { id: 'nlp', name: 'NLP Processor', tech: 'LangChain', icon: 'Brain', status: 'idle' },
  { id: 'index', name: 'Search Index', tech: 'Elastic', icon: 'Search', status: 'idle' },
];

const PipelineVisualizer: React.FC = () => {
  return (
    <div className="w-full overflow-x-auto custom-scrollbar pb-6 pt-2">
      {/* Container with min-width to ensure layout integrity */}
      <div className="min-w-[1000px] flex items-center p-8 relative min-h-[400px]">
        
        {/* SVG Layer for Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="100%" stopColor="#00d6cb" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Draw lines from Sources to Converter */}
          {SOURCES.map((source, index) => {
            // Calculate approximate Y positions based on index (center is approx 200px)
            // Source positions relative to container padding
            const startY = 60 + (index * 90); 
            const endY = 200; // Converges to middle
            
            return (
              <path
                key={source.id}
                d={`M 220 ${startY + 30} C 300 ${startY + 30}, 300 ${endY}, 380 ${endY + 30}`}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeOpacity="0.4"
              />
            );
          })}

          {/* Draw lines between pipeline nodes */}
          {PIPELINE_NODES.map((_, index) => {
            if (index === PIPELINE_NODES.length - 1) return null;
            const startX = 380 + (index * 200) + 160; // Node width approx 160 + gap
            const endX = 380 + ((index + 1) * 200);
            return (
              <path
                key={`pipe-${index}`}
                d={`M ${startX} 230 L ${endX} 230`}
                stroke="#00d6cb"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="animate-[dash_1s_linear_infinite]"
              />
            );
          })}
        </svg>

        {/* Style for animated dash line */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes dash {
            to {
              stroke-dashoffset: -8;
            }
          }
        `}} />

        {/* Column 1: Sources */}
        <div className="flex flex-col gap-6 w-[220px] relative z-10 mr-16">
          <h3 className="text-gray-400 text-xs font-mono uppercase mb-2 pl-2">Ingestion Sources</h3>
          
          {SOURCES.map((source) => (
            <div key={source.id} className={`glass-card p-4 flex items-center gap-3 border transition-all hover:scale-105 cursor-pointer group ${source.border}`}>
              <div className={`p-2 rounded-lg ${source.bg} ${source.color}`}>
                <Icon name={source.icon} size={18} />
              </div>
              <div>
                <div className="text-sm font-bold text-gray-200">{source.name}</div>
                <div className="text-xs text-gray-500 font-mono">{source.sub}</div>
              </div>
              {/* Connector Dot */}
              <div className="absolute -right-1.5 w-3 h-3 bg-gray-700 rounded-full border border-gray-500 group-hover:bg-primary group-hover:border-primary transition-colors"></div>
            </div>
          ))}

          {/* Add Source Button */}
          <button className="flex items-center gap-3 p-4 rounded-xl border border-dashed border-gray-700 text-gray-500 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all group">
            <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-primary/20">
              <span className="text-xl leading-none mb-0.5">+</span>
            </div>
            <span className="text-sm font-medium">Connect Source</span>
          </button>
        </div>

        {/* Column 2: The Main Pipeline */}
        <div className="flex items-center gap-12 relative z-10 pt-10">
          
          {PIPELINE_NODES.map((node, index) => {
             const isActive = node.status === 'processing';
             
             return (
              <div key={node.id} className="relative group">
                {/* Node Card */}
                <div className={`
                   w-44 p-4 rounded-2xl border backdrop-blur-xl transition-all duration-300
                   flex flex-col items-center text-center gap-3
                   ${isActive 
                      ? 'bg-bg-primary border-primary shadow-[0_0_20px_rgba(0,214,203,0.3)] scale-110 z-20' 
                      : 'bg-bg-secondary border-white/10 hover:border-primary/50'
                   }
                `}>
                  {/* Status Indicator */}
                  <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${isActive ? 'bg-primary animate-pulse' : 'bg-gray-600'}`}></div>

                  <div className={`p-3 rounded-xl ${isActive ? 'bg-primary/10 text-primary' : 'bg-white/5 text-gray-400'}`}>
                    <Icon name={node.icon} size={28} />
                  </div>
                  
                  <div>
                    <h4 className={`font-bold text-sm ${isActive ? 'text-white' : 'text-gray-300'}`}>{node.name}</h4>
                    <span className="text-[10px] font-mono text-gray-500 bg-black/30 px-2 py-0.5 rounded mt-1 inline-block border border-white/5">
                      {node.tech}
                    </span>
                  </div>
                </div>

                {/* Input Connector (Left) */}
                <div className={`absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 rounded-full border bg-bg-primary ${isActive ? 'border-primary' : 'border-gray-600'}`}></div>
                
                {/* Output Connector (Right) */}
                {index !== PIPELINE_NODES.length - 1 && (
                  <div className={`absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 rounded-full border bg-bg-primary ${isActive ? 'border-primary' : 'border-gray-600'}`}></div>
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
