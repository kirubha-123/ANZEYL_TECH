import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ANZEYL SOLUTIONS | Learn with AI, Demonstrate Skills & Build Careers",
  description:
    "ANZEYL SOLUTIONS is a next-generation EdTech platform featuring 24/7 AI tutoring, proctored adaptive skill assessments, real projects, and score-based tuition discounts. Founded by Nagoor Meeran in Bangalore, Karnataka.",
  icons: {
    icon: "/anzeyl-az-logo.png",
    shortcut: "/anzeyl-az-logo.png",
    apple: "/anzeyl-az-logo.png",
  },
  openGraph: {
    title: "ANZEYL SOLUTIONS | Learn with AI, Demonstrate Skills & Build Careers",
    description:
      "ANZEYL SOLUTIONS is a next-generation EdTech platform featuring 24/7 AI tutoring, proctored adaptive skill assessments, real projects, and score-based tuition discounts. Founded by Nagoor Meeran in Bangalore, Karnataka.",
    siteName: "ANZEYL SOLUTIONS",
  },
  twitter: {
    card: "summary",
    title: "ANZEYL SOLUTIONS | Learn with AI, Demonstrate Skills & Build Careers",
    description:
      "ANZEYL SOLUTIONS is a next-generation EdTech platform with 24/7 AI tutoring, adaptive skill assessments, and score-based tuition discounts.",
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
