<div align="center">

```text
                    █████╗ ██╗     ██████╗  ██████╗ ██╗   ██╗██╗███████╗███████╗
                   ██╔══██╗██║    ██╔════╝ ██╔═══██╗██║   ██║██║╚══███╔╝╚══███╔╝
                   ███████║██║    ██║  ███╗██║   ██║██║   ██║██║  ███╔╝  ███╔╝  
                   ██╔══██║██║    ██║   ██║██║   ██║╚██╗ ██╔╝██║ ███╔╝  ███╔╝   
                   ██║  ██║███████╗╚██████╔╝╚██████╔╝ ╚████╔╝ ██║███████╗███████╗
                   ╚═╝  ╚═╝╚══════╝ ╚═════╝  ╚═════╝   ╚═══╝  ╚═╝╚══════╝╚══════╝

                           ███████╗████████╗██╗   ██╗██████╗ ██╗ ██████╗ 
                           ██╔════╝╚══██╔══╝██║   ██║██╔══██╗██║██╔═══██╗
                           ███████╗   ██║   ██║   ██║██║  ██║██║██║   ██║
                           ╚════██║   ██║   ██║   ██║██║  ██║██║██║   ██║
                           ███████║   ██║   ╚██████╔╝██████╔╝██║╚██████╔╝
                           ╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚═╝ ╚═════╝
```

# ⚡ AlgoViz Studio (`algoVizZZ`)
### *Interactive Data Structures & Algorithms Visualizer*

<p align="center">
  <a href="#-key-features">Features</a> •
  <a href="#-supported-algorithms--complexities">Algorithms</a> •
  <a href="#-quick-start-guide">Quick Start</a> •
  <a href="#-keyboard-shortcuts">Shortcuts</a> •
  <a href="#-project-architecture">Architecture</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5.1.6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Web_Audio_API-Enabled-F59E0B?style=for-the-badge&logo=audio&logoColor=white" alt="Web Audio API" />
  <img src="https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge" alt="License" />
</p>

</div>

---

> [!TIP]
> **AlgoViz Studio** (`algoVizZZ`) turns abstract Data Structures & Algorithms into responsive, interactive visual experiences. Built with zero external API dependencies, it runs 100% offline at up to 50x turbo speed!

---

## 🌟 Key Features

<table>
  <tr>
    <td width="50%">
      <h3>📊 16 Algorithms across 7 Categories</h3>
      <p>Comprehensive step-by-step visualizations for Sorting, Searching, Graphs, Dynamic Programming, Backtracking, Greedy, and Binary Search Trees.</p>
    </td>
    <td width="50%">
      <h3>🗺️ Dual Graph Visualization Modes</h3>
      <p>Switch seamlessly between an interactive <b>2D Grid Pathfinding Canvas</b> (with Wall drawing & Mud terrain) and an SVG <b>Network Graph View</b>.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>⚡ High-Performance Turbo Engine</h3>
      <p>Non-linear animation speed scaling from slow step-reading (<code>1x</code>) up to <b>⚡ TURBO 50x</b> multi-step frame jumps for instant wave expansions.</p>
    </td>
    <td width="50%">
      <h3>🔊 Web Audio Pitch Synthesizer</h3>
      <p>Real-time browser audio feedback pitch-scaled to element values during comparisons, swaps, and tree traversals.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>✏️ Custom Array Editor & Target Input</h3>
      <p>Input your own custom datasets (e.g., <code>45, 12, 89, 23</code>) or set custom search targets to test edge cases in real time.</p>
    </td>
    <td width="50%">
      <h3>🔍 Code Execution & Scope Watcher</h3>
      <p>Synchronized pseudocode execution line highlights alongside an active scope variable watch window.</p>
    </td>
  </tr>
</table>

---

## 🚀 Quick Start Guide

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (`v18.0.0` or higher) installed on your system.

### 1️⃣ Installation
```bash
# Clone the repository
git clone https://github.com/UdeepChowdary/algoVizZZ.git

# Navigate into the project folder
cd algoVizZZ

# Install dependencies
npm install
```

### 2️⃣ Start Development Server
```bash
npm run dev
```
Open your browser and navigate to **`http://localhost:3000`**.

### 3️⃣ Build Production Bundle
```bash
npm run build
```

---

## 📚 Supported Algorithms & Complexities

<details open>
<summary><b>Click to expand full algorithm specification table</b></summary>
<br/>

| Category | Algorithm | Best Time | Worst Time | Space | Visual Features |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Sorting** | Selection Sort | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Min element highlight & bar audio pitch |
| **Sorting** | Bubble Sort | $O(n)$ | $O(n^2)$ | $O(1)$ | Adjacent comparison glow & pulse swaps |
| **Sorting** | Insertion Sort | $O(n)$ | $O(n^2)$ | $O(1)$ | Key element selection & right shifts |
| **Sorting** | Merge Sort | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | Sub-array splits & merge highlighting |
| **Sorting** | Quick Sort | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ | Pivot selection ring & element partitioning |
| **Sorting** | Heap Sort | $O(n \log n)$ | $O(n \log n)$ | $O(1)$ | Max-Heap extraction to sorted sub-array |
| **Searching** | Linear Search | $O(1)$ | $O(n)$ | $O(1)$ | Sequential element checking & custom target |
| **Searching** | Binary Search | $O(1)$ | $O(\log n)$ | $O(1)$ | Low, Mid, and High pointer badges |
| **Graphs** | Breadth-First Search | $O(V + E)$ | $O(V + E)$ | $O(V)$ | 2D Grid wave fill & live FIFO Queue |
| **Graphs** | Depth-First Search | $O(V + E)$ | $O(V + E)$ | $O(V)$ | Deep branch exploration & Call Stack |
| **Graphs** | Dijkstra's Path | $O((V+E)\log V)$ | $O((V+E)\log V)$ | $O(V)$ | Weighted Mud terrain ($+5$) & distance tags |
| **Dynamic Prog.** | 0/1 Knapsack | $O(n \times W)$ | $O(n \times W)$ | $O(n \times W)$ | 2D DP matrix table & lookup formulas |
| **Dynamic Prog.** | LCS | $O(m \times n)$ | $O(m \times n)$ | $O(m \times n)$ | String character matching matrix |
| **Backtracking** | N-Queens | $O(N!)$ | $O(N!)$ | $O(N^2)$ | Dynamic $N \times N$ chessboard & queen icons |
| **Greedy** | Fractional Knapsack | $O(n \log n)$ | $O(n \log n)$ | $O(1)$ | Value/Weight ratio cards & capacity bar |
| **Trees & DS** | Binary Search Tree | $O( \log n)$ | $O(n)$ | $O(h)$ | SVG Tree hierarchy & Inorder output log |

</details>

---

## ⌨️ Keyboard Shortcuts

<div align="center">

| Key Command | Action Description |
| :---: | :--- |
| <kbd>Space</kbd> | Toggle **Play / Pause** animation playback |
| <kbd>→</kbd> | Step **Forward** to the next execution step |
| <kbd>←</kbd> | Step **Backward** to the previous step |
| <kbd>R</kbd> | **Reset** execution back to Step 0 |
| <kbd>S</kbd> | **Shuffle** / Randomize array dataset |

</div>

---

## 📂 Project Architecture

```text
algoVizZZ/
├── index.html                 # HTML5 Entry with JetBrains Mono & Inter fonts
├── package.json               # Dependencies & scripts
├── vite.config.js             # Vite dev server configuration
├── tailwind.config.js         # Tailwind CSS design tokens & slate theme
├── postcss.config.js          # PostCSS configuration
└── src/
    ├── main.jsx               # React DOM render entry
    ├── App.jsx                # Master application shell & visualizer router
    ├── index.css              # Global styles, scrollbar & glassmorphism FX
    ├── components/
    │   ├── Header.jsx         # Header bar with audio & shortcut modal triggers
    │   ├── CategoryNav.jsx    # Category pill filters & algorithm tabs
    │   ├── ControlPanel.jsx   # Playback buttons, size, speed & turbo controls
    │   ├── CodeInspector.jsx  # Source code execution view
    │   ├── VariableWatch.jsx  # Scope variable watch window
    │   ├── InfoCard.jsx       # Algorithm complexity metadata badge
    │   ├── ShortcutsModal.jsx # Keyboard shortcuts overlay modal
    │   └── visualizers/
    │       ├── ArrayVisualizer.jsx            # Dynamic bar chart visualizer
    │       ├── GraphVisualizer.jsx            # Dual-mode graph container
    │       ├── GridPathfindingVisualizer.jsx  # Interactive 2D grid pathfinder
    │       ├── MatrixDPVisualizer.jsx         # 2D DP matrix table
    │       ├── ChessboardVisualizer.jsx       # N-Queens chessboard
    │       ├── KnapsackGreedyVisualizer.jsx   # Greedy ratio cards & capacity gauge
    │       └── TreeVisualizer.jsx             # SVG binary tree hierarchy
    ├── data/
    │   └── algorithmData.js                   # Pseudocode & algorithm registry
    ├── generators/                            # Step generation algorithms
    │   ├── gridPathfindingGenerators.js
    │   ├── sortingGenerators.js
    │   ├── searchingGenerators.js
    │   ├── graphGenerators.js
    │   ├── dpGenerators.js
    │   ├── backtrackingGenerators.js
    │   ├── greedyGenerators.js
    │   ├── treeGenerators.js
    │   └── index.js
    ├── hooks/
    │   ├── useVisualizer.js                   # Animation playback hook
    │   └── useKeyboardShortcuts.js            # Global hotkeys listener
    └── utils/
        ├── audioSynth.js                      # Web Audio API tone synthesizer
        └── helpers.js                         # Array & parser utilities
```

---

## 🛡️ License

Distributed under the **MIT License**. See `LICENSE` for more information.

<div align="center">
  <sub>Built with ❤️ by Udeep Chowdary.</sub>
</div>
