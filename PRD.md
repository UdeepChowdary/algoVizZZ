# Product Requirements Document (PRD)

## Project Title: AlgoVizZZ Studio — Interactive Algorithm & Data Structure Visualizer
**Version:** 1.0.0  
**Status:** Approved  
**Target Platform:** Web (Desktop & Mobile Responsive)  

---

## 1. Document Overview & Product Vision
### 1.1 Product Vision
**AlgoVizZZ Studio** is a modern, web-based interactive algorithm visualization platform designed to help computer science students, software engineers, and interview candidates master Data Structures and Algorithms (DSA). By bridging the gap between theoretical pseudocode and execution state through step-by-step visual feedback, real-time code highlighting, and live variable tracking, AlgoVizZZ Studio makes learning complex algorithms intuitive, accessible, and engaging.

### 1.2 Core Objectives
- **Visual Learning:** Render dynamic visual representations for Sorting, Searching, Graphs, Grid Pathfinding, Binary Trees, Dynamic Programming, Backtracking, and Greedy algorithms.
- **Interactive Control:** Provide precise playback tools (Play, Pause, Step Forward, Step Backward, Speed Control, Reset) allowing users to step through algorithm execution at their own pace.
- **Deep Inspection:** Synchronize visualization steps with code execution line highlighting and live variable watch state.
- **Structured Learning:** Offer curated DSA Sheets (e.g., Striver SDE, NeetCode 150) and DSA Patterns (Two Pointers, Sliding Window, Fast & Slow Pointers) directly within the application.

---

## 2. Target Audience & User Personas

| Persona | Role | Primary Goal | Key Need |
| :--- | :--- | :--- | :--- |
| **Computer Science Student** | Undergraduate / Learner | Understand core DSA concepts for coursework | Visual step-by-step breakdown of algorithm transformations |
| **Interview Candidate** | Job Seeker | Prepare for technical coding interviews | Quick reference for time/space complexity, DSA patterns, and problem sheets |
| **Educator / Tutor** | CS Professor / Instructor | Demonstrate algorithms during live lectures | Interactive controls to pause, step backward, and explain step-by-step logic |

---

## 3. Scope of the Product

### 3.1 In-Scope Features
1. **Interactive Visualization Engine:**
   - **Sorting Algorithms:** Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort.
   - **Searching Algorithms:** Linear Search, Binary Search.
   - **Graph Algorithms:** Breadth-First Search (BFS), Depth-First Search (DFS), Dijkstra's Shortest Path, Bellman-Ford, Topological Sort.
   - **Grid Pathfinding:** A* Search, Dijkstra, BFS, DFS on 2D Grid with custom obstacle placement.
   - **Binary Tree Operations:** Tree Traversals (Inorder, Preorder, Postorder, Level-Order), BST Insertion & Search.
   - **Dynamic Programming & Backtracking:** Matrix DP (LCS, Edit Distance), N-Queens Chessboard Backtracking.
   - **Greedy Algorithms:** Fractional / 0-1 Knapsack visual step evaluation.

2. **Execution & Playback Control Suite:**
   - Play / Pause toggles
   - Step Forward / Step Backward single-step execution
   - Speed Slider (0.25x to 4x execution speed)
   - Array & Grid Custom Input Generators (Randomize, Reverse, Nearly Sorted, Custom Values)
   - Reset & Clear Canvas triggers

3. **Code Inspector & Variable Watcher:**
   - Dual-view implementation code & pseudocode display
   - Active line highlighting synchronized with visualization frame
   - Live variable watch state table displaying pointer values, indices, and step metrics

4. **Complexity Analysis & Theory Panel:**
   - Time Complexity metrics (Best, Average, Worst case notation)
   - Space Complexity metrics
   - Detailed conceptual explanation & practical use-cases

5. **DSA Learning Hub:**
   - DSA Problem Sheets (Striver SDE Sheet, NeetCode 150, Blind 75)
   - DSA Patterns Explorer (Sliding Window, Two Pointers, Monotonic Stack, Fast/Slow Pointers)
   - Keyboard Shortcuts Modal for rapid navigation

### 3.2 Out-of-Scope (for Version 1.0)
- User authentication & user login accounts (Client-side execution only)
- Backend code execution sandbox for custom user code submission
- Multi-user collaborative visualization rooms

---

## 4. Functional Requirements (FR)

### FR-1: Category & Algorithm Selection
- **FR-1.1:** The user shall be able to switch between major algorithm categories (Sorting, Searching, Graph, Grid, Tree, DP, Backtracking, Greedy) via a primary category navigation bar.
- **FR-1.2:** Selecting an algorithm shall instantly load the default dataset/canvas, reset execution pointers, and populate the corresponding Code Inspector and Theory cards.

### FR-2: Visualization Canvas & State Rendering
- **FR-2.1:** The system shall render elements dynamically:
  - **Array Visualizer:** Animated vertical bars with color coding (Default, Comparing, Swapping, Sorted, Target Found).
  - **Graph Visualizer:** Interactive node-link graph with draggable nodes, edge weights, and color-coded node states (Unvisited, Visiting, Visited, Shortest Path).
  - **Grid Pathfinding:** 2D Grid supporting wall drawing, start/target node placement, and visited/path cell coloring.
  - **Tree Visualizer:** Hierarchical node structure displaying traversal order step-by-step.
  - **Chessboard Visualizer:** 8x8 grid rendering Queen placements and conflict zones during backtracking.
- **FR-2.2:** Colors used across visualizers must conform to a standardized status palette:
  - Primary / Unvisited: Slate / Indigo
  - Active Comparison: Amber / Yellow
  - Action / Swap / Push: Rose / Red
  - Sorted / Visited / Path: Emerald / Green

### FR-3: Execution & Control Panel
- **FR-3.1:** The control panel must provide `Play`, `Pause`, `Step Forward`, `Step Backward`, `Reset`, and `Shuffle/Generate Input` buttons.
- **FR-3.2:** Speed adjustment slider must alter animation step delay dynamically from 50ms (fast) to 1000ms (slow) without restarting execution state.
- **FR-3.3:** The user shall be able to type custom array values or grid obstacle layouts through custom input modals.

### FR-4: Code Inspector & Line Tracker
- **FR-4.1:** The Code Inspector must highlight the active code line corresponding to the current visualization step.
- **FR-4.2:** Users shall be able to toggle between JavaScript implementation code and generalized Pseudocode formats.

### FR-5: Variable Watch Panel
- **FR-5.1:** A dedicated Variable Watch panel must update dynamically at every animation step, listing current variable names, values, and loop counters (e.g., `i`, `j`, `pivot`, `min_idx`, `visited_nodes`).

### FR-6: DSA Sheets & Patterns Explorer
- **FR-6.1:** Users can navigate to dedicated tabs for popular DSA interview preparation sheets and structural coding patterns.
- **FR-6.2:** Problem entries shall link out to corresponding LeetCode / GeeksForGeeks problem pages.

---

## 5. Non-Functional Requirements (NFR)

### NFR-1: Performance & Responsiveness
- All animation state generators must run client-side with minimal memory overhead (< 50MB RAM usage).
- Animations must maintain smooth 60 FPS rendering using standard CSS transitions and React state management.
- Initial web page load time must be under 1.5 seconds on standard broadband connections.

### NFR-2: Usability & UI/UX Standards
- Modern Dark-Theme UI featuring glassmorphism design tokens, clean typography (Inter / System font stack), and high color contrast compliant with WCAG 2.1 AA.
- Responsive layout supporting Desktop (1920x1080), Tablet (1024x768), and Mobile (375x667) screen sizes.

### NFR-3: Reliability & State Stability
- Pausing or single-stepping through algorithms must never cause state desynchronization between visual element colors, variable watch values, and highlighted code lines.
- Invalid custom user inputs (e.g., empty array, out-of-range numbers, non-numeric strings) must trigger graceful inline validation alerts without crashing the application.

---

## 6. User Interface Mockup & Layout Breakdown

```
+-----------------------------------------------------------------------------------+
|  [Logo] AlgoVizZZ Studio     [Sorting] [Searching] [Graph] [Grid] [Trees] [DP]    |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  +--------------------------------------------+  +-----------------------------+  |
|  |                                            |  | Code Inspector              |  |
|  |          Visualizer Canvas                 |  | 1: function bubbleSort(arr)|  |
|  |     [ Bar ] [ Bar ] [ Bar ] [ Bar ]        |  | 2:>  if (arr[j] > arr[j+1])|  |
|  |                                            |  | 3:     swap(arr, j, j+1)   |  |
|  |                                            |  +-----------------------------+  |
|  +--------------------------------------------+  | Variable Watch              |  |
|  |  Controls: [Play] [Pause] [< Step] [Step >]|  | i = 2 | j = 4 | swap = true |  |
|  |  Speed: ===|===  Dataset: [Randomize]      |  +-----------------------------+  |
|  +--------------------------------------------+                                   |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  | Theory & Complexity | Time: O(N^2) | Space: O(1) | Description...           |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

---

## 7. Acceptance Criteria

1. **AC-1:** Navigating to `Sorting` -> `Bubble Sort` and clicking `Play` executes step-by-step array bar highlighting and correctly sorts the array into ascending order.
2. **AC-2:** Clicking `Step Forward` advances the state by exactly 1 step, updates the array bars, updates the `Variable Watch` panel, and highlights the corresponding line in `Code Inspector`.
3. **AC-3:** Dragging nodes or adding wall obstacles in `Grid Pathfinding` dynamically updates the start path calculations when running `A*` or `Dijkstra`.
4. **AC-4:** Repository contains valid `PRD.md`, `HLD.md`, and `LLD.md` in the root directory to fulfill project documentation standards.
