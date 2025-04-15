// lib/voice.ts

export interface SpeakOptions {
    pitch?: number;
    rate?: number;
    volume?: number;
    lang?: string;  // lang is optional
    voiceName?: string;  // Optional voice name
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (e: SpeechSynthesisErrorEvent) => void;
  }
  
  // Speak function with support for multiple languages
  export function speak(text: string, options: SpeakOptions = {}) {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      console.error("Speech synthesis is not supported in this environment.");
      return;
    }
  
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
  
    if (synth.speaking) synth.cancel();
  
    const utterance = new SpeechSynthesisUtterance(text);
  
    // Select voice by name
    let selectedVoice: SpeechSynthesisVoice | null = null;
    if (options.voiceName) {
      selectedVoice = voices.find(v => v.name === options.voiceName) || null;
    }
  
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
  
    // Assign lang directly if provided
    if (options.lang) {
      utterance.lang = options.lang;
    }
  
    utterance.pitch = options.pitch ?? 1;
    utterance.rate = options.rate ?? 1;
    utterance.volume = options.volume ?? 1;
  
    if (options.onStart) utterance.onstart = options.onStart;
    if (options.onEnd) utterance.onend = options.onEnd;
    if (options.onError) utterance.onerror = options.onError;
  
    synth.speak(utterance);
  }
  
  // Get available voices grouped by language
  export function getVoicesGroupedByLang(): Record<string, SpeechSynthesisVoice[]> {
    const voices = window.speechSynthesis?.getVoices() || [];
    const grouped: Record<string, SpeechSynthesisVoice[]> = {};
    voices.forEach(voice => {
      const lang = voice.lang;
      if (!grouped[lang]) grouped[lang] = [];
      grouped[lang].push(voice);
    });
    return grouped;
  }
  
  // Check if speech synthesis is supported in the browser
  export function isSpeechSupported(): boolean {
    return typeof window !== "undefined" && !!window.speechSynthesis;
  }
  
  // Check if speech synthesis is supported in the browser and has at least one voice   
    export function isSpeechAvailable(): boolean {
        return isSpeechSupported() && window.speechSynthesis.getVoices().length > 0;
    }
    
    // Check if speech synthesis is supported in the browser and has at least one voice for a specific language
    export function isSpeechAvailableForLang(lang: string): boolean {
        return isSpeechSupported() && window.speechSynthesis.getVoices().some(voice => voice.lang.startsWith(lang));
    }
    
    // Check if speech synthesis is supported in the browser and has at least one voice for a specific language
    export function isSpeechAvailableForLangs(langs: string[]): boolean {
        return isSpeechSupported() && langs.some(lang => window.speechSynthesis.getVoices().some(voice => voice.lang.startsWith(lang)));
    }  