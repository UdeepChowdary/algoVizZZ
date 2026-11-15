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
      <div className="flex items-center gap-2 mb-2 bg-[#18211d]/90 p-2 rounded-lg border border-[#35413b] backdrop-blur-sm z-10 absolute top-2">
        <button 
          onClick={() => setMode("SELECT")}
          className={`p-1.5 rounded-md flex items-center gap-1 text-xs font-semibold transition ${mode === "SELECT" ? "bg-[#c9583c] text-white" : "text-[#87918a] hover:text-white hover:bg-[#202a24]"}`}
          title="Select"
        >
          <MousePointer2 className="w-4 h-4" />
        </button>
        <button 
          onClick={() => { setMode("ADD_NODE"); setSelectedNode(null); }}
          className={`px-2 py-1.5 rounded-md flex items-center gap-1 text-xs font-semibold transition ${mode === "ADD_NODE" ? "bg-[#d4ec7a] text-[#1e2923]" : "text-[#87918a] hover:text-white hover:bg-[#202a24]"}`}
        >
          <Plus className="w-3.5 h-3.5" /> Node
        </button>
        <button 
          onClick={() => { setMode("ADD_EDGE"); setSelectedNode(null); }}
          className={`px-2 py-1.5 rounded-md flex items-center gap-1 text-xs font-semibold transition ${mode === "ADD_EDGE" ? "bg-[#c9583c] text-white" : "text-[#87918a] hover:text-white hover:bg-[#202a24]"}`}
        >
          <Plus className="w-3.5 h-3.5" /> Edge
        </button>
        <button 
          onClick={() => { setMode("REMOVE"); setSelectedNode(null); }}
          className={`px-2 py-1.5 rounded-md flex items-center gap-1 text-xs font-semibold transition ${mode === "REMOVE" ? "bg-[#d05c42] text-white" : "text-[#87918a] hover:text-white hover:bg-[#202a24]"}`}
        >
          <Trash2 className="w-3.5 h-3.5" /> Remove
        </button>
        <div className="w-px h-4 bg-[#35413b] mx-1"></div>
        <button 
          onClick={handleClear}
          className="px-2 py-1.5 rounded-md text-xs font-semibold text-[#87918a] hover:text-[#d05c42] transition hover:bg-[#202a24]"
        >
          Clear
        </button>
      </div>

      <svg 
        ref={svgRef}
        onClick={handleSvgClick}
        className={`w-full h-[280px] max-w-[600px] border border-dashed border-[#35413b] rounded-xl bg-[#111815] ${mode === "ADD_NODE" ? "cursor-crosshair" : "cursor-default"}`} 
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
          <text x="50%" y="50%" fill="#a0aaa2" fontSize="13" textAnchor="middle" dominantBaseline="middle" className="font-sans pointer-events-none">
            Click '+ Node' and click here to place nodes
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
                stroke={mode === "REMOVE" ? "#ef4444" : "#4a574f"}
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
                    fill="#111815"
                    stroke="#35413b"
                    rx="4"
                  />
                  <text
                    x={(u.x + v.x) / 2}
                    y={(u.y + v.y) / 2}
                    fill="#d4ec7a"
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
          
          let fill = "#18211d";
          let stroke = "#35413b";
          let filter = "";

          if (isSelected) {
            fill = "#c9583c";
            stroke = "#ffad8e";
            filter = "url(#glow-selected)";
          } else if (mode === "ADD_EDGE" && selectedNode !== null) {
            stroke = "#d4ec7a"; // Highlight as potential target
          } else if (mode === "REMOVE") {
            stroke = "#d05c42";
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
                className={mode === "REMOVE" ? "hover:stroke-[#d05c42]" : "hover:stroke-[#c9583c]"}
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
