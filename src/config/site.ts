export const siteConfig = {
  name: 'Reforge',
  title: 'Reforge — MEV-Aware DeFi Liquidation Protocol',
  description:
    'A MEV-aware batch auction mechanism for DeFi liquidations: reducing gas competition, borrower collateral loss, and market price impact.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  links: {
    githubOrg: 'https://github.com/reforge-lab',
    githubRepo: 'https://github.com/reforge-lab/frontend',
    docs: '/docs',
  },
  git: {
    org: 'reforge-lab',
    repo: 'frontend',
    branch: 'main',
  },
  routes: {
    docs: '/docs',
    docsImage: '/og/docs',
    docsContent: '/llms.mdx/docs',
  },
} as const;

export type SiteConfig = typeof siteConfig;
