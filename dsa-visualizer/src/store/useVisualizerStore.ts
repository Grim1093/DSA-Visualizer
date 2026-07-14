import { create } from 'zustand';
import { logger } from '@/utils/logger';

export interface Frame {
  frameIndex: number;
  arrayState: number[];
  activePointers: Record<string, number>;
  comparing: number[];
  swapping: boolean;
  description: string;
  // Enhanced Visualization Properties
  auxiliaryArrays?: { id: string; values: (number | null)[]; label?: string }[];
  extractedElements?: { id: string; value: number; label: string; originalIndex: number }[];
  visibleRange?: [number, number];
  
  // Graph Visualization Properties
  graphState?: {
    nodes: { id: string; label: string; x: number; y: number }[];
    edges: { source: string; target: string }[];
  };
  visitedNodes?: string[];
  currentNode?: string;
  dataStructureState?: string[]; // Queue (BFS) or Stack (DFS)
  // Data Structure Specific State
  dsArray?: { values: (number | null)[] }; // Basic array/vector
  dsVector?: { values: (number | null)[]; capacity: number; size: number };
  dsLinkedList?: { 
    type: 'singly' | 'doubly' | 'circular';
    nodes: { id: string; value: number }[]; 
    head: string | null; 
    tail: string | null; 
    pointers?: Record<string, string>;
    prevPointers?: Record<string, string>;
  };
  dsHashMap?: { buckets: { index: number; chain: { key: string; value: string }[] }[] };
  dsStack?: { values: number[] };
  dsQueue?: { values: number[] };
  dsHeap?: { values: number[] };
}

export type AppMode = 'algorithm' | 'data-structure';

interface VisualizerState {
  frames: Frame[];
  currentFrameIndex: number;
  isPlaying: boolean;
  playbackSpeed: number; 
  selectedAlgorithm: string; 
  mode: AppMode; // Are we playing a full algorithm, or in an interactive playground?

  setFrames: (frames: Frame[]) => void;
  appendFrames: (newFrames: Frame[]) => void; // For interactive DS operations
  play: () => void;
  pause: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  reset: () => void;
  setPlaybackSpeed: (speed: number) => void;
  setSelectedAlgorithm: (algo: string, mode?: AppMode) => void;
}

import { 
  generateArrayInit, 
  generateVectorInit, 
  generateLinkedListInit, 
  generateHashMapInit,
  generateStackInit,
  generateQueueInit,
  generateHeapInit
} from '@/utils/dsEngine';

export const useVisualizerStore = create<VisualizerState>((set, get) => ({
  frames: [],
  currentFrameIndex: 0,
  isPlaying: false,
  playbackSpeed: 500, 
  selectedAlgorithm: 'bubble',
  mode: 'algorithm',

  setFrames: (frames) => {
    logger.info('VisualizerStore: Setting new execution frames', { frameCount: frames.length });
    set({ frames, currentFrameIndex: 0, isPlaying: false });
  },

  appendFrames: (newFrames) => {
    logger.info('VisualizerStore: Appending new interactive frames', { newFrameCount: newFrames.length });
    const { frames, currentFrameIndex } = get();
    const updatedFrames = [...frames.slice(0, currentFrameIndex + 1), ...newFrames];
    set({ frames: updatedFrames, isPlaying: true });
    get().play(); // auto-play the new frames
  },

  play: () => {
    const { currentFrameIndex, frames } = get();
    if (frames.length === 0) {
      logger.warn('VisualizerStore: Attempted to play with no frames loaded');
      return;
    }
    if (currentFrameIndex >= frames.length - 1) {
      logger.info('VisualizerStore: Restarting playback from beginning');
      set({ currentFrameIndex: 0, isPlaying: true });
      return;
    }
    logger.info('VisualizerStore: Playback started', { startIndex: currentFrameIndex });
    set({ isPlaying: true });
  },

  pause: () => {
    logger.info('VisualizerStore: Playback paused', { currentIndex: get().currentFrameIndex });
    set({ isPlaying: false });
  },

  stepForward: () => {
    const { currentFrameIndex, frames } = get();
    if (currentFrameIndex < frames.length - 1) {
      logger.debug('VisualizerStore: Stepping forward', { newIndex: currentFrameIndex + 1 });
      set({ currentFrameIndex: currentFrameIndex + 1 });
    } else {
      logger.warn('VisualizerStore: Reached end of frames, pausing playback');
      set({ isPlaying: false });
    }
  },

  stepBackward: () => {
    const { currentFrameIndex } = get();
    if (currentFrameIndex > 0) {
      logger.debug('VisualizerStore: Stepping backward', { newIndex: currentFrameIndex - 1 });
      set({ currentFrameIndex: currentFrameIndex - 1 });
    } else {
      logger.warn('VisualizerStore: Cannot step backward, already at frame 0');
    }
  },

  reset: () => {
    logger.info('VisualizerStore: Resetting visualization to frame 0');
    set({ currentFrameIndex: 0, isPlaying: false });
  },

  setPlaybackSpeed: (speed) => {
    logger.info('VisualizerStore: Playback speed updated', { speed });
    set({ playbackSpeed: speed });
  },

  setSelectedAlgorithm: (algo, mode = 'algorithm') => {
    logger.info('VisualizerStore: Active algorithm/mode changed, clearing old frames', { newAlgo: algo, mode });
    
    let initialFrames: Frame[] = [];
    if (mode === 'data-structure') {
      if (algo === 'array') initialFrames = generateArrayInit(10); // Default array size 10
      else if (algo === 'vector') initialFrames = generateVectorInit();
      else if (algo === 'linked_list') initialFrames = generateLinkedListInit('singly');
      else if (algo === 'doubly_linked_list') initialFrames = generateLinkedListInit('doubly');
      else if (algo === 'circular_linked_list') initialFrames = generateLinkedListInit('circular');
      else if (algo === 'hash_map') initialFrames = generateHashMapInit();
      else if (algo === 'stack') initialFrames = generateStackInit();
      else if (algo === 'queue') initialFrames = generateQueueInit();
      else if (algo === 'heap') initialFrames = generateHeapInit();
    }
    
    set({ 
      selectedAlgorithm: algo, 
      mode, 
      frames: initialFrames, 
      currentFrameIndex: 0, 
      isPlaying: false 
    });
  }
}));