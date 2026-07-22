import React from 'react';
import { GitGraph } from 'lucide-react';

export default function TreeVisualizer({ step }) {
  const root = step.bstRoot;
  const activeVal = step.activeVal;
  const visitedList = step.visitedList || [];

  // Helper to compute node positions in 2D SVG space
  const calculateNodePositions = (node, x = 260, y = 40, level = 0) => {
    if (!node) return [];

    const dx = Math.max(25, 110 / Math.pow(1.8, level));
    const leftX = x - dx;
    const rightX = x + dx;
    const nextY = y + 55;

    const currentPos = { val: node.val, x, y };

    let leftPositions = [];
    let rightPositions = [];
    let lines = [];

    if (node.left) {
      lines.push({ x1: x, y1: y, x2: leftX, y2: nextY });
      leftPositions = calculateNodePositions(node.left, leftX, nextY, level + 1);
    }

    if (node.right) {
      lines.push({ x1: x, y1: y, x2: rightX, y2: nextY });
      rightPositions = calculateNodePositions(node.right, rightX, nextY, level + 1);
    }

    return {
      nodes: [currentPos, ...(leftPositions.nodes || []), ...(rightPositions.nodes || [])],
      lines: [...lines, ...(leftPositions.lines || []), ...(rightPositions.lines || [])]
    };
  };

  const treeGraph = calculateNodePositions(root);

  return (
    <div className="flex-1 flex flex-col justify-between p-4 min-h-[320px]">
      {/* SVG Binary Search Tree View */}
      <div className="flex-1 flex items-center justify-center p-2 relative">
        <svg className="w-full h-[240px] max-w-[540px]" viewBox="0 0 520 220">
          {/* Tree Branch Lines */}
          {(treeGraph.lines || []).map((line, idx) => (
            <line
              key={idx}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#334155"
              strokeWidth="2"
            />
          ))}

          {/* Tree Nodes */}
          {(treeGraph.nodes || []).map((n) => {
            const isActive = activeVal === n.val;
            const isVisited = visitedList.includes(n.val);

            let fill = "#0f172a";
            let stroke = "#334155";

            if (isActive) {
              fill = "#6366f1";
              stroke = "#818cf8";
            } else if (isVisited) {
              fill = "#059669";
              stroke = "#34d399";
            }

            return (
              <g key={n.val} className="transition-all duration-300">
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="18"
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="3"
                />
                <text
                  x={n.x}
                  y={n.y}
                  fill="#ffffff"
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="font-mono select-none"
                >
                  {n.val}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Traversal Output Log */}
      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-400 font-bold font-sans">
          <GitGraph className="w-4 h-4" />
          <span>Inorder Traversal Output:</span>
        </div>
        <div className="text-white font-mono font-bold">
          [{visitedList.join(", ")}]
        </div>
      </div>
    </div>
  );
}
