# Architecture — Reforge Frontend

> **Last updated:** 2026-09-16
> **Authors:** <!-- TODO: fill in author names -->
> **Status:** Current

## Overview

The Reforge Frontend application is a modern documentation and web platform built with Next.js 16 (App Router), React 19, Fumadocs, and Tailwind CSS v4. It delivers high-performance structured documentation, instant search, dynamic OpenGraph social preview images, and agent-accessible LLM markdown text feeds (`llms.txt`, `llms-full.txt`, and HTTP content negotiation proxies) for the Reforge ecosystem.

---

## Level 1 — System Context

The frontend serves human visitors via a responsive web UI and AI coding assistants via structured text endpoints and content negotiation.

```mermaid
C4Context
Person(user, "Human Visitor / Developer", "Browses documentation, searches guides, views source")
Person(agent, "AI Agent / LLM Client", "Consumes llms.txt, llms-full.txt, or raw markdown via Content Negotiation")
System(reforge_frontend, "Reforge Frontend", "Next.js + Fumadocs app serving interactive docs, search, and LLM endpoints")
System_Ext(github, "GitHub Repository", "Houses open-source repository, issues, and edit links")

Rel(user, reforge_frontend, "Browses docs & searches", "HTTPS")
Rel(agent, reforge_frontend, "Fetches documentation & LLM feeds", "HTTPS (Vary: Accept)")
Rel(reforge_frontend, github, "Links to source & edit pages", "HTTPS")
```

**External dependencies:**

| System | Purpose | Owner | SLA |
| --- | --- | --- | --- |
| GitHub | Repository hosting, issue tracking, and document edit links | GitHub | 99.9% |
| npm Registry | Package distribution and dependencies | npm | 99.9% |

---

## Level 2 — Containers

The frontend is a deployable Next.js container containing static assets, server components, route handlers, and MDX content processing logic.

```mermaid
C4Container
Person(user, "User / Browser")
Person(agent, "AI Agent")
Container(next_app, "Next.js App Router Application", "Next.js 16, React 19, Fumadocs", "Renders documentation UI, provides static generation and server-side route handlers")
Container(content_source, "Fumadocs Content Loader", "fumadocs-mdx / TypeScript", "Parses MDX files, extracts frontmatter, builds table of contents, and processes raw text")
ContainerDb(mdx_files, "MDX Content Files", "Filesystem (/content/docs)", "Local Markdown/MDX documents and metadata")

Rel(user, next_app, "HTTP GET /docs, /api/search", "HTTPS")
Rel(agent, next_app, "HTTP GET /llms.txt, /llms-full.txt, Accept: text/markdown", "HTTPS")
Rel(next_app, content_source, "Queries pages, params, TOC, & search index", "In-process TypeScript API")
Rel(content_source, mdx_files, "Reads MDX and meta schemas", "Filesystem / Macro")
```

**Container inventory:**

| Container | Technology | Responsibility | Scales |
| --- | --- | --- | --- |
| Next.js Frontend | Next.js 16, React 19, Fumadocs UI, Tailwind CSS v4 | UI rendering, client navigation, search dialogs, OpenGraph generation | Horizontally (Serverless / Edge / Node.js) |
| Fumadocs Source Core | `fumadocs-core`, `fumadocs-mdx` | MDX parsing, type generation, search indexing, page tree generation | In-process build/runtime |
| Content Store | MDX Files (`content/docs/`) | Version-controlled technical documentation source | Static filesystem |

---

## Level 3 — Components

Component architecture within the Next.js application:

```mermaid
graph TD
  Proxy[proxy.ts - Path Rewrite & Negotiation] --> HomeRoute["app/(home)/page.tsx - Landing Page"]
  Proxy --> DocsRoute["app/docs/[[...slug]]/page.tsx - Doc Viewer"]
  Proxy --> SearchAPI["app/api/search/route.ts - Search API"]
  Proxy --> LLMSRoute["app/llms.txt & llms-full.txt - Agent Text Feeds"]
  Proxy --> OGRoute["app/og/docs/[...slug] - Dynamic OG Images"]
  
  DocsRoute --> SourceAdapter["lib/source.ts - Source Loader"]
  SearchAPI --> SourceAdapter
  LLMSRoute --> SourceAdapter
  OGRoute --> SourceAdapter

  DocsRoute --> CustomMDX["components/mdx.tsx - Custom Components"]
  DocsRoute --> SharedLayout["lib/layout.shared.tsx - Nav & Header Config"]
  SourceAdapter --> MDXStorage["content/docs/*.mdx"]
```

---

## Key Architectural Decisions

- **Fumadocs with MDX Macro**: Provides type-safe content collections, automatic search indexing, and high-performance server components without requiring a separate headless CMS.
- **LLM and AI Agent-First Endpoints**: Native support for `/llms.txt`, `/llms-full.txt`, and HTTP content negotiation (`Accept: text/markdown` via `proxy.ts`) to enable AI assistants to consume documentation cleanly.
- **Tailwind CSS v4 & Lucide Icons**: Modern styling infrastructure using the latest Tailwind CSS v4 PostCSS integration and Lucide React icons.

---

## Data Flow — Key Scenarios

### 1. Document Page Request & Rendering

`Browser → GET /docs/[...slug] → proxy.ts (pass-through) → app/docs/[[...slug]]/page.tsx → source.getPage(slug) → MDX Component Render → HTML + Client Hydration`

### 2. AI Content Negotiation Flow

`Agent → GET /docs/[...slug] (Accept: text/markdown) → proxy.ts (rewrites to /llms.mdx/docs/[...slug]/content.md) → app/llms.mdx/docs/[[...slug]]/route.ts → raw Markdown response`

### 3. Client Search Query Flow

`User types in Search Dialog → GET /api/search?query=... → app/api/search/route.ts (createFromSource) → Fumadocs in-memory search index → JSON search results returned`

---

## Infrastructure

| Environment | Platform | Region | Notes |
| --- | --- | --- | --- |
| Production | <!-- TODO: fill in e.g. Vercel / Cloudflare / Node.js --> | <!-- TODO: fill in --> | Serverless / Static output |
| Staging | <!-- TODO: fill in --> | <!-- TODO: fill in --> | Preview deployments |
| Local dev | Node.js (Next dev server) | Localhost (Port 3000) | Hot-reloading enabled |

---

## Non-Functional Characteristics

| Property | Target | Current |
| --- | --- | --- |
| First Contentful Paint (FCP) | < 1.0s | ~0.6s (local static) |
| Search API Latency | < 100ms | < 50ms (in-memory) |
| Markdown Negotiation Support | 100% route coverage | Supported on all `/docs` routes |

---

## Related Documents

- [ADR Index](docs/adr/)
- [Runbooks](docs/runbooks/)
- [Concepts](docs/concepts/)
- [AI Assistant Context](CONTEXT.md)
