import React from 'react';
import { ALGORITHM_CATEGORIES, ALGORITHM_DATA } from '../data/algorithmData.js';
import { Code2 } from 'lucide-react';

export default function CategoryNav({ algoKey, setAlgoKey, currentAlgo }) {
  return (
    <div className="flex flex-col gap-3 font-mono">
      {/* Category Pill Filters */}
      <div className="flex flex-wrap gap-1.5 md:gap-2 text-xs">
        {ALGORITHM_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              const firstAlgoOfCat = Object.keys(ALGORITHM_DATA).find(
                k => ALGORITHM_DATA[k].category === cat.id
              );
              if (firstAlgoOfCat) setAlgoKey(firstAlgoOfCat);
            }}
            className={`px-3 py-1.5 rounded-full border transition-all duration-150 ${
              currentAlgo.category === cat.id
                ? "bg-blue-600/20 border-blue-500 text-blue-300 font-bold glow-blue"
                : "bg-gray-900/80 border-gray-800 text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Algorithm File Tabs */}
      <div className="flex gap-1 border-b border-gray-800 overflow-x-auto pb-0">
        {Object.entries(ALGORITHM_DATA).map(([key, algo]) => (
          <button
            key={key}
            onClick={() => setAlgoKey(key)}
            className={`px-3.5 py-2 text-xs border-t-2 border-x rounded-t transition-all whitespace-nowrap flex items-center gap-2 ${
              algoKey === key
                ? "bg-[#0d1117] border-t-blue-500 border-x-gray-800 text-white font-bold"
                : "bg-gray-950/60 border-t-transparent border-x-transparent text-gray-400 hover:bg-gray-900 hover:text-gray-200"
            }`}
          >
            <Code2 className={`w-3.5 h-3.5 ${algoKey === key ? "text-blue-400" : "text-gray-500"}`} />
            {algo.file}
          </button>
        ))}
      </div>
    </div>
  );
}
