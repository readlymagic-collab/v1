"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyAdmin, removeAdminToken, getAdminToken } from "@/lib/auth";
import Navbar from "@/components/common/Navbar";
import { LayoutDashboard, Users, Settings, LogOut, BarChart3, Trash2 } from "lucide-react";

export default function AdminDashboard() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGlobalHistory();
  }, []);

  const fetchGlobalHistory = async () => {
    const token = getAdminToken();
    try {
      const response = await fetch("http://localhost:5000/api/sessions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      setHistory(result.data || []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-black text-[#2c3e50]">Global Analytics</h2>
          <p className="font-bold text-zinc-400 mt-1">Real-time performance across all student sessions</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white p-4 px-6 rounded-2xl shadow-sm border border-zinc-100 text-center">
            <p className="text-xs font-black text-zinc-400 uppercase">Active Students</p>
            <h4 className="text-2xl font-black text-[#2c3e50]">12</h4>
          </div>
          <div className="bg-white p-4 px-6 rounded-2xl shadow-sm border border-zinc-100 text-center">
            <p className="text-xs font-black text-zinc-400 uppercase">Total sessions</p>
            <h4 className="text-2xl font-black text-brand-green">{history.length}</h4>
          </div>
        </div>
      </header>

      {/* Global History Table */}
      <section className="bg-white rounded-[2rem] border border-zinc-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-zinc-50 flex items-center justify-between bg-zinc-50/50">
          <h3 className="text-xl font-bold text-[#2c3e50]">Global Session Log</h3>
          <button className="text-sm font-bold text-readly-blue hover:underline">Export CSV</button>
        </div>

        {loading ? (
          <div className="p-20 text-center text-zinc-400 font-bold">Loading session data...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-50/50 text-xs font-black text-zinc-400 uppercase tracking-widest">
                  <th className="px-8 py-4">Date</th>
                  <th className="px-8 py-4">Level</th>
                  <th className="px-8 py-4">Score</th>
                  <th className="px-8 py-4">Accuracy</th>
                  <th className="px-8 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {history.map((session, i) => (
                  <tr key={i} className="hover:bg-zinc-50/50 transition-colors group">
                    <td className="px-8 py-6 font-bold text-zinc-600">
                      {new Date(session.date).toLocaleDateString()}
                      <span className="block text-[10px] text-zinc-400">{new Date(session.date).toLocaleTimeString()}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-zinc-100 rounded-full text-xs font-black text-zinc-500 uppercase">Level {session.level}</span>
                    </td>
                    <td className="px-8 py-6 font-black text-[#2c3e50]">{session.score}/{session.total}</td>
                    <td className="px-8 py-6">
                      <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden max-w-[100px]">
                        <div className="bg-readly-blue h-full" style={{ width: `${session.accuracy}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-zinc-400 mt-1 block">{session.accuracy}%</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${session.accuracy >= 80 ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                        {session.accuracy >= 80 ? 'Passed' : 'Needs Practice'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}

