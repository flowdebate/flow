"use client";

import Link from "next/link";
import { useState } from "react";
import { Zap, BookOpen, Scale, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [role, setRole] = useState<"competitor" | "judge" | null>(null);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-100 tracking-tight">Flow</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-100">Welcome back</h1>
            <p className="mt-2 text-slate-400">Sign in to your Flow account</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                I am a...
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setRole("competitor")}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-sm font-medium transition-colors ${
                    role === "competitor"
                      ? "bg-teal-600/10 border-teal-600/50 text-teal-400"
                      : "border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                  Competitor
                  <span className="text-xs font-normal text-slate-500">Student debater</span>
                </button>
                <button
                  onClick={() => setRole("judge")}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-sm font-medium transition-colors ${
                    role === "judge"
                      ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400"
                      : "border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                  }`}
                >
                  <Scale className="w-5 h-5" />
                  Judge
                  <span className="text-xs font-normal text-slate-500">Parent judge</span>
                </button>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-600/50 text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-600/50 text-sm"
              />
            </div>

            {/* Submit */}
            <Link
              href={role === "judge" ? "/judge" : "/competitor"}
              className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-medium text-sm transition-colors ${
                role === "judge"
                  ? "bg-cyan-600 hover:bg-cyan-500 text-white"
                  : "bg-teal-600 hover:bg-teal-500 text-white"
              }`}
            >
              Sign In
              <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="text-teal-400 hover:text-teal-300">
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
