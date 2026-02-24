import type { Metadata } from "next";
import BackButton from "@/components/common/BackButton";

export const metadata: Metadata = {
  title: "Student Home",
  description:
    "Start your literacy adventure with ReadlyMagic's interactive stories.",
};

export default function StudentHome() {
  return (
    <div className="magic-bg flex min-h-screen flex-col items-center justify-center p-6">
      <BackButton href="/" label="Log out" className="absolute top-8 left-8" />

      <div className="animate-in slide-in-from-top-4 space-y-6 text-center duration-1000">
        <div className="space-y-4">
          <h1 className="text-readly-blue text-4xl font-black tracking-tighter md:text-6xl">
            Student Home
          </h1>
          <p className="mx-auto max-w-lg text-lg font-medium text-zinc-600 md:text-2xl">
            Ready to explore the magic of reading?
          </p>
        </div>

        <div className="mt-16 flex flex-col items-center justify-center gap-12 md:flex-row md:gap-8">
          <button className="group relative">
            <div className="bg-brand-orange flex h-32 w-32 rotate-3 transform cursor-pointer items-center justify-center rounded-[2rem] text-5xl shadow-2xl transition-all group-hover:scale-110 group-hover:rotate-0 md:h-40 md:w-40 md:rounded-[2.5rem] md:text-6xl">
              ✨
            </div>
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-bold whitespace-nowrap text-zinc-700 opacity-0 transition-opacity group-hover:opacity-100 md:-bottom-10">
              Magic Magic
            </span>
          </button>

          <button className="group relative">
            <div className="bg-brand-green flex h-32 w-32 -rotate-6 transform cursor-pointer items-center justify-center rounded-[2rem] text-5xl shadow-2xl transition-all group-hover:scale-110 group-hover:rotate-0 md:h-40 md:w-40 md:rounded-[2.5rem] md:text-6xl">
              📚
            </div>
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-bold whitespace-nowrap text-zinc-700 opacity-0 transition-opacity group-hover:opacity-100 md:-bottom-10">
              Read Story
            </span>
          </button>
        </div>
      </div>

      <footer className="absolute bottom-8 text-sm font-medium text-zinc-400">
        Student Edition • ReadlyMagic
      </footer>
    </div>
  );
}
