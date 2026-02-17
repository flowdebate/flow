"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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
  CheckCircle2,
  XCircle,
  Scissors,
  Users,
  Globe,
  Quote,
  Star,
  Brain,
} from "lucide-react";

function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const OTHER_AI_PROBLEMS = [
  "Make up fake statistics and citations",
  'Give generic, unhelpful feedback ("be more specific")',
  "Can't actually practice with you — responses are vague",
  "Don't understand debate formats or strategy",
  "Will write entire cases if asked (no learning happens)",
  'Hallucinate sources and "evidence"',
];

const FLOW_STRENGTHS = [
  "Fact-checks sources against real internet data",
  "Gives deep, specific feedback tied to your actual arguments",
  "Acts as a realistic sparring partner trained in debate",
  "Understands format-specific strategies (Policy, LD, PF, Parli)",
  "Coaches you to improve — never does your work for you",
  "Cuts evidence from real articles with proper citations",
  "Helps parent judges give constructive, useful feedback",
];

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
                href="#why-flow"
                className="text-sm text-slate-400 hover:text-slate-100"
              >
                Why Flow
              </a>
              <a
                href="#features"
                className="text-sm text-slate-400 hover:text-slate-100"
              >
                Features
              </a>
              <a
                href="#formats"
                className="text-sm text-slate-400 hover:text-slate-100"
              >
                Formats
              </a>
              <a
                href="#pricing"
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
                Start Free
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
              <a href="#why-flow" className="block px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-slate-100 hover:bg-slate-800">Why Flow</a>
              <a href="#features" className="block px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-slate-100 hover:bg-slate-800">Features</a>
              <a href="#formats" className="block px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-slate-100 hover:bg-slate-800">Formats</a>
              <a href="#pricing" className="block px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-slate-100 hover:bg-slate-800">Pricing</a>
              <hr className="border-slate-700" />
              <Link href="/competitor" className="block px-3 py-2 rounded-lg text-sm text-slate-300">Login</Link>
              <Link href="/competitor" className="block px-3 py-2 rounded-lg text-sm font-medium text-white bg-teal-600">Start Free</Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-bg" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-600/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-600/10 border border-teal-600/20 text-teal-400 text-sm font-medium mb-8">
              <Zap className="w-3.5 h-3.5" />
              Built by a debater. Trained for debate.
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-100 tracking-tight leading-tight">
              The Debate Coach AI
              <br />
              <span className="text-gradient">ChatGPT Can&apos;t Replace</span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Flow knows debate — not just AI. Get format-specific coaching,
              real evidence research, and sparring practice that actually
              prepares you to win rounds.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/competitor"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-teal-600/20 w-full sm:w-auto justify-center text-base"
              >
                <BookOpen className="w-5 h-5" />
                Start Free
              </Link>
              <Link
                href="/judge"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold rounded-xl border border-slate-700 w-full sm:w-auto justify-center text-base"
              >
                <Scale className="w-5 h-5" />
                See Judge Tool
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Hero trust badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                Format-specific strategies
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                Real citations, no hallucinations
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                Free to start
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="why-flow" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-6">
              <Brain className="w-3.5 h-3.5" />
              Not all AI is created equal
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
              Why Flow Works Where ChatGPT Fails
            </h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              ChatGPT is a text predictor. Flow is a debate coach. The
              difference shows up in every round.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Other AIs column */}
            <ScrollReveal delay={100}>
              <div className="h-full p-8 rounded-2xl border border-red-900/40 bg-red-950/10 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100">Other AIs</h3>
                    <p className="text-xs text-slate-500">
                      ChatGPT, Perplexity, etc.
                    </p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {OTHER_AI_PROBLEMS.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                        <X className="w-3 h-3 text-red-400" />
                      </div>
                      <span className="text-sm text-slate-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Flow column */}
            <ScrollReveal delay={200}>
              <div className="h-full p-8 rounded-2xl border border-teal-600/30 bg-teal-950/10 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-teal-600/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-teal-600/10 border border-teal-600/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100">Flow</h3>
                    <p className="text-xs text-slate-500">
                      Built for debate. Period.
                    </p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {FLOW_STRENGTHS.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-teal-600/10 border border-teal-600/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-teal-400" />
                      </div>
                      <span className="text-sm text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* Bottom tagline */}
          <ScrollReveal delay={300} className="text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 px-8 py-5 rounded-2xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-slate-400 text-sm">
                ChatGPT is a generic chatbot.
              </span>
              <div className="hidden sm:block w-px h-5 bg-slate-600" />
              <span className="text-teal-400 font-semibold text-sm">
                Flow is a debate coach.
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Feature Highlights — Quick Cards */}
      <section id="features" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-100 tracking-tight">
              Tools built for how debate actually works
            </h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              Every feature maps to a real part of the competitive debate
              process — not generic productivity.
            </p>
          </ScrollReveal>

          {/* 4 quick-feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            <ScrollReveal delay={0}>
              <FeatureCard
                icon={Scissors}
                title="Card Cutter"
                desc="Paste any article, get formatted evidence cards with proper tags and citations."
                color="teal"
              />
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <FeatureCard
                icon={Swords}
                title="Sparring Partner"
                desc="Practice rebuttals with realistic opposition that adapts to your format and args."
                color="cyan"
              />
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <FeatureCard
                icon={Scale}
                title="Judge Assistant"
                desc="Help parent judges flow rounds, weigh arguments, and give real feedback."
                color="emerald"
              />
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <FeatureCard
                icon={Target}
                title="Case Review"
                desc="Deep structural analysis tied to your actual arguments — not generic suggestions."
                color="amber"
              />
            </ScrollReveal>
          </div>

          {/* Detailed feature two-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal delay={0}>
              <div className="p-8 rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-teal-600/30">
                <div className="w-12 h-12 bg-teal-600/10 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-teal-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">
                  Competitor Training
                </h3>
                <p className="text-slate-400 mb-6">
                  Sharpen your skills with AI coaching tools designed to make
                  you a stronger debater, not a more dependent one.
                </p>
                <div className="space-y-3">
                  <FeatureItem
                    icon={FileText}
                    title="Case Feedback & Analysis"
                    desc="Upload your cases for detailed structural and strategic feedback"
                  />
                  <FeatureItem
                    icon={Mic}
                    title="Speech Practice & Evaluation"
                    desc="Practice speeches and get analysis on timing, coverage, and delivery"
                  />
                  <FeatureItem
                    icon={Swords}
                    title="Mock Debate Sparring"
                    desc="Test your arguments against an AI opponent that adapts to your format"
                  />
                  <FeatureItem
                    icon={Search}
                    title="Evidence Research Assistant"
                    desc="Find credible sources and understand how evidence connects to your case"
                  />
                </div>
                <Link
                  href="/competitor"
                  className="mt-6 inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-medium text-sm"
                >
                  Open Competitor Portal
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="p-8 rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-cyan-500/30">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4">
                  <Scale className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">
                  Judge Assistant
                </h3>
                <p className="text-slate-400 mb-6">
                  Streamline your judging workflow with tools for
                  documentation, analysis, and constructive feedback.
                </p>
                <div className="space-y-3">
                  <FeatureItem
                    icon={ClipboardList}
                    title="Live Round Documentation"
                    desc="Real-time note-taking with automatic argument tracking and flow"
                  />
                  <FeatureItem
                    icon={BarChart3}
                    title="Post-Round Analysis"
                    desc="Balanced summaries of both sides with clash identification"
                  />
                  <FeatureItem
                    icon={HelpCircle}
                    title="Decision-Making Support"
                    desc="Evaluate arguments using standard debate frameworks"
                  />
                  <FeatureItem
                    icon={PenTool}
                    title="Feedback Generation"
                    desc="Craft clear, educational feedback that helps teams improve"
                  />
                </div>
                <Link
                  href="/judge"
                  className="mt-6 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium text-sm"
                >
                  Open Judge Portal
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Supported Formats */}
      <section
        id="formats"
        className="py-16 bg-slate-800/50 border-y border-slate-700/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-slate-100 mb-2 tracking-tight">
            Supports all major debate formats
          </h2>
          <p className="text-center text-slate-400 text-sm mb-8">
            Format-specific strategy, not one-size-fits-all advice
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              "Policy (CX)",
              "Lincoln-Douglas",
              "Public Forum",
              "World Schools",
              "Parliamentary",
              "Congress",
              "Big Questions",
            ].map((format) => (
              <span
                key={format}
                className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm font-medium text-slate-300"
              >
                {format}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-100 tracking-tight">
              Built by someone who gets it
            </h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              Flow is built by a competitive debater — not a tech company
              guessing what debaters need.
            </p>
          </ScrollReveal>

          {/* NSDA badge */}
          <ScrollReveal delay={100} className="flex justify-center mb-14">
            <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-slate-800/60 border border-teal-600/20">
              <div className="w-10 h-10 rounded-xl bg-teal-600/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-teal-400" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-100">
                  Built by a Debater
                </p>
                <p className="text-xs text-slate-400">
                  NSDA Student Leadership Council member
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Testimonial placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "Finally an AI that actually understands what I mean when I say 'extend the impact'. It doesn't just summarize — it coaches.",
                role: "Policy Debater, 2x State Qualifier",
              },
              {
                quote:
                  "As a parent judge I had no idea what I was doing. Flow helped me give real feedback instead of just vibes.",
                role: "Parent Judge, 3 years",
              },
              {
                quote:
                  "The sparring feature is insane. It actually pushes back with real args, not just generic counterpoints.",
                role: "LD Competitor, TOC Qualifier",
              },
            ].map((t, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="p-6 rounded-xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm h-full flex flex-col">
                  <Quote className="w-6 h-6 text-teal-600/40 mb-4 flex-shrink-0" />
                  <p className="text-sm text-slate-300 leading-relaxed mb-4 italic flex-1">
                    &quot;{t.quote}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                      <Users className="w-4 h-4 text-slate-500" />
                    </div>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-slate-800/30 border-y border-slate-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-100 tracking-tight">
              How Flow approaches coaching
            </h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              Good coaches make you better. They don&apos;t do the work for
              you.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0}>
              <PhilosophyCard
                icon={Shield}
                title="Coach, don't do"
                desc="We provide feedback, practice, and skill development. We never write arguments or cases for you — that defeats the purpose."
              />
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <PhilosophyCard
                icon={Globe}
                title="Real sources only"
                desc="Evidence research pulls from real internet data. No hallucinated citations, no made-up statistics. Verifiable every time."
              />
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <PhilosophyCard
                icon={MessageSquare}
                title="Format-aware feedback"
                desc="Feedback is specific to your format — what matters in Policy doesn't always apply to LD. Flow knows the difference."
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4 tracking-tight">
              Ready to improve your debate skills?
            </h2>
            <p className="text-slate-400 mb-2 text-lg">
              Stop using tools that weren&apos;t built for debate.
            </p>
            <p className="text-slate-500 mb-10 text-sm">
              Start free. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/competitor"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-teal-600/20 w-full sm:w-auto justify-center text-base"
              >
                <BookOpen className="w-5 h-5" />
                Start Free
              </Link>
              <Link
                href="#pricing"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent hover:bg-slate-800 text-slate-300 font-semibold rounded-xl border border-slate-600 hover:border-slate-500 w-full sm:w-auto justify-center text-base"
              >
                See Pricing
              </Link>
            </div>
          </ScrollReveal>
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
            <p className="text-sm text-slate-500">
              Built by a debater on the NSDA Student Leadership Council.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  color: "teal" | "cyan" | "emerald" | "amber";
}) {
  const colors = {
    teal: {
      bg: "bg-teal-600/10",
      border: "border-teal-600/20",
      hover: "hover:border-teal-600/40",
      icon: "text-teal-400",
    },
    cyan: {
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
      hover: "hover:border-cyan-500/40",
      icon: "text-cyan-400",
    },
    emerald: {
      bg: "bg-emerald-600/10",
      border: "border-emerald-600/20",
      hover: "hover:border-emerald-600/40",
      icon: "text-emerald-400",
    },
    amber: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      hover: "hover:border-amber-500/40",
      icon: "text-amber-400",
    },
  };
  const c = colors[color];
  return (
    <div
      className={`p-6 rounded-xl border ${c.border} ${c.bg} ${c.hover} h-full backdrop-blur-sm`}
    >
      <div
        className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center mb-4`}
      >
        <Icon className={`w-5 h-5 ${c.icon}`} />
      </div>
      <h3 className="font-semibold text-slate-100 mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function FeatureItem({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
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

function PhilosophyCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
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
