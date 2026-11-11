import React from 'react';
import { Expression } from '../types';
import { EXPRESSIONS } from '../data/characterData';
import { studioAudio } from '../utils/audio';
import { Smile, Sparkles, Eye } from 'lucide-react';

interface ExpressionSelectorProps {
  currentExpression: Expression;
  onSelectExpression: (expression: Expression) => void;
}

export const ExpressionSelector: React.FC<ExpressionSelectorProps> = ({
  currentExpression,
  onSelectExpression,
}) => {
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-stone-900">Character Expressions</h3>
          <p className="text-xs text-stone-500 mt-0.5">
            4 Pixar-style facial rigs rendered in 8K resolution
          </p>
        </div>
        <div className="text-xs font-mono text-stone-400">
          {EXPRESSIONS.length} Rigs Available
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {EXPRESSIONS.map((exp, index) => {
          const isSelected = currentExpression.id === exp.id;
          return (
            <button
              key={exp.id}
              onClick={() => {
                studioAudio.playChime(1.0 + index * 0.15);
                onSelectExpression(exp);
              }}
              className={`group text-left rounded-lg p-2 transition-all border ${
                isSelected
                  ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20'
                  : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
              }`}
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-square rounded-md overflow-hidden bg-stone-100 mb-2 border border-stone-200/60">
                <img
                  src={exp.imageUrl}
                  alt={exp.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  referrerPolicy="no-referrer"
                />
                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
                )}
              </div>

              {/* Information */}
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-stone-900 flex items-center justify-between">
                  <span>{exp.name}</span>
                </div>
                <div className="text-[11px] text-stone-500 truncate">
                  {exp.mood}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Expression Detail Drawer */}
      <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600">
        <div className="flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-stone-400" />
          <span>Eye Focus: <strong className="text-stone-800 font-medium">{currentExpression.eyeFocus}</strong></span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>Smile: <strong className="text-stone-800 font-medium">{currentExpression.smileType}</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          {currentExpression.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] rounded bg-stone-100 text-stone-600 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
