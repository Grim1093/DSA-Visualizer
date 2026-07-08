"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import ProblemPanel from './ProblemPanel';
import TestEditorPanel from './TestEditorPanel';
import { Challenge } from '@/utils/mockChallenges';

interface TestWorkspaceProps {
  challenge: Challenge;
}

export default function TestWorkspace({ challenge }: TestWorkspaceProps) {
  // Simple CSS grid split pane (50/50)
  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Top Navbar */}
      <header className="h-14 bg-[#111] border-b border-gray-800 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <Link 
            href={`/testing/${challenge.category}`}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Challenges
          </Link>
        </div>
        <div className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
          Testing Environment
        </div>
        <div className="w-20"></div> {/* Spacer for centering */}
      </header>

      {/* Main Split Pane Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Side: Problem Description */}
        <div className="w-full md:w-[45%] lg:w-[40%] h-[50vh] md:h-full">
          <ProblemPanel challenge={challenge} />
        </div>

        {/* Right Side: Code Editor & Results */}
        <div className="w-full md:w-[55%] lg:w-[60%] h-[50vh] md:h-full border-t md:border-t-0 md:border-l border-gray-800">
          <TestEditorPanel challenge={challenge} />
        </div>
      </div>
    </div>
  );
}
