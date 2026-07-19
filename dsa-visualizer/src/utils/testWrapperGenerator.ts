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
  
  return `from typing import *
import json
import sys

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class DoubleNode:
    def __init__(self, val=0, prev=None, next=None):
        self.val = val
        self.prev = prev
        self.next = next

class Node:
    def __init__(self, val=None, next=None):
        self.val = val
        self.next = next

${userCode}

# --- INJECTED TEST WRAPPER ---


def build_ll(arr):
    if not arr: return None
    head = ListNode(arr[0])
    curr = head
    for val in arr[1:]:
        curr.next = ListNode(val)
        curr = curr.next
    return head

def build_dll(arr):
    if not arr: return None
    head = DoubleNode(arr[0])
    curr = head
    for val in arr[1:]:
        curr.next = DoubleNode(val, prev=curr)
        curr = curr.next
    return head

def build_circular(arr, pos):
    if not arr: return None
    head = ListNode(arr[0])
    curr = head
    nodes = [head]
    for val in arr[1:]:
        curr.next = ListNode(val)
        curr = curr.next
        nodes.append(curr)
    if pos != -1:
        curr.next = nodes[pos]
    return head

def serialize_ll(head):
    if isinstance(head, bool) or isinstance(head, int): return head
    if not head: return []
    arr = []
    visited = set()
    while head and id(head) not in visited:
        visited.add(id(head))
        arr.append(head.val)
        head = head.next
    return arr

def run_tests():
    test_cases = json.loads('''${testCasesJson}''')
    passed = 0
    total = len(test_cases)
    
    print("--- Test Results ---")
    
    for i, tc in enumerate(test_cases):
        try:
            if 'Solution' in globals():
                sol = globals()['Solution']()
                if hasattr(sol, '${functionName}'):
                    func = getattr(sol, '${functionName}')
                else:
                    print(f"Error: Function '${functionName}' not found in class Solution.")
                    sys.exit(1)
            elif '${functionName}' in globals():
                func = globals()['${functionName}']
            else:
                print(f"Error: Function '${functionName}' not found.")
                sys.exit(1)
            inputs = tc['input']
            expected = tc['expected']
            
            fname = '${functionName}'
            if fname in ['reverseList', 'middleNode']:
                inputs = [build_ll(arg) if isinstance(arg, list) else arg for arg in inputs]
            elif fname in ['reverseDoublyList', 'deleteAllOccurrences']:
                inputs = [build_dll(arg) if isinstance(arg, list) else arg for arg in inputs]
            elif fname in ['hasCycle']:
                inputs = [build_circular(inputs[0], inputs[1])]
            elif fname in ['insertCircular']:
                inputs = [build_circular(inputs[0], 0), inputs[1]]
                
            result_raw = func(*inputs)
            
            if fname in ['reverseList', 'middleNode', 'reverseDoublyList', 'deleteAllOccurrences', 'insertCircular']:
                result = serialize_ll(result_raw)
            else:
                result = result_raw
            
            compare_expr = json.dumps(result) == json.dumps(expected)
            ${functionSignatures[functionName]?.unorderedOutput ? `
            if isinstance(result, list) and isinstance(expected, list):
                compare_expr = sorted(result) == sorted(expected)
            ` : ''}
            if compare_expr:
                passed += 1
                print(f"Test {i+1}: PASS")
            else:
                print(f"Test {i+1}: FAIL\\nInput: {tc['input']}\\nExpected: {expected}\\nGot: {result}")
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
class ListNode {
    constructor(val, next) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}
class DoubleNode {
    constructor(val, prev, next) {
        this.val = (val===undefined ? 0 : val)
        this.prev = (prev===undefined ? null : prev)
        this.next = (next===undefined ? null : next)
    }
}
class Node {
    constructor(val, next) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

${userCode}

// --- INJECTED TEST WRAPPER ---

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
function build_dll(arr) {
    if (!arr || arr.length === 0) return null;
    let head = new DoubleNode(arr[0]);
    let curr = head;
    for (let j = 1; j < arr.length; j++) {
        curr.next = new DoubleNode(arr[j], curr);
        curr = curr.next;
    }
    return head;
}
function build_circular(arr, pos) {
    if (!arr || arr.length === 0) return null;
    let head = new ListNode(arr[0]);
    let curr = head;
    let nodes = [head];
    for (let j = 1; j < arr.length; j++) {
        curr.next = new ListNode(arr[j]);
        curr = curr.next;
        nodes.push(curr);
    }
    if (pos !== -1) curr.next = nodes[pos];
    return head;
}
function serialize_ll(head) {
    if (typeof head === 'boolean' || typeof head === 'number') return head;
    let arr = [];
    let visited = new Set();
    while (head && !visited.has(head)) {
        visited.add(head);
        arr.push(head.val);
        head = head.next;
    }
    return arr;
}

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
            
            let fname = '${functionName}';
            let processedInputs = tc.input;
            
            if (['reverseList', 'middleNode'].includes(fname)) {
                processedInputs = tc.input.map(arg => Array.isArray(arg) ? build_ll(arg) : arg);
            } else if (['reverseDoublyList', 'deleteAllOccurrences'].includes(fname)) {
                processedInputs = tc.input.map(arg => Array.isArray(arg) ? build_dll(arg) : arg);
            } else if (fname === 'hasCycle') {
                processedInputs = [build_circular(tc.input[0], tc.input[1])];
            } else if (fname === 'insertCircular') {
                processedInputs = [build_circular(tc.input[0], 0), tc.input[1]];
            }
            
            let result_raw = ${functionName}(...processedInputs);
            let result = result_raw;
            
            if (['reverseList', 'middleNode', 'reverseDoublyList', 'deleteAllOccurrences', 'insertCircular'].includes(fname)) {
                result = serialize_ll(result_raw);
            }
            
            let compare_expr = JSON.stringify(result) === JSON.stringify(tc.expected);
            ${functionSignatures[functionName]?.unorderedOutput ? `
            if (Array.isArray(result) && Array.isArray(tc.expected)) {
                compare_expr = JSON.stringify([...result].sort((a,b)=>a-b)) === JSON.stringify([...tc.expected].sort((a,b)=>a-b));
            }
            ` : ''}
            if (compare_expr) {
                passed++;
                console.log(\`Test \${i+1}: PASS\`);
            } else {
                console.log(\`Test \${i+1}: FAIL\\nInput: \${JSON.stringify(tc.input)}\\nExpected: \${JSON.stringify(tc.expected)}\\nGot: \${JSON.stringify(result)}\`);
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


type DataType = 'int' | 'int[]' | 'bool' | 'ListNode' | 'DoubleNode' | 'Node';
interface Signature { inputs: DataType[]; output: DataType; unorderedOutput?: boolean; }

const functionSignatures: Record<string, Signature> = {
  search: { inputs: ['int[]', 'int'], output: 'int' },
  sortedSquares: { inputs: ['int[]'], output: 'int[]' },
  maxSubArray: { inputs: ['int[]'], output: 'int' },
  subarraySum: { inputs: ['int[]', 'int'], output: 'int' },
  longestConsecutive: { inputs: ['int[]'], output: 'int' },
  maxSlidingWindow: { inputs: ['int[]', 'int'], output: 'int[]' },
  reverseList: { inputs: ['ListNode'], output: 'ListNode' },
  middleNode: { inputs: ['ListNode'], output: 'ListNode' },
  reverseDoublyList: { inputs: ['DoubleNode'], output: 'DoubleNode' },
  deleteAllOccurrences: { inputs: ['DoubleNode', 'int'], output: 'DoubleNode' },
  hasCycle: { inputs: ['ListNode'], output: 'bool' },
  insertCircular: { inputs: ['Node', 'int'], output: 'Node' },
  twoSum: { inputs: ['int[]', 'int'], output: 'int[]' },
  containsDuplicate: { inputs: ['int[]'], output: 'bool' },
  singleNumber: { inputs: ['int[]'], output: 'int' },
  majorityElement: { inputs: ['int[]'], output: 'int' },
  intersection: { inputs: ['int[]', 'int[]'], output: 'int[]', unorderedOutput: true },
  findDuplicate: { inputs: ['int[]'], output: 'int' }
};

const generateCppWrapper = (userCode: string, functionName: string, testCases: TestCase[]) => {
  const sig = functionSignatures[functionName];
  if (!sig) {
    return `${userCode}\nint main() { std::cout << "C++ test wrapper for this problem is not fully implemented yet." << std::endl; return 0; }`;
  }
  
  const cppTests = testCases.map((tc, idx) => {
    let locals = '';
    let args = '';
    sig.inputs.forEach((t, i) => {
        let val = tc.input[i];
        if (t === 'int[]') {
            locals += `        vector<int> arg${i}_raw = ${JSON.stringify(val).replace(/\[/g, '{').replace(/\]/g, '}')};\n`;
            args += `arg${i}_raw`;
        } else if (t === 'int') {
            locals += `        int arg${i}_raw = ${val};\n`;
            args += `arg${i}_raw`;
        } else if (t === 'ListNode') {
            locals += `        vector<int> arg${i}_raw = ${JSON.stringify(val).replace(/\[/g, '{').replace(/\]/g, '}')};\n`;
            locals += `        ListNode* arg${i} = build_ll(arg${i}_raw);\n`;
            args += `arg${i}`;
        } else if (t === 'DoubleNode') {
            locals += `        vector<int> arg${i}_raw = ${JSON.stringify(val).replace(/\[/g, '{').replace(/\]/g, '}')};\n`;
            locals += `        DoubleNode* arg${i} = build_dll(arg${i}_raw);\n`;
            args += `arg${i}`;
        } else if (t === 'Node') {
            locals += `        vector<int> arg${i}_raw = ${JSON.stringify(val).replace(/\[/g, '{').replace(/\]/g, '}')};\n`;
            locals += `        Node* arg${i} = build_circular(arg${i}_raw, ${tc.input[1]});\n`;
            args += `arg${i}`;
        }
        if (i < sig.inputs.length - 1) args += ', ';
    });
    
    let expectedCode = '';
    if (sig.output === 'int[]') {
        expectedCode = `vector<int> expected = ${JSON.stringify(tc.expected).replace(/\[/g, '{').replace(/\]/g, '}')};`;
    } else if (sig.output === 'int') {
        expectedCode = `int expected = ${tc.expected};`;
    } else if (sig.output === 'bool') {
        expectedCode = `bool expected = ${tc.expected ? 'true' : 'false'};`;
    } else if (sig.output === 'ListNode' || sig.output === 'DoubleNode' || sig.output === 'Node') {
        expectedCode = `vector<int> expected = ${JSON.stringify(tc.expected).replace(/\[/g, '{').replace(/\]/g, '}')};`;
    }
    
    let callCode = '';
    let compareCode = '';
    if (sig.output === 'ListNode' || sig.output === 'DoubleNode' || sig.output === 'Node') {
        callCode = `        auto result_raw = sol.${functionName}(${args});\n        vector<int> result = serialize_ll(result_raw);`;
        compareCode = `if (result == expected)`;
    } else {
        callCode = `        auto result = sol.${functionName}(${args});`;
        compareCode = `if (result == expected)`;
    }
    
    if (sig.unorderedOutput) {
        compareCode = `
        auto res_sorted = result;
        auto exp_sorted = expected;
        sort(res_sorted.begin(), res_sorted.end());
        sort(exp_sorted.begin(), exp_sorted.end());
        if (res_sorted == exp_sorted)`;
    }
    let printActual = '';
    if (sig.output === 'int[]' || sig.output === 'ListNode' || sig.output === 'DoubleNode' || sig.output === 'Node') {
        printActual = `            cout << "  Got: [";
            for(size_t _i=0; _i<result.size(); _i++) cout << result[_i] << (_i < result.size()-1 ? "," : "");
            cout << "]" << endl;`;
    } else {
        printActual = `            cout << "  Got: " << (result) << endl;`;
    }
    
    return `
    {
${locals}
        ${expectedCode}
${callCode}
        ${compareCode} {
            passed++;
            cout << "Test ${idx+1}: PASS" << endl;
        } else {
            cout << "Test ${idx+1}: FAIL.\\n  Input: ${JSON.stringify(tc.input).replace(/"/g, '\\"')}\\n  Expected: ${JSON.stringify(tc.expected).replace(/"/g, '\\"')}" << endl;
${printActual}
        }
    }`;
  }).join('\n');

  return `
#include <vector>
#include <iostream>
#include <unordered_set>
#include <algorithm>
using namespace std;

class ListNode {
public:
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class DoubleNode {
public:
    int val;
    DoubleNode* prev;
    DoubleNode* next;
    DoubleNode(int x) : val(x), prev(nullptr), next(nullptr) {}
};

class Node {
public:
    int val;
    Node* next;
    Node(int _val) { val = _val; next = NULL; }
    Node(int _val, Node* _next) { val = _val; next = _next; }
};

ListNode* build_ll(const vector<int>& arr) {
    if (arr.empty()) return nullptr;
    ListNode* head = new ListNode(arr[0]);
    ListNode* curr = head;
    for (size_t i = 1; i < arr.size(); i++) {
        curr->next = new ListNode(arr[i]);
        curr = curr->next;
    }
    return head;
}

DoubleNode* build_dll(const vector<int>& arr) {
    if (arr.empty()) return nullptr;
    DoubleNode* head = new DoubleNode(arr[0]);
    DoubleNode* curr = head;
    for (size_t i = 1; i < arr.size(); i++) {
        DoubleNode* newNode = new DoubleNode(arr[i]);
        newNode->prev = curr;
        curr->next = newNode;
        curr = curr->next;
    }
    return head;
}

Node* build_circular(const vector<int>& arr, int pos) {
    if (arr.empty()) return nullptr;
    Node* head = new Node(arr[0]);
    Node* curr = head;
    vector<Node*> nodes = {head};
    for (size_t i = 1; i < arr.size(); i++) {
        curr->next = new Node(arr[i]);
        curr = curr->next;
        nodes.push_back(curr);
    }
    if (pos >= 0 && pos < (int)nodes.size()) {
        curr->next = nodes[pos];
    }
    return head;
}

template<typename T>
vector<int> serialize_ll(T* head) {
    vector<int> res;
    unordered_set<T*> visited;
    while (head != nullptr && visited.find(head) == visited.end()) {
        visited.insert(head);
        res.push_back(head->val);
        head = head->next;
    }
    return res;
}

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
  const sig = functionSignatures[functionName];
  if (!sig) {
    return `${userCode}\npublic class Main { public static void main(String[] args) { System.out.println("Java wrapper for this problem is not implemented yet."); } }`;
  }
  
  const javaTests = testCases.map((tc, idx) => {
    let locals = '';
    let args = '';
    sig.inputs.forEach((t, i) => {
        let val = tc.input[i];
        if (t === 'int[]') {
            locals += `        int[] arg${i}_raw = new int[]${JSON.stringify(val).replace(/\[/g, '{').replace(/\]/g, '}')};\n`;
            args += `arg${i}_raw`;
        } else if (t === 'int') {
            locals += `        int arg${i}_raw = ${val};\n`;
            args += `arg${i}_raw`;
        } else if (t === 'ListNode') {
            locals += `        int[] arg${i}_raw = new int[]${JSON.stringify(val).replace(/\[/g, '{').replace(/\]/g, '}')};\n`;
            locals += `        ListNode arg${i} = build_ll(arg${i}_raw);\n`;
            args += `arg${i}`;
        } else if (t === 'DoubleNode') {
            locals += `        int[] arg${i}_raw = new int[]${JSON.stringify(val).replace(/\[/g, '{').replace(/\]/g, '}')};\n`;
            locals += `        DoubleNode arg${i} = build_dll(arg${i}_raw);\n`;
            args += `arg${i}`;
        } else if (t === 'Node') {
            locals += `        int[] arg${i}_raw = new int[]${JSON.stringify(val).replace(/\[/g, '{').replace(/\]/g, '}')};\n`;
            locals += `        Node arg${i} = build_circular(arg${i}_raw, ${tc.input[1]});\n`;
            args += `arg${i}`;
        }
        if (i < sig.inputs.length - 1) args += ', ';
    });
    
    let expectedCode = '';
    if (sig.output === 'int[]') {
        expectedCode = `int[] expected = new int[]${JSON.stringify(tc.expected).replace(/\[/g, '{').replace(/\]/g, '}')};`;
    } else if (sig.output === 'int') {
        expectedCode = `int expected = ${tc.expected};`;
    } else if (sig.output === 'bool') {
        expectedCode = `boolean expected = ${tc.expected ? 'true' : 'false'};`;
    } else if (sig.output === 'ListNode' || sig.output === 'DoubleNode' || sig.output === 'Node') {
        expectedCode = `int[] expected = new int[]${JSON.stringify(tc.expected).replace(/\[/g, '{').replace(/\]/g, '}')};`;
    }
    
    let callCode = '';
    let compareCode = '';
    if (sig.output === 'ListNode' || sig.output === 'DoubleNode' || sig.output === 'Node') {
        callCode = `        Object result_raw = sol.${functionName}(${args});\n        int[] result = serialize_ll(result_raw);`;
        compareCode = `if (Arrays.equals(result, expected))`;
    } else if (sig.output === 'int[]') {
        callCode = `        int[] result = sol.${functionName}(${args});`;
        compareCode = `if (Arrays.equals(result, expected))`;
    } else {
        callCode = `        auto_type result = sol.${functionName}(${args});`.replace('auto_type', sig.output === 'bool' ? 'boolean' : 'int');
        compareCode = `if (result == expected)`;
    }
    
    if (sig.unorderedOutput) {
        compareCode = `
            int[] res_sorted = result.clone();
            int[] exp_sorted = expected.clone();
            Arrays.sort(res_sorted);
            Arrays.sort(exp_sorted);
            if (Arrays.equals(res_sorted, exp_sorted))`;
    }
    let printActual = '';
    if (sig.output === 'int[]' || sig.output === 'ListNode' || sig.output === 'DoubleNode' || sig.output === 'Node') {
        printActual = `            System.out.println("  Got: " + Arrays.toString(result));`;
    } else {
        printActual = `            System.out.println("  Got: " + result);`;
    }
    
    return `
    {
${locals}
        ${expectedCode}
${callCode}
        ${compareCode} {
            passed++;
            System.out.println("Test ${idx+1}: PASS");
        } else {
            System.out.println("Test ${idx+1}: FAIL.\\n  Input: ${JSON.stringify(tc.input).replace(/"/g, '\\"')}\\n  Expected: ${JSON.stringify(tc.expected).replace(/"/g, '\\"')}");
${printActual}
        }
    }`;
  }).join('\n');

  return `
import java.util.*;

class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class DoubleNode {
    public int val;
    public DoubleNode prev;
    public DoubleNode next;
    public DoubleNode() {}
    public DoubleNode(int val) { this.val = val; }
    public DoubleNode(int val, DoubleNode prev, DoubleNode next) {
        this.val = val; this.prev = prev; this.next = next;
    }
}

class Node {
    public int val;
    public Node next;
    public Node() {}
    public Node(int _val) { val = _val; }
    public Node(int _val, Node _next) { val = _val; next = _next; }
}

${userCode}

public class Main {
    public static ListNode build_ll(int[] arr) {
        if (arr.length == 0) return null;
        ListNode head = new ListNode(arr[0]);
        ListNode curr = head;
        for (int i = 1; i < arr.length; i++) {
            curr.next = new ListNode(arr[i]);
            curr = curr.next;
        }
        return head;
    }

    public static DoubleNode build_dll(int[] arr) {
        if (arr.length == 0) return null;
        DoubleNode head = new DoubleNode(arr[0]);
        DoubleNode curr = head;
        for (int i = 1; i < arr.length; i++) {
            DoubleNode newNode = new DoubleNode(arr[i]);
            newNode.prev = curr;
            curr.next = newNode;
            curr = curr.next;
        }
        return head;
    }

    public static Node build_circular(int[] arr, int pos) {
        if (arr.length == 0) return null;
        Node head = new Node(arr[0]);
        Node curr = head;
        List<Node> nodes = new ArrayList<>();
        nodes.add(head);
        for (int i = 1; i < arr.length; i++) {
            curr.next = new Node(arr[i]);
            curr = curr.next;
            nodes.add(curr);
        }
        if (pos >= 0 && pos < nodes.size()) {
            curr.next = nodes.get(pos);
        }
        return head;
    }

    public static int[] serialize_ll(Object node) {
        List<Integer> res = new ArrayList<>();
        Set<Object> visited = new HashSet<>();
        Object head = node;
        while (head != null && !visited.contains(head)) {
            visited.add(head);
            if (head instanceof ListNode) {
                res.add(((ListNode) head).val);
                head = ((ListNode) head).next;
            } else if (head instanceof DoubleNode) {
                res.add(((DoubleNode) head).val);
                head = ((DoubleNode) head).next;
            } else if (head instanceof Node) {
                res.add(((Node) head).val);
                head = ((Node) head).next;
            } else {
                break;
            }
        }
        int[] arr = new int[res.size()];
        for (int i=0; i<res.size(); i++) arr[i] = res.get(i);
        return arr;
    }

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
  const sig = functionSignatures[functionName];
  if (!sig) {
    return `package main\nimport "fmt"\n${userCode}\nfunc main() { fmt.Println("Go wrapper for this problem is not implemented yet.") }`;
  }
  
  const goTests = testCases.map((tc, idx) => {
    let locals = '';
    let args = '';
    sig.inputs.forEach((t, i) => {
        let val = tc.input[i];
        if (t === 'int[]') {
            locals += `        arg${i}_raw := []int${JSON.stringify(val).replace(/\[/g, '{').replace(/\]/g, '}')}\n`;
            args += `arg${i}_raw`;
        } else if (t === 'int') {
            locals += `        arg${i}_raw := ${val}\n`;
            args += `arg${i}_raw`;
        } else if (t === 'ListNode') {
            locals += `        arg${i}_raw := []int${JSON.stringify(val).replace(/\[/g, '{').replace(/\]/g, '}')}\n`;
            locals += `        arg${i} := build_ll(arg${i}_raw)\n`;
            args += `arg${i}`;
        } else if (t === 'DoubleNode') {
            locals += `        arg${i}_raw := []int${JSON.stringify(val).replace(/\[/g, '{').replace(/\]/g, '}')}\n`;
            locals += `        arg${i} := build_dll(arg${i}_raw)\n`;
            args += `arg${i}`;
        } else if (t === 'Node') {
            locals += `        arg${i}_raw := []int${JSON.stringify(val).replace(/\[/g, '{').replace(/\]/g, '}')}\n`;
            locals += `        arg${i} := build_circular(arg${i}_raw, ${tc.input[1]})\n`;
            args += `arg${i}`;
        }
        if (i < sig.inputs.length - 1) args += ', ';
    });
    
    let expectedCode = '';
    if (sig.output === 'int[]') {
        expectedCode = `expected := []int${JSON.stringify(tc.expected).replace(/\[/g, '{').replace(/\]/g, '}')}`;
    } else if (sig.output === 'int') {
        expectedCode = `expected := ${tc.expected}`;
    } else if (sig.output === 'bool') {
        expectedCode = `expected := ${tc.expected ? 'true' : 'false'}`;
    } else if (sig.output === 'ListNode' || sig.output === 'DoubleNode' || sig.output === 'Node') {
        expectedCode = `expected := []int${JSON.stringify(tc.expected).replace(/\[/g, '{').replace(/\]/g, '}')}`;
    }
    
    let callCode = '';
    let compareCode = '';
    if (sig.output === 'ListNode' || sig.output === 'DoubleNode' || sig.output === 'Node') {
        callCode = `        result_raw := ${functionName}(${args})\n        result := serialize_ll(result_raw)`;
        compareCode = `if reflect.DeepEqual(result, expected)`;
    } else if (sig.output === 'int[]') {
        callCode = `        result := ${functionName}(${args})`;
        compareCode = `if reflect.DeepEqual(result, expected)`;
    } else {
        callCode = `        result := ${functionName}(${args})`;
        compareCode = `if result == expected`;
    }
    
    if (sig.unorderedOutput) {
        compareCode = `
            res_sorted := make([]int, len(result))
            copy(res_sorted, result)
            exp_sorted := make([]int, len(expected))
            copy(exp_sorted, expected)
            sort.Ints(res_sorted)
            sort.Ints(exp_sorted)
            if reflect.DeepEqual(res_sorted, exp_sorted)`;
    }
    let printActual = `            fmt.Printf("  Got: %v\\n", result)`;
    
    return `
    {
${locals}
        ${expectedCode}
${callCode}
        ${compareCode} {
            passed++
            fmt.Println("Test ${idx+1}: PASS")
        } else {
            fmt.Printf("Test ${idx+1}: FAIL.\\n  Input: ${JSON.stringify(tc.input).replace(/"/g, '\\"')}\\n  Expected: ${JSON.stringify(tc.expected).replace(/"/g, '\\"')}\\n")
${printActual}
        }
    }`;
  }).join('\n');

  return `
package main
import (
    "fmt"
    "reflect"
    "sort"
)

type ListNode struct {
    Val int
    Next *ListNode
}

type DoubleNode struct {
    Val int
    Prev *DoubleNode
    Next *DoubleNode
}

type Node struct {
    Val int
    Next *Node
}

func build_ll(arr []int) *ListNode {
    if len(arr) == 0 { return nil }
    head := &ListNode{Val: arr[0]}
    curr := head
    for i := 1; i < len(arr); i++ {
        curr.Next = &ListNode{Val: arr[i]}
        curr = curr.Next
    }
    return head
}

func build_dll(arr []int) *DoubleNode {
    if len(arr) == 0 { return nil }
    head := &DoubleNode{Val: arr[0]}
    curr := head
    for i := 1; i < len(arr); i++ {
        newNode := &DoubleNode{Val: arr[i]}
        newNode.Prev = curr
        curr.Next = newNode
        curr = curr.Next
    }
    return head
}

func build_circular(arr []int, pos int) *Node {
    if len(arr) == 0 { return nil }
    head := &Node{Val: arr[0]}
    curr := head
    nodes := []*Node{head}
    for i := 1; i < len(arr); i++ {
        curr.Next = &Node{Val: arr[i]}
        curr = curr.Next
        nodes = append(nodes, curr)
    }
    if pos >= 0 && pos < len(nodes) {
        curr.Next = nodes[pos]
    }
    return head
}

func serialize_ll(node interface{}) []int {
    res := []int{}
    visited := make(map[interface{}]bool)
    
    // Use reflection to traverse dynamically since we have three types
    curr := reflect.ValueOf(node)
    for curr.IsValid() && !curr.IsNil() {
        ptr := curr.Pointer()
        if visited[ptr] { break }
        visited[ptr] = true
        
        valField := curr.Elem().FieldByName("Val")
        if valField.IsValid() {
            res = append(res, int(valField.Int()))
        }
        
        nextField := curr.Elem().FieldByName("Next")
        if nextField.IsValid() {
            curr = nextField
        } else {
            break
        }
    }
    return res
}

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
  const sig = functionSignatures[functionName];
  if (!sig) {
    return `${userCode}\nfun main() { println("Kotlin wrapper for this problem is not implemented yet.") }`;
  }
  
  const kotlinTests = testCases.map((tc, idx) => {
    let locals = '';
    let args = '';
    sig.inputs.forEach((t, i) => {
        let val = tc.input[i];
        if (t === 'int[]') {
            locals += `        val arg${i}_raw = intArrayOf(${JSON.stringify(val).replace(/\[/g, '').replace(/\]/g, '')})\n`;
            args += `arg${i}_raw`;
        } else if (t === 'int') {
            locals += `        val arg${i}_raw = ${val}\n`;
            args += `arg${i}_raw`;
        } else if (t === 'ListNode') {
            locals += `        val arg${i}_raw = intArrayOf(${JSON.stringify(val).replace(/\[/g, '').replace(/\]/g, '')})\n`;
            locals += `        val arg${i} = build_ll(arg${i}_raw)\n`;
            args += `arg${i}`;
        } else if (t === 'DoubleNode') {
            locals += `        val arg${i}_raw = intArrayOf(${JSON.stringify(val).replace(/\[/g, '').replace(/\]/g, '')})\n`;
            locals += `        val arg${i} = build_dll(arg${i}_raw)\n`;
            args += `arg${i}`;
        } else if (t === 'Node') {
            locals += `        val arg${i}_raw = intArrayOf(${JSON.stringify(val).replace(/\[/g, '').replace(/\]/g, '')})\n`;
            locals += `        val arg${i} = build_circular(arg${i}_raw, ${tc.input[1]})\n`;
            args += `arg${i}`;
        }
        if (i < sig.inputs.length - 1) args += ', ';
    });
    
    let expectedCode = '';
    if (sig.output === 'int[]') {
        expectedCode = `val expected = intArrayOf(${JSON.stringify(tc.expected).replace(/\[/g, '').replace(/\]/g, '')})`;
    } else if (sig.output === 'int') {
        expectedCode = `val expected = ${tc.expected}`;
    } else if (sig.output === 'bool') {
        expectedCode = `val expected = ${tc.expected ? 'true' : 'false'}`;
    } else if (sig.output === 'ListNode' || sig.output === 'DoubleNode' || sig.output === 'Node') {
        expectedCode = `val expected = intArrayOf(${JSON.stringify(tc.expected).replace(/\[/g, '').replace(/\]/g, '')})`;
    }
    
    let callCode = '';
    let compareCode = '';
    if (sig.output === 'ListNode' || sig.output === 'DoubleNode' || sig.output === 'Node') {
        callCode = `        val result_raw = sol.${functionName}(${args})\n        val result = serialize_ll(result_raw)`;
        compareCode = `if (result.contentEquals(expected))`;
    } else if (sig.output === 'int[]') {
        callCode = `        val result = sol.${functionName}(${args})`;
        compareCode = `if (result.contentEquals(expected))`;
    } else {
        callCode = `        val result = sol.${functionName}(${args})`;
        compareCode = `if (result == expected)`;
    }
    
    if (sig.unorderedOutput) {
        compareCode = `
            val res_sorted = result.clone()
            val exp_sorted = expected.clone()
            res_sorted.sort()
            exp_sorted.sort()
            if (res_sorted.contentEquals(exp_sorted))`;
    }
    let printActual = '';
    if (sig.output === 'int[]' || sig.output === 'ListNode' || sig.output === 'DoubleNode' || sig.output === 'Node') {
        printActual = `            println("  Got: " + result.contentToString())`;
    } else {
        printActual = `            println("  Got: $result")`;
    }
    
    return `
    run {
${locals}
        ${expectedCode}
${callCode}
        ${compareCode} {
            passed++
            println("Test ${idx+1}: PASS")
        } else {
            println("Test ${idx+1}: FAIL.\\n  Input: ${JSON.stringify(tc.input).replace(/"/g, '\\"')}\\n  Expected: ${JSON.stringify(tc.expected).replace(/"/g, '\\"')}")
${printActual}
        }
    }`;
  }).join('\n');

  return `
class ListNode(var \`val\`: Int) {
    var next: ListNode? = null
}

class DoubleNode(var \`val\`: Int) {
    var prev: DoubleNode? = null
    var next: DoubleNode? = null
}

class Node(var \`val\`: Int) {
    var next: Node? = null
}

fun build_ll(arr: IntArray): ListNode? {
    if (arr.isEmpty()) return null
    val head = ListNode(arr[0])
    var curr: ListNode? = head
    for (i in 1 until arr.size) {
        curr?.next = ListNode(arr[i])
        curr = curr?.next
    }
    return head
}

fun build_dll(arr: IntArray): DoubleNode? {
    if (arr.isEmpty()) return null
    val head = DoubleNode(arr[0])
    var curr: DoubleNode? = head
    for (i in 1 until arr.size) {
        val newNode = DoubleNode(arr[i])
        newNode.prev = curr
        curr?.next = newNode
        curr = curr?.next
    }
    return head
}

fun build_circular(arr: IntArray, pos: Int): Node? {
    if (arr.isEmpty()) return null
    val head = Node(arr[0])
    var curr: Node? = head
    val nodes = mutableListOf(head)
    for (i in 1 until arr.size) {
        curr?.next = Node(arr[i])
        curr = curr?.next
        if (curr != null) nodes.add(curr)
    }
    if (pos in 0 until nodes.size) {
        curr?.next = nodes[pos]
    }
    return head
}

fun serialize_ll(node: Any?): IntArray {
    val res = mutableListOf<Int>()
    val visited = mutableSetOf<Int>()
    var curr = node
    
    while (curr != null && !visited.contains(System.identityHashCode(curr))) {
        visited.add(System.identityHashCode(curr))
        if (curr is ListNode) {
            res.add(curr.\`val\`)
            curr = curr.next
        } else if (curr is DoubleNode) {
            res.add(curr.\`val\`)
            curr = curr.next
        } else if (curr is Node) {
            res.add(curr.\`val\`)
            curr = curr.next
        } else {
            break
        }
    }
    return res.toIntArray()
}

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
