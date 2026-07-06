"use client";

import React from 'react';
import LearningWorkspace from '@/components/visualizer/LearningWorkspace';

export default function SearchingAlgorithmsPage() {
  return (
    <LearningWorkspace 
      title="Searching Algorithms" 
      allowedModules={['linear', 'binary', 'sandbox']}
    />
  );
}
