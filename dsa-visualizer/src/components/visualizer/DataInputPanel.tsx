"use client";

import React, { useState } from 'react';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import { 
  generateBubbleSortFrames, 
  generateSelectionSortFrames, 
  generateInsertionSortFrames 
} from '@/utils/dummyDataGenerator';
import { logger } from '@/utils/logger';

export default function DataInputPanel() {
  const { setFrames, reset, selectedAlgorithm } = useVisualizerStore();
  const [inputValue, setInputValue] = useState<string>('42, 15, 8, 99, 23, 4, 16, 7');
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRandom = () => {
    logger.debug('DataInputPanel: Triggered random array generation');
    const length = Math.floor(Math.random() * 10) + 5; 
    const randomArray = Array.from({ length }, () => Math.floor(Math.random() * 100) + 1);
    const randomString = randomArray.join(', ');
    
    setInputValue(randomString);
    setError(null);
    logger.info('DataInputPanel: Random array successfully generated', { array: randomArray });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logger.debug('DataInputPanel: Submit action intercepted', { rawInput: inputValue, selectedAlgorithm });

    const parsedArray = inputValue
      .split(',')
      .map((val) => val.trim())
      .filter((val) => val !== '');

    if (parsedArray.length === 0) {
      setError('Please enter at least one number.');
      return;
    }

    if (parsedArray.length > 50) { 
      setError('Maximum 50 elements allowed for optimal visualization.');
      return;
    }

    const numericArray = parsedArray.map(Number);
    if (numericArray.some(isNaN)) {
      setError('Invalid input. Please enter valid numbers separated by commas.');
      return;
    }

    setError(null);
    reset(); 
    
    // Routing logic: Call the correct generator based on the active state
    let newFrames;
    switch (selectedAlgorithm) {
      case 'selection':
        newFrames = generateSelectionSortFrames(numericArray);
        break;
      case 'insertion':
        newFrames = generateInsertionSortFrames(numericArray);
        break;
      case 'bubble':
      default:
        newFrames = generateBubbleSortFrames(numericArray);
        break;
    }

    setFrames(newFrames);
    logger.info(`DataInputPanel: Pipeline complete for ${selectedAlgorithm}`, { frameCount: newFrames.length });
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700 w-full text-white">
      <h3 className="text-xl font-bold mb-4 border-b border-gray-800 pb-2">Custom Data Configuration</h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="array-input" className="block text-sm font-medium text-gray-400 mb-2">
            Enter comma-separated integers (Max 50 elements)
          </label>
          <input
            id="array-input"
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (error) setError(null);
            }}
            placeholder="e.g. 10, 20, 5, 8, 1"
            className="w-full bg-gray-800 border border-gray-600 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono tracking-wide"
          />
          {error && (
            <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              {error}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={handleGenerateRandom}
            className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded transition-colors text-sm font-medium w-full sm:w-auto flex items-center justify-center gap-2"
          >
            Randomize Array
          </button>
          
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors text-sm font-bold w-full sm:w-auto shadow-md"
          >
            Apply & Visualize
          </button>
        </div>
      </form>
    </div>
  );
}