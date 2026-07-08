"use client";

import React from 'react';
import ChallengeList from '@/components/testing/ChallengeList';
import { getChallengesByCategory } from '@/utils/mockChallenges';

export default function AlgorithmsTestingPage() {
  const challenges = getChallengesByCategory('algorithms');
  
  return (
    <ChallengeList 
      title="Algorithm Challenges"
      description="Test your algorithmic problem-solving skills against our curated set of challenges. Build efficient solutions and see how they perform."
      challenges={challenges}
    />
  );
}
