export const ALGORITHM_CATEGORIES = [
  { id: "sorting", name: "Sorting & Arrays", desc: "Array ordering and partition algorithms" },
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
  kadane: {
    name: "Kadane's Algorithm",
    category: "sorting",
    file: "Kadane.java",
    lines: [
      "int maxSubArray(int[] nums) {",
      "  int maxSoFar = nums[0];",
      "  int currentMax = nums[0];",
      "  for (int i = 1; i < nums.length; i++) {",
      "    currentMax = Math.max(nums[i], currentMax + nums[i]);",
      "    maxSoFar = Math.max(maxSoFar, currentMax);",
      "  }",
      "  return maxSoFar;",
      "}"
    ],
    time: "O(n)",
    space: "O(1)",
    stable: "N/A",
    desc: "Finds the contiguous subarray within a one-dimensional array of numbers which has the largest sum in linear time.",
    explanation: {
      intuition: "Kadane's algorithm scans the array while maintaining a running maximum subarray sum, dynamically deciding whether to append the current element or restart a fresh subarray when previous sums drop below zero.",
      steps: [
        "Initialize currentMax and maxSoFar to the first element.",
        "Iterate through the array starting from index 1.",
        "Update currentMax = max(nums[i], currentMax + nums[i]).",
        "Update maxSoFar = max(maxSoFar, currentMax)."
      ],
      bestUsedFor: "Essential for financial profit maximization, stock trading intervals, and image processing filters.",
      proTip: "Computes the maximum subarray in a single O(n) pass with zero extra memory O(1)."
    }
  },
  dnf: {
    name: "Dutch National Flag",
    category: "sorting",
    file: "DutchNationalFlag.java",
    lines: [
      "void sortColors(int[] nums) {",
      "  int low = 0, mid = 0, high = nums.length - 1;",
      "  while (mid <= high) {",
      "    if (nums[mid] == 0) {",
      "      swap(nums, low++, mid++);",
      "    } else if (nums[mid] == 1) {",
      "      mid++;",
      "    } else {",
      "      swap(nums, mid, high--);",
      "    }",
      "  }",
      "}"
    ],
    time: "O(n)",
    space: "O(1)",
    stable: "No",
    desc: "Partitions an array containing three distinct keys (e.g., 0s, 1s, and 2s) in a single linear scan using three pointers.",
    explanation: {
      intuition: "Designed by Edsger Dijkstra, the algorithm maintains three boundaries: elements before 'low' are 0s, between 'low' and 'mid' are 1s, and after 'high' are 2s.",
      steps: [
        "Initialize low=0, mid=0, high=n-1.",
        "If nums[mid] is 0, swap with nums[low], advance low and mid.",
        "If nums[mid] is 1, it's already in the correct partition, advance mid.",
        "If nums[mid] is 2, swap with nums[high], decrement high without advancing mid."
      ],
      bestUsedFor: "LeetCode 75 (Sort Colors), 3-way QuickSort partitioning, and bucketing multi-category items in O(n) time.",
      proTip: "When swapping with high, do not increment mid because the swapped element from high has not yet been inspected!"
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
  kruskal: {
    name: "Kruskal's Algorithm (MST)",
    category: "graph",
    file: "Kruskal.java",
    lines: [
      "int kruskalMST(List<Edge> edges, int V) {",
      "  Collections.sort(edges);",
      "  DisjointSet dsu = new DisjointSet(V);",
      "  int mstWeight = 0, count = 0;",
      "  for (Edge e : edges) {",
      "    if (dsu.union(e.u, e.v)) {",
      "      mstWeight += e.weight;",
      "      if (++count == V - 1) break;",
      "    }",
      "  }",
      "  return mstWeight;",
      "}"
    ],
    time: "O(E log E)",
    space: "O(V)",
    stable: "N/A",
    desc: "Finds a Minimum Spanning Tree for a connected weighted graph by greedily adding lowest-weight edges that do not form a cycle.",
    explanation: {
      intuition: "Kruskal's algorithm builds a minimum spanning tree by sorting all edges by weight and adding them one by one, using Disjoint Set Union (DSU) to reject any edge that forms a cycle.",
      steps: [
        "Sort all edges in ascending order of their weight.",
        "Initialize each vertex in its own disjoint set.",
        "Pick the smallest edge. If endpoints belong to different sets, union them and add to MST.",
        "Stop when the MST contains exactly V-1 edges."
      ],
      bestUsedFor: "Laying electrical networks, road design, telecommunication cables, and cluster analysis.",
      proTip: "DSU with path compression and rank union executes find and union operations in nearly O(1) inverse Ackermann time."
    }
  },
  topoSort: {
    name: "Topological Sort (Kahn's)",
    category: "graph",
    file: "TopologicalSort.java",
    lines: [
      "List<Integer> topoSort(int V, List<List<Integer>> adj) {",
      "  int[] inDegree = new int[V];",
      "  for (int u = 0; u < V; u++) for (int v : adj.get(u)) inDegree[v]++;",
      "  Queue<Integer> q = new LinkedList<>();",
      "  for (int i = 0; i < V; i++) if (inDegree[i] == 0) q.add(i);",
      "  List<Integer> order = new ArrayList<>();",
      "  while (!q.isEmpty()) {",
      "    int u = q.poll(); order.add(u);",
      "    for (int v : adj.get(u)) if (--inDegree[v] == 0) q.add(v);",
      "  }",
      "  return order.size() == V ? order : Collections.emptyList();",
      "}"
    ],
    time: "O(V + E)",
    space: "O(V)",
    stable: "N/A",
    desc: "Produces a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u -> v, u comes before v.",
    explanation: {
      intuition: "Kahn's algorithm resolves task dependencies by repeatedly picking vertices with zero incoming prerequisites, executing them, and decrementing the in-degrees of their dependents.",
      steps: [
        "Calculate the in-degree (number of incoming directed edges) for each vertex.",
        "Add all vertices with in-degree 0 to a FIFO Queue.",
        "Dequeue a vertex, append it to the topological ordering, and reduce in-degree of all its neighbors by 1.",
        "If a neighbor's in-degree drops to 0, enqueue it.",
        "If total processed nodes equals V, ordering is valid; otherwise a cycle exists."
      ],
      bestUsedFor: "Build systems (Makefile / Webpack dependencies), course prerequisites, and package managers (npm / pip).",
      proTip: "If the output list contains fewer than V nodes, the graph has a cycle and cannot be topologically sorted!"
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
  coinChange: {
    name: "Coin Change (Min Coins)",
    category: "dp",
    file: "CoinChange.java",
    lines: [
      "int coinChange(int[] coins, int amount) {",
      "  int[] dp = new int[amount + 1];",
      "  Arrays.fill(dp, amount + 1);",
      "  dp[0] = 0;",
      "  for (int coin : coins) {",
      "    for (int a = coin; a <= amount; a++) {",
      "      dp[a] = Math.min(dp[a], 1 + dp[a - coin]);",
      "    }",
      "  }",
      "  return dp[amount] > amount ? -1 : dp[amount];",
      "}"
    ],
    time: "O(n * amount)",
    space: "O(amount)",
    stable: "N/A",
    desc: "Computes the fewest number of coins that you need to make up a given target amount using Dynamic Programming memoization.",
    explanation: {
      intuition: "Coin change breaks down the problem of forming target amount A into subproblems: for each coin denomination, determine if taking it results in fewer total coins than the previously computed combinations.",
      steps: [
        "Initialize DP table with a large sentinel value (e.g. amount + 1).",
        "Base case: 0 coins are needed to make an amount of 0 (dp[0] = 0).",
        "For each coin denomination and each target amount from coin to amount:",
        "dp[a] = min(dp[a], 1 + dp[a - coin]).",
        "Return dp[amount] if reachable, else -1."
      ],
      bestUsedFor: "Automated vending machines, cash registers, currency exchange engines, and resource rationing.",
      proTip: "Unlike greedy coin change, DP works correctly with arbitrary coin denomination systems (e.g., coins [1, 3, 4] for amount 6 yields 2 coins [3, 3] instead of greedy's 3 [4, 1, 1])."
    }
  },
  editDistance: {
    name: "Edit Distance (Levenshtein)",
    category: "dp",
    file: "EditDistance.java",
    lines: [
      "int minDistance(String s1, String s2) {",
      "  int m = s1.length(), n = s2.length();",
      "  int[][] dp = new int[m + 1][n + 1];",
      "  for (int i = 0; i <= m; i++) dp[i][0] = i;",
      "  for (int j = 0; j <= n; j++) dp[0][j] = j;",
      "  for (int i = 1; i <= m; i++) {",
      "    for (int j = 1; j <= n; j++) {",
      "      if (s1.charAt(i - 1) == s2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1];",
      "      else dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));",
      "    }",
      "  }",
      "  return dp[m][n];",
      "}"
    ],
    time: "O(m * n)",
    space: "O(m * n)",
    stable: "N/A",
    desc: "Computes the minimum number of single-character edit operations (insertions, deletions, or substitutions) needed to transform string 1 into string 2.",
    explanation: {
      intuition: "Levenshtein distance constructs a 2D matrix evaluating the cost to convert prefixes of word1 into prefixes of word2 by comparing the three allowable operations: insert, delete, or replace.",
      steps: [
        "Initialize dp[i][0] = i (deleting all characters) and dp[0][j] = j (inserting all characters).",
        "For character indices i and j, if characters match, cost is 0: dp[i][j] = dp[i-1][j-1].",
        "If characters mismatch, cost is 1 + min(dp[i-1][j-1] (replace), dp[i][j-1] (insert), dp[i-1][j] (delete)).",
        "Final answer sits in bottom-right cell dp[m][n]."
      ],
      bestUsedFor: "Spell checkers, autocomplete suggestion engines, speech recognition, and DNA alignment.",
      proTip: "Forms the algorithmic backbone behind Google Search's 'Did you mean?' query corrections."
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
  },
  treeTraversals: {
    name: "Tree Traversals (Pre/In/Post/Level)",
    category: "datastructures",
    file: "TreeTraversals.java",
    lines: [
      "// Pre-order: Root -> Left -> Right",
      "void preOrder(Node root) {",
      "  if (root == null) return;",
      "  visit(root); preOrder(root.left); preOrder(root.right);",
      "}",
      "// Post-order: Left -> Right -> Root",
      "void postOrder(Node root) {",
      "  if (root == null) return;",
      "  postOrder(root.left); postOrder(root.right); visit(root);",
      "}",
      "// Level-order (BFS Queue)",
      "void levelOrder(Node root) {",
      "  Queue<Node> q = new LinkedList<>(); q.add(root);",
      "  while (!q.isEmpty()) {",
      "    Node curr = q.poll(); visit(curr);",
      "    if (curr.left != null) q.add(curr.left);",
      "    if (curr.right != null) q.add(curr.right);",
      "  }",
      "}"
    ],
    time: "O(n)",
    space: "O(h)",
    stable: "N/A",
    desc: "Compares Depth-First (Pre-order, Post-order) and Breadth-First (Level-order) tree traversal strategies step-by-step.",
    explanation: {
      intuition: "Tree traversals visit every node in a hierarchical tree. Pre-order processes nodes top-down, Post-order resolves bottom-up (like folder deletion/sizes), and Level-order traverses breadth-first level by level.",
      steps: [
        "Pre-order: Visit Node → Left Subtree → Right Subtree.",
        "Post-order: Left Subtree → Right Subtree → Visit Node.",
        "Level-order: Enqueue root, then repeatedly dequeue current node and enqueue its non-null children."
      ],
      bestUsedFor: "DOM tree rendering, directory size calculation, AST compilers, and file system searches.",
      proTip: "Post-order traversal is essential for calculating folder sizes or deleting trees, because you must evaluate all children before the parent!"
    }
  },
  minHeap: {
    name: "Binary Min-Heap (Sift Up/Down)",
    category: "datastructures",
    file: "MinHeap.java",
    lines: [
      "void insert(int val) {",
      "  heap.add(val); siftUp(heap.size() - 1);",
      "}",
      "void siftUp(int i) {",
      "  while (i > 0 && heap.get(i) < heap.get(parent(i))) {",
      "    swap(i, parent(i)); i = parent(i);",
      "  }",
      "}",
      "int extractMin() {",
      "  int min = heap.get(0); heap.set(0, heap.remove(heap.size() - 1));",
      "  siftDown(0); return min;",
      "}"
    ],
    time: "O(log n)",
    space: "O(1)",
    stable: "No",
    desc: "Maintains a complete binary tree where every parent <= children. Demonstrates Sift-Up on insertion and Sift-Down on Extract-Min.",
    explanation: {
      intuition: "A Min-Heap guarantees that the smallest item is always at the root. New elements enter at the bottom and 'bubble up' (sift-up); when the root is removed, the last element moves to the root and 'trickles down' (sift-down).",
      steps: [
        "Insert: Append new element at end of heap array, swap with parent while element < parent (Sift-Up).",
        "Extract-Min: Pop root, move last element to root.",
        "Sift-Down: Swap current node with its smaller child until min-heap ordering is restored."
      ],
      bestUsedFor: "Priority Queues, Dijkstra's algorithm, Huffman encoding, and finding K-th largest/smallest elements.",
      proTip: "Represented with a compact array where left child is 2*i + 1 and right child is 2*i + 2 without needing explicit pointer nodes!"
    }
  },

  llInsert: {
    name: "LL — Insert at Head",
    category: "datastructures",
    file: "LinkedList.java",
    lines: [
      "// Insert at head of linked list",
      "Node newNode = new Node(val);",
      "newNode.next = head;",
      "head = newNode;",
      "// List built successfully!"
    ],
    time: "O(1)",
    space: "O(1)",
    stable: "N/A",
    desc: "Creates a new node and inserts it at the beginning of the list by re-wiring the head pointer in O(1) constant time.",
    explanation: {
      intuition: "Inserting at the head is the most efficient linked list operation because it only requires updating one pointer — the head — regardless of the list's length.",
      steps: [
        "Create a new Node with the given value.",
        "Point newNode.next to the current head.",
        "Update head to point to the new node."
      ],
      bestUsedFor: "Prepending elements to a list, implementing stacks using linked lists.",
      proTip: "Unlike arrays, linked list head insertion is always O(1) — no shifting of elements needed!"
    }
  },

  llDelete: {
    name: "LL — Delete Node",
    category: "datastructures",
    file: "LinkedList.java",
    lines: [
      "// Delete node by value",
      "Node curr = head; Node prev = null;",
      "while (curr != null && curr.val != target) {",
      "  prev = curr; curr = curr.next;",
      "}",
      "if (curr != null) prev.next = curr.next;",
      "// curr is now unreferenced (GC'd)"
    ],
    time: "O(n)",
    space: "O(1)",
    stable: "N/A",
    desc: "Traverses the list with two pointers (prev & curr) to find the target node, then bypasses it by re-linking prev.next.",
    explanation: {
      intuition: "To delete a node, you don't actually erase it — you just make the previous node skip over it. The deleted node becomes unreachable and gets garbage collected.",
      steps: [
        "Traverse with prev and curr pointers until curr.val == target.",
        "Set prev.next = curr.next to bypass (unlink) the target node.",
        "The orphaned node is now garbage collected."
      ],
      bestUsedFor: "Maintaining dynamic ordered lists where deletions are common.",
      proTip: "Always handle the edge case where the head itself is the target node!"
    }
  },

  llReverse: {
    name: "LL — Reverse List",
    category: "datastructures",
    file: "LinkedList.java",
    lines: [
      "// Reverse a linked list in-place",
      "Node prev = null; Node curr = head;",
      "while (curr != null) {",
      "  Node next = curr.next;  // save next",
      "  curr.next = prev;       // reverse pointer",
      "  prev = curr; curr = next; // advance",
      "}",
      "head = prev; // new head"
    ],
    time: "O(n)",
    space: "O(1)",
    stable: "N/A",
    desc: "Iteratively reverses all next pointers in-place using three pointers (prev, curr, next) in a single O(n) pass.",
    explanation: {
      intuition: "Reversing a linked list means making every node point backwards. We use three pointers: prev (tracks the new 'next'), curr (the node being processed), and next (saved before we overwrite curr.next).",
      steps: [
        "Initialize prev = null, curr = head.",
        "Save next = curr.next (because we're about to overwrite it).",
        "Set curr.next = prev to flip the pointer.",
        "Advance: prev = curr, curr = next. Repeat until curr is null.",
        "Set head = prev (which is now the new head)."
      ],
      bestUsedFor: "A fundamental interview question. Reversing segments of lists, palindrome checking.",
      proTip: "This is purely iterative and runs in O(n) time with O(1) space — memorize this pattern!"
    }
  },

  llCycleDetect: {
    name: "LL — Cycle Detection",
    category: "datastructures",
    file: "LinkedList.java",
    lines: [
      "// Floyd's Tortoise & Hare",
      "Node slow = head, fast = head;",
      "while (fast != null && fast.next != null) {",
      "  slow = slow.next;         // move 1 step",
      "  fast = fast.next.next;    // move 2 steps",
      "  if (slow == fast) { /* CYCLE FOUND */ break; }",
      "}",
      "// Find entry: reset slow, move both 1 step"
    ],
    time: "O(n)",
    space: "O(1)",
    stable: "N/A",
    desc: "Uses two pointers moving at different speeds to detect if a cycle exists. The fast pointer laps the slow pointer inside the cycle.",
    explanation: {
      intuition: "Floyd's algorithm uses two pointers: slow (moves 1 step) and fast (moves 2 steps). If a cycle exists, fast will eventually lap slow and they'll meet inside the cycle — like two runners on a circular track.",
      steps: [
        "Initialize slow = head and fast = head.",
        "Move slow by 1 step and fast by 2 steps each iteration.",
        "If slow == fast, a cycle is detected.",
        "To find the cycle entry: reset slow = head. Move both one step at a time — they'll meet at the cycle entry node."
      ],
      bestUsedFor: "Detecting loops in linked lists, finding the start of a cycle in O(n) time.",
      proTip: "This works because the mathematical distance analysis guarantees slow and fast will always meet at the cycle entry after the reset step!"
    }
  },

  htChaining: {
    name: "Hash Table (Chaining)",
    category: "datastructures",
    file: "HashTable.java",
    lines: [
      "// Hash Table with Separate Chaining",
      "int hash = val % TABLE_SIZE;",
      "if (table[hash] == null) {",
      "  table[hash] = new LinkedList();",
      "}",
      "table[hash].add(val);"
    ],
    time: "O(1) avg",
    space: "O(n)",
    stable: "N/A",
    desc: "Visualizes a Hash Table resolving collisions using Separate Chaining (Linked Lists).",
    explanation: {
      intuition: "When two different keys hash to the same index (a collision), chaining stores them in a linked list at that index.",
      steps: [
        "Compute hash = key % size.",
        "Go to the array index.",
        "If occupied, append the key to the linked list at that index."
      ],
      bestUsedFor: "Dynamic sets and dictionaries where you want to handle high load factors gracefully.",
      proTip: "Chaining is great because the table never 'fills up', but linked list traversal can hurt cache locality."
    }
  },

  htLinearProbing: {
    name: "Hash Table (Linear Probing)",
    category: "datastructures",
    file: "HashTable.java",
    lines: [
      "// Hash Table with Linear Probing",
      "int hash = val % TABLE_SIZE;",
      "while (table[hash] != null) {",
      "  hash = (hash + 1) % TABLE_SIZE;",
      "}",
      "table[hash] = val;"
    ],
    time: "O(1) avg",
    space: "O(n)",
    stable: "N/A",
    desc: "Visualizes a Hash Table resolving collisions using Linear Probing (Open Addressing).",
    explanation: {
      intuition: "When a collision occurs, Linear Probing simply searches forward sequentially until it finds an empty slot.",
      steps: [
        "Compute hash = key % size.",
        "Check index. If occupied, probe index + 1.",
        "Repeat probing until an empty slot is found."
      ],
      bestUsedFor: "Memory-constrained environments, caching (better cache locality than chaining).",
      proTip: "Linear probing is prone to 'primary clustering', where long runs of occupied slots slow down future inserts."
    }
  }
};

