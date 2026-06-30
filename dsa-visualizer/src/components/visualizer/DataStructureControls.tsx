"use client";

import React, { useState } from 'react';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import { 
  generateArrayWrite, 
  generateArrayDelete,
  generateVectorPush, 
  generateVectorPop,
  generateLinkedListAppend,
  generateHashMapSet
} from '@/utils/dsEngine';

export default function DataStructureControls() {
  const { selectedAlgorithm, frames, currentFrameIndex, appendFrames } = useVisualizerStore();
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');

  const currentState = frames[currentFrameIndex] || null;

  const handleArrayWrite = () => {
    if (!currentState) return;
    const index = parseInt(val1);
    const value = parseInt(val2);
    if (isNaN(index) || isNaN(value)) return;
    appendFrames(generateArrayWrite(currentState, index, value));
    setVal1('');
    setVal2('');
  };

  const handleArrayDelete = () => {
    if (!currentState) return;
    const index = parseInt(val1);
    if (isNaN(index)) return;
    appendFrames(generateArrayDelete(currentState, index));
    setVal1('');
  };

  const handleVectorPush = () => {
    if (!currentState) return;
    const value = parseInt(val1);
    if (isNaN(value)) return;
    appendFrames(generateVectorPush(currentState, value));
    setVal1('');
  };

  const handleVectorPop = () => {
    if (!currentState) return;
    appendFrames(generateVectorPop(currentState));
  };

  const handleLinkedListAppend = () => {
    if (!currentState) return;
    const value = parseInt(val1);
    if (isNaN(value)) return;
    appendFrames(generateLinkedListAppend(currentState, value));
    setVal1('');
  };

  const handleHashMapSet = () => {
    if (!currentState) return;
    if (!val1 || !val2) return;
    appendFrames(generateHashMapSet(currentState, val1, val2));
    setVal1('');
    setVal2('');
  };

  if (selectedAlgorithm === 'array') {
    return (
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <input 
          placeholder="Index" 
          value={val1} 
          onChange={e => setVal1(e.target.value)} 
          className="w-24 bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
        />
        <input 
          placeholder="Value" 
          value={val2} 
          onChange={e => setVal2(e.target.value)} 
          className="w-24 bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
        />
        <button onClick={handleArrayWrite} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold shadow-md">
          Write
        </button>
        <button onClick={handleArrayDelete} className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded font-bold shadow-md">
          Delete at Index
        </button>
      </div>
    );
  }

  if (selectedAlgorithm === 'vector') {
    return (
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <input 
          placeholder="Value" 
          value={val1} 
          onChange={e => setVal1(e.target.value)} 
          className="w-24 bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
        />
        <button onClick={handleVectorPush} className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded font-bold shadow-md">
          Push
        </button>
        <button onClick={handleVectorPop} className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded font-bold shadow-md">
          Pop
        </button>
      </div>
    );
  }

  if (selectedAlgorithm === 'linked_list' || selectedAlgorithm === 'doubly_linked_list' || selectedAlgorithm === 'circular_linked_list') {
    return (
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <input 
          placeholder="Value" 
          value={val1} 
          onChange={e => setVal1(e.target.value)} 
          className="w-24 bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
        />
        <button onClick={handleLinkedListAppend} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold shadow-md">
          Append Node
        </button>
      </div>
    );
  }

  if (selectedAlgorithm === 'hash_map') {
    return (
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <input 
          placeholder="Key (String)" 
          value={val1} 
          onChange={e => setVal1(e.target.value)} 
          className="w-32 bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
        />
        <input 
          placeholder="Value (String)" 
          value={val2} 
          onChange={e => setVal2(e.target.value)} 
          className="w-32 bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
        />
        <button onClick={handleHashMapSet} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold shadow-md">
          Set Key/Value
        </button>
      </div>
    );
  }

  return null;
}
