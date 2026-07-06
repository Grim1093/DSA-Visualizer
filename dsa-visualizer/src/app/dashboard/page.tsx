"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white font-sans p-6 md:p-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-green-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-5xl flex items-center justify-between mb-16 z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
            <span className="font-bold text-white">{"</>"}</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">DSA Visualizer</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
              <span className="text-xs font-bold">U</span>
            </div>
            <span className="text-sm font-medium text-gray-300 hidden sm:block">User Profile</span>
          </div>
          <button 
            onClick={() => router.push('/')}
            className="text-sm font-medium text-gray-500 hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full max-w-5xl flex flex-col items-center z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Choose Your Path</h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Master Data Structures and Algorithms through interactive visualizations, or test your knowledge in our competitive sandbox.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
        >
          {/* Learning Mode Card */}
          <motion.div 
            variants={itemVariants}
            onClick={() => router.push('/learning')}
            className="group relative flex flex-col bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-blue-500/50 rounded-3xl p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3">Learning Mode</h3>
            <p className="text-gray-400 mb-6 flex-1">
              Dive deep into the mechanics of algorithms. Visualize node manipulations, compare complexities, and study the theory step-by-step.
            </p>
            
            <div className="flex items-center text-blue-400 font-semibold group-hover:gap-3 transition-all">
              <span>Enter Module</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </motion.div>

          {/* Test Mode Card */}
          <motion.div 
            variants={itemVariants}
            onClick={() => router.push('/testing')}
            className="group relative flex flex-col bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-purple-500/50 rounded-3xl p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.963 11.963 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3">Test Mode</h3>
            <p className="text-gray-400 mb-6 flex-1">
              Put your knowledge to the test. Solve LeetCode-style challenges using our real-time execution engine and conquer visual puzzles.
            </p>
            
            <div className="flex items-center text-purple-400 font-semibold group-hover:gap-3 transition-all">
              <span>Enter Module</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
