import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StudioViewport } from './components/StudioViewport';
import { ExpressionSelector } from './components/ExpressionSelector';
import { LightingRigControls } from './components/LightingRigControls';
import { ColorPaletteViewer } from './components/ColorPaletteViewer';
import { CharacterDossier } from './components/CharacterDossier';
import { PromptBreakdown } from './components/PromptBreakdown';
import { ExportModal } from './components/ExportModal';
import { EXPRESSIONS, BACKDROPS, DEFAULT_LIGHTING, CHARACTER_NAME, CHARACTER_TITLE } from './data/characterData';
import { Expression, LightingRig, BackdropOption } from './types';
import { studioAudio } from './utils/audio';
import { Sparkles, Sun, Eye, Palette, Cpu, Terminal, Camera, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('viewport');
  const [currentExpression, setCurrentExpression] = useState<Expression>(EXPRESSIONS[0]);
  const [lighting, setLighting] = useState<LightingRig>(DEFAULT_LIGHTING);
  const [backdrop, setBackdrop] = useState<BackdropOption>(BACKDROPS[0]);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const handleUpdateLighting = (patch: Partial<LightingRig>) => {
    setLighting((prev) => ({ ...prev, ...patch }));
  };

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    studioAudio.enabled = nextState;
    if (nextState) {
      studioAudio.playSwitch();
    }
  };

  // Scroll to section when tab selected
  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-amber-200">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenExport={() => setIsExportOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Hero Section: 3D Stage & Quick Controls */}
        <section id="viewport" className="space-y-6">
          {/* Section Kicker & Title */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
              <span>Pixar 3D Animation Character Study</span>
              <span aria-hidden="true">·</span>
              <span>Unreal Engine 5</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 text-balance">
              Maya Lin-Walker
            </h1>
            <p className="mt-2 text-sm sm:text-base text-stone-600 leading-relaxed">
              9-year-old girl with curly dark brown hair in two puffs, big sparkling brown eyes, warm smile, sunburst yellow hoodie, and red backpack straps. Centered bust shot rendered in 8K resolution with volumetric cinematic lighting and subtle depth of field.
            </p>
          </div>

          {/* Interactive Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: 3D Viewport with Parallax & Lighting Rig */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <StudioViewport
                expression={currentExpression}
                lighting={lighting}
                backdrop={backdrop}
                onUpdateLighting={handleUpdateLighting}
                onOpenExport={() => setIsExportOpen(true)}
              />
            </div>

            {/* Right 5 Columns: Active Controls & Quick Switchers */}
            <div className="lg:col-span-5 space-y-5">
              {/* Quick Expression Switcher */}
              <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-amber-500" />
                    <span>Active Expression</span>
                  </h3>
                  <span className="text-[11px] font-mono text-stone-400">
                    {currentExpression.name}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {EXPRESSIONS.map((exp, idx) => {
                    const isSelected = currentExpression.id === exp.id;
                    return (
                      <button
                        key={exp.id}
                        onClick={() => {
                          studioAudio.playChime(1.0 + idx * 0.15);
                          setCurrentExpression(exp);
                        }}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all group ${
                          isSelected
                            ? 'border-amber-500 ring-2 ring-amber-500/20 scale-102'
                            : 'border-stone-200 hover:border-stone-300 opacity-75 hover:opacity-100'
                        }`}
                        title={exp.name}
                      >
                        <img
                          src={exp.imageUrl}
                          alt={exp.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    );
                  })}
                </div>

                <p className="mt-3 text-xs text-stone-600 leading-normal">
                  {currentExpression.description}
                </p>
              </div>

              {/* Quick Backdrop Switcher */}
              <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>Studio Backdrop</span>
                  </h3>
                  <span className="text-[11px] font-mono text-stone-400">
                    {backdrop.name}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {BACKDROPS.map((b) => {
                    const isSelected = backdrop.id === b.id;
                    return (
                      <button
                        key={b.id}
                        onClick={() => {
                          studioAudio.playMarimba(2);
                          setBackdrop(b);
                        }}
                        className={`p-2 rounded-lg border text-left flex items-center gap-2 transition-all ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/50 ring-1 ring-amber-500/30'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div
                          className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                          style={{ background: b.gradientStyle }}
                        />
                        <span className="text-xs font-medium text-stone-800 truncate">
                          {b.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Snapshot Action Banner */}
              <div className="bg-gradient-to-br from-amber-50 to-stone-100 rounded-xl border border-amber-200/80 p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-stone-900">
                    High-Res Avatar Studio
                  </h4>
                  <p className="text-[11px] text-stone-600 mt-0.5">
                    Export Maya in 1:1 Avatar, Circle PFP, or Movie Poster card
                  </p>
                </div>
                <button
                  onClick={() => {
                    studioAudio.playShutter();
                    setIsExportOpen(true);
                  }}
                  className="px-3.5 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-lg shadow-sm transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Snapshot</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Expressions Gallery */}
        <section id="expressions">
          <ExpressionSelector
            currentExpression={currentExpression}
            onSelectExpression={(exp) => setCurrentExpression(exp)}
          />
        </section>

        {/* Section: Lighting Rig Controls */}
        <section id="lighting">
          <LightingRigControls
            lighting={lighting}
            backdrop={backdrop}
            onUpdateLighting={handleUpdateLighting}
            onSelectBackdrop={(bd) => setBackdrop(bd)}
          />
        </section>

        {/* Section: Color Palette Inspector */}
        <section id="palette">
          <ColorPaletteViewer />
        </section>

        {/* Section: Tech Specs & Character Dossier */}
        <section id="specs">
          <CharacterDossier />
        </section>

        {/* Section: Generation Prompt & Tokens */}
        <section id="prompt">
          <PromptBreakdown />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-stone-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            <strong className="text-stone-800 font-semibold">Maya · 3D Character Studio</strong>
            <span className="mx-2">·</span>
            <span>Pixar-style 3D character portrait rendered with Unreal Engine 5</span>
          </div>
          <div className="flex items-center gap-4">
            <span>8K Photorealistic Shading</span>
            <span aria-hidden="true">·</span>
            <span>Subsurface Scattering</span>
            <span aria-hidden="true">·</span>
            <span>Lumen Lighting</span>
          </div>
        </div>
      </footer>

      {/* High-Resolution Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        expression={currentExpression}
        lighting={lighting}
        backdrop={backdrop}
      />
    </div>
  );
}
