// 1. Selection Sort
export function generateSelectionSort(arr) {
  const a = [...arr];
  const n = a.length;
  const steps = [];
  const sortedIdx = [];
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    steps.push({ array: [...a], line: 4, compare: [], swap: [], pivot: [], sortedIdx: [...sortedIdx], vars: { i, minIdx }, note: `Assuming minimum is at index ${i}` });
    for (let j = i + 1; j < n; j++) {
      steps.push({ array: [...a], line: 5, compare: [j, minIdx], swap: [], pivot: [], sortedIdx: [...sortedIdx], vars: { i, j, minIdx }, note: `Comparing arr[${j}] (${a[j]}) with current min arr[${minIdx}] (${a[minIdx]})` });
      if (a[j] < a[minIdx]) {
        minIdx = j;
        steps.push({ array: [...a], line: 6, compare: [], swap: [], pivot: [minIdx], sortedIdx: [...sortedIdx], vars: { i, j, minIdx }, note: `New minimum found at index ${minIdx}` });
      }
    }
    [a[i], a[minIdx]] = [a[minIdx], a[i]];
    sortedIdx.push(i);
    steps.push({ array: [...a], line: 8, compare: [], swap: [i, minIdx], pivot: [], sortedIdx: [...sortedIdx], vars: { i, minIdx }, note: `Swapped element at ${i} with minimum at ${minIdx}` });
  }
  sortedIdx.push(n - 1);
  steps.push({ array: [...a], line: 10, compare: [], swap: [], pivot: [], sortedIdx: Array.from({ length: n }, (_, k) => k), vars: {}, note: "Array fully sorted!" });
  return steps;
}

// 2. Bubble Sort
export function generateBubbleSort(arr) {
  const a = [...arr];
  const n = a.length;
  const steps = [];
  const sortedIdx = [];
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      steps.push({ array: [...a], line: 6, compare: [j, j + 1], swap: [], pivot: [], sortedIdx: [...sortedIdx], vars: { i, j }, note: `Comparing arr[${j}] (${a[j]}) and arr[${j + 1}] (${a[j + 1]})` });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
        steps.push({ array: [...a], line: 7, compare: [], swap: [j, j + 1], pivot: [], sortedIdx: [...sortedIdx], vars: { i, j }, note: `Swapping ${a[j + 1]} and ${a[j]}` });
      }
    }
    sortedIdx.unshift(n - 1 - i);
    if (!swapped) break;
  }
  steps.push({ array: [...a], line: 12, compare: [], swap: [], pivot: [], sortedIdx: Array.from({ length: n }, (_, k) => k), vars: {}, note: "Array fully sorted!" });
  return steps;
}

// 3. Insertion Sort
export function generateInsertionSort(arr) {
  const a = [...arr];
  const n = a.length;
  const steps = [];
  for (let i = 1; i < n; i++) {
    const key = a[i];
    let j = i - 1;
    steps.push({ array: [...a], line: 4, compare: [], swap: [], pivot: [i], sortedIdx: Array.from({ length: i }, (_, k) => k), vars: { i, key }, note: `Selected key element ${key} at index ${i}` });
    while (j >= 0 && a[j] > key) {
      steps.push({ array: [...a], line: 5, compare: [j], swap: [], pivot: [i], sortedIdx: Array.from({ length: i }, (_, k) => k), vars: { i, j, key }, note: `arr[${j}] (${a[j]}) > key (${key}), shifting element right` });
      a[j + 1] = a[j];
      j--;
      steps.push({ array: [...a], line: 6, compare: [], swap: [j + 1], pivot: [], sortedIdx: Array.from({ length: i }, (_, k) => k), vars: { i, j, key }, note: `Shifted element to index ${j + 2}` });
    }
    a[j + 1] = key;
    steps.push({ array: [...a], line: 9, compare: [], swap: [j + 1], pivot: [], sortedIdx: Array.from({ length: i + 1 }, (_, k) => k), vars: { i, j: j + 1, key }, note: `Placed key ${key} at correct position ${j + 1}` });
  }
  steps.push({ array: [...a], line: 11, compare: [], swap: [], pivot: [], sortedIdx: Array.from({ length: n }, (_, k) => k), vars: {}, note: "Array fully sorted!" });
  return steps;
}

// 4. Merge Sort
export function generateMergeSort(arr) {
  const a = [...arr];
  const n = a.length;
  const steps = [];

  function merge(l, mid, r) {
    const left = a.slice(l, mid + 1);
    const right = a.slice(mid + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
      steps.push({ array: [...a], line: 6, compare: [l + i, mid + 1 + j], swap: [], pivot: [], sortedIdx: [], vars: { l, r, mid, k }, note: `Comparing left item ${left[i]} with right item ${right[j]}` });
      if (left[i] <= right[j]) { a[k] = left[i]; i++; } else { a[k] = right[j]; j++; }
      steps.push({ array: [...a], line: 6, compare: [], swap: [k], pivot: [], sortedIdx: [], vars: { k }, note: `Merged value ${a[k]} into index ${k}` });
      k++;
    }
    while (i < left.length) { a[k] = left[i]; steps.push({ array: [...a], line: 6, compare: [], swap: [k], pivot: [], sortedIdx: [], vars: { k }, note: `Copying remaining left item ${a[k]} to index ${k}` }); i++; k++; }
    while (j < right.length) { a[k] = right[j]; steps.push({ array: [...a], line: 6, compare: [], swap: [k], pivot: [], sortedIdx: [], vars: { k }, note: `Copying remaining right item ${a[k]} to index ${k}` }); j++; k++; }
  }

  function ms(l, r) {
    if (l < r) {
      const mid = Math.floor((l + r) / 2);
      steps.push({ array: [...a], line: 3, compare: [], swap: [], pivot: [mid], sortedIdx: [], vars: { l, r, mid }, note: `Splitting range [${l}..${r}] at midpoint ${mid}` });
      ms(l, mid);
      ms(mid + 1, r);
      merge(l, mid, r);
    }
  }

  ms(0, n - 1);
  steps.push({ array: [...a], line: 8, compare: [], swap: [], pivot: [], sortedIdx: Array.from({ length: n }, (_, k) => k), vars: {}, note: "Array fully sorted!" });
  return steps;
}

// 5. Quick Sort
export function generateQuickSort(arr) {
  const a = [...arr];
  const n = a.length;
  const steps = [];

  function partition(low, high) {
    const pivotVal = a[high];
    let i = low - 1;
    steps.push({ array: [...a], line: 3, compare: [], swap: [], pivot: [high], sortedIdx: [], vars: { low, high, pivot: pivotVal }, note: `Selected pivot element ${pivotVal} at index ${high}` });
    for (let j = low; j < high; j++) {
      steps.push({ array: [...a], line: 3, compare: [j, high], swap: [], pivot: [high], sortedIdx: [], vars: { i, j, pivotVal }, note: `Comparing arr[${j}] (${a[j]}) with pivot (${pivotVal})` });
      if (a[j] < pivotVal) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        steps.push({ array: [...a], line: 3, compare: [], swap: [i, j], pivot: [high], sortedIdx: [], vars: { i, j }, note: `Swapped smaller element ${a[i]} to index ${i}` });
      }
    }
    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    steps.push({ array: [...a], line: 4, compare: [], swap: [i + 1, high], pivot: [], sortedIdx: [i + 1], vars: { pivotIdx: i + 1 }, note: `Placed pivot at correct index ${i + 1}` });
    return i + 1;
  }

  function qs(low, high) {
    if (low < high) {
      const p = partition(low, high);
      qs(low, p - 1);
      qs(p + 1, high);
    }
  }

  qs(0, n - 1);
  steps.push({ array: [...a], line: 7, compare: [], swap: [], pivot: [], sortedIdx: Array.from({ length: n }, (_, k) => k), vars: {}, note: "Array fully sorted!" });
  return steps;
}

// 6. Heap Sort
export function generateHeapSort(arr) {
  const a = [...arr];
  const n = a.length;
  const steps = [];

  function heapify(size, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < size && a[left] > a[largest]) largest = left;
    if (right < size && a[right] > a[largest]) largest = right;
    if (largest !== i) {
      [a[i], a[largest]] = [a[largest], a[i]];
      steps.push({ array: [...a], line: 5, compare: [i, largest], swap: [i, largest], pivot: [], sortedIdx: [], vars: { i, largest }, note: `Heapifying: swapped root node ${i} with larger child node ${largest}` });
      heapify(size, largest);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }
  for (let i = n - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    steps.push({ array: [...a], line: 4, compare: [], swap: [0, i], pivot: [i], sortedIdx: Array.from({ length: n - i }, (_, k) => n - 1 - k), vars: { i }, note: `Extracted max element ${a[i]} to sorted position ${i}` });
    heapify(i, 0);
  }
  steps.push({ array: [...a], line: 7, compare: [], swap: [], pivot: [], sortedIdx: Array.from({ length: n }, (_, k) => k), vars: {}, note: "Max Heap sort complete!" });
  return steps;
}
