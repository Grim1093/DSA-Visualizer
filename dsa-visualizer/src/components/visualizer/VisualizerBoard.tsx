"use client";

import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import { logger } from '@/utils/logger';

export default function VisualizerBoard() {
  const { frames, currentFrameIndex } = useVisualizerStore();

  // Log every frame render to trace the visualization state
  useEffect(() => {
    if (frames.length > 0) {
      logger.debug('VisualizerBoard: Rendering frame', { 
        frameIndex: currentFrameIndex,
        state: frames[currentFrameIndex].arrayState 
      });
    }
  }, [currentFrameIndex, frames]);

  if (frames.length === 0) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center bg-gray-900 rounded-lg shadow-inner border border-gray-700 text-gray-400">
        <svg className="w-12 h-12 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p className="font-mono text-sm">Waiting for algorithm execution data...</p>
      </div>
    );
  }

  const currentFrame = frames[currentFrameIndex];
  const { arrayState, activePointers, comparing, swapping, description } = currentFrame;

  // Calculate maximum value to scale bar heights dynamically
  const maxValue = Math.max(...arrayState, 1);

  // Pre-process the array to ensure strictly unique keys for Framer Motion
  // This prevents React DOM errors when the user inputs duplicate numbers
  const displayItems = (() => {
    const counts: Record<number, number> = {};
    const items = arrayState.map((value, index) => {
      counts[value] = (counts[value] || 0) + 1;
      return {
        value,
        id: `${value}-${counts[value]}`, // e.g., "81-1", "81-2"
        originalIndex: index
      };
    });
    
    // Log the generated stable keys to ensure data integrity
    logger.debug('VisualizerBoard: Generated stable keys for render loop', { items });
    return items;
  })();

  return (
    <div className="w-full bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-700 flex flex-col">
      
      {/* Description Panel */}
      <div className="mb-8 min-h-[3rem] p-4 bg-gray-800 rounded border-l-4 border-blue-500 flex items-center">
        <p className="text-white font-mono text-sm">{description}</p>
      </div>

      {/* Visualization Canvas */}
      <div className="flex-1 min-h-[250px] flex items-end justify-center gap-2 overflow-x-auto pb-4">
        {displayItems.map((item) => {
          const { value, id, originalIndex } = item;
          
          // Determine the visual state of the current block using its current index in the array
          const isComparing = comparing.includes(originalIndex);
          const isSwapping = swapping && isComparing;
          
          let bgColor = 'bg-blue-500'; // Default state
          if (isComparing) bgColor = 'bg-yellow-500';
          if (isSwapping) bgColor = 'bg-red-500';

          // Check if any active pointer is pointing to this index
          const pointersAtThisIndex = Object.entries(activePointers)
            .filter(([_, pointerIndex]) => pointerIndex === originalIndex)
            .map(([pointerName]) => pointerName);

          const heightPercentage = `${(value / maxValue) * 100}%`;

          return (
            <motion.div
              layout
              key={id} // Using the composite unique ID here!
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex flex-col items-center justify-end w-12"
              style={{ height: '100%' }}
            >
              {/* Value Bar */}
              <motion.div
                layout
                className={`w-full rounded-t-sm shadow-md flex items-end justify-center pb-2 ${bgColor}`}
                style={{ height: heightPercentage, minHeight: '30px' }}
              >
                <span className="text-white text-xs font-bold drop-shadow-md">
                  {value}
                </span>
              </motion.div>

              {/* Pointers Display */}
              <div className="h-6 mt-2 flex flex-wrap justify-center gap-1">
                {pointersAtThisIndex.map((pointer) => (
                  <span 
                    key={pointer} 
                    className="text-[10px] font-mono bg-gray-700 text-white px-1 rounded"
                  >
                    {pointer}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}