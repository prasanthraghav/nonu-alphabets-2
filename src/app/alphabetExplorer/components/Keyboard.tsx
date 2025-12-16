import React from 'react';
import { ALPHABET } from '../types';

interface KeyboardProps {
  activeLetter: string | null;
  onLetterClick: (letter: string) => void;
  disabled: boolean;
}

export const Keyboard: React.FC<KeyboardProps> = ({
  activeLetter,
  onLetterClick,
  disabled
}) => {
  return (
    <div className="w-full bg-white/80 backdrop-blur-xl border-t border-indigo-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] pb-safe pt-4 px-2 md:px-6 z-50">
      <div className="max-w-4xl mx-auto pb-4">
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {ALPHABET.map((letter) => {
            const isActive = activeLetter === letter;
            return (
              <button
                key={letter}
                onClick={() => onLetterClick(letter)}
                disabled={disabled && !isActive} // Only disable others while loading
                className={`
                  relative overflow-hidden
                  w-10 h-12 md:w-14 md:h-16 rounded-xl md:rounded-2xl
                  flex items-center justify-center
                  text-lg md:text-2xl font-bold
                  transition-all duration-200 ease-out
                  shadow-sm border-b-4
                  ${
                    isActive
                      ? 'bg-indigo-500 border-indigo-700 text-white translate-y-[2px] border-b-0 shadow-inner'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:-translate-y-1 active:border-b-0 active:translate-y-[2px] active:shadow-inner'
                  }
                  ${
                    disabled && !isActive
                      ? 'opacity-50 cursor-not-allowed hover:transform-none'
                      : 'cursor-pointer'
                  }
                `}
                aria-label={`Select letter ${letter}`}
                aria-pressed={isActive}
              >
                {letter}
                {isActive && (
                  <span className="absolute inset-0 bg-white/20 animate-pulse rounded-xl md:rounded-2xl pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      </div>
      {/* Safe area spacer for mobile home bar */}
      <div className="h-4 md:h-2 w-full" />
    </div>
  );
};
