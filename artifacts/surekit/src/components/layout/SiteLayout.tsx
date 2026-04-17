import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

type SiteLayoutProps = {
  children: ReactNode;
  mainClassName?: string;
};

export function SiteLayout({ children, mainClassName }: SiteLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className={cn(mainClassName)}>{children}</main>
      <Footer />
    </div>
  );
}
