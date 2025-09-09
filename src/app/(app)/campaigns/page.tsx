"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Define the shape of campaign data
type Campaign = {
  id: number;
  name: string;
  status: 'Active' | 'Inactive';
  totalLeads: number;
  successfulLeads: number;
  responseRate: number;
  createdAt: string;
};

// Function to fetch campaigns from our API
const fetchCampaigns = async (): Promise<Campaign[]> => {
  const res = await fetch('/api/campaigns');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

export default function CampaignsPage() {
  const { data: campaigns, isLoading, isError } = useQuery({
    queryKey: ['campaigns'],
    queryFn: fetchCampaigns,
  });

  const renderTableContent = () => {
    if (isLoading) {
      return Array.from({ length: 5 }).map((_, i) => (
        <TableRow key={i}>
          <TableCell><Skeleton className="h-4 w-48" /></TableCell>
          <TableCell><Skeleton className="h-6 w-16" /></TableCell>
          <TableCell><Skeleton className="h-4 w-12" /></TableCell>
          <TableCell className="w-[200px]"><Skeleton className="h-2 w-full" /></TableCell>
          <TableCell><Skeleton className="h-8 w-8" /></TableCell>
        </TableRow>
      ));
    }

    if (isError) {
      return <TableRow><TableCell colSpan={5}>Failed to load campaigns.</TableCell></TableRow>;
    }

    return campaigns?.map((campaign) => (
      <TableRow key={campaign.id}>
        <TableCell className="font-medium">{campaign.name}</TableCell>
        <TableCell>
          <Badge variant={campaign.status === 'Active' ? 'default' : 'destructive'}>
            {campaign.status}
          </Badge>
        </TableCell>
        <TableCell>{campaign.totalLeads}</TableCell>
        <TableCell className="w-[200px]">
          <div className="flex items-center gap-2">
            <Progress value={campaign.responseRate} className="h-2" />
            <span className="text-xs text-muted-foreground">{campaign.responseRate.toFixed(1)}%</span>
          </div>
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Pause</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between pb-4">
        <h1 className="text-2xl font-bold">Campaigns</h1>
        <Button>Create Campaign</Button>
      </header>

      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Campaigns</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          <Input placeholder="Search campaigns..." className="w-64" />
        </div>
        <TabsContent value="all" className="mt-4">
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total Leads</TableHead>
                  <TableHead>Response Rate</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {renderTableContent()}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}