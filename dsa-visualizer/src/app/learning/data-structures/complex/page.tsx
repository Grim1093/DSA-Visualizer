"use client";

import React from 'react';
import LearningWorkspace from '@/components/visualizer/LearningWorkspace';

export default function ComplexDataStructuresPage() {
  return (
    <LearningWorkspace 
      title="Complex Data Structures" 
      allowedModules={['heap', 'sandbox']}
    />
  );
}
