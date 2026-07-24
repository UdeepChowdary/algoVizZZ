// 2D Grid Pathfinding Step Generators (BFS, DFS, Dijkstra)

const ROWS = 10;
const COLS = 18;

export function generateGridPathfindingSteps({
  algorithm = "bfs",
  startNode = [2, 2],
  endNode = [7, 15],
  walls = new Set(),
  mudCells = new Set()
}) {
  const nodeKey = (r, c) => `${r}-${c}`;
  const steps = [];

  const startKey = nodeKey(startNode[0], startNode[1]);
  const endKey = nodeKey(endNode[0], endNode[1]);

  const isValid = (r, c) => {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return false;
    if (walls.has(nodeKey(r, c))) return false;
    return true;
  };

  const getNeighbors = (r, c) => {
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];
    const res = [];
    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];
      if (isValid(nr, nc)) {
        res.push([nr, nc]);
      }
    }
    return res;
  };

  // Reconstruct path from parent map
  const reconstructPath = (parentMap) => {
    const path = [];
    let currStr = endKey;
    while (currStr && parentMap.has(currStr)) {
      const [r, c] = currStr.split('-').map(Number);
      path.unshift([r, c]);
      currStr = parentMap.get(currStr);
    }
    if (currStr === startKey) {
      path.unshift([...startNode]);
    }
    return path;
  };

  // 1. GRID BFS
  if (algorithm === "bfs") {
    const queue = [startNode];
    const visited = new Set([startKey]);
    const parentMap = new Map();

    steps.push({
      gridState: { visited: Array.from(visited), path: [], current: startNode },
      queue: [`(${startNode[0]},${startNode[1]})`],
      line: 2,
      vars: { start: `(${startNode[0]},${startNode[1]})`, queueSize: queue.length },
      note: `Initialized 2D Grid BFS from start cell (${startNode[0]}, ${startNode[1]}).`
    });

    let found = false;

    if (startNode[0] === endNode[0] && startNode[1] === endNode[1]) {
      found = true;
      steps.push({
        gridState: { visited: Array.from(visited), path: [[...startNode]], current: startNode },
        queue: [],
        line: 5,
        vars: { targetFound: true, pathLength: 1 },
        note: `Start and Target are the same cell!`
      });
    } else {
      while (queue.length > 0) {
        const [r, c] = queue.shift();
        const currKey = nodeKey(r, c);

        steps.push({
          gridState: { visited: Array.from(visited), path: [], current: [r, c] },
          queue: queue.map(([qr, qc]) => `(${qr},${qc})`),
          line: 8,
          vars: { exploringCell: `(${r},${c})`, visitedCount: visited.size, queueLength: queue.length },
          note: `BFS expanding frontier wave cell (${r}, ${c}). Total visited: ${visited.size}`
        });

        for (const [nr, nc] of getNeighbors(r, c)) {
          const nKey = nodeKey(nr, nc);
          if (!visited.has(nKey)) {
            visited.add(nKey);
            parentMap.set(nKey, currKey);
            queue.push([nr, nc]);

            if (nr === endNode[0] && nc === endNode[1]) {
              found = true;
              const path = reconstructPath(parentMap);
              steps.push({
                gridState: { visited: Array.from(visited), path, current: [nr, nc] },
                queue: queue.map(([qr, qc]) => `(${qr},${qc})`),
                line: 5,
                vars: { targetFound: true, pathLength: path.length, visitedTotal: visited.size },
                note: `TARGET REACHED! BFS reconstructed shortest path (${path.length} cells).`
              });
              break;
            }
          }
        }

        if (found) break;
      }
    }

    if (!found) {
      steps.push({
        gridState: { visited: Array.from(visited), path: [], current: null },
        queue: [],
        line: 11,
        vars: { targetFound: false },
        note: "Path blocked! Target cell is unreachable due to walls."
      });
    }
  }

  // 2. GRID DFS
  else if (algorithm === "dfs") {
    // Stack contains tuples of [[r, c], parentNodeOrNull]
    const stack = [[startNode, null]];
    const visited = new Set();
    const parentMap = new Map();
    let found = false;

    steps.push({
      gridState: { visited: [], path: [], current: startNode },
      stack: [`(${startNode[0]},${startNode[1]})`],
      line: 1,
      vars: { start: `(${startNode[0]},${startNode[1]})` },
      note: `Initialized 2D Grid DFS from start cell (${startNode[0]}, ${startNode[1]}).`
    });

    if (startNode[0] === endNode[0] && startNode[1] === endNode[1]) {
      found = true;
      visited.add(startKey);
      steps.push({
        gridState: { visited: Array.from(visited), path: [[...startNode]], current: startNode },
        stack: [],
        line: 5,
        vars: { targetFound: true, pathLength: 1 },
        note: "Start and Target are the same cell!"
      });
    } else {
      while (stack.length > 0) {
        const [currNode, parentNode] = stack.pop();
        const [r, c] = currNode;
        const currKey = nodeKey(r, c);

        if (!visited.has(currKey)) {
          visited.add(currKey);

          if (parentNode) {
            parentMap.set(currKey, nodeKey(parentNode[0], parentNode[1]));
          }

          if (r === endNode[0] && c === endNode[1]) {
            found = true;
            const path = reconstructPath(parentMap);
            steps.push({
              gridState: { visited: Array.from(visited), path, current: [r, c] },
              stack: stack.map(([n]) => `(${n[0]},${n[1]})`),
              line: 5,
              vars: { targetFound: true, pathLength: path.length, visitedTotal: visited.size },
              note: `TARGET REACHED! DFS found a valid path (${path.length} cells).`
            });
            break;
          }

          steps.push({
            gridState: { visited: Array.from(visited), path: [], current: [r, c] },
            stack: stack.map(([n]) => `(${n[0]},${n[1]})`),
            line: 2,
            vars: { currCell: `(${r},${c})`, stackDepth: stack.length, totalVisited: visited.size },
            note: `DFS visiting cell (${r}, ${c}). Deep branch exploration.`
          });

          const neighbors = getNeighbors(r, c);
          for (const [nr, nc] of neighbors) {
            const nKey = nodeKey(nr, nc);
            if (!visited.has(nKey)) {
              stack.push([[nr, nc], [r, c]]);
            }
          }
        }
      }
    }

    if (!found) {
      steps.push({
        gridState: { visited: Array.from(visited), path: [], current: null },
        stack: [],
        line: 7,
        vars: { targetFound: false },
        note: "Target cell is unreachable by DFS due to walls."
      });
    }
  }

  // 3. GRID DIJKSTRA
  else if (algorithm === "dijkstra") {
    const distMap = new Map();
    const visited = new Set();
    const parentMap = new Map();

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        distMap.set(nodeKey(r, c), Infinity);
      }
    }
    distMap.set(startKey, 0);

    steps.push({
      gridState: { visited: [], path: [], current: startNode },
      line: 2,
      vars: { start: `(${startNode[0]},${startNode[1]})` },
      note: "Initialized 2D Grid Dijkstra. Mud cells add extra weight (+5)."
    });

    let found = false;

    while (true) {
      let minDist = Infinity;
      let currKey = null;

      for (const [k, d] of distMap.entries()) {
        if (!visited.has(k) && d < minDist) {
          minDist = d;
          currKey = k;
        }
      }

      if (!currKey || minDist === Infinity) break;

      const [r, c] = currKey.split('-').map(Number);
      visited.add(currKey);

      if (r === endNode[0] && c === endNode[1]) {
        found = true;
        const path = reconstructPath(parentMap);
        steps.push({
          gridState: { visited: Array.from(visited), path, current: [r, c] },
          line: 4,
          vars: { targetFound: true, minCost: minDist, pathLength: path.length },
          note: `TARGET REACHED! Dijkstra shortest path found (Cost: ${minDist}, ${path.length} cells).`
        });
        break;
      }

      steps.push({
        gridState: { visited: Array.from(visited), path: [], current: [r, c] },
        line: 4,
        vars: { currentCell: `(${r},${c})`, distCost: minDist, visitedCount: visited.size },
        note: `Dijkstra processing cell (${r}, ${c}) with distance cost ${minDist}.`
      });

      for (const [nr, nc] of getNeighbors(r, c)) {
        const nKey = nodeKey(nr, nc);
        if (!visited.has(nKey)) {
          const weight = mudCells.has(nKey) ? 6 : 1;
          const newDist = minDist + weight;
          if (newDist < distMap.get(nKey)) {
            distMap.set(nKey, newDist);
            parentMap.set(nKey, currKey);
          }
        }
      }
    }

    if (!found) {
      steps.push({
        gridState: { visited: Array.from(visited), path: [], current: null },
        line: 11,
        vars: { targetFound: false },
        note: "Target cell is unreachable by Dijkstra."
      });
    }
  }

  return steps;
}


