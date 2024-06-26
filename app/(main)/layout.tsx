"use client";

import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import { Navigation } from "./_components/navigation";
import { SearchCommand } from "@/components/search-command";

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center h-full">
          <Spinner size="lg" />
        </div>
      )}
      {!isLoading && !isAuthenticated && redirect("/")}
      {!isLoading && isAuthenticated && (
        <div className="flex h-full dark:bg-[#1F1F1F]">
          <Navigation />
          <main className="flex-1 h-full overflow-y-auto">
            <SearchCommand />
            {children}
          </main>
        </div>
      )}
    </>
  );
}

export default MainLayout;
