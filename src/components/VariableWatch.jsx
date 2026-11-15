import React from 'react';
import { Eye } from 'lucide-react';

export default function VariableWatch({ vars = {} }) {
  const entries = Object.entries(vars || {});

  return (
    <div className="bg-[#111815] p-3.5 rounded-xl border border-[#303a35] flex flex-col gap-2.5 font-mono shadow-md min-h-[115px] justify-between">
      {/* Header */}
      <div className="text-[11px] font-semibold flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[#edaa86]">
          <Eye className="w-4 h-4 text-[#edaa86]" />
          <span className="text-[#f5f4ed]">Variable Inspector</span>
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-[#d4ec7a] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c7df75] animate-pulse" />
          LIVE
        </span>
      </div>

      {/* Fixed-Height Grid Container (Prevents Height Shifting / Shaking) */}
      <div className="grid grid-cols-2 gap-2 text-xs min-h-[64px] content-start">
        {entries.length === 0 ? (
          <div className="text-[#707b73] text-[11px] italic col-span-2 text-center py-4 flex items-center justify-center bg-[#18211d]/60 rounded-lg border border-[#303a35]">
            [ Waiting for variable assignment... ]
          </div>
        ) : (
          entries.map(([k, v]) => (
            <div
              key={k}
              className="flex justify-between items-center bg-[#18211d] px-2.5 py-1.5 rounded-lg border border-[#35413b] hover:border-[#edaa86]/60 transition-all duration-150 group h-[30px]"
            >
              <span className="text-[#edaa86] font-bold text-xs">{k}:</span>
              <span className="text-[#d4ec7a] font-semibold text-xs max-w-[100px] truncate px-1.5 py-0.5 rounded bg-[#25322c] border border-[#3a4740] font-mono" title={String(v)}>
                {String(v)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
