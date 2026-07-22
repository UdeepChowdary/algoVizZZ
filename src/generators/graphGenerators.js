// Graph Generators (BFS, DFS, Dijkstra)

// 9. BFS Graph Step Generator
export function generateBFSGraph() {
  const nodes = [
    { id: 0, x: 100, y: 80, label: "0" },
    { id: 1, x: 220, y: 50, label: "1" },
    { id: 2, x: 220, y: 150, label: "2" },
    { id: 3, x: 340, y: 50, label: "3" },
    { id: 4, x: 340, y: 150, label: "4" },
    { id: 5, x: 450, y: 100, label: "5" }
  ];
  const edges = [
    { u: 0, v: 1 }, { u: 0, v: 2 }, { u: 1, v: 3 }, { u: 2, v: 4 }, { u: 3, v: 5 }, { u: 4, v: 5 }
  ];
  const adj = { 0: [1, 2], 1: [0, 3], 2: [0, 4], 3: [1, 5], 4: [2, 5], 5: [3, 4] };
  const steps = [];
  const queue = [0];
  const visited = new Set([0]);

  steps.push({ graph: { nodes, edges }, current: 0, visited: Array.from(visited), queue: [...queue], line: 2, vars: { startNode: 0 }, note: "Enqueued start node 0 and marked as visited." });

  while (queue.length > 0) {
    const curr = queue.shift();
    steps.push({ graph: { nodes, edges }, current: curr, visited: Array.from(visited), queue: [...queue], line: 5, vars: { curr, queue: `[${queue.join(", ")}]` }, note: `Dequeued node ${curr} for processing.` });
    for (const neighbor of adj[curr]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        steps.push({ graph: { nodes, edges }, current: neighbor, visited: Array.from(visited), queue: [...queue], line: 8, vars: { curr, neighbor, queue: `[${queue.join(", ")}]` }, note: `Discovered unvisited neighbor ${neighbor}. Added to FIFO Queue.` });
      }
    }
  }
  steps.push({ graph: { nodes, edges }, current: null, visited: Array.from(visited), queue: [], line: 11, vars: {}, note: "BFS Traversal Complete! All reachable nodes visited." });
  return steps;
}

// 10. DFS Graph Step Generator
export function generateDFSGraph() {
  const nodes = [
    { id: 0, x: 100, y: 80, label: "0" },
    { id: 1, x: 220, y: 50, label: "1" },
    { id: 2, x: 220, y: 150, label: "2" },
    { id: 3, x: 340, y: 50, label: "3" },
    { id: 4, x: 340, y: 150, label: "4" },
    { id: 5, x: 450, y: 100, label: "5" }
  ];
  const edges = [
    { u: 0, v: 1 }, { u: 0, v: 2 }, { u: 1, v: 3 }, { u: 2, v: 4 }, { u: 3, v: 5 }, { u: 4, v: 5 }
  ];
  const adj = { 0: [1, 2], 1: [0, 3], 2: [0, 4], 3: [1, 5], 4: [2, 5], 5: [3, 4] };
  const steps = [];
  const visited = new Set();
  const stack = [];

  function dfs(u) {
    visited.add(u);
    stack.push(u);
    steps.push({ graph: { nodes, edges }, current: u, visited: Array.from(visited), stack: [...stack], line: 2, vars: { curr: u, callStack: `[${stack.join(", ")}]` }, note: `Visited node ${u}. Pushed to call stack.` });
    for (const v of adj[u]) {
      if (!visited.has(v)) {
        dfs(v);
      }
    }
    stack.pop();
    steps.push({ graph: { nodes, edges }, current: u, visited: Array.from(visited), stack: [...stack], line: 6, vars: { curr: u }, note: `Backtracking from node ${u}.` });
  }

  dfs(0);
  steps.push({ graph: { nodes, edges }, current: null, visited: Array.from(visited), stack: [], line: 7, vars: {}, note: "DFS Traversal Complete!" });
  return steps;
}

// 11. Dijkstra Step Generator
export function generateDijkstra() {
  const nodes = [
    { id: 0, x: 80, y: 100, label: "A (0)" },
    { id: 1, x: 200, y: 40, label: "B (1)" },
    { id: 2, x: 200, y: 160, label: "C (2)" },
    { id: 3, x: 340, y: 40, label: "D (3)" },
    { id: 4, x: 340, y: 160, label: "E (4)" }
  ];
  const edges = [
    { u: 0, v: 1, weight: 4 },
    { u: 0, v: 2, weight: 2 },
    { u: 1, v: 2, weight: 1 },
    { u: 1, v: 3, weight: 5 },
    { u: 2, v: 4, weight: 10 },
    { u: 3, v: 4, weight: 2 }
  ];
  const steps = [];
  const dist = [0, Infinity, Infinity, Infinity, Infinity];
  const visited = new Set();

  steps.push({ graph: { nodes, edges }, dist: [...dist], current: 0, visited: [], line: 2, vars: { start: 0, dist: "[0, ∞, ∞, ∞, ∞]" }, note: "Initialized distance array. Start node distance = 0." });

  for (let i = 0; i < nodes.length; i++) {
    let u = -1;
    for (let j = 0; j < nodes.length; j++) {
      if (!visited.has(j) && (u === -1 || dist[j] < dist[u])) u = j;
    }
    if (u === -1 || dist[u] === Infinity) break;
    visited.add(u);
    steps.push({ graph: { nodes, edges }, dist: [...dist], current: u, visited: Array.from(visited), line: 5, vars: { selectedNode: nodes[u].label, minDistance: dist[u] }, note: `Picked unvisited node ${nodes[u].label} with shortest distance ${dist[u]}.` });

    edges.forEach(e => {
      let v = -1, weight = e.weight;
      if (e.u === u) v = e.v;
      else if (e.v === u) v = e.u;
      if (v !== -1 && !visited.has(v)) {
        if (dist[u] + weight < dist[v]) {
          dist[v] = dist[u] + weight;
          steps.push({ graph: { nodes, edges }, dist: [...dist], current: v, visited: Array.from(visited), line: 8, vars: { u: nodes[u].label, v: nodes[v].label, weight, newDist: dist[v] }, note: `Relaxing edge (${nodes[u].label}->${nodes[v].label}). Updated shortest distance to node ${nodes[v].label} = ${dist[v]}.` });
        }
      }
    });
  }
  steps.push({ graph: { nodes, edges }, dist: [...dist], current: null, visited: Array.from(visited), line: 12, vars: {}, note: "Dijkstra Shortest Path Computed for all nodes!" });
  return steps;
}
