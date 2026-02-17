import Link from "next/link";
import { Zap, Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with the basics",
    color: "slate",
    cta: "Get Started",
    ctaHref: "/auth/login",
    ctaStyle: "border border-slate-700 text-slate-300 hover:border-slate-600 hover:text-slate-100",
    features: [
      "Case Feedback (3/month)",
      "Speech Practice (3/month)",
      "Evidence Research",
      "All debate formats",
      "Judge Live Round tool",
    ],
  },
  {
    name: "Monthly",
    price: "$7",
    period: "per month",
    description: "Full access, billed monthly",
    color: "teal",
    cta: "Start Monthly",
    ctaHref: "/auth/login",
    ctaStyle: "bg-teal-600 hover:bg-teal-500 text-white",
    badge: "Most Popular",
    features: [
      "Unlimited Case Feedback",
      "Unlimited Speech Practice",
      "Mock Debate Sparring",
      "Evidence Research",
      "All debate formats",
      "Full Judge suite",
      "Priority support",
    ],
  },
  {
    name: "Annual",
    price: "$70",
    period: "per year",
    description: "Best value — save $14",
    color: "cyan",
    cta: "Start Annual",
    ctaHref: "/auth/login",
    ctaStyle: "bg-cyan-600 hover:bg-cyan-500 text-white",
    badge: "Best Value",
    features: [
      "Everything in Monthly",
      "2 months free",
      "Early access to new tools",
      "Priority support",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-100 tracking-tight">Flow</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="text-sm font-medium text-slate-300 hover:text-slate-100 px-4 py-2 rounded-lg border border-slate-700 hover:border-slate-600"
              >
                Login
              </Link>
              <Link
                href="/auth/login"
                className="text-sm font-medium text-white bg-teal-600 hover:bg-teal-500 px-4 py-2 rounded-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-20 pb-16 px-4 text-center">
        <h1 className="text-4xl font-bold text-slate-100 tracking-tight">Simple, honest pricing</h1>
        <p className="mt-4 text-lg text-slate-400 max-w-xl mx-auto">
          Start free. Upgrade when you need more. No hidden fees.
        </p>
      </section>

      {/* Tiers */}
      <section className="max-w-5xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col p-8 rounded-2xl border ${
                tier.color === "teal"
                  ? "border-teal-600/40 bg-teal-600/5"
                  : tier.color === "cyan"
                  ? "border-cyan-500/40 bg-cyan-500/5"
                  : "border-slate-700/50 bg-slate-800/30"
              }`}
            >
              {tier.badge && (
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold ${
                    tier.color === "teal"
                      ? "bg-teal-600 text-white"
                      : "bg-cyan-600 text-white"
                  }`}
                >
                  {tier.badge}
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-100">{tier.name}</h2>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-100">{tier.price}</span>
                  <span className="text-slate-500 text-sm">/{tier.period}</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{tier.description}</p>
              </div>

              <ul className="flex-1 space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        tier.color === "teal"
                          ? "text-teal-400"
                          : tier.color === "cyan"
                          ? "text-cyan-400"
                          : "text-slate-500"
                      }`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.ctaHref}
                className={`flex items-center justify-center py-2.5 rounded-xl text-sm font-medium transition-colors ${tier.ctaStyle}`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center mt-10 text-sm text-slate-500">
          Questions?{" "}
          <a href="mailto:hello@flowdebate.com" className="text-teal-400 hover:text-teal-300">
            Contact us
          </a>
        </p>
      </section>
    </div>
  );
}
