"use client";

import React from 'react';
import ChallengeList from '@/components/testing/ChallengeList';
import { getChallengesByCategory } from '@/utils/mockChallenges';

export default function DataStructuresTestingPage() {
  const challenges = getChallengesByCategory('data-structures');
  
  return (
    <ChallengeList 
      title="Data Structure Challenges"
      description="Put your fundamental knowledge to the test. Build, manipulate, and optimize core data structures to solve complex problems."
      challenges={challenges}
    />
  );
}
