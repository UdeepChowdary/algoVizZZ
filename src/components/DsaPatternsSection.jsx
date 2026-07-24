import React, { useState } from 'react';
import { DSA_PATTERNS } from '../data/dsaPatternsData.js';
import { Sparkles, Code2, ChevronDown, ChevronUp, Copy, Check, Search, Zap, HardDrive, HelpCircle, ExternalLink, Award } from 'lucide-react';

export default function DsaPatternsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedCode, setExpandedCode] = useState({}); // { [patternId]: boolean }
  const [copiedId, setCopiedId] = useState(null);

  const toggleCode = (id) => {
    setExpandedCode(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copySnippet = (id, snippet) => {
    navigator.clipboard.writeText(snippet);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = ['All', 'Arrays & Strings', 'Linked Lists & Cycles', 'Stacks & Arrays', 'Heaps & Data Structures', 'Searching & Binary Search', 'Graphs & Grids', 'Recursion & Trees', 'Dynamic Programming'];

  const filteredPatterns = DSA_PATTERNS.filter(pattern => {
    const matchesSearch =
      pattern.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pattern.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pattern.whenToUse.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pattern.leetCodeProblems.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || String(p.number).includes(searchQuery));

    if (selectedCategory === 'All') return matchesSearch;
    return matchesSearch && pattern.category === selectedCategory;
  });

  return (
    <section id="patterns" className="px-4 md:px-8 py-16 max-w-[1400px] mx-auto w-full border-t border-slate-800/80">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Master Problem-Solving Patterns</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            10 Core DSA Interview Patterns & LeetCode Blueprint
          </h2>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            FAANG & top tech companies test pattern recognition. Master these 10 core blueprints and practice their directly linked LeetCode problems.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[260px] md:min-w-[320px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pattern, trigger, or LeetCode question..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500/50 transition font-sans"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 text-xs no-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
                isActive
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                  : "bg-slate-900/90 text-slate-300 border border-slate-800 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid of Pattern Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPatterns.map((pattern) => {
          const isCodeOpen = expandedCode[pattern.id];
          const isCopied = copiedId === pattern.id;

          return (
            <div
              key={pattern.id}
              className="studio-card p-6 rounded-2xl border border-white/[0.08] hover:border-amber-500/40 bg-slate-950/90 transition flex flex-col justify-between gap-5 group shadow-xl relative overflow-hidden"
            >
              {/* Pattern Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                    {pattern.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white group-hover:text-amber-300 transition">
                      {pattern.title}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-300">
                      {pattern.category} • <span className="text-amber-300 font-semibold">{pattern.difficulty}</span>
                    </span>
                  </div>
                </div>

                {/* Complexity Badges */}
                <div className="flex items-center gap-1.5 font-mono text-[10px] shrink-0">
                  <span className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 font-bold flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-300" /> {pattern.timeComplexity}
                  </span>
                  <span className="px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300 font-bold flex items-center gap-1">
                    <HardDrive className="w-3 h-3 text-purple-300" /> {pattern.spaceComplexity}
                  </span>
                </div>
              </div>

              {/* When to Use (Trigger) */}
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800/80 flex flex-col gap-1 text-xs">
                <span className="text-[11px] font-mono font-semibold text-amber-300 uppercase tracking-wide flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-300" /> When to Use (Trigger Condition)
                </span>
                <p className="text-slate-300 leading-relaxed font-sans text-xs">
                  {pattern.whenToUse}
                </p>
              </div>

              {/* Core Concept Mental Model */}
              <div className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-slate-200">Mental Model: </strong>
                <span>{pattern.keyConcept}</span>
              </div>

              {/* Interactive LeetCode Problems Grid */}
              <div className="flex flex-col gap-2.5">
                <span className="text-[11px] font-mono font-semibold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span>Must-Practice LeetCode Questions:</span>
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pattern.leetCodeProblems.map((prob, idx) => {
                    const diffColor =
                      prob.difficulty === 'Easy'
                        ? 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20'
                        : prob.difficulty === 'Hard'
                        ? 'text-rose-300 bg-rose-500/10 border-rose-500/20'
                        : 'text-amber-300 bg-amber-500/10 border-amber-500/20';

                    return (
                      <a
                        key={idx}
                        href={prob.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900 transition flex items-center justify-between gap-2 group/link shadow-sm"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-[10px] font-mono font-bold text-slate-500 shrink-0">
                            #{prob.number}
                          </span>
                          <span className="text-xs text-slate-200 group-hover/link:text-amber-300 transition truncate font-medium">
                            {prob.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 font-mono text-[10px]">
                          <span className={`px-1.5 py-0.5 rounded border font-semibold ${diffColor}`}>
                            {prob.difficulty}
                          </span>
                          <ExternalLink className="w-3 h-3 text-slate-500 group-hover/link:text-amber-300 transition" />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Code Snippet Toggle */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => toggleCode(pattern.id)}
                    className="text-xs font-semibold text-amber-300 hover:text-amber-300 flex items-center gap-1.5 transition"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>{isCodeOpen ? "Hide Java Code Template" : "View Code Blueprint Template"}</span>
                    {isCodeOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {isCodeOpen && (
                    <button
                      onClick={() => copySnippet(pattern.id, pattern.codeSnippet)}
                      className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 text-[11px] text-slate-300 flex items-center gap-1 transition"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? "Copied!" : "Copy Template"}</span>
                    </button>
                  )}
                </div>

                {isCodeOpen && (
                  <pre className="bg-[#080910] p-4 rounded-xl border border-slate-800 text-xs font-mono text-indigo-200 overflow-x-auto leading-relaxed shadow-inner">
                    <code>{pattern.codeSnippet}</code>
                  </pre>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
