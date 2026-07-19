const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'utils', 'testWrapperGenerator.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace Python wrapper
const newPythonWrapper = `const generatePythonWrapper = (userCode: string, functionName: string, testCases: TestCase[]) => {
  const testCasesJson = JSON.stringify(testCases);
  
  return \\\`
\\\${userCode}

# --- INJECTED TEST WRAPPER ---
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
    test_cases = json.loads('''\\\${testCasesJson}''')
    passed = 0
    total = len(test_cases)
    
    print("--- Test Results ---")
    
    for i, tc in enumerate(test_cases):
        try:
            if ('\\\${functionName}' not in globals()):
                print(f"Error: Function '\\\${functionName}' not found.")
                sys.exit(1)
                
            func = globals()['\\\${functionName}']
            inputs = tc['input']
            expected = tc['expected']
            
            # Auto-convert arrays to lists based on function
            fname = '\\\${functionName}'
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
            
            if json.dumps(result) == json.dumps(expected):
                passed += 1
                print(f"Test {i+1}: PASS")
            else:
                print(f"Test {i+1}: FAIL\\\\nInput: {tc['input']}\\\\nExpected: {expected}\\\\nGot: {result}")
        except Exception as e:
            print(f"Test {i+1}: ERROR. Exception: {e}")
            
    print(f"\\\\nResult: {passed}/{total} passed.")

if __name__ == "__main__":
    run_tests()
\\\`;
};`;

content = content.replace(/const generatePythonWrapper =[\s\S]*?};\n/, newPythonWrapper + '\n');


// Replace JS wrapper
const newJsWrapper = `const generateJavaScriptWrapper = (userCode: string, functionName: string, testCases: TestCase[]) => {
  const testCasesJson = JSON.stringify(testCases);
  
  return \\\`
\\\${userCode}

// --- INJECTED TEST WRAPPER ---
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
    const testCases = \\\${testCasesJson};
    let passed = 0;
    const total = testCases.length;
    
    console.log("--- Test Results ---");
    
    for (let i = 0; i < testCases.length; i++) {
        const tc = testCases[i];
        try {
            if (typeof \\\${functionName} !== 'function') {
                console.log(\\\`Error: Function '\\\${functionName}' not found.\\\`);
                process.exit(1);
            }
            
            let fname = '\\\${functionName}';
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
            
            let result_raw = \\\${functionName}(...processedInputs);
            let result = result_raw;
            
            if (['reverseList', 'middleNode', 'reverseDoublyList', 'deleteAllOccurrences', 'insertCircular'].includes(fname)) {
                result = serialize_ll(result_raw);
            }
            
            if (JSON.stringify(result) === JSON.stringify(tc.expected)) {
                passed++;
                console.log(\\\`Test \\\${i+1}: PASS\\\`);
            } else {
                console.log(\\\`Test \\\${i+1}: FAIL\\\\nInput: \\\${JSON.stringify(tc.input)}\\\\nExpected: \\\${JSON.stringify(tc.expected)}\\\\nGot: \\\${JSON.stringify(result)}\\\`);
            }
        } catch (e) {
            console.log(\\\`Test \\\${i+1}: ERROR. \\\${e.message}\\\`);
        }
    }
    
    console.log(\\\`\\\\nResult: \\\${passed}/\\\${total} passed.\\\`);
}

runTests();
\\\`;
};`;

content = content.replace(/const generateJavaScriptWrapper =[\s\S]*?};\n/, newJsWrapper + '\n');

fs.writeFileSync(filePath, content);
console.log('Successfully upgraded Python and JS execution engines!');
