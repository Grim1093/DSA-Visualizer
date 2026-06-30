import { Frame } from '@/store/useVisualizerStore';
import { logger } from '@/utils/logger';

// --- ARRAY ---

export const generateArrayInit = (size: number): Frame[] => {
  const values = Array(size).fill(null);
  return [{
    frameIndex: Date.now(), // Generate a unique timestamp for interactive mode indexing if needed, or just let store handle it
    arrayState: [],
    activePointers: {},
    comparing: [],
    swapping: false,
    description: `Initialized a static Array of size ${size}.`,
    dsArray: { values }
  }];
};

export const generateArrayWrite = (currentState: Frame, index: number, value: number): Frame[] => {
  const values = currentState.dsArray?.values ? [...currentState.dsArray.values] : [];
  
  if (index < 0 || index >= values.length) {
    return [{
      ...currentState,
      description: `Error: Index out of bounds. Cannot write to index ${index}.`
    }];
  }

  const frames: Frame[] = [];
  
  // Frame 1: Highlight index
  frames.push({
    ...currentState,
    activePointers: { target: index },
    description: `Accessing array at index ${index}.`
  });
  
  // Frame 2: Write value
  values[index] = value;
  frames.push({
    ...currentState,
    activePointers: {},
    dsArray: { values },
    description: `Wrote value ${value} to index ${index}.`
  });
  
  return frames;
};

export const generateArrayDelete = (currentState: Frame, index: number): Frame[] => {
  const values = currentState.dsArray?.values ? [...currentState.dsArray.values] : [];
  
  if (index < 0 || index >= values.length || values[index] === null) {
    return [{
      ...currentState,
      description: `Error: Cannot delete at index ${index}.`
    }];
  }

  const frames: Frame[] = [];
  
  frames.push({
    ...currentState,
    activePointers: { target: index },
    description: `Deleting element at index ${index} (${values[index]}).`
  });
  
  // Shift elements
  for (let i = index; i < values.length - 1; i++) {
    values[i] = values[i + 1];
    frames.push({
      ...currentState,
      activePointers: { source: i + 1, target: i },
      dsArray: { values: [...values] },
      description: `Shifted element from index ${i + 1} to index ${i}.`
    });
  }
  
  values[values.length - 1] = null;
  frames.push({
    ...currentState,
    activePointers: {},
    dsArray: { values },
    description: `Cleared last element. Array deletion complete.`
  });
  
  return frames;
};

// --- VECTOR (Dynamic Array) ---

export const generateVectorInit = (): Frame[] => {
  return [{
    frameIndex: Date.now(),
    arrayState: [],
    activePointers: {},
    comparing: [],
    swapping: false,
    description: `Initialized a Vector with capacity 2 and size 0.`,
    dsVector: { values: [null, null], capacity: 2, size: 0 }
  }];
};

export const generateVectorPush = (currentState: Frame, value: number): Frame[] => {
  if (!currentState.dsVector) return [];
  const { values, capacity, size } = currentState.dsVector;
  const frames: Frame[] = [];

  if (size === capacity) {
    const newCapacity = capacity * 2;
    frames.push({
      ...currentState,
      description: `Vector is full (size ${size} == capacity ${capacity}). Initiating resize to capacity ${newCapacity}.`
    });

    const newValues = [...values];
    for (let i = capacity; i < newCapacity; i++) newValues.push(null);
    
    frames.push({
      ...currentState,
      dsVector: { values: newValues, capacity: newCapacity, size },
      description: `Created new array of capacity ${newCapacity} and copied existing elements.`
    });

    newValues[size] = value;
    frames.push({
      ...currentState,
      activePointers: { target: size },
      dsVector: { values: newValues, capacity: newCapacity, size: size + 1 },
      description: `Pushed value ${value} to new vector at index ${size}.`
    });
  } else {
    const newValues = [...values];
    newValues[size] = value;
    frames.push({
      ...currentState,
      activePointers: { target: size },
      dsVector: { values: newValues, capacity, size: size + 1 },
      description: `Pushed value ${value} to vector at index ${size}.`
    });
  }
  
  frames.push({
    ...frames[frames.length - 1],
    activePointers: {},
    description: `Vector push operation complete.`
  });

  return frames;
};

export const generateVectorPop = (currentState: Frame): Frame[] => {
  if (!currentState.dsVector || currentState.dsVector.size === 0) {
    return [{
      ...currentState,
      description: `Error: Cannot pop from an empty vector.`
    }];
  }

  const { values, capacity, size } = currentState.dsVector;
  const newValues = [...values];
  const poppedValue = newValues[size - 1];
  newValues[size - 1] = null; 

  return [
    {
      ...currentState,
      activePointers: { target: size - 1 },
      description: `Accessing last element at index ${size - 1}.`
    },
    {
      ...currentState,
      activePointers: {},
      dsVector: { values: newValues, capacity, size: size - 1 },
      description: `Popped value ${poppedValue} from vector.`
    }
  ];
};

// --- LINKED LIST ---

export const generateLinkedListInit = (type: 'singly' | 'doubly' | 'circular' = 'singly'): Frame[] => {
  return [{
    frameIndex: Date.now(),
    arrayState: [],
    activePointers: {},
    comparing: [],
    swapping: false,
    description: `Initialized an empty ${type} Linked List.`,
    dsLinkedList: { type, nodes: [], head: null, tail: null, pointers: {}, prevPointers: {} }
  }];
};

export const generateLinkedListAppend = (currentState: Frame, value: number): Frame[] => {
  if (!currentState.dsLinkedList) return [];
  const { nodes, head, tail, type, pointers, prevPointers } = currentState.dsLinkedList;
  const frames: Frame[] = [];
  const newNodeId = `node-${Date.now()}`;

  if (nodes.length === 0) {
    const newPointers: Record<string, string> = {};
    if (type === 'circular') {
      newPointers[newNodeId] = newNodeId; // Self-loop
    }
    
    frames.push({
      ...currentState,
      dsLinkedList: { 
        type,
        nodes: [{ id: newNodeId, value }], 
        head: newNodeId, 
        tail: newNodeId,
        pointers: newPointers,
        prevPointers: {}
      },
      description: `List is empty. Created first node and set Head and Tail to it.`
    });
  } else {
    frames.push({
      ...currentState,
      activePointers: { target: nodes.length - 1 },
      description: `Creating new node with value ${value}.`
    });

    const newNodes = [...nodes, { id: newNodeId, value }];
    const newPointers = { ...(pointers || {}) };
    const newPrevPointers = { ...(prevPointers || {}) };
    
    newPointers[tail!] = newNodeId;
    
    if (type === 'doubly') {
      newPrevPointers[newNodeId] = tail!;
    }
    
    if (type === 'circular') {
      newPointers[newNodeId] = head!;
    }

    frames.push({
      ...currentState,
      activePointers: {},
      dsLinkedList: {
        type,
        nodes: newNodes,
        head,
        tail: newNodeId,
        pointers: newPointers,
        prevPointers: newPrevPointers
      },
      description: `Linked old Tail to new node, and updated Tail pointer.`
    });
  }

  return frames;
};

// --- HASH MAP ---

export const generateHashMapInit = (): Frame[] => {
  const buckets = Array.from({ length: 5 }, (_, i) => ({ index: i, chain: [] }));
  return [{
    frameIndex: Date.now(),
    arrayState: [],
    activePointers: {},
    comparing: [],
    swapping: false,
    description: `Initialized a Hash Map with 5 buckets.`,
    dsHashMap: { buckets }
  }];
};

export const generateHashMapSet = (currentState: Frame, key: string, value: string): Frame[] => {
  if (!currentState.dsHashMap) return [];
  const buckets = JSON.parse(JSON.stringify(currentState.dsHashMap.buckets)); // deep copy
  const frames: Frame[] = [];

  // Simple string hash
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash += key.charCodeAt(i);
  }
  const index = hash % 5;

  frames.push({
    ...currentState,
    description: `Hashing key "${key}": char sum is ${hash}. ${hash} % 5 = ${index}. Bucket is ${index}.`
  });

  const chain = buckets[index].chain;
  const existingIdx = chain.findIndex((c: any) => c.key === key);

  if (existingIdx >= 0) {
    frames.push({
      ...currentState,
      activePointers: { bucket: index },
      description: `Key "${key}" already exists in bucket ${index}. Updating value.`
    });
    chain[existingIdx].value = value;
  } else {
    frames.push({
      ...currentState,
      activePointers: { bucket: index },
      description: `Navigating to bucket ${index} and appending (Key: "${key}", Value: "${value}").`
    });
    chain.push({ key, value });
  }

  frames.push({
    ...currentState,
    activePointers: {},
    dsHashMap: { buckets },
    description: `Hash Map updated successfully.`
  });

  return frames;
};
