import { TestCase } from './mockChallenges';

export const generateTestWrapper = (
  language: 'python' | 'javascript' | 'cpp',
  userCode: string,
  functionName: string,
  testCases: TestCase[]
): string => {
  if (!testCases || testCases.length === 0) return userCode;

  switch (language) {
    case 'python':
      return generatePythonWrapper(userCode, functionName, testCases);
    case 'javascript':
      return generateJavaScriptWrapper(userCode, functionName, testCases);
    case 'cpp':
      return generateCppWrapper(userCode, functionName, testCases);
    default:
      return userCode;
  }
};

const generatePythonWrapper = (userCode: string, functionName: string, testCases: TestCase[]) => {
  const testCasesJson = JSON.stringify(testCases);
  
  return `
${userCode}

# --- INJECTED TEST WRAPPER ---
import json
import sys

def run_tests():
    test_cases = json.loads('''${testCasesJson}''')
    passed = 0
    total = len(test_cases)
    
    print("--- Test Results ---")
    
    for i, tc in enumerate(test_cases):
        try:
            # Check if function exists
            if ('${functionName}' not in globals()):
                print(f"Error: Function '${functionName}' not found. Did you change the function name?")
                sys.exit(1)
                
            func = globals()['${functionName}']
            inputs = tc['input']
            expected = tc['expected']
            
            # Call function with unpacked arguments
            result = func(*inputs)
            
            if json.dumps(result) == json.dumps(expected):
                passed += 1
                print(f"Test {i+1}: PASS")
            else:
                print(f"Test {i+1}: FAIL. Expected {expected}, got {result}")
        except Exception as e:
            print(f"Test {i+1}: ERROR. Exception: {e}")
            
    print(f"\\nResult: {passed}/{total} passed.")

if __name__ == "__main__":
    run_tests()
`;
};

const generateJavaScriptWrapper = (userCode: string, functionName: string, testCases: TestCase[]) => {
  const testCasesJson = JSON.stringify(testCases);
  
  return `
${userCode}

// --- INJECTED TEST WRAPPER ---
function runTests() {
    const testCases = ${testCasesJson};
    let passed = 0;
    const total = testCases.length;
    
    console.log("--- Test Results ---");
    
    for (let i = 0; i < testCases.length; i++) {
        const tc = testCases[i];
        try {
            if (typeof ${functionName} !== 'function') {
                console.log(\`Error: Function '${functionName}' not found.\`);
                process.exit(1);
            }
            
            const result = ${functionName}(...tc.input);
            
            if (JSON.stringify(result) === JSON.stringify(tc.expected)) {
                passed++;
                console.log(\`Test \${i+1}: PASS\`);
            } else {
                console.log(\`Test \${i+1}: FAIL. Expected \${JSON.stringify(tc.expected)}, got \${JSON.stringify(result)}\`);
            }
        } catch (e) {
            console.log(\`Test \${i+1}: ERROR. \${e.message}\`);
        }
    }
    
    console.log(\`\\nResult: \${passed}/\${total} passed.\`);
}

runTests();
`;
};

const generateCppWrapper = (userCode: string, functionName: string, testCases: TestCase[]) => {
  // C++ wrapper is more complex because we can't easily parse JSON or use dynamic types.
  // We'll hardcode the test cases as C++ initializers.
  
  // Right now, this supports simple vector<int> and int scenarios for search & sort.
  // A robust C++ judger would use a proper testing framework or input parsing.
  
  let cppTests = '';
  
  if (functionName === 'search') {
    cppTests = testCases.map((tc, idx) => {
      const arr = JSON.stringify(tc.input[0]).replace('[', '{').replace(']', '}');
      const target = tc.input[1];
      const expected = tc.expected;
      return `
    {
        vector<int> nums = ${arr};
        int target = ${target};
        int expected = ${expected};
        int result = sol.${functionName}(nums, target);
        if (result == expected) {
            passed++;
            cout << "Test ${idx+1}: PASS" << endl;
        } else {
            cout << "Test ${idx+1}: FAIL. Expected " << expected << ", got " << result << endl;
        }
    }`;
    }).join('\\n');
  } else if (functionName === 'sortArray') {
    cppTests = testCases.map((tc, idx) => {
      const arr = JSON.stringify(tc.input[0]).replace('[', '{').replace(']', '}');
      const expected = JSON.stringify(tc.expected).replace('[', '{').replace(']', '}');
      return `
    {
        vector<int> nums = ${arr};
        vector<int> expected = ${expected};
        vector<int> result = sol.${functionName}(nums);
        if (result == expected) {
            passed++;
            cout << "Test ${idx+1}: PASS" << endl;
        } else {
            cout << "Test ${idx+1}: FAIL." << endl;
        }
    }`;
    }).join('\\n');
  } else {
    // Fallback for others (like reverseList which requires building nodes)
    // We will just output a generic message for now
    return `${userCode}\\nint main() { std::cout << "C++ test wrapper for this problem is not fully implemented yet." << std::endl; return 0; }`;
  }

  return `
${userCode}

// --- INJECTED TEST WRAPPER ---
int main() {
    Solution sol;
    int passed = 0;
    int total = ${testCases.length};
    
    cout << "--- Test Results ---" << endl;
    
${cppTests}

    cout << "\\nResult: " << passed << "/" << total << " passed." << endl;
    return 0;
}
`;
};
