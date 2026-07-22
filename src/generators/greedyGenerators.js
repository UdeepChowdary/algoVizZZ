// 15. Fractional Knapsack Greedy Step Generator
export function generateFractionalKnapsack() {
  const items = [
    { id: 1, val: 60, wt: 10, ratio: 6.0 },
    { id: 2, val: 100, wt: 20, ratio: 5.0 },
    { id: 3, val: 120, wt: 30, ratio: 4.0 }
  ];
  let capacity = 50;
  const initialCapacity = capacity;
  const steps = [];

  steps.push({ items: [...items], capacity, initialCapacity, totalVal: 0, line: 2, vars: { capacity }, note: "Sorted items by value-to-weight ratio in descending order." });
  let totalVal = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (capacity >= item.wt) {
      capacity -= item.wt;
      totalVal += item.val;
      steps.push({ items: [...items], capacity, initialCapacity, totalVal, activeIdx: i, fraction: 1.0, line: 6, vars: { takenItem: item.id, itemWt: item.wt, remCap: capacity }, note: `Took 100% of item #${item.id} (wt: ${item.wt}kg, val: $${item.val}). Remaining capacity: ${capacity}kg` });
    } else {
      const frac = capacity / item.wt;
      totalVal += item.val * frac;
      capacity = 0;
      steps.push({ items: [...items], capacity, initialCapacity, totalVal, activeIdx: i, fraction: frac, line: 8, vars: { takenItem: item.id, frac: (frac * 100).toFixed(0) + "%" }, note: `Took ${(frac * 100).toFixed(0)}% fraction of item #${item.id}. Knapsack now full!` });
      break;
    }
  }
  steps.push({ items: [...items], capacity, initialCapacity, totalVal, activeIdx: null, line: 10, vars: { totalVal: `$${totalVal.toFixed(2)}` }, note: `Optimal total value computed = $${totalVal.toFixed(2)}` });
  return steps;
}
