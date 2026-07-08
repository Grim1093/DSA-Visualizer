export const codeTemplates: Record<string, Record<string, string>> = {
  linear: {
    python: `import random

def linear_search(arr, target):
    # Step 2: Iterate through the array
    for i in range(len(arr)):
        # Step 3: Check if current element matches the target
        if arr[i] == target:
            return i
    # Step 4: Return -1 if target is not found
    return -1

# Step 1: Generate a random array and pick a target
arr = [random.randint(1, 100) for _ in range(10)]
target = random.choice(arr) if random.random() > 0.5 else random.randint(1, 100)

print(f"Array: {arr}")
print(f"Searching for: {target}")

# Step 5: Execute search and print result
result = linear_search(arr, target)
if result != -1:
    print(f"Target {target} found at index: {result}")
else:
    print(f"Target {target} not found in the array.")`,
    javascript: `function linearSearch(arr, target) {
    // Step 2: Iterate through the array
    for (let i = 0; i < arr.length; i++) {
        // Step 3: Check if current element matches the target
        if (arr[i] === target) return i;
    }
    // Step 4: Return -1 if target is not found
    return -1;
}

// Step 1: Generate a random array and pick a target
const arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
const target = Math.random() > 0.5 ? arr[Math.floor(Math.random() * arr.length)] : Math.floor(Math.random() * 100) + 1;

console.log("Array:", arr.join(", "));
console.log("Searching for:", target);

// Step 5: Execute search and print result
const result = linearSearch(arr, target);
if (result !== -1) {
    console.log(\`Target \${target} found at index: \${result}\`);
} else {
    console.log(\`Target \${target} not found in the array.\`);
}`,
    cpp: `#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>
using namespace std;

int linearSearch(vector<int>& arr, int target) {
    // Step 2: Iterate through the array
    for (int i = 0; i < arr.size(); i++) {
        // Step 3: Check if current element matches the target
        if (arr[i] == target) return i;
    }
    // Step 4: Return -1 if target is not found
    return -1;
}

int main() {
    srand(time(0));
    // Step 1: Generate a random array and pick a target
    vector<int> arr(10);
    for(int i=0; i<10; i++) arr[i] = rand() % 100 + 1;
    
    int target = (rand() % 2 == 0) ? arr[rand() % 10] : rand() % 100 + 1;
    
    cout << "Array: ";
    for(int num : arr) cout << num << " ";
    cout << "\\nSearching for: " << target << endl;
    
    // Step 5: Execute search and print result
    int result = linearSearch(arr, target);
    if (result != -1) {
        cout << "Target " << target << " found at index: " << result << endl;
    } else {
        cout << "Target " << target << " not found in the array." << endl;
    }
    return 0;
}`
  },
  binary: {
    python: `import random

def binary_search(arr, target):
    # Step 2: Initialize left and right pointers
    left, right = 0, len(arr) - 1
    
    # Step 3: Loop until left pointer passes right pointer
    while left <= right:
        mid = (left + right) // 2
        
        # Step 4: Check if mid element is the target
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1 # Search right half
        else:
            right = mid - 1 # Search left half
            
    # Step 5: Return -1 if target is not found
    return -1

# Step 1: Generate a SORTED random array and pick a target
arr = sorted([random.randint(1, 100) for _ in range(10)])
target = random.choice(arr) if random.random() > 0.5 else random.randint(1, 100)

print(f"Sorted Array: {arr}")
print(f"Searching for: {target}")

# Step 6: Execute search and print result
result = binary_search(arr, target)
if result != -1:
    print(f"Target {target} found at index: {result}")
else:
    print(f"Target {target} not found in the array.")`,
    javascript: `function binarySearch(arr, target) {
    // Step 2: Initialize left and right pointers
    let left = 0, right = arr.length - 1;
    
    // Step 3: Loop until left pointer passes right pointer
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        // Step 4: Check if mid element is the target
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1; // Search right half
        else right = mid - 1; // Search left half
    }
    
    // Step 5: Return -1 if target is not found
    return -1;
}

// Step 1: Generate a SORTED random array and pick a target
let arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
arr.sort((a, b) => a - b);
const target = Math.random() > 0.5 ? arr[Math.floor(Math.random() * arr.length)] : Math.floor(Math.random() * 100) + 1;

console.log("Sorted Array:", arr.join(", "));
console.log("Searching for:", target);

// Step 6: Execute search and print result
const result = binarySearch(arr, target);
if (result !== -1) {
    console.log(\`Target \${target} found at index: \${result}\`);
} else {
    console.log(\`Target \${target} not found in the array.\`);
}`,
    cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <cstdlib>
#include <ctime>
using namespace std;

int binarySearch(vector<int>& arr, int target) {
    // Step 2: Initialize left and right pointers
    int left = 0, right = arr.size() - 1;
    
    // Step 3: Loop until left pointer passes right pointer
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        // Step 4: Check if mid element is the target
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1; // Search right half
        else right = mid - 1; // Search left half
    }
    
    // Step 5: Return -1 if target is not found
    return -1;
}

int main() {
    srand(time(0));
    // Step 1: Generate a SORTED random array and pick a target
    vector<int> arr(10);
    for(int i=0; i<10; i++) arr[i] = rand() % 100 + 1;
    sort(arr.begin(), arr.end());
    
    int target = (rand() % 2 == 0) ? arr[rand() % 10] : rand() % 100 + 1;
    
    cout << "Sorted Array: ";
    for(int num : arr) cout << num << " ";
    cout << "\\nSearching for: " << target << endl;
    
    // Step 6: Execute search and print result
    int result = binarySearch(arr, target);
    if (result != -1) {
        cout << "Target " << target << " found at index: " << result << endl;
    } else {
        cout << "Target " << target << " not found in the array." << endl;
    }
    return 0;
}`
  },
  bubble: {
    python: `import random

def bubble_sort(arr):
    n = len(arr)
    # Step 2: Traverse through all array elements
    for i in range(n):
        # Step 3: Last i elements are already in place
        for j in range(0, n-i-1):
            # Step 4: Swap if the element found is greater than the next element
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

# Step 1: Generate a random array
arr = [random.randint(1, 100) for _ in range(10)]
print(f"Original Array: {arr}")

# Step 5: Run sorting algorithm and print
print(f"Sorted Array:   {bubble_sort(arr.copy())}")`,
    javascript: `function bubbleSort(arr) {
    let n = arr.length;
    // Step 2: Traverse through all array elements
    for (let i = 0; i < n; i++) {
        // Step 3: Last i elements are already in place
        for (let j = 0; j < n-i-1; j++) {
            // Step 4: Swap if the element found is greater than the next element
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }
        }
    }
    return arr;
}

// Step 1: Generate a random array
let arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
console.log("Original Array:", arr.join(", "));

// Step 5: Run sorting algorithm and print
console.log("Sorted Array:  ", bubbleSort([...arr]).join(", "));`,
    cpp: `#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>
using namespace std;

void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    // Step 2: Traverse through all array elements
    for (int i = 0; i < n-1; i++) {
        // Step 3: Last i elements are already in place
        for (int j = 0; j < n-i-1; j++) {
            // Step 4: Swap if the element found is greater than the next element
            if (arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
            }
        }
    }
}

int main() {
    srand(time(0));
    // Step 1: Generate a random array
    vector<int> arr(10);
    cout << "Original Array: ";
    for(int i=0; i<10; i++) {
        arr[i] = rand() % 100 + 1;
        cout << arr[i] << " ";
    }
    
    // Step 5: Run sorting algorithm and print
    bubbleSort(arr);
    
    cout << "\\nSorted Array:   ";
    for(int i : arr) cout << i << " ";
    cout << endl;
    return 0;
}`
  },
  selection: {
    python: `import random

def selection_sort(arr):
    # Step 2: Traverse through all array elements
    for i in range(len(arr)):
        # Step 3: Find the minimum element in remaining unsorted array
        min_idx = i
        for j in range(i+1, len(arr)):
            if arr[min_idx] > arr[j]:
                min_idx = j
        # Step 4: Swap the found minimum element with the first element
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

# Step 1: Generate a random array
arr = [random.randint(1, 100) for _ in range(10)]
print(f"Original Array: {arr}")

# Step 5: Run sorting algorithm and print
print(f"Sorted Array:   {selection_sort(arr.copy())}")`,
    javascript: `function selectionSort(arr) {
    // Step 2: Traverse through all array elements
    for (let i = 0; i < arr.length; i++) {
        // Step 3: Find the minimum element in remaining unsorted array
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        // Step 4: Swap the found minimum element with the first element
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    return arr;
}

// Step 1: Generate a random array
let arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
console.log("Original Array:", arr.join(", "));

// Step 5: Run sorting algorithm and print
console.log("Sorted Array:  ", selectionSort([...arr]).join(", "));`,
    cpp: `#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>
using namespace std;

void selectionSort(vector<int>& arr) {
    // Step 2: Traverse through all array elements
    for (int i = 0; i < arr.size(); i++) {
        // Step 3: Find the minimum element in remaining unsorted array
        int minIdx = i;
        for (int j = i + 1; j < arr.size(); j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        // Step 4: Swap the found minimum element with the first element
        swap(arr[i], arr[minIdx]);
    }
}

int main() {
    srand(time(0));
    // Step 1: Generate a random array
    vector<int> arr(10);
    cout << "Original Array: ";
    for(int i=0; i<10; i++) {
        arr[i] = rand() % 100 + 1;
        cout << arr[i] << " ";
    }
    
    // Step 5: Run sorting algorithm and print
    selectionSort(arr);
    
    cout << "\\nSorted Array:   ";
    for(int i : arr) cout << i << " ";
    cout << endl;
    return 0;
}`
  },
  insertion: {
    python: `import random

def insertion_sort(arr):
    # Step 2: Iterate from the second element to the end
    for i in range(1, len(arr)):
        key = arr[i]
        j = i-1
        # Step 3: Move elements of arr[0..i-1], that are greater than key, to one position ahead
        while j >= 0 and key < arr[j]:
            arr[j+1] = arr[j]
            j -= 1
        # Step 4: Insert the key into its correct position
        arr[j+1] = key
    return arr

# Step 1: Generate a random array
arr = [random.randint(1, 100) for _ in range(10)]
print(f"Original Array: {arr}")

# Step 5: Run sorting algorithm and print
print(f"Sorted Array:   {insertion_sort(arr.copy())}")`,
    javascript: `function insertionSort(arr) {
    // Step 2: Iterate from the second element to the end
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        // Step 3: Move elements of arr[0..i-1], that are greater than key, to one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        // Step 4: Insert the key into its correct position
        arr[j + 1] = key;
    }
    return arr;
}

// Step 1: Generate a random array
let arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
console.log("Original Array:", arr.join(", "));

// Step 5: Run sorting algorithm and print
console.log("Sorted Array:  ", insertionSort([...arr]).join(", "));`,
    cpp: `#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>
using namespace std;

void insertionSort(vector<int>& arr) {
    // Step 2: Iterate from the second element to the end
    for (int i = 1; i < arr.size(); i++) {
        int key = arr[i];
        int j = i - 1;
        // Step 3: Move elements of arr[0..i-1], that are greater than key, to one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        // Step 4: Insert the key into its correct position
        arr[j + 1] = key;
    }
}

int main() {
    srand(time(0));
    // Step 1: Generate a random array
    vector<int> arr(10);
    cout << "Original Array: ";
    for(int i=0; i<10; i++) {
        arr[i] = rand() % 100 + 1;
        cout << arr[i] << " ";
    }
    
    // Step 5: Run sorting algorithm and print
    insertionSort(arr);
    
    cout << "\\nSorted Array:   ";
    for(int i : arr) cout << i << " ";
    cout << endl;
    return 0;
}`
  },
  merge: {
    python: `import random

def merge_sort(arr):
    # Step 2: Base case - if array size is 1, it's already sorted
    if len(arr) > 1:
        # Step 3: Find the middle point and divide the array
        mid = len(arr)//2
        L = arr[:mid]
        R = arr[mid:]
        
        # Step 4: Recursively sort both halves
        merge_sort(L)
        merge_sort(R)
        
        i = j = k = 0
        # Step 5: Merge the sorted halves back together
        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1
            
        # Step 6: Copy any remaining elements of L[] or R[]
        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1
            
        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1
    return arr

# Step 1: Generate a random array
arr = [random.randint(1, 100) for _ in range(10)]
print(f"Original Array: {arr}")

# Step 7: Run sorting algorithm and print
print(f"Sorted Array:   {merge_sort(arr.copy())}")`,
    javascript: `function mergeSort(arr) {
    // Step 2: Base case - if array size is 1, it's already sorted
    if (arr.length <= 1) return arr;
    
    // Step 3: Find the middle point and divide the array
    const mid = Math.floor(arr.length / 2);
    
    // Step 4: Recursively sort both halves
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    // Step 5: Merge the sorted halves back together
    return merge(left, right);
}

function merge(left, right) {
    let result = [], i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    // Step 6: Copy any remaining elements
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// Step 1: Generate a random array
let arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
console.log("Original Array:", arr.join(", "));

// Step 7: Run sorting algorithm and print
console.log("Sorted Array:  ", mergeSort([...arr]).join(", "));`,
    cpp: `#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>
using namespace std;

void merge(vector<int>& arr, int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    vector<int> L(n1), R(n2);
    
    // Step 5: Copy data to temporary arrays L[] and R[]
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    
    int i = 0, j = 0, k = l;
    // Step 6: Merge the temp arrays back into arr[l..r]
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    // Step 7: Copy remaining elements
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(vector<int>& arr, int l, int r) {
    // Step 2: Base case check
    if (l >= r) return;
    
    // Step 3: Find the middle point
    int m = l + (r - l) / 2;
    
    // Step 4: Recursively sort both halves
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}

int main() {
    srand(time(0));
    // Step 1: Generate a random array
    vector<int> arr(10);
    cout << "Original Array: ";
    for(int i=0; i<10; i++) {
        arr[i] = rand() % 100 + 1;
        cout << arr[i] << " ";
    }
    
    // Step 8: Run sorting algorithm and print
    mergeSort(arr, 0, arr.size() - 1);
    
    cout << "\\nSorted Array:   ";
    for(int i : arr) cout << i << " ";
    cout << endl;
    return 0;
}`
  },
  quick: {
    python: `import random

def quick_sort(arr):
    # Step 2: Base case - arrays with 0 or 1 element are already sorted
    if len(arr) <= 1:
        return arr
        
    # Step 3: Choose a pivot (middle element)
    pivot = arr[len(arr) // 2]
    
    # Step 4: Partition the array into three segments
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    # Step 5: Recursively sort the segments and combine
    return quick_sort(left) + middle + quick_sort(right)

# Step 1: Generate a random array
arr = [random.randint(1, 100) for _ in range(10)]
print(f"Original Array: {arr}")

# Step 6: Run sorting algorithm and print
print(f"Sorted Array:   {quick_sort(arr.copy())}")`,
    javascript: `function quickSort(arr) {
    // Step 2: Base case - arrays with 0 or 1 element are already sorted
    if (arr.length <= 1) return arr;
    
    // Step 3: Choose a pivot (middle element)
    const pivot = arr[Math.floor(arr.length / 2)];
    
    // Step 4: Partition the array into three segments
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    
    // Step 5: Recursively sort the segments and combine
    return [...quickSort(left), ...middle, ...quickSort(right)];
}

// Step 1: Generate a random array
let arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
console.log("Original Array:", arr.join(", "));

// Step 6: Run sorting algorithm and print
console.log("Sorted Array:  ", quickSort([...arr]).join(", "));`,
    cpp: `#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>
using namespace std;

int partition(vector<int>& arr, int low, int high) {
    // Step 3: Choose a pivot (last element)
    int pivot = arr[high];
    int i = (low - 1);
    
    // Step 4: Move elements smaller than pivot to the left
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    // Step 5: Place the pivot in its correct position
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}

void quickSort(vector<int>& arr, int low, int high) {
    // Step 2: Base case check
    if (low < high) {
        int pi = partition(arr, low, high);
        
        // Step 6: Recursively sort elements before and after partition
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    srand(time(0));
    // Step 1: Generate a random array
    vector<int> arr(10);
    cout << "Original Array: ";
    for(int i=0; i<10; i++) {
        arr[i] = rand() % 100 + 1;
        cout << arr[i] << " ";
    }
    
    // Step 7: Run sorting algorithm and print
    quickSort(arr, 0, arr.size() - 1);
    
    cout << "\\nSorted Array:   ";
    for(int i : arr) cout << i << " ";
    cout << endl;
    return 0;
}`
  },
  bfs: {
    python: `import random
from collections import defaultdict, deque

def bfs(graph, start):
    # Step 3: Initialize visited set and queue
    visited = set()
    queue = deque([start])
    visited.add(start)
    
    # Step 4: Loop until queue is empty
    while queue:
        # Step 5: Dequeue a vertex and print it
        vertex = queue.popleft()
        print(vertex, end=" ")
        
        # Step 6: Get all adjacent vertices. If not visited, mark as visited and enqueue
        for neighbour in graph[vertex]:
            if neighbour not in visited:
                visited.add(neighbour)
                queue.append(neighbour)

def generate_random_graph(num_nodes=6, num_edges=8):
    graph = defaultdict(list)
    labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'][:num_nodes]
    
    for _ in range(num_edges):
        u, v = random.sample(labels, 2)
        if v not in graph[u]:
            graph[u].append(v)
            graph[v].append(u)
    return graph, labels[0]

# Step 1: Generate a random graph
graph, start_node = generate_random_graph()
print(f"Random Graph Adjacency List: {dict(graph)}")

# Step 2: Execute BFS Traversal
print(f"BFS Traversal starting from {start_node}:")
bfs(graph, start_node)`,
    javascript: `function bfs(graph, start) {
    // Step 3: Initialize visited set and queue
    const visited = new Set([start]);
    const queue = [start];
    const result = [];
    
    // Step 4: Loop until queue is empty
    while (queue.length > 0) {
        // Step 5: Dequeue a vertex and process it
        const vertex = queue.shift();
        result.push(vertex);
        
        // Step 6: Get all adjacent vertices. If not visited, mark as visited and enqueue
        for (const neighbour of graph[vertex] || []) {
            if (!visited.has(neighbour)) {
                visited.add(neighbour);
                queue.push(neighbour);
            }
        }
    }
    return result;
}

function generateRandomGraph(numNodes = 6, numEdges = 8) {
    const graph = {};
    const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].slice(0, numNodes);
    
    for (let i = 0; i < numEdges; i++) {
        const u = labels[Math.floor(Math.random() * labels.length)];
        let v = labels[Math.floor(Math.random() * labels.length)];
        while(v === u) v = labels[Math.floor(Math.random() * labels.length)];
        
        if (!graph[u]) graph[u] = [];
        if (!graph[v]) graph[v] = [];
        if (!graph[u].includes(v)) {
            graph[u].push(v);
            graph[v].push(u);
        }
    }
    return { graph, startNode: labels[0] };
}

// Step 1: Generate a random graph
const { graph, startNode } = generateRandomGraph();
console.log("Random Graph Adjacency List:", graph);

// Step 2: Execute BFS Traversal
console.log("BFS Traversal starting from " + startNode + ":", bfs(graph, startNode).join(" "));`,
    cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>
#include <unordered_set>
#include <cstdlib>
#include <ctime>
using namespace std;

void bfs(unordered_map<string, vector<string>>& graph, string start) {
    // Step 3: Initialize visited set and queue
    unordered_set<string> visited;
    queue<string> q;
    
    visited.insert(start);
    q.push(start);
    
    // Step 4: Loop until queue is empty
    while (!q.empty()) {
        // Step 5: Dequeue a vertex and print it
        string vertex = q.front();
        q.pop();
        cout << vertex << " ";
        
        // Step 6: Get all adjacent vertices. If not visited, mark as visited and enqueue
        for (string neighbour : graph[vertex]) {
            if (visited.find(neighbour) == visited.end()) {
                visited.insert(neighbour);
                q.push(neighbour);
            }
        }
    }
}

int main() {
    srand(time(0));
    unordered_map<string, vector<string>> graph;
    vector<string> labels = {"A", "B", "C", "D", "E", "F"};
    
    // Step 1: Generate a random graph
    for(int i=0; i<8; i++) {
        string u = labels[rand() % labels.size()];
        string v = labels[rand() % labels.size()];
        if(u != v) {
            graph[u].push_back(v);
            graph[v].push_back(u);
        }
    }
    
    // Step 2: Execute BFS Traversal
    cout << "BFS Traversal starting from A: ";
    bfs(graph, "A");
    cout << endl;
    return 0;
}`
  },
  dfs: {
    python: `import random
from collections import defaultdict

def dfs(graph, start, visited=None):
    // Step 3: Initialize visited set if it's the first call
    if visited is None:
        visited = set()
    
    // Step 4: Mark the current node as visited and print it
    visited.add(start)
    print(start, end=" ")
    
    // Step 5: Recur for all vertices adjacent to this vertex
    for neighbour in graph[start]:
        if neighbour not in visited:
            dfs(graph, neighbour, visited)

def generate_random_graph(num_nodes=6, num_edges=8):
    graph = defaultdict(list)
    labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'][:num_nodes]
    
    for _ in range(num_edges):
        u, v = random.sample(labels, 2)
        if v not in graph[u]:
            graph[u].append(v)
            graph[v].append(u)
    return graph, labels[0]

# Step 1: Generate a random graph
graph, start_node = generate_random_graph()
print(f"Random Graph Adjacency List: {dict(graph)}")

# Step 2: Execute DFS Traversal
print(f"DFS Traversal starting from {start_node}:")
dfs(graph, start_node)`,
    javascript: `function dfs(graph, start, visited = new Set(), result = []) {
    // Step 3: Mark the current node as visited and store it
    visited.add(start);
    result.push(start);
    
    // Step 4: Recur for all vertices adjacent to this vertex
    for (const neighbour of graph[start] || []) {
        if (!visited.has(neighbour)) {
            dfs(graph, neighbour, visited, result);
        }
    }
    return result;
}

function generateRandomGraph(numNodes = 6, numEdges = 8) {
    const graph = {};
    const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].slice(0, numNodes);
    
    for (let i = 0; i < numEdges; i++) {
        const u = labels[Math.floor(Math.random() * labels.length)];
        let v = labels[Math.floor(Math.random() * labels.length)];
        while(v === u) v = labels[Math.floor(Math.random() * labels.length)];
        
        if (!graph[u]) graph[u] = [];
        if (!graph[v]) graph[v] = [];
        if (!graph[u].includes(v)) {
            graph[u].push(v);
            graph[v].push(u);
        }
    }
    return { graph, startNode: labels[0] };
}

// Step 1: Generate a random graph
const { graph, startNode } = generateRandomGraph();
console.log("Random Graph Adjacency List:", graph);

// Step 2: Execute DFS Traversal
console.log("DFS Traversal starting from " + startNode + ":", dfs(graph, startNode).join(" "));`,
    cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <cstdlib>
#include <ctime>
using namespace std;

void dfs(unordered_map<string, vector<string>>& graph, string start, unordered_set<string>& visited) {
    // Step 3: Mark the current node as visited and print it
    visited.insert(start);
    cout << start << " ";
    
    // Step 4: Recur for all vertices adjacent to this vertex
    for (string neighbour : graph[start]) {
        if (visited.find(neighbour) == visited.end()) {
            dfs(graph, neighbour, visited);
        }
    }
}

int main() {
    srand(time(0));
    unordered_map<string, vector<string>> graph;
    vector<string> labels = {"A", "B", "C", "D", "E", "F"};
    
    // Step 1: Generate a random graph
    for(int i=0; i<8; i++) {
        string u = labels[rand() % labels.size()];
        string v = labels[rand() % labels.size()];
        if(u != v) {
            graph[u].push_back(v);
            graph[v].push_back(u);
        }
    }
    
    unordered_set<string> visited;
    // Step 2: Execute DFS Traversal
    cout << "DFS Traversal starting from A: ";
    dfs(graph, "A", visited);
    cout << endl;
    return 0;
}`
  },
  array: {
    python: `import random

# Step 1: Initialize a random array
arr = [random.randint(1, 100) for _ in range(5)]
print(f"Original Array: {arr}")

# Step 2: Perform Array Insertion
idx = random.randint(0, len(arr))
val = random.randint(1, 100)
arr.insert(idx, val)
print(f"After inserting {val} at index {idx}: {arr}")

# Step 3: Perform Array Deletion
if len(arr) > 0:
    del_idx = random.randint(0, len(arr)-1)
    removed = arr.pop(del_idx)
    print(f"After removing element {removed} at index {del_idx}: {arr}")

# Step 4: Perform Array Access
if len(arr) > 0:
    acc_idx = random.randint(0, len(arr)-1)
    print(f"Element at index {acc_idx}: {arr[acc_idx]}")`,
    javascript: `// Step 1: Initialize a random array
let arr = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100) + 1);
console.log("Original Array:", arr);

// Step 2: Perform Array Insertion
let idx = Math.floor(Math.random() * (arr.length + 1));
let val = Math.floor(Math.random() * 100) + 1;
arr.splice(idx, 0, val);
console.log(\`After inserting \${val} at index \${idx}:\`, arr);

// Step 3: Perform Array Deletion
if (arr.length > 0) {
    let delIdx = Math.floor(Math.random() * arr.length);
    let removed = arr.splice(delIdx, 1)[0];
    console.log(\`After removing element \${removed} at index \${delIdx}:\`, arr);
}

// Step 4: Perform Array Access
if (arr.length > 0) {
    let accIdx = Math.floor(Math.random() * arr.length);
    console.log(\`Element at index \${accIdx}:\`, arr[accIdx]);
}`,
    cpp: `#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    srand(time(0));
    
    // Step 1: Initialize a random array (Using vector for dynamic array behavior)
    vector<int> arr(5);
    cout << "Original array: ";
    for(int i=0; i<5; i++) {
        arr[i] = rand() % 100 + 1;
        cout << arr[i] << " ";
    }
    cout << "\\n";

    // Step 2: Perform Array Insertion
    int idx = rand() % (arr.size() + 1);
    int val = rand() % 100 + 1;
    arr.insert(arr.begin() + idx, val);
    
    cout << "After inserting " << val << " at index " << idx << ": ";
    for(int num : arr) cout << num << " ";
    cout << "\\n";

    // Step 3: Perform Array Deletion
    if(arr.size() > 0) {
        int del_idx = rand() % arr.size();
        int removed = arr[del_idx];
        arr.erase(arr.begin() + del_idx);
        cout << "After removing element " << removed << " at index " << del_idx << ": ";
        for(int num : arr) cout << num << " ";
        cout << "\\n";
    }
    
    // Step 4: Perform Array Access
    if (arr.size() > 0) {
        int acc_idx = rand() % arr.size();
        cout << "Element at index " << acc_idx << ": " << arr[acc_idx] << endl;
    }
    
    return 0;
}`
  },
  linked_list: {
    python: `import random

# Step 1: Define the Node structure
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

# Step 2: Define the LinkedList structure
class LinkedList:
    def __init__(self):
        self.head = None

    def insert(self, data):
        new_node = Node(data)
        # Step 3: If list is empty, make new node the head
        if not self.head:
            self.head = new_node
            return
        # Step 4: Traverse to the last node and link the new node
        last = self.head
        while last.next:
            last = last.next
        last.next = new_node

    def display(self):
        # Step 5: Traverse and print each node
        temp = self.head
        while temp:
            print(temp.data, end=" -> ")
            temp = temp.next
        print("None")

# Step 6: Initialize list and insert elements
print("Initializing random linked list...")
ll = LinkedList()
for _ in range(5):
    ll.insert(random.randint(1, 100))

print("Linked List structure:")
ll.display()`,
    javascript: `// Step 1: Define the Node structure
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// Step 2: Define the LinkedList structure
class LinkedList {
    constructor() {
        this.head = null;
    }

    insert(data) {
        let newNode = new Node(data);
        // Step 3: If list is empty, make new node the head
        if (!this.head) {
            this.head = newNode;
            return;
        }
        // Step 4: Traverse to the last node and link the new node
        let last = this.head;
        while (last.next) {
            last = last.next;
        }
        last.next = newNode;
    }

    display() {
        // Step 5: Traverse and print each node
        let temp = this.head;
        let result = [];
        while (temp) {
            result.push(temp.data);
            temp = temp.next;
        }
        console.log("Linked List structure:\\n" + result.join(" -> ") + " -> null");
    }
}

// Step 6: Initialize list and insert elements
console.log("Initializing random linked list...");
let ll = new LinkedList();
for(let i=0; i<5; i++) {
    ll.insert(Math.floor(Math.random() * 100) + 1);
}
ll.display();`,
    cpp: `#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

// Step 1: Define the Node structure
struct Node {
    int data;
    Node* next;
    Node(int d) : data(d), next(nullptr) {}
};

// Step 2: Define the LinkedList class
class LinkedList {
    Node* head;
public:
    LinkedList() : head(nullptr) {}
    
    void insert(int data) {
        Node* newNode = new Node(data);
        // Step 3: If list is empty, make new node the head
        if (!head) {
            head = newNode;
            return;
        }
        // Step 4: Traverse to the last node and link the new node
        Node* last = head;
        while (last->next) last = last->next;
        last->next = newNode;
    }
    
    void display() {
        // Step 5: Traverse and print each node
        Node* temp = head;
        while (temp) {
            cout << temp->data << " -> ";
            temp = temp->next;
        }
        cout << "null" << endl;
    }
};

int main() {
    srand(time(0));
    LinkedList ll;
    
    // Step 6: Initialize list and insert elements
    cout << "Initializing random linked list..." << endl;
    for(int i=0; i<5; i++) {
        ll.insert(rand() % 100 + 1);
    }
    
    cout << "Linked List structure:" << endl;
    ll.display();
    return 0;
}`
  }
};
