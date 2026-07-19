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

  const orderedNodes: any[] = [];
  let curr = head;
  const visited = new Set();
  
  while (curr && !visited.has(curr)) {
    visited.add(curr);
    const nodeData = nodes.find((n: any) => n.id === curr);
    if (nodeData) orderedNodes.push(nodeData);
    curr = pointers ? pointers[curr] : null;
  }

  const floatingNodes = nodes.filter((n: any) => !visited.has(n.id));

  const getAddr = (id: string | null) => {
    if (!id) return 'NULL';
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return '0x' + (Math.abs(hash) % 4096).toString(16).padStart(3, '0').toUpperCase();
  };

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

      <div className="flex-1 flex flex-wrap gap-4 justify-center items-center max-w-5xl relative px-8 pt-24 pb-8 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {orderedNodes.map((node: any, idx: number) => {
            const isTarget = targetIndex === idx;
            const isHead = node.id === head;
            const isTail = node.id === tail;
            
            const nodeAddr = getAddr(node.id);
            const nextNodeId = pointers ? pointers[node.id] : null;
            const nextAddr = getAddr(nextNodeId);
            
            // Determine previous node based on list type and layout
            let prevNodeId = null;
            if (type === 'doubly' && node.prev) {
              prevNodeId = node.prev;
            } else if (idx > 0) {
              prevNodeId = orderedNodes[idx - 1].id;
            } else if (type === 'circular' && idx === 0 && orderedNodes.length > 0) {
              prevNodeId = orderedNodes[orderedNodes.length - 1].id;
            }
            const prevAddr = getAddr(prevNodeId);
            
            const isCircular = type === 'circular';
            
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
                  <div className="flex gap-2 mb-3 absolute -top-10 w-max">
                    {isHead && <span className="text-[9px] font-bold text-white/70 bg-white/10 px-2 py-0.5 rounded-sm mono uppercase tracking-widest border border-white/20">HEAD</span>}
                    {isTail && <span className="text-[9px] font-bold text-white/70 bg-white/10 px-2 py-0.5 rounded-sm mono uppercase tracking-widest border border-white/20">TAIL</span>}
                  </div>
                  
                  <div 
                    className={`flex items-stretch rounded-lg overflow-hidden border transition-colors shadow-lg
                      ${isTarget 
                        ? 'border-amber-400 bg-amber-400/10 shadow-[0_0_20px_rgba(251,191,36,0.15)]' 
                        : 'border-white/20 bg-white/[0.02] backdrop-blur-sm'
                      }`}
                  >
                    {/* Left: Prev Address */}
                    <div className="w-14 sm:w-16 border-r border-white/10 flex flex-col items-center justify-center bg-white/[0.03] py-2 px-1">
                      <span className="text-[8px] text-white/30 uppercase mb-1 mono tracking-wider">Prev</span>
                      <span className={`text-[9px] sm:text-[10px] mono ${prevAddr === 'NULL' ? 'text-red-400/70' : 'text-white/60'}`}>{prevAddr}</span>
                    </div>
                    
                    {/* Center: Element & Self Address */}
                    <div className="min-w-[60px] sm:min-w-[70px] flex flex-col items-center justify-between py-2 px-3 relative">
                      <span className={`text-lg sm:text-xl font-mono font-medium mb-3 ${isTarget ? 'text-amber-300' : 'text-white'}`}>
                        {node.value}
                      </span>
                      <div className="absolute bottom-1 w-full text-center">
                         <span className="text-[9px] text-blue-400/80 mono">{nodeAddr}</span>
                      </div>
                    </div>

                    {/* Right: Next Address */}
                    <div className="w-14 sm:w-16 border-l border-white/10 flex flex-col items-center justify-center bg-white/[0.03] py-2 px-1">
                      <span className="text-[8px] text-white/30 uppercase mb-1 mono tracking-wider">Next</span>
                      <span className={`text-[9px] sm:text-[10px] mono ${nextAddr === 'NULL' ? 'text-red-400/70' : 'text-white/60'}`}>{nextAddr}</span>
                    </div>
                  </div>
                </motion.div>
                
                {/* Circular Return Arrow at the end of Tail */}
                {isCircular && isTail && orderedNodes.length > 0 && (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col justify-center items-center text-white/30 ml-2 sm:ml-4"
                  >
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 14l-4-4m0 0l4-4m-4 4h11a4 4 0 010 8h-1"></path>
                    </svg>
                    <span className="text-[8px] mono mt-1 tracking-wider uppercase">To Head</span>
                  </motion.div>
                )}

                {/* Normal Next Pointer Arrow */}
                {idx < orderedNodes.length - 1 && (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    className="flex flex-col justify-center items-center text-white/30 mx-1 sm:mx-3"
                  >
                    <svg className="w-8 h-4 sm:w-10 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 12">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 2l7 4m0 0l-7 4m7-4H3"></path>
                    </svg>
                    {type === 'doubly' && (
                      <svg className="w-8 h-4 sm:w-10 mt-1 drop-shadow-md text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 12">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 10l-7-4m0 0l7-4m-7 4h18"></path>
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
