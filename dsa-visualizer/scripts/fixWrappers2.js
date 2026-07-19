const fs = require('fs');
const file = 'src/utils/testWrapperGenerator.ts';
let content = fs.readFileSync(file, 'utf8');

const missingContent = `            
            if fname in ['reverseList', 'middleNode', 'reverseDoublyList', 'deleteAllOccurrences', 'insertCircular']:
                result = serialize_ll(result_raw)
            else:
                result = result_raw
            
            compare_expr = json.dumps(result) == json.dumps(expected)
            ${"$"}{functionSignatures[functionName]?.unorderedOutput ? \`
            if isinstance(result, list) and isinstance(expected, list):
                compare_expr = sorted(result) == sorted(expected)
            \` : ''}
            if compare_expr:
                passed += 1
                print(f"Test {i+1}: PASS")
            else:
                print(f"Test {i+1}: FAIL\\\\nInput: {tc['input']}\\\\nExpected: {expected}\\\\nGot: {result}")
        except Exception as e:
            print(f"Test {i+1}: ERROR. Exception: {e}")
            
    print(f"\\\\nResult: {passed}/{total} passed.")

if __name__ == "__main__":
    run_tests()
\`;
};

const generateJavaScriptWrapper = (userCode: string, functionName: string, testCases: TestCase[]) => {
  const testCasesJson = JSON.stringify(testCases);
  
  return \`
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

\${userCode}

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
    const testCases = \${testCasesJson};
    let passed = 0;
    const total = testCases.length;
    
    console.log("--- Test Results ---");
    
    for (let i = 0; i < testCases.length; i++) {
        const tc = testCases[i];
        try {
            if (typeof \${functionName} !== 'function') {
                console.log(\\\`Error: Function '\${functionName}' not found.\\\`);
                process.exit(1);
            }
            
            let fname = '\${functionName}';
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
            
            let result_raw = \${functionName}(...processedInputs);
            let result = result_raw;
            
            if (['reverseList', 'middleNode', 'reverseDoublyList', 'deleteAllOccurrences', 'insertCircular'].includes(fname)) {
                result = serialize_ll(result_raw);
            }
            
            let compare_expr = JSON.stringify(result) === JSON.stringify(tc.expected);
            ${"$"}{functionSignatures[functionName]?.unorderedOutput ? \`
            if (Array.isArray(result) && Array.isArray(tc.expected)) {
                compare_expr = JSON.stringify([...result].sort((a,b)=>a-b)) === JSON.stringify([...tc.expected].sort((a,b)=>a-b));
            }
            \` : ''}
            if (compare_expr) {
                passed++;
                console.log(\\\`Test \\\${i+1}: PASS\\\`);
            } else {
                console.log(\\\`Test \\\${i+1}: FAIL\\\\nInput: \\\${JSON.stringify(tc.input)}\\\\nExpected: \\\${JSON.stringify(tc.expected)}\\\\nGot: \\\${JSON.stringify(result)}\\\`);
            }
        } catch (e) {`;

const targetStr = `            result_raw = func(*inputs)
        } catch (e) {`;

content = content.replace(targetStr, "            result_raw = func(*inputs)\n" + missingContent);

fs.writeFileSync(file, content, 'utf8');
console.log('Restored Python and JS wrappers!');
