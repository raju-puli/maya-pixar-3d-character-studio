import React from 'react';
import { CHARACTER_BIO, TECH_SPECS } from '../data/characterData';
import { Sparkles, Cpu, Layers, Bookmark } from 'lucide-react';

export const CharacterDossier: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div>
          <h3 className="text-base font-semibold text-stone-900">Character Dossier & 3D Specs</h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Topology, shading pipeline, and storytelling design intent
          </p>
        </div>
        <div className="text-xs font-mono text-stone-400">
          Pixar Animation Pipeline
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Character Story & Design Intent */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-800 uppercase tracking-wider">
            <Bookmark className="w-4 h-4 text-amber-500" />
            <span>Character Lore</span>
          </div>

          <div className="bg-stone-50 rounded-lg p-4 border border-stone-200/60 space-y-2.5">
            <div className="flex items-baseline justify-between">
              <span className="text-base font-bold text-stone-900">{CHARACTER_BIO.name}</span>
              <span className="text-xs font-mono text-stone-500">Age: {CHARACTER_BIO.age} Years Old</span>
            </div>
            <div className="text-xs text-amber-700 font-medium">
              {CHARACTER_BIO.archetype}
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {CHARACTER_BIO.personality}
            </p>
            <div className="pt-2 border-t border-stone-200/60 text-xs text-stone-500">
              <strong className="text-stone-700 font-medium">Key Prop:</strong> {CHARACTER_BIO.favoriteItem}
            </div>
            <div className="text-xs text-stone-500">
              <strong className="text-stone-700 font-medium">Signature Style:</strong> {CHARACTER_BIO.wardrobeNotes}
            </div>
          </div>
        </div>

        {/* 3D Render & Engine Specifications */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-800 uppercase tracking-wider">
            <Cpu className="w-4 h-4 text-indigo-500" />
            <span>Unreal Engine 5 Render Pipeline</span>
          </div>

          <div className="border border-stone-200 rounded-lg overflow-hidden divide-y divide-stone-100">
            {TECH_SPECS.map((spec, index) => (
              <div
                key={spec.label}
                className="px-3.5 py-2.5 flex items-center justify-between text-xs hover:bg-stone-50/80 transition-colors"
              >
                <span className="text-stone-500 font-medium">{spec.label}</span>
                <span className="text-stone-900 font-semibold text-right pl-3 truncate max-w-[60%]">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
