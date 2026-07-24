export const DSA_PATTERNS = [
  {
    id: "two-pointers",
    title: "Two Pointers Pattern",
    icon: "👈👉",
    category: "Arrays & Strings",
    difficulty: "Beginner to Intermediate",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    whenToUse: "Use when dealing with sorted arrays/strings and searching for pairs, triplets, or reversing sequences without extra space.",
    keyConcept: "Initialize two pointers (e.g. left at start, right at end) and move them inward or outward based on mathematical conditions.",
    leetCodeProblems: [
      { number: 167, name: "Two Sum II - Input Array Is Sorted", difficulty: "Medium", url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
      { number: 15, name: "3Sum", difficulty: "Medium", url: "https://leetcode.com/problems/3sum/" },
      { number: 125, name: "Valid Palindrome", difficulty: "Easy", url: "https://leetcode.com/problems/valid-palindrome/" },
      { number: 11, name: "Container With Most Water", difficulty: "Medium", url: "https://leetcode.com/problems/container-with-most-water/" }
    ],
    codeSnippet: `int left = 0, right = arr.length - 1;\nwhile (left < right) {\n    int sum = arr[left] + arr[right];\n    if (sum == target) return new int[]{left, right};\n    else if (sum < target) left++;\n    else right--;\n}`
  },
  {
    id: "sliding-window",
    title: "Sliding Window Pattern",
    icon: "🪟",
    category: "Arrays & Substrings",
    difficulty: "Intermediate",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1) / O(K)",
    whenToUse: "Use for problems requiring contiguous subarrays or substrings of fixed size K or dynamic size satisfying a constraint.",
    keyConcept: "Maintain a sliding window range [left...right]. Expand right pointer to add elements, shrink left pointer when constraint is broken.",
    leetCodeProblems: [
      { number: 3, name: "Longest Substring Without Repeating Characters", difficulty: "Medium", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
      { number: 209, name: "Minimum Size Subarray Sum", difficulty: "Medium", url: "https://leetcode.com/problems/minimum-size-subarray-sum/" },
      { number: 904, name: "Fruit Into Baskets", difficulty: "Medium", url: "https://leetcode.com/problems/fruit-into-baskets/" },
      { number: 239, name: "Sliding Window Maximum", difficulty: "Hard", url: "https://leetcode.com/problems/sliding-window-maximum/" }
    ],
    codeSnippet: `int left = 0, maxLen = 0;\nfor (int right = 0; right < s.length(); right++) {\n    windowState.add(s.charAt(right));\n    while (windowState.isInvalid()) {\n        windowState.remove(s.charAt(left++));\n    }\n    maxLen = Math.max(maxLen, right - left + 1);\n}`
  },
  {
    id: "fast-slow-pointers",
    title: "Fast & Slow Pointers (Floyd's Cycle)",
    icon: "🐢🐇",
    category: "Linked Lists & Cycles",
    difficulty: "Easy to Intermediate",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    whenToUse: "Use for detecting cycles in linked lists/arrays, finding middle nodes, or finding cycle entry points.",
    keyConcept: "Move slow pointer by 1 step and fast pointer by 2 steps. If a cycle exists, fast pointer will eventually catch up to slow pointer.",
    leetCodeProblems: [
      { number: 141, name: "Linked List Cycle", difficulty: "Easy", url: "https://leetcode.com/problems/linked-list-cycle/" },
      { number: 287, name: "Find the Duplicate Number", difficulty: "Medium", url: "https://leetcode.com/problems/find-the-duplicate-number/" },
      { number: 876, name: "Middle of the Linked List", difficulty: "Easy", url: "https://leetcode.com/problems/middle-of-the-linked-list/" },
      { number: 202, name: "Happy Number", difficulty: "Easy", url: "https://leetcode.com/problems/happy-number/" }
    ],
    codeSnippet: `ListNode slow = head, fast = head;\nwhile (fast != null && fast.next != null) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow == fast) return true; // Cycle detected!\n}\nreturn false;`
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals Pattern",
    icon: "📅",
    category: "Sorting & Arrays",
    difficulty: "Intermediate",
    timeComplexity: "O(N log N)",
    spaceComplexity: "O(N)",
    whenToUse: "Use when dealing with overlapping intervals, schedule conflicts, or range merging.",
    keyConcept: "Sort intervals by start time. Iterate and merge current interval with previous if current.start <= prev.end.",
    leetCodeProblems: [
      { number: 56, name: "Merge Intervals", difficulty: "Medium", url: "https://leetcode.com/problems/merge-intervals/" },
      { number: 57, name: "Insert Interval", difficulty: "Medium", url: "https://leetcode.com/problems/insert-interval/" },
      { number: 435, name: "Non-overlapping Intervals", difficulty: "Medium", url: "https://leetcode.com/problems/non-overlapping-intervals/" },
      { number: 253, name: "Meeting Rooms II", difficulty: "Medium", url: "https://leetcode.com/problems/meeting-rooms-ii/" }
    ],
    codeSnippet: `Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\nList<int[]> merged = new ArrayList<>();\nfor (int[] interval : intervals) {\n    if (merged.isEmpty() || merged.get(merged.size()-1)[1] < interval[0]) {\n        merged.add(interval);\n    } else {\n        merged.get(merged.size()-1)[1] = Math.max(merged.get(merged.size()-1)[1], interval[1]);\n    }\n}`
  },
  {
    id: "monotonic-stack",
    title: "Monotonic Stack Pattern",
    icon: "🥞",
    category: "Stacks & Arrays",
    difficulty: "Intermediate to Hard",
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    whenToUse: "Use for finding Next Greater Element, Previous Smaller Element, or calculating histogram bounds.",
    keyConcept: "Maintain a stack where elements are strictly increasing or decreasing. Pop items when a new element breaks monotonicity.",
    leetCodeProblems: [
      { number: 496, name: "Next Greater Element I", difficulty: "Easy", url: "https://leetcode.com/problems/next-greater-element-i/" },
      { number: 739, name: "Daily Temperatures", difficulty: "Medium", url: "https://leetcode.com/problems/daily-temperatures/" },
      { number: 84, name: "Largest Rectangle in Histogram", difficulty: "Hard", url: "https://leetcode.com/problems/largest-rectangle-in-histogram/" },
      { number: 42, name: "Trapping Rain Water", difficulty: "Hard", url: "https://leetcode.com/problems/trapping-rain-water/" }
    ],
    codeSnippet: `Stack<Integer> stack = new Stack<>();\nfor (int i = 0; i < nums.length; i++) {\n    while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {\n        int prevIdx = stack.pop();\n        ans[prevIdx] = nums[i];\n    }\n    stack.push(i);\n}`
  },
  {
    id: "top-k-heap",
    title: "Top-K Elements (PriorityQueue)",
    icon: "🏔️",
    category: "Heaps & Data Structures",
    difficulty: "Intermediate",
    timeComplexity: "O(N log K)",
    spaceComplexity: "O(K)",
    whenToUse: "Use when asked to find top K largest/smallest elements, Kth frequent items, or streaming medians.",
    keyConcept: "Maintain a Min-Heap of size K for top largest items (or Max-Heap for top smallest). If heap size > K, pop root.",
    leetCodeProblems: [
      { number: 215, name: "Kth Largest Element in an Array", difficulty: "Medium", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
      { number: 347, name: "Top K Frequent Elements", difficulty: "Medium", url: "https://leetcode.com/problems/top-k-frequent-elements/" },
      { number: 295, name: "Find Median from Data Stream", difficulty: "Hard", url: "https://leetcode.com/problems/find-median-from-data-stream/" },
      { number: 973, name: "K Closest Points to Origin", difficulty: "Medium", url: "https://leetcode.com/problems/k-closest-points-to-origin/" }
    ],
    codeSnippet: `PriorityQueue<Integer> minHeap = new PriorityQueue<>();\nfor (int num : nums) {\n    minHeap.add(num);\n    if (minHeap.size() > k) {\n        minHeap.poll();\n    }\n}\nreturn minHeap.peek();`
  },
  {
    id: "modified-binary-search",
    title: "Modified Binary Search Pattern",
    icon: "🎯",
    category: "Searching & Binary Search",
    difficulty: "Intermediate",
    timeComplexity: "O(log N)",
    spaceComplexity: "O(1)",
    whenToUse: "Use when searching in sorted, rotated sorted arrays, or finding boundary bounds in O(log N) time.",
    keyConcept: "Halve search space based on mid point. In rotated arrays, determine which side (left or right) is monotonically sorted first.",
    leetCodeProblems: [
      { number: 33, name: "Search in Rotated Sorted Array", difficulty: "Medium", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
      { number: 153, name: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
      { number: 34, name: "Find First and Last Position of Element in Sorted Array", difficulty: "Medium", url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/" },
      { number: 74, name: "Search a 2D Matrix", difficulty: "Medium", url: "https://leetcode.com/problems/search-a-2d-matrix/" }
    ],
    codeSnippet: `while (low <= high) {\n    int mid = low + (high - low) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[low] <= nums[mid]) {\n        if (nums[low] <= target && target < nums[mid]) high = mid - 1;\n        else low = mid + 1;\n    } else {\n        if (nums[mid] < target && target <= nums[high]) low = mid + 1;\n        else high = mid - 1;\n    }\n}`
  },
  {
    id: "matrix-bfs-dfs",
    title: "Matrix BFS / DFS Traversal Pattern",
    icon: "🗺️",
    category: "Graphs & Grids",
    difficulty: "Intermediate",
    timeComplexity: "O(M * N)",
    spaceComplexity: "O(M * N)",
    whenToUse: "Use for grid cell exploration, connected island counting, shortest path in maze, or flood fill operations.",
    keyConcept: "Explore 4 directions (up, down, left, right) from (row, col) cell, marking visited cells to avoid infinite loops.",
    leetCodeProblems: [
      { number: 200, name: "Number of Islands", difficulty: "Medium", url: "https://leetcode.com/problems/number-of-islands/" },
      { number: 695, name: "Max Area of Island", difficulty: "Medium", url: "https://leetcode.com/problems/max-area-of-island/" },
      { number: 994, name: "Rotting Oranges", difficulty: "Medium", url: "https://leetcode.com/problems/rotting-oranges/" },
      { number: 417, name: "Pacific Atlantic Water Flow", difficulty: "Medium", url: "https://leetcode.com/problems/pacific-atlantic-water-flow/" }
    ],
    codeSnippet: `void dfs(char[][] grid, int r, int c) {\n    if (r < 0 || r >= R || c < 0 || c >= C || grid[r][c] != '1') return;\n    grid[r][c] = '0'; // Mark visited\n    dfs(grid, r + 1, c); dfs(grid, r - 1, c);\n    dfs(grid, r, c + 1); dfs(grid, r, c - 1);\n}`
  },
  {
    id: "backtracking-state",
    title: "Backtracking & State-Space Tree",
    icon: "🌴",
    category: "Recursion & Trees",
    difficulty: "Intermediate to Hard",
    timeComplexity: "O(2^N) / O(N!)",
    spaceComplexity: "O(N)",
    whenToUse: "Use when finding all possible valid combinations, permutations, subsets, or solving constraint puzzles (N-Queens, Sudoku).",
    keyConcept: "Choose an option, explore recursively, then un-choose (backtrack) to restore state before testing next branch.",
    leetCodeProblems: [
      { number: 78, name: "Subsets", difficulty: "Medium", url: "https://leetcode.com/problems/subsets/" },
      { number: 46, name: "Permutations", difficulty: "Medium", url: "https://leetcode.com/problems/permutations/" },
      { number: 39, name: "Combination Sum", difficulty: "Medium", url: "https://leetcode.com/problems/combination-sum/" },
      { number: 51, name: "N-Queens", difficulty: "Hard", url: "https://leetcode.com/problems/n-queens/" }
    ],
    codeSnippet: `void backtrack(List<List<Integer>> res, List<Integer> curr, int[] nums, int start) {\n    res.add(new ArrayList<>(curr));\n    for (int i = start; i < nums.length; i++) {\n        curr.add(nums[i]);            // Choose\n        backtrack(res, curr, nums, i + 1); // Explore\n        curr.remove(curr.size() - 1); // Un-choose (Backtrack)\n    }\n}`
  },
  {
    id: "dp-knapsack",
    title: "0/1 Knapsack & DP Patterns",
    icon: "🎒",
    category: "Dynamic Programming",
    difficulty: "Hard",
    timeComplexity: "O(N * W)",
    spaceComplexity: "O(N * W)",
    whenToUse: "Use for decision problems with overlapping subproblems where items can either be included (1) or excluded (0).",
    keyConcept: "Build DP table dp[i][w] = max(val + dp[i-1][w-wt], dp[i-1][w]) comparing choice of taking item vs leaving item.",
    leetCodeProblems: [
      { number: 416, name: "Partition Equal Subset Sum", difficulty: "Medium", url: "https://leetcode.com/problems/partition-equal-subset-sum/" },
      { number: 494, name: "Target Sum", difficulty: "Medium", url: "https://leetcode.com/problems/target-sum/" },
      { number: 322, name: "Coin Change", difficulty: "Medium", url: "https://leetcode.com/problems/coin-change/" },
      { number: 1143, name: "Longest Common Subsequence", difficulty: "Medium", url: "https://leetcode.com/problems/longest-common-subsequence/" }
    ],
    codeSnippet: `for (int i = 1; i <= n; i++) {\n    for (int w = 1; w <= W; w++) {\n        if (wt[i-1] <= w)\n            dp[i][w] = Math.max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w]);\n        else dp[i][w] = dp[i-1][w];\n    }\n}`
  }
];
