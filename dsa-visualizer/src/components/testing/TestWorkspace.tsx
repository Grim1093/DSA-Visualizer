"use client";

import React, { useState } from 'react';
import ProblemPanel from './ProblemPanel';
import TestEditorPanel from './TestEditorPanel';
import { Challenge } from '@/utils/mockChallenges';

interface TestWorkspaceProps {
  challenge: Challenge;
}

export default function TestWorkspace({ challenge }: TestWorkspaceProps) {
  // Use h-[calc(100vh-4rem)] because AppLayout has a 4rem (16) top padding
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-background text-on-surface overflow-hidden">
      {/* Main Split Pane Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden border-t border-outline-variant">
        {/* Left Side: Problem Description */}
        <div className="w-full md:w-[45%] lg:w-[40%] h-[50vh] md:h-full border-b md:border-b-0 md:border-r border-outline-variant bg-surface-container-lowest">
          <ProblemPanel challenge={challenge} />
        </div>

        {/* Right Side: Code Editor & Results */}
        <div className="w-full md:w-[55%] lg:w-[60%] h-[50vh] md:h-full bg-surface-container-lowest">
          <TestEditorPanel challenge={challenge} />
        </div>
      </div>
    </div>
  );
}
