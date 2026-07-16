'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useVisualizerStore } from '@/store/useVisualizerStore';

export interface ProgressData {
  points: number;
  currentStreak: number;
  completedModules: { module_id: string; completed_at: string }[];
}

interface AppLayoutProps {
  children: React.ReactNode;
  progress: ProgressData | null;
}

export default function AppLayout({ children, progress }: AppLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar } = useVisualizerStore();
  const [searchInput, setSearchInput] = useState('');

  const xp = progress?.points ?? 0;
  const level = Math.floor(xp / 100) + 1;
  const xpInLevel = xp % 100;
  const pct = (xpInLevel / 100) * 100;

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      router.push(`/learning?search=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const navItems = [
    { label: 'Overview', icon: 'dashboard', path: '/dashboard' },
    { label: 'Learning', icon: 'school', path: '/learning' },
    { label: 'Testing', icon: 'terminal', path: '/testing' },
  ];

  const sidebarWidth = isSidebarOpen ? 'w-64' : 'w-16';

  return (
    <div className="text-on-background bg-background h-screen w-full overflow-hidden flex font-body-md text-body-md antialiased relative selection:bg-primary selection:text-surface">
      {/* SideNavBar */}
      <nav className={`hidden md:flex flex-col fixed left-0 top-0 h-full z-40 border-r border-outline-variant bg-surface dark:bg-surface transition-all duration-300 ease-in-out ${sidebarWidth}`}>
        <div className={`h-16 border-b border-outline-variant flex items-center shrink-0 ${isSidebarOpen ? 'px-4 gap-3' : 'justify-center'}`}>
          <div className="w-8 h-8 rounded-sm bg-surface-container-high border border-outline flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
          </div>
          {isSidebarOpen && (
            <div className="overflow-hidden whitespace-nowrap">
              <h1 className="font-headline-md text-headline-md text-primary tracking-tighter uppercase">AlgoQuest</h1>
              <p className="font-label-caps text-[10px] leading-none text-on-surface-variant mt-0.5">Level {level} Architect</p>
            </div>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-2">
          {navItems.map(item => {
            const isActive = pathname.startsWith(item.path);
            return (
              <button 
                key={item.path}
                onClick={() => router.push(item.path)} 
                className={`flex items-center rounded-sm transition-all group w-full text-left ${isSidebarOpen ? 'gap-3 px-3 py-2' : 'justify-center py-3'} ${
                  isActive 
                    ? 'text-primary border-r-2 border-primary bg-surface-container-highest' 
                    : 'text-on-surface-variant opacity-40 hover:opacity-100 hover:bg-surface-container-high'
                }`}
                title={!isSidebarOpen ? item.label : undefined}
              >
                <span className={`material-symbols-outlined text-[18px] ${isActive ? '' : 'group-hover:translate-x-1'} duration-150`}>
                  {item.icon}
                </span>
                {isSidebarOpen && (
                  <span className="font-label-caps text-label-caps">{item.label}</span>
                )}
              </button>
            );
          })}
          <button 
            onClick={() => signOut({ callbackUrl: '/' })} 
            className={`flex items-center rounded-sm text-on-surface-variant opacity-40 hover:opacity-100 hover:bg-surface-container-high transition-all group w-full text-left mt-auto ${isSidebarOpen ? 'gap-3 px-3 py-2' : 'justify-center py-3'}`}
            title={!isSidebarOpen ? "Logout" : undefined}
          >
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 duration-150">logout</span>
            {isSidebarOpen && (
              <span className="font-label-caps text-label-caps">Logout</span>
            )}
          </button>
        </div>
      </nav>

      {/* TopAppBar */}
      <header 
        className="fixed top-0 right-0 h-16 flex items-center justify-between px-6 z-30 bg-surface/80 backdrop-blur-md border-b border-outline-variant transition-all duration-300 ease-in-out"
        style={{ left: isSidebarOpen ? '16rem' : '4rem' }}
      >
        <div className="flex items-center gap-4">
          <button onClick={toggleSidebar} className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center w-8 h-8 rounded-sm hover:bg-surface-container">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
        
        <div className="hidden lg:flex items-center gap-6 border border-outline-variant rounded-sm px-4 py-1 bg-surface-container-low/50">
          <div className="flex items-center gap-2">
            <span className="font-label-caps text-label-caps text-on-surface-variant">LVL</span>
            <span className="font-code-sm text-code-sm text-primary">{level.toString().padStart(2, '0')}</span>
          </div>
          <div className="w-px h-4 bg-outline-variant"></div>
          <div className="flex items-center gap-2">
            <span className="font-label-caps text-label-caps text-on-surface-variant">XP</span>
            <div className="flex flex-col gap-0.5">
              <div className="w-24 h-1 bg-surface-container border border-outline-variant rounded-sm overflow-hidden">
                <div className="h-full bg-primary transition-all duration-500 ease-out" style={{width: `${pct}%`}}></div>
              </div>
              <span className="font-code-sm text-code-sm text-primary text-[10px] leading-none">{xpInLevel}/100</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <input 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearch}
              className="bg-surface-container-low border border-outline-variant rounded-sm pl-8 pr-3 py-1 font-code-sm text-code-sm text-on-surface focus:outline-none focus:border-primary w-48 transition-colors" 
              placeholder="Search modules..." 
              type="text"
            />
            <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-[16px] text-on-surface-variant pointer-events-none">search</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main 
        className="pt-16 h-screen overflow-y-auto w-full relative z-10 custom-scrollbar transition-all duration-300 ease-in-out"
        style={{ paddingLeft: isSidebarOpen ? '16rem' : '4rem' }}
      >
        {children}
      </main>
    </div>
  );
}
