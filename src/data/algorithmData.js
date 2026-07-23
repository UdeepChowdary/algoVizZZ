export const ALGORITHM_CATEGORIES = [
  { id: "sorting", name: "Sorting", desc: "Array ordering algorithms" },
  { id: "searching", name: "Searching", desc: "Element retrieval algorithms" },
  { id: "graph", name: "Graph Traversal", desc: "Network & shortest path search" },
  { id: "dp", name: "Dynamic Prog.", desc: "Optimization using memoization" },
  { id: "backtracking", name: "Backtracking", desc: "Recursive state-space tree search" },
  { id: "greedy", name: "Greedy", desc: "Locally optimal choice strategy" },
  { id: "datastructures", name: "Trees & DS", desc: "Binary Tree operations" },
];

export const ALGORITHM_DATA = {
  // --- SORTING ---
  selection: {
    name: "Selection Sort",
    category: "sorting",
    file: "SelectionSort.java",
    lines: [
      "void selectionSort(int[] arr) {",
      "  int n = arr.length;",
      "  for (int i = 0; i < n - 1; i++) {",
      "    int minIdx = i;",
      "    for (int j = i + 1; j < n; j++) {",
      "      if (arr[j] < arr[minIdx]) minIdx = j;",
      "    }",
      "    swap(arr[i], arr[minIdx]);",
      "  }",
      "}"
    ],
    time: "O(n²)",
    space: "O(1)",
    stable: "No",
    desc: "Repeatedly finds the minimum element from the unsorted sub-array and places it at the starting index.",
    explanation: {
      intuition: "Selection sort repeatedly scans the unsorted section of an array, identifies the smallest remaining value, and swaps it into its final sorted position at the beginning.",
      steps: [
        "Find the minimum element in the unsorted portion of the array.",
        "Swap it with the element at the beginning of the unsorted section.",
        "Advance the sorted boundary by one position to the right and repeat."
      ],
      bestUsedFor: "Ideal for small arrays or environments where memory writes (swaps) are expensive, since it makes at most O(n) swaps.",
      proTip: "It has O(n²) time complexity regardless of initial array order (best, worst, average cases are all O(n²))."
    }
  },
  bubble: {
    name: "Bubble Sort",
    category: "sorting",
    file: "BubbleSort.java",
    lines: [
      "void bubbleSort(int[] arr) {",
      "  int n = arr.length;",
      "  for (int i = 0; i < n - 1; i++) {",
      "    boolean swapped = false;",
      "    for (int j = 0; j < n - 1 - i; j++) {",
      "      if (arr[j] > arr[j + 1]) {",
      "        swap(arr[j], arr[j + 1]);",
      "        swapped = true;",
      "      }",
      "    }",
      "    if (!swapped) break;",
      "  }",
      "}"
    ],
    time: "O(n²)",
    space: "O(1)",
    stable: "Yes",
    desc: "Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
    explanation: {
      intuition: "Bubble sort repeatedly compares adjacent elements and swaps them if out of order, causing larger values to 'bubble up' to the end of the array after each pass.",
      steps: [
        "Compare adjacent elements starting from index 0.",
        "If left element > right element, swap them.",
        "Repeat for each pass until no swaps occur in a full pass."
      ],
      bestUsedFor: "Great for educational visualization and detecting whether an array is already sorted in linear time O(n).",
      proTip: "Adding a 'swapped' flag allows it to stop early in O(n) best-case time if the input is already sorted."
    }
  },
  insertion: {
    name: "Insertion Sort",
    category: "sorting",
    file: "InsertionSort.java",
    lines: [
      "void insertionSort(int[] arr) {",
      "  int n = arr.length;",
      "  for (int i = 1; i < n; i++) {",
      "    int key = arr[i], j = i - 1;",
      "    while (j >= 0 && arr[j] > key) {",
      "      arr[j + 1] = arr[j];",
      "      j--;",
      "    }",
      "    arr[j + 1] = key;",
      "  }",
      "}"
    ],
    time: "O(n²)",
    space: "O(1)",
    stable: "Yes",
    desc: "Builds the final sorted array one item at a time by picking the key element and shifting larger items to the right.",
    explanation: {
      intuition: "Insertion sort builds a sorted sub-array one element at a time, taking the next element ('key') and inserting it into its correct position among previously sorted items.",
      steps: [
        "Pick the next element ('key') from the unsorted section.",
        "Compare key with elements in the sorted sub-array from right to left.",
        "Shift larger elements one position to the right.",
        "Place the key in its newly cleared slot."
      ],
      bestUsedFor: "Highly efficient for nearly-sorted data or small datasets (n <= 20). Used as a base case in hybrid algorithms like Timsort.",
      proTip: "Runs in O(n) best-case time when the input is already sorted!"
    }
  },
  merge: {
    name: "Merge Sort",
    category: "sorting",
    file: "MergeSort.java",
    lines: [
      "void mergeSort(int[] arr, int l, int r) {",
      "  if (l < r) {",
      "    int mid = (l + r) / 2;",
      "    mergeSort(arr, l, mid);",
      "    mergeSort(arr, mid + 1, r);",
      "    merge(arr, l, mid, r);",
      "  }",
      "}"
    ],
    time: "O(n log n)",
    space: "O(n)",
    stable: "Yes",
    desc: "A Divide and Conquer algorithm that recursively splits the array into two halves, sorts them, and merges the sorted halves.",
    explanation: {
      intuition: "Merge Sort uses a Divide and Conquer strategy: it recursively splits the array into single-element sub-arrays, then merges those sorted sub-arrays back together in order.",
      steps: [
        "Divide the array into two halves at the midpoint.",
        "Recursively call mergeSort on the left and right halves.",
        "Merge the two sorted halves back into a single sorted array using auxiliary space."
      ],
      bestUsedFor: "Ideal when stable sorting and guaranteed O(n log n) performance are required, e.g. for linked lists or external sorting.",
      proTip: "Requires O(n) auxiliary space to merge sub-arrays."
    }
  },
  quick: {
    name: "Quick Sort",
    category: "sorting",
    file: "QuickSort.java",
    lines: [
      "void quickSort(int[] arr, int low, int high) {",
      "  if (low < high) {",
      "    int p = partition(arr, low, high);",
      "    quickSort(arr, low, p - 1);",
      "    quickSort(arr, p + 1, high);",
      "  }",
      "}"
    ],
    time: "O(n log n)",
    space: "O(log n)",
    stable: "No",
    desc: "Picks a pivot element, partitions the array around the pivot so smaller items precede it and larger items follow it.",
    explanation: {
      intuition: "Quick Sort selects a 'pivot' element and partitions the array into elements smaller than the pivot and elements larger than the pivot, then recursively sorts each partition.",
      steps: [
        "Select a pivot element (e.g., last element).",
        "Reorganize array so elements < pivot go left, and elements >= pivot go right.",
        "Place pivot in its final sorted position.",
        "Recursively sort left and right partitions."
      ],
      bestUsedFor: "Widely used in systems programming due to fast average-case execution and low memory overhead O(log n).",
      proTip: "Choice of pivot matters! Randomized pivots prevent O(n²) worst-case performance on sorted inputs."
    }
  },
  heap: {
    name: "Heap Sort",
    category: "sorting",
    file: "HeapSort.java",
    lines: [
      "void heapSort(int[] arr) {",
      "  buildMaxHeap(arr);",
      "  for (int i = n - 1; i > 0; i--) {",
      "    swap(arr[0], arr[i]);",
      "    heapify(arr, i, 0);",
      "  }",
      "}"
    ],
    time: "O(n log n)",
    space: "O(1)",
    stable: "No",
    desc: "Converts array into a Max-Heap structure, then repeatedly extracts the root (maximum element) to build the sorted array.",
    explanation: {
      intuition: "Heap Sort constructs a Max-Heap binary tree from the array, where the root is always the maximum element, then repeatedly extracts the max root to build the sorted array.",
      steps: [
        "Build a Max-Heap from the input array.",
        "Swap the root (largest element) with the last unsorted element.",
        "Reduce heap size by 1 and run heapify to restore Max-Heap property.",
        "Repeat until the heap size becomes 1."
      ],
      bestUsedFor: "Great when O(n log n) worst-case time is needed with zero extra space O(1).",
      proTip: "In-place sorting with no recursion stack memory, though it is not a stable sort."
    }
  },

  // --- SEARCHING ---
  linearSearch: {
    name: "Linear Search",
    category: "searching",
    file: "LinearSearch.py",
    lines: [
      "def linear_search(arr, target):",
      "    for i in range(len(arr)):",
      "        if arr[i] == target:",
      "            return i  # Target found",
      "    return -1  # Not found"
    ],
    time: "O(n)",
    space: "O(1)",
    stable: "N/A",
    desc: "Sequentially checks each element of the list in order until a matching element is found or the list ends.",
    explanation: {
      intuition: "Linear Search iterates through every element in a dataset sequentially from start to end until the target item is matched.",
      steps: [
        "Start at the first element (index 0).",
        "Compare the current element with target.",
        "If matched, return current index.",
        "If end of array is reached without a match, return -1."
      ],
      bestUsedFor: "Searching unsorted arrays or small datasets where sorting first is not worth the overhead.",
      proTip: "Works on any data structure (arrays, linked lists) without needing sorted input."
    }
  },
  binarySearch: {
    name: "Binary Search",
    category: "searching",
    file: "BinarySearch.py",
    lines: [
      "def binary_search(arr, target):",
      "    low, high = 0, len(arr) - 1",
      "    while low <= high:",
      "        mid = (low + high) // 2",
      "        if arr[mid] == target: return mid",
      "        elif arr[mid] < target: low = mid + 1",
      "        else: high = mid - 1",
      "    return -1"
    ],
    time: "O(log n)",
    space: "O(1)",
    stable: "N/A",
    desc: "Efficiently searches a sorted array by repeatedly halving the search interval based on comparing the middle item.",
    explanation: {
      intuition: "Binary Search operates on sorted arrays by repeatedly comparing the target to the middle element and halving the search space each time.",
      steps: [
        "Calculate the middle index: mid = (low + high) / 2.",
        "If arr[mid] equals target, return mid.",
        "If target < arr[mid], narrow search to left half (high = mid - 1).",
        "If target > arr[mid], narrow search to right half (low = mid + 1)."
      ],
      bestUsedFor: "Searching large sorted datasets (e.g., database indexes) in O(log n) time.",
      proTip: "Reduces a 1-billion item search space down to under 30 comparisons!"
    }
  },

  // --- GRAPH ALGORITHMS ---
  bfs: {
    name: "Breadth-First Search (BFS)",
    category: "graph",
    file: "BFSGraph.cpp",
    lines: [
      "void bfs(int startNode) {",
      "  queue<int> q; q.push(startNode);",
      "  visited[startNode] = true;",
      "  while (!q.empty()) {",
      "    int curr = q.front(); q.pop();",
      "    for (int neighbor : adj[curr]) {",
      "      if (!visited[neighbor]) {",
      "        visited[neighbor] = true; q.push(neighbor);",
      "      }",
      "    }",
      "  }",
      "}"
    ],
    time: "O(V + E)",
    space: "O(V)",
    stable: "N/A",
    desc: "Traverses graph level by level from a starting vertex using a FIFO Queue data structure.",
    explanation: {
      intuition: "Breadth-First Search traverses a graph level-by-level, exploring all immediate neighbors of a node before moving deeper into the graph.",
      steps: [
        "Enqueue the start node into a Queue and mark it as visited.",
        "Dequeue node u and process its value.",
        "Enqueue all unvisited neighbors of u and mark them visited.",
        "Repeat until the Queue is empty."
      ],
      bestUsedFor: "Finding shortest paths in unweighted graphs and calculating distance levels.",
      proTip: "Always uses a Queue (FIFO) to ensure level-order traversal."
    }
  },
  dfs: {
    name: "Depth-First Search (DFS)",
    category: "graph",
    file: "DFSGraph.cpp",
    lines: [
      "void dfs(int curr) {",
      "  visited[curr] = true;",
      "  for (int neighbor : adj[curr]) {",
      "    if (!visited[neighbor]) {",
      "      dfs(neighbor);",
      "    }",
      "  }",
      "}"
    ],
    time: "O(V + E)",
    space: "O(V)",
    stable: "N/A",
    desc: "Explores as far as possible along each branch before backtracking using recursion / call stack.",
    explanation: {
      intuition: "Depth-First Search explores as far as possible down each branch of a graph before backtracking to explore alternative paths.",
      steps: [
        "Mark the starting node as visited.",
        "Recursively visit the first unvisited neighbor.",
        "Backtrack when a node has no unvisited neighbors left.",
        "Continue until all reachable nodes are visited."
      ],
      bestUsedFor: "Topological sorting, cycle detection, connected components, and solving maze puzzles.",
      proTip: "Uses a Call Stack (recursion) or an explicit Stack (LIFO)."
    }
  },
  dijkstra: {
    name: "Dijkstra's Shortest Path",
    category: "graph",
    file: "Dijkstra.cpp",
    lines: [
      "void dijkstra(int start) {",
      "  dist[start] = 0; pq.push({0, start});",
      "  while (!pq.empty()) {",
      "    auto [d, u] = pq.top(); pq.pop();",
      "    for (auto& edge : adj[u]) {",
      "      if (dist[u] + edge.weight < dist[edge.v]) {",
      "        dist[edge.v] = dist[u] + edge.weight;",
      "        pq.push({dist[edge.v], edge.v});",
      "      }",
      "    }",
      "  }",
      "}"
    ],
    time: "O((V + E) log V)",
    space: "O(V)",
    stable: "N/A",
    desc: "Greedy algorithm that finds single-source shortest paths in a weighted graph with non-negative edge weights.",
    explanation: {
      intuition: "Dijkstra's algorithm finds the shortest path from a starting node to all other nodes in a weighted graph with non-negative edge weights using a greedy priority queue strategy.",
      steps: [
        "Initialize all distances to infinity ∞, start node distance to 0.",
        "Push start node to Min-Priority Queue.",
        "Pop node u with smallest distance.",
        "Relax all neighbors: if dist[u] + weight < dist[v], update dist[v] and push to PQ."
      ],
      bestUsedFor: "GPS routing, map navigation systems, and network routing protocols (OSPF).",
      proTip: "Does not work with negative edge weights! Use Bellman-Ford for negative weights."
    }
  },

  // --- DYNAMIC PROGRAMMING ---
  knapsack01: {
    name: "0/1 Knapsack Problem",
    category: "dp",
    file: "Knapsack.cpp",
    lines: [
      "int knapsack(int W, int wt[], int val[], int n) {",
      "  for (int i = 1; i <= n; i++) {",
      "    for (int w = 0; w <= W; w++) {",
      "      if (wt[i-1] <= w)",
      "        dp[i][w] = max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w]);",
      "      else dp[i][w] = dp[i-1][w];",
      "    }",
      "  }",
      "  return dp[n][W];",
      "}"
    ],
    time: "O(n * W)",
    space: "O(n * W)",
    stable: "N/A",
    desc: "Finds the maximum total value subset of items given item weights and total capacity limit using 2D DP memoization.",
    explanation: {
      intuition: "The 0/1 Knapsack Problem determines which items to include in a bag of capacity W to maximize total value, where each item can either be taken (1) or left behind (0).",
      steps: [
        "Create a 2D table dp[i][w] storing max value for i items and capacity w.",
        "For each item, compare value if excluded (dp[i-1][w]) vs included (val + dp[i-1][w-wt]).",
        "Take the maximum of both choices.",
        "The bottom-right cell dp[n][W] holds the optimal answer."
      ],
      bestUsedFor: "Resource allocation, portfolio optimization, and budget planning under constraints.",
      proTip: "Uses Dynamic Programming to break the problem into overlapping subproblems."
    }
  },
  lcs: {
    name: "Longest Common Subsequence",
    category: "dp",
    file: "LCS.cpp",
    lines: [
      "int lcs(string s1, string s2) {",
      "  for (int i = 1; i <= m; i++) {",
      "    for (int j = 1; j <= n; j++) {",
      "      if (s1[i-1] == s2[j-1])",
      "        dp[i][j] = 1 + dp[i-1][j-1];",
      "      else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);",
      "    }",
      "  }",
      "  return dp[m][n];",
      "}"
    ],
    time: "O(m * n)",
    space: "O(m * n)",
    stable: "N/A",
    desc: "Computes the length of the longest subsequence common to two input strings using a 2D Dynamic Programming matrix.",
    explanation: {
      intuition: "Longest Common Subsequence finds the longest sequence of characters that appear in the same relative order in two strings (not necessarily contiguous).",
      steps: [
        "Build 2D table dp[i][j] for prefixes of string 1 (length i) and string 2 (length j).",
        "If characters match (s1[i] == s2[j]), set dp[i][j] = 1 + dp[i-1][j-1].",
        "Otherwise, take max of dp[i-1][j] and dp[i][j-1].",
        "Cell dp[m][n] contains the length of the LCS."
      ],
      bestUsedFor: "Git diff utilities, DNA sequence comparison in bioinformatics, and text similarity detection.",
      proTip: "Forms the basis of file comparison algorithms like git diff!"
    }
  },

  // --- BACKTRACKING & GREEDY ---
  nqueens: {
    name: "N-Queens Problem",
    category: "backtracking",
    file: "NQueens.py",
    lines: [
      "def solve_nqueens(board, col):",
      "    if col >= N: return True",
      "    for i in range(N):",
      "        if is_safe(board, i, col):",
      "            board[i][col] = 1",
      "            if solve_nqueens(board, col + 1): return True",
      "            board[i][col] = 0  # Backtrack",
      "    return False"
    ],
    time: "O(N!)",
    space: "O(N²)",
    stable: "N/A",
    desc: "Places N non-attacking queens on an N×N chessboard using recursive backtracking.",
    explanation: {
      intuition: "N-Queens places N non-attacking chess queens on an N×N board such that no two queens share the same row, column, or diagonal, using backtracking to undo invalid moves.",
      steps: [
        "Try placing a queen in the first column.",
        "Check if position is safe from existing queens.",
        "If safe, place queen and move to next column recursively.",
        "If no valid position exists, remove queen (backtrack) and try next row."
      ],
      bestUsedFor: "Constraint satisfaction problems, puzzle solving, and scheduling with conflict constraints.",
      proTip: "Prunes invalid state branches early to avoid searching all N^N combinations!"
    }
  },
  fractionalKnapsack: {
    name: "Fractional Knapsack",
    category: "greedy",
    file: "FractionalKnapsack.py",
    lines: [
      "def fractional_knapsack(items, capacity):",
      "    items.sort(key=lambda x: x.val/x.wt, reverse=True)",
      "    total_val = 0.0",
      "    for item in items:",
      "        if capacity >= item.wt:",
      "            capacity -= item.wt; total_val += item.val",
      "        else:",
      "            total_val += item.val * (capacity / item.wt)",
      "            break",
      "    return total_val"
    ],
    time: "O(n log n)",
    space: "O(1)",
    stable: "N/A",
    desc: "Greedy strategy taking whole items or fractional items sorted by value-to-weight ratio to maximize total profit.",
    explanation: {
      intuition: "Fractional Knapsack maximizes item value in a bag of capacity W by greedily taking items with highest value-to-weight ratio first, breaking items into fractions if necessary.",
      steps: [
        "Calculate value/weight ratio for every item.",
        "Sort items in descending order of ratio.",
        "Take whole items as long as capacity allows.",
        "Take a fractional portion of the next item to fill remaining capacity."
      ],
      bestUsedFor: "Continuous resource allocation (e.g., buying liquids, metals, or divisible commodities).",
      proTip: "Unlike 0/1 Knapsack, Greedy strategy yields the absolute optimal solution here because items are divisible!"
    }
  },

  // --- DATA STRUCTURES ---
  bst: {
    name: "Binary Search Tree (BST)",
    category: "datastructures",
    file: "BST.java",
    lines: [
      "Node insert(Node root, int val) {",
      "  if (root == null) return new Node(val);",
      "  if (val < root.val) root.left = insert(root.left, val);",
      "  else if (val > root.val) root.right = insert(root.right, val);",
      "  return root;",
      "}",
      "void inorder(Node root) {",
      "  if (root == null) return;",
      "  inorder(root.left); visit(root); inorder(root.right);",
      "}"
    ],
    time: "O(log n) avg",
    space: "O(h)",
    stable: "N/A",
    desc: "Maintains a binary tree where left child < parent < right child, demonstrating node insertion and Inorder traversal.",
    explanation: {
      intuition: "A Binary Search Tree maintains a hierarchical structure where every left child is smaller than its parent, and every right child is greater than its parent.",
      steps: [
        "Insertion: Compare value with root; move left if smaller, right if larger until an empty spot is found.",
        "Inorder Traversal: Recursively visit Left subtree → Current Node → Right subtree.",
        "Result: Inorder traversal visits nodes in perfectly sorted ascending order!"
      ],
      bestUsedFor: "Dynamic sets, fast lookup tables, and priority queues.",
      proTip: "Inorder traversal of a BST always yields sorted keys!"
    }
  }
};
