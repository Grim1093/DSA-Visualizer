'use client';

import React, { useEffect, useState } from 'react';
import { useParams, notFound, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import TestWorkspace from '@/components/testing/TestWorkspace';
import { getChallengeById } from '@/utils/mockChallenges';
import AppLayout, { ProgressData } from '@/components/layout/AppLayout';

export default function ChallengePage() {
  const params = useParams();
  const router = useRouter();
  const { status } = useSession();
  const [progress, setProgress] = useState<ProgressData | null>(null);

  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const challenge = getChallengeById(id);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/progress')
        .then(res => res.json())
        .then(data => {
          if (!data.error) setProgress(data);
        })
        .catch(console.error);
    }
  }, [status]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center bg-background text-on-surface">Loading...</div>;
  }

  if (!challenge) {
    return notFound();
  }

  return (
    <AppLayout progress={progress}>
      <TestWorkspace challenge={challenge} />
    </AppLayout>
  );
}
