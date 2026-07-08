"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import { logger } from '@/utils/logger';

export default function VisualizerBoard() {
  const { frames, currentFrameIndex } = useVisualizerStore();

  useEffect(() => {
    if (frames.length > 0) {
      logger.debug('VisualizerBoard: Rendering frame', { 
        frameIndex: currentFrameIndex,
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
  const { 
    arrayState, activePointers, comparing, swapping, description,
    auxiliaryArrays, extractedElements, visibleRange
  } = currentFrame;

  const maxValue = Math.max(...arrayState, 1);

  const displayItems = (() => {
    const counts: Record<number, number> = {};
    let items = arrayState.map((value, index) => {
      counts[value] = (counts[value] || 0) + 1;
      return {
        value,
        id: `${value}-${counts[value]}`,
        originalIndex: index
      };
    });
    
    if (visibleRange) {
      items = items.filter(item => item.originalIndex >= visibleRange[0] && item.originalIndex <= visibleRange[1]);
    }

    return items;
  })();

  const renderBar = (value: number, id: string, bgColor: string, pointersAtThisIndex: string[]) => {
    const heightPercentage = `${(value / maxValue) * 100}%`;
    return (
      <motion.div
        layout
        key={id}
        initial={{ opacity: 0, scale: 0.5, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: -30 }}
        transition={{ type: "spring", stiffness: 450, damping: 20, mass: 0.8 }}
        className="flex flex-col items-center justify-end w-12"
        style={{ height: '100%' }}
      >
        <motion.div
          layout
          className={`w-full rounded-t-sm shadow-md flex items-end justify-center pb-2 ${bgColor}`}
          style={{ height: heightPercentage, minHeight: '30px' }}
        >
          <span className="text-white text-xs font-bold drop-shadow-md">
            {value}
          </span>
        </motion.div>
        <div className="h-8 mt-2 shrink-0 overflow-hidden flex flex-wrap justify-center gap-1 w-full">
          {pointersAtThisIndex.map((pointer) => (
            <span 
              key={pointer} 
              className="text-[10px] font-mono bg-gray-700 text-white px-1 rounded h-4 flex items-center"
            >
              {pointer}
            </span>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-700 flex flex-col">
      <div className="mb-4 h-[4rem] p-4 bg-gray-800 rounded border-l-4 border-blue-500 flex items-center overflow-hidden">
        <p className="text-white font-mono text-sm">{description}</p>
      </div>

      {/* Extracted Elements Container (e.g. Pivot for Quick Sort) */}
      <div className="flex justify-center gap-4 min-h-[80px] mb-4">
        <AnimatePresence>
          {extractedElements?.map((ext) => (
             <div key={ext.id} className="flex flex-col items-center">
               <span className="text-gray-400 text-xs mb-1 font-mono">{ext.label}</span>
               <div className="h-[100px] flex items-end">
                 {renderBar(ext.value, ext.id, 'bg-purple-500', [])}
               </div>
             </div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Visualization Canvas */}
      <div className="flex-1 min-h-[200px] flex items-end justify-center gap-2 overflow-x-auto pb-4 border-b border-gray-800">
        <AnimatePresence>
          {displayItems.map((item) => {
            const { value, id, originalIndex } = item;
            
            const isComparing = comparing.includes(originalIndex);
            const isSwapping = swapping && isComparing;
            
            let bgColor = 'bg-blue-500';
            if (isComparing) bgColor = 'bg-yellow-500';
            if (isSwapping) bgColor = 'bg-red-500';

            const pointersAtThisIndex = Object.entries(activePointers)
              .filter(([_, pointerIndex]) => pointerIndex === originalIndex)
              .map(([pointerName]) => pointerName);

            if (pointersAtThisIndex.includes('found')) bgColor = 'bg-green-500';

            // If this element was extracted, we might want to hide its main bar or just let it be.
            // For now, let's just let it render but maybe dim it if extracted? 
            // The generator logic usually keeps it in array, so let's render it normally or empty.
            const isExtracted = extractedElements?.some(e => e.originalIndex === originalIndex);
            if (isExtracted) {
              bgColor = 'bg-gray-700 opacity-20'; // Ghost it in the main array
            }

            return renderBar(value, id, bgColor, pointersAtThisIndex);
          })}
        </AnimatePresence>
      </div>

      {/* Auxiliary Arrays Container (e.g. Left/Right for Merge Sort) */}
      <div className="flex flex-wrap justify-center gap-4 min-h-[150px] mt-4 w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
         <AnimatePresence>
           {auxiliaryArrays?.map((aux) => (
             <div key={aux.id} className="flex flex-col items-center bg-gray-800 p-4 rounded-lg border border-gray-700">
               <span className="text-gray-400 text-xs mb-4 font-mono">{aux.label}</span>
               <div className="flex items-end gap-2 h-[100px]">
                 {aux.values.map((val, idx) => {
                   if (val === null) {
                     return <div key={`empty-${idx}`} className="w-12" />; // Spacer
                   }
                   // We don't have perfect IDs for aux arrays unless we track duplicates, 
                   // but for simple rendering, index is usually fine since they are ephemeral
                   return renderBar(val, `${aux.id}-${idx}-${val}`, 'bg-teal-500', []);
                 })}
               </div>
             </div>
           ))}
         </AnimatePresence>
      </div>
    </div>
  );
}