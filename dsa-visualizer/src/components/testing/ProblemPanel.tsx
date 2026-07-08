import React from 'react';
import { Challenge } from '@/utils/mockChallenges';

interface ProblemPanelProps {
  challenge: Challenge;
}

export default function ProblemPanel({ challenge }: ProblemPanelProps) {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Hard': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="h-full bg-[#0a0a0a] text-gray-200 p-6 overflow-y-auto custom-scrollbar border-r border-gray-800">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">{challenge.title}</h1>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(challenge.difficulty)}`}>
          {challenge.difficulty}
        </span>
      </div>

      <div className="prose prose-invert max-w-none">
        <div className="whitespace-pre-wrap text-gray-300 leading-relaxed mb-8">
          {challenge.description}
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Examples</h2>
          {challenge.examples.map((ex, idx) => (
            <div key={idx} className="bg-[#111] border border-gray-800 rounded-xl p-4 mb-4">
              <p className="mb-2"><span className="text-gray-400 font-medium">Input:</span> <span className="font-mono text-sm text-blue-300">{ex.input}</span></p>
              <p className="mb-2"><span className="text-gray-400 font-medium">Output:</span> <span className="font-mono text-sm text-green-300">{ex.output}</span></p>
              {ex.explanation && (
                <p><span className="text-gray-400 font-medium">Explanation:</span> <span className="text-sm">{ex.explanation}</span></p>
              )}
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Constraints</h2>
          <ul className="list-disc list-inside bg-[#111] border border-gray-800 rounded-xl p-4">
            {challenge.constraints.map((constraint, idx) => (
              <li key={idx} className="text-gray-300 font-mono text-sm mb-1">{constraint}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
