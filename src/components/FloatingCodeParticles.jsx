import React from 'react';

// Placed strictly on outer margins (left 2-4% and right 2-4%) to avoid central content text/buttons
const CODE_SNIPPETS = [
  { text: "swap(arr[i], arr[minIdx]);", top: "15%", left: "2%", anim: "animate-float-code-1", color: "text-[#c9583c]/35 border-[#c9583c]/20 bg-[#171e19]/40" },
  { text: "dist[v] = dist[u] + w;", top: "35%", right: "2%", anim: "animate-float-code-2", color: "text-[#d4ec7a]/35 border-[#d4ec7a]/20 bg-[#171e19]/40" },
  { text: "dp[i][w] = max(val + dp, dp);", top: "60%", left: "2%", anim: "animate-float-code-3", color: "text-[#edaa86]/35 border-[#edaa86]/20 bg-[#171e19]/40" },
  { text: "mid = (low + high) // 2", top: "75%", right: "3%", anim: "animate-float-code-1", color: "text-[#d4ec7a]/35 border-[#d4ec7a]/20 bg-[#171e19]/40" },
  { text: "q.push(startNode);", top: "85%", left: "3%", anim: "animate-float-code-2", color: "text-[#a0aaa2]/35 border-[#35413b]/30 bg-[#171e19]/40" },
  { text: "solve_nqueens(col + 1)", top: "18%", right: "2%", anim: "animate-float-code-3", color: "text-[#c9583c]/35 border-[#c9583c]/20 bg-[#171e19]/40" },
];

export default function FloatingCodeParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none">
      {CODE_SNIPPETS.map((chip, idx) => (
        <div
          key={idx}
          style={{
            top: chip.top,
            left: chip.left,
            right: chip.right,
          }}
          className={`absolute px-2.5 py-1 rounded-xl border font-mono text-[10px] font-medium pointer-events-none opacity-40 hidden xl:block ${chip.anim} ${chip.color}`}
        >
          <span className="opacity-40 font-mono text-[8px] mr-1 text-slate-600">//</span>
          {chip.text}
        </div>
      ))}
    </div>
  );
}
