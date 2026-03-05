"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { CheckCircle2, TrendingUp, ChevronRight } from "lucide-react";
import {
    getGlobalStats,
    getSessionHistory,
    SessionResult,
    resetDemoData,
} from "@/lib/storage";

export default function ParentDashboardView() {
    const [stats, setStats] = useState({ totalSessions: 0, avgAccuracy: 0 });
    const [history, setHistory] = useState<SessionResult[]>([]);

    useEffect(() => {
        // Avoid synchronous setState in effect for better performance and to satisfy lint rules
        const initData = () => {
            setStats(getGlobalStats());
            setHistory(getSessionHistory());
        };
        initData();
    }, []);

    const handleReset = () => {
        resetDemoData();
        setStats({ totalSessions: 0, avgAccuracy: 0 });
        setHistory([]);
    };

    return (
        <div className="cloud-bg flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1 p-6 md:p-12">
                <div className="mx-auto max-w-2xl space-y-8">
                    {/* Header */}
                    <header className="text-center">
                        <h1 className="text-2xl font-black text-[#2c3e50] md:text-3xl">
                            Parent Dashboard
                        </h1>
                    </header>

                    {/* Progress Summary Cards */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-2xl bg-[#2ecc71] p-6 text-white shadow-lg shadow-green-100">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                                    <CheckCircle2 className="h-6 w-6" />
                                </div>
                                <p className="text-lg font-bold">Total Sessions Completed:</p>
                            </div>
                            <h2 className="text-4xl font-black">{stats.totalSessions}</h2>
                        </div>

                        <div className="overflow-hidden rounded-2xl bg-[#3498db] text-white shadow-lg shadow-blue-100">
                            <div className="flex items-center justify-between p-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                                        <TrendingUp className="h-6 w-6" />
                                    </div>
                                    <p className="text-lg font-bold">Average Accuracy:</p>
                                </div>
                                <h2 className="text-4xl font-black">{stats.avgAccuracy}%</h2>
                            </div>
                            <div className="bg-white/10 p-4 px-6">
                                <p className="text-sm font-medium">
                                    Your child is recognizing words more quickly and confidently
                                    than last month.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-6">
                        <Link
                            href="/student/home"
                            className="w-full max-w-sm rounded-xl bg-[#f39c12] py-4 text-center text-lg font-black text-white shadow-lg shadow-orange-100 transition-all hover:scale-[1.02] hover:bg-[#e67e22] active:scale-95"
                        >
                            Launch Student Mode
                        </Link>

                        <Link
                            href="/resources"
                            className="hover:text-readly-blue flex items-center gap-1 font-bold text-zinc-500 transition-colors"
                        >
                            Resources & Reading Support <ChevronRight className="h-5 w-5" />
                        </Link>
                    </div>

                    {/* Session History */}
                    <section className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-[#2c3e50]">
                                Session History
                            </h2>
                            <button
                                onClick={handleReset}
                                className="text-xs font-bold tracking-widest text-zinc-400 uppercase transition-colors hover:text-red-500"
                            >
                                Reset Demo Data
                            </button>
                        </div>

                        {history.length > 0 ? (
                            <div className="space-y-3">
                                {history.map((session, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50 p-4"
                                    >
                                        <div>
                                            <p className="font-bold text-[#2c3e50]">
                                                Level {session.level} Practice
                                            </p>
                                            <p className="text-xs font-medium text-zinc-500">
                                                {new Date(session.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-brand-green text-lg font-black">
                                                {session.score}/{session.total}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex h-24 items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 text-sm font-medium text-zinc-400">
                                No sessions completed yet.
                            </div>
                        )}
                    </section>

                    <footer className="text-center">
                        <p className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
                            Demo version
                        </p>
                    </footer>
                </div>
            </main>

            <Footer />
        </div>
    );
}
