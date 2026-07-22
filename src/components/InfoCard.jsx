import React from 'react';
import { Info, Zap, HardDrive, ShieldCheck } from 'lucide-react';

export default function InfoCard({ currentAlgo }) {
  return (
    <div className="bg-[#080910] p-3.5 rounded-xl border border-slate-800/80 text-xs flex flex-col gap-2.5 font-mono shadow-md">
      <div className="text-[11px] text-slate-400 font-semibold flex items-center gap-1.5">
        <Info className="w-3.5 h-3.5 text-indigo-400" />
        <span>Algorithm Specifications</span>
      </div>

      <p className="text-slate-300 text-[11px] leading-relaxed font-sans">
        {currentAlgo.desc}
      </p>

      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
        <div className="flex flex-col gap-0.5 bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
          <span className="text-slate-500 text-[10px] flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" /> Time
          </span>
          <span className="text-amber-300 font-bold font-mono">{currentAlgo.time}</span>
        </div>

        <div className="flex flex-col gap-0.5 bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
          <span className="text-slate-500 text-[10px] flex items-center gap-1">
            <HardDrive className="w-3 h-3 text-purple-400" /> Space
          </span>
          <span className="text-purple-300 font-bold font-mono">{currentAlgo.space}</span>
        </div>

        <div className="flex flex-col gap-0.5 bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
          <span className="text-slate-500 text-[10px] flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Stable
          </span>
          <span className="text-emerald-300 font-bold font-mono">{currentAlgo.stable}</span>
        </div>
      </div>
    </div>
  );
}
