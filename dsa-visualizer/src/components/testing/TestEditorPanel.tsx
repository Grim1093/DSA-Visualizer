"use client";

import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Challenge } from '@/utils/mockChallenges';

import { generateTestWrapper } from '@/utils/testWrapperGenerator';

interface TestEditorPanelProps {
  challenge: Challenge;
}

export default function TestEditorPanel({ challenge }: TestEditorPanelProps) {
  const [language, setLanguage] = useState<'python' | 'javascript' | 'cpp'>('python');
  const [code, setCode] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [output, setOutput] = useState('');

  // Load starter code when language or challenge changes
  useEffect(() => {
    if (challenge.starterCode && challenge.starterCode[language]) {
      setCode(challenge.starterCode[language]);
    } else {
      setCode('// No starter code available for this language.');
    }
  }, [challenge, language]);

  const executeCode = async (codeToRun: string, isSubmit: boolean) => {
    setIsExecuting(true);
    setOutput(isSubmit ? 'Running hidden test cases...' : 'Executing code...');
    
    try {
      const response = await fetch('http://localhost:5000/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeToRun, language }),
      });
      const data = await response.json();
      
      if (data.error) {
        setOutput(`Execution Error:\n${data.error}`);
      } else {
        setOutput(data.output || 'Code executed successfully with no output.');
      }
    } catch (error) {
      setOutput('Failed to connect to the execution engine. Ensure the backend is running.');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleRunCode = () => {
    executeCode(code, false);
  };

  const handleSubmit = () => {
    // Generate the wrapper containing test cases
    const wrappedCode = generateTestWrapper(language, code, challenge.functionName, challenge.testCases);
    executeCode(wrappedCode, true);
  };

  return (
    <div className="flex flex-col h-full bg-[#111] overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#1a1a1a] px-4 py-3 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'python' | 'javascript' | 'cpp')}
            className="bg-[#2a2a2a] text-gray-200 border border-gray-700 rounded px-3 py-1 text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="cpp">C++</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleRunCode}
            disabled={isExecuting}
            className="px-4 py-1.5 text-sm font-semibold rounded bg-[#2a2a2a] hover:bg-[#333] text-gray-300 border border-gray-700 transition-colors disabled:opacity-50"
          >
            Run Code
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isExecuting}
            className="px-4 py-1.5 text-sm font-semibold rounded bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-600/50 transition-colors disabled:opacity-50"
          >
            {isExecuting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>

      {/* Monaco Editor Wrapper */}
      <div className="flex-1 min-h-0 relative">
        <Editor
          height="100%"
          language={language === 'python' ? 'python' : language === 'cpp' ? 'cpp' : 'javascript'}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            padding: { top: 16 },
          }}
        />
      </div>

      {/* Terminal Output */}
      <div className="h-64 bg-[#0a0a0a] border-t border-gray-800 flex flex-col shrink-0">
        <div className="bg-[#1a1a1a] px-4 py-2 border-b border-gray-800 flex justify-between items-center">
          <span className="text-sm font-medium text-gray-400">Test Results</span>
        </div>
        <div className="flex-1 p-4 overflow-y-auto custom-scrollbar font-mono text-sm text-gray-300 whitespace-pre-wrap">
          {output || 'Run your code to see the output here.'}
        </div>
      </div>
    </div>
  );
}
