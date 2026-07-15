import React from 'react';
import TheoryPanel from './TheoryPanel';
import ComparisonPanel from './ComparisonPanel';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import VisualizerBoard from './VisualizerBoard';
import DSArrayVisualizer from './ds/DSArrayVisualizer';
import DSVectorVisualizer from './ds/DSVectorVisualizer';
import DSLinkedListVisualizer from './ds/DSLinkedListVisualizer';
import DSHashMapVisualizer from './ds/DSHashMapVisualizer';
import GraphVisualizerBoard from './GraphVisualizerBoard';

const pseudocodeMap: Record<string, React.ReactNode> = {
  array: (
    <>
      <p><span className="text-pink-400">class</span> <span className="text-blue-300">StaticArray</span> {'{'}</p>
      <p className="pl-4"> <span className="text-pink-400">constructor</span>(size) {'{'}</p>
      <p className="pl-8"> <span className="text-blue-300">this</span>.data = <span className="text-pink-400">new</span> Array(size);</p>
      <p className="pl-4"> {'}'}</p>
      <p className="pl-4 mt-2"> <span className="text-emerald-400">write</span>(index, value) {'{'}</p>
      <p className="pl-8"> <span className="text-blue-300">this</span>.data[index] = value;</p>
      <p className="pl-4"> {'}'}</p>
      <p className="pl-4 mt-2"> <span className="text-emerald-400">read</span>(index) {'{'}</p>
      <p className="pl-8"> <span className="text-pink-400">return</span> <span className="text-blue-300">this</span>.data[index];</p>
      <p className="pl-4"> {'}'}</p>
      <p>{'}'}</p>
    </>
  ),
  bubble: (
    <>
      <p><span className="text-pink-400">function</span> <span className="text-blue-300">bubbleSort</span>(array) {'{'}</p>
      <p className="pl-4"> <span className="text-pink-400">let</span> n = array.length;</p>
      <p className="pl-4"> <span className="text-pink-400">for</span> (i = 0; i &lt; n - 1; i++) {'{'}</p>
      <p className="pl-8"> <span className="text-pink-400">for</span> (j = 0; j &lt; n - i - 1; j++) {'{'}</p>
      <p className="pl-12 text-gray-400"> // Compare adjacent elements</p>
      <p className="pl-12"> <span className="text-pink-400">if</span> (array[j] &gt; array[j+1]) {'{'}</p>
      <p className="pl-16 text-emerald-400"> swap(array[j], array[j+1]);</p>
      <p className="pl-12"> {'}'}</p>
      <p className="pl-8"> {'}'}</p>
      <p className="pl-4"> {'}'}</p>
      <p>{'}'}</p>
    </>
  ),
  quick: (
    <>
      <p><span className="text-pink-400">function</span> <span className="text-blue-300">quickSort</span>(arr, low, high) {'{'}</p>
      <p className="pl-4"> <span className="text-pink-400">if</span> (low &lt; high) {'{'}</p>
      <p className="pl-8"> <span className="text-pink-400">let</span> pi = partition(arr, low, high);</p>
      <p className="pl-8 text-emerald-400"> quickSort(arr, low, pi - 1);</p>
      <p className="pl-8 text-emerald-400"> quickSort(arr, pi + 1, high);</p>
      <p className="pl-4"> {'}'}</p>
      <p>{'}'}</p>
      <p className="mt-2"><span className="text-pink-400">function</span> <span className="text-blue-300">partition</span>(arr, low, high) {'{'}</p>
      <p className="pl-4 text-gray-400"> // Chooses last element as pivot and places it correctly</p>
      <p className="pl-4"> <span className="text-pink-400">let</span> pivot = arr[high];</p>
      <p className="pl-4"> <span className="text-pink-400">let</span> i = (low - 1);</p>
      <p className="pl-4"> <span className="text-pink-400">for</span> (j = low; j &lt; high; j++) {'{'}</p>
      <p className="pl-8"> <span className="text-pink-400">if</span> (arr[j] &lt; pivot) {'{'}</p>
      <p className="pl-12"> i++;</p>
      <p className="pl-12 text-emerald-400"> swap(arr[i], arr[j]);</p>
      <p className="pl-8"> {'}'}</p>
      <p className="pl-4"> {'}'}</p>
      <p className="pl-4 text-emerald-400"> swap(arr[i + 1], arr[high]);</p>
      <p className="pl-4"> <span className="text-pink-400">return</span> (i + 1);</p>
      <p>{'}'}</p>
    </>
  ),
  binary: (
    <>
      <p><span className="text-pink-400">function</span> <span className="text-blue-300">binarySearch</span>(arr, target) {'{'}</p>
      <p className="pl-4"> <span className="text-pink-400">let</span> left = 0, right = arr.length - 1;</p>
      <p className="pl-4"> <span className="text-pink-400">while</span> (left &lt;= right) {'{'}</p>
      <p className="pl-8"> <span className="text-pink-400">let</span> mid = Math.floor((left + right) / 2);</p>
      <p className="pl-8"> <span className="text-pink-400">if</span> (arr[mid] === target) <span className="text-pink-400">return</span> mid;</p>
      <p className="pl-8"> <span className="text-pink-400">if</span> (arr[mid] &lt; target) left = mid + 1;</p>
      <p className="pl-8"> <span className="text-pink-400">else</span> right = mid - 1;</p>
      <p className="pl-4"> {'}'}</p>
      <p className="pl-4"> <span className="text-pink-400">return</span> -1; <span className="text-gray-400">// Not found</span></p>
      <p>{'}'}</p>
    </>
  ),
  vector: (
    <>
      <p><span className="text-pink-400">class</span> <span className="text-blue-300">Vector</span> {'{'}</p>
      <p className="pl-4"> <span className="text-pink-400">constructor</span>() {'{'}</p>
      <p className="pl-8"> <span className="text-blue-300">this</span>.capacity = 2;</p>
      <p className="pl-8"> <span className="text-blue-300">this</span>.size = 0;</p>
      <p className="pl-8"> <span className="text-blue-300">this</span>.data = <span className="text-pink-400">new</span> Array(capacity);</p>
      <p className="pl-4"> {'}'}</p>
      <p className="pl-4 mt-2"> <span className="text-emerald-400">push</span>(value) {'{'}</p>
      <p className="pl-8"> <span className="text-pink-400">if</span> (size === capacity) resize();</p>
      <p className="pl-8"> <span className="text-blue-300">this</span>.data[size++] = value;</p>
      <p className="pl-4"> {'}'}</p>
      <p>{'}'}</p>
    </>
  ),
  linked_list: (
    <>
      <p><span className="text-pink-400">class</span> <span className="text-blue-300">Node</span> {'{'} data, next {'}'}</p>
      <p className="mt-2"><span className="text-pink-400">class</span> <span className="text-blue-300">LinkedList</span> {'{'}</p>
      <p className="pl-4 mt-2"> <span className="text-emerald-400">append</span>(value) {'{'}</p>
      <p className="pl-8"> <span className="text-pink-400">let</span> newNode = <span className="text-pink-400">new</span> Node(value);</p>
      <p className="pl-8"> <span className="text-pink-400">if</span> (!head) head = tail = newNode;</p>
      <p className="pl-8"> <span className="text-pink-400">else</span> {'{'}</p>
      <p className="pl-12"> tail.next = newNode;</p>
      <p className="pl-12"> tail = newNode;</p>
      <p className="pl-8"> {'}'}</p>
      <p className="pl-4"> {'}'}</p>
      <p>{'}'}</p>
    </>
  ),
  doubly_linked_list: (
    <>
      <p><span className="text-pink-400">class</span> <span className="text-blue-300">Node</span> {'{'} data, prev, next {'}'}</p>
      <p className="mt-2"><span className="text-pink-400">class</span> <span className="text-blue-300">DoublyLinkedList</span> {'{'}</p>
      <p className="pl-4 mt-2"> <span className="text-emerald-400">append</span>(value) {'{'}</p>
      <p className="pl-8"> <span className="text-pink-400">let</span> newNode = <span className="text-pink-400">new</span> Node(value);</p>
      <p className="pl-8"> <span className="text-pink-400">if</span> (!head) head = tail = newNode;</p>
      <p className="pl-8"> <span className="text-pink-400">else</span> {'{'}</p>
      <p className="pl-12"> newNode.prev = tail;</p>
      <p className="pl-12"> tail.next = newNode;</p>
      <p className="pl-12"> tail = newNode;</p>
      <p className="pl-8"> {'}'}</p>
      <p className="pl-4"> {'}'}</p>
      <p>{'}'}</p>
    </>
  ),
  circular_linked_list: (
    <>
      <p><span className="text-pink-400">class</span> <span className="text-blue-300">Node</span> {'{'} data, next {'}'}</p>
      <p className="mt-2"><span className="text-pink-400">class</span> <span className="text-blue-300">CircularLinkedList</span> {'{'}</p>
      <p className="pl-4 mt-2"> <span className="text-emerald-400">append</span>(value) {'{'}</p>
      <p className="pl-8"> <span className="text-pink-400">let</span> newNode = <span className="text-pink-400">new</span> Node(value);</p>
      <p className="pl-8"> <span className="text-pink-400">if</span> (!head) {'{'}</p>
      <p className="pl-12"> head = tail = newNode;</p>
      <p className="pl-12"> newNode.next = head;</p>
      <p className="pl-8"> {'}'} <span className="text-pink-400">else</span> {'{'}</p>
      <p className="pl-12"> tail.next = newNode;</p>
      <p className="pl-12"> newNode.next = head;</p>
      <p className="pl-12"> tail = newNode;</p>
      <p className="pl-8"> {'}'}</p>
      <p className="pl-4"> {'}'}</p>
      <p>{'}'}</p>
    </>
  ),
  hash_map: (
    <>
      <p><span className="text-pink-400">class</span> <span className="text-blue-300">HashMap</span> {'{'}</p>
      <p className="pl-4 mt-2"> <span className="text-emerald-400">set</span>(key, value) {'{'}</p>
      <p className="pl-8"> <span className="text-pink-400">let</span> index = hashFunction(key) % capacity;</p>
      <p className="pl-8"> <span className="text-pink-400">let</span> chain = buckets[index];</p>
      <p className="pl-8"> <span className="text-pink-400">for</span> (node <span className="text-pink-400">in</span> chain) {'{'}</p>
      <p className="pl-12"> <span className="text-pink-400">if</span> (node.key === key) {'{'} node.value = value; <span className="text-pink-400">return</span>; {'}'}</p>
      <p className="pl-8"> {'}'}</p>
      <p className="pl-8"> chain.push({'{'} key, value {'}'});</p>
      <p className="pl-4"> {'}'}</p>
      <p>{'}'}</p>
    </>
  ),
  selection: (
    <>
      <p><span className="text-pink-400">function</span> <span className="text-blue-300">selectionSort</span>(array) {'{'}</p>
      <p className="pl-4"> <span className="text-pink-400">let</span> n = array.length;</p>
      <p className="pl-4"> <span className="text-pink-400">for</span> (i = 0; i &lt; n - 1; i++) {'{'}</p>
      <p className="pl-8"> <span className="text-pink-400">let</span> minIdx = i;</p>
      <p className="pl-8"> <span className="text-pink-400">for</span> (j = i + 1; j &lt; n; j++) {'{'}</p>
      <p className="pl-12"> <span className="text-pink-400">if</span> (array[j] &lt; array[minIdx]) minIdx = j;</p>
      <p className="pl-8"> {'}'}</p>
      <p className="pl-8 text-emerald-400"> swap(array[i], array[minIdx]);</p>
      <p className="pl-4"> {'}'}</p>
      <p>{'}'}</p>
    </>
  ),
  insertion: (
    <>
      <p><span className="text-pink-400">function</span> <span className="text-blue-300">insertionSort</span>(array) {'{'}</p>
      <p className="pl-4"> <span className="text-pink-400">let</span> n = array.length;</p>
      <p className="pl-4"> <span className="text-pink-400">for</span> (i = 1; i &lt; n; i++) {'{'}</p>
      <p className="pl-8"> <span className="text-pink-400">let</span> key = array[i];</p>
      <p className="pl-8"> <span className="text-pink-400">let</span> j = i - 1;</p>
      <p className="pl-8"> <span className="text-pink-400">while</span> (j &gt;= 0 && array[j] &gt; key) {'{'}</p>
      <p className="pl-12"> array[j + 1] = array[j];</p>
      <p className="pl-12"> j = j - 1;</p>
      <p className="pl-8"> {'}'}</p>
      <p className="pl-8"> array[j + 1] = key;</p>
      <p className="pl-4"> {'}'}</p>
      <p>{'}'}</p>
    </>
  ),
  merge: (
    <>
      <p><span className="text-pink-400">function</span> <span className="text-blue-300">mergeSort</span>(array) {'{'}</p>
      <p className="pl-4"> <span className="text-pink-400">if</span> (array.length &lt;= 1) <span className="text-pink-400">return</span> array;</p>
      <p className="pl-4"> <span className="text-pink-400">let</span> mid = array.length / 2;</p>
      <p className="pl-4"> <span className="text-pink-400">let</span> left = mergeSort(array.slice(0, mid));</p>
      <p className="pl-4"> <span className="text-pink-400">let</span> right = mergeSort(array.slice(mid));</p>
      <p className="pl-4"> <span className="text-pink-400">return</span> merge(left, right);</p>
      <p>{'}'}</p>
    </>
  ),
  linear: (
    <>
      <p><span className="text-pink-400">function</span> <span className="text-blue-300">linearSearch</span>(array, target) {'{'}</p>
      <p className="pl-4"> <span className="text-pink-400">for</span> (i = 0; i &lt; array.length; i++) {'{'}</p>
      <p className="pl-8"> <span className="text-pink-400">if</span> (array[i] === target) {'{'}</p>
      <p className="pl-12"> <span className="text-pink-400">return</span> i;</p>
      <p className="pl-8"> {'}'}</p>
      <p className="pl-4"> {'}'}</p>
      <p className="pl-4"> <span className="text-pink-400">return</span> -1;</p>
      <p>{'}'}</p>
    </>
  ),
  bfs: (
    <>
      <p><span className="text-pink-400">function</span> <span className="text-blue-300">BFS</span>(graph, startNode) {'{'}</p>
      <p className="pl-4"> <span className="text-pink-400">let</span> queue = [startNode];</p>
      <p className="pl-4"> <span className="text-pink-400">let</span> visited = new Set([startNode]);</p>
      <p className="pl-4"> <span className="text-pink-400">while</span> (queue.length &gt; 0) {'{'}</p>
      <p className="pl-8"> <span className="text-pink-400">let</span> node = queue.shift();</p>
      <p className="pl-8"> <span className="text-pink-400">for</span> (neighbor <span className="text-pink-400">of</span> graph[node]) {'{'}</p>
      <p className="pl-12"> <span className="text-pink-400">if</span> (!visited.has(neighbor)) {'{'}</p>
      <p className="pl-16"> visited.add(neighbor);</p>
      <p className="pl-16"> queue.push(neighbor);</p>
      <p className="pl-12"> {'}'}</p>
      <p className="pl-8"> {'}'}</p>
      <p className="pl-4"> {'}'}</p>
      <p>{'}'}</p>
    </>
  ),
  dfs: (
    <>
      <p><span className="text-pink-400">function</span> <span className="text-blue-300">DFS</span>(graph, startNode, visited = new Set()) {'{'}</p>
      <p className="pl-4"> visited.add(startNode);</p>
      <p className="pl-4"> <span className="text-pink-400">for</span> (neighbor <span className="text-pink-400">of</span> graph[startNode]) {'{'}</p>
      <p className="pl-8"> <span className="text-pink-400">if</span> (!visited.has(neighbor)) {'{'}</p>
      <p className="pl-12"> DFS(graph, neighbor, visited);</p>
      <p className="pl-8"> {'}'}</p>
      <p className="pl-4"> {'}'}</p>
      <p>{'}'}</p>
    </>
  ),
  stack: (
    <>
      <p><span className="text-pink-400">class</span> <span className="text-blue-300">Stack</span> {'{'}</p>
      <p className="pl-4 mt-2"> <span className="text-emerald-400">push</span>(item) {'{'}</p>
      <p className="pl-8"> <span className="text-blue-300">this</span>.items.push(item);</p>
      <p className="pl-4"> {'}'}</p>
      <p className="pl-4 mt-2"> <span className="text-emerald-400">pop</span>() {'{'}</p>
      <p className="pl-8"> <span className="text-pink-400">return</span> <span className="text-blue-300">this</span>.items.pop();</p>
      <p className="pl-4"> {'}'}</p>
      <p>{'}'}</p>
    </>
  ),
  queue: (
    <>
      <p><span className="text-pink-400">class</span> <span className="text-blue-300">Queue</span> {'{'}</p>
      <p className="pl-4 mt-2"> <span className="text-emerald-400">enqueue</span>(item) {'{'}</p>
      <p className="pl-8"> <span className="text-blue-300">this</span>.items.push(item);</p>
      <p className="pl-4"> {'}'}</p>
      <p className="pl-4 mt-2"> <span className="text-emerald-400">dequeue</span>() {'{'}</p>
      <p className="pl-8"> <span className="text-pink-400">return</span> <span className="text-blue-300">this</span>.items.shift();</p>
      <p className="pl-4"> {'}'}</p>
      <p>{'}'}</p>
    </>
  ),
  heap: (
    <>
      <p><span className="text-pink-400">class</span> <span className="text-blue-300">MinHeap</span> {'{'}</p>
      <p className="pl-4 mt-2"> <span className="text-emerald-400">insert</span>(item) {'{'}</p>
      <p className="pl-8"> <span className="text-blue-300">this</span>.heap.push(item);</p>
      <p className="pl-8"> <span className="text-blue-300">this</span>.bubbleUp();</p>
      <p className="pl-4"> {'}'}</p>
      <p className="pl-4 mt-2"> <span className="text-emerald-400">extractMin</span>() {'{'}</p>
      <p className="pl-8"> <span className="text-pink-400">let</span> min = <span className="text-blue-300">this</span>.heap[0];</p>
      <p className="pl-8"> <span className="text-blue-300">this</span>.heap[0] = <span className="text-blue-300">this</span>.heap.pop();</p>
      <p className="pl-8"> <span className="text-blue-300">this</span>.bubbleDown();</p>
      <p className="pl-8"> <span className="text-pink-400">return</span> min;</p>
      <p className="pl-4"> {'}'}</p>
      <p>{'}'}</p>
    </>
  ),
  dp: (
    <>
      <p><span className="text-pink-400">function</span> <span className="text-blue-300">FibonacciDP</span>(n, memo = {'{}'}) {'{'}</p>
      <p className="pl-4"> <span className="text-pink-400">if</span> (n <span className="text-pink-400">in</span> memo) <span className="text-pink-400">return</span> memo[n];</p>
      <p className="pl-4"> <span className="text-pink-400">if</span> (n &lt;= 2) <span className="text-pink-400">return</span> 1;</p>
      <p className="pl-4"> memo[n] = FibonacciDP(n - 1, memo) + FibonacciDP(n - 2, memo);</p>
      <p className="pl-4"> <span className="text-pink-400">return</span> memo[n];</p>
      <p>{'}'}</p>
    </>
  ),
  dijkstra: (
    <>
      <p><span className="text-pink-400">function</span> <span className="text-blue-300">Dijkstra</span>(graph, start) {'{'}</p>
      <p className="pl-4"> <span className="text-pink-400">let</span> distances = {'{}'};</p>
      <p className="pl-4"> <span className="text-pink-400">let</span> pq = <span className="text-pink-400">new</span> PriorityQueue();</p>
      <p className="pl-4"> distances[start] = 0;</p>
      <p className="pl-4"> pq.enqueue(start, 0);</p>
      <p className="pl-4"> <span className="text-pink-400">while</span> (!pq.isEmpty()) {'{'}</p>
      <p className="pl-8"> <span className="text-pink-400">let</span> node = pq.dequeue();</p>
      <p className="pl-8"> <span className="text-pink-400">for</span> (neighbor <span className="text-pink-400">in</span> graph[node]) {'{'}</p>
      <p className="pl-12"> <span className="text-pink-400">let</span> distance = distances[node] + graph[node][neighbor];</p>
      <p className="pl-12"> <span className="text-pink-400">if</span> (distance &lt; distances[neighbor]) {'{'}</p>
      <p className="pl-16"> distances[neighbor] = distance;</p>
      <p className="pl-16"> pq.enqueue(neighbor, distance);</p>
      <p className="pl-12"> {'}'}</p>
      <p className="pl-8"> {'}'}</p>
      <p className="pl-4"> {'}'}</p>
      <p className="pl-4"> <span className="text-pink-400">return</span> distances;</p>
      <p>{'}'}</p>
    </>
  )
};

export default function TheoryModeView() {
  const { selectedAlgorithm, setFrames, isPlaying, play, pause, stepForward, currentFrameIndex, frames, playbackSpeed, mode } = useVisualizerStore();
  const isGraphAlgo = selectedAlgorithm === 'bfs' || selectedAlgorithm === 'dfs' || selectedAlgorithm === 'dijkstra' || selectedAlgorithm === 'heap';
  const isDataStructure = mode === 'data-structure';

  // Standalone playback loop for Theory Mode (since PlaybackControls is unmounted)
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && frames.length > 0) {
      interval = setInterval(() => {
        if (currentFrameIndex < frames.length - 1) {
          stepForward();
        } else {
          pause();
          if (frames.length > 0) {
            fetch('/api/progress', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ moduleId: selectedAlgorithm, points: 10 })
            }).catch(console.error);
          }
        }
      }, playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentFrameIndex, frames.length, playbackSpeed, stepForward, pause]);

  const handlePlayAnimation = () => {
    import('@/utils/dsEngine').then(dsEngine => {
      import('@/utils/algorithmEngine').then(algoEngine => {
        let dummyFrames: any[] = [];
        const dummyArr = [8, 3, 5, 1, 9, 2];
        const sortedArr = [1, 2, 3, 5, 8, 9];
        
        if (selectedAlgorithm === 'array') {
          dummyFrames = dsEngine.generateArrayInit(6);
        } else if (selectedAlgorithm === 'vector') {
          dummyFrames = dsEngine.generateVectorInit();
        } else if (selectedAlgorithm.includes('linked_list')) {
          dummyFrames = dsEngine.generateLinkedListInit(selectedAlgorithm.includes('circular') ? 'circular' : selectedAlgorithm.includes('doubly') ? 'doubly' : 'singly');
        } else if (selectedAlgorithm === 'hash_map') {
          dummyFrames = dsEngine.generateHashMapInit();
        } else if (selectedAlgorithm === 'bfs' || selectedAlgorithm === 'dfs' || selectedAlgorithm === 'dijkstra') {
          // Dummy graph for demo
          const dummyGraph = {
            nodes: [
              { id: 'A', label: 'A', x: 300, y: 100 },
              { id: 'B', label: 'B', x: 200, y: 200 },
              { id: 'C', label: 'C', x: 400, y: 200 },
              { id: 'D', label: 'D', x: 150, y: 300 },
            ],
            edges: [
              { source: 'A', target: 'B' },
              { source: 'A', target: 'C' },
              { source: 'B', target: 'D' },
            ],
            adjList: {
              'A': ['B', 'C'],
              'B': ['A', 'D'],
              'C': ['A'],
              'D': ['B']
            }
          };
          if (selectedAlgorithm === 'bfs') {
            dummyFrames = algoEngine.generateBFSFrames(dummyGraph, 'A');
          } else if (selectedAlgorithm === 'dijkstra') {
            dummyFrames = algoEngine.generateDijkstraFrames(dummyGraph, 'A');
          } else {
            dummyFrames = algoEngine.generateDFSFrames(dummyGraph, 'A');
          }
        } else if (selectedAlgorithm === 'dp') {
          dummyFrames = algoEngine.generateDPFrames(6); // Fibonacci(6) for demo
        } else if (selectedAlgorithm === 'bubble') {
          dummyFrames = algoEngine.generateBubbleSortFrames([...dummyArr]);
        } else if (selectedAlgorithm === 'selection') {
          dummyFrames = algoEngine.generateSelectionSortFrames([...dummyArr]);
        } else if (selectedAlgorithm === 'insertion') {
          dummyFrames = algoEngine.generateInsertionSortFrames([...dummyArr]);
        } else if (selectedAlgorithm === 'merge') {
          dummyFrames = algoEngine.generateMergeSortFrames([...dummyArr]);
        } else if (selectedAlgorithm === 'quick') {
          dummyFrames = algoEngine.generateQuickSortFrames([...dummyArr]);
        } else if (selectedAlgorithm === 'linear') {
          dummyFrames = algoEngine.generateLinearSearchFrames([...dummyArr], 5);
        } else if (selectedAlgorithm === 'binary') {
          dummyFrames = algoEngine.generateBinarySearchFrames([...sortedArr], 5);
        } else {
          dummyFrames = algoEngine.generateBubbleSortFrames([...dummyArr]);
        }
        
        setFrames(dummyFrames);
        play();
      });
    });
  };

  const defaultPseudocode = (
    <>
      <p className="text-gray-500 italic mb-4">// Pseudocode for {selectedAlgorithm} will be loaded here</p>
      <p><span className="text-pink-400">function</span> <span className="text-blue-300">executeAlgorithm</span>(data) {'{'}</p>
      <p className="pl-4"> <span className="text-pink-400">for</span> each element <span className="text-pink-400">in</span> data {'{'}</p>
      <p className="pl-8 text-gray-400"> // Core logic</p>
      <p className="pl-8"> <span className="text-emerald-400">process</span>();</p>
      <p className="pl-4"> {'}'}</p>
      <p>{'}'}</p>
    </>
  );

  return (
    <div className="flex flex-col lg:flex-row flex-1 p-4 sm:p-6 gap-6 w-full max-w-[1920px] mx-auto overflow-hidden lg:h-[calc(100vh-120px)] custom-scrollbar">
      
      {/* Left Content Area (Theory, Written Algo, Pseudocode) */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-20 space-y-6">
        <TheoryPanel />
        
        <div className="card-mono p-6 sm:p-8 flex flex-col">
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mono font-bold mb-6 flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
            Pseudocode & Algorithm Steps
          </h3>
          <div className="bg-white/[0.02] p-6 rounded-xl border border-white/5 font-mono text-xs text-white/70 leading-loose shadow-inner overflow-x-auto">
            {pseudocodeMap[selectedAlgorithm] || defaultPseudocode}
          </div>
        </div>

        <ComparisonPanel />
      </div>

      {/* Right Content Area (Mini-Visualizer Widget) */}
      <div className="w-full lg:w-[450px] xl:w-[550px] shrink-0 flex flex-col gap-6">
        <div className="card-mono p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mono font-bold flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
              Animation Preview
            </h3>
            {!isDataStructure && (
              <button
                onClick={handlePlayAnimation}
                className="btn-primary px-4 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-2"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Play Demo
              </button>
            )}
          </div>
          
          <div className="w-full flex-1 relative flex flex-col rounded-2xl overflow-hidden">
            {isDataStructure ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white/[0.02] border border-white/5 shadow-inner min-h-[300px]">
                <svg className="w-8 h-8 text-white/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h4 className="text-sm font-semibold text-white/60 mb-2">No Demo Available</h4>
                <p className="text-xs text-white/40 leading-relaxed">
                  Data structures require interactive operations. Please switch to the <strong className="text-white">Interactive Sandbox</strong> above to test {selectedAlgorithm.replace(/_/g, ' ')}.
                </p>
              </div>
            ) : (
              <div className="w-full flex-1 min-h-[400px] relative flex flex-col [&::-webkit-scrollbar]:hidden [scrollbar-width:none] overflow-y-auto overflow-x-hidden bg-[#0a0a0a] rounded-2xl border border-white/5">
                {selectedAlgorithm === 'array' || selectedAlgorithm === 'dp' ? <DSArrayVisualizer /> :
                 selectedAlgorithm === 'vector' ? <DSVectorVisualizer /> :
                 (selectedAlgorithm === 'linked_list' || selectedAlgorithm === 'doubly_linked_list' || selectedAlgorithm === 'circular_linked_list') ? <DSLinkedListVisualizer /> :
                 selectedAlgorithm === 'hash_map' ? <DSHashMapVisualizer /> :
                 isGraphAlgo ? <GraphVisualizerBoard /> : <VisualizerBoard />}
              </div>
            )}
          </div>
          
          <div className="mt-4 p-4 bg-white/[0.02] border border-white/5 rounded-xl flex items-start gap-3">
            <svg className="w-4 h-4 text-white/30 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-xs text-white/40 leading-relaxed">
              This mini-visualizer demonstrates the fundamental operation. Switch to <strong className="text-white/60">Interactive Sandbox</strong> to control playback speed and use custom data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
