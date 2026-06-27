# DSA Visualizer Prompt

## Project Goal
The primary goal of this project is to build an interactive Data Structures and Algorithms (DSA) Visualizer platform. This is a Next.js web application designed to help users understand various algorithms (like sorting, searching, and graph traversals) by visually animating their step-by-step execution. It provides a core learning module MVP with customizable data inputs, step-by-step playback controls, and educational theory panels for each algorithm.

## Capabilities
- **Sorting Algorithms**: Visualizes Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort. Includes advanced visualizations like displaying auxiliary arrays (Merge Sort) and extracted pivots (Quick Sort).
- **Searching Algorithms**: Visualizes Linear Search and Binary Search. Binary search visually shrinks the search space.
- **Graph Algorithms**: Visualizes Breadth-First Search (BFS) and Depth-First Search (DFS). Supports custom graph input via edge lists, auto-detects tree structures for hierarchical layout, and falls back to circular layout for general graphs.
- **Custom Input**: Users can enter custom arrays or custom graph edge lists (e.g., A-B, B-C).
- **Playback Controls**: Play, pause, step forward, step backward, and speed adjustment controls.
- **Educational Content**: A theory panel that dynamically updates based on the selected algorithm, explaining its concept, working mechanism, and time/space complexity.

## Folder and File Structure

- **.gitignore**: Specifies intentionally untracked files that Git should ignore (e.g., node_modules, .next).
- **AGENTS.md**: Contains instructions/tips for AI agents working on the codebase.
- **CLAUDE.md**: Likely contains specific instructions for Claude AI.
- **README.md**: The standard Next.js readme with getting started instructions.
- **appendGraph.js**: A script likely used for appending graph data generation logic during development.
- **eslint.config.mjs**: ESLint configuration for code linting and style enforcement.
- **fix.js**: A script used to rebuild or fix the `dummyDataGenerator.ts` file by combining parts of it.
- **next.config.ts**: Next.js configuration file.
- **package.json**: Defines project metadata, dependencies (like react, next, zustand, framer-motion), and NPM scripts.
- **package-lock.json**: Automatically generated file describing the exact tree of dependencies installed.
- **postcss.config.mjs**: Configuration for PostCSS, primarily used here for Tailwind CSS.
- **tsconfig.json**: TypeScript compiler configuration.

- **public/**: Contains static assets served at the root URL.
  - `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`: Various SVG icons used in the boilerplate or UI.

- **src/**: The main source code directory.
  - **app/**: The Next.js App Router directory containing routing and layout.
    - `favicon.ico`: The website icon.
    - `globals.css`: Global CSS styles, including Tailwind directives.
    - `layout.tsx`: The root layout component wrapping all pages, configuring fonts (Geist).
    - `page.tsx`: The main landing page (`Home` component). It assembles all visualizer components (AlgorithmSelector, DataInputPanel, VisualizerBoard, PlaybackControls, TheoryPanel) and manages the overall layout and active algorithm display.

  - **components/**: React components for the UI.
    - **visualizer/**: Components specific to the algorithm visualizer.
      - `AlgorithmSelector.tsx`: Dropdown or buttons to select which algorithm to visualize.
      - `DataInputPanel.tsx`: Form for users to input custom array data, target values for searching, or edge lists for graphs. Handles generating random data and triggering visualization generation.
      - `GraphVisualizerBoard.tsx`: The canvas that renders nodes and edges for graph algorithms (BFS/DFS) and animates the traversal state.
      - `PlaybackControls.tsx`: The controls (Play, Pause, Step Forward/Back, Speed Slider) interacting with the Zustand store to manage animation frames.
      - `TheoryPanel.tsx`: Displays educational text, concepts, and complexity analysis for the selected algorithm.
      - `VisualizerBoard.tsx`: The main canvas for array-based algorithms (Sorting, Searching). Uses Framer Motion to animate bars representing array elements, highlights comparisons/swaps, and displays auxiliary data.

  - **store/**: State management using Zustand.
    - `useVisualizerStore.ts`: The central store managing the visualization state. It holds the generated `frames` of the algorithm, current playback index, play/pause state, speed, and the currently selected algorithm. Defines the `Frame` interface describing the state at each step (array state, active pointers, swapping status, graph state, etc.).

  - **utils/**: Utility functions and helpers.
    - `dummyDataGenerator.ts`: Contains functions that simulate the execution of algorithms (Bubble Sort, Merge Sort, Binary Search, BFS, etc.) and generate an array of `Frame` objects representing the step-by-step state changes.
    - `dummyDataGenerator.ts.tmp`: A temporary backup or partial file likely used by `fix.js`.
    - `graphParser.ts`: Parses user-input string of edges (e.g., "A-B") into a structured `GraphData` format (nodes with coordinates, edges, adjacency list). Includes logic to detect trees for hierarchical layout or use circular layouts.
    - `logger.ts`: A centralized logging utility to track application flow (info, warn, error, debug).

## Database Structure
This project is a frontend-only application and currently does not utilize a database. All state (data inputs, generated frames) is managed in memory on the client side using Zustand state management.

## Complete Project File and Folder Tree
```
dsa-visualizer
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── appendGraph.js
├── eslint.config.mjs
├── fix.js
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src
│   ├── app
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   └── visualizer
│   │       ├── AlgorithmSelector.tsx
│   │       ├── DataInputPanel.tsx
│   │       ├── GraphVisualizerBoard.tsx
│   │       ├── PlaybackControls.tsx
│   │       ├── TheoryPanel.tsx
│   │       └── VisualizerBoard.tsx
│   ├── store
│   │   └── useVisualizerStore.ts
│   └── utils
│       ├── dummyDataGenerator.ts
│       ├── dummyDataGenerator.ts.tmp
│       ├── graphParser.ts
│       └── logger.ts
└── tsconfig.json
```

update prompt.md file in root folder containing everything, our main goal, complete project structure in detail including every file and folder (except node_modules), what is done in the project and what can it do, its capabilities and first read every file then define each file in detail about what it does and define each folder about what it does and database structure and a complete project file and folder tree and in the end of the file copy this prompt and do not copy anything beyond this line
