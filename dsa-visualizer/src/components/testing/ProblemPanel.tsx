import React from 'react';
import { useRouter } from 'next/navigation';
import { Challenge } from '@/utils/mockChallenges';

interface ProblemPanelProps {
  challenge: Challenge;
}

export default function ProblemPanel({ challenge }: ProblemPanelProps) {
  const router = useRouter();

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Hard': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-on-surface-variant bg-surface-container border-outline-variant';
    }
  };

  return (
    <div className="h-full bg-surface-container-lowest text-on-surface p-6 overflow-y-auto custom-scrollbar">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-6 font-label-caps text-label-caps tracking-widest"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        BACK TO CHALLENGES
      </button>

      <div className="flex items-center gap-4 mb-6">
        <h1 className="font-headline-lg text-headline-lg tracking-tight">{challenge.title}</h1>
        <span className={`px-3 py-1 rounded-sm font-label-caps text-label-caps uppercase tracking-widest border ${getDifficultyColor(challenge.difficulty)}`}>
          {challenge.difficulty}
        </span>
      </div>

      <div className="prose prose-invert max-w-none">
        <div className="whitespace-pre-wrap text-on-surface-variant font-body-md text-body-md leading-relaxed mb-8">
          {challenge.description}
        </div>

        <div className="mb-8">
          <h2 className="font-headline-sm text-headline-sm text-primary tracking-widest uppercase mb-4">Examples</h2>
          {challenge.examples.map((ex, idx) => (
            <div key={idx} className="bg-surface-container-low border border-outline-variant rounded-sm p-4 mb-4">
              <p className="mb-2"><span className="text-on-surface-variant font-label-caps text-label-caps mr-2 tracking-widest">INPUT:</span> <span className="font-code-sm text-code-sm text-primary bg-primary/10 px-2 py-0.5 rounded-sm">{ex.input}</span></p>
              <p className="mb-2"><span className="text-on-surface-variant font-label-caps text-label-caps mr-2 tracking-widest">OUTPUT:</span> <span className="font-code-sm text-code-sm text-green-400 bg-green-400/10 px-2 py-0.5 rounded-sm">{ex.output}</span></p>
              {ex.explanation && (
                <p className="mt-4"><span className="text-on-surface-variant font-label-caps text-label-caps mr-2 tracking-widest block mb-1">EXPLANATION:</span> <span className="font-body-md text-body-md text-on-surface opacity-80">{ex.explanation}</span></p>
              )}
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="font-headline-sm text-headline-sm text-primary tracking-widest uppercase mb-4">Constraints</h2>
          <ul className="list-disc list-inside bg-surface-container-low border border-outline-variant rounded-sm p-4">
            {challenge.constraints.map((constraint, idx) => (
              <li key={idx} className="text-on-surface font-code-sm text-code-sm mb-2 opacity-80">{constraint}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
