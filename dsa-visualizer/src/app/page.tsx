"use client";

import React from 'react';
import VisualizerBoard from '@/components/visualizer/VisualizerBoard';
import GraphVisualizerBoard from '@/components/visualizer/GraphVisualizerBoard';
import DSArrayVisualizer from '@/components/visualizer/ds/DSArrayVisualizer';
import DSVectorVisualizer from '@/components/visualizer/ds/DSVectorVisualizer';
import DSLinkedListVisualizer from '@/components/visualizer/ds/DSLinkedListVisualizer';
import DSHashMapVisualizer from '@/components/visualizer/ds/DSHashMapVisualizer';
import PlaybackControls from '@/components/visualizer/PlaybackControls';
import TheoryPanel from '@/components/visualizer/TheoryPanel';
import ComparisonPanel from '@/components/visualizer/ComparisonPanel';
import DataInputPanel from '@/components/visualizer/DataInputPanel';
import AlgorithmSelector from '@/components/visualizer/AlgorithmSelector';
import CodeEditor from '@/components/visualizer/CodeEditor';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import { useState } from 'react';

export default function Home() {
  const { selectedAlgorithm, mode } = useVisualizerStore();
  const [isExecuting, setIsExecuting] = useState(false);
  const [sandboxOutput, setSandboxOutput] = useState('');

  const handleExecuteCode = async (code: string, language: string) => {
    setIsExecuting(true);
    setSandboxOutput('Executing...');
    try {
      const response = await fetch('http://localhost:5000/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });
      const data = await response.json();
      if (data.error) {
        setSandboxOutput(`Error:\n${data.error}`);
      } else {
        setSandboxOutput(data.output || 'No output.');
      }
    } catch (err: any) {
      setSandboxOutput(`Failed to connect to Execution Engine.\nMake sure backend is running.\n${err.message}`);
    } finally {
      setIsExecuting(false);
    }
  };

  const algoMap = {
    array: { name: 'Static Array', time: 'O(1)', space: 'O(n)' },
    vector: { name: 'Vector (Dynamic Array)', time: 'O(1) amortized', space: 'O(n)' },
    linked_list: { name: 'Singly Linked List', time: 'O(n)', space: 'O(n)' },
    doubly_linked_list: { name: 'Doubly Linked List', time: 'O(n)', space: 'O(n)' },
    circular_linked_list: { name: 'Circular Linked List', time: 'O(n)', space: 'O(n)' },
    hash_map: { name: 'Hash Map (Chaining)', time: 'O(1) avg', space: 'O(n)' },
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
          
          {selectedAlgorithm !== 'sandbox' && <DataInputPanel />}

          <div className="flex items-center justify-between mt-4">
            <h2 className="text-2xl font-semibold text-gray-200">
              {selectedAlgorithm === 'sandbox' ? 'Code Execution Sandbox' : algoDetails.name}
            </h2>
            {selectedAlgorithm !== 'sandbox' && (
              <div className="flex gap-2">
                <span className="bg-blue-900/50 text-blue-300 border border-blue-700 px-3 py-1 rounded-full text-sm font-mono">
                  Time: {algoDetails.time}
                </span>
                <span className="bg-green-900/50 text-green-300 border border-green-700 px-3 py-1 rounded-full text-sm font-mono">
                  Space: {algoDetails.space}
                </span>
              </div>
            )}
          </div>
          
          {/* Visualization Canvas */}
          <div className="w-full bg-gray-900 rounded-xl shadow-2xl overflow-hidden min-h-[400px] sm:min-h-[500px] border border-gray-700 flex flex-col relative">
            {selectedAlgorithm === 'sandbox' ? (
              <CodeEditor onExecute={handleExecuteCode} isExecuting={isExecuting} output={sandboxOutput} />
            ) : selectedAlgorithm === 'array' ? <DSArrayVisualizer /> :
             selectedAlgorithm === 'vector' ? <DSVectorVisualizer /> :
             (selectedAlgorithm === 'linked_list' || selectedAlgorithm === 'doubly_linked_list' || selectedAlgorithm === 'circular_linked_list') ? <DSLinkedListVisualizer /> :
             selectedAlgorithm === 'hash_map' ? <DSHashMapVisualizer /> :
             isGraphAlgo ? <GraphVisualizerBoard /> : <VisualizerBoard />}
          </div>
          
          
          {/* Remote Control */}
          {selectedAlgorithm !== 'sandbox' && <PlaybackControls />}
        </section>

        {/* Educational Content Section */}
        <section className="mt-4 border-t border-gray-800 pt-8 flex flex-col gap-8">
          <TheoryPanel />
          <ComparisonPanel />
        </section>

      </div>
    </main>
  );
}