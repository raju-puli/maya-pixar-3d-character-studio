import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Expression, LightingRig, BackdropOption } from '../types';
import { studioAudio } from '../utils/audio';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sun,
  Maximize2,
  Sparkles,
  Sliders,
  Layers,
  Info
} from 'lucide-react';

interface StudioViewportProps {
  expression: Expression;
  lighting: LightingRig;
  backdrop: BackdropOption;
  onUpdateLighting: (patch: Partial<LightingRig>) => void;
  onOpenExport: () => void;
}

export const StudioViewport: React.FC<StudioViewportProps> = ({
  expression,
  lighting,
  backdrop,
  onUpdateLighting,
  onOpenExport,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showLightGizmo, setShowLightGizmo] = useState(true);
  const [isDraggingGizmo, setIsDraggingGizmo] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(true);

  // Smooth mouse tilt handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });

    // Subtle 3D tilt: max 12 deg
    const targetRotY = (x - 0.5) * 16;
    const targetRotX = (0.5 - y) * 16;
    setRotateX(targetRotX);
    setRotateY(targetRotY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setMousePos({ x: 0.5, y: 0.5 });
  };

  // Light angle gizmo drag interaction
  const handleGizmoPointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsDraggingGizmo(true);
  };

  const handleGizmoPointerMove = useCallback((e: PointerEvent) => {
    if (!isDraggingGizmo || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    let angleDeg = Math.round((Math.atan2(deltaY, deltaX) * 180) / Math.PI);
    if (angleDeg < 0) angleDeg += 360;
    onUpdateLighting({ keyAngle: angleDeg });
  }, [isDraggingGizmo, onUpdateLighting]);

  const handleGizmoPointerUp = useCallback(() => {
    if (isDraggingGizmo) {
      setIsDraggingGizmo(false);
      studioAudio.playSwitch();
    }
  }, [isDraggingGizmo]);

  useEffect(() => {
    if (isDraggingGizmo) {
      window.addEventListener('pointermove', handleGizmoPointerMove);
      window.addEventListener('pointerup', handleGizmoPointerUp);
      return () => {
        window.removeEventListener('pointermove', handleGizmoPointerMove);
        window.removeEventListener('pointerup', handleGizmoPointerUp);
      };
    }
  }, [isDraggingGizmo, handleGizmoPointerMove, handleGizmoPointerUp]);

  // Calculate light position coordinates from angle
  const angleRad = (lighting.keyAngle * Math.PI) / 180;
  const lightRadius = 45; // percentage from center
  const lightX = 50 + lightRadius * Math.cos(angleRad);
  const lightY = 50 + lightRadius * Math.sin(angleRad);

  // Key light color based on temperature (warm 2700K to daylight 6500K)
  const isWarm = lighting.keyTemperature < 4500;
  const keyLightColor = isWarm
    ? `rgba(255, 235, 195, ${lighting.keyIntensity / 100 * 0.45})`
    : `rgba(215, 235, 255, ${lighting.keyIntensity / 100 * 0.45})`;

  return (
    <div className="relative flex flex-col items-center">
      {/* 3D Stage Card Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-[560px] aspect-square rounded-2xl p-3 bg-stone-100 border border-stone-200/80 shadow-xl transition-shadow select-none group perspective-1000"
        style={{ cursor: isDraggingGizmo ? 'grabbing' : 'default' }}
      >
        {/* Dynamic Tilt Stage */}
        <div
          className="relative w-full h-full rounded-xl overflow-hidden shadow-inner transition-transform duration-150 ease-out preserve-3d"
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.015 : 1}, ${isHovered ? 1.015 : 1}, 1)`,
            background: backdrop.gradientStyle,
          }}
        >
          {/* Depth of field backdrop blur layer */}
          <div
            className="absolute inset-0 transition-all duration-300 pointer-events-none"
            style={{
              backdropFilter: `blur(${(lighting.depthOfField / 100) * 12}px)`,
              opacity: lighting.depthOfField / 100,
            }}
          />

          {/* Character Portrait Image */}
          <div
            className={`relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out ${
              isZoomed ? 'scale-135' : 'scale-100'
            }`}
          >
            <img
              src={expression.imageUrl}
              alt={`Pixar 3D portrait of 9-year-old girl in yellow hoodie - ${expression.name}`}
              className="w-full h-full object-cover object-center pointer-events-none"
              referrerPolicy="no-referrer"
              onLoad={() => setImageLoaded(true)}
            />

            {/* Zero Broken Image Fallback Container */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-amber-50 text-stone-700 p-6 text-center">
                <Sparkles className="w-12 h-12 text-amber-500 mb-2" />
                <p className="font-semibold text-sm">Pixar 3D Character Portrait</p>
                <p className="text-xs text-stone-500 mt-1">Maya · 9-Year-Old Girl in Yellow Hoodie</p>
              </div>
            )}
          </div>

          {/* Volumetric Key Light Highlight Overlay */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle at ${lightX}% ${lightY}%, ${keyLightColor} 0%, transparent 65%)`,
              opacity: lighting.keyIntensity / 100,
            }}
          />

          {/* Mouse Specular Shimmer */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)`,
              opacity: isHovered ? 0.7 : 0,
            }}
          />

          {/* Rim Light Silhouette Glow */}
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-200"
            style={{
              boxShadow: `inset 0 0 ${lighting.rimIntensity * 0.4}px ${lighting.rimIntensity * 0.15}px ${lighting.rimColor}40`,
              opacity: lighting.rimIntensity / 100,
            }}
          />

          {/* Cinematic Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, transparent 40%, rgba(10, 10, 15, ${lighting.vignette / 120}) 100%)`,
            }}
          />

          {/* Bloom Warmth Diffusion */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-300"
            style={{
              background: 'radial-gradient(circle at 50% 30%, rgba(254, 240, 138, 0.25) 0%, transparent 60%)',
              opacity: lighting.bloom / 100,
            }}
          />

          {/* Interactive Light Angle Gizmo Overlay */}
          {showLightGizmo && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              {/* Dashed orbit track */}
              <div className="w-[90%] h-[90%] rounded-full border border-dashed border-stone-400/25 pointer-events-none" />

              {/* Draggable light source node */}
              <div
                onPointerDown={handleGizmoPointerDown}
                title={`Key Light: ${lighting.keyAngle}° (Drag to rotate)`}
                className="absolute w-8 h-8 -ml-4 -mt-4 rounded-full bg-amber-400 border-2 border-white shadow-md flex items-center justify-center cursor-grab active:cursor-grabbing pointer-events-auto hover:scale-110 active:scale-95 transition-transform"
                style={{
                  left: `${lightX}%`,
                  top: `${lightY}%`,
                }}
              >
                <Sun className="w-4 h-4 text-stone-900" />
              </div>
            </div>
          )}

          {/* Floating Viewport Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
            <span className="text-xs font-semibold px-2.5 py-1 bg-stone-900/75 text-white backdrop-blur-md rounded-md shadow-sm">
              {expression.name}
            </span>
            <span className="text-xs px-2 py-0.5 bg-white/80 text-stone-700 backdrop-blur-md rounded-md border border-stone-200/60 font-mono">
              8K · UE5
            </span>
          </div>
        </div>

        {/* Viewport Control Bar */}
        <div className="mt-3 flex items-center justify-between w-full px-1">
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <span>Move cursor to tilt 3D depth</span>
            <span aria-hidden="true">·</span>
            <span>Key Light {lighting.keyAngle}°</span>
          </div>

          <div className="flex items-center gap-1">
            {/* Toggle Light Gizmo */}
            <button
              onClick={() => {
                studioAudio.playSwitch();
                setShowLightGizmo(!showLightGizmo);
              }}
              title={showLightGizmo ? 'Hide light gizmo' : 'Show light gizmo'}
              className={`p-1.5 rounded-md transition-colors text-xs flex items-center gap-1 ${
                showLightGizmo
                  ? 'bg-amber-100 text-amber-900 font-medium'
                  : 'text-stone-500 hover:bg-stone-200'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Rig</span>
            </button>

            {/* Zoom Toggle */}
            <button
              onClick={() => {
                studioAudio.playMarimba(3);
                setIsZoomed(!isZoomed);
              }}
              title={isZoomed ? 'Zoom Out' : 'Zoom In on Texture Detail'}
              className={`p-1.5 rounded-md transition-colors text-xs flex items-center gap-1 ${
                isZoomed
                  ? 'bg-stone-900 text-white font-medium'
                  : 'text-stone-600 hover:bg-stone-200'
              }`}
            >
              {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isZoomed ? 'Fit' : 'Detail'}</span>
            </button>

            {/* Reset 3D Angle */}
            <button
              onClick={() => {
                studioAudio.playMarimba(0);
                setRotateX(0);
                setRotateY(0);
                onUpdateLighting({ keyAngle: 45, depthOfField: 35 });
              }}
              title="Reset View & Lighting"
              className="p-1.5 text-stone-600 hover:bg-stone-200 rounded-md transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
