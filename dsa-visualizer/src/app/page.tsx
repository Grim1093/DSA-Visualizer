"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-background text-on-background relative overflow-hidden">
      <div className="absolute inset-0 dot-bg opacity-40 mix-blend-overlay pointer-events-none z-0" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm p-8 sm:p-10 bg-surface-container border border-outline-variant rounded-sm z-10 mx-4"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-sm bg-surface-container-high border border-outline-variant mb-5">
            <span className="material-symbols-outlined text-primary text-[24px]" style={{fontVariationSettings: "'FILL' 1"}}>terminal</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tighter uppercase mb-2">AlgoQuest</h1>
          <p className="font-label-caps text-label-caps text-on-surface-variant tracking-widest">DSA · Visualizer</p>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="w-full bg-primary text-surface font-label-caps text-label-caps py-3 rounded-sm border border-primary hover:bg-surface hover:text-primary transition-colors flex items-center justify-center gap-3 tracking-widest"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" />
            </svg>
            CONTINUE WITH GOOGLE
          </button>
        </div>
      </motion.div>
    </main>
  );
}
