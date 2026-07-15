"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisualizerStore } from '@/store/useVisualizerStore';

export default function VisualizerBoard() {
  const { frames, currentFrameIndex } = useVisualizerStore();

  if (frames.length === 0) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center text-white/30">
        <svg className="w-10 h-10 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p className="font-mono text-xs uppercase tracking-[0.2em]">Waiting for data...</p>
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

  const renderBar = (value: number, id: string, colorClass: string, pointersAtThisIndex: string[]) => {
    const heightPercentage = `${Math.max((value / maxValue) * 100, 5)}%`;
    return (
      <motion.div
        layout
        key={id}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        exit={{ opacity: 0, scaleY: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
        className="flex flex-col items-center justify-end flex-1 max-w-[60px]"
        style={{ height: '100%', transformOrigin: 'bottom' }}
      >
        <motion.div
          layout
          className={`w-full rounded-t-lg shadow-lg flex items-end justify-center pb-2 transition-colors duration-200 ${colorClass}`}
          style={{ height: heightPercentage }}
        >
          {arrayState.length <= 20 && (
            <span className="text-black text-xs font-bold font-mono rotate-[-90deg] sm:rotate-0 mb-2 sm:mb-0 opacity-80 mix-blend-overlay">
              {value}
            </span>
          )}
        </motion.div>
        
        <div className="h-6 mt-2 shrink-0 flex flex-col items-center justify-start w-full">
          {pointersAtThisIndex.map((pointer) => (
            <motion.div 
              initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
              key={pointer} 
              className="text-[9px] font-mono text-white/70 uppercase tracking-widest flex items-center justify-center leading-none"
            >
              {pointer}
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full flex-1 flex flex-col relative">
      {/* Description Overlay */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 w-3/4 max-w-lg">
        <motion.div 
          key={description}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono text-xs text-center py-2 px-4 rounded-full shadow-lg"
        >
          {description}
        </motion.div>
      </div>

      {/* Extracted Elements Container (e.g. Pivot for Quick Sort) */}
      <div className="flex justify-center gap-2 min-h-[60px] pt-20 px-8">
        <AnimatePresence>
          {extractedElements?.map((ext) => (
             <div key={ext.id} className="flex flex-col items-center w-12">
               <div className="h-[80px] flex items-end w-full">
                 {renderBar(ext.value, ext.id, 'bg-indigo-400', [])}
               </div>
               <span className="text-white/40 text-[9px] mt-2 font-mono uppercase">{ext.label}</span>
             </div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Visualization Canvas */}
      <div className="flex-1 flex items-end justify-center gap-1.5 overflow-hidden px-8 pb-4">
        <AnimatePresence>
          {displayItems.map((item) => {
            const { value, id, originalIndex } = item;
            
            const isComparing = comparing.includes(originalIndex);
            const isSwapping = swapping && isComparing;
            
            let colorClass = 'bg-white/80';
            if (isComparing) colorClass = 'bg-amber-400';
            if (isSwapping) colorClass = 'bg-rose-500';

            const pointersAtThisIndex = Object.entries(activePointers)
              .filter(([_, pointerIndex]) => pointerIndex === originalIndex)
              .map(([pointerName]) => pointerName);

            if (pointersAtThisIndex.includes('found')) colorClass = 'bg-emerald-400';

            const isExtracted = extractedElements?.some(e => e.originalIndex === originalIndex);
            if (isExtracted) {
              colorClass = 'bg-white/10 border border-white/20';
            }

            return renderBar(value, id, colorClass, pointersAtThisIndex);
          })}
        </AnimatePresence>
      </div>

      {/* Auxiliary Arrays Container (e.g. Left/Right for Merge Sort) */}
      <div className="flex flex-wrap justify-center gap-6 min-h-[120px] pb-6 px-8">
         <AnimatePresence>
           {auxiliaryArrays?.map((aux) => (
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
               key={aux.id} className="flex flex-col items-center card-mono p-3 bg-white/[0.02]"
             >
               <div className="flex items-end gap-1.5 h-[80px] min-w-[40px]">
                 {aux.values.map((val, idx) => {
                   if (val === null) {
                     return <div key={`empty-${idx}`} className="w-8" />;
                   }
                   return renderBar(val, `${aux.id}-${idx}-${val}`, 'bg-teal-400', []);
                 })}
               </div>
               <span className="text-white/40 text-[9px] mt-3 font-mono uppercase tracking-widest">{aux.label}</span>
             </motion.div>
           ))}
         </AnimatePresence>
      </div>
    </div>
  );
}