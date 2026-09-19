import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Geist, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.title,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={cn(
        geistSans.variable,
        jetbrainsMono.variable,
        instrumentSerif.variable,
        'font-sans antialiased',
      )}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
