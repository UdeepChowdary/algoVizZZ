import React from 'react';

export default function MatrixDPVisualizer({ step, currentAlgo }) {
  const table = step.dpTable || [];
  const s1 = step.s1;
  const s2 = step.s2;
  const items = step.items;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-[320px] overflow-x-auto">
      <div className="text-xs text-gray-400 mb-3 font-mono flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-400 inline-block animate-ping"></span>
        <span>2D Dynamic Programming State Table [i, j]</span>
      </div>

      <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 shadow-2xl overflow-x-auto">
        <table className="border-collapse font-mono text-xs text-center">
          <thead>
            {/* Column Headers for LCS or Knapsack */}
            <tr>
              <th className="p-2 border border-gray-800 bg-gray-900 text-gray-500 font-bold">i \ j</th>
              {s2 && s2.split('').map((char, jIdx) => (
                <th key={jIdx} className="p-2 border border-gray-800 bg-gray-900 text-emerald-400 font-bold">
                  {char} [{jIdx + 1}]
                </th>
              ))}
              {items && Array.from({ length: items.W + 1 }, (_, w) => (
                <th key={w} className="p-2 border border-gray-800 bg-gray-900 text-amber-400 font-bold">
                  w={w}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.map((row, rIdx) => (
              <tr key={rIdx}>
                {/* Row Header */}
                <td className="p-2 border border-gray-800 bg-gray-900 text-blue-400 font-bold">
                  {s1 && rIdx > 0 ? `${s1[rIdx - 1]} [${rIdx}]` : rIdx === 0 ? "Ø [0]" : `Item ${rIdx}`}
                </td>

                {row.map((cell, cIdx) => {
                  const isActive = step.activeCell && step.activeCell[0] === rIdx && step.activeCell[1] === cIdx;
                  return (
                    <td
                      key={cIdx}
                      className={`border border-gray-800 px-3.5 py-2.5 transition-all duration-200 ${
                        isActive
                          ? "bg-amber-400 text-black font-bold scale-110 shadow-lg shadow-amber-500/50"
                          : cell > 0
                          ? "bg-blue-950/60 text-blue-300 font-semibold"
                          : "bg-gray-950 text-gray-600"
                      }`}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formula Hint Box */}
      <div className="mt-4 p-2.5 rounded-lg bg-gray-900 border border-gray-800 text-[11px] font-mono text-gray-400 max-w-[480px] text-center">
        {currentAlgo.name.includes("Knapsack") ? (
          <span>Formula: <code className="text-amber-300">dp[i][w] = max(val + dp[i-1][w-wt], dp[i-1][w])</code></span>
        ) : (
          <span>Formula: <code className="text-emerald-300">dp[i][j] = (s1[i]==s2[j]) ? 1 + dp[i-1][j-1] : max(dp[i-1][j], dp[i][j-1])</code></span>
        )}
      </div>
    </div>
  );
}
