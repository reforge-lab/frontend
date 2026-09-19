import Link from 'next/link';
import { Logo } from '@/components/logo';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { GitFork } from 'lucide-react';

export function Header() {
  return (
    <header className="pointer-events-none sticky top-3 z-50 flex w-full justify-center px-4 sm:top-4">
      <div className="pointer-events-auto flex h-12 w-full max-w-280 items-center justify-between">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-foreground transition-opacity hover:opacity-90"
          >
            <Logo className="size-6 rounded-md shadow-xs" size={24} />
            <span className="font-semibold">Reforge</span>
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 rounded-xl bg-secondary/60 px-3 py-2 backdrop-blur-md">
          <a
            href={siteConfig.links.githubOrg}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              'h-8 gap-1.5 rounded-full px-2.5 text-xs text-muted-foreground hover:text-foreground',
            )}
          >
            <GitFork className="size-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          <Link
            href="/docs"
            className={cn(
              'flex items-center gap-1 text-xs font-medium underline underline-offset-4',
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
