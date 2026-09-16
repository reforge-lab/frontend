import Link from "next/link";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GitFork, ArrowUpRight } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-transparent backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex h-14 items-center justify-between px-6">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-semibold text-sm tracking-tight text-foreground hover:opacity-90 transition-opacity"
          >
            <Logo className="size-6 rounded-md shadow-xs" size={24} />
            <span>Reforge</span>
          </Link>

        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          <a
            href={siteConfig.links.githubOrg}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "h-8 px-2.5 text-xs text-muted-foreground hover:text-foreground gap-1.5",
            )}
          >
            <GitFork className="size-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          <Link
            href="/docs"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "h-8 px-3 text-xs font-medium gap-1",
            )}
          >
            <span>Open Docs</span>
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
