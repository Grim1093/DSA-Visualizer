import * as fs from 'fs';
import * as path from 'path';

const tsFilePath = path.join(__dirname, '../src/utils/testWrapperGenerator.ts');
let content = fs.readFileSync(tsFilePath, 'utf8');

const newCode = `
type DataType = 'int' | 'int[]' | 'bool' | 'ListNode' | 'DoubleNode' | 'Node';
interface Signature { inputs: DataType[]; output: DataType; }

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
  insertCircular: { inputs: ['Node', 'int'], output: 'Node' }
};

const generateCppWrapper = (userCode: string, functionName: string, testCases: TestCase[]) => {
  const sig = functionSignatures[functionName];
  if (!sig) {
    return \`\${userCode}\\nint main() { std::cout << "C++ test wrapper for this problem is not fully implemented yet." << std::endl; return 0; }\`;
  }
  
  const cppTests = testCases.map((tc, idx) => {
    let locals = '';
    let args = '';
    sig.inputs.forEach((t, i) => {
        let val = tc.input[i];
        if (t === 'int[]') {
            locals += \`        vector<int> arg\${i}_raw = \${JSON.stringify(val).replace(/\\[/g, '{').replace(/\\]/g, '}')};\\n\`;
            args += \`arg\${i}_raw\`;
        } else if (t === 'int') {
            locals += \`        int arg\${i}_raw = \${val};\\n\`;
            args += \`arg\${i}_raw\`;
        } else if (t === 'ListNode') {
            locals += \`        vector<int> arg\${i}_raw = \${JSON.stringify(val).replace(/\\[/g, '{').replace(/\\]/g, '}')};\\n\`;
            locals += \`        ListNode* arg\${i} = build_ll(arg\${i}_raw);\\n\`;
            args += \`arg\${i}\`;
        } else if (t === 'DoubleNode') {
            locals += \`        vector<int> arg\${i}_raw = \${JSON.stringify(val).replace(/\\[/g, '{').replace(/\\]/g, '}')};\\n\`;
            locals += \`        DoubleNode* arg\${i} = build_dll(arg\${i}_raw);\\n\`;
            args += \`arg\${i}\`;
        } else if (t === 'Node') {
            locals += \`        vector<int> arg\${i}_raw = \${JSON.stringify(val).replace(/\\[/g, '{').replace(/\\]/g, '}')};\\n\`;
            locals += \`        Node* arg\${i} = build_circular(arg\${i}_raw, \${tc.input[1]});\\n\`; // Hack for hasCycle/insertCircular
            args += \`arg\${i}\`;
        }
        if (i < sig.inputs.length - 1) args += ', ';
    });
    
    let expectedCode = '';
    if (sig.output === 'int[]') {
        expectedCode = \`vector<int> expected = \${JSON.stringify(tc.expected).replace(/\\[/g, '{').replace(/\\]/g, '}')};\`;
    } else if (sig.output === 'int') {
        expectedCode = \`int expected = \${tc.expected};\`;
    } else if (sig.output === 'bool') {
        expectedCode = \`bool expected = \${tc.expected ? 'true' : 'false'};\`;
    } else if (sig.output === 'ListNode' || sig.output === 'DoubleNode' || sig.output === 'Node') {
        expectedCode = \`vector<int> expected = \${JSON.stringify(tc.expected).replace(/\\[/g, '{').replace(/\\]/g, '}')};\`;
    }
    
    let callCode = '';
    let compareCode = '';
    if (sig.output === 'ListNode' || sig.output === 'DoubleNode' || sig.output === 'Node') {
        callCode = \`        auto result_raw = sol.\${functionName}(\${args});\\n        vector<int> result = serialize_ll(result_raw);\`;
        compareCode = \`if (result == expected)\`;
    } else {
        callCode = \`        auto result = sol.\${functionName}(\${args});\`;
        compareCode = \`if (result == expected)\`;
    }
    
    return \`
    {
\${locals}
        \${expectedCode}
\${callCode}
        \${compareCode} {
            passed++;
            cout << "Test \${idx+1}: PASS" << endl;
        } else {
            cout << "Test \${idx+1}: FAIL." << endl;
        }
    }\`;
  }).join('\\n');

  return \`
#include <vector>
#include <iostream>
#include <unordered_set>
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
    Node(int _val) {
        val = _val;
        next = NULL;
    }
    Node(int _val, Node* _next) {
        val = _val;
        next = _next;
    }
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
    if (pos >= 0 && pos < nodes.size()) {
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

\${userCode}

// --- INJECTED TEST WRAPPER ---
int main() {
    Solution sol;
    int passed = 0;
    int total = \${testCases.length};
    
    cout << "--- Test Results ---" << endl;
    
\${cppTests}

    cout << "\\nResult: " << passed << "/" << total << " passed." << endl;
    return 0;
}
\`;
};
`;

const javaLogic = \`
const generateJavaWrapper = (userCode: string, functionName: string, testCases: TestCase[]) => {
  const sig = functionSignatures[functionName];
  if (!sig) {
    return \\\`\${userCode}\\npublic class Main { public static void main(String[] args) { System.out.println("Java wrapper for this problem is not implemented yet."); } }\\\`;
  }
  // implementation for Java
  return "placeholder";
};
\`

// Replace the block from const generateCppWrapper = ... to the end of file
const startIndex = content.indexOf('const generateCppWrapper');
if (startIndex !== -1) {
    // we will build this incrementally
}
