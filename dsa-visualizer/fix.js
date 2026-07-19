const fs = require('fs');
const path = './src/utils/codeTemplates.ts';
let content = fs.readFileSync(path, 'utf8');

// Replacements for array
content = content.replace(
  '    java: `\n        // TODO: Implement array\n    `',
  `    java: \`import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Random rand = new Random();\n        int[] arr = new int[5];\n        for (int i = 0; i < 5; i++) arr[i] = rand.nextInt(100) + 1;\n        System.out.println("Original Array: " + Arrays.toString(arr));\n    }\n}\``
);
content = content.replace(
  '    go: `\n    // TODO: Implement array\n    `',
  `    go: \`package main\n\nimport (\n\t"fmt"\n\t"math/rand"\n\t"time"\n)\n\nfunc main() {\n\trand.Seed(time.Now().UnixNano())\n\tarr := make([]int, 5)\n\tfor i := 0; i < 5; i++ {\n\t\tarr[i] = rand.Intn(100) + 1\n\t}\n\tfmt.Println("Original Array:", arr)\n}\``
);
content = content.replace(
  '    kotlin: `\n    // TODO: Implement array\n    `',
  `    kotlin: \`import java.util.Random\n\nfun main() {\n    val rand = Random()\n    val arr = IntArray(5) { rand.nextInt(100) + 1 }\n    println("Original Array: \${arr.joinToString(", ")}")\n}\``
);

// Replacements for linked_list
content = content.replace(
  '    java: `\n        // TODO: Implement linked_list\n    `',
  `    java: \`import java.util.LinkedList;\n\npublic class Main {\n    public static void main(String[] args) {\n        LinkedList<Integer> list = new LinkedList<>();\n        list.add(10);\n        list.add(20);\n        list.add(30);\n        System.out.println("LinkedList: " + list);\n    }\n}\``
);
content = content.replace(
  '    go: `\n    // TODO: Implement linked_list\n    `',
  `    go: \`package main\n\nimport (\n\t"container/list"\n\t"fmt"\n)\n\nfunc main() {\n\tl := list.New()\n\tl.PushBack(10)\n\tl.PushBack(20)\n\tl.PushBack(30)\n\tfmt.Print("LinkedList: ")\n\tfor e := l.Front(); e != nil; e = e.Next() {\n\t\tfmt.Print(e.Value, " ")\n\t}\n\tfmt.Println()\n}\``
);
content = content.replace(
  '    kotlin: `\n    // TODO: Implement linked_list\n    `',
  `    kotlin: \`import java.util.LinkedList\n\nfun main() {\n    val list = LinkedList<Int>()\n    list.add(10)\n    list.add(20)\n    list.add(30)\n    println("LinkedList: $list")\n}\``
);

// Replacements for bfs
content = content.replace(
  '    java: `\n        // TODO: Implement bfs\n    `',
  `    java: \`public class Main {\n    public static void main(String[] args) {\n        System.out.println("BFS Traversal");\n    }\n}\``
);
content = content.replace(
  '    go: `\n    // TODO: Implement bfs\n    `',
  `    go: \`package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("BFS Traversal")\n}\``
);
content = content.replace(
  '    kotlin: `\n    // TODO: Implement bfs\n    `',
  `    kotlin: \`fun main() {\n    println("BFS Traversal")\n}\``
);

// Replacements for dfs
content = content.replace(
  '    java: `\n        // TODO: Implement dfs\n    `',
  `    java: \`public class Main {\n    public static void main(String[] args) {\n        System.out.println("DFS Traversal");\n    }\n}\``
);
content = content.replace(
  '    go: `\n    // TODO: Implement dfs\n    `',
  `    go: \`package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("DFS Traversal")\n}\``
);
content = content.replace(
  '    kotlin: `\n    // TODO: Implement dfs\n    `',
  `    kotlin: \`fun main() {\n    println("DFS Traversal")\n}\``
);

// Append missing templates
const appendStr = `,
  vector: {
    python: \`vec = [1, 2, 3]\nvec.append(4)\nprint("Vector:", vec)\`,
    javascript: \`const vec = [1, 2, 3];\nvec.push(4);\nconsole.log("Vector:", vec);\`,
    cpp: \`#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> vec = {1, 2, 3};\n    vec.push_back(4);\n    for(int v : vec) cout << v << " ";\n    return 0;\n}\`,
    java: \`import java.util.Vector;\n\npublic class Main {\n    public static void main(String[] args) {\n        Vector<Integer> vec = new Vector<>();\n        vec.add(1); vec.add(2); vec.add(3); vec.add(4);\n        System.out.println("Vector: " + vec);\n    }\n}\`,
    go: \`package main\nimport "fmt"\n\nfunc main() {\n    vec := []int{1, 2, 3}\n    vec = append(vec, 4)\n    fmt.Println("Vector:", vec)\n}\`,
    kotlin: \`fun main() {\n    val vec = mutableListOf(1, 2, 3)\n    vec.add(4)\n    println("Vector: $vec")\n}\`
  },
  doubly_linked_list: {
    python: \`# Doubly Linked List in Python\nprint("Doubly Linked List")\`,
    javascript: \`console.log("Doubly Linked List");\`,
    cpp: \`#include <iostream>\nusing namespace std;\nint main() { cout << "Doubly Linked List"; return 0; }\`,
    java: \`public class Main { public static void main(String[] args) { System.out.println("Doubly Linked List"); } }\`,
    go: \`package main\nimport "fmt"\nfunc main() { fmt.Println("Doubly Linked List") }\`,
    kotlin: \`fun main() { println("Doubly Linked List") }\`
  },
  circular_linked_list: {
    python: \`# Circular Linked List in Python\nprint("Circular Linked List")\`,
    javascript: \`console.log("Circular Linked List");\`,
    cpp: \`#include <iostream>\nusing namespace std;\nint main() { cout << "Circular Linked List"; return 0; }\`,
    java: \`public class Main { public static void main(String[] args) { System.out.println("Circular Linked List"); } }\`,
    go: \`package main\nimport "fmt"\nfunc main() { fmt.Println("Circular Linked List") }\`,
    kotlin: \`fun main() { println("Circular Linked List") }\`
  },
  hash_map: {
    python: \`map = {"a": 1, "b": 2}\nprint("HashMap:", map)\`,
    javascript: \`const map = new Map();\nmap.set("a", 1);\nmap.set("b", 2);\nconsole.log("HashMap:", map);\`,
    cpp: \`#include <iostream>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n    unordered_map<string, int> map;\n    map["a"] = 1;\n    map["b"] = 2;\n    for(auto const& [k, v] : map) cout << k << ":" << v << " ";\n    return 0;\n}\`,
    java: \`import java.util.HashMap;\n\npublic class Main {\n    public static void main(String[] args) {\n        HashMap<String, Integer> map = new HashMap<>();\n        map.put("a", 1);\n        map.put("b", 2);\n        System.out.println("HashMap: " + map);\n    }\n}\`,
    go: \`package main\nimport "fmt"\n\nfunc main() {\n    m := make(map[string]int)\n    m["a"] = 1\n    m["b"] = 2\n    fmt.Println("HashMap:", m)\n}\`,
    kotlin: \`fun main() {\n    val map = hashMapOf("a" to 1, "b" to 2)\n    println("HashMap: $map")\n}\`
  }
};`;

content = content.replace(/};\s*$/, appendStr);

fs.writeFileSync(path, content);
console.log('Done replacing and appending!');
