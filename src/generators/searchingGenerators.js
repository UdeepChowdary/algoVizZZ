// 7. Linear Search
export function generateLinearSearch(arr, customTarget = null) {
  const a = [...arr];
  const steps = [];
  const targetVal = customTarget !== null ? Number(customTarget) : a[Math.floor(a.length / 2)];
  let found = -1;

  steps.push({
    array: [...a],
    line: 1,
    compare: [],
    swap: [],
    pivot: [],
    sortedIdx: [],
    vars: { target: targetVal },
    note: `Searching for target value ${targetVal} in array...`
  });

  for (let i = 0; i < a.length; i++) {
    steps.push({
      array: [...a],
      line: 2,
      compare: [i],
      swap: [],
      pivot: [],
      sortedIdx: [],
      vars: { i, target: targetVal, currentVal: a[i] },
      note: `Checking index ${i}: arr[${i}] (${a[i]}) == target (${targetVal})?`
    });

    if (a[i] === targetVal) {
      found = i;
      steps.push({
        array: [...a],
        line: 3,
        compare: [],
        swap: [],
        pivot: [i],
        sortedIdx: [i],
        vars: { foundIndex: i, target: targetVal },
        note: `SUCCESS! Target ${targetVal} found at index ${i}!`
      });
      break;
    }
  }

  if (found === -1) {
    steps.push({
      array: [...a],
      line: 4,
      compare: [],
      swap: [],
      pivot: [],
      sortedIdx: [],
      vars: { target: targetVal, result: "Not found" },
      note: `Target ${targetVal} was not found in the array.`
    });
  }

  return steps;
}

// 8. Binary Search
export function generateBinarySearch(arr, customTarget = null) {
  const a = [...arr].sort((x, y) => x - y);
  const steps = [];
  const targetVal = customTarget !== null ? Number(customTarget) : a[Math.floor(a.length * 0.7)];
  let low = 0, high = a.length - 1;
  let found = -1;

  steps.push({
    array: [...a],
    line: 1,
    compare: [],
    swap: [],
    pivot: [low, high],
    sortedIdx: [],
    vars: { low, high, target: targetVal },
    note: `Sorted array. Initialized low = 0, high = ${high}. Searching for ${targetVal}...`
  });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    steps.push({
      array: [...a],
      line: 4,
      compare: [mid],
      swap: [],
      pivot: [low, high],
      sortedIdx: [],
      vars: { low, high, mid, target: targetVal, midVal: a[mid] },
      note: `Mid index ${mid} (arr[${mid}] = ${a[mid]}). Active range: [${low}..${high}]`
    });

    if (a[mid] === targetVal) {
      found = mid;
      steps.push({
        array: [...a],
        line: 5,
        compare: [],
        swap: [],
        pivot: [],
        sortedIdx: [mid],
        vars: { mid, target: targetVal },
        note: `SUCCESS! Target ${targetVal} found at mid index ${mid}!`
      });
      break;
    } else if (a[mid] < targetVal) {
      low = mid + 1;
      steps.push({
        array: [...a],
        line: 6,
        compare: [],
        swap: [],
        pivot: [Math.min(low, a.length - 1), high],
        sortedIdx: [],
        vars: { low, high, target: targetVal },
        note: `arr[mid] (${a[mid]}) < target (${targetVal}). Updating low = ${low}`
      });
    } else {
      high = mid - 1;
      steps.push({
        array: [...a],
        line: 7,
        compare: [],
        swap: [],
        pivot: [low, Math.max(0, high)],
        sortedIdx: [],
        vars: { low, high, target: targetVal },
        note: `arr[mid] (${a[mid]}) > target (${targetVal}). Updating high = ${high}`
      });
    }
  }

  if (found === -1) {
    steps.push({
      array: [...a],
      line: 8,
      compare: [],
      swap: [],
      pivot: [],
      sortedIdx: [],
      vars: { target: targetVal, result: "Not found" },
      note: `Target ${targetVal} not found in the array.`
    });
  }

  return steps;
}
