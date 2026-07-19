"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisualizerStore } from '@/store/useVisualizerStore';

export default function DSStackVisualizer() {
  const { frames, currentFrameIndex } = useVisualizerStore();
  const currentFrame = frames[currentFrameIndex];

  if (!currentFrame || !currentFrame.dsStack) return null;

  const { values } = currentFrame.dsStack;
  const targetIndex = currentFrame.activePointers?.target;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Stack (LIFO)</h2>
        <div className="flex gap-4 justify-center">
          <span className="text-blue-400 font-mono">Size: {values.length}</span>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-2 justify-end items-center min-h-64 border-b-4 border-l-4 border-r-4 border-gray-600 rounded-b-lg p-4 w-48 bg-gray-900/50">
        <AnimatePresence mode="popLayout">
          {values.map((val: number, idx: number) => {
            const isTarget = targetIndex === idx;
            const isTop = idx === values.length - 1;
            
            return (
              <motion.div
                key={`cell-${idx}-${val}`}
                layout
                initial={{ opacity: 0, scale: 0.3, y: -50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: -50 }}
                transition={{ type: "spring", stiffness: 450, damping: 20, mass: 0.8 }}
                className="flex items-center justify-center w-full relative group"
              >
                {isTop && (
                  <span className="absolute -left-12 text-xs font-bold text-green-400">TOP &rarr;</span>
                )}
                <div 
                  className={`w-full h-12 flex items-center justify-center text-lg font-bold rounded-md border-2 
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
          <div className="text-gray-500 italic h-full flex items-center">Empty Stack</div>
        )}
      </div>

      <div className="mt-12 p-4 bg-gray-800/80 rounded border border-gray-700 max-w-xl text-center shadow-lg">
        <p className="text-lg text-gray-300 font-medium">
          {currentFrame.description || 'Waiting for action...'}
        </p>
      </div>
    </div>
  );
}
