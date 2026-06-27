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