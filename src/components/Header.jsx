import React from 'react';
import { Cpu, Volume2, VolumeX, Keyboard } from 'lucide-react';

export default function Header({
  soundEnabled,
  setSoundEnabled,
  onOpenShortcuts
}) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-3 font-mono">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400 glow-blue">
          <Cpu className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <div className="text-[11px] text-gray-500 tracking-wider flex items-center gap-1">
            <span>~/algoVizZZ</span>
            <span className="text-blue-500">v2.0.0</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            AlgoVizZZ<span className="text-blue-500 font-extrabold">Studio</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-normal">
              LIVE Visualizer
            </span>
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Keyboard Shortcuts Trigger Button */}
        <button
          onClick={onOpenShortcuts}
          className="px-3 py-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800 flex items-center gap-1.5 text-xs transition"
          title="Keyboard Shortcuts"
        >
          <Keyboard className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden sm:inline">Shortcuts</span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition ${
            soundEnabled
              ? "bg-blue-600/20 border-blue-500 text-blue-300 glow-blue"
              : "bg-gray-900 border-gray-800 text-gray-500 hover:text-gray-400"
          }`}
          title="Toggle Audio Feedback"
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>{soundEnabled ? "Audio ON" : "Muted"}</span>
        </button>
      </div>
    </header>
  );
}
