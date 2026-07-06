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
  )
};

export default function TheoryModeView() {
  const { selectedAlgorithm, setFrames, isPlaying, play, pause, stepForward, currentFrameIndex, frames, playbackSpeed, mode } = useVisualizerStore();
  const isGraphAlgo = selectedAlgorithm === 'bfs' || selectedAlgorithm === 'dfs';
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
        } else if (selectedAlgorithm === 'bfs' || selectedAlgorithm === 'dfs') {
          const dummyGraph = {
            nodes: [
              { id: 'A', label: 'A', x: 50, y: 50 },
              { id: 'B', label: 'B', x: 150, y: 50 },
              { id: 'C', label: 'C', x: 100, y: 150 }
            ],
            edges: [
              { source: 'A', target: 'B' },
              { source: 'A', target: 'C' }
            ],
            adjList: { 'A': ['B', 'C'], 'B': ['A'], 'C': ['A'] }
          };
          if (selectedAlgorithm === 'bfs') {
            dummyFrames = algoEngine.generateBFSFrames(dummyGraph, 'A');
          } else {
            dummyFrames = algoEngine.generateDFSFrames(dummyGraph, 'A');
          }
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
    <div className="flex flex-col lg:flex-row flex-1 p-4 sm:p-6 gap-8 w-full max-w-[1920px] mx-auto overflow-hidden lg:h-[calc(100vh-120px)] custom-scrollbar">
      
      {/* Left Content Area (Theory, Written Algo, Pseudocode) */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 pb-20 space-y-8">
        <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <TheoryPanel />
        </div>
        
        <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            Pseudocode & Algorithm Steps
          </h3>
          <div className="bg-[#0a0a0c] p-6 rounded-2xl border border-white/5 font-mono text-sm text-gray-300 leading-relaxed shadow-inner overflow-x-auto">
            {pseudocodeMap[selectedAlgorithm] || defaultPseudocode}
          </div>
        </div>

        <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <ComparisonPanel />
        </div>
      </div>

      {/* Right Content Area (Mini-Visualizer Widget) */}
      <div className="w-full lg:w-[500px] xl:w-[600px] shrink-0 flex flex-col gap-6">
        <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400/80 pl-1">Animation Preview</h3>
            {!isDataStructure && (
              <button
                onClick={handlePlayAnimation}
                className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-blue-500/20"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Play Demo
              </button>
            )}
          </div>
          
          <div className="w-full flex-1 relative flex flex-col rounded-2xl">
            {isDataStructure ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#0a0a0c] rounded-2xl ring-1 ring-white/5 shadow-inner">
                <svg className="w-12 h-12 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h4 className="text-lg font-bold text-gray-300 mb-2">No Demo Available</h4>
                <p className="text-sm text-gray-500">
                  Data structures require interactive operations. Please switch to the <strong className="text-blue-400">Interactive Sandbox</strong> above to test {selectedAlgorithm.replace(/_/g, ' ')}.
                </p>
              </div>
            ) : (
              <div className="w-full flex-1 min-h-[400px] relative flex flex-col [&::-webkit-scrollbar]:hidden [scrollbar-width:none] overflow-y-auto overflow-x-hidden rounded-2xl">
                {/* Render the appropriate visualizer without the heavy controls */}
                {selectedAlgorithm === 'array' ? <DSArrayVisualizer /> :
                 selectedAlgorithm === 'vector' ? <DSVectorVisualizer /> :
                 (selectedAlgorithm === 'linked_list' || selectedAlgorithm === 'doubly_linked_list' || selectedAlgorithm === 'circular_linked_list') ? <DSLinkedListVisualizer /> :
                 selectedAlgorithm === 'hash_map' ? <DSHashMapVisualizer /> :
                 isGraphAlgo ? <GraphVisualizerBoard /> : <VisualizerBoard />}
              </div>
            )}
          </div>
          
          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/20 rounded-xl flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-sm text-blue-200/80 leading-relaxed">
              This mini-visualizer demonstrates the fundamental operation. Switch to <strong>Interactive Sandbox</strong> above to control playback speed and use custom data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
