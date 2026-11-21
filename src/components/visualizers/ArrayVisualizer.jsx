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

  // Canvas drawing logic with dynamic resize handling
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fallback for ctx.roundRect on older browsers
    if (!ctx.roundRect) {
      ctx.roundRect = function (x, y, w, h, radii = 0) {
        const r = typeof radii === 'number' ? radii : (Array.isArray(radii) ? radii[0] : 0);
        const radius = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
        this.moveTo(x + radius, y);
        this.lineTo(x + w - radius, y);
        this.quadraticCurveTo(x + w, y, x + w, y + radius);
        this.lineTo(x + w, y + h - radius);
        this.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
        this.lineTo(x + radius, y + h);
        this.quadraticCurveTo(x, y + h, x, y + h - radius);
        this.lineTo(x, y + radius);
        this.quadraticCurveTo(x, y, x + radius, y);
        this.closePath();
      };
    }

    const draw = () => {
      // Support high DPI displays
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      ctx.save();
      ctx.scale(dpr, dpr);
      
      const w = rect.width;
      const h = rect.height;
      
      ctx.clearRect(0, 0, w, h);
      
      if (arr.length === 0) {
        ctx.restore();
        return;
      }
      
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

      const minVal = Math.min(0, ...arr);
      const maxVal = Math.max(...arr, 1);
      const hasNegative = minVal < 0;
      const valRange = hasNegative ? (maxVal - minVal) : Math.max(maxVal, 100);
      const zeroY = hasNegative 
        ? topPadding + (maxVal / valRange) * maxBarHeight 
        : h - bottomPadding;

      // Draw zero baseline if negative values exist
      if (hasNegative) {
        ctx.strokeStyle = 'rgba(214, 228, 204, 0.2)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(startX - 10, zeroY);
        ctx.lineTo(startX + totalChartWidth + 10, zeroY);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      
      arr.forEach((val, idx) => {
        const isSorted = step.sortedIdx?.includes(idx);
        const isSwap = step.swap?.includes(idx);
        const isPivot = step.pivot?.includes(idx);
        const isCompare = step.compare?.includes(idx);
        
        const x = startX + idx * (barWidth + gap);
        let barHeight = 14;
        let y = zeroY - 14;

        if (!hasNegative) {
          barHeight = Math.max(14, (val / maxVal) * maxBarHeight);
          y = h - bottomPadding - barHeight;
        } else {
          barHeight = Math.max(10, (Math.abs(val) / valRange) * maxBarHeight);
          y = val >= 0 ? zeroY - barHeight : zeroY;
        }
        
        let baseColor = [103, 131, 79]; // forest sage (#67834f)
        let topColor = [181, 206, 115]; // acid olive (#b5ce73)
        let strokeColor = '#78955a';
        let shadowColor = 'rgba(181, 206, 115, 0.2)';
        let labelBadge = null;
        let textColor = '#a0aaa2';
        
        if (isSorted) {
          baseColor = [130, 158, 80]; // forest (#829e50)
          topColor = [198, 225, 138]; // fresh acid (#c6e18a)
          strokeColor = '#b9d879';
          shadowColor = 'rgba(198, 225, 138, 0.35)';
          textColor = '#c5dc8e';
        } else if (isSwap) {
          baseColor = [208, 92, 66]; // rust brick (#d05c42)
          topColor = [255, 173, 142]; // terracotta coral (#ffad8e)
          strokeColor = '#ff9b7d';
          shadowColor = 'rgba(208, 92, 66, 0.4)';
          labelBadge = 'SWAP';
          textColor = '#ffad8e';
        } else if (isPivot) {
          baseColor = [193, 146, 67]; // warm ochre (#c19243)
          topColor = [244, 221, 150]; // golden amber (#f4dd96)
          strokeColor = '#f0d582';
          shadowColor = 'rgba(244, 221, 150, 0.35)';
          labelBadge = 'PIVOT';
          textColor = '#f4dd96';
        } else if (isCompare) {
          baseColor = [189, 99, 74]; // terracotta dark (#bd634a)
          topColor = [237, 170, 134]; // terracotta peach (#edaa86)
          strokeColor = '#eaa17d';
          shadowColor = 'rgba(237, 170, 134, 0.35)';
          labelBadge = 'CMP';
          textColor = '#edaa86';
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
        ctx.strokeStyle = strokeColor;
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
          ctx.fillStyle = '#7a867d';
          ctx.font = '10px monospace';
          ctx.fillText(`[${idx}]`, x + barWidth / 2, h - 10);
          
          // Value
          ctx.fillStyle = textColor;
          ctx.font = (isCompare || isSwap || isPivot) ? 'bold 11px sans-serif' : '11px sans-serif';
          const valY = val < 0 ? y + barHeight + 12 : y - 10;
          ctx.fillText(val.toString(), x + barWidth / 2, valY);
          
          // Badge
          if (labelBadge) {
            ctx.fillStyle = '#111815';
            ctx.beginPath();
            ctx.roundRect(x + barWidth / 2 - 15, y - 32, 30, 14, 4);
            ctx.fill();
            
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 1;
            ctx.stroke();
            
            ctx.fillStyle = '#f5f4ed';
            ctx.font = 'bold 9px monospace';
            ctx.fillText(labelBadge, x + barWidth / 2, y - 25);
          }
        }
        
        // Draw tooltip if hovered
        if (hoveredIdx === idx) {
          ctx.fillStyle = '#111815';
          ctx.strokeStyle = '#35413b';
          ctx.beginPath();
          const tooltipW = 120;
          const tooltipH = 26;
          const tooltipX = x + barWidth / 2 - tooltipW / 2;
          const tooltipY = y - 60 > 0 ? y - 60 : y + 20;
          ctx.roundRect(tooltipX, tooltipY, tooltipW, tooltipH, 8);
          ctx.fill();
          ctx.stroke();
          
          ctx.fillStyle = '#f5f4ed';
          ctx.font = '10px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(`Val: `, tooltipX + 25, tooltipY + 13);
          ctx.fillStyle = '#d4ec7a';
          ctx.fillText(`${val}`, tooltipX + 50, tooltipY + 13);
          ctx.fillStyle = '#f5f4ed';
          ctx.fillText(` | Idx: [${idx}]`, tooltipX + 90, tooltipY + 13);
        }
      });
      
      ctx.restore();
    };

    draw();

    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        draw();
      });
      resizeObserver.observe(container);
    } else {
      window.addEventListener('resize', draw);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', draw);
      }
    };
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
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#d5dbd3] mb-2">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-[#c9583c]" />
          <span className="text-[#d5dbd3] font-semibold font-sans">Visual Dataset:</span>
          <span className="text-[#d4ec7a] font-bold px-2 py-0.5 rounded-md bg-[#25322c] border border-[#3a4740]">
            {arr.length} elements
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Presets Dropdown / Buttons */}
          <div className="hidden sm:flex gap-1">
            <button
              onClick={() => handlePreset('reversed')}
              className="px-2.5 py-1 rounded-lg bg-[#18211d] hover:bg-[#202a24] text-[#d5dbd3] hover:text-white border border-[#35413b] text-[11px] font-sans transition"
            >
              Reversed
            </button>
            <button
              onClick={() => handlePreset('nearly')}
              className="px-2.5 py-1 rounded-lg bg-[#18211d] hover:bg-[#202a24] text-[#d5dbd3] hover:text-white border border-[#35413b] text-[11px] font-sans transition"
            >
              Nearly Sorted
            </button>
            <button
              onClick={() => handlePreset('few')}
              className="px-2.5 py-1 rounded-lg bg-[#18211d] hover:bg-[#202a24] text-[#d5dbd3] hover:text-white border border-[#35413b] text-[11px] font-sans transition"
            >
              Few Unique
            </button>
          </div>

          <button
            onClick={() => {
              setIsEditing(!isEditing);
              setInputText(arr.join(', '));
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#18211d] hover:bg-[#202a24] text-[#d5dbd3] hover:text-white border border-[#35413b] hover:border-[#c9583c]/50 transition active:scale-95 font-sans"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#c9583c]" />
            <span>{isEditing ? "Cancel" : "Custom Array"}</span>
          </button>
        </div>
      </div>

      {/* Custom Array Input Modal / Drawer */}
      {isEditing && (
        <div className="mb-4 p-3.5 rounded-2xl bg-[#18211d] border border-[#35413b] flex flex-col gap-2 text-xs shadow-2xl animate-fadeIn">
          <label className="text-[#d5dbd3] font-semibold font-sans">Enter comma-separated numbers (1-999):</label>
          <div className="flex gap-2 font-mono">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g. 45, 12, 89, 23, 67, 10"
              className="flex-1 px-3 py-2 rounded-xl bg-[#111815] border border-[#303a35] text-[#f5f4ed] focus:outline-none focus:border-[#c9583c]"
            />
            <button
              onClick={handleSaveCustom}
              className="px-4 py-2 rounded-xl bg-[#c9583c] hover:bg-[#a7432c] text-white font-semibold flex items-center gap-1.5 transition active:scale-95 font-sans shadow-sm"
            >
              <Check className="w-4 h-4" /> Apply
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-2 rounded-xl bg-[#202a24] hover:bg-[#2e3b32] text-[#d5dbd3] transition active:scale-95"
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
      <div className="flex flex-wrap items-center justify-center gap-5 pt-3 border-t border-[#303a35] text-[11px] text-[#a0aaa2] font-sans shrink-0 mt-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#b5ce73] inline-block" /> Unsorted
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#edaa86] inline-block" /> Comparing
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffad8e] inline-block" /> Swapping
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f4dd96] inline-block" /> Pivot/Key
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#c6e18a] inline-block" /> Sorted
        </div>
      </div>
    </div>
  );
}
