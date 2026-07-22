import React, { useState, useEffect, useMemo, useRef } from 'react';
import { generateGridPathfindingSteps } from '../../generators/gridPathfindingGenerators.js';
import { Shield, Sparkles, Navigation, Trash2, MapPin, Play, Pause, RotateCcw, Zap } from 'lucide-react';

const ROWS = 10;
const COLS = 18;

export default function GridPathfindingVisualizer({ algorithm = "bfs" }) {
  const [startNode, setStartNode] = useState([2, 2]);
  const [endNode, setEndNode] = useState([7, 15]);
  const [walls, setWalls] = useState(new Set());
  const [mudCells, setMudCells] = useState(new Set());
  const [drawMode, setDrawMode] = useState("WALL"); // "WALL" | "MUD" | "START" | "END"
  const [isMouseDown, setIsMouseDown] = useState(false);

  const [stepIdx, setStepIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(85); // Default fast speed

  const nodeKey = (r, c) => `${r}-${c}`;

  // Generate steps based on current grid state and algorithm
  const steps = useMemo(() => {
    return generateGridPathfindingSteps({
      algorithm,
      startNode,
      endNode,
      walls,
      mudCells
    });
  }, [algorithm, startNode, endNode, walls, mudCells]);

  const step = steps[Math.min(stepIdx, steps.length - 1)] || {};
  const gridState = step.gridState || { visited: [], path: [], current: null };

  const visitedSet = useMemo(() => new Set(gridState.visited || []), [gridState.visited]);
  const pathSet = useMemo(() => {
    const set = new Set();
    (gridState.path || []).forEach(([r, c]) => set.add(nodeKey(r, c)));
    return set;
  }, [gridState.path]);

  // Reset step index when parameters change
  useEffect(() => {
    setStepIdx(0);
    setPlaying(false);
  }, [algorithm, startNode, endNode, walls, mudCells]);

  // High-Performance Turbo Animation Loop
  useEffect(() => {
    if (playing) {
      let delay = 0;
      let stepIncrement = 1;

      if (speed <= 50) {
        delay = 550 - speed * 10; // 550ms down to 50ms
      } else if (speed <= 85) {
        delay = Math.max(3, 50 - (speed - 50) * 1.3); // 50ms down to 4.5ms
      } else {
        delay = 0;
        stepIncrement = Math.floor(1 + (speed - 85) * 0.4); // Multi-step tick (1 to 7 steps per frame)
      }

      const timer = setTimeout(() => {
        setStepIdx(s => {
          const next = s + stepIncrement;
          if (next >= steps.length - 1) {
            setPlaying(false);
            return steps.length - 1;
          }
          return next;
        });
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [playing, stepIdx, steps.length, speed]);

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
    setStepIdx(0);
    setPlaying(false);
  };

  return (
    <div
      className="flex-1 flex flex-col justify-between p-4 min-h-[340px] font-mono select-none"
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
    >
      {/* Drawing Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2 text-xs border-b border-gray-800 pb-3">
        <div className="flex items-center gap-1.5">
          <span className="text-gray-500 font-bold mr-1">// Tool:</span>
          {[
            { id: "WALL", label: "Wall Barrier", color: "bg-gray-800 text-gray-200 border-gray-700" },
            { id: "MUD", label: "Mud (+5 Cost)", color: "bg-amber-950 text-amber-300 border-amber-800" },
            { id: "START", label: "Set Start (S)", color: "bg-emerald-950 text-emerald-300 border-emerald-800" },
            { id: "END", label: "Set Target (E)", color: "bg-rose-950 text-rose-300 border-rose-800" }
          ].map(tool => (
            <button
              key={tool.id}
              onClick={() => setDrawMode(tool.id)}
              className={`px-2.5 py-1 rounded-lg border font-semibold transition ${
                drawMode === tool.id
                  ? "bg-blue-600 border-blue-400 text-white shadow-md glow-blue"
                  : tool.color + " hover:bg-gray-800"
              }`}
            >
              {tool.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClearBoard}
            className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 transition flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-400" /> Clear Board
          </button>
        </div>
      </div>

      {/* 2D Interactive Grid Canvas */}
      <div className="flex-1 flex items-center justify-center p-2">
        <div
          className="grid gap-1 bg-gray-950 p-2.5 rounded-xl border border-gray-800 shadow-2xl overflow-x-auto max-w-full"
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

              let cellStyle = "bg-[#11161d] border-gray-800/80 hover:border-gray-600";
              let content = "";

              if (isStart) {
                cellStyle = "bg-emerald-600 border-emerald-400 text-white font-bold glow-emerald animate-pulse";
                content = "S";
              } else if (isEnd) {
                cellStyle = "bg-rose-600 border-rose-400 text-white font-bold shadow-lg shadow-rose-500/50";
                content = "E";
              } else if (isPath) {
                cellStyle = "bg-amber-400 border-amber-200 text-black font-bold scale-105 shadow-md shadow-amber-400/50";
                content = "•";
              } else if (isCurrent) {
                cellStyle = "bg-purple-500 border-purple-300 text-white font-bold scale-110 animate-ping";
              } else if (isVisited) {
                cellStyle = "bg-blue-600/40 border-blue-500/60 text-blue-200";
              } else if (isWall) {
                cellStyle = "bg-gray-800 border-gray-700";
                content = "█";
              } else if (isMud) {
                cellStyle = "bg-amber-950/80 border-amber-800/80 text-amber-400";
                content = "~";
              }

              return (
                <div
                  key={key}
                  onMouseDown={() => handleCellClick(r, c)}
                  onMouseEnter={() => handleMouseEnter(r, c)}
                  className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center text-xs rounded border transition-all duration-150 cursor-pointer ${cellStyle}`}
                >
                  {content}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Grid Status & Playback Speed Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-800 text-xs font-mono text-gray-400">
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setStepIdx(0); setPlaying(false); }}
            className="p-1.5 rounded bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              if (stepIdx >= steps.length - 1) setStepIdx(0);
              setPlaying(!playing);
            }}
            className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5 glow-blue"
          >
            {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{playing ? "Pause Wave" : "Play Wave"}</span>
          </button>
          <span>
            Step: <strong className="text-white">{stepIdx + 1}</strong> / {steps.length}
          </span>
        </div>

        {/* Speed Controls (1x, 10x, 25x, TURBO 50x) */}
        <div className="flex items-center gap-2">
          <span className="text-gray-500 font-bold">Speed:</span>
          <div className="flex gap-1">
            {[
              { label: "1x", val: 30 },
              { label: "5x", val: 65 },
              { label: "15x", val: 85 },
              { label: "⚡ TURBO 50x", val: 100 }
            ].map(sp => (
              <button
                key={sp.val}
                onClick={() => setSpeed(sp.val)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold border transition ${
                  speed === sp.val
                    ? "bg-amber-500 border-amber-400 text-black shadow glow-amber"
                    : "bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800"
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
