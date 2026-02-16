"use client";

import { useState } from "react";
import {
  BarChart3,
  Send,
  Loader2,
  Bot,
  User,
  ArrowRight,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Scale,
  AlertTriangle,
} from "lucide-react";
import FormatSelector from "@/components/ui/FormatSelector";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface RoundSummary {
  proArguments: ArgumentSummary[];
  conArguments: ArgumentSummary[];
  clashPoints: string[];
  droppedArguments: { side: string; argument: string }[];
  weighing: { side: string; mechanism: string }[];
}

interface ArgumentSummary {
  tag: string;
  summary: string;
  status: "extended" | "dropped" | "contested";
  evidence: string;
}

export default function PostRoundPage() {
  const [format, setFormat] = useState("pf");
  const [proNotes, setProNotes] = useState("");
  const [conNotes, setConNotes] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [summary, setSummary] = useState<RoundSummary | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isLoadingChat, setIsLoadingChat] = useState(false);

  const handleAnalyze = async () => {
    if (!proNotes.trim() || !conNotes.trim()) return;
    setIsAnalyzing(true);

    await new Promise((resolve) => setTimeout(resolve, 2500));

    setSummary({
      proArguments: [
        {
          tag: "Economic Growth Impact",
          summary:
            "Pro argued that the resolution's mechanism leads to increased economic growth through investment stimulation and market expansion. Supported with 2024 Brookings data.",
          status: "extended",
          evidence: "Brookings 2024, Stanford Digital Economy Lab 2024",
        },
        {
          tag: "Equity Framework",
          summary:
            "Pro established a framework centered on reducing systemic inequality, arguing that the resolution uniquely addresses disparities in access and opportunity.",
          status: "contested",
          evidence: "World Bank 2024 report, UNESCO survey data",
        },
        {
          tag: "Historical Precedent",
          summary:
            "Pro cited analogous policy implementations that produced positive outcomes in comparable contexts.",
          status: "dropped",
          evidence: "Reuters investigative series 2025",
        },
      ],
      conArguments: [
        {
          tag: "Status Quo Sufficiency",
          summary:
            "Con argued that existing mechanisms already address the problem, making the resolution unnecessary. Pointed to recent policy changes as evidence.",
          status: "extended",
          evidence: "Government Accountability Office 2024 report",
        },
        {
          tag: "Implementation Harms",
          summary:
            "Con presented evidence that similar implementations have caused transition costs, displacement, and unintended consequences that outweigh benefits.",
          status: "extended",
          evidence: "RAND Corporation 2024, Journal of Policy Analysis 2024",
        },
        {
          tag: "Timeframe Argument",
          summary:
            "Con argued that even if Pro's impacts materialize, they occur over a much longer timeframe than the harms, which are immediate.",
          status: "contested",
          evidence: "Limited direct evidence; logical argument",
        },
      ],
      clashPoints: [
        "Whether the status quo is sufficient to address the identified problem, or whether the resolution provides a unique mechanism for change",
        "Whether the economic benefits of the resolution outweigh the transition costs and implementation risks",
        "The appropriate framework for evaluating impacts: equity-based (Pro) vs. consequentialist net benefits (Con)",
        "The reliability and recency of evidence on both sides, particularly regarding predicted vs. observed outcomes",
      ],
      droppedArguments: [
        {
          side: "Pro",
          argument:
            "Historical precedent argument was not extended in later speeches",
        },
        {
          side: "Con",
          argument:
            "Did not directly respond to Pro's equity framework until summary speech",
        },
      ],
      weighing: [
        {
          side: "Pro",
          mechanism:
            "Argued for magnitude weighing: even if probability is uncertain, the scale of potential benefit justifies the risk",
        },
        {
          side: "Con",
          mechanism:
            "Argued for probability weighing: the certainty of short-term harms outweighs the speculative nature of long-term benefits",
        },
      ],
    });
    setHasAnalyzed(true);
    setIsAnalyzing(false);
  };

  const handleChat = async () => {
    if (!chatInput.trim() || isLoadingChat) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: chatInput,
    };
    setMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsLoadingChat(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content:
        "Based on the round analysis, here are some additional considerations:\n\n" +
        "The key unresolved clash was around the framework level. Pro's equity framework and Con's consequentialist approach are fundamentally different ways of evaluating the round. Whichever framework you as a judge find better-established will significantly shape which arguments carry more weight.\n\n" +
        "A few things to consider:\n\n" +
        "1. Did either side provide a compelling reason why their framework should be preferred?\n" +
        "2. Were there arguments that both frameworks would recognize as important?\n" +
        "3. How did each side handle the other's strongest arguments?\n\n" +
        "Remember, this analysis is meant to clarify what happened in the round, not to suggest a winner. The evaluation and decision are yours to make.",
    };
    setMessages((prev) => [...prev, assistantMsg]);
    setIsLoadingChat(false);
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "extended":
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case "dropped":
        return <XCircle className="w-4 h-4 text-red-400" />;
      case "contested":
        return <MinusCircle className="w-4 h-4 text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Post-Round Analysis
            </h1>
            <p className="text-sm text-slate-500">
              Balanced summary and clash identification for decision-making
            </p>
          </div>
        </div>

        {!hasAnalyzed ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Debate Format
              </label>
              <FormatSelector
                selectedFormat={format}
                onFormatChange={setFormat}
                accentColor="amber"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Pro / Aff Notes
                </label>
                <textarea
                  value={proNotes}
                  onChange={(e) => setProNotes(e.target.value)}
                  placeholder="Paste your flow notes for the Pro/Aff side..."
                  rows={12}
                  className="w-full rounded-xl border border-blue-200 bg-blue-50/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Con / Neg Notes
                </label>
                <textarea
                  value={conNotes}
                  onChange={(e) => setConNotes(e.target.value)}
                  placeholder="Paste your flow notes for the Con/Neg side..."
                  rows={12}
                  className="w-full rounded-xl border border-red-200 bg-red-50/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder:text-slate-400 resize-none"
                />
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!proNotes.trim() || !conNotes.trim()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <BarChart3 className="w-5 h-5" />
              Analyze Round
            </button>
          </div>
        ) : isAnalyzing ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
            <p className="text-sm text-slate-600 font-medium">
              Analyzing round...
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Identifying clash points and summarizing arguments
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <button
              onClick={() => {
                setHasAnalyzed(false);
                setSummary(null);
                setMessages([]);
              }}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              &larr; Analyze another round
            </button>

            {/* Neutrality reminder */}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
              <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <p className="text-xs text-amber-700">
                This analysis presents both sides neutrally. It does not
                indicate a winner or recommend a decision.
              </p>
            </div>

            {summary && (
              <>
                {/* Side-by-Side Arguments */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Pro Side */}
                  <div className="rounded-xl border border-blue-200 bg-white overflow-hidden">
                    <div className="px-4 py-3 bg-blue-50 border-b border-blue-200">
                      <h3 className="text-sm font-semibold text-blue-900">
                        Pro / Aff Arguments
                      </h3>
                    </div>
                    <div className="p-4 space-y-3">
                      {summary.proArguments.map((arg, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-lg border border-slate-100"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {statusIcon(arg.status)}
                            <span className="text-sm font-medium text-slate-900">
                              {arg.tag}
                            </span>
                            <span
                              className={`text-xs px-1.5 py-0.5 rounded capitalize ${
                                arg.status === "extended"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : arg.status === "dropped"
                                    ? "bg-red-50 text-red-700"
                                    : "bg-amber-50 text-amber-700"
                              }`}
                            >
                              {arg.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mb-1">
                            {arg.summary}
                          </p>
                          <p className="text-xs text-slate-400">
                            Evidence: {arg.evidence}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Con Side */}
                  <div className="rounded-xl border border-red-200 bg-white overflow-hidden">
                    <div className="px-4 py-3 bg-red-50 border-b border-red-200">
                      <h3 className="text-sm font-semibold text-red-900">
                        Con / Neg Arguments
                      </h3>
                    </div>
                    <div className="p-4 space-y-3">
                      {summary.conArguments.map((arg, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-lg border border-slate-100"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {statusIcon(arg.status)}
                            <span className="text-sm font-medium text-slate-900">
                              {arg.tag}
                            </span>
                            <span
                              className={`text-xs px-1.5 py-0.5 rounded capitalize ${
                                arg.status === "extended"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : arg.status === "dropped"
                                    ? "bg-red-50 text-red-700"
                                    : "bg-amber-50 text-amber-700"
                              }`}
                            >
                              {arg.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mb-1">
                            {arg.summary}
                          </p>
                          <p className="text-xs text-slate-400">
                            Evidence: {arg.evidence}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Key Clash Points */}
                <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <Scale className="w-4 h-4 text-slate-600" />
                      <h3 className="text-sm font-semibold text-slate-900">
                        Key Clash Points
                      </h3>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    {summary.clashPoints.map((point, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 mt-1 flex-shrink-0" />
                        <p className="text-sm text-slate-700">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dropped Arguments */}
                <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-900">
                      Dropped Arguments
                    </h3>
                  </div>
                  <div className="p-4 space-y-2">
                    {summary.droppedArguments.map((drop, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2"
                      >
                        <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span
                            className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                              drop.side === "Pro"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {drop.side}
                          </span>
                          <span className="text-sm text-slate-700 ml-2">
                            {drop.argument}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weighing */}
                <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-900">
                      Comparative Weighing
                    </h3>
                  </div>
                  <div className="p-4 space-y-3">
                    {summary.weighing.map((w, i) => (
                      <div key={i} className="p-3 rounded-lg bg-slate-50">
                        <span
                          className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                            w.side === "Pro"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {w.side}
                        </span>
                        <p className="text-sm text-slate-700 mt-1">
                          {w.mechanism}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Follow-up Chat */}
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
                <h3 className="font-semibold text-slate-900 text-sm">
                  Questions about this analysis?
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ask for clarification on specific arguments or clash points.
                </p>
              </div>

              {messages.length > 0 && (
                <div className="px-5 py-4 space-y-3 max-h-80 overflow-y-auto">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${
                          msg.role === "user" ? "bg-slate-900" : "bg-blue-50"
                        }`}
                      >
                        {msg.role === "user" ? (
                          <User className="w-3.5 h-3.5 text-white" />
                        ) : (
                          <Bot className="w-3.5 h-3.5 text-blue-600" />
                        )}
                      </div>
                      <div
                        className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm ${
                          msg.role === "user"
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-800"
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                      </div>
                    </div>
                  ))}
                  {isLoadingChat && (
                    <div className="flex gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <div className="bg-slate-100 rounded-xl px-3.5 py-2.5">
                        <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="px-5 py-3 border-t border-slate-100">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleChat();
                  }}
                  className="flex gap-2"
                >
                  <input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about specific arguments, clash, or weighing..."
                    className="flex-1 px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim() || isLoadingChat}
                    className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
