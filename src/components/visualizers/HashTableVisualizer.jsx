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
                  isHighlighted ? 'bg-[#c9583c] border-[#ffad8e] text-white' : 'bg-[#18211d] border-[#35413b] text-[#d5dbd3]'
                }`}
              >
                {index}
              </div>

              {/* Chain connecting line and nodes */}
              {chain.length > 0 && (
                <div className="flex items-center">
                  <div className={`w-8 h-0.5 ${isHighlighted ? 'bg-[#c9583c]' : 'bg-[#35413b]'}`}></div>
                  <div className="flex gap-4">
                    {chain.map((val, i) => {
                      const isLast = i === chain.length - 1;
                      const isNewInsert = isHighlighted && isLast && val === insertingVal;
                      return (
                        <div key={`node-${index}-${i}`} className="flex items-center">
                          <div
                            className={`px-4 py-2 rounded font-mono font-bold border-2 flex items-center gap-2 ${
                              isNewInsert ? 'bg-[#d4ec7a] border-[#b5ce73] text-[#111815] shadow-md' : 'bg-[#25322c] border-[#3a4740] text-[#f5f4ed]'
                            }`}
                          >
                            {val}
                            {i < chain.length - 1 && <Link2 className="w-4 h-4 text-[#707b73]" />}
                          </div>
                          {!isLast && <div className="w-4 h-0.5 bg-[#35413b]"></div>}
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
              <span className="text-xs font-mono text-[#87918a]">[{index}]</span>
              <div
                className={`w-16 h-16 flex items-center justify-center font-mono text-lg font-bold border-2 rounded-xl transition-all ${
                  isProbing && val === null ? 'bg-[#2a2417] border-[#f4dd96] text-[#f4dd96]' :
                  isNewInsert ? 'bg-[#d4ec7a] border-[#b5ce73] text-[#111815] shadow-md' :
                  isProbing && val !== null ? 'bg-[#2f1f1a] border-[#ffad8e] text-[#ffad8e]' :
                  val !== null ? 'bg-[#18211d] border-[#35413b] text-[#f5f4ed]' :
                  'bg-[#111815] border-[#252f2a] text-[#526058]'
                }`}
              >
                {val !== null ? val : '∅'}
              </div>
              {/* Probe pointer */}
              <div className={`transition-opacity ${isProbing ? 'opacity-100' : 'opacity-0'}`}>
                <span className="text-xs font-bold text-[#c9583c]">↑ probe</span>
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
      <div className="flex-1 flex flex-col items-center justify-center text-[#a0aaa2] gap-2">
        <Database className="w-8 h-8 text-[#c9583c]" />
        <span className="font-mono">Initializing Hash Table...</span>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col relative w-full h-full">
      {/* Current Insert Info Panel */}
      {step.insertingVal !== null && (
        <div className="absolute top-4 right-4 bg-[#18211d] border border-[#c9583c]/50 p-4 rounded-xl shadow-lg flex flex-col gap-2 z-20 min-w-[200px]">
          <div className="text-xs text-[#ffad8e] font-bold uppercase tracking-wider font-mono">Current Operation</div>
          <div className="flex justify-between items-center border-b border-[#35413b] pb-2">
            <span className="text-[#a0aaa2] font-mono text-sm">Value:</span>
            <span className="text-[#d4ec7a] font-mono font-bold text-lg">{step.insertingVal}</span>
          </div>
          {step.computedHash !== null && (
            <div className="flex justify-between items-center">
              <span className="text-[#a0aaa2] font-mono text-sm">Hash % 7:</span>
              <span className="text-[#f4dd96] font-mono font-bold">{step.computedHash}</span>
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
