import React from 'react';
import { GeneratedContent, LoadingState } from '../types';
import alphabets from '../../alphabets';

interface DisplayCardProps {
  content: GeneratedContent | null;
  loadingState: LoadingState;
  activeLetter: string | null;
}

export const DisplayCard: React.FC<DisplayCardProps> = ({
  content,
  loadingState,
  activeLetter
}) => {
  if (!activeLetter) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center animate-in fade-in duration-700">
        <div className="w-24 h-24 mb-6 rounded-full bg-indigo-50 flex items-center justify-center border-4 border-dashed border-indigo-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 text-indigo-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-600 mb-2">
          Ready to Learn?
        </h2>
        <p className="max-w-xs mx-auto">
          Tap a letter on the keyboard below to generate a magical illustration!
        </p>
      </div>
    );
  }

  const isLoading = loadingState.status === 'loading';
  const isError = loadingState.status === 'error';

  return (
    <div className="relative w-full max-w-lg aspect-[4/5] md:aspect-square bg-white rounded-[2.5rem] shadow-2xl overflow-hidden ring-8 ring-white/50 transition-all duration-500 mx-auto">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-pink-50/50 pointer-events-none" />

      {/* Main Content Container */}
      <div className="absolute inset-0 flex flex-col items-center p-6 md:p-10">
        {/* Top Letter Indicator */}
        <div className="w-full flex justify-between items-start mb-4 z-10">
          <span className="text-[5rem] md:text-[6rem] leading-none font-black text-indigo-600 drop-shadow-sm select-none">
            {activeLetter}
          </span>
          <span className="text-[5rem] md:text-[6rem] leading-none font-black text-indigo-200/50 select-none">
            {activeLetter.toLowerCase()}
          </span>
        </div>

        {/* Image Area */}
        <div className="flex-1 w-full relative flex items-center justify-center mb-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-4 animate-pulse">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-slate-100 flex items-center justify-center">
                <svg
                  className="animate-spin h-12 w-12 text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
              <p className="text-indigo-400 font-semibold tracking-wide text-sm uppercase">
                Dreaming up a picture...
              </p>
            </div>
          ) : isError ? (
            <div className="text-center p-6 bg-red-50 rounded-2xl border border-red-100">
              <p className="text-red-500 font-bold mb-1">Oops!</p>
              <p className="text-red-400 text-sm">
                Something went wrong. Try again?
              </p>
            </div>
          ) : (
            <div className="relative group w-full h-full flex items-center justify-center">
              <img
                src={`./images/alphabets/${
                  alphabets[activeLetter as keyof typeof alphabets].image
                }`}
                alt={content?.word}
                className="max-w-full max-h-full object-contain drop-shadow-2xl transition-transform duration-700 ease-out transform group-hover:scale-105 rounded-[2.5rem]"
                style={{ maxHeight: '300px' }}
              />
            </div>
          )}
        </div>

        {/* Word Label */}
        <div className="w-full text-center min-h-[4rem] z-10">
          {!isLoading && !isError && content && (
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500 tracking-tight animate-in slide-in-from-bottom-4 duration-500">
              {content.word}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};
