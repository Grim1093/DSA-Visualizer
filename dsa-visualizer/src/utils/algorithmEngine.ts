import { Frame } from '@/store/useVisualizerStore';
import { logger } from '@/utils/logger';
import { GraphData } from './graphParser';

/**
 * Simulates a Bubble Sort execution and generates an array of frames
 */
export const generateBubbleSortFrames = (initialArray: number[]): Frame[] => {
  logger.info('AlgorithmEngine: Starting Bubble Sort generation', { initialArray });
  
  const frames: Frame[] = [];
  const arr = [...initialArray];
  let frameIndex = 0;

  frames.push({
    frameIndex: frameIndex++,
    arrayState: [...arr],
    activePointers: {},
    comparing: [],
    swapping: false,
    description: 'Initial array state before Bubble Sort begins.',
  });

  for (let i = 0; i < arr.length; i++) {
    let swapped = false;
    
    for (let j = 0; j < arr.length - i - 1; j++) {
      frames.push({
        frameIndex: frameIndex++,
        arrayState: [...arr],
        activePointers: { i: arr.length - i - 1, j },
        comparing: [j, j + 1],
        swapping: false,
        description: `Comparing elements at index ${j} (${arr[j]}) and ${j + 1} (${arr[j + 1]}).`,
      });

      if (arr[j] > arr[j + 1]) {
        frames.push({
          frameIndex: frameIndex++,
          arrayState: [...arr], 
          activePointers: { i: arr.length - i - 1, j },
          comparing: [j, j + 1],
          swapping: true,
          description: `${arr[j]} > ${arr[j + 1]}, so we swap them.`,
        });

        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;

        frames.push({
          frameIndex: frameIndex++,
          arrayState: [...arr],
          activePointers: { i: arr.length - i - 1, j },
          comparing: [],
          swapping: false,
          description: `Swap complete.`,
        });
      } else {
        frames.push({
          frameIndex: frameIndex++,
          arrayState: [...arr],
          activePointers: { i: arr.length - i - 1, j },
          comparing: [],
          swapping: false,
          description: `${arr[j]} is not greater than ${arr[j + 1]}. No swap needed.`,
        });
      }
    }
    
    if (!swapped) {
        logger.debug('AlgorithmEngine: Bubble Sort array sorted early, breaking loop', { pass: i });
        break;
    }
  }

  frames.push({
    frameIndex: frameIndex++,
    arrayState: [...arr],
    activePointers: {},
    comparing: [],
    swapping: false,
    description: 'Bubble Sort complete! Array is fully sorted.',
  });

  logger.info('AlgorithmEngine: Finished Bubble Sort generation', { totalFrames: frames.length });
  return frames;
};

/**
 * Simulates a Selection Sort execution and generates an array of frames
 */
export const generateSelectionSortFrames = (initialArray: number[]): Frame[] => {
  logger.info('AlgorithmEngine: Starting Selection Sort generation', { initialArray });
  
  const frames: Frame[] = [];
  const arr = [...initialArray];
  let frameIndex = 0;

  frames.push({
    frameIndex: frameIndex++,
    arrayState: [...arr],
    activePointers: {},
    comparing: [],
    swapping: false,
    description: 'Initial array state before Selection Sort begins.',
  });

  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    
    frames.push({
      frameIndex: frameIndex++,
      arrayState: [...arr],
      activePointers: { i, min: minIndex },
      comparing: [],
      swapping: false,
      description: `Starting pass ${i + 1}. Assuming minimum is at index ${minIndex} (${arr[minIndex]}).`,
    });

    for (let j = i + 1; j < arr.length; j++) {
      frames.push({
        frameIndex: frameIndex++,
        arrayState: [...arr],
        activePointers: { i, min: minIndex, j },
        comparing: [j, minIndex],
        swapping: false,
        description: `Comparing current element ${arr[j]} with current minimum ${arr[minIndex]}.`,
      });

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
        frames.push({
          frameIndex: frameIndex++,
          arrayState: [...arr],
          activePointers: { i, min: minIndex, j },
          comparing: [],
          swapping: false,
          description: `Found new minimum: ${arr[minIndex]} at index ${minIndex}.`,
        });
      }
    }

    if (minIndex !== i) {
      frames.push({
        frameIndex: frameIndex++,
        arrayState: [...arr],
        activePointers: { i, min: minIndex },
        comparing: [i, minIndex],
        swapping: true,
        description: `Pass complete. Swapping original assumed minimum (${arr[i]}) with actual minimum (${arr[minIndex]}).`,
      });

      const temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;

      frames.push({
        frameIndex: frameIndex++,
        arrayState: [...arr],
        activePointers: { i, min: minIndex },
        comparing: [],
        swapping: false,
        description: `Swap complete. Element ${arr[i]} is now in its final sorted position.`,
      });
    } else {
      frames.push({
        frameIndex: frameIndex++,
        arrayState: [...arr],
        activePointers: { i, min: minIndex },
        comparing: [],
        swapping: false,
        description: `Pass complete. Minimum element is already in the correct position. No swap needed.`,
      });
    }
  }

  frames.push({
    frameIndex: frameIndex++,
    arrayState: [...arr],
    activePointers: {},
    comparing: [],
    swapping: false,
    description: 'Selection Sort complete! Array is fully sorted.',
  });

  logger.info('AlgorithmEngine: Finished Selection Sort generation', { totalFrames: frames.length });
  return frames;
};

/**
 * Simulates an Insertion Sort execution and generates an array of frames
 */
export const generateInsertionSortFrames = (initialArray: number[]): Frame[] => {
  logger.info('AlgorithmEngine: Starting Insertion Sort generation', { initialArray });
  
  const frames: Frame[] = [];
  const arr = [...initialArray];
  let frameIndex = 0;

  frames.push({
    frameIndex: frameIndex++,
    arrayState: [...arr],
    activePointers: {},
    comparing: [],
    swapping: false,
    description: 'Initial array state before Insertion Sort begins. First element is considered sorted.',
  });

  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    frames.push({
      frameIndex: frameIndex++,
      arrayState: [...arr],
      activePointers: { i, j },
      comparing: [i],
      swapping: false,
      description: `Targeting element ${key} at index ${i} to insert into the sorted portion.`,
    });

    while (j >= 0 && arr[j] > key) {
      frames.push({
        frameIndex: frameIndex++,
        arrayState: [...arr],
        activePointers: { i, j },
        comparing: [j, j + 1],
        swapping: true,
        description: `${arr[j]} is greater than our target ${key}. Shifting ${arr[j]} to the right.`,
      });

      arr[j + 1] = arr[j];
      j = j - 1;

      frames.push({
        frameIndex: frameIndex++,
        arrayState: [...arr],
        activePointers: { i, j: Math.max(0, j) },
        comparing: [],
        swapping: false,
        description: `Shift complete. Looking at next element to the left.`,
      });
    }

    frames.push({
      frameIndex: frameIndex++,
      arrayState: [...arr],
      activePointers: { i, j: j + 1 },
      comparing: [j + 1],
      swapping: true,
      description: `Found correct insertion point. Placing ${key} at index ${j + 1}.`,
    });

    arr[j + 1] = key;

    frames.push({
      frameIndex: frameIndex++,
      arrayState: [...arr],
      activePointers: {},
      comparing: [],
      swapping: false,
      description: `Target ${key} successfully inserted.`,
    });
  }

  frames.push({
    frameIndex: frameIndex++,
    arrayState: [...arr],
    activePointers: {},
    comparing: [],
    swapping: false,
    description: 'Insertion Sort complete! Array is fully sorted.',
  });

  logger.info('AlgorithmEngine: Finished Insertion Sort generation', { totalFrames: frames.length });
  return frames;
};



/**
 * Simulates a Merge Sort execution and generates an array of frames
 * Enhanced: Uses auxiliaryArrays to physically show the left/right splits
 */
export const generateMergeSortFrames = (initialArray: number[]): Frame[] => {
  logger.info('AlgorithmEngine: Starting Merge Sort generation', { initialArray });
  
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
      description: `Dividing array from index ${start} to ${end}.`,
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
      description: `Merging sub-arrays: [${leftArrayValues.join(',')}] and [${rightArrayValues.join(',')}]`,
    });

    while (left <= mid && right <= end) {
      frames.push({
        frameIndex: frameIndex++,
        arrayState: [...arr],
        activePointers: {},
        comparing: [],
        swapping: false,
        auxiliaryArrays: getAuxArrays(left, right, [...temp]),
        description: `Comparing left element ${arr[left]} and right element ${arr[right]}.`,
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
        description: `Moved smaller element into merged array.`,
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
        description: `Copying remaining left elements...`,
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
        description: `Copying remaining right elements...`,
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
        description: `Writing sorted element ${temp[i]} back to main array at index ${start + i}.`,
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

  logger.info('AlgorithmEngine: Finished Merge Sort generation', { totalFrames: frames.length });
  return frames;
};

/**
 * Simulates a Quick Sort execution and generates an array of frames
 * Enhanced: Extracts the Pivot element physically above the array.
 */
export const generateQuickSortFrames = (initialArray: number[]): Frame[] => {
  logger.info('AlgorithmEngine: Starting Quick Sort generation', { initialArray });
  
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
      description: `Extracted pivot ${pivot} from index ${high}.`,
    });

    for (let j = low; j < high; j++) {
      frames.push({
        frameIndex: frameIndex++,
        arrayState: [...arr],
        activePointers: { i: Math.max(low, i), j },
        comparing: [j],
        swapping: false,
        extractedElements: [{ id: 'pivot', value: pivot, label: 'Pivot', originalIndex: high }],
        description: `Comparing ${arr[j]} with pivot ${pivot}.`,
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
            description: `${arr[j]} < ${pivot}, swapping with element at index ${i}.`,
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
            description: `Swap complete.`,
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
        description: `Placing pivot ${pivot} in its correct sorted position.`,
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
      description: `Pivot ${pivot} has dropped into its final position at ${i + 1}.`,
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

  logger.info('AlgorithmEngine: Finished Quick Sort generation', { totalFrames: frames.length });
  return frames;
};

/**
 * Simulates Linear Search and generates an array of frames
 */
export const generateLinearSearchFrames = (initialArray: number[], target: number): Frame[] => {
  logger.info('AlgorithmEngine: Starting Linear Search generation', { initialArray, target });
  
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
    description: `Starting Linear Search for target value: ${target}.`,
  });

  for (let i = 0; i < arr.length; i++) {
    frames.push({
      frameIndex: frameIndex++,
      arrayState: [...arr],
      activePointers: { current: i },
      comparing: [i],
      swapping: false,
      description: `Checking if element at index ${i} (${arr[i]}) equals ${target}.`,
    });

    if (arr[i] === target) {
      frames.push({
        frameIndex: frameIndex++,
        arrayState: [...arr],
        activePointers: { found: i },
        comparing: [i],
        swapping: true,
        description: `Target ${target} found at index ${i}!`,
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
      description: `Target ${target} was not found in the array.`,
    });
  }

  logger.info('AlgorithmEngine: Finished Linear Search generation', { totalFrames: frames.length });
  return frames;
};

/**
 * Simulates Binary Search and generates an array of frames
 * Enhanced: Slices the array down visually using visibleRange
 */
export const generateBinarySearchFrames = (initialArray: number[], target: number): Frame[] => {
  logger.info('AlgorithmEngine: Starting Binary Search generation', { initialArray, target });
  
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
    description: `Binary Search requires a sorted array. Array has been sorted. Searching for ${target}.`,
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
      description: `Search space is [${low}...${high}]. Checking middle element at index ${mid} (${arr[mid]}).`,
    });

    if (arr[mid] === target) {
      frames.push({
        frameIndex: frameIndex++,
        arrayState: [...arr],
        activePointers: { found: mid },
        comparing: [mid],
        swapping: true,
        visibleRange: [low, high],
        description: `Target ${target} found at index ${mid}!`,
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
        description: `${arr[mid]} < ${target}. Target must be in the right half. Shrinking search space.`,
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
        description: `${arr[mid]} > ${target}. Target must be in the left half. Shrinking search space.`,
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
      description: `Target ${target} was not found in the array.`,
    });
  }

  logger.info('AlgorithmEngine: Finished Binary Search generation', { totalFrames: frames.length });
  return frames;
};

/**
 * Simulates a BFS execution on the provided graph
 */
export const generateBFSFrames = (graph: GraphData, startNode: string): Frame[] => {
  logger.info('AlgorithmEngine: Starting BFS generation', { startNode });
  const frames: Frame[] = [];
  let frameIndex = 0;
  
  const visited: string[] = [];
  const queue: string[] = [];
  
  const addFrame = (currentNode: string | undefined, desc: string) => {
    frames.push({
      frameIndex: frameIndex++,
      arrayState: [],
      activePointers: {},
      comparing: [],
      swapping: false,
      graphState: {
        nodes: graph.nodes,
        edges: graph.edges
      },
      visitedNodes: [...visited],
      currentNode: currentNode,
      dataStructureState: [...queue],
      description: desc
    });
  };

  addFrame(undefined, `Initial Graph State. Starting BFS from node ${startNode}.`);

  queue.push(startNode);
  visited.push(startNode);
  addFrame(undefined, `Enqueue starting node ${startNode} and mark it as visited.`);

  while (queue.length > 0) {
    const current = queue.shift()!;
    addFrame(current, `Dequeue node ${current} and process it.`);

    const neighbors = graph.adjList[current] || [];
    
    for (const neighbor of neighbors) {
      if (!visited.includes(neighbor)) {
        visited.push(neighbor);
        queue.push(neighbor);
        addFrame(current, `Found unvisited neighbor ${neighbor} of ${current}. Mark visited and Enqueue.`);
      } else {
        addFrame(current, `Neighbor ${neighbor} of ${current} is already visited. Skipping.`);
      }
    }
  }

  addFrame(undefined, 'BFS Complete! All reachable nodes have been visited.');
  return frames;
};

/**
 * Simulates a DFS execution on the provided graph
 */
export const generateDFSFrames = (graph: GraphData, startNode: string): Frame[] => {
  logger.info('AlgorithmEngine: Starting DFS generation', { startNode });
  const frames: Frame[] = [];
  let frameIndex = 0;
  
  const visited: string[] = [];
  const stack: string[] = [];
  
  const addFrame = (currentNode: string | undefined, desc: string) => {
    frames.push({
      frameIndex: frameIndex++,
      arrayState: [],
      activePointers: {},
      comparing: [],
      swapping: false,
      graphState: {
        nodes: graph.nodes,
        edges: graph.edges
      },
      visitedNodes: [...visited],
      currentNode: currentNode,
      dataStructureState: [...stack],
      description: desc
    });
  };

  addFrame(undefined, `Initial Graph State. Starting DFS from node ${startNode}.`);

  stack.push(startNode);
  addFrame(undefined, `Push starting node ${startNode} onto the Stack.`);

  while (stack.length > 0) {
    const current = stack.pop()!;
    
    if (!visited.includes(current)) {
      visited.push(current);
      addFrame(current, `Pop node ${current} from Stack, mark it as visited, and process it.`);

      const neighbors = graph.adjList[current] || [];
      
      // Reverse neighbors to process left-to-right structurally because it's a stack
      const reversedNeighbors = [...neighbors].reverse();
      
      for (const neighbor of reversedNeighbors) {
        if (!visited.includes(neighbor)) {
          stack.push(neighbor);
          addFrame(current, `Found unvisited neighbor ${neighbor}. Push onto Stack.`);
        }
      }
    } else {
      addFrame(undefined, `Pop node ${current} from Stack. It is already visited, so skip.`);
    }
  }

  addFrame(undefined, 'DFS Complete! All reachable nodes have been visited.');
  return frames;
};

/**
 * Simulates Dynamic Programming (Fibonacci) and generates frames
 * Shows a 1D array being filled up
 */
export const generateDPFrames = (n: number): Frame[] => {
  logger.info('AlgorithmEngine: Starting DP (Fibonacci) generation', { n });
  
  const frames: Frame[] = [];
  let frameIndex = 0;
  
  if (n <= 0) n = 1;
  if (n > 20) n = 20; // limit size for visualization
  
  const dp = Array(n + 1).fill(null);
  
  frames.push({
    frameIndex: frameIndex++,
    arrayState: [],
    dsArray: { values: [...dp] },
    activePointers: {},
    comparing: [],
    swapping: false,
    description: `Initialized DP table of size ${n + 1} to compute Fibonacci(${n}).`,
  });

  dp[0] = 0;
  frames.push({
    frameIndex: frameIndex++,
    arrayState: [],
    dsArray: { values: [...dp] },
    activePointers: { target: 0 },
    comparing: [],
    swapping: false,
    description: `Base case: dp[0] = 0.`,
  });

  if (n >= 1) {
    dp[1] = 1;
    frames.push({
      frameIndex: frameIndex++,
      arrayState: [],
    dsArray: { values: [...dp] },
      activePointers: { target: 1 },
      comparing: [],
      swapping: false,
      description: `Base case: dp[1] = 1.`,
    });
  }

  for (let i = 2; i <= n; i++) {
    frames.push({
      frameIndex: frameIndex++,
      arrayState: [],
    dsArray: { values: [...dp] },
      activePointers: { target: i },
      comparing: [i - 1, i - 2],
      swapping: false,
      description: `Computing dp[${i}]. Looking up dp[${i-1}] (${dp[i-1]}) and dp[${i-2}] (${dp[i-2]}).`,
    });

    dp[i] = dp[i - 1] + dp[i - 2];

    frames.push({
      frameIndex: frameIndex++,
      arrayState: [],
    dsArray: { values: [...dp] },
      activePointers: { target: i },
      comparing: [],
      swapping: true,
      description: `dp[${i}] = ${dp[i-1]} + ${dp[i-2]} = ${dp[i]}.`,
    });
  }

  frames.push({
    frameIndex: frameIndex++,
    arrayState: [],
    dsArray: { values: [...dp] },
    activePointers: {},
    comparing: [],
    swapping: false,
    description: `DP Complete! Fibonacci(${n}) is ${dp[n]}.`,
  });

  return frames;
};

/**
 * Simulates Dijkstra's Algorithm execution on a graph
 * For simplicity, we assume unit edge weights unless specified otherwise
 */
export const generateDijkstraFrames = (graph: GraphData, startNode: string): Frame[] => {
  logger.info('AlgorithmEngine: Starting Dijkstra generation', { startNode });
  const frames: Frame[] = [];
  let frameIndex = 0;
  
  const visited: string[] = [];
  const distances: Record<string, number> = {};
  const pq: {node: string, dist: number}[] = [];
  
  graph.nodes.forEach(n => {
    distances[n.id] = Infinity;
  });
  
  const addFrame = (currentNode: string | undefined, activeEdge: string | undefined, desc: string) => {
    // encode distances into node labels for visualization
    const displayNodes = graph.nodes.map(n => ({
      ...n,
      label: `${n.label}\n(${distances[n.id] === Infinity ? '∞' : distances[n.id]})`
    }));
    
    // highlight active edge if provided
    const displayEdges = graph.edges.map(e => {
      const edgeStr1 = `${e.source}-${e.target}`;
      const edgeStr2 = `${e.target}-${e.source}`;
      return {
        ...e,
        isTraversed: activeEdge === edgeStr1 || activeEdge === edgeStr2 || 
                     (visited.includes(e.source) && visited.includes(e.target))
      };
    });

    frames.push({
      frameIndex: frameIndex++,
      arrayState: [],
      activePointers: {},
      comparing: [],
      swapping: false,
      graphState: {
        nodes: displayNodes,
        edges: displayEdges
      },
      visitedNodes: [...visited],
      currentNode: currentNode,
      dataStructureState: pq.map(item => `${item.node}(${item.dist})`),
      description: desc
    });
  };

  addFrame(undefined, undefined, `Initial State. Starting Dijkstra from node ${startNode}. Distances set to Infinity.`);

  distances[startNode] = 0;
  pq.push({node: startNode, dist: 0});
  addFrame(startNode, undefined, `Distance to start node ${startNode} is 0. Push to Priority Queue.`);

  while (pq.length > 0) {
    pq.sort((a, b) => a.dist - b.dist);
    const current = pq.shift()!;
    
    if (visited.includes(current.node)) {
      addFrame(current.node, undefined, `Node ${current.node} already visited. Skipping.`);
      continue;
    }

    addFrame(current.node, undefined, `Pop node ${current.node} with distance ${current.dist} from Priority Queue.`);
    
    const neighbors = graph.adjList[current.node] || [];
    
    for (const neighbor of neighbors) {
      if (visited.includes(neighbor)) continue;
      
      const weight = 1; // Assuming unit weights for visualization
      const newDist = distances[current.node] + weight;
      const activeEdge = `${current.node}-${neighbor}`;
      
      addFrame(current.node, activeEdge, `Checking neighbor ${neighbor} via edge ${current.node}-${neighbor}.`);
      
      if (newDist < distances[neighbor]) {
        const oldDist = distances[neighbor];
        distances[neighbor] = newDist;
        pq.push({node: neighbor, dist: newDist});
        addFrame(current.node, activeEdge, `New distance ${newDist} is less than old distance ${oldDist === Infinity ? '∞' : oldDist}. Update distance and push to Priority Queue.`);
      } else {
        addFrame(current.node, activeEdge, `Current distance ${distances[neighbor]} is better or equal. No update.`);
      }
    }
    
    visited.push(current.node);
    addFrame(current.node, undefined, `Finished processing node ${current.node}. Marked as visited.`);
  }

  addFrame(undefined, undefined, "Dijkstra's Algorithm Complete! Shortest paths from start node found.");
  return frames;
};
