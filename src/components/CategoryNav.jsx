import React, { useState } from 'react';
import { ALGORITHM_CATEGORIES, ALGORITHM_DATA } from '../data/algorithmData.js';
import { Code2, Clock, Cpu, Search, Sparkles } from 'lucide-react';

export default function CategoryNav({ algoKey, setAlgoKey, currentAlgo }) {
  const [filterQuery, setFilterQuery] = useState('');

  // Current active category
  const activeCategory = currentAlgo.category;

  // Algorithms in active category or matching filter
  const currentCategoryAlgos = Object.entries(ALGORITHM_DATA).filter(([key, algo]) => {
    if (filterQuery.trim()) {
      return (
        algo.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
        algo.category.toLowerCase().includes(filterQuery.toLowerCase()) ||
        algo.file.toLowerCase().includes(filterQuery.toLowerCase())
      );
    }
    return algo.category === activeCategory;
  });

  return (
    <div className="flex flex-col gap-3 studio-card p-4 rounded-2xl">
      {/* Top Bar: Category Pills & Search Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Category Segmented Controls */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800/80">
          {ALGORITHM_CATEGORIES.map(cat => {
            const isSelected = activeCategory === cat.id && !filterQuery;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setFilterQuery('');
                  const firstAlgo = Object.keys(ALGORITHM_DATA).find(
                    k => ALGORITHM_DATA[k].category === cat.id
                  );
                  if (firstAlgo) setAlgoKey(firstAlgo);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Quick Search Input */}
        <div className="relative flex items-center min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search algorithms..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 transition"
          />
        </div>
      </div>

      {/* Algorithm Selector Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 pt-1">
        {currentCategoryAlgos.map(([key, algo]) => {
          const isSelected = algoKey === key;
          return (
            <button
              key={key}
              onClick={() => setAlgoKey(key)}
              className={`p-2.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between gap-1.5 ${
                isSelected
                  ? "bg-indigo-950/40 border-indigo-500/80 text-white shadow-[0_0_20px_rgba(99,102,241,0.25)] ring-1 ring-indigo-500/50"
                  : "bg-slate-900/60 border-slate-800/80 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${
                  isSelected ? "bg-indigo-500/20 text-indigo-300" : "bg-slate-800 text-slate-400"
                }`}>
                  {algo.file}
                </span>
                {isSelected && <Sparkles className="w-3 h-3 text-indigo-400 animate-pulse" />}
              </div>

              <div className="font-semibold text-xs text-white truncate w-full" title={algo.name}>
                {algo.name}
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/60 w-full">
                <span className="flex items-center gap-1 font-mono text-emerald-400">
                  <Clock className="w-2.5 h-2.5" />
                  {algo.time}
                </span>
                <span className="font-mono text-purple-400">
                  {algo.space}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
