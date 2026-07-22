import React, { useState } from 'react';
import { parseCustomArray } from '../../utils/helpers.js';
import { Edit3, Check, X, BarChart2 } from 'lucide-react';

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

  const handlePreset = (type) => {
    const len = arr.length || 12;
    let presetArr = [];
    if (type === 'reversed') {
      presetArr = Array.from({ length: len }, (_, i) => (len - i) * 8 + 10);
    } else if (type === 'nearly') {
      presetArr = Array.from({ length: len }, (_, i) => i * 8 + 15);
      if (len > 3) {
        const tmp = presetArr[2];
        presetArr[2] = presetArr[3];
        presetArr[3] = tmp;
      }
    } else if (type === 'few') {
      const vals = [25, 50, 75, 100];
      presetArr = Array.from({ length: len }, () => vals[Math.floor(Math.random() * vals.length)]);
    }
    if (presetArr.length > 0) {
      onSetCustomArray(presetArr);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4 md:p-6 min-h-[360px] relative font-mono">
      {/* Top Header / Custom Options Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 mb-2">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-indigo-400" />
          <span className="text-slate-300 font-semibold font-sans">Visual Dataset:</span>
          <span className="text-indigo-400 font-bold px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20">
            {arr.length} elements
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Presets Dropdown / Buttons */}
          <div className="hidden sm:flex gap-1">
            <button
              onClick={() => handlePreset('reversed')}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-[11px] font-sans transition"
            >
              Reversed
            </button>
            <button
              onClick={() => handlePreset('nearly')}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-[11px] font-sans transition"
            >
              Nearly Sorted
            </button>
            <button
              onClick={() => handlePreset('few')}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-[11px] font-sans transition"
            >
              Few Unique
            </button>
          </div>

          <button
            onClick={() => {
              setIsEditing(!isEditing);
              setInputText(arr.join(', '));
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-indigo-500/30 transition active:scale-95 font-sans"
          >
            <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
            <span>{isEditing ? "Cancel" : "Custom Array"}</span>
          </button>
        </div>
      </div>

      {/* Custom Array Input Modal / Drawer */}
      {isEditing && (
        <div className="mb-4 p-3.5 rounded-2xl bg-slate-900 border border-indigo-500/30 flex flex-col gap-2 text-xs shadow-2xl animate-fadeIn">
          <label className="text-slate-300 font-semibold font-sans">Enter comma-separated numbers (1-999):</label>
          <div className="flex gap-2 font-mono">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g. 45, 12, 89, 23, 67, 10"
              className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleSaveCustom}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1.5 transition shadow-lg glow-indigo-subtle active:scale-95 font-sans"
            >
              <Check className="w-4 h-4" /> Apply
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 transition active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Bar Chart Container */}
      <div className="flex-1 flex items-end justify-center gap-2 md:gap-2.5 px-2 pt-6 pb-2 min-h-[260px]">
        {arr.map((val, idx) => {
          let barGradient = "bg-gradient-to-t from-indigo-700 via-indigo-600 to-sky-400 border-sky-300/50";
          let shadowStyle = "hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]";
          let labelBadge = null;

          if (step.sortedIdx?.includes(idx)) {
            barGradient = "bg-gradient-to-t from-emerald-700 via-emerald-600 to-teal-300 border-teal-300/80";
            shadowStyle = "shadow-[0_0_18px_rgba(16,185,129,0.4)]";
          } else if (step.swap?.includes(idx)) {
            barGradient = "bg-gradient-to-t from-rose-700 via-rose-600 to-pink-400 border-pink-300/80";
            shadowStyle = "shadow-[0_0_20px_rgba(244,63,94,0.6)]";
            labelBadge = "SWAP";
          } else if (step.pivot?.includes(idx)) {
            barGradient = "bg-gradient-to-t from-purple-700 via-purple-600 to-fuchsia-400 border-fuchsia-300/80";
            shadowStyle = "shadow-[0_0_20px_rgba(168,85,247,0.6)]";
            labelBadge = "PIVOT";
          } else if (step.compare?.includes(idx)) {
            barGradient = "bg-gradient-to-t from-amber-600 via-amber-500 to-yellow-300 border-yellow-200/80";
            shadowStyle = "shadow-[0_0_18px_rgba(245,158,11,0.5)]";
            labelBadge = "CMP";
          }

          const heightPercent = Math.max(14, (val / maxVal) * 100);

          return (
            <div key={idx} className="flex-1 max-w-[50px] flex flex-col items-center h-full justify-end group relative">
              {/* Tooltip on Hover */}
              <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-all pointer-events-none bg-slate-950 text-white text-[10px] px-2.5 py-1 rounded-lg border border-slate-700 shadow-xl z-20 whitespace-nowrap font-mono">
                Value: <strong className="text-indigo-400">{val}</strong> | Index: [{idx}]
              </div>

              {/* Locked Height Badge Slot (Prevents Vertical Height Shifts During Steps) */}
              <div className="h-[20px] mb-1 flex items-center justify-center shrink-0">
                {labelBadge ? (
                  <span className="text-[9px] font-mono font-extrabold px-1.5 py-0.2 rounded-full bg-slate-950 border border-slate-700 text-white shadow-md">
                    {labelBadge}
                  </span>
                ) : null}
              </div>

              {/* Value Label Above Bar (No Scale Transform To Avoid Reflow) */}
              <span className={`text-[11px] font-bold mb-1 h-[16px] flex items-center justify-center shrink-0 ${
                step.compare?.includes(idx) ? "text-amber-300 font-black" :
                step.swap?.includes(idx) ? "text-rose-300 font-black" :
                step.pivot?.includes(idx) ? "text-purple-300 font-black" :
                step.sortedIdx?.includes(idx) ? "text-emerald-300" : "text-slate-300"
              }`}>
                {val}
              </span>

              {/* Vertical Pill Bar */}
              <div
                className={`w-full rounded-t-xl border-t-2 transition-all duration-150 cursor-pointer ${barGradient} ${shadowStyle}`}
                style={{ height: `${heightPercent}%` }}
              />

              {/* Index Tag */}
              <span className="text-[10px] text-slate-500 mt-1.5 font-mono select-none h-[14px] flex items-center justify-center shrink-0">
                [{idx}]
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend Footer */}
      <div className="flex flex-wrap items-center justify-center gap-5 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 font-sans shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" /> Unsorted
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Comparing
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Swapping
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" /> Pivot/Key
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" /> Sorted
        </div>
      </div>
    </div>
  );
}
