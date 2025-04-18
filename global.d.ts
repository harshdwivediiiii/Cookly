// global.d.ts

declare global {
  // Extend the Window interface to include webkitSpeechRecognition
  interface Window {
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }

  // Extend the SpeechRecognitionEvent interface to include necessary properties
  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    interpretation?: string;  // You can adjust the type based on the API (e.g., `string` or `void` if unused)
    lang: string;
  }

  // Define the SpeechRecognition interface, which will be used by SpeechRecognition objects
  interface SpeechRecognition {
    start(): void;
    stop(): void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: Event) => void;
    onend: () => void;
    interimResults: boolean;
  }

  // Define the SpeechRecognitionConstructor interface to type the constructor
  interface SpeechRecognitionConstructor {
    new (): SpeechRecognition;  // Constructor type for SpeechRecognition
  }
}

// Ensures the file is treated as a module
export {};
