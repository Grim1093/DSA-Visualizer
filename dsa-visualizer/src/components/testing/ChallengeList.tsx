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
      case 'Easy': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Hard': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 overflow-y-auto pt-24">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 mb-4">
            {title}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            {description}
          </p>
        </motion.div>

        <div className="bg-[#111] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1a1a1a] border-b border-gray-800 text-gray-400 text-sm uppercase tracking-wider">
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium">Title</th>
                <th className="py-4 px-6 font-medium">Difficulty</th>
                <th className="py-4 px-6 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {challenges.map((challenge, index) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={challenge.id} 
                  className="border-b border-gray-800/50 hover:bg-[#1a1a1a] transition-colors group"
                >
                  <td className="py-4 px-6">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-700 flex items-center justify-center group-hover:border-blue-500 transition-colors">
                      {/* Placeholder for completion checkmark */}
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-200 group-hover:text-blue-400 transition-colors">
                    {challenge.title}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link 
                      href={`/testing/challenge/${challenge.id}`}
                      className="inline-block px-4 py-2 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white rounded-lg transition-all duration-300 font-medium text-sm border border-blue-500/20 hover:border-blue-500"
                    >
                      Solve Challenge
                    </Link>
                  </td>
                </motion.tr>
              ))}
              
              {challenges.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-500">
                    No challenges available in this category yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
