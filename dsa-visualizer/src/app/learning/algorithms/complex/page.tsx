"use client";

import React from 'react';
import LearningWorkspace from '@/components/visualizer/LearningWorkspace';

export default function ComplexAlgorithmsPage() {
  return (
    <LearningWorkspace 
      title="Complex Algorithms" 
      allowedModules={['bfs', 'dfs', 'dijkstra', 'dp', 'sandbox']}
    />
  );
}
