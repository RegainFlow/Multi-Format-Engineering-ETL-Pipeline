import React, { useState } from 'react';
import { ViewMode } from './types';
import StatCard from './components/StatCard';
import PipelineVisualizer from './components/PipelineVisualizer';
import Charts from './components/Charts';
import SearchInterface from './components/SearchInterface';
import { Icon } from './components/Icons';

function App() {
  const [view, setView] = useState<ViewMode>(ViewMode.DASHBOARD);

  return (
    <div className="min-h-screen bg-[#121213] text-white selection:bg-primary selection:text-black font-sans">
      
      {/* Sidebar / Navigation */}
      <div className="fixed top-0 left-0 h-full w-20 hidden md:flex flex-col items-center py-8 border-r border-white/5 bg-white/[0.02] backdrop-blur-xl z-50">
        <div className="mb-12 p-3 bg-gradient-to-br from-primary/20 to-transparent rounded-xl border border-primary/20 neon-border">
          <Icon name="Cpu" className="text-primary" size={28} />
        </div>
        
        <nav className="flex flex-col gap-8 w-full items-center">
          <button 
            onClick={() => setView(ViewMode.DASHBOARD)}
            className={`p-3 rounded-xl transition-all duration-300 relative group ${view === ViewMode.DASHBOARD ? 'text-primary bg-primary/10' : 'text-gray-500 hover:text-white'}`}
          >
            <Icon name="LayoutDashboard" size={24} />
            {view === ViewMode.DASHBOARD && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-l-full shadow-[0_0_10px_#00d6cb]"></div>}
            <span className="absolute left-14 bg-black border border-white/10 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Dashboard</span>
          </button>
          
          <button 
            onClick={() => setView(ViewMode.SEARCH)}
            className={`p-3 rounded-xl transition-all duration-300 relative group ${view === ViewMode.SEARCH ? 'text-primary bg-primary/10' : 'text-gray-500 hover:text-white'}`}
          >
            <Icon name="Search" size={24} />
            {view === ViewMode.SEARCH && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-l-full shadow-[0_0_10px_#00d6cb]"></div>}
            <span className="absolute left-14 bg-black border border-white/10 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Advanced Search</span>
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="md:pl-20 min-h-screen">
        
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#121213]/80 backdrop-blur-md border-b border-white/5 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold font-logo tracking-wide flex items-center gap-2">
              <span className="text-primary">Regain</span>Flow
            </h1>
            <p className="text-xs text-gray-500 font-mono">Pipeline Status: <span className="text-green-400">OPERATIONAL</span></p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-mono text-gray-400">Connected to Elastic Node 1</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-500"></div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto animate-fade">
          
          {view === ViewMode.DASHBOARD && (
            <div className="space-y-10">
              
              {/* Integrated Search Section - Hero Style */}
              <div className="w-full">
                 <SearchInterface />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                  title="Files Processed (24h)" 
                  value="12,842" 
                  icon="FileText" 
                  trend="+12%" 
                  trendUp={true} 
                />
                <StatCard 
                  title="Avg Processing Time" 
                  value="1.4s" 
                  icon="Activity" 
                  trend="-0.2s" 
                  trendUp={true} 
                />
                <StatCard 
                  title="Active Chunks" 
                  value="892K" 
                  icon="Database" 
                />
                <StatCard 
                  title="Failed Jobs" 
                  value="3" 
                  icon="AlertTriangle" 
                  trend="+1" 
                  trendUp={false} 
                />
              </div>

              {/* Pipeline Visualizer Section - n8n style */}
              <section className="glass-card p-0 overflow-hidden border-primary/20">
                <div className="p-6 border-b border-white/5 bg-white/5 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold flex items-center gap-2 text-white">
                            <Icon name="Activity" className="text-primary" size={20} />
                            Ingestion Workflow
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">Real-time visualization of data sources and processing nodes</p>
                    </div>
                    <button className="text-xs flex items-center gap-2 px-3 py-1.5 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-colors">
                        <Icon name="Activity" size={12} />
                        Auto-Refresh On
                    </button>
                </div>
                <div className="bg-[#0f0f10]">
                    <PipelineVisualizer />
                </div>
              </section>

              {/* Charts Section (Logs Removed) */}
              <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-md font-bold text-gray-300">Throughput & Latency Metrics</h3>
                    <div className="flex gap-2">
                        {['1h', '24h', '7d'].map(t => (
                            <button key={t} className="text-xs px-2 py-1 rounded border border-white/10 hover:bg-white/5 text-gray-500 hover:text-white transition-colors">
                                {t}
                            </button>
                        ))}
                    </div>
                  </div>
                  <Charts />
              </div>
            </div>
          )}

          {view === ViewMode.SEARCH && (
            <div className="animate-slide min-h-[60vh] flex flex-col justify-center">
                 <div className="text-center mb-12">
                     <h2 className="text-4xl font-bold mb-4">Advanced Search</h2>
                     <p className="text-gray-400">Deep dive into vector embeddings and metadata</p>
                 </div>
                 <SearchInterface />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
