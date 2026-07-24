import React from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Shuffle,
  Search,
  Zap,
  Sliders,
  Sparkles
} from 'lucide-react';

export default function ControlPanel({
  playing,
  handlePlayPause,
  handleStepNext,
  handleStepPrev,
  handleReset,
  handleShuffle,
  size,
  setSize,
  setBaseArray,
  randomArray,
  speed,
  setSpeed,
  currentAlgo,
  searchTarget,
  setSearchTarget,
  isDone,
  stepIdx,
  stepsCount,
  handleJumpToStep
}) {
  const isArrayAlgo = currentAlgo.category === "sorting" || currentAlgo.category === "searching";
  const maxSteps = Math.max(1, stepsCount - 1);
  const progressPercent = Math.min(100, Math.round((stepIdx / maxSteps) * 100));

  return (
    <div className="studio-card p-4 rounded-2xl flex flex-col gap-3.5 font-mono shadow-2xl border border-white/[0.08]">
      {/* Top Row: Main Playback Controls & Scrubber */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Playback Button Group */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="p-2.5 bg-slate-900/90 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 hover:border-indigo-500/30 transition active:scale-95 shadow-sm"
            title="Reset Execution (R)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleStepPrev}
            className="p-2.5 bg-slate-900/90 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 hover:border-indigo-500/30 transition active:scale-95 shadow-sm"
            title="Previous Step (←)"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={handlePlayPause}
            className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition active:scale-95 shadow-lg ${
              playing
                ? "bg-amber-500 hover:bg-amber-400 text-slate-950 glow-amber-subtle"
                : "bg-indigo-600 hover:bg-indigo-500 text-white glow-indigo-subtle"
            }`}
            title="Play / Pause (Space)"
          >
            {playing ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            <span className="font-sans font-semibold text-sm">{playing ? "Pause" : "Play"}</span>
          </button>

          <button
            onClick={handleStepNext}
            className="p-2.5 bg-slate-900/90 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 hover:border-indigo-500/30 transition active:scale-95 shadow-sm"
            title="Next Step (→)"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {isArrayAlgo && (
            <button
              onClick={handleShuffle}
              className="px-3.5 py-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 rounded-xl border border-slate-800 hover:border-indigo-500/30 transition flex items-center gap-1.5 text-xs font-semibold active:scale-95 shadow-sm"
              title="Randomize Array (S)"
            >
              <Shuffle className="w-3.5 h-3.5 text-indigo-300" />
              <span className="font-sans">Shuffle</span>
            </button>
          )}
        </div>

        {/* Timeline Scrubber */}
        <div className="flex-1 min-w-[240px] max-w-xl bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-300 font-medium flex items-center gap-1.5 font-sans">
              <Sliders className="w-3 h-3 text-indigo-300" />
              <span>Timeline Scrubber</span>
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-indigo-300 font-bold">{stepIdx}</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300">{maxSteps} steps</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                {progressPercent}%
              </span>
            </div>
          </div>

          <div className="relative flex items-center">
            <input
              type="range"
              min="0"
              max={maxSteps}
              value={stepIdx}
              onChange={(e) => handleJumpToStep(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Bottom Row: Sliders & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2.5 border-t border-slate-800/60 text-xs text-slate-300">
        {/* Left Options */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Target Input for Search */}
          {currentAlgo.category === "searching" && (
            <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              <Search className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-slate-300 font-sans">Target:</span>
              <input
                type="number"
                value={searchTarget}
                onChange={(e) => setSearchTarget(Number(e.target.value))}
                className="w-14 px-2 py-0.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-bold focus:outline-none focus:border-amber-400 text-center"
              />
            </div>
          )}

          {/* Array Size Slider */}
          {isArrayAlgo && (
            <label className="flex items-center gap-2.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 font-sans">
              <span className="text-slate-300">Size:</span>
              <input
                type="range"
                min="6"
                max="24"
                value={size}
                onChange={e => {
                  const s = Number(e.target.value);
                  setSize(s);
                  setBaseArray(randomArray(s));
                }}
                className="w-20 accent-indigo-500 cursor-pointer"
              />
              <span className="text-indigo-300 font-bold font-mono w-4">{size}</span>
            </label>
          )}
        </div>

        {/* Speed Controls & Presets */}
        <div className="flex items-center gap-3 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 font-sans">
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-slate-300">Speed:</span>
            <input
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={e => setSpeed(Number(e.target.value))}
              className="w-20 accent-indigo-500 cursor-pointer"
            />
          </div>
          <div className="flex gap-1 font-mono">
            {[
              { label: "1x", val: 30 },
              { label: "5x", val: 65 },
              { label: "15x", val: 85 },
              { label: "⚡ TURBO", val: 100 }
            ].map(sp => (
              <button
                key={sp.val}
                onClick={() => setSpeed(sp.val)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${
                  speed === sp.val
                    ? "bg-amber-500 border-amber-400 text-slate-950 shadow glow-amber-subtle"
                    : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {sp.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
