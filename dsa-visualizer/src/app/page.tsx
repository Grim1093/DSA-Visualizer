"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import StarField from '@/components/StarField';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white relative overflow-hidden grain">
      <StarField />
      <div className="fixed inset-0 dot-bg opacity-40 pointer-events-none z-0" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md p-8 sm:p-10 card-mono z-10 mx-4"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white mb-4 shadow-lg">
            <span className="text-xl font-bold text-black mono">{"A"}</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-1">AlgoQuest</h1>
          <p className="text-xs text-white/40 uppercase tracking-[0.18em] mono">DSA · Visualizer</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-[0.18em] text-white/40 mono ml-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-white/[0.03] border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors mono"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-[0.18em] text-white/40 mono ml-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/[0.03] border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors mono"
            />
          </div>

          <div className="flex items-center justify-between mt-1 mb-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-3.5 h-3.5 rounded border-white/20 text-white bg-transparent focus:ring-0 focus:ring-offset-0 cursor-pointer" />
              <span className="text-xs text-white/50 group-hover:text-white/80 transition-colors">Remember me</span>
            </label>
            <a href="#" className="text-xs text-white/50 hover:text-white transition-colors">Forgot password?</a>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary font-semibold py-3 rounded-xl shadow-lg flex justify-center items-center h-[46px] text-sm"
          >
            {isLoading ? (
              <span className="mono text-xs animate-pulse">Authenticating...</span>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="mt-2 text-center relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-[#0a0a0a] text-white/40 mono uppercase tracking-[0.1em] text-[9px]">OR</span>
            </div>
          </div>
          
          <button 
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="w-full btn-ghost py-3 rounded-xl text-sm flex items-center justify-center gap-2 h-[46px]"
          >
            <svg className="w-4 h-4 opacity-70" viewBox="0 0 24 24">
              <path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" />
            </svg>
            Continue with Google
          </button>
        </form>
      </motion.div>
    </main>
  );
}
