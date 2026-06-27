"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import { logger } from '@/utils/logger';

export default function GraphVisualizerBoard() {
  const { frames, currentFrameIndex } = useVisualizerStore();

  useEffect(() => {
    if (frames.length > 0) {
      logger.debug('GraphVisualizerBoard: Rendering frame', { 
        frameIndex: currentFrameIndex,
      });
    }
  }, [currentFrameIndex, frames]);

  if (frames.length === 0) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center bg-gray-900 rounded-lg shadow-inner border border-gray-700 text-gray-400">
        <svg className="w-12 h-12 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
        </svg>
        <p className="font-mono text-sm">Waiting for graph execution data...</p>
      </div>
    );
  }

  const currentFrame = frames[currentFrameIndex];
  const { 
    graphState, visitedNodes = [], currentNode, dataStructureState = [], description, selectedAlgorithm 
  } = currentFrame as any; // Cast temporarily since we're pulling from same store

  if (!graphState) return null; // Fallback

  const { nodes, edges } = graphState;

  // We map coordinates roughly to a 600x400 SVG box for responsive scaling
  const viewBox = "0 0 600 400";

  return (
    <div className="w-full bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-700 flex flex-col">
      {/* Description Panel */}
      <div className="mb-4 min-h-[3rem] p-4 bg-gray-800 rounded border-l-4 border-purple-500 flex items-center">
        <p className="text-white font-mono text-sm">{description}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Graph Canvas */}
        <div className="flex-1 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden relative min-h-[400px]">
          <svg viewBox={viewBox} className="w-full h-full drop-shadow-md">
            {/* Draw Edges */}
            {edges.map((edge: any, i: number) => {
              const sourceNode = nodes.find((n: any) => n.id === edge.source);
              const targetNode = nodes.find((n: any) => n.id === edge.target);
              
              if (!sourceNode || !targetNode) return null;

              // Check if edge connects two visited nodes (or one visited, one current)
              const isTraversed = (visitedNodes.includes(edge.source) || currentNode === edge.source) &&
                                  (visitedNodes.includes(edge.target) || currentNode === edge.target);

              return (
                <motion.line
                  key={`edge-${edge.source}-${edge.target}-${i}`}
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={isTraversed ? '#a855f7' : '#4b5563'} // Purple-500 or Gray-600
                  strokeWidth={isTraversed ? 4 : 2}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
              );
            })}

            {/* Draw Nodes */}
            {nodes.map((node: any) => {
              const isVisited = visitedNodes.includes(node.id);
              const isCurrent = currentNode === node.id;
              const isInDS = dataStructureState.includes(node.id);

              let fillColor = '#374151'; // default gray-700
              let strokeColor = '#4b5563'; // default gray-600

              if (isVisited) {
                fillColor = '#22c55e'; // green-500
                strokeColor = '#16a34a';
              } else if (isCurrent) {
                fillColor = '#eab308'; // yellow-500
                strokeColor = '#ca8a04';
              } else if (isInDS) {
                fillColor = '#3b82f6'; // blue-500 (in queue/stack)
                strokeColor = '#2563eb';
              }

              return (
                <g key={`node-${node.id}`}>
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={20}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={3}
                    animate={{ 
                      scale: isCurrent ? 1.2 : 1,
                      fill: fillColor
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                  <text
                    x={node.x}
                    y={node.y}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Data Structure Panel (Queue/Stack) */}
        <div className="w-full md:w-48 bg-gray-800 rounded-lg border border-gray-700 p-4 flex flex-col">
          <h4 className="text-gray-300 font-bold mb-4 border-b border-gray-700 pb-2 text-center uppercase tracking-wider text-sm">
            {/* The store currently doesn't pass down selectedAlgorithm into Frame, but we can infer it or just label it based on data */}
            {dataStructureState.length > 0 ? "Queue / Stack" : "Data Structure"}
          </h4>
          
          <div className="flex-1 flex flex-col justify-end gap-2 overflow-hidden px-1">
            <AnimatePresence>
              {dataStructureState.map((nodeId: string, idx: number) => {
                const nodeData = nodes.find((n: any) => n.id === nodeId);
                return (
                  <motion.div
                    key={`${nodeId}-${idx}`}
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                    className="bg-blue-600 text-white font-bold py-2 rounded text-center shadow-md border border-blue-500 font-mono"
                  >
                    {nodeData ? nodeData.label : nodeId}
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {dataStructureState.length === 0 && (
              <div className="text-gray-500 text-center italic text-sm py-4">Empty</div>
            )}
          </div>
          <div className="mt-2 text-center text-xs text-gray-500 font-mono">
            Front/Top
          </div>
        </div>
      </div>
    </div>
  );
}
