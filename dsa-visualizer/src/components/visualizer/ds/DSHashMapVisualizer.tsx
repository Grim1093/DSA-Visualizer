"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisualizerStore } from '@/store/useVisualizerStore';

export default function DSHashMapVisualizer() {
  const { frames, currentFrameIndex } = useVisualizerStore();
  const currentFrame = frames[currentFrameIndex];

  if (!currentFrame || !currentFrame.dsHashMap) return null;

  const { buckets } = currentFrame.dsHashMap;
  const targetBucket = currentFrame.activePointers?.bucket;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 overflow-y-auto overflow-x-hidden">
      <div className="mb-6 text-center shrink-0">
        <h2 className="text-2xl font-bold text-white mb-2">Hash Map (Chaining)</h2>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-4xl shrink-0 pb-20">
        <AnimatePresence mode="popLayout">
          {buckets.map((bucket) => {
            const isTarget = targetBucket === bucket.index;

            return (
              <motion.div
                key={`bucket-${bucket.index}`}
                layout
                className={`flex items-center gap-4 p-3 rounded-lg border-2 transition-colors duration-300
                  ${isTarget ? 'border-yellow-400 bg-yellow-400/10 shadow-[0_0_15px_rgba(250,204,21,0.3)]' : 'border-gray-700 bg-gray-800/50'}
                `}
              >
                {/* Bucket Index */}
                <div className="flex flex-col items-center shrink-0 w-16">
                  <span className="text-xs text-gray-500 mb-1">Bucket</span>
                  <div className="w-12 h-12 flex items-center justify-center text-lg font-bold text-gray-300 bg-gray-900 rounded-md border border-gray-600">
                    {bucket.index}
                  </div>
                </div>

                {/* Chain of items */}
                <div className="flex flex-1 items-center gap-2 overflow-x-auto min-h-[4rem] px-2">
                  <AnimatePresence>
                    {bucket.chain.length === 0 ? (
                      <span className="text-gray-500 italic text-sm">Empty</span>
                    ) : (
                      bucket.chain.map((item, idx) => (
                        <React.Fragment key={item.key}>
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="flex flex-col border border-blue-500 rounded bg-blue-900/40 min-w-[100px] shrink-0 overflow-hidden"
                          >
                            <div className="bg-blue-600 px-2 py-1 text-xs font-bold text-white text-center border-b border-blue-500">
                              {item.key}
                            </div>
                            <div className="px-2 py-2 text-sm text-gray-200 text-center font-mono truncate">
                              {item.value}
                            </div>
                          </motion.div>
                          
                          {idx < bucket.chain.length - 1 && (
                            <div className="text-gray-500 shrink-0">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                              </svg>
                            </div>
                          )}
                        </React.Fragment>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Sticky container bottom description */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 p-4 bg-gray-900/95 rounded border border-gray-600 min-w-[300px] text-center shadow-2xl backdrop-blur-sm z-10">
        <p className="text-lg text-yellow-300 font-medium">
          {currentFrame.description || 'Waiting for action...'}
        </p>
      </div>
    </div>
  );
}
