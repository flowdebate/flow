"use client";

import { useState, useRef, useEffect } from "react";
import {
  Swords,
  Send,
  Loader2,
  Bot,
  User,
  RotateCcw,
  Settings2,
  ChevronDown,
  MessageCircle,
  Zap,
} from "lucide-react";
import FormatSelector, { DEBATE_FORMATS } from "@/components/ui/FormatSelector";
import Timer from "@/components/ui/Timer";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  speechLabel?: string;
}

export default function MockDebatePage() {
  const [format, setFormat] = useState("pf");
  const [topic, setTopic] = useState("");
  const [side, setSide] = useState<"pro" | "con">("pro");
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced">("intermediate");
  const [mode, setMode] = useState<"debate" | "cross-ex">("debate");
  const [isStarted, setIsStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 160) + "px";
    }
  }, [input]);

  const currentFormat = DEBATE_FORMATS.find((f) => f.id === format);

  const handleStart = async () => {
    if (!topic.trim()) return;
    setIsStarted(true);

    const systemMsg: Message = {
      id: "system-1",
      role: "system",
      content: `Mock ${mode === "cross-ex" ? "Cross-Examination" : "Debate"} started.\nFormat: ${currentFormat?.name || format}\nTopic: ${topic}\nYou are: ${side === "pro" ? "Pro/Aff" : "Con/Neg"}\nDifficulty: ${difficulty}\n\nThe AI will argue the ${side === "pro" ? "Con/Neg" : "Pro/Aff"} side. Present your arguments and the AI will respond with realistic rebuttals and challenges.`,
    };

    setMessages([systemMsg]);
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const opponentSide = side === "pro" ? "Con/Neg" : "Pro/Aff";
    const openingMsg: Message = {
      id: "assistant-1",
      role: "assistant",
      content:
        mode === "cross-ex"
          ? `I'm ready for cross-examination. As the ${opponentSide} side on the topic "${topic}", I'll be questioning your position.\n\nLet me start: Can you briefly summarize the core thesis of your case and explain what specific mechanism you're claiming leads to your primary impact?`
          : `I'm prepared to debate the ${opponentSide} position on "${topic}".\n\nWhenever you're ready, present your ${side === "pro" ? "first constructive" : "response to the affirmative case"}. I'll engage with your arguments directly.\n\nRemember: I'm here to challenge your arguments constructively. Push back is how we both get better. Present your strongest case.`,
      speechLabel: mode === "cross-ex" ? "Cross-Examination" : `${opponentSide} Opening`,
    };

    setMessages((prev) => [...prev, openingMsg]);
    setIsLoading(false);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
      speechLabel: side === "pro" ? "Pro/Aff" : "Con/Neg",
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const responses = [
      {
        content:
          "I appreciate that argument, but there are several issues I'd like to raise:\n\n" +
          "First, the evidence you cite doesn't adequately address the question of causality. Correlation between the factors you mention doesn't establish that the resolution's mechanism is what drives the outcome.\n\n" +
          "Second, even if we grant your link chain, the impact doesn't outweigh. Consider that the status quo already has mechanisms addressing this concern. Your case needs to demonstrate why the resolution provides a unique benefit over existing structures.\n\n" +
          "Third, I'd point to counter-evidence suggesting the opposite trend. Recent studies from 2024 indicate that similar policy implementations in other contexts have produced mixed results at best.\n\n" +
          "How do you respond to the uniqueness challenge? What makes the resolution's approach different from what we're already doing?",
        label: "Rebuttal",
      },
      {
        content:
          "Let me address your points directly:\n\n" +
          "On your first contention, the warrant is underdeveloped. You claim that [X leads to Y], but you haven't explained the mechanism by which this happens. The internal link is missing a crucial step.\n\n" +
          "On your second contention, I'd argue this is a non-unique argument. The impacts you describe are already happening under the status quo. Unless you can prove the resolution uniquely resolves these issues, your case doesn't generate a reason to vote for you.\n\n" +
          "From my side, consider this: implementing the resolution would create significant transition costs and uncertainty. The empirical evidence from analogous situations suggests that disruption of existing systems often creates more harm in the short-to-medium term than the long-term benefits justify.\n\n" +
          "I'm curious to hear how you weigh your impacts against these concerns.",
        label: "Counter-argument",
      },
      {
        content:
          "Interesting point, but I want to push back on a few things:\n\n" +
          "Your evidence here is from 2021, and the landscape has changed significantly since then. More recent data suggests the trend you're citing has actually reversed. When we look at 2024-2025 data, the picture is considerably more nuanced.\n\n" +
          "Additionally, your framing of this issue assumes a particular value hierarchy that I don't think you've adequately justified. Why should we prioritize the metric you're using? There are competing frameworks that would weigh this differently.\n\n" +
          "Finally, I want to highlight what I think is the central clash in this round: it comes down to whether the potential benefits of change outweigh the risks of disrupting a functioning (if imperfect) system. I'd argue the burden of proof lies with the side advocating change, and that burden hasn't been met.\n\n" +
          "What's your strongest piece of evidence for why this specific resolution would produce the outcomes you claim?",
        label: "Clash",
      },
    ];

    const response = responses[Math.floor(Math.random() * responses.length)];
    const opponentSide = side === "pro" ? "Con/Neg" : "Pro/Aff";

    const assistantMsg: Message = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: response.content,
      speechLabel: `${opponentSide} ${response.label}`,
    };

    setMessages((prev) => [...prev, assistantMsg]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setIsStarted(false);
    setMessages([]);
    setInput("");
  };

  if (!isStarted) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-teal-600/10 flex items-center justify-center">
              <Swords className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-100">
                Mock Debate Sparring Partner
              </h1>
              <p className="text-sm text-slate-400">
                Practice against an AI opponent that challenges your arguments
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Format */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Debate Format
              </label>
              <FormatSelector
                selectedFormat={format}
                onFormatChange={setFormat}
                accentColor="blue"
              />
            </div>

            {/* Topic */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Resolution / Topic
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter the debate resolution or topic..."
                rows={2}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder:text-slate-500 resize-none"
              />
            </div>

            {/* Side & Mode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your Side
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
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Mode
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setMode("debate")}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium border ${
                      mode === "debate"
                        ? "border-teal-600/20 bg-teal-600/10 text-teal-400"
                        : "border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700"
                    }`}
                  >
                    Full Debate
                  </button>
                  <button
                    onClick={() => setMode("cross-ex")}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium border ${
                      mode === "cross-ex"
                        ? "border-teal-600/20 bg-teal-600/10 text-teal-400"
                        : "border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700"
                    }`}
                  >
                    Cross-Ex Only
                  </button>
                </div>
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Difficulty Level
              </label>
              <div className="flex gap-2">
                {(["beginner", "intermediate", "advanced"] as const).map(
                  (level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium border capitalize ${
                        difficulty === level
                          ? "border-teal-600/20 bg-teal-600/10 text-teal-400"
                          : "border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700"
                      }`}
                    >
                      {level}
                    </button>
                  ),
                )}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {difficulty === "beginner"
                  ? "Slower pace, more hints, focuses on fundamentals"
                  : difficulty === "intermediate"
                    ? "Balanced challenge, realistic tournament-level responses"
                    : "Tournament-winning caliber. Aggressive, strategic, and thorough."}
              </p>
            </div>

            {/* Start */}
            <button
              onClick={handleStart}
              disabled={!topic.trim()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Swords className="w-5 h-5" />
              Start Sparring
            </button>

            <p className="text-xs text-slate-400">
              The AI will argue the opposite side and provide realistic
              challenges to your arguments. Use this to test your frontlines and
              build resilience.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Session Header */}
      <div className="flex-shrink-0 border-b border-slate-700 bg-slate-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-600/10 flex items-center justify-center">
              <Swords className="w-4 h-4 text-teal-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-100">
                  Mock {mode === "cross-ex" ? "Cross-Ex" : "Debate"}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-teal-600/10 text-teal-400 font-medium">
                  {currentFormat?.name}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-400 font-medium capitalize">
                  {difficulty}
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate max-w-md">
                {topic}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Timer initialSeconds={0} countDown={false} label="Round" />
            <button
              onClick={handleReset}
              className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-slate-300"
              title="Reset round"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${
              msg.role === "system"
                ? "flex justify-center"
                : `flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`
            }`}
          >
            {msg.role === "system" ? (
              <div className="text-xs text-slate-400 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
                {msg.content.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < msg.content.split("\n").length - 1 && " | "}
                  </span>
                ))}
              </div>
            ) : (
              <>
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                    msg.role === "user" ? "bg-slate-900" : "bg-teal-600/10"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-teal-400" />
                  )}
                </div>
                <div className={`max-w-[80%] ${msg.role === "user" ? "text-right" : ""}`}>
                  {msg.speechLabel && (
                    <span
                      className={`inline-block text-xs font-medium mb-1 px-2 py-0.5 rounded-full ${
                        msg.role === "user"
                          ? "bg-teal-600/10 text-teal-400"
                          : "bg-teal-600/10 text-teal-400"
                      }`}
                    >
                      {msg.speechLabel}
                    </span>
                  )}
                  <div
                    className={`rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-teal-600/20 text-slate-100 border border-teal-600/20"
                        : "bg-slate-800 text-slate-200 border border-slate-700/50"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="chat-message flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-600/10 flex items-center justify-center">
              <Bot className="w-4 h-4 text-teal-400" />
            </div>
            <div className="bg-slate-700/50 rounded-xl px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                Preparing response...
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t border-slate-700 p-4 bg-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-end gap-2"
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              mode === "cross-ex"
                ? "Answer the question or ask your own..."
                : "Present your arguments..."
            }
            rows={1}
            className="flex-1 resize-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 p-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>
        <p className="text-xs text-slate-400 mt-2 text-center">
          Press Enter to send. The AI will challenge your arguments to help you
          improve.
        </p>
      </div>
    </div>
  );
}
