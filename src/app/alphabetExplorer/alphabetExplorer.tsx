import React, { useState, useCallback } from 'react';
import { DisplayCard } from './components/DisplayCard';
import { Keyboard } from './components/Keyboard';
// import { generateAlphaContent } from './services/geminiService';
import { GeneratedContent, LoadingState } from './types';

const AlphabetExplorer: React.FC = () => {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    status: 'idle'
  });

  const handleLetterClick = useCallback(
    async (letter: string) => {
      // If clicking the same letter, do nothing unless it was an error state
      if (letter === activeLetter && loadingState.status === 'success') return;

      // Prevent clicking while loading another letter to avoid race conditions
      if (loadingState.status === 'loading') return;

      setActiveLetter(letter);
      setLoadingState({ status: 'success' });
      setContent(null); // Clear previous content immediately for better UX feedback

      // try {
      //   const data = await generateAlphaContent(letter);
      //   setContent(data);
      //   setLoadingState({ status: 'success' });
      // } catch (error) {
      //   console.error(error);
      //   setLoadingState({ status: 'error', message: 'Could not generate content.' });
      // }
    },
    [activeLetter, loadingState.status]
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50 font-sans">
      {/* Header */}
      <header className="flex-none pt-6 pb-2 px-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <span className="text-white font-black text-xl">
              {activeLetter ? activeLetter + activeLetter.toLowerCase() : ''}
            </span>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
              ABC
            </h1>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Alphabets Learning
            </p>
          </div>
        </div>

        {/* Simple Github/Info icon link could go here */}
        <div className="hidden">
          <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-500 shadow-sm">
            Powered by Gemini 2.5 Flash
          </span>
        </div>
      </header>

      {/* Main Display Area */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative p-4 md:p-8 flex items-center justify-center">
        {/* Decorative background blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl -z-10 mix-blend-multiply animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl -z-10 mix-blend-multiply animate-pulse"
          style={{ animationDelay: '2s' }}
        />

        <div className="w-full max-w-2xl mx-auto h-full flex flex-col justify-center">
          <DisplayCard
            content={content}
            loadingState={loadingState}
            activeLetter={activeLetter}
          />
        </div>
      </main>

      {/* Keyboard Footer */}
      <footer className="flex-none z-20">
        <Keyboard
          activeLetter={activeLetter}
          onLetterClick={handleLetterClick}
          disabled={loadingState.status === 'loading'}
        />
      </footer>
    </div>
  );
};

export default AlphabetExplorer;
