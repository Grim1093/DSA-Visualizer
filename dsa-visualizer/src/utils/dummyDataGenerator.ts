import { Frame } from '@/store/useVisualizerStore';
import { logger } from '@/utils/logger';

/**
 * Simulates a Bubble Sort execution and generates an array of frames
 */
export const generateBubbleSortFrames = (initialArray: number[]): Frame[] => {
  logger.info('DummyDataGenerator: Starting Bubble Sort generation', { initialArray });
  
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
        logger.debug('DummyDataGenerator: Bubble Sort array sorted early, breaking loop', { pass: i });
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

  logger.info('DummyDataGenerator: Finished Bubble Sort generation', { totalFrames: frames.length });
  return frames;
};

/**
 * Simulates a Selection Sort execution and generates an array of frames
 */
export const generateSelectionSortFrames = (initialArray: number[]): Frame[] => {
  logger.info('DummyDataGenerator: Starting Selection Sort generation', { initialArray });
  
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

  logger.info('DummyDataGenerator: Finished Selection Sort generation', { totalFrames: frames.length });
  return frames;
};

/**
 * Simulates an Insertion Sort execution and generates an array of frames
 */
export const generateInsertionSortFrames = (initialArray: number[]): Frame[] => {
  logger.info('DummyDataGenerator: Starting Insertion Sort generation', { initialArray });
  
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

  logger.info('DummyDataGenerator: Finished Insertion Sort generation', { totalFrames: frames.length });
  return frames;
};