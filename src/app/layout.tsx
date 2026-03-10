import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { TaskProvider } from "@/context/TaskContext";

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
      <body className="antialiased h-svh w-screen flex flex-col">
        <div className="shrink-0 border-b px-8 py-2">
          <Navbar />
        </div>
        <main className="flex-1 p-8">
          <TaskProvider>
            {children}
          </TaskProvider>
        </main>
      </body>
    </html>
  );
}