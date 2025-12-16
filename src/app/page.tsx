'use client';

import { useState } from 'react';
import alphabets from './alphabets';
import React from 'react';
import AlphabetExplorer from './alphabetExplorer/alphabetExplorer';

type AlphabetKey = keyof typeof alphabets;

const saveCurrentAlphabet = (alphabet: AlphabetKey) => {
  localStorage.setItem('currentAlphabet', alphabet);
};

const loadCurrentAlphabet = (): AlphabetKey => {
  const savedAlphabet = localStorage.getItem('currentAlphabet');
  if (savedAlphabet && savedAlphabet in alphabets) {
    return savedAlphabet as AlphabetKey;
  }
  return 'A';
};

const getNextAlphabetKey = (current: AlphabetKey): AlphabetKey => {
  const ascii = current.charCodeAt(0);
  return String.fromCharCode(((ascii - 65 + 1) % 26) + 65) as AlphabetKey;
};

const evaluateKeyPress = (key: string): boolean => {
  const asciiValue = key.charCodeAt(0);
  return (
    (asciiValue >= 65 && asciiValue <= 90) ||
    (asciiValue >= 97 && asciiValue <= 122)
  );
};

export default function Home() {
  const [currentAlphabet, setCurrentAlphabet] = useState<AlphabetKey>('A');
  const { word, image } = alphabets[currentAlphabet];
  const imgUrl = `/images/alphabets/${image}`;

  // Function to get the next alphabet and update the state
  const getNextAlphabet = () => {
    const nextAlphabet = getNextAlphabetKey(currentAlphabet);
    setCurrentAlphabet(nextAlphabet);
  };

  // Handle click event to go to the next alphabet
  const handleclick = () => {
    getNextAlphabet();
  };

  // Handle key press event to set the current alphabet or go to the next one
  const handleKeyPress = (event: KeyboardEvent) => {
    if (evaluateKeyPress(event.key)) {
      setCurrentAlphabet(event.key.toUpperCase() as AlphabetKey);
    } else {
      getNextAlphabet();
    }
  };

  // Attach keydown event listener
  if (typeof window !== 'undefined') {
    window.onkeydown = handleKeyPress;
  }

  // Load saved alphabet on mount and save current alphabet on change
  React.useEffect(() => {
    const savedAlphabet = loadCurrentAlphabet();
    setCurrentAlphabet(savedAlphabet);
  }, []);

  // Save current alphabet to localStorage whenever it changes
  React.useEffect(() => {
    saveCurrentAlphabet(currentAlphabet);
  }, [currentAlphabet]);

  // return (
  //   <main
  //     className="grid  h-full p-10 portrait:grid-rows-[2fr_3fr] landscape:grid-cols-[2fr_3fr]"
  //     onClick={handleclick}
  //   >
  //     <div className="grid place-items-center">
  //       <div className="text-center">
  //         <div className="text-9xl">{currentAlphabet}</div>
  //         <div className="text-5xl mt-4">{word}</div>
  //       </div>
  //     </div>
  //     <div className="grid place-items-center">
  //       <div>
  //         <img
  //           src={imgUrl}
  //           alt={word}
  //           className="max-w-full h-auto rounded-3xl w-64 portrait:w-64 landscape:w-64 md:w-128 lg:w-256 h-auto"
  //         />
  //       </div>
  //     </div>
  //   </main>
  // );

  return <AlphabetExplorer />;
}
