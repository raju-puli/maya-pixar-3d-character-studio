import React from 'react';
import { LightingRig, BackdropOption } from '../types';
import { BACKDROPS, DEFAULT_LIGHTING } from '../data/characterData';
import { studioAudio } from '../utils/audio';
import { Sun, Moon, Focus, Sparkles, Sliders, Palette, RotateCcw } from 'lucide-react';

interface LightingRigControlsProps {
  lighting: LightingRig;
  backdrop: BackdropOption;
  onUpdateLighting: (patch: Partial<LightingRig>) => void;
  onSelectBackdrop: (backdrop: BackdropOption) => void;
}

export const LightingRigControls: React.FC<LightingRigControlsProps> = ({
  lighting,
  backdrop,
  onUpdateLighting,
  onSelectBackdrop,
}) => {
  const applyPreset = (presetName: string) => {
    studioAudio.playSwitch();
    switch (presetName) {
      case 'pixar':
        onUpdateLighting(DEFAULT_LIGHTING);
        onSelectBackdrop(BACKDROPS[0]);
        break;
      case 'dramatic':
        onUpdateLighting({
          keyIntensity: 85,
          keyAngle: 280,
          keyTemperature: 5500,
          fillIntensity: 20,
          rimIntensity: 90,
          rimColor: '#60A5FA',
          depthOfField: 45,
          vignette: 45,
          bloom: 25,
        });
        onSelectBackdrop(BACKDROPS[2]);
        break;
      case 'sunset':
        onUpdateLighting({
          keyIntensity: 90,
          keyAngle: 30,
          keyTemperature: 3200,
          fillIntensity: 50,
          rimIntensity: 80,
          rimColor: '#F59E0B',
          depthOfField: 30,
          vignette: 20,
          bloom: 35,
        });
        onSelectBackdrop(BACKDROPS[1]);
        break;
      case 'highkey':
        onUpdateLighting({
          keyIntensity: 70,
          keyAngle: 90,
          keyTemperature: 4800,
          fillIntensity: 75,
          rimIntensity: 40,
          rimColor: '#FDE047',
          depthOfField: 20,
          vignette: 10,
          bloom: 15,
        });
        onSelectBackdrop(BACKDROPS[3]);
        break;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div>
          <h3 className="text-base font-semibold text-stone-900">Cinematic Lighting Rig</h3>
          <p className="text-xs text-stone-500 mt-0.5">
            3-point volumetric lighting, depth of field and backdrop control
          </p>
        </div>
        <button
          onClick={() => {
            studioAudio.playMarimba(0);
            onUpdateLighting(DEFAULT_LIGHTING);
            onSelectBackdrop(BACKDROPS[0]);
          }}
          className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1.5 py-1 px-2 rounded-md hover:bg-stone-100 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Preset Quick Buttons */}
      <div>
        <label className="text-xs font-semibold text-stone-700 block mb-2">
          Studio Presets
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => applyPreset('pixar')}
            className="px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 font-medium text-stone-800 transition-colors text-left"
          >
            Classic Pixar
          </button>
          <button
            onClick={() => applyPreset('sunset')}
            className="px-3 py-1.5 text-xs rounded-lg border border-amber-200 bg-amber-50/70 hover:bg-amber-100 font-medium text-amber-900 transition-colors text-left"
          >
            Golden Hour
          </button>
          <button
            onClick={() => applyPreset('dramatic')}
            className="px-3 py-1.5 text-xs rounded-lg border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 font-medium text-indigo-900 transition-colors text-left"
          >
            UE5 Dramatic
          </button>
          <button
            onClick={() => applyPreset('highkey')}
            className="px-3 py-1.5 text-xs rounded-lg border border-purple-200 bg-purple-50/70 hover:bg-purple-100 font-medium text-purple-900 transition-colors text-left"
          >
            Soft Lavender
          </button>
        </div>
      </div>

      {/* Backdrop Selector */}
      <div>
        <label className="text-xs font-semibold text-stone-700 block mb-2">
          Studio Cyclorama Backdrop
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {BACKDROPS.map((bd) => {
            const isSelected = backdrop.id === bd.id;
            return (
              <button
                key={bd.id}
                onClick={() => {
                  studioAudio.playMarimba(2);
                  onSelectBackdrop(bd);
                }}
                className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'border-amber-500 ring-2 ring-amber-500/20 bg-stone-50'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div
                  className="w-5 h-5 rounded-md border border-black/10 shrink-0 shadow-sm"
                  style={{ background: bd.gradientStyle }}
                />
                <span className="text-xs font-medium text-stone-800 truncate">
                  {bd.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lighting Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-stone-100">
        {/* Key Light Intensity */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-stone-700 flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              Key Light Intensity
            </span>
            <span className="font-mono text-stone-500">{lighting.keyIntensity}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={lighting.keyIntensity}
            onChange={(e) => onUpdateLighting({ keyIntensity: Number(e.target.value) })}
            className="w-full h-1.5 bg-stone-200 rounded-lg cursor-pointer"
          />
        </div>

        {/* Key Light Angle */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-stone-700">Key Light Rotation</span>
            <span className="font-mono text-stone-500">{lighting.keyAngle}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            value={lighting.keyAngle}
            onChange={(e) => onUpdateLighting({ keyAngle: Number(e.target.value) })}
            className="w-full h-1.5 bg-stone-200 rounded-lg cursor-pointer"
          />
        </div>

        {/* Color Temperature */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-stone-700">Light Temperature</span>
            <span className="font-mono text-stone-500">
              {lighting.keyTemperature < 4000 ? 'Warm Golden' : lighting.keyTemperature > 5000 ? 'Cool Daylight' : 'Neutral Studio'}
            </span>
          </div>
          <input
            type="range"
            min="2700"
            max="6500"
            step="100"
            value={lighting.keyTemperature}
            onChange={(e) => onUpdateLighting({ keyTemperature: Number(e.target.value) })}
            className="w-full h-1.5 bg-gradient-to-r from-amber-400 via-stone-200 to-sky-300 rounded-lg cursor-pointer"
          />
        </div>

        {/* Rim Light Intensity */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-stone-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
              Hair Rim Light Silhouette
            </span>
            <span className="font-mono text-stone-500">{lighting.rimIntensity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={lighting.rimIntensity}
            onChange={(e) => onUpdateLighting({ rimIntensity: Number(e.target.value) })}
            className="w-full h-1.5 bg-stone-200 rounded-lg cursor-pointer"
          />
        </div>

        {/* Depth of Field (Aperture Bokeh) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-stone-700 flex items-center gap-1.5">
              <Focus className="w-3.5 h-3.5 text-stone-600" />
              Depth of Field (Aperture Bokeh)
            </span>
            <span className="font-mono text-stone-500">
              f/{(1.4 + ((100 - lighting.depthOfField) / 100) * 6).toFixed(1)}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={lighting.depthOfField}
            onChange={(e) => onUpdateLighting({ depthOfField: Number(e.target.value) })}
            className="w-full h-1.5 bg-stone-200 rounded-lg cursor-pointer"
          />
        </div>

        {/* Cinematic Vignette */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-stone-700">Cinematic Vignette Falloff</span>
            <span className="font-mono text-stone-500">{lighting.vignette}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="80"
            value={lighting.vignette}
            onChange={(e) => onUpdateLighting({ vignette: Number(e.target.value) })}
            className="w-full h-1.5 bg-stone-200 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
