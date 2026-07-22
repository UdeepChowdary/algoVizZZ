import React from 'react';
import { Eye } from 'lucide-react';

export default function VariableWatch({ vars = {} }) {
  const entries = Object.entries(vars || {});

  return (
    <div className="bg-[#080910] p-3.5 rounded-xl border border-slate-800/80 flex flex-col gap-2.5 font-mono shadow-md min-h-[115px] justify-between">
      {/* Header */}
      <div className="text-[11px] text-slate-400 font-semibold flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-purple-400">
          <Eye className="w-4 h-4 text-purple-400" />
          <span>Variable Inspector</span>
        </span>
        <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          LIVE
        </span>
      </div>

      {/* Fixed-Height Grid Container (Prevents Height Shifting / Shaking) */}
      <div className="grid grid-cols-2 gap-2 text-xs min-h-[64px] content-start">
        {entries.length === 0 ? (
          <div className="text-slate-600 text-[11px] italic col-span-2 text-center py-4 flex items-center justify-center bg-slate-950/40 rounded-lg border border-slate-800/40">
            [ Waiting for variable assignment... ]
          </div>
        ) : (
          entries.map(([k, v]) => (
            <div
              key={k}
              className="flex justify-between items-center bg-slate-950/80 px-2.5 py-1.5 rounded-lg border border-slate-800/80 hover:border-purple-500/40 transition-all duration-150 group h-[30px]"
            >
              <span className="text-purple-400 font-bold text-xs group-hover:text-purple-300">{k}:</span>
              <span className="text-indigo-200 font-semibold text-xs max-w-[100px] truncate px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 font-mono" title={String(v)}>
                {String(v)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
