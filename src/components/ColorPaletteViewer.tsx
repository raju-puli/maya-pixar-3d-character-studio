import React, { useState } from 'react';
import { COLOR_SWATCHES } from '../data/characterData';
import { studioAudio } from '../utils/audio';
import { Copy, Check, Palette } from 'lucide-react';

export const ColorPaletteViewer: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex).then(() => {
      studioAudio.playMarimba(4);
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 2000);
    });
  };

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div>
          <h3 className="text-base font-semibold text-stone-900">Color Palette Inspector</h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Key chromatic values extracted from Maya&apos;s 3D render textures
          </p>
        </div>
        <span className="text-xs text-stone-400 font-mono">
          5 Core Swatches
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {COLOR_SWATCHES.map((swatch) => {
          const isCopied = copiedHex === swatch.hex;
          return (
            <div
              key={swatch.hex}
              onClick={() => copyToClipboard(swatch.hex)}
              className="group cursor-pointer rounded-lg border border-stone-200 overflow-hidden hover:border-amber-400 hover:shadow-md transition-all bg-stone-50/50 flex flex-col"
            >
              {/* Color Box */}
              <div
                className="h-20 w-full relative transition-transform group-hover:scale-102 flex items-end justify-end p-2"
                style={{ backgroundColor: swatch.hex }}
              >
                <button
                  type="button"
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded bg-black/40 text-white backdrop-blur-sm transition-opacity"
                  title="Copy Hex"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Swatch Details */}
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-stone-900">
                      {swatch.hex}
                    </span>
                    {isCopied && (
                      <span className="text-[10px] font-medium text-emerald-600">
                        Copied!
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-stone-800 mt-1">
                    {swatch.name}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    {swatch.role}
                  </div>
                </div>

                <div className="text-[10px] text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                  {swatch.note}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-xs text-stone-500 pt-2 flex items-center justify-between">
        <span>Click any swatch to copy hex code to clipboard</span>
        <span className="font-mono text-stone-400">SRGB · Gamma 2.2</span>
      </div>
    </div>
  );
};
