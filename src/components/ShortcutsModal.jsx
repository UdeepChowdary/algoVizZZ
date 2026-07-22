import React from 'react';
import { X, Keyboard, Command } from 'lucide-react';

export default function ShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: "Space", desc: "Toggle Play / Pause execution" },
    { key: "→", desc: "Step Forward to next algorithm step" },
    { key: "←", desc: "Step Backward to previous step" },
    { key: "R", desc: "Reset execution back to start" },
    { key: "S", desc: "Shuffle / Randomize visual input dataset" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 font-sans">
      <div className="studio-card p-6 max-w-md w-full rounded-2xl shadow-2xl flex flex-col gap-4 border border-white/10 animate-fadeIn">
        <div className="flex justify-between items-center border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <Keyboard className="w-5 h-5 text-indigo-400" />
            <span>Studio Keyboard Shortcuts</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col gap-2 text-xs font-mono">
          {shortcuts.map((s, idx) => (
            <div key={idx} className="flex justify-between items-center p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <span className="text-slate-300 font-sans text-xs">{s.desc}</span>
              <kbd className="px-2.5 py-1 rounded-lg bg-slate-850 border border-slate-700 text-indigo-300 font-bold text-xs shadow-sm">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition shadow-lg glow-indigo-subtle mt-1"
        >
          Close Modal
        </button>
      </div>
    </div>
  );
}
