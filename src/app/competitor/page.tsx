import Link from "next/link";
import {
  FileText,
  Mic,
  Swords,
  Search,
  ArrowRight,
  Lightbulb,
  TrendingUp,
  Clock,
  Target,
} from "lucide-react";

export default function CompetitorDashboard() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Competitor Training
          </h1>
          <p className="text-slate-500 mt-1">
            Sharpen your debate skills with AI-powered coaching tools.
          </p>
        </div>

        {/* Quick Start Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <ToolCard
            href="/competitor/case-feedback"
            icon={FileText}
            title="Case Feedback"
            description="Upload a case and get detailed analysis on argument structure, evidence quality, and vulnerabilities."
            color="blue"
          />
          <ToolCard
            href="/competitor/speech-practice"
            icon={Mic}
            title="Speech Practice"
            description="Transcribe or paste a practice speech for feedback on timing, organization, and persuasiveness."
            color="teal"
          />
          <ToolCard
            href="/competitor/mock-debate"
            icon={Swords}
            title="Mock Debate"
            description="Spar against an AI opponent. Get realistic rebuttals and cross-examination in your format."
            color="purple"
          />
          <ToolCard
            href="/competitor/evidence-research"
            icon={Search}
            title="Evidence Research"
            description="Search for credible evidence on your topic. Get source context without pre-built arguments."
            color="emerald"
          />
        </div>

        {/* Tips Section */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h2 className="font-semibold text-slate-900">
              Getting the most out of Flow
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TipCard
              icon={Target}
              title="Be specific"
              text="Tell the AI your debate format, topic, and side. The more context you give, the better the feedback."
            />
            <TipCard
              icon={TrendingUp}
              title="Iterate and improve"
              text="Use feedback to revise your case, then re-upload. Track your progress across sessions."
            />
            <TipCard
              icon={Clock}
              title="Practice under pressure"
              text="Use the speech timer to simulate real round conditions. Time management is a skill that needs practice."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolCard({
  href,
  icon: Icon,
  title,
  description,
  color,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: "blue" | "teal" | "purple" | "emerald";
}) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-100",
    teal: "bg-teal-50 text-teal-600 group-hover:bg-teal-100",
    purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-100",
    emerald: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100",
  };

  return (
    <Link
      href={href}
      className="group block p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClasses[color]}`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-900">{title}</h3>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <p className="text-sm text-slate-500 mt-1">{description}</p>
        </div>
      </div>
    </Link>
  );
}

function TipCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-slate-600" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-900">{title}</p>
        <p className="text-xs text-slate-500 mt-0.5">{text}</p>
      </div>
    </div>
  );
}
