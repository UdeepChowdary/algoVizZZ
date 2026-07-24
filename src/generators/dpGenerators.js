// 12. 0/1 Knapsack DP Step Generator
export function generateKnapsack01(weights = [2, 3, 4, 5], values = [3, 4, 5, 6], W = 5) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));
  const steps = [];

  steps.push({ dpTable: dp.map(r => [...r]), items: { weights, values, W }, currItem: 0, currCap: 0, line: 1, vars: { W, itemsCount: n }, note: "Initializing DP matrix (n+1 x W+1) with zeroes." });

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= W; w++) {
      const wt = weights[i - 1];
      const val = values[i - 1];
      if (wt <= w) {
        dp[i][w] = Math.max(val + dp[i - 1][w - wt], dp[i - 1][w]);
        steps.push({ dpTable: dp.map(r => [...r]), items: { weights, values, W }, currItem: i, currCap: w, activeCell: [i, w], line: 5, vars: { i, w, itemWeight: wt, itemVal: val, maxVal: dp[i][w] }, note: `Item ${i} fits! dp[${i}][${w}] = max(${val} + dp[${i-1}][${w-wt}], dp[${i-1}][${w}]) = ${dp[i][w]}` });
      } else {
        dp[i][w] = dp[i - 1][w];
        steps.push({ dpTable: dp.map(r => [...r]), items: { weights, values, W }, currItem: i, currCap: w, activeCell: [i, w], line: 6, vars: { i, w, itemWeight: wt }, note: `Item ${i} weight (${wt}) > capacity (${w}). Copied value above: ${dp[i][w]}` });
      }
    }
  }
  steps.push({ dpTable: dp.map(r => [...r]), items: { weights, values, W }, currItem: n, currCap: W, activeCell: [n, W], line: 9, vars: { maxProfit: dp[n][W] }, note: `Optimal knapsack profit value found: ${dp[n][W]}` });
  return steps;
}

// 13. LCS DP Step Generator
export function generateLCS(s1 = "STONE", s2 = "LONGEST") {
  const m = s1.length, n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  const steps = [];

  steps.push({ dpTable: dp.map(r => [...r]), s1, s2, activeCell: [0, 0], line: 1, vars: { s1, s2 }, note: `Comparing strings s1 ("${s1}") and s2 ("${s2}").` });

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
        steps.push({ dpTable: dp.map(r => [...r]), s1, s2, activeCell: [i, j], line: 5, vars: { char1: s1[i-1], char2: s2[j-1], val: dp[i][j] }, note: `Match found '${s1[i-1]}'! dp[${i}][${j}] = 1 + dp[${i-1}][${j-1}] = ${dp[i][j]}` });
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        steps.push({ dpTable: dp.map(r => [...r]), s1, s2, activeCell: [i, j], line: 6, vars: { char1: s1[i-1], char2: s2[j-1], val: dp[i][j] }, note: `Mismatch ('${s1[i-1]}' vs '${s2[j-1]}'). dp[${i}][${j}] = max(dp[${i-1}][${j}], dp[${i}][${j-1}]) = ${dp[i][j]}` });
      }
    }
  }
  steps.push({ dpTable: dp.map(r => [...r]), s1, s2, activeCell: [m, n], line: 9, vars: { lcsLength: dp[m][n] }, note: `Length of Longest Common Subsequence is ${dp[m][n]}` });
  return steps;
}
