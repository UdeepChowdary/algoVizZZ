import React from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Shuffle,
  Search,
  Zap
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
  isDone
}) {
  const isArrayAlgo = currentAlgo.category === "sorting" || currentAlgo.category === "searching";

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#161b22] border border-gray-800 rounded-xl font-mono">
      {/* Playback Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleReset}
          className="p-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg border border-gray-700 transition"
          title="Reset Execution (R)"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={handleStepPrev}
          className="p-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg border border-gray-700 transition"
          title="Previous Step (←)"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        <button
          onClick={handlePlayPause}
          className={`px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 transition glow-blue ${
            playing
              ? "bg-amber-600 hover:bg-amber-500 text-white"
              : "bg-blue-600 hover:bg-blue-500 text-white"
          }`}
          title="Play / Pause (Space)"
        >
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{playing ? "Pause" : "Play"}</span>
        </button>

        <button
          onClick={handleStepNext}
          className="p-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg border border-gray-700 transition"
          title="Next Step (→)"
        >
          <SkipForward className="w-4 h-4" />
        </button>

        {isArrayAlgo && (
          <button
            onClick={handleShuffle}
            className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg border border-gray-700 transition flex items-center gap-1.5 text-xs font-semibold"
            title="Randomize Array (S)"
          >
            <Shuffle className="w-4 h-4 text-blue-400" />
            <span>Shuffle</span>
          </button>
        )}
      </div>

      {/* Sliders & Search Input Controls */}
      <div className="flex flex-wrap items-center gap-5 text-xs text-gray-300">
        {/* Search Target Input */}
        {currentAlgo.category === "searching" && (
          <div className="flex items-center gap-2 bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-800">
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span>Target:</span>
            <input
              type="number"
              value={searchTarget}
              onChange={(e) => setSearchTarget(Number(e.target.value))}
              className="w-14 px-2 py-0.5 bg-gray-950 border border-gray-700 rounded text-white font-bold focus:outline-none focus:border-amber-400"
            />
          </div>
        )}

        {/* Array Size Slider */}
        {isArrayAlgo && (
          <label className="flex items-center gap-2">
            <span className="text-gray-400">Size:</span>
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
              className="w-20 accent-blue-500 cursor-pointer"
            />
            <span className="text-white font-bold w-4">{size}</span>
          </label>
        )}

        {/* Speed Controls & Turbo Presets */}
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Speed:</span>
          <input
            type="range"
            min="1"
            max="100"
            value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
            className="w-24 accent-blue-500 cursor-pointer"
          />
          <div className="flex gap-1 ml-1">
            {[
              { label: "1x", val: 30 },
              { label: "5x", val: 65 },
              { label: "15x", val: 85 },
              { label: "⚡ TURBO", val: 100 }
            ].map(sp => (
              <button
                key={sp.val}
                onClick={() => setSpeed(sp.val)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold border transition ${
                  speed === sp.val
                    ? "bg-amber-500 border-amber-400 text-black shadow glow-amber"
                    : "bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800"
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
