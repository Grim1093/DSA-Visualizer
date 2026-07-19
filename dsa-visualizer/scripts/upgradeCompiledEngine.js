const fs = require('fs');
const path = require('path');

const tsFilePath = path.join(__dirname, '../src/utils/testWrapperGenerator.ts');
let content = fs.readFileSync(tsFilePath, 'utf8');

const newLogic = `
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
            locals += \`        Node* arg\${i} = build_circular(arg\${i}_raw, \${tc.input[1]});\\n\`;
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

\${userCode}

// --- INJECTED TEST WRAPPER ---
int main() {
    Solution sol;
    int passed = 0;
    int total = \${testCases.length};
    
    cout << "--- Test Results ---" << endl;
    
\${cppTests}

    cout << "\\\\nResult: " << passed << "/" << total << " passed." << endl;
    return 0;
}
\`;
};

const generateJavaWrapper = (userCode: string, functionName: string, testCases: TestCase[]) => {
  const sig = functionSignatures[functionName];
  if (!sig) {
    return \`\${userCode}\\npublic class Main { public static void main(String[] args) { System.out.println("Java wrapper for this problem is not implemented yet."); } }\`;
  }
  
  const javaTests = testCases.map((tc, idx) => {
    let locals = '';
    let args = '';
    sig.inputs.forEach((t, i) => {
        let val = tc.input[i];
        if (t === 'int[]') {
            locals += \`        int[] arg\${i}_raw = new int[]\${JSON.stringify(val).replace(/\\[/g, '{').replace(/\\]/g, '}')};\\n\`;
            args += \`arg\${i}_raw\`;
        } else if (t === 'int') {
            locals += \`        int arg\${i}_raw = \${val};\\n\`;
            args += \`arg\${i}_raw\`;
        } else if (t === 'ListNode') {
            locals += \`        int[] arg\${i}_raw = new int[]\${JSON.stringify(val).replace(/\\[/g, '{').replace(/\\]/g, '}')};\\n\`;
            locals += \`        ListNode arg\${i} = build_ll(arg\${i}_raw);\\n\`;
            args += \`arg\${i}\`;
        } else if (t === 'DoubleNode') {
            locals += \`        int[] arg\${i}_raw = new int[]\${JSON.stringify(val).replace(/\\[/g, '{').replace(/\\]/g, '}')};\\n\`;
            locals += \`        DoubleNode arg\${i} = build_dll(arg\${i}_raw);\\n\`;
            args += \`arg\${i}\`;
        } else if (t === 'Node') {
            locals += \`        int[] arg\${i}_raw = new int[]\${JSON.stringify(val).replace(/\\[/g, '{').replace(/\\]/g, '}')};\\n\`;
            locals += \`        Node arg\${i} = build_circular(arg\${i}_raw, \${tc.input[1]});\\n\`;
            args += \`arg\${i}\`;
        }
        if (i < sig.inputs.length - 1) args += ', ';
    });
    
    let expectedCode = '';
    if (sig.output === 'int[]') {
        expectedCode = \`int[] expected = new int[]\${JSON.stringify(tc.expected).replace(/\\[/g, '{').replace(/\\]/g, '}')};\`;
    } else if (sig.output === 'int') {
        expectedCode = \`int expected = \${tc.expected};\`;
    } else if (sig.output === 'bool') {
        expectedCode = \`boolean expected = \${tc.expected ? 'true' : 'false'};\`;
    } else if (sig.output === 'ListNode' || sig.output === 'DoubleNode' || sig.output === 'Node') {
        expectedCode = \`int[] expected = new int[]\${JSON.stringify(tc.expected).replace(/\\[/g, '{').replace(/\\]/g, '}')};\`;
    }
    
    let callCode = '';
    let compareCode = '';
    if (sig.output === 'ListNode' || sig.output === 'DoubleNode' || sig.output === 'Node') {
        callCode = \`        Object result_raw = sol.\${functionName}(\${args});\\n        int[] result = serialize_ll(result_raw);\`;
        compareCode = \`if (Arrays.equals(result, expected))\`;
    } else if (sig.output === 'int[]') {
        callCode = \`        int[] result = sol.\${functionName}(\${args});\`;
        compareCode = \`if (Arrays.equals(result, expected))\`;
    } else {
        callCode = \`        auto_type result = sol.\${functionName}(\${args});\`.replace('auto_type', sig.output === 'bool' ? 'boolean' : 'int');
        compareCode = \`if (result == expected)\`;
    }
    
    return \`
    {
\${locals}
        \${expectedCode}
\${callCode}
        \${compareCode} {
            passed++;
            System.out.println("Test \${idx+1}: PASS");
        } else {
            System.out.println("Test \${idx+1}: FAIL.");
        }
    }\`;
  }).join('\\n');

  return \`
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

\${userCode}

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
        try {
            Object head = node;
            while (head != null && !visited.contains(head)) {
                visited.add(head);
                res.add((Integer) head.getClass().getField("val").get(head));
                head = head.getClass().getField("next").get(head);
            }
        } catch (Exception e) {}
        int[] arr = new int[res.size()];
        for (int i=0; i<res.size(); i++) arr[i] = res.get(i);
        return arr;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int passed = 0;
        int total = \${testCases.length};
        System.out.println("--- Test Results ---");
        
\${javaTests}

        System.out.println("\\\\nResult: " + passed + "/" + total + " passed.");
    }
}
\`;
};

const generateGoWrapper = (userCode: string, functionName: string, testCases: TestCase[]) => {
  const sig = functionSignatures[functionName];
  if (!sig) {
    return \`package main\\nimport "fmt"\\n\${userCode}\\nfunc main() { fmt.Println("Go wrapper for this problem is not implemented yet.") }\`;
  }
  
  const goTests = testCases.map((tc, idx) => {
    let locals = '';
    let args = '';
    sig.inputs.forEach((t, i) => {
        let val = tc.input[i];
        if (t === 'int[]') {
            locals += \`        arg\${i}_raw := []int\${JSON.stringify(val).replace(/\\[/g, '{').replace(/\\]/g, '}')}\\n\`;
            args += \`arg\${i}_raw\`;
        } else if (t === 'int') {
            locals += \`        arg\${i}_raw := \${val}\\n\`;
            args += \`arg\${i}_raw\`;
        } else if (t === 'ListNode') {
            locals += \`        arg\${i}_raw := []int\${JSON.stringify(val).replace(/\\[/g, '{').replace(/\\]/g, '}')}\\n\`;
            locals += \`        arg\${i} := build_ll(arg\${i}_raw)\\n\`;
            args += \`arg\${i}\`;
        } else if (t === 'DoubleNode') {
            locals += \`        arg\${i}_raw := []int\${JSON.stringify(val).replace(/\\[/g, '{').replace(/\\]/g, '}')}\\n\`;
            locals += \`        arg\${i} := build_dll(arg\${i}_raw)\\n\`;
            args += \`arg\${i}\`;
        } else if (t === 'Node') {
            locals += \`        arg\${i}_raw := []int\${JSON.stringify(val).replace(/\\[/g, '{').replace(/\\]/g, '}')}\\n\`;
            locals += \`        arg\${i} := build_circular(arg\${i}_raw, \${tc.input[1]})\\n\`;
            args += \`arg\${i}\`;
        }
        if (i < sig.inputs.length - 1) args += ', ';
    });
    
    let expectedCode = '';
    if (sig.output === 'int[]') {
        expectedCode = \`expected := []int\${JSON.stringify(tc.expected).replace(/\\[/g, '{').replace(/\\]/g, '}')}\`;
    } else if (sig.output === 'int') {
        expectedCode = \`expected := \${tc.expected}\`;
    } else if (sig.output === 'bool') {
        expectedCode = \`expected := \${tc.expected ? 'true' : 'false'}\`;
    } else if (sig.output === 'ListNode' || sig.output === 'DoubleNode' || sig.output === 'Node') {
        expectedCode = \`expected := []int\${JSON.stringify(tc.expected).replace(/\\[/g, '{').replace(/\\]/g, '}')}\`;
    }
    
    let callCode = '';
    let compareCode = '';
    if (sig.output === 'ListNode' || sig.output === 'DoubleNode' || sig.output === 'Node') {
        callCode = \`        result_raw := \${functionName}(\${args})\\n        result := serialize_ll(result_raw)\`;
        compareCode = \`if reflect.DeepEqual(result, expected)\`;
    } else if (sig.output === 'int[]') {
        callCode = \`        result := \${functionName}(\${args})\`;
        compareCode = \`if reflect.DeepEqual(result, expected)\`;
    } else {
        callCode = \`        result := \${functionName}(\${args})\`;
        compareCode = \`if result == expected\`;
    }
    
    return \`
    {
\${locals}
        \${expectedCode}
\${callCode}
        \${compareCode} {
            passed++
            fmt.Println("Test \${idx+1}: PASS")
        } else {
            fmt.Println("Test \${idx+1}: FAIL.")
        }
    }\`;
  }).join('\\n');

  return \`
package main
import (
    "fmt"
    "reflect"
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

\${userCode}

func main() {
    passed := 0
    total := \${testCases.length}
    fmt.Println("--- Test Results ---")
    
\${goTests}

    fmt.Printf("\\\\nResult: %d/%d passed.\\\\n", passed, total)
}
\`;
};

const generateKotlinWrapper = (userCode: string, functionName: string, testCases: TestCase[]) => {
  const sig = functionSignatures[functionName];
  if (!sig) {
    return \`\${userCode}\\nfun main() { println("Kotlin wrapper for this problem is not implemented yet.") }\`;
  }
  
  const kotlinTests = testCases.map((tc, idx) => {
    let locals = '';
    let args = '';
    sig.inputs.forEach((t, i) => {
        let val = tc.input[i];
        if (t === 'int[]') {
            locals += \`        val arg\${i}_raw = intArrayOf(\${JSON.stringify(val).replace(/\\[/g, '').replace(/\\]/g, '')})\\n\`;
            args += \`arg\${i}_raw\`;
        } else if (t === 'int') {
            locals += \`        val arg\${i}_raw = \${val}\\n\`;
            args += \`arg\${i}_raw\`;
        } else if (t === 'ListNode') {
            locals += \`        val arg\${i}_raw = intArrayOf(\${JSON.stringify(val).replace(/\\[/g, '').replace(/\\]/g, '')})\\n\`;
            locals += \`        val arg\${i} = build_ll(arg\${i}_raw)\\n\`;
            args += \`arg\${i}\`;
        } else if (t === 'DoubleNode') {
            locals += \`        val arg\${i}_raw = intArrayOf(\${JSON.stringify(val).replace(/\\[/g, '').replace(/\\]/g, '')})\\n\`;
            locals += \`        val arg\${i} = build_dll(arg\${i}_raw)\\n\`;
            args += \`arg\${i}\`;
        } else if (t === 'Node') {
            locals += \`        val arg\${i}_raw = intArrayOf(\${JSON.stringify(val).replace(/\\[/g, '').replace(/\\]/g, '')})\\n\`;
            locals += \`        val arg\${i} = build_circular(arg\${i}_raw, \${tc.input[1]})\\n\`;
            args += \`arg\${i}\`;
        }
        if (i < sig.inputs.length - 1) args += ', ';
    });
    
    let expectedCode = '';
    if (sig.output === 'int[]') {
        expectedCode = \`val expected = intArrayOf(\${JSON.stringify(tc.expected).replace(/\\[/g, '').replace(/\\]/g, '')})\`;
    } else if (sig.output === 'int') {
        expectedCode = \`val expected = \${tc.expected}\`;
    } else if (sig.output === 'bool') {
        expectedCode = \`val expected = \${tc.expected ? 'true' : 'false'}\`;
    } else if (sig.output === 'ListNode' || sig.output === 'DoubleNode' || sig.output === 'Node') {
        expectedCode = \`val expected = intArrayOf(\${JSON.stringify(tc.expected).replace(/\\[/g, '').replace(/\\]/g, '')})\`;
    }
    
    let callCode = '';
    let compareCode = '';
    if (sig.output === 'ListNode' || sig.output === 'DoubleNode' || sig.output === 'Node') {
        callCode = \`        val result_raw = sol.\${functionName}(\${args})\\n        val result = serialize_ll(result_raw)\`;
        compareCode = \`if (result.contentEquals(expected))\`;
    } else if (sig.output === 'int[]') {
        callCode = \`        val result = sol.\${functionName}(\${args})\`;
        compareCode = \`if (result.contentEquals(expected))\`;
    } else {
        callCode = \`        val result = sol.\${functionName}(\${args})\`;
        compareCode = \`if (result == expected)\`;
    }
    
    return \`
    {
\${locals}
        \${expectedCode}
\${callCode}
        \${compareCode} {
            passed++
            println("Test \${idx+1}: PASS")
        } else {
            println("Test \${idx+1}: FAIL.")
        }
    }()\`;
  }).join('\\n');

  return \`
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
        try {
            val valField = curr.javaClass.getField("val")
            res.add(valField.getInt(curr))
            val nextField = curr.javaClass.getField("next")
            curr = nextField.get(curr)
        } catch (e: Exception) {
            break
        }
    }
    return res.toIntArray()
}

\${userCode}

fun main() {
    val sol = Solution()
    var passed = 0
    val total = \${testCases.length}
    println("--- Test Results ---")
    
\${kotlinTests}

    println("\\\\nResult: $passed/$total passed.")
}
\`;
};

export const runTests = async (
`;

const startIndex = content.indexOf('const generateCppWrapper');
if (startIndex !== -1) {
    const newContent = content.substring(0, startIndex) + newLogic;
    fs.writeFileSync(tsFilePath, newContent, 'utf8');
    console.log("Updated testWrapperGenerator.ts");
} else {
    console.log("Could not find insertion points");
}
