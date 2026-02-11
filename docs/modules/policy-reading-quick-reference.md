# Policy Reading Quick Reference Card
## How to Read Layer 3 Policies by Role

---

## 🔒 Security Engineer's Checklist

**"I need to understand threats and implement technical controls"**

### Where to Look in the Policy

| Question | Policy Section | Example (MFA Policy) |
|----------|---------------|---------------------|
| What threats am I addressing? | `risks.mitigated` → `reference-id` → `entries` | `threat-model-iam` with 5 threats |
| What controls do I implement? | `imports.catalogs.constraints` | `AC-MFA-001`, `AC-MFA-002` |
| How do I configure controls? | `assessment-requirement-modifications` | "Use TOTP, FIDO2, or SMS fallback" |
| How do I verify it's working? | `adherence.assessment-plans` | Daily enrollment checks, weekly usage analysis |
| What tools do I use? | `adherence.evaluation-methods` → `executor` | Okta API, SIEM system |
| What methods enforce compliance? | `adherence.enforcement-methods` | Identity provider blocking, VPN gateway |

### My Workflow
1. Read `risks.mitigated` → Identify threats from threat model
2. Read `imports.catalogs` → Find Layer 2 controls to implement
3. Read `assessment-requirement-modifications` → Get implementation specifics
4. Read `adherence.assessment-plans` → Plan verification schedule
5. Read `adherence.enforcement-methods` → Configure technical enforcement

### Red Flags to Watch For
- ❌ No link to threat model (how do I know what I'm protecting against?)
- ❌ Missing assessment plans (how do I verify controls work?)
- ❌ Vague control references (what specific control am I implementing?)
- ❌ No enforcement methods (how is this actually enforced?)

---

## 📋 Compliance Manager's Checklist

**"I need to ensure audit readiness and regulatory compliance"**

### Where to Look in the Policy

| Question | Policy Section | Example (MFA Policy) |
|----------|---------------|---------------------|
| What frameworks require this? | `metadata.mapping-references` | PCI-DSS 4.0.1, NIST 800-63B, SOC 2 |
| What's in scope? | `scope.in` | VPN, cloud apps, payment systems, employees, contractors |
| What's out of scope? | `scope.out` | Guest WiFi, public website, customers |
| When does it take effect? | `implementation-plan.enforcement-timeline.start` | March 1, 2025 |
| What's the rollout plan? | `implementation-plan.notification-process` | Phase 1 (done), Phase 2 (in progress) |
| How do I check compliance? | `adherence.evaluation-methods` | Automated + manual methods |
| How often do I check? | `adherence.assessment-plans` → `frequency` | Daily, weekly, quarterly |
| What evidence do auditors need? | `adherence.assessment-plans` → `evidence-requirements` | "Reports showing ≥99% enrollment" |
| Who's responsible? | `contacts.responsible` | IAM Engineering Lead |
| Who's accountable? | `contacts.accountable` | CISO |
| What if someone doesn't comply? | `adherence.non-compliance` | Grace periods, escalations, suspensions |

### My Workflow
1. Read `metadata.mapping-references` → Create compliance matrix
2. Read `scope.in` and `scope.out` → Document applicability boundaries
3. Read `implementation-plan` → Build timeline and communication plan
4. Read `adherence.assessment-plans` → Schedule recurring assessments
5. Read `adherence.evidence-requirements` → Prepare evidence collection
6. Read `adherence.non-compliance` → Understand enforcement escalation
7. Read `contacts` → Build RACI matrix

### Red Flags to Watch For
- ❌ Missing framework mappings (how do I prove compliance?)
- ❌ Vague scope (what systems does this apply to?)
- ❌ No timelines (when does this start?)
- ❌ Missing evidence requirements (what do I show auditors?)
- ❌ Unclear accountability (who's responsible if we fail?)

---

## ⚖️ Risk Manager's Checklist

**"I need to understand risk treatment decisions"**

### Where to Look in the Policy

| Question | Policy Section | Example (MFA Policy) |
|----------|---------------|---------------------|
| What threats exist? | `risks.mitigated` → `entries` | 5 IAM threats (credential theft, phishing, etc.) |
| What am I reducing? | `risks.mitigated` | All 5 threats reduced by MFA requirement |
| What am I accepting? | `risks.accepted` → `risk` | SMS interception (SIM swapping) |
| Why am I accepting it? | `risks.accepted` → `justification` | "SMS is fallback only, users encouraged to upgrade" |
| What's the scope of acceptance? | `risks.accepted` → `scope` | Limited to SMS-based MFA (not TOTP/FIDO2) |
| What am I delegating? | Check `scope.out` for exclusions | Customer auth (separate policy) |
| What controls reduce risk? | `imports.catalogs.constraints` | MFA enforcement, phishing-resistant methods |
| What's the residual risk? | Implied by `risks.accepted` | SMS users still vulnerable to SIM swap |

### My Workflow
1. Read `risks.mitigated` → List threats being addressed
2. Read referenced threat model → Understand threat details
3. Read `imports.catalogs.constraints` → Identify risk controls
4. Read `risks.accepted` → Document accepted risks with justifications
5. Read `scope.out` → Identify what's delegated or excluded
6. Calculate residual risk → Mitigated - Accepted = Residual

### Risk Treatment Matrix

| Risk | Treatment | Evidence in Policy | Notes |
|------|-----------|-------------------|-------|
| Credential Theft | **Mitigate** | `risks.mitigated.credential-theft` | MFA prevents password-only access |
| Phishing | **Mitigate** | `risks.mitigated.phishing-attacks` | Second factor required even if phished |
| Brute-force | **Mitigate** | `risks.mitigated.brute-force-attacks` | Password alone insufficient |
| Session Replay | **Mitigate** | `risks.mitigated.session-replay` | MFA required at authentication |
| Insider Threats | **Mitigate** | `risks.mitigated.insider-threat-unauthorized-access` | Shared creds won't work |
| SMS Interception | **Accept** | `risks.accepted.sms-interception` | Limited scope, transitional only |
| Customer Auth Risks | **Delegate** | `scope.out.users: "Customers"` | Separate customer policy |

### Red Flags to Watch For
- ❌ No threat model reference (what risks am I addressing?)
- ❌ Missing risk acceptance documentation (are we hiding accepted risks?)
- ❌ No justification for accepted risks (why is this OK?)
- ❌ Unclear scope of acceptance (how broad is the accepted risk?)
- ❌ No compensating controls for accepted risks (how are we reducing exposure?)

---

## Cross-Role Collaboration Points

### Where Roles Intersect

| Policy Section | Primary Role | Supporting Roles | Why It Matters |
|----------------|--------------|------------------|----------------|
| `risks.mitigated` | Risk Manager | Security Engineer | Risk Manager identifies, Security Engineer implements |
| `adherence.assessment-plans` | Security Engineer | Compliance Manager | Security Engineer verifies, Compliance Manager audits |
| `risks.accepted` | Risk Manager | Security Engineer, Compliance Manager | Risk Manager accepts, Security Engineer explains limitations, Compliance Manager documents for auditors |
| `scope.in` / `scope.out` | Compliance Manager | All roles | Defines boundaries for everyone |
| `implementation-plan` | Compliance Manager | Security Engineer | Compliance Manager plans, Security Engineer implements |
| `adherence.enforcement-methods` | Security Engineer | Compliance Manager | Security Engineer configures, Compliance Manager verifies |

---

## Common Policy Patterns

### Pattern 1: External Threat Model Reference
```yaml
risks:
  mitigated:
    - reference-id: "threat-model-xyz"
      entries:
        - reference-id: "specific-threat-id"
```
**Why:** Separates technical threat assessment from organizational policy

### Pattern 2: Imported Controls
```yaml
imports:
  catalogs:
    - reference-id: "control-catalog-id"
      constraints:
        - target-id: "CONTROL-001"
```
**Why:** Don't rewrite controls; reference them from Layer 2

### Pattern 3: Measurable Evidence
```yaml
evidence-requirements: "Identity provider reports showing ≥99% MFA enrollment rate for all active accounts"
```
**Why:** Objective, auditable, numeric threshold

### Pattern 4: Documented Risk Acceptance
```yaml
risks:
  accepted:
    - risk:
        reference-id: "threat-model-id"
        entry-id: "specific-risk-id"
      scope:
        technologies: ["Specific Technology"]
      justification: "Clear business reason with compensating controls"
```
**Why:** Transparent risk management, audit trail

### Pattern 5: Phased Implementation
```yaml
implementation-plan:
  enforcement-timeline:
    start: "2025-03-01T00:00:00Z"
    notes: "90-day grace period for existing accounts"
```
**Why:** Realistic rollout, change management

---

## Quick Audit: Is This a Good Policy?

### ✅ A good Layer 3 policy has:

- [ ] **Metadata**: ID, version, author, frameworks mapped
- [ ] **Clear scope**: Explicit in/out boundaries (tech, geo, users, data)
- [ ] **Control imports**: References Layer 2 controls (doesn't redefine them)
- [ ] **Threat linkage**: References threat model (doesn't redefine threats)
- [ ] **Assessment plans**: Frequency, methods, evidence requirements
- [ ] **Enforcement methods**: How compliance is technically enforced
- [ ] **Implementation timeline**: Start dates, grace periods, phases
- [ ] **RACI contacts**: Responsible, Accountable, Consulted, Informed
- [ ] **Risk treatment**: Mitigated + Accepted (with justifications)
- [ ] **Non-compliance process**: Clear consequences and escalation
- [ ] **Measurable criteria**: Numeric thresholds (99%, 100%, zero, etc.)

### ❌ A poor Layer 3 policy has:

- [ ] No compliance framework mappings
- [ ] Vague scope ("applicable systems" without specifics)
- [ ] Rewritten control text instead of references
- [ ] No threat model linkage
- [ ] Missing evidence requirements
- [ ] No implementation timeline
- [ ] Unclear accountability
- [ ] Undocumented risk acceptance
- [ ] Weak language ("should", "may", "consider")
- [ ] No enforcement mechanism

---

## Example: Reading the MFA Policy

### Security Engineer's View

```yaml
# 1. What threats?
risks.mitigated → threat-model-iam →
  - credential-theft
  - phishing-attacks
  - brute-force-attacks

# 2. What controls?
imports.catalogs.constraints →
  - AC-MFA-001: MFA for remote/privileged access
  - AC-MFA-002: Phishing-resistant for high-risk

# 3. How to implement?
assessment-requirement-modifications →
  "Use TOTP, FIDO2/WebAuthn, or SMS fallback"
  "Prefer hardware keys for admins"

# 4. How to verify?
adherence.assessment-plans →
  - Daily: enrollment ≥99%
  - Weekly: zero non-MFA logins
  - Weekly: 100% privileged MFA
  - Quarterly: approved methods only
```

### Compliance Manager's View

```yaml
# 1. What frameworks?
metadata.mapping-references →
  - PCI-DSS 4.0.1 (Req 8)
  - NIST 800-63B (AAL2)
  - SOC 2 CC6

# 2. What's in scope?
scope.in →
  technologies: VPN, Cloud Apps, Payment Systems
  users: Employees, Contractors, Admins
  geopolitical: US, Canada, UK

# 3. When active?
implementation-plan.enforcement-timeline →
  start: 2025-03-01
  grace period: 90 days (expired 2025-05-30)

# 4. What evidence?
adherence.assessment-plans.evidence-requirements →
  "Identity provider reports showing ≥99% enrollment"
  "Authentication logs showing zero non-MFA logins"
  "100% privileged accounts show MFA factors"
```

### Risk Manager's View

```yaml
# 1. What am I mitigating?
risks.mitigated →
  - credential-theft
  - phishing-attacks
  - brute-force-attacks
  - session-replay
  - insider-threat-unauthorized-access

# 2. What am I accepting?
risks.accepted →
  risk: sms-interception (SIM swapping)
  scope: SMS-based MFA (fallback only)
  justification: "Transitional, users encouraged to upgrade,
                  quarterly reviews, better than no MFA"

# 3. What am I delegating?
scope.out.users →
  "Customers (separate authentication policy)"
  → Customer risks managed elsewhere
```

---

## Keyboard Shortcuts for Policy Reading

### In Your Editor
- `Ctrl+F` "risks.mitigated" → Jump to threat mitigation
- `Ctrl+F` "scope.in" → Jump to applicability
- `Ctrl+F` "assessment-plans" → Jump to verification schedule
- `Ctrl+F` "risks.accepted" → Jump to accepted risks
- `Ctrl+F` "enforcement-timeline" → Jump to implementation dates

### In the Training Interface
- Click role badge → Highlight relevant sections
- Hover over YAML → Show which roles use this section
- Click line number → View in context of full policy

---

## Print This Card

This quick reference is designed to be printed and kept at your desk. Refer to it when:
- Reading new policies
- Writing policy reviews
- Preparing for audits
- Analyzing risk treatment
- Onboarding new team members

---

**Version:** 1.0.0
**Last Updated:** 2026-02-10
**Based on:** `layer3-access-control-mfa-official.yaml` example
