"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BackButton from "@/components/common/BackButton";
import Navbar from "@/components/common/Navbar";
import levelsData from "@/data/sight-words.json";

const LEVELS = levelsData.levels;

export default function LevelSelectionView() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  return (
    <div className="cloud-bg flex min-h-screen flex-col items-center p-6 sm:p-12">
      <div className="mb-8 w-full max-w-4xl">
        <BackButton href="/student/home" />
      </div>

      <div className="flex w-full max-w-4xl flex-1 flex-col justify-center space-y-12 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-black tracking-tight text-[#2c3e50] md:text-6xl">
            Choose a level
          </h1>
          <p className="text-lg font-bold text-zinc-500">
            Pick a level to start practicing today.
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-3">
          {LEVELS.map((level) => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`group relative flex flex-col items-center gap-4 rounded-[2rem] border border-zinc-100 bg-white p-6 shadow-lg transition-all duration-300 ${selectedLevel === level.id
                  ? "ring-brand-green scale-105 ring-4"
                  : "hover:scale-105"
                }`}
            >
              <div className="relative flex h-48 w-48 items-center justify-center transition-transform group-hover:scale-110">
                <Image
                  src={level.image}
                  alt={level.name}
                  width={240}
                  height={240}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-[#2c3e50]">
                  {level.name}
                </h3>
                <p className="text-sm font-bold text-zinc-500">
                  {level.description}
                </p>
              </div>
              {selectedLevel === level.id && (
                <div className="bg-brand-green animate-in zoom-in absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full text-white shadow-lg">
                  ✓
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="h-20">
          {selectedLevel && (
            <div className="animate-in fade-in slide-in-from-bottom-4">
              <Link
                href={`/student/practice?level=${selectedLevel}`}
                className="bg-brand-green hover:bg-brand-green-hover rounded-xl px-10 py-5 font-bold text-white shadow-lg transition-all"
              >
                Start Session
              </Link>
            </div>
          )}
        </div>
      </div>

      <footer className="mt-8 text-xs font-black tracking-widest text-zinc-400 uppercase">
        ReadlyMagic • Level Selection
      </footer>
    </div>
  );
}
