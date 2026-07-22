import React from 'react';
import { Sparkles, FileCode } from 'lucide-react';
import VariableWatch from './VariableWatch.jsx';
import InfoCard from './InfoCard.jsx';

export default function CodeInspector({ currentAlgo, step }) {
  return (
    <div className="lg:col-span-5 border-r border-slate-800/80 p-4 md:p-5 flex flex-col justify-between gap-4 bg-[#0c0e17] font-mono lg:h-[580px] overflow-y-auto">
      <div className="flex flex-col gap-3">
        {/* Code Editor Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-slate-950/80 rounded-xl border border-slate-800/80 text-xs shrink-0">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold">
            <FileCode className="w-4 h-4 text-indigo-400" />
            <span className="text-white font-mono">{currentAlgo.file}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
              {currentAlgo.lines.length} lines
            </span>
          </div>
        </div>

        {/* Code Block Inspector with Zero-Shift Borders */}
        <div className="bg-[#080910] p-3 rounded-xl border border-slate-800/80 text-xs overflow-x-auto shadow-inner relative flex flex-col gap-0.5">
          {currentAlgo.lines.map((line, i) => {
            const lineNum = i + 1;
            const active = step.line === lineNum;
            return (
              <div
                key={i}
                className={`flex items-center px-2 py-1 rounded-md transition-colors duration-100 border-l-[3px] h-[26px] ${
                  active
                    ? "bg-indigo-500/15 border-indigo-500 text-indigo-200 font-bold"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <span className={`w-7 text-right pr-2.5 select-none text-[10px] ${active ? "text-indigo-400 font-bold" : "text-slate-600"}`}>
                  {lineNum}
                </span>
                <span className="whitespace-pre font-mono flex-1 truncate">{line}</span>
                <div className="w-4 h-4 flex items-center justify-center shrink-0 ml-1">
                  {active && <Sparkles className="w-3 h-3 text-indigo-400 animate-pulse" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {/* Variables Inspector Watch Window */}
        <VariableWatch vars={step.vars} />

        {/* Complexity Metadata Badge */}
        <InfoCard currentAlgo={currentAlgo} />
      </div>
    </div>
  );
}
