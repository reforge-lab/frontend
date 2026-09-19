import Link from "next/link";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GitFork } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-3 sm:top-4 z-50 w-full flex justify-center pointer-events-none">
      <div className="pointer-events-auto w-full max-w-280 flex h-12 items-center justify-between px-4 rounded-xl backdrop-blur-xl transition-all bg-linear-to-b from-secondary/90 to-secondary border border-border/60">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-semibold text-sm tracking-tight text-foreground hover:opacity-90 transition-opacity"
          >
            <Logo className="size-6 rounded-md shadow-xs" size={24} />
            <span className="font-semibold">Reforge</span>
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <a
            href={siteConfig.links.githubOrg}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "h-8 px-2.5 text-xs text-muted-foreground hover:text-foreground gap-1.5 rounded-full",
            )}
          >
            <GitFork className="size-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          <Link
            href="/docs"
            className={cn(
              "text-xs font-medium gap-1 flex items-center underline underline-offset-4",
            )}
          >
            <span>Open Docs</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
