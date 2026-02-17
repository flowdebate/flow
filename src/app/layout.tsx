import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flow | AI Debate Coaching & Judge Assistant",
  description:
    "The AI coach that makes you better, not dependent. Expert debate coaching and judge assistance that strengthens critical thinking instead of replacing it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
