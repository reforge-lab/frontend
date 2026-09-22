import Link from 'next/link';
import { Logo } from '@/components/logo';

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
        <Link href="/docs" className="flex items-center gap-1 text-xs font-medium">
          <span>Open Docs</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
