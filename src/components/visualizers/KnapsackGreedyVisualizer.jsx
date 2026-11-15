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
                  ? "bg-[#2a2417] border-[#f4dd96] text-[#f4dd96] scale-105 shadow-xl"
                  : "bg-[#18211d] border-[#35413b] text-[#d5dbd3]"
              }`}
            >
              <div className="flex items-center justify-between font-bold text-sm text-[#c9583c] border-b border-[#35413b] pb-1">
                <span className="flex items-center gap-1 font-sans">
                  <Package className="w-4 h-4 text-[#c9583c]" /> Item #{it.id}
                </span>
                {isActive && step.fraction && (
                  <span className="text-[#f4dd96] text-xs font-bold flex items-center gap-0.5">
                    <Percent className="w-3 h-3" /> {(step.fraction * 100).toFixed(0)}%
                  </span>
                )}
              </div>
              <div>Value: <span className="text-[#d4ec7a] font-bold">${it.val}</span></div>
              <div>Weight: <span className="text-[#f4dd96] font-bold">{it.wt} kg</span></div>
              <div className="text-[#ffad8e] font-semibold pt-1 border-t border-[#35413b]">
                Profit Ratio: <span className="text-[#f5f4ed] font-bold">{it.ratio.toFixed(1)} $/kg</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Knapsack Capacity Liquid Gauge */}
      <div className="w-full max-w-[480px] bg-[#111815] p-4 rounded-2xl border border-[#35413b] flex flex-col gap-2 font-sans">
        <div className="flex justify-between text-xs text-[#d5dbd3] font-bold">
          <span>Knapsack Capacity Gauge</span>
          <span className="font-mono">
            <span className="text-[#d4ec7a]">{usedCap.toFixed(1)}kg</span> / {initialCap}kg
          </span>
        </div>

        <div className="w-full h-4 bg-[#18211d] rounded-full border border-[#35413b] overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-[#c9583c] via-[#f4dd96] to-[#d4ec7a] transition-all duration-300"
            style={{ width: `${fillPercent}%` }}
          />
        </div>

        <div className="flex justify-between text-[11px] text-[#a0aaa2] font-mono">
          <span>Remaining Capacity: <strong className="text-[#ffad8e]">{capacity.toFixed(1)} kg</strong></span>
          <span>Total Profit: <strong className="text-[#d4ec7a]">${(step.totalVal ?? 0).toFixed(2)}</strong></span>
        </div>
      </div>
    </div>
  );
}
