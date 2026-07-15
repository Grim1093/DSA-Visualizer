"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisualizerStore } from '@/store/useVisualizerStore';

export default function GraphVisualizerBoard() {
  const { frames, currentFrameIndex } = useVisualizerStore();

  if (frames.length === 0) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center text-white/30">
        <svg className="w-10 h-10 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
        </svg>
        <p className="font-mono text-xs uppercase tracking-[0.2em]">Waiting for graph data...</p>
      </div>
    );
  }

  const currentFrame = frames[currentFrameIndex];
  const { 
    graphState, visitedNodes = [], currentNode, dataStructureState = [], description 
  } = currentFrame as any;

  if (!graphState) return null;

  const { nodes, edges } = graphState;
  const viewBox = "0 0 600 400";

  return (
    <div className="w-full flex-1 flex flex-col relative overflow-hidden">
      {/* Description Overlay */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 w-3/4 max-w-lg">
        <motion.div 
          key={description}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono text-xs text-center py-2 px-4 rounded-full shadow-lg"
        >
          {description}
        </motion.div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row h-full">
        {/* Graph Canvas */}
        <div className="flex-1 relative min-h-[300px]">
          <svg viewBox={viewBox} className="w-full h-full absolute inset-0">
            {/* Draw Edges */}
            {edges.map((edge: any, i: number) => {
              const sourceNode = nodes.find((n: any) => n.id === edge.source);
              const targetNode = nodes.find((n: any) => n.id === edge.target);
              
              if (!sourceNode || !targetNode) return null;

              const isTraversed = (visitedNodes.includes(edge.source) || currentNode === edge.source) &&
                                  (visitedNodes.includes(edge.target) || currentNode === edge.target);

              return (
                <motion.line
                  key={`edge-${edge.source}-${edge.target}-${i}`}
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={isTraversed ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.15)'}
                  strokeWidth={isTraversed ? 3 : 1.5}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              );
            })}

            {/* Draw Nodes */}
            {nodes.map((node: any) => {
              const isVisited = visitedNodes.includes(node.id);
              const isCurrent = currentNode === node.id;
              const isInDS = dataStructureState.includes(node.id);

              let fillColor = 'rgba(255,255,255,0.05)';
              let strokeColor = 'rgba(255,255,255,0.2)';
              let textColor = 'rgba(255,255,255,0.6)';

              if (isVisited) {
                fillColor = 'rgba(52, 211, 153, 0.2)'; // Emerald
                strokeColor = 'rgba(52, 211, 153, 0.8)';
                textColor = '#fff';
              } else if (isCurrent) {
                fillColor = 'rgba(251, 191, 36, 0.2)'; // Amber
                strokeColor = 'rgba(251, 191, 36, 0.8)';
                textColor = '#fff';
              } else if (isInDS) {
                fillColor = 'rgba(96, 165, 250, 0.2)'; // Blue
                strokeColor = 'rgba(96, 165, 250, 0.8)';
                textColor = '#fff';
              }

              return (
                <g key={`node-${node.id}`}>
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={18}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={2}
                    animate={{ 
                      scale: isCurrent ? 1.25 : 1,
                      fill: fillColor,
                      stroke: strokeColor
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                  <text
                    x={node.x}
                    y={node.y}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fill={textColor}
                    fontSize="12"
                    fontWeight="500"
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
        <div className="w-full md:w-48 border-t md:border-t-0 md:border-l border-white/10 p-6 flex flex-col bg-white/[0.02]">
          <h4 className="text-[10px] text-white/40 mb-4 pb-2 text-center uppercase tracking-[0.2em] mono border-b border-white/10">
            {dataStructureState.length > 0 ? "Queue / Stack" : "Buffer"}
          </h4>
          
          <div className="flex-1 flex flex-col justify-end gap-2 overflow-hidden px-2 pb-4">
            <AnimatePresence mode="popLayout">
              {dataStructureState.map((nodeId: string, idx: number) => {
                const nodeData = nodes.find((n: any) => n.id === nodeId);
                return (
                  <motion.div
                    layout
                    key={`${nodeId}-${idx}`}
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -20, transition: { duration: 0.2 } }}
                    className="bg-white/10 text-white py-2 rounded-lg text-center border border-white/20 font-mono text-sm shadow-lg backdrop-blur-md"
                  >
                    {nodeData ? nodeData.label : nodeId}
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {dataStructureState.length === 0 && (
              <div className="text-white/20 text-center text-xs font-mono py-4 uppercase tracking-widest">Empty</div>
            )}
          </div>
          <div className="text-center text-[9px] text-white/30 font-mono uppercase tracking-[0.2em]">
            Front / Top
          </div>
        </div>
      </div>
    </div>
  );
}
