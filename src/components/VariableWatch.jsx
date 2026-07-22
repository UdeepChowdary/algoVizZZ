import React from 'react';
import { Eye } from 'lucide-react';

export default function VariableWatch({ vars = {} }) {
  const entries = Object.entries(vars || {});

  return (
    <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 flex flex-col gap-2 font-mono">
      <div className="text-[11px] text-gray-500 uppercase tracking-wider font-bold flex items-center gap-1.5">
        <Eye className="w-3.5 h-3.5 text-purple-400" />
        Variable Watch Window
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        {entries.length === 0 ? (
          <div className="text-gray-600 text-xs italic col-span-2">
            No active scope variables in current step
          </div>
        ) : (
          entries.map(([k, v]) => (
            <div
              key={k}
              className="flex justify-between items-center bg-gray-900/80 px-2.5 py-1.5 rounded border border-gray-800/80"
            >
              <span className="text-purple-400 font-semibold">{k}:</span>
              <span className="text-emerald-300 font-bold max-w-[120px] truncate" title={String(v)}>
                {String(v)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
