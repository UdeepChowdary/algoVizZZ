import React, { useState, useEffect } from 'react';
import { Layers, Network, Grid as GridIcon, Edit3 } from 'lucide-react';
import GridPathfindingVisualizer from './GridPathfindingVisualizer.jsx';
import GraphEditor from './GraphEditor.jsx';

export default function GraphVisualizer({
  step,
  currentAlgo,
  playing,
  onPlayPause,
  stepIdx,
  setStepIdx,
  speed,
  setSpeed,
  onSetCustomSteps,
  customGraphData,
  setCustomGraphData
}) {
  const [viewMode, setViewMode] = useState("GRID"); // "NETWORK" | "GRID"
  const [isEditingGraph, setIsEditingGraph] = useState(false);

  const graph = step.graph || { nodes: [], edges: [] };
  const queue = step.queue;
  const stack = step.stack;

  const algoId = currentAlgo?.file?.includes("BFS") ? "bfs" : currentAlgo?.file?.includes("DFS") ? "dfs" : "dijkstra";

  // When switching to NETWORK mode, clear custom grid steps so default network graph steps run
  useEffect(() => {
    if (viewMode === "NETWORK" && onSetCustomSteps) {
      onSetCustomSteps(null);
      if (setStepIdx) setStepIdx(0);
    }
  }, [viewMode, onSetCustomSteps, setStepIdx]);

  return (
    <div className="flex-1 flex flex-col justify-between min-h-[340px]">
      {/* Mode Switcher Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-slate-800/80 text-xs font-sans">
        <div className="flex items-center gap-4 text-slate-300">
          <span className="text-slate-300 font-medium">Visualization Style:</span>
          {viewMode === "NETWORK" && (
            <button
              onClick={() => setIsEditingGraph(!isEditingGraph)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition border ${
                isEditingGraph 
                  ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300" 
                  : "bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" /> {isEditingGraph ? "Done Editing" : "Edit Graph"}
            </button>
          )}
        </div>

        <div className="flex gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
          <button
            onClick={() => { setViewMode("GRID"); setIsEditingGraph(false); }}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition font-semibold ${
              viewMode === "GRID"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <GridIcon className="w-3.5 h-3.5" /> 2D Grid Pathfinding
          </button>
          <button
            onClick={() => setViewMode("NETWORK")}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition font-semibold ${
              viewMode === "NETWORK"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <Network className="w-3.5 h-3.5" /> Network Graph
          </button>
        </div>
      </div>

      {/* Render selected view mode */}
      {viewMode === "GRID" ? (
        <GridPathfindingVisualizer
          algorithm={algoId}
          step={step}
          stepIdx={stepIdx}
          playing={playing}
          onPlayPause={onPlayPause}
          onSetStepIdx={setStepIdx}
          speed={speed}
          setSpeed={setSpeed}
          onSetCustomSteps={onSetCustomSteps}
        />
      ) : (
        <div className="flex-1 flex flex-col justify-between p-4 min-h-[320px]">
          {isEditingGraph ? (
            <GraphEditor 
              customGraphData={customGraphData} 
              setCustomGraphData={setCustomGraphData} 
            />
          ) : (
            <>
              {/* SVG Network Graph Canvas */}
              <div className="flex-1 flex items-center justify-center p-2 relative">
                <svg className="w-full h-[260px] max-w-[540px]" viewBox="0 0 520 220">
              <defs>
                <filter id="glow-indigo" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glow-emerald" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Render Edges */}
              {graph.edges.map((e, idx) => {
                const u = graph.nodes.find(n => n.id === e.u);
                const v = graph.nodes.find(n => n.id === e.v);
                if (!u || !v) return null;

                const isVisitedEdge = step.visited?.includes(e.u) && step.visited?.includes(e.v);

                return (
                  <g key={idx}>
                    <line
                      x1={u.x}
                      y1={u.y}
                      x2={v.x}
                      y2={v.y}
                      stroke={isVisitedEdge ? "#10B981" : "#334155"}
                      strokeWidth={isVisitedEdge ? "3" : "2"}
                      className="transition-all duration-300"
                    />
                    {e.weight !== undefined && (
                      <g>
                        <rect
                          x={(u.x + v.x) / 2 - 12}
                          y={(u.y + v.y) / 2 - 12}
                          width="24"
                          height="16"
                          fill="#090b10"
                          stroke="#334155"
                          rx="4"
                        />
                        <text
                          x={(u.x + v.x) / 2}
                          y={(u.y + v.y) / 2}
                          fill="#94A3B8"
                          fontSize="10"
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="central"
                          className="font-mono select-none"
                        >
                          {e.weight}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Render Nodes */}
              {graph.nodes.map(n => {
                const isCurrent = step.current === n.id;
                const isVisited = step.visited?.includes(n.id);

                let fill = "#0f172a";
                let stroke = "#334155";
                let filter = "";

                if (isCurrent) {
                  fill = "#6366f1";
                  stroke = "#818cf8";
                  filter = "url(#glow-indigo)";
                } else if (isVisited) {
                  fill = "#059669";
                  stroke = "#34d399";
                  filter = "url(#glow-emerald)";
                }

                return (
                  <g key={n.id} className="transition-all duration-300">
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r="20"
                      fill={fill}
                      stroke={stroke}
                      strokeWidth="3"
                      filter={filter}
                    />
                    <text
                      x={n.x}
                      y={n.y}
                      fill="#ffffff"
                      fontSize="12"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="font-mono select-none pointer-events-none"
                    >
                      {n.label}
                    </text>

                    {/* Distance Tag */}
                    {step.dist && (
                      <g>
                        <rect
                          x={n.x - 22}
                          y={n.y + 26}
                          width="44"
                          height="16"
                          fill="#090b10"
                          stroke="#334155"
                          rx="4"
                        />
                        <text
                          x={n.x}
                          y={n.y + 34}
                          fill="#34d399"
                          fontSize="10"
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="central"
                          className="font-mono"
                        >
                          d={step.dist[n.id] === Infinity ? "∞" : step.dist[n.id]}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Real-time Data Structure State Inspector */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-300 font-sans">
              <Layers className="w-4 h-4 text-indigo-300" />
              <span>Active Data Structure State:</span>
            </div>

            {queue !== undefined && (
              <div className="flex items-center gap-2 font-mono">
                <span className="text-slate-500 font-bold">FIFO Queue:</span>
                <div className="flex gap-1">
                  {queue.length === 0 ? (
                    <span className="text-slate-600">[ Empty ]</span>
                  ) : (
                    queue.map((item, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 font-bold">
                        {item}
                      </span>
                    ))
                  )}
                </div>
              </div>
            )}

            {stack !== undefined && (
              <div className="flex items-center gap-2 font-mono">
                <span className="text-slate-500 font-bold">Call Stack:</span>
                <div className="flex gap-1">
                  {stack.length === 0 ? (
                    <span className="text-slate-600">[ Empty ]</span>
                  ) : (
                    stack.map((item, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-purple-600/20 border border-purple-500/40 text-purple-300 font-bold">
                        Node {item}
                      </span>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
      </div>
    )}
    </div>
  );
}
