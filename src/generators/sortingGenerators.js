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

// 7. Kadane's Algorithm (Maximum Subarray)
export function generateKadane(arr) {
  let a = [...arr];
  const hasNegative = a.some(x => x < 0);
  if (!hasNegative && a.length > 5) {
    a = a.map((val, idx) => {
      if (idx === 0) return Math.abs(val) % 30 + 10;
      if (idx % 3 === 0 || idx % 5 === 0) return -(Math.abs(val) % 25 + 8);
      return Math.abs(val) % 35 + 10;
    });
  }

  const steps = [];
  const n = a.length;
  let maxSoFar = a[0];
  let currentMax = a[0];
  let start = 0;
  let end = 0;
  let s = 0;

  steps.push({
    array: [...a],
    line: 2,
    compare: [0],
    swap: [],
    pivot: [0],
    sortedIdx: [0],
    vars: { i: 0, "arr[i]": a[0], currentMax, maxSoFar, subarray: "[0..0]" },
    note: `Initialize with first element: currentMax = ${a[0]}, maxSoFar = ${a[0]}`
  });

  for (let i = 1; i < n; i++) {
    steps.push({
      array: [...a],
      line: 4,
      compare: [i],
      swap: [],
      pivot: [start],
      sortedIdx: Array.from({ length: end - start + 1 }, (_, k) => start + k),
      vars: { i, "arr[i]": a[i], currentMax, maxSoFar },
      note: `Evaluating index ${i} (value ${a[i]}). Does adding it exceed starting fresh?`
    });

    if (a[i] > currentMax + a[i]) {
      currentMax = a[i];
      s = i;
      steps.push({
        array: [...a],
        line: 5,
        compare: [],
        swap: [i],
        pivot: [i],
        sortedIdx: [i],
        vars: { i, currentMax, maxSoFar, action: "Start fresh subarray" },
        note: `Previous running sum was negative! Starting a fresh subarray at index ${i} with sum ${currentMax}`
      });
    } else {
      currentMax += a[i];
      steps.push({
        array: [...a],
        line: 6,
        compare: [i],
        swap: [],
        pivot: [s],
        sortedIdx: Array.from({ length: i - s + 1 }, (_, k) => s + k),
        vars: { i, currentMax, maxSoFar, action: "Extended subarray" },
        note: `Extended subarray [${s}..${i}]. Running sum is now ${currentMax}`
      });
    }

    if (currentMax > maxSoFar) {
      maxSoFar = currentMax;
      start = s;
      end = i;
      steps.push({
        array: [...a],
        line: 8,
        compare: [],
        swap: [],
        pivot: [i],
        sortedIdx: Array.from({ length: end - start + 1 }, (_, k) => start + k),
        vars: { i, currentMax, maxSoFar, bestSubarray: `[${start}..${end}]` },
        note: `New maximum subarray found from index ${start} to ${end} with sum = ${maxSoFar}!`
      });
    }
  }

  steps.push({
    array: [...a],
    line: 11,
    compare: [],
    swap: [],
    pivot: [],
    sortedIdx: Array.from({ length: end - start + 1 }, (_, k) => start + k),
    vars: { maxSoFar, bestSubarray: `[${start}..${end}]` },
    note: `Kadane's algorithm complete! Maximum contiguous subarray is [${start}..${end}] with sum = ${maxSoFar}.`
  });

  return steps;
}

// 8. Dutch National Flag (3-Way Partition / Sort 0s, 1s, 2s)
export function generateDutchNationalFlag(arr) {
  let a = arr.map(x => Math.abs(x) % 3);
  if (!a.includes(0) || !a.includes(1) || !a.includes(2)) {
    a = [2, 0, 2, 1, 1, 0, 2, 1, 0, 2, 0, 1];
  }
  const n = a.length;
  const steps = [];

  let low = 0;
  let mid = 0;
  let high = n - 1;

  steps.push({
    array: [...a],
    line: 2,
    compare: [mid],
    swap: [],
    pivot: [low, high],
    sortedIdx: [],
    vars: { low, mid, high, "arr[mid]": a[mid] },
    note: `Initialized 3 pointers: low=0 (0s boundary), mid=0 (current scanner), high=${high} (2s boundary).`
  });

  while (mid <= high) {
    if (a[mid] === 0) {
      steps.push({
        array: [...a],
        line: 5,
        compare: [mid, low],
        swap: [],
        pivot: [low, high],
        sortedIdx: Array.from({ length: low }, (_, k) => k),
        vars: { low, mid, high, "arr[mid]": a[mid] },
        note: `arr[mid] is 0! Swapping arr[low] (${a[low]}) and arr[mid] (${a[mid]}).`
      });
      [a[low], a[mid]] = [a[mid], a[low]];
      low++;
      mid++;
      steps.push({
        array: [...a],
        line: 6,
        compare: [],
        swap: [low - 1, mid - 1],
        pivot: [low, high],
        sortedIdx: Array.from({ length: low }, (_, k) => k),
        vars: { low, mid, high },
        note: `Placed 0 into left partition. Advanced low to ${low} and mid to ${mid}.`
      });
    } else if (a[mid] === 1) {
      steps.push({
        array: [...a],
        line: 8,
        compare: [mid],
        swap: [],
        pivot: [low, high],
        sortedIdx: Array.from({ length: low }, (_, k) => k),
        vars: { low, mid, high, "arr[mid]": 1 },
        note: `arr[mid] is 1! Element is already in the middle partition. Increment mid to ${mid + 1}.`
      });
      mid++;
    } else {
      steps.push({
        array: [...a],
        line: 11,
        compare: [mid, high],
        swap: [],
        pivot: [low, high],
        sortedIdx: Array.from({ length: n - 1 - high }, (_, k) => n - 1 - k),
        vars: { low, mid, high, "arr[mid]": a[mid] },
        note: `arr[mid] is 2! Swapping arr[mid] (${a[mid]}) with arr[high] (${a[high]}).`
      });
      [a[mid], a[high]] = [a[high], a[mid]];
      high--;
      steps.push({
        array: [...a],
        line: 12,
        compare: [],
        swap: [mid, high + 1],
        pivot: [low, high],
        sortedIdx: Array.from({ length: n - 1 - high }, (_, k) => n - 1 - k),
        vars: { low, mid, high },
        note: `Placed 2 into right partition. Decremented high to ${high}. Keep mid at ${mid} to inspect swapped value.`
      });
    }
  }

  steps.push({
    array: [...a],
    line: 15,
    compare: [],
    swap: [],
    pivot: [],
    sortedIdx: Array.from({ length: n }, (_, k) => k),
    vars: { low, mid, high },
    note: `Dutch National Flag partition complete! All 0s, 1s, and 2s cleanly sorted in O(n) single pass.`
  });

  return steps;
}
