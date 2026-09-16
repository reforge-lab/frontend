import os
import json

base_dir = "e:/dev/reforge/frontend/content/docs/"

spec_template = """---
title: {title}
description: {description}
---

{description}.

## Purpose
TODO

## Interface
> Define public API / function signatures / event schemas here
TODO

## State & Data Model
TODO

## Behavior
> Step-by-step logic, state transitions, sequence diagrams
TODO

## Invariants
> Things that must always be true
TODO

## Edge Cases
TODO

## Acceptance Criteria
TODO

## Status
Draft
"""

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

# Specs meta and index
write_file(f"{base_dir}specs/meta.json", json.dumps({
  "title": "Specifications",
  "pages": ["index", "contracts", "backend", "frontend"]
}, indent=2))

write_file(f"{base_dir}specs/index.mdx", """---
title: Specifications
description: Living technical specifications for every Reforge component — write the spec before writing the code
---

Explain the spec-driven workflow (spec → review → implement → update → record decisions). 

<Cards>
  <Card title="Contracts" href="/docs/specs/contracts" />
  <Card title="Backend" href="/docs/specs/backend" />
  <Card title="Frontend" href="/docs/specs/frontend" />
</Cards>
""")

# Contracts specs
write_file(f"{base_dir}specs/contracts/meta.json", json.dumps({
  "title": "Contract Specs",
  "pages": ["lending-pool", "liquidation-auction", "liquidation-manager", "price-oracle", "mock-dex", "health-factor-lib"]
}, indent=2))

contracts_specs = {
    "lending-pool": ("LendingPool", "Core lending protocol — deposit, withdraw, borrow, repay, and position accounting"),
    "liquidation-auction": ("LiquidationAuction", "MEV-aware batch auction mechanism — openAuction, submitBid, closeAuction, selectWinner, settleLiquidation"),
    "liquidation-manager": ("LiquidationManager", "Position eligibility evaluation, debt ceilings, collateral transfer calculations, and incentive bonuses"),
    "price-oracle": ("PriceOracle", "Dual-mode price oracle supporting realistic feeds and programmatic price drops for simulations"),
    "mock-dex": ("MockDEX", "AMM liquidity pool simulation with configurable slippage and price impact modeling"),
    "health-factor-lib": ("HealthFactor Library", "Shared mathematical library for health factor calculations: HF = (Collateral × Threshold) / Debt")
}
for slug, (title, desc) in contracts_specs.items():
    write_file(f"{base_dir}specs/contracts/{slug}.mdx", spec_template.format(title=title, description=desc))

# Backend specs
write_file(f"{base_dir}specs/backend/meta.json", json.dumps({
  "title": "Backend Specs",
  "pages": ["block-listener", "opportunity-engine", "auction-engine", "scoring-function", "simulation-engine"]
}, indent=2))

backend_specs = {
    "block-listener": ("Block Listener", "WebSocket-based blockchain event subscription, new block monitoring, and reconnection handling"),
    "opportunity-engine": ("Opportunity Engine", "Continuous position scanning, health factor evaluation, and liquidation opportunity queueing via BullMQ"),
    "auction-engine": ("Auction Engine", "Auction lifecycle coordination — opening, bid aggregation, winner selection, and settlement orchestration"),
    "scoring-function": ("Scoring Function", "Net Economic Value calculation: Gross Liquidation Value − Gas Cost − DEX/Slippage Cost"),
    "simulation-engine": ("Simulation Engine", "Multi-bot orchestration, gas simulation, market volatility modeling, and comparative benchmarking")
}
for slug, (title, desc) in backend_specs.items():
    write_file(f"{base_dir}specs/backend/{slug}.mdx", spec_template.format(title=title, description=desc))

# Frontend specs
write_file(f"{base_dir}specs/frontend/meta.json", json.dumps({
  "title": "Frontend Specs",
  "pages": ["protocol-dashboard", "liquidation-marketplace", "liquidator-console", "research-laboratory"]
}, indent=2))

frontend_specs = {
    "protocol-dashboard": ("Protocol Dashboard", "Global protocol metrics view — TVL, outstanding debt, active positions, liquidation stats, and recovery rates"),
    "liquidation-marketplace": ("Liquidation Marketplace", "Real-time liquidation opportunity explorer with position details, health factors, and estimated profits"),
    "liquidator-console": ("Liquidator Console", "Dedicated liquidator interface — wallet integration, bid submission, active auctions, P&L tracking, and ROI"),
    "research-laboratory": ("Research Laboratory", "Experiment configuration, comparative benchmarking (Conventional vs. MEV-Aware), and result visualization")
}
for slug, (title, desc) in frontend_specs.items():
    write_file(f"{base_dir}specs/frontend/{slug}.mdx", spec_template.format(title=title, description=desc))

# Research
write_file(f"{base_dir}research/meta.json", json.dumps({
  "title": "Research",
  "pages": ["index", "methodology", "experiment-design", "results"]
}, indent=2))

write_file(f"{base_dir}research/index.mdx", """---
title: Research Overview
description: Research hypothesis, central question, and academic contribution of the Reforge project
---

Does the reduction in MEV/gas competition outweigh the additional liquidation latency and associated risk?

Brief overview of the hypothesis and expected contribution.
""")

write_file(f"{base_dir}research/methodology.mdx", """---
title: Methodology
description: Experimental methodology for evaluating the MEV-aware batch auction mechanism
---

## Approach
TODO

## Variables
TODO

## Controls
TODO

## Measurement
TODO

## Status
Draft
""")

write_file(f"{base_dir}research/experiment-design.mdx", """---
title: Experiment Design
description: Scenario configurations, parameter ranges, and benchmark setup for comparative evaluation
---

## Scenarios
TODO

## Parameters
TODO

## Baseline (Conventional PGA)
TODO

## Treatment (MEV-Aware Batch Auction)
TODO

## Status
Draft
""")

write_file(f"{base_dir}research/results.mdx", """---
title: Results
description: Empirical findings from comparative simulations — populated as experiments are run
---

> This page will be populated with experimental results as simulations are executed.

## Status
Pending
""")

# Guides
write_file(f"{base_dir}guides/meta.json", json.dumps({
  "title": "Guides",
  "pages": ["local-development", "deploying-contracts", "running-simulations", "contributing"]
}, indent=2))

write_file(f"{base_dir}guides/local-development.mdx", """---
title: Local Development
description: Complete setup guide for running the full Reforge stack locally
---

## Prerequisites
TODO

## Clone & Install
TODO

## Start Anvil (Local Chain)
TODO

## Deploy Contracts
TODO

## Start Backend
TODO

## Start Frontend
TODO

## Verify
TODO

## Status
Draft
""")

write_file(f"{base_dir}guides/deploying-contracts.mdx", """---
title: Deploying Contracts
description: Step-by-step guide for deploying Reforge smart contracts to Anvil and Sepolia testnet using Foundry
---

## Prerequisites
TODO

## Local Deployment (Anvil)
TODO

## Testnet Deployment (Sepolia)
TODO

## Verify on Etherscan
TODO

## Status
Draft
""")

write_file(f"{base_dir}guides/running-simulations.mdx", """---
title: Running Simulations
description: How to configure and execute comparative liquidation simulations using the Python research layer
---

## Prerequisites
TODO

## Configuration
TODO

## Running a Simulation
TODO

## Interpreting Results
TODO

## Status
Draft
""")

write_file(f"{base_dir}guides/contributing.mdx", """---
title: Contributing
description: Team workflow, PR conventions, and the spec-first development rule
---

## Spec-First Rule
TODO

## Branch Naming
TODO

## PR Process
TODO

## Code Review
TODO

## Status
Draft
""")

print("Done")
