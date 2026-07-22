import React from 'react';
import { Terminal, Code2 } from 'lucide-react';
import VariableWatch from './VariableWatch.jsx';
import InfoCard from './InfoCard.jsx';

export default function CodeInspector({ currentAlgo, step }) {
  return (
    <div className="lg:col-span-5 border-r border-gray-800 p-4 flex flex-col gap-4 bg-[#0d1117] overflow-x-auto font-mono">
      {/* Pseudocode Execution Highlight Box */}
      <div className="flex flex-col gap-1.5">
        <div className="text-[11px] text-gray-500 uppercase tracking-wider font-bold flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            Source Code Execution
          </span>
          <span className="text-gray-600 text-[10px]">{currentAlgo.file}</span>
        </div>

        <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 text-xs overflow-x-auto shadow-inner">
          {currentAlgo.lines.map((line, i) => {
            const lineNum = i + 1;
            const active = step.line === lineNum;
            return (
              <div
                key={i}
                className={`flex items-center px-2 py-0.5 rounded transition-colors ${
                  active
                    ? "bg-blue-500/20 text-blue-200 border-l-2 border-blue-500 font-bold"
                    : "text-gray-400 opacity-80"
                }`}
              >
                <span className="w-7 text-right pr-3 text-gray-600 select-none text-[10px]">
                  {lineNum}
                </span>
                <span className="whitespace-pre font-mono">{line}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Variables Inspector Watch Window */}
      <VariableWatch vars={step.vars} />

      {/* Complexity Metadata Badge */}
      <InfoCard currentAlgo={currentAlgo} />
    </div>
  );
}
