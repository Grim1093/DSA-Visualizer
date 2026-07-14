"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisualizerStore } from '@/store/useVisualizerStore';

export default function DSQueueVisualizer() {
  const { frames, currentFrameIndex } = useVisualizerStore();
  const currentFrame = frames[currentFrameIndex];

  if (!currentFrame || !currentFrame.dsQueue) return null;

  const { values } = currentFrame.dsQueue;
  const targetIndex = currentFrame.activePointers?.target;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 overflow-x-hidden">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Queue (FIFO)</h2>
        <div className="flex gap-4 justify-center">
          <span className="text-blue-400 font-mono">Size: {values.length}</span>
        </div>
      </div>

      <div className="w-full max-w-4xl flex items-center justify-center gap-4 relative py-12 overflow-x-auto [scrollbar-width:none]">
        {/* Enqueue indicator */}
        <div className="text-green-400 font-mono text-sm font-bold flex flex-col items-center shrink-0">
          <span>ENQUEUE</span>
          <span className="text-xl">&rarr;</span>
        </div>

        <div className="flex gap-2 min-w-[200px] min-h-[80px] p-4 border-t-4 border-b-4 border-gray-600 bg-gray-900/50 items-center justify-start rounded">
          <AnimatePresence mode="popLayout">
            {values.map((val: number, idx: number) => {
              const isTarget = targetIndex === idx;
              return (
                <motion.div
                  key={`cell-${idx}-${val}`}
                  layout
                  initial={{ opacity: 0, scale: 0.3, x: -50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0, x: 50 }}
                  transition={{ type: "spring", stiffness: 450, damping: 20, mass: 0.8 }}
                  className="flex items-center justify-center relative group shrink-0"
                >
                  <div 
                    className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-lg font-bold rounded-md border-2 
                      ${isTarget ? 'border-yellow-400 bg-yellow-400/20 text-yellow-100 shadow-[0_0_15px_rgba(250,204,21,0.5)]' 
                      : 'border-blue-500 bg-blue-900/50 text-white shadow-lg'}
                    `}
                  >
                    {val}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {values.length === 0 && (
            <div className="text-gray-500 italic w-full text-center">Empty Queue</div>
          )}
        </div>

        {/* Dequeue indicator */}
        <div className="text-red-400 font-mono text-sm font-bold flex flex-col items-center shrink-0">
          <span className="text-xl">&rarr;</span>
          <span>DEQUEUE</span>
        </div>
      </div>

      <div className="mt-12 p-4 bg-gray-800/80 rounded border border-gray-700 max-w-xl text-center shadow-lg">
        <p className="text-lg text-gray-300 font-medium">
          {currentFrame.description || 'Waiting for action...'}
        </p>
      </div>
    </div>
  );
}
