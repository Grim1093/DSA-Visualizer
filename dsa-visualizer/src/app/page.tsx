"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import StarField from '@/components/StarField';

export default function LoginPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white relative overflow-hidden grain">
      <StarField />
      <div className="fixed inset-0 dot-bg opacity-40 pointer-events-none z-0" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm p-8 sm:p-10 card-mono z-10 mx-4"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white mb-5 shadow-lg">
            <span className="text-xl font-bold text-black mono">{"A"}</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-1.5">AlgoQuest</h1>
          <p className="text-xs text-white/40 uppercase tracking-[0.18em] mono">DSA · Visualizer</p>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="w-full btn-primary py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-3 shadow-lg"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" />
            </svg>
            Continue with Google
          </button>
        </div>
      </motion.div>
    </main>
  );
}
