import React from 'react';
import { Link2, GitMerge } from 'lucide-react';

// Layout constants
const NODE_W = 54;
const NODE_H = 36;
const NODE_GAP = 52; // horizontal gap between node right edge and next node left edge
const NODE_STEP = NODE_W + NODE_GAP; // total step between node centers
const ROW_Y = 100; // vertical center of nodes
const LABEL_Y = ROW_Y + NODE_H / 2 + 20; // pointer label baseline below node
const SVG_HEIGHT = 220;

function getNodeColor(id, highlighted, hasCycle, cycleEntryId) {
  if (highlighted.includes(id)) {
    return { fill: '#4f46e5', stroke: '#818cf8', text: '#ffffff' };
  }
  if (hasCycle && id === cycleEntryId) {
    return { fill: '#7c3aed', stroke: '#a78bfa', text: '#ffffff' };
  }
  return { fill: '#0f172a', stroke: '#334155', text: '#e2e8f0' };
}

export default function LinkedListVisualizer({ step }) {
  const {
    nodes = [],
    highlighted = [],
    pointerLabels = {},
    hasCycle = false,
    cycleEntryId = null,
  } = step;

  if (nodes.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 min-h-[300px]">
        <div className="flex items-center gap-2 text-slate-500">
          <Link2 className="w-5 h-5" />
          <span className="font-mono text-sm">HEAD → null</span>
        </div>
        <p className="text-xs text-slate-600 font-mono">Empty linked list</p>
      </div>
    );
  }

  // Layout: place nodes in a single horizontal row
  // For cycle detection, we may have more than fits; scale accordingly
  const count = nodes.length;
  const totalContentWidth = count * NODE_STEP + NODE_GAP + 50; // +50 for "null" label
  const svgViewWidth = Math.max(520, totalContentWidth + 60);
  const startX = 40;

  // Build a map from id -> x center position
  const posMap = {};
  nodes.forEach((n, i) => {
    posMap[n.id] = startX + i * NODE_STEP + NODE_W / 2;
  });

  return (
    <div className="flex-1 flex flex-col justify-center items-center p-4 min-h-[300px] overflow-hidden">
      <div className="w-full overflow-x-auto">
        <svg
          className="mx-auto block"
          width="100%"
          height={SVG_HEIGHT}
          viewBox={`0 0 ${svgViewWidth} ${SVG_HEIGHT}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ minWidth: Math.min(svgViewWidth, 520) }}
        >
          <defs>
            <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#475569" />
            </marker>
            <marker id="arrowhead-active" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#818cf8" />
            </marker>
            <marker id="arrowhead-cycle" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#a78bfa" />
            </marker>
          </defs>

          {/* HEAD label */}
          <text
            x={posMap[nodes[0].id]}
            y={ROW_Y - NODE_H / 2 - 14}
            textAnchor="middle"
            fontSize="11"
            fontFamily="monospace"
            fontWeight="bold"
            fill="#6366f1"
          >
            HEAD
          </text>
          {/* HEAD arrow down */}
          <line
            x1={posMap[nodes[0].id]}
            y1={ROW_Y - NODE_H / 2 - 6}
            x2={posMap[nodes[0].id]}
            y2={ROW_Y - NODE_H / 2 + 2}
            stroke="#6366f1"
            strokeWidth="1.5"
            markerEnd="url(#arrowhead-active)"
          />

          {/* Draw arrows between nodes */}
          {nodes.map((n, i) => {
            if (n.next === null || n.next === undefined) return null;
            const nextNode = nodes.find(x => x.id === n.next);
            if (!nextNode) return null;

            const x1 = posMap[n.id] + NODE_W / 2;
            const x2 = posMap[nextNode.id] - NODE_W / 2;
            const y = ROW_Y;
            const isHighlighted = highlighted.includes(n.id);
            const markerId = isHighlighted ? 'arrowhead-active' : 'arrowhead';
            const strokeColor = isHighlighted ? '#6366f1' : '#334155';

            return (
              <line
                key={`arrow-${n.id}`}
                x1={x1 + 2}
                y1={y}
                x2={x2 - 2}
                y2={y}
                stroke={strokeColor}
                strokeWidth="2"
                markerEnd={`url(#${markerId})`}
              />
            );
          })}

          {/* Cycle back-arrow: curved path from last node back to cycle entry */}
          {hasCycle && cycleEntryId !== null && (() => {
            const lastNode = nodes[nodes.length - 1];
            const entryNode = nodes.find(n => n.id === cycleEntryId);
            if (!lastNode || !entryNode) return null;
            const x1 = posMap[lastNode.id] + NODE_W / 2;
            const x2 = posMap[entryNode.id];
            const curveY = ROW_Y + NODE_H / 2 + 28;
            const d = `M ${x1} ${ROW_Y} C ${x1 + 10} ${curveY + 10}, ${x2 + 10} ${curveY + 10}, ${x2} ${ROW_Y + NODE_H / 2}`;
            return (
              <g key="cycle-arrow">
                <path
                  d={d}
                  fill="none"
                  stroke="#7c3aed"
                  strokeWidth="2"
                  strokeDasharray="5,3"
                  markerEnd="url(#arrowhead-cycle)"
                />
                <text
                  x={(x1 + x2) / 2}
                  y={curveY + 18}
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="monospace"
                  fill="#a78bfa"
                  fontWeight="bold"
                >
                  cycle
                </text>
              </g>
            );
          })()}

          {/* NULL terminal */}
          {(() => {
            const lastNode = nodes[nodes.length - 1];
            if (!lastNode || hasCycle) return null;
            const nullX = posMap[lastNode.id] + NODE_W / 2 + NODE_GAP / 2 + 4;
            // Arrow from last node to NULL
            return (
              <g key="null-terminal">
                <line
                  x1={posMap[lastNode.id] + NODE_W / 2 + 2}
                  y1={ROW_Y}
                  x2={nullX - 4}
                  y2={ROW_Y}
                  stroke="#334155"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
                <text
                  x={nullX + 2}
                  y={ROW_Y + 4}
                  fontSize="11"
                  fontFamily="monospace"
                  fill="#64748b"
                  fontWeight="bold"
                >
                  null
                </text>
              </g>
            );
          })()}

          {/* Draw nodes */}
          {nodes.map((n) => {
            const cx = posMap[n.id];
            const rx = cx - NODE_W / 2;
            const ry = ROW_Y - NODE_H / 2;
            const colors = getNodeColor(n.id, highlighted, hasCycle, cycleEntryId);
            const label = pointerLabels[n.id];

            return (
              <g key={`node-${n.id}`} style={{ transition: 'all 0.3s ease' }}>
                {/* Node box */}
                <rect
                  x={rx}
                  y={ry}
                  width={NODE_W}
                  height={NODE_H}
                  rx="8"
                  fill={colors.fill}
                  stroke={colors.stroke}
                  strokeWidth={highlighted.includes(n.id) ? 2.5 : 1.5}
                  style={{ transition: 'fill 0.3s, stroke 0.3s' }}
                />

                {/* Divider line (val | next) */}
                <line
                  x1={cx + NODE_W / 2 - 16}
                  y1={ry + 2}
                  x2={cx + NODE_W / 2 - 16}
                  y2={ry + NODE_H - 2}
                  stroke={colors.stroke}
                  strokeWidth="1"
                />

                {/* Value text */}
                <text
                  x={cx - 8}
                  y={ROW_Y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="13"
                  fontFamily="monospace"
                  fontWeight="bold"
                  fill={colors.text}
                >
                  {n.val}
                </text>

                {/* Next pointer symbol */}
                <text
                  x={cx + NODE_W / 2 - 8}
                  y={ROW_Y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="9"
                  fontFamily="monospace"
                  fill={highlighted.includes(n.id) ? '#a5b4fc' : '#475569'}
                >
                  →
                </text>

                {/* Glow ring for highlighted nodes */}
                {highlighted.includes(n.id) && (
                  <rect
                    x={rx - 3}
                    y={ry - 3}
                    width={NODE_W + 6}
                    height={NODE_H + 6}
                    rx="10"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                )}

                {/* Pointer label badge */}
                {label && (
                  <g>
                    <rect
                      x={cx - (label.length * 3.6 + 6)}
                      y={LABEL_Y - 9}
                      width={label.length * 7.2 + 12}
                      height={16}
                      rx="4"
                      fill="#1e1b4b"
                      stroke="#4f46e5"
                      strokeWidth="1"
                    />
                    <text
                      x={cx}
                      y={LABEL_Y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="bold"
                      fill="#a5b4fc"
                    >
                      {label}
                    </text>
                    {/* Dashed line from label to node */}
                    <line
                      x1={cx}
                      y1={LABEL_Y - 10}
                      x2={cx}
                      y2={ROW_Y + NODE_H / 2 + 2}
                      stroke="#4f46e5"
                      strokeWidth="1"
                      strokeDasharray="3,2"
                      opacity="0.6"
                    />
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Info footer */}
      <div className="mt-3 w-full max-w-2xl px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-indigo-300 font-bold font-sans shrink-0">
          <Link2 className="w-4 h-4" />
          <span>Linked List</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400 truncate">
          <span className="text-emerald-400 font-bold">Nodes: {nodes.length}</span>
          {hasCycle && (
            <span className="flex items-center gap-1 text-violet-400 font-bold">
              <GitMerge className="w-3 h-3" />
              Cycle detected
            </span>
          )}
          <span className="truncate text-slate-500">
            {nodes.map(n => n.val).join(' → ')}{hasCycle ? ' → (cycle)' : ' → null'}
          </span>
        </div>
      </div>
    </div>
  );
}
