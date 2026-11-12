import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ANZEYL | Learn with AI, Demonstrate Skills & Build Careers",
  description:
    "ANZEYL is a next-generation EdTech platform featuring 24/7 AI tutoring, proctored adaptive skill assessments, real projects, and score-based tuition discounts.",
  icons: {
    icon: "/anzeyl-logo.jpg",
    shortcut: "/anzeyl-logo.jpg",
    apple: "/anzeyl-logo.jpg",
  },
  openGraph: {
    title: "ANZEYL | Learn with AI, Demonstrate Skills & Build Careers",
    description:
      "ANZEYL is a next-generation EdTech platform featuring 24/7 AI tutoring, proctored adaptive skill assessments, real projects, and score-based tuition discounts.",
    siteName: "ANZEYL",
  },
  twitter: {
    card: "summary",
    title: "ANZEYL | Learn with AI, Demonstrate Skills & Build Careers",
    description:
      "ANZEYL is a next-generation EdTech platform with 24/7 AI tutoring, adaptive skill assessments, and score-based tuition discounts.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#f7f5ef] text-[#263746] selection:bg-[#dcefea] selection:text-[#263746]">{children}</body>
    </html>
  );
}
