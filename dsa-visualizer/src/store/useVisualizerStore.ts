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
}

interface VisualizerState {
  frames: Frame[];
  currentFrameIndex: number;
  isPlaying: boolean;
  playbackSpeed: number; 
  selectedAlgorithm: string; // New state property

  setFrames: (frames: Frame[]) => void;
  play: () => void;
  pause: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  reset: () => void;
  setPlaybackSpeed: (speed: number) => void;
  setSelectedAlgorithm: (algo: string) => void; // New action
}

export const useVisualizerStore = create<VisualizerState>((set, get) => ({
  frames: [],
  currentFrameIndex: 0,
  isPlaying: false,
  playbackSpeed: 500, 
  selectedAlgorithm: 'bubble',

  setFrames: (frames) => {
    logger.info('VisualizerStore: Setting new execution frames', { frameCount: frames.length });
    set({ frames, currentFrameIndex: 0, isPlaying: false });
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

  setSelectedAlgorithm: (algo) => {
    logger.info('VisualizerStore: Active algorithm changed, clearing old frames', { newAlgo: algo });
    // Wiping the frames ensures we don't play a Bubble Sort animation while the UI says "Selection Sort"
    set({ selectedAlgorithm: algo, frames: [], currentFrameIndex: 0, isPlaying: false });
  }
}));