import { siteConfig } from '@/config/site';

export const appName = siteConfig.name;
export const docsRoute = siteConfig.routes.docs;
export const docsImageRoute = siteConfig.routes.docsImage;
export const docsContentRoute = siteConfig.routes.docsContent;

export const gitConfig = {
  user: siteConfig.git.org,
  repo: siteConfig.git.repo,
  branch: siteConfig.git.branch,
};

export { siteConfig };
