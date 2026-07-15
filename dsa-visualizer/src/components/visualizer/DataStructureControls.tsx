"use client";

import React, { useState } from 'react';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import { 
  generateArrayRead,
  generateArrayWrite, 
  generateArrayDelete,
  generateVectorAccess,
  generateVectorPush, 
  generateVectorPop,
  generateLinkedListAppend,
  generateLinkedListDelete,
  generateLinkedListTraverse,
  generateHashMapSet,
  generateHashMapGet,
  generateHashMapDelete,
  generateStackPush,
  generateStackPop,
  generateQueueEnqueue,
  generateQueueDequeue,
  generateHeapInsert,
  generateHeapExtract
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

  const handleLinkedListDelete = () => {
    if (!currentState) return;
    appendFrames(generateLinkedListDelete(currentState));
  };

  const handleLinkedListTraverse = () => {
    if (!currentState) return;
    appendFrames(generateLinkedListTraverse(currentState));
  };

  const handleArrayRead = () => {
    if (!currentState) return;
    const index = parseInt(val1);
    if (isNaN(index)) return;
    appendFrames(generateArrayRead(currentState, index));
    setVal1('');
  };

  const handleVectorAccess = () => {
    if (!currentState) return;
    const index = parseInt(val1);
    if (isNaN(index)) return;
    appendFrames(generateVectorAccess(currentState, index));
    setVal1('');
  };

  const handleHashMapSet = () => {
    if (!currentState) return;
    if (!val1 || !val2) return;
    appendFrames(generateHashMapSet(currentState, val1, val2));
    setVal1('');
    setVal2('');
  };

  const handleHashMapGet = () => {
    if (!currentState) return;
    if (!val1) return;
    appendFrames(generateHashMapGet(currentState, val1));
    setVal1('');
  };

  const handleHashMapDelete = () => {
    if (!currentState) return;
    if (!val1) return;
    appendFrames(generateHashMapDelete(currentState, val1));
    setVal1('');
  };

  const handleStackPush = () => {
    if (!currentState) return;
    const value = parseInt(val1);
    if (isNaN(value)) return;
    appendFrames(generateStackPush(currentState, value));
    setVal1('');
  };

  const handleStackPop = () => {
    if (!currentState) return;
    appendFrames(generateStackPop(currentState));
  };

  const handleQueueEnqueue = () => {
    if (!currentState) return;
    const value = parseInt(val1);
    if (isNaN(value)) return;
    appendFrames(generateQueueEnqueue(currentState, value));
    setVal1('');
  };

  const handleQueueDequeue = () => {
    if (!currentState) return;
    appendFrames(generateQueueDequeue(currentState));
  };

  const handleHeapInsert = () => {
    if (!currentState) return;
    const value = parseInt(val1);
    if (isNaN(value)) return;
    appendFrames(generateHeapInsert(currentState, value));
    setVal1('');
  };

  const handleHeapExtract = () => {
    if (!currentState) return;
    appendFrames(generateHeapExtract(currentState));
  };

  const handleFillRandomArray = () => {
    if (!currentState || !currentState.dsArray) return;
    const size = currentState.dsArray.values.length;
    const randomValues = Array.from({ length: size }, () => Math.floor(Math.random() * 100));
    appendFrames([{
      ...currentState,
      dsArray: { values: randomValues },
      description: `Filled array with random values.`
    }]);
  };

  const inputClasses = "w-full flex-1 bg-gray-950/50 border border-white/10 hover:border-white/20 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono transition-all shadow-inner text-sm";
  const btnClasses = "flex-1 min-w-[100px] px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-semibold backdrop-blur-sm flex items-center justify-center";

  if (selectedAlgorithm === 'array') {
    return (
      <div className="flex flex-col gap-4 pt-3">
        <div className="flex flex-row gap-3">
          <input 
            placeholder="Index" 
            value={val1} 
            onChange={e => setVal1(e.target.value)} 
            className={inputClasses}
          />
          <input 
            placeholder="Value" 
            value={val2} 
            onChange={e => setVal2(e.target.value)} 
            className={inputClasses}
          />
        </div>
        <div className="flex flex-row flex-wrap gap-2">
          <button onClick={handleArrayRead} className={`${btnClasses} bg-teal-600/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30`}>
            Read
          </button>
          <button onClick={handleArrayWrite} className={`${btnClasses} bg-blue-600/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30`}>
            Write
          </button>
          <button onClick={handleArrayDelete} className={`${btnClasses} bg-red-600/20 hover:bg-red-500/30 text-red-300 border border-red-500/30`}>
            Delete
          </button>
          <button onClick={handleFillRandomArray} className={`${btnClasses} bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10`}>
            Randomize
          </button>
        </div>
      </div>
    );
  }

  if (selectedAlgorithm === 'vector') {
    return (
      <div className="flex flex-col gap-4 pt-3">
        <div className="flex flex-row gap-3">
          <input 
            placeholder="Value to Push" 
            value={val1} 
            onChange={e => setVal1(e.target.value)} 
            className={inputClasses}
          />
        </div>
        <div className="flex flex-row flex-wrap gap-2">
          <button onClick={handleVectorAccess} className={`${btnClasses} bg-teal-600/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30`}>
            Access
          </button>
          <button onClick={handleVectorPush} className={`${btnClasses} bg-emerald-600/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30`}>
            Push
          </button>
          <button onClick={handleVectorPop} className={`${btnClasses} bg-red-600/20 hover:bg-red-500/30 text-red-300 border border-red-500/30`}>
            Pop
          </button>
        </div>
      </div>
    );
  }

  if (selectedAlgorithm === 'linked_list' || selectedAlgorithm === 'doubly_linked_list' || selectedAlgorithm === 'circular_linked_list') {
    return (
      <div className="flex flex-col gap-4 pt-3">
        <div className="flex flex-row gap-3">
          <input 
            placeholder="Node Value" 
            value={val1} 
            onChange={e => setVal1(e.target.value)} 
            className={inputClasses}
          />
        </div>
        <div className="flex flex-row flex-wrap gap-2">
          <button onClick={handleLinkedListAppend} className={`${btnClasses} bg-blue-600/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30`}>
            Append Node
          </button>
          <button onClick={handleLinkedListDelete} className={`${btnClasses} bg-red-600/20 hover:bg-red-500/30 text-red-300 border border-red-500/30`}>
            Delete Node
          </button>
          {(selectedAlgorithm === 'doubly_linked_list' || selectedAlgorithm === 'circular_linked_list') && (
            <button onClick={handleLinkedListTraverse} className={`${btnClasses} bg-amber-600/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30`}>
              {selectedAlgorithm === 'circular_linked_list' ? 'Loop' : 'Traverse'}
            </button>
          )}
        </div>
      </div>
    );
  }

  if (selectedAlgorithm === 'hash_map') {
    return (
      <div className="flex flex-col gap-4 pt-3">
        <div className="flex flex-row gap-3">
          <input 
            placeholder="Key (String)" 
            value={val1} 
            onChange={e => setVal1(e.target.value)} 
            className={inputClasses}
          />
          <input 
            placeholder="Value" 
            value={val2} 
            onChange={e => setVal2(e.target.value)} 
            className={inputClasses}
          />
        </div>
        <div className="flex flex-row flex-wrap gap-2">
          <button onClick={handleHashMapGet} className={`${btnClasses} bg-teal-600/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30`}>
            Get
          </button>
          <button onClick={handleHashMapSet} className={`${btnClasses} bg-indigo-600/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30`}>
            Set
          </button>
          <button onClick={handleHashMapDelete} className={`${btnClasses} bg-red-600/20 hover:bg-red-500/30 text-red-300 border border-red-500/30`}>
            Delete
          </button>
        </div>
      </div>
    );
  }

  if (selectedAlgorithm === 'stack') {
    return (
      <div className="flex flex-col gap-4 pt-3">
        <div className="flex flex-row gap-3">
          <input 
            placeholder="Value to Push" 
            value={val1} 
            onChange={e => setVal1(e.target.value)} 
            className={inputClasses}
          />
        </div>
        <div className="flex flex-row flex-wrap gap-2">
          <button onClick={handleStackPush} className={`${btnClasses} bg-purple-600/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30`}>
            Push
          </button>
          <button onClick={handleStackPop} className={`${btnClasses} bg-pink-600/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/30`}>
            Pop
          </button>
        </div>
      </div>
    );
  }

  if (selectedAlgorithm === 'queue') {
    return (
      <div className="flex flex-col gap-4 pt-3">
        <div className="flex flex-row gap-3">
          <input 
            placeholder="Value to Enqueue" 
            value={val1} 
            onChange={e => setVal1(e.target.value)} 
            className={inputClasses}
          />
        </div>
        <div className="flex flex-row flex-wrap gap-2">
          <button onClick={handleQueueEnqueue} className={`${btnClasses} bg-cyan-600/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30`}>
            Enqueue
          </button>
          <button onClick={handleQueueDequeue} className={`${btnClasses} bg-orange-600/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/30`}>
            Dequeue
          </button>
        </div>
      </div>
    );
  }

  if (selectedAlgorithm === 'heap') {
    return (
      <div className="flex flex-col gap-4 pt-3">
        <div className="flex flex-row gap-3">
          <input 
            placeholder="Value to Insert" 
            value={val1} 
            onChange={e => setVal1(e.target.value)} 
            className={inputClasses}
          />
        </div>
        <div className="flex flex-row flex-wrap gap-2">
          <button onClick={handleHeapInsert} className={`${btnClasses} bg-amber-600/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30`}>
            Insert
          </button>
          <button onClick={handleHeapExtract} className={`${btnClasses} bg-teal-600/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30`}>
            Extract Min
          </button>
        </div>
      </div>
    );
  }

  return null;
}
