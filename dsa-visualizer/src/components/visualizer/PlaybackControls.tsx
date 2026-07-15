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
    currentFrameIndex,
    selectedAlgorithm
  } = useVisualizerStore();

  const totalFrames = frames.length;
  const isFinished = totalFrames > 0 && currentFrameIndex === totalFrames - 1;

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (isPlaying && !isFinished) {
      intervalId = setInterval(() => {
        if (currentFrameIndex >= frames.length - 1) {
          pause();
        } else {
          stepForward();
        }
      }, playbackSpeed);
    } else if (isPlaying && isFinished) {
      pause();
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, playbackSpeed, currentFrameIndex, frames.length, stepForward, pause, isFinished]);

  // Track progress when visualization finishes
  useEffect(() => {
    if (isFinished && totalFrames > 1 && selectedAlgorithm !== 'sandbox') {
      fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId: selectedAlgorithm, points: 20 })
      }).catch(console.error);
    }
  }, [isFinished, totalFrames, selectedAlgorithm]);

  const handlePlayPause = () => {
    if (isPlaying) pause();
    else play();
  };

  // Maps UI slider [0-100] to actual speed delay [1000ms - 50ms]
  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value); // 0 to 100
    const delay = Math.max(50, 1050 - (val * 10)); 
    setPlaybackSpeed(delay);
  };

  // Convert current speed delay to slider value
  const sliderValue = Math.max(0, Math.min(100, (1050 - playbackSpeed) / 10));

  return (
    <div className="card-mono p-3 flex flex-wrap items-center gap-4 w-full">
      <div className="text-xs font-mono text-white/50 bg-white/5 px-2 py-1 rounded">
        Step: {totalFrames > 0 ? currentFrameIndex + 1 : 0} / {totalFrames}
      </div>

      <div className="flex-1 flex justify-center sm:justify-start gap-2">
        <button
          onClick={reset}
          className="btn-ghost px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 disabled:opacity-30"
          disabled={totalFrames === 0}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          Reset
        </button>

        <button
          onClick={stepBackward}
          className="btn-ghost px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 disabled:opacity-30"
          disabled={currentFrameIndex === 0 || totalFrames === 0}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          Prev
        </button>

        <button
          onClick={handlePlayPause}
          className="btn-primary px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 disabled:opacity-30"
          disabled={totalFrames === 0}
        >
          {isPlaying ? (
            <><svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>Pause</>
          ) : (
            <><svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>Play</>
          )}
        </button>

        <button
          onClick={stepForward}
          className="btn-ghost px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 disabled:opacity-30"
          disabled={isFinished || totalFrames === 0}
        >
          Next
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>

      <label className="flex items-center gap-3 text-xs mono text-white/60 min-w-[150px]">
        <span className="w-12">SPEED</span>
        <input 
          type="range" 
          min={0} max={100} 
          value={sliderValue} 
          onChange={handleSpeedChange} 
          className="flex-1" 
        />
      </label>
    </div>
  );
}