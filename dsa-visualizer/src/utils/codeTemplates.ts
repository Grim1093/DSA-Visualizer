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
}`,
    java: `import java.util.*;

public class Main {
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i;
        }
        return -1;
    }

    public static void main(String[] args) {
        Random rand = new Random();
        int[] arr = new int[10];
        for (int i = 0; i < 10; i++) arr[i] = rand.nextInt(100) + 1;
        
        int target = rand.nextBoolean() ? arr[rand.nextInt(10)] : rand.nextInt(100) + 1;
        
        System.out.println("Array: " + Arrays.toString(arr));
        System.out.println("Searching for: " + target);
        
        int result = linearSearch(arr, target);
        if (result != -1) {
            System.out.println("Target " + target + " found at index: " + result);
        } else {
            System.out.println("Target " + target + " not found in the array.");
        }
    }
}`,
    go: `package main

import (
	"fmt"
	"math/rand"
	"time"
)

func linearSearch(arr []int, target int) int {
	for i, val := range arr {
		if val == target {
			return i
		}
	}
	return -1
}

func main() {
	rand.Seed(time.Now().UnixNano())
	arr := make([]int, 10)
	for i := 0; i < 10; i++ {
		arr[i] = rand.Intn(100) + 1
	}

	var target int
	if rand.Intn(2) == 0 {
		target = arr[rand.Intn(10)]
	} else {
		target = rand.Intn(100) + 1
	}

	fmt.Println("Array:", arr)
	fmt.Println("Searching for:", target)

	result := linearSearch(arr, target)
	if result != -1 {
		fmt.Printf("Target %d found at index: %d\\n", target, result)
	} else {
		fmt.Printf("Target %d not found in the array.\\n", target)
	}
}`,
    kotlin: `import java.util.Random

fun linearSearch(arr: IntArray, target: Int): Int {
    for (i in arr.indices) {
        if (arr[i] == target) return i
    }
    return -1
}

fun main() {
    val rand = Random()
    val arr = IntArray(10) { rand.nextInt(100) + 1 }
    val target = if (rand.nextBoolean()) arr[rand.nextInt(10)] else rand.nextInt(100) + 1
    
    println("Array: \${arr.joinToString(", ")}")
    println("Searching for: $target")
    
    val result = linearSearch(arr, target)
    if (result != -1) {
        println("Target $target found at index: $result")
    } else {
        println("Target $target not found in the array.")
    }
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
}`,
    java: `import java.util.*;

public class Main {
    public static int binarySearch(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        Random rand = new Random();
        int[] arr = new int[10];
        for (int i = 0; i < 10; i++) arr[i] = rand.nextInt(100) + 1;
        Arrays.sort(arr);
        
        int target = rand.nextBoolean() ? arr[rand.nextInt(10)] : rand.nextInt(100) + 1;
        
        System.out.println("Sorted Array: " + Arrays.toString(arr));
        System.out.println("Searching for: " + target);
        
        int result = binarySearch(arr, target);
        if (result != -1) {
            System.out.println("Target " + target + " found at index: " + result);
        } else {
            System.out.println("Target " + target + " not found in the array.");
        }
    }
}`,
    go: `package main

import (
	"fmt"
	"math/rand"
	"sort"
	"time"
)

func binarySearch(arr []int, target int) int {
	left, right := 0, len(arr)-1
	for left <= right {
		mid := left + (right-left)/2
		if arr[mid] == target {
			return mid
		}
		if arr[mid] < target {
			left = mid + 1
		} else {
			right = mid - 1
		}
	}
	return -1
}

func main() {
	rand.Seed(time.Now().UnixNano())
	arr := make([]int, 10)
	for i := 0; i < 10; i++ {
		arr[i] = rand.Intn(100) + 1
	}
	sort.Ints(arr)

	var target int
	if rand.Intn(2) == 0 {
		target = arr[rand.Intn(10)]
	} else {
		target = rand.Intn(100) + 1
	}

	fmt.Println("Sorted Array:", arr)
	fmt.Println("Searching for:", target)

	result := binarySearch(arr, target)
	if result != -1 {
		fmt.Printf("Target %d found at index: %d\\n", target, result)
	} else {
		fmt.Printf("Target %d not found in the array.\\n", target)
	}
}`,
    kotlin: `import java.util.Random
import java.util.Arrays

fun binarySearch(arr: IntArray, target: Int): Int {
    var left = 0
    var right = arr.size - 1
    while (left <= right) {
        val mid = left + (right - left) / 2
        if (arr[mid] == target) return mid
        if (arr[mid] < target) left = mid + 1
        else right = mid - 1
    }
    return -1
}

fun main() {
    val rand = Random()
    val arr = IntArray(10) { rand.nextInt(100) + 1 }
    arr.sort()
    
    val target = if (rand.nextBoolean()) arr[rand.nextInt(10)] else rand.nextInt(100) + 1
    
    println("Sorted Array: \${arr.joinToString(", ")}")
    println("Searching for: $target")
    
    val result = binarySearch(arr, target)
    if (result != -1) {
        println("Target $target found at index: $result")
    } else {
        println("Target $target not found in the array.")
    }
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
}`,
    java: `import java.util.*;

public class Main {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    public static void main(String[] args) {
        Random rand = new Random();
        int[] arr = new int[10];
        for (int i = 0; i < 10; i++) arr[i] = rand.nextInt(100) + 1;
        
        System.out.println("Original Array: " + Arrays.toString(arr));
        bubbleSort(arr);
        System.out.println("Sorted Array:   " + Arrays.toString(arr));
    }
}`,
    go: `package main

import (
	"fmt"
	"math/rand"
	"time"
)

func bubbleSort(arr []int) {
	n := len(arr)
	for i := 0; i < n-1; i++ {
		for j := 0; j < n-i-1; j++ {
			if arr[j] > arr[j+1] {
				arr[j], arr[j+1] = arr[j+1], arr[j]
			}
		}
	}
}

func main() {
	rand.Seed(time.Now().UnixNano())
	arr := make([]int, 10)
	for i := 0; i < 10; i++ {
		arr[i] = rand.Intn(100) + 1
	}

	fmt.Println("Original Array:", arr)
	bubbleSort(arr)
	fmt.Println("Sorted Array:  ", arr)
}`,
    kotlin: `import java.util.Random

fun bubbleSort(arr: IntArray) {
    val n = arr.size
    for (i in 0 until n - 1) {
        for (j in 0 until n - i - 1) {
            if (arr[j] > arr[j + 1]) {
                val temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
}

fun main() {
    val rand = Random()
    val arr = IntArray(10) { rand.nextInt(100) + 1 }
    
    println("Original Array: \${arr.joinToString(", ")}")
    bubbleSort(arr)
    println("Sorted Array:   \${arr.joinToString(", ")}")
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
}`,
    java: `import java.util.*;

public class Main {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) minIdx = j;
            }
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }

    public static void main(String[] args) {
        Random rand = new Random();
        int[] arr = new int[10];
        for (int i = 0; i < 10; i++) arr[i] = rand.nextInt(100) + 1;
        
        System.out.println("Original Array: " + Arrays.toString(arr));
        selectionSort(arr);
        System.out.println("Sorted Array:   " + Arrays.toString(arr));
    }
}`,
    go: `package main

import (
	"fmt"
	"math/rand"
	"time"
)

func selectionSort(arr []int) {
	n := len(arr)
	for i := 0; i < n-1; i++ {
		minIdx := i
		for j := i + 1; j < n; j++ {
			if arr[j] < arr[minIdx] {
				minIdx = j
			}
		}
		arr[i], arr[minIdx] = arr[minIdx], arr[i]
	}
}

func main() {
	rand.Seed(time.Now().UnixNano())
	arr := make([]int, 10)
	for i := 0; i < 10; i++ {
		arr[i] = rand.Intn(100) + 1
	}

	fmt.Println("Original Array:", arr)
	selectionSort(arr)
	fmt.Println("Sorted Array:  ", arr)
}`,
    kotlin: `import java.util.Random

fun selectionSort(arr: IntArray) {
    val n = arr.size
    for (i in 0 until n - 1) {
        var minIdx = i
        for (j in i + 1 until n) {
            if (arr[j] < arr[minIdx]) minIdx = j
        }
        val temp = arr[minIdx]
        arr[minIdx] = arr[i]
        arr[i] = temp
    }
}

fun main() {
    val rand = Random()
    val arr = IntArray(10) { rand.nextInt(100) + 1 }
    
    println("Original Array: \${arr.joinToString(", ")}")
    selectionSort(arr)
    println("Sorted Array:   \${arr.joinToString(", ")}")
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
}`,
    java: `import java.util.*;

public class Main {
    public static void insertionSort(int[] arr) {
        int n = arr.length;
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }

    public static void main(String[] args) {
        Random rand = new Random();
        int[] arr = new int[10];
        for (int i = 0; i < 10; i++) arr[i] = rand.nextInt(100) + 1;
        
        System.out.println("Original Array: " + Arrays.toString(arr));
        insertionSort(arr);
        System.out.println("Sorted Array:   " + Arrays.toString(arr));
    }
}`,
    go: `package main

import (
	"fmt"
	"math/rand"
	"time"
)

func insertionSort(arr []int) {
	n := len(arr)
	for i := 1; i < n; i++ {
		key := arr[i]
		j := i - 1
		for j >= 0 && arr[j] > key {
			arr[j+1] = arr[j]
			j = j - 1
		}
		arr[j+1] = key
	}
}

func main() {
	rand.Seed(time.Now().UnixNano())
	arr := make([]int, 10)
	for i := 0; i < 10; i++ {
		arr[i] = rand.Intn(100) + 1
	}

	fmt.Println("Original Array:", arr)
	insertionSort(arr)
	fmt.Println("Sorted Array:  ", arr)
}`,
    kotlin: `import java.util.Random

fun insertionSort(arr: IntArray) {
    val n = arr.size
    for (i in 1 until n) {
        val key = arr[i]
        var j = i - 1
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j]
            j -= 1
        }
        arr[j + 1] = key
    }
}

fun main() {
    val rand = Random()
    val arr = IntArray(10) { rand.nextInt(100) + 1 }
    
    println("Original Array: \${arr.joinToString(", ")}")
    insertionSort(arr)
    println("Sorted Array:   \${arr.joinToString(", ")}")
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
}`,
    java: `import java.util.*;

public class Main {
    public static void merge(int[] arr, int l, int m, int r) {
        int n1 = m - l + 1;
        int n2 = r - m;
        int[] L = new int[n1];
        int[] R = new int[n2];
        
        for (int i = 0; i < n1; ++i) L[i] = arr[l + i];
        for (int j = 0; j < n2; ++j) R[j] = arr[m + 1 + j];
        
        int i = 0, j = 0, k = l;
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
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }

    public static void mergeSort(int[] arr, int l, int r) {
        if (l < r) {
            int m = l + (r - l) / 2;
            mergeSort(arr, l, m);
            mergeSort(arr, m + 1, r);
            merge(arr, l, m, r);
        }
    }

    public static void main(String[] args) {
        Random rand = new Random();
        int[] arr = new int[10];
        for (int i = 0; i < 10; i++) arr[i] = rand.nextInt(100) + 1;
        
        System.out.println("Original Array: " + Arrays.toString(arr));
        mergeSort(arr, 0, arr.length - 1);
        System.out.println("Sorted Array:   " + Arrays.toString(arr));
    }
}`,
    go: `package main

import (
	"fmt"
	"math/rand"
	"time"
)

func merge(arr []int, l int, m int, r int) {
	n1 := m - l + 1
	n2 := r - m
	L := make([]int, n1)
	R := make([]int, n2)

	for i := 0; i < n1; i++ {
		L[i] = arr[l+i]
	}
	for j := 0; j < n2; j++ {
		R[j] = arr[m+1+j]
	}

	i, j, k := 0, 0, l
	for i < n1 && j < n2 {
		if L[i] <= R[j] {
			arr[k] = L[i]
			i++
		} else {
			arr[k] = R[j]
			j++
		}
		k++
	}

	for i < n1 {
		arr[k] = L[i]
		i++
		k++
	}
	for j < n2 {
		arr[k] = R[j]
		j++
		k++
	}
}

func mergeSort(arr []int, l int, r int) {
	if l < r {
		m := l + (r-l)/2
		mergeSort(arr, l, m)
		mergeSort(arr, m+1, r)
		merge(arr, l, m, r)
	}
}

func main() {
	rand.Seed(time.Now().UnixNano())
	arr := make([]int, 10)
	for i := 0; i < 10; i++ {
		arr[i] = rand.Intn(100) + 1
	}

	fmt.Println("Original Array:", arr)
	mergeSort(arr, 0, len(arr)-1)
	fmt.Println("Sorted Array:  ", arr)
}`,
    kotlin: `import java.util.Random

fun merge(arr: IntArray, l: Int, m: Int, r: Int) {
    val n1 = m - l + 1
    val n2 = r - m
    val L = IntArray(n1)
    val R = IntArray(n2)
    
    for (i in 0 until n1) L[i] = arr[l + i]
    for (j in 0 until n2) R[j] = arr[m + 1 + j]
    
    var i = 0
    var j = 0
    var k = l
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i]
            i++
        } else {
            arr[k] = R[j]
            j++
        }
        k++
    }
    while (i < n1) {
        arr[k] = L[i]
        i++
        k++
    }
    while (j < n2) {
        arr[k] = R[j]
        j++
        k++
    }
}

fun mergeSort(arr: IntArray, l: Int, r: Int) {
    if (l < r) {
        val m = l + (r - l) / 2
        mergeSort(arr, l, m)
        mergeSort(arr, m + 1, r)
        merge(arr, l, m, r)
    }
}

fun main() {
    val rand = Random()
    val arr = IntArray(10) { rand.nextInt(100) + 1 }
    
    println("Original Array: \${arr.joinToString(", ")}")
    mergeSort(arr, 0, arr.size - 1)
    println("Sorted Array:   \${arr.joinToString(", ")}")
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
}`,
    java: `import java.util.*;

public class Main {
    public static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = (low - 1);
        for (int j = low; j <= high - 1; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return (i + 1);
    }

    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    public static void main(String[] args) {
        Random rand = new Random();
        int[] arr = new int[10];
        for (int i = 0; i < 10; i++) arr[i] = rand.nextInt(100) + 1;
        
        System.out.println("Original Array: " + Arrays.toString(arr));
        quickSort(arr, 0, arr.length - 1);
        System.out.println("Sorted Array:   " + Arrays.toString(arr));
    }
}`,
    go: `package main

import (
	"fmt"
	"math/rand"
	"time"
)

func partition(arr []int, low, high int) int {
	pivot := arr[high]
	i := low - 1
	for j := low; j <= high-1; j++ {
		if arr[j] < pivot {
			i++
			arr[i], arr[j] = arr[j], arr[i]
		}
	}
	arr[i+1], arr[high] = arr[high], arr[i+1]
	return i + 1
}

func quickSort(arr []int, low, high int) {
	if low < high {
		pi := partition(arr, low, high)
		quickSort(arr, low, pi-1)
		quickSort(arr, pi+1, high)
	}
}

func main() {
	rand.Seed(time.Now().UnixNano())
	arr := make([]int, 10)
	for i := 0; i < 10; i++ {
		arr[i] = rand.Intn(100) + 1
	}

	fmt.Println("Original Array:", arr)
	quickSort(arr, 0, len(arr)-1)
	fmt.Println("Sorted Array:  ", arr)
}`,
    kotlin: `import java.util.Random

fun partition(arr: IntArray, low: Int, high: Int): Int {
    val pivot = arr[high]
    var i = (low - 1)
    for (j in low until high) {
        if (arr[j] < pivot) {
            i++
            val temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
    }
    val temp = arr[i + 1]
    arr[i + 1] = arr[high]
    arr[high] = temp
    return (i + 1)
}

fun quickSort(arr: IntArray, low: Int, high: Int) {
    if (low < high) {
        val pi = partition(arr, low, high)
        quickSort(arr, low, pi - 1)
        quickSort(arr, pi + 1, high)
    }
}

fun main() {
    val rand = Random()
    val arr = IntArray(10) { rand.nextInt(100) + 1 }
    
    println("Original Array: \${arr.joinToString(", ")}")
    quickSort(arr, 0, arr.size - 1)
    println("Sorted Array:   \${arr.joinToString(", ")}")
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
  },
  dijkstra: {
    python: `import heapq

def dijkstra(graph, start):
    distances = {node: float('infinity') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    
    while pq:
        current_distance, current_node = heapq.heappop(pq)
        
        if current_distance > distances[current_node]:
            continue
            
        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
                
    return distances

graph = {
    'A': {'B': 4, 'C': 2},
    'B': {'A': 4, 'C': 5, 'D': 10},
    'C': {'A': 2, 'B': 5, 'D': 3},
    'D': {'B': 10, 'C': 3}
}
print("Shortest distances from A:", dijkstra(graph, 'A'))`,
    javascript: `function dijkstra(graph, start) {
    const distances = {};
    const visited = new Set();
    const pq = [];
    
    for (const node in graph) distances[node] = Infinity;
    distances[start] = 0;
    pq.push({ node: start, dist: 0 });
    
    while (pq.length > 0) {
        pq.sort((a, b) => a.dist - b.dist);
        const { node: u, dist } = pq.shift();
        
        if (visited.has(u)) continue;
        visited.add(u);
        
        for (const neighbor in graph[u]) {
            const weight = graph[u][neighbor];
            if (dist + weight < distances[neighbor]) {
                distances[neighbor] = dist + weight;
                pq.push({ node: neighbor, dist: distances[neighbor] });
            }
        }
    }
    return distances;
}

const graph = {
    'A': {'B': 4, 'C': 2},
    'B': {'A': 4, 'C': 5, 'D': 10},
    'C': {'A': 2, 'B': 5, 'D': 3},
    'D': {'B': 10, 'C': 3}
};
console.log("Shortest distances from A:", dijkstra(graph, 'A'));`,
    cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>
using namespace std;

void dijkstra(unordered_map<char, vector<pair<char, int>>>& graph, char start) {
    unordered_map<char, int> distances;
    for (auto& pair : graph) distances[pair.first] = 1e9;
    distances[start] = 0;
    
    priority_queue<pair<int, char>, vector<pair<int, char>>, greater<pair<int, char>>> pq;
    pq.push({0, start});
    
    while (!pq.empty()) {
        int dist = pq.top().first;
        char u = pq.top().second;
        pq.pop();
        
        if (dist > distances[u]) continue;
        
        for (auto& neighbor : graph[u]) {
            char v = neighbor.first;
            int weight = neighbor.second;
            if (distances[u] + weight < distances[v]) {
                distances[v] = distances[u] + weight;
                pq.push({distances[v], v});
            }
        }
    }
    
    cout << "Shortest distances from " << start << ":" << endl;
    for (auto& pair : distances) {
        cout << pair.first << " : " << pair.second << endl;
    }
}

int main() {
    unordered_map<char, vector<pair<char, int>>> graph;
    graph['A'] = {{'B', 4}, {'C', 2}};
    graph['B'] = {{'A', 4}, {'C', 5}, {'D', 10}};
    graph['C'] = {{'A', 2}, {'B', 5}, {'D', 3}};
    graph['D'] = {{'B', 10}, {'C', 3}};
    dijkstra(graph, 'A');
    return 0;
}`,
    java: `import java.util.*;

public class Main {
    public static void dijkstra(Map<Character, Map<Character, Integer>> graph, char start) {
        Map<Character, Integer> distances = new HashMap<>();
        for (char node : graph.keySet()) distances.put(node, Integer.MAX_VALUE);
        distances.put(start, 0);
        
        PriorityQueue<char[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));
        pq.offer(new char[]{start, 0});
        
        while (!pq.isEmpty()) {
            char[] current = pq.poll();
            char u = current[0];
            int dist = current[1];
            
            if (dist > distances.get(u)) continue;
            
            for (Map.Entry<Character, Integer> neighbor : graph.get(u).entrySet()) {
                char v = neighbor.getKey();
                int weight = neighbor.getValue();
                if (distances.get(u) + weight < distances.get(v)) {
                    distances.put(v, distances.get(u) + weight);
                    pq.offer(new char[]{v, distances.get(v)});
                }
            }
        }
        
        System.out.println("Shortest distances from " + start + ": " + distances);
    }
    
    public static void main(String[] args) {
        Map<Character, Map<Character, Integer>> graph = new HashMap<>();
        graph.put('A', Map.of('B', 4, 'C', 2));
        graph.put('B', Map.of('A', 4, 'C', 5, 'D', 10));
        graph.put('C', Map.of('A', 2, 'B', 5, 'D', 3));
        graph.put('D', Map.of('B', 10, 'C', 3));
        dijkstra(graph, 'A');
    }
}`,
    go: `package main

import (
	"fmt"
	"math"
)

func dijkstra(graph map[string]map[string]int, start string) {
	distances := make(map[string]int)
	for node := range graph {
		distances[node] = math.MaxInt32
	}
	distances[start] = 0
	visited := make(map[string]bool)

	for i := 0; i < len(graph); i++ {
		minDist := math.MaxInt32
		var u string
		for node, dist := range distances {
			if !visited[node] && dist < minDist {
				minDist = dist
				u = node
			}
		}

		if u == "" {
			break
		}
		visited[u] = true

		for v, weight := range graph[u] {
			if distances[u]+weight < distances[v] {
				distances[v] = distances[u] + weight
			}
		}
	}

	fmt.Println("Shortest distances from", start, ":", distances)
}

func main() {
	graph := map[string]map[string]int{
		"A": {"B": 4, "C": 2},
		"B": {"A": 4, "C": 5, "D": 10},
		"C": {"A": 2, "B": 5, "D": 3},
		"D": {"B": 10, "C": 3},
	}
	dijkstra(graph, "A")
}`,
    kotlin: `import java.util.PriorityQueue

fun dijkstra(graph: Map<Char, Map<Char, Int>>, start: Char) {
    val distances = mutableMapOf<Char, Int>()
    for (node in graph.keys) distances[node] = Int.MAX_VALUE
    distances[start] = 0
    
    val pq = PriorityQueue<Pair<Char, Int>>(compareBy { it.second })
    pq.add(Pair(start, 0))
    
    while (pq.isNotEmpty()) {
        val (u, dist) = pq.poll()
        if (dist > distances[u]!!) continue
        
        for ((v, weight) in graph[u]!!) {
            if (distances[u]!! + weight < distances[v]!!) {
                distances[v] = distances[u]!! + weight
                pq.add(Pair(v, distances[v]!!))
            }
        }
    }
    
    println("Shortest distances from $start: $distances")
}

fun main() {
    val graph = mapOf(
        'A' to mapOf('B' to 4, 'C' to 2),
        'B' to mapOf('A' to 4, 'C' to 5, 'D' to 10),
        'C' to mapOf('A' to 2, 'B' to 5, 'D' to 3),
        'D' to mapOf('B' to 10, 'C' to 3)
    )
    dijkstra(graph, 'A')
}`
  },
  dp: {
    python: `def fib(n, memo={}):
    if n in memo: return memo[n]
    if n <= 1: return n
    memo[n] = fib(n-1, memo) + fib(n-2, memo)
    return memo[n]

print("Fibonacci(10) =", fib(10))`,
    javascript: `function fib(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}
console.log("Fibonacci(10) =", fib(10));`,
    cpp: `#include <iostream>
#include <unordered_map>
using namespace std;

unordered_map<int, int> memo;
int fib(int n) {
    if (memo.count(n)) return memo[n];
    if (n <= 1) return n;
    return memo[n] = fib(n - 1) + fib(n - 2);
}

int main() {
    cout << "Fibonacci(10) = " << fib(10) << endl;
    return 0;
}`,
    java: `import java.util.*;

public class Main {
    static Map<Integer, Integer> memo = new HashMap<>();
    public static int fib(int n) {
        if (memo.containsKey(n)) return memo.get(n);
        if (n <= 1) return n;
        int res = fib(n - 1) + fib(n - 2);
        memo.put(n, res);
        return res;
    }
    public static void main(String[] args) {
        System.out.println("Fibonacci(10) = " + fib(10));
    }
}`,
    go: `package main
import "fmt"

var memo = make(map[int]int)
func fib(n int) int {
	if val, ok := memo[n]; ok {
		return val
	}
	if n <= 1 {
		return n
	}
	memo[n] = fib(n-1) + fib(n-2)
	return memo[n]
}
func main() {
	fmt.Println("Fibonacci(10) =", fib(10))
}`,
    kotlin: `fun fib(n: Int, memo: MutableMap<Int, Int> = mutableMapOf()): Int {
    if (memo.containsKey(n)) return memo[n]!!
    if (n <= 1) return n
    val res = fib(n - 1, memo) + fib(n - 2, memo)
    memo[n] = res
    return res
}
fun main() {
    println("Fibonacci(10) = \${fib(10)}")
}`
  },
  heap: {
    python: `import heapq

class MaxHeap:
    def __init__(self):
        self.heap = []
    def push(self, val):
        heapq.heappush(self.heap, -val)
    def pop(self):
        return -heapq.heappop(self.heap) if self.heap else None

h = MaxHeap()
for v in [3, 1, 4, 1, 5, 9]: h.push(v)
print("Popped from Max Heap:", h.pop())
print("Popped from Max Heap:", h.pop())`,
    javascript: `class MaxHeap {
    constructor() { this.heap = []; }
    push(val) {
        this.heap.push(val);
        this.heap.sort((a, b) => b - a); // naive
    }
    pop() { return this.heap.shift(); }
}
const h = new MaxHeap();
[3, 1, 4, 1, 5, 9].forEach(v => h.push(v));
console.log("Popped from Max Heap:", h.pop());
console.log("Popped from Max Heap:", h.pop());`,
    cpp: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    priority_queue<int> h;
    vector<int> vals = {3, 1, 4, 1, 5, 9};
    for(int v : vals) h.push(v);
    
    cout << "Popped from Max Heap: " << h.top() << endl; h.pop();
    cout << "Popped from Max Heap: " << h.top() << endl; h.pop();
    return 0;
}`,
    java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        PriorityQueue<Integer> h = new PriorityQueue<>(Collections.reverseOrder());
        int[] vals = {3, 1, 4, 1, 5, 9};
        for (int v : vals) h.offer(v);
        
        System.out.println("Popped from Max Heap: " + h.poll());
        System.out.println("Popped from Max Heap: " + h.poll());
    }
}`,
    go: `package main
import (
	"container/heap"
	"fmt"
)

type MaxHeap []int
func (h MaxHeap) Len() int           { return len(h) }
func (h MaxHeap) Less(i, j int) bool { return h[i] > h[j] }
func (h MaxHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *MaxHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

func main() {
	h := &MaxHeap{}
	heap.Init(h)
	for _, v := range []int{3, 1, 4, 1, 5, 9} {
		heap.Push(h, v)
	}
	fmt.Println("Popped from Max Heap:", heap.Pop(h))
	fmt.Println("Popped from Max Heap:", heap.Pop(h))
}`,
    kotlin: `import java.util.PriorityQueue

fun main() {
    val h = PriorityQueue<Int>(compareByDescending { it })
    val vals = listOf(3, 1, 4, 1, 5, 9)
    for (v in vals) h.add(v)
    
    println("Popped from Max Heap: \${h.poll()}")
    println("Popped from Max Heap: \${h.poll()}")
}`
  },
  stack: {
    python: `stack = []
stack.append(1)
stack.append(2)
stack.append(3)
print("Stack:", stack)
print("Popped:", stack.pop())
print("Stack after pop:", stack)`,
    javascript: `const stack = [];
stack.push(1);
stack.push(2);
stack.push(3);
console.log("Stack:", stack);
console.log("Popped:", stack.pop());
console.log("Stack after pop:", stack);`,
    cpp: `#include <iostream>
#include <stack>
using namespace std;

int main() {
    stack<int> s;
    s.push(1); s.push(2); s.push(3);
    cout << "Top: " << s.top() << endl;
    int popped = s.top(); s.pop();
    cout << "Popped: " << popped << endl;
    return 0;
}`,
    java: `import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        Stack<Integer> s = new Stack<>();
        s.push(1); s.push(2); s.push(3);
        System.out.println("Stack: " + s);
        System.out.println("Popped: " + s.pop());
        System.out.println("Stack after pop: " + s);
    }
}`,
    go: `package main
import "fmt"

func main() {
	var stack []int
	stack = append(stack, 1)
	stack = append(stack, 2)
	stack = append(stack, 3)
	fmt.Println("Stack:", stack)
	
	popped := stack[len(stack)-1]
	stack = stack[:len(stack)-1]
	fmt.Println("Popped:", popped)
	fmt.Println("Stack after pop:", stack)
}`,
    kotlin: `fun main() {
    val stack = ArrayDeque<Int>()
    stack.addLast(1)
    stack.addLast(2)
    stack.addLast(3)
    println("Stack: $stack")
    println("Popped: \${stack.removeLast()}")
    println("Stack after pop: $stack")
}`
  },
  queue: {
    python: `from collections import deque
queue = deque()
queue.append(1)
queue.append(2)
queue.append(3)
print("Queue:", list(queue))
print("Dequeued:", queue.popleft())
print("Queue after dequeue:", list(queue))`,
    javascript: `const queue = [];
queue.push(1);
queue.push(2);
queue.push(3);
console.log("Queue:", queue);
console.log("Dequeued:", queue.shift());
console.log("Queue after dequeue:", queue);`,
    cpp: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    q.push(1); q.push(2); q.push(3);
    cout << "Front: " << q.front() << endl;
    int dq = q.front(); q.pop();
    cout << "Dequeued: " << dq << endl;
    return 0;
}`,
    java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Queue<Integer> q = new LinkedList<>();
        q.offer(1); q.offer(2); q.offer(3);
        System.out.println("Queue: " + q);
        System.out.println("Dequeued: " + q.poll());
        System.out.println("Queue after dequeue: " + q);
    }
}`,
    go: `package main
import "fmt"

func main() {
	var queue []int
	queue = append(queue, 1)
	queue = append(queue, 2)
	queue = append(queue, 3)
	fmt.Println("Queue:", queue)
	
	dq := queue[0]
	queue = queue[1:]
	fmt.Println("Dequeued:", dq)
	fmt.Println("Queue after dequeue:", queue)
}`,
    kotlin: `fun main() {
    val queue = ArrayDeque<Int>()
    queue.addLast(1)
    queue.addLast(2)
    queue.addLast(3)
    println("Queue: $queue")
    println("Dequeued: \${queue.removeFirst()}")
    println("Queue after dequeue: $queue")
}`
  }
};
