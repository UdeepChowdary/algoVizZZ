import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { ALGORITHM_DATA } from '../data/algorithmData.js';
import { GENERATORS } from '../generators/index.js';
import { randomArray } from '../utils/helpers.js';
import { audioSynth } from '../utils/audioSynth.js';

export function useVisualizer(initialAlgoKey = "selection") {
  const [algoKey, setAlgoKey] = useState(initialAlgoKey);
  const [size, setSize] = useState(12);
  const [baseArray, setBaseArray] = useState(() => randomArray(12));
  const [searchTarget, setSearchTarget] = useState(42);
  const [nQueensSize, setNQueensSize] = useState(4);
  
  // Dynamic inputs for DP algorithms
  const [dpStrings, setDpStrings] = useState({ s1: "STONE", s2: "LONGEST" });
  const [knapsackItems, setKnapsackItems] = useState({
    weights: [2, 3, 4, 5],
    values: [3, 4, 5, 6],
    capacity: 5
  });
  
  // Custom graph data
  const [customGraphData, setCustomGraphData] = useState({
    nodes: [
      { id: 0, label: "0", x: 100, y: 100 },
      { id: 1, label: "1", x: 260, y: 60 },
      { id: 2, label: "2", x: 420, y: 100 },
      { id: 3, label: "3", x: 180, y: 180 },
      { id: 4, label: "4", x: 340, y: 180 }
    ],
    edges: [
      { u: 0, v: 1, weight: 4 },
      { u: 0, v: 3, weight: 2 },
      { u: 1, v: 2, weight: 3 },
      { u: 1, v: 3, weight: 5 },
      { u: 1, v: 4, weight: 1 },
      { u: 2, v: 4, weight: 7 },
      { u: 3, v: 4, weight: 8 }
    ],
    isDirected: false
  });

  const [speed, setSpeed] = useState(60); // 1-100
  const [stepIdx, setStepIdx] = useState(0);
  const [customStepsCount, setCustomStepsCount] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const timerRef = useRef(null);

  const currentAlgo = ALGORITHM_DATA[algoKey] || ALGORITHM_DATA.selection;

  // Re-generate steps when algorithm or input changes
  const steps = useMemo(() => {
    const gen = GENERATORS[algoKey];
    if (!gen) return [];

    if (currentAlgo.category === "sorting") {
      return gen(baseArray);
    }
    if (currentAlgo.category === "searching") {
      return gen(baseArray, searchTarget);
    }
    if (algoKey === "nqueens") {
      return gen(nQueensSize);
    }
    if (algoKey === "lcs") {
      return gen(dpStrings.s1, dpStrings.s2);
    }
    if (algoKey === "knapsack01") {
      return gen(knapsackItems.weights, knapsackItems.values, knapsackItems.capacity);
    }
    if (currentAlgo.category === "graph") {
      return gen(customGraphData);
    }
    return gen();
  }, [algoKey, baseArray, searchTarget, nQueensSize, dpStrings, knapsackItems, customGraphData, currentAlgo.category]);

  const step = steps[Math.min(stepIdx, steps.length - 1)] || {};
  const activeLength = customStepsCount !== null ? customStepsCount : steps.length;
  const isDone = stepIdx >= activeLength - 1;

  // Sound Synth Trigger Effect
  useEffect(() => {
    if (soundEnabled && playing && step) {
      audioSynth.init();
      if (step.compare && step.compare.length > 0) {
        const val = step.array ? step.array[step.compare[0]] || 20 : 20;
        audioSynth.playTone(250 + val * 12, "sine", 0.06, 0.04);
      } else if (step.swap && step.swap.length > 0) {
        audioSynth.playTone(550, "triangle", 0.08, 0.06);
      } else if (step.pivot && step.pivot.length > 0) {
        audioSynth.playTone(700, "square", 0.05, 0.03);
      } else {
        // Fallback tone for steps in non-sorting visualizers (grid, DP, BST, N-Queens)
        audioSynth.playTone(400, "sine", 0.04, 0.02);
      }
    }
  }, [stepIdx, soundEnabled, playing, step]);

  // Victory Fanfare Trigger
  useEffect(() => {
    if (isDone && soundEnabled && playing) {
      audioSynth.playVictoryFanfare();
    }
  }, [isDone, soundEnabled, playing]);

  // Reset playback when algo or input changes
  useEffect(() => {
    setStepIdx(0);
    setPlaying(false);
    setCustomStepsCount(null);
  }, [algoKey, baseArray, searchTarget, nQueensSize]);

  // Animation Interval Loop with Multi-Step Turbo Scaling
  useEffect(() => {
    if (playing) {
      let delay = 0;
      let stepIncrement = 1;

      if (speed <= 50) {
        delay = 600 - speed * 11; // 600ms down to 50ms
      } else if (speed <= 85) {
        delay = Math.max(3, 50 - (speed - 50) * 1.3); // 50ms down to 4.5ms
      } else {
        delay = 0;
        stepIncrement = Math.floor(1 + (speed - 85) * 0.4); // Multi-step jump for TURBO speed
      }

      timerRef.current = setTimeout(() => {
        setStepIdx(s => {
          const next = s + stepIncrement;
          if (next >= activeLength - 1) {
            setPlaying(false);
            return activeLength - 1;
          }
          return next;
        });
      }, delay);

      return () => clearTimeout(timerRef.current);
    }
  }, [playing, stepIdx, activeLength, speed]);

  const handleShuffle = useCallback(() => {
    if (soundEnabled) audioSynth.init();
    const newArr = randomArray(size);
    setBaseArray(newArr);
    if (currentAlgo.category === "searching") {
      setSearchTarget(newArr[Math.floor(newArr.length * 0.6)]);
    }
  }, [size, currentAlgo.category, soundEnabled]);

  const handleSetCustomArray = useCallback((newArr) => {
    if (soundEnabled) audioSynth.init();
    if (Array.isArray(newArr) && newArr.length > 0) {
      setBaseArray(newArr);
      setSize(newArr.length);
    }
  }, [soundEnabled]);

  const handlePlayPause = useCallback(() => {
    if (soundEnabled) {
      audioSynth.init();
      audioSynth.playStartTone();
    }
    if (isDone) setStepIdx(0);
    setPlaying(prev => !prev);
  }, [isDone, soundEnabled]);

  const handleStepNext = useCallback(() => {
    if (soundEnabled) {
      audioSynth.init();
      audioSynth.playTone(450, "sine", 0.04, 0.03);
    }
    setPlaying(false);
    setStepIdx(s => Math.min(activeLength - 1, s + 1));
  }, [activeLength, soundEnabled]);

  const handleStepPrev = useCallback(() => {
    if (soundEnabled) {
      audioSynth.init();
      audioSynth.playTone(350, "sine", 0.04, 0.03);
    }
    setPlaying(false);
    setStepIdx(s => Math.max(0, s - 1));
  }, [soundEnabled]);

  const handleReset = useCallback(() => {
    if (soundEnabled) audioSynth.init();
    setPlaying(false);
    setStepIdx(0);
  }, [soundEnabled]);

  const handleJumpToStep = useCallback((targetStep) => {
    if (soundEnabled) audioSynth.init();
    setPlaying(false);
    const clamped = Math.max(0, Math.min(activeLength - 1, targetStep));
    setStepIdx(clamped);
  }, [activeLength, soundEnabled]);

  return {
    algoKey,
    setAlgoKey,
    currentAlgo,
    size,
    setSize,
    baseArray,
    setBaseArray,
    handleSetCustomArray,
    searchTarget,
    setSearchTarget,
    nQueensSize,
    setNQueensSize,
    dpStrings,
    setDpStrings,
    knapsackItems,
    setKnapsackItems,
    customGraphData,
    setCustomGraphData,
    speed,
    setSpeed,
    stepIdx,
    setStepIdx,
    setCustomStepsCount,
    playing,
    setPlaying,
    soundEnabled,
    setSoundEnabled,
    steps,
    step,
    isDone,
    handleShuffle,
    handlePlayPause,
    handleStepNext,
    handleStepPrev,
    handleReset,
    handleJumpToStep
  };
}
