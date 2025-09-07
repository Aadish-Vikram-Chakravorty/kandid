"use client";

import React from 'react';
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useLeadSheet } from '@/stores/use-lead-sheet';
import { LeadDetailSheet } from './lead-detail-sheet';

type Lead = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  campaignName: string;
  status: 'Pending' | 'Contacted' | 'Responded' | 'Converted';
  lastContactedAt: string;
};

const fetchLeads = async ({ pageParam = 1 }) => {
  const res = await fetch(`/api/leads?page=${pageParam}&limit=15`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

export function LeadsTable() {
  const { onOpen } = useLeadSheet();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['leads'],
    queryFn: fetchLeads,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === 'pending') {
    return (
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lead</TableHead>
              <TableHead>Campaign</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Contact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-10 w-48" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (status === 'error') {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <LeadDetailSheet />
      <div className="flex-1 rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-y-auto h-[calc(100vh-200px)]">
          <Table>
            <TableHeader className="sticky top-0 bg-background">
              <TableRow>
                <TableHead>Lead Name/Contact</TableHead>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Contact Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.pages.map((page, i) => (
                <React.Fragment key={i}>
                  {page.leads.map((lead: Lead) => (
                    <TableRow
                      key={lead.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => onOpen(lead.id)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={lead.avatar} />
                            <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{lead.name}</p>
                            <p className="text-sm text-muted-foreground">{lead.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{lead.campaignName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{lead.status}</Badge>
                      </TableCell>
                      <TableCell>{new Date(lead.lastContactedAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
              <TableRow ref={ref} style={{ height: "1px" }} />
            </TableBody>
          </Table>
          {isFetchingNextPage && (
            <div className="flex justify-center p-4">
              <p>Loading more...</p>
            </div>
          )}
          {!hasNextPage && (
            <div className="flex justify-center p-4">
              <p className="text-sm text-muted-foreground">You've reached the end.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}