"use client";

import React, { useEffect } from 'react';
import { logger } from '@/utils/logger';
import { useVisualizerStore } from '@/store/useVisualizerStore';

const theoryData = {
  bubble: {
    title: 'Bubble Sort',
    concept: 'Bubble Sort is a simple sorting algorithm that repeatedly steps through the input list element by element, comparing the current element with the one after it, swapping their values if needed. These passes through the list are repeated until no swaps had to be performed during a pass, meaning that the list has become fully sorted.',
    working: [
      'Start at the beginning of the array.',
      'Compare the first two elements.',
      'If the first is greater than the second, swap them.',
      'Move to the next pair of elements and repeat step 3.',
      'Continue until the end of the array. (The largest element will "bubble" to the end).',
      'Repeat the entire process for the remaining elements until the array is sorted.'
    ],
    timeBest: 'O(n) (Already sorted)',
    timeAverage: 'O(n²)',
    timeWorst: 'O(n²) (Reverse sorted)',
    space: 'O(1)',
    spaceDetail: 'Operates directly on the input array without requiring extra memory proportional to the input size.'
  },
  selection: {
    title: 'Selection Sort',
    concept: 'Selection Sort divides the input list into two parts: a sorted sublist of items which is built up from left to right at the front of the list, and a sublist of the remaining unsorted items that occupy the rest of the list. Initially, the sorted sublist is empty and the unsorted sublist is the entire input list. The algorithm proceeds by finding the smallest element in the unsorted sublist, exchanging it with the leftmost unsorted element, and moving the sublist boundaries one element to the right.',
    working: [
      'Set the first element as minimum.',
      'Compare minimum with the second element. If the second element is smaller than minimum, assign second element as minimum.',
      'Continue comparing minimum with the remaining elements until the end of the array is reached.',
      'Place the minimum at the front of the unsorted array.',
      'Repeat the process for the remaining unsorted array.'
    ],
    timeBest: 'O(n²)',
    timeAverage: 'O(n²)',
    timeWorst: 'O(n²)',
    space: 'O(1)',
    spaceDetail: 'Operates in-place. Only a single additional memory space is required for the temporary minimum variable.'
  },
  insertion: {
    title: 'Insertion Sort',
    concept: 'Insertion Sort builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. However, it provides several advantages such as being simple to implement, efficient for (quite) small data sets, and adaptive (i.e., efficient for data sets that are already substantially sorted).',
    working: [
      'Assume the first element is already sorted.',
      'Pick the next element and store it separately in a key.',
      'Compare the key with all elements in the sorted array.',
      'If the element in the sorted array is smaller than the current element, move to the next element. Else, shift greater elements to the right.',
      'Insert the value.',
      'Repeat until array is sorted.'
    ],
    timeBest: 'O(n) (Already sorted)',
    timeAverage: 'O(n²)',
    timeWorst: 'O(n²) (Reverse sorted)',
    space: 'O(1)',
    spaceDetail: 'Operates in-place.'
  },
  merge: {
    title: 'Merge Sort',
    concept: 'Merge Sort is a Divide and Conquer algorithm. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves. The merge() function is used for merging two halves.',
    working: [
      'Find the middle point to divide the array into two halves.',
      'Call mergeSort for first half.',
      'Call mergeSort for second half.',
      'Merge the two halves sorted in step 2 and 3.'
    ],
    timeBest: 'O(n log n)',
    timeAverage: 'O(n log n)',
    timeWorst: 'O(n log n)',
    space: 'O(n)',
    spaceDetail: 'Requires additional space to store the merged array.'
  },
  quick: {
    title: 'Quick Sort',
    concept: 'Quick Sort is a Divide and Conquer algorithm. It picks an element as a pivot and partitions the given array around the picked pivot. There are many different versions of quickSort that pick pivot in different ways (first, last, random, median).',
    working: [
      'Pick a pivot element from the array.',
      'Partition the array such that all elements smaller than the pivot are on the left and all elements greater than the pivot are on the right.',
      'Recursively apply the same process to the left and right sub-arrays.',
      'Combine the sorted sub-arrays.'
    ],
    timeBest: 'O(n log n)',
    timeAverage: 'O(n log n)',
    timeWorst: 'O(n²) (When array is already sorted and worst pivot chosen)',
    space: 'O(log n)',
    spaceDetail: 'Requires additional space for the recursive call stack.'
  },
  linear: {
    title: 'Linear Search',
    concept: 'Linear Search is the simplest searching algorithm. It sequentially checks each element of the list until a match is found or the whole list has been searched.',
    working: [
      'Start from the leftmost element of the array and one by one compare the target element with each element of the array.',
      'If the target matches with an element, return the index.',
      'If the target does not match with any of the elements, return not found.'
    ],
    timeBest: 'O(1) (First element is target)',
    timeAverage: 'O(n)',
    timeWorst: 'O(n) (Target not found or is the last element)',
    space: 'O(1)',
    spaceDetail: 'Requires no additional space.'
  },
  binary: {
    title: 'Binary Search',
    concept: 'Binary Search is a searching algorithm used in a sorted array by repeatedly dividing the search interval in half. The idea of binary search is to use the information that the array is sorted and reduce the time complexity to O(log n).',
    working: [
      'Compare the target with the middle element.',
      'If the target matches with middle element, we return the mid index.',
      'Else If target is greater than the mid element, then target can only lie in the right half subarray after the mid element. So we recur for right half.',
      'Else (target is smaller) recur for the left half.',
      'Repeat until target is found or search space is exhausted.'
    ],
    timeBest: 'O(1) (Middle element is target)',
    timeAverage: 'O(log n)',
    timeWorst: 'O(log n)',
    space: 'O(1)',
    spaceDetail: 'Requires no additional space for iterative approach.'
  },
  bfs: {
    title: 'Breadth-First Search (BFS)',
    concept: 'Breadth-First Search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph, sometimes referred to as a search key), and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.',
    working: [
      'Start by putting the source node in a Queue and mark it as visited.',
      'Pop a node from the Queue and process it.',
      'Find all its unvisited neighbors and push them into the Queue, marking them as visited.',
      'Repeat the process until the Queue is empty.'
    ],
    timeBest: 'O(V + E)',
    timeAverage: 'O(V + E)',
    timeWorst: 'O(V + E) (where V is number of vertices and E is number of edges)',
    space: 'O(V)',
    spaceDetail: 'Requires additional space for the Queue, which can contain at most all vertices in the worst case (e.g. a wide tree).'
  },
  dfs: {
    title: 'Depth-First Search (DFS)',
    concept: 'Depth-First Search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking.',
    working: [
      'Start by pushing the source node into a Stack and mark it as visited.',
      'Pop a node from the Stack and process it.',
      'Find all its unvisited neighbors and push them into the Stack.',
      'Repeat the process until the Stack is empty.'
    ],
    timeBest: 'O(V + E)',
    timeAverage: 'O(V + E)',
    timeWorst: 'O(V + E) (where V is number of vertices and E is number of edges)',
    space: 'O(V)',
    spaceDetail: 'Requires additional space for the Stack, which can contain at most all vertices in the worst case (e.g. a degenerate tree/linked list).'
  },
  array: {
    title: 'Static Array',
    concept: 'An Array is a linear data structure consisting of a collection of elements, each identified by at least one array index or key. It is stored in contiguous memory locations, making accessing an element by index very fast. However, its size is fixed upon creation.',
    working: [
      'Memory is allocated as a contiguous block.',
      'To access an element at index i, the memory address is calculated as: Base Address + (i * element size).',
      'This calculation is instantaneous, giving O(1) read/write time.',
      'Inserting or deleting an element in the middle requires shifting all subsequent elements, which takes O(n) time.'
    ],
    timeBest: 'O(1) (Access/Update)',
    timeAverage: 'O(n) (Insert/Delete in the middle)',
    timeWorst: 'O(n) (Insert/Delete at the beginning)',
    space: 'O(n)',
    spaceDetail: 'Requires contiguous memory block of fixed size n.'
  },
  vector: {
    title: 'Vector (Dynamic Array)',
    concept: 'A Vector (or Dynamic Array) is a resizable array data structure. Unlike static arrays, vectors can grow or shrink in size dynamically. Under the hood, it uses a static array and allocates a new, larger static array (usually doubling in size) when the current capacity is reached.',
    working: [
      'Maintains a pointer to a dynamically allocated static array, along with its current "Size" and maximum "Capacity".',
      'When appending an element, if Size < Capacity, it is placed at the Size index and Size is incremented.',
      'If Size == Capacity, a new array of double the capacity is allocated.',
      'All existing elements are copied to the new array, which takes O(n) time.',
      'The new element is then appended.'
    ],
    timeBest: 'O(1) (Access / Append without resize)',
    timeAverage: 'O(1) amortized (Append)',
    timeWorst: 'O(n) (Append causing resize / Insert in middle)',
    space: 'O(n)',
    spaceDetail: 'Requires contiguous memory, but capacity can be up to twice the current number of elements, wasting some space.'
  },
  linked_list: {
    title: 'Singly Linked List',
    concept: 'A Linked List is a linear collection of data elements whose order is not given by their physical placement in memory. Instead, each element (node) points to the next. It is a data structure consisting of a collection of nodes which together represent a sequence.',
    working: [
      'A node contains data and a pointer (or reference) to the next node in the sequence.',
      'The first node is called the Head. The last node points to null (or is called the Tail).',
      'To traverse, start at the Head and follow pointers until null is reached.',
      'To insert/delete, adjust the pointers of adjacent nodes. This can be done in O(1) time if the reference to the adjacent node is already known.'
    ],
    timeBest: 'O(1) (Insert/Delete at Head)',
    timeAverage: 'O(n) (Search / Access by index)',
    timeWorst: 'O(n) (Insert/Delete at end without Tail pointer)',
    space: 'O(n)',
    spaceDetail: 'Each element requires extra space for the pointer(s).'
  },
  doubly_linked_list: {
    title: 'Doubly Linked List',
    concept: 'A Doubly Linked List is a variation of a linked list where each node contains two pointers instead of one. One pointer points to the next node, and the other points to the previous node in the sequence.',
    working: [
      'Each node maintains two references: next and prev.',
      'The prev pointer of the Head is null, and the next pointer of the Tail is null.',
      'Traversal can be performed in both directions (forward and backward).',
      'Insertion/Deletion requires updating two pairs of pointers instead of one.'
    ],
    timeBest: 'O(1) (Insert/Delete at known position)',
    timeAverage: 'O(n) (Search / Access by index)',
    timeWorst: 'O(n) (Search)',
    space: 'O(n)',
    spaceDetail: 'Requires more memory than a Singly Linked List due to the extra prev pointer in each node.'
  },
  circular_linked_list: {
    title: 'Circular Linked List',
    concept: 'A Circular Linked List is a variation of a linked list where all nodes are connected to form a circle. There is no null at the end; instead, the last node points back to the first node (Head).',
    working: [
      'The next pointer of the Tail node points to the Head node.',
      'Any node can be a starting point. We can traverse the whole list by starting from any node.',
      'Useful for applications that need to repeatedly go through a list (like a round-robin scheduler).',
      'Can be implemented as either Singly or Doubly Circular Linked List.'
    ],
    timeBest: 'O(1) (Insert at Head/Tail)',
    timeAverage: 'O(n) (Search)',
    timeWorst: 'O(n) (Search)',
    space: 'O(n)',
    spaceDetail: 'Similar space requirements to a normal linked list.'
  },
  hash_map: {
    title: 'Hash Map (Hash Table)',
    concept: 'A Hash Map is a data structure that implements an associative array abstract data type, a structure that can map keys to values. A hash table uses a hash function to compute an index, also called a hash code, into an array of buckets or slots, from which the desired value can be found.',
    working: [
      'Pass the Key through a Hash Function to generate a numerical Hash Code.',
      'Use the modulo operator (Hash % Number of Buckets) to determine the bucket index.',
      'Store the Key-Value pair in that bucket.',
      'If another key maps to the same bucket (a Collision), store both items using a technique like Chaining (using a Linked List in the bucket).',
      'To retrieve, hash the key, go to the bucket, and search the chain for the key.'
    ],
    timeBest: 'O(1) (Access/Insert/Delete with no collisions)',
    timeAverage: 'O(1)',
    timeWorst: 'O(n) (All keys hash to the exact same bucket)',
    space: 'O(n)',
    spaceDetail: 'Requires space for the array of buckets and for the stored key-value pairs.'
  },
  stack: {
    title: 'Stack',
    concept: 'A Stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. Elements can be inserted and deleted only from one side of the list, called the Top.',
    working: [
      'Push: Add an element to the top of the stack.',
      'Pop: Remove and return the top element of the stack.',
      'Peek: Return the top element without removing it.',
      'IsEmpty: Check if the stack is empty.'
    ],
    timeBest: 'O(1)',
    timeAverage: 'O(1)',
    timeWorst: 'O(1)',
    space: 'O(n)',
    spaceDetail: 'Requires space proportional to the number of elements in the stack.'
  },
  queue: {
    title: 'Queue',
    concept: 'A Queue is a linear data structure that follows the First-In-First-Out (FIFO) principle. Elements are inserted at the rear (enqueue) and removed from the front (dequeue).',
    working: [
      'Enqueue: Add an element to the rear of the queue.',
      'Dequeue: Remove and return the front element of the queue.',
      'Front: Return the front element without removing it.',
      'IsEmpty: Check if the queue is empty.'
    ],
    timeBest: 'O(1)',
    timeAverage: 'O(1)',
    timeWorst: 'O(1)',
    space: 'O(n)',
    spaceDetail: 'Requires space proportional to the number of elements in the queue.'
  },
  heap: {
    title: 'Heap (Priority Queue)',
    concept: 'A Heap is a specialized tree-based data structure that satisfies the heap property. In a max heap, for any given node C, if P is a parent node of C, then the key of P is greater than or equal to the key of C. In a min heap, the key of P is less than or equal to the key of C.',
    working: [
      'Insert: Add a new element to the end of the heap, then "bubble up" to restore the heap property.',
      'Extract Max/Min: Remove the root element, move the last element to the root, and "bubble down" to restore the heap property.',
      'Peek: Return the root element without removing it.'
    ],
    timeBest: 'O(1) (Peek)',
    timeAverage: 'O(log n) (Insert/Extract)',
    timeWorst: 'O(log n)',
    space: 'O(n)',
    spaceDetail: 'Typically implemented using an array, requiring space proportional to the number of elements.'
  },
  dp: {
    title: 'Dynamic Programming',
    concept: 'Dynamic Programming (DP) is a method for solving a complex problem by breaking it down into a collection of simpler subproblems, solving each of those subproblems just once, and storing their solutions using a memory-based data structure (array, map, etc.).',
    working: [
      'Identify overlapping subproblems and optimal substructure.',
      'Define the state and the recurrence relation (state transition equation).',
      'Choose a memoization (top-down) or tabulation (bottom-up) approach.',
      'Compute the solution to the original problem using the stored subproblem solutions.'
    ],
    timeBest: 'Depends on the problem (usually O(n) or O(n^2))',
    timeAverage: 'Depends on the problem',
    timeWorst: 'Depends on the problem',
    space: 'Depends on the problem (usually O(n) or O(n^2))',
    spaceDetail: 'Requires additional space to store the solutions of subproblems (memo or DP table).'
  },
  dijkstra: {
    title: "Dijkstra's Algorithm",
    concept: "Dijkstra's Algorithm is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. It was conceived by computer scientist Edsger W. Dijkstra in 1956 and published three years later.",
    working: [
      'Mark all nodes unvisited. Create a set of all the unvisited nodes called the unvisited set.',
      'Assign to every node a tentative distance value: set it to zero for our initial node and to infinity for all other nodes.',
      'For the current node, consider all of its unvisited neighbors and calculate their tentative distances through the current node.',
      'When we are done considering all of the unvisited neighbors of the current node, mark the current node as visited and remove it from the unvisited set.',
      'If the destination node has been marked visited or if the smallest tentative distance among the nodes in the unvisited set is infinity, then stop. The algorithm has finished.'
    ],
    timeBest: 'O((V + E) log V)',
    timeAverage: 'O((V + E) log V)',
    timeWorst: 'O((V + E) log V) (using a Min-Priority Queue)',
    space: 'O(V)',
    spaceDetail: 'Requires space for the distances array, visited set, and Priority Queue.'
  }
};

export default function TheoryPanel() {
  const { selectedAlgorithm } = useVisualizerStore();
  const data = theoryData[selectedAlgorithm as keyof typeof theoryData] || theoryData.bubble;

  useEffect(() => {
    logger.info(`TheoryPanel: Mounted successfully and educational content loaded for ${selectedAlgorithm}.`);
    return () => {
      logger.debug('TheoryPanel: Unmounted.');
    };
  }, [selectedAlgorithm]);

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700 text-gray-300">
      
      {/* Concept Section */}
      <h2 className="text-2xl font-bold text-white mb-4">Concept: {data.title}</h2>
      <p className="mb-6 leading-relaxed">
        {data.concept}
      </p>

      {/* Working Section */}
      <h2 className="text-2xl font-bold text-white mb-4">Working</h2>
      <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-400">
        {data.working.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      {/* Complexity Analysis Section */}
      <h2 className="text-2xl font-bold text-white mb-4">Complexity Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-2">Time Complexity</h3>
          <ul className="space-y-2 font-mono text-sm">
            <li><span className="text-green-400 font-bold">Best Case:</span> {data.timeBest}</li>
            <li><span className="text-yellow-400 font-bold">Average Case:</span> {data.timeAverage}</li>
            <li><span className="text-red-400 font-bold">Worst Case:</span> {data.timeWorst}</li>
          </ul>
        </div>
        <div className="bg-gray-800 p-4 rounded border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-2">Space Complexity</h3>
          <ul className="space-y-2 font-mono text-sm">
            <li><span className="text-blue-400 font-bold">Auxiliary:</span> {data.space}</li>
          </ul>
          <p className="text-xs mt-3 text-gray-500 leading-tight">
            {data.spaceDetail}
          </p>
        </div>
      </div>
    </div>
  );
}