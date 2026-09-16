import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center text-center flex-1 px-4 py-16 max-w-4xl mx-auto">
      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-primary/10 text-primary mb-6 border border-primary/20">
        Research &amp; Mechanism Protocol
      </span>
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
        {siteConfig.name}
      </h1>
      <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
        {siteConfig.description}
      </p>
      <div className="flex flex-row gap-4 items-center justify-center">
        <Link
          href={siteConfig.routes.docs}
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          Explore Documentation
        </Link>
        <a
          href={siteConfig.links.githubOrg}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          GitHub (reforge-lab)
        </a>
      </div>
    </div>
  );
}
