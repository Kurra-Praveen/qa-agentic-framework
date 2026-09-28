# 🎯 LoanPlatform QA Orchestrator: Setup & Execution Guide

This guide explains how to configure prerequisites, launch the Dual-Server MCP setup, and run autonomous test generation and self-healing for the **LoanPlatform** SaaS system.

---

## 📋 Prerequisites

Ensure you have the following installed on your host system:

- **Node.js** (v18.x or later) & npm
- **Git**
- **VS Code** with the GitHub Copilot extension (Agent Mode)
- **Target Application**: LoanPlatform running locally at `http://localhost:3000` (API on port `4044`)

---

## 📦 Installation

Install root and test framework dependencies:

```bash
# Install test framework dependencies
cd tests
npm install
cd ..
```

---

## 🔐 Dual-Server MCP Configuration (`.vscode/mcp.json`)

The framework relies on two MCP servers configured in `.vscode/mcp.json`:

1. **Azure DevOps MCP (`ado`)**:
   Connects to your Azure DevOps organization (`agentic-qa-automation/playwright-pitch`) using a Personal Access Token (PAT).
2. **Playwright MCP (`playwright`)**:
   Runs on the host system to explore the live accessibility tree and DOM elements at `http://localhost:3000`.

### Configure your Azure DevOps PAT:
Set your PAT in `.vscode/mcp.json` or enter it when prompted upon opening VS Code.

---

## 🔑 Standard Test Credentials

The LoanPlatform seed accounts are:

| Role | Email | Password | Intended Test Coverage |
| :--- | :--- | :--- | :--- |
| **`SUPER_ADMIN`** | `admin@loanplatform.com` | `admin123` | System oversight, role-based authentication (`@ADO-5`) |
| **`LENDER_ADMIN`** | `kpraveen@gmail.com` | `admin123` | Borrower onboarding (`@ADO-6`), loan origination |

---

## 🧪 Test Execution Commands

Run tests from the repository root:

### 1. Quality Gate Validation (0 Errors)
```bash
npm run validate
```
Executes TypeScript typechecking (`tsc --noEmit`) and ESLint linting (`eslint .`).

### 2. Live Client Demonstration (Headed with slowMo)
```bash
npm run test:demo
```
Launches headed Chromium with `slowMo: 150ms` for client presentation visibility.

### 3. CI / Headless Mode
```bash
npm run test
```

### 4. Interactive Report & Trace Viewer
```bash
npm run report
```
Launches the interactive Playwright HTML report and opens step-by-step traces with snapshots and videos.

---

## 🛡️ Governed Self-Healing Demonstration

Demonstrate the **Radiance Tiered Governance Protocol**:

1. **Simulate UI Drift**:
   ```bash
   npm run demo:break
   ```
   *(Modifies the 'Sign in' button locator in `tests/src/pages/LoginPage.ts` to 'Log in to Portal').*

2. **Run Test to Observe Failure**:
   ```bash
   npm run test:demo
   ```

3. **Trigger AI Self-Healing**:
   In your AI assistant prompt:
   ```text
   Diagnose and heal the failing test in tests/specs/auth.spec.ts
   ```

4. **Reset Baseline**:
   ```bash
   npm run demo:reset
   ```