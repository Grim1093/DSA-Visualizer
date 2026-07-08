"use client";

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import TestWorkspace from '@/components/testing/TestWorkspace';
import { getChallengeById } from '@/utils/mockChallenges';

export default function ChallengePage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  
  const challenge = getChallengeById(id);

  if (!challenge) {
    return notFound();
  }

  // The TestWorkspace contains the split pane layout
  return <TestWorkspace challenge={challenge} />;
}
