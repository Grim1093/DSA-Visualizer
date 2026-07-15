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

  const orderedNodes = [];
  let curr = head;
  const visited = new Set();
  
  while (curr && !visited.has(curr)) {
    visited.add(curr);
    const nodeData = nodes.find((n: any) => n.id === curr);
    if (nodeData) orderedNodes.push(nodeData);
    curr = pointers ? pointers[curr] : null;
  }

  const floatingNodes = nodes.filter((n: any) => !visited.has(n.id));

  return (
    <div className="w-full flex-1 flex flex-col items-center relative overflow-hidden">
      {/* Description Overlay */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 w-3/4 max-w-lg">
        <motion.div 
          key={currentFrame.description}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono text-xs text-center py-2 px-4 rounded-full shadow-lg"
        >
          {currentFrame.description || 'Waiting for action...'}
        </motion.div>
      </div>

      <div className="flex-1 flex flex-wrap gap-4 justify-center items-center max-w-5xl relative px-8 pt-20 pb-8 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {orderedNodes.map((node: any, idx: number) => {
            const isTarget = targetIndex === idx;
            const isHead = node.id === head;
            const isTail = node.id === tail;
            
            return (
              <React.Fragment key={node.id}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="flex flex-col items-center relative"
                >
                  <div className="flex gap-2 mb-2 absolute -top-8 w-max">
                    {isHead && <span className="text-[9px] font-bold text-white/70 bg-white/10 px-2 py-0.5 rounded-sm mono uppercase tracking-widest border border-white/20">HEAD</span>}
                    {isTail && <span className="text-[9px] font-bold text-white/70 bg-white/10 px-2 py-0.5 rounded-sm mono uppercase tracking-widest border border-white/20">TAIL</span>}
                  </div>
                  
                  <div 
                    className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-xl font-mono font-medium rounded-full border-2 
                      ${isTarget ? 'border-amber-400 bg-amber-400/20 text-amber-200 shadow-[0_0_30px_rgba(251,191,36,0.3)]' 
                      : 'border-white/20 bg-white/[0.03] text-white shadow-lg backdrop-blur-sm'}
                    `}
                  >
                    {node.value}
                  </div>
                </motion.div>
                
                {idx < orderedNodes.length - 1 && (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    className="flex flex-col justify-center items-center text-white/20 mx-2"
                  >
                    <svg className="w-8 h-4 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 12">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 2l7 4m0 0l-7 4m7-4H3"></path>
                    </svg>
                    {type === 'doubly' && (
                      <svg className="w-8 h-4 mt-1 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 12">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 10l-7-4m0 0l7-4m-7 4h18"></path>
                      </svg>
                    )}
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
