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
    desc: "Repeatedly finds the minimum element from the unsorted sub-array and places it at the starting index."
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
    desc: "Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order."
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
    desc: "Builds the final sorted array one item at a time by picking the key element and shifting larger items to the right."
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
    desc: "A Divide and Conquer algorithm that recursively splits the array into two halves, sorts them, and merges the sorted halves."
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
    desc: "Picks a pivot element, partitions the array around the pivot so smaller items precede it and larger items follow it."
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
    desc: "Converts array into a Max-Heap structure, then repeatedly extracts the root (maximum element) to build the sorted array."
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
    desc: "Sequentially checks each element of the list in order until a matching element is found or the list ends."
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
    desc: "Efficiently searches a sorted array by repeatedly halving the search interval based on comparing the middle item."
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
    desc: "Traverses graph level by level from a starting vertex using a FIFO Queue data structure."
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
    desc: "Explores as far as possible along each branch before backtracking using recursion / call stack."
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
    desc: "Greedy algorithm that finds single-source shortest paths in a weighted graph with non-negative edge weights."
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
    desc: "Finds the maximum total value subset of items given item weights and total capacity limit using 2D DP memoization."
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
    desc: "Computes the length of the longest subsequence common to two input strings using a 2D Dynamic Programming matrix."
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
    desc: "Places N non-attacking queens on an N×N chessboard using recursive backtracking."
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
    desc: "Greedy strategy taking whole items or fractional items sorted by value-to-weight ratio to maximize total profit."
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
    desc: "Maintains a binary tree where left child < parent < right child, demonstrating node insertion and Inorder traversal."
  }
};
