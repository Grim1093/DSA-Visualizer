"use client";

import React from 'react';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import { logger } from '@/utils/logger';

export default function AlgorithmSelector() {
  const { selectedAlgorithm, setSelectedAlgorithm } = useVisualizerStore();

  const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAlgo = e.target.value;
    logger.info('AlgorithmSelector: User triggered algorithm change via dropdown', { 
      previous: selectedAlgorithm, 
      current: newAlgo 
    });
    setSelectedAlgorithm(newAlgo);
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700 w-full text-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold">Select Algorithm</h3>
          <p className="text-sm text-gray-400 mt-1">
            Choose a data structure or algorithm to visualize and study.
          </p>
        </div>
        
        <div className="w-full sm:w-auto">
          <select
            value={selectedAlgorithm}
            onChange={handleSelection}
            className="w-full sm:w-64 bg-gray-800 border border-gray-600 rounded-md py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium shadow-inner cursor-pointer"
          >
            <optgroup label="Sorting Algorithms" className="bg-gray-900 text-gray-300 font-semibold">
              <option value="bubble" className="text-white bg-gray-800">Bubble Sort</option>
              <option value="selection" className="text-white bg-gray-800">Selection Sort</option>
              <option value="insertion" className="text-white bg-gray-800">Insertion Sort</option>
              <option value="merge" className="text-white bg-gray-800">Merge Sort</option>
              <option value="quick" className="text-white bg-gray-800">Quick Sort</option>
            </optgroup>
            
            <optgroup label="Searching Algorithms" className="bg-gray-900 text-gray-500 font-semibold">
              <option value="linear" className="text-white bg-gray-800">Linear Search</option>
              <option value="binary" className="text-white bg-gray-800">Binary Search</option>
            </optgroup>
            
            <optgroup label="Graph Algorithms" className="bg-gray-900 text-gray-300 font-semibold">
              <option value="bfs" className="text-white bg-gray-800">Breadth First Search (BFS)</option>
              <option value="dfs" className="text-white bg-gray-800">Depth First Search (DFS)</option>
            </optgroup>
          </select>
        </div>
      </div>
    </div>
  );
}