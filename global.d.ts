declare global {
    interface Window {
      webkitSpeechRecognition: SpeechRecognitionConstructor;
    }
  
    interface SpeechRecognitionEvent extends Event {
      results: SpeechRecognitionResultList;
      interpretation?: void;  // Type accordingly if needed
      language: string;
    }
  
    interface SpeechRecognition {
      start(): void;
      stop(): void;
      onresult: (event: SpeechRecognitionEvent) => void;
      onerror: (event: Event) => void;
      onend: () => void;
      interimResults: boolean;
    }
  
    interface SpeechRecognitionConstructor {
      new (): SpeechRecognition;  // Constructor type for SpeechRecognition
    }
  }
  
  export {};
  