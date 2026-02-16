"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Scale,
  ClipboardList,
  BarChart3,
  HelpCircle,
  PenTool,
  Home,
  Zap,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  {
    href: "/judge",
    label: "Dashboard",
    icon: Home,
    exact: true,
  },
  {
    href: "/judge/live-round",
    label: "Live Round",
    icon: ClipboardList,
  },
  {
    href: "/judge/post-round",
    label: "Post-Round Analysis",
    icon: BarChart3,
  },
  {
    href: "/judge/decision-support",
    label: "Decision Support",
    icon: HelpCircle,
  },
  {
    href: "/judge/feedback-generation",
    label: "Feedback Generation",
    icon: PenTool,
  },
];

export default function JudgeLayout({
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
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50">
            <Scale className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
              Judge
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
                    ? "bg-amber-50 text-amber-700"
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
            href="/competitor"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700"
          >
            Switch to Competitor Portal
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
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
              Judge
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
                        ? "bg-amber-50 text-amber-700"
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
                href="/competitor"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-500"
              >
                Switch to Competitor Portal
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
