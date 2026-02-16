import Link from "next/link";
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
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                Flow
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-sm text-slate-600 hover:text-slate-900"
              >
                Features
              </a>
              <a
                href="#competitor"
                className="text-sm text-slate-600 hover:text-slate-900"
              >
                For Competitors
              </a>
              <a
                href="#judge"
                className="text-sm text-slate-600 hover:text-slate-900"
              >
                For Judges
              </a>
              <a
                href="#philosophy"
                className="text-sm text-slate-600 hover:text-slate-900"
              >
                Philosophy
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <Link
                href="/competitor"
                className="text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-2"
              >
                Competitor
              </Link>
              <Link
                href="/judge"
                className="text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-lg"
              >
                Judge
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
              <Zap className="w-3.5 h-3.5" />
              AI-powered debate coaching &amp; judging tools
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
              Elevate your
              <br />
              <span className="text-blue-600">debate game</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Professional training tools for competitors and streamlined
              workflows for judges. Flow enhances your skills without replacing
              your critical thinking.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/competitor"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm w-full sm:w-auto justify-center"
              >
                <BookOpen className="w-5 h-5" />
                Competitor Training
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/judge"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 font-medium rounded-xl border border-slate-200 shadow-sm w-full sm:w-auto justify-center"
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
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">
              Everything you need for competitive debate
            </h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              Two purpose-built portals with specialized tools for competitors
              and judges, supporting all major debate formats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Competitor Card */}
            <div
              id="competitor"
              className="p-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-blue-50/50"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Competitor Training
              </h3>
              <p className="text-slate-600 mb-6">
                Sharpen your skills with AI-powered coaching tools designed to
                make you a stronger debater.
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
                className="mt-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Open Competitor Portal
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Judge Card */}
            <div
              id="judge"
              className="p-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-amber-50/50"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                <Scale className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Judge Assistant
              </h3>
              <p className="text-slate-600 mb-6">
                Streamline your judging workflow with tools for documentation,
                analysis, and feedback.
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
                className="mt-6 inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium text-sm"
              >
                Open Judge Portal
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Formats */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-slate-900 mb-8">
            Supports all major debate formats
          </h2>
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
                className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700"
              >
                {format}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Our approach</h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              Flow is built on the belief that the best tools enhance human
              capability without replacing it.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PhilosophyCard
              icon={Shield}
              title="Enhance, don't replace"
              desc="We provide feedback, practice, and skill development tools. We never write arguments or cases for you."
            />
            <PhilosophyCard
              icon={Target}
              title="Unbiased evaluation"
              desc="Judge tools evaluate arguments on their merits using standard debate frameworks, free from personal bias."
            />
            <PhilosophyCard
              icon={MessageSquare}
              title="Coach, not competitor"
              desc="The AI acts as a sparring partner and coach, pushing you to think harder and build stronger arguments on your own."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to level up?
          </h2>
          <p className="text-slate-400 mb-8">
            Choose your portal and start improving today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/competitor"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl w-full sm:w-auto justify-center"
            >
              <BookOpen className="w-5 h-5" />
              Start Training
            </Link>
            <Link
              href="/judge"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl border border-white/20 w-full sm:w-auto justify-center"
            >
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
              <div className="w-6 h-6 bg-slate-700 rounded flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-slate-300" />
              </div>
              <span className="text-sm font-semibold text-slate-400">Flow</span>
            </div>
            <p className="text-sm text-slate-500">
              Built for debaters, by debaters. Enhance your skills, not your
              dependency.
            </p>
          </div>
        </div>
      </footer>
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
      <div className="mt-0.5 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-slate-600" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-900">{title}</p>
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
    <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
      <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}
