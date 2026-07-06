"use client";

import React from 'react';
import LearningWorkspace from '@/components/visualizer/LearningWorkspace';

export default function SortingAlgorithmsPage() {
  return (
    <LearningWorkspace 
      title="Sorting Algorithms" 
      allowedModules={['bubble', 'selection', 'insertion', 'merge', 'quick', 'sandbox']}
    />
  );
}
