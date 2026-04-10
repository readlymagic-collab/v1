"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyAdmin, removeAdminToken } from "@/lib/auth";
import { LayoutDashboard, Users, Settings, LogOut, BarChart3, ShieldCheck, BookOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ReduxProvider } from "@/components/providers/ReduxProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await verifyAdmin();
      if (!isAuth) {
        if (pathname !== "/admin/login") {
          router.push("/admin/login");
        }
      } else {
        setAuthorized(true);
      }
    };
    checkAuth();
  }, [router, pathname]);

  const handleLogout = () => {
    removeAdminToken();
    router.push("/admin/login");
  };

  // Don't show layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!authorized) return null;

  const navItems = [
    { label: "Overview", icon: LayoutDashboard, href: "/admin/dashboard" },
    { label: "Students", icon: Users, href: "/admin/students" },
    { label: "Word Library", icon: BookOpen, href: "/admin/words" },
    { label: "Reports", icon: BarChart3, href: "/admin/reports" },
    { label: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <ReduxProvider>
      <div className="flex min-h-screen bg-white">
        {/* Sidebar */}
        <aside className="fixed inset-y-0 left-0 w-64 border-r border-zinc-100 flex flex-col">
          <div className="p-8 pb-4">
            <Link href="/admin/dashboard" className="text-xl font-black text-[#1a1a1a]">Readly<span className="text-readly-blue">Magic</span></Link>
            <p className="text-[10px] font-black text-brand-orange uppercase tracking-widest mt-1">Admin Panel</p>
          </div>

          <nav className="flex-1 px-4 mt-6 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${isActive ? "bg-readly-blue/5 text-readly-blue" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800"
                    }`}
                >
                  <item.icon className={`h-4 w-4 ${isActive ? "text-readly-blue" : ""}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-zinc-100">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        </aside>

        <div className="pl-64 flex-1">
          <header className="h-20 border-b border-zinc-100 flex items-center justify-between px-10 bg-white">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-brand-orange rounded-full"></div>
              <h2 className="text-lg font-black text-zinc-800">Administrator Console</h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs font-bold text-zinc-900">Admin_System</p>
                <span className="text-[9px] text-brand-green font-black uppercase tracking-widest">Connected</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-readly-blue text-white flex items-center justify-center font-black text-sm">
                AD
              </div>
            </div>
          </header>

          <main className="p-10 bg-white">
            {children}
          </main>
        </div>
      </div>
    </ReduxProvider>
  );
}
