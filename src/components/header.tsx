"use client";

import { useSidebar } from "@/stores/use-sidebar";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PanelLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export function Header() {
  const { toggle } = useSidebar();
  const pathname = usePathname();

  // Generate breadcrumbs from the pathname
  const breadcrumbSegments = React.useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    return segments.map((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/');
      const isLast = index === segments.length - 1;
      // Capitalize the first letter
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);
      return { href, label, isLast };
    });
  }, [pathname]);

  return (
    <header className="sticky top-0 z-10 flex h-[57px] items-center gap-4 border-b bg-background px-4 sm:px-6">
      <Button
        variant="outline"
        size="icon"
        className="sm:hidden" 
        onClick={toggle}
      >
        <PanelLeft className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {breadcrumbSegments.length > 0 ? (
            breadcrumbSegments.map((segment) => (
              <React.Fragment key={segment.href}>
                <BreadcrumbItem>
                  {segment.isLast ? (
                    <BreadcrumbPage>{segment.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={segment.href}>{segment.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!segment.isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            ))
          ) : (
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="ml-auto"></div> 
    </header>
  );
}