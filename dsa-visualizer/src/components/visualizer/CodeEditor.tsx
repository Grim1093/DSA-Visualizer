"use client";

import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { codeTemplates } from '@/utils/codeTemplates';

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
  
  // Exclude 'sandbox' from the selectable modules
  const algos = allowedModules.filter(m => m !== 'sandbox');
  const [activeTemplate, setActiveTemplate] = useState<string>(algos[0] || 'linear');
  
  const [code, setCode] = useState('');

  // Load template whenever activeTemplate or language changes
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
    <div className="flex flex-col h-full w-full bg-gray-900 overflow-hidden flex-1">
      {/* Editor Header */}
      <div className="flex justify-between items-center bg-gray-800 px-4 py-3 border-b border-gray-700 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <span className="font-bold text-gray-200">Execution Engine</span>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-gray-900 border border-gray-600 rounded text-sm px-2 py-1 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="go">Go</option>
            <option value="kotlin">Kotlin</option>
          </select>
        </div>
        
        {/* Localized Template Buttons */}
        {algos.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none]">
            {algos.map(algo => (
              <button
                key={algo}
                onClick={() => setActiveTemplate(algo)}
                className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-colors border ${
                  activeTemplate === algo 
                    ? 'bg-blue-600/30 text-blue-400 border-blue-500/50' 
                    : 'bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700'
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
          className={`flex items-center gap-2 px-4 py-1.5 rounded font-bold text-sm transition-all shadow-md ml-auto
            ${isExecuting 
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-500 text-white'
            }`}
        >
          {isExecuting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Running...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Run Code
            </>
          )}
        </button>
      </div>

      {/* Editor Body */}
      <div className="w-full flex-1">
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
            padding: { top: 16 },
            scrollBeyondLastLine: false,
          }}
        />
      </div>

      {/* Output Terminal */}
      <div className="h-48 bg-black border-t border-gray-700 flex flex-col">
        <div className="bg-gray-800 px-3 py-1 text-xs font-mono text-gray-400 border-b border-gray-700">
          Terminal Output
        </div>
        <div className="flex-1 p-3 overflow-y-auto font-mono text-sm">
          {output ? (
            <pre className="text-gray-300 whitespace-pre-wrap">{output}</pre>
          ) : (
            <span className="text-gray-600 italic">No output yet...</span>
          )}
        </div>
      </div>
    </div>
  );
}
