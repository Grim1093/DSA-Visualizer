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

export const generateArrayRead = (currentState: Frame, index: number): Frame[] => {
  const values = currentState.dsArray?.values ? [...currentState.dsArray.values] : [];
  if (index < 0 || index >= values.length || values[index] === null) {
    return [{
      ...currentState,
      description: `Error: Cannot read at index ${index}.`
    }];
  }
  return [
    {
      ...currentState,
      activePointers: { target: index },
      description: `Reading element at index ${index}. Value is ${values[index]}.`
    },
    {
      ...currentState,
      activePointers: {},
      description: `Read operation complete.`
    }
  ];
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

export const generateVectorAccess = (currentState: Frame, index: number): Frame[] => {
  if (!currentState.dsVector || index < 0 || index >= currentState.dsVector.size) {
    return [{ ...currentState, description: `Error: Index ${index} out of bounds.` }];
  }
  const value = currentState.dsVector.values[index];
  return [
    {
      ...currentState,
      activePointers: { target: index },
      description: `Accessing element at index ${index}. Value is ${value}.`
    },
    {
      ...currentState,
      activePointers: {},
      description: `Access operation complete.`
    }
  ];
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

export const generateLinkedListDelete = (currentState: Frame): Frame[] => {
  if (!currentState.dsLinkedList) return [];
  const { nodes, head, tail, type, pointers, prevPointers } = currentState.dsLinkedList;
  
  if (nodes.length === 0) {
    return [{ ...currentState, description: 'Error: Cannot delete from an empty list.' }];
  }

  const frames: Frame[] = [];
  
  // Highlighting tail for deletion (deleting from the end for simplicity)
  frames.push({
    ...currentState,
    activePointers: { target: nodes.length - 1 },
    description: `Preparing to delete Tail node.`
  });

  const newNodes = nodes.slice(0, -1);
  const newPointers = { ...pointers };
  const newPrevPointers = { ...prevPointers };
  const deletedNodeId = tail!;
  
  let newHead = head;
  let newTail = null;

  if (newNodes.length === 0) {
    newHead = null;
    description: `Deleted the only node. List is now empty.`
  } else {
    newTail = newNodes[newNodes.length - 1].id;
    delete newPointers[newTail]; // Remove pointer to deleted node
    delete newPrevPointers[deletedNodeId];
    
    if (type === 'circular') {
      newPointers[newTail] = newHead!;
    }
  }

  frames.push({
    ...currentState,
    activePointers: {},
    dsLinkedList: {
      type,
      nodes: newNodes,
      head: newHead,
      tail: newTail,
      pointers: newPointers,
      prevPointers: newPrevPointers
    },
    description: newNodes.length === 0 ? `Deleted the only node. List is empty.` : `Deleted node. Updated Tail pointer.`
  });

  return frames;
};

export const generateLinkedListTraverse = (currentState: Frame): Frame[] => {
  if (!currentState.dsLinkedList || currentState.dsLinkedList.nodes.length === 0) return [];
  const frames: Frame[] = [];
  const { nodes, type } = currentState.dsLinkedList;
  
  let traverseCount = type === 'circular' ? nodes.length + 1 : nodes.length; // Show loop back for circular
  
  for (let i = 0; i < traverseCount; i++) {
    const idx = i % nodes.length;
    frames.push({
      ...currentState,
      activePointers: { target: idx },
      description: `Traversing node at index ${idx} with value ${nodes[idx].value}.`
    });
  }
  
  frames.push({
    ...currentState,
    activePointers: {},
    description: `Traversal complete.`
  });
  
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

export const generateHashMapGet = (currentState: Frame, key: string): Frame[] => {
  if (!currentState.dsHashMap) return [];
  const buckets = currentState.dsHashMap.buckets;
  const frames: Frame[] = [];

  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash += key.charCodeAt(i);
  }
  const index = hash % 5;

  frames.push({
    ...currentState,
    description: `Hashing key "${key}" to bucket ${index}.`
  });

  const chain = buckets[index].chain;
  const existingIdx = chain.findIndex((c: any) => c.key === key);

  if (existingIdx >= 0) {
    frames.push({
      ...currentState,
      activePointers: { bucket: index },
      description: `Found key "${key}" in bucket ${index}. Value is "${chain[existingIdx].value}".`
    });
  } else {
    frames.push({
      ...currentState,
      activePointers: { bucket: index },
      description: `Key "${key}" not found in bucket ${index}.`
    });
  }

  frames.push({
    ...currentState,
    activePointers: {},
    description: `Get operation complete.`
  });

  return frames;
};

export const generateHashMapDelete = (currentState: Frame, key: string): Frame[] => {
  if (!currentState.dsHashMap) return [];
  const buckets = JSON.parse(JSON.stringify(currentState.dsHashMap.buckets));
  const frames: Frame[] = [];

  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash += key.charCodeAt(i);
  }
  const index = hash % 5;

  frames.push({
    ...currentState,
    description: `Hashing key "${key}" to bucket ${index} for deletion.`
  });

  const chain = buckets[index].chain;
  const existingIdx = chain.findIndex((c: any) => c.key === key);

  if (existingIdx >= 0) {
    frames.push({
      ...currentState,
      activePointers: { bucket: index },
      description: `Found key "${key}". Deleting from bucket ${index}.`
    });
    chain.splice(existingIdx, 1);
    
    frames.push({
      ...currentState,
      activePointers: {},
      dsHashMap: { buckets },
      description: `Deleted key "${key}" successfully.`
    });
  } else {
    frames.push({
      ...currentState,
      activePointers: { bucket: index },
      description: `Key "${key}" not found. Nothing to delete.`
    });
    frames.push({
      ...currentState,
      activePointers: {},
      description: `Delete operation complete.`
    });
  }

  return frames;
};

// --- STACK ---

export const generateStackInit = (): Frame[] => {
  return [{
    frameIndex: Date.now(),
    arrayState: [],
    activePointers: {},
    comparing: [],
    swapping: false,
    description: `Initialized an empty Stack (LIFO).`,
    dsStack: { values: [] }
  }];
};

export const generateStackPush = (currentState: Frame, value: number): Frame[] => {
  if (!currentState.dsStack) return [];
  if (currentState.dsStack.values.length >= 10) {
    return [{ ...currentState, description: 'Error: Stack overflow! Maximum capacity (10) reached.' }];
  }
  const values = [...currentState.dsStack.values];
  values.push(value);
  return [{
    ...currentState,
    activePointers: { target: values.length - 1 },
    dsStack: { values },
    description: `Pushed ${value} onto the Stack.`
  }];
};

export const generateStackPop = (currentState: Frame): Frame[] => {
  if (!currentState.dsStack || currentState.dsStack.values.length === 0) {
    return [{ ...currentState, description: 'Error: Cannot pop from an empty Stack.' }];
  }
  const values = [...currentState.dsStack.values];
  const popped = values.pop();
  return [{
    ...currentState,
    activePointers: {},
    dsStack: { values },
    description: `Popped ${popped} from the Stack.`
  }];
};

// --- QUEUE ---

export const generateQueueInit = (): Frame[] => {
  return [{
    frameIndex: Date.now(),
    arrayState: [],
    activePointers: {},
    comparing: [],
    swapping: false,
    description: `Initialized an empty Queue (FIFO).`,
    dsQueue: { values: [] }
  }];
};

export const generateQueueEnqueue = (currentState: Frame, value: number): Frame[] => {
  if (!currentState.dsQueue) return [];
  const values = [...currentState.dsQueue.values];
  values.push(value);
  return [{
    ...currentState,
    activePointers: { target: values.length - 1 },
    dsQueue: { values },
    description: `Enqueued ${value} into the Queue.`
  }];
};

export const generateQueueDequeue = (currentState: Frame): Frame[] => {
  if (!currentState.dsQueue || currentState.dsQueue.values.length === 0) {
    return [{ ...currentState, description: 'Error: Cannot dequeue from an empty Queue.' }];
  }
  const values = [...currentState.dsQueue.values];
  const dequeued = values.shift();
  return [{
    ...currentState,
    activePointers: {},
    dsQueue: { values },
    description: `Dequeued ${dequeued} from the Queue.`
  }];
};

// --- HEAP ---

export const generateHeapInit = (): Frame[] => {
  return [{
    frameIndex: Date.now(),
    arrayState: [],
    activePointers: {},
    comparing: [],
    swapping: false,
    description: `Initialized an empty Min-Heap.`,
    dsHeap: { values: [] },
    graphState: { nodes: [], edges: [] }
  }];
};

const getHeapGraphState = (values: number[]) => {
  const nodes = values.map((val, idx) => {
    // simple tree layout
    const level = Math.floor(Math.log2(idx + 1));
    const maxNodesInLevel = Math.pow(2, level);
    const indexInLevel = idx - (maxNodesInLevel - 1);
    const xSpacing = 600 / (maxNodesInLevel + 1);
    
    return {
      id: `node-${idx}`,
      label: val.toString(),
      x: xSpacing * (indexInLevel + 1),
      y: 50 + level * 80
    };
  });

  const edges = [];
  for (let i = 1; i < values.length; i++) {
    const parentIdx = Math.floor((i - 1) / 2);
    edges.push({
      source: `node-${parentIdx}`,
      target: `node-${i}`
    });
  }

  return { nodes, edges };
};

export const generateHeapInsert = (currentState: Frame, value: number): Frame[] => {
  if (!currentState.dsHeap) return [];
  if (currentState.dsHeap.values.length >= 15) {
    return [{ ...currentState, description: 'Error: Maximum heap capacity (15) reached.' }];
  }
  const values = [...currentState.dsHeap.values];
  const frames: Frame[] = [];
  
  values.push(value);
  let idx = values.length - 1;
  
  frames.push({
    ...currentState,
    activePointers: { target: idx },
    dsHeap: { values: [...values] },
    graphState: getHeapGraphState([...values]),
    currentNode: `node-${idx}`,
    description: `Inserted ${value} at the end of the Heap.`
  });

  while (idx > 0) {
    const parentIdx = Math.floor((idx - 1) / 2);
    frames.push({
      ...currentState,
      activePointers: { target: idx, parent: parentIdx },
      dsHeap: { values: [...values] },
      graphState: getHeapGraphState([...values]),
      currentNode: `node-${idx}`,
      description: `Comparing ${values[idx]} with parent ${values[parentIdx]}.`
    });

    if (values[idx] < values[parentIdx]) {
      // swap
      const temp = values[idx];
      values[idx] = values[parentIdx];
      values[parentIdx] = temp;
      
      idx = parentIdx;
      
      frames.push({
        ...currentState,
        activePointers: { target: idx },
        dsHeap: { values: [...values] },
        graphState: getHeapGraphState([...values]),
        currentNode: `node-${idx}`,
        description: `Bubbled up ${temp}.`
      });
    } else {
      break;
    }
  }

  frames.push({
    ...frames[frames.length - 1],
    description: `Heap insertion complete.`
  });

  return frames;
};

export const generateHeapExtract = (currentState: Frame): Frame[] => {
  if (!currentState.dsHeap || currentState.dsHeap.values.length === 0) {
    return [{ ...currentState, description: 'Error: Cannot extract from an empty Heap.' }];
  }
  
  const values = [...currentState.dsHeap.values];
  const frames: Frame[] = [];
  
  if (values.length === 1) {
    const extracted = values.pop();
    return [{
      ...currentState,
      dsHeap: { values: [] },
      graphState: getHeapGraphState([]),
      description: `Extracted ${extracted}. Heap is now empty.`
    }];
  }

  const extracted = values[0];
  const last = values.pop()!;
  values[0] = last;

  frames.push({
    ...currentState,
    activePointers: { target: 0 },
    dsHeap: { values: [...values] },
    graphState: getHeapGraphState([...values]),
    currentNode: `node-0`,
    description: `Extracted ${extracted}. Moved last element ${last} to root.`
  });

  let idx = 0;
  while (true) {
    let leftIdx = 2 * idx + 1;
    let rightIdx = 2 * idx + 2;
    let smallest = idx;

    if (leftIdx < values.length && values[leftIdx] < values[smallest]) {
      smallest = leftIdx;
    }
    if (rightIdx < values.length && values[rightIdx] < values[smallest]) {
      smallest = rightIdx;
    }

    if (smallest !== idx) {
      frames.push({
        ...currentState,
        activePointers: { target: idx, child: smallest },
        dsHeap: { values: [...values] },
        graphState: getHeapGraphState([...values]),
        currentNode: `node-${smallest}`,
        description: `Comparing with children. Smallest is ${values[smallest]}. Swapping.`
      });

      const temp = values[idx];
      values[idx] = values[smallest];
      values[smallest] = temp;
      
      idx = smallest;
      
      frames.push({
        ...currentState,
        activePointers: { target: idx },
        dsHeap: { values: [...values] },
        graphState: getHeapGraphState([...values]),
        currentNode: `node-${idx}`,
        description: `Bubbled down.`
      });
    } else {
      break;
    }
  }
  
  frames.push({
    ...frames[frames.length - 1],
    description: `Heap extraction complete.`
  });

  return frames;
};
