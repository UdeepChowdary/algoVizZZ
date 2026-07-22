import React, { useState } from 'react';
import Header from './components/Header.jsx';
import CategoryNav from './components/CategoryNav.jsx';
import ControlPanel from './components/ControlPanel.jsx';
import CodeInspector from './components/CodeInspector.jsx';
import ShortcutsModal from './components/ShortcutsModal.jsx';

import ArrayVisualizer from './components/visualizers/ArrayVisualizer.jsx';
import GraphVisualizer from './components/visualizers/GraphVisualizer.jsx';
import MatrixDPVisualizer from './components/visualizers/MatrixDPVisualizer.jsx';
import ChessboardVisualizer from './components/visualizers/ChessboardVisualizer.jsx';
import KnapsackGreedyVisualizer from './components/visualizers/KnapsackGreedyVisualizer.jsx';
import TreeVisualizer from './components/visualizers/TreeVisualizer.jsx';

import { useVisualizer } from './hooks/useVisualizer.js';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts.js';
import { randomArray } from './utils/helpers.js';

export default function App() {
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
  } = useVisualizer("selection");

  // Attach global keyboard shortcuts hook
  useKeyboardShortcuts({
    onPlayPause: handlePlayPause,
    onStepNext: handleStepNext,
    onStepPrev: handleStepPrev,
    onReset: handleReset,
    onShuffle: handleShuffle,
    enabled: !isShortcutsOpen
  });

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
        return <GraphVisualizer step={step} currentAlgo={currentAlgo} />;
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

  return (
    <div className="min-h-screen bg-[#090d13] text-[#c9d1d9] font-mono p-3 md:p-6 flex flex-col gap-4 select-none max-w-[1600px] mx-auto">
      {/* Header */}
      <Header
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      {/* Category Nav & File Tabs */}
      <CategoryNav
        algoKey={algoKey}
        setAlgoKey={setAlgoKey}
        currentAlgo={currentAlgo}
      />

      {/* Main Execution Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-gray-800 rounded-xl overflow-hidden bg-[#0d1117] shadow-2xl">
        
        {/* Left Column: Code Inspector & Variables (5 cols) */}
        <CodeInspector currentAlgo={currentAlgo} step={step} />

        {/* Right Column: Visualizer Canvas & Note Status Bar (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-[#0b0f15] border-t lg:border-t-0 border-gray-800">
          
          {/* Main Visual Render Canvas */}
          {renderVisualizerArea()}

          {/* Operation Note & Status Bar */}
          <div className="px-6 py-2.5 border-t border-gray-800/80 text-xs text-gray-400 flex items-center gap-2 bg-gray-950/90 font-mono">
            <span className="text-gray-600 font-bold">// Step Note:</span>
            <span className="text-blue-300 font-semibold truncate">
              {step.note || "Ready to visualize..."}
            </span>
          </div>

          {/* Step Stats Footer */}
          <div className="px-6 py-2 border-t border-gray-800/80 text-xs flex justify-between items-center text-gray-400 bg-gray-900/40 font-mono">
            <div>
              Step: <span className="text-white font-bold">{Math.min(stepIdx + 1, steps.length)}</span> / {steps.length}
            </div>
            {isDone && (
              <div className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
                Execution Complete!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Control Panel */}
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
      />

      {/* Shortcuts Modal */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
}
