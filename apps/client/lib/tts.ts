declare global {
  interface Window {
    responsiveVoice: any;
  }
}

export async function speak(text: string) {
  // Pre-process for kid-friendly pronunciation
  const processedText = text.length === 1 ? ` ${text} ` : text;

  try {
    // 1. Try ResponsiveVoice (Premium 3rd party library, very human-like)
    if (typeof window !== "undefined" && window.responsiveVoice) {
      return new Promise<void>((resolve) => {
        window.responsiveVoice.speak(processedText, "US English Female", {
          pitch: 1,
          rate: 0.8, // Slightly slower for kids 2-5
          volume: 1,
          onend: () => resolve(),
        });
      });
    }

    // 2. Fallback to Browser's "Natural/Neural" voices if ResponsiveVoice is not loaded
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(processedText);
      
      const voices = window.speechSynthesis.getVoices();
      const bestVoice = 
        voices.find(v => v.name.includes("Jenny") && v.name.includes("Natural")) ||
        voices.find(v => v.name.includes("Neural")) ||
        voices.find(v => v.lang.startsWith("en"));

      if (bestVoice) {
        utterance.voice = bestVoice;
        utterance.lang = bestVoice.lang;
      }

      utterance.rate = 0.75;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
      
      return new Promise<void>((resolve) => {
        utterance.onend = () => resolve();
        setTimeout(() => resolve(), 2000);
      });
    }
  } catch (error) {
    console.warn("TTS Engines failed, trying Google fallback:", error);
    const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
      processedText
    )}&tl=en&client=tw-ob`;
    const audio = new Audio(googleTtsUrl);
    audio.play().catch(() => {});
  }
}


