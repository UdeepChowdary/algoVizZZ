import React, { useState } from 'react';
import { Sparkles, FileCode, Code2, BookOpen, Copy, Check } from 'lucide-react';
import VariableWatch from './VariableWatch.jsx';
import InfoCard from './InfoCard.jsx';
import AlgorithmExplanation from './AlgorithmExplanation.jsx';
import { SUPPORTED_LANGUAGES, getAlgorithmCode } from '../data/algorithmCodeData.js';

export default function CodeInspector({ algoKey, currentAlgo, step }) {
  const [activeTab, setActiveTab] = useState("code"); // "code" | "explanation"
  const [copied, setCopied] = useState(false);
  const [selectedLang, setSelectedLang] = useState(() => {
    try {
      return localStorage.getItem('algoViz_preferred_lang') || "java";
    } catch {
      return "java";
    }
  });

  const handleSelectLang = (langId) => {
    setSelectedLang(langId);
    try {
      localStorage.setItem('algoViz_preferred_lang', langId);
    } catch {
      // ignore
    }
  };

  const key = algoKey || currentAlgo.key || "selection";
  const codeData = getAlgorithmCode(key, selectedLang, currentAlgo);

  const handleCopyCode = () => {
    const fullCode = codeData.lines.join('\n');
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="lg:col-span-5 border-r border-[#35413b] p-4 md:p-5 flex flex-col justify-between gap-4 bg-[#18211d] font-mono lg:h-[580px] overflow-y-auto text-[#f4f2e9]">
      <div className="flex flex-col gap-3">
        {/* Top Header: File Name & Tab Switcher */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#111815] rounded-xl border border-[#35413b] text-xs shrink-0">
          <div className="flex items-center gap-2 text-[#c9583c] font-semibold truncate max-w-[200px]">
            <FileCode className="w-4 h-4 text-[#c9583c] shrink-0" />
            <span className="text-[#f5f4ed] font-mono truncate">{codeData.file}</span>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 p-0.5 bg-[#18211d] rounded-lg border border-[#35413b] font-sans">
            <button
              onClick={() => setActiveTab("code")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === "code"
                  ? "bg-[#d4ec7a] text-[#1e2923] shadow-sm"
                  : "text-[#99a49c] hover:text-white hover:bg-[#202a24]"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Code</span>
            </button>
            <button
              onClick={() => setActiveTab("explanation")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === "explanation"
                  ? "bg-[#d4ec7a] text-[#1e2923] shadow-sm"
                  : "text-[#99a49c] hover:text-white hover:bg-[#202a24]"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Explain</span>
            </button>
          </div>
        </div>

        {/* Tab 1 Content: Multi-Language Code Line Inspector */}
        {activeTab === "code" && (
          <div className="flex flex-col gap-2">
            {/* Language Switcher Bar & Copy Button */}
            <div className="flex items-center justify-between gap-2 text-xs font-sans">
              <div className="flex items-center gap-1 p-1 bg-[#111815] rounded-xl border border-[#35413b]">
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const isActive = selectedLang === lang.id;
                  return (
                    <button
                      key={lang.id}
                      onClick={() => handleSelectLang(lang.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1.5 ${
                        isActive
                          ? "bg-[#c9583c] text-white shadow-sm font-bold"
                          : "text-[#a0aaa2] hover:text-white hover:bg-[#18211d]"
                      }`}
                      title={`Switch to ${lang.label}`}
                    >
                      <span className="text-[12px]">{lang.icon}</span>
                      <span>{lang.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Copy Code Button */}
              <button
                onClick={handleCopyCode}
                className="px-2.5 py-1.5 rounded-xl bg-[#111815] hover:bg-[#202a24] text-[#a0aaa2] hover:text-[#f5f4ed] border border-[#35413b] flex items-center gap-1.5 text-[11px] font-mono transition active:scale-95 shadow-sm"
                title="Copy entire code snippet"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#d4ec7a]" />
                    <span className="text-[#d4ec7a]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Lines Stage */}
            <div className="bg-[#111815] p-3 rounded-xl border border-[#303a35] text-xs overflow-x-auto shadow-inner relative flex flex-col gap-0.5 animate-fadeIn">
              {codeData.lines.map((line, i) => {
                const lineNum = i + 1;
                const active = step.line === lineNum;
                return (
                  <div
                    key={i}
                    className={`flex items-center px-2 py-1 rounded-md transition-colors duration-100 border-l-[3px] h-[26px] ${
                      active
                        ? "bg-[#c9583c]/15 border-[#c9583c] text-[#f5f4ed] font-bold"
                        : "border-transparent text-[#9aa49c] hover:text-[#f4f2e9]"
                    }`}
                  >
                    <span className={`w-7 text-right pr-2.5 select-none text-[10px] ${active ? "text-[#c9583c] font-bold" : "text-[#526058]"}`}>
                      {lineNum}
                    </span>
                    <span className="whitespace-pre font-mono flex-1 truncate">{line}</span>
                    <div className="w-4 h-4 flex items-center justify-center shrink-0 ml-1">
                      {active && <Sparkles className="w-3 h-3 text-[#d4ec7a] animate-pulse" />}
                    </div>
                  </div>
                );
              })}
            </div>
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
