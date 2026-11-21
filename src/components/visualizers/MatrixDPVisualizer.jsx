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
      <div className="w-full max-w-[600px] mb-4 bg-[#18211d] border border-[#35413b] rounded-xl p-3 shadow-lg">
        {!isKnapsack ? (
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 flex-1 min-w-[150px]">
              <span className="text-[#d5dbd3] font-bold">S1:</span>
              <input
                type="text"
                value={dpStrings?.s1 || ""}
                onChange={(e) => setDpStrings(prev => ({ ...prev, s1: e.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 8) }))}
                className="w-full px-2 py-1 bg-[#111815] border border-[#303a35] rounded-md text-[#d4ec7a] font-bold focus:outline-none focus:border-[#c9583c]"
                placeholder="String 1 (max 8)"
              />
            </div>
            <div className="flex items-center gap-2 flex-1 min-w-[150px]">
              <span className="text-[#d5dbd3] font-bold">S2:</span>
              <input
                type="text"
                value={dpStrings?.s2 || ""}
                onChange={(e) => setDpStrings(prev => ({ ...prev, s2: e.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 8) }))}
                className="w-full px-2 py-1 bg-[#111815] border border-[#303a35] rounded-md text-[#d4ec7a] font-bold focus:outline-none focus:border-[#c9583c]"
                placeholder="String 2 (max 8)"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <span className="text-[#d5dbd3] font-bold">Weights:</span>
                <input
                  type="text"
                  value={knapsackItems?.weights.join(",") || ""}
                  onChange={(e) => {
                    const parsed = e.target.value.split(',').map(n => parseInt(n.trim()) || 0).slice(0, 6);
                    setKnapsackItems(prev => ({ ...prev, weights: parsed }));
                  }}
                  className="w-full px-2 py-1 bg-[#111815] border border-[#303a35] rounded-md text-[#f4dd96] font-bold focus:outline-none focus:border-[#c9583c]"
                  placeholder="e.g. 2,3,4,5"
                />
              </div>
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <span className="text-[#d5dbd3] font-bold">Values:</span>
                <input
                  type="text"
                  value={knapsackItems?.values.join(",") || ""}
                  onChange={(e) => {
                    const parsed = e.target.value.split(',').map(n => parseInt(n.trim()) || 0).slice(0, 6);
                    setKnapsackItems(prev => ({ ...prev, values: parsed }));
                  }}
                  className="w-full px-2 py-1 bg-[#111815] border border-[#303a35] rounded-md text-[#d4ec7a] font-bold focus:outline-none focus:border-[#c9583c]"
                  placeholder="e.g. 3,4,5,6"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#d5dbd3] font-bold">Max Capacity (W):</span>
              <input
                type="number"
                value={knapsackItems?.capacity || 5}
                onChange={(e) => setKnapsackItems(prev => ({ ...prev, capacity: Math.min(20, Math.max(1, parseInt(e.target.value) || 1)) }))}
                className="w-20 px-2 py-1 bg-[#111815] border border-[#303a35] rounded-md text-[#c9583c] font-bold focus:outline-none focus:border-[#c9583c] text-center"
              />
              <span className="text-[#707b73] ml-2 italic">Max items: 6, Max Cap: 20</span>
            </div>
          </div>
        )}
      </div>

      <div className="text-xs text-[#d5dbd3] mb-3 font-sans flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#c9583c] inline-block animate-pulse" />
        <span className="font-medium">2D Dynamic Programming Memoization Table [i, j]</span>
      </div>

      <div className="bg-[#111815] p-4 rounded-2xl border border-[#35413b] shadow-2xl overflow-x-auto">
        <table className="border-collapse font-mono text-xs text-center">
          <thead>
            {/* Column Headers for LCS or Knapsack */}
            <tr>
              <th className="p-2 border border-[#35413b] bg-[#18211d] text-[#87918a] font-bold">i \ j</th>
              {s2 && <th className="p-2.5 border border-[#35413b] bg-[#18211d] text-[#87918a] font-bold">Ø [0]</th>}
              {s2 && s2.split('').map((char, jIdx) => (
                <th key={jIdx} className="p-2.5 border border-[#35413b] bg-[#18211d] text-[#d4ec7a] font-bold">
                  {char} [{jIdx + 1}]
                </th>
              ))}
              {items && Array.from({ length: items.W + 1 }, (_, w) => (
                <th key={w} className="p-2.5 border border-[#35413b] bg-[#18211d] text-[#f4dd96] font-bold">
                  {currentAlgo.name.includes("Coin") ? `amt=${w}` : `w=${w}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.map((row, rIdx) => (
              <tr key={rIdx}>
                {/* Row Header */}
                <td className="p-2.5 border border-[#35413b] bg-[#18211d] text-[#c9583c] font-bold">
                  {s1 && rIdx > 0
                    ? `${s1[rIdx - 1]} [${rIdx}]`
                    : rIdx === 0
                    ? "Ø [0]"
                    : currentAlgo.name.includes("Coin")
                    ? `Coin ${items?.weights?.[rIdx - 1] || rIdx}`
                    : `Item ${rIdx}`}
                </td>

                {row.map((cell, cIdx) => {
                  const isActive = step.activeCell && step.activeCell[0] === rIdx && step.activeCell[1] === cIdx;
                  return (
                    <td
                      key={cIdx}
                      className={`border border-[#303a35] px-3.5 py-2.5 transition-all duration-200 ${
                        isActive
                          ? "bg-[#c9583c] text-white font-black scale-110 shadow-lg"
                          : cell > 0 && cell < 99
                          ? "bg-[#25322c] text-[#d4ec7a] font-semibold"
                          : cell === 99
                          ? "bg-[#18211d] text-[#707b73]"
                          : "bg-[#111815] text-[#526058]"
                      }`}
                    >
                      {cell === 99 ? "∞" : cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formula Hint Box */}
      <div className="mt-4 p-3 rounded-xl bg-[#18211d] border border-[#35413b] text-[11px] font-mono text-[#d5dbd3] max-w-[550px] text-center shadow-md">
        {currentAlgo.name.includes("Knapsack") ? (
          <span>Formula: <code className="text-[#f4dd96]">dp[i][w] = max(val + dp[i-1][w-wt], dp[i-1][w])</code></span>
        ) : currentAlgo.name.includes("Coin") ? (
          <span>Formula: <code className="text-[#d4ec7a]">dp[i][a] = min(dp[i-1][a], 1 + dp[i][a - coin])</code></span>
        ) : currentAlgo.name.includes("Edit") ? (
          <span>Formula: <code className="text-[#ffad8e]">dp[i][j] = (s1[i]==s2[j]) ? dp[i-1][j-1] : 1 + min(Del, Ins, Rep)</code></span>
        ) : (
          <span>Formula: <code className="text-[#d4ec7a]">dp[i][j] = (s1[i]==s2[j]) ? 1 + dp[i-1][j-1] : max(dp[i-1][j], dp[i][j-1])</code></span>
        )}
      </div>
    </div>
  );
}
