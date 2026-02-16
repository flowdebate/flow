import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flow | Debate Training & Judging Platform",
  description:
    "Professional debate training tools for competitors and judges. Practice speeches, get case feedback, run mock debates, and streamline judging workflows.",
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
