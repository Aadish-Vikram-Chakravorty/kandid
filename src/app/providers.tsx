"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// This is a placeholder for the real Better Auth SessionProvider
// For now, it just renders its children.
function SessionProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  // Create a single instance of QueryClient
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}