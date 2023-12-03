"use client";

import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "@/components/screens/Home";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex min-h-screen flex-col justify-start items-center p-4 bg-zinc-800">
        <Home />
      </main>
    </QueryClientProvider>
  );
}
