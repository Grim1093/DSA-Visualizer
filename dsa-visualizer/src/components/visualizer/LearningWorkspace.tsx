"use client";

import React, { useState } from 'react';
import VisualizerBoard from '@/components/visualizer/VisualizerBoard';
import GraphVisualizerBoard from '@/components/visualizer/GraphVisualizerBoard';
import DSArrayVisualizer from '@/components/visualizer/ds/DSArrayVisualizer';
import DSVectorVisualizer from '@/components/visualizer/ds/DSVectorVisualizer';
import DSLinkedListVisualizer from '@/components/visualizer/ds/DSLinkedListVisualizer';
import DSHashMapVisualizer from '@/components/visualizer/ds/DSHashMapVisualizer';
import DSStackVisualizer from '@/components/visualizer/ds/DSStackVisualizer';
import DSQueueVisualizer from '@/components/visualizer/ds/DSQueueVisualizer';
import AlgorithmSelector from './AlgorithmSelector';
import PlaybackControls from '@/components/visualizer/PlaybackControls';
import DataInputPanel from '@/components/visualizer/DataInputPanel';
import CodeEditor from '@/components/visualizer/CodeEditor';
import { useVisualizerStore, AppMode } from '@/store/useVisualizerStore';
import { useRouter } from 'next/navigation';
import StarField from '@/components/StarField';

import TheoryModeView from './TheoryModeView';

interface LearningWorkspaceProps {
  title: string;
  allowedModules: string[];
}

export default function LearningWorkspace({ title, allowedModules }: LearningWorkspaceProps) {
  const router = useRouter();
  const { selectedAlgorithm, mode, setSelectedAlgorithm } = useVisualizerStore();
  const [isExecuting, setIsExecuting] = useState(false);
  const [sandboxOutput, setSandboxOutput] = useState('');
  
  const [viewMode, setViewMode] = useState<'theory' | 'visualize'>(
    selectedAlgorithm === 'sandbox' ? 'visualize' : 'theory'
  );

  const getModeForAlgo = (algo: string): AppMode => {
    const dsList = ['array', 'vector', 'linked_list', 'doubly_linked_list', 'circular_linked_list', 'hash_map', 'stack', 'queue', 'heap'];
    return dsList.includes(algo) ? 'data-structure' : 'algorithm';
  };

  React.useEffect(() => {
    if (!allowedModules.includes(selectedAlgorithm) && allowedModules.length > 0) {
      const initialAlgo = allowedModules[0];
      setSelectedAlgorithm(initialAlgo, getModeForAlgo(initialAlgo));
    }
  }, [allowedModules, selectedAlgorithm, setSelectedAlgorithm]);

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
      if (data.error) setSandboxOutput(`Error:\n${data.error}`);
      else {
        setSandboxOutput(data.output || 'No output.');
        if (selectedAlgorithm !== 'sandbox') {
          fetch('/api/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ moduleId: selectedAlgorithm, points: 50 })
          }).catch(console.error);
        }
      }
    } catch (err: any) {
      setSandboxOutput(`Failed to connect to Execution Engine.\n${err.message}`);
    } finally {
      setIsExecuting(false);
    }
  };

  const algoMap = {
    array: { name: 'Static Array', time: 'O(1)', space: 'O(n)', ops: 'Read / Write' },
    vector: { name: 'Vector (Dynamic)', time: 'O(1) avg', space: 'O(n)', ops: 'Push / Pop / Access' },
    linked_list: { name: 'Singly Linked List', time: 'O(n)', space: 'O(n)', ops: 'Append / Delete' },
    doubly_linked_list: { name: 'Doubly Linked List', time: 'O(n)', space: 'O(n)', ops: 'Append / Delete / Traverse' },
    circular_linked_list: { name: 'Circular Linked List', time: 'O(n)', space: 'O(n)', ops: 'Append / Loop' },
    hash_map: { name: 'Hash Map (Chaining)', time: 'O(1) avg', space: 'O(n)', ops: 'Put / Get / Delete' },
    bubble: { name: 'Bubble Sort', time: 'O(n²)', space: 'O(1)', ops: 'Compare & Swap' },
    selection: { name: 'Selection Sort', time: 'O(n²)', space: 'O(1)', ops: 'Compare & Swap' },
    insertion: { name: 'Insertion Sort', time: 'O(n²)', space: 'O(1)', ops: 'Compare & Shift' },
    merge: { name: 'Merge Sort', time: 'O(n log n)', space: 'O(n)', ops: 'Divide & Merge' },
    quick: { name: 'Quick Sort', time: 'O(n log n)', space: 'O(log n)', ops: 'Partition & Swap' },
    linear: { name: 'Linear Search', time: 'O(n)', space: 'O(1)', ops: 'Compare' },
    binary: { name: 'Binary Search', time: 'O(log n)', space: 'O(1)', ops: 'Divide & Compare' },
    bfs: { name: 'Breadth-First Search', time: 'O(V + E)', space: 'O(V)', ops: 'Enqueue / Visit' },
    dfs: { name: 'Depth-First Search', time: 'O(V + E)', space: 'O(V)', ops: 'Push / Visit' },
    dijkstra: { name: "Dijkstra's Algo", time: 'O(E log V)', space: 'O(V)', ops: 'Relax Edges' },
    dp: { name: 'Dynamic Programming', time: 'O(n)', space: 'O(n)', ops: 'Memoize / Tabulate' },
    stack: { name: 'Stack', time: 'O(1)', space: 'O(n)', ops: 'Push / Pop' },
    queue: { name: 'Queue', time: 'O(1)', space: 'O(n)', ops: 'Enqueue / Dequeue' },
    heap: { name: 'Heap / PQ', time: 'O(log n)', space: 'O(n)', ops: 'Insert / Extract' },
  };
  
  const algoDetails = algoMap[selectedAlgorithm as keyof typeof algoMap] || { name: 'Algorithm', time: '-', space: '-', ops: 'N/A' };
  const isGraphAlgo = selectedAlgorithm === 'bfs' || selectedAlgorithm === 'dfs' || selectedAlgorithm === 'dijkstra' || selectedAlgorithm === 'heap';

  return (
    <main className="flex min-h-screen flex-col bg-black text-white font-sans relative overflow-hidden grain">
      
      <StarField />
      <div className="fixed inset-0 dot-bg opacity-40 pointer-events-none z-0" />

      {/* Top Header Navigation */}
      <header className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-xl shrink-0 sticky top-0 z-50 border-b border-white/5 gap-4">
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button onClick={() => router.push('/learning')} className="btn-ghost px-2 py-1.5 rounded-lg text-sm flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-xl font-semibold tracking-tight text-white flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black shadow-lg">
              <span className="font-bold text-xs mono">{"</>"}</span>
            </div>
            <span className="hidden md:inline">{title}</span>
          </h1>

          <div className="ml-2 sm:ml-4 flex-1 relative">
            <AlgorithmSelector
              value={selectedAlgorithm}
              options={allowedModules.map(mod => ({
                value: mod,
                label: mod === 'sandbox' ? 'Code Sandbox' : (algoMap[mod as keyof typeof algoMap]?.name || mod)
              }))}
              onChange={(val) => {
                setSelectedAlgorithm(val, getModeForAlgo(val));
                if (val === 'sandbox') setViewMode('visualize');
              }}
            />
          </div>
        </div>

        {/* Minimal Toggle Switch */}
        <div className="flex items-center bg-white/[0.03] p-1 rounded-xl border border-white/10 relative mt-2 sm:mt-0 min-w-[280px]">
          <div 
            className="absolute top-1 bottom-1 w-1/2 bg-white rounded-lg shadow-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: viewMode === 'theory' ? 'translateX(0)' : 'translateX(100%)' }}
          />
          <button 
            onClick={() => setViewMode('theory')}
            disabled={selectedAlgorithm === 'sandbox'}
            className={`relative z-10 w-1/2 py-1.5 text-xs font-semibold rounded-lg transition-colors duration-300 ${selectedAlgorithm === 'sandbox' ? 'opacity-50 cursor-not-allowed' : ''} ${viewMode === 'theory' ? 'text-black' : 'text-white/60 hover:text-white'}`}
          >
            Theory Mode
          </button>
          <button 
            onClick={() => setViewMode('visualize')}
            className={`relative z-10 w-1/2 py-1.5 text-xs font-semibold rounded-lg transition-colors duration-300 ${viewMode === 'visualize' ? 'text-black' : 'text-white/60 hover:text-white'}`}
          >
            Interactive Sandbox
          </button>
        </div>
      </header>

      {viewMode === 'theory' ? (
        <TheoryModeView />
      ) : (
        <div className={`flex flex-col lg:flex-row flex-1 z-10 w-full mx-auto overflow-hidden ${
          selectedAlgorithm === 'sandbox' 
            ? 'max-w-full p-4 gap-4' 
            : 'max-w-[1400px] p-4 sm:p-8 gap-6'
        }`}>
          
          {/* Left Panel: Config, Controls, & Stats */}
          {selectedAlgorithm !== 'sandbox' && (
            <div className="flex flex-col gap-6 w-full lg:w-[350px] shrink-0 overflow-y-auto scrollbar-hide pb-4">
              <DataInputPanel />
              <PlaybackControls />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="card-mono p-4 flex flex-col items-start gap-1">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 mono leading-none">Status</span>
                  <span className="text-sm font-semibold text-white mono">
                    Active
                  </span>
                </div>
                <div className="card-mono p-4 flex flex-col items-start gap-1">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 mono leading-none">Operations</span>
                  <span className="text-sm font-semibold text-white mono">{algoDetails.ops}</span>
                </div>
                <div className="card-mono p-4 flex flex-col items-start gap-1">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 mono leading-none">Time Complexity</span>
                  <span className="text-sm font-semibold text-white mono">{algoDetails.time}</span>
                </div>
                <div className="card-mono p-4 flex flex-col items-start gap-1">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 mono leading-none">Space Complexity</span>
                  <span className="text-sm font-semibold text-white mono">{algoDetails.space}</span>
                </div>
              </div>
            </div>
          )}

          {/* Right Panel: Canvas Section */}
          <section className="flex-1 flex flex-col gap-4 min-h-0 relative">
            
            {selectedAlgorithm !== 'sandbox' && (
              <div className="flex items-end justify-between px-1">
                <h2 className="text-2xl font-medium tracking-tight text-white">
                  {algoDetails.name}
                </h2>
              </div>
            )}
            
            <div className={`w-full bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden flex flex-col relative shrink-0 ${
              selectedAlgorithm === 'sandbox' 
                ? 'flex-1 rounded-xl' 
                : 'flex-1 rounded-2xl min-h-[500px]'
            }`}>
              {selectedAlgorithm === 'sandbox' ? (
                <CodeEditor onExecute={handleExecuteCode} isExecuting={isExecuting} output={sandboxOutput} allowedModules={allowedModules} />
              ) : (selectedAlgorithm === 'array' || selectedAlgorithm === 'dp') ? <DSArrayVisualizer /> :
               selectedAlgorithm === 'vector' ? <DSVectorVisualizer /> :
               (selectedAlgorithm === 'linked_list' || selectedAlgorithm === 'doubly_linked_list' || selectedAlgorithm === 'circular_linked_list') ? <DSLinkedListVisualizer /> :
               selectedAlgorithm === 'hash_map' ? <DSHashMapVisualizer /> :
               selectedAlgorithm === 'stack' ? <DSStackVisualizer /> :
               selectedAlgorithm === 'queue' ? <DSQueueVisualizer /> :
               isGraphAlgo ? <GraphVisualizerBoard /> : <VisualizerBoard />}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
