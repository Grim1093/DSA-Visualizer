"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisualizerStore } from '@/store/useVisualizerStore';

export default function DSLinkedListVisualizer() {
  const { frames, currentFrameIndex } = useVisualizerStore();
  const currentFrame = frames[currentFrameIndex];

  if (!currentFrame || !currentFrame.dsLinkedList) return null;

  const { nodes, pointers, head, tail, type } = currentFrame.dsLinkedList;
  const targetIndex = currentFrame.activePointers?.target;

  // We need to order the nodes based on pointers starting from head.
  // The 'nodes' array might not be in order if we inserted mid-way.
  const orderedNodes = [];
  let curr = head;
  const visited = new Set();
  
  while (curr && !visited.has(curr)) {
    visited.add(curr);
    const nodeData = nodes.find(n => n.id === curr);
    if (nodeData) orderedNodes.push(nodeData);
    curr = pointers ? pointers[curr] : null;
  }

  // Any floating nodes not in the main chain (for animation purposes)
  const floatingNodes = nodes.filter(n => !visited.has(n.id));

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 overflow-hidden">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Singly Linked List</h2>
      </div>

      <div className="flex flex-wrap gap-4 justify-center items-center max-w-5xl relative">
        <AnimatePresence mode="popLayout">
          {orderedNodes.map((node, idx) => {
            const isTarget = targetIndex === idx;
            const isHead = node.id === head;
            const isTail = node.id === tail;
            
            return (
              <React.Fragment key={node.id}>
                <motion.div
                  layout
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="flex flex-col items-center relative"
                >
                  <div className="flex gap-2 mb-2 absolute -top-6">
                    {isHead && <span className="text-xs font-bold text-blue-400 bg-blue-900/50 px-2 py-0.5 rounded">HEAD</span>}
                    {isTail && <span className="text-xs font-bold text-green-400 bg-green-900/50 px-2 py-0.5 rounded">TAIL</span>}
                  </div>
                  
                  <div 
                    className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-xl font-bold rounded-full border-4 
                      ${isTarget ? 'border-yellow-400 bg-yellow-400/20 text-yellow-100 shadow-[0_0_20px_rgba(250,204,21,0.6)]' 
                      : 'border-blue-500 bg-gray-800 text-white shadow-lg'}
                    `}
                  >
                    {node.value}
                  </div>
                </motion.div>
                
                {/* Arrow to next node */}
                {idx < orderedNodes.length - 1 && (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    className="flex flex-col justify-center items-center text-gray-500 mx-2"
                  >
                    {/* Forward Arrow */}
                    <svg className="w-8 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 12">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 2l7 4m0 0l-7 4m7-4H3"></path>
                    </svg>
                    {/* Backward Arrow for DLL */}
                    {type === 'doubly' && (
                      <svg className="w-8 h-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 12">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 10l-7-4m0 0l7-4m-7 4h18"></path>
                      </svg>
                    )}
                  </motion.div>
                )}

                {/* Circular Wrap Arrow */}
                {type === 'circular' && idx === orderedNodes.length - 1 && orderedNodes.length > 1 && (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[calc(100%*var(--nodes-count))] text-gray-500 flex justify-center pointer-events-none"
                    style={{ '--nodes-count': orderedNodes.length } as any}
                  >
                     <svg className="w-full h-8 overflow-visible" fill="none" stroke="currentColor" viewBox={`0 0 ${orderedNodes.length * 100} 32`} preserveAspectRatio="none">
                       <path 
                         strokeLinecap="round" 
                         strokeLinejoin="round" 
                         strokeWidth="2" 
                         d={`M ${orderedNodes.length * 100 - 50} 0 
                             Q ${orderedNodes.length * 100 - 50} 32, ${(orderedNodes.length * 100) / 2} 32 
                             Q 50 32, 50 0`} 
                       />
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M 40 10 L 50 0 L 60 10" />
                     </svg>
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-16 p-4 bg-gray-800/80 rounded border border-gray-700 max-w-xl text-center shadow-lg">
        <p className="text-lg text-gray-300 font-medium">
          {currentFrame.description || 'Waiting for action...'}
        </p>
      </div>
    </div>
  );
}
