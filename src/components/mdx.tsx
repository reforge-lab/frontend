import React from 'react';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { Callout } from 'fumadocs-ui/components/callout';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { File, Files, Folder } from 'fumadocs-ui/components/files';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import { Mermaid } from './mermaid';
import {
  BookOpen,
  Compass,
  Layers,
  ScrollText,
  FlaskConical,
  FolderArchive,
  Wrench,
  FileText,
  Presentation,
  Coins,
  AlertTriangle,
  Lightbulb,
  Library,
  Scale,
  Zap,
  Boxes,
  ShieldCheck,
  Binary,
  Server,
  LayoutDashboard,
  FileCode,
  Download,
  ExternalLink,
  Code2,
  TrendingUp,
  Bot,
  Activity,
  ShoppingBag,
  Terminal,
  Sliders,
  Workflow,
  BarChart3,
  Laptop,
  Rocket,
  Play,
  GitPullRequest,
  CheckCircle2,
  ShieldAlert,
  Flame,
} from 'lucide-react';

const DefaultPre = defaultMdxComponents.pre;

function MDXPre(props: React.ComponentProps<'pre'> & { [key: string]: any }) {
  const className = props.className || '';
  const dataLanguage = props['data-language'] || '';
  const child = React.Children.toArray(props.children)[0];
  const childProps = React.isValidElement(child) ? (child.props as any) : null;
  const childClassName = childProps?.className || '';
  const childLang = childProps?.['data-language'] || '';

  const isMermaid =
    dataLanguage === 'mermaid' ||
    className.includes('language-mermaid') ||
    className.includes('mermaid') ||
    childLang === 'mermaid' ||
    childClassName.includes('language-mermaid') ||
    childClassName.includes('mermaid');

  if (isMermaid) {
    return <Mermaid>{props.children}</Mermaid>;
  }

  if (DefaultPre) {
    return <DefaultPre {...props} />;
  }

  return <pre {...props} />;
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    pre: MDXPre,
    Mermaid,
    Step,
    Steps,
    Tab,
    Tabs,
    Callout,
    Card,
    Cards,
    Accordion,
    Accordions,
    File,
    Files,
    Folder,
    InlineTOC,
    // Lucide Icons available in MDX
    BookOpen,
    Compass,
    Layers,
    ScrollText,
    FlaskConical,
    FolderArchive,
    Wrench,
    FileText,
    Presentation,
    Coins,
    AlertTriangle,
    Lightbulb,
    Library,
    Scale,
    Zap,
    Boxes,
    ShieldCheck,
    Binary,
    Server,
    LayoutDashboard,
    FileCode,
    Download,
    ExternalLink,
    Code2,
    TrendingUp,
    Bot,
    Activity,
    ShoppingBag,
    Terminal,
    Sliders,
    Workflow,
    BarChart3,
    Laptop,
    Rocket,
    Play,
    GitPullRequest,
    CheckCircle2,
    ShieldAlert,
    Flame,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
export { Mermaid };
