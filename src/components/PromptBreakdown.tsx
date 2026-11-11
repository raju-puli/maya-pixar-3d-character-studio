import React, { useState } from 'react';
import { ORIGINAL_PROMPT } from '../data/characterData';
import { studioAudio } from '../utils/audio';
import { Terminal, Copy, Check, Sparkles, Sliders } from 'lucide-react';

export const PromptBreakdown: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyPrompt = () => {
    navigator.clipboard.writeText(ORIGINAL_PROMPT).then(() => {
      studioAudio.playMarimba(3);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const tokenPillars = [
    {
      category: 'Character Subject',
      items: ['9-year-old girl', 'curly dark brown hair in two puffs', 'big brown eyes', 'warm smile', 'playful expression'],
      color: 'border-amber-300 bg-amber-50/60 text-amber-950',
    },
    {
      category: 'Costume & Textures',
      items: ['yellow hoodie', 'red backpack straps', 'intricate texture on clothing', 'fleece weave'],
      color: 'border-red-300 bg-red-50/60 text-red-950',
    },
    {
      category: 'Lighting Rig',
      items: ['soft studio lighting', 'volumetric cinematic lighting', 'cream background', 'subtle depth of field'],
      color: 'border-amber-200 bg-amber-50/40 text-stone-900',
    },
    {
      category: 'Render Engine',
      items: ['Unreal Engine 5', 'Pixar-style 3D portrait', '8k resolution', 'centered bust shot 1:1', 'masterpiece'],
      color: 'border-indigo-200 bg-indigo-50/60 text-indigo-950',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div>
          <h3 className="text-base font-semibold text-stone-900">Generation Prompt & Token Breakdown</h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Original prompt weights and semantic structure
          </p>
        </div>
        <button
          onClick={copyPrompt}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800 transition-colors flex items-center gap-1.5 shadow-sm"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied Prompt' : 'Copy Full Prompt'}</span>
        </button>
      </div>

      {/* Raw Prompt Block */}
      <div className="relative rounded-lg bg-stone-900 text-stone-100 p-4 font-mono text-xs leading-relaxed overflow-x-auto shadow-inner">
        <p className="text-amber-300 select-all">{ORIGINAL_PROMPT}</p>
      </div>

      {/* Semantic Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {tokenPillars.map((pillar) => (
          <div
            key={pillar.category}
            className={`rounded-lg border p-3 ${pillar.color}`}
          >
            <div className="text-xs font-bold uppercase tracking-wider mb-2">
              {pillar.category}
            </div>
            <ul className="space-y-1 text-xs">
              {pillar.items.map((item) => (
                <li key={item} className="flex items-start gap-1.5">
                  <span className="text-stone-400 select-none">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
