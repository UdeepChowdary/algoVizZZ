# High-Level Design (HLD)

## Project Title: AlgoVizZZ Studio — Interactive Algorithm & Data Structure Visualizer
**Document Type:** High-Level Software Architecture & System Design  
**Version:** 1.0.0  

---

## 1. System Architecture Overview

AlgoVizZZ Studio is designed as a **Client-Side Single Page Application (SPA)** built with React 18 and Vite. The application follows a modular, component-driven architecture where state management and algorithm execution step generators are decoupled from visual presentation components.

### 1.1 Architectural Pattern
The application uses an **Unidirectional Data Flow & Frame-Based Animation Architecture**:
- **State Generator Layer:** Pure generator functions process inputs and yield static execution step frames (`steps[]`).
- **Control Layer:** Manages animation timers, playback indices (`currentStepIndex`), speed variables, and user input events.
- **Presentation Layer:** React components consume the current step frame to render color-coded visual elements, highlighted code lines, and live variable states.

```
+-----------------------------------------------------------------------------------+
|                                 USER INTERFACE (UI)                               |
|   +-------------------+   +---------------------+   +--------------------------+  |
|   |   CategoryNav     |   |    Visualizer Canvas |   | CodeInspector & Watch    |  |
|   +---------+---------+   +----------+----------+   +------------+-------------+  |
+-------------|------------------------|---------------------------|----------------+
              | User Input             | Renders Current Frame     | Renders Frame Info
              v                        v                           v
+-----------------------------------------------------------------------------------+
|                              REACT APPLICATION STATE                              |
|  - selectedCategory / selectedAlgorithm                                           |
|  - dataset / customInput                                                          |
|  - currentStepIndex / isPlaying / animationSpeed                                  |
|  - stepsArray: [ Frame_0, Frame_1, Frame_2, ... Frame_N ]                          |
+-----------------------------------------------------------------------------------+
                                       ^
                                       | Generates Frame Array
+-----------------------------------------------------------------------------------+
|                             ALGORITHM GENERATOR LAYER                             |
|  - generateBubbleSortSteps(arr)     - generateDijkstraSteps(graph, start)        |
|  - generateBinarySearchSteps(arr)   - generateGridPathfindingSteps(grid)         |
|  - generateTreeTraversalSteps(root) - generateMatrixDPSteps(str1, str2)          |
+-----------------------------------------------------------------------------------+
```

---

## 2. Technology Stack & Dependencies

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 18** | UI component rendering & reactive state management |
| **Build Tool & Bundler**| **Vite 5** | Lightning-fast HMR (Hot Module Replacement) and optimized production build |
| **Styling & CSS** | **Tailwind CSS 3** | Utility-first responsive design, dark mode styling, and custom glassmorphism effects |
| **Icons** | **Lucide React** | Sleek vector icons for UI controls, navigation, and state metrics |
| **Post-Processing** | **PostCSS & Autoprefixer** | Cross-browser CSS compatibility |

---

## 3. High-Level Component Hierarchy

```
App.jsx (Main Container & Global Layout)
│
├── Header.jsx (App Branding, Navigation Shortcuts, Theme & Modals)
│   └── ShortcutsModal.jsx (Keyboard Shortcut Reference)
│
├── CategoryNav.jsx (Category Switcher: Sorting, Searching, Graph, Grid, Trees, DP, etc.)
│
├── Main Visualizer Workspace
│   ├── ControlPanel.jsx (Playback Bar: Play, Pause, Step Next/Prev, Speed Slider, Reset, Custom Input)
│   │
│   ├── Visualizer Canvas Container (Renders selected Visualizer)
│   │   ├── ArrayVisualizer.jsx (Sorting & Searching Vertical Bar Charts)
│   │   ├── GraphVisualizer.jsx (Nodes & Edges Canvas + Graph Editor)
│   │   ├── GridPathfindingVisualizer.jsx (2D Grid Cell Matrix)
│   │   ├── TreeVisualizer.jsx (Hierarchical Binary Tree Nodes)
│   │   ├── MatrixDPVisualizer.jsx (2D DP Table & Cell Highlighting)
│   │   ├── KnapsackGreedyVisualizer.jsx (Item Selection & Capacity Gauge)
│   │   └── ChessboardVisualizer.jsx (8x8 Queens Backtracking Grid)
│   │
│   └── Inspector Drawer / Side Panel
│       ├── CodeInspector.jsx (Pseudocode / Code Line Tracker)
│       └── VariableWatch.jsx (Live Variable Inspection Table)
│
├── AlgorithmExplanation.jsx (Time/Space Complexity, Description, Applications)
│
└── Learning Hub Sections
    ├── DsaPatternsSection.jsx (Visual Patterns: Sliding Window, Two Pointers, etc.)
    └── DsaSheetsSection.jsx (Interview Prep Sheets: Striver, NeetCode, Blind 75)
```

---

## 4. Data Flow & Step Execution Pipeline

### 4.1 Step Frame Data Structure
Every step frame generated by the algorithm step generators conforms to a standardized JSON schema:

```json
{
  "stepIndex": 4,
  "description": "Comparing array[2] (value: 45) and array[3] (value: 12)",
  "stateData": {
    "array": [10, 25, 45, 12, 89],
    "highlightedIndices": [2, 3],
    "swapIndices": [2, 3],
    "sortedIndices": [0, 1]
  },
  "activeLine": 3,
  "variableWatch": {
    "i": 0,
    "j": 2,
    "currentMin": 12,
    "isSwapped": true
  }
}
```

### 4.2 Playback Sequence Diagram
1. **User Action:** Selects Algorithm (e.g., Quick Sort) & clicks `Play`.
2. **Step Computation:** `App.jsx` calls generator `generateQuickSortSteps(currentDataset)`.
3. **Step Storage:** The generator returns an ordered array `steps[]` containing all execution frames from start to completion.
4. **Interval Loop:** A React `useEffect` or `setInterval` hook increments `currentStepIndex` every `X` milliseconds (determined by `animationSpeed`).
5. **Frame Render:** Visualizer components receive `steps[currentStepIndex]` and re-render visual elements, code highlights, and variable watcher values in sync.
6. **Pause / User Interruption:** Clearing the timer interval stops playback instantly at `steps[currentStepIndex]`, preserving full state context for manual step controls.

---

## 5. Key Subsystems & Design Decisions

### 5.1 Pre-Computed Step Frames vs. Real-Time Async Delays
* **Design Decision:** The system pre-computes all execution step frames upfront into a `steps[]` array before playing animation rather than using `async/await delay()` directly inside algorithms.
* **Rationale:** Pre-computed frames enable instant **Step Backward** navigation, instantaneous scrubbing through playback, and predictable execution without blocking main thread JS loops.

### 5.2 Responsive Layout & Modular Canvas
* **Design Decision:** Visualizers are built as self-contained React components (`ArrayVisualizer`, `GraphVisualizer`, `GridPathfindingVisualizer`) receiving normalized step frame data.
* **Rationale:** Allows easy extension to new algorithm visualizers (e.g., Trie, Heap, Red-Black Trees) without modifying the main layout or playback control logic.

---

## 6. Non-Functional System Qualities

- **Extensibility:** Simple plugin pattern for adding new algorithms by adding a step generator function and registering it in `data/algorithms.js`.
- **Zero Heavy External Dependencies:** Relies on native browser DOM / SVG rendering and pure JavaScript without heavy external 3D engines, ensuring lightweight bundle size (~150 KB gzipped).
- **Cross-Browser Consistency:** Runs identically across Chrome, Firefox, Edge, and Safari.
