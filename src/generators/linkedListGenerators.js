// ============================================================
// Linked List Step Generators
// Each step shape:
// {
//   nodes: [{ id, val, next (id|null) }],
//   head: <id|null>,
//   highlighted: [id],         // active/focus nodes
//   pointerLabels: { id: label }, // e.g. { 2: "curr", 1: "prev" }
//   slow: <id|null>,           // Floyd's tortoise
//   fast: <id|null>,           // Floyd's hare
//   hasCycle: bool,
//   cycleEntryId: <id|null>,
//   line: <number>,
//   vars: {},
//   note: "string"
// }
// ============================================================

// Helper: snapshot the list from head as an ordered flat array
function snapshot(nodeMap, startId) {
  const arr = [];
  const visited = new Set();
  let cur = startId;
  let safety = 0;
  while (cur !== null && cur !== undefined && !visited.has(cur) && safety < 50) {
    visited.add(cur);
    const n = nodeMap[cur];
    if (!n) break;
    arr.push({ id: n.id, val: n.val, next: n.next });
    cur = n.next;
    safety++;
  }
  return arr;
}

// -------------------------------------------------------
// 1. Insert at Head (builds: 50→40→30→20→10)
// -------------------------------------------------------
export function generateLinkedListInsert() {
  const steps = [];
  const nodeMap = {};
  let head = null;
  let nextId = 0;

  const valuesToInsert = [10, 20, 30, 40, 50];

  steps.push({
    nodes: [],
    head: null,
    highlighted: [],
    pointerLabels: {},
    slow: null, fast: null,
    hasCycle: false, cycleEntryId: null,
    line: 0,
    vars: {},
    note: "Starting with an empty linked list. HEAD = null"
  });

  for (const val of valuesToInsert) {
    const id = nextId++;

    // Step 1: create new node
    const preSnap = snapshot(nodeMap, head);
    steps.push({
      nodes: [{ id, val, next: head }, ...preSnap],
      head,
      highlighted: [id],
      pointerLabels: { [id]: "new" },
      slow: null, fast: null,
      hasCycle: false, cycleEntryId: null,
      line: 1,
      vars: { val, newNode: `Node(${val})` },
      note: `Created new node with value ${val}`
    });

    // Step 2: newNode.next = head
    steps.push({
      nodes: [{ id, val, next: head }, ...preSnap],
      head,
      highlighted: [id],
      pointerLabels: {
        [id]: "new",
        ...(head !== null ? { [head]: "head" } : {})
      },
      slow: null, fast: null,
      hasCycle: false, cycleEntryId: null,
      line: 2,
      vars: { val },
      note: `newNode.next = head  →  Node(${val}).next → ${head !== null ? `Node(${nodeMap[head].val})` : 'null'}`
    });

    // Step 3: head = newNode
    nodeMap[id] = { id, val, next: head };
    head = id;
    steps.push({
      nodes: snapshot(nodeMap, head),
      head,
      highlighted: [head],
      pointerLabels: { [head]: "head" },
      slow: null, fast: null,
      hasCycle: false, cycleEntryId: null,
      line: 3,
      vars: { val, head: `Node(${val})` },
      note: `head = newNode  →  HEAD now points to Node(${val})`
    });
  }

  const finalList = snapshot(nodeMap, head).map(n => n.val).join(' → ');
  steps.push({
    nodes: snapshot(nodeMap, head),
    head,
    highlighted: [],
    pointerLabels: {},
    slow: null, fast: null,
    hasCycle: false, cycleEntryId: null,
    line: 4,
    vars: {},
    note: `✅ Done! List: ${finalList} → null`
  });

  return steps;
}

// -------------------------------------------------------
// 2. Delete a node by value (list: 1→2→3→4→5, delete 3)
// -------------------------------------------------------
export function generateLinkedListDelete() {
  const steps = [];
  const nodeMap = {};
  let head = null;
  let nextId = 0;
  let tail = null;

  const vals = [1, 2, 3, 4, 5];
  for (const val of vals) {
    const id = nextId++;
    nodeMap[id] = { id, val, next: null };
    if (head === null) { head = id; tail = id; }
    else { nodeMap[tail].next = id; tail = id; }
  }

  const TARGET = 3;

  steps.push({
    nodes: snapshot(nodeMap, head),
    head,
    highlighted: [],
    pointerLabels: {},
    slow: null, fast: null,
    hasCycle: false, cycleEntryId: null,
    line: 0,
    vars: { target: TARGET },
    note: `List ready: ${vals.join(' → ')} → null. Goal: delete node with value ${TARGET}`
  });

  let curr = head;
  let prev = null;

  steps.push({
    nodes: snapshot(nodeMap, head),
    head,
    highlighted: [curr],
    pointerLabels: { [curr]: "curr" },
    slow: null, fast: null,
    hasCycle: false, cycleEntryId: null,
    line: 1,
    vars: { curr: nodeMap[curr].val, target: TARGET },
    note: `curr = head = Node(${nodeMap[curr].val}). Is it the target? ${nodeMap[curr].val === TARGET ? 'Yes!' : 'No, keep traversing.'}`
  });

  while (curr !== null && nodeMap[curr].val !== TARGET) {
    prev = curr;
    curr = nodeMap[curr].next;
    if (curr === null) break;

    const labels = { [curr]: "curr" };
    if (prev !== null) labels[prev] = "prev";
    steps.push({
      nodes: snapshot(nodeMap, head),
      head,
      highlighted: prev !== null ? [prev, curr] : [curr],
      pointerLabels: labels,
      slow: null, fast: null,
      hasCycle: false, cycleEntryId: null,
      line: 2,
      vars: { prev: nodeMap[prev].val, curr: nodeMap[curr].val, target: TARGET },
      note: `Node(${nodeMap[curr].val}) ≠ ${TARGET} — advance pointers`
    });
  }

  if (curr === null) {
    steps.push({
      nodes: snapshot(nodeMap, head),
      head,
      highlighted: [],
      pointerLabels: {},
      slow: null, fast: null,
      hasCycle: false, cycleEntryId: null,
      line: 5,
      vars: {},
      note: `Node with value ${TARGET} was not found.`
    });
    return steps;
  }

  // Found target
  steps.push({
    nodes: snapshot(nodeMap, head),
    head,
    highlighted: prev !== null ? [prev, curr] : [curr],
    pointerLabels: {
      ...(prev !== null ? { [prev]: "prev" } : {}),
      [curr]: "curr ← target!"
    },
    slow: null, fast: null,
    hasCycle: false, cycleEntryId: null,
    line: 3,
    vars: { curr: nodeMap[curr].val },
    note: `Found target Node(${TARGET})! Bypass it: prev.next = curr.next`
  });

  const deletedId = curr;
  const newNext = nodeMap[curr].next;
  if (prev !== null) {
    nodeMap[prev] = { ...nodeMap[prev], next: newNext };
  } else {
    head = newNext;
  }
  delete nodeMap[deletedId];

  const afterSnap = snapshot(nodeMap, head);
  steps.push({
    nodes: afterSnap,
    head,
    highlighted: prev !== null && nodeMap[prev] ? [prev] : [],
    pointerLabels: prev !== null && nodeMap[prev] ? { [prev]: "prev" } : {},
    slow: null, fast: null,
    hasCycle: false, cycleEntryId: null,
    line: 4,
    vars: { deletedVal: TARGET },
    note: `✅ Node(${TARGET}) deleted! List: ${afterSnap.map(n => n.val).join(' → ')} → null`
  });

  return steps;
}

// -------------------------------------------------------
// 3. Reverse Linked List (iterative 3-pointer)
// -------------------------------------------------------
export function generateLinkedListReverse() {
  const steps = [];
  const nodeMap = {};
  let head = null;
  let nextId = 0;
  let tail = null;

  const vals = [1, 2, 3, 4, 5];
  for (const val of vals) {
    const id = nextId++;
    nodeMap[id] = { id, val, next: null };
    if (head === null) { head = id; tail = id; }
    else { nodeMap[tail].next = id; tail = id; }
  }

  steps.push({
    nodes: snapshot(nodeMap, head),
    head,
    highlighted: [],
    pointerLabels: {},
    slow: null, fast: null,
    hasCycle: false, cycleEntryId: null,
    line: 0,
    vars: {},
    note: `Starting reversal of: ${vals.join(' → ')} → null`
  });

  let prev = null;
  let curr = head;

  steps.push({
    nodes: snapshot(nodeMap, head),
    head,
    highlighted: [curr],
    pointerLabels: { [curr]: "curr" },
    slow: null, fast: null,
    hasCycle: false, cycleEntryId: null,
    line: 1,
    vars: { prev: 'null', curr: nodeMap[curr].val },
    note: `Initialize: prev = null, curr = head = Node(${nodeMap[curr].val})`
  });

  while (curr !== null) {
    const nextId2 = nodeMap[curr].next;

    // Show: save next pointer
    const labels = { [curr]: "curr" };
    if (prev !== null) labels[prev] = "prev";
    if (nextId2 !== null) labels[nextId2] = "next";

    steps.push({
      nodes: snapshot(nodeMap, head),
      head,
      highlighted: [curr, ...(nextId2 !== null ? [nextId2] : [])],
      pointerLabels: labels,
      slow: null, fast: null,
      hasCycle: false, cycleEntryId: null,
      line: 2,
      vars: {
        prev: prev !== null ? nodeMap[prev].val : 'null',
        curr: nodeMap[curr].val,
        next: nextId2 !== null ? nodeMap[nextId2].val : 'null'
      },
      note: `Save next = Node(${nextId2 !== null ? nodeMap[nextId2].val : 'null'})`
    });

    // Reverse the pointer: curr.next = prev
    nodeMap[curr] = { ...nodeMap[curr], next: prev };

    const labels2 = { [curr]: "curr" };
    if (prev !== null) labels2[prev] = "prev";

    // For visual continuity, render from `curr` back through prev chain
    steps.push({
      nodes: snapshot(nodeMap, curr),
      head: curr,
      highlighted: [curr],
      pointerLabels: labels2,
      slow: null, fast: null,
      hasCycle: false, cycleEntryId: null,
      line: 3,
      vars: {
        prev: prev !== null ? nodeMap[prev].val : 'null',
        curr: nodeMap[curr].val
      },
      note: `curr.next = prev  →  Node(${nodeMap[curr].val}) now points to ${prev !== null ? `Node(${nodeMap[prev].val})` : 'null'}`
    });

    // Advance
    prev = curr;
    curr = nextId2;

    if (curr !== null) {
      steps.push({
        nodes: snapshot(nodeMap, prev),
        head: prev,
        highlighted: [curr, prev],
        pointerLabels: { [prev]: "prev", [curr]: "curr" },
        slow: null, fast: null,
        hasCycle: false, cycleEntryId: null,
        line: 4,
        vars: {
          prev: nodeMap[prev].val,
          curr: nodeMap[curr].val
        },
        note: `Advance: prev = Node(${nodeMap[prev].val}), curr = Node(${nodeMap[curr].val})`
      });
    }
  }

  // Final state
  head = prev;
  const reversedList = snapshot(nodeMap, head).map(n => n.val).join(' → ');
  steps.push({
    nodes: snapshot(nodeMap, head),
    head,
    highlighted: [head],
    pointerLabels: { [head]: "head" },
    slow: null, fast: null,
    hasCycle: false, cycleEntryId: null,
    line: 5,
    vars: { newHead: nodeMap[head].val },
    note: `✅ Reversed! New head = Node(${nodeMap[head].val}). List: ${reversedList} → null`
  });

  return steps;
}

// -------------------------------------------------------
// 4. Cycle Detection — Floyd's Tortoise & Hare
// -------------------------------------------------------
export function generateLinkedListCycleDetect() {
  const steps = [];

  // List: 1→2→3→4→5→6, with 6.next pointing back to 3 (id=2)
  const nodeMap = {
    0: { id: 0, val: 1, next: 1 },
    1: { id: 1, val: 2, next: 2 },
    2: { id: 2, val: 3, next: 3 },
    3: { id: 3, val: 4, next: 4 },
    4: { id: 4, val: 5, next: 5 },
    5: { id: 5, val: 6, next: 2 }, // cycle: 6 → 3
  };
  const head = 0;
  const cycleEntryId = 2; // node 3

  // Linear representation for display
  const displayNodes = [0, 1, 2, 3, 4, 5].map(id => ({ ...nodeMap[id] }));

  steps.push({
    nodes: displayNodes,
    head,
    highlighted: [],
    pointerLabels: {},
    slow: null, fast: null,
    hasCycle: false, cycleEntryId,
    line: 0,
    vars: {},
    note: `List: 1→2→3→4→5→6→(back to 3). Cycle present! Starting Floyd's Tortoise & Hare algorithm.`
  });

  let slow = head;
  let fast = head;

  steps.push({
    nodes: displayNodes,
    head,
    highlighted: [slow],
    pointerLabels: { [slow]: "slow & fast" },
    slow, fast,
    hasCycle: false, cycleEntryId,
    line: 1,
    vars: { slow: nodeMap[slow].val, fast: nodeMap[fast].val },
    note: `Initialize slow = fast = head = Node(${nodeMap[slow].val})`
  });

  let met = false;
  for (let i = 0; i < 14; i++) {
    slow = nodeMap[slow].next;
    const f1 = nodeMap[fast].next;
    fast = nodeMap[f1].next;

    const labels = {};
    if (slow === fast) {
      labels[slow] = "slow = fast 🎯";
    } else {
      labels[slow] = "slow 🐢";
      labels[fast] = "fast 🐇";
    }

    steps.push({
      nodes: displayNodes,
      head,
      highlighted: slow === fast ? [slow] : [slow, fast],
      pointerLabels: labels,
      slow, fast,
      hasCycle: false, cycleEntryId,
      line: 2,
      vars: { slow: nodeMap[slow].val, fast: nodeMap[fast].val },
      note: slow === fast
        ? `slow and fast both at Node(${nodeMap[slow].val})! 🎯 Cycle confirmed.`
        : `slow → Node(${nodeMap[slow].val}), fast → Node(${nodeMap[fast].val})`
    });

    if (slow === fast) {
      met = true;
      break;
    }
  }

  if (met) {
    // Find cycle entry point
    slow = head;
    steps.push({
      nodes: displayNodes,
      head,
      highlighted: [slow, fast],
      pointerLabels: { [slow]: "slow 🐢 (reset)", [fast]: "fast 🐇" },
      slow, fast,
      hasCycle: true, cycleEntryId,
      line: 3,
      vars: { slow: nodeMap[slow].val, fast: nodeMap[fast].val },
      note: `Reset slow to head. Now move both one step at a time to find cycle start.`
    });

    for (let i = 0; i < 10; i++) {
      if (slow === fast) break;
      slow = nodeMap[slow].next;
      fast = nodeMap[fast].next;

      const labels3 = slow === fast
        ? { [slow]: "cycle start! 🏁" }
        : { [slow]: "slow 🐢", [fast]: "fast 🐇" };

      steps.push({
        nodes: displayNodes,
        head,
        highlighted: slow === fast ? [slow] : [slow, fast],
        pointerLabels: labels3,
        slow, fast,
        hasCycle: true, cycleEntryId,
        line: 4,
        vars: { slow: nodeMap[slow].val, fast: nodeMap[fast].val },
        note: slow === fast
          ? `Cycle starts at Node(${nodeMap[slow].val})! 🏁`
          : `slow → Node(${nodeMap[slow].val}), fast → Node(${nodeMap[fast].val})`
      });
    }

    steps.push({
      nodes: displayNodes,
      head,
      highlighted: [slow],
      pointerLabels: { [slow]: "cycle entry 🏁" },
      slow, fast,
      hasCycle: true, cycleEntryId,
      line: 5,
      vars: { cycleStart: nodeMap[slow].val },
      note: `✅ Complete! Cycle entry point is Node(${nodeMap[slow].val}). Floyd's algorithm found it in O(n) time, O(1) space.`
    });
  }

  return steps;
}
