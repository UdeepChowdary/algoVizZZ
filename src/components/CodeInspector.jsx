import React, { useState } from 'react';
import { Sparkles, FileCode, Code2, BookOpen } from 'lucide-react';
import VariableWatch from './VariableWatch.jsx';
import InfoCard from './InfoCard.jsx';
import AlgorithmExplanation from './AlgorithmExplanation.jsx';

export default function CodeInspector({ currentAlgo, step }) {
  const [activeTab, setActiveTab] = useState("code"); // "code" | "explanation"

  return (
    <div className="lg:col-span-5 border-r border-slate-800/80 p-4 md:p-5 flex flex-col justify-between gap-4 bg-[#0c0e17] font-mono lg:h-[580px] overflow-y-auto">
      <div className="flex flex-col gap-3">
        {/* Top Header & Tab Switcher */}
        <div className="flex items-center justify-between px-3 py-2 bg-slate-950/80 rounded-xl border border-slate-800/80 text-xs shrink-0">
          <div className="flex items-center gap-2 text-indigo-300 font-semibold truncate max-w-[180px]">
            <FileCode className="w-4 h-4 text-indigo-300 shrink-0" />
            <span className="text-white font-mono truncate">{currentAlgo.file}</span>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-900/90 rounded-lg border border-slate-800/80 font-sans">
            <button
              onClick={() => setActiveTab("code")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1.5 transition-all ${
                activeTab === "code"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-300 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Code</span>
            </button>
            <button
              onClick={() => setActiveTab("explanation")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1.5 transition-all ${
                activeTab === "explanation"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-300 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Explain</span>
            </button>
          </div>
        </div>

        {/* Tab 1 Content: Code Line Inspector */}
        {activeTab === "code" && (
          <div className="bg-[#080910] p-3 rounded-xl border border-slate-800/80 text-xs overflow-x-auto shadow-inner relative flex flex-col gap-0.5 animate-fadeIn">
            {currentAlgo.lines.map((line, i) => {
              const lineNum = i + 1;
              const active = step.line === lineNum;
              return (
                <div
                  key={i}
                  className={`flex items-center px-2 py-1 rounded-md transition-colors duration-100 border-l-[3px] h-[26px] ${
                    active
                      ? "bg-indigo-500/15 border-indigo-500 text-indigo-200 font-bold"
                      : "border-transparent text-slate-300 hover:text-slate-200"
                  }`}
                >
                  <span className={`w-7 text-right pr-2.5 select-none text-[10px] ${active ? "text-indigo-300 font-bold" : "text-slate-600"}`}>
                    {lineNum}
                  </span>
                  <span className="whitespace-pre font-mono flex-1 truncate">{line}</span>
                  <div className="w-4 h-4 flex items-center justify-center shrink-0 ml-1">
                    {active && <Sparkles className="w-3 h-3 text-indigo-300 animate-pulse" />}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2 Content: Algorithm Explanation */}
        {activeTab === "explanation" && (
          <AlgorithmExplanation currentAlgo={currentAlgo} />
        )}
      </div>

      {/* Footer Widgets (Only active in Code tab to maintain vertical rhythm) */}
      {activeTab === "code" && (
        <div className="flex flex-col gap-3">
          {/* Variables Inspector Watch Window */}
          <VariableWatch vars={step.vars} />

          {/* Complexity Metadata Badge */}
          <InfoCard currentAlgo={currentAlgo} />
        </div>
      )}
    </div>
  );
}
