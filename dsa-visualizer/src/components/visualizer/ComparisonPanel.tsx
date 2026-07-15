"use client";

import React from 'react';
import { useVisualizerStore } from '@/store/useVisualizerStore';

// Comparison Data
const comparisons = {
  sorting: {
    title: 'Sorting Algorithms Comparison',
    headers: ['Algorithm', 'Best', 'Average', 'Worst', 'Space', 'Use Case'],
    data: [
      { id: 'bubble', name: 'Bubble Sort', best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', useCase: 'Educational purposes, detecting if an array is sorted.' },
      { id: 'selection', name: 'Selection Sort', best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', useCase: 'When memory write is a costly operation.' },
      { id: 'insertion', name: 'Insertion Sort', best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', useCase: 'Small arrays, or nearly sorted arrays.' },
      { id: 'merge', name: 'Merge Sort', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)', useCase: 'Linked lists, or when stable sort is required.' },
      { id: 'quick', name: 'Quick Sort', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)', useCase: 'Default system sort for primitive types.' },
    ]
  },
  searching: {
    title: 'Searching Algorithms Comparison',
    headers: ['Algorithm', 'Best', 'Average', 'Worst', 'Space', 'Precondition'],
    data: [
      { id: 'linear', name: 'Linear Search', best: 'O(1)', avg: 'O(n)', worst: 'O(n)', space: 'O(1)', useCase: 'Unsorted or very small arrays.' },
      { id: 'binary', name: 'Binary Search', best: 'O(1)', avg: 'O(log n)', worst: 'O(log n)', space: 'O(1)', useCase: 'Large sorted arrays.' },
    ]
  },
  graphs: {
    title: 'Graph Traversal Comparison',
    headers: ['Algorithm', 'Time', 'Space', 'Data Structure', 'Use Case'],
    data: [
      { id: 'bfs', name: 'Breadth-First Search (BFS)', time: 'O(V + E)', space: 'O(V)', ds: 'Queue', useCase: 'Shortest path on unweighted graphs, exploring neighbors.' },
      { id: 'dfs', name: 'Depth-First Search (DFS)', time: 'O(V + E)', space: 'O(V)', ds: 'Stack', useCase: 'Topological sorting, maze solving, connected components.' },
    ]
  },
  datastructures: {
    title: 'Data Structures Comparison',
    headers: ['Structure', 'Access/Search', 'Insert/Delete', 'Space', 'Use Case'],
    data: [
      { id: 'array', name: 'Static Array', time: 'O(1)', spaceTime: 'O(n)', space: 'O(n)', useCase: 'Fixed size, fast indexed access.' },
      { id: 'vector', name: 'Vector (Dynamic)', time: 'O(1)', spaceTime: 'O(n) / O(1)*', space: 'O(n)', useCase: 'Unknown size, fast end-insertions.' },
      { id: 'linked_list', name: 'Singly Linked List', time: 'O(n)', spaceTime: 'O(1)', space: 'O(n)', useCase: 'Frequent insertions/deletions at ends.' },
      { id: 'doubly_linked_list', name: 'Doubly Linked List', time: 'O(n)', spaceTime: 'O(1)', space: 'O(n)', useCase: 'Bidirectional traversal needed.' },
      { id: 'circular_linked_list', name: 'Circular Linked List', time: 'O(n)', spaceTime: 'O(1)', space: 'O(n)', useCase: 'Round-robin scheduling.' },
      { id: 'hash_map', name: 'Hash Map', time: 'O(1)*', spaceTime: 'O(1)*', space: 'O(n)', useCase: 'Fast key-value lookups.' },
    ]
  }
};

export default function ComparisonPanel() {
  const { selectedAlgorithm } = useVisualizerStore();

  // Determine category
  let categoryKey: keyof typeof comparisons | null = null;
  
  if (['bubble', 'selection', 'insertion', 'merge', 'quick'].includes(selectedAlgorithm)) {
    categoryKey = 'sorting';
  } else if (['linear', 'binary'].includes(selectedAlgorithm)) {
    categoryKey = 'searching';
  } else if (['bfs', 'dfs'].includes(selectedAlgorithm)) {
    categoryKey = 'graphs';
  } else if (['array', 'vector', 'linked_list', 'doubly_linked_list', 'circular_linked_list', 'hash_map'].includes(selectedAlgorithm)) {
    categoryKey = 'datastructures';
  }

  if (!categoryKey) return null;
  
  const categoryData = comparisons[categoryKey];

  return (
    <div className="card-mono p-6 sm:p-8 flex flex-col overflow-x-auto">
      <h2 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mono font-bold mb-6 flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
        {categoryData.title}
      </h2>
      <div className="min-w-[700px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/[0.02] border-y border-white/10">
              {categoryData.headers.map((header, idx) => (
                <th key={idx} className="p-4 text-[10px] uppercase tracking-widest text-white/40 mono font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categoryData.data.map((row: any) => {
              const isActive = row.id === selectedAlgorithm;
              return (
                <tr 
                  key={row.id} 
                  className={`border-b border-white/5 transition-colors duration-200 
                    ${isActive ? 'bg-white/[0.04] border-l-2 border-l-blue-500' : 'hover:bg-white/[0.01] border-l-2 border-l-transparent'}`
                  }
                >
                  <td className={`p-4 text-xs font-semibold mono tracking-wide ${isActive ? 'text-white' : 'text-white/60'}`}>
                    {row.name}
                  </td>
                  
                  {categoryKey === 'sorting' && (
                    <>
                      <td className="p-4 font-mono text-[11px] text-white/60">{row.best}</td>
                      <td className="p-4 font-mono text-[11px] text-amber-400/80">{row.avg}</td>
                      <td className="p-4 font-mono text-[11px] text-rose-400/80">{row.worst}</td>
                      <td className="p-4 font-mono text-[11px] text-white/60">{row.space}</td>
                      <td className="p-4 text-xs text-white/40 font-sans leading-relaxed">{row.useCase}</td>
                    </>
                  )}
                  
                  {categoryKey === 'searching' && (
                    <>
                      <td className="p-4 font-mono text-[11px] text-white/60">{row.best}</td>
                      <td className="p-4 font-mono text-[11px] text-amber-400/80">{row.avg}</td>
                      <td className="p-4 font-mono text-[11px] text-rose-400/80">{row.worst}</td>
                      <td className="p-4 font-mono text-[11px] text-white/60">{row.space}</td>
                      <td className="p-4 text-xs text-white/40 font-sans leading-relaxed">{row.useCase}</td>
                    </>
                  )}
                  
                  {categoryKey === 'graphs' && (
                    <>
                      <td className="p-4 font-mono text-[11px] text-amber-400/80">{row.time}</td>
                      <td className="p-4 font-mono text-[11px] text-white/60">{row.space}</td>
                      <td className="p-4 font-mono text-[11px] text-blue-400/80">{row.ds}</td>
                      <td className="p-4 text-xs text-white/40 font-sans leading-relaxed">{row.useCase}</td>
                    </>
                  )}

                  {categoryKey === 'datastructures' && (
                    <>
                      <td className="p-4 font-mono text-[11px] text-amber-400/80">{row.time}</td>
                      <td className="p-4 font-mono text-[11px] text-amber-400/80">{row.spaceTime}</td>
                      <td className="p-4 font-mono text-[11px] text-white/60">{row.space}</td>
                      <td className="p-4 text-xs text-white/40 font-sans leading-relaxed">{row.useCase}</td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {categoryKey === 'datastructures' && (
         <p className="text-[10px] text-white/30 mt-4 mono">* Amortized or average case time complexity.</p>
      )}
    </div>
  );
}
