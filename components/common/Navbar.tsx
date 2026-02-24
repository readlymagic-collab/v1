"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About ReadlyMagic", href: "/about" },
  { name: "The Science of Reading", href: "/science" },
  { name: "Support", href: "/support" },
  { name: "Passages", href: "/passages" },
  { name: "Resources", href: "/resources" },
  { name: "Schools", href: "/schools" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="w-full border-b border-zinc-100 bg-white shadow-sm transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between lg:h-28 lg:flex-col lg:justify-center lg:gap-6">
          {/* Logo Area */}
          <div className="flex shrink-0 items-center">
            <Link href="/" className="transition-transform hover:scale-[1.02]">
              <Image
                src="/images/brand.png"
                alt="ReadlyMagic Logo"
                width={180}
                height={40}
                priority
                className="h-10 w-auto lg:h-12"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`hover:text-readly-blue text-[15px] font-semibold transition-all ${
                  pathname === item.href
                    ? "text-readly-blue border-readly-blue border-b-2 pb-1"
                    : "text-zinc-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hover:text-readly-blue inline-flex items-center justify-center rounded-xl p-2 text-zinc-600 transition-colors hover:bg-zinc-50 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-7 w-7" aria-hidden="true" />
              ) : (
                <Menu className="block h-7 w-7" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-zinc-900/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-zinc-50 px-6">
          <Image
            src="/images/brand.png"
            alt="ReadlyMagic Logo"
            width={140}
            height={32}
            className="h-8 w-auto"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="hover:text-readly-blue rounded-xl p-2 text-zinc-600 transition-colors hover:bg-zinc-50"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col py-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`px-8 py-4 text-lg font-bold transition-all hover:bg-zinc-50 hover:pl-10 ${
                pathname === item.href
                  ? "text-readly-blue"
                  : "hover:text-readly-blue text-zinc-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="absolute bottom-8 left-0 w-full px-8">
          <p className="text-xs font-medium text-zinc-400">
            © 2026 ReadlyMagic • Beta
          </p>
        </div>
      </div>
    </nav>
  );
}
