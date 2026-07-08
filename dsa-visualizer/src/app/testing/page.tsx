"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function TestingHubPage() {
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
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[100px] rounded-full pointer-events-none" />
      
      <header className="w-full max-w-5xl flex items-center justify-between mb-12 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/dashboard')} className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <h1 className="text-3xl font-bold tracking-tight">Testing Mode</h1>
        </div>
      </header>

      <div className="w-full max-w-5xl z-10 flex flex-col gap-16">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-200 mb-6 border-b border-gray-800 pb-2">Select a Challenge Category</h2>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <motion.div variants={itemVariants} onClick={() => router.push('/testing/algorithms')} className="group cursor-pointer bg-gray-900/50 border border-gray-800 hover:border-red-500/50 rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-red-500/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <h3 className="text-xl font-bold">Algorithms</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">Test your skills in sorting, searching, and pathfinding algorithms.</p>
              <span className="text-red-400 text-sm font-semibold group-hover:underline">Browse Challenges &rarr;</span>
            </motion.div>

            <motion.div variants={itemVariants} onClick={() => router.push('/testing/data-structures')} className="group cursor-pointer bg-gray-900/50 border border-gray-800 hover:border-orange-500/50 rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-orange-500/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                </div>
                <h3 className="text-xl font-bold">Data Structures</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">Solve problems using arrays, linked lists, trees, and graphs.</p>
              <span className="text-orange-400 text-sm font-semibold group-hover:underline">Browse Challenges &rarr;</span>
            </motion.div>

          </motion.div>
        </section>

      </div>
    </main>
  );
}
