import React from 'react';

export default function ChessboardVisualizer({ step, nQueensSize, onSetNQueensSize }) {
  const board = step.board || [];
  const N = step.N || nQueensSize || 4;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-[320px]">
      {/* Board Controls */}
      <div className="flex items-center gap-3 mb-4 text-xs font-mono text-gray-300">
        <span>Chessboard Size (N×N):</span>
        <div className="flex gap-1.5">
          {[4, 5, 6].map(n => (
            <button
              key={n}
              onClick={() => onSetNQueensSize(n)}
              className={`px-2.5 py-1 rounded border transition ${
                N === n
                  ? "bg-purple-600 border-purple-400 text-white font-bold"
                  : "bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {n}×{n}
            </button>
          ))}
        </div>
      </div>

      {/* Chessboard Grid */}
      <div
        className="grid gap-1 bg-gray-950 p-3 rounded-xl border border-gray-800 shadow-2xl"
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
                className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-2xl font-bold rounded-md transition-all duration-200 ${
                  isTesting
                    ? "bg-amber-400 text-black shadow-lg shadow-amber-500/50 animate-pulse scale-105"
                    : isQueen
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/50"
                    : isDark
                    ? "bg-gray-900 border border-gray-800 text-gray-600"
                    : "bg-gray-800 border border-gray-700 text-gray-500"
                }`}
              >
                {isQueen ? "♛" : isTesting ? "❓" : ""}
              </div>
            );
          })
        )}
      </div>

      <div className="mt-4 text-xs font-mono text-gray-400 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-amber-400 inline-block"></span> Testing Position
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-emerald-600 inline-block"></span> Safe Queen
        </div>
      </div>
    </div>
  );
}
