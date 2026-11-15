import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ALGORITHM_CATEGORIES, ALGORITHM_DATA } from '../data/algorithmData.js';
import {
  generateQuickSort,
  generateBubbleSort,
  generateSelectionSort,
  generateMergeSort
} from '../generators/sortingGenerators.js';
import {
  Play,
  Pause,
  Shuffle,
  Sparkles,
  ArrowRight,
  Terminal,
  Sliders,
  Grid,
  Cpu,
  Layers,
  ChevronRight,
  BarChart2,
  Home,
  BookOpen,
  Target,
  LayoutGrid,
  Search,
  X,
  Compass,
  Flame,
  Binary,
  Network,
  RotateCcw,
  Volume2,
  VolumeX,
  Zap
} from 'lucide-react';
import { randomArray } from '../utils/helpers.js';
import { audioSynth } from '../utils/audioSynth.js';
import FloatingCodeParticles from './FloatingCodeParticles.jsx';
import DsaSheetsSection from './DsaSheetsSection.jsx';
import DsaPatternsSection from './DsaPatternsSection.jsx';
import LeetCodeStats from './LeetCodeStats.jsx';

const CATEGORY_META = {
  sorting: {
    label: "Sorting",
    icon: BarChart2,
    badge: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
    gradient: "from-indigo-500/15 to-cyan-500/10",
    accent: "text-indigo-400"
  },
  searching: {
    label: "Searching",
    icon: Search,
    badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    gradient: "from-cyan-500/15 to-blue-500/10",
    accent: "text-cyan-400"
  },
  graph: {
    label: "Graph Traversal",
    icon: Network,
    badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    gradient: "from-emerald-500/15 to-teal-500/10",
    accent: "text-emerald-400"
  },
  dp: {
    label: "Dynamic Programming",
    icon: Layers,
    badge: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    gradient: "from-amber-500/15 to-orange-500/10",
    accent: "text-amber-400"
  },
  backtracking: {
    label: "Backtracking",
    icon: Sparkles,
    badge: "bg-rose-500/10 text-rose-300 border-rose-500/30",
    gradient: "from-rose-500/15 to-pink-500/10",
    accent: "text-rose-400"
  },
  greedy: {
    label: "Greedy",
    icon: Flame,
    badge: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30",
    gradient: "from-fuchsia-500/15 to-purple-500/10",
    accent: "text-fuchsia-400"
  },
  datastructures: {
    label: "Trees & Data Structures",
    icon: Binary,
    badge: "bg-violet-500/10 text-violet-300 border-violet-500/30",
    gradient: "from-violet-500/15 to-indigo-500/10",
    accent: "text-violet-400"
  }
};

const POPULAR_PICKS = [
  { key: "quick", label: "Quick Sort", category: "sorting", tag: "Divide & Conquer" },
  { key: "bfs", label: "A* & Grid Pathfinding", category: "graph", tag: "Heuristic Search" },
  { key: "knapsack01", label: "0/1 Knapsack", category: "dp", tag: "2D Heatmap" },
  { key: "nqueens", label: "N-Queens", category: "backtracking", tag: "Backtracking" },
  { key: "llCycleDetect", label: "Floyd's Cycle", category: "datastructures", tag: "Tortoise & Hare" },
  { key: "htChaining", label: "Hash Table Chaining", category: "datastructures", tag: "Collision Res." }
];

export default function HomePage({ onLaunchStudio, onSelectAlgorithm }) {
  // Navigation Tab State: "overview" | "sheets" | "patterns"
  const [activeTab, setActiveTab] = useState("overview");

  // Catalog Filter State
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Interactive Real Hero Demo Engine
  const HERO_INITIAL = [48, 18, 85, 32, 95, 12, 64, 28, 76, 52];
  const [heroAlgo, setHeroAlgo] = useState("quick");
  const [heroArray, setHeroArray] = useState(HERO_INITIAL);
  const [heroStepIdx, setHeroStepIdx] = useState(0);
  const [heroPlaying, setHeroPlaying] = useState(false);
  const [heroSound, setHeroSound] = useState(false);
  const timerRef = useRef(null);

  // Generate real deterministic steps for the hero demonstration
  const heroSteps = useMemo(() => {
    try {
      if (heroAlgo === "bubble") return generateBubbleSort(heroArray);
      if (heroAlgo === "selection") return generateSelectionSort(heroArray);
      if (heroAlgo === "merge") return generateMergeSort(heroArray);
      return generateQuickSort(heroArray);
    } catch {
      return [{ array: heroArray, note: "Ready", compare: [], swap: [], pivot: [], sortedIdx: [] }];
    }
  }, [heroAlgo, heroArray]);

  const currentStep = heroSteps[Math.min(heroStepIdx, Math.max(0, heroSteps.length - 1))] || {
    array: heroArray,
    note: "Ready",
    compare: [],
    swap: [],
    pivot: [],
    sortedIdx: []
  };

  const displayedArray = currentStep.array || heroArray;
  const isHeroDone = heroStepIdx >= heroSteps.length - 1;

  // Hero Playback Loop
  useEffect(() => {
    if (heroPlaying) {
      if (isHeroDone) {
        setHeroStepIdx(0);
      }
      timerRef.current = setInterval(() => {
        setHeroStepIdx(prev => {
          if (prev >= heroSteps.length - 1) {
            setHeroPlaying(false);
            if (heroSound) audioSynth.playVictoryFanfare();
            return prev;
          }
          const next = prev + 1;
          const step = heroSteps[next];
          if (heroSound && step) {
            if (step.compare && step.compare.length > 0) {
              const val = step.array ? step.array[step.compare[0]] || 40 : 40;
              audioSynth.playTone(280 + val * 8, "sine", 0.05, 0.03);
            } else if (step.swap && step.swap.length > 0) {
              audioSynth.playTone(540, "triangle", 0.06, 0.04);
            }
          }
          return next;
        });
      }, 230);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [heroPlaying, heroSteps, isHeroDone, heroSound]);

  const handleHeroShuffle = () => {
    const fresh = randomArray(10);
    setHeroArray(fresh);
    setHeroStepIdx(0);
    setHeroPlaying(false);
  };

  const handleHeroAlgoSwitch = (algo) => {
    setHeroAlgo(algo);
    setHeroStepIdx(0);
    setHeroPlaying(false);
  };

  // Filtered Algorithm Catalog List
  const allAlgorithmsList = useMemo(() => {
    return Object.entries(ALGORITHM_DATA).map(([key, data]) => ({
      key,
      ...data
    }));
  }, []);

  const filteredAlgorithms = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allAlgorithmsList.filter(algo => {
      const matchesCategory = selectedCategory === "all" || algo.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        algo.name.toLowerCase().includes(q) ||
        algo.desc.toLowerCase().includes(q) ||
        algo.file.toLowerCase().includes(q) ||
        algo.category.toLowerCase().includes(q) ||
        algo.time.toLowerCase().includes(q) ||
        algo.space.toLowerCase().includes(q)
      );
    });
  }, [allAlgorithmsList, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen studio-ambient-bg studio-grid-mesh text-slate-100 font-sans flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background Floating Code Snippets */}
      <FloatingCodeParticles />

      {/* Ambient Radial Lighting Spotlight Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-500/[0.08] blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-80 right-[-120px] w-[600px] h-[600px] bg-cyan-500/[0.06] blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[800px] left-[-100px] w-[500px] h-[500px] bg-emerald-500/[0.04] blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        
        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#06080d]/85 border-b border-white/[0.08] px-4 md:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("overview")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <Cpu className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                AlgoViz<span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Studio</span>
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                v2.0
              </span>
            </div>
          </div>

          {/* Navigation Portal Tabs */}
          <nav aria-label="Portal Navigation" className="hidden md:flex items-center gap-1.5 p-1 bg-[#0b0f19]/90 rounded-xl border border-white/[0.08] text-xs font-semibold">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                activeTab === "overview"
                  ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-600/30 font-bold"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Studio & Catalog</span>
            </button>

            <button
              onClick={() => setActiveTab("sheets")}
              className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                activeTab === "sheets"
                  ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-600/30 font-bold"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
              <span>Curated Sheets</span>
            </button>

            <button
              onClick={() => setActiveTab("patterns")}
              className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                activeTab === "patterns"
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/30 font-extrabold"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Target className="w-3.5 h-3.5 text-amber-300" />
              <span>10 Core Patterns</span>
            </button>
          </nav>

          <button
            onClick={() => onLaunchStudio()}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-indigo-600/25 active:scale-95"
          >
            <span>Launch Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </header>

        {/* Mobile Navigation Pills */}
        <div className="flex md:hidden items-center justify-around gap-1 p-2 bg-[#06080d]/95 border-b border-white/[0.08] text-xs font-semibold">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-1 rounded-md text-[11px] ${activeTab === "overview" ? "bg-indigo-600 text-white font-bold" : "text-slate-300"}`}
          >
            Studio
          </button>
          <button
            onClick={() => setActiveTab("sheets")}
            className={`px-3 py-1 rounded-md text-[11px] ${activeTab === "sheets" ? "bg-indigo-600 text-white font-bold" : "text-slate-300"}`}
          >
            DSA Sheets
          </button>
          <button
            onClick={() => setActiveTab("patterns")}
            className={`px-3 py-1 rounded-md text-[11px] ${activeTab === "patterns" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-300"}`}
          >
            10 Patterns
          </button>
        </div>

        {/* TAB 1: OVERVIEW, HERO & ALGORITHM CATALOG */}
        {activeTab === "overview" && (
          <div className="animate-fadeIn">
            {/* Hero Section */}
            <section className="px-4 md:px-8 pt-12 pb-16 max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12">
              
              {/* Left Column: Hero Copy & Value Prop */}
              <div className="flex-1 flex flex-col gap-6 text-left max-w-2xl">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold w-fit">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Real-Time Algorithmic Execution Studio</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                  Visualize Code In Motion. <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                    Master DSA Intuition.
                  </span>
                </h1>

                <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                  An engineering-grade studio environment bridging theoretical pseudocode with live execution state. Featuring line-by-line code tracing, variable watch synchronization, 2D terrain grid pathfinding, and pitch audio synthesis.
                </p>

                {/* Primary CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <button
                    onClick={() => onLaunchStudio()}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-600 hover:opacity-95 text-white font-bold text-sm flex items-center gap-2.5 transition shadow-xl shadow-indigo-600/30 active:scale-95"
                  >
                    <span>Launch Studio Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="#catalog"
                    className="px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 text-slate-200 border border-white/[0.1] text-sm font-semibold transition active:scale-95 flex items-center gap-2"
                  >
                    <LayoutGrid className="w-4 h-4 text-cyan-400" />
                    <span>Browse 22+ Algorithms</span>
                  </a>
                </div>

                {/* Quick Launch Chips */}
                <div className="flex flex-col gap-2 pt-2">
                  <span className="text-[11px] font-mono text-slate-400 font-semibold tracking-wider uppercase">
                    Quick Launch Popular Visualizers:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_PICKS.map(item => (
                      <button
                        key={item.key}
                        onClick={() => onSelectAlgorithm(item.key)}
                        className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-indigo-600/20 text-slate-300 hover:text-white border border-slate-800 hover:border-cyan-500/40 text-xs font-mono transition flex items-center gap-1.5 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:scale-125 transition" />
                        <span>{item.label}</span>
                        <span className="text-[10px] text-slate-500 group-hover:text-cyan-300 transition">({item.tag})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Metrics Counters */}
                <div className="grid grid-cols-4 gap-3 pt-6 border-t border-white/[0.08] text-xs font-mono">
                  <div>
                    <div className="text-white font-bold text-2xl font-sans">22+</div>
                    <div className="text-slate-400 text-[11px]">Core Algorithms</div>
                  </div>
                  <div>
                    <div className="text-cyan-300 font-bold text-2xl font-sans">4</div>
                    <div className="text-slate-400 text-[11px]">Pathfinding Modes</div>
                  </div>
                  <div>
                    <div className="text-indigo-300 font-bold text-2xl font-sans">9</div>
                    <div className="text-slate-400 text-[11px]">Curated Sheets</div>
                  </div>
                  <div>
                    <div className="text-emerald-300 font-bold text-2xl font-sans">10</div>
                    <div className="text-slate-400 text-[11px]">DSA Patterns</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Interactive Demo Sandbox Card */}
              <div className="flex-1 w-full max-w-xl studio-card p-5 rounded-2xl shadow-2xl border border-white/[0.1] flex flex-col gap-4 font-mono relative overflow-hidden">
                {/* Demo Card Header */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-white font-sans font-bold">Interactive Sandbox</span>
                  </div>

                  {/* Algorithm Selector Tabs */}
                  <div className="flex items-center gap-1 p-0.5 bg-[#06080d] rounded-lg border border-white/[0.08] text-[11px] font-sans">
                    {[
                      { id: "quick", label: "Quick" },
                      { id: "merge", label: "Merge" },
                      { id: "bubble", label: "Bubble" },
                      { id: "selection", label: "Selection" }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => handleHeroAlgoSwitch(tab.id)}
                        className={`px-2.5 py-1 rounded-md transition font-semibold ${
                          heroAlgo === tab.id
                            ? "bg-indigo-600 text-white shadow-sm"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step Narrative Line */}
                <div className="px-3 py-1.5 bg-[#06080d] rounded-lg border border-white/[0.08] text-[11px] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="text-slate-400 font-mono">Step {heroStepIdx + 1}/{heroSteps.length}:</span>
                    <span className="text-white truncate font-sans">{currentStep.note || "Ready to execute."}</span>
                  </div>
                  {isHeroDone && (
                    <span className="text-emerald-300 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                      Sorted!
                    </span>
                  )}
                </div>

                {/* Visualizer Bar Display */}
                <div className="h-[210px] flex items-end justify-center gap-2 px-3 pt-6 pb-2 bg-[#04060a] rounded-xl border border-white/[0.06] relative">
                  {displayedArray.map((val, idx) => {
                    const maxVal = Math.max(...displayedArray, 100);
                    const heightPercent = Math.max(14, (val / maxVal) * 100);
                    const isSorted = currentStep.sortedIdx?.includes(idx);
                    const isSwap = currentStep.swap?.includes(idx);
                    const isPivot = currentStep.pivot?.includes(idx);
                    const isCompare = currentStep.compare?.includes(idx);

                    let barColor = "bg-gradient-to-t from-indigo-700 via-indigo-600 to-cyan-400";
                    let textColor = "text-slate-400";
                    let badge = null;

                    if (isSorted) {
                      barColor = "bg-gradient-to-t from-emerald-600 to-teal-400";
                      textColor = "text-emerald-300";
                    } else if (isSwap) {
                      barColor = "bg-gradient-to-t from-rose-600 to-pink-400 shadow-[0_0_12px_rgba(244,63,94,0.6)]";
                      textColor = "text-rose-300";
                      badge = "SWAP";
                    } else if (isPivot) {
                      barColor = "bg-gradient-to-t from-purple-600 to-fuchsia-400 shadow-[0_0_12px_rgba(168,85,247,0.6)]";
                      textColor = "text-purple-300";
                      badge = "PIV";
                    } else if (isCompare) {
                      barColor = "bg-gradient-to-t from-amber-600 to-yellow-300 shadow-[0_0_12px_rgba(245,158,11,0.6)]";
                      textColor = "text-amber-300";
                      badge = "CMP";
                    }

                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full relative">
                        {badge && (
                          <span className="text-[9px] font-bold text-amber-300 font-mono tracking-tighter absolute -top-5">
                            {badge}
                          </span>
                        )}
                        <span className={`text-[10px] font-bold mb-1 ${textColor}`}>
                          {val}
                        </span>
                        <div
                          className={`w-full rounded-t-lg transition-all duration-150 ${barColor}`}
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Hero Controls */}
                <div className="flex items-center justify-between text-xs pt-1 font-sans">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setHeroPlaying(!heroPlaying)}
                      className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition text-xs ${
                        heroPlaying
                          ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md"
                          : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30"
                      }`}
                    >
                      {heroPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                      <span>{heroPlaying ? "Pause" : "Play"}</span>
                    </button>

                    <button
                      onClick={() => setHeroStepIdx(prev => Math.min(prev + 1, heroSteps.length - 1))}
                      disabled={heroPlaying || isHeroDone}
                      className="px-2.5 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-300 rounded-xl border border-white/[0.08] transition"
                      title="Step Forward"
                    >
                      Step
                    </button>

                    <button
                      onClick={() => setHeroStepIdx(0)}
                      className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-white/[0.08] transition"
                      title="Reset Step"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={handleHeroShuffle}
                      className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-white/[0.08] transition"
                      title="Randomize Array"
                    >
                      <Shuffle className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setHeroSound(!heroSound)}
                      className={`p-2 rounded-xl border transition ${
                        heroSound
                          ? "bg-indigo-600/20 text-cyan-300 border-indigo-500/40"
                          : "bg-slate-900 text-slate-500 border-white/[0.08]"
                      }`}
                      title={heroSound ? "Mute Sound" : "Enable Pitch Sound"}
                    >
                      {heroSound ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <button
                    onClick={() => onLaunchStudio(heroAlgo)}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition"
                  >
                    <span>Full Studio</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* LeetCode Tracker Banner Section */}
            <section className="px-4 md:px-8 py-6 max-w-[1400px] mx-auto w-full flex justify-center">
              <div className="w-full max-w-2xl">
                <LeetCodeStats />
              </div>
            </section>

            {/* Feature Bento Grid */}
            <section id="features" className="px-4 md:px-8 py-16 max-w-[1400px] mx-auto w-full border-t border-white/[0.08]">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-2">
                  <span>CORE ARCHITECTURE</span>
                </div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                  Engineered for Deep Algorithmic Intuition
                </h2>
                <p className="text-slate-400 text-sm mt-2">
                  Every feature is built to bridge abstract textbook algorithms with runtime execution state.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Bento Item 1: Code Inspector (Span 2 cols on lg) */}
                <div className="lg:col-span-2 studio-card p-6 rounded-2xl flex flex-col justify-between gap-4 border border-white/[0.08] hover:border-cyan-500/40 transition group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-cyan-300">
                        <Terminal className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">
                          Line-by-Line Synchronized Code Inspector
                        </h3>
                        <p className="text-slate-400 text-xs mt-0.5">
                          Inspect exact control flow in real time with synchronized variable watcher bindings.
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 w-fit">
                      SYNCHRONOUS EXECUTION
                    </span>
                  </div>

                  {/* Visual Code Preview Box */}
                  <div className="bg-[#05070c] rounded-xl p-3 border border-white/[0.08] font-mono text-xs overflow-x-auto flex flex-col gap-1 shadow-inner">
                    <div className="flex items-center text-slate-500 pb-1 border-b border-white/[0.08] text-[10px]">
                      <span className="w-8">LINE</span>
                      <span className="flex-1">SOURCE IMPLEMENTATION</span>
                      <span className="text-cyan-400">VARIABLE WATCH</span>
                    </div>
                    <div className="flex items-center text-slate-400">
                      <span className="w-8 text-slate-600">01</span>
                      <span className="flex-1">void quickSort(int[] arr, int low, int high) &#123;</span>
                    </div>
                    <div className="flex items-center bg-cyan-500/15 border-l-2 border-cyan-400 text-cyan-200 font-bold px-1 py-0.5 rounded-r">
                      <span className="w-8 text-cyan-400">02</span>
                      <span className="flex-1">  int p = partition(arr, low, high);</span>
                      <span className="text-[10px] text-amber-300 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">p = 3, pivot = 50</span>
                    </div>
                    <div className="flex items-center text-slate-400">
                      <span className="w-8 text-slate-600">03</span>
                      <span className="flex-1">  quickSort(arr, low, p - 1);</span>
                    </div>
                    <div className="flex items-center text-slate-400">
                      <span className="w-8 text-slate-600">04</span>
                      <span className="flex-1">  quickSort(arr, p + 1, high);</span>
                    </div>
                  </div>
                </div>

                {/* Bento Item 2: 2D Grid Pathfinding */}
                <div className="studio-card p-6 rounded-2xl flex flex-col justify-between gap-4 border border-white/[0.08] hover:border-emerald-500/40 transition group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                      <Grid className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition">
                        2D Terrain & Pathfinding
                      </h3>
                      <p className="text-slate-400 text-xs mt-0.5">
                        A* Search, Dijkstra, BFS, and DFS with mud terrain costs.
                      </p>
                    </div>
                  </div>

                  {/* Mini Grid Graphic */}
                  <div className="bg-[#05070c] rounded-xl p-2.5 border border-white/[0.08] flex flex-col gap-1">
                    <div className="grid grid-cols-8 gap-1 h-20">
                      {Array.from({ length: 32 }).map((_, i) => {
                        const isStart = i === 2;
                        const isEnd = i === 29;
                        const isWall = [10, 11, 18].includes(i);
                        const isPath = [2, 3, 4, 12, 20, 28, 29].includes(i);
                        return (
                          <div
                            key={i}
                            className={`rounded-sm transition-all ${
                              isStart
                                ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                                : isEnd
                                ? "bg-rose-500"
                                : isWall
                                ? "bg-slate-800 border border-slate-700"
                                : isPath
                                ? "bg-cyan-500/70"
                                : "bg-slate-900/60"
                            }`}
                          />
                        );
                      })}
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-1">
                      <span className="text-emerald-300">● Start</span>
                      <span className="text-cyan-400">▬ A* Path</span>
                      <span className="text-rose-400">■ Target</span>
                    </div>
                  </div>
                </div>

                {/* Bento Item 3: Web Audio Synth */}
                <div className="studio-card p-6 rounded-2xl flex flex-col justify-between gap-4 border border-white/[0.08] hover:border-purple-500/40 transition group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                      <Volume2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition">
                        Web Audio Pitch Synthesizer
                      </h3>
                      <p className="text-slate-400 text-xs mt-0.5">
                        Real-time frequencies mapped to data values and swaps.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#05070c] rounded-xl p-3 border border-white/[0.08] flex items-center justify-between gap-1.5 h-20 px-6">
                    {[14, 28, 42, 56, 75, 90, 52, 35, 65, 95, 45, 25].map((h, idx) => (
                      <div
                        key={idx}
                        className="w-1.5 bg-gradient-to-t from-purple-600 via-indigo-500 to-cyan-400 rounded-full"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Bento Item 4: Timeline Scrubber */}
                <div className="studio-card p-6 rounded-2xl flex flex-col justify-between gap-4 border border-white/[0.08] hover:border-amber-500/40 transition group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-300">
                      <Sliders className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition">
                        Timeline Scrubber & 50x Turbo
                      </h3>
                      <p className="text-slate-400 text-xs mt-0.5">
                        Scrub forward and back through full execution history.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#05070c] rounded-xl p-3 border border-white/[0.08] flex flex-col gap-2 font-mono text-[11px]">
                    <div className="flex justify-between text-slate-400">
                      <span>Timeline: Step 18</span>
                      <span className="text-amber-300 font-bold">50x Turbo Scaling</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden relative">
                      <div className="w-3/5 bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Bento Item 5: Keyboard Ergonomics */}
                <div className="studio-card p-6 rounded-2xl flex flex-col justify-between gap-4 border border-white/[0.08] hover:border-rose-500/40 transition group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-300">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-rose-300 transition">
                        Keyboard-First Studio Ergonomics
                      </h3>
                      <p className="text-slate-400 text-xs mt-0.5">
                        Zero friction keybindings for rapid studio iteration.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#05070c] rounded-xl p-2.5 border border-white/[0.08] flex items-center justify-around gap-2 font-mono text-xs">
                    <div className="flex flex-col items-center gap-1">
                      <kbd className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300 text-[10px] shadow">Space</kbd>
                      <span className="text-[10px] text-slate-500">Play</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <kbd className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300 text-[10px] shadow">← / →</kbd>
                      <span className="text-[10px] text-slate-500">Step</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <kbd className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300 text-[10px] shadow">R</kbd>
                      <span className="text-[10px] text-slate-500">Reset</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <kbd className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300 text-[10px] shadow">S</kbd>
                      <span className="text-[10px] text-slate-500">Shuffle</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Supported Algorithm Catalog Grid */}
            <section id="catalog" className="px-4 md:px-8 py-16 max-w-[1400px] mx-auto w-full border-t border-white/[0.08]">
              
              {/* Catalog Section Header & Search Toolbar */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-2">
                    <Compass className="w-3.5 h-3.5 text-cyan-400" />
                    <span>ALGORITHM REPOSITORY</span>
                  </div>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight">
                    Algorithm & Data Structure Catalog
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    Select any algorithm card below to launch directly into its dedicated visual environment.
                  </p>
                </div>

                {/* Instant Search Input */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 22+ algorithms..."
                    className="w-full bg-[#06080d] border border-white/[0.1] rounded-xl pl-10 pr-9 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition shadow-inner font-sans"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter Pills Bar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition flex items-center gap-1.5 ${
                    selectedCategory === "all"
                      ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-600/30"
                      : "bg-slate-900/80 text-slate-400 hover:text-white border border-white/[0.08]"
                  }`}
                >
                  <span>All Algorithms</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#06080d] text-cyan-300 font-mono">
                    {allAlgorithmsList.length}
                  </span>
                </button>

                {ALGORITHM_CATEGORIES.map(cat => {
                  const meta = CATEGORY_META[cat.id] || {};
                  const Icon = meta.icon || BarChart2;
                  const count = allAlgorithmsList.filter(a => a.category === cat.id).length;
                  const isActive = selectedCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition flex items-center gap-1.5 ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-600/30"
                          : "bg-slate-900/80 text-slate-400 hover:text-white border border-white/[0.08]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{cat.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#06080d] text-slate-300 font-mono">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Filtered Algorithm Cards Grid */}
              {filteredAlgorithms.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredAlgorithms.map(algo => {
                    const meta = CATEGORY_META[algo.category] || CATEGORY_META.sorting;
                    const IconComponent = meta.icon;

                    return (
                      <div
                        key={algo.key}
                        onClick={() => onSelectAlgorithm(algo.key)}
                        className="studio-card p-4 rounded-xl border border-white/[0.08] hover:border-cyan-500/50 hover:bg-[#0e1424] transition cursor-pointer flex flex-col justify-between gap-3 group shadow-lg hover:-translate-y-0.5 duration-200"
                      >
                        {/* Top Badges */}
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#06080d] border border-white/[0.08] text-slate-300">
                            {algo.file}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-300 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            {algo.time}
                          </span>
                        </div>

                        {/* Middle Content */}
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${meta.badge}`}>
                              <IconComponent className="w-3.5 h-3.5" />
                            </div>
                            <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition truncate">
                              {algo.name}
                            </h3>
                          </div>
                          <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                            {algo.desc}
                          </p>
                        </div>

                        {/* Footer Details */}
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-white/[0.08] font-mono">
                          <span className="truncate">Space: <strong className="text-purple-300 font-semibold">{algo.space}</strong></span>
                          <span className="flex items-center gap-1 text-cyan-400 font-sans font-semibold text-xs opacity-0 group-hover:opacity-100 transition transform group-hover:translate-x-0.5">
                            Open <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16 px-4 bg-[#06080d] rounded-2xl border border-white/[0.08] flex flex-col items-center justify-center gap-3">
                  <Search className="w-8 h-8 text-slate-600" />
                  <p className="text-white font-bold text-base">No algorithms match "{searchQuery}"</p>
                  <p className="text-slate-400 text-xs">Try searching by algorithm name, category keyword, or time complexity.</p>
                  <button
                    onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                    className="px-4 py-2 mt-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </section>
          </div>
        )}

        {/* TAB 2: CURATED DSA SHEETS */}
        {activeTab === "sheets" && (
          <div className="animate-fadeIn">
            <DsaSheetsSection onLaunchStudio={onLaunchStudio} />
          </div>
        )}

        {/* TAB 3: 10 CORE DSA PATTERNS */}
        {activeTab === "patterns" && (
          <div className="animate-fadeIn">
            <DsaPatternsSection />
          </div>
        )}

        {/* Studio Footer */}
        <footer className="border-t border-white/[0.08] px-4 md:px-8 py-8 text-center text-xs text-slate-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold font-sans">AlgoViz Studio</span>
            <span>• Interactive DSA Learning & Execution Platform</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onLaunchStudio()}
              className="text-cyan-400 hover:text-cyan-300 font-sans font-semibold transition"
            >
              Launch Visualizer Studio →
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
