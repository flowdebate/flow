"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  FileText,
  Mic,
  Swords,
  Search,
  Home,
  Zap,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/competitor", label: "Dashboard", icon: Home, exact: true },
  { href: "/competitor/case-feedback", label: "Case Feedback", icon: FileText },
  { href: "/competitor/speech-practice", label: "Speech Practice", icon: Mic },
  { href: "/competitor/mock-debate", label: "Mock Debate", icon: Swords },
  { href: "/competitor/evidence-research", label: "Evidence Research", icon: Search },
];

export default function CompetitorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-900">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 border-r border-slate-700/50 bg-slate-800/50">
        <div className="flex items-center gap-2 px-6 h-16 border-b border-slate-700/50">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-teal-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-100">Flow</span>
          </Link>
        </div>

        <div className="px-3 py-2 mt-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-600/10 border border-teal-600/20">
            <BookOpen className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
              Competitor
            </span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-teal-600/10 text-teal-400 border border-teal-600/20"
                    : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <Link
            href="/judge"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-500 hover:bg-slate-700/50 hover:text-slate-300"
          >
            Switch to Judge Portal
          </Link>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex flex-col flex-1 min-w-0">
        <header className="lg:hidden flex items-center justify-between h-14 px-4 border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-teal-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-100">Flow</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-teal-400 bg-teal-600/10 border border-teal-600/20 px-2 py-1 rounded-lg">
              Competitor
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-14 left-0 right-0 z-40 bg-slate-800/95 backdrop-blur-xl border-b border-slate-700/50 shadow-lg">
            <nav className="p-3 space-y-1">
              {navItems.map((item) => {
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                      isActive
                        ? "bg-teal-600/10 text-teal-400"
                        : "text-slate-400 hover:bg-slate-700/50"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
              <hr className="my-2 border-slate-700" />
              <Link
                href="/judge"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-500"
              >
                Switch to Judge Portal
              </Link>
            </nav>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
