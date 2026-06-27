"use client";

import React from 'react';
import VisualizerBoard from '@/components/visualizer/VisualizerBoard';
import GraphVisualizerBoard from '@/components/visualizer/GraphVisualizerBoard';
import PlaybackControls from '@/components/visualizer/PlaybackControls';
import TheoryPanel from '@/components/visualizer/TheoryPanel';
import DataInputPanel from '@/components/visualizer/DataInputPanel';
import AlgorithmSelector from '@/components/visualizer/AlgorithmSelector';
import { useVisualizerStore } from '@/store/useVisualizerStore';

export default function Home() {
  const { selectedAlgorithm } = useVisualizerStore();

  const algoMap = {
    bubble: { name: 'Bubble Sort', time: 'O(n²)', space: 'O(1)' },
    selection: { name: 'Selection Sort', time: 'O(n²)', space: 'O(1)' },
    insertion: { name: 'Insertion Sort', time: 'O(n²)', space: 'O(1)' },
    merge: { name: 'Merge Sort', time: 'O(n log n)', space: 'O(n)' },
    quick: { name: 'Quick Sort', time: 'O(n log n)', space: 'O(log n)' },
    linear: { name: 'Linear Search', time: 'O(n)', space: 'O(1)' },
    binary: { name: 'Binary Search', time: 'O(log n)', space: 'O(1)' },
    bfs: { name: 'Breadth-First Search', time: 'O(V + E)', space: 'O(V)' },
    dfs: { name: 'Depth-First Search', time: 'O(V + E)', space: 'O(V)' },
  };
  
  const algoDetails = algoMap[selectedAlgorithm as keyof typeof algoMap] || { name: 'Algorithm', time: '-', space: '-' };
  const isGraphAlgo = selectedAlgorithm === 'bfs' || selectedAlgorithm === 'dfs';

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-12 bg-black text-white font-sans">
      <div className="max-w-5xl w-full flex flex-col gap-8">
        
        {/* Header Section */}
        <header className="flex flex-col gap-2 border-b border-gray-800 pb-4">
          <h1 className="text-4xl font-bold tracking-tight text-white">DSA Visualizer Platform</h1>
          <p className="text-gray-400 text-lg">
            Core Learning Module MVP
          </p>
        </header>

        {/* Interactive Workspace Section */}
        <section className="flex flex-col gap-4">
          
          {/* Top Level Configuration */}
          <AlgorithmSelector />
          <DataInputPanel />

          <div className="flex items-center justify-between mt-4">
            <h2 className="text-2xl font-semibold text-gray-200">{algoDetails.name}</h2>
            <div className="flex gap-2">
              <span className="bg-blue-900/50 text-blue-300 border border-blue-700 px-3 py-1 rounded-full text-sm font-mono">
                Time: {algoDetails.time}
              </span>
              <span className="bg-green-900/50 text-green-300 border border-green-700 px-3 py-1 rounded-full text-sm font-mono">
                Space: {algoDetails.space}
              </span>
            </div>
          </div>
          
          {/* Visualization Canvas */}
          {isGraphAlgo ? <GraphVisualizerBoard /> : <VisualizerBoard />}
          
          
          {/* Remote Control */}
          <PlaybackControls />
        </section>

        {/* Educational Content Section */}
        <section className="mt-4 border-t border-gray-800 pt-8">
          <TheoryPanel />
        </section>

      </div>
    </main>
  );
}