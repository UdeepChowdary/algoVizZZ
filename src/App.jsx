import React, { useState } from 'react';
import Header from './components/Header.jsx';
import CategoryNav from './components/CategoryNav.jsx';
import ControlPanel from './components/ControlPanel.jsx';
import CodeInspector from './components/CodeInspector.jsx';
import ShortcutsModal from './components/ShortcutsModal.jsx';
import HomePage from './components/HomePage.jsx';

import ArrayVisualizer from './components/visualizers/ArrayVisualizer.jsx';
import GraphVisualizer from './components/visualizers/GraphVisualizer.jsx';
import MatrixDPVisualizer from './components/visualizers/MatrixDPVisualizer.jsx';
import ChessboardVisualizer from './components/visualizers/ChessboardVisualizer.jsx';
import KnapsackGreedyVisualizer from './components/visualizers/KnapsackGreedyVisualizer.jsx';
import TreeVisualizer from './components/visualizers/TreeVisualizer.jsx';

import { useVisualizer } from './hooks/useVisualizer.js';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts.js';
import { randomArray } from './utils/helpers.js';
import { Sparkles, Activity, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState("home"); // "home" | "studio"
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  const {
    algoKey,
    setAlgoKey,
    currentAlgo,
    size,
    setSize,
    baseArray,
    setBaseArray,
    handleSetCustomArray,
    searchTarget,
    setSearchTarget,
    nQueensSize,
    setNQueensSize,
    speed,
    setSpeed,
    stepIdx,
    playing,
    soundEnabled,
    setSoundEnabled,
    steps,
    step,
    isDone,
    handleShuffle,
    handlePlayPause,
    handleStepNext,
    handleStepPrev,
    handleReset,
    handleJumpToStep
  } = useVisualizer("selection");

  // Attach global keyboard shortcuts hook when in studio view
  useKeyboardShortcuts({
    onPlayPause: handlePlayPause,
    onStepNext: handleStepNext,
    onStepPrev: handleStepPrev,
    onReset: handleReset,
    onShuffle: handleShuffle,
    enabled: currentView === "studio" && !isShortcutsOpen
  });

  const handleLaunchStudio = (algoTarget) => {
    if (algoTarget && algoTarget !== "quick") {
      setAlgoKey(algoTarget);
    }
    setCurrentView("studio");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderVisualizerArea = () => {
    switch (currentAlgo.category) {
      case "sorting":
      case "searching":
        return (
          <ArrayVisualizer
            step={step}
            baseArray={baseArray}
            onSetCustomArray={handleSetCustomArray}
          />
        );
      case "graph":
        return (
          <GraphVisualizer
            step={step}
            currentAlgo={currentAlgo}
            playing={playing}
            onPlayPause={handlePlayPause}
          />
        );
      case "dp":
        return <MatrixDPVisualizer step={step} currentAlgo={currentAlgo} />;
      case "backtracking":
        return (
          <ChessboardVisualizer
            step={step}
            nQueensSize={nQueensSize}
            onSetNQueensSize={setNQueensSize}
          />
        );
      case "greedy":
        return <KnapsackGreedyVisualizer step={step} />;
      case "datastructures":
        return <TreeVisualizer step={step} />;
      default:
        return null;
    }
  };

  if (currentView === "home") {
    return (
      <HomePage
        onLaunchStudio={handleLaunchStudio}
        onSelectAlgorithm={(selectedKey) => handleLaunchStudio(selectedKey)}
      />
    );
  }

  return (
    <div className="min-h-screen studio-ambient-bg text-slate-200 font-sans p-3 md:p-6 flex flex-col gap-4 select-none max-w-[1600px] mx-auto animate-fadeIn">
      {/* Header */}
      <Header
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        onGoHome={() => setCurrentView("home")}
      />

      {/* Category Nav & Algorithm Dock */}
      <CategoryNav
        algoKey={algoKey}
        setAlgoKey={setAlgoKey}
        currentAlgo={currentAlgo}
      />

      {/* Main Execution Studio Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border border-slate-800/80 rounded-2xl overflow-hidden studio-card shadow-2xl">
        
        {/* Left Column: Code Inspector & Variables (5 cols) */}
        <CodeInspector currentAlgo={currentAlgo} step={step} />

        {/* Right Column: Visualizer Canvas Stage (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-[#080910] border-t lg:border-t-0 border-slate-800/80 lg:h-[580px] overflow-hidden">
          
          {/* Live Step Narrative Banner */}
          <div className="px-5 py-2.5 h-[44px] bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between gap-3 text-xs shrink-0">
            <div className="flex items-center gap-2.5 text-indigo-300 font-semibold truncate font-sans">
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 animate-pulse" />
              <span className="text-slate-400 font-mono">Step {stepIdx + 1}:</span>
              <span className="text-white truncate">{step.note || "Ready to execute algorithm step..."}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0 font-mono">
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-semibold">
                {currentAlgo.name}
              </span>
            </div>
          </div>

          {/* Main Visual Render Canvas */}
          {renderVisualizerArea()}

          {/* Step Stats Footer Bar */}
          <div className="px-6 py-2.5 border-t border-slate-800/80 text-xs flex justify-between items-center text-slate-400 bg-slate-950/90 font-mono">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
              <span>Progress:</span>
              <span className="text-indigo-400 font-bold">{Math.min(stepIdx + 1, steps.length)}</span>
              <span className="text-slate-600">/</span>
              <span>{steps.length}</span>
            </div>
            {isDone && (
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 font-sans text-xs glow-emerald-subtle">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Execution Complete!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Control Panel Dock */}
      <ControlPanel
        playing={playing}
        handlePlayPause={handlePlayPause}
        handleStepNext={handleStepNext}
        handleStepPrev={handleStepPrev}
        handleReset={handleReset}
        handleShuffle={handleShuffle}
        size={size}
        setSize={setSize}
        setBaseArray={setBaseArray}
        randomArray={randomArray}
        speed={speed}
        setSpeed={setSpeed}
        currentAlgo={currentAlgo}
        searchTarget={searchTarget}
        setSearchTarget={setSearchTarget}
        isDone={isDone}
        stepIdx={stepIdx}
        stepsCount={steps.length}
        handleJumpToStep={handleJumpToStep}
      />

      {/* Keyboard Shortcuts Modal */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
}
