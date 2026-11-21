// 16. BST Operations Step Generator with Tree Structure
export function generateBST() {
  const values = [50, 30, 70, 20, 40, 60, 80];
  const steps = [];

  class BSTNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }

  let root = null;
  function insert(node, val) {
    if (!node) return new BSTNode(val);
    if (val < node.val) node.left = insert(node.left, val);
    else if (val > node.val) node.right = insert(node.right, val);
    return node;
  }

  // Build tree steps
  values.forEach(v => {
    root = insert(root, v);
    steps.push({ bstRoot: JSON.parse(JSON.stringify(root)), activeVal: v, line: 2, vars: { insertedVal: v }, note: `Inserted node ${v} into Binary Search Tree.` });
  });

  // Inorder Traversal steps
  const inorderVisited = [];
  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    inorderVisited.push(node.val);
    steps.push({ bstRoot: JSON.parse(JSON.stringify(root)), activeVal: node.val, visitedList: [...inorderVisited], line: 9, vars: { currentNode: node.val, visitedList: `[${inorderVisited.join(", ")}]` }, note: `Inorder traversal visiting node ${node.val}` });
    inorder(node.right);
  }
  inorder(root);

  steps.push({ bstRoot: JSON.parse(JSON.stringify(root)), activeVal: null, visitedList: [...inorderVisited], line: 10, vars: { result: `[${inorderVisited.join(", ")}]` }, note: `BST Inorder traversal completed! Sorted output: [${inorderVisited.join(", ")}]` });
  return steps;
}

// Helper to convert an array representation of a binary heap into a binary tree object for visualization
function arrayToBinaryTree(arr, idx = 0) {
  if (idx >= arr.length || arr[idx] === null || arr[idx] === undefined) return null;
  return {
    val: arr[idx],
    left: arrayToBinaryTree(arr, 2 * idx + 1),
    right: arrayToBinaryTree(arr, 2 * idx + 2)
  };
}

// 17. Binary Tree Traversals (Preorder, Inorder, Postorder, Level-Order)
export function generateTreeTraversals() {
  const treeRoot = {
    val: 40,
    left: {
      val: 20,
      left: { val: 10, left: null, right: null },
      right: { val: 30, left: null, right: null }
    },
    right: {
      val: 60,
      left: { val: 50, left: null, right: null },
      right: { val: 70, left: null, right: null }
    }
  };

  const steps = [];

  // Phase 1: Pre-order (Root -> Left -> Right)
  const preOrderList = [];
  steps.push({
    bstRoot: treeRoot,
    activeVal: 40,
    visitedList: [],
    traversalType: "PRE-ORDER",
    line: 2,
    vars: { rule: "Root → Left → Right", activeTraversal: "Pre-order" },
    note: "Starting Pre-order Traversal: Visit Root first, then traverse Left subtree, then Right subtree."
  });

  function preOrder(node) {
    if (!node) return;
    preOrderList.push(node.val);
    steps.push({
      bstRoot: treeRoot,
      activeVal: node.val,
      visitedList: [...preOrderList],
      traversalType: "PRE-ORDER",
      line: 4,
      vars: { visited: `[${preOrderList.join(", ")}]`, node: node.val },
      note: `Pre-order: Visiting Root node ${node.val}.`
    });
    preOrder(node.left);
    preOrder(node.right);
  }
  preOrder(treeRoot);

  steps.push({
    bstRoot: treeRoot,
    activeVal: null,
    visitedList: [...preOrderList],
    traversalType: "PRE-ORDER",
    line: 6,
    vars: { preOrderResult: `[${preOrderList.join(", ")}]` },
    note: `Pre-order traversal complete: [${preOrderList.join(" → ")}].`
  });

  // Phase 2: Post-order (Left -> Right -> Root)
  const postOrderList = [];
  steps.push({
    bstRoot: treeRoot,
    activeVal: null,
    visitedList: [],
    traversalType: "POST-ORDER",
    line: 8,
    vars: { rule: "Left → Right → Root", activeTraversal: "Post-order" },
    note: "Starting Post-order Traversal: Traverse Left subtree, then Right subtree, visit Root LAST."
  });

  function postOrder(node) {
    if (!node) return;
    postOrder(node.left);
    postOrder(node.right);
    postOrderList.push(node.val);
    steps.push({
      bstRoot: treeRoot,
      activeVal: node.val,
      visitedList: [...postOrderList],
      traversalType: "POST-ORDER",
      line: 10,
      vars: { visited: `[${postOrderList.join(", ")}]`, node: node.val },
      note: `Post-order: Visited subtrees, now visiting node ${node.val}.`
    });
  }
  postOrder(treeRoot);

  steps.push({
    bstRoot: treeRoot,
    activeVal: null,
    visitedList: [...postOrderList],
    traversalType: "POST-ORDER",
    line: 12,
    vars: { postOrderResult: `[${postOrderList.join(", ")}]` },
    note: `Post-order traversal complete: [${postOrderList.join(" → ")}].`
  });

  // Phase 3: Level-Order (BFS Queue)
  const levelOrderList = [];
  const queue = [treeRoot];
  steps.push({
    bstRoot: treeRoot,
    activeVal: 40,
    visitedList: [],
    traversalType: "LEVEL-ORDER",
    line: 14,
    vars: { rule: "Breadth-First (Level by Level)", queue: "[40]" },
    note: "Starting Level-order (BFS) Traversal: Visit nodes level by level using a FIFO Queue."
  });

  while (queue.length > 0) {
    const curr = queue.shift();
    levelOrderList.push(curr.val);
    if (curr.left) queue.push(curr.left);
    if (curr.right) queue.push(curr.right);

    steps.push({
      bstRoot: treeRoot,
      activeVal: curr.val,
      visitedList: [...levelOrderList],
      traversalType: "LEVEL-ORDER",
      line: 16,
      vars: { visited: `[${levelOrderList.join(", ")}]`, queue: `[${queue.map(n => n.val).join(", ")}]` },
      note: `Level-order: Dequeued node ${curr.val}. Enqueued its children.`
    });
  }

  steps.push({
    bstRoot: treeRoot,
    activeVal: null,
    visitedList: [...levelOrderList],
    traversalType: "LEVEL-ORDER",
    line: 18,
    vars: { levelOrderResult: `[${levelOrderList.join(", ")}]` },
    note: `Level-order traversal complete: [${levelOrderList.join(" → ")}].`
  });

  return steps;
}

// 18. Binary Min-Heap (Insert + Sift-Up & Extract-Min + Sift-Down)
export function generateMinHeap() {
  const heap = [10, 20, 15, 30, 40, 50];
  const steps = [];

  steps.push({
    bstRoot: arrayToBinaryTree(heap),
    activeVal: null,
    visitedList: [...heap],
    line: 2,
    vars: { heapArray: `[${heap.join(", ")}]`, minRoot: heap[0] },
    note: `Initial valid Min-Heap: parent <= children at every node. Array: [${heap.join(", ")}].`
  });

  // Operation 1: Insert 8 (smaller than root, requires multiple sift-ups)
  const insertVal = 8;
  heap.push(insertVal);
  let currIdx = heap.length - 1;

  steps.push({
    bstRoot: arrayToBinaryTree(heap),
    activeVal: insertVal,
    visitedList: [...heap],
    line: 4,
    vars: { inserted: insertVal, atIndex: currIdx, heapArray: `[${heap.join(", ")}]` },
    note: `Inserted new value ${insertVal} at end of heap (index ${currIdx}). Starting Sift-Up.`
  });

  while (currIdx > 0) {
    const parentIdx = Math.floor((currIdx - 1) / 2);
    steps.push({
      bstRoot: arrayToBinaryTree(heap),
      activeVal: heap[currIdx],
      visitedList: [heap[parentIdx], heap[currIdx]],
      line: 6,
      vars: { current: heap[currIdx], parent: heap[parentIdx] },
      note: `Sift-Up: Comparing node ${heap[currIdx]} with parent ${heap[parentIdx]}.`
    });

    if (heap[currIdx] < heap[parentIdx]) {
      [heap[currIdx], heap[parentIdx]] = [heap[parentIdx], heap[currIdx]];
      steps.push({
        bstRoot: arrayToBinaryTree(heap),
        activeVal: heap[parentIdx],
        visitedList: [heap[parentIdx]],
        line: 8,
        vars: { swapped: `${heap[currIdx]} with ${heap[parentIdx]}`, heapArray: `[${heap.join(", ")}]` },
        note: `Swapped! Child ${heap[parentIdx]} is smaller than parent ${heap[currIdx]}.`
      });
      currIdx = parentIdx;
    } else {
      break;
    }
  }

  steps.push({
    bstRoot: arrayToBinaryTree(heap),
    activeVal: heap[0],
    visitedList: [...heap],
    line: 10,
    vars: { minHeapArray: `[${heap.join(", ")}]`, newRoot: heap[0] },
    note: `Sift-Up complete! New minimum value ${heap[0]} reached the root of the Min-Heap.`
  });

  // Operation 2: Extract-Min
  const extractedMin = heap[0];
  const lastVal = heap.pop();
  heap[0] = lastVal;

  steps.push({
    bstRoot: arrayToBinaryTree(heap),
    activeVal: heap[0],
    visitedList: [extractedMin],
    line: 12,
    vars: { extractedMin, movedToRoot: lastVal, heapArray: `[${heap.join(", ")}]` },
    note: `Extract-Min: Removed root ${extractedMin}. Replaced root with last element ${lastVal}. Starting Sift-Down.`
  });

  let downIdx = 0;
  const n = heap.length;
  while (true) {
    let smallest = downIdx;
    const left = 2 * downIdx + 1;
    const right = 2 * downIdx + 2;

    if (left < n && heap[left] < heap[smallest]) smallest = left;
    if (right < n && heap[right] < heap[smallest]) smallest = right;

    if (smallest !== downIdx) {
      const swappedVal = heap[smallest];
      [heap[downIdx], heap[smallest]] = [heap[smallest], heap[downIdx]];
      steps.push({
        bstRoot: arrayToBinaryTree(heap),
        activeVal: heap[smallest],
        visitedList: [heap[downIdx]],
        line: 15,
        vars: { swapped: `${heap[downIdx]} with child ${swappedVal}`, heapArray: `[${heap.join(", ")}]` },
        note: `Sift-Down: Swapped node ${heap[smallest]} with smaller child ${swappedVal}.`
      });
      downIdx = smallest;
    } else {
      break;
    }
  }

  steps.push({
    bstRoot: arrayToBinaryTree(heap),
    activeVal: heap[0],
    visitedList: [...heap],
    line: 18,
    vars: { finalHeap: `[${heap.join(", ")}]`, currentMin: heap[0] },
    note: `Extract-Min & Sift-Down complete! Valid Min-Heap restored. Current root = ${heap[0]}.`
  });

  return steps;
}
