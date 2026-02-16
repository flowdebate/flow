"use client";

import { useState } from "react";
import {
  Search,
  ExternalLink,
  BookOpen,
  Calendar,
  Building2,
  Send,
  Loader2,
  Bot,
  User,
  Filter,
  AlertCircle,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface Source {
  id: string;
  title: string;
  author: string;
  organization: string;
  date: string;
  type: "academic" | "think-tank" | "government" | "news" | "ngo";
  summary: string;
  relevance: string;
  url: string;
}

export default function EvidenceResearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceType, setSourceType] = useState<string>("all");
  const [isSearching, setIsSearching] = useState(false);
  const [sources, setSources] = useState<Source[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isLoadingChat, setIsLoadingChat] = useState(false);

  const sourceTypes = [
    { id: "all", label: "All Sources" },
    { id: "academic", label: "Academic" },
    { id: "think-tank", label: "Think Tanks" },
    { id: "government", label: "Government" },
    { id: "news", label: "News" },
    { id: "ngo", label: "NGO / Intl Org" },
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setHasSearched(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSources([
      {
        id: "1",
        title: "Global Economic Outlook 2025: Trends and Policy Implications",
        author: "Dr. Sarah Chen et al.",
        organization: "Brookings Institution",
        date: "January 2025",
        type: "think-tank",
        summary:
          "Comprehensive analysis of global economic trends with focus on trade policy impacts, labor market shifts, and fiscal sustainability challenges facing developed and developing economies.",
        relevance:
          "Could be used to contextualize economic impacts. Contains data on employment trends, GDP projections, and trade volume analysis relevant to multiple topic areas.",
        url: "#",
      },
      {
        id: "2",
        title:
          "The Impact of Digital Infrastructure on Economic Development: A Meta-Analysis",
        author: "Prof. James Rodriguez",
        organization: "Stanford Digital Economy Lab",
        date: "November 2024",
        type: "academic",
        summary:
          "Meta-analysis of 47 studies examining the relationship between digital infrastructure investment and economic growth across 120 countries over a 15-year period.",
        relevance:
          "Provides strong quantitative evidence on infrastructure-growth links. The meta-analysis methodology strengthens the evidence base beyond any single study.",
        url: "#",
      },
      {
        id: "3",
        title: "Annual Report on International Development Metrics",
        author: "Development Research Group",
        organization: "World Bank",
        date: "December 2024",
        type: "government",
        summary:
          "Annual compilation of development indicators including poverty rates, education access, health outcomes, and economic mobility across 189 member nations.",
        relevance:
          "Authoritative data source for quantifying development impacts. Government source adds credibility. Contains baseline statistics useful for multiple arguments.",
        url: "#",
      },
      {
        id: "4",
        title:
          "Youth Perspectives on Education Reform: A Cross-National Survey",
        author: "Maria Gonzalez & Team",
        organization: "UNESCO",
        date: "October 2024",
        type: "ngo",
        summary:
          "Survey of 15,000 young people across 40 countries on education quality, access barriers, and reform priorities. Includes qualitative data on student experiences.",
        relevance:
          "Provides unique perspective data from directly affected populations. Survey methodology and sample size lend credibility. Useful for arguments about education policy impacts.",
        url: "#",
      },
      {
        id: "5",
        title:
          "Climate Policy and Economic Transition: Lessons from Early Adopters",
        author: "Reuters Investigative Team",
        organization: "Reuters",
        date: "February 2025",
        type: "news",
        summary:
          "Investigative series examining how countries that adopted aggressive climate policies early have fared economically. Case studies include Denmark, Costa Rica, and South Korea.",
        relevance:
          "Real-world case studies provide empirical backing for policy arguments. Journalistic investigation adds a narrative dimension that can strengthen impact stories.",
        url: "#",
      },
    ]);
    setIsSearching(false);
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
        "Here's what I can tell you about that:\n\n" +
        "The evidence landscape on this topic has several key dimensions:\n\n" +
        "1. **Recent empirical data** - The most credible evidence comes from studies published in 2024-2025 that use large sample sizes and rigorous methodology. Look for meta-analyses when possible.\n\n" +
        "2. **Source diversity** - Judges tend to find arguments more persuasive when supported by evidence from multiple types of sources (academic, government, NGO). A single think tank report can be challenged more easily than converging evidence.\n\n" +
        "3. **How to use this evidence** - I want to emphasize that finding the evidence is just the first step. The argumentative work of connecting evidence to your specific claims and impacts is something you need to develop yourself. Think about: What does this evidence prove? What does it NOT prove? What are the limitations?\n\n" +
        "Would you like me to search for more specific evidence, or do you have questions about evaluating what we've found?",
    };
    setMessages((prev) => [...prev, assistantMsg]);
    setIsLoadingChat(false);
  };

  const getSourceTypeColor = (type: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      academic: { bg: "bg-blue-100", text: "text-blue-700" },
      "think-tank": { bg: "bg-purple-100", text: "text-purple-700" },
      government: { bg: "bg-emerald-100", text: "text-emerald-700" },
      news: { bg: "bg-amber-100", text: "text-amber-700" },
      ngo: { bg: "bg-teal-100", text: "text-teal-700" },
    };
    return colors[type] || { bg: "bg-slate-100", text: "text-slate-700" };
  };

  const filteredSources =
    sourceType === "all"
      ? sources
      : sources.filter((s) => s.type === sourceType);

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
            <Search className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Evidence Research Assistant
            </h1>
            <p className="text-sm text-slate-500">
              Find credible evidence and understand its relevance to your case
            </p>
          </div>
        </div>

        {/* Ethical Note */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 mb-6">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">
              Evidence, not arguments
            </p>
            <p className="text-xs text-amber-700 mt-0.5">
              Flow helps you find and understand evidence, but the argumentative
              work of connecting evidence to claims is yours. We present sources
              neutrally and explain context, not how to argue.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="space-y-4 mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for evidence on a topic, e.g., 'renewable energy economic impact'..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-slate-400"
                />
              </div>
              <button
                type="submit"
                disabled={!searchQuery.trim() || isSearching}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSearching ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                Search
              </button>
            </div>
          </form>

          {/* Source Type Filter */}
          {hasSearched && (
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <div className="flex flex-wrap gap-1.5">
                {sourceTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSourceType(type.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                      sourceType === type.id
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Loading */}
        {isSearching && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mb-4" />
            <p className="text-sm text-slate-600 font-medium">
              Searching for evidence...
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Finding recent, credible sources
            </p>
          </div>
        )}

        {/* Results */}
        {!isSearching && hasSearched && (
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">
                {filteredSources.length} source
                {filteredSources.length !== 1 ? "s" : ""} found
              </h2>
            </div>

            {filteredSources.map((source) => {
              const typeColor = getSourceTypeColor(source.type);
              return (
                <div
                  key={source.id}
                  className="animate-fade-in rounded-xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeColor.bg} ${typeColor.text} capitalize`}
                        >
                          {source.type.replace("-", " ")}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <Calendar className="w-3 h-3" />
                          {source.date}
                        </span>
                      </div>
                      <h3 className="font-semibold text-slate-900 text-sm mb-1">
                        {source.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {source.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {source.organization}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">
                        {source.summary}
                      </p>
                      <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                        <div className="flex items-center gap-1.5 mb-1">
                          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-xs font-medium text-emerald-700">
                            Relevance Notes
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {source.relevance}
                        </p>
                      </div>
                    </div>
                    <a
                      href={source.url}
                      className="flex-shrink-0 p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                      title="View source"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Research Chat */}
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
            <h3 className="font-semibold text-slate-900 text-sm">
              Research Assistant
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Ask questions about evidence, sources, or topics to explore.
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
                      msg.role === "user" ? "bg-slate-900" : "bg-emerald-50"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <Bot className="w-3.5 h-3.5 text-emerald-600" />
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
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-emerald-600" />
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
                placeholder="Ask about evidence, source credibility, or research strategies..."
                className="flex-1 px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || isLoadingChat}
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
