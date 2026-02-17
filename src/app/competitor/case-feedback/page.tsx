"use client";

import { useState, useCallback } from "react";
import {
  FileText,
  Send,
  Loader2,
  Bot,
  User,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Shield,
  BookOpen,
  Target,
} from "lucide-react";
import FileUpload from "@/components/ui/FileUpload";
import FormatSelector from "@/components/ui/FormatSelector";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface FeedbackCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: string[];
  color: string;
}

export default function CaseFeedbackPage() {
  const [format, setFormat] = useState("pf");
  const [caseText, setCaseText] = useState("");
  const [side, setSide] = useState<"pro" | "con">("pro");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackCategory[] | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [followUp, setFollowUp] = useState("");
  const [isLoadingChat, setIsLoadingChat] = useState(false);

  const handleFileSelect = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setCaseText(text);
    };
    reader.readAsText(file);
  }, []);

  const handleSubmit = async () => {
    if (!caseText.trim()) return;
    setIsAnalyzing(true);
    setHasSubmitted(true);

    // Simulate analysis delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setFeedback([
      {
        title: "Argument Structure",
        icon: Target,
        color: "teal",
        items: [
          "Your contentions are clearly labeled and organized. Consider adding a brief roadmap at the start of your case to help judges follow your structure.",
          "The link chain in Contention 1 could be strengthened. Make sure each claim connects to the next with explicit warrants.",
          "Your framework needs clearer connection to your contentions. Explain why winning your framework means the judge should prefer your arguments.",
        ],
      },
      {
        title: "Evidence Quality",
        icon: BookOpen,
        color: "teal",
        items: [
          "Strong use of recent empirical evidence in your second contention. The 2024 data adds credibility.",
          "Consider diversifying your source types. Currently relying heavily on think tank reports. Academic journals or government data could strengthen credibility.",
          "Some evidence cards lack clear dates and author qualifications. Judges may question recency and expertise.",
        ],
      },
      {
        title: "Logical Consistency",
        icon: CheckCircle2,
        color: "emerald",
        items: [
          "The internal logic within each contention is sound. Your cause-and-effect reasoning is clear.",
          "There may be tension between your framework emphasis on individual rights and your Contention 2 which focuses on utilitarian outcomes. Consider how to reconcile these.",
          "Your weighing mechanism is implied but not explicitly stated. Judges need you to tell them how to compare arguments.",
        ],
      },
      {
        title: "Potential Vulnerabilities",
        icon: AlertTriangle,
        color: "amber",
        items: [
          "Your case relies heavily on one study for Contention 1. If opponents challenge that evidence, the entire contention could be at risk.",
          "The opposition could argue your impacts are not unique to the resolution. Prepare responses for uniqueness challenges.",
          "Consider how your case handles the most common counterarguments in the topic literature. Test your frontlines against standard negative positions.",
        ],
      },
      {
        title: "Areas for Development",
        icon: TrendingUp,
        color: "purple",
        items: [
          "Adding a preemptive response to the most common objection would strengthen your constructive.",
          "Your impact calculus could be more explicit. Quantify where possible and explain the magnitude, probability, and timeframe of your impacts.",
          "Consider adding a brief overview at the top that tells the story of why your side wins the round.",
        ],
      },
    ]);
    setIsAnalyzing(false);
  };

  const handleFollowUp = async () => {
    if (!followUp.trim() || isLoadingChat) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: followUp,
    };
    setMessages((prev) => [...prev, userMsg]);
    setFollowUp("");
    setIsLoadingChat(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content:
        "That's a great question. Here are some areas to consider:\n\n" +
        "1. Think about what specific aspect of your case you'd like to strengthen. I can provide targeted feedback on individual contentions, your framework, or your evidence.\n\n" +
        "2. Remember, I'm here to guide your improvement, not rewrite your arguments. What part of the feedback above resonated most with you?\n\n" +
        "3. If you'd like to test a specific argument against common counterarguments, try the Mock Debate tool for a more interactive experience.\n\n" +
        "What would you like to explore further?",
    };
    setMessages((prev) => [...prev, assistantMsg]);
    setIsLoadingChat(false);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-teal-600/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-100">
              Case Feedback &amp; Analysis
            </h1>
            <p className="text-sm text-slate-400">
              Upload your case for detailed, constructive feedback
            </p>
          </div>
        </div>

        {!hasSubmitted ? (
          <div className="space-y-6">
            {/* Format & Side Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Debate Format
                </label>
                <FormatSelector
                  selectedFormat={format}
                  onFormatChange={setFormat}
                  accentColor="teal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Side
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSide("pro")}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium border ${
                      side === "pro"
                        ? "border-teal-600/20 bg-teal-600/10 text-teal-400"
                        : "border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700"
                    }`}
                  >
                    Pro / Aff
                  </button>
                  <button
                    onClick={() => setSide("con")}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium border ${
                      side === "con"
                        ? "border-teal-600/20 bg-teal-600/10 text-teal-400"
                        : "border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700"
                    }`}
                  >
                    Con / Neg
                  </button>
                </div>
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Upload Your Case
              </label>
              <FileUpload
                onFileSelect={handleFileSelect}
                accept=".pdf,.doc,.docx,.txt"
                label="Drop your case file here"
                description="PDF, Word, or text files up to 10MB"
                accentColor="teal"
              />
            </div>

            {/* Text Input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Or Paste Your Case
              </label>
              <textarea
                value={caseText}
                onChange={(e) => setCaseText(e.target.value)}
                placeholder="Paste the full text of your debate case here..."
                rows={12}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder:text-slate-500 resize-none"
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!caseText.trim()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Shield className="w-5 h-5" />
              Analyze My Case
            </button>

            <p className="text-xs text-slate-400">
              Flow will provide constructive feedback on your case structure,
              evidence, and strategy. It will never rewrite your arguments.
            </p>
          </div>
        ) : isAnalyzing ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-teal-500 animate-spin mb-4" />
            <p className="text-sm text-slate-400 font-medium">
              Analyzing your case...
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Reviewing structure, evidence, and logic
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Back button */}
            <button
              onClick={() => {
                setHasSubmitted(false);
                setFeedback(null);
                setMessages([]);
                setCaseText("");
              }}
              className="text-sm text-teal-400 hover:text-teal-300 font-medium"
            >
              &larr; Analyze another case
            </button>

            {/* Feedback Categories */}
            {feedback?.map((category, i) => (
              <FeedbackSection key={i} category={category} index={i} />
            ))}

            {/* Follow-up Chat */}
            <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-700 bg-slate-800/50">
                <h3 className="font-semibold text-slate-100 text-sm">
                  Questions about this feedback?
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Ask follow-up questions to dig deeper into any area of
                  feedback.
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
                          msg.role === "user"
                            ? "bg-teal-600"
                            : "bg-teal-500/10"
                        }`}
                      >
                        {msg.role === "user" ? (
                          <User className="w-3.5 h-3.5 text-white" />
                        ) : (
                          <Bot className="w-3.5 h-3.5 text-teal-400" />
                        )}
                      </div>
                      <div
                        className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm ${
                          msg.role === "user"
                            ? "bg-teal-600/20 text-slate-100 border border-teal-600/20"
                            : "bg-slate-800 text-slate-200 border border-slate-700/50"
                        }`}
                      >
                        <div className="whitespace-pre-wrap">
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoadingChat && (
                    <div className="flex gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-teal-500/10 flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5 text-teal-400" />
                      </div>
                      <div className="bg-slate-800 border border-slate-700/50 rounded-xl px-3.5 py-2.5">
                        <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="px-5 py-3 border-t border-slate-700">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleFollowUp();
                  }}
                  className="flex gap-2"
                >
                  <input
                    value={followUp}
                    onChange={(e) => setFollowUp(e.target.value)}
                    placeholder="Ask about specific feedback or request more detail..."
                    className="flex-1 px-3.5 py-2.5 text-sm border border-slate-700 bg-slate-800 text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder:text-slate-500"
                  />
                  <button
                    type="submit"
                    disabled={!followUp.trim() || isLoadingChat}
                    className="p-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
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

function FeedbackSection({
  category,
  index,
}: {
  category: FeedbackCategory;
  index: number;
}) {
  const colorMap: Record<string, { bg: string; icon: string; border: string }> =
    {
      teal: {
        bg: "bg-teal-600/10",
        icon: "text-teal-400",
        border: "border-teal-600/20",
      },
      emerald: {
        bg: "bg-emerald-500/10",
        icon: "text-emerald-400",
        border: "border-emerald-500/20",
      },
      amber: {
        bg: "bg-amber-500/10",
        icon: "text-amber-400",
        border: "border-amber-500/20",
      },
      purple: {
        bg: "bg-purple-500/10",
        icon: "text-purple-400",
        border: "border-purple-500/20",
      },
    };

  const colors = colorMap[category.color] || colorMap.teal;
  const Icon = category.icon;

  return (
    <div
      className="animate-fade-in rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`flex items-center gap-3 px-5 py-4 ${colors.bg} border-b ${colors.border}`}>
        <div className={`w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${colors.icon}`} />
        </div>
        <h3 className="font-semibold text-slate-100 text-sm">
          {category.title}
        </h3>
      </div>
      <div className="p-5 space-y-3">
        {category.items.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-slate-700/50 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-medium text-slate-400">
                {i + 1}
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
