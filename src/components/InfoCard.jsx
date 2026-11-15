import React from 'react';
import { Info, Zap, HardDrive, ShieldCheck } from 'lucide-react';

export default function InfoCard({ currentAlgo }) {
  return (
    <div className="bg-[#111815] p-3.5 rounded-xl border border-[#303a35] text-xs flex flex-col gap-2.5 font-mono shadow-md">
      <div className="text-[11px] font-semibold flex items-center gap-1.5">
        <Info className="w-3.5 h-3.5 text-[#c9583c]" />
        <span className="text-[#f5f4ed]">Algorithm Specifications</span>
      </div>

      <p className="text-[#a7b1a9] text-[11px] leading-relaxed font-sans">
        {currentAlgo.desc}
      </p>

      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#303a35] text-[11px]">
        <div className="flex flex-col gap-0.5 bg-[#18211d] p-2 rounded-lg border border-[#35413b]">
          <span className="text-[#87918a] text-[10px] flex items-center gap-1">
            <Zap className="w-3 h-3 text-[#f4dd96]" /> Time
          </span>
          <span className="text-[#f4dd96] font-bold font-mono">{currentAlgo.time}</span>
        </div>

        <div className="flex flex-col gap-0.5 bg-[#18211d] p-2 rounded-lg border border-[#35413b]">
          <span className="text-[#87918a] text-[10px] flex items-center gap-1">
            <HardDrive className="w-3 h-3 text-[#edaa86]" /> Space
          </span>
          <span className="text-[#edaa86] font-bold font-mono">{currentAlgo.space}</span>
        </div>

        <div className="flex flex-col gap-0.5 bg-[#18211d] p-2 rounded-lg border border-[#35413b]">
          <span className="text-[#87918a] text-[10px] flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#d4ec7a]" /> Stable
          </span>
          <span className="text-[#d4ec7a] font-bold font-mono">{currentAlgo.stable}</span>
        </div>
      </div>
    </div>
  );
}
