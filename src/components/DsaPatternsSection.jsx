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
    <section id="patterns" className="px-4 md:px-8 py-16 max-w-[1400px] mx-auto w-full border-t border-[#35413b]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c9583c]/15 border border-[#c9583c]/30 text-[#ffad8e] text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5 text-[#ffad8e]" />
            <span>Master Problem-Solving Patterns</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#f0f2e9] font-serif tracking-tight">
            10 Core DSA Interview Patterns & LeetCode Blueprint
          </h2>
          <p className="text-[#acb6ab] text-sm mt-1 max-w-2xl">
            FAANG & top tech companies test pattern recognition. Master these 10 core blueprints and practice their directly linked LeetCode problems.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[260px] md:min-w-[320px]">
          <Search className="w-4 h-4 text-[#707b73] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pattern, trigger, or LeetCode question..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#111815] border border-[#35413b] rounded-xl text-xs text-[#f5f4ed] placeholder:text-[#707b73] focus:outline-none focus:border-[#c9583c]/60 transition font-sans"
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
                  ? "bg-[#c9583c] text-white font-bold shadow-md shadow-[#c9583c]/20"
                  : "bg-[#171e19] text-[#a0aaa2] border border-[#35413b] hover:text-[#f5f4ed] hover:bg-[#202b26]"
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
              className="p-6 rounded-2xl border border-[#35413b] hover:border-[#c9583c]/50 bg-[#171e19] transition flex flex-col justify-between gap-5 group shadow-xl relative overflow-hidden"
            >
              {/* Pattern Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#c9583c]/15 border border-[#c9583c]/30 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                    {pattern.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#f5f4ed] group-hover:text-[#ffad8e] transition">
                      {pattern.title}
                    </h3>
                    <span className="text-[10px] font-mono text-[#a0aaa2]">
                      {pattern.category} • <span className="text-[#d4ec7a] font-semibold">{pattern.difficulty}</span>
                    </span>
                  </div>
                </div>

                {/* Complexity Badges */}
                <div className="flex items-center gap-1.5 font-mono text-[10px] shrink-0">
                  <span className="px-2 py-1 rounded bg-[#d4ec7a]/15 border border-[#d4ec7a]/30 text-[#d4ec7a] font-bold flex items-center gap-1">
                    <Zap className="w-3 h-3 text-[#d4ec7a]" /> {pattern.timeComplexity}
                  </span>
                  <span className="px-2 py-1 rounded bg-[#c9583c]/15 border border-[#c9583c]/30 text-[#ffad8e] font-bold flex items-center gap-1">
                    <HardDrive className="w-3 h-3 text-[#ffad8e]" /> {pattern.spaceComplexity}
                  </span>
                </div>
              </div>

              {/* When to Use (Trigger) */}
              <div className="bg-[#111815] p-3.5 rounded-xl border border-[#303a35] flex flex-col gap-1 text-xs">
                <span className="text-[11px] font-mono font-semibold text-[#d4ec7a] uppercase tracking-wide flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-[#d4ec7a]" /> When to Use (Trigger Condition)
                </span>
                <p className="text-[#d5dbd3] leading-relaxed font-sans text-xs">
                  {pattern.whenToUse}
                </p>
              </div>

              {/* Core Concept Mental Model */}
              <div className="text-xs text-[#acb6ab] leading-relaxed">
                <strong className="text-[#f5f4ed]">Mental Model: </strong>
                <span className="text-[#d5dbd3]">{pattern.keyConcept}</span>
              </div>

              {/* Interactive LeetCode Problems Grid */}
              <div className="flex flex-col gap-2.5">
                <span className="text-[11px] font-mono font-semibold text-[#a0aaa2] uppercase tracking-wide flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#d4ec7a]" />
                  <span>Must-Practice LeetCode Questions:</span>
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pattern.leetCodeProblems.map((prob, idx) => {
                    const diffColor =
                      prob.difficulty === 'Easy'
                        ? 'text-[#d4ec7a] bg-[#d4ec7a]/10 border-[#d4ec7a]/30'
                        : prob.difficulty === 'Hard'
                        ? 'text-[#f87171] bg-rose-500/10 border-rose-500/30'
                        : 'text-[#ffad8e] bg-[#c9583c]/15 border-[#c9583c]/30';

                    return (
                      <a
                        key={idx}
                        href={prob.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-[#111815] border border-[#303a35] hover:border-[#c9583c]/60 hover:bg-[#202b26] transition flex items-center justify-between gap-2 group/link shadow-sm"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-[10px] font-mono font-bold text-[#707b73] shrink-0">
                            #{prob.number}
                          </span>
                          <span className="text-xs text-[#f5f4ed] group-hover/link:text-[#ffad8e] transition truncate font-medium">
                            {prob.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 font-mono text-[10px]">
                          <span className={`px-1.5 py-0.5 rounded border font-semibold ${diffColor}`}>
                            {prob.difficulty}
                          </span>
                          <ExternalLink className="w-3 h-3 text-[#707b73] group-hover/link:text-[#ffad8e] transition" />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Code Snippet Toggle */}
              <div className="pt-3 border-t border-[#303a35] flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => toggleCode(pattern.id)}
                    className="text-xs font-semibold text-[#d4ec7a] hover:text-[#e2f592] flex items-center gap-1.5 transition"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>{isCodeOpen ? "Hide Java Code Template" : "View Code Blueprint Template"}</span>
                    {isCodeOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {isCodeOpen && (
                    <button
                      onClick={() => copySnippet(pattern.id, pattern.codeSnippet)}
                      className="px-2.5 py-1 rounded bg-[#111815] border border-[#303a35] hover:bg-[#202b26] text-[11px] text-[#acb6ab] hover:text-[#f5f4ed] flex items-center gap-1 transition"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-[#d4ec7a]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? "Copied!" : "Copy Template"}</span>
                    </button>
                  )}
                </div>

                {isCodeOpen && (
                  <pre className="bg-[#0c120f] p-4 rounded-xl border border-[#303a35] text-xs font-mono text-[#d4ec7a] overflow-x-auto leading-relaxed shadow-inner">
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
