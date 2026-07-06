"use client";

import React from 'react';
import LearningWorkspace from '@/components/visualizer/LearningWorkspace';

export default function BasicDataStructuresPage() {
  return (
    <LearningWorkspace 
      title="Basic Data Structures" 
      allowedModules={['array', 'vector', 'linked_list', 'doubly_linked_list', 'circular_linked_list', 'hash_map', 'sandbox']}
    />
  );
}
