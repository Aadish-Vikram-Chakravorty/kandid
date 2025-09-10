"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';

// Define the shape of our data
type Campaign = {
  id: number;
  name: string;
  status: 'Active' | 'Inactive';
};

type Lead = {
  id: number;
  name: string;
  avatar: string;
  campaignName: string;
  status: string;
};

type LeadsData = {
  leads: Lead[];
};

// --- ADDING THESE FUNCTIONS BACK ---
const fetchCampaigns = async (): Promise<Campaign[]> => (await fetch('/api/campaigns')).json();
const fetchLeads = async (): Promise<LeadsData> => (await fetch('/api/leads')).json();

const linkedInAccounts = [
  { name: 'Pulkit Garg', email: '199Pulkitgarg@gmail.com', status: 'Connected', progress: 85, requests: '17/30' },
  { name: 'Jivesh Lakhani', email: 'jiveshlakhani@gmail.com', status: 'Connected', progress: 90, requests: '18/30' },
  { name: 'Indrajit Sahani', email: 'indrajit.sahani@gmail.com', status: 'Connected', progress: 50, requests: '18/30' },
  { name: 'Bhavya Arora', email: 'bhavya.arora@kandid.ai', status: 'Connected', progress: 90, requests: '18/100' },
];
// ------------------------------------

export default function DashboardPage() {
  const { data: campaigns } = useQuery<Campaign[]>({ queryKey: ['campaigns'], queryFn: fetchCampaigns });
  const { data: leadsData } = useQuery<LeadsData>({ queryKey: ['leads-dashboard'], queryFn: fetchLeads });

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="lg:col-span-2 grid auto-rows-min gap-6">
        <Card className="bg-card shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Campaigns</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm flex items-center gap-1">
                All Campaigns <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Campaigns</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {campaigns?.slice(0, 6).map((campaign: Campaign) => (
                <li key={campaign.id} className="flex items-center justify-between">
                  <span className="font-semibold">{campaign.name}</span>
                  <Badge variant={campaign.status === 'Active' ? 'success' : 'destructive'}>{campaign.status}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">LinkedIn Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {linkedInAccounts.map((account) => (
                <li key={account.email} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{account.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{account.name}</p>
                    <p className="text-xs text-muted-foreground">{account.email}</p>
                  </div>
                  <Badge variant="connected">{account.status}</Badge>
                  <div className="w-1/5">
                     <Progress value={account.progress} className="h-1.5" />
                  </div>
                  <span className="text-sm text-muted-foreground">{account.requests}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
           <DropdownMenu>
              <DropdownMenuTrigger className="text-sm flex items-center gap-1">
                Most Recent <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Most Recent</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {leadsData?.leads.slice(0, 8).map((lead: Lead) => (
              <li key={lead.id} className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={lead.avatar} />
                  <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">{lead.name}</p>
                  <p className="text-xs text-muted-foreground">{lead.campaignName}</p>
                </div>
                <Badge variant={lead.status === 'Pending' ? 'pending' : 'outline'}>{lead.status}</Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}