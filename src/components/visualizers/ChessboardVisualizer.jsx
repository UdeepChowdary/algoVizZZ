import React from 'react';

export default function ChessboardVisualizer({ step, nQueensSize, onSetNQueensSize }) {
  const board = step.board || [];
  const N = step.N || nQueensSize || 4;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-[320px]">
      {/* Board Controls */}
      <div className="flex items-center gap-3 mb-4 text-xs font-sans text-[#d5dbd3]">
        <span className="font-medium text-[#a0aaa2]">Chessboard Size (N×N):</span>
        <div className="flex gap-1.5 font-mono">
          {[4, 5, 6].map(n => (
            <button
              key={n}
              onClick={() => onSetNQueensSize(n)}
              className={`px-3 py-1 rounded-lg border transition ${
                N === n
                  ? "bg-[#c9583c] border-[#c9583c] text-white font-bold shadow-sm"
                  : "bg-[#18211d] border-[#35413b] text-[#d5dbd3] hover:bg-[#202a24] hover:text-white"
              }`}
            >
              {n}×{n}
            </button>
          ))}
        </div>
      </div>

      {/* Chessboard Grid */}
      <div
        className="grid gap-1.5 bg-[#111815] p-3.5 rounded-2xl border border-[#35413b] shadow-2xl"
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
                    ? "bg-[#f4dd96] text-[#111815] shadow-lg scale-105"
                    : isQueen
                    ? "bg-[#d4ec7a] text-[#111815] shadow-lg scale-105"
                    : isDark
                    ? "bg-[#18211d] border border-[#303a35] text-[#707b73]"
                    : "bg-[#222d27] border border-[#303a35] text-[#707b73]"
                }`}
              >
                {isQueen ? "♛" : isTesting ? "❓" : ""}
              </div>
            );
          })
        )}
      </div>

      <div className="mt-4 text-xs font-sans text-[#a0aaa2] flex items-center gap-5">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-[#f4dd96] inline-block" /> Testing Position
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-[#d4ec7a] inline-block" /> Safe Queen
        </div>
      </div>
    </div>
  );
}
