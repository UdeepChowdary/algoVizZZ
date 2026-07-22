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
