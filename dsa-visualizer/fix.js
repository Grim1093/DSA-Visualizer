const fs = require('fs');

const original = fs.readFileSync('src/utils/dummyDataGenerator.ts.tmp', 'utf8');

const newContent = `
/**
 * Simulates a Merge Sort execution and generates an array of frames
 * Enhanced: Uses auxiliaryArrays to physically show the left/right splits
 */
export const generateMergeSortFrames = (initialArray: number[]): Frame[] => {
  logger.info('DummyDataGenerator: Starting Merge Sort generation', { initialArray });
  
  const frames: Frame[] = [];
  const arr = [...initialArray];
  let frameIndex = 0;

  frames.push({
    frameIndex: frameIndex++,
    arrayState: [...arr],
    activePointers: {},
    comparing: [],
    swapping: false,
    description: 'Initial array state before Merge Sort begins.',
  });

  const mergeSort = (start: number, end: number) => {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    
    frames.push({
      frameIndex: frameIndex++,
      arrayState: [...arr],
      activePointers: { start, mid, end },
      comparing: [],
      swapping: false,
      description: \`Dividing array from index \${start} to \${end}.\`,
    });

    mergeSort(start, mid);
    mergeSort(mid + 1, end);
    merge(start, mid, end);
  };

  const merge = (start: number, mid: number, end: number) => {
    let left = start;
    let right = mid + 1;
    const temp: number[] = [];

    const leftArrayValues = arr.slice(start, mid + 1);
    const rightArrayValues = arr.slice(mid + 1, end + 1);
    
    const getAuxArrays = (lIdx: number, rIdx: number, merged: number[]) => [
        { id: 'left', values: leftArrayValues.map((v, i) => (i >= lIdx - start ? v : null)), label: 'Left Sub-array' },
        { id: 'right', values: rightArrayValues.map((v, i) => (i >= rIdx - (mid + 1) ? v : null)), label: 'Right Sub-array' },
        { id: 'merged', values: merged, label: 'Merged Array' }
    ];

    frames.push({
      frameIndex: frameIndex++,
      arrayState: [...arr],
      activePointers: { start, end },
      comparing: [],
      swapping: false,
      auxiliaryArrays: getAuxArrays(left, right, [...temp]),
      description: \`Merging sub-arrays: [\${leftArrayValues.join(',')}] and [\${rightArrayValues.join(',')}]\`,
    });

    while (left <= mid && right <= end) {
      frames.push({
        frameIndex: frameIndex++,
        arrayState: [...arr],
        activePointers: {},
        comparing: [],
        swapping: false,
        auxiliaryArrays: getAuxArrays(left, right, [...temp]),
        description: \`Comparing left element \${arr[left]} and right element \${arr[right]}.\`,
      });

      if (arr[left] <= arr[right]) {
        temp.push(arr[left]);
        left++;
      } else {
        temp.push(arr[right]);
        right++;
      }
      
      frames.push({
        frameIndex: frameIndex++,
        arrayState: [...arr],
        activePointers: {},
        comparing: [],
        swapping: false,
        auxiliaryArrays: getAuxArrays(left, right, [...temp]),
        description: \`Moved smaller element into merged array.\`,
      });
    }

    while (left <= mid) {
      temp.push(arr[left]);
      left++;
      frames.push({
        frameIndex: frameIndex++,
        arrayState: [...arr],
        activePointers: {},
        comparing: [],
        swapping: false,
        auxiliaryArrays: getAuxArrays(left, right, [...temp]),
        description: \`Copying remaining left elements...\`,
      });
    }

    while (right <= end) {
      temp.push(arr[right]);
      right++;
      frames.push({
        frameIndex: frameIndex++,
        arrayState: [...arr],
        activePointers: {},
        comparing: [],
        swapping: false,
        auxiliaryArrays: getAuxArrays(left, right, [...temp]),
        description: \`Copying remaining right elements...\`,
      });
    }

    for (let i = 0; i < temp.length; i++) {
      arr[start + i] = temp[i];
      frames.push({
        frameIndex: frameIndex++,
        arrayState: [...arr],
        activePointers: { target: start + i },
        comparing: [],
        swapping: true,
        auxiliaryArrays: [], 
        description: \`Writing sorted element \${temp[i]} back to main array at index \${start + i}.\`,
      });
    }
  };

  mergeSort(0, arr.length - 1);

  frames.push({
    frameIndex: frameIndex++,
    arrayState: [...arr],
    activePointers: {},
    comparing: [],
    swapping: false,
    description: 'Merge Sort complete! Array is fully sorted.',
  });

  logger.info('DummyDataGenerator: Finished Merge Sort generation', { totalFrames: frames.length });
  return frames;
};

/**
 * Simulates a Quick Sort execution and generates an array of frames
 * Enhanced: Extracts the Pivot element physically above the array.
 */
export const generateQuickSortFrames = (initialArray: number[]): Frame[] => {
  logger.info('DummyDataGenerator: Starting Quick Sort generation', { initialArray });
  
  const frames: Frame[] = [];
  const arr = [...initialArray];
  let frameIndex = 0;

  frames.push({
    frameIndex: frameIndex++,
    arrayState: [...arr],
    activePointers: {},
    comparing: [],
    swapping: false,
    description: 'Initial array state before Quick Sort begins.',
  });

  const quickSort = (low: number, high: number) => {
    if (low < high) {
      const pi = partition(low, high);
      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    }
  };

  const partition = (low: number, high: number): number => {
    const pivot = arr[high];
    let i = low - 1;

    frames.push({
      frameIndex: frameIndex++,
      arrayState: [...arr],
      activePointers: { low, high },
      comparing: [],
      swapping: false,
      extractedElements: [{ id: 'pivot', value: pivot, label: 'Pivot', originalIndex: high }],
      description: \`Extracted pivot \${pivot} from index \${high}.\`,
    });

    for (let j = low; j < high; j++) {
      frames.push({
        frameIndex: frameIndex++,
        arrayState: [...arr],
        activePointers: { i: Math.max(low, i), j },
        comparing: [j],
        swapping: false,
        extractedElements: [{ id: 'pivot', value: pivot, label: 'Pivot', originalIndex: high }],
        description: \`Comparing \${arr[j]} with pivot \${pivot}.\`,
      });

      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          frames.push({
            frameIndex: frameIndex++,
            arrayState: [...arr],
            activePointers: { i, j },
            comparing: [i, j],
            swapping: true,
            extractedElements: [{ id: 'pivot', value: pivot, label: 'Pivot', originalIndex: high }],
            description: \`\${arr[j]} < \${pivot}, swapping with element at index \${i}.\`,
          });
          
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;

          frames.push({
            frameIndex: frameIndex++,
            arrayState: [...arr],
            activePointers: { i, j },
            comparing: [],
            swapping: false,
            extractedElements: [{ id: 'pivot', value: pivot, label: 'Pivot', originalIndex: high }],
            description: \`Swap complete.\`,
          });
        }
      }
    }

    if (i + 1 !== high) {
      frames.push({
        frameIndex: frameIndex++,
        arrayState: [...arr],
        activePointers: { target: i + 1 },
        comparing: [i + 1, high],
        swapping: true,
        extractedElements: [{ id: 'pivot', value: pivot, label: 'Pivot', originalIndex: high }],
        description: \`Placing pivot \${pivot} in its correct sorted position.\`,
      });
      
      const temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;
    }
    
    frames.push({
      frameIndex: frameIndex++,
      arrayState: [...arr],
      activePointers: { pivotTarget: i + 1 },
      comparing: [],
      swapping: false,
      description: \`Pivot \${pivot} has dropped into its final position at \${i + 1}.\`,
    });
    
    return i + 1;
  };

  quickSort(0, arr.length - 1);

  frames.push({
    frameIndex: frameIndex++,
    arrayState: [...arr],
    activePointers: {},
    comparing: [],
    swapping: false,
    description: 'Quick Sort complete! Array is fully sorted.',
  });

  logger.info('DummyDataGenerator: Finished Quick Sort generation', { totalFrames: frames.length });
  return frames;
};

/**
 * Simulates Linear Search and generates an array of frames
 */
export const generateLinearSearchFrames = (initialArray: number[], target: number): Frame[] => {
  logger.info('DummyDataGenerator: Starting Linear Search generation', { initialArray, target });
  
  const frames: Frame[] = [];
  const arr = [...initialArray];
  let frameIndex = 0;
  let found = false;

  frames.push({
    frameIndex: frameIndex++,
    arrayState: [...arr],
    activePointers: {},
    comparing: [],
    swapping: false,
    description: \`Starting Linear Search for target value: \${target}.\`,
  });

  for (let i = 0; i < arr.length; i++) {
    frames.push({
      frameIndex: frameIndex++,
      arrayState: [...arr],
      activePointers: { current: i },
      comparing: [i],
      swapping: false,
      description: \`Checking if element at index \${i} (\${arr[i]}) equals \${target}.\`,
    });

    if (arr[i] === target) {
      frames.push({
        frameIndex: frameIndex++,
        arrayState: [...arr],
        activePointers: { found: i },
        comparing: [i],
        swapping: true,
        description: \`Target \${target} found at index \${i}!\`,
      });
      found = true;
      break;
    }
  }

  if (!found) {
    frames.push({
      frameIndex: frameIndex++,
      arrayState: [...arr],
      activePointers: {},
      comparing: [],
      swapping: false,
      description: \`Target \${target} was not found in the array.\`,
    });
  }

  logger.info('DummyDataGenerator: Finished Linear Search generation', { totalFrames: frames.length });
  return frames;
};

/**
 * Simulates Binary Search and generates an array of frames
 * Enhanced: Slices the array down visually using visibleRange
 */
export const generateBinarySearchFrames = (initialArray: number[], target: number): Frame[] => {
  logger.info('DummyDataGenerator: Starting Binary Search generation', { initialArray, target });
  
  const frames: Frame[] = [];
  const arr = [...initialArray];
  let frameIndex = 0;

  arr.sort((a, b) => a - b);
  
  frames.push({
    frameIndex: frameIndex++,
    arrayState: [...arr],
    activePointers: {},
    comparing: [],
    swapping: false,
    visibleRange: [0, arr.length - 1],
    description: \`Binary Search requires a sorted array. Array has been sorted. Searching for \${target}.\`,
  });

  let low = 0;
  let high = arr.length - 1;
  let found = false;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    
    frames.push({
      frameIndex: frameIndex++,
      arrayState: [...arr],
      activePointers: { mid },
      comparing: [mid],
      swapping: false,
      visibleRange: [low, high],
      description: \`Search space is [\${low}...\${high}]. Checking middle element at index \${mid} (\${arr[mid]}).\`,
    });

    if (arr[mid] === target) {
      frames.push({
        frameIndex: frameIndex++,
        arrayState: [...arr],
        activePointers: { found: mid },
        comparing: [mid],
        swapping: true,
        visibleRange: [low, high],
        description: \`Target \${target} found at index \${mid}!\`,
      });
      found = true;
      break;
    } else if (arr[mid] < target) {
      low = mid + 1;
      frames.push({
        frameIndex: frameIndex++,
        arrayState: [...arr],
        activePointers: {},
        comparing: [],
        swapping: false,
        visibleRange: [low, high],
        description: \`\${arr[mid]} < \${target}. Target must be in the right half. Shrinking search space.\`,
      });
    } else {
      high = mid - 1;
      frames.push({
        frameIndex: frameIndex++,
        arrayState: [...arr],
        activePointers: {},
        comparing: [],
        swapping: false,
        visibleRange: [low, high],
        description: \`\${arr[mid]} > \${target}. Target must be in the left half. Shrinking search space.\`,
      });
    }
  }

  if (!found) {
    frames.push({
      frameIndex: frameIndex++,
      arrayState: [...arr],
      activePointers: {},
      comparing: [],
      swapping: false,
      visibleRange: [0, -1], // Empty range
      description: \`Target \${target} was not found in the array.\`,
    });
  }

  logger.info('DummyDataGenerator: Finished Binary Search generation', { totalFrames: frames.length });
  return frames;
};
`;

fs.writeFileSync('src/utils/dummyDataGenerator.ts', original + '\n' + newContent);
console.log('Successfully rebuilt dummyDataGenerator.ts');
