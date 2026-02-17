"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BookOpen,
  Scale,
  MessageSquare,
  FileText,
  Mic,
  Swords,
  Search,
  ClipboardList,
  BarChart3,
  HelpCircle,
  PenTool,
  ArrowRight,
  Zap,
  Shield,
  Target,
  Menu,
  X,
} from "lucide-react";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-100 tracking-tight">
                Flow
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-sm text-slate-400 hover:text-slate-100"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-sm text-slate-400 hover:text-slate-100"
              >
                How It Works
              </a>
              <a
                href="#philosophy"
                className="text-sm text-slate-400 hover:text-slate-100"
              >
                Pricing
              </a>
            </nav>
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/competitor"
                className="text-sm font-medium text-slate-300 hover:text-slate-100 px-4 py-2 rounded-lg border border-slate-700 hover:border-slate-600"
              >
                Login
              </Link>
              <Link
                href="/competitor"
                className="text-sm font-medium text-white bg-teal-600 hover:bg-teal-500 px-4 py-2 rounded-lg"
              >
                Get Started
              </Link>
            </div>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-400"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-xl">
            <nav className="px-4 py-4 space-y-2">
              <a href="#features" className="block px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-slate-100 hover:bg-slate-800">Features</a>
              <a href="#how-it-works" className="block px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-slate-100 hover:bg-slate-800">How It Works</a>
              <a href="#philosophy" className="block px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-slate-100 hover:bg-slate-800">Pricing</a>
              <hr className="border-slate-700" />
              <Link href="/competitor" className="block px-3 py-2 rounded-lg text-sm text-slate-300">Login</Link>
              <Link href="/competitor" className="block px-3 py-2 rounded-lg text-sm font-medium text-white bg-teal-600">Get Started</Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-bg" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-600/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-600/10 border border-teal-600/20 text-teal-400 text-sm font-medium mb-8">
              <Zap className="w-3.5 h-3.5" />
              AI-powered debate coaching &amp; judging tools
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-100 tracking-tight leading-tight">
              Your 24/7 Debate Coach
              <br />
              <span className="text-gradient">&amp; Research Partner</span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Practice smarter, research faster, and sharpen your arguments
              with format-specific coaching built to help you win rounds.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/competitor"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-xl shadow-lg shadow-teal-600/20 w-full sm:w-auto justify-center"
              >
                <BookOpen className="w-5 h-5" />
                Get Started
              </Link>
              <Link
                href="/judge"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-medium rounded-xl border border-slate-700 w-full sm:w-auto justify-center"
              >
                <Scale className="w-5 h-5" />
                Judge Assistant
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-100 tracking-tight">
              Everything you need for competitive debate
            </h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              Two purpose-built portals with specialized tools for competitors
              and judges, supporting all major debate formats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div id="competitor-card" className="p-8 rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-teal-600/30">
              <div className="w-12 h-12 bg-teal-600/10 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">Competitor Training</h3>
              <p className="text-slate-400 mb-6">Sharpen your skills with AI-powered coaching tools designed to make you a stronger debater.</p>
              <div className="space-y-3">
                <FeatureItem icon={FileText} title="Case Feedback & Analysis" desc="Upload your cases for detailed structural and strategic feedback" />
                <FeatureItem icon={Mic} title="Speech Practice & Evaluation" desc="Practice speeches and get analysis on timing, coverage, and delivery" />
                <FeatureItem icon={Swords} title="Mock Debate Sparring" desc="Test your arguments against an AI opponent that adapts to your format" />
                <FeatureItem icon={Search} title="Evidence Research Assistant" desc="Find credible sources and understand how evidence connects to your case" />
              </div>
              <Link href="/competitor" className="mt-6 inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-medium text-sm">
                Open Competitor Portal
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div id="judge-card" className="p-8 rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-cyan-500/30">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4">
                <Scale className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">Judge Assistant</h3>
              <p className="text-slate-400 mb-6">Streamline your judging workflow with tools for documentation, analysis, and feedback.</p>
              <div className="space-y-3">
                <FeatureItem icon={ClipboardList} title="Live Round Documentation" desc="Real-time note-taking with automatic argument tracking and flow" />
                <FeatureItem icon={BarChart3} title="Post-Round Analysis" desc="Balanced summaries of both sides with clash identification" />
                <FeatureItem icon={HelpCircle} title="Decision-Making Support" desc="Evaluate arguments using standard debate frameworks" />
                <FeatureItem icon={PenTool} title="Feedback Generation" desc="Craft clear, educational feedback that helps teams improve" />
              </div>
              <Link href="/judge" className="mt-6 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium text-sm">
                Open Judge Portal
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Formats */}
      <section id="how-it-works" className="py-16 bg-slate-800/50 border-y border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-slate-100 mb-8 tracking-tight">Supports all major debate formats</h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["Policy (CX)", "Lincoln-Douglas", "Public Forum", "World Schools", "Parliamentary", "Congress", "Big Questions"].map((format) => (
              <span key={format} className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm font-medium text-slate-300">{format}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-100 tracking-tight">Our approach</h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">Flow is built on the belief that the best tools enhance human capability without replacing it.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PhilosophyCard icon={Shield} title="Enhance, don't replace" desc="We provide feedback, practice, and skill development tools. We never write arguments or cases for you." />
            <PhilosophyCard icon={Target} title="Unbiased evaluation" desc="Judge tools evaluate arguments on their merits using standard debate frameworks, free from personal bias." />
            <PhilosophyCard icon={MessageSquare} title="Coach, not competitor" desc="The AI acts as a sparring partner and coach, pushing you to think harder and build stronger arguments on your own." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-100 mb-4 tracking-tight">Ready to level up?</h2>
          <p className="text-slate-400 mb-8">Choose your portal and start improving today.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/competitor" className="inline-flex items-center gap-2 px-8 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-xl shadow-lg shadow-teal-600/20 w-full sm:w-auto justify-center">
              <BookOpen className="w-5 h-5" />
              Start Training
            </Link>
            <Link href="/judge" className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-medium rounded-xl border border-slate-700 w-full sm:w-auto justify-center">
              <Scale className="w-5 h-5" />
              Start Judging
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-teal-600/20 rounded flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-teal-400" />
              </div>
              <span className="text-sm font-semibold text-slate-400">Flow</span>
            </div>
            <p className="text-sm text-slate-500">Built for debaters, by debaters. Enhance your skills, not your dependency.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureItem({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-slate-400" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-200">{title}</p>
        <p className="text-sm text-slate-500">{desc}</p>
      </div>
    </div>
  );
}

function PhilosophyCard({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <div className="p-6 rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
      <div className="w-10 h-10 rounded-lg bg-teal-600/10 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-teal-400" />
      </div>
      <h3 className="font-semibold text-slate-100 mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}
