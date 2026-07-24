import React, { useState } from 'react';
import { parseCustomArray } from '../../utils/helpers.js';
import { Edit3, Check, X, BarChart2 } from 'lucide-react';

export default function ArrayVisualizer({ step, baseArray, onSetCustomArray }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState('');
  const canvasRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const arr = step.array || baseArray || [];
  const maxVal = Math.max(...arr, 100);

  const handleSaveCustom = () => {
    const parsed = parseCustomArray(inputText);
    if (parsed) {
      onSetCustomArray(parsed);
      setIsEditing(false);
      setInputText('');
    }
  };

  const handlePreset = (type) => {
    const len = arr.length || 12;
    let presetArr = [];
    if (type === 'reversed') {
      presetArr = Array.from({ length: len }, (_, i) => (len - i) * 8 + 10);
    } else if (type === 'nearly') {
      presetArr = Array.from({ length: len }, (_, i) => i * 8 + 15);
      if (len > 3) {
        const tmp = presetArr[2];
        presetArr[2] = presetArr[3];
        presetArr[3] = tmp;
      }
    } else if (type === 'few') {
      const vals = [25, 50, 75, 100];
      presetArr = Array.from({ length: len }, () => vals[Math.floor(Math.random() * vals.length)]);
    }
    if (presetArr.length > 0) {
      onSetCustomArray(presetArr);
    }
  };

  // Canvas drawing logic
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;
    if (!container) return;
    
    // Support high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    
    ctx.scale(dpr, dpr);
    
    const w = rect.width;
    const h = rect.height;
    
    ctx.clearRect(0, 0, w, h);
    
    if (arr.length === 0) return;
    
    const padding = 10;
    const gap = Math.min(4, w / arr.length * 0.2); // max 4px gap, or 20% of allocated width
    const totalGapWidth = gap * (arr.length - 1);
    const maxBarWidth = 50;
    const calculatedBarWidth = (w - 2 * padding - totalGapWidth) / arr.length;
    const barWidth = Math.min(maxBarWidth, calculatedBarWidth);
    
    // Center the graph horizontally if bars are smaller than available width
    const totalChartWidth = arr.length * barWidth + totalGapWidth;
    const startX = (w - totalChartWidth) / 2;
    
    const bottomPadding = 25; // Space for index
    const topPadding = 45; // Space for values and badges
    const maxBarHeight = h - bottomPadding - topPadding;
    
    arr.forEach((val, idx) => {
      const isSorted = step.sortedIdx?.includes(idx);
      const isSwap = step.swap?.includes(idx);
      const isPivot = step.pivot?.includes(idx);
      const isCompare = step.compare?.includes(idx);
      
      const x = startX + idx * (barWidth + gap);
      const barHeight = Math.max(14, (val / maxVal) * maxBarHeight);
      const y = h - bottomPadding - barHeight;
      
      let baseColor = [79, 70, 229]; // indigo-600
      let topColor = [56, 189, 248]; // sky-400
      let shadowColor = 'rgba(99,102,241,0.3)';
      let labelBadge = null;
      let textColor = '#cbd5e1'; // slate-300
      
      if (isSorted) {
        baseColor = [5, 150, 105]; // emerald-600
        topColor = [94, 234, 212]; // teal-300
        shadowColor = 'rgba(16,185,129,0.4)';
        textColor = '#6ee7b7'; // emerald-300
      } else if (isSwap) {
        baseColor = [225, 29, 72]; // rose-600
        topColor = [244, 114, 182]; // pink-400
        shadowColor = 'rgba(244,63,94,0.6)';
        labelBadge = 'SWAP';
        textColor = '#fda4af'; // rose-300
      } else if (isPivot) {
        baseColor = [147, 51, 234]; // purple-600
        topColor = [232, 121, 249]; // fuchsia-400
        shadowColor = 'rgba(168,85,247,0.6)';
        labelBadge = 'PIVOT';
        textColor = '#d8b4fe'; // purple-300
      } else if (isCompare) {
        baseColor = [245, 158, 11]; // amber-500
        topColor = [253, 224, 71]; // yellow-300
        shadowColor = 'rgba(245,158,11,0.5)';
        labelBadge = 'CMP';
        textColor = '#fcd34d'; // amber-300
      }
      
      // Draw shadow
      ctx.shadowColor = shadowColor;
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      // Create Gradient
      const grad = ctx.createLinearGradient(x, y + barHeight, x, y);
      grad.addColorStop(0, `rgb(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]})`);
      grad.addColorStop(1, `rgb(${topColor[0]}, ${topColor[1]}, ${topColor[2]})`);
      
      ctx.fillStyle = grad;
      
      // Top corners rounded (approximated for performance)
      ctx.beginPath();
      const radius = Math.min(6, barWidth / 2);
      ctx.moveTo(x, y + barHeight);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.lineTo(x + barWidth - radius, y);
      ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
      ctx.lineTo(x + barWidth, y + barHeight);
      ctx.closePath();
      ctx.fill();
      
      // Top border highlight
      ctx.shadowBlur = 0;
      ctx.strokeStyle = `rgba(${topColor[0]}, ${topColor[1]}, ${topColor[2]}, 0.8)`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.lineTo(x + barWidth - radius, y);
      ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
      ctx.stroke();
      
      // Only draw text if bars are wide enough
      if (barWidth > 20) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Index
        ctx.fillStyle = '#64748b'; // slate-500
        ctx.font = '10px monospace';
        ctx.fillText(`[${idx}]`, x + barWidth / 2, h - 10);
        
        // Value
        ctx.fillStyle = textColor;
        ctx.font = (isCompare || isSwap || isPivot) ? 'bold 11px sans-serif' : '11px sans-serif';
        ctx.fillText(val.toString(), x + barWidth / 2, y - 10);
        
        // Badge
        if (labelBadge) {
          ctx.fillStyle = '#020617'; // slate-950
          ctx.beginPath();
          ctx.roundRect(x + barWidth / 2 - 15, y - 32, 30, 14, 4);
          ctx.fill();
          
          ctx.strokeStyle = '#334155'; // slate-700
          ctx.lineWidth = 1;
          ctx.stroke();
          
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 9px monospace';
          ctx.fillText(labelBadge, x + barWidth / 2, y - 25);
        }
      }
      
      // Draw tooltip if hovered
      if (hoveredIdx === idx) {
        ctx.fillStyle = '#020617';
        ctx.strokeStyle = '#334155';
        ctx.beginPath();
        const tooltipW = 120;
        const tooltipH = 26;
        const tooltipX = x + barWidth / 2 - tooltipW / 2;
        const tooltipY = y - 60 > 0 ? y - 60 : y + 20;
        ctx.roundRect(tooltipX, tooltipY, tooltipW, tooltipH, 8);
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`Val: `, tooltipX + 25, tooltipY + 13);
        ctx.fillStyle = '#818cf8'; // indigo-300
        ctx.fillText(`${val}`, tooltipX + 50, tooltipY + 13);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(` | Idx: [${idx}]`, tooltipX + 90, tooltipY + 13);
      }
    });
    
  }, [arr, step, maxVal, hoveredIdx]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const w = rect.width;
    
    if (arr.length === 0) {
      setHoveredIdx(null);
      return;
    }
    
    const padding = 10;
    const gap = Math.min(4, w / arr.length * 0.2);
    const totalGapWidth = gap * (arr.length - 1);
    const maxBarWidth = 50;
    const calculatedBarWidth = (w - 2 * padding - totalGapWidth) / arr.length;
    const barWidth = Math.min(maxBarWidth, calculatedBarWidth);
    const totalChartWidth = arr.length * barWidth + totalGapWidth;
    const startX = (w - totalChartWidth) / 2;
    
    if (x >= startX && x <= startX + totalChartWidth) {
      const idx = Math.floor((x - startX) / (barWidth + gap));
      if (idx >= 0 && idx < arr.length) {
        const itemStartX = startX + idx * (barWidth + gap);
        if (x >= itemStartX && x <= itemStartX + barWidth) {
          setHoveredIdx(idx);
          return;
        }
      }
    }
    setHoveredIdx(null);
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4 md:p-6 min-h-[360px] relative font-mono">
      {/* Top Header / Custom Options Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300 mb-2">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-indigo-300" />
          <span className="text-slate-300 font-semibold font-sans">Visual Dataset:</span>
          <span className="text-indigo-300 font-bold px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20">
            {arr.length} elements
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Presets Dropdown / Buttons */}
          <div className="hidden sm:flex gap-1">
            <button
              onClick={() => handlePreset('reversed')}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-slate-200 border border-slate-800 text-[11px] font-sans transition"
            >
              Reversed
            </button>
            <button
              onClick={() => handlePreset('nearly')}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-slate-200 border border-slate-800 text-[11px] font-sans transition"
            >
              Nearly Sorted
            </button>
            <button
              onClick={() => handlePreset('few')}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-slate-200 border border-slate-800 text-[11px] font-sans transition"
            >
              Few Unique
            </button>
          </div>

          <button
            onClick={() => {
              setIsEditing(!isEditing);
              setInputText(arr.join(', '));
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-indigo-500/30 transition active:scale-95 font-sans"
          >
            <Edit3 className="w-3.5 h-3.5 text-indigo-300" />
            <span>{isEditing ? "Cancel" : "Custom Array"}</span>
          </button>
        </div>
      </div>

      {/* Custom Array Input Modal / Drawer */}
      {isEditing && (
        <div className="mb-4 p-3.5 rounded-2xl bg-slate-900 border border-indigo-500/30 flex flex-col gap-2 text-xs shadow-2xl animate-fadeIn">
          <label className="text-slate-300 font-semibold font-sans">Enter comma-separated numbers (1-999):</label>
          <div className="flex gap-2 font-mono">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g. 45, 12, 89, 23, 67, 10"
              className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleSaveCustom}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1.5 transition shadow-lg glow-indigo-subtle active:scale-95 font-sans"
            >
              <Check className="w-4 h-4" /> Apply
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* High-Performance Canvas Rendering */}
      <div 
        ref={containerRef} 
        className="flex-1 w-full min-h-[260px] relative cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <canvas ref={canvasRef} className="absolute inset-0" />
      </div>

      {/* Legend Footer */}
      <div className="flex flex-wrap items-center justify-center gap-5 pt-3 border-t border-slate-800/80 text-[11px] text-slate-300 font-sans shrink-0 mt-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" /> Unsorted
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Comparing
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Swapping
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" /> Pivot/Key
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" /> Sorted
        </div>
      </div>
    </div>
  );
}
