import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Parent Dashboard",
  description:
    "Monitor your student's reading progress and manage their learning journey.",
};

export default function ParentPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <Navbar />

      <main className="flex-1 p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <header className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#34495e]">
              Parent Dashboard
            </h1>
            <p className="text-zinc-600">
              Welcome back! Manage your student's progress here.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-in fade-in slide-in-from-bottom-2 h-48 rounded-2xl border border-zinc-200 bg-white shadow-sm duration-500"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>

          <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-[#34495e]">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-12 animate-pulse rounded-lg bg-zinc-50"
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
