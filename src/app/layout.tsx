import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const nunitoSans = Nunito_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Task Dashboard",
  description: "A Kanban dashboard built with dnd-kit and Recharts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("dark font-sans", nunitoSans.variable)}>
      <body className="antialiased p-8 min-h-svh w-screen">
        {children}
      </body>
    </html>
  );
}