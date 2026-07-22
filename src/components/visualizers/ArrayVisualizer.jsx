import React, { useState } from 'react';
import { parseCustomArray } from '../../utils/helpers.js';
import { Edit3, Check, X } from 'lucide-react';

export default function ArrayVisualizer({ step, baseArray, onSetCustomArray }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState('');

  const arr = step.array || baseArray || [];
  const maxVal = Math.max(...arr, 100);

  const handleSaveCustom = () => {
    const parsed = parseCustomArray(inputText);
    if (parsed) {
      onSetCustomArray(parsed);
      setIsEditing(false);
      setInputText('');
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4 md:p-6 min-h-[320px] relative">
      {/* Top Bar / Edit Toggle */}
      <div className="flex justify-between items-center text-xs text-gray-400 font-mono mb-2">
        <div className="flex items-center gap-2">
          <span className="text-gray-500">// Visual State:</span>
          <span className="text-blue-400 font-semibold">{arr.length} elements</span>
        </div>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            setInputText(arr.join(', '));
          }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 transition"
        >
          <Edit3 className="w-3.5 h-3.5 text-blue-400" />
          {isEditing ? "Cancel Edit" : "Custom Inputs"}
        </button>
      </div>

      {/* Custom Array Input Modal / Drawer */}
      {isEditing && (
        <div className="mb-4 p-3 rounded-lg bg-gray-900 border border-gray-700 flex flex-col gap-2 font-mono text-xs animate-fadeIn">
          <label className="text-gray-300">Enter comma-separated numbers (1-999):</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g. 45, 12, 89, 23, 67, 10"
              className="flex-1 px-3 py-1.5 rounded bg-gray-950 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSaveCustom}
              className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1 transition"
            >
              <Check className="w-4 h-4" /> Apply
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-2.5 py-1.5 rounded bg-gray-800 hover:bg-gray-700 text-gray-400 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Bar Chart Container */}
      <div className="flex-1 flex items-end justify-center gap-1.5 md:gap-2 px-2 pt-8 pb-4 min-h-[240px]">
        {arr.map((val, idx) => {
          let color = "bg-blue-500/80 border-blue-400";
          let glow = "";
          let labelBadge = null;

          if (step.sortedIdx?.includes(idx)) {
            color = "bg-emerald-500 border-emerald-300";
            glow = "glow-emerald";
          } else if (step.swap?.includes(idx)) {
            color = "bg-rose-500 border-rose-300 animate-pulse";
            glow = "shadow-lg shadow-rose-500/50";
            labelBadge = "SWAP";
          } else if (step.pivot?.includes(idx)) {
            color = "bg-purple-500 border-purple-300";
            glow = "shadow-lg shadow-purple-500/50";
            labelBadge = "PIVOT";
          } else if (step.compare?.includes(idx)) {
            color = "bg-amber-400 border-amber-200 text-black";
            glow = "glow-amber";
            labelBadge = "CMP";
          }

          const heightPercent = Math.max(12, (val / maxVal) * 100);

          return (
            <div key={idx} className="flex-1 max-w-[48px] flex flex-col items-center h-full justify-end group">
              {/* Value Badge */}
              <span className={`text-[11px] font-mono mb-1 font-bold transition-all ${
                step.compare?.includes(idx) ? "text-amber-400 scale-110" :
                step.swap?.includes(idx) ? "text-rose-400 scale-110" :
                step.pivot?.includes(idx) ? "text-purple-400" :
                step.sortedIdx?.includes(idx) ? "text-emerald-400" : "text-gray-300"
              }`}>
                {val}
              </span>

              {/* Status Indicator Tag */}
              {labelBadge && (
                <span className="text-[9px] font-bold px-1 rounded bg-gray-950 border border-gray-700 text-white mb-0.5 animate-bounce">
                  {labelBadge}
                </span>
              )}

              {/* Bar element */}
              <div
                className={`w-full rounded-t-md border-t-2 transition-all duration-200 ${color} ${glow}`}
                style={{ height: `${heightPercent}%` }}
              />

              {/* Index Number */}
              <span className="text-[10px] text-gray-500 mt-1.5 font-mono select-none">
                [{idx}]
              </span>
            </div>
          );
        })}
      </div>

      {/* Bar Color Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-3 border-t border-gray-800 text-[11px] font-mono text-gray-400">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-blue-500 inline-block"></span> Unsorted
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-amber-400 inline-block"></span> Comparing
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-rose-500 inline-block"></span> Swapping
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-purple-500 inline-block"></span> Pivot/Key
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-emerald-500 inline-block"></span> Sorted
        </div>
      </div>
    </div>
  );
}
