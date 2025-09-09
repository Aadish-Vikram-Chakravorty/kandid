"use client";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { useSidebar } from "@/stores/use-sidebar";
import { cn } from "@/lib/utils";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useSidebar();

  return (
    <div className="flex min-h-screen bg-muted/40">
      <Sidebar />
      <div
        className={cn(
          "flex flex-col flex-1 transition-all duration-300",
          isOpen ? "ml-72" : "ml-20"
        )}
      >
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}