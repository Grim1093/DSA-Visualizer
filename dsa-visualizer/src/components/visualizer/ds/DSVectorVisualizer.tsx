"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisualizerStore } from '@/store/useVisualizerStore';

export default function DSVectorVisualizer() {
  const { frames, currentFrameIndex } = useVisualizerStore();
  const currentFrame = frames[currentFrameIndex];

  if (!currentFrame || !currentFrame.dsVector) return null;

  const { values, capacity, size } = currentFrame.dsVector;
  const targetIndex = currentFrame.activePointers?.target;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Vector (Dynamic Array)</h2>
        <div className="flex gap-4 justify-center">
          <span className="text-blue-400 font-mono">Size: {size}</span>
          <span className="text-green-400 font-mono">Capacity: {capacity}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center items-center max-w-4xl">
        <AnimatePresence mode="popLayout">
          {values.map((val, idx) => {
            const isTarget = targetIndex === idx;
            
            return (
              <motion.div
                key={`cell-${idx}`}
                layout
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="flex flex-col items-center"
              >
                <span className="text-xs text-gray-500 mb-1">{idx}</span>
                <div 
                  className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-lg font-bold rounded-lg border-2 
                    ${isTarget ? 'border-yellow-400 bg-yellow-400/20 text-yellow-100 shadow-[0_0_15px_rgba(250,204,21,0.5)]' 
                    : val !== null ? 'border-blue-500 bg-blue-900/50 text-white shadow-lg'
                    : 'border-gray-700 bg-gray-800/30 text-gray-600 border-dashed'}
                  `}
                >
                  {val !== null ? val : 'null'}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-12 p-4 bg-gray-800/80 rounded border border-gray-700 max-w-xl text-center shadow-lg">
        <p className="text-lg text-gray-300 font-medium">
          {currentFrame.description || 'Waiting for action...'}
        </p>
      </div>
    </div>
  );
}
