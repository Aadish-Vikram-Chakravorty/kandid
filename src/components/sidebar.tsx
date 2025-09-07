"use client";

import { useSidebar } from "@/stores/use-sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  LayoutDashboard,
  Users,
  Lightbulb,
  MessageSquare,
  Linkedin,
  Settings,
  Activity,
  UserCog,
} from "lucide-react";

export function Sidebar() {
  // Get the new state and functions from the store
  const { isOpen, openSidebar, closeSidebar } = useSidebar();
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/leads", label: "Leads", icon: Users },
    { href: "/campaign", label: "Campaign", icon: Lightbulb },
    { href: "/messages", label: "Messages", icon: MessageSquare, count: 10 },
    { href: "/linkedin", label: "Linkedin Accounts", icon: Linkedin },
  ];

  // ... (adminItems array remains the same)

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "fixed left-0 top-0 z-20 flex h-screen flex-col border-r bg-background transition-all duration-300",
          isOpen ? "w-72" : "w-20"
        )}
        // Add the hover event handlers here
        onMouseEnter={openSidebar}
        onMouseLeave={closeSidebar}
      >
        <div className="flex h-full flex-col">
          {/* Top Section */}
          <div className="p-4 border-b">
            <div className={cn("font-bold text-lg", !isOpen && "text-center")}>
              {isOpen ? "LinkBird" : "LB"}
            </div>
            {isOpen && (
              <div className="mt-4">
                <Button variant="ghost" className="w-full justify-start gap-3 px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>PE</AvatarFallback>
                  </Avatar>
                  <div className="text-left overflow-hidden whitespace-nowrap">
                    <p className="font-semibold text-sm">Kandid</p>
                    <p className="text-xs text-muted-foreground">Personal</p>
                  </div>
                </Button>
              </div>
            )}
          </div>

          {/* Middle Section: Navigation */}
          <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
            {/* Navigation items mapping... (this part remains the same) */}
            <p className={cn("text-xs text-muted-foreground px-2 uppercase", !isOpen && "text-center")}>
              {isOpen ? "Overview" : "•"}
            </p>
            {navItems.map((item) => (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Button
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href={item.href} className="flex gap-3">
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {isOpen && <span className="truncate">{item.label}</span>}
                      {isOpen && item.count && (
                        <span className="ml-auto bg-primary text-primary-foreground rounded-full text-xs px-2 py-0.5">
                          {item.count}
                        </span>
                      )}
                    </Link>
                  </Button>
                </TooltipTrigger>
                {!isOpen && <TooltipContent side="right">{item.label}</TooltipContent>}
              </Tooltip>
            ))}
          </nav>

          {/* Bottom Section: User Profile */}
          <div className="mt-auto p-4 border-t">
            {/* The toggle button is now removed */}
            <Button variant="ghost" className="w-full justify-start gap-3 px-2 overflow-hidden">
              <Avatar className="h-8 w-8">
                <AvatarFallback>BK</AvatarFallback>
              </Avatar>
              {isOpen && (
                <div className="text-left overflow-hidden whitespace-nowrap">
                  <p className="font-semibold text-sm">Bhavya from Kandid</p>
                  <p className="text-xs text-muted-foreground">bhavya@kandid.ai</p>
                </div>
              )}
            </Button>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}