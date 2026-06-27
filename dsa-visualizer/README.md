# DSA Visualizer Platform

An interactive, web-based platform for learning Data Structures and Algorithms through real-time visualization and step-by-step execution tracking.

## Features

This platform currently includes MVP (Phase 1) features, focusing on providing a physical, interactive representation of how algorithms execute.

### Supported Algorithms & Features
- **Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort.
  - **Structural Visualizations**: Merge Sort displays physical auxiliary sub-arrays, and Quick Sort physically extracts the pivot element to demonstrate the dividing process.
- **Searching Algorithms**: Linear Search, Binary Search.
  - **Search Space Shrinking**: Binary search dynamically slices the array, removing elements outside the `[low, high]` bounds from the screen to visually prove the $O(\log n)$ efficiency.
- **Graph Algorithms**: Breadth-First Search (BFS), Depth-First Search (DFS).
  - **Dynamic Layout Engine**: Custom graph support via edge-list inputs (e.g. `A-B, B-C`).
  - **Tree Auto-Detection**: The graph parser automatically detects if the input is a valid Tree and dynamically renders a beautiful top-down hierarchical layout. 
  - **Circular Fallback**: Cyclic graphs safely fallback to a circular layout to prevent overlapping lines.
  - **Physical Data Structures**: Watch the underlying Queue (BFS) or Stack (DFS) physically fill and empty alongside the graph animation.
  - **Dynamic Randomizer**: Click the "Randomize Graph" button to instantly generate complex, perfectly valid random edge-list strings.
- **Algorithm Playback Controls**: Play, Pause, Step Forward, Step Backward, and adjustable animation speed (1x - 5x).
- **Educational Theory**: An expandable theory panel that explains the conceptual logic and complexity (Time/Space) for the currently selected algorithm.

## Technology Stack

- **Framework**: Next.js (App Router), React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React

## Getting Started

First, install dependencies:

\`\`\`bash
npm install
\`\`\`

Then, run the development server:

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

1. **Select an Algorithm**: Use the dropdown in the top-left to pick an algorithm.
2. **Provide Data**:
   - For Array algorithms, provide a comma-separated list of numbers (or use the Randomize Array button).
   - For Graph algorithms, provide a comma-separated edge list like `A-B, B-C, C-D` (or use the Randomize Graph button).
3. **Visualize**: Click **Apply & Visualize** to compile the animation frames.
4. **Control Playback**: Use the bottom playback bar to step through the algorithm at your own pace.
5. **Learn**: Open the Theory Panel on the right to understand the underlying logic.

## License

This project was developed for the Taskintern Softworks MVP Phase 1.
