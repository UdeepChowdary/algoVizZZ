import React, { useState, useRef } from 'react';
import { Plus, Trash2, MousePointer2 } from 'lucide-react';

export default function GraphEditor({ customGraphData, setCustomGraphData }) {
  const [mode, setMode] = useState("SELECT"); // SELECT, ADD_NODE, ADD_EDGE, REMOVE
  const [selectedNode, setSelectedNode] = useState(null);
  const svgRef = useRef(null);

  const handleSvgClick = (e) => {
    if (mode === "ADD_NODE") {
      const rect = svgRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newId = customGraphData.nodes.length > 0 
        ? Math.max(...customGraphData.nodes.map(n => n.id)) + 1 
        : 0;
        
      setCustomGraphData(prev => ({
        ...prev,
        nodes: [...prev.nodes, { id: newId, label: String(newId), x, y }]
      }));
    } else {
      setSelectedNode(null);
    }
  };

  const handleNodeClick = (e, node) => {
    e.stopPropagation();
    
    if (mode === "ADD_EDGE") {
      if (selectedNode === null) {
        setSelectedNode(node.id);
      } else {
        if (selectedNode !== node.id) {
          // Check if edge already exists
          const exists = customGraphData.edges.some(
            edge => (edge.u === selectedNode && edge.v === node.id) || 
                    (!customGraphData.isDirected && edge.u === node.id && edge.v === selectedNode)
          );
          
          if (!exists) {
            setCustomGraphData(prev => ({
              ...prev,
              edges: [...prev.edges, { u: selectedNode, v: node.id, weight: Math.floor(Math.random() * 9) + 1 }]
            }));
          }
        }
        setSelectedNode(null);
      }
    } else if (mode === "REMOVE") {
      setCustomGraphData(prev => ({
        ...prev,
        nodes: prev.nodes.filter(n => n.id !== node.id),
        edges: prev.edges.filter(edge => edge.u !== node.id && edge.v !== node.id)
      }));
      setSelectedNode(null);
    } else {
      setSelectedNode(node.id);
    }
  };

  const handleEdgeClick = (e, idx) => {
    e.stopPropagation();
    if (mode === "REMOVE") {
      setCustomGraphData(prev => ({
        ...prev,
        edges: prev.edges.filter((_, i) => i !== idx)
      }));
    }
  };

  const handleClear = () => {
    setCustomGraphData({ nodes: [], edges: [], isDirected: false });
    setSelectedNode(null);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-2 relative w-full">
      
      {/* Editor Controls */}
      <div className="flex items-center gap-2 mb-2 bg-slate-900/80 p-2 rounded-lg border border-slate-700 backdrop-blur-sm z-10 absolute top-2">
        <button 
          onClick={() => setMode("SELECT")}
          className={`p-1.5 rounded-md flex items-center gap-1 text-xs font-semibold transition ${mode === "SELECT" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"}`}
          title="Select"
        >
          <MousePointer2 className="w-4 h-4" />
        </button>
        <button 
          onClick={() => { setMode("ADD_NODE"); setSelectedNode(null); }}
          className={`px-2 py-1.5 rounded-md flex items-center gap-1 text-xs font-semibold transition ${mode === "ADD_NODE" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"}`}
        >
          <Plus className="w-3.5 h-3.5" /> Node
        </button>
        <button 
          onClick={() => { setMode("ADD_EDGE"); setSelectedNode(null); }}
          className={`px-2 py-1.5 rounded-md flex items-center gap-1 text-xs font-semibold transition ${mode === "ADD_EDGE" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"}`}
        >
          <Plus className="w-3.5 h-3.5" /> Edge
        </button>
        <button 
          onClick={() => { setMode("REMOVE"); setSelectedNode(null); }}
          className={`px-2 py-1.5 rounded-md flex items-center gap-1 text-xs font-semibold transition ${mode === "REMOVE" ? "bg-red-600 text-white" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"}`}
        >
          <Trash2 className="w-3.5 h-3.5" /> Remove
        </button>
        <div className="w-px h-4 bg-slate-700 mx-1"></div>
        <button 
          onClick={handleClear}
          className="px-2 py-1.5 rounded-md text-xs font-semibold text-slate-400 hover:text-red-400 transition hover:bg-slate-800"
        >
          Clear
        </button>
      </div>

      <svg 
        ref={svgRef}
        onClick={handleSvgClick}
        className={`w-full h-[280px] max-w-[600px] border border-dashed border-slate-700 rounded-xl bg-[#0b0f19] ${mode === "ADD_NODE" ? "cursor-crosshair" : "cursor-default"}`} 
        viewBox="0 0 600 280"
      >
        <defs>
          <filter id="glow-selected" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Helper text when empty */}
        {customGraphData.nodes.length === 0 && (
          <text x="50%" y="50%" fill="#475569" fontSize="14" textAnchor="middle" dominantBaseline="middle" className="font-sans pointer-events-none">
            Click 'Node' and click here to add nodes
          </text>
        )}

        {/* Edges */}
        {customGraphData.edges.map((e, idx) => {
          const u = customGraphData.nodes.find(n => n.id === e.u);
          const v = customGraphData.nodes.find(n => n.id === e.v);
          if (!u || !v) return null;

          return (
            <g key={idx} onClick={(ev) => handleEdgeClick(ev, idx)} className={mode === "REMOVE" ? "cursor-pointer hover:opacity-50" : ""}>
              <line
                x1={u.x}
                y1={u.y}
                x2={v.x}
                y2={v.y}
                stroke={mode === "REMOVE" ? "#ef4444" : "#334155"}
                strokeWidth="2"
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

        {/* Nodes */}
        {customGraphData.nodes.map(n => {
          const isSelected = selectedNode === n.id;
          
          let fill = "#0f172a";
          let stroke = "#475569";
          let filter = "";

          if (isSelected) {
            fill = "#4338ca";
            stroke = "#818cf8";
            filter = "url(#glow-selected)";
          } else if (mode === "ADD_EDGE" && selectedNode !== null) {
            stroke = "#6366f1"; // Highlight as potential target
          } else if (mode === "REMOVE") {
            stroke = "#ef4444";
          }

          return (
            <g 
              key={n.id} 
              onClick={(e) => handleNodeClick(e, n)}
              className="transition-all duration-300 cursor-pointer"
            >
              <circle
                cx={n.x}
                cy={n.y}
                r="18"
                fill={fill}
                stroke={stroke}
                strokeWidth="2"
                filter={filter}
                className={mode === "REMOVE" ? "hover:stroke-red-500" : "hover:stroke-indigo-400"}
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
            </g>
          );
        })}
      </svg>
    </div>
  );
}
