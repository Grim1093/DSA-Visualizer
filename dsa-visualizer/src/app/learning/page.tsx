"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import StarField from '@/components/StarField';

export default function LearningHubPage() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white font-sans p-6 md:p-10 relative overflow-hidden grain">
      <StarField />
      <div className="fixed inset-0 dot-bg opacity-40 pointer-events-none z-0" />
      
      <header className="w-full max-w-5xl flex items-center justify-between mb-12 z-10">
        <div>
          <div className="text-[10px] uppercase tracking-[0.24em] text-white/40 mono">Select a Module</div>
          <h1 className="text-3xl font-semibold tracking-tight mt-1 text-white/90">Learning Mode</h1>
        </div>
        <button onClick={() => router.push('/dashboard')} className="btn-ghost px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back
        </button>
      </header>

      <div className="w-full max-w-5xl z-10 flex flex-col gap-12">
        
        {/* Data Structures Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-4 h-[1px] bg-white/30" />
            <span className="text-[10px] uppercase tracking-[0.24em] text-white/50 mono">Data Structures</span>
          </div>
          
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <motion.button variants={itemVariants} onClick={() => router.push('/learning/data-structures/basic')} className="group text-left card-mono p-5 hover:border-white/25 transition-all">
              <div className="flex items-center justify-between mb-8">
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                </div>
                <span className="text-[10px] mono text-white/30 tracking-[0.18em]">DS.1</span>
              </div>
              <h3 className="text-lg font-medium tracking-tight mb-1.5 text-white/80">Basic Structures</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-6">Arrays, Vectors, Linked Lists, Hash Maps, Stacks, and Queues.</p>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] mono text-white/40">Start</span>
                <svg className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
              </div>
            </motion.button>

            <motion.button variants={itemVariants} onClick={() => router.push('/learning/data-structures/complex')} className="group text-left card-mono p-5 hover:border-white/25 transition-all">
              <div className="flex items-center justify-between mb-8">
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                </div>
                <span className="text-[10px] mono text-white/30 tracking-[0.18em]">DS.2</span>
              </div>
              <h3 className="text-lg font-medium tracking-tight mb-1.5 text-white/80">Complex Structures</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-6">Trees, Graphs, Tries, and Advanced Heaps.</p>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] mono text-white/40">Start</span>
                <svg className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
              </div>
            </motion.button>

          </motion.div>
        </section>

        {/* Algorithms Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-4 h-[1px] bg-white/30" />
            <span className="text-[10px] uppercase tracking-[0.24em] text-white/50 mono">Algorithms</span>
          </div>
          
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <motion.button variants={itemVariants} onClick={() => router.push('/learning/algorithms/searching')} className="group text-left card-mono p-5 hover:border-white/25 transition-all">
              <div className="flex items-center justify-between mb-8">
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <span className="text-[10px] mono text-white/30 tracking-[0.18em]">AL.1</span>
              </div>
              <h3 className="text-lg font-medium tracking-tight mb-1.5 text-white/80">Searching</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-6">Linear Search, Binary Search.</p>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] mono text-white/40">Start</span>
                <svg className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
              </div>
            </motion.button>

            <motion.button variants={itemVariants} onClick={() => router.push('/learning/algorithms/sorting')} className="group text-left card-mono p-5 hover:border-white/25 transition-all">
              <div className="flex items-center justify-between mb-8">
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg>
                </div>
                <span className="text-[10px] mono text-white/30 tracking-[0.18em]">AL.2</span>
              </div>
              <h3 className="text-lg font-medium tracking-tight mb-1.5 text-white/80">Sorting</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-6">Bubble, Selection, Insertion, Merge, Quick.</p>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] mono text-white/40">Start</span>
                <svg className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
              </div>
            </motion.button>

            <motion.button variants={itemVariants} onClick={() => router.push('/learning/algorithms/complex')} className="group text-left card-mono p-5 hover:border-white/25 transition-all">
              <div className="flex items-center justify-between mb-8">
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <span className="text-[10px] mono text-white/30 tracking-[0.18em]">AL.3</span>
              </div>
              <h3 className="text-lg font-medium tracking-tight mb-1.5 text-white/80">Complex</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-6">Pathfinding, DP, Graph Traversals.</p>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] mono text-white/40">Start</span>
                <svg className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
              </div>
            </motion.button>

          </motion.div>
        </section>

      </div>
    </main>
  );
}