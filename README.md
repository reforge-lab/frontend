# Reforge Frontend

> High-performance documentation and web platform for Reforge, built with Next.js, Fumadocs, and Tailwind CSS.

[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black.svg)](https://nextjs.org/)
[![Fumadocs](https://img.shields.io/badge/Fumadocs-16.14-purple.svg)](https://fumadocs.dev)

---

## What is this?

Reforge Frontend provides structured, searchable, and interactive documentation for Reforge. In addition to delivering a modern web experience for human readers, it natively supports AI agents and LLMs through structured index feeds (`/llms.txt`, `/llms-full.txt`) and automatic Markdown content negotiation.

## Features

- **Interactive Documentation**: MDX-powered documentation with automatic TOC, copy buttons, and customizable components.
- **Full-Text Instant Search**: In-memory server-side search index powered by Fumadocs Core.
- **AI / LLM Ready**: Content negotiation (`Accept: text/markdown`) and dedicated `/llms.txt` / `/llms-full.txt` endpoints for AI assistant integration.
- **Dynamic OpenGraph Previews**: Automatic social preview image generation per documentation page.
- **Tailwind CSS v4**: Fast, modern styling using Tailwind CSS v4 and Lucide React icons.

## Quick Start

### Prerequisites

- Node.js >= 20.x
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone <!-- TODO: fill in repository URL -->
cd frontend

# Install dependencies
npm install
```

### Run

```bash
# Start development server
npm run dev

# Run type check and Next type generation
npm run types:check

# Run linter
npm run lint

# Build for production
npm run build

# Start production server
npm run start
```

The application runs at `http://localhost:3000`.

---

## Project Structure

```
src/
  app/
    (home)/              - Landing page route group
    docs/                - Documentation layout and dynamic slug viewer
    api/search/          - Fumadocs search route handler
    og/docs/             - OpenGraph image generator
    llms.txt/            - LLM index endpoint
    llms-full.txt/       - LLM full text dump endpoint
  components/            - MDX and shared UI components
  lib/                   - Fumadocs loader, config, and utilities
content/
  docs/                  - MDX documentation source files
proxy.ts                 - Markdown content negotiation proxy
docs/
  adr/                   - Architecture Decision Records
  concepts/              - Conceptual deep-dives and architecture guides
  runbooks/              - Incident response and troubleshooting playbooks
```

---

## Documentation & Architecture

- [System Architecture](ARCHITECTURE.md)
- [AI Assistant Context Primer](CONTEXT.md)
- [Architecture Decision Records (ADRs)](docs/adr/)
- [Runbooks & Troubleshooting](docs/runbooks/)
- [Concepts & Deep-Dives](docs/concepts/)

---

## License

<!-- TODO: fill in license info -->
