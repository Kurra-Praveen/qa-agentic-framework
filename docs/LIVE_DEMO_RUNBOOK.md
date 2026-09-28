# 🎬 Live Client Demonstration Runbook: AI QA Transformation

> **Presenter Runbook & Execution Guide**  
> *Target Duration: 3–5 Minutes | Target Audience: Enterprise QA Directors, Engineering Leads, VP of Delivery*  
> *Target Application: LoanPlatform Multi-Tenant SaaS (http://localhost:3000)*

---

## ⏱️ Live Demo Timeline & Act Structure

```
00:00 ──────────────── 00:45 ──────────────── 02:00 ──────────────── 03:00 ───────────── 03:45
      Act 1: The Context          Act 2: Autonomous Generation        Act 3: Self-Healing       The Payoff
      (ADO Story & Backlog)      (12 Agents live in headed browser)    (Intentional UI Drift)    (Scorecard & RTM)
```

---

## 🎭 Act 1: The Enterprise Context (0:00 – 0:45)

### What to Show on Screen:
1. Open Azure DevOps Project: `agentic-qa-automation/playwright-pitch`.
2. Open **Epic #4** (`EPIC-01: Multi-Tenant Loan Management & Lending Lifecycle`).
3. Click on **User Story #5** (`US-01: Secure Lender Authentication & Role-Based Dashboard Access`).
4. Highlight the Gherkin Acceptance Criteria, Dev Specifications, and Test Case links.

### Speaker Script:
> *"In a traditional sprint, turning this user story into automated test coverage takes a QA engineer between 3 to 4 hours—reading the ticket, inspecting the web page, drafting test cases, writing Page Objects, and fixing initial flakes.*  
> *Today, we’re going to demonstrate how our 12-agent autonomous QA orchestrator compresses that entire lifecycle into under 90 seconds, with higher rigor and zero guesswork."*

---

## ⚡ Act 2: The Autonomous Generation & Execution Loop (0:45 – 2:00)

### Action to Perform:
Issue the single master orchestration prompt in Antigravity:

```text
Automate the end-to-end test suite for Azure DevOps work item #5.
Run in Demo Presentation Mode.
```

### What Happens on Screen (The 3-Gate Human-in-the-Loop Experience):
1. **Gate 1: Requirements & Test Design Review**:
   * `[Requirement Analyst]` Ingests Story #5 via Azure DevOps MCP; parses Acceptance Criteria.
   * `[Test Strategy Agent]` Evaluates risk level and targets Chromium 1280x720.
   * `[Test Design Agent]` Formats BDD `test.step()` scenarios matching `@ADO-5`.
   * **🛑 Interactive Gate 1 Modal Appears**:
     * *Modal Prompt*: *"Review the designed scenarios above. Proceed to Live DOM Exploration?"*
     * *Speaker Action*: Explain to clients: *"Notice the agent does not run wild. It presents the extracted scenarios and waits for QA approval."*
     * *Click*: `[Approve Scenarios & Proceed to Live Exploration]`.
2. **Gate 2: Live DOM Exploration & Code Quality Review**:
   * `[Exploration Agent]` Navigates to `http://localhost:3000/login` via Playwright MCP and inspects the live accessibility tree.
   * `[Automation Agent]` Generates TypeScript Page Objects (`LoginPage.ts`) and test spec (`auth.spec.ts`).
   * `[Automation Agent]` Validates code with ESLint + TypeScript typecheck (**0 errors**).
   * **🛑 Interactive Gate 2 Modal Appears**:
     * *Modal Prompt*: *"Semantic locators & POM verified (0 errors). Launch Headed Browser Execution?"*
     * *Speaker Action*: Explain: *"Level 1 semantic locators extracted directly from the live DOM without guessing. Code is verified."*
     * *Click*: `[Approve Code & Launch Headed Browser Execution]`.
3. **Gate 3: Execution & Release Sign-Off**:
   * `[Execution Agent]` Launches visible Chromium browser... both tests execute and pass in ~5 seconds!
   * `[Coverage Agent]` Displays Requirements Traceability Matrix (100% of Acceptance Criteria verified).
   * **🛑 Interactive Gate 3 Modal Appears**:
     * *Modal Prompt*: *"2/2 Passed in 5.1s (100% RTM). Certify Release & Open Trace Report?"*
     * *Speaker Action*: *"Full evidence-backed sign-off, ready for deployment."*
     * *Click*: `[Certify Release & Open Trace Report]`.

### Speaker Script:
> *"Notice the difference between raw code generation and governed engineering. At each stage—test design, code validation, and release certification—the Master Orchestrator pauses at an interactive checkpoint. The human QA engineer is always in control, with full evidence attached to every decision."*

---

## 🛡️ Act 3: The Showstopper — Governed Self-Healing (2:00 – 3:00)

### What to Show on Screen:
1. Explain to the audience:
   > *"Now, what happens when developers deploy a UI change right before release? In traditional automation, tests break and pipelines turn red. Let's simulate a breaking change."*
2. Run the simulation command in terminal:
   ```bash
   npm run demo:break
   ```
   *(This script alters the button locator in `LoginPage.ts` from `'Sign in'` to `'Log in to Portal'`).*
3. Run the test:
   ```bash
   npm run test:demo
   ```
4. The test fails on locator timeout.
5. In Antigravity, issue the prompt:
   ```text
   Diagnose and heal the failing test in tests/specs/auth.spec.ts
   ```
6. **Watch the Governance Protocol Activate**:
   * `[Failure Intelligence]` Ingests the trace and failure screenshot.
   * `[RCA Agent]` Classifies the failure as **Category C: UI / DOM Drift**.
   * `[Healer Agent]` Re-inspects the live DOM via Playwright MCP, finds the candidate, computes a Confidence Score of **0.96 (Tier 1 Auto-Approve)**.
   * `[Healer Agent]` Auto-heals `LoginPage.ts`, runs `npm run validate`, and triggers a green re-run!

### Speaker Script:
> *"This is the Radiance Tiered Governance Protocol in action. Notice it didn't blindly overwrite code. It calculated a calibrated confidence score. Because confidence exceeded 90%, it auto-repaired the Page Object and validated the fix with a green re-run.*  
> *If confidence had been below 70%, it would have blocked the change and triggered our Defect Agent to file a Bug in Azure DevOps."*

---

## 📊 The Payoff: Executive Scorecard & Traceability (3:00 – 3:45)

### What to Show on Screen:
Show the **Playwright HTML Report and Trace Viewer**:
```bash
npm run report
```

Display the comparison card to the client:

| Metric | Traditional QA Process | Radiance Agentic QA | Client ROI |
| :--- | :--- | :--- | :--- |
| **Requirement Ingestion & AC Gaps** | ~45 mins | ~8 seconds | **330x faster** |
| **DOM Inspection & Locator Design** | ~60 mins | ~15 seconds | **240x faster** |
| **Page Object & Test Script Authoring** | ~90 mins | ~30 seconds | **180x faster** |
| **Execution, Trace & Report Delivery** | ~20 mins | ~5 seconds | **240x faster** |
| **Locator Drift Maintenance** | ~1 to 2 hours | ~15 seconds (Healed) | **95% less upkeep** |
| **Total Cycle Time** | **~3.5 to 4.5 hours** | **~90 seconds** | **~150x Acceleration** |

---

## 💬 Tough Client Questions & Cheat Sheet Answers

**Q: "Does self-healing hide real application bugs?"**
* **Answer**: *"Never. That is what our RCA Agent and Tier 3 gate prevent. The Healer only activates for Category C (DOM Drift). If the backend returns a 500 error, or financial data is calculated incorrectly, the Defect Agent immediately logs an Azure DevOps Bug with attached screenshots and traces."*

**Q: "Will this expose our sensitive company data to public models?"**
* **Answer**: *"No. As outlined in Slide 13 of our pitch deck, we support zero-retention enterprise endpoints, private VPC deployments, and local model routing where requirements and source code never leave your secure perimeter."*

**Q: "Do we have to rewrite our existing test suite to use this?"**
* **Answer**: *"Not at all. The agents adapt to your existing standards. We proved this in our Talentorial migration where we migrated 1,200 existing Playwright tests in 8.5 sprints with 0 lost coverage and a 70% reduction in flakiness."*
