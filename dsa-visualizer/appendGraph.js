const fs = require('fs');

const newContent = `
/**
 * Hardcoded graph definition for BFS and DFS
 */
const predefinedGraph = {
  nodes: [
    { id: 'A', label: 'A', x: 300, y: 50 },
    { id: 'B', label: 'B', x: 200, y: 150 },
    { id: 'C', label: 'C', x: 400, y: 150 },
    { id: 'D', label: 'D', x: 100, y: 250 },
    { id: 'E', label: 'E', x: 250, y: 250 },
    { id: 'F', label: 'F', x: 350, y: 250 },
    { id: 'G', label: 'G', x: 500, y: 250 }
  ],
  edges: [
    { source: 'A', target: 'B' },
    { source: 'A', target: 'C' },
    { source: 'B', target: 'D' },
    { source: 'B', target: 'E' },
    { source: 'C', target: 'F' },
    { source: 'C', target: 'G' }
  ],
  adjList: {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F', 'G'],
    'D': ['B'],
    'E': ['B'],
    'F': ['C'],
    'G': ['C']
  }
};

/**
 * Simulates a BFS execution on the predefined graph
 */
export const generateBFSFrames = (): Frame[] => {
  logger.info('DummyDataGenerator: Starting BFS generation');
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
        nodes: predefinedGraph.nodes,
        edges: predefinedGraph.edges
      },
      visitedNodes: [...visited],
      currentNode: currentNode,
      dataStructureState: [...queue],
      description: desc
    });
  };

  addFrame(undefined, 'Initial Graph State. Starting BFS from node A.');

  queue.push('A');
  visited.push('A');
  addFrame(undefined, 'Enqueue starting node A and mark it as visited.');

  while (queue.length > 0) {
    const current = queue.shift()!;
    addFrame(current, \`Dequeue node \${current} and process it.\`);

    const neighbors = predefinedGraph.adjList[current as keyof typeof predefinedGraph.adjList];
    
    for (const neighbor of neighbors) {
      if (!visited.includes(neighbor)) {
        visited.push(neighbor);
        queue.push(neighbor);
        addFrame(current, \`Found unvisited neighbor \${neighbor} of \${current}. Mark visited and Enqueue.\`);
      } else {
        addFrame(current, \`Neighbor \${neighbor} of \${current} is already visited. Skipping.\`);
      }
    }
  }

  addFrame(undefined, 'BFS Complete! All reachable nodes have been visited.');
  return frames;
};

/**
 * Simulates a DFS execution on the predefined graph
 */
export const generateDFSFrames = (): Frame[] => {
  logger.info('DummyDataGenerator: Starting DFS generation');
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
        nodes: predefinedGraph.nodes,
        edges: predefinedGraph.edges
      },
      visitedNodes: [...visited],
      currentNode: currentNode,
      dataStructureState: [...stack],
      description: desc
    });
  };

  addFrame(undefined, 'Initial Graph State. Starting DFS from node A.');

  stack.push('A');
  addFrame(undefined, 'Push starting node A onto the Stack.');

  while (stack.length > 0) {
    const current = stack.pop()!;
    
    if (!visited.includes(current)) {
      visited.push(current);
      addFrame(current, \`Pop node \${current} from Stack, mark it as visited, and process it.\`);

      const neighbors = predefinedGraph.adjList[current as keyof typeof predefinedGraph.adjList];
      
      // Reverse neighbors to process left-to-right structurally because it's a stack
      const reversedNeighbors = [...neighbors].reverse();
      
      for (const neighbor of reversedNeighbors) {
        if (!visited.includes(neighbor)) {
          stack.push(neighbor);
          addFrame(current, \`Found unvisited neighbor \${neighbor}. Push onto Stack.\`);
        }
      }
    } else {
      addFrame(undefined, \`Pop node \${current} from Stack. It is already visited, so skip.\`);
    }
  }

  addFrame(undefined, 'DFS Complete! All reachable nodes have been visited.');
  return frames;
};
`;

fs.appendFileSync('src/utils/dummyDataGenerator.ts', '\\n' + newContent);
console.log('Successfully appended graph generators');
