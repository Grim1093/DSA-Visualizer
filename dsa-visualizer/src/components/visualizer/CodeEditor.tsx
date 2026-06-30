"use client";

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  onExecute: (code: string, language: string) => void;
  isExecuting: boolean;
  output: string;
}

export default function CodeEditor({ onExecute, isExecuting, output }: CodeEditorProps) {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(
    '# Write your Python code here\nprint("Hello from Python Sandbox!")'
  );

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setLanguage(lang);
    if (lang === 'python') {
      setCode('# Write your Python code here\nprint("Hello from Python Sandbox!")');
    } else if (lang === 'javascript') {
      setCode('// Write your JS code here\nconsole.log("Hello from Node.js Sandbox!");');
    } else if (lang === 'cpp') {
      setCode('#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello from C++ Sandbox!" << endl;\n    return 0;\n}');
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-900 overflow-hidden flex-1">
      {/* Editor Header */}
      <div className="flex justify-between items-center bg-gray-800 px-4 py-3 border-b border-gray-700">
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
          </select>
        </div>
        <button
          onClick={() => onExecute(code, language)}
          disabled={isExecuting}
          className={`flex items-center gap-2 px-4 py-1.5 rounded font-bold text-sm transition-all shadow-md
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
      <div className="w-full h-[400px]">
        <Editor
          height="400px"
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
