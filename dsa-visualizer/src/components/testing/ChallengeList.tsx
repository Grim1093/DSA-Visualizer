"use client";

import React from 'react';
import Link from 'next/link';
import { Challenge } from '@/utils/mockChallenges';
import { motion } from 'framer-motion';

interface ChallengeListProps {
  title: string;
  description: string;
  challenges: Challenge[];
}

export default function ChallengeList({ title, description, challenges }: ChallengeListProps) {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20 shadow-[0_0_10px_rgba(52,211,153,0.1)]';
      case 'Medium': return 'text-amber-400 bg-amber-400/10 border-amber-400/20 shadow-[0_0_10px_rgba(251,191,36,0.1)]';
      case 'Hard': return 'text-rose-400 bg-rose-400/10 border-rose-400/20 shadow-[0_0_10px_rgba(244,63,94,0.1)]';
      default: return 'text-white/40 bg-white/5 border-white/10';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 sm:p-8 overflow-y-auto pt-24 relative">
      <div className="fixed inset-0 dot-bg opacity-40 pointer-events-none z-0" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-8">
          <Link 
            href="/testing"
            className="inline-flex items-center gap-2 text-xs mono uppercase tracking-wider text-white/40 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Dashboard
          </Link>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-black shadow-lg shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </div>
            {title}
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl font-sans leading-relaxed">
            {description}
          </p>
        </motion.div>

        <div className="card-mono overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/10 text-white/40 text-[10px] uppercase mono tracking-widest">
                  <th className="py-4 px-6 font-semibold w-24 text-center">Status</th>
                  <th className="py-4 px-6 font-semibold">Challenge Title</th>
                  <th className="py-4 px-6 font-semibold w-32">Difficulty</th>
                  <th className="py-4 px-6 font-semibold w-40 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {challenges.map((challenge, index) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={challenge.id} 
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="py-4 px-6 text-center">
                      <div className="w-5 h-5 mx-auto rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-colors shadow-inner bg-black/50">
                        {/* Placeholder for completion checkmark */}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-white/80 group-hover:text-white transition-colors mono tracking-tight text-sm">
                      {challenge.title}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase border mono ${getDifficultyColor(challenge.difficulty)}`}>
                        {challenge.difficulty}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link 
                        href={`/testing/challenge/${challenge.id}`}
                        className="inline-flex items-center gap-2 btn-primary px-4 py-1.5 text-[11px]"
                      >
                        Solve
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </Link>
                    </td>
                  </motion.tr>
                ))}
                
                {challenges.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-16 text-center">
                      <div className="flex flex-col items-center justify-center text-white/30 space-y-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        <span className="mono text-xs uppercase tracking-widest">No challenges available</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
