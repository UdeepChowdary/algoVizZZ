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
  const [speed, setSpeed] = useState(60); // 1-100
  const [stepIdx, setStepIdx] = useState(0);
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
    return gen();
  }, [algoKey, baseArray, searchTarget, nQueensSize, currentAlgo.category]);

  const step = steps[Math.min(stepIdx, steps.length - 1)] || {};
  const isDone = stepIdx >= steps.length - 1;

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
      }
    }
  }, [stepIdx, soundEnabled, playing, step]);

  // Reset playback when algo or input changes
  useEffect(() => {
    setStepIdx(0);
    setPlaying(false);
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
          if (next >= steps.length - 1) {
            setPlaying(false);
            return steps.length - 1;
          }
          return next;
        });
      }, delay);

      return () => clearTimeout(timerRef.current);
    }
  }, [playing, stepIdx, steps.length, speed]);

  const handleShuffle = useCallback(() => {
    const newArr = randomArray(size);
    setBaseArray(newArr);
    if (currentAlgo.category === "searching") {
      setSearchTarget(newArr[Math.floor(newArr.length * 0.6)]);
    }
  }, [size, currentAlgo.category]);

  const handleSetCustomArray = useCallback((newArr) => {
    if (Array.isArray(newArr) && newArr.length > 0) {
      setBaseArray(newArr);
      setSize(newArr.length);
    }
  }, []);

  const handlePlayPause = useCallback(() => {
    if (isDone) setStepIdx(0);
    setPlaying(prev => !prev);
  }, [isDone]);

  const handleStepNext = useCallback(() => {
    setPlaying(false);
    setStepIdx(s => Math.min(steps.length - 1, s + 1));
  }, [steps.length]);

  const handleStepPrev = useCallback(() => {
    setPlaying(false);
    setStepIdx(s => Math.max(0, s - 1));
  }, []);

  const handleReset = useCallback(() => {
    setPlaying(false);
    setStepIdx(0);
  }, []);

  const handleJumpToStep = useCallback((targetStep) => {
    setPlaying(false);
    const clamped = Math.max(0, Math.min(steps.length - 1, targetStep));
    setStepIdx(clamped);
  }, [steps.length]);

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
    speed,
    setSpeed,
    stepIdx,
    setStepIdx,
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
