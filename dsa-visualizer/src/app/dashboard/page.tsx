"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;
  }

  const allModules = [
    { id: 'array', name: 'Static Array' },
    { id: 'vector', name: 'Vector (Dynamic Array)' },
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
    { id: 'dijkstra', name: "Dijkstra's Algorithm" },
    { id: 'dp', name: 'Dynamic Programming' }
  ];

  const isCompleted = (id: string) => progress?.completedModules.some(m => m.module_id === id);

  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white font-sans p-6 md:p-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-green-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-5xl flex items-center justify-between mb-12 z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
            <span className="font-bold text-white">{"</>"}</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">DSA Visualizer</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {session?.user?.image ? (
              <img src={session.user.image} alt="Profile" className="w-8 h-8 rounded-full border border-gray-700" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                <span className="text-xs font-bold">{session?.user?.name?.[0] || 'U'}</span>
              </div>
            )}
            <span className="text-sm font-medium text-gray-300 hidden sm:block">{session?.user?.name || 'User'}</span>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="text-sm font-medium text-gray-500 hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="w-full max-w-5xl flex flex-col gap-8 z-10">
        {/* Progress Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 flex items-center gap-6 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <span className="text-3xl">🏆</span>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">Total Points</h3>
              <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400">
                {progress?.points ?? 0} <span className="text-lg font-medium text-gray-500">XP</span>
              </p>
            </div>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 flex items-center gap-6 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
              <span className="text-3xl">🔥</span>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">Current Streak</h3>
              <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-200 to-pink-400">
                {progress?.currentStreak ?? 0} <span className="text-lg font-medium text-gray-500">Days</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Existing Mode Selectors */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <motion.div variants={itemVariants} onClick={() => router.push('/learning')} className="group relative flex items-center bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 rounded-2xl p-6 cursor-pointer transition-all hover:shadow-lg hover:shadow-blue-500/10">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mr-4 text-blue-400 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Learning Mode</h3>
              <p className="text-gray-400 text-sm">Visualize and study algorithms</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} onClick={() => router.push('/testing')} className="group relative flex items-center bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 rounded-2xl p-6 cursor-pointer transition-all hover:shadow-lg hover:shadow-purple-500/10">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mr-4 text-purple-400 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.963 11.963 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Test Mode</h3>
              <p className="text-gray-400 text-sm">Practice in the execution sandbox</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Course Progress Map */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Course Progress</h2>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allModules.map((mod) => {
              const completed = isCompleted(mod.id);
              return (
                <motion.div 
                  key={mod.id}
                  variants={itemVariants}
                  className={`p-4 rounded-xl border flex flex-col items-center text-center gap-2 transition-all ${
                    completed 
                      ? 'bg-emerald-900/20 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                      : 'bg-gray-900/40 border-gray-800'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${completed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-800 text-gray-500'}`}>
                    {completed ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    )}
                  </div>
                  <span className={`text-xs font-bold ${completed ? 'text-emerald-100' : 'text-gray-500'}`}>
                    {mod.name}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
