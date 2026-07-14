import { TestCase } from './mockChallenges';

export const generateTestWrapper = (
  language: 'python' | 'javascript' | 'cpp' | 'java' | 'go' | 'kotlin',
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
    case 'java':
      return generateJavaWrapper(userCode, functionName, testCases);
    case 'go':
      return generateGoWrapper(userCode, functionName, testCases);
    case 'kotlin':
      return generateKotlinWrapper(userCode, functionName, testCases);
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
            # --- Linked List Deserialization (if needed) ---
            if '${functionName}' == 'reverseList':
                # Convert array to linked list
                class ListNode:
                    def __init__(self, val=0, next=None):
                        self.val = val
                        self.next = next
                def build_ll(arr):
                    if not arr: return None
                    head = ListNode(arr[0])
                    curr = head
                    for val in arr[1:]:
                        curr.next = ListNode(val)
                        curr = curr.next
                    return head
                def serialize_ll(head):
                    arr = []
                    while head:
                        arr.append(head.val)
                        head = head.next
                    return arr
                
                inputs = [build_ll(arg) if isinstance(arg, list) else arg for arg in inputs]
                result_raw = func(*inputs)
                result = serialize_ll(result_raw)
            else:
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
            
            let result;
            if ('${functionName}' === 'reverseList') {
                class ListNode {
                    constructor(val, next) {
                        this.val = (val===undefined ? 0 : val)
                        this.next = (next===undefined ? null : next)
                    }
                }
                function build_ll(arr) {
                    if (!arr || arr.length === 0) return null;
                    let head = new ListNode(arr[0]);
                    let curr = head;
                    for (let j = 1; j < arr.length; j++) {
                        curr.next = new ListNode(arr[j]);
                        curr = curr.next;
                    }
                    return head;
                }
                function serialize_ll(head) {
                    let arr = [];
                    while (head) {
                        arr.push(head.val);
                        head = head.next;
                    }
                    return arr;
                }
                
                let processedInputs = tc.input.map(arg => Array.isArray(arg) ? build_ll(arg) : arg);
                let result_raw = ${functionName}(...processedInputs);
                result = serialize_ll(result_raw);
            } else {
                result = ${functionName}(...tc.input);
            }
            
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
    }).join('\n');
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
    }).join('\n');
  } else if (functionName === 'reverseList') {
    cppTests = testCases.map((tc, idx) => {
      const arr = JSON.stringify(tc.input[0]).replace('[', '{').replace(']', '}');
      const expected = JSON.stringify(tc.expected).replace('[', '{').replace(']', '}');
      return `
    {
        vector<int> nums = ${arr};
        vector<int> expected = ${expected};
        
        // Build linked list
        ListNode* head = nullptr;
        ListNode* curr = nullptr;
        for (int val : nums) {
            if (!head) {
                head = new ListNode(val);
                curr = head;
            } else {
                curr->next = new ListNode(val);
                curr = curr->next;
            }
        }
        
        ListNode* res_node = sol.${functionName}(head);
        
        // Serialize linked list back to vector
        vector<int> result;
        while (res_node) {
            result.push_back(res_node->val);
            res_node = res_node->next;
        }
        
        if (result == expected) {
            passed++;
            cout << "Test ${idx+1}: PASS" << endl;
        } else {
            cout << "Test ${idx+1}: FAIL." << endl;
        }
    }`;
    }).join('\n');
  } else {
    // Fallback for others
    return `${userCode}\\nint main() { std::cout << "C++ test wrapper for this problem is not fully implemented yet." << std::endl; return 0; }`;
  }

  return `
#include <vector>
#include <iostream>
using namespace std;

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

const generateJavaWrapper = (userCode: string, functionName: string, testCases: TestCase[]) => {
  let javaTests = '';
  
  if (functionName === 'search') {
    javaTests = testCases.map((tc, idx) => {
      const arr = JSON.stringify(tc.input[0]).replace(/\[/g, '{').replace(/\]/g, '}');
      const target = tc.input[1];
      return `
      {
          int[] nums = ${arr};
          int target = ${target};
          int expected = ${tc.expected};
          int result = sol.${functionName}(nums, target);
          if (result == expected) {
              passed++;
              System.out.println("Test ${idx+1}: PASS");
          } else {
              System.out.println("Test ${idx+1}: FAIL. Expected " + expected + ", got " + result);
          }
      }`;
    }).join('\n');
  } else if (functionName === 'sortArray') {
    javaTests = testCases.map((tc, idx) => {
      const arr = JSON.stringify(tc.input[0]).replace(/\[/g, '{').replace(/\]/g, '}');
      const expected = JSON.stringify(tc.expected).replace(/\[/g, '{').replace(/\]/g, '}');
      return `
      {
          int[] nums = ${arr};
          int[] expected = ${expected};
          int[] result = sol.${functionName}(nums);
          if (Arrays.equals(result, expected)) {
              passed++;
              System.out.println("Test ${idx+1}: PASS");
          } else {
              System.out.println("Test ${idx+1}: FAIL.");
          }
      }`;
    }).join('\n');
  } else {
    return `${userCode}\npublic class Main { public static void main(String[] args) { System.out.println("Java wrapper for this problem is not implemented yet."); } }`;
  }

  return `
import java.util.*;

${userCode}

public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        int passed = 0;
        int total = ${testCases.length};
        System.out.println("--- Test Results ---");
        ${javaTests}
        System.out.println("\\nResult: " + passed + "/" + total + " passed.");
    }
}
`;
};

const generateGoWrapper = (userCode: string, functionName: string, testCases: TestCase[]) => {
  // Go uses main package
  let goTests = '';
  
  if (functionName === 'search') {
    goTests = testCases.map((tc, idx) => {
      const arr = JSON.stringify(tc.input[0]).replace(/\[/g, '{').replace(/\]/g, '}');
      return `
      {
          nums := []int${arr}
          target := ${tc.input[1]}
          expected := ${tc.expected}
          result := ${functionName}(nums, target)
          if result == expected {
              passed++
              fmt.Println("Test ${idx+1}: PASS")
          } else {
              fmt.Printf("Test ${idx+1}: FAIL. Expected %d, got %d\\n", expected, result)
          }
      }`;
    }).join('\n');
  } else {
    return `package main\nimport "fmt"\n${userCode}\nfunc main() { fmt.Println("Go wrapper for this problem is not implemented yet.") }`;
  }

  return `
package main
import (
    "fmt"
    "reflect"
)

${userCode}

func main() {
    passed := 0
    total := ${testCases.length}
    fmt.Println("--- Test Results ---")
    ${goTests}
    fmt.Printf("\\nResult: %d/%d passed.\\n", passed, total)
}
`;
};

const generateKotlinWrapper = (userCode: string, functionName: string, testCases: TestCase[]) => {
  let kotlinTests = '';
  
  if (functionName === 'search') {
    kotlinTests = testCases.map((tc, idx) => {
      const arr = JSON.stringify(tc.input[0]).replace(/\[/g, 'intArrayOf(').replace(/\]/g, ')');
      return `
      {
          val nums = ${arr}
          val target = ${tc.input[1]}
          val expected = ${tc.expected}
          val result = sol.${functionName}(nums, target)
          if (result == expected) {
              passed++
              println("Test ${idx+1}: PASS")
          } else {
              println("Test ${idx+1}: FAIL. Expected $expected, got $result")
          }
      }()`;
    }).join('\n');
  } else {
    return `${userCode}\nfun main() { println("Kotlin wrapper for this problem is not implemented yet.") }`;
  }

  return `
${userCode}

fun main() {
    val sol = Solution()
    var passed = 0
    val total = ${testCases.length}
    println("--- Test Results ---")
    ${kotlinTests}
    println("\\nResult: $passed/$total passed.")
}
`;
};
