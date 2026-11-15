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
  const [selectedAlgo, setSelectedAlgo] = useState(algorithm);

  useEffect(() => {
    setSelectedAlgo(algorithm);
  }, [algorithm]);

  const activeAlgo = selectedAlgo || algorithm;

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
      algorithm: activeAlgo,
      startNode,
      endNode,
      walls,
      mudCells
    });
  }, [activeAlgo, startNode, endNode, walls, mudCells]);

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
      {/* Drawing & Algorithm Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 text-xs border-b border-[#35413b] pb-3 font-sans">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[#a0aaa2] font-medium mr-1">Algorithm:</span>
            <select
              value={activeAlgo}
              onChange={(e) => {
                setSelectedAlgo(e.target.value);
                handleResetWave();
              }}
              className="bg-[#18211d] text-[#f5f4ed] border border-[#35413b] rounded-xl px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:border-[#c9583c] hover:bg-[#202a24] transition cursor-pointer"
            >
              <option value="bfs">BFS</option>
              <option value="dfs">DFS</option>
              <option value="dijkstra">Dijkstra</option>
              <option value="astar">A* Search</option>
            </select>
          </div>

          <div className="h-4 w-[1px] bg-[#35413b] hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="text-[#a0aaa2] font-medium mr-1">Drawing Tool:</span>
            {[
              { id: "WALL", label: "Wall Barrier", icon: Shield, color: "bg-[#18211d] text-[#d5dbd3] border-[#35413b]" },
              { id: "MUD", label: "Mud (+5)", icon: Droplets, color: "bg-[#2a2417] text-[#f4dd96] border-[#5e4b27]" },
              { id: "START", label: "Start Node", icon: Rocket, color: "bg-[#1e2c1c] text-[#d4ec7a] border-[#3f5431]" },
              { id: "END", label: "Target Node", icon: Target, color: "bg-[#2f1f1a] text-[#ffad8e] border-[#5a3429]" }
            ].map(tool => {
              const IconComponent = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => setDrawMode(tool.id)}
                  className={`px-3 py-1.5 rounded-xl border font-semibold flex items-center gap-1.5 transition ${
                    drawMode === tool.id
                      ? "bg-[#c9583c] border-[#c9583c] text-white shadow-md scale-105"
                      : tool.color + " hover:bg-[#202a24]"
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{tool.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClearBoard}
            className="px-3 py-1.5 rounded-xl bg-[#18211d] hover:bg-[#202a24] text-[#d5dbd3] border border-[#35413b] hover:border-[#c9583c]/50 transition flex items-center gap-1.5 active:scale-95"
          >
            <Trash2 className="w-3.5 h-3.5 text-[#ffad8e]" />
            <span>Clear Grid</span>
          </button>
        </div>
      </div>

      {/* 2D Interactive Grid Canvas */}
      <div className="flex-1 w-full flex items-center justify-center p-1 sm:p-2 min-h-0 overflow-x-auto">
        <div
          className="grid gap-[1px] sm:gap-[2px] md:gap-1 bg-[#111815] p-1 sm:p-2 md:p-3 rounded-xl border border-[#303a35] shadow-2xl min-w-[300px] max-w-[95vw] lg:max-w-[600px] m-auto"
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

              let cellStyle = "bg-[#18211d]/70 border-[#303a35] hover:border-[#c9583c]/60";
              let content = null;

              if (isStart) {
                cellStyle = isPath
                  ? "bg-[#d4ec7a] border-[#b5ce73] text-[#111815] font-bold scale-110 ring-2 ring-[#f4dd96] z-20"
                  : "bg-[#d4ec7a] border-[#b5ce73] text-[#111815] font-bold scale-105";
                content = <Rocket className="w-[60%] h-[60%] text-[#111815]" />;
              } else if (isEnd) {
                cellStyle = isPath
                  ? "bg-[#c9583c] border-[#ffad8e] text-white font-bold scale-110 ring-2 ring-[#f4dd96] z-20 animate-bounce"
                  : "bg-[#c9583c] border-[#ffad8e] text-white font-bold scale-105";
                content = <Target className="w-[60%] h-[60%] text-white" />;
              } else if (isPath) {
                cellStyle = "bg-[#f4dd96] border-[#c19243] text-[#111815] font-bold scale-110 shadow-md z-10";
                content = <span className="w-[30%] h-[30%] rounded-full bg-[#111815]"></span>;
              } else if (isCurrent) {
                cellStyle = "bg-[#ffad8e] border-[#c9583c] text-[#111815] font-bold scale-110 z-10";
              } else if (isVisited) {
                cellStyle = "bg-[#233324] border-[#3a523b] text-[#c6e18a]";
              } else if (isWall) {
                cellStyle = "bg-[#111815] border-[#252f2a] shadow-inner";
                content = <Shield className="w-[60%] h-[60%] text-[#526058]" />;
              } else if (isMud) {
                cellStyle = "bg-[#2a2417] border-[#5e4b27] text-[#f4dd96]";
                content = <span className="text-[7px] sm:text-[9px] font-extrabold text-[#f4dd96] leading-none">+5</span>;
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
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#303a35] text-xs font-sans text-[#d5dbd3]">
        <div className="flex items-center gap-2 font-mono">
          <button
            onClick={handleResetWave}
            className="p-1.5 rounded-xl bg-[#18211d] hover:bg-[#202a24] text-white border border-[#35413b] transition active:scale-95"
            title="Reset Wave"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#d5dbd3]" />
          </button>
          <button
            onClick={handleTogglePlay}
            className={`px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition active:scale-95 font-sans ${
              isPlaying
                ? "bg-[#d4ec7a] text-[#111815]"
                : "bg-[#c9583c] text-white"
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? "Pause Wave" : "Play Wave"}</span>
          </button>
          <span className="ml-1 text-[#a0aaa2]">
            Step: <strong className="text-[#d4ec7a] font-bold">{currentStepIdx + 1}</strong> / {generatedSteps.length}
          </span>
        </div>

        {/* Speed Presets */}
        <div className="flex items-center gap-2">
          <span className="text-[#a0aaa2] font-medium flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-[#f4dd96]" />
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
                    ? "bg-[#d4ec7a] border-[#d4ec7a] text-[#111815] shadow-sm"
                    : "bg-[#18211d] border-[#35413b] text-[#87918a] hover:bg-[#202a24] hover:text-white"
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

