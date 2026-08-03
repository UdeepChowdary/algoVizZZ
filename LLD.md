# Low-Level Design (LLD)

## Project Title: AlgoVizZZ Studio — Interactive Algorithm & Data Structure Visualizer
**Document Type:** Low-Level Technical Implementation Specification  
**Version:** 1.0.0  

---

## 1. Directory & File Breakdown

```
src/
├── App.jsx                           # Root Application Component & Global State Manager
├── main.jsx                          # React DOM Entry Point
├── index.css                         # Tailwind CSS Imports & Glassmorphism Utility Classes
│
├── components/                       # UI & Presentation Components
│   ├── Header.jsx                    # Top Navigation Bar & Global Action Triggers
│   ├── CategoryNav.jsx               # Category Tab Selector
│   ├── ControlPanel.jsx              # Playback Controls & Speed/Dataset Controls
│   ├── CodeInspector.jsx             # Code Line Tracker Component
│   ├── VariableWatch.jsx             # Variable Inspection Table Component
│   ├── AlgorithmExplanation.jsx      # Complexity Cards & Conceptual Information
│   ├── ShortcutsModal.jsx            # Modal Dialog for Keyboard Controls
│   ├── FloatingCodeParticles.jsx     # Ambient Background Visual Effects
│   ├── DsaPatternsSection.jsx        # Interactive Coding Pattern Cards
│   ├── DsaSheetsSection.jsx          # Curated Interview Preparation Sheets
│   │
│   └── visualizers/                  # Specialized Visualization Canvas Components
│       ├── ArrayVisualizer.jsx       # 1D Array Bar Rendering (Sorting / Searching)
│       ├── GraphEditor.jsx           # Graph Node / Edge Customization Tool
│       ├── GraphVisualizer.jsx       # Graph Network Renderer (BFS, DFS, Dijkstra)
│       ├── GridPathfindingVisualizer.jsx # 2D Grid Cell Matrix (A*, Dijkstra, BFS, DFS)
│       ├── TreeVisualizer.jsx        # Binary Tree Node Traversals & BST Search
│       ├── MatrixDPVisualizer.jsx    # 2D Dynamic Programming Table Visualizer
│       ├── KnapsackGreedyVisualizer.jsx # Fractional / 0-1 Knapsack Capacity Gauge
│       └── ChessboardVisualizer.jsx  # 8x8 N-Queens Backtracking Visualizer
│
├── generators/                       # Step Generation Logic (Pure Functions)
│   ├── sortingGenerators.js          # Bubble, Selection, Insertion, Merge, Quick, Heap Sort
│   ├── searchingGenerators.js        # Linear & Binary Search
│   ├── graphGenerators.js            # BFS, DFS, Dijkstra, Bellman-Ford
│   ├── gridGenerators.js             # Grid A*, Dijkstra, BFS, DFS
│   ├── treeGenerators.js             # Tree Traversals & BST Operations
│   └── dpGenerators.js               # Matrix DP & Backtracking Step Generators
│
├── data/                             # Static Catalogues & Metadata
│   ├── algorithmsData.js             # Algorithm Catalog, Code Snippets, Pseudocode & Complexity
│   ├── dsaPatternsData.js            # Pattern Categories & Code Examples
│   └── dsaSheetsData.js              # Problem Lists (Striver, NeetCode 150, Blind 75)
│
└── utils/                            # Helper Utilities
    ├── arrayUtils.js                 # Random, Reverse, Nearly Sorted Array Generators
    └── graphUtils.js                 # Graph Data Structure Helpers & Adjacency List Builders
```

---

## 2. Core Components Specification

### 2.1 `App.jsx` (Global State & Orchestrator)
- **Primary Responsibilities:**
  - Manages global state (`selectedCategory`, `selectedAlgorithm`, `dataset`, `steps`, `currentStepIndex`, `isPlaying`, `speed`).
  - Triggers step generation whenever `selectedAlgorithm` or `dataset` changes.
  - Controls playback timer (`setInterval`) for automatic stepping.

- **Key State Variables:**
  ```javascript
  const [category, setCategory] = useState('sorting');
  const [algorithm, setAlgorithm] = useState('bubble-sort');
  const [dataset, setDataset] = useState([45, 12, 85, 32, 89, 19, 64]);
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(300); // Step delay in ms
  ```

---

### 2.2 `ControlPanel.jsx`
- **Props Interface:**
  ```typescript
  interface ControlPanelProps {
    isPlaying: boolean;
    currentStep: number;
    totalSteps: number;
    speed: number;
    onPlay: () => void;
    onPause: () => void;
    onStepForward: () => void;
    onStepBackward: () => void;
    onReset: () => void;
    onSpeedChange: (speed: number) => void;
    onRandomize: () => void;
    onCustomInput: (inputArray: number[]) => void;
  }
  ```
- **UI Elements:** Play/Pause button, Step Prev/Next buttons, Reset button, Speed Slider (`50ms` to `1000ms`), Custom Array Modal button.

---

### 2.3 `CodeInspector.jsx` & `VariableWatch.jsx`
- **`CodeInspector.jsx` Props:**
  ```typescript
  interface CodeInspectorProps {
    codeSnippets: {
      javascript: string[];
      pseudocode: string[];
    };
    activeLine: number;
    description: string;
  }
  ```
  - **Behavior:** Renders code line by line; applies active highlight class (`bg-indigo-500/30 border-l-4 border-indigo-400`) to line matching `activeLine`.

- **`VariableWatch.jsx` Props:**
  ```typescript
  interface VariableWatchProps {
    variables: Record<string, string | number | boolean | null>;
  }
  ```
  - **Behavior:** Renders key-value table displaying live variable states for the active frame.

---

### 2.4 Visualizer Components

#### A. `ArrayVisualizer.jsx`
- **Render Logic:** Maps over array values to render vertical bars. Height percentage calculated dynamically:
  $$\text{heightPercentage} = \left( \frac{\text{val}}{\max(\text{array})} \right) \times 100\%$$
- **Color Mapping Logic:**
  - `highlightedIndices.includes(idx)` $\rightarrow$ Amber (`bg-amber-400`)
  - `swapIndices.includes(idx)` $\rightarrow$ Rose (`bg-rose-500`)
  - `sortedIndices.includes(idx)` $\rightarrow$ Emerald (`bg-emerald-400`)
  - Default $\rightarrow$ Indigo/Slate (`bg-indigo-500`)

#### B. `GridPathfindingVisualizer.jsx`
- **Grid Matrix Size:** 15 rows $\times$ 30 columns.
- **Cell Types & States:** `Empty`, `Wall`, `Start`, `Target`, `Visiting`, `Visited`, `ShortestPath`.
- **User Interactions:** Click & drag to paint wall nodes; drag Start or Target icons to relocate endpoints.

---

## 3. Algorithm Step Generators Specification

Algorithms return an array of `StepFrame` objects. Below are concrete implementation specifications for key step generators.

### 3.1 Bubble Sort Step Generator Algorithm
```javascript
export function generateBubbleSortSteps(initialArray) {
  const steps = [];
  let arr = [...initialArray];
  let n = arr.length;

  steps.push({
    description: "Initial array state",
    array: [...arr],
    highlightedIndices: [],
    swapIndices: [],
    sortedIndices: [],
    activeLine: 1,
    variableWatch: { i: 0, j: 0, swapped: false }
  });

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      // Comparison Step Frame
      steps.push({
        description: `Comparing elements at index ${j} (${arr[j]}) and ${j + 1} (${arr[j + 1]})`,
        array: [...arr],
        highlightedIndices: [j, j + 1],
        swapIndices: [],
        sortedIndices: Array.from({ length: i }, (_, k) => n - 1 - k),
        activeLine: 3,
        variableWatch: { i, j, arr_j: arr[j], arr_j1: arr[j + 1], swapped }
      });

      if (arr[j] > arr[j + 1]) {
        // Swap Action
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;

        // Swap Step Frame
        steps.push({
          description: `Swapping ${arr[j + 1]} and ${arr[j]}`,
          array: [...arr],
          highlightedIndices: [],
          swapIndices: [j, j + 1],
          sortedIndices: Array.from({ length: i }, (_, k) => n - 1 - k),
          activeLine: 4,
          variableWatch: { i, j, arr_j: arr[j], arr_j1: arr[j + 1], swapped: true }
        });
      }
    }
  }

  // Final Sorted State
  steps.push({
    description: "Array is completely sorted!",
    array: [...arr],
    highlightedIndices: [],
    swapIndices: [],
    sortedIndices: Array.from({ length: n }, (_, k) => k),
    activeLine: 7,
    variableWatch: { status: "Complete" }
  });

  return steps;
}
```

---

## 4. Time & Space Complexity Specifications

| Algorithm | Category | Best Time | Average Time | Worst Time | Space Complexity |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Bubble Sort** | Sorting | $O(N)$ | $O(N^2)$ | $O(N^2)$ | $O(1)$ |
| **Quick Sort** | Sorting | $O(N \log N)$ | $O(N \log N)$ | $O(N^2)$ | $O(\log N)$ |
| **Merge Sort** | Sorting | $O(N \log N)$ | $O(N \log N)$ | $O(N \log N)$ | $O(N)$ |
| **Binary Search** | Searching | $O(1)$ | $O(\log N)$ | $O(\log N)$ | $O(1)$ |
| **Dijkstra** | Graph | $O((V + E) \log V)$ | $O((V + E) \log V)$ | $O((V + E) \log V)$ | $O(V)$ |
| **A* Search** | Grid Pathfinding | $O(1)$ | $O(E)$ | $O(V)$ | $O(V)$ |
| **N-Queens** | Backtracking | $O(N!)$ | $O(N!)$ | $O(N!)$ | $O(N^2)$ |

---

## 5. Error Handling & Validation Rules

1. **Custom Array Validation:**
   - Input must be comma-separated integers.
   - Size limit: $3 \le N \le 50$. Range limit: $1 \le \text{value} \le 500$.
   - Invalid input triggers an inline error message without modifying current dataset state.
2. **Graph Editor Edge Case Validation:**
   - Prevents duplicate edge additions between the same pair of nodes.
   - Prevents negative weight edges when executing Dijkstra's algorithm.
3. **Playback Safety:**
   - Disables `Step Forward` when `currentStepIndex === steps.length - 1`.
   - Disables `Step Backward` when `currentStepIndex === 0`.
