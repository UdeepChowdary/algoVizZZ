import React from 'react';
import { Database, Link2 } from 'lucide-react';

const SLOT_SIZE = 50;
const GAP = 10;
const LIST_GAP = 30;

function ChainingVisualizer({ step }) {
  const { table, insertingVal, computedHash, highlightedIdx } = step;

  return (
    <div className="flex-1 flex flex-col justify-center items-center p-4 min-h-[400px] overflow-hidden">
      <div className="flex flex-col gap-2">
        {table.map((chain, index) => {
          const isHighlighted = highlightedIdx === index;
          return (
            <div key={`slot-${index}`} className="flex items-center">
              {/* Array Slot */}
              <div
                className={`w-12 h-12 flex items-center justify-center font-mono font-bold border-2 rounded-lg relative z-10 transition-colors ${
                  isHighlighted ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-300'
                }`}
              >
                {index}
              </div>

              {/* Chain connecting line and nodes */}
              {chain.length > 0 && (
                <div className="flex items-center">
                  <div className={`w-8 h-0.5 ${isHighlighted ? 'bg-indigo-500' : 'bg-slate-600'}`}></div>
                  <div className="flex gap-4">
                    {chain.map((val, i) => {
                      const isLast = i === chain.length - 1;
                      const isNewInsert = isHighlighted && isLast && val === insertingVal;
                      return (
                        <div key={`node-${index}-${i}`} className="flex items-center">
                          <div
                            className={`px-4 py-2 rounded font-mono font-bold border-2 flex items-center gap-2 ${
                              isNewInsert ? 'bg-emerald-600 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-slate-800 border-slate-600 text-slate-200'
                            }`}
                          >
                            {val}
                            {i < chain.length - 1 && <Link2 className="w-4 h-4 text-slate-500" />}
                          </div>
                          {!isLast && <div className="w-4 h-0.5 bg-slate-600"></div>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProbingVisualizer({ step }) {
  const { table, insertingVal, probeIdx } = step;

  return (
    <div className="flex-1 flex flex-col justify-center items-center p-4 min-h-[300px] overflow-hidden">
      <div className="flex flex-wrap justify-center gap-4">
        {table.map((val, index) => {
          const isProbing = probeIdx === index;
          const isNewInsert = isProbing && val === insertingVal;

          return (
            <div key={`slot-${index}`} className="flex flex-col items-center gap-2">
              <span className="text-xs font-mono text-slate-500">[{index}]</span>
              <div
                className={`w-16 h-16 flex items-center justify-center font-mono text-lg font-bold border-2 rounded-xl transition-all ${
                  isProbing && val === null ? 'bg-indigo-900/50 border-indigo-500 text-indigo-300' :
                  isNewInsert ? 'bg-emerald-600 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]' :
                  isProbing && val !== null ? 'bg-rose-900/50 border-rose-500 text-rose-300' :
                  val !== null ? 'bg-slate-800 border-slate-600 text-slate-200' :
                  'bg-slate-900 border-slate-700 text-slate-600'
                }`}
              >
                {val !== null ? val : '∅'}
              </div>
              {/* Probe pointer */}
              <div className={`transition-opacity ${isProbing ? 'opacity-100' : 'opacity-0'}`}>
                <span className="text-xs font-bold text-indigo-400">↑ probe</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function HashTableVisualizer({ step }) {
  if (!step || !step.table) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-500 gap-2">
        <Database className="w-8 h-8" />
        <span className="font-mono">Initializing Hash Table...</span>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col relative w-full h-full">
      {/* Current Insert Info Panel */}
      {step.insertingVal !== null && (
        <div className="absolute top-4 right-4 bg-slate-900 border border-indigo-500/50 p-4 rounded-xl shadow-lg flex flex-col gap-2 z-20 min-w-[200px]">
          <div className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Current Operation</div>
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="text-slate-400 font-mono text-sm">Value:</span>
            <span className="text-emerald-400 font-mono font-bold text-lg">{step.insertingVal}</span>
          </div>
          {step.computedHash !== null && (
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-mono text-sm">Hash % 7:</span>
              <span className="text-amber-400 font-mono font-bold">{step.computedHash}</span>
            </div>
          )}
        </div>
      )}

      {step.type === 'chaining' ? (
        <ChainingVisualizer step={step} />
      ) : (
        <ProbingVisualizer step={step} />
      )}
    </div>
  );
}
