import React from 'react';

export default function ChessboardVisualizer({ step, nQueensSize, onSetNQueensSize }) {
  const board = step.board || [];
  const N = step.N || nQueensSize || 4;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-[320px]">
      {/* Board Controls */}
      <div className="flex items-center gap-3 mb-4 text-xs font-sans text-slate-300">
        <span className="font-medium">Chessboard Size (N×N):</span>
        <div className="flex gap-1.5 font-mono">
          {[4, 5, 6].map(n => (
            <button
              key={n}
              onClick={() => onSetNQueensSize(n)}
              className={`px-3 py-1 rounded-lg border transition ${
                N === n
                  ? "bg-indigo-600 border-indigo-400 text-white font-bold shadow-md shadow-indigo-600/30"
                  : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {n}×{n}
            </button>
          ))}
        </div>
      </div>

      {/* Chessboard Grid */}
      <div
        className="grid gap-1.5 bg-slate-950 p-3.5 rounded-2xl border border-slate-800 shadow-2xl"
        style={{
          gridTemplateColumns: `repeat(${N}, minmax(0, 1fr))`
        }}
      >
        {board.map((row, rIdx) =>
          row.map((cell, cIdx) => {
            const isQueen = cell === 1;
            const isTesting = step.curr && step.curr[0] === rIdx && step.curr[1] === cIdx;
            const isDark = (rIdx + cIdx) % 2 === 1;

            return (
              <div
                key={`${rIdx}-${cIdx}`}
                className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-2xl font-bold rounded-xl transition-all duration-200 ${
                  isTesting
                    ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/50 scale-105"
                    : isQueen
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/50 glow-emerald-subtle"
                    : isDark
                    ? "bg-slate-900 border border-slate-800/80 text-slate-600"
                    : "bg-slate-850 border border-slate-800/60 text-slate-500"
                }`}
              >
                {isQueen ? "♛" : isTesting ? "❓" : ""}
              </div>
            );
          })
        )}
      </div>

      <div className="mt-4 text-xs font-sans text-slate-300 flex items-center gap-5">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-amber-400 inline-block" /> Testing Position
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-emerald-600 inline-block" /> Safe Queen
        </div>
      </div>
    </div>
  );
}
