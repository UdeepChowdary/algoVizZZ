import React from 'react';

export default function MatrixDPVisualizer({ 
  step, 
  currentAlgo,
  dpStrings,
  setDpStrings,
  knapsackItems,
  setKnapsackItems
}) {
  const table = step.dpTable || [];
  const s1 = step.s1;
  const s2 = step.s2;
  const items = step.items;
  const isKnapsack = currentAlgo.name.includes("Knapsack");

  return (
    <div className="flex-1 flex flex-col items-center justify-start p-4 overflow-y-auto">
      
      {/* Dynamic Input Panel */}
      <div className="w-full max-w-[600px] mb-4 bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-lg">
        {!isKnapsack ? (
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 flex-1 min-w-[150px]">
              <span className="text-slate-300 font-bold">S1:</span>
              <input
                type="text"
                value={dpStrings?.s1 || ""}
                onChange={(e) => setDpStrings(prev => ({ ...prev, s1: e.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 8) }))}
                className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded-md text-emerald-300 font-bold focus:outline-none focus:border-indigo-500"
                placeholder="String 1 (max 8)"
              />
            </div>
            <div className="flex items-center gap-2 flex-1 min-w-[150px]">
              <span className="text-slate-300 font-bold">S2:</span>
              <input
                type="text"
                value={dpStrings?.s2 || ""}
                onChange={(e) => setDpStrings(prev => ({ ...prev, s2: e.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 8) }))}
                className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded-md text-emerald-300 font-bold focus:outline-none focus:border-indigo-500"
                placeholder="String 2 (max 8)"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <span className="text-slate-300 font-bold">Weights:</span>
                <input
                  type="text"
                  value={knapsackItems?.weights.join(",") || ""}
                  onChange={(e) => {
                    const parsed = e.target.value.split(',').map(n => parseInt(n.trim()) || 0).slice(0, 6);
                    setKnapsackItems(prev => ({ ...prev, weights: parsed }));
                  }}
                  className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded-md text-amber-300 font-bold focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. 2,3,4,5"
                />
              </div>
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <span className="text-slate-300 font-bold">Values:</span>
                <input
                  type="text"
                  value={knapsackItems?.values.join(",") || ""}
                  onChange={(e) => {
                    const parsed = e.target.value.split(',').map(n => parseInt(n.trim()) || 0).slice(0, 6);
                    setKnapsackItems(prev => ({ ...prev, values: parsed }));
                  }}
                  className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded-md text-emerald-300 font-bold focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. 3,4,5,6"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-300 font-bold">Max Capacity (W):</span>
              <input
                type="number"
                value={knapsackItems?.capacity || 5}
                onChange={(e) => setKnapsackItems(prev => ({ ...prev, capacity: Math.min(20, Math.max(1, parseInt(e.target.value) || 1)) }))}
                className="w-20 px-2 py-1 bg-slate-950 border border-slate-700 rounded-md text-indigo-300 font-bold focus:outline-none focus:border-indigo-500 text-center"
              />
              <span className="text-slate-500 ml-2 italic">Max items: 6, Max Cap: 20</span>
            </div>
          </div>
        )}
      </div>

      <div className="text-xs text-slate-300 mb-3 font-sans flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-indigo-300 inline-block animate-pulse" />
        <span className="font-medium">2D Dynamic Programming Memoization Table [i, j]</span>
      </div>

      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-2xl overflow-x-auto">
        <table className="border-collapse font-mono text-xs text-center">
          <thead>
            {/* Column Headers for LCS or Knapsack */}
            <tr>
              <th className="p-2 border border-slate-800 bg-slate-900 text-slate-500 font-bold">i \ j</th>
              {s2 && s2.split('').map((char, jIdx) => (
                <th key={jIdx} className="p-2.5 border border-slate-800 bg-slate-900 text-emerald-300 font-bold">
                  {char} [{jIdx + 1}]
                </th>
              ))}
              {items && Array.from({ length: items.W + 1 }, (_, w) => (
                <th key={w} className="p-2.5 border border-slate-800 bg-slate-900 text-amber-300 font-bold">
                  w={w}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.map((row, rIdx) => (
              <tr key={rIdx}>
                {/* Row Header */}
                <td className="p-2.5 border border-slate-800 bg-slate-900 text-indigo-300 font-bold">
                  {s1 && rIdx > 0 ? `${s1[rIdx - 1]} [${rIdx}]` : rIdx === 0 ? "Ø [0]" : `Item ${rIdx}`}
                </td>

                {row.map((cell, cIdx) => {
                  const isActive = step.activeCell && step.activeCell[0] === rIdx && step.activeCell[1] === cIdx;
                  return (
                    <td
                      key={cIdx}
                      className={`border border-slate-800 px-3.5 py-2.5 transition-all duration-200 ${
                        isActive
                          ? "bg-amber-400 text-slate-950 font-black scale-110 shadow-lg shadow-amber-500/50"
                          : cell > 0
                          ? "bg-indigo-950/40 text-indigo-300 font-semibold"
                          : "bg-slate-950 text-slate-600"
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
      <div className="mt-4 p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 max-w-[500px] text-center">
        {currentAlgo.name.includes("Knapsack") ? (
          <span>Formula: <code className="text-amber-300">dp[i][w] = max(val + dp[i-1][w-wt], dp[i-1][w])</code></span>
        ) : (
          <span>Formula: <code className="text-emerald-300">dp[i][j] = (s1[i]==s2[j]) ? 1 + dp[i-1][j-1] : max(dp[i-1][j], dp[i][j-1])</code></span>
        )}
      </div>
    </div>
  );
}
