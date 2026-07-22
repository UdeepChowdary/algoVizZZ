import React from 'react';
import { X, Keyboard } from 'lucide-react';

export default function ShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: "Space", desc: "Toggle Play / Pause animation" },
    { key: "→ (Right Arrow)", desc: "Step Forward to next step" },
    { key: "← (Left Arrow)", desc: "Step Backward to previous step" },
    { key: "R", desc: "Reset execution to step 0" },
    { key: "S", desc: "Shuffle / Randomize array input" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 font-mono">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 max-w-md w-full shadow-2xl flex flex-col gap-4">
        <div className="flex justify-between items-center border-b border-gray-800 pb-3">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <Keyboard className="w-5 h-5 text-blue-400" />
            Keyboard Shortcuts
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-400 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col gap-2.5 text-xs">
          {shortcuts.map((s, idx) => (
            <div key={idx} className="flex justify-between items-center p-2 rounded bg-gray-950 border border-gray-800">
              <span className="text-gray-300">{s.desc}</span>
              <kbd className="px-2 py-1 rounded bg-gray-800 border border-gray-700 text-amber-300 font-bold text-[11px]">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs transition"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}
