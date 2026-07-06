"use client";

import React, { useEffect } from 'react';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import { logger } from '@/utils/logger';

export default function PlaybackControls() {
  const {
    isPlaying,
    play,
    pause,
    stepForward,
    stepBackward,
    reset,
    playbackSpeed,
    setPlaybackSpeed,
    frames,
    currentFrameIndex
  } = useVisualizerStore();

  const totalFrames = frames.length;
  const isFinished = totalFrames > 0 && currentFrameIndex === totalFrames - 1;

  // Effect Engine: Manages automatic progression ticks when "Play" state is active
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isPlaying && !isFinished) {
      logger.info('PlaybackControls Loop: Spawning interval ticker', { playbackSpeed, currentFrameIndex });
      
      intervalId = setInterval(() => {
        // Re-evaluating terminal state before advancing pointer index
        if (currentFrameIndex >= frames.length - 1) {
          logger.info('PlaybackControls Loop: Termination condition reached inside ticker. Pausing state.');
          pause();
        } else {
          stepForward();
        }
      }, playbackSpeed);
    } else if (isPlaying && isFinished) {
      logger.warn('PlaybackControls Loop: Prevented ticker start because timeline is already at termination index.');
      pause();
    }

    // Cleanup hook invocation to clear active interval handles on state changes or unmounts
    return () => {
      if (intervalId) {
        logger.debug('PlaybackControls Loop: Clearing active interval ticker reference.');
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, playbackSpeed, currentFrameIndex, frames.length, stepForward, pause, isFinished]);

  const handlePlayPause = () => {
    logger.debug('PlaybackControls: Play/Pause toggled manually', { isCurrentlyPlaying: isPlaying });
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSpeed = Number(e.target.value);
    logger.debug('PlaybackControls: Speed changed via dropdown menu selector', { newSpeed });
    setPlaybackSpeed(newSpeed);
  };

  return (
    <div className="flex flex-row flex-wrap items-center justify-center bg-gray-900 p-4 rounded-lg shadow-lg gap-4 text-white w-full min-w-0">
      {/* Progress Indicator */}
      <div className="text-sm font-mono bg-gray-800 px-3 py-1 rounded whitespace-nowrap shrink-0">
        Step: {totalFrames > 0 ? currentFrameIndex + 1 : 0} / {totalFrames}
      </div>

      {/* Main Controls */}
      <div className="flex flex-row flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => {
            logger.debug('PlaybackControls: Reset action dispatched');
            reset();
          }}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded transition-colors disabled:opacity-50"
          disabled={totalFrames === 0}
        >
          Reset
        </button>

        <button
          onClick={() => {
            logger.debug('PlaybackControls: Step Backward action dispatched');
            stepBackward();
          }}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors disabled:opacity-50"
          disabled={currentFrameIndex === 0 || totalFrames === 0}
        >
          &larr; Prev
        </button>

        <button
          onClick={handlePlayPause}
          className={`px-6 py-2 rounded font-bold transition-colors disabled:opacity-50 ${
            isPlaying ? 'bg-amber-500 hover:bg-amber-400' : 'bg-green-600 hover:bg-green-500'
          }`}
          disabled={totalFrames === 0}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <button
          onClick={() => {
            logger.debug('PlaybackControls: Step Forward action dispatched');
            stepForward();
          }}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors disabled:opacity-50"
          disabled={isFinished || totalFrames === 0}
        >
          Next &rarr;
        </button>
      </div>

      {/* Speed Configuration */}
      <div className="flex items-center gap-2">
        <label htmlFor="speed-select" className="text-sm">Speed:</label>
        <select
          id="speed-select"
          value={playbackSpeed}
          onChange={handleSpeedChange}
          className="bg-gray-800 border border-gray-700 text-white rounded px-2 py-1 outline-none focus:border-blue-500"
        >
          <option value={1000}>0.5x (Slow)</option>
          <option value={500}>1.0x (Normal)</option>
          <option value={250}>2.0x (Fast)</option>
          <option value={100}>5.0x (Very Fast)</option>
        </select>
      </div>
    </div>
  );
}