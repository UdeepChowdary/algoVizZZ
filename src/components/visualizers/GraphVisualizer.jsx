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
  const [viewMode, setViewMode] = useState(() => {
    try {
      return localStorage.getItem('algoViz_graph_viewMode') || "NETWORK";
    } catch {
      return "NETWORK";
    }
  });
  const [isEditingGraph, setIsEditingGraph] = useState(false);

  const handleSetViewMode = (mode) => {
    setViewMode(mode);
    try {
      localStorage.setItem('algoViz_graph_viewMode', mode);
    } catch {
      // ignore
    }
  };

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
      <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-[#35413b] text-xs font-sans">
        <div className="flex items-center gap-4 text-[#d5dbd3]">
          <span className="text-[#a0aaa2] font-medium">Visualization Style:</span>
          {viewMode === "NETWORK" && (
            <button
              onClick={() => setIsEditingGraph(!isEditingGraph)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition border ${
                isEditingGraph 
                  ? "bg-[#25322c] border-[#3a4740] text-[#d4ec7a]" 
                  : "bg-[#18211d] border-[#35413b] text-[#d5dbd3] hover:text-white"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5 text-[#c9583c]" /> {isEditingGraph ? "Done Editing" : "Edit Graph"}
            </button>
          )}
        </div>

        <div className="flex gap-1.5 p-1 rounded-xl bg-[#111815] border border-[#35413b]">
          <button
            onClick={() => { handleSetViewMode("GRID"); setIsEditingGraph(false); }}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition font-semibold ${
              viewMode === "GRID"
                ? "bg-[#c9583c] text-white shadow-sm"
                : "text-[#99a49c] hover:text-white"
            }`}
          >
            <GridIcon className="w-3.5 h-3.5" /> 2D Grid Pathfinding
          </button>
          <button
            onClick={() => handleSetViewMode("NETWORK")}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition font-semibold ${
              viewMode === "NETWORK"
                ? "bg-[#c9583c] text-white shadow-sm"
                : "text-[#99a49c] hover:text-white"
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
                <filter id="glow-terracotta" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glow-acid" x="-20%" y="-20%" width="140%" height="140%">
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
                      stroke={isVisitedEdge ? "#d4ec7a" : "#35413b"}
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
                          fill="#111815"
                          stroke="#35413b"
                          rx="4"
                        />
                        <text
                          x={(u.x + v.x) / 2}
                          y={(u.y + v.y) / 2}
                          fill="#a0aaa2"
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

                let fill = "#18211d";
                let stroke = "#35413b";
                let filter = "";

                if (isCurrent) {
                  fill = "#c9583c";
                  stroke = "#ffad8e";
                  filter = "url(#glow-terracotta)";
                } else if (isVisited) {
                  fill = "#3f5431";
                  stroke = "#a6c36b";
                  filter = "url(#glow-acid)";
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
                          fill="#111815"
                          stroke="#35413b"
                          rx="4"
                        />
                        <text
                          x={n.x}
                          y={n.y + 34}
                          fill="#d4ec7a"
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
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-[#111815] rounded-xl border border-[#35413b] text-xs font-mono">
            <div className="flex items-center gap-2 text-[#d5dbd3] font-sans">
              <Layers className="w-4 h-4 text-[#c9583c]" />
              <span>Active Data Structure State:</span>
            </div>

            {queue !== undefined && (
              <div className="flex items-center gap-2 font-mono">
                <span className="text-[#87918a] font-bold">FIFO Queue:</span>
                <div className="flex gap-1">
                  {queue.length === 0 ? (
                    <span className="text-[#647069]">[ Empty ]</span>
                  ) : (
                    queue.map((item, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-[#25322c] border border-[#3a4740] text-[#d4ec7a] font-bold">
                        {item}
                      </span>
                    ))
                  )}
                </div>
              </div>
            )}

            {stack !== undefined && (
              <div className="flex items-center gap-2 font-mono">
                <span className="text-[#87918a] font-bold">Call Stack:</span>
                <div className="flex gap-1">
                  {stack.length === 0 ? (
                    <span className="text-[#647069]">[ Empty ]</span>
                  ) : (
                    stack.map((item, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-[#2a2318] border border-[#4d3c22] text-[#f4dd96] font-bold">
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
