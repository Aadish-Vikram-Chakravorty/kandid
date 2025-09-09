"use client";

import Image from "next/image"; // Import the Next.js Image component
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
  Wand2,
  Headphones,
  Moon,
  LogOut,
} from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function Sidebar() {
  const { isOpen, openSidebar, closeSidebar } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("mock-auth-session");
    router.push("/login");
  };

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/leads", label: "Leads", icon: Users },
    { href: "/campaigns", label: "Campaigns", icon: Lightbulb },
    { href: "/messages", label: "Messages", icon: MessageSquare, count: 10 },
    { href: "/linkedin-accounts", label: "Linkedin Accounts", icon: Linkedin },
  ];

  const bottomNavItems = [
    { href: "/settings", label: "Setting & Billing", icon: Settings },
  ];

  const adminItems = [
    { href: "/activity-logs", label: "Activity logs", icon: Activity },
    { href: "/user-logs", label: "User logs", icon: UserCog },
  ];

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "fixed left-0 top-0 z-20 flex h-screen flex-col border-r bg-background transition-all duration-300",
          isOpen ? "w-72" : "w-20"
        )}
        onMouseEnter={openSidebar}
        onMouseLeave={closeSidebar}
      >
        <div className="flex h-full flex-col">
          <div className="p-4 border-b flex items-center h-[69px]">
            <Link href="/dashboard" className="flex items-center gap-2 w-full">
              <Image
                src="/logo.png"
                alt="LinkBird Logo"
                width={28}
                height={28}
              />
              {isOpen && (
                <span className="font-bold text-lg ml-1">LinkBird</span>
              )}
            </Link>
          </div>

          <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
            <p className={cn("text-xs text-muted-foreground px-2 uppercase",!isOpen && "text-center")}>
              {isOpen ? "Overview" : "•"}
            </p>
            {navItems.map((item) => (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Button
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className="w-full justify-start h-10"
                    asChild
                  >
                    <Link
                      href={item.href}
                      className="flex gap-3 items-center"
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {isOpen && (
                        <span className="truncate">{item.label}</span>
                      )}
                      {isOpen && item.count && (
                        <span className="ml-auto bg-primary text-primary-foreground rounded-full text-xs px-2 py-0.5">
                          {item.count}
                        </span>
                      )}
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            ))}
            <p
              className={cn("text-xs text-muted-foreground px-2 uppercase pt-4", !isOpen && "text-center")}>
              {isOpen ? "Settings" : "•"}
            </p>
            {bottomNavItems.map((item) => (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Button
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className="w-full justify-start h-10"
                    asChild
                  >
                    <Link
                      href={item.href}
                      className="flex gap-3 items-center"
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {isOpen && (
                        <span className="truncate">{item.label}</span>
                      )}
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            ))}
            <p
              className={cn("text-xs text-muted-foreground px-2 uppercase pt-4", !isOpen && "text-center")}>
              {isOpen ? "Admin Panel" : "•"}
            </p>
            {adminItems.map((item) => (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Button
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className="w-full justify-start h-10"
                    asChild
                  >
                    <Link
                      href={item.href}
                      className="flex gap-3 items-center"
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {isOpen && <span>{item.label}</span>}
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            ))}
          </nav>

          <div className="mt-auto p-4 border-t">
            {isOpen && (
              <div className="flex justify-around items-center mb-4">
                <Button variant="ghost" size="icon">
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Wand2 className="h-5 w-5 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Headphones className="h-5 w-5 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Moon className="h-5 w-5 text-muted-foreground" />
                </Button>
              </div>
            )}
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-2 overflow-hidden items-center"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback>BK</AvatarFallback>
              </Avatar>
              {isOpen && (
                <div className="text-left overflow-hidden whitespace-nowrap">
                  <p className="font-semibold text-sm">
                    Bhavya from Kandid
                  </p>
                  <p className="text-xs text-muted-foreground">
                    bhavya@kandid.ai
                  </p>
                </div>
              )}
            </Button>
            {isOpen && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="w-full mt-2"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            )}
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}