import React from 'react';
import { Lightbulb, Footprints, Rocket, Zap, HardDrive, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AlgorithmExplanation({ currentAlgo }) {
  const explanation = currentAlgo.explanation || {
    intuition: currentAlgo.desc,
    steps: [
      "Process input elements sequentially.",
      "Evaluate state updates at each execution step.",
      "Finalize output once termination condition is met."
    ],
    bestUsedFor: "General purpose algorithmic problem solving.",
    proTip: "Observe variable state changes on the right to understand step-by-step progress."
  };

  return (
    <div className="flex flex-col gap-4 text-xs font-sans animate-fadeIn py-1">
      {/* Intuition Box */}
      <div className="bg-slate-950/80 p-4 rounded-xl border border-indigo-500/30 shadow-inner flex flex-col gap-2">
        <div className="flex items-center gap-2 text-indigo-300 font-semibold font-mono text-[11px] uppercase tracking-wide">
          <Lightbulb className="w-4 h-4 text-amber-300 shrink-0 animate-pulse" />
          <span>Core Intuition</span>
        </div>
        <p className="text-slate-200 text-xs leading-relaxed font-normal">
          {explanation.intuition}
        </p>
      </div>

      {/* Step-by-Step Breakdown */}
      <div className="bg-[#080910] p-4 rounded-xl border border-slate-800/80 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-indigo-300 font-semibold font-mono text-[11px] uppercase tracking-wide">
          <Footprints className="w-4 h-4 text-indigo-300 shrink-0" />
          <span>Step-by-Step Execution</span>
        </div>
        
        <div className="flex flex-col gap-2.5">
          {explanation.steps.map((stepText, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/50">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-mono text-[11px] font-bold shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="text-slate-300 text-xs leading-normal">
                {stepText}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Real World Applications & Pro-Tip */}
      <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-emerald-300 font-semibold font-mono text-[11px] uppercase tracking-wide">
          <Rocket className="w-4 h-4 text-emerald-300 shrink-0" />
          <span>Real-World Application & Tip</span>
        </div>
        <p className="text-slate-300 text-xs leading-relaxed">
          {explanation.bestUsedFor}
        </p>
        {explanation.proTip && (
          <div className="mt-1 p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            <span>{explanation.proTip}</span>
          </div>
        )}
      </div>

      {/* Complexity Badges Summary */}
      <div className="grid grid-cols-3 gap-2 font-mono">
        <div className="flex flex-col gap-0.5 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80">
          <span className="text-slate-500 text-[10px] flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-300" /> Time
          </span>
          <span className="text-amber-300 font-bold text-xs">{currentAlgo.time}</span>
        </div>

        <div className="flex flex-col gap-0.5 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80">
          <span className="text-slate-500 text-[10px] flex items-center gap-1">
            <HardDrive className="w-3 h-3 text-purple-300" /> Space
          </span>
          <span className="text-purple-300 font-bold text-xs">{currentAlgo.space}</span>
        </div>

        <div className="flex flex-col gap-0.5 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80">
          <span className="text-slate-500 text-[10px] flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-300" /> Stable
          </span>
          <span className="text-emerald-300 font-bold text-xs">{currentAlgo.stable}</span>
        </div>
      </div>
    </div>
  );
}
