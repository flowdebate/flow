"use client";

import { useState } from "react";
import {
  PenTool,
  Send,
  Loader2,
  Bot,
  User,
  Copy,
  Check,
  Download,
  RefreshCw,
  AlertTriangle,
  MessageSquare,
} from "lucide-react";
import FormatSelector from "@/components/ui/FormatSelector";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface FeedbackDraft {
  decision: string;
  proFeedback: FeedbackItem[];
  conFeedback: FeedbackItem[];
  reasoning: string;
}

interface FeedbackItem {
  category: string;
  feedback: string;
  actionable: string;
}

export default function FeedbackGenerationPage() {
  const [format, setFormat] = useState("pf");
  const [winner, setWinner] = useState<"pro" | "con" | "">("");
  const [roundSummary, setRoundSummary] = useState("");
  const [keyReasons, setKeyReasons] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [feedbackDraft, setFeedbackDraft] = useState<FeedbackDraft | null>(
    null,
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!roundSummary.trim() || !winner) return;
    setIsGenerating(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const winnerLabel = winner === "pro" ? "Pro/Aff" : "Con/Neg";
    const loserLabel = winner === "pro" ? "Con/Neg" : "Pro/Aff";

    setFeedbackDraft({
      decision: `I'm voting ${winnerLabel} in this round. The decision came down to the comparative weighing on the core clash: whether the resolution's mechanism provides sufficient unique benefit to outweigh the risks identified by the ${loserLabel}. ${winnerLabel} was more effective in establishing their weighing framework and consistently extending their key arguments through the round. Here's a more detailed breakdown of both teams' performance.`,
      proFeedback: [
        {
          category: "Argument Quality",
          feedback:
            winner === "pro"
              ? "Your main arguments were well-constructed with clear link chains. The evidence from your first contention was particularly strong, with recent data that directly supported your claims. Your framework was established early and consistently referenced."
              : "Your arguments had solid foundations, but the link chains needed more development. The gap between your evidence and your impact claims was where the opposing team was most effective in their attacks.",
          actionable:
            winner === "pro"
              ? "To improve further, work on diversifying your evidence base. Relying on fewer sources makes you vulnerable if one is effectively challenged."
              : "Focus on making each step of your causal chain explicit. Practice explaining your argument as a series of 'because' statements to identify weak links before your opponents do.",
        },
        {
          category: "Strategic Choices",
          feedback:
            winner === "pro"
              ? "Good decision to front-load your strongest argument. Your time allocation was effective, giving adequate coverage to both contentions while maintaining a strong framework presence."
              : "Dropping the historical precedent argument in later speeches was a significant strategic cost. Even if you felt other arguments were stronger, judges notice drops and opponents can leverage them.",
          actionable:
            winner === "pro"
              ? "Consider spending more time on preemptive responses to predictable counter-arguments. This would have saved time in rebuttal speeches."
              : "Before your summary speech, quickly assess which arguments are still live and ensure each gets at least a sentence of extension. Never fully drop an argument you introduced.",
        },
        {
          category: "Delivery & Persuasion",
          feedback:
            "Your speaking was clear and well-organized. Judges could follow your arguments easily. Signposting was effective, and your tempo was appropriate for the format.",
          actionable:
            "Work on your closing statements. The final 30 seconds of key speeches should clearly articulate why you win the round, not just summarize what you said.",
        },
      ],
      conFeedback: [
        {
          category: "Argument Quality",
          feedback:
            winner === "con"
              ? "Your status quo sufficiency argument was the strongest in the round. The evidence was recent, well-warranted, and directly applicable. Your implementation harms analysis was thorough and well-supported by analogous case studies."
              : "Your arguments were reasonable but lacked the level of evidence development needed to overcome the opposing case. The status quo sufficiency argument needed stronger empirical backing to be fully convincing.",
          actionable:
            winner === "con"
              ? "Your evidence was strong. Next step: work on explaining why the judge should weigh your framework over the opponent's. Don't assume judges will default to your evaluation criteria."
              : "Invest more time in evidence preparation. Having 2-3 strong pieces of evidence per argument, from diverse sources, will make your case significantly more resilient.",
        },
        {
          category: "Strategic Choices",
          feedback:
            winner === "con"
              ? "The decision to group your arguments thematically (status quo + implementation harms) created a coherent negative narrative. Your late engagement with Pro's framework was a minor vulnerability but didn't cost the round."
              : "Late engagement with the opposing framework was a strategic error. By the time you addressed it in summary, the opponent had two speeches of unchallenged framework development. Engage with frameworks early.",
          actionable:
            winner === "con"
              ? "Address the opposing framework earlier in the round. Even a brief response in rebuttal prevents them from claiming uncontested framework ground."
              : "Practice identifying the opposing team's framework in their first speech and preparing immediate responses. Framework clash often determines the round.",
        },
        {
          category: "Delivery & Persuasion",
          feedback:
            "Clear, confident speaking. Good use of rhetorical questions to engage the judge. Your pacing was generally good, though the rebuttal speech felt slightly rushed toward the end.",
          actionable:
            "Time your rebuttal speeches during practice. If you're consistently running short on time, prioritize which arguments to address rather than trying to cover everything quickly.",
        },
      ],
      reasoning:
        "The central question in this round was whether the resolution provides a unique mechanism for improvement beyond the status quo. Both teams had credible arguments and evidence. The decision turned on three factors:\n\n1. Framework comparison: Both teams offered competing frameworks but one team more clearly articulated why their framework should be preferred.\n\n2. Evidence engagement: The winning team more effectively challenged opposing evidence while defending their own, creating a favorable evidence comparison.\n\n3. Extension consistency: The winning team maintained all their arguments through the round, while the losing team had a notable drop that weakened their overall position.",
    });
    setHasGenerated(true);
    setIsGenerating(false);
  };

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const exportFeedback = () => {
    if (!feedbackDraft) return;
    let text = `JUDGE FEEDBACK\n${"=".repeat(50)}\n\n`;
    text += `DECISION:\n${feedbackDraft.decision}\n\n`;
    text += `PRO/AFF FEEDBACK:\n`;
    feedbackDraft.proFeedback.forEach((item) => {
      text += `\n[${item.category}]\n${item.feedback}\nAction Item: ${item.actionable}\n`;
    });
    text += `\nCON/NEG FEEDBACK:\n`;
    feedbackDraft.conFeedback.forEach((item) => {
      text += `\n[${item.category}]\n${item.feedback}\nAction Item: ${item.actionable}\n`;
    });
    text += `\nREASONING:\n${feedbackDraft.reasoning}\n`;

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `judge-feedback-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
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
        "Good question about phrasing feedback. Here are some suggestions:\n\n" +
        "When giving critical feedback, the 'observation + impact + suggestion' framework works well:\n\n" +
        "1. **Observation**: 'I noticed that your rebuttal didn't directly address the opposing team's framework.'\n\n" +
        "2. **Impact**: 'This meant that by summary speeches, they had unchallenged ground on how to evaluate the round.'\n\n" +
        "3. **Suggestion**: 'Even a brief acknowledgment of their framework with a reason to prefer yours would have been more strategic.'\n\n" +
        "This approach is educational because it explains the *why* behind the feedback. Debaters learn more from understanding the strategic implications of their choices than from simply being told what to do differently.\n\n" +
        "Would you like me to help rephrase any specific section of the feedback?",
    };
    setMessages((prev) => [...prev, assistantMsg]);
    setIsLoadingChat(false);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
            <PenTool className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Feedback Generation
            </h1>
            <p className="text-sm text-slate-500">
              Craft clear, educational feedback for both teams
            </p>
          </div>
        </div>

        {!hasGenerated ? (
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
                Your Decision
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setWinner("pro")}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium border ${
                    winner === "pro"
                      ? "border-blue-300 bg-blue-50 text-blue-700"
                      : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Pro / Aff Wins
                </button>
                <button
                  onClick={() => setWinner("con")}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium border ${
                    winner === "con"
                      ? "border-red-300 bg-red-50 text-red-700"
                      : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Con / Neg Wins
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Round Summary / Notes
              </label>
              <textarea
                value={roundSummary}
                onChange={(e) => setRoundSummary(e.target.value)}
                placeholder="Paste your round notes, flow, or output from the Post-Round Analysis..."
                rows={8}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-slate-400 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Key Reasons for Decision (optional)
              </label>
              <textarea
                value={keyReasons}
                onChange={(e) => setKeyReasons(e.target.value)}
                placeholder="Briefly explain the main reasons for your decision..."
                rows={4}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-slate-400 resize-none"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!roundSummary.trim() || !winner}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MessageSquare className="w-5 h-5" />
              Generate Feedback
            </button>
          </div>
        ) : isGenerating ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-purple-500 animate-spin mb-4" />
            <p className="text-sm text-slate-600 font-medium">
              Drafting feedback...
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Structuring constructive, educational feedback for both teams
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setHasGenerated(false);
                  setFeedbackDraft(null);
                  setMessages([]);
                  setRoundSummary("");
                  setKeyReasons("");
                  setWinner("");
                }}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                &larr; Generate new feedback
              </button>
              <button
                onClick={exportFeedback}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                <Download className="w-3.5 h-3.5" />
                Export All
              </button>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-lg bg-purple-50 border border-purple-200">
              <MessageSquare className="w-4 h-4 text-purple-500 flex-shrink-0" />
              <p className="text-xs text-purple-700">
                This is a draft to help you structure your feedback. Edit freely
                to match your voice and add your personal observations.
              </p>
            </div>

            {feedbackDraft && (
              <>
                {/* Decision Statement */}
                <FeedbackSection
                  title="Decision Statement"
                  content={feedbackDraft.decision}
                  onCopy={() =>
                    handleCopy(feedbackDraft.decision, "decision")
                  }
                  isCopied={copiedSection === "decision"}
                  accent="slate"
                />

                {/* Pro Feedback */}
                <div className="rounded-xl border border-blue-200 bg-white overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3 bg-blue-50 border-b border-blue-200">
                    <h3 className="text-sm font-semibold text-blue-900">
                      Feedback for Pro / Aff
                    </h3>
                    <button
                      onClick={() =>
                        handleCopy(
                          feedbackDraft.proFeedback
                            .map(
                              (f) =>
                                `[${f.category}]\n${f.feedback}\nAction: ${f.actionable}`,
                            )
                            .join("\n\n"),
                          "pro",
                        )
                      }
                      className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
                    >
                      {copiedSection === "pro" ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      {copiedSection === "pro" ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="p-5 space-y-4">
                    {feedbackDraft.proFeedback.map((item, i) => (
                      <div key={i}>
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                          {item.category}
                        </h4>
                        <p className="text-sm text-slate-700 mb-2">
                          {item.feedback}
                        </p>
                        <div className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100">
                          <span className="text-xs font-medium text-blue-700">
                            Actionable suggestion:
                          </span>
                          <p className="text-xs text-slate-600 mt-0.5">
                            {item.actionable}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Con Feedback */}
                <div className="rounded-xl border border-red-200 bg-white overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3 bg-red-50 border-b border-red-200">
                    <h3 className="text-sm font-semibold text-red-900">
                      Feedback for Con / Neg
                    </h3>
                    <button
                      onClick={() =>
                        handleCopy(
                          feedbackDraft.conFeedback
                            .map(
                              (f) =>
                                `[${f.category}]\n${f.feedback}\nAction: ${f.actionable}`,
                            )
                            .join("\n\n"),
                          "con",
                        )
                      }
                      className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700"
                    >
                      {copiedSection === "con" ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      {copiedSection === "con" ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="p-5 space-y-4">
                    {feedbackDraft.conFeedback.map((item, i) => (
                      <div key={i}>
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                          {item.category}
                        </h4>
                        <p className="text-sm text-slate-700 mb-2">
                          {item.feedback}
                        </p>
                        <div className="p-2.5 rounded-lg bg-red-50/50 border border-red-100">
                          <span className="text-xs font-medium text-red-700">
                            Actionable suggestion:
                          </span>
                          <p className="text-xs text-slate-600 mt-0.5">
                            {item.actionable}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reasoning */}
                <FeedbackSection
                  title="Decision Reasoning"
                  content={feedbackDraft.reasoning}
                  onCopy={() =>
                    handleCopy(feedbackDraft.reasoning, "reasoning")
                  }
                  isCopied={copiedSection === "reasoning"}
                  accent="slate"
                />
              </>
            )}

            {/* Follow-up Chat */}
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
                <h3 className="font-semibold text-slate-900 text-sm">
                  Refine your feedback
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ask for help rephrasing, adding detail, or improving specific
                  sections.
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
                            ? "bg-slate-900"
                            : "bg-purple-50"
                        }`}
                      >
                        {msg.role === "user" ? (
                          <User className="w-3.5 h-3.5 text-white" />
                        ) : (
                          <Bot className="w-3.5 h-3.5 text-purple-600" />
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
                      <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5 text-purple-600" />
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
                    placeholder="Ask about feedback phrasing, structure, or specific areas..."
                    className="flex-1 px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-slate-400"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim() || isLoadingChat}
                    className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
  title,
  content,
  onCopy,
  isCopied,
  accent,
}: {
  title: string;
  content: string;
  onCopy: () => void;
  isCopied: boolean;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-200">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <button
          onClick={onCopy}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700"
        >
          {isCopied ? (
            <Check className="w-3.5 h-3.5" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          {isCopied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="p-5">
        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </div>
  );
}
