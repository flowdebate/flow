"use client";

import { useState } from "react";
import {
  HelpCircle,
  Send,
  Loader2,
  Bot,
  User,
  CheckCircle2,
  XCircle,
  MinusCircle,
  ArrowRight,
  Scale,
  AlertTriangle,
  Layers,
} from "lucide-react";
import FormatSelector from "@/components/ui/FormatSelector";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface DecisionFramework {
  name: string;
  description: string;
  criteria: { criterion: string; proPosition: string; conPosition: string; notes: string }[];
}

export default function DecisionSupportPage() {
  const [format, setFormat] = useState("pf");
  const [roundNotes, setRoundNotes] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [framework, setFramework] = useState<DecisionFramework | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isLoadingChat, setIsLoadingChat] = useState(false);

  const handleAnalyze = async () => {
    if (!roundNotes.trim()) return;
    setIsAnalyzing(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setFramework({
      name: "Comparative Weighing (Public Forum)",
      description:
        "In Public Forum, the judge should evaluate which team better demonstrated that the preponderance of evidence supports their position on the resolution. Key considerations include the quality and quantity of evidence, the strength of link chains, impact magnitude, and which team provided clearer comparative weighing.",
      criteria: [
        {
          criterion: "Framework / Weighing Mechanism",
          proPosition:
            "Pro established a magnitude-based framework, arguing that the scale of potential benefit should be the primary lens for evaluation.",
          conPosition:
            "Con advocated for a probability framework, arguing that more certain short-term impacts should outweigh speculative long-term ones.",
          notes:
            "Consider which team better justified why their framework should be preferred. Did either team engage with the other's framework directly?",
        },
        {
          criterion: "Link Chain Strength",
          proPosition:
            "Pro's main causal chain runs: resolution mechanism -> increased investment -> economic growth -> downstream benefits. Each link supported by at least one piece of evidence.",
          conPosition:
            "Con's causal chain: resolution implementation -> disruption of existing systems -> transition costs -> net negative outcomes. Supported by analogous case studies.",
          notes:
            "Evaluate which chain has fewer vulnerable links. Were any links in either chain successfully challenged by the opposing team?",
        },
        {
          criterion: "Evidence Quality",
          proPosition:
            "Pro relies on recent think tank analysis and academic meta-studies. Strong methodological rigor but some sources from a narrow set of institutions.",
          conPosition:
            "Con uses government reports and case study analysis. Strong empirical grounding but case studies may not be perfectly analogous.",
          notes:
            "Consider source diversity, recency, methodology, and whether either team effectively challenged the other's evidence.",
        },
        {
          criterion: "Impact Calculus",
          proPosition:
            "Pro claims large-scale, long-term positive impact affecting significant populations. Magnitude is high but timeframe is extended.",
          conPosition:
            "Con claims immediate, tangible negative impacts from implementation. Magnitude may be smaller but probability and timeframe are more favorable.",
          notes:
            "Which impact calculus was more developed? Did either team explicitly compare magnitude vs. probability vs. timeframe?",
        },
        {
          criterion: "Argument Extension & Drops",
          proPosition:
            "Pro consistently extended economic growth and equity arguments. Dropped historical precedent argument in later speeches.",
          conPosition:
            "Con consistently extended status quo sufficiency and implementation harms. Late engagement with Pro's equity framework.",
          notes:
            "Dropped arguments can be significant. Did the drops represent core or peripheral arguments? Were extensions responsive to opposing arguments?",
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
        "That's an important consideration for your decision. Here are some thoughts on evaluating that:\n\n" +
        "When deciding between competing frameworks (magnitude vs. probability), consider:\n\n" +
        "1. **Which team better justified their framework?** Simply asserting that magnitude matters more isn't enough. Did the team explain *why* the judge should evaluate the round through that lens?\n\n" +
        "2. **Which team engaged the other's framework?** A team that only extends their own framework without addressing the opponent's is leaving an unresolved question for you to resolve.\n\n" +
        "3. **What does the evidence support?** Sometimes the evidence itself suggests which framework is more appropriate. If the evidence is strong on probability but weak on magnitude, that may inform which lens is more useful.\n\n" +
        "4. **What's the default in this format?** In PF, there's generally no strong default framework. But the team that provides the most explicit and well-warranted weighing mechanism typically has an advantage.\n\n" +
        "Remember, the decision framework should come from what was argued in the round, not from external preferences. What else would you like to explore?",
    };
    setMessages((prev) => [...prev, assistantMsg]);
    setIsLoadingChat(false);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Decision-Making Support
            </h1>
            <p className="text-sm text-slate-500">
              Evaluate arguments using standard debate frameworks
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

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Round Notes / Flow
              </label>
              <textarea
                value={roundNotes}
                onChange={(e) => setRoundNotes(e.target.value)}
                placeholder="Paste your complete round notes, flow, or the output from the Post-Round Analysis tool..."
                rows={14}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder:text-slate-400 resize-none"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!roundNotes.trim()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Layers className="w-5 h-5" />
              Generate Decision Framework
            </button>

            <p className="text-xs text-slate-400">
              Flow will present a structured framework for evaluating the round
              based on the format&apos;s standard evaluation criteria. The final
              decision is always yours.
            </p>
          </div>
        ) : isAnalyzing ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-teal-500 animate-spin mb-4" />
            <p className="text-sm text-slate-600 font-medium">
              Building decision framework...
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Mapping arguments to evaluation criteria
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <button
              onClick={() => {
                setHasAnalyzed(false);
                setFramework(null);
                setMessages([]);
                setRoundNotes("");
              }}
              className="text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              &larr; Analyze another round
            </button>

            {/* Neutrality reminder */}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
              <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <p className="text-xs text-amber-700">
                This framework presents arguments from both sides without
                prejudgment. Use it to structure your thinking, not as a
                decision.
              </p>
            </div>

            {framework && (
              <>
                {/* Framework Header */}
                <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="w-5 h-5 text-teal-600" />
                    <h2 className="font-bold text-slate-900">
                      {framework.name}
                    </h2>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {framework.description}
                  </p>
                </div>

                {/* Criteria Cards */}
                {framework.criteria.map((criterion, i) => (
                  <div
                    key={i}
                    className="animate-fade-in rounded-xl border border-slate-200 bg-white overflow-hidden"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-xs font-bold text-teal-700">
                          {i + 1}
                        </span>
                        <h3 className="text-sm font-semibold text-slate-900">
                          {criterion.criterion}
                        </h3>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-100">
                          <span className="text-xs font-semibold text-blue-700 uppercase">
                            Pro / Aff
                          </span>
                          <p className="text-sm text-slate-700 mt-1">
                            {criterion.proPosition}
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-red-50/50 border border-red-100">
                          <span className="text-xs font-semibold text-red-700 uppercase">
                            Con / Neg
                          </span>
                          <p className="text-sm text-slate-700 mt-1">
                            {criterion.conPosition}
                          </p>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-1.5 mb-1">
                          <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
                          <span className="text-xs font-medium text-teal-700">
                            Evaluation Notes
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {criterion.notes}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Follow-up Chat */}
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
                <h3 className="font-semibold text-slate-900 text-sm">
                  Need help thinking through a specific issue?
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ask questions about evaluation criteria, framework comparison,
                  or specific arguments.
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
                          msg.role === "user" ? "bg-slate-900" : "bg-teal-50"
                        }`}
                      >
                        {msg.role === "user" ? (
                          <User className="w-3.5 h-3.5 text-white" />
                        ) : (
                          <Bot className="w-3.5 h-3.5 text-teal-600" />
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
                      <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5 text-teal-600" />
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
                    placeholder="Ask about evaluation criteria or framework application..."
                    className="flex-1 px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder:text-slate-400"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim() || isLoadingChat}
                    className="p-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
