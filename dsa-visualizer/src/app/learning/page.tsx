"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LearningHubPage() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white font-sans p-6 md:p-12 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
      
      <header className="w-full max-w-5xl flex items-center justify-between mb-12 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/dashboard')} className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <h1 className="text-3xl font-bold tracking-tight">Learning Mode</h1>
        </div>
      </header>

      <div className="w-full max-w-5xl z-10 flex flex-col gap-16">
        
        {/* Data Structures Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-200 mb-6 border-b border-gray-800 pb-2">Data Structures</h2>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <motion.div variants={itemVariants} onClick={() => router.push('/learning/data-structures/basic')} className="group cursor-pointer bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-blue-500/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                </div>
                <h3 className="text-xl font-bold">Basic Structures</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">Master Arrays, Vectors, Linked Lists, Hash Maps, Stacks, and Queues.</p>
              <span className="text-blue-400 text-sm font-semibold group-hover:underline">Start Learning &rarr;</span>
            </motion.div>

            <motion.div variants={itemVariants} onClick={() => router.push('/learning/data-structures/complex')} className="group cursor-pointer bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-blue-500/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                </div>
                <h3 className="text-xl font-bold">Complex Structures</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">Dive into Trees, Graphs, Tries, and Advanced Heaps.</p>
              <span className="text-indigo-400 text-sm font-semibold group-hover:underline">Start Learning &rarr;</span>
            </motion.div>

          </motion.div>
        </section>

        {/* Algorithms Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-200 mb-6 border-b border-gray-800 pb-2">Algorithms</h2>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <motion.div variants={itemVariants} onClick={() => router.push('/learning/algorithms/searching')} className="group cursor-pointer bg-gray-900/50 border border-gray-800 hover:border-green-500/50 rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-green-500/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold">Searching</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">Learn Linear Search, Binary Search, and their optimizations.</p>
              <span className="text-green-400 text-sm font-semibold group-hover:underline">Start Learning &rarr;</span>
            </motion.div>

            <motion.div variants={itemVariants} onClick={() => router.push('/learning/algorithms/sorting')} className="group cursor-pointer bg-gray-900/50 border border-gray-800 hover:border-orange-500/50 rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-orange-500/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg>
                </div>
                <h3 className="text-xl font-bold">Sorting</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">Master Bubble, Selection, Insertion, Merge, and Quick Sort.</p>
              <span className="text-orange-400 text-sm font-semibold group-hover:underline">Start Learning &rarr;</span>
            </motion.div>

            <motion.div variants={itemVariants} onClick={() => router.push('/learning/algorithms/complex')} className="group cursor-pointer bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-purple-500/10 md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <h3 className="text-xl font-bold">Complex Algorithms</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">Explore Pathfinding (Dijkstra, A*), Dynamic Programming, and Graph Traversals.</p>
              <span className="text-purple-400 text-sm font-semibold group-hover:underline">Start Learning &rarr;</span>
            </motion.div>

          </motion.div>
        </section>

      </div>
    </main>
  );
}