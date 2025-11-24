import React, { useState } from 'react';
import { Icon } from './Icons';
import { MOCK_SEARCH_RESULTS } from '../constants';

const SearchInterface: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Input Field */}
      <div className="relative mb-6 group">
        <div className={`absolute inset-0 bg-primary/20 rounded-2xl blur-xl transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`relative flex items-center bg-bg-secondary/90 backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-300 ${isFocused ? 'border-primary/50 shadow-lg scale-[1.01]' : 'border-white/10'}`}>
          <div className="pl-6 text-primary">
            <Icon name="Search" size={24} />
          </div>
          <input
            type="text"
            className="w-full bg-transparent border-none text-white text-lg px-4 py-5 focus:ring-0 placeholder-gray-500 font-sans"
            placeholder="Search across all ingested documents..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <div className="pr-6 flex gap-3">
             {query && (
                 <button onClick={() => setQuery('')} className="text-gray-500 hover:text-white">
                     <Icon name="XCircle" size={18} />
                 </button>
             )}
             <span className="hidden md:block text-xs text-gray-500 bg-black/40 px-2 py-1.5 rounded border border-white/10 font-mono">
                /
            </span>
          </div>
        </div>
      </div>

      {/* Results Dropdown / List */}
      {query && (
          <div className="animate-slide space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-500 px-2 mb-2">
                <span>Found {MOCK_SEARCH_RESULTS.length} matches in 0.04s</span>
                <span>Sorted by Relevance</span>
            </div>
            {MOCK_SEARCH_RESULTS.filter(r => r.title.toLowerCase().includes(query.toLowerCase()) || r.snippet.toLowerCase().includes(query.toLowerCase())).map((result) => (
              <div key={result.id} className="glass-card p-5 hover:bg-white/[0.07] border border-white/5 hover:border-primary/30 transition-all cursor-pointer group rounded-xl">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <Icon name="FileText" size={16} />
                        </div>
                        <h3 className="text-md font-bold text-white group-hover:text-primary transition-colors">
                            {result.title}
                        </h3>
                    </div>
                    <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">
                        {Math.round(result.score * 100)}% Match
                    </span>
                </div>
                <p className="text-gray-400 text-sm mb-3 pl-11 leading-relaxed font-serif italic opacity-80">
                    "...{result.snippet}..."
                </p>
                <div className="flex gap-2 pl-11">
                    {result.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5">
                            {tag}
                        </span>
                    ))}
                </div>
              </div>
            ))}
            {MOCK_SEARCH_RESULTS.filter(r => r.title.toLowerCase().includes(query.toLowerCase()) || r.snippet.toLowerCase().includes(query.toLowerCase())).length === 0 && (
                <div className="text-center py-8 glass-card rounded-xl border-dashed border-white/10">
                    <p className="text-gray-500">No matching documents found.</p>
                </div>
            )}
          </div>
      )}
    </div>
  );
};

export default SearchInterface;
