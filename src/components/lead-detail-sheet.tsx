"use client";

import React from 'react';
import { useLeadSheet } from "@/stores/use-lead-sheet";
import { useQuery } from "@tanstack/react-query";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, Link, CheckCircle } from "lucide-react";

type Lead = {
  id: number;
  name: string;
  email: string;
  company: string;
  status: 'Pending' | 'Contacted' | 'Responded' | 'Converted';
  avatar: string;
};

const fetchLeadDetails = async (leadId: number): Promise<Lead> => {
  const res = await fetch(`/api/leads/${leadId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch lead details");
  }
  return res.json();
};

export function LeadDetailSheet() {
  const { isOpen, leadId, onClose } = useLeadSheet();

  const { data: lead, isLoading, isError } = useQuery<Lead>({
    queryKey: ["lead", leadId],
    queryFn: () => fetchLeadDetails(leadId!),
    enabled: !!leadId,
  });

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md p-0">
        <SheetHeader className="p-6">
          <SheetTitle className="sr-only">Lead Profile</SheetTitle>
          <SheetDescription className="sr-only">
            Detailed information for the selected lead.
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="space-y-4 px-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <Separator/>
            <Skeleton className="h-4 w-1/2 mt-6" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : isError || !lead ? (
          <div className="p-6">Failed to load lead details.</div>
        ) : (
          <div className="px-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-16 w-16">
                <AvatarImage src={lead.avatar} />
                <AvatarFallback>{lead.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-semibold">{lead.name}</h2>
                <p className="text-muted-foreground">{lead.company}</p>
                <Badge variant="outline" className="mt-2">{lead.status}</Badge>
              </div>
            </div>
            <Separator />
            <div className="mt-6">
              <h3 className="font-semibold mb-4">Interaction History</h3>
               <div className="relative pl-6">
                <div className="absolute left-3 top-0 h-full w-0.5 bg-border"></div>
                <div className="relative flex items-center gap-4 mb-6">
                  <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Invitation Request</p>
                    <p className="text-sm text-muted-foreground truncate">
                      "Hi {lead.name}, I'm building consultative AI..."
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center gap-4 mb-6">
                  <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                    <Link className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">Connection Status</p>
                    <p className="text-sm text-muted-foreground">Check connection status</p>
                  </div>
                </div>
                <div className="relative flex items-center gap-4">
                  <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold">Replied</p>
                    <p className="text-sm text-primary underline cursor-pointer">View Reply</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}