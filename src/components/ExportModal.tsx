import React, { useState, useRef, useEffect } from 'react';
import { Expression, LightingRig, BackdropOption } from '../types';
import { studioAudio } from '../utils/audio';
import { Download, X, Check, Image as ImageIcon, Sparkles, Layers } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  expression: Expression;
  lighting: LightingRig;
  backdrop: BackdropOption;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  expression,
  lighting,
  backdrop,
}) => {
  const [format, setFormat] = useState<'square' | 'circle' | 'poster' | 'polaroid'>('square');
  const [isExporting, setIsExporting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  // Render composite to canvas whenever format or portrait changes
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = expression.imageUrl;

    img.onload = () => {
      // Define canvas dimensions based on format
      if (format === 'square' || format === 'circle') {
        canvas.width = 1024;
        canvas.height = 1024;
      } else if (format === 'poster') {
        canvas.width = 1024;
        canvas.height = 1365; // 3:4 poster
      } else if (format === 'polaroid') {
        canvas.width = 1024;
        canvas.height = 1220;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (format === 'square') {
        // Draw image directly
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Apply lighting tint overlay
        const isWarm = lighting.keyTemperature < 4500;
        ctx.fillStyle = isWarm ? 'rgba(245, 158, 11, 0.08)' : 'rgba(96, 165, 250, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Subtle vignette
        const grad = ctx.createRadialGradient(
          canvas.width / 2, canvas.height / 2, canvas.width * 0.35,
          canvas.width / 2, canvas.height / 2, canvas.width * 0.7
        );
        grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        grad.addColorStop(1, `rgba(0, 0, 0, ${lighting.vignette / 180})`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

      } else if (format === 'circle') {
        // Transparent background with circular crop
        ctx.save();
        ctx.beginPath();
        const radius = canvas.width / 2 - 24;
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Golden rim border
        ctx.restore();
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
        ctx.lineWidth = 14;
        ctx.strokeStyle = '#F59E0B';
        ctx.stroke();

      } else if (format === 'polaroid') {
        // Polaroid white border
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Inner image
        const margin = 60;
        const imgSize = canvas.width - margin * 2;
        ctx.drawImage(img, margin, margin, imgSize, imgSize);

        // Handwritten caption
        ctx.fillStyle = '#262626';
        ctx.font = 'bold 38px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`Maya · ${expression.name}`, canvas.width / 2, canvas.height - 75);

        ctx.fillStyle = '#737373';
        ctx.font = '22px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Pixar 3D Studio Portrait', canvas.width / 2, canvas.height - 35);

      } else if (format === 'poster') {
        // Cinematic movie card layout
        ctx.fillStyle = '#0F172A';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Image in upper portion
        ctx.drawImage(img, 0, 0, canvas.width, canvas.width);

        // Bottom gradient blend
        const scrim = ctx.createLinearGradient(0, canvas.width * 0.7, 0, canvas.width);
        scrim.addColorStop(0, 'rgba(15, 23, 42, 0)');
        scrim.addColorStop(1, '#0F172A');
        ctx.fillStyle = scrim;
        ctx.fillRect(0, canvas.width * 0.7, canvas.width, canvas.width * 0.3);

        // Film Title Typography
        ctx.fillStyle = '#F59E0B';
        ctx.font = 'bold 64px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('MAYA', canvas.width / 2, canvas.width + 120);

        ctx.fillStyle = '#E2E8F0';
        ctx.font = '24px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('THE ADVENTURES OF A 9-YEAR-OLD INVENTOR', canvas.width / 2, canvas.width + 170);

        ctx.fillStyle = '#94A3B8';
        ctx.font = '18px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('A PIXAR-INSPIRED 3D ANIMATION CHARACTER STUDY', canvas.width / 2, canvas.width + 215);
      }

      setPreviewUrl(canvas.toDataURL('image/png'));
    };
  }, [isOpen, format, expression, lighting, backdrop]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsExporting(true);
    studioAudio.playShutter();

    const link = document.createElement('a');
    link.download = `maya-pixar-portrait-${format}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    setTimeout(() => {
      setIsExporting(false);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-stone-900">
              Export 3D Character Portrait
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Render high-resolution PNG snapshots with custom layout frames
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Format Picker */}
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-2">
              Select Output Format
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'square', label: '1:1 Square Avatar', desc: 'Discord / Social' },
                { id: 'circle', label: 'PFP Circle Badge', desc: 'Circular Profile' },
                { id: 'poster', label: 'Cinematic Poster', desc: 'Movie Card' },
                { id: 'polaroid', label: 'Polaroid Studio', desc: 'Collector Print' },
              ].map((f) => {
                const isSelected = format === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => {
                      studioAudio.playMarimba(1);
                      setFormat(f.id as typeof format);
                    }}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-stone-900">{f.label}</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">{f.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Render Preview Frame */}
          <div className="flex flex-col items-center justify-center p-4 bg-stone-100 rounded-xl border border-stone-200/80">
            <canvas ref={canvasRef} className="hidden" />
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Export preview"
                className="max-h-[340px] w-auto rounded-lg shadow-md object-contain border border-white"
              />
            ) : (
              <div className="h-48 flex items-center justify-center text-xs text-stone-400">
                Rendering preview...
              </div>
            )}
            <div className="mt-3 text-xs text-stone-500 flex items-center gap-2">
              <span>{expression.name}</span>
              <span aria-hidden="true">·</span>
              <span>1024px High Resolution PNG</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="px-5 py-2.5 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-lg shadow-sm transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Saving Image...' : 'Download PNG Snapshot'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
