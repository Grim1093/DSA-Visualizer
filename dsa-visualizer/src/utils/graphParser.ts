import { logger } from './logger';

export interface GraphData {
  nodes: { id: string; label: string; x: number; y: number }[];
  edges: { source: string; target: string }[];
  adjList: Record<string, string[]>;
}

/**
 * Parses a comma-separated string of edges (e.g. "A-B, B-C") and 
 * generates a GraphData object with a circular layout.
 */
export const parseGraphInput = (input: string): GraphData | { error: string } => {
  logger.debug('graphParser: Parsing input', { input });
  
  if (!input || input.trim() === '') {
    return { error: 'Input cannot be empty. Please provide an edge list.' };
  }

  const rawEdges = input.split(',').map(e => e.trim()).filter(e => e !== '');
  
  if (rawEdges.length > 20) {
    return { error: 'Maximum 20 edges allowed to prevent UI overflow.' };
  }

  const edges: { source: string; target: string }[] = [];
  const uniqueNodes = new Set<string>();
  const adjList: Record<string, string[]> = {};

  const edgeRegex = /^([A-Za-z0-9]{1,2})-([A-Za-z0-9]{1,2})$/;

  for (const raw of rawEdges) {
    const match = raw.match(edgeRegex);
    if (!match) {
      return { error: `Invalid format near "${raw}". Use Node-Node format (e.g. A-B).` };
    }

    const source = match[1].toUpperCase();
    const target = match[2].toUpperCase();

    uniqueNodes.add(source);
    uniqueNodes.add(target);

    // Prevent duplicate edges visually
    const edgeExists = edges.some(e => 
      (e.source === source && e.target === target) || 
      (e.source === target && e.target === source)
    );

    if (!edgeExists) {
      edges.push({ source, target });
      
      if (!adjList[source]) adjList[source] = [];
      if (!adjList[target]) adjList[target] = [];
      
      adjList[source].push(target);
      adjList[target].push(source); // Undirected graph
    }
  }

  if (uniqueNodes.size === 0) {
    return { error: 'No valid nodes found.' };
  }

  if (uniqueNodes.size > 10) {
    return { error: `Too many nodes (${uniqueNodes.size}). Maximum 10 nodes allowed.` };
  }

  // Tree Detection
  // A graph is a tree if it's connected and has exactly V - 1 edges
  let isTree = false;
  if (edges.length === uniqueNodes.size - 1) {
    // Check connectivity using BFS from the first node
    const root = rawEdges[0].match(edgeRegex)![1].toUpperCase(); // First node mentioned
    const visited = new Set<string>();
    const queue = [root];
    visited.add(root);

    while (queue.length > 0) {
      const curr = queue.shift()!;
      for (const neighbor of adjList[curr] || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    if (visited.size === uniqueNodes.size) {
      isTree = true;
    }
  }

  const nodes: { id: string; label: string; x: number; y: number }[] = [];
  const nodeArray = Array.from(uniqueNodes).sort();

  if (isTree) {
    logger.debug('graphParser: Detected Tree structure, applying hierarchical layout');
    // Root is the first node mentioned in the first edge
    const root = rawEdges[0].match(edgeRegex)![1].toUpperCase();
    
    // Assign levels using BFS
    const levels: Record<string, number> = {};
    const nodesAtLevel: Record<number, string[]> = {};
    
    const queue = [{ id: root, depth: 0 }];
    const visited = new Set([root]);
    
    let maxDepth = 0;

    while (queue.length > 0) {
      const { id, depth } = queue.shift()!;
      levels[id] = depth;
      if (!nodesAtLevel[depth]) nodesAtLevel[depth] = [];
      nodesAtLevel[depth].push(id);
      
      maxDepth = Math.max(maxDepth, depth);

      // We want to process neighbors in a consistent order (e.g. alphabetical)
      // to make the tree layout look nice from left to right
      const neighbors = [...(adjList[id] || [])].sort();
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push({ id: neighbor, depth: depth + 1 });
        }
      }
    }

    // Generate coordinates based on levels
    const canvasWidth = 600;
    // We want the tree to fit vertically in ~400px.
    // Start y at 60. Max y around 340.
    const startY = 60;
    const verticalSpacing = maxDepth === 0 ? 0 : 280 / maxDepth;

    for (const [id, depth] of Object.entries(levels)) {
      const y = startY + (depth * verticalSpacing);
      
      const levelNodes = nodesAtLevel[depth];
      const indexInLevel = levelNodes.indexOf(id);
      
      // Evenly distribute across width
      // If there's 1 node, it's at width/2
      // If there's 2 nodes, they are at width*1/3, width*2/3
      const numNodesInLevel = levelNodes.length;
      const horizontalSpacing = canvasWidth / (numNodesInLevel + 1);
      const x = horizontalSpacing * (indexInLevel + 1);

      nodes.push({ id, label: id, x, y });
    }
  } else {
    logger.debug('graphParser: Using Circular layout fallback');
    // Generate Circular Layout
    const centerX = 300;
    const centerY = 200;
    const radius = 130;

    nodeArray.forEach((id, index) => {
      // Distribute nodes evenly around the circle
      // Subtract Math.PI/2 to start from the top (12 o'clock)
      const angle = (index / nodeArray.length) * 2 * Math.PI - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      nodes.push({ id, label: id, x, y });
    });
  }

  // Final sort to guarantee consistent array order for downstream algorithms
  nodes.sort((a, b) => a.id.localeCompare(b.id));

  return { nodes, edges, adjList };
};
