"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { DotLottiePlayer } from "@dotlottie/react-player";
import Navbar from "@/components/common/Navbar";
import { saveSessionResult } from "@/lib/storage";
import { speak } from "@/lib/tts";

function ResultsContent() {
  const searchParams = useSearchParams();
  const level = parseInt(searchParams.get("level") || "1");
  const score = parseInt(searchParams.get("score") || "0");
  const total = parseInt(searchParams.get("total") || "10");
  const accuracy = parseInt(searchParams.get("accuracy") || "0");

  useEffect(() => {
    saveSessionResult({
      date: new Date().toISOString(),
      score,
      total,
      accuracy,
      level,
    });

    const message = accuracy >= 80 
      ? "Amazing job! You are a reading wizard!" 
      : "Great work! You are doing so well, keep it up!";
    
    const timer = setTimeout(() => speak(message), 1000);
    return () => clearTimeout(timer);
  }, [level, score, total, accuracy]);

  const isHighScorer = accuracy >= 80;

  return (
    <div className="cloud-bg relative flex min-h-screen flex-col items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <DotLottiePlayer
          src="/lottie/Confetti.lottie"
          autoplay
          style={{ width: "100vw", height: "100vh" }}
        />
      </div>
      <Navbar />
      <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <div className="animate-in zoom-in-95 relative z-10 max-w-2xl space-y-12 duration-1000">
          <div className="space-y-4">
            <h1 className="text-6xl font-black tracking-tight text-[#2c3e50] md:text-8xl">
              You&apos;re Done!
            </h1>
            <p className="text-xl font-bold text-zinc-500">
              {isHighScorer
                ? "Incredible mastery! You&apos;re a reading wizard!"
                : "Great work! Every word counts toward your goal."}
            </p>
          </div>

          <div className="mx-auto grid max-w-md grid-cols-2 divide-x divide-zinc-100 rounded-[2rem] border border-zinc-100 bg-white p-10 shadow-xl">
            <div className="space-y-2 px-4 text-center">
              <p className="text-sm font-black tracking-widest text-[#7f8c8d] uppercase">
                Score
              </p>
              <h2 className="text-brand-green text-6xl font-black">
                {score}/{total}
              </h2>
            </div>
            <div className="space-y-2 px-4 text-center">
              <p className="text-sm font-black tracking-widest text-[#7f8c8d] uppercase">
                Accuracy
              </p>
              <h2 className="text-readly-blue text-6xl font-black">
                {accuracy}%
              </h2>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
            <Link
              href="/student/home"
              className="bg-brand-green hover:bg-brand-green-hover min-w-[200px] rounded-xl px-8 py-4 font-bold text-white shadow-lg transition-all"
            >
              Practice Again
            </Link>
            <Link
              href="/parent"
              className="min-w-[200px] rounded-xl border border-zinc-200 bg-white px-8 py-4 font-bold text-zinc-600 shadow-md transition-all hover:bg-zinc-50"
            >
              Back to Parent
            </Link>
          </div>

          <div className="mt-8 text-sm font-bold text-zinc-400">
            Result saved to your progress tracker.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsView() {
  return (
    <Suspense
      fallback={
        <div className="cloud-bg flex min-h-screen items-center justify-center">
          <div className="border-brand-green h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
