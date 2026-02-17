import Link from "next/link";
import {
  FileText,
  Mic,
  Swords,
  Search,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

const tools = [
  {
    href: "/competitor/case-feedback",
    icon: FileText,
    title: "Case Feedback & Analysis",
    desc: "Upload your case and get detailed feedback on structure, evidence quality, and strategic vulnerabilities.",
  },
  {
    href: "/competitor/speech-practice",
    icon: Mic,
    title: "Speech Practice & Evaluation",
    desc: "Practice speeches with configurable timers and get scored on timing, coverage, clash, clarity, and strategy.",
  },
  {
    href: "/competitor/mock-debate",
    icon: Swords,
    title: "Mock Debate Sparring",
    desc: "Go head-to-head with an AI opponent that adapts to your format and difficulty level.",
  },
  {
    href: "/competitor/evidence-research",
    icon: Search,
    title: "Evidence Research Assistant",
    desc: "Search for credible sources and get summaries with relevance analysis for your topic.",
  },
];

const tips = [
  "Record yourself during practice rounds and review with the Speech Practice tool to track improvement over time.",
  "Use the Mock Debate tool at increasing difficulty levels to prepare for stronger opponents at tournaments.",
  "Run your case through Case Feedback before every tournament to catch vulnerabilities you might have missed.",
];

export default function CompetitorDashboard() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Competitor Training
          </h1>
          <p className="text-slate-400 mt-1">
            Choose a tool to start improving your debate skills.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group p-5 rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-teal-600/30 hover:bg-slate-800"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-600/10 flex items-center justify-center mb-3">
                <tool.icon className="w-5 h-5 text-teal-400" />
              </div>
              <h3 className="font-semibold text-slate-100 mb-1 flex items-center gap-2">
                {tool.title}
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-teal-400 group-hover:translate-x-0.5" />
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
              Training Tips
            </h3>
          </div>
          <ul className="space-y-2">
            {tips.map((tip, i) => (
              <li
                key={i}
                className="text-sm text-slate-400 flex items-start gap-2"
              >
                <span className="text-teal-400 mt-1 flex-shrink-0">&#x2022;</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
