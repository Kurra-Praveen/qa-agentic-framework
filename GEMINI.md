# Agent Guidance & Grounding Rules: LoanPlatform QA Automation

This repository provides an autonomous, agentic end-to-end test automation framework for the **LoanPlatform** Multi-Tenant Loan Management System.

## Product Knowledge & Specifications
Before generating or executing test cases, always refer to the local Knowledge Base in `.github/wiki/`:
1. [01-Architecture-And-Overview.md](.github/wiki/01-Architecture-And-Overview.md) — System architecture, user roles (`SUPER_ADMIN`, `LENDER_ADMIN`), and route map.
2. [02-Lending-Lifecycle-And-Specs.md](.github/wiki/02-Lending-Lifecycle-And-Specs.md) — Borrower onboarding, KYC risk banding, loan state machine, and payment allocation waterfall.
3. [03-QA-Standards-And-Test-Data.md](.github/wiki/03-QA-Standards-And-Test-Data.md) — Test credentials (`admin@loanplatform.com` / `admin123`), Playwright 7-level locator priority, and Cucumber BDD standards.

## 12-Agent Orchestration Architecture
This system operates as a Master AI QA Orchestrator coordinating 12 specialized QA agents defined in `.github/agents/`:
- **Understand & Plan**: 01-Requirement Analyst, 02-Test Strategy, 03-Test Design
- **Build & Run**: 04-Exploration (Playwright MCP), 05-Automation (POM), 06-Execution (Runner)
- **Diagnose & Repair**: 07-Failure Intelligence, 08-RCA Agent, 09-Healer Agent (Tiered Governance)
- **Improve & Decide**: 10-Coverage Agent (RTM), 11-Defect Agent (ADO Bugs), 12-Release Quality Agent

Refer to [.github/copilot-instructions.md](.github/copilot-instructions.md) for the complete orchestration engine and live demo narration format.

## Execution Rules & Anti-Deviation Guardrails
- **Zero Terminal Probing**: NEVER run `curl`, `wget`, `netstat`, `ps`, or `lsof` in the terminal to probe application ports or status. Verify application reachability exclusively via Playwright MCP (`browser_navigate`).
- **Target Application as Black Box**: Treat the application under test as an external black box. NEVER search the local filesystem for backend/frontend application source code, and NEVER extract or restore legacy repository files.
- **Host Network Access for Tests**: Playwright browser test executions (`npm run test:demo`, `npx playwright test`) connect to `http://localhost:3000` on the host. When executing test runs via `run_command`, set `BypassSandbox: true` to allow Chromium to access the host loopback network.
- **Locator Hierarchy**: Always use Playwright semantic locators (`getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`). Do not guess or invent CSS selectors.
- **Tagging & Structure**: Tag test specs with `@ADO-<work-item-id>` and structure scenarios using `test.step()`.
- **Target Application URL**: `http://localhost:3000`.
- **MCP-Only Protocol**: Always use respective MCP tools (`ado` and `playwright`); plain HTTP calls are strictly avoided.
- **Demo Narration & Review Packets**: In live presentation mode, output sequential agent headers (`[Requirement Analyst]`, `[Exploration Agent]`, etc.). NEVER call `ask_question` in isolation; ALWAYS render the complete **Review Packet** (drafted scenarios, DOM locator mapping table, or RTM scorecard) in the visible response BEFORE invoking the interactive gate.
