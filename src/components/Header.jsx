import React from 'react';
import { Layers, Volume2, VolumeX, Keyboard, Command, Home } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth.js';

export default function Header({
  soundEnabled,
  setSoundEnabled,
  onOpenShortcuts,
  onGoHome
}) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 py-3 px-4 md:px-6 rounded-2xl studio-card mb-2">
      {/* Brand & Studio Title (Clickable to return Home) */}
      <div
        onClick={onGoHome}
        className="flex items-center gap-3 cursor-pointer group"
        title="Return to Home Page"
      >
        <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)] group-hover:scale-105 transition">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-2 group-hover:text-indigo-300 transition">
              AlgoViz
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-extrabold">
                Studio
              </span>
            </h1>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 tracking-wide">
              Studio
            </span>
          </div>
          <p className="text-xs text-slate-400 hidden sm:block">
            Interactive Algorithm & Data Structure Execution Engine
          </p>
        </div>
      </div>

      {/* Right Controls Bar */}
      <div className="flex items-center gap-2.5">
        {/* Back to Home Button */}
        {onGoHome && (
          <button
            onClick={onGoHome}
            className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-indigo-500/30 flex items-center gap-1.5 text-xs font-medium transition active:scale-95 shadow-sm"
            title="Return to Home Page"
          >
            <Home className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Home</span>
          </button>
        )}

        {/* Keyboard Shortcuts Trigger Button */}
        <button
          onClick={onOpenShortcuts}
          className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-indigo-500/30 flex items-center gap-2 text-xs font-medium transition active:scale-95 shadow-sm"
          title="Keyboard Shortcuts"
        >
          <Keyboard className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">Shortcuts</span>
          <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-slate-400 bg-slate-800 rounded border border-slate-700">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>

        {/* Audio Synthesizer Toggle */}
        <button
          onClick={() => {
            if (!soundEnabled) audioSynth.init();
            setSoundEnabled(!soundEnabled);
          }}
          className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition active:scale-95 ${
            soundEnabled
              ? "bg-indigo-600/20 border-indigo-500/40 text-indigo-300 glow-indigo-subtle"
              : "bg-slate-900/90 border-slate-800 text-slate-500 hover:text-slate-300"
          }`}
          title="Toggle Web Audio Synthesizer"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Audio Synth</span>
              <div className="flex items-end gap-0.5 h-3.5 pl-1">
                <span className="w-0.5 bg-indigo-400 rounded-full animate-wave-bar-1" />
                <span className="w-0.5 bg-indigo-400 rounded-full animate-wave-bar-2" />
                <span className="w-0.5 bg-indigo-400 rounded-full animate-wave-bar-3" />
              </div>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Muted</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
