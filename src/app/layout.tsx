import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { TaskProvider } from "@/context/TaskContext";
import { ThemeProvider } from "@/components/ThemeProvider";

const nunitoSans = Nunito_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "A Kanban dashboard built with dnd-kit and Recharts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", nunitoSans.variable)} suppressHydrationWarning>
      <body className="antialiased h-svh flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="shrink-0 border-b px-2 sm:p-6 py-2">
            <Navbar />
          </div>
          <main className="flex-1 p-4 sm:p-8 overflow-auto">
            <TaskProvider>
              {children}
            </TaskProvider>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}