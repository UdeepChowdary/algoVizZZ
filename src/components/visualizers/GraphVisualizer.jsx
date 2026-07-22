import React, { useState } from 'react';
import { Layers, Network, Grid as GridIcon } from 'lucide-react';
import GridPathfindingVisualizer from './GridPathfindingVisualizer.jsx';

export default function GraphVisualizer({ step, currentAlgo }) {
  const [viewMode, setViewMode] = useState("GRID"); // "NETWORK" | "GRID"

  const graph = step.graph || { nodes: [], edges: [] };
  const queue = step.queue;
  const stack = step.stack;

  const algoId = currentAlgo?.file?.includes("BFS") ? "bfs" : currentAlgo?.file?.includes("DFS") ? "dfs" : "dijkstra";

  return (
    <div className="flex-1 flex flex-col justify-between min-h-[320px]">
      {/* Mode Switcher Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-gray-800 text-xs font-mono">
        <div className="flex items-center gap-2 text-gray-400">
          <span className="text-gray-500 font-bold">// Graph Visualization Style:</span>
        </div>

        <div className="flex gap-1.5 p-0.5 rounded-lg bg-gray-950 border border-gray-800">
          <button
            onClick={() => setViewMode("GRID")}
            className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition font-semibold ${
              viewMode === "GRID"
                ? "bg-blue-600 text-white shadow glow-blue font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <GridIcon className="w-3.5 h-3.5" /> 2D Grid Pathfinding
          </button>
          <button
            onClick={() => setViewMode("NETWORK")}
            className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition font-semibold ${
              viewMode === "NETWORK"
                ? "bg-blue-600 text-white shadow glow-blue font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Network className="w-3.5 h-3.5" /> Network Graph
          </button>
        </div>
      </div>

      {/* Render selected view mode */}
      {viewMode === "GRID" ? (
        <GridPathfindingVisualizer algorithm={algoId} />
      ) : (
        <div className="flex-1 flex flex-col justify-between p-4 min-h-[320px]">
          {/* Interactive SVG Network Graph Canvas */}
          <div className="flex-1 flex items-center justify-center p-2 relative">
            <svg className="w-full h-[260px] max-w-[540px]" viewBox="0 0 520 220">
              <defs>
                <filter id="glow-orange" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
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
                      stroke={isVisitedEdge ? "#10B981" : "#374151"}
                      strokeWidth={isVisitedEdge ? "3" : "2"}
                      className="transition-all duration-300"
                    />
                    {e.weight !== undefined && (
                      <g>
                        <rect
                          x={(u.x + v.x) / 2 - 10}
                          y={(u.y + v.y) / 2 - 14}
                          width="20"
                          height="14"
                          fill="#0d1117"
                          rx="3"
                        />
                        <text
                          x={(u.x + v.x) / 2}
                          y={(u.y + v.y) / 2 - 3}
                          fill="#9CA3AF"
                          fontSize="10"
                          fontWeight="bold"
                          textAnchor="middle"
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

                let fill = "#161b22";
                let stroke = "#30363d";
                let filter = "";

                if (isCurrent) {
                  fill = "#f59e0b";
                  stroke = "#fbbf24";
                  filter = "url(#glow-orange)";
                } else if (isVisited) {
                  fill = "#059669";
                  stroke = "#34d399";
                  filter = "url(#glow-green)";
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
                      className={isCurrent ? "animate-pulse" : ""}
                    />
                    <text
                      x={n.x}
                      y={n.y + 4}
                      fill="#ffffff"
                      fontSize="12"
                      fontWeight="bold"
                      textAnchor="middle"
                      className="font-mono select-none pointer-events-none"
                    >
                      {n.label}
                    </text>

                    {/* Dijkstra Distance Tag */}
                    {step.dist && (
                      <g>
                        <rect
                          x={n.x - 22}
                          y={n.y + 26}
                          width="44"
                          height="16"
                          fill="#090d13"
                          stroke="#30363d"
                          rx="4"
                        />
                        <text
                          x={n.x}
                          y={n.y + 38}
                          fill="#34d399"
                          fontSize="10"
                          fontWeight="bold"
                          textAnchor="middle"
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

          {/* Real-time Data Structure Inspector (Queue or Stack) */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-gray-950 rounded-lg border border-gray-800 text-xs font-mono">
            <div className="flex items-center gap-2 text-gray-400">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Active Data Structure State:</span>
            </div>

            {queue !== undefined && (
              <div className="flex items-center gap-1.5">
                <span className="text-gray-500 font-bold">FIFO Queue:</span>
                <div className="flex gap-1">
                  {queue.length === 0 ? (
                    <span className="text-gray-600">[ Empty ]</span>
                  ) : (
                    queue.map((item, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-blue-600/30 border border-blue-500 text-blue-300 font-bold">
                        {item}
                      </span>
                    ))
                  )}
                </div>
              </div>
            )}

            {stack !== undefined && (
              <div className="flex items-center gap-1.5">
                <span className="text-gray-500 font-bold">Recursion Stack:</span>
                <div className="flex gap-1">
                  {stack.length === 0 ? (
                    <span className="text-gray-600">[ Empty ]</span>
                  ) : (
                    stack.map((item, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-purple-600/30 border border-purple-500 text-purple-300 font-bold">
                        Node {item}
                      </span>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
