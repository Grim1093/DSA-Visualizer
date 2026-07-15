"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import StarField from '@/components/StarField';

interface ProgressData {
  points: number;
  currentStreak: number;
  completedModules: { module_id: string; completed_at: string }[];
}

export default function DashboardPage() {
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
          if (!data.error) {
            setProgress(data);
          }
        })
        .catch(console.error);
    }
  }, [status]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white grain">Loading...</div>;
  }

  const allModules = [
    { id: 'array', name: 'Static Array' },
    { id: 'vector', name: 'Vector' },
    { id: 'linked_list', name: 'Linked List' },
    { id: 'hash_map', name: 'Hash Map' },
    { id: 'stack', name: 'Stack' },
    { id: 'queue', name: 'Queue' },
    { id: 'heap', name: 'Heap' },
    { id: 'bubble', name: 'Bubble Sort' },
    { id: 'selection', name: 'Selection Sort' },
    { id: 'insertion', name: 'Insertion Sort' },
    { id: 'merge', name: 'Merge Sort' },
    { id: 'quick', name: 'Quick Sort' },
    { id: 'linear', name: 'Linear Search' },
    { id: 'binary', name: 'Binary Search' },
    { id: 'bfs', name: 'BFS' },
    { id: 'dfs', name: 'DFS' },
    { id: 'dijkstra', name: "Dijkstra" },
    { id: 'dp', name: 'DP' }
  ];

  const isCompleted = (id: string) => progress?.completedModules.some(m => m.module_id === id);

  const xp = progress?.points ?? 0;
  const streak = progress?.currentStreak ?? 0;
  const level = Math.floor(xp / 100) + 1;
  const xpInLevel = xp % 100;
  const pct = (xpInLevel / 100) * 100;

  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white font-sans p-6 md:p-10 relative overflow-hidden grain">
      <StarField />
      <div className="fixed inset-0 dot-bg opacity-40 pointer-events-none z-0" />

      {/* Header */}
      <header className="w-full max-w-5xl flex items-center justify-between mb-8 z-10">
        <button onClick={() => router.push('/')} className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-white text-black flex items-center justify-center mono font-bold text-sm">
            A
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold tracking-tight">AlgoQuest</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 mono -mt-0.5">Dashboard</div>
          </div>
        </button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 mono text-xs text-white/60">
            {session?.user?.name || 'User'}
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="btn-ghost px-3 py-1.5 rounded-lg text-xs"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="w-full max-w-5xl flex flex-col gap-8 z-10 mt-4">
        
        {/* Game HUD Style Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.22,1,0.36,1] }}
          className="card-mono px-5 py-4 flex flex-col md:flex-row items-start md:items-center gap-5 w-full"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center mono font-bold text-sm">
              {level}
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 mono">Level</div>
              <div className="text-sm text-white/85 mono">{xpInLevel} / 100 XP</div>
            </div>
          </div>

          <div className="flex-1 w-full md:w-auto relative h-[2px] bg-white/10 overflow-hidden rounded-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ type:'spring', stiffness:80, damping:20 }}
              className="h-full bg-white relative"
            >
              <div className="absolute inset-0 shimmer-line" />
            </motion.div>
          </div>

          <div className="flex items-center gap-5 md:pl-4 md:border-l border-white/10 mono text-sm w-full md:w-auto mt-4 md:mt-0">
            <div className="flex items-center gap-1.5 text-white/70" title="Streak">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2c0 0-4 3-4 8 0 5 4 12 4 12s4-7 4-12c0-5-4-8-4-8z"/></svg>
              {streak}
            </div>
            <div className="flex items-center gap-1.5 text-white/70" title="Total XP">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              {xp}
            </div>
          </div>
        </motion.div>

        {/* Action Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4, ease: [0.22,1,0.36,1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <button onClick={() => router.push('/learning')} className="group text-left card-mono p-5 hover:border-white/25 transition-all w-full">
            <div className="flex items-center justify-between mb-8">
              <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <span className="text-[10px] mono text-white/30 tracking-[0.18em]">01</span>
            </div>
            <h3 className="text-lg font-medium tracking-tight mb-1.5">Learning Mode</h3>
            <p className="text-sm text-white/50 leading-relaxed mb-6">Visualize algorithms step by step and learn their core concepts.</p>
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] mono text-white/40">Enter Sandbox</span>
              <svg className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
            </div>
          </button>

          <button onClick={() => router.push('/testing')} className="group text-left card-mono p-5 hover:border-white/25 transition-all w-full">
            <div className="flex items-center justify-between mb-8">
              <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.963 11.963 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <span className="text-[10px] mono text-white/30 tracking-[0.18em]">02</span>
            </div>
            <h3 className="text-lg font-medium tracking-tight mb-1.5">Test Mode</h3>
            <p className="text-sm text-white/50 leading-relaxed mb-6">Write code and verify your knowledge in the execution sandbox.</p>
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] mono text-white/40">Start Testing</span>
              <svg className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
            </div>
          </button>
        </motion.div>

        {/* Progress Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4, ease: [0.22,1,0.36,1] }}
          className="mt-4"
        >
          <div className="flex items-center gap-2 mb-4 pl-1">
            <span className="w-4 h-[1px] bg-white/30" />
            <span className="text-[10px] uppercase tracking-[0.24em] text-white/50 mono">Module Progress</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {allModules.map((mod) => {
              const completed = isCompleted(mod.id);
              return (
                <div key={mod.id} className={`card-mono p-4 flex flex-col items-center justify-center text-center gap-2 ${completed ? 'bg-white/[0.05] border-white/20' : 'opacity-60'}`}>
                  {completed ? (
                    <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-transparent border border-white/20 text-white/30 flex items-center justify-center">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                    </div>
                  )}
                  <span className={`text-[10px] mono tracking-wide mt-1 ${completed ? 'text-white' : 'text-white/40'}`}>
                    {mod.name}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
        
      </div>
    </main>
  );
}
