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
  Sliders
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
    <div className="bg-[#171e19] p-4 rounded-2xl flex flex-col gap-3.5 font-mono shadow-lg border border-[#35413b] text-[#e8ece4]">
      {/* Top Row: Main Playback Controls & Scrubber */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Playback Button Group */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="p-2.5 bg-[#111815] hover:bg-[#202a24] text-[#e8ece4] rounded-xl border border-[#35413b] hover:border-[#c9583c]/50 transition active:scale-95 shadow-sm"
            title="Reset Execution (R)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleStepPrev}
            className="p-2.5 bg-[#111815] hover:bg-[#202a24] text-[#e8ece4] rounded-xl border border-[#35413b] hover:border-[#c9583c]/50 transition active:scale-95 shadow-sm"
            title="Previous Step (←)"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={handlePlayPause}
            className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition active:scale-95 shadow-md ${
              playing
                ? "bg-[#d4ec7a] hover:bg-[#c7df75] text-[#111815]"
                : "bg-[#c9583c] hover:bg-[#a7432c] text-white"
            }`}
            title="Play / Pause (Space)"
          >
            {playing ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            <span className="font-sans font-semibold text-sm">{playing ? "Pause" : "Play"}</span>
          </button>

          <button
            onClick={handleStepNext}
            className="p-2.5 bg-[#111815] hover:bg-[#202a24] text-[#e8ece4] rounded-xl border border-[#35413b] hover:border-[#c9583c]/50 transition active:scale-95 shadow-sm"
            title="Next Step (→)"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {isArrayAlgo && (
            <button
              onClick={handleShuffle}
              className="px-3.5 py-2 bg-[#111815] hover:bg-[#202a24] text-[#e8ece4] rounded-xl border border-[#35413b] hover:border-[#c9583c]/50 transition flex items-center gap-1.5 text-xs font-semibold active:scale-95 shadow-sm"
              title="Randomize Array (S)"
            >
              <Shuffle className="w-3.5 h-3.5 text-[#c9583c]" />
              <span className="font-sans">Shuffle</span>
            </button>
          )}
        </div>

        {/* Timeline Scrubber */}
        <div className="flex-1 min-w-[240px] max-w-xl bg-[#111815] p-2.5 rounded-xl border border-[#35413b] flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#e8ece4] font-medium flex items-center gap-1.5 font-sans">
              <Sliders className="w-3 h-3 text-[#c9583c]" />
              <span>Timeline Scrubber</span>
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#d4ec7a] font-bold">{stepIdx}</span>
              <span className="text-[#526058]">/</span>
              <span className="text-[#a0aaa2]">{maxSteps} steps</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#c9583c]/20 border border-[#c9583c]/40 text-[#ffad8e] font-bold">
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
              className="w-full h-2 bg-[#25322c] rounded-lg appearance-none cursor-pointer accent-[#c9583c] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Bottom Row: Sliders & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2.5 border-t border-[#303a35] text-xs text-[#a0aaa2]">
        {/* Left Options */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Target Input for Search */}
          {currentAlgo.category === "searching" && (
            <div className="flex items-center gap-2 bg-[#111815] px-3 py-1.5 rounded-xl border border-[#35413b]">
              <Search className="w-3.5 h-3.5 text-[#c9583c]" />
              <span className="text-[#a0aaa2] font-sans">Target:</span>
              <input
                type="number"
                value={searchTarget}
                onChange={(e) => setSearchTarget(Number(e.target.value))}
                className="w-14 px-2 py-0.5 bg-[#18211d] border border-[#35413b] rounded-lg text-white font-bold focus:outline-none focus:border-[#c9583c] text-center"
              />
            </div>
          )}

          {/* Array Size Slider */}
          {isArrayAlgo && (
            <label className="flex items-center gap-2.5 bg-[#111815] px-3 py-1.5 rounded-xl border border-[#35413b] font-sans">
              <span className="text-[#a0aaa2]">Size:</span>
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
                className="w-20 accent-[#c9583c] cursor-pointer"
              />
              <span className="text-[#d4ec7a] font-bold font-mono w-4">{size}</span>
            </label>
          )}
        </div>

        {/* Speed Controls & Presets */}
        <div className="flex items-center gap-3 bg-[#111815] px-3 py-1.5 rounded-xl border border-[#35413b] font-sans">
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-[#f4dd96]" />
            <span className="text-[#a0aaa2]">Speed:</span>
            <input
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={e => setSpeed(Number(e.target.value))}
              className="w-20 accent-[#c9583c] cursor-pointer"
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
                    ? "bg-[#d4ec7a] border-[#d4ec7a] text-[#111815] shadow-sm"
                    : "bg-[#18211d] border-[#35413b] text-[#a0aaa2] hover:text-white hover:bg-[#202a24]"
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
