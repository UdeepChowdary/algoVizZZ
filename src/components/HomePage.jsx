import React, { useState, useEffect } from 'react';
import { ALGORITHM_CATEGORIES, ALGORITHM_DATA } from '../data/algorithmData.js';
import {
  Play,
  Pause,
  Shuffle,
  Sparkles,
  ArrowRight,
  Code2,
  Terminal,
  Zap,
  Volume2,
  Sliders,
  Grid,
  GitGraph,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  ChevronRight,
  BarChart2,
  Home,
  BookOpen,
  Target,
  LayoutGrid
} from 'lucide-react';
import { randomArray } from '../utils/helpers.js';
import FloatingCodeParticles from './FloatingCodeParticles.jsx';
import DsaSheetsSection from './DsaSheetsSection.jsx';
import DsaPatternsSection from './DsaPatternsSection.jsx';

export default function HomePage({ onLaunchStudio, onSelectAlgorithm }) {
  // Navigation Tab State: "overview" | "sheets" | "patterns"
  const [activeTab, setActiveTab] = useState("overview");

  // Interactive Hero Demo State
  const [heroArray, setHeroArray] = useState([35, 75, 20, 90, 45, 60, 80, 30, 95, 50, 15, 65]);
  const [heroStep, setHeroStep] = useState(0);
  const [heroPlaying, setHeroPlaying] = useState(false);

  // Hero animation simulation
  useEffect(() => {
    if (heroPlaying) {
      const interval = setInterval(() => {
        setHeroStep(s => (s + 1) % 12);
        setHeroArray(prev => {
          const arr = [...prev];
          const i = Math.floor(Math.random() * (arr.length - 1));
          if (arr[i] > arr[i + 1]) {
            const tmp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = tmp;
          }
          return arr;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [heroPlaying]);

  const handleHeroShuffle = () => {
    setHeroArray(randomArray(12));
    setHeroStep(0);
  };

  return (
    <div className="min-h-screen studio-ambient-bg text-slate-200 font-sans flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background Floating Code Snippet Particles */}
      <FloatingCodeParticles />

      {/* Main Relative Layer Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        
        {/* Home Navigation Bar */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#090b10]/90 border-b border-white/[0.08] px-4 md:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("overview")}>
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.25)]">
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white">
                AlgoViz<span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Studio</span>
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                v1.0
              </span>
            </div>
          </div>

          {/* Navigation Portal Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800/80 text-xs font-semibold">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                activeTab === "overview"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20 font-bold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Overview & Catalog</span>
            </button>

            <button
              onClick={() => setActiveTab("sheets")}
              className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                activeTab === "sheets"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20 font-bold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              <span>DSA Sheets</span>
            </button>

            <button
              onClick={() => setActiveTab("patterns")}
              className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                activeTab === "patterns"
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-extrabold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              <Target className="w-3.5 h-3.5 text-amber-400" />
              <span>10 DSA Patterns</span>
            </button>
          </nav>

          <button
            onClick={() => onLaunchStudio()}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 transition shadow-lg glow-indigo-subtle active:scale-95"
          >
            <span>Launch Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </header>

        {/* Mobile Navigation Pills */}
        <div className="flex md:hidden items-center justify-around gap-1 p-2 bg-slate-950/90 border-b border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-1 rounded-md text-[11px] ${activeTab === "overview" ? "bg-indigo-600 text-white font-bold" : "text-slate-400"}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("sheets")}
            className={`px-3 py-1 rounded-md text-[11px] ${activeTab === "sheets" ? "bg-indigo-600 text-white font-bold" : "text-slate-400"}`}
          >
            DSA Sheets
          </button>
          <button
            onClick={() => setActiveTab("patterns")}
            className={`px-3 py-1 rounded-md text-[11px] ${activeTab === "patterns" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400"}`}
          >
            10 Patterns
          </button>
        </div>

        {/* TAB 1: OVERVIEW, HERO & ALGORITHM CATALOG */}
        {activeTab === "overview" && (
          <div className="animate-fadeIn">
            {/* Main Hero Section */}
            <section className="px-4 md:px-8 pt-12 pb-16 max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* Left Hero Text Content */}
              <div className="flex-1 flex flex-col gap-6 text-left max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold w-fit">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                  <span>Next-Gen Algorithm & Data Structure Visualizer</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                  Master Algorithms, <br />
                  <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                    Step-by-Step visually.
                  </span>
                </h1>

                <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                  An interactive studio environment engineered for computer science students and engineers. Featuring real-time code inspection, 2D pathfinding grid terrain, Web Audio sound synthesis, and timeline step scrubbing.
                </p>

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => onLaunchStudio()}
                    className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center gap-2.5 transition shadow-xl glow-indigo-subtle active:scale-95"
                  >
                    <span>Open Studio Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setActiveTab("sheets")}
                    className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-sm font-semibold transition active:scale-95 flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4 text-sky-400" />
                    <span>Explore DSA Sheets</span>
                  </button>
                </div>

                {/* Quick Metrics */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-xs text-slate-400 font-mono">
                  <div>
                    <div className="text-white font-bold text-lg font-sans">14+</div>
                    <div>Algorithms Supported</div>
                  </div>
                  <div>
                    <div className="text-indigo-400 font-bold text-lg font-sans">9</div>
                    <div>Curated DSA Sheets</div>
                  </div>
                  <div>
                    <div className="text-emerald-400 font-bold text-lg font-sans">10</div>
                    <div>Core Interview Patterns</div>
                  </div>
                </div>
              </div>

              {/* Right Interactive Hero Preview Card */}
              <div className="flex-1 w-full max-w-xl studio-card p-5 rounded-2xl shadow-2xl border border-white/10 flex flex-col gap-4 font-mono relative overflow-hidden">
                {/* Card Top Header */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 text-xs">
                  <div className="flex items-center gap-2 text-indigo-400 font-semibold font-sans">
                    <BarChart2 className="w-4 h-4" />
                    <span>Interactive Live Demo • Quick Sort</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                    LIVE PREVIEW
                  </span>
                </div>

                {/* Mini Interactive Bar Stage */}
                <div className="h-[220px] flex items-end justify-center gap-2 px-2 pt-6 pb-2 bg-slate-950/80 rounded-xl border border-slate-800/80">
                  {heroArray.map((val, idx) => {
                    const maxVal = Math.max(...heroArray, 100);
                    const heightPercent = Math.max(15, (val / maxVal) * 100);
                    const isComparing = idx === heroStep || idx === (heroStep + 1) % 12;

                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                        <span className={`text-[10px] font-bold mb-1 ${isComparing ? "text-amber-300" : "text-slate-400"}`}>
                          {val}
                        </span>
                        <div
                          className={`w-full rounded-t-lg transition-all duration-200 ${
                            isComparing
                              ? "bg-gradient-to-t from-amber-600 to-yellow-300 shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                              : "bg-gradient-to-t from-indigo-700 via-indigo-600 to-sky-400"
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Hero Demo Controls */}
                <div className="flex items-center justify-between text-xs pt-1 font-sans">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setHeroPlaying(!heroPlaying)}
                      className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition text-xs ${
                        heroPlaying
                          ? "bg-amber-500 hover:bg-amber-400 text-slate-950"
                          : "bg-indigo-600 hover:bg-indigo-500 text-white glow-indigo-subtle"
                      }`}
                    >
                      {heroPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                      <span>{heroPlaying ? "Pause Demo" : "Play Demo"}</span>
                    </button>

                    <button
                      onClick={handleHeroShuffle}
                      className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 transition"
                      title="Shuffle Array"
                    >
                      <Shuffle className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => onLaunchStudio("quick")}
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition"
                  >
                    <span>Launch Full Studio</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* Feature Bento Grid */}
            <section id="features" className="px-4 md:px-8 py-16 max-w-[1400px] mx-auto w-full border-t border-slate-800/80">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                  Engineered for Deep Algorithmic Intuition
                </h2>
                <p className="text-slate-400 text-sm mt-2">
                  Every feature is designed to bridge the gap between abstract code and visual execution state.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Bento Item 1: Code Inspector */}
                <div className="studio-card p-6 rounded-2xl flex flex-col gap-3 border border-white/[0.07] hover:border-indigo-500/30 transition group">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-1">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition">
                    Line-by-Line Code Inspector
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Watch exact execution lines highlight in real time across Java, Python, and C++ source implementations alongside dynamic Variable Scope Watcher cards.
                  </p>
                </div>

                {/* Bento Item 2: 2D Grid Pathfinding */}
                <div className="studio-card p-6 rounded-2xl flex flex-col gap-3 border border-white/[0.07] hover:border-indigo-500/30 transition group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-1">
                    <Grid className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition">
                    2D Grid & Terrain Pathfinding
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Interactive 2D grid matrix allowing custom wall barrier drawing, mud weight placement (+5 penalty), and real-time BFS/DFS/Dijkstra shortest path wave expansion.
                  </p>
                </div>

                {/* Bento Item 3: Web Audio Synth */}
                <div className="studio-card p-6 rounded-2xl flex flex-col gap-3 border border-white/[0.07] hover:border-indigo-500/30 transition group">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-1">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition">
                    Web Audio Pitch Synthesizer
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Experience sorting algorithms multi-sensorially with real-time Web Audio API pitch synthesis scaled dynamically to array element values and comparisons.
                  </p>
                </div>

                {/* Bento Item 4: Timeline Scrubber */}
                <div className="studio-card p-6 rounded-2xl flex flex-col gap-3 border border-white/[0.07] hover:border-indigo-500/30 transition group">
                  <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-1">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition">
                    Timeline Scrubber & 50x Turbo
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Scrub back and forth through execution history step-by-step or dial playback speed up to 50x Turbo speed for massive dataset visualization.
                  </p>
                </div>

                {/* Bento Item 5: DP & Tree Engine */}
                <div className="studio-card p-6 rounded-2xl flex flex-col gap-3 border border-white/[0.07] hover:border-indigo-500/30 transition group">
                  <div className="w-10 h-10 rounded-xl bg-sky-600/20 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-1">
                    <GitGraph className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition">
                    2D DP Heatmaps & BST Trees
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Visualize 0/1 Knapsack and LCS dynamic programming matrices with cell spotlight calculations and Binary Search Tree node insertion/traversal output streams.
                  </p>
                </div>

                {/* Bento Item 6: Keyboard Driven */}
                <div className="studio-card p-6 rounded-2xl flex flex-col gap-3 border border-white/[0.07] hover:border-indigo-500/30 transition group">
                  <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-1">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-rose-300 transition">
                    Keyboard-First Workflow
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Full keyboard shortcut support for rapid control: <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-indigo-300 font-mono">Space</kbd> Play/Pause, <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-indigo-300 font-mono">←/→</kbd> Step, <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-indigo-300 font-mono">R</kbd> Reset, <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-indigo-300 font-mono">S</kbd> Shuffle.
                  </p>
                </div>
              </div>
            </section>

            {/* Supported Algorithm Catalog Grid (Restored after Features Bento Grid) */}
            <section id="algorithms" className="px-4 md:px-8 py-16 max-w-[1400px] mx-auto w-full border-t border-slate-800/80">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight">
                    Supported Algorithm Catalog
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    Select any algorithm below to launch directly into its visual workspace.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Object.entries(ALGORITHM_DATA).map(([key, algo]) => (
                  <div
                    key={key}
                    onClick={() => onSelectAlgorithm(key)}
                    className="studio-card p-4 rounded-xl border border-white/[0.07] hover:border-indigo-500/50 hover:bg-slate-900/90 transition cursor-pointer flex flex-col justify-between gap-3 group shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-indigo-300">
                        {algo.file}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {algo.time}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-white group-hover:text-indigo-300 transition flex items-center justify-between">
                        <span>{algo.name}</span>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition text-indigo-400 transform group-hover:translate-x-1" />
                      </h3>
                      <p className="text-slate-400 text-xs leading-relaxed mt-1 line-clamp-2">
                        {algo.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/80 font-mono">
                      <span>Category: <strong className="text-slate-300 uppercase">{algo.category}</strong></span>
                      <span>Space: <strong className="text-purple-400">{algo.space}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
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
        <footer className="border-t border-slate-800/80 px-4 md:px-8 py-8 text-center text-xs text-slate-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold font-sans">AlgoViz Studio</span>
            <span>• Interactive DSA Learning Engine</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onLaunchStudio()}
              className="text-indigo-400 hover:text-indigo-300 font-sans font-semibold transition"
            >
              Launch Visualizer Studio →
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
