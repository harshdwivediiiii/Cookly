import { useState, useEffect } from 'react';

export function useVoice() {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechToText, setSpeechToText] = useState<string>('');

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      // Correctly cast webkitSpeechRecognition to a constructor type
      const recognition = new window.webkitSpeechRecognition();  // This works now

      recognition.interimResults = true;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setSpeechToText(transcript);
      };

      recognition.start();
      setIsListening(true);

      recognition.onend = () => {
        setIsListening(false);
      };
    } else {
      console.error('Speech recognition is not supported in this browser');
    }
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => {
      stopListening();  // Cleanup on unmount
    };
  }, []);

  return { isListening, speechToText, startListening, stopListening, speak };
}
