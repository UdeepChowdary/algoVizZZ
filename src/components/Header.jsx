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
    <header className="flex flex-wrap items-center justify-between gap-4 py-3.5 px-4 md:px-6 rounded-2xl bg-[#171e19] border border-[#35413b] shadow-lg mb-2 text-[#e8ece4]">
      {/* Brand & Studio Title (Clickable to return Home) */}
      <div
        onClick={onGoHome}
        className="flex items-center gap-3 cursor-pointer group"
        title="Return to Home Page"
      >
        <div className="w-10 h-10 rounded-xl bg-[#111815] border border-[#c9583c]/40 flex items-center justify-center text-[#c9583c] group-hover:scale-105 transition shadow-sm">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-1 group-hover:text-[#c9583c] transition">
              <span>AlgoViz</span>
              <span className="text-[#c9583c]">.</span>
              <span className="text-xs font-serif italic font-normal text-[#a0aaa2] ml-1">
                Studio
              </span>
            </h1>
            <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#111815] border border-[#35413b] text-[#d4ec7a] uppercase tracking-wider">
              Workspace
            </span>
          </div>
          <p className="text-xs text-[#a0aaa2] hidden sm:block">
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
            className="px-3.5 py-1.5 rounded-xl bg-[#111815] hover:bg-[#202a24] text-[#e8ece4] border border-[#35413b] hover:border-[#c9583c]/50 flex items-center gap-1.5 text-xs font-semibold transition active:scale-95 shadow-sm"
            title="Return to Home Page"
          >
            <Home className="w-3.5 h-3.5 text-[#c9583c]" />
            <span className="hidden sm:inline">Home</span>
          </button>
        )}

        {/* Keyboard Shortcuts Trigger Button */}
        <button
          onClick={onOpenShortcuts}
          className="px-3.5 py-1.5 rounded-xl bg-[#111815] hover:bg-[#202a24] text-[#e8ece4] border border-[#35413b] hover:border-[#c9583c]/50 flex items-center gap-2 text-xs font-semibold transition active:scale-95 shadow-sm"
          title="Keyboard Shortcuts"
        >
          <Keyboard className="w-3.5 h-3.5 text-[#c9583c]" />
          <span className="hidden sm:inline">Shortcuts</span>
          <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-[#d4ec7a] bg-[#18211d] rounded border border-[#35413b]">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>

        {/* Audio Synthesizer Toggle */}
        <button
          onClick={() => {
            if (!soundEnabled) audioSynth.init();
            setSoundEnabled(!soundEnabled);
          }}
          className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition active:scale-95 shadow-sm ${
            soundEnabled
              ? "bg-[#25322c] border-[#718546] text-[#d4ec7a]"
              : "bg-[#111815] border-[#35413b] text-[#87918a] hover:text-[#e8ece4] hover:bg-[#202a24]"
          }`}
          title="Toggle Web Audio Synthesizer"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#d4ec7a]" />
              <span className="hidden sm:inline">Audio Synth</span>
              <div className="flex items-end gap-0.5 h-3.5 pl-1">
                <span className="w-0.5 bg-[#d4ec7a] rounded-full animate-wave-bar-1" />
                <span className="w-0.5 bg-[#d4ec7a] rounded-full animate-wave-bar-2" />
                <span className="w-0.5 bg-[#d4ec7a] rounded-full animate-wave-bar-3" />
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
