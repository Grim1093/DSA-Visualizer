'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AppLayout, { ProgressData } from '@/components/layout/AppLayout';

const dsModules = [
  { id: 'basic', code: 'DS.1', icon: 'notes', name: 'Basic Structures', desc: 'Arrays, Vectors, Linked Lists, Hash Maps, Stacks, and Queues.' },
  { id: 'complex', code: 'DS.2', icon: 'account_tree', name: 'Complex Structures', desc: 'Trees, Graphs, Tries, and Advanced Heaps.' }
];

const algoModules = [
  { id: 'searching', code: 'AL.1', icon: 'search', name: 'Searching', desc: 'Linear Search, Binary Search.' },
  { id: 'sorting', code: 'AL.2', icon: 'sort', name: 'Sorting', desc: 'Bubble, Selection, Insertion, Merge, Quick.' },
  { id: 'complex', code: 'AL.3', icon: 'route', name: 'Complex', desc: 'Pathfinding, DP, Graph Traversals.' }
];

export default function LearningHubPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();
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

  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  const filterModules = (modules: any[]) => {
    if (!searchQuery) return modules;
    return modules.filter(m => 
      m.name.toLowerCase().includes(searchQuery) || 
      m.desc.toLowerCase().includes(searchQuery)
    );
  };

  const filteredDsModules = filterModules(dsModules);
  const filteredAlgoModules = filterModules(algoModules);

  return (
    <AppLayout progress={progress}>
      <div className="absolute inset-0 dot-bg z-0 pointer-events-none opacity-40 mix-blend-overlay"></div>
      
      <div className="p-6 pb-24 relative z-10">
        {/* Header Section */}
        <div className="mb-12 flex justify-between items-end border-b border-outline-variant pb-6">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tighter uppercase mb-2">Learning Hub</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant opacity-80 max-w-2xl">
              Master core computer science concepts through interactive, step-by-step visualizations.
            </p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto pb-24">
          
          {/* Data Structures Column */}
          <div className="flex flex-col gap-4">
            <h2 className="font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase mb-2">DATA STRUCTURES</h2>
            
            {filteredDsModules.length === 0 ? (
              <div className="text-on-surface-variant opacity-50 py-4 font-code-sm">No modules found.</div>
            ) : (
              filteredDsModules.map((mod) => (
                <div key={mod.id} onClick={() => router.push(`/learning/data-structures/${mod.id}`)} className="card-mono bg-white/[0.02] border border-outline-variant hover:bg-white/[0.05] hover:border-white p-6 transition-all duration-200 cursor-pointer group flex flex-col justify-between h-56">
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
                      START
                    </button>
                    <span className="material-symbols-outlined text-sm text-primary opacity-60 group-hover:opacity-100 transition-opacity">arrow_outward</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Algorithms Column */}
          <div className="flex flex-col gap-4">
            <h2 className="font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase mb-2">ALGORITHMS</h2>

            {filteredAlgoModules.length === 0 ? (
              <div className="text-on-surface-variant opacity-50 py-4 font-code-sm">No modules found.</div>
            ) : (
              filteredAlgoModules.map((mod) => (
                <div key={mod.id} onClick={() => router.push(`/learning/algorithms/${mod.id}`)} className="card-mono bg-white/[0.02] border border-outline-variant hover:bg-white/[0.05] hover:border-white p-6 transition-all duration-200 cursor-pointer group flex flex-col justify-between h-56">
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
                      START
                    </button>
                    <span className="material-symbols-outlined text-sm text-primary opacity-60 group-hover:opacity-100 transition-opacity">arrow_outward</span>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </AppLayout>
  );
}