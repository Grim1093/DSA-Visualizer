"use client";

import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { codeTemplates } from '@/utils/codeTemplates';
import DropdownSelector from './AlgorithmSelector';

interface CodeEditorProps {
  onExecute: (code: string, language: string) => void;
  isExecuting: boolean;
  output: string;
  allowedModules: string[];
}

const formatAlgoName = (name: string) => {
  return name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export default function CodeEditor({ onExecute, isExecuting, output, allowedModules }: CodeEditorProps) {
  const [language, setLanguage] = useState('python');
  
  const algos = allowedModules.filter(m => m !== 'sandbox');
  const [activeTemplate, setActiveTemplate] = useState<string>(algos[0] || 'linear');
  
  const [code, setCode] = useState('');

  useEffect(() => {
    let template = codeTemplates[activeTemplate]?.[language];
    if (!template) {
      if (language === 'python') template = '# Write your Python code here\nprint("Hello Sandbox!")';
      else if (language === 'javascript') template = '// Write JS code here\nconsole.log("Hello Sandbox!");';
      else if (language === 'java') template = 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello Sandbox!");\n    }\n}';
      else if (language === 'go') template = 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello Sandbox!")\n}';
      else if (language === 'kotlin') template = 'fun main() {\n    println("Hello Sandbox!")\n}';
      else template = '#include <iostream>\nusing namespace std;\nint main() { cout << "Hello!" << endl; return 0; }';
    }
    setCode(template);
  }, [activeTemplate, language]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="flex flex-col absolute inset-0 bg-transparent overflow-hidden rounded-2xl">
      {/* Editor Header */}
      <div className="flex justify-between items-center bg-white/[0.02] px-6 py-4 border-b border-white/10 flex-wrap gap-4 shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 mono font-bold">Execution Engine</span>
          
          <div className="relative min-w-[120px]">
            <DropdownSelector
              value={language}
              onChange={(val) => setLanguage(val)}
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
        </div>
        
        {/* Localized Template Buttons */}
        {algos.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none]">
            {algos.map(algo => (
              <button
                key={algo}
                onClick={() => setActiveTemplate(algo)}
                className={`text-[10px] px-3 py-1.5 rounded-full whitespace-nowrap transition-colors mono tracking-wider uppercase border ${
                  activeTemplate === algo 
                    ? 'bg-white text-black border-white' 
                    : 'bg-transparent text-white/40 border-white/10 hover:text-white hover:bg-white/5'
                }`}
              >
                {formatAlgoName(algo)}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => onExecute(code, language)}
          disabled={isExecuting}
          className={`flex items-center gap-2 px-5 py-1.5 rounded-lg font-bold text-xs transition-all shadow-md ml-auto mono uppercase tracking-wider
            ${isExecuting 
              ? 'bg-white/10 text-white/40 cursor-not-allowed border border-white/10' 
              : 'btn-primary'
            }`}
        >
          {isExecuting ? (
            <>
              <svg className="animate-spin -ml-1 mr-1.5 h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Running...
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Run Code
            </>
          )}
        </button>
      </div>

      {/* Split Content Body */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Left: Editor */}
        <div className="flex-1 lg:w-3/5 lg:border-r border-white/10 relative min-h-[300px]">
          <Editor
            height="100%"
            width="100%"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              padding: { top: 24, bottom: 24 },
              scrollBeyondLastLine: false,
              fontFamily: "'Geist Mono', 'JetBrains Mono', monospace",
              lineHeight: 24,
            }}
          />
        </div>

        {/* Right: Output Terminal */}
        <div className="h-64 lg:h-auto lg:w-2/5 flex flex-col bg-black/50 shrink-0 lg:shrink">
          <div className="bg-white/[0.02] px-6 py-3 text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] border-y lg:border-t-0 border-white/5 shrink-0 shadow-sm flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-blue-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            Terminal Output
          </div>
          <div className="flex-1 p-6 overflow-y-auto font-mono text-sm custom-scrollbar">
            {output ? (
              <pre className="text-white/80 whitespace-pre-wrap leading-relaxed">{output}</pre>
            ) : (
              <span className="text-white/20 italic flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse"></span>
                Waiting for execution...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
