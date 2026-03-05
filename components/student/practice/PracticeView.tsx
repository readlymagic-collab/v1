"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BackButton from "@/components/common/BackButton";
import { Volume2 } from "lucide-react";

const WORD_LISTS: Record<number, string[]> = {
    1: ["the", "and", "a", "to", "in", "is", "you", "that", "it", "he"],
    2: ["was", "for", "on", "are", "as", "with", "his", "they", "at", "be"],
    3: ["this", "have", "from", "or", "one", "had", "by", "word", "but", "not"],
};

function PracticeContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const level = parseInt(searchParams.get("level") || "1");

    const words = WORD_LISTS[level] || WORD_LISTS[1];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [responses, setResponses] = useState<boolean[]>([]);
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedbackType, setFeedbackType] = useState<"success" | "learning" | null>(null);

    // Function to speak a word
    const speakWord = (word: string) => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = "en-US";
            window.speechSynthesis.speak(utterance);
        }
    };

    // Speak word when it changes
    useEffect(() => {
        if (words[currentIndex]) {
            const timer = setTimeout(() => speakWord(words[currentIndex]), 500);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, words]);

    const handleResponse = (isKnown: boolean) => {
        if (showFeedback) return;

        const newResponses = [...responses];
        newResponses[currentIndex] = isKnown;
        setResponses(newResponses);

        setFeedbackType(isKnown ? "success" : "learning");
        setShowFeedback(true);
    };

    const handleNext = () => {
        if (currentIndex < words.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setShowFeedback(false);
            setFeedbackType(null);
        } else {
            const correctCount = responses.filter((r: boolean) => r).length;
            const accuracy = Math.round((correctCount / words.length) * 100);
            router.push(
                `/student/results?level=${level}&score=${correctCount}&total=${words.length}&accuracy=${accuracy}`
            );
        }
    };

    if (words.length === 0) return null;

    const currentWord = words[currentIndex];
    const progress = ((currentIndex + 1) / words.length) * 100;

    return (
        <div className="cloud-bg flex min-h-screen flex-col items-center p-6 md:p-12">
            <header className="mb-12 flex w-full max-w-2xl items-center justify-between">
                <BackButton href="/student/levels" label="Quit" />
                <div className="text-right">
                    <p className="text-sm font-black tracking-widest text-zinc-400 uppercase">
                        Level {level}
                    </p>
                    <p className="text-lg font-black text-[#2c3e50]">
                        Word {currentIndex + 1} of {words.length}
                    </p>
                </div>
            </header>

            {/* Progress Bar */}
            <div className="mb-16 h-3 w-full max-w-2xl overflow-hidden rounded-full bg-zinc-100 shadow-inner">
                <div
                    className="bg-brand-green h-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <main className="flex w-full max-w-2xl flex-1 flex-col items-center justify-center">
                <div className="relative w-full text-center">
                    {/* Word Display Card */}
                    <div
                        className={`relative rounded-[3rem] border border-zinc-100 bg-white p-16 shadow-2xl transition-all duration-500 md:p-24 ${feedbackType === "success"
                            ? "border-brand-green ring-8 ring-green-50"
                            : feedbackType === "learning"
                                ? "border-brand-orange ring-8 ring-orange-50"
                                : ""
                            }`}
                    >
                        <button
                            onClick={() => speakWord(currentWord)}
                            className="hover:text-brand-green absolute top-8 right-8 rounded-full p-4 text-zinc-300 transition-all hover:bg-zinc-50 active:scale-95"
                            title="Hear word again"
                        >
                            <Volume2 className="h-8 w-8" />
                        </button>
                        <h2 className="animate-in zoom-in-95 text-7xl font-black tracking-tight text-[#2c3e50] duration-500 md:text-9xl">
                            {currentWord}
                        </h2>
                    </div>

                    {/* Response Buttons */}
                    {!showFeedback ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 mt-12 flex flex-col justify-center gap-6 md:flex-row">
                            <button
                                onClick={() => handleResponse(true)}
                                className="bg-brand-green hover:bg-brand-green-hover min-w-[200px] rounded-xl px-8 py-4 font-bold text-white shadow-lg transition-all"
                            >
                                I know it!
                            </button>
                            <button
                                onClick={() => handleResponse(false)}
                                className="bg-brand-orange hover:bg-brand-orange-hover min-w-[200px] rounded-xl px-8 py-4 font-bold text-white shadow-lg transition-all"
                            >
                                I&apos;m learning
                            </button>
                        </div>
                    ) : (
                        <div className="animate-in zoom-in mt-12 space-y-8 duration-300">
                            <p
                                className={`text-2xl font-black ${feedbackType === "success"
                                    ? "text-brand-green"
                                    : "text-brand-orange"
                                    }`}
                            >
                                {feedbackType === "success"
                                    ? "Amazing job! ✨"
                                    : "Good try! Let&apos;s keep practicing! 📚"}
                            </p>
                            <button
                                onClick={handleNext}
                                className="bg-brand-green hover:bg-brand-green-hover min-w-[240px] rounded-xl px-8 py-4 font-bold text-white shadow-lg transition-all"
                            >
                                {currentIndex === words.length - 1
                                    ? "See Results"
                                    : "Next Word →"}
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <footer className="mt-12 text-xs font-black tracking-widest text-zinc-400 uppercase">
                Focus & Have Fun!
            </footer>
        </div>
    );
}

export default function PracticeView() {
    return (
        <Suspense
            fallback={
                <div className="cloud-bg flex min-h-screen items-center justify-center">
                    <div className="border-brand-green h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
                </div>
            }
        >
            <PracticeContent />
        </Suspense>
    );
}
