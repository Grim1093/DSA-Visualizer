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

import DataStructureControls from './DataStructureControls';

export default function DataInputPanel() {
  const { setFrames, reset, selectedAlgorithm, mode } = useVisualizerStore();
  const [inputValue, setInputValue] = useState<string>('42, 15, 8, 99, 23, 4, 16, 7');
  const [targetValue, setTargetValue] = useState<string>('23');
  const [error, setError] = useState<string | null>(null);

  const isSearchAlgo = selectedAlgorithm === 'linear' || selectedAlgorithm === 'binary';
  const isGraphAlgo = selectedAlgorithm === 'bfs' || selectedAlgorithm === 'dfs' || selectedAlgorithm === 'dijkstra';
  const isDPAlgo = selectedAlgorithm === 'dp';

  const handleGenerateRandomTree = () => {
    if (isGraphAlgo) {
      const numNodes = Math.floor(Math.random() * 6) + 4;
      const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
      const activeNodes = labels.slice(0, numNodes);
      const edges = new Set<string>();
      for (let i = 1; i < numNodes; i++) {
        const parent = activeNodes[Math.floor(Math.random() * i)];
        edges.add(`${parent}-${activeNodes[i]}`);
      }
      setInputValue(Array.from(edges).join(', '));
      setError(null);
    }
  };

  const handleGenerateRandom = () => {
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
      setInputValue(Array.from(edges).join(', '));
      setError(null);
    } else {
      const length = Math.floor(Math.random() * 10) + 5; 
      const randomArray = Array.from({ length }, () => Math.floor(Math.random() * 100) + 1);
      setInputValue(randomArray.join(', '));
      setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
      setError('Maximum 50 elements allowed.');
      return;
    }
    if (selectedAlgorithm === 'merge' && parsedArray.length > 20) {
      setError('Merge Sort is restricted to a maximum of 20 elements.');
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
      case 'selection': newFrames = generateSelectionSortFrames(numericArray); break;
      case 'insertion': newFrames = generateInsertionSortFrames(numericArray); break;
      case 'merge': newFrames = generateMergeSortFrames(numericArray); break;
      case 'quick': newFrames = generateQuickSortFrames(numericArray); break;
      case 'linear': newFrames = generateLinearSearchFrames(numericArray, numericTarget); break;
      case 'binary': newFrames = generateBinarySearchFrames(numericArray, numericTarget); break;
      case 'dp': newFrames = generateDPFrames(numericArray[0]); break;
      case 'bubble':
      default: newFrames = generateBubbleSortFrames(numericArray); break;
    }

    setFrames(newFrames);
  };

  return (
    <div className="w-full card-mono p-4">
      {mode === 'data-structure' ? (
        <DataStructureControls />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-end gap-3 w-full">
          <div className="flex-1 flex flex-col gap-1.5 w-full">
            <label className="text-[10px] uppercase tracking-[0.18em] text-white/40 mono ml-1">
              {isGraphAlgo 
                ? "Edge List (A-B, B-C)" 
                : isDPAlgo ? "N (Max 20)" : "Array Elements"}
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (error) setError(null);
              }}
              placeholder={isGraphAlgo ? "A-B, B-C" : isDPAlgo ? "5" : "10, 20, 5, 8"}
              className="w-full bg-white/[0.03] border border-white/10 focus:border-white/30 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 outline-none transition-colors mono"
            />
          </div>

          {isSearchAlgo && (
            <div className="w-full sm:w-32 flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-[0.18em] text-white/40 mono ml-1">Target</label>
              <input
                type="text"
                value={targetValue}
                onChange={(e) => {
                  setTargetValue(e.target.value);
                  if (error) setError(null);
                }}
                className="w-full bg-white/[0.03] border border-white/10 focus:border-white/30 rounded-lg px-3 py-2 text-sm text-white outline-none transition-colors mono"
              />
            </div>
          )}

          <div className="flex gap-2 w-full sm:w-auto mt-3 sm:mt-0">
            {isGraphAlgo ? (
              <>
                <button type="button" onClick={handleGenerateRandom} className="btn-ghost flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-1" title="Randomize Graph">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                  Graph
                </button>
                <button type="button" onClick={handleGenerateRandomTree} className="btn-ghost flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-1" title="Randomize Tree">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  Tree
                </button>
              </>
            ) : (
              <button type="button" onClick={handleGenerateRandom} className="btn-ghost flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-1" title="Randomize">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              </button>
            )}
            <button type="submit" className="btn-primary flex-1 sm:flex-none px-5 py-2 rounded-lg text-sm font-semibold">
              Visualize
            </button>
          </div>
          
          {error && <div className="w-full text-xs text-red-400 mt-1 mono">{error}</div>}
        </form>
      )}
    </div>
  );
}