import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ALGORITHM_CATEGORIES, ALGORITHM_DATA } from '../data/algorithmData.js';
import {
  ArrowDown, ArrowRight, BarChart3, BookOpen, Braces, Check, ChevronDown,
  Command, Compass, GitFork, Grid2X2, Layers3, Network, Pause, Play,
  RotateCcw, Search, Shuffle, Volume2, VolumeX, X,
} from 'lucide-react';
import {
  generateBubbleSort,
  generateMergeSort,
  generateQuickSort,
  generateSelectionSort,
} from '../generators/sortingGenerators.js';
import { randomArray } from '../utils/helpers.js';
import { audioSynth } from '../utils/audioSynth.js';
import DsaSheetsSection from './DsaSheetsSection.jsx';
import DsaPatternsSection from './DsaPatternsSection.jsx';
import LeetCodeStats from './LeetCodeStats.jsx';

const DEMO_ALGORITHMS = [
  { id: 'quick', name: 'Quick sort', generator: generateQuickSort },
  { id: 'merge', name: 'Merge sort', generator: generateMergeSort },
  { id: 'bubble', name: 'Bubble sort', generator: generateBubbleSort },
  { id: 'selection', name: 'Selection sort', generator: generateSelectionSort },
];

const LEARNING_PATHS = [
  { number: '01', name: 'Sort & search', detail: 'Arrays, ordering, and finding a value', meta: '8 visualizations', icon: BarChart3, algorithm: 'quick' },
  { number: '02', name: 'Traverse a graph', detail: 'Follow a route through connected nodes', meta: '3 visualizations', icon: Network, algorithm: 'bfs' },
  { number: '03', name: 'Build a solution', detail: 'Dynamic programming, one decision at a time', meta: '2 visualizations', icon: Layers3, algorithm: 'knapsack01' },
];

const FEATURE_NOTES = [
  { number: '01', title: 'Move at your own pace', body: 'Play, pause, or step through the execution. Every comparison and change stays in context.' },
  { number: '02', title: 'Read the code alongside it', body: 'See the active line and its variables update as the visual state changes.' },
  { number: '03', title: 'Try your own input', body: 'Change the data, adjust playback, then run another approach against the same problem.' },
];

export default function HomePage({ onLaunchStudio, onSelectAlgorithm }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllAlgorithms, setShowAllAlgorithms] = useState(false);
  const [heroAlgo, setHeroAlgo] = useState('quick');
  const [heroArray, setHeroArray] = useState([48, 18, 85, 32, 95, 12, 64, 28, 76, 52]);
  const [heroStepIdx, setHeroStepIdx] = useState(0);
  const [heroPlaying, setHeroPlaying] = useState(false);
  const [heroSound, setHeroSound] = useState(false);
  const timerRef = useRef(null);

  const heroSteps = useMemo(() => {
    const generator = DEMO_ALGORITHMS.find((item) => item.id === heroAlgo)?.generator || generateQuickSort;
    try {
      return generator(heroArray);
    } catch {
      return [{ array: heroArray, note: 'Ready', compare: [], swap: [], pivot: [], sortedIdx: [] }];
    }
  }, [heroAlgo, heroArray]);

  const currentStep = heroSteps[Math.min(heroStepIdx, Math.max(0, heroSteps.length - 1))] || {
    array: heroArray, note: 'Ready', compare: [], swap: [], pivot: [], sortedIdx: [],
  };
  const displayedArray = currentStep.array || heroArray;
  const isHeroDone = heroStepIdx >= heroSteps.length - 1;

  useEffect(() => {
    if (!heroPlaying) return undefined;
    if (isHeroDone) setHeroStepIdx(0);
    timerRef.current = window.setInterval(() => {
      setHeroStepIdx((previous) => {
        if (previous >= heroSteps.length - 1) {
          setHeroPlaying(false);
          if (heroSound) audioSynth.playVictoryFanfare();
          return previous;
        }
        const next = previous + 1;
        const step = heroSteps[next];
        if (heroSound && step?.compare?.length) {
          const value = step.array?.[step.compare[0]] || 40;
          audioSynth.playTone(280 + value * 8, 'sine', 0.05, 0.03);
        } else if (heroSound && step?.swap?.length) {
          audioSynth.playTone(540, 'triangle', 0.06, 0.04);
        }
        return next;
      });
    }, 230);
    return () => window.clearInterval(timerRef.current);
  }, [heroPlaying, heroSteps, heroSound, isHeroDone]);

  const allAlgorithms = useMemo(() => Object.entries(ALGORITHM_DATA).map(([key, data]) => ({ key, ...data })), []);
  const filteredAlgorithms = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return allAlgorithms.filter((algorithm) => {
      if (selectedCategory !== 'all' && algorithm.category !== selectedCategory) return false;
      if (!query) return true;
      return [algorithm.name, algorithm.desc, algorithm.file, algorithm.category, algorithm.time, algorithm.space]
        .some((value) => String(value).toLowerCase().includes(query));
    });
  }, [allAlgorithms, selectedCategory, searchQuery]);

  const shuffleDemo = () => {
    setHeroArray(randomArray(10));
    setHeroStepIdx(0);
    setHeroPlaying(false);
  };

  const chooseDemo = (algorithm) => {
    setHeroAlgo(algorithm);
    setHeroStepIdx(0);
    setHeroPlaying(false);
  };

  const selectTab = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className={`landing-page ${activeTab !== 'overview' ? 'landing-resources' : ''}`}>
      <header className="landing-header">
        <button className="landing-brand" onClick={() => selectTab('overview')} aria-label="AlgoViz home">
          <span className="landing-brand-icon"><Braces size={19} strokeWidth={2.3} /></span>
          <span>algoviz<span className="brand-period">.</span></span>
        </button>
        <nav className="landing-nav" aria-label="Main navigation">
          <button className={activeTab === 'overview' ? 'selected' : ''} onClick={() => selectTab('overview')}>Explore</button>
          <button className={activeTab === 'sheets' ? 'selected' : ''} onClick={() => selectTab('sheets')}><BookOpen size={15} /> Study sheets</button>
          <button className={activeTab === 'patterns' ? 'selected' : ''} onClick={() => selectTab('patterns')}><Grid2X2 size={15} /> Patterns</button>
        </nav>
        <button className="landing-launch" onClick={() => onLaunchStudio()}>Open studio <ArrowRight size={16} /></button>
      </header>

      {activeTab === 'overview' ? (
        <>
          <section className="landing-hero">
            <div className="hero-copy">
              <div className="editorial-eyebrow"><span className="eyebrow-rule" /> Learn by watching it work</div>
              <h1>Make algorithms<br />make <em>sense.</em></h1>
              <p>Follow each decision as it happens. Watch the visualization change, read the code beside it, and try the next step yourself.</p>
              <div className="hero-buttons">
                <button className="hero-primary" onClick={() => onLaunchStudio()}><Play size={15} fill="currentColor" /> Start exploring</button>
                <a className="hero-secondary" href="#algorithm-index">Browse algorithms <ArrowDown size={15} /></a>
              </div>
              <div className="hero-caption"><span>22+ algorithms</span><i /> <span>7 topic areas</span><i /> <span>Free to use</span></div>
            </div>

            <div className="sandbox" aria-label="Interactive algorithm sandbox">
              <div className="sandbox-top">
                <div className="sandbox-title"><span className="sandbox-live-dot" /><span>Live sandbox</span><span className="sandbox-divider">/</span><strong>{DEMO_ALGORITHMS.find((item) => item.id === heroAlgo)?.name}</strong></div>
                <div className="sandbox-tabs" aria-label="Choose a sorting algorithm">
                  {DEMO_ALGORITHMS.map((algorithm) => <button key={algorithm.id} className={heroAlgo === algorithm.id ? 'active' : ''} onClick={() => chooseDemo(algorithm.id)}>{algorithm.name.replace(' sort', '')}</button>)}
                </div>
              </div>
              <div className="sandbox-step"><span className="step-index">STEP {String(heroStepIdx + 1).padStart(2, '0')} <i>/ {String(heroSteps.length).padStart(2, '0')}</i></span><span className="step-note">{currentStep.note || 'Ready to execute.'}</span>{isHeroDone && <span className="sorted-badge"><Check size={12} /> done</span>}</div>
              <div className="sandbox-chart" role="img" aria-label={`Sorting array at step ${heroStepIdx + 1}`}>
                {displayedArray.map((value, index) => {
                  const height = Math.max(12, (value / Math.max(...displayedArray, 100)) * 100);
                  const isSorted = currentStep.sortedIdx?.includes(index);
                  const isSwap = currentStep.swap?.includes(index);
                  const isPivot = currentStep.pivot?.includes(index);
                  const isCompare = currentStep.compare?.includes(index);
                  const state = isSorted ? 'sorted' : isSwap ? 'swap' : isPivot ? 'pivot' : isCompare ? 'compare' : '';
                  return <div className={`sandbox-bar ${state}`} key={index}><span>{value}</span><i style={{ height: `${height}%` }} /></div>;
                })}
              </div>
              <div className="sandbox-legend"><span><i className="legend-compare" /> comparing</span><span><i className="legend-placed" /> placed</span><span className="legend-length">{displayedArray.length} values</span></div>
              <div className="sandbox-controls">
                <div className="playback-controls">
                  <button className={`sandbox-play ${heroPlaying ? 'playing' : ''}`} onClick={() => setHeroPlaying((playing) => !playing)}>{heroPlaying ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}<span>{heroPlaying ? 'Pause' : isHeroDone ? 'Replay' : 'Play'}</span></button>
                  <button onClick={() => setHeroStepIdx((step) => Math.min(step + 1, heroSteps.length - 1))} disabled={heroPlaying || isHeroDone} title="Step forward" aria-label="Step forward"><ArrowRight size={15} /></button>
                  <button onClick={() => { setHeroStepIdx(0); setHeroPlaying(false); }} title="Reset" aria-label="Reset"><RotateCcw size={15} /></button>
                  <button onClick={shuffleDemo} title="Shuffle values" aria-label="Shuffle values"><Shuffle size={15} /></button>
                  <button className={heroSound ? 'sound-on' : ''} onClick={() => { if (!heroSound) audioSynth.init(); setHeroSound((sound) => !sound); }} title={heroSound ? 'Mute sound' : 'Enable sound'} aria-label={heroSound ? 'Mute sound' : 'Enable sound'}>{heroSound ? <Volume2 size={15} /> : <VolumeX size={15} />}</button>
                </div>
                <button className="sandbox-open" onClick={() => onLaunchStudio(heroAlgo)}>Open full studio <ArrowRight size={14} /></button>
              </div>
            </div>
          </section>

          <section className="learning-section" id="learning-paths">
            <div className="section-topline"><span className="section-kicker">START WITH A QUESTION</span><span className="section-side-note">Choose a path into the visualizer</span></div>
            <div className="learning-heading"><h2>What are you working on?</h2><p>Jump into a topic and explore the idea through a running example.</p></div>
            <div className="learning-list">
              {LEARNING_PATHS.map((path) => {
                const Icon = path.icon;
                return <button className="learning-row" key={path.number} onClick={() => onLaunchStudio(path.algorithm)}>
                  <span className="learning-number">{path.number}</span><span className="learning-icon"><Icon size={19} strokeWidth={1.7} /></span>
                  <span className="learning-name"><strong>{path.name}</strong><small>{path.detail}</small></span><span className="learning-meta">{path.meta}</span><ArrowRight size={17} className="learning-arrow" />
                </button>;
              })}
            </div>
          </section>

          <section className="clarity-section">
            <div className="clarity-intro"><span className="section-kicker">A CLEARER WAY TO LEARN</span><h2>Understand the <em>why,</em><br />not just the answer.</h2></div>
            <div className="clarity-list">
              {FEATURE_NOTES.map((feature) => <article className="clarity-item" key={feature.number}><span>{feature.number}</span><div><h3>{feature.title}</h3><p>{feature.body}</p></div></article>)}
            </div>
          </section>

          <section className="catalog-section" id="algorithm-index">
            <div className="catalog-header">
              <div><span className="section-kicker">THE ALGORITHM INDEX</span><h2>Find your next step.</h2><p>Search by name or narrow the list by topic.</p></div>
              <label className="catalog-search"><Search size={17} /><input value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); setShowAllAlgorithms(true); }} placeholder="Search algorithms" aria-label="Search algorithms" />{searchQuery && <button onClick={() => setSearchQuery('')} aria-label="Clear search"><X size={15} /></button>}</label>
            </div>
            <div className="catalog-filters" aria-label="Filter algorithms">
              <button className={selectedCategory === 'all' ? 'active' : ''} onClick={() => { setSelectedCategory('all'); setShowAllAlgorithms(false); }}>All <span>{allAlgorithms.length}</span></button>
              {ALGORITHM_CATEGORIES.map((category) => <button className={selectedCategory === category.id ? 'active' : ''} key={category.id} onClick={() => { setSelectedCategory(category.id); setShowAllAlgorithms(true); }}>{category.name}</button>)}
            </div>
            <div className="algorithm-list">
              {filteredAlgorithms.slice(0, showAllAlgorithms || selectedCategory !== 'all' || searchQuery ? filteredAlgorithms.length : 10).map((algorithm, index) => <button className="algorithm-row" key={algorithm.key} onClick={() => onSelectAlgorithm(algorithm.key)}>
                <span className="algorithm-number">{String(index + 1).padStart(2, '0')}</span><span className="algorithm-name"><strong>{algorithm.name}</strong><small>{algorithm.desc}</small></span><span className="algorithm-category">{ALGORITHM_CATEGORIES.find((item) => item.id === algorithm.category)?.name || algorithm.category}</span><span className="algorithm-time">{algorithm.time}</span><ArrowRight size={16} className="algorithm-go" />
              </button>)}
              {filteredAlgorithms.length === 0 && <p className="catalog-empty">No matches. Try another algorithm name or topic.</p>}
            </div>
            {filteredAlgorithms.length > 10 && selectedCategory === 'all' && !searchQuery && <button className="catalog-more" onClick={() => setShowAllAlgorithms((show) => !show)}>{showAllAlgorithms ? 'Show less' : `View all ${filteredAlgorithms.length} algorithms`}<ChevronDown size={15} className={showAllAlgorithms ? 'rotated' : ''} /></button>}
          </section>

          <section className="study-band">
            <div className="study-band-icon"><BookOpen size={19} /></div><div className="study-band-copy"><span className="section-kicker">WHEN YOU’RE READY FOR A PLAN</span><h2>Practice with a little more structure.</h2><p>Browse community DSA sheets or learn the recurring patterns behind interview problems.</p></div>
            <div className="study-band-actions"><button onClick={() => selectTab('sheets')}>Study sheets <ArrowRight size={15} /></button><button onClick={() => selectTab('patterns')}>Problem patterns <ArrowRight size={15} /></button></div>
          </section>

          <section className="progress-band"><div><span className="section-kicker">YOUR PRACTICE, IN VIEW</span><h2>Keep track as you go.</h2><p>Look up your LeetCode activity and see your progress at a glance.</p></div><div className="progress-card"><LeetCodeStats /></div></section>
        </>
      ) : (
        <section className="resource-page">
          <div className="resource-intro"><button onClick={() => selectTab('overview')}><ArrowRight size={14} /> Back to explore</button><span className="section-kicker">{activeTab === 'sheets' ? 'CURATED STUDY PLANS' : 'PROBLEM-SOLVING TOOLKIT'}</span><h1>{activeTab === 'sheets' ? <>A plan for<br /><em>what comes next.</em></> : <>Recognize the<br /><em>shape of a problem.</em></>}</h1><p>{activeTab === 'sheets' ? 'Follow trusted DSA sheets, track what you have covered, and build a practice rhythm that lasts.' : 'Learn the reusable approaches that show up across arrays, graphs, trees, and dynamic programming.'}</p></div>
          {activeTab === 'sheets' ? <DsaSheetsSection onLaunchStudio={onLaunchStudio} /> : <DsaPatternsSection />}
        </section>
      )}

      <footer className="landing-footer"><button className="landing-brand" onClick={() => selectTab('overview')}><span className="landing-brand-icon"><Braces size={17} /></span><span>algoviz<span className="brand-period">.</span></span></button><span className="footer-motto">An easier way to see the logic.</span><button className="footer-studio" onClick={() => onLaunchStudio()}>Open studio <ArrowRight size={14} /></button><span className="footer-meta"><Command size={12} /> made for curious minds</span></footer>
    </main>
  );
}
