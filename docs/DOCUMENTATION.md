# Reforge Documentation Guide

> **Last updated:** 2026-09-16

This document explains how the Reforge documentation is structured and how the team should use it.

---

## Fumadocs Content Architecture

Everything under `content/docs/` is rendered on the Fumadocs site at `localhost:3000/docs`.

```
content/docs/
├── index.mdx                              # Docs landing — "Welcome to Reforge"
├── meta.json                              # Top-level sidebar ordering
│
├── getting-started/                       # 📚 Foundation & Problem Space
│   ├── meta.json
│   ├── index.mdx                          # Overview / reading order
│   ├── defi-fundamentals.mdx              # ETH, USDC, Lending, Liquidation, Gas
│   ├── problem-statement.mdx              # Health Factor, MEV, Priority Gas Auctions
│   ├── literature-review.mdx              # 12 key studies (Flash Boys 2.0, etc.)
│   └── our-solution.mdx                   # MEV-Aware Batch Auction, Net Economic Value
│
├── architecture/                          # 🏗️ System Design
│   ├── meta.json
│   ├── index.mdx                          # System overview & interaction diagram
│   ├── tech-stack.mdx                     # Full tech stack across all layers
│   ├── smart-contracts.mdx                # Contract architecture & interfaces
│   ├── backend.mdx                        # Backend services & data pipeline
│   └── frontend.mdx                       # Frontend views & dashboards
│
├── specs/                                 # 📋 Living Specifications (write BEFORE code)
│   ├── meta.json
│   ├── index.mdx                          # Spec index + how to write a spec
│   ├── contracts/                         # Smart contract specs
│   │   ├── lending-pool.mdx
│   │   ├── liquidation-auction.mdx
│   │   ├── liquidation-manager.mdx
│   │   ├── price-oracle.mdx
│   │   ├── mock-dex.mdx
│   │   └── health-factor-lib.mdx
│   ├── backend/                           # Backend service specs
│   │   ├── block-listener.mdx
│   │   ├── opportunity-engine.mdx
│   │   ├── auction-engine.mdx
│   │   ├── scoring-function.mdx
│   │   └── simulation-engine.mdx
│   └── frontend/                          # Frontend view specs
│       ├── protocol-dashboard.mdx
│       ├── liquidation-marketplace.mdx
│       ├── liquidator-console.mdx
│       └── research-laboratory.mdx
│
├── research/                              # 🔬 Academic & Experiment Docs
│   ├── meta.json
│   ├── index.mdx                          # Research overview & hypothesis
│   ├── methodology.mdx                    # Experimental methodology
│   ├── experiment-design.mdx              # Scenario configs, parameter ranges
│   └── results.mdx                        # Findings (populated as experiments run)
│
└── guides/                                # 🛠️ Developer How-Tos
    ├── meta.json
    ├── local-development.mdx              # Full local setup
    ├── deploying-contracts.mdx            # Foundry deploy to Sepolia
    ├── running-simulations.mdx            # Python simulation setup
    └── contributing.mdx                   # Team workflow, PR conventions
```

---

## What Goes Where — Decision Boundary

| Content | Location | Why |
| --- | --- | --- |
| Specs (contract interfaces, service behaviors, UI flows) | `content/docs/specs/` | Read before coding. Living docs. Rendered on site for the whole team. |
| Architecture (system diagrams, component interactions) | `content/docs/architecture/` | Orientation material. Rendered on site. |
| Research (methodology, experiments, results) | `content/docs/research/` | Academic layer. Rendered on site. |
| ADRs ("Why did we pick Fastify over Express?") | `docs/adr/` | Immutable decision history. Code-adjacent. Not on site. |
| Portable concepts ("How batch auctions work mathematically") | `docs/concepts/` | Reusable knowledge. Not project-specific. Not on site. |
| Runbooks ("Build is broken, what do I do?") | `docs/runbooks/` | Emergency procedures. Code-adjacent. Not on site. |
| Root `ARCHITECTURE.md` | Repo root | C4 overview for AI assistants. Quick orientation. |
| Root `CONTEXT.md` | Repo root | AI coding assistant primer. Dense glossary + patterns. |

---

## Spec-Driven Development Workflow

The team follows this cycle for every feature:

```
1. WRITE THE SPEC
   → content/docs/specs/<area>/<feature>.mdx
   → Define: interface, state, invariants,
     edge cases, acceptance criteria

2. REVIEW THE SPEC
   → Team reads on the Fumadocs site
   → Comments / iterates until locked

3. IMPLEMENT
   → Code in the relevant repo
     (contracts, backend, frontend, simulation)

4. UPDATE THE SPEC
   → If implementation reveals spec gaps,
     update the spec. Specs are living docs.

5. RECORD DECISIONS
   → If a non-obvious trade-off was made,
     write an ADR in docs/adr/
```

### Spec Page Template

Each spec page follows a consistent structure:

- **Purpose** — What this component does (1–2 sentences)
- **Interface** — Public API / function signatures / event schemas
- **State & Data Model** — What data it holds, how it changes
- **Behavior** — Step-by-step logic, state transitions, sequence diagrams
- **Invariants** — Things that must always be true
- **Edge Cases** — Known failure modes and how they're handled
- **Acceptance Criteria** — How to verify the implementation matches the spec
- **Status** — `Draft` / `In Review` / `Approved` / `Implemented` / `Outdated`

### Status Lifecycle

```
Draft → In Review → Approved → Implemented
                                    ↓
                                Outdated (if spec no longer reflects code)
                                    ↓
                                Updated (edit spec, re-enter cycle)
```

### When to Write an ADR (vs. Updating the Spec)

Only write an ADR when **all three** are true:

1. **Hard to reverse** — changing direction later has meaningful cost
2. **Surprising without context** — a future reader would wonder "why this?"
3. **A real trade-off** — there were genuine alternatives and one was chosen

If any is missing, update the spec or `CONTEXT.md` directly.
