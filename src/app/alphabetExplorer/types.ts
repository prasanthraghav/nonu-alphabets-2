export interface GeneratedContent {
  word: string;
  imageUrl: string;
  letter: string;
}

export interface LoadingState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export const ALPHABET = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
