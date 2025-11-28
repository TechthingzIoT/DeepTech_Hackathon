import type { ReactNode } from "react";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { Logo } from "@/components/logo";
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen">
        <Sidebar className="border-r">
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center border-b px-4 lg:px-6">
              <Link href="/dashboard">
                <Logo />
              </Link>
            </div>
            <div className="flex-1">
              <MainNav />
            </div>
          </div>
        </Sidebar>
        <SidebarInset>
          <div className="flex flex-col">
            <header className="flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
              <Button variant="ghost" size="icon" className="md:hidden" asChild>
                <SidebarTrigger>
                  <PanelLeft />
                </SidebarTrigger>
              </Button>
              <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <div className="ml-auto flex-1 sm:flex-initial">
                  {/* Can add a search bar here later */}
                </div>
                <UserNav />
              </div>
            </header>
            <main className="flex-1 p-4 md:p-6 lg:p-8">
              {children}
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
