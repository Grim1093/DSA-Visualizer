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
import PlaybackControls from '@/components/visualizer/PlaybackControls';
import TheoryPanel from '@/components/visualizer/TheoryPanel';
import ComparisonPanel from '@/components/visualizer/ComparisonPanel';
import DataInputPanel from '@/components/visualizer/DataInputPanel';
import CodeEditor from '@/components/visualizer/CodeEditor';
import { useVisualizerStore, AppMode } from '@/store/useVisualizerStore';
import { useRouter } from 'next/navigation';

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
  
  // Initialize viewMode to 'visualize' if the persisted selectedAlgorithm is 'sandbox'
  const [viewMode, setViewMode] = useState<'theory' | 'visualize'>(
    selectedAlgorithm === 'sandbox' ? 'visualize' : 'theory'
  );

  // Helper to determine mode
  const getModeForAlgo = (algo: string): AppMode => {
    const dsList = ['array', 'vector', 'linked_list', 'doubly_linked_list', 'circular_linked_list', 'hash_map', 'stack', 'queue', 'heap'];
    return dsList.includes(algo) ? 'data-structure' : 'algorithm';
  };

  // Auto-select the first allowed module if the current one isn't allowed
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
    dijkstra: { name: "Dijkstra's Algorithm", time: 'O((V+E) log V)', space: 'O(V)' },
    dp: { name: 'Dynamic Programming', time: 'O(n)', space: 'O(n)' },
    stack: { name: 'Stack', time: 'O(1)', space: 'O(n)' },
    queue: { name: 'Queue', time: 'O(1)', space: 'O(n)' },
    heap: { name: 'Heap (Priority Queue)', time: 'O(log n)', space: 'O(n)' },
  };
  
  const algoDetails = algoMap[selectedAlgorithm as keyof typeof algoMap] || { name: 'Algorithm', time: '-', space: '-' };
  const isGraphAlgo = selectedAlgorithm === 'bfs' || selectedAlgorithm === 'dfs' || selectedAlgorithm === 'dijkstra' || selectedAlgorithm === 'heap';

  return (
    <main className="flex min-h-screen flex-col bg-black text-white font-sans relative overflow-hidden">
      
      {/* Ambient Background Glows for a premium feel */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Top Navigation Bar - Glassmorphic */}
      <header className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-gray-950/40 backdrop-blur-md shrink-0 sticky top-0 z-50 shadow-sm border-b border-white/10 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/learning')} className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="text-white text-xs">{"</>"}</span>
            </div>
            <span className="hidden sm:inline">{title}</span>
          </h1>

          {/* Module Selector in Header */}
          <div className="relative ml-4 min-w-[200px]">
            <select
              value={selectedAlgorithm}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedAlgorithm(val, getModeForAlgo(val));
                if (val === 'sandbox') {
                  setViewMode('visualize');
                }
              }}
              className="appearance-none bg-gray-900/80 border border-white/10 hover:border-white/20 text-white text-sm font-medium rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 block w-full px-4 py-2 outline-none transition-all cursor-pointer shadow-inner"
            >
              {allowedModules.map(mod => (
                <option key={mod} value={mod} className="bg-gray-900 text-white">
                  {mod === 'sandbox' ? 'Code Sandbox' : (algoMap[mod as keyof typeof algoMap]?.name || mod)}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* The Sliding Toggle Switch */}
        <div className="flex items-center bg-gray-900/60 p-1 rounded-full border border-white/10 shadow-inner relative mt-2 sm:mt-0 w-[340px]">
          {/* Animated Background Pill */}
          <div 
            className={`absolute top-1 bottom-1 w-[166px] bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg transition-all duration-300 ease-out`}
            style={{ transform: viewMode === 'theory' ? 'translateX(0)' : 'translateX(166px)' }}
          />
          
          <button 
            onClick={() => setViewMode('theory')}
            disabled={selectedAlgorithm === 'sandbox'}
            className={`relative z-10 w-[166px] py-2 text-sm font-bold rounded-full transition-colors duration-300 text-center ${selectedAlgorithm === 'sandbox' ? 'opacity-50 cursor-not-allowed' : ''} ${viewMode === 'theory' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Theory Mode
          </button>
          
          <button 
            onClick={() => setViewMode('visualize')}
            className={`relative z-10 w-[166px] py-2 text-sm font-bold rounded-full transition-colors duration-300 text-center ${viewMode === 'visualize' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Interactive Sandbox
          </button>
        </div>
      </header>

      {viewMode === 'theory' ? (
        <TheoryModeView />
      ) : (
        <div className="flex flex-col lg:flex-row flex-1 p-4 sm:p-6 gap-6 z-10 w-full max-w-[1920px] mx-auto overflow-hidden">
          
          {/* Left Sidebar (Controls & Config) - Floating Glass Panel */}
          <aside className="w-full lg:w-[420px] bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col gap-8 shadow-2xl shadow-black/50 overflow-x-hidden lg:overflow-y-auto shrink-0 z-40 lg:h-[calc(100vh-120px)] custom-scrollbar">

            {selectedAlgorithm !== 'sandbox' && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400/80 pl-1">Configuration</h3>
                <DataInputPanel />
              </div>
            )}

            {selectedAlgorithm !== 'sandbox' && (
              <div className="mt-auto hidden lg:flex flex-col space-y-3 pt-6 relative">
                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400/80 pl-1">Controls</h3>
                <PlaybackControls />
              </div>
            )}
          </aside>

          {/* Center Workspace (Canvas) */}
          <section className="flex-1 flex flex-col min-w-0 lg:overflow-y-auto lg:h-[calc(100vh-120px)] custom-scrollbar gap-6 pb-20">
            
            {/* Header Info */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 px-2">
              <div>
                <h2 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                  {selectedAlgorithm === 'sandbox' ? 'Code Execution Sandbox' : algoDetails.name}
                </h2>
              </div>
              {selectedAlgorithm !== 'sandbox' && (
                <div className="flex flex-wrap gap-3">
                  <span className="bg-blue-500/10 text-blue-300 border border-blue-500/20 px-4 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider shadow-[0_0_15px_rgba(59,130,246,0.15)] backdrop-blur-md flex items-center gap-2">
                    <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {algoDetails.time}
                  </span>
                  <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-4 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.15)] backdrop-blur-md flex items-center gap-2">
                    <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                    {algoDetails.space}
                  </span>
                </div>
              )}
            </div>
            
            {/* Visualization Canvas Container - Deep & Borderless */}
            <div className="w-full bg-[#0a0a0c] rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden min-h-[400px] sm:min-h-[550px] flex flex-col relative shrink-0 ring-1 ring-white/5">
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
            
            {/* Mobile/Tablet Playback Controls */}
            {selectedAlgorithm !== 'sandbox' && (
              <div className="lg:hidden mt-2">
                <PlaybackControls />
              </div>
            )}
            
          </section>
        </div>
      )}
    </main>
  );
}
