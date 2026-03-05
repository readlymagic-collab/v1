"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/common/Navbar";

export default function StudentHomeView() {
    return (
        <div className="cloud-bg flex min-h-screen flex-col items-center">
            <Navbar />

            <div className="flex flex-1 flex-col items-center justify-center space-y-12 p-6">
                <div className="animate-in zoom-in-95 w-full max-w-sm overflow-hidden">
                    <div className="space-y-4 p-10 text-center">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-black text-[#2c3e50]">Hi Alex!</h1>
                            <p className="text-lg font-bold text-zinc-500">
                                Today&apos;s goal: <span className="text-[#f39c12]">10 words</span>{" "}
                                ⭐
                            </p>
                        </div>

                        <div className="relative flex justify-center py-4">
                            <Image
                                src="/images/brand-2.png"
                                alt="Magic Mascot"
                                width={250}
                                height={250}
                                className="h-60 w-auto"
                            />
                        </div>

                        <Link
                            href="/student/levels"
                            className="block w-full rounded-xl bg-[#2ecc71] py-5 text-center text-xl font-black text-white shadow-lg shadow-green-100 transition-all hover:scale-[1.02] hover:bg-[#27ae60] active:scale-95"
                        >
                            Start Practice
                        </Link>
                    </div>
                </div>

                <div className="flex h-2 w-32 items-center justify-center rounded-full bg-zinc-200/50" />
            </div>

            <footer className="mb-8 text-xs font-bold tracking-widest text-zinc-400 uppercase">
                ReadlyMagic Student Mode
            </footer>
        </div>
    );
}
