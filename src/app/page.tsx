'use client';

import { useState } from 'react';
import alphabets from './alphabets';
import React from 'react';

type AlphabetKey = keyof typeof alphabets;

export default function Home() {
  const [currentAlphabet, setCurrentAlphabet] = useState<AlphabetKey>('A');
  const { word, image } = alphabets[currentAlphabet];
  const imgUrl = `/images/alphabets/${image}`;

  const getNextAlphabet = () => {
    const ascii = currentAlphabet.charCodeAt(0);
    const nextAlphabet = String.fromCharCode(
      ((ascii - 65 + 1) % 26) + 65
    ) as AlphabetKey;
    setCurrentAlphabet(nextAlphabet);
  };

  const handleclick = () => {
    getNextAlphabet();
  };

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

  React.useEffect(() => {
    const savedAlphabet = loadCurrentAlphabet();
    setCurrentAlphabet(savedAlphabet);
  }, []);
  React.useEffect(() => {
    saveCurrentAlphabet(currentAlphabet);
  }, [currentAlphabet]);

  const handleKeyPress = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case 'ArrowRight':
      case ' ':
      case 'Escape':
      case 'Backspace':
      case 'Tab':
      case 'Shift':
      case 'Control':
      case 'Alt':
      case 'Meta':
      case 'CapsLock':
      case 'F1':
      case 'F2':
      case 'F3':
      case 'F4':
      case 'F5':
      case 'F6':
      case 'F7':
      case 'F8':
      case 'F9':
      case 'F10':
      case 'F11':
      case 'F12':
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'ArrowDown':
        event.preventDefault();
        getNextAlphabet();
        break;

      case 'a':
      case 'b':
      case 'c':
      case 'd':
      case 'e':
      case 'f':
      case 'g':
      case 'h':
      case 'i':
      case 'j':
      case 'k':
      case 'l':
      case 'm':
      case 'n':
      case 'o':
      case 'p':
      case 'q':
      case 'r':
      case 's':
      case 't':
      case 'u':
      case 'v':
      case 'w':
      case 'x':
      case 'y':
      case 'z':
        setCurrentAlphabet(event.key.toUpperCase() as AlphabetKey);
        break;
      case 'A':
      case 'B':
      case 'C':
      case 'D':
      case 'E':
      case 'F':
      case 'G':
      case 'H':
      case 'I':
      case 'J':
      case 'K':
      case 'L':
      case 'M':
      case 'N':
      case 'O':
      case 'P':
      case 'Q':
      case 'R':
      case 'S':
      case 'T':
      case 'U':
      case 'V':
      case 'W':
      case 'X':
      case 'Y':
      case 'Z':
        setCurrentAlphabet(event.key as AlphabetKey);
        break;

      default:
        break;
    }
  };

  if (typeof window !== 'undefined') {
    window.onkeydown = handleKeyPress;
  }

  return (
    <main
      className="grid grid-cols-[2fr_3fr] h-full p-20"
      onClick={handleclick}
    >
      <div className="grid place-items-center">
        <div className="text-center">
          <div className="text-9xl">{currentAlphabet}</div>
          <div className="text-7xl mt-20">{word}</div>
        </div>
      </div>
      <div className="grid place-items-center">
        <div>
          <img
            src={imgUrl}
            alt={word}
            className="max-w-full h-auto rounded-3xl w-48 md:w-64 lg:w-128 h-auto"
          />
        </div>
      </div>
    </main>
  );
}
