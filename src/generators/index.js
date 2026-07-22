import {
  generateSelectionSort,
  generateBubbleSort,
  generateInsertionSort,
  generateMergeSort,
  generateQuickSort,
  generateHeapSort
} from './sortingGenerators.js';

import {
  generateLinearSearch,
  generateBinarySearch
} from './searchingGenerators.js';

import {
  generateBFSGraph,
  generateDFSGraph,
  generateDijkstra
} from './graphGenerators.js';

import {
  generateKnapsack01,
  generateLCS
} from './dpGenerators.js';

import { generateNQueens } from './backtrackingGenerators.js';
import { generateFractionalKnapsack } from './greedyGenerators.js';
import { generateBST } from './treeGenerators.js';

export const GENERATORS = {
  selection: generateSelectionSort,
  bubble: generateBubbleSort,
  insertion: generateInsertionSort,
  merge: generateMergeSort,
  quick: generateQuickSort,
  heap: generateHeapSort,
  linearSearch: generateLinearSearch,
  binarySearch: generateBinarySearch,
  bfs: generateBFSGraph,
  dfs: generateDFSGraph,
  dijkstra: generateDijkstra,
  knapsack01: generateKnapsack01,
  lcs: generateLCS,
  nqueens: generateNQueens,
  fractionalKnapsack: generateFractionalKnapsack,
  bst: generateBST
};
