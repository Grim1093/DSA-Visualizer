"use client";

import React from 'react';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import { logger } from '@/utils/logger';

export default function AlgorithmSelector() {
  const { selectedAlgorithm, setSelectedAlgorithm } = useVisualizerStore();

  const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAlgo = e.target.value;
    const isDataStructure = ['array', 'vector', 'linked_list', 'doubly_linked_list', 'circular_linked_list', 'hash_map'].includes(newAlgo);
    const mode = isDataStructure ? 'data-structure' : 'algorithm';
    
    logger.info('AlgorithmSelector: User triggered change via dropdown', { 
      previous: selectedAlgorithm, 
      current: newAlgo,
      mode
    });
    setSelectedAlgorithm(newAlgo, mode);
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700 w-full text-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold">Select Algorithm or Data Structure</h3>
          <p className="text-sm text-gray-400 mt-1">
            Choose what you want to visualize and study.
          </p>
        </div>
        
        <div className="w-full sm:w-auto">
          <select
            value={selectedAlgorithm}
            onChange={handleSelection}
            className="w-full sm:w-64 bg-gray-800 border border-gray-600 rounded-md py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium shadow-inner cursor-pointer"
          >
            <optgroup label="Data Structures (Interactive)" className="bg-gray-900 text-blue-400 font-semibold">
              <option value="array" className="text-white bg-gray-800">Static Array</option>
              <option value="vector" className="text-white bg-gray-800">Vector (Dynamic Array)</option>
              <option value="linked_list" className="text-white bg-gray-800">Singly Linked List</option>
              <option value="doubly_linked_list" className="text-white bg-gray-800">Doubly Linked List</option>
              <option value="circular_linked_list" className="text-white bg-gray-800">Circular Linked List</option>
              <option value="hash_map" className="text-white bg-gray-800">Hash Map</option>
            </optgroup>

            <optgroup label="Sorting Algorithms" className="bg-gray-900 text-gray-300 font-semibold mt-2">
              <option value="bubble" className="text-white bg-gray-800">Bubble Sort</option>
              <option value="selection" className="text-white bg-gray-800">Selection Sort</option>
              <option value="insertion" className="text-white bg-gray-800">Insertion Sort</option>
              <option value="merge" className="text-white bg-gray-800">Merge Sort</option>
              <option value="quick" className="text-white bg-gray-800">Quick Sort</option>
            </optgroup>
            
            <optgroup label="Searching" className="bg-gray-900 text-green-400 font-semibold">
              <option value="linear" className="text-white bg-gray-800">Linear Search</option>
              <option value="binary" className="text-white bg-gray-800">Binary Search</option>
            </optgroup>
            
            <optgroup label="Graph Traversal" className="bg-gray-900 text-purple-400 font-semibold">
              <option value="bfs" className="text-white bg-gray-800">Breadth-First Search (BFS)</option>
              <option value="dfs" className="text-white bg-gray-800">Depth-First Search (DFS)</option>
            </optgroup>

            <optgroup label="Advanced Modules" className="bg-gray-900 text-yellow-400 font-semibold">
              <option value="sandbox" className="text-white bg-gray-800">Code Execution Sandbox</option>
            </optgroup>
          </select>
        </div>
      </div>
    </div>
  );
}