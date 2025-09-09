"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Fetchers for our cards
const fetchCampaigns = async () => (await fetch('/api/campaigns')).json();
const fetchLeads = async () => (await fetch('/api/leads')).json();

// Placeholder data for LinkedIn Accounts
const linkedInAccounts = [
  { name: 'Pulkit Garg', email: '199Pulkitgarg@gmail.com', status: 'Connected', progress: 85 },
  { name: 'Jivesh Lakhani', email: 'jiveshlakhani@gmail.com', status: 'Connected', progress: 90 },
  { name: 'Indrajit Sahani', email: 'indrajit.sahani@gmail.com', status: 'Connected', progress: 50 },
  { name: 'Bhavya Arora', email: 'bhavya.arora@kandid.ai', status: 'Connected', progress: 90 },
];

export default function DashboardPage() {
  const { data: campaigns } = useQuery({ queryKey: ['campaigns'], queryFn: fetchCampaigns });
  const { data: leadsData } = useQuery({ queryKey: ['leads-dashboard'], queryFn: fetchLeads });

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="lg:col-span-2 grid gap-6">
        {/* Campaigns Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Campaigns</CardTitle>
            <Button asChild variant="outline" size="sm">
              <Link href="/campaigns">All Campaigns</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {campaigns?.slice(0, 5).map((campaign: any) => (
                <li key={campaign.id} className="flex items-center justify-between">
                  <span className="font-medium">{campaign.name}</span>
                  <Badge variant={campaign.status === 'Active' ? 'default' : 'destructive'}>{campaign.status}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* LinkedIn Accounts Card */}
        <Card>
          <CardHeader>
            <CardTitle>LinkedIn Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {linkedInAccounts.map((account) => (
                <li key={account.email} className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{account.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{account.name}</p>
                    <p className="text-sm text-muted-foreground">{account.email}</p>
                  </div>
                  <div className="w-1/4">
                     <Progress value={account.progress} className="h-2"/>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          <Button asChild variant="outline" size="sm">
            <Link href="/leads">Most Recent</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {leadsData?.leads.slice(0, 6).map((lead: any) => (
              <li key={lead.id} className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={lead.avatar} />
                  <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{lead.name}</p>
                  <p className="text-sm text-muted-foreground">{lead.campaignName}</p>
                </div>
                <Badge variant="outline">{lead.status}</Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}