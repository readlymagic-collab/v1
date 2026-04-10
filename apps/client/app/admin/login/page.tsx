"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setAdminToken } from "@/lib/auth";
import { Lock, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Trim password to avoid accidental spaces
    const cleanPassword = password.trim();

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password: cleanPassword }),
      });

      const data = await response.json();

      if (data.success) {
        setAdminToken(data.token);
        router.push("/admin/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-black text-readly-blue">Readly<span className="text-readly-orange">Magic</span></h1>
          <div className="mt-2 h-1 w-12 bg-readly-blue mx-auto rounded-full"></div>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-lg font-bold text-zinc-800">Admin Login</h2>
            <p className="text-xs font-bold text-brand-orange uppercase tracking-widest mt-1">Management Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Username</label>
              <input
                type="text"
                placeholder="admin_id"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-1 rounded-xl border border-zinc-200 bg-white px-4 py-3.5 font-bold outline-none focus:border-readly-blue focus:ring-4 focus:ring-readly-blue/5 transition-all text-[#1a1a1a]"
                required
              />
            </div>

            <div>
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Security Pin</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 rounded-xl border border-zinc-200 bg-white px-4 py-3.5 font-bold outline-none focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/5 transition-all text-[#1a1a1a]"
                required
              />
            </div>

            {error && <p className="text-xs font-bold text-red-500 text-center bg-red-50 py-2 rounded-lg">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-readly-blue py-4.5 font-black text-white hover:bg-readly-blue/90 shadow-lg shadow-readly-blue/20 transition-all disabled:opacity-50 mt-2"
            >
              {loading ? "Verifying..." : "Enter Portal"}
            </button>
          </form>

          <div className="text-center pt-4">
            <Link href="/" className="text-xs font-bold text-zinc-400 hover:text-readly-blue transition-colors">
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
