import React, { useState, useEffect, useMemo } from 'react';
import { generateGridPathfindingSteps } from '../../generators/gridPathfindingGenerators.js';
import { Rocket, Target, Shield, Droplets, Trash2, Play, Pause, RotateCcw, Zap } from 'lucide-react';

const ROWS = 10;
const COLS = 18;

export default function GridPathfindingVisualizer({
  algorithm = "bfs",
  step: parentStep,
  stepIdx: parentStepIdx,
  playing: parentPlaying,
  onPlayPause,
  onSetStepIdx,
  speed: parentSpeed,
  setSpeed: parentSetSpeed,
  onSetCustomSteps
}) {
  const [startNode, setStartNode] = useState([2, 2]);
  const [endNode, setEndNode] = useState([7, 15]);
  const [walls, setWalls] = useState(new Set());
  const [mudCells, setMudCells] = useState(new Set());
  const [drawMode, setDrawMode] = useState("WALL"); // "WALL" | "MUD" | "START" | "END"
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Local fallback state if used standalone
  const [localStepIdx, setLocalStepIdx] = useState(0);
  const [localPlaying, setLocalPlaying] = useState(false);
  const [localSpeed, setLocalSpeed] = useState(85);

  const nodeKey = (r, c) => `${r}-${c}`;

  // Global mouseup listener for drag drawing safety
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsMouseDown(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  // Generate steps based on current grid state and algorithm
  const generatedSteps = useMemo(() => {
    return generateGridPathfindingSteps({
      algorithm,
      startNode,
      endNode,
      walls,
      mudCells
    });
  }, [algorithm, startNode, endNode, walls, mudCells]);

  // Sync generated steps to parent if callback is provided
  useEffect(() => {
    if (onSetCustomSteps) {
      onSetCustomSteps(generatedSteps);
    }
    if (onSetStepIdx) {
      onSetStepIdx(0);
    } else {
      setLocalStepIdx(0);
      setLocalPlaying(false);
    }
  }, [generatedSteps, onSetCustomSteps, onSetStepIdx]);

  // Determine current active step & control values
  const currentStepIdx = parentStepIdx !== undefined ? parentStepIdx : localStepIdx;
  const isPlaying = parentPlaying !== undefined ? parentPlaying : localPlaying;
  const currentSpeed = parentSpeed !== undefined ? parentSpeed : localSpeed;

  const currentStep = parentStep?.gridState ? parentStep : (generatedSteps[Math.min(currentStepIdx, generatedSteps.length - 1)] || {});
  const gridState = currentStep.gridState || { visited: [], path: [], current: null };

  const visitedSet = useMemo(() => new Set(gridState.visited || []), [gridState.visited]);
  const pathSet = useMemo(() => {
    const set = new Set();
    (gridState.path || []).forEach(([r, c]) => set.add(nodeKey(r, c)));
    return set;
  }, [gridState.path]);

  // Local animation loop fallback if no parent controls provided
  useEffect(() => {
    if (!onPlayPause && isPlaying) {
      let delay = 0;
      let stepIncrement = 1;

      if (currentSpeed <= 50) {
        delay = 550 - currentSpeed * 10;
      } else if (currentSpeed <= 85) {
        delay = Math.max(3, 50 - (currentSpeed - 50) * 1.3);
      } else {
        delay = 0;
        stepIncrement = Math.floor(1 + (currentSpeed - 85) * 0.4);
      }

      const timer = setTimeout(() => {
        setLocalStepIdx(s => {
          const next = s + stepIncrement;
          if (next >= generatedSteps.length - 1) {
            setLocalPlaying(false);
            return generatedSteps.length - 1;
          }
          return next;
        });
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [onPlayPause, isPlaying, currentStepIdx, generatedSteps.length, currentSpeed]);

  const handleTogglePlay = () => {
    if (onPlayPause) {
      onPlayPause();
    } else {
      if (localStepIdx >= generatedSteps.length - 1) setLocalStepIdx(0);
      setLocalPlaying(prev => !prev);
    }
  };

  const handleResetWave = () => {
    if (onSetStepIdx) {
      onSetStepIdx(0);
    } else {
      setLocalStepIdx(0);
      setLocalPlaying(false);
    }
  };

  const handleSetSpeed = (val) => {
    if (parentSetSpeed) {
      parentSetSpeed(val);
    } else {
      setLocalSpeed(val);
    }
  };

  const handleCellClick = (r, c) => {
    if (r === startNode[0] && c === startNode[1]) return;
    if (r === endNode[0] && c === endNode[1]) return;

    const key = nodeKey(r, c);

    if (drawMode === "START") {
      setStartNode([r, c]);
      setWalls(prev => { const n = new Set(prev); n.delete(key); return n; });
      setMudCells(prev => { const n = new Set(prev); n.delete(key); return n; });
    } else if (drawMode === "END") {
      setEndNode([r, c]);
      setWalls(prev => { const n = new Set(prev); n.delete(key); return n; });
      setMudCells(prev => { const n = new Set(prev); n.delete(key); return n; });
    } else if (drawMode === "MUD") {
      setMudCells(prev => {
        const next = new Set(prev);
        if (next.has(key)) next.delete(key);
        else {
          next.add(key);
          setWalls(w => { const nw = new Set(w); nw.delete(key); return nw; });
        }
        return next;
      });
    } else {
      // WALL
      setWalls(prev => {
        const next = new Set(prev);
        if (next.has(key)) next.delete(key);
        else {
          next.add(key);
          setMudCells(m => { const nm = new Set(m); nm.delete(key); return nm; });
        }
        return next;
      });
    }
  };

  const handleMouseEnter = (r, c) => {
    if (isMouseDown) {
      handleCellClick(r, c);
    }
  };

  const handleClearBoard = () => {
    setWalls(new Set());
    setMudCells(new Set());
    handleResetWave();
  };

  return (
    <div
      className="flex-1 flex flex-col justify-between p-4 min-h-[360px] font-mono select-none"
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
    >
      {/* Drawing Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 text-xs border-b border-slate-800/80 pb-3 font-sans">
        <div className="flex items-center gap-2">
          <span className="text-slate-300 font-medium mr-1">Drawing Tool:</span>
          {[
            { id: "WALL", label: "Wall Barrier", icon: Shield, color: "bg-slate-900 text-slate-300 border-slate-800" },
            { id: "MUD", label: "Mud (+5)", icon: Droplets, color: "bg-amber-950/40 text-amber-300 border-amber-800/60" },
            { id: "START", label: "Start Node", icon: Rocket, color: "bg-emerald-950/40 text-emerald-300 border-emerald-800/60" },
            { id: "END", label: "Target Node", icon: Target, color: "bg-rose-950/40 text-rose-300 border-rose-800/60" }
          ].map(tool => {
            const IconComponent = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => setDrawMode(tool.id)}
                className={`px-3 py-1.5 rounded-xl border font-semibold flex items-center gap-1.5 transition ${
                  drawMode === tool.id
                    ? "bg-indigo-600 border-indigo-400 text-white shadow-md glow-indigo-subtle scale-105"
                    : tool.color + " hover:bg-slate-800"
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{tool.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClearBoard}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-rose-500/40 transition flex items-center gap-1.5 active:scale-95"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-300" />
            <span>Clear Grid</span>
          </button>
        </div>
      </div>

      {/* 2D Interactive Grid Canvas */}
      <div className="flex-1 w-full flex items-center justify-center p-1 sm:p-2 min-h-0 overflow-x-auto">
        <div
          className="grid gap-[1px] sm:gap-[2px] md:gap-1 bg-[#080910] p-1 sm:p-2 md:p-3 rounded-xl border border-slate-800/80 shadow-2xl min-w-[300px] max-w-[95vw] lg:max-w-[600px] m-auto"
          style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: ROWS }).map((_, r) =>
            Array.from({ length: COLS }).map((_, c) => {
              const key = nodeKey(r, c);
              const isStart = r === startNode[0] && c === startNode[1];
              const isEnd = r === endNode[0] && c === endNode[1];
              const isWall = walls.has(key);
              const isMud = mudCells.has(key);
              const isCurrent = gridState.current && gridState.current[0] === r && gridState.current[1] === c;
              const isPath = pathSet.has(key);
              const isVisited = visitedSet.has(key);

              let cellStyle = "bg-slate-900/60 border-slate-800/80 hover:border-indigo-500/50";
              let content = null;

              if (isStart) {
                cellStyle = isPath
                  ? "bg-emerald-600 border-amber-400 text-white font-bold glow-emerald-subtle scale-110 ring-2 ring-amber-400 z-20"
                  : "bg-emerald-600 border-emerald-400 text-white font-bold glow-emerald-subtle scale-105";
                content = <Rocket className="w-[60%] h-[60%] text-white" />;
              } else if (isEnd) {
                cellStyle = isPath
                  ? "bg-rose-600 border-amber-400 text-white font-bold scale-110 shadow-[0_0_20px_rgba(251,191,36,1)] ring-2 ring-amber-400 z-20 animate-bounce"
                  : "bg-rose-600 border-rose-400 text-white font-bold glow-rose-subtle scale-105";
                content = <Target className="w-[60%] h-[60%] text-white" />;
              } else if (isPath) {
                cellStyle = "bg-amber-400 border-amber-300 text-black font-bold scale-110 shadow-[0_0_15px_rgba(251,191,36,0.8)] z-10";
                content = <span className="w-[30%] h-[30%] rounded-full bg-slate-950"></span>;
              } else if (isCurrent) {
                cellStyle = "bg-purple-500 border-purple-300 text-white font-bold scale-110 z-10";
              } else if (isVisited) {
                cellStyle = "bg-indigo-600/30 border-indigo-500/50 text-indigo-200";
              } else if (isWall) {
                cellStyle = "bg-slate-950 border-slate-800 shadow-inner";
                content = <Shield className="w-[60%] h-[60%] text-slate-600" />;
              } else if (isMud) {
                cellStyle = "bg-amber-950/50 border-amber-800/60 text-amber-300";
                content = <span className="text-[7px] sm:text-[9px] font-extrabold text-amber-300 leading-none">+5</span>;
              }

              return (
                <div
                  key={key}
                  onMouseDown={() => handleCellClick(r, c)}
                  onMouseEnter={() => handleMouseEnter(r, c)}
                  className={`aspect-square w-full h-full flex items-center justify-center rounded-[3px] sm:rounded-md border transition-all duration-150 cursor-pointer ${cellStyle}`}
                >
                  {content}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Grid Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs font-sans text-slate-300">
        <div className="flex items-center gap-2 font-mono">
          <button
            onClick={handleResetWave}
            className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 transition active:scale-95"
            title="Reset Wave"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleTogglePlay}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-1.5 glow-indigo-subtle transition active:scale-95 font-sans"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? "Pause Wave" : "Play Wave"}</span>
          </button>
          <span className="ml-1">
            Step: <strong className="text-indigo-300 font-bold">{currentStepIdx + 1}</strong> / {generatedSteps.length}
          </span>
        </div>

        {/* Speed Presets */}
        <div className="flex items-center gap-2">
          <span className="text-slate-300 font-medium flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Speed:</span>
          </span>
          <div className="flex gap-1 font-mono">
            {[
              { label: "1x", val: 30 },
              { label: "5x", val: 65 },
              { label: "15x", val: 85 },
              { label: "⚡ TURBO 50x", val: 100 }
            ].map(sp => (
              <button
                key={sp.val}
                onClick={() => handleSetSpeed(sp.val)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${
                  currentSpeed === sp.val
                    ? "bg-amber-500 border-amber-400 text-slate-950 shadow glow-amber-subtle"
                    : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {sp.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

