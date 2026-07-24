// Graph Generators (BFS, DFS, Dijkstra)

// Helper to build adjacency list
function buildAdj(nodes, edges, isDirected = false) {
  const adj = {};
  nodes.forEach(n => adj[n.id] = []);
  edges.forEach(e => {
    adj[e.u].push({ v: e.v, weight: e.weight || 1 });
    if (!isDirected) {
      adj[e.v].push({ v: e.u, weight: e.weight || 1 });
    }
  });
  return adj;
}

// 9. BFS Graph Step Generator
export function generateBFSGraph(graphData) {
  let nodes, edges, isDirected;
  if (graphData) {
    ({ nodes, edges, isDirected } = graphData);
  } else {
    nodes = [
      { id: 0, x: 100, y: 80, label: "0" },
      { id: 1, x: 220, y: 50, label: "1" },
      { id: 2, x: 220, y: 150, label: "2" },
      { id: 3, x: 340, y: 50, label: "3" },
      { id: 4, x: 340, y: 150, label: "4" },
      { id: 5, x: 450, y: 100, label: "5" }
    ];
    edges = [
      { u: 0, v: 1 }, { u: 0, v: 2 }, { u: 1, v: 3 }, { u: 2, v: 4 }, { u: 3, v: 5 }, { u: 4, v: 5 }
    ];
    isDirected = false;
  }
  
  if (!nodes || nodes.length === 0) return [];

  const adj = buildAdj(nodes, edges, isDirected);
  const steps = [];
  const startNode = nodes[0].id;
  const queue = [startNode];
  const visited = new Set([startNode]);

  steps.push({ graph: { nodes, edges }, current: startNode, visited: Array.from(visited), queue: [...queue], line: 2, vars: { startNode }, note: `Enqueued start node ${startNode} and marked as visited.` });

  while (queue.length > 0) {
    const curr = queue.shift();
    steps.push({ graph: { nodes, edges }, current: curr, visited: Array.from(visited), queue: [...queue], line: 5, vars: { curr, queue: `[${queue.join(", ")}]` }, note: `Dequeued node ${curr} for processing.` });
    for (const neighborObj of adj[curr]) {
      const neighbor = neighborObj.v;
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
export function generateDFSGraph(graphData) {
  let nodes, edges, isDirected;
  if (graphData) {
    ({ nodes, edges, isDirected } = graphData);
  } else {
    nodes = [
      { id: 0, x: 100, y: 80, label: "0" },
      { id: 1, x: 220, y: 50, label: "1" },
      { id: 2, x: 220, y: 150, label: "2" },
      { id: 3, x: 340, y: 50, label: "3" },
      { id: 4, x: 340, y: 150, label: "4" },
      { id: 5, x: 450, y: 100, label: "5" }
    ];
    edges = [
      { u: 0, v: 1 }, { u: 0, v: 2 }, { u: 1, v: 3 }, { u: 2, v: 4 }, { u: 3, v: 5 }, { u: 4, v: 5 }
    ];
    isDirected = false;
  }
  
  if (!nodes || nodes.length === 0) return [];

  const adj = buildAdj(nodes, edges, isDirected);
  const steps = [];
  const visited = new Set();
  const stack = [];

  function dfs(u) {
    visited.add(u);
    stack.push(u);
    steps.push({ graph: { nodes, edges }, current: u, visited: Array.from(visited), stack: [...stack], line: 2, vars: { curr: u, callStack: `[${stack.join(", ")}]` }, note: `Visited node ${u}. Pushed to call stack.` });
    for (const neighborObj of adj[u]) {
      const v = neighborObj.v;
      if (!visited.has(v)) {
        dfs(v);
      }
    }
    stack.pop();
    steps.push({ graph: { nodes, edges }, current: u, visited: Array.from(visited), stack: [...stack], line: 6, vars: { curr: u }, note: `Backtracking from node ${u}.` });
  }

  const startNode = nodes[0].id;
  dfs(startNode);
  steps.push({ graph: { nodes, edges }, current: null, visited: Array.from(visited), stack: [], line: 7, vars: {}, note: "DFS Traversal Complete!" });
  return steps;
}

// 11. Dijkstra Step Generator
export function generateDijkstra(graphData) {
  let nodes, edges, isDirected;
  if (graphData) {
    ({ nodes, edges, isDirected } = graphData);
  } else {
    nodes = [
      { id: 0, x: 80, y: 100, label: "A (0)" },
      { id: 1, x: 200, y: 40, label: "B (1)" },
      { id: 2, x: 200, y: 160, label: "C (2)" },
      { id: 3, x: 340, y: 40, label: "D (3)" },
      { id: 4, x: 340, y: 160, label: "E (4)" }
    ];
    edges = [
      { u: 0, v: 1, weight: 4 },
      { u: 0, v: 2, weight: 2 },
      { u: 1, v: 2, weight: 1 },
      { u: 1, v: 3, weight: 5 },
      { u: 2, v: 4, weight: 10 },
      { u: 3, v: 4, weight: 2 }
    ];
    isDirected = false;
  }
  
  if (!nodes || nodes.length === 0) return [];

  const adj = buildAdj(nodes, edges, isDirected);
  const steps = [];
  const dist = {};
  nodes.forEach(n => dist[n.id] = Infinity);
  
  const startNode = nodes[0].id;
  dist[startNode] = 0;
  
  const visited = new Set();

  steps.push({ graph: { nodes, edges }, dist: { ...dist }, current: startNode, visited: [], line: 2, vars: { start: startNode }, note: `Initialized distance array. Start node ${startNode} distance = 0.` });

  for (let i = 0; i < nodes.length; i++) {
    let u = -1;
    for (let j = 0; j < nodes.length; j++) {
      const nid = nodes[j].id;
      if (!visited.has(nid) && (u === -1 || dist[nid] < dist[u])) u = nid;
    }
    if (u === -1 || dist[u] === Infinity) break;
    visited.add(u);
    
    const uLabel = nodes.find(n => n.id === u)?.label || u;
    steps.push({ graph: { nodes, edges }, dist: { ...dist }, current: u, visited: Array.from(visited), line: 5, vars: { selectedNode: uLabel, minDistance: dist[u] }, note: `Picked unvisited node ${uLabel} with shortest distance ${dist[u]}.` });

    for (const neighborObj of adj[u]) {
      const v = neighborObj.v;
      const weight = neighborObj.weight;
      if (!visited.has(v)) {
        if (dist[u] + weight < dist[v]) {
          dist[v] = dist[u] + weight;
          const vLabel = nodes.find(n => n.id === v)?.label || v;
          steps.push({ graph: { nodes, edges }, dist: { ...dist }, current: v, visited: Array.from(visited), line: 8, vars: { u: uLabel, v: vLabel, weight, newDist: dist[v] }, note: `Relaxing edge (${uLabel}->${vLabel}). Updated shortest distance to node ${vLabel} = ${dist[v]}.` });
        }
      }
    }
  }
  steps.push({ graph: { nodes, edges }, dist: { ...dist }, current: null, visited: Array.from(visited), line: 12, vars: {}, note: "Dijkstra Shortest Path Computed for all nodes!" });
  return steps;
}
