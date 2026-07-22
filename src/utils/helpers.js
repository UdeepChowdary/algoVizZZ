export function randomArray(size = 12, minVal = 10, maxVal = 99) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal);
  }
  return arr;
}

export function parseCustomArray(inputStr) {
  if (!inputStr || typeof inputStr !== 'string') return null;
  const numbers = inputStr
    .split(/[\s,]+/)
    .map(n => parseInt(n.trim(), 10))
    .filter(n => !isNaN(n) && n > 0 && n <= 999);

  return numbers.length > 0 ? numbers.slice(0, 30) : null;
}
