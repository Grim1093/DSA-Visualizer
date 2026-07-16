"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import AppLayout from '@/components/layout/AppLayout';

interface ProgressData {
  points: number;
  currentStreak: number;
  completedModules: { module_id: string; completed_at: string }[];
}

const BackgroundShader = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    function syncSize() {
      if (!canvas) return;
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    const observer = new ResizeObserver(syncSize);
    observer.observe(canvas);
    syncSize();

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;
    const fs = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.y, u_resolution.x);
    
    vec3 color = vec3(0.02, 0.02, 0.02);
    
    float n = noise(p * 4.0 + u_time * 0.1);
    color += n * 0.03;
    
    float stars = pow(hash(floor(p * 40.0 + u_time * 0.02)), 20.0);
    color += stars * 0.2;
    
    float scanline = sin(uv.y * 800.0 + u_time * 2.0) * 0.01;
    color += scanline;
    
    float dist = length(uv - (u_mouse / u_resolution));
    float glow = smoothstep(0.4, 0.0, dist) * 0.05;
    color += glow;

    gl_FragColor = vec4(color, 1.0);
}`;
    
    // @ts-ignore
    function cs(type, src) {
      // @ts-ignore
      const s = gl.createShader(type);
      // @ts-ignore
      gl.shaderSource(s, src);
      // @ts-ignore
      gl.compileShader(s);
      return s;
    }
    
    // @ts-ignore
    const prog = gl.createProgram();
    // @ts-ignore
    gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
    // @ts-ignore
    gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
    // @ts-ignore
    gl.linkProgram(prog);
    // @ts-ignore
    gl.useProgram(prog);
    
    // @ts-ignore
    const buf = gl.createBuffer();
    // @ts-ignore
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    // @ts-ignore
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    
    // @ts-ignore
    const pos = gl.getAttribLocation(prog, 'a_position');
    // @ts-ignore
    gl.enableVertexAttribArray(pos);
    // @ts-ignore
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    
    // @ts-ignore
    const uTime = gl.getUniformLocation(prog, 'u_time');
    // @ts-ignore
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    // @ts-ignore
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;
    function render(t: number) {
      if (typeof ResizeObserver === 'undefined') syncSize();
      // @ts-ignore
      gl.viewport(0, 0, canvas.width, canvas.height);
      // @ts-ignore
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      // @ts-ignore
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      // @ts-ignore
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      // @ts-ignore
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(render);
    }
    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-2]">
      <div className="absolute inset-0 w-full h-full opacity-60" style={{display: 'block'}}>
        <canvas ref={canvasRef} style={{display: 'block', width: '100%', height: '100%'}}></canvas>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [progress, setProgress] = useState<ProgressData | null>(null);

  const handleNavigateToModule = (id: string) => {
    useVisualizerStore.getState().setSelectedAlgorithm(id);
    let path = '/learning';
    if (['array', 'vector', 'linked_list', 'stack', 'queue', 'hash_map'].includes(id)) {
      path = '/learning/data-structures/basic';
    } else if (['heap'].includes(id)) {
      path = '/learning/data-structures/complex';
    } else if (['linear', 'binary'].includes(id)) {
      path = '/learning/algorithms/searching';
    } else if (['bubble', 'selection', 'insertion', 'merge', 'quick'].includes(id)) {
      path = '/learning/algorithms/sorting';
    } else if (['bfs', 'dfs', 'dijkstra', 'dp'].includes(id)) {
      path = '/learning/algorithms/complex';
    }
    router.push(path);
  };

  const renderHeroGraphic = (id: string) => {
    switch (id) {
      case 'array':
      case 'vector':
        return (
          <div className="flex items-center gap-1">
            {[12, 45, 7, 89, 32].map((n, i) => (
              <div key={i} className={`w-8 h-8 border flex items-center justify-center font-code-sm text-[10px] ${i === 2 ? 'border-primary text-primary bg-primary/10' : 'border-outline-variant bg-surface text-on-surface-variant'}`}>{n}</div>
            ))}
          </div>
        );
      case 'stack':
        return (
          <div className="flex flex-col-reverse gap-1 items-center relative">
            <span className="material-symbols-outlined text-primary text-[14px] absolute -top-4">south</span>
            {[12, 99, 37].map((n, i) => (
              <div key={i} className={`w-12 h-6 border flex items-center justify-center font-code-sm text-[10px] ${i === 2 ? 'border-primary text-primary bg-primary/10' : 'border-outline-variant bg-surface text-on-surface-variant'}`}>{n}</div>
            ))}
          </div>
        );
      case 'queue':
        return (
          <div className="flex items-center gap-1 relative">
            <span className="material-symbols-outlined text-primary text-[14px] absolute -left-5">east</span>
            {[12, 99, 37].map((n, i) => (
              <div key={i} className={`w-10 h-10 border flex items-center justify-center font-code-sm text-[10px] ${i === 0 || i === 2 ? 'border-primary text-primary bg-primary/10' : 'border-outline-variant bg-surface text-on-surface-variant'}`}>{n}</div>
            ))}
            <span className="material-symbols-outlined text-primary text-[14px] absolute -right-5">east</span>
          </div>
        );
      case 'hash_map':
        return (
          <div className="flex flex-col gap-1 w-full max-w-[120px]">
            {[{k: 'A', v: '10'}, {k: 'B', v: '20'}, {k: 'C', v: '30'}].map((p, i) => (
              <div key={i} className="flex gap-1 w-full">
                <div className="flex-1 h-6 bg-surface-container-high border border-outline-variant flex items-center justify-center font-code-sm text-[10px] text-on-surface-variant">{p.k}</div>
                <div className={`flex-1 h-6 border flex items-center justify-center font-code-sm text-[10px] ${i === 1 ? 'border-primary text-primary bg-primary/10' : 'border-outline-variant bg-surface text-on-surface-variant'}`}>{p.v}</div>
              </div>
            ))}
          </div>
        );
      case 'linear':
      case 'binary':
        return (
          <div className="flex flex-col items-center gap-1">
            <span className="material-symbols-outlined text-primary text-[16px] translate-x-2">search</span>
            <div className="flex items-center gap-1">
              {[3, 7, 12, 45, 89].map((n, i) => (
                <div key={i} className={`w-8 h-8 border flex items-center justify-center font-code-sm text-[10px] ${i === 2 ? 'border-primary text-primary bg-primary/10' : 'border-outline-variant bg-surface text-on-surface-variant'}`}>{n}</div>
              ))}
            </div>
          </div>
        );
      case 'bubble':
      case 'selection':
      case 'insertion':
      case 'merge':
      case 'quick':
        return (
          <div className="flex items-end gap-1 h-12">
            {[16, 40, 24, 48, 32].map((h, i) => (
              <div key={i} className={`w-4 border ${i === 3 || i === 4 ? 'border-primary bg-primary/30' : 'border-outline-variant bg-surface'}`} style={{height: `${h}px`}}></div>
            ))}
          </div>
        );
      case 'bfs':
      case 'dfs':
      case 'dijkstra':
      case 'heap':
      case 'dp':
        return (
          <div className="relative w-24 h-16">
            <svg width="100%" height="100%" className="absolute inset-0">
              <line x1="50%" y1="20%" x2="25%" y2="70%" stroke="#444748" strokeWidth="2" />
              <line x1="50%" y1="20%" x2="75%" y2="70%" stroke="#e2e2e2" strokeWidth="2" />
            </svg>
            <div className="absolute left-1/2 top-[20%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-primary bg-surface flex items-center justify-center font-code-sm text-[8px] text-primary">A</div>
            <div className="absolute left-[25%] top-[70%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-outline-variant bg-surface flex items-center justify-center font-code-sm text-[8px] text-on-surface-variant">B</div>
            <div className="absolute left-[75%] top-[70%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center font-code-sm text-[8px] text-primary">C</div>
          </div>
        );
      case 'linked_list':
      default:
        return (
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 border border-primary bg-surface flex items-center justify-center font-code-sm text-primary relative">
                12
                <div className="absolute top-1/2 -right-6 w-5 h-px bg-primary transform -translate-y-1/2">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 border-t-[3px] border-b-[3px] border-l-[4px] border-transparent border-l-primary"></div>
                </div>
            </div>
            <div className="w-10 h-10 border border-outline-variant bg-surface/50 flex items-center justify-center font-code-sm text-on-surface-variant ml-6 relative">
                99
                  <div className="absolute top-1/2 -right-6 w-5 h-px bg-outline-variant transform -translate-y-1/2">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 border-t-[3px] border-b-[3px] border-l-[4px] border-transparent border-l-outline-variant"></div>
                </div>
            </div>
            <div className="w-10 h-10 border border-outline-variant bg-surface/50 flex items-center justify-center font-code-sm text-on-surface-variant ml-6">
                37
            </div>
          </div>
        );
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/progress')
        .then(res => res.json())
        .then(data => {
          if (!data.error) setProgress(data);
        })
        .catch(console.error);
    }
  }, [status]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center bg-background text-on-surface">Loading...</div>;
  }

  const track1 = [
    { id: 'array', name: 'Array', time: 'O(1)' },
    { id: 'vector', name: 'Vector', time: 'O(1)*' },
    { id: 'linked_list', name: 'Linked List', time: 'O(N)' },
    { id: 'stack', name: 'Stack', time: 'O(1)' },
    { id: 'queue', name: 'Queue', time: 'O(1)' },
    { id: 'hash_map', name: 'Hash Map', time: 'O(1)' }
  ];
  
  const track2 = [
    { id: 'linear', name: 'Linear Search', time: 'O(N)' },
    { id: 'binary', name: 'Binary Search', time: 'O(log N)' },
    { id: 'bubble', name: 'Bubble Sort', time: 'O(N²)' },
    { id: 'selection', name: 'Selection Sort', time: 'O(N²)' },
    { id: 'insertion', name: 'Insertion Sort', time: 'O(N²)' },
    { id: 'merge', name: 'Merge Sort', time: 'O(N log N)' },
    { id: 'quick', name: 'Quick Sort', time: 'O(N log N)' }
  ];
  
  const track3 = [
    { id: 'bfs', name: 'BFS', time: 'O(V+E)' },
    { id: 'dfs', name: 'DFS', time: 'O(V+E)' },
    { id: 'dijkstra', name: 'Dijkstra', time: 'O(E log V)' },
    { id: 'heap', name: 'Heap', time: 'O(log N)' },
    { id: 'dp', name: 'DP', time: 'O(N)' }
  ];

  const allTracks = [...track1, ...track2, ...track3];
  
  const isCompleted = (id: string) => progress?.completedModules.some(m => m.module_id === id);

  let foundActive = false;
  const getStatus = (id: string) => {
    if (isCompleted(id)) return 'completed';
    if (!foundActive) {
      foundActive = true;
      return 'active';
    }
    return 'locked';
  };

  const activeModule = allTracks.find(m => getStatus(m.id) === 'active') || allTracks[0];
  const activeModuleIndex = allTracks.findIndex(m => m.id === activeModule.id);
  const activeTrackStr = activeModuleIndex < track1.length ? 'T01' : activeModuleIndex < track1.length + track2.length ? 'T02' : 'T03';
  const activeModNum = (activeModuleIndex % 10) + 1; // Simplified numbering

  const xp = progress?.points ?? 0;
  const streak = progress?.currentStreak ?? 0;
  const level = Math.floor(xp / 100) + 1;
  const xpInLevel = xp % 100;
  const pct = (xpInLevel / 100) * 100;

  const renderModuleCard = (mod: {id: string, name: string, time: string}) => {
    const status = getStatus(mod.id);
    if (status === 'completed') {
      return (
        <div key={mod.id} onClick={() => handleNavigateToModule(mod.id)} className="border border-outline-variant bg-surface-container-low/50 p-3 rounded-sm flex items-center justify-between hover:border-outline transition-colors cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full border border-outline-variant flex items-center justify-center bg-surface">
              <span className="material-symbols-outlined text-[14px] text-primary">check</span>
            </div>
            <span className="font-code-sm text-code-sm text-on-surface group-hover:text-primary transition-colors">{mod.name}</span>
          </div>
          <span className="font-label-caps text-[8px] text-on-surface-variant border border-outline-variant px-1.5 py-0.5 rounded-sm">{mod.time}</span>
        </div>
      );
    } else if (status === 'active') {
      return (
        <div key={mod.id} onClick={() => handleNavigateToModule(mod.id)} className="border border-primary bg-primary/5 p-3 rounded-sm flex items-center justify-between cursor-pointer shadow-[inset_4px_0_0_0_#ffffff]">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full border border-primary flex items-center justify-center bg-surface relative">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            </div>
            <span className="font-code-sm text-code-sm text-primary">{mod.name}</span>
          </div>
          <span className="font-label-caps text-[8px] text-surface bg-primary px-1.5 py-0.5 rounded-sm">{mod.time}</span>
        </div>
      );
    } else {
      return (
        <div key={mod.id} className="border border-outline-variant border-dashed bg-transparent p-3 rounded-sm flex items-center justify-between opacity-50 cursor-not-allowed">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full border border-outline-variant flex items-center justify-center bg-surface">
              <span className="material-symbols-outlined text-[14px] text-on-surface-variant">lock</span>
            </div>
            <span className="font-code-sm text-code-sm text-on-surface-variant">{mod.name}</span>
          </div>
        </div>
      );
    }
  };

  const track1Completed = track1.filter(m => isCompleted(m.id)).length;
  const track2Completed = track2.filter(m => isCompleted(m.id)).length;
  const track3Completed = track3.filter(m => isCompleted(m.id)).length;

  return (
    <AppLayout progress={progress}>
      <BackgroundShader />
      <div className="fixed inset-0 z-[-1] bg-dot-grid opacity-30 mix-blend-overlay pointer-events-none"></div>
      <div className="fixed inset-0 z-[-1] grain mix-blend-overlay pointer-events-none"></div>

      <div className="p-6 max-w-7xl mx-auto flex flex-col gap-8 pb-32">
          
          {/* Active Module Hero */}
          <section className="border border-outline-variant bg-surface-container-low/40 backdrop-blur-md rounded-sm p-6 relative overflow-hidden flex flex-col md:flex-row gap-6 items-center">
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{backgroundImage: 'repeating-linear-gradient(45deg, #333 0, #333 1px, transparent 0, transparent 50%)', backgroundSize: '8px 8px'}}></div>
            <div className="relative z-10 flex-1 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="border border-primary px-2 py-0.5 rounded-sm font-code-sm text-code-sm text-primary bg-primary/10">ACTIVE MODULE</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">{activeTrackStr}-M0{activeModNum}</span>
              </div>
              <div>
                <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight mb-2">{activeModule.name}</h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                  {activeModule.id === 'linked_list' ? 'Master dynamic memory allocation and pointer manipulation. Optimize insertion and deletion operations.' : `Learn about the ${activeModule.name} and master its core concepts.`}
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <button onClick={() => handleNavigateToModule(activeModule.id)} className="bg-primary text-surface font-label-caps text-label-caps px-6 py-2 rounded-sm border border-primary hover:bg-surface hover:text-primary transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                  RESUME
                </button>
              </div>
            </div>

            <div className="relative z-10 w-full md:w-1/3 h-32 border border-outline-variant bg-surface-container flex items-center justify-center rounded-sm overflow-hidden p-4 gap-2">
              {renderHeroGraphic(activeModule.id)}
            </div>
          </section>

          {/* Tracks Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <section className="flex flex-col gap-4">
              <header className="flex items-center justify-between border-b border-outline-variant pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-code-sm text-code-sm text-on-surface-variant">01</span>
                  <h3 className="font-label-caps text-label-caps text-primary tracking-widest">FUNDAMENTAL STRUCTURES</h3>
                </div>
                <span className="font-code-sm text-code-sm text-on-surface-variant">{track1Completed}/{track1.length}</span>
              </header>
              <div className="flex flex-col gap-2">
                {track1.map(renderModuleCard)}
              </div>
            </section>

            <section className="flex flex-col gap-4">
              <header className="flex items-center justify-between border-b border-outline-variant pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-code-sm text-code-sm text-on-surface-variant">02</span>
                  <h3 className="font-label-caps text-label-caps text-primary tracking-widest">SEARCH & SORT</h3>
                </div>
                <span className="font-code-sm text-code-sm text-on-surface-variant">{track2Completed}/{track2.length}</span>
              </header>
              <div className="flex flex-col gap-2">
                {track2.map(renderModuleCard)}
              </div>
            </section>

            <section className="flex flex-col gap-4">
              <header className="flex items-center justify-between border-b border-outline-variant pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-code-sm text-code-sm text-on-surface-variant">03</span>
                  <h3 className="font-label-caps text-label-caps text-primary tracking-widest">GRAPH & LOGIC</h3>
                </div>
                <span className="font-code-sm text-code-sm text-on-surface-variant">{track3Completed}/{track3.length}</span>
              </header>
              <div className="flex flex-col gap-2">
                {track3.map(renderModuleCard)}
              </div>
            </section>
          </div>

      </div>
    </AppLayout>
  );
}
