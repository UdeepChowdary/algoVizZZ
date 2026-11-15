import React from 'react';
import { X, Keyboard } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c120f]/80 backdrop-blur-md p-4 font-sans">
      <div className="bg-[#171e19] p-6 max-w-md w-full rounded-2xl shadow-2xl flex flex-col gap-4 border border-[#35413b] animate-fadeIn text-[#e8ece4]">
        <div className="flex justify-between items-center border-b border-[#35413b] pb-3">
          <div className="flex items-center gap-2 text-white font-serif text-lg">
            <Keyboard className="w-5 h-5 text-[#c9583c]" />
            <span>Studio Keyboard Shortcuts</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-[#111815] hover:bg-[#202a24] text-[#a0aaa2] hover:text-white border border-[#35413b] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col gap-2 text-xs font-mono">
          {shortcuts.map((s, idx) => (
            <div key={idx} className="flex justify-between items-center p-2.5 rounded-xl bg-[#111815] border border-[#303a35]">
              <span className="text-[#e8ece4] font-sans text-xs">{s.desc}</span>
              <kbd className="px-2.5 py-1 rounded-lg bg-[#18211d] border border-[#35413b] text-[#d4ec7a] font-bold text-xs shadow-sm">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#c9583c] hover:bg-[#a7432c] text-white font-bold rounded-xl text-xs transition shadow-sm mt-1"
        >
          Close Shortcuts
        </button>
      </div>
    </div>
  );
}
