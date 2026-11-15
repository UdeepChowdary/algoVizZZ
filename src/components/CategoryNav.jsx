import React, { useState } from 'react';
import { ALGORITHM_CATEGORIES, ALGORITHM_DATA } from '../data/algorithmData.js';
import { Clock, Search, Sparkles } from 'lucide-react';

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
    <div className="flex flex-col gap-3 bg-[#171e19] border border-[#35413b] p-4 rounded-2xl shadow-lg text-[#e8ece4]">
      {/* Top Bar: Category Pills & Search Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Category Segmented Controls */}
        <div className="flex flex-wrap gap-1 p-1 bg-[#111815] rounded-xl border border-[#35413b]">
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
                    ? "bg-[#c9583c] text-white shadow-sm"
                    : "text-[#a0aaa2] hover:text-white hover:bg-[#18211d]"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Quick Search Input */}
        <div className="relative flex items-center min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-[#87918a] absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search algorithms..."
            className="w-full pl-8 pr-3 py-1.5 bg-[#111815] rounded-xl border border-[#35413b] text-xs text-[#ffffff] placeholder-[#707b73] focus:outline-none focus:border-[#c9583c] transition"
          />
        </div>
      </div>

      {/* Algorithm Selector Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 pt-1">
        {currentCategoryAlgos.map(([key, algo]) => {
          const isSelected = algoKey === key;
          return (
            <button
              key={key}
              onClick={() => setAlgoKey(key)}
              className={`p-2.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between gap-1.5 ${
                isSelected
                  ? "bg-[#1d2721] border-[#c9583c] text-white shadow-lg ring-1 ring-[#c9583c]"
                  : "bg-[#111815] border-[#303a35] text-[#e8ece4] hover:bg-[#18211d] hover:border-[#c9583c]/60 hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${
                  isSelected ? "bg-[#25322c] text-[#d4ec7a]" : "bg-[#18211d] text-[#87918a]"
                }`}>
                  {algo.file}
                </span>
                {isSelected && <Sparkles className="w-3 h-3 text-[#d4ec7a] animate-pulse" />}
              </div>

              <div className={`font-semibold text-xs truncate w-full ${isSelected ? "text-white" : "text-[#f5f4ed]"}`} title={algo.name}>
                {algo.name}
              </div>

              <div className="flex items-center justify-between text-[10px] pt-1 border-t border-[#303a35] w-full">
                <span className={`flex items-center gap-1 font-mono font-medium ${isSelected ? "text-[#d4ec7a]" : "text-[#d4ec7a]"}`}>
                  <Clock className="w-2.5 h-2.5" />
                  {algo.time}
                </span>
                <span className={`font-mono ${isSelected ? "text-[#ffad8e]" : "text-[#edaa86]"}`}>
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
