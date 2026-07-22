import React from 'react';
import { Package, Percent } from 'lucide-react';

export default function KnapsackGreedyVisualizer({ step }) {
  const items = step.items || [];
  const capacity = step.capacity ?? 50;
  const initialCap = step.initialCapacity || 50;
  const usedCap = initialCap - capacity;
  const fillPercent = Math.min(100, Math.max(0, (usedCap / initialCap) * 100));

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 gap-6 min-h-[320px]">
      {/* Item Ratio Cards */}
      <div className="flex flex-wrap justify-center gap-4">
        {items.map((it, idx) => {
          const isActive = step.activeIdx === idx;
          return (
            <div
              key={it.id}
              className={`p-4 rounded-xl border font-mono text-xs flex flex-col gap-1.5 transition-all duration-300 ${
                isActive
                  ? "bg-amber-500/20 border-amber-400 text-amber-200 scale-105 shadow-xl shadow-amber-500/20"
                  : "bg-slate-900 border-slate-800 text-slate-300"
              }`}
            >
              <div className="flex items-center justify-between font-bold text-sm text-indigo-400 border-b border-slate-800 pb-1">
                <span className="flex items-center gap-1 font-sans">
                  <Package className="w-4 h-4 text-indigo-400" /> Item #{it.id}
                </span>
                {isActive && step.fraction && (
                  <span className="text-amber-400 text-xs font-bold flex items-center gap-0.5">
                    <Percent className="w-3 h-3" /> {(step.fraction * 100).toFixed(0)}%
                  </span>
                )}
              </div>
              <div>Value: <span className="text-emerald-400 font-bold">${it.val}</span></div>
              <div>Weight: <span className="text-amber-300 font-bold">{it.wt} kg</span></div>
              <div className="text-purple-300 font-semibold pt-1 border-t border-slate-800">
                Profit Ratio: <span className="text-white font-bold">{it.ratio.toFixed(1)} $/kg</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Knapsack Capacity Liquid Gauge */}
      <div className="w-full max-w-[480px] bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col gap-2 font-sans">
        <div className="flex justify-between text-xs text-slate-300 font-bold">
          <span>Knapsack Capacity Gauge</span>
          <span className="font-mono">
            <span className="text-emerald-400">{usedCap.toFixed(1)}kg</span> / {initialCap}kg
          </span>
        </div>

        <div className="w-full h-4 bg-slate-900 rounded-full border border-slate-800 overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 transition-all duration-300"
            style={{ width: `${fillPercent}%` }}
          />
        </div>

        <div className="flex justify-between text-[11px] text-slate-400 font-mono">
          <span>Remaining Capacity: <strong className="text-rose-400">{capacity.toFixed(1)} kg</strong></span>
          <span>Total Profit: <strong className="text-emerald-400">${step.totalVal?.toFixed(2) || 0}</strong></span>
        </div>
      </div>
    </div>
  );
}
