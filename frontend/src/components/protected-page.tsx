"use client";

import { getSession } from "@/lib/auth";
import type { User } from "@/lib/definitions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardHeader from "./dashboard-header";
import { Skeleton } from "./ui/skeleton";

function LoadingScreen() {
    return (
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-background/80 backdrop-blur-xl">
            <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
          </header>
          <main className="flex-1 p-4 md:p-8 lg:p-10">
            <div className="space-y-4">
                <Skeleton className="h-10 w-1/4" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-40 w-full" />
            </div>
          </main>
        </div>
      );
}


export default function ProtectedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.replace("/login");
    } else {
      setUser(session);
      setLoading(false);
    }
  }, [router]);

  if (loading || !user) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <DashboardHeader user={user} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
