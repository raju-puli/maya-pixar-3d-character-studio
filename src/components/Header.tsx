import React from 'react';
import { Camera, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { studioAudio } from '../utils/audio';

interface HeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenExport: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenExport,
  soundEnabled,
  onToggleSound,
}) => {
  const navItems = [
    { id: 'viewport', label: 'Studio Stage' },
    { id: 'expressions', label: 'Expressions' },
    { id: 'lighting', label: 'Lighting Rig' },
    { id: 'specs', label: 'Tech Specs' },
    { id: 'palette', label: 'Color Palette' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#viewport"
          onClick={(e) => {
            e.preventDefault();
            onSelectTab('viewport');
          }}
          className="text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 flex items-center gap-2 group"
        >
          <span className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-extrabold text-sm shadow-sm group-hover:scale-105 transition-transform">
            M
          </span>
          <span>Maya · 3D Studio</span>
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  studioAudio.playMarimba(1);
                  onSelectTab(item.id);
                }}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                  isActive
                    ? 'text-stone-950 border-amber-500 font-semibold'
                    : 'text-stone-600 border-transparent hover:text-stone-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
          </button>

          <button
            onClick={() => {
              studioAudio.playShutter();
              onOpenExport();
            }}
            className="px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Export Snapshot</span>
          </button>
        </div>
      </div>
    </header>
  );
};
