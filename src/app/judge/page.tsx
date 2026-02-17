import Link from "next/link";
import {
  ClipboardList,
  BarChart3,
  HelpCircle,
  PenTool,
  ArrowRight,
  Shield,
  Lightbulb,
} from "lucide-react";

const tools = [
  {
    href: "/judge/live-round",
    icon: ClipboardList,
    title: "Live Round Documentation",
    desc: "Real-time note-taking with automatic speech tracking, argument tagging, and flow export.",
  },
  {
    href: "/judge/post-round",
    icon: BarChart3,
    title: "Post-Round Analysis",
    desc: "Balanced analysis of both sides with clash identification, dropped arguments, and weighing comparison.",
  },
  {
    href: "/judge/decision-support",
    icon: HelpCircle,
    title: "Decision-Making Support",
    desc: "Evaluate arguments using format-specific frameworks with side-by-side criterion analysis.",
  },
  {
    href: "/judge/feedback-generation",
    icon: PenTool,
    title: "Feedback Generation",
    desc: "Draft constructive, educational feedback for both teams with actionable improvement items.",
  },
];

const practices = [
  "Take notes on both sides equally, regardless of your initial impressions, to ensure fair evaluation.",
  "Use the Decision Support framework to structure your thinking before committing to a decision.",
  "Draft feedback using the generation tool to ensure both teams receive specific, actionable advice.",
];

export default function JudgeDashboard() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Judge Assistant
          </h1>
          <p className="text-slate-400 mt-1">
            Tools to help you document, analyze, and provide feedback on debate
            rounds.
          </p>
        </div>

        {/* Neutrality Notice */}
        <div className="flex items-center gap-3 p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 mb-8">
          <Shield className="w-5 h-5 text-cyan-400 flex-shrink-0" />
          <p className="text-sm text-slate-300">
            <span className="font-medium text-cyan-300">Neutrality commitment: </span>
            All judge tools present arguments from both sides without bias. They
            help you organize and evaluate — the decision is always yours.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group p-5 rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-cyan-500/30 hover:bg-slate-800"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-3">
                <tool.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="font-semibold text-slate-100 mb-1 flex items-center gap-2">
                {tool.title}
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5" />
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {tool.desc}
              </p>
            </Link>
          ))}
        </div>

        <div className="p-5 rounded-xl border border-slate-700/50 bg-slate-800/30">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <h3 className="font-semibold text-slate-200 text-sm">
              Judging Best Practices
            </h3>
          </div>
          <ul className="space-y-2">
            {practices.map((tip, i) => (
              <li
                key={i}
                className="text-sm text-slate-400 flex items-start gap-2"
              >
                <span className="text-cyan-400 mt-1 flex-shrink-0">&#x2022;</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
