// ============================================================
// Hash Table Step Generators
// ============================================================

const TABLE_SIZE = 7;

function getHash(val) {
  return val % TABLE_SIZE;
}

export function generateHashTableChaining() {
  const steps = [];
  const table = Array.from({ length: TABLE_SIZE }, () => []);
  const valuesToInsert = [15, 22, 11, 8, 29, 36]; // Designed to cause collisions

  steps.push({
    table: JSON.parse(JSON.stringify(table)),
    insertingVal: null,
    computedHash: null,
    highlightedIdx: null,
    line: 0,
    note: "Starting with an empty hash table of size 7.",
    type: "chaining"
  });

  for (const val of valuesToInsert) {
    steps.push({
      table: JSON.parse(JSON.stringify(table)),
      insertingVal: val,
      computedHash: null,
      highlightedIdx: null,
      line: 1,
      note: `Ready to insert value: ${val}`,
      type: "chaining"
    });

    const hash = getHash(val);
    
    steps.push({
      table: JSON.parse(JSON.stringify(table)),
      insertingVal: val,
      computedHash: hash,
      highlightedIdx: hash,
      line: 2,
      note: `Compute hash: ${val} % ${TABLE_SIZE} = ${hash}`,
      type: "chaining"
    });

    if (table[hash].length > 0) {
      steps.push({
        table: JSON.parse(JSON.stringify(table)),
        insertingVal: val,
        computedHash: hash,
        highlightedIdx: hash,
        line: 3,
        note: `Collision at index ${hash}! Appending to the linked list.`,
        type: "chaining"
      });
    }

    table[hash].push(val);

    steps.push({
      table: JSON.parse(JSON.stringify(table)),
      insertingVal: val,
      computedHash: hash,
      highlightedIdx: hash,
      line: 4,
      note: `Inserted ${val} into bucket ${hash}.`,
      type: "chaining"
    });
  }

  steps.push({
    table: JSON.parse(JSON.stringify(table)),
    insertingVal: null,
    computedHash: null,
    highlightedIdx: null,
    line: 0,
    note: "All elements inserted successfully.",
    type: "chaining"
  });

  return steps;
}

export function generateHashTableLinearProbing() {
  const steps = [];
  const table = Array(TABLE_SIZE).fill(null);
  const valuesToInsert = [10, 17, 24, 3, 31]; // Designed to cause linear probing clusters

  steps.push({
    table: [...table],
    insertingVal: null,
    computedHash: null,
    probeIdx: null,
    line: 0,
    note: "Starting with an empty hash table of size 7.",
    type: "probing"
  });

  for (const val of valuesToInsert) {
    steps.push({
      table: [...table],
      insertingVal: val,
      computedHash: null,
      probeIdx: null,
      line: 1,
      note: `Ready to insert value: ${val}`,
      type: "probing"
    });

    const hash = getHash(val);
    
    steps.push({
      table: [...table],
      insertingVal: val,
      computedHash: hash,
      probeIdx: hash,
      line: 2,
      note: `Compute hash: ${val} % ${TABLE_SIZE} = ${hash}`,
      type: "probing"
    });

    let probe = hash;
    let attempts = 0;

    while (table[probe] !== null && attempts < TABLE_SIZE) {
      steps.push({
        table: [...table],
        insertingVal: val,
        computedHash: hash,
        probeIdx: probe,
        line: 3,
        note: `Index ${probe} is occupied by ${table[probe]}. Linear probing to next slot...`,
        type: "probing"
      });
      
      probe = (probe + 1) % TABLE_SIZE;
      attempts++;
      
      steps.push({
        table: [...table],
        insertingVal: val,
        computedHash: hash,
        probeIdx: probe,
        line: 4,
        note: `Checking index ${probe}...`,
        type: "probing"
      });
    }

    if (attempts < TABLE_SIZE) {
      table[probe] = val;
      steps.push({
        table: [...table],
        insertingVal: val,
        computedHash: hash,
        probeIdx: probe,
        line: 5,
        note: `Found empty slot at index ${probe}. Inserted ${val}.`,
        type: "probing"
      });
    } else {
      steps.push({
        table: [...table],
        insertingVal: val,
        computedHash: hash,
        probeIdx: probe,
        line: 0,
        note: `Table is full! Cannot insert ${val}.`,
        type: "probing"
      });
    }
  }

  steps.push({
    table: [...table],
    insertingVal: null,
    computedHash: null,
    probeIdx: null,
    line: 0,
    note: "All elements processed.",
    type: "probing"
  });

  return steps;
}
