'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getChallengesByCategory } from '@/utils/mockChallenges';
import AppLayout, { ProgressData } from '@/components/layout/AppLayout';

// Use ProgressData from AppLayout

export default function TestingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [progress, setProgress] = useState<ProgressData | null>(null);

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

  const xp = progress?.points ?? 0;
  const level = Math.floor(xp / 100) + 1;

  const isCompleted = (id: string) => progress?.completedModules.some(m => m.module_id === id);

  const formatDesc = (desc: string) => {
    const firstLine = desc.split('\n')[0];
    return firstLine.length > 70 ? firstLine.substring(0, 70) + '...' : firstLine;
  };

  const algoChallenges = getChallengesByCategory('algorithms').map((c, i) => ({
    id: c.id,
    number: String(i + 1).padStart(2, '0'),
    title: c.title,
    desc: formatDesc(c.description),
    difficulty: c.difficulty,
    locked: c.difficulty === 'Hard' && level < 5
  }));

  const dsChallenges = getChallengesByCategory('data-structures').map((c, i) => ({
    id: c.id,
    number: String(i + algoChallenges.length + 1).padStart(2, '0'),
    title: c.title,
    desc: formatDesc(c.description),
    difficulty: c.difficulty,
    locked: c.difficulty === 'Hard' && level < 5
  }));

  const renderChallenge = (mod: any) => {
    const completed = isCompleted(mod.id);
    return (
      <div key={mod.id} className="group flex flex-col md:flex-row items-stretch border-b border-outline-variant hover:bg-surface-container-high transition-colors duration-200">
        <div className="w-16 border-r border-outline-variant flex items-center justify-center font-code-lg text-code-lg text-on-surface-variant group-hover:text-primary transition-colors py-4">
          {mod.number}
        </div>
        <div className="flex-1 p-4 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <h4 className={`font-headline-md text-headline-md ${completed ? 'text-green-400' : 'text-primary'} group-hover:translate-x-1 transition-transform duration-200 flex items-center gap-2`}>
              {mod.title}
              {completed && <span className="material-symbols-outlined text-[16px]">check_circle</span>}
            </h4>
            {mod.locked && <span className="material-symbols-outlined text-[14px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>lock</span>}
          </div>
          <p className={`font-code-sm text-code-sm text-on-surface-variant ${mod.locked ? 'opacity-50' : ''}`}>
            {mod.desc}
          </p>
        </div>
        <div className="w-32 p-4 flex items-center justify-center md:border-l border-t md:border-t-0 border-outline-variant/30">
          <span className="font-code-sm text-code-sm text-on-surface-variant border border-outline-variant px-2 py-1 uppercase tracking-widest">{mod.difficulty}</span>
        </div>
        <div className="w-40 p-4 flex items-center justify-center border-t md:border-t-0 border-outline-variant/30">
          {mod.locked ? (
            <button className="font-label-caps text-label-caps bg-transparent border border-outline-variant text-on-surface-variant px-6 py-2 opacity-50 cursor-not-allowed tracking-widest uppercase w-full">
              LOCKED
            </button>
          ) : (
            <button 
              onClick={() => {
                router.push(`/testing/challenge/${mod.id}`);
              }}
              className={`font-label-caps text-label-caps bg-transparent border px-6 py-2 transition-all tracking-widest uppercase w-full ${
                completed 
                  ? 'border-green-400 text-green-400 hover:bg-green-400 hover:text-surface' 
                  : 'border-outline-variant text-on-surface-variant hover:bg-primary hover:text-surface hover:border-primary'
              }`}
            >
              {completed ? 'REVIEW' : 'SOLVE'}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <AppLayout progress={progress}>
      <div className="absolute inset-0 dot-bg z-0 pointer-events-none opacity-40 mix-blend-overlay"></div>
      
      <div className="p-6 pb-24 relative z-10 max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 flex justify-between items-end border-b border-outline-variant pb-6 pt-4 gap-4">
            <div className="flex flex-col gap-4">
              <h2 className="font-headline-lg text-headline-lg text-primary tracking-tighter uppercase">KNOWLEDGE ASSESSMENT TERMINAL</h2>
            </div>
            <div className="font-code-sm text-code-sm text-on-surface-variant flex items-center gap-3 border border-outline-variant px-4 py-1.5 bg-surface-container-lowest/50 backdrop-blur-sm rounded-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-[pulse_2s_ease-in-out_infinite]"></span> Assessment Mode
            </div>
        </div>

        {/* Section 01: Algorithm Challenges */}
        <section className="flex flex-col gap-4 mb-12">
            <div className="flex items-center gap-3 border-b border-outline-variant/50 pb-2">
              <span className="bg-primary text-surface font-label-caps text-label-caps px-2 py-0.5 rounded-sm">TEST.1</span>
              <h3 className="font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase">ALGORITHM CHALLENGES</h3>
              <div className="flex-1 h-px bg-outline-variant/30 ml-4"></div>
            </div>
            <div className="border border-outline-variant bg-surface-container-lowest/40 backdrop-blur-md flex flex-col rounded-sm overflow-hidden">
              {algoChallenges.map(renderChallenge)}
            </div>
        </section>

        {/* Section 02: Data Structure Challenges */}
        <section className="flex flex-col gap-4">
            <div className="flex items-center gap-3 border-b border-outline-variant/50 pb-2">
              <span className="bg-primary text-surface font-label-caps text-label-caps px-2 py-0.5 rounded-sm">TEST.2</span>
              <h3 className="font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase">DATA STRUCTURE CHALLENGES</h3>
              <div className="flex-1 h-px bg-outline-variant/30 ml-4"></div>
            </div>
            <div className="border border-outline-variant bg-surface-container-lowest/40 backdrop-blur-md flex flex-col rounded-sm overflow-hidden">
              {dsChallenges.map(renderChallenge)}
            </div>
        </section>
      </div>
    </AppLayout>
  );
}
