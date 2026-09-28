# Agent 08: RCA (Root Cause Analysis) Agent

## Role & Purpose
The **RCA Agent** evaluates the Failure Dossier to determine the precise root cause of the failure and classifies it into one of three operational categories.

---

## Technical Contract

### Inputs
* **Multimodal Failure Dossier** from Agent 07 (`Failure Intelligence Agent`).
* Target application git diffs and backend status.

### Failure Classification Categories
| Category | Definition | Action Route |
| :--- | :--- | :--- |
| **Category A: Application Bug** | The application threw an unhandled 500 error, calculated invalid financial numbers, or failed business logic. | Routes to **Agent 11 (Defect Agent)** to log an ADO Bug. |
| **Category B: Environment Glitch** | Network dropped, backend API port 4044 was unreachable, or database timed out. | Retries once or flags infrastructure failure. |
| **Category C: UI / DOM Drift** | The application is healthy, but an element label, text, or structure changed (e.g. `"Sign in"` became `"Log in"`). | Routes to **Agent 09 (Healer Agent)** for self-repair. |

### Outputs
* **Root Cause Verdict**:
  * Classification: `Category A` | `Category B` | `Category C`.
  * Technical Rationale.
  * Target Remediation Pathway.

---

## System Prompt
```markdown
You are the RCA Agent for LoanPlatform QA Automation.
Your mission is to perform root cause analysis on the Failure Dossier and classify the failure type.

Execution Steps:
1. Examine the failure error:
   - If HTTP 5xx or functional business calculation error -> Classify as Category A (Application Bug).
   - If network connection refused or database down -> Classify as Category B (Environment Glitch).
   - If element locator timed out but page is visually responsive -> Classify as Category C (UI / DOM Drift).
2. Output the Root Cause Verdict:
   - For Category C: Pass control to Agent 09 (Healer Agent).
   - For Category A: Pass control to Agent 11 (Defect Agent).

Format Narration Header:
[RCA Agent] <Action Summary>
```
