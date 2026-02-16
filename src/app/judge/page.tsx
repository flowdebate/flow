import Link from "next/link";
import {
  ClipboardList,
  BarChart3,
  HelpCircle,
  PenTool,
  ArrowRight,
  AlertTriangle,
  Shield,
  Eye,
} from "lucide-react";

export default function JudgeDashboard() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Judge Assistant
          </h1>
          <p className="text-slate-500 mt-1">
            Tools to streamline your judging workflow and provide better
            feedback.
          </p>
        </div>

        {/* Neutrality Notice */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 mb-8">
          <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-900">
              Committed to neutrality
            </p>
            <p className="text-xs text-amber-700 mt-0.5">
              Flow never indicates a winner during a round. All analysis is
              presented as balanced evaluation to assist your own
              decision-making. The final decision is always yours.
            </p>
          </div>
        </div>

        {/* Tool Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <ToolCard
            href="/judge/live-round"
            icon={ClipboardList}
            title="Live Round Documentation"
            description="Real-time note-taking with argument tracking, flow visualization, and speech timers."
            color="amber"
          />
          <ToolCard
            href="/judge/post-round"
            icon={BarChart3}
            title="Post-Round Analysis"
            description="Balanced summaries of both sides with clash identification and weighing analysis."
            color="blue"
          />
          <ToolCard
            href="/judge/decision-support"
            icon={HelpCircle}
            title="Decision-Making Support"
            description="Evaluate arguments using format-specific frameworks. Identify extensions, drops, and weighing."
            color="teal"
          />
          <ToolCard
            href="/judge/feedback-generation"
            icon={PenTool}
            title="Feedback Generation"
            description="Craft clear, educational feedback that helps teams understand the decision and improve."
            color="purple"
          />
        </div>

        {/* Judging Tips */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-5 h-5 text-slate-500" />
            <h2 className="font-semibold text-slate-900">
              Judging best practices
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TipCard
              icon={ClipboardList}
              title="Flow everything"
              text="Document all arguments as they're made. A complete flow is the foundation of a good decision."
            />
            <TipCard
              icon={AlertTriangle}
              title="Track drops"
              text="Note which arguments are addressed and which are dropped. Dropped arguments carry significant weight."
            />
            <TipCard
              icon={Shield}
              title="Stay neutral"
              text="Evaluate arguments as presented. Your personal views on the topic should not factor into the decision."
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
  color: "amber" | "blue" | "teal" | "purple";
}) {
  const colorClasses = {
    amber: "bg-amber-50 text-amber-600 group-hover:bg-amber-100",
    blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-100",
    teal: "bg-teal-50 text-teal-600 group-hover:bg-teal-100",
    purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-100",
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
