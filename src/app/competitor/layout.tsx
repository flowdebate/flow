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
  {
    href: "/competitor",
    label: "Dashboard",
    icon: Home,
    exact: true,
  },
  {
    href: "/competitor/case-feedback",
    label: "Case Feedback",
    icon: FileText,
  },
  {
    href: "/competitor/speech-practice",
    label: "Speech Practice",
    icon: Mic,
  },
  {
    href: "/competitor/mock-debate",
    label: "Mock Debate",
    icon: Swords,
  },
  {
    href: "/competitor/evidence-research",
    label: "Evidence Research",
    icon: Search,
  },
];

export default function CompetitorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 border-r border-slate-200 bg-white">
        <div className="flex items-center gap-2 px-6 h-16 border-b border-slate-200">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">Flow</span>
          </Link>
        </div>

        <div className="px-3 py-2 mt-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
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
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <Link
            href="/judge"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700"
          >
            Switch to Judge Portal
          </Link>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex flex-col flex-1 min-w-0">
        <header className="lg:hidden flex items-center justify-between h-14 px-4 border-b border-slate-200 bg-white">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">Flow</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
              Competitor
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-600" />
              ) : (
                <Menu className="w-5 h-5 text-slate-600" />
              )}
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-14 left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-lg">
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
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
              <hr className="my-2 border-slate-200" />
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
