import {
  generateSelectionSort,
  generateBubbleSort,
  generateInsertionSort,
  generateMergeSort,
  generateQuickSort,
  generateHeapSort,
  generateKadane,
  generateDutchNationalFlag
} from './sortingGenerators.js';

import {
  generateLinearSearch,
  generateBinarySearch
} from './searchingGenerators.js';

import {
  generateBFSGraph,
  generateDFSGraph,
  generateDijkstra,
  generateKruskal,
  generateTopologicalSort
} from './graphGenerators.js';

import {
  generateKnapsack01,
  generateLCS,
  generateCoinChange,
  generateEditDistance
} from './dpGenerators.js';

import { generateNQueens } from './backtrackingGenerators.js';
import { generateFractionalKnapsack } from './greedyGenerators.js';
import {
  generateBST,
  generateTreeTraversals,
  generateMinHeap
} from './treeGenerators.js';
import {
  generateLinkedListInsert,
  generateLinkedListDelete,
  generateLinkedListReverse,
  generateLinkedListCycleDetect
} from './linkedListGenerators.js';

import {
  generateHashTableChaining,
  generateHashTableLinearProbing
} from './hashTableGenerators.js';

export const GENERATORS = {
  selection: generateSelectionSort,
  bubble: generateBubbleSort,
  insertion: generateInsertionSort,
  merge: generateMergeSort,
  quick: generateQuickSort,
  heap: generateHeapSort,
  kadane: generateKadane,
  dnf: generateDutchNationalFlag,
  linearSearch: generateLinearSearch,
  binarySearch: generateBinarySearch,
  bfs: generateBFSGraph,
  dfs: generateDFSGraph,
  dijkstra: generateDijkstra,
  kruskal: generateKruskal,
  topoSort: generateTopologicalSort,
  knapsack01: generateKnapsack01,
  lcs: generateLCS,
  coinChange: generateCoinChange,
  editDistance: generateEditDistance,
  nqueens: generateNQueens,
  fractionalKnapsack: generateFractionalKnapsack,
  bst: generateBST,
  treeTraversals: generateTreeTraversals,
  minHeap: generateMinHeap,
  llInsert: generateLinkedListInsert,
  llDelete: generateLinkedListDelete,
  llReverse: generateLinkedListReverse,
  llCycleDetect: generateLinkedListCycleDetect,
  htChaining: generateHashTableChaining,
  htLinearProbing: generateHashTableLinearProbing
};

