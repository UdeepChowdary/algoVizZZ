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
      <div className="bg-[#111815] p-4 rounded-xl border border-[#c9583c]/35 shadow-inner flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[#c9583c] font-semibold font-mono text-[11px] uppercase tracking-wide">
          <Lightbulb className="w-4 h-4 text-[#f4dd96] shrink-0 animate-pulse" />
          <span>Core Intuition</span>
        </div>
        <p className="text-[#d5dbd3] text-xs leading-relaxed font-normal">
          {explanation.intuition}
        </p>
      </div>

      {/* Step-by-Step Breakdown */}
      <div className="bg-[#111815] p-4 rounded-xl border border-[#303a35] flex flex-col gap-3">
        <div className="flex items-center gap-2 text-[#d4ec7a] font-semibold font-mono text-[11px] uppercase tracking-wide">
          <Footprints className="w-4 h-4 text-[#d4ec7a] shrink-0" />
          <span>Step-by-Step Execution</span>
        </div>
        
        <div className="flex flex-col gap-2.5">
          {explanation.steps.map((stepText, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-[#18211d] p-2.5 rounded-lg border border-[#35413b]">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#25322c] border border-[#3a4740] text-[#d4ec7a] font-mono text-[11px] font-bold shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="text-[#d5dbd3] text-xs leading-normal">
                {stepText}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Real World Applications & Pro-Tip */}
      <div className="bg-[#111815] p-3.5 rounded-xl border border-[#303a35] flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[#edaa86] font-semibold font-mono text-[11px] uppercase tracking-wide">
          <Rocket className="w-4 h-4 text-[#edaa86] shrink-0" />
          <span>Real-World Application & Tip</span>
        </div>
        <p className="text-[#a7b1a9] text-xs leading-relaxed">
          {explanation.bestUsedFor}
        </p>
        {explanation.proTip && (
          <div className="mt-1 p-2 rounded-lg bg-[#25322c] border border-[#3a4740] text-[#d4ec7a] text-[11px] flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#d4ec7a] shrink-0" />
            <span>{explanation.proTip}</span>
          </div>
        )}
      </div>

      {/* Complexity Badges Summary */}
      <div className="grid grid-cols-3 gap-2 font-mono">
        <div className="flex flex-col gap-0.5 bg-[#111815] p-2.5 rounded-xl border border-[#303a35]">
          <span className="text-[#87918a] text-[10px] flex items-center gap-1">
            <Zap className="w-3 h-3 text-[#f4dd96]" /> Time
          </span>
          <span className="text-[#f4dd96] font-bold text-xs">{currentAlgo.time}</span>
        </div>

        <div className="flex flex-col gap-0.5 bg-[#111815] p-2.5 rounded-xl border border-[#303a35]">
          <span className="text-[#87918a] text-[10px] flex items-center gap-1">
            <HardDrive className="w-3 h-3 text-[#edaa86]" /> Space
          </span>
          <span className="text-[#edaa86] font-bold text-xs">{currentAlgo.space}</span>
        </div>

        <div className="flex flex-col gap-0.5 bg-[#111815] p-2.5 rounded-xl border border-[#303a35]">
          <span className="text-[#87918a] text-[10px] flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#d4ec7a]" /> Stable
          </span>
          <span className="text-[#d4ec7a] font-bold text-xs">{currentAlgo.stable}</span>
        </div>
      </div>
    </div>
  );
}
