"use client";

import React, { useState } from 'react';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import { 
  generateBubbleSortFrames, 
  generateSelectionSortFrames, 
  generateInsertionSortFrames,
  generateMergeSortFrames,
  generateQuickSortFrames,
  generateLinearSearchFrames,
  generateBinarySearchFrames,
  generateBFSFrames,
  generateDFSFrames,
  generateDPFrames,
  generateDijkstraFrames
} from '@/utils/algorithmEngine';
import { parseGraphInput } from '@/utils/graphParser';
import { logger } from '@/utils/logger';

import DataStructureControls from './DataStructureControls';

export default function DataInputPanel() {
  const { setFrames, reset, selectedAlgorithm, mode } = useVisualizerStore();
  // ... state declarations ...
  const [inputValue, setInputValue] = useState<string>('42, 15, 8, 99, 23, 4, 16, 7');
  const [targetValue, setTargetValue] = useState<string>('23');
  const [error, setError] = useState<string | null>(null);

  const isSearchAlgo = selectedAlgorithm === 'linear' || selectedAlgorithm === 'binary';
  const isGraphAlgo = selectedAlgorithm === 'bfs' || selectedAlgorithm === 'dfs' || selectedAlgorithm === 'dijkstra';
  const isDPAlgo = selectedAlgorithm === 'dp';

  // ... (keeping handleGenerateRandom and handleSubmit exactly the same) ...
  const handleGenerateRandomTree = () => {
    logger.debug('DataInputPanel: Triggered random tree generation');
    
    if (isGraphAlgo) {
      const numNodes = Math.floor(Math.random() * 6) + 4;
      const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
      const activeNodes = labels.slice(0, numNodes);
      
      const edges = new Set<string>();
      
      for (let i = 1; i < numNodes; i++) {
        // connect to a random existing parent to form a tree
        const parent = activeNodes[Math.floor(Math.random() * i)];
        edges.add(`${parent}-${activeNodes[i]}`);
      }
      
      const randomString = Array.from(edges).join(', ');
      setInputValue(randomString);
      setError(null);
      logger.info('DataInputPanel: Random tree successfully generated', { randomString });
    }
  };

  const handleGenerateRandom = () => {
    logger.debug('DataInputPanel: Triggered random generation', { isGraphAlgo });
    
    if (isGraphAlgo) {
      const numNodes = Math.floor(Math.random() * 6) + 4;
      const numEdges = Math.floor(Math.random() * 10) + numNodes - 1;
      const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
      const activeNodes = labels.slice(0, numNodes);
      
      const edges = new Set<string>();
      
      for (let i = 0; i < numNodes - 1; i++) {
        edges.add(`${activeNodes[i]}-${activeNodes[i+1]}`);
      }
      
      let attempts = 0;
      while (edges.size < numEdges && attempts < 50) {
        const u = activeNodes[Math.floor(Math.random() * numNodes)];
        const v = activeNodes[Math.floor(Math.random() * numNodes)];
        if (u !== v) {
          const edgeStr = u < v ? `${u}-${v}` : `${v}-${u}`;
          edges.add(edgeStr);
        }
        attempts++;
      }
      
      const randomString = Array.from(edges).join(', ');
      setInputValue(randomString);
      setError(null);
      logger.info('DataInputPanel: Random graph successfully generated', { randomString });
    } else {
      const length = Math.floor(Math.random() * 10) + 5; 
      const randomArray = Array.from({ length }, () => Math.floor(Math.random() * 100) + 1);
      const randomString = randomArray.join(', ');
      
      setInputValue(randomString);
      setError(null);
      logger.info('DataInputPanel: Random array successfully generated', { array: randomArray });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logger.debug('DataInputPanel: Submit action intercepted', { rawInput: inputValue, selectedAlgorithm });

    let newFrames;
    if (isGraphAlgo) {
      if (inputValue.trim() === '') {
        setError('Please enter an edge list for the graph (e.g. A-B, B-C).');
        return;
      }

      const parsed = parseGraphInput(inputValue);
      if ('error' in parsed) {
        setError(parsed.error);
        return;
      }

      setError(null);
      reset();

      const firstMatch = inputValue.match(/([A-Za-z0-9]{1,2})/);
      const startNode = firstMatch ? firstMatch[1].toUpperCase() : parsed.nodes[0].id;

      if (selectedAlgorithm === 'bfs') newFrames = generateBFSFrames(parsed, startNode);
      else if (selectedAlgorithm === 'dijkstra') newFrames = generateDijkstraFrames(parsed, startNode);
      else newFrames = generateDFSFrames(parsed, startNode);
      
      setFrames(newFrames);
      logger.info(`DataInputPanel: Pipeline complete for ${selectedAlgorithm}`, { frameCount: newFrames.length });
      return;
    }

    const parsedArray = inputValue
      .split(',')
      .map((val) => val.trim())
      .filter((val) => val !== '');

    if (parsedArray.length === 0) {
      setError('Please enter at least one number.');
      return;
    }

    if (parsedArray.length > 50) { 
      setError('Maximum 50 elements allowed for optimal visualization.');
      return;
    }

    if (selectedAlgorithm === 'merge' && parsedArray.length > 20) {
      setError('Merge Sort is restricted to a maximum of 20 elements to prevent visual clutter from auxiliary arrays.');
      return;
    }

    const numericArray = parsedArray.map(Number);
    if (numericArray.some(isNaN)) {
      setError('Invalid input. Please enter valid numbers separated by commas.');
      return;
    }

    let numericTarget = 0;
    if (isSearchAlgo) {
      numericTarget = Number(targetValue.trim());
      if (isNaN(numericTarget) || targetValue.trim() === '') {
        setError('Please enter a valid number for the search target.');
        return;
      }
    }

    setError(null);
    reset(); 
    
    switch (selectedAlgorithm) {
      case 'selection':
        newFrames = generateSelectionSortFrames(numericArray);
        break;
      case 'insertion':
        newFrames = generateInsertionSortFrames(numericArray);
        break;
      case 'merge':
        newFrames = generateMergeSortFrames(numericArray);
        break;
      case 'quick':
        newFrames = generateQuickSortFrames(numericArray);
        break;
      case 'linear':
        newFrames = generateLinearSearchFrames(numericArray, numericTarget);
        break;
      case 'binary':
        newFrames = generateBinarySearchFrames(numericArray, numericTarget);
        break;
      case 'dp':
        newFrames = generateDPFrames(numericArray[0]); // DP takes a single number N
        break;
      case 'bubble':
      default:
        newFrames = generateBubbleSortFrames(numericArray);
        break;
    }

    setFrames(newFrames);
    logger.info(`DataInputPanel: Pipeline complete for ${selectedAlgorithm}`, { frameCount: newFrames.length });
  };

  return (
    <div className="w-full text-white">
      {mode === 'data-structure' ? (
        <DataStructureControls />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="space-y-4">
            <div>
              <label htmlFor="array-input" className="block text-sm font-medium text-gray-400 mb-2 pl-1">
                {isGraphAlgo 
                  ? "Enter edge list (e.g. A-B, B-C). Max 10 nodes, 20 edges." 
                  : isDPAlgo
                  ? "Enter a number N (Max 20) for Fibonacci DP"
                  : `Enter comma-separated integers (Max ${selectedAlgorithm === 'merge' ? '20' : '50'} elements)`}
              </label>
              <input
                id="array-input"
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  if (error) setError(null);
                }}
                placeholder={isGraphAlgo ? "A-B, A-C, B-D" : isDPAlgo ? "e.g. 5" : "e.g. 10, 20, 5, 8, 1"}
                className="w-full bg-gray-950/50 border border-white/10 hover:border-white/20 rounded-2xl py-3.5 px-5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 font-mono tracking-wide transition-all shadow-inner"
              />
            </div>

            {isSearchAlgo && (
              <div>
                <label htmlFor="target-input" className="block text-sm font-medium text-gray-400 mb-2 pl-1">
                  Target Value to Search
                </label>
                <input
                  id="target-input"
                  type="text"
                  value={targetValue}
                  onChange={(e) => {
                    setTargetValue(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="e.g. 23"
                  className="w-full bg-gray-950/50 border border-white/10 hover:border-white/20 rounded-2xl py-3.5 px-5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 font-mono tracking-wide transition-all shadow-inner"
                />
              </div>
            )}
            {error && (
              <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                {error}
              </p>
            )}
          </div>

          <div className="flex flex-row flex-wrap gap-3 pt-3">
            {isGraphAlgo ? (
              <>
                <button
                  type="button"
                  onClick={handleGenerateRandom}
                  className="px-5 py-3 bg-white/5 hover:bg-white/10 text-gray-200 rounded-xl transition-all duration-300 text-sm font-semibold flex-1 min-w-[140px] flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 backdrop-blur-sm"
                >
                  Randomize Graph
                </button>
                <button
                  type="button"
                  onClick={handleGenerateRandomTree}
                  className="px-5 py-3 bg-white/5 hover:bg-white/10 text-gray-200 rounded-xl transition-all duration-300 text-sm font-semibold flex-1 min-w-[140px] flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 backdrop-blur-sm"
                >
                  Randomize Tree
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleGenerateRandom}
                className="px-5 py-3 bg-white/5 hover:bg-white/10 text-gray-200 rounded-xl transition-all duration-300 text-sm font-semibold flex-1 min-w-[140px] flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 backdrop-blur-sm"
              >
                {isDPAlgo ? "Randomize N" : "Randomize Array"}
              </button>
            )}
            
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl transition-all duration-300 text-sm font-bold flex-1 min-w-[140px] shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transform hover:-translate-y-0.5"
            >
              Apply & Visualize
            </button>
          </div>
        </form>
      )}
    </div>
  );
}