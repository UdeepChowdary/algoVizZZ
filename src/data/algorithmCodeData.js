// Multi-Language Code Data for AlgoViz Algorithms
// Languages supported: Java, Python, C++, JavaScript

export const SUPPORTED_LANGUAGES = [
  { id: "java", label: "Java", ext: ".java", icon: "☕" },
  { id: "python", label: "Python", ext: ".py", icon: "🐍" },
  { id: "cpp", label: "C++", ext: ".cpp", icon: "⚡" },
  { id: "javascript", label: "JavaScript", ext: ".js", icon: "📜" }
];

export const ALGORITHM_CODE_DATA = {
  // 1. Selection Sort
  selection: {
    java: {
      file: "SelectionSort.java",
      lines: [
        "void selectionSort(int[] arr) {",
        "  int n = arr.length;",
        "  for (int i = 0; i < n - 1; i++) {",
        "    int minIdx = i;",
        "    for (int j = i + 1; j < n; j++) {",
        "      if (arr[j] < arr[minIdx]) minIdx = j;",
        "    }",
        "    swap(arr, i, minIdx);",
        "  }",
        "}"
      ]
    },
    python: {
      file: "selection_sort.py",
      lines: [
        "def selection_sort(arr):",
        "    n = len(arr)",
        "    for i in range(n - 1):",
        "        min_idx = i",
        "        for j in range(i + 1, n):",
        "            if arr[j] < arr[min_idx]: min_idx = j",
        "        arr[i], arr[min_idx] = arr[min_idx], arr[i]",
        "    return arr"
      ]
    },
    cpp: {
      file: "selection_sort.cpp",
      lines: [
        "void selectionSort(vector<int>& arr) {",
        "  int n = arr.size();",
        "  for (int i = 0; i < n - 1; i++) {",
        "    int minIdx = i;",
        "    for (int j = i + 1; j < n; j++) {",
        "      if (arr[j] < arr[minIdx]) minIdx = j;",
        "    }",
        "    swap(arr[i], arr[minIdx]);",
        "  }",
        "}"
      ]
    },
    javascript: {
      file: "selectionSort.js",
      lines: [
        "function selectionSort(arr) {",
        "  const n = arr.length;",
        "  for (let i = 0; i < n - 1; i++) {",
        "    let minIdx = i;",
        "    for (let j = i + 1; j < n; j++) {",
        "      if (arr[j] < arr[minIdx]) minIdx = j;",
        "    }",
        "    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];",
        "  }",
        "  return arr;",
        "}"
      ]
    }
  },

  // 2. Bubble Sort
  bubble: {
    java: {
      file: "BubbleSort.java",
      lines: [
        "void bubbleSort(int[] arr) {",
        "  int n = arr.length;",
        "  for (int i = 0; i < n - 1; i++) {",
        "    boolean swapped = false;",
        "    for (int j = 0; j < n - 1 - i; j++) {",
        "      if (arr[j] > arr[j + 1]) {",
        "        swap(arr, j, j + 1);",
        "        swapped = true;",
        "      }",
        "    }",
        "    if (!swapped) break;",
        "  }",
        "}"
      ]
    },
    python: {
      file: "bubble_sort.py",
      lines: [
        "def bubble_sort(arr):",
        "    n = len(arr)",
        "    for i in range(n - 1):",
        "        swapped = False",
        "        for j in range(n - 1 - i):",
        "            if arr[j] > arr[j + 1]:",
        "                arr[j], arr[j + 1] = arr[j + 1], arr[j]",
        "                swapped = True",
        "        if not swapped: break",
        "    return arr"
      ]
    },
    cpp: {
      file: "bubble_sort.cpp",
      lines: [
        "void bubbleSort(vector<int>& arr) {",
        "  int n = arr.size();",
        "  for (int i = 0; i < n - 1; i++) {",
        "    bool swapped = false;",
        "    for (int j = 0; j < n - 1 - i; j++) {",
        "      if (arr[j] > arr[j + 1]) {",
        "        swap(arr[j], arr[j + 1]);",
        "        swapped = true;",
        "      }",
        "    }",
        "    if (!swapped) break;",
        "  }",
        "}"
      ]
    },
    javascript: {
      file: "bubbleSort.js",
      lines: [
        "function bubbleSort(arr) {",
        "  const n = arr.length;",
        "  for (let i = 0; i < n - 1; i++) {",
        "    let swapped = false;",
        "    for (let j = 0; j < n - 1 - i; j++) {",
        "      if (arr[j] > arr[j + 1]) {",
        "        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];",
        "        swapped = true;",
        "      }",
        "    }",
        "    if (!swapped) break;",
        "  }",
        "  return arr;",
        "}"
      ]
    }
  },

  // 3. Insertion Sort
  insertion: {
    java: {
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
      ]
    },
    python: {
      file: "insertion_sort.py",
      lines: [
        "def insertion_sort(arr):",
        "    for i in range(1, len(arr)):",
        "        key, j = arr[i], i - 1",
        "        while j >= 0 and arr[j] > key:",
        "            arr[j + 1] = arr[j]",
        "            j -= 1",
        "        arr[j + 1] = key",
        "    return arr"
      ]
    },
    cpp: {
      file: "insertion_sort.cpp",
      lines: [
        "void insertionSort(vector<int>& arr) {",
        "  int n = arr.size();",
        "  for (int i = 1; i < n; i++) {",
        "    int key = arr[i], j = i - 1;",
        "    while (j >= 0 && arr[j] > key) {",
        "      arr[j + 1] = arr[j];",
        "      j--;",
        "    }",
        "    arr[j + 1] = key;",
        "  }",
        "}"
      ]
    },
    javascript: {
      file: "insertionSort.js",
      lines: [
        "function insertionSort(arr) {",
        "  for (let i = 1; i < arr.length; i++) {",
        "    let key = arr[i], j = i - 1;",
        "    while (j >= 0 && arr[j] > key) {",
        "      arr[j + 1] = arr[j];",
        "      j--;",
        "    }",
        "    arr[j + 1] = key;",
        "  }",
        "  return arr;",
        "}"
      ]
    }
  },

  // 4. Merge Sort
  merge: {
    java: {
      file: "MergeSort.java",
      lines: [
        "void mergeSort(int[] arr, int l, int r) {",
        "  if (l < r) {",
        "    int m = l + (r - l) / 2;",
        "    mergeSort(arr, l, m);",
        "    mergeSort(arr, m + 1, r);",
        "    merge(arr, l, m, r);",
        "  }",
        "}"
      ]
    },
    python: {
      file: "merge_sort.py",
      lines: [
        "def merge_sort(arr, l, r):",
        "    if l < r:",
        "        m = (l + r) // 2",
        "        merge_sort(arr, l, m)",
        "        merge_sort(arr, m + 1, r)",
        "        merge(arr, l, m, r)"
      ]
    },
    cpp: {
      file: "merge_sort.cpp",
      lines: [
        "void mergeSort(vector<int>& arr, int l, int r) {",
        "  if (l < r) {",
        "    int m = l + (r - l) / 2;",
        "    mergeSort(arr, l, m);",
        "    mergeSort(arr, m + 1, r);",
        "    merge(arr, l, m, r);",
        "  }",
        "}"
      ]
    },
    javascript: {
      file: "mergeSort.js",
      lines: [
        "function mergeSort(arr, l = 0, r = arr.length - 1) {",
        "  if (l < r) {",
        "    const m = Math.floor((l + r) / 2);",
        "    mergeSort(arr, l, m);",
        "    mergeSort(arr, m + 1, r);",
        "    merge(arr, l, m, r);",
        "  }",
        "}"
      ]
    }
  },

  // 5. Quick Sort
  quick: {
    java: {
      file: "QuickSort.java",
      lines: [
        "void quickSort(int[] arr, int low, int high) {",
        "  if (low < high) {",
        "    int p = partition(arr, low, high);",
        "    quickSort(arr, low, p - 1);",
        "    quickSort(arr, p + 1, high);",
        "  }",
        "}"
      ]
    },
    python: {
      file: "quick_sort.py",
      lines: [
        "def quick_sort(arr, low, high):",
        "    if low < high:",
        "        p = partition(arr, low, high)",
        "        quick_sort(arr, low, p - 1)",
        "        quick_sort(arr, p + 1, high)"
      ]
    },
    cpp: {
      file: "quick_sort.cpp",
      lines: [
        "void quickSort(vector<int>& arr, int low, int high) {",
        "  if (low < high) {",
        "    int p = partition(arr, low, high);",
        "    quickSort(arr, low, p - 1);",
        "    quickSort(arr, p + 1, high);",
        "  }",
        "}"
      ]
    },
    javascript: {
      file: "quickSort.js",
      lines: [
        "function quickSort(arr, low = 0, high = arr.length - 1) {",
        "  if (low < high) {",
        "    const p = partition(arr, low, high);",
        "    quickSort(arr, low, p - 1);",
        "    quickSort(arr, p + 1, high);",
        "  }",
        "}"
      ]
    }
  },

  // 6. Heap Sort
  heap: {
    java: {
      file: "HeapSort.java",
      lines: [
        "void heapSort(int[] arr) {",
        "  buildMaxHeap(arr);",
        "  for (int i = n - 1; i > 0; i--) {",
        "    swap(arr, 0, i);",
        "    heapify(arr, i, 0);",
        "  }",
        "}"
      ]
    },
    python: {
      file: "heap_sort.py",
      lines: [
        "def heap_sort(arr):",
        "    build_max_heap(arr)",
        "    for i in range(len(arr) - 1, 0, -1):",
        "        arr[0], arr[i] = arr[i], arr[0]",
        "        heapify(arr, i, 0)"
      ]
    },
    cpp: {
      file: "heap_sort.cpp",
      lines: [
        "void heapSort(vector<int>& arr) {",
        "  buildMaxHeap(arr);",
        "  for (int i = arr.size() - 1; i > 0; i--) {",
        "    swap(arr[0], arr[i]);",
        "    heapify(arr, i, 0);",
        "  }",
        "}"
      ]
    },
    javascript: {
      file: "heapSort.js",
      lines: [
        "function heapSort(arr) {",
        "  buildMaxHeap(arr);",
        "  for (let i = arr.length - 1; i > 0; i--) {",
        "    [arr[0], arr[i]] = [arr[i], arr[0]];",
        "    heapify(arr, i, 0);",
        "  }",
        "}"
      ]
    }
  },

  // 7. Kadane's Algorithm
  kadane: {
    java: {
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
      ]
    },
    python: {
      file: "kadane.py",
      lines: [
        "def max_subarray(nums):",
        "    max_so_far = current_max = nums[0]",
        "    for i in range(1, len(nums)):",
        "        current_max = max(nums[i], current_max + nums[i])",
        "        max_so_far = max(max_so_far, current_max)",
        "    return max_so_far"
      ]
    },
    cpp: {
      file: "kadane.cpp",
      lines: [
        "int maxSubArray(vector<int>& nums) {",
        "  int maxSoFar = nums[0], currentMax = nums[0];",
        "  for (size_t i = 1; i < nums.size(); i++) {",
        "    currentMax = max(nums[i], currentMax + nums[i]);",
        "    maxSoFar = max(maxSoFar, currentMax);",
        "  }",
        "  return maxSoFar;",
        "}"
      ]
    },
    javascript: {
      file: "kadane.js",
      lines: [
        "function maxSubArray(nums) {",
        "  let maxSoFar = nums[0], currentMax = nums[0];",
        "  for (let i = 1; i < nums.length; i++) {",
        "    currentMax = Math.max(nums[i], currentMax + nums[i]);",
        "    maxSoFar = Math.max(maxSoFar, currentMax);",
        "  }",
        "  return maxSoFar;",
        "}"
      ]
    }
  },

  // 8. Dutch National Flag
  dnf: {
    java: {
      file: "DutchNationalFlag.java",
      lines: [
        "void sortColors(int[] nums) {",
        "  int low = 0, mid = 0, high = nums.length - 1;",
        "  while (mid <= high) {",
        "    if (nums[mid] == 0) swap(nums, low++, mid++);",
        "    else if (nums[mid] == 1) mid++;",
        "    else swap(nums, mid, high--);",
        "  }",
        "}"
      ]
    },
    python: {
      file: "dutch_national_flag.py",
      lines: [
        "def sort_colors(nums):",
        "    low, mid, high = 0, 0, len(nums) - 1",
        "    while mid <= high:",
        "        if nums[mid] == 0:",
        "            nums[low], nums[mid] = nums[mid], nums[low]",
        "            low += 1; mid += 1",
        "        elif nums[mid] == 1: mid += 1",
        "        else:",
        "            nums[mid], nums[high] = nums[high], nums[mid]",
        "            high -= 1"
      ]
    },
    cpp: {
      file: "dutch_national_flag.cpp",
      lines: [
        "void sortColors(vector<int>& nums) {",
        "  int low = 0, mid = 0, high = nums.size() - 1;",
        "  while (mid <= high) {",
        "    if (nums[mid] == 0) swap(nums[low++], nums[mid++]);",
        "    else if (nums[mid] == 1) mid++;",
        "    else swap(nums[mid], nums[high--]);",
        "  }",
        "}"
      ]
    },
    javascript: {
      file: "dutchNationalFlag.js",
      lines: [
        "function sortColors(nums) {",
        "  let low = 0, mid = 0, high = nums.length - 1;",
        "  while (mid <= high) {",
        "    if (nums[mid] === 0) {",
        "      [nums[low], nums[mid]] = [nums[mid], nums[low]];",
        "      low++; mid++;",
        "    } else if (nums[mid] === 1) mid++;",
        "    else {",
        "      [nums[mid], nums[high]] = [nums[high], nums[mid]];",
        "      high--;",
        "    }",
        "  }",
        "}"
      ]
    }
  },

  // 9. Linear Search
  linearSearch: {
    java: {
      file: "LinearSearch.java",
      lines: [
        "int linearSearch(int[] arr, int target) {",
        "  for (int i = 0; i < arr.length; i++) {",
        "    if (arr[i] == target) return i;",
        "  }",
        "  return -1;",
        "}"
      ]
    },
    python: {
      file: "linear_search.py",
      lines: [
        "def linear_search(arr, target):",
        "    for i in range(len(arr)):",
        "        if arr[i] == target:",
        "            return i",
        "    return -1"
      ]
    },
    cpp: {
      file: "linear_search.cpp",
      lines: [
        "int linearSearch(const vector<int>& arr, int target) {",
        "  for (int i = 0; i < arr.size(); i++) {",
        "    if (arr[i] == target) return i;",
        "  }",
        "  return -1;",
        "}"
      ]
    },
    javascript: {
      file: "linearSearch.js",
      lines: [
        "function linearSearch(arr, target) {",
        "  for (let i = 0; i < arr.length; i++) {",
        "    if (arr[i] === target) return i;",
        "  }",
        "  return -1;",
        "}"
      ]
    }
  },

  // 10. Binary Search
  binarySearch: {
    java: {
      file: "BinarySearch.java",
      lines: [
        "int binarySearch(int[] arr, int target) {",
        "  int low = 0, high = arr.length - 1;",
        "  while (low <= high) {",
        "    int mid = low + (high - low) / 2;",
        "    if (arr[mid] == target) return mid;",
        "    else if (arr[mid] < target) low = mid + 1;",
        "    else high = mid - 1;",
        "  }",
        "  return -1;",
        "}"
      ]
    },
    python: {
      file: "binary_search.py",
      lines: [
        "def binary_search(arr, target):",
        "    low, high = 0, len(arr) - 1",
        "    while low <= high:",
        "        mid = (low + high) // 2",
        "        if arr[mid] == target: return mid",
        "        elif arr[mid] < target: low = mid + 1",
        "        else: high = mid - 1",
        "    return -1"
      ]
    },
    cpp: {
      file: "binary_search.cpp",
      lines: [
        "int binarySearch(const vector<int>& arr, int target) {",
        "  int low = 0, high = arr.size() - 1;",
        "  while (low <= high) {",
        "    int mid = low + (high - low) / 2;",
        "    if (arr[mid] == target) return mid;",
        "    else if (arr[mid] < target) low = mid + 1;",
        "    else high = mid - 1;",
        "  }",
        "  return -1;",
        "}"
      ]
    },
    javascript: {
      file: "binarySearch.js",
      lines: [
        "function binarySearch(arr, target) {",
        "  let low = 0, high = arr.length - 1;",
        "  while (low <= high) {",
        "    const mid = Math.floor((low + high) / 2);",
        "    if (arr[mid] === target) return mid;",
        "    else if (arr[mid] < target) low = mid + 1;",
        "    else high = mid - 1;",
        "  }",
        "  return -1;",
        "}"
      ]
    }
  },

  // 11. BFS Graph
  bfs: {
    java: {
      file: "BFS.java",
      lines: [
        "void bfs(int start, List<List<Integer>> adj) {",
        "  boolean[] visited = new boolean[adj.size()];",
        "  Queue<Integer> q = new LinkedList<>();",
        "  visited[start] = true; q.add(start);",
        "  while (!q.isEmpty()) {",
        "    int u = q.poll(); visit(u);",
        "    for (int v : adj.get(u)) {",
        "      if (!visited[v]) { visited[v] = true; q.add(v); }",
        "    }",
        "  }",
        "}"
      ]
    },
    python: {
      file: "bfs.py",
      lines: [
        "def bfs(start, adj):",
        "    visited = {start}",
        "    queue = deque([start])",
        "    while queue:",
        "        u = queue.popleft()",
        "        visit(u)",
        "        for v in adj[u]:",
        "            if v not in visited:",
        "                visited.add(v)",
        "                queue.append(v)"
      ]
    },
    cpp: {
      file: "bfs.cpp",
      lines: [
        "void bfs(int start, const vector<vector<int>>& adj) {",
        "  vector<bool> visited(adj.size(), false);",
        "  queue<int> q; visited[start] = true; q.push(start);",
        "  while (!q.empty()) {",
        "    int u = q.front(); q.pop(); visit(u);",
        "    for (int v : adj[u]) {",
        "      if (!visited[v]) { visited[v] = true; q.push(v); }",
        "    }",
        "  }",
        "}"
      ]
    },
    javascript: {
      file: "bfs.js",
      lines: [
        "function bfs(start, adj) {",
        "  const visited = new Set([start]);",
        "  const queue = [start];",
        "  while (queue.length > 0) {",
        "    const u = queue.shift(); visit(u);",
        "    for (const v of adj[u]) {",
        "      if (!visited.has(v)) { visited.add(v); queue.push(v); }",
        "    }",
        "  }",
        "}"
      ]
    }
  },

  // 12. DFS Graph
  dfs: {
    java: {
      file: "DFS.java",
      lines: [
        "void dfs(int u, boolean[] visited, List<List<Integer>> adj) {",
        "  visited[u] = true; visit(u);",
        "  for (int v : adj.get(u)) {",
        "    if (!visited[v]) dfs(v, visited, adj);",
        "  }",
        "}"
      ]
    },
    python: {
      file: "dfs.py",
      lines: [
        "def dfs(u, visited, adj):",
        "    visited.add(u)",
        "    visit(u)",
        "    for v in adj[u]:",
        "        if v not in visited:",
        "            dfs(v, visited, adj)"
      ]
    },
    cpp: {
      file: "dfs.cpp",
      lines: [
        "void dfs(int u, vector<bool>& visited, const vector<vector<int>>& adj) {",
        "  visited[u] = true; visit(u);",
        "  for (int v : adj[u]) {",
        "    if (!visited[v]) dfs(v, visited, adj);",
        "  }",
        "}"
      ]
    },
    javascript: {
      file: "dfs.js",
      lines: [
        "function dfs(u, visited, adj) {",
        "  visited.add(u); visit(u);",
        "  for (const v of adj[u]) {",
        "    if (!visited.has(v)) dfs(v, visited, adj);",
        "  }",
        "}"
      ]
    }
  },

  // 13. Dijkstra
  dijkstra: {
    java: {
      file: "Dijkstra.java",
      lines: [
        "int[] dijkstra(int start, List<List<Edge>> adj) {",
        "  int[] dist = new int[adj.size()]; Arrays.fill(dist, INF);",
        "  PriorityQueue<Node> pq = new PriorityQueue<>();",
        "  dist[start] = 0; pq.add(new Node(start, 0));",
        "  while (!pq.isEmpty()) {",
        "    Node curr = pq.poll();",
        "    for (Edge e : adj.get(curr.id)) {",
        "      if (dist[curr.id] + e.w < dist[e.to]) {",
        "        dist[e.to] = dist[curr.id] + e.w;",
        "        pq.add(new Node(e.to, dist[e.to]));",
        "      }",
        "    }",
        "  }",
        "  return dist;",
        "}"
      ]
    },
    python: {
      file: "dijkstra.py",
      lines: [
        "def dijkstra(start, adj):",
        "    dist = {i: float('inf') for i in adj}",
        "    dist[start] = 0",
        "    pq = [(0, start)]",
        "    while pq:",
        "        d, u = heapq.heappop(pq)",
        "        if d > dist[u]: continue",
        "        for v, weight in adj[u]:",
        "            if dist[u] + weight < dist[v]:",
        "                dist[v] = dist[u] + weight",
        "                heapq.heappush(pq, (dist[v], v))",
        "    return dist"
      ]
    },
    cpp: {
      file: "dijkstra.cpp",
      lines: [
        "vector<int> dijkstra(int start, const vector<vector<pair<int,int>>>& adj) {",
        "  vector<int> dist(adj.size(), 1e9); dist[start] = 0;",
        "  priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;",
        "  pq.push({0, start});",
        "  while (!pq.empty()) {",
        "    auto [d, u] = pq.top(); pq.pop();",
        "    for (auto& [v, w] : adj[u]) {",
        "      if (dist[u] + w < dist[v]) {",
        "        dist[v] = dist[u] + w;",
        "        pq.push({dist[v], v});",
        "      }",
        "    }",
        "  }",
        "  return dist;",
        "}"
      ]
    },
    javascript: {
      file: "dijkstra.js",
      lines: [
        "function dijkstra(start, adj) {",
        "  const dist = Array(adj.length).fill(Infinity);",
        "  dist[start] = 0;",
        "  const pq = new PriorityQueue(); pq.enqueue(start, 0);",
        "  while (!pq.isEmpty()) {",
        "    const { element: u } = pq.dequeue();",
        "    for (const [v, weight] of adj[u]) {",
        "      if (dist[u] + weight < dist[v]) {",
        "        dist[v] = dist[u] + weight;",
        "        pq.enqueue(v, dist[v]);",
        "      }",
        "    }",
        "  }",
        "  return dist;",
        "}"
      ]
    }
  },

  // 14. Kruskal's MST
  kruskal: {
    java: {
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
      ]
    },
    python: {
      file: "kruskal.py",
      lines: [
        "def kruskal(edges, V):",
        "    edges.sort(key=lambda e: e.weight)",
        "    dsu = DisjointSet(V)",
        "    mst_weight, count = 0, 0",
        "    for u, v, weight in edges:",
        "        if dsu.union(u, v):",
        "            mst_weight += weight",
        "            count += 1",
        "            if count == V - 1: break",
        "    return mst_weight"
      ]
    },
    cpp: {
      file: "kruskal.cpp",
      lines: [
        "int kruskalMST(vector<Edge>& edges, int V) {",
        "  sort(edges.begin(), edges.end());",
        "  DisjointSet dsu(V);",
        "  int mstWeight = 0, count = 0;",
        "  for (const auto& e : edges) {",
        "    if (dsu.unite(e.u, e.v)) {",
        "      mstWeight += e.weight;",
        "      if (++count == V - 1) break;",
        "    }",
        "  }",
        "  return mstWeight;",
        "}"
      ]
    },
    javascript: {
      file: "kruskal.js",
      lines: [
        "function kruskalMST(edges, V) {",
        "  edges.sort((a, b) => a.weight - b.weight);",
        "  const dsu = new DisjointSet(V);",
        "  let mstWeight = 0, count = 0;",
        "  for (const e of edges) {",
        "    if (dsu.union(e.u, e.v)) {",
        "      mstWeight += e.weight;",
        "      if (++count === V - 1) break;",
        "    }",
        "  }",
        "  return mstWeight;",
        "}"
      ]
    }
  },

  // 15. Topological Sort
  topoSort: {
    java: {
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
        "  return order;",
        "}"
      ]
    },
    python: {
      file: "topological_sort.py",
      lines: [
        "def topo_sort(V, adj):",
        "    in_degree = [0] * V",
        "    for u in range(V):",
        "        for v in adj[u]: in_degree[v] += 1",
        "    q = deque([i for i in range(V) if in_degree[i] == 0])",
        "    order = []",
        "    while q:",
        "        u = q.popleft(); order.append(u)",
        "        for v in adj[u]:",
        "            in_degree[v] -= 1",
        "            if in_degree[v] == 0: q.append(v)",
        "    return order"
      ]
    },
    cpp: {
      file: "topological_sort.cpp",
      lines: [
        "vector<int> topoSort(int V, const vector<vector<int>>& adj) {",
        "  vector<int> inDegree(V, 0);",
        "  for (int u = 0; u < V; u++) for (int v : adj[u]) inDegree[v]++;",
        "  queue<int> q;",
        "  for (int i = 0; i < V; i++) if (inDegree[i] == 0) q.push(i);",
        "  vector<int> order;",
        "  while (!q.empty()) {",
        "    int u = q.front(); q.pop(); order.push_back(u);",
        "    for (int v : adj[u]) if (--inDegree[v] == 0) q.push(v);",
        "  }",
        "  return order;",
        "}"
      ]
    },
    javascript: {
      file: "topologicalSort.js",
      lines: [
        "function topoSort(V, adj) {",
        "  const inDegree = Array(V).fill(0);",
        "  for (let u = 0; u < V; u++) for (const v of adj[u]) inDegree[v]++;",
        "  const q = [];",
        "  for (let i = 0; i < V; i++) if (inDegree[i] === 0) q.push(i);",
        "  const order = [];",
        "  while (q.length > 0) {",
        "    const u = q.shift(); order.push(u);",
        "    for (const v of adj[u]) if (--inDegree[v] === 0) q.push(v);",
        "  }",
        "  return order;",
        "}"
      ]
    }
  },

  // 16. 0/1 Knapsack
  knapsack01: {
    java: {
      file: "Knapsack.java",
      lines: [
        "int knapsack(int W, int[] wt, int[] val, int n) {",
        "  int[][] dp = new int[n + 1][W + 1];",
        "  for (int i = 1; i <= n; i++) {",
        "    for (int w = 0; w <= W; w++) {",
        "      if (wt[i - 1] <= w)",
        "        dp[i][w] = Math.max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);",
        "      else dp[i][w] = dp[i - 1][w];",
        "    }",
        "  }",
        "  return dp[n][W];",
        "}"
      ]
    },
    python: {
      file: "knapsack.py",
      lines: [
        "def knapsack(W, wt, val, n):",
        "    dp = [[0] * (W + 1) for _ in range(n + 1)]",
        "    for i in range(1, n + 1):",
        "        for w in range(W + 1):",
        "            if wt[i - 1] <= w:",
        "                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w])",
        "            else: dp[i][w] = dp[i - 1][w]",
        "    return dp[n][W]"
      ]
    },
    cpp: {
      file: "knapsack.cpp",
      lines: [
        "int knapsack(int W, const vector<int>& wt, const vector<int>& val, int n) {",
        "  vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));",
        "  for (int i = 1; i <= n; i++) {",
        "    for (int w = 0; w <= W; w++) {",
        "      if (wt[i - 1] <= w)",
        "        dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);",
        "      else dp[i][w] = dp[i - 1][w];",
        "    }",
        "  }",
        "  return dp[n][W];",
        "}"
      ]
    },
    javascript: {
      file: "knapsack.js",
      lines: [
        "function knapsack(W, wt, val, n) {",
        "  const dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));",
        "  for (let i = 1; i <= n; i++) {",
        "    for (let w = 0; w <= W; w++) {",
        "      if (wt[i - 1] <= w)",
        "        dp[i][w] = Math.max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);",
        "      else dp[i][w] = dp[i - 1][w];",
        "    }",
        "  }",
        "  return dp[n][W];",
        "}"
      ]
    }
  },

  // 17. LCS
  lcs: {
    java: {
      file: "LCS.java",
      lines: [
        "int lcs(String s1, String s2) {",
        "  int m = s1.length(), n = s2.length();",
        "  int[][] dp = new int[m + 1][n + 1];",
        "  for (int i = 1; i <= m; i++) {",
        "    for (int j = 1; j <= n; j++) {",
        "      if (s1.charAt(i - 1) == s2.charAt(j - 1))",
        "        dp[i][j] = 1 + dp[i - 1][j - 1];",
        "      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);",
        "    }",
        "  }",
        "  return dp[m][n];",
        "}"
      ]
    },
    python: {
      file: "lcs.py",
      lines: [
        "def lcs(s1, s2):",
        "    m, n = len(s1), len(s2)",
        "    dp = [[0] * (n + 1) for _ in range(m + 1)]",
        "    for i in range(1, m + 1):",
        "        for j in range(1, n + 1):",
        "            if s1[i - 1] == s2[j - 1]:",
        "                dp[i][j] = 1 + dp[i - 1][j - 1]",
        "            else:",
        "                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])",
        "    return dp[m][n]"
      ]
    },
    cpp: {
      file: "lcs.cpp",
      lines: [
        "int lcs(string s1, string s2) {",
        "  int m = s1.length(), n = s2.length();",
        "  vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));",
        "  for (int i = 1; i <= m; i++) {",
        "    for (int j = 1; j <= n; j++) {",
        "      if (s1[i - 1] == s2[j - 1])",
        "        dp[i][j] = 1 + dp[i - 1][j - 1];",
        "      else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);",
        "    }",
        "  }",
        "  return dp[m][n];",
        "}"
      ]
    },
    javascript: {
      file: "lcs.js",
      lines: [
        "function lcs(s1, s2) {",
        "  const m = s1.length, n = s2.length;",
        "  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));",
        "  for (let i = 1; i <= m; i++) {",
        "    for (let j = 1; j <= n; j++) {",
        "      if (s1[i - 1] === s2[j - 1])",
        "        dp[i][j] = 1 + dp[i - 1][j - 1];",
        "      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);",
        "    }",
        "  }",
        "  return dp[m][n];",
        "}"
      ]
    }
  },

  // 18. Coin Change
  coinChange: {
    java: {
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
      ]
    },
    python: {
      file: "coin_change.py",
      lines: [
        "def coin_change(coins, amount):",
        "    dp = [float('inf')] * (amount + 1)",
        "    dp[0] = 0",
        "    for coin in coins:",
        "        for a in range(coin, amount + 1):",
        "            dp[a] = min(dp[a], 1 + dp[a - coin])",
        "    return dp[amount] if dp[amount] != float('inf') else -1"
      ]
    },
    cpp: {
      file: "coin_change.cpp",
      lines: [
        "int coinChange(vector<int>& coins, int amount) {",
        "  vector<int> dp(amount + 1, amount + 1);",
        "  dp[0] = 0;",
        "  for (int coin : coins) {",
        "    for (int a = coin; a <= amount; a++) {",
        "      dp[a] = min(dp[a], 1 + dp[a - coin]);",
        "    }",
        "  }",
        "  return dp[amount] > amount ? -1 : dp[amount];",
        "}"
      ]
    },
    javascript: {
      file: "coinChange.js",
      lines: [
        "function coinChange(coins, amount) {",
        "  const dp = Array(amount + 1).fill(Infinity);",
        "  dp[0] = 0;",
        "  for (const coin of coins) {",
        "    for (let a = coin; a <= amount; a++) {",
        "      dp[a] = Math.min(dp[a], 1 + dp[a - coin]);",
        "    }",
        "  }",
        "  return dp[amount] === Infinity ? -1 : dp[amount];",
        "}"
      ]
    }
  },

  // 19. Edit Distance
  editDistance: {
    java: {
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
      ]
    },
    python: {
      file: "edit_distance.py",
      lines: [
        "def min_distance(s1, s2):",
        "    m, n = len(s1), len(s2)",
        "    dp = [[0] * (n + 1) for _ in range(m + 1)]",
        "    for i in range(m + 1): dp[i][0] = i",
        "    for j in range(n + 1): dp[0][j] = j",
        "    for i in range(1, m + 1):",
        "        for j in range(1, n + 1):",
        "            if s1[i - 1] == s2[j - 1]: dp[i][j] = dp[i - 1][j - 1]",
        "            else: dp[i][j] = 1 + min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1])",
        "    return dp[m][n]"
      ]
    },
    cpp: {
      file: "edit_distance.cpp",
      lines: [
        "int minDistance(string s1, string s2) {",
        "  int m = s1.length(), n = s2.length();",
        "  vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));",
        "  for (int i = 0; i <= m; i++) dp[i][0] = i;",
        "  for (int j = 0; j <= n; j++) dp[0][j] = j;",
        "  for (int i = 1; i <= m; i++) {",
        "    for (int j = 1; j <= n; j++) {",
        "      if (s1[i - 1] == s2[j - 1]) dp[i][j] = dp[i - 1][j - 1];",
        "      else dp[i][j] = 1 + min({dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]});",
        "    }",
        "  }",
        "  return dp[m][n];",
        "}"
      ]
    },
    javascript: {
      file: "editDistance.js",
      lines: [
        "function minDistance(s1, s2) {",
        "  const m = s1.length, n = s2.length;",
        "  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));",
        "  for (let i = 0; i <= m; i++) dp[i][0] = i;",
        "  for (let j = 0; j <= n; j++) dp[0][j] = j;",
        "  for (let i = 1; i <= m; i++) {",
        "    for (let j = 1; j <= n; j++) {",
        "      if (s1[i - 1] === s2[j - 1]) dp[i][j] = dp[i - 1][j - 1];",
        "      else dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);",
        "    }",
        "  }",
        "  return dp[m][n];",
        "}"
      ]
    }
  },

  // 20. N-Queens
  nqueens: {
    java: {
      file: "NQueens.java",
      lines: [
        "boolean solveNQueens(int[][] board, int col) {",
        "  if (col >= N) return true;",
        "  for (int i = 0; i < N; i++) {",
        "    if (isSafe(board, i, col)) {",
        "      board[i][col] = 1;",
        "      if (solveNQueens(board, col + 1)) return true;",
        "      board[i][col] = 0; // Backtrack",
        "    }",
        "  }",
        "  return false;",
        "}"
      ]
    },
    python: {
      file: "n_queens.py",
      lines: [
        "def solve_nqueens(board, col):",
        "    if col >= N: return True",
        "    for i in range(N):",
        "        if is_safe(board, i, col):",
        "            board[i][col] = 1",
        "            if solve_nqueens(board, col + 1): return True",
        "            board[i][col] = 0  # Backtrack",
        "    return False"
      ]
    },
    cpp: {
      file: "n_queens.cpp",
      lines: [
        "bool solveNQueens(vector<vector<int>>& board, int col) {",
        "  if (col >= N) return true;",
        "  for (int i = 0; i < N; i++) {",
        "    if (isSafe(board, i, col)) {",
        "      board[i][col] = 1;",
        "      if (solveNQueens(board, col + 1)) return true;",
        "      board[i][col] = 0; // Backtrack",
        "    }",
        "  }",
        "  return false;",
        "}"
      ]
    },
    javascript: {
      file: "nQueens.js",
      lines: [
        "function solveNQueens(board, col) {",
        "  if (col >= N) return true;",
        "  for (let i = 0; i < N; i++) {",
        "    if (isSafe(board, i, col)) {",
        "      board[i][col] = 1;",
        "      if (solveNQueens(board, col + 1)) return true;",
        "      board[i][col] = 0; // Backtrack",
        "    }",
        "  }",
        "  return false;",
        "}"
      ]
    }
  },

  // 21. Fractional Knapsack
  fractionalKnapsack: {
    java: {
      file: "FractionalKnapsack.java",
      lines: [
        "double getMaxValue(Item[] items, int capacity) {",
        "  Arrays.sort(items, (a, b) -> Double.compare(b.ratio, a.ratio));",
        "  double totalVal = 0;",
        "  for (Item item : items) {",
        "    if (capacity >= item.wt) {",
        "      capacity -= item.wt; totalVal += item.val;",
        "    } else {",
        "      totalVal += item.val * ((double) capacity / item.wt); break;",
        "    }",
        "  }",
        "  return totalVal;",
        "}"
      ]
    },
    python: {
      file: "fractional_knapsack.py",
      lines: [
        "def get_max_value(items, capacity):",
        "    items.sort(key=lambda x: x.val / x.wt, reverse=True)",
        "    total_val = 0.0",
        "    for item in items:",
        "        if capacity >= item.wt:",
        "            capacity -= item.wt",
        "            total_val += item.val",
        "        else:",
        "            total_val += item.val * (capacity / item.wt)",
        "            break",
        "    return total_val"
      ]
    },
    cpp: {
      file: "fractional_knapsack.cpp",
      lines: [
        "double getMaxValue(vector<Item>& items, int capacity) {",
        "  sort(items.begin(), items.end(), [](auto& a, auto& b) {",
        "    return (double)a.val / a.wt > (double)b.val / b.wt;",
        "  });",
        "  double totalVal = 0.0;",
        "  for (auto& item : items) {",
        "    if (capacity >= item.wt) {",
        "      capacity -= item.wt; totalVal += item.val;",
        "    } else {",
        "      totalVal += item.val * ((double)capacity / item.wt); break;",
        "    }",
        "  }",
        "  return totalVal;",
        "}"
      ]
    },
    javascript: {
      file: "fractionalKnapsack.js",
      lines: [
        "function getMaxValue(items, capacity) {",
        "  items.sort((a, b) => (b.val / b.wt) - (a.val / a.wt));",
        "  let totalVal = 0;",
        "  for (const item of items) {",
        "    if (capacity >= item.wt) {",
        "      capacity -= item.wt; totalVal += item.val;",
        "    } else {",
        "      totalVal += item.val * (capacity / item.wt); break;",
        "    }",
        "  }",
        "  return totalVal;",
        "}"
      ]
    }
  },

  // 22. Binary Search Tree
  bst: {
    java: {
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
      ]
    },
    python: {
      file: "bst.py",
      lines: [
        "def insert(root, val):",
        "    if not root: return TreeNode(val)",
        "    if val < root.val: root.left = insert(root.left, val)",
        "    elif val > root.val: root.right = insert(root.right, val)",
        "    return root",
        "",
        "def inorder(root):",
        "    if not root: return",
        "    inorder(root.left)",
        "    visit(root)",
        "    inorder(root.right)"
      ]
    },
    cpp: {
      file: "bst.cpp",
      lines: [
        "Node* insert(Node* root, int val) {",
        "  if (!root) return new Node(val);",
        "  if (val < root->val) root->left = insert(root->left, val);",
        "  else if (val > root->val) root->right = insert(root->right, val);",
        "  return root;",
        "}",
        "void inorder(Node* root) {",
        "  if (!root) return;",
        "  inorder(root->left); visit(root); inorder(root->right);",
        "}"
      ]
    },
    javascript: {
      file: "bst.js",
      lines: [
        "function insert(root, val) {",
        "  if (!root) return new TreeNode(val);",
        "  if (val < root.val) root.left = insert(root.left, val);",
        "  else if (val > root.val) root.right = insert(root.right, val);",
        "  return root;",
        "}",
        "function inorder(root) {",
        "  if (!root) return;",
        "  inorder(root.left); visit(root); inorder(root.right);",
        "}"
      ]
    }
  },

  // 23. Tree Traversals
  treeTraversals: {
    java: {
      file: "TreeTraversals.java",
      lines: [
        "void preOrder(Node root) {",
        "  if (root == null) return;",
        "  visit(root); preOrder(root.left); preOrder(root.right);",
        "}",
        "void postOrder(Node root) {",
        "  if (root == null) return;",
        "  postOrder(root.left); postOrder(root.right); visit(root);",
        "}",
        "void levelOrder(Node root) {",
        "  Queue<Node> q = new LinkedList<>(); q.add(root);",
        "  while (!q.isEmpty()) {",
        "    Node curr = q.poll(); visit(curr);",
        "    if (curr.left != null) q.add(curr.left);",
        "    if (curr.right != null) q.add(curr.right);",
        "  }",
        "}"
      ]
    },
    python: {
      file: "tree_traversals.py",
      lines: [
        "def pre_order(root):",
        "    if not root: return",
        "    visit(root); pre_order(root.left); pre_order(root.right)",
        "",
        "def post_order(root):",
        "    if not root: return",
        "    post_order(root.left); post_order(root.right); visit(root)",
        "",
        "def level_order(root):",
        "    q = deque([root]) if root else deque()",
        "    while q:",
        "        curr = q.popleft(); visit(curr)",
        "        if curr.left: q.append(curr.left)",
        "        if curr.right: q.append(curr.right)"
      ]
    },
    cpp: {
      file: "tree_traversals.cpp",
      lines: [
        "void preOrder(Node* root) {",
        "  if (!root) return;",
        "  visit(root); preOrder(root->left); preOrder(root->right);",
        "}",
        "void postOrder(Node* root) {",
        "  if (!root) return;",
        "  postOrder(root->left); postOrder(root->right); visit(root);",
        "}",
        "void levelOrder(Node* root) {",
        "  queue<Node*> q; if (root) q.push(root);",
        "  while (!q.empty()) {",
        "    Node* curr = q.front(); q.pop(); visit(curr);",
        "    if (curr->left) q.push(curr->left);",
        "    if (curr->right) q.push(curr->right);",
        "  }",
        "}"
      ]
    },
    javascript: {
      file: "treeTraversals.js",
      lines: [
        "function preOrder(root) {",
        "  if (!root) return;",
        "  visit(root); preOrder(root.left); preOrder(root.right);",
        "}",
        "function postOrder(root) {",
        "  if (!root) return;",
        "  postOrder(root.left); postOrder(root.right); visit(root);",
        "}",
        "function levelOrder(root) {",
        "  const q = root ? [root] : [];",
        "  while (q.length > 0) {",
        "    const curr = q.shift(); visit(curr);",
        "    if (curr.left) q.push(curr.left);",
        "    if (curr.right) q.push(curr.right);",
        "  }",
        "}"
      ]
    }
  },

  // 24. Binary Min-Heap
  minHeap: {
    java: {
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
      ]
    },
    python: {
      file: "min_heap.py",
      lines: [
        "def insert(val):",
        "    heap.append(val); sift_up(len(heap) - 1)",
        "",
        "def sift_up(i):",
        "    while i > 0 and heap[i] < heap[(i - 1) // 2]:",
        "        p = (i - 1) // 2",
        "        heap[i], heap[p] = heap[p], heap[i]; i = p",
        "",
        "def extract_min():",
        "    min_val = heap[0]; heap[0] = heap.pop()",
        "    sift_down(0); return min_val"
      ]
    },
    cpp: {
      file: "min_heap.cpp",
      lines: [
        "void insert(int val) {",
        "  heap.push_back(val); siftUp(heap.size() - 1);",
        "}",
        "void siftUp(int i) {",
        "  while (i > 0 && heap[i] < heap[(i - 1) / 2]) {",
        "    swap(heap[i], heap[(i - 1) / 2]); i = (i - 1) / 2;",
        "  }",
        "}",
        "int extractMin() {",
        "  int minVal = heap[0]; heap[0] = heap.back(); heap.pop_back();",
        "  siftDown(0); return minVal;",
        "}"
      ]
    },
    javascript: {
      file: "minHeap.js",
      lines: [
        "function insert(val) {",
        "  heap.push(val); siftUp(heap.length - 1);",
        "}",
        "function siftUp(i) {",
        "  while (i > 0 && heap[i] < heap[Math.floor((i - 1) / 2)]) {",
        "    const p = Math.floor((i - 1) / 2);",
        "    [heap[i], heap[p]] = [heap[p], heap[i]]; i = p;",
        "  }",
        "}",
        "function extractMin() {",
        "  const minVal = heap[0]; heap[0] = heap.pop();",
        "  siftDown(0); return minVal;",
        "}"
      ]
    }
  },

  // 25. LL Insert
  llInsert: {
    java: {
      file: "LinkedListInsert.java",
      lines: [
        "// Insert at head of linked list",
        "Node newNode = new Node(val);",
        "newNode.next = head;",
        "head = newNode;",
        "// Head pointer updated"
      ]
    },
    python: {
      file: "linked_list_insert.py",
      lines: [
        "# Insert at head of linked list",
        "new_node = ListNode(val)",
        "new_node.next = head",
        "head = new_node",
        "# Head pointer updated"
      ]
    },
    cpp: {
      file: "linked_list_insert.cpp",
      lines: [
        "// Insert at head of linked list",
        "ListNode* newNode = new ListNode(val);",
        "newNode->next = head;",
        "head = newNode;",
        "// Head pointer updated"
      ]
    },
    javascript: {
      file: "linkedListInsert.js",
      lines: [
        "// Insert at head of linked list",
        "const newNode = new ListNode(val);",
        "newNode.next = head;",
        "head = newNode;",
        "// Head pointer updated"
      ]
    }
  },

  // 26. LL Delete
  llDelete: {
    java: {
      file: "LinkedListDelete.java",
      lines: [
        "// Delete target node from linked list",
        "if (head.val == target) { head = head.next; return; }",
        "Node curr = head;",
        "while (curr.next != null && curr.next.val != target) curr = curr.next;",
        "if (curr.next != null) curr.next = curr.next.next;"
      ]
    },
    python: {
      file: "linked_list_delete.py",
      lines: [
        "# Delete target node from linked list",
        "if head and head.val == target: return head.next",
        "curr = head",
        "while curr and curr.next and curr.next.val != target: curr = curr.next",
        "if curr and curr.next: curr.next = curr.next.next"
      ]
    },
    cpp: {
      file: "linked_list_delete.cpp",
      lines: [
        "// Delete target node from linked list",
        "if (head->val == target) { head = head->next; return; }",
        "ListNode* curr = head;",
        "while (curr->next && curr->next->val != target) curr = curr->next;",
        "if (curr->next) curr->next = curr->next->next;"
      ]
    },
    javascript: {
      file: "linkedListDelete.js",
      lines: [
        "// Delete target node from linked list",
        "if (head.val === target) { head = head.next; return; }",
        "let curr = head;",
        "while (curr.next && curr.next.val !== target) curr = curr.next;",
        "if (curr.next) curr.next = curr.next.next;"
      ]
    }
  },

  // 27. LL Reverse
  llReverse: {
    java: {
      file: "LinkedListReverse.java",
      lines: [
        "Node reverseList(Node head) {",
        "  Node prev = null, curr = head;",
        "  while (curr != null) {",
        "    Node nextTemp = curr.next;",
        "    curr.next = prev;",
        "    prev = curr;",
        "    curr = nextTemp;",
        "  }",
        "  return prev;",
        "}"
      ]
    },
    python: {
      file: "linked_list_reverse.py",
      lines: [
        "def reverse_list(head):",
        "    prev, curr = None, head",
        "    while curr:",
        "        next_temp = curr.next",
        "        curr.next = prev",
        "        prev = curr",
        "        curr = next_temp",
        "    return prev"
      ]
    },
    cpp: {
      file: "linked_list_reverse.cpp",
      lines: [
        "ListNode* reverseList(ListNode* head) {",
        "  ListNode *prev = nullptr, *curr = head;",
        "  while (curr) {",
        "    ListNode* nextTemp = curr->next;",
        "    curr->next = prev;",
        "    prev = curr;",
        "    curr = nextTemp;",
        "  }",
        "  return prev;",
        "}"
      ]
    },
    javascript: {
      file: "linkedListReverse.js",
      lines: [
        "function reverseList(head) {",
        "  let prev = null, curr = head;",
        "  while (curr) {",
        "    const nextTemp = curr.next;",
        "    curr.next = prev;",
        "    prev = curr;",
        "    curr = nextTemp;",
        "  }",
        "  return prev;",
        "}"
      ]
    }
  },

  // 28. LL Cycle Detect
  llCycleDetect: {
    java: {
      file: "LinkedListCycle.java",
      lines: [
        "boolean hasCycle(Node head) {",
        "  Node slow = head, fast = head;",
        "  while (fast != null && fast.next != null) {",
        "    slow = slow.next; fast = fast.next.next;",
        "    if (slow == fast) return true; // Cycle detected",
        "  }",
        "  return false;",
        "}"
      ]
    },
    python: {
      file: "linked_list_cycle.py",
      lines: [
        "def has_cycle(head):",
        "    slow = fast = head",
        "    while fast and fast.next:",
        "        slow = slow.next",
        "        fast = fast.next.next",
        "        if slow == fast: return True",
        "    return False"
      ]
    },
    cpp: {
      file: "linked_list_cycle.cpp",
      lines: [
        "bool hasCycle(ListNode *head) {",
        "  ListNode *slow = head, *fast = head;",
        "  while (fast && fast->next) {",
        "    slow = slow->next; fast = fast->next->next;",
        "    if (slow == fast) return true;",
        "  }",
        "  return false;",
        "}"
      ]
    },
    javascript: {
      file: "linkedListCycle.js",
      lines: [
        "function hasCycle(head) {",
        "  let slow = head, fast = head;",
        "  while (fast && fast.next) {",
        "    slow = slow.next; fast = fast.next.next;",
        "    if (slow === fast) return true;",
        "  }",
        "  return false;",
        "}"
      ]
    }
  },

  // 29. Hash Table Chaining
  htChaining: {
    java: {
      file: "HashTableChaining.java",
      lines: [
        "void put(int key, int val) {",
        "  int bucket = hash(key) % capacity;",
        "  LinkedList<Entry> chain = table[bucket];",
        "  for (Entry e : chain) if (e.key == key) { e.val = val; return; }",
        "  chain.add(new Entry(key, val));",
        "}"
      ]
    },
    python: {
      file: "hash_table_chaining.py",
      lines: [
        "def put(key, val):",
        "    bucket = hash(key) % capacity",
        "    chain = table[bucket]",
        "    for entry in chain:",
        "        if entry.key == key: entry.val = val; return",
        "    chain.append(Entry(key, val))"
      ]
    },
    cpp: {
      file: "hash_table_chaining.cpp",
      lines: [
        "void put(int key, int val) {",
        "  int bucket = hash(key) % capacity;",
        "  for (auto& entry : table[bucket]) {",
        "    if (entry.key == key) { entry.val = val; return; }",
        "  }",
        "  table[bucket].push_back({key, val});",
        "}"
      ]
    },
    javascript: {
      file: "hashTableChaining.js",
      lines: [
        "function put(key, val) {",
        "  const bucket = hash(key) % capacity;",
        "  const chain = table[bucket];",
        "  for (const entry of chain) {",
        "    if (entry.key === key) { entry.val = val; return; }",
        "  }",
        "  chain.push({ key, val });",
        "}"
      ]
    }
  },

  // 30. Hash Table Linear Probing
  htLinearProbing: {
    java: {
      file: "HashTableProbing.java",
      lines: [
        "void put(int key, int val) {",
        "  int idx = hash(key) % capacity;",
        "  while (table[idx] != null && table[idx].key != key) {",
        "    idx = (idx + 1) % capacity; // Linear probe",
        "  }",
        "  table[idx] = new Entry(key, val);",
        "}"
      ]
    },
    python: {
      file: "hash_table_probing.py",
      lines: [
        "def put(key, val):",
        "    idx = hash(key) % capacity",
        "    while table[idx] is not None and table[idx].key != key:",
        "        idx = (idx + 1) % capacity  # Linear probe",
        "    table[idx] = Entry(key, val)"
      ]
    },
    cpp: {
      file: "hash_table_probing.cpp",
      lines: [
        "void put(int key, int val) {",
        "  int idx = hash(key) % capacity;",
        "  while (occupied[idx] && table[idx].key != key) {",
        "    idx = (idx + 1) % capacity; // Linear probe",
        "  }",
        "  table[idx] = {key, val}; occupied[idx] = true;",
        "}"
      ]
    },
    javascript: {
      file: "hashTableProbing.js",
      lines: [
        "function put(key, val) {",
        "  let idx = hash(key) % capacity;",
        "  while (table[idx] !== null && table[idx].key !== key) {",
        "    idx = (idx + 1) % capacity; // Linear probe",
        "  }",
        "  table[idx] = { key, val };",
        "}"
      ]
    }
  }
};

export function getAlgorithmCode(algoKey, lang = "java", fallback = null) {
  const algoEntry = ALGORITHM_CODE_DATA[algoKey];
  if (algoEntry && algoEntry[lang]) {
    return algoEntry[lang];
  }
  if (algoEntry && algoEntry.java) {
    return algoEntry.java;
  }
  if (fallback) {
    return { file: fallback.file || `${algoKey}.java`, lines: fallback.lines || [] };
  }
  return { file: `${algoKey}.java`, lines: [] };
}
