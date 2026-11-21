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
              stroke="#35413b"
              strokeWidth="2"
            />
          ))}

          {/* Tree Nodes */}
          {(treeGraph.nodes || []).map((n) => {
            const isActive = activeVal === n.val;
            const isVisited = visitedList.includes(n.val);

            let fill = "#18211d";
            let stroke = "#35413b";

            if (isActive) {
              fill = "#c9583c";
              stroke = "#ffad8e";
            } else if (isVisited) {
              fill = "#3f5431";
              stroke = "#a6c36b";
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
      <div className="p-3 bg-[#111815] rounded-xl border border-[#35413b] text-xs font-mono flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#d4ec7a] font-bold font-sans">
          <GitGraph className="w-4 h-4" />
          <span>{step.traversalType ? `${step.traversalType} Output:` : step.vars?.heapArray ? "Min-Heap Array View:" : "Tree Traversal Output:"}</span>
        </div>
        <div className="text-[#f5f4ed] font-mono font-bold">
          {step.vars?.heapArray ? step.vars.heapArray : `[${visitedList.join(", ")}]`}
        </div>
      </div>
    </div>
  );
}
