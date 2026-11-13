import type { Metadata } from "next";
import "./globals.css";

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
      suppressHydrationWarning
      className="h-full antialiased light"
      style={{ colorScheme: "light" }}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#f7f5ef] text-[#263746] selection:bg-[#dcefea] selection:text-[#263746] font-sans">{children}</body>
    </html>
  );
}
