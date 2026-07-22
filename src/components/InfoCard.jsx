import React from 'react';
import { Info, Zap, HardDrive, ShieldCheck } from 'lucide-react';

export default function InfoCard({ currentAlgo }) {
  return (
    <div className="bg-gray-950 p-3.5 rounded-lg border border-gray-800 text-xs flex flex-col gap-2 font-mono">
      <div className="text-[11px] text-gray-500 uppercase tracking-wider font-bold flex items-center gap-1.5">
        <Info className="w-3.5 h-3.5 text-blue-400" />
        Algorithm Complexity & Specs
      </div>

      <p className="text-gray-300 text-[11px] leading-relaxed">
        {currentAlgo.desc}
      </p>

      <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-gray-800 text-[11px]">
        <div className="flex flex-col gap-0.5">
          <span className="text-gray-500 text-[10px] flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" /> Time
          </span>
          <span className="text-white font-bold">{currentAlgo.time}</span>
        </div>

        <div className="flex flex-col gap-0.5">
          <span className="text-gray-500 text-[10px] flex items-center gap-1">
            <HardDrive className="w-3 h-3 text-purple-400" /> Space
          </span>
          <span className="text-white font-bold">{currentAlgo.space}</span>
        </div>

        <div className="flex flex-col gap-0.5">
          <span className="text-gray-500 text-[10px] flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Stable
          </span>
          <span className="text-white font-bold">{currentAlgo.stable}</span>
        </div>
      </div>
    </div>
  );
}
