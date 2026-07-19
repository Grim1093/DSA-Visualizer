"use client";

import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Challenge } from '@/utils/mockChallenges';
import { generateTestWrapper } from '@/utils/testWrapperGenerator';
import DropdownSelector from '@/components/visualizer/AlgorithmSelector';

interface TestEditorPanelProps {
  challenge: Challenge;
}

const formatTestCaseValue = (val: any): string => {
  if (Array.isArray(val)) {
    if (val.length > 20) {
      return `[${val.slice(0, 10).join(', ')}, ..., ${val.slice(-3).join(', ')}] (${val.length} elements)`;
    }
    return JSON.stringify(val);
  }
  return JSON.stringify(val);
};

const formatInputArgs = (input: any[]): string => {
  if (!input) return '';
  return input.map(arg => formatTestCaseValue(arg)).join('\n');
};

export default function TestEditorPanel({ challenge }: TestEditorPanelProps) {
  const [language, setLanguage] = useState<'python' | 'javascript' | 'cpp' | 'java' | 'go' | 'kotlin'>('python');
  const [code, setCode] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [output, setOutput] = useState('');

  const [activeTab, setActiveTab] = useState<'testcases' | 'results'>('testcases');
  const [activeTestCase, setActiveTestCase] = useState(0);

  const testCasesToShow = challenge.testCases.slice(0, 2);

  // Load saved code from DB, fallback to localStorage, then starter code
  useEffect(() => {
    let isMounted = true;
    
    const loadCode = async () => {
      try {
        const res = await fetch(`/api/code/load?moduleId=${challenge.id}&language=${language}`);
        const data = await res.json();
        
        if (!isMounted) return;

        if (data.code) {
          setCode(data.code);
        } else {
          // Fallback to local storage if nothing in DB
          const savedCode = localStorage.getItem(`saved_code_${challenge.id}_${language}`);
          if (savedCode) {
            setCode(savedCode);
          } else if (challenge.starterCode && challenge.starterCode[language]) {
            setCode(challenge.starterCode[language]);
          } else {
            setCode('// No starter code available for this language.');
          }
        }
      } catch (err) {
        console.error('Failed to load code from DB:', err);
      }
    };
    
    loadCode();
    
    return () => { isMounted = false; };
  }, [challenge, language]);

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || '';
    setCode(newCode);
    localStorage.setItem(`saved_code_${challenge.id}_${language}`, newCode);
  };

  const executeCode = async (codeToRun: string, isSubmit: boolean) => {
    setIsExecuting(true);
    setActiveTab('results');
    setOutput(isSubmit ? 'Running all test cases (including hidden)...' : 'Running visible test cases...');
    
    try {
      const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const apiUrl = rawApiUrl.endsWith('/') ? rawApiUrl.slice(0, -1) : rawApiUrl;
      
      const response = await fetch(`${apiUrl}/api/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeToRun, language }),
      });
      
      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        const textError = await response.text();
        throw new Error(`Server returned non-JSON response (Status ${response.status}). Are you sure your backend URL is correct?\n\nResponse preview:\n${textError.slice(0, 150)}...`);
      }
      
      if (data.error) {
        setOutput(`Execution Error:\n${data.error}`);
      } else {
        const out = data.output || 'Code executed successfully with no output.';
        let finalOutput = out;
        
        // If they submitted and passed all tests, save their progress and code!
        if (isSubmit && !out.includes('FAIL') && !out.includes('ERROR') && out.includes('PASS')) {
          finalOutput += '\n\n========================================\n🎉 CHALLENGE SOLVED! XP AWARDED!\n========================================';
          
          fetch('/api/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              moduleId: challenge.id, 
              points: challenge.difficulty === 'Hard' ? 300 : challenge.difficulty === 'Medium' ? 150 : 50 
            })
          }).catch(console.error);

          fetch('/api/code/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              moduleId: challenge.id, 
              language,
              code: code // Save the raw user code, not the test wrapper
            })
          }).catch(console.error);
        }
        
        setOutput(finalOutput);
      }
    } catch (error) {
      setOutput('Failed to connect to the execution engine. Ensure the backend is running.');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleRunCode = () => {
    // Run against visible test cases (we'll just use all of them for now, or maybe the first 2)
    const visibleCases = challenge.testCases.slice(0, 2);
    const wrappedCode = generateTestWrapper(language, code, challenge.functionName, visibleCases);
    executeCode(wrappedCode, false);
  };

  const handleSubmit = () => {
    // Generate the wrapper containing all test cases (including hidden)
    const wrappedCode = generateTestWrapper(language, code, challenge.functionName, challenge.testCases);
    executeCode(wrappedCode, true);
  };

  return (
    <div className="flex flex-col h-full bg-surface-container-lowest overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center bg-surface-container-low px-4 py-3 border-b border-outline-variant">
        <div className="flex items-center gap-4">
          <DropdownSelector
            value={language}
            onChange={(val) => setLanguage(val as any)}
            options={[
              { value: 'python', label: 'Python' },
              { value: 'javascript', label: 'JavaScript' },
              { value: 'cpp', label: 'C++' },
              { value: 'java', label: 'Java' },
              { value: 'go', label: 'Go' },
              { value: 'kotlin', label: 'Kotlin' }
            ]}
          />
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleRunCode}
            disabled={isExecuting}
            className="px-4 py-1.5 font-label-caps text-label-caps rounded-sm bg-surface hover:bg-surface-container text-on-surface border border-outline-variant transition-colors disabled:opacity-50 flex items-center gap-2 tracking-widest"
          >
            <span className="material-symbols-outlined text-[16px]">play_arrow</span>
            RUN CODE
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isExecuting}
            className="px-4 py-1.5 font-label-caps text-label-caps rounded-sm bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 transition-colors disabled:opacity-50 flex items-center gap-2 tracking-widest"
          >
            <span className="material-symbols-outlined text-[16px]">cloud_upload</span>
            {isExecuting ? 'SUBMITTING...' : 'SUBMIT'}
          </button>
        </div>
      </div>

      {/* Monaco Editor Wrapper */}
      <div className="flex-1 min-h-0 relative">
        <Editor
          height="100%"
          language={language === 'python' ? 'python' : language === 'cpp' ? 'cpp' : language === 'javascript' ? 'javascript' : language === 'java' ? 'java' : language === 'go' ? 'go' : 'kotlin'}
          theme="vs-dark"
          value={code}
          onChange={handleCodeChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            padding: { top: 16 },
          }}
        />
      </div>

      {/* Bottom Panel (Tabs) */}
      <div className="h-64 bg-surface-container-lowest border-t border-outline-variant flex flex-col shrink-0">
        <div className="bg-surface-container-low px-4 pt-2 flex items-center gap-6 border-b border-outline-variant">
          <button
            onClick={() => setActiveTab('testcases')}
            className={`pb-2 font-label-caps text-label-caps tracking-widest transition-colors border-b-2 ${
              activeTab === 'testcases' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            TESTCASES
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`pb-2 font-label-caps text-label-caps tracking-widest transition-colors border-b-2 ${
              activeTab === 'results' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            TEST RESULTS
          </button>
        </div>
        
        <div className="flex-1 overflow-hidden relative">
          {activeTab === 'testcases' ? (
            <div className="h-full flex flex-col p-4">
              <div className="flex gap-2 mb-4">
                {testCasesToShow.map((tc, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestCase(idx)}
                    className={`px-4 py-1.5 rounded-sm font-label-caps text-label-caps tracking-widest border transition-colors ${
                      activeTestCase === idx
                        ? 'bg-primary/20 border-primary text-primary'
                        : 'bg-surface border-outline-variant text-on-surface-variant hover:bg-surface-container'
                    }`}
                  >
                    CASE {idx + 1}
                  </button>
                ))}
              </div>
              <div className="flex-1 bg-surface-container-low border border-outline-variant rounded-sm p-4 overflow-y-auto custom-scrollbar">
                <div className="mb-4">
                  <p className="text-on-surface-variant font-label-caps text-label-caps mb-1 tracking-widest">INPUT:</p>
                  <pre className="font-code-sm text-code-sm text-on-surface bg-surface-container p-2 rounded-sm border border-outline-variant whitespace-pre-wrap">{formatInputArgs(testCasesToShow[activeTestCase]?.input)}</pre>
                </div>
                <div>
                  <p className="text-on-surface-variant font-label-caps text-label-caps mb-1 tracking-widest">EXPECTED OUTPUT:</p>
                  <pre className="font-code-sm text-code-sm text-on-surface bg-surface-container p-2 rounded-sm border border-outline-variant whitespace-pre-wrap">{formatTestCaseValue(testCasesToShow[activeTestCase]?.expected)}</pre>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full bg-surface-container-lowest p-4">
              <pre className={`font-code-sm text-code-sm p-4 rounded-sm border h-full overflow-auto custom-scrollbar whitespace-pre-wrap ${
                output.includes('Error') 
                  ? 'text-red-400 bg-red-400/5 border-red-400/20' 
                  : output 
                    ? 'text-primary bg-primary/5 border-primary/20' 
                    : 'text-on-surface-variant bg-surface border-outline-variant'
              }`}>
                {output || 'Run your code to see results here...'}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
