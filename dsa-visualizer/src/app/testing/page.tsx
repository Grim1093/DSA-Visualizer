'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AppLayout, { ProgressData } from '@/components/layout/AppLayout';

const testingModules = [
  { 
    id: 'algorithms', 
    code: 'TEST.1', 
    icon: 'code', 
    name: 'Algorithm Challenges', 
    desc: 'Test your knowledge on searching, sorting, graph traversal, and dynamic programming algorithms.',
    route: '/testing/algorithms'
  },
  { 
    id: 'data-structures', 
    code: 'TEST.2', 
    icon: 'account_tree', 
    name: 'Data Structure Challenges', 
    desc: 'Solve problems using arrays, linked lists, hash maps, trees, and advanced heaps.',
    route: '/testing/data-structures'
  }
];

export default function TestingOverviewPage() {
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

  return (
    <AppLayout progress={progress}>
      <div className="absolute inset-0 dot-bg z-0 pointer-events-none opacity-40 mix-blend-overlay"></div>
      
      <div className="p-6 pb-24 relative z-10 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-outline-variant pb-6 gap-4">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tighter uppercase mb-2">KNOWLEDGE ASSESSMENT TERMINAL</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant opacity-80 max-w-2xl">
              Select a category to begin testing your problem-solving skills and advance your rank.
            </p>
          </div>
          <div className="font-code-sm text-code-sm text-on-surface-variant flex items-center gap-3 border border-outline-variant px-4 py-1.5 bg-surface-container-lowest/50 backdrop-blur-sm rounded-sm mb-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-primary animate-[pulse_2s_ease-in-out_infinite]"></span> Assessment Mode
          </div>
        </div>

        {/* Categories Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-24">
          
          {testingModules.map((mod) => (
            <div key={mod.id} onClick={() => router.push(mod.route)} className="card-mono bg-white/[0.02] border border-outline-variant hover:bg-white/[0.05] hover:border-white p-6 transition-all duration-200 cursor-pointer group flex flex-col justify-between h-full min-h-[14rem]">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-surface-variant border border-outline-variant p-2 flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface">{mod.icon}</span>
                </div>
                <span className="font-code-sm text-code-sm text-on-surface-variant group-hover:text-primary transition-colors">{mod.code}</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-primary mb-2">{mod.name}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant opacity-80">{mod.desc}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-outline-variant flex justify-between items-center">
                <button className="bg-primary text-surface font-label-caps text-label-caps px-8 py-3 rounded-sm border border-primary hover:bg-surface hover:text-primary transition-colors flex items-center gap-2">
                  ENTER
                </button>
                <span className="material-symbols-outlined text-sm text-primary opacity-60 group-hover:opacity-100 transition-opacity">arrow_outward</span>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </AppLayout>
  );
}
