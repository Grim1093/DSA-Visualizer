"use client";

import React, { useEffect } from 'react';
import { logger } from '@/utils/logger';

export default function TheoryPanel() {
  useEffect(() => {
    logger.info('TheoryPanel: Mounted successfully and educational content loaded.');
    return () => {
      logger.debug('TheoryPanel: Unmounted.');
    };
  }, []);

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700 text-gray-300">
      
      {/* Concept Section */}
      <h2 className="text-2xl font-bold text-white mb-4">Concept</h2>
      <p className="mb-6 leading-relaxed">
        Bubble Sort is a simple sorting algorithm that repeatedly steps through the input list element by element, 
        comparing the current element with the one after it, swapping their values if needed. 
        These passes through the list are repeated until no swaps had to be performed during a pass, 
        meaning that the list has become fully sorted.
      </p>

      {/* Working Section */}
      <h2 className="text-2xl font-bold text-white mb-4">Working</h2>
      <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-400">
        <li>Start at the beginning of the array.</li>
        <li>Compare the first two elements.</li>
        <li>If the first is greater than the second, swap them.</li>
        <li>Move to the next pair of elements and repeat step 3.</li>
        <li>Continue until the end of the array. (The largest element will "bubble" to the end).</li>
        <li>Repeat the entire process for the remaining elements until the array is sorted.</li>
      </ol>

      {/* Complexity Analysis Section */}
      <h2 className="text-2xl font-bold text-white mb-4">Complexity Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-2">Time Complexity</h3>
          <ul className="space-y-2 font-mono text-sm">
            <li><span className="text-green-400 font-bold">Best Case:</span> O(n) <span className="text-gray-500 font-sans text-xs ml-1">(Already sorted)</span></li>
            <li><span className="text-yellow-400 font-bold">Average Case:</span> O(n²)</li>
            <li><span className="text-red-400 font-bold">Worst Case:</span> O(n²) <span className="text-gray-500 font-sans text-xs ml-1">(Reverse sorted)</span></li>
          </ul>
        </div>
        <div className="bg-gray-800 p-4 rounded border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-2">Space Complexity</h3>
          <ul className="space-y-2 font-mono text-sm">
            <li><span className="text-blue-400 font-bold">Auxiliary:</span> O(1)</li>
          </ul>
          <p className="text-xs mt-3 text-gray-500 leading-tight">
            Operates directly on the input array without requiring extra memory proportional to the input size.
          </p>
        </div>
      </div>
    </div>
  );
}