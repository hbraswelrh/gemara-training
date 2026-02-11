# Module 4: Advanced Policy Authoring
**Duration**: 90 minutes | **Type**: Interactive hands-on exercises

## Learning Objectives
- Understand how Layer 3 policies connect to different organizational personas
- Transform risk-based requirements into executable compliance activities
- Build comprehensive policy artifacts that serve Security Engineers, Compliance Managers, and Risk Managers
- Apply the complete Layer 3 policy schema to real-world scenarios

---

## Understanding Policy Personas

Layer 3 policies are **risk-focused** documents that bridge strategic risk decisions with operational compliance activities. Different organizational roles interact with policies in distinct ways:

### 🔒 Security Engineer
**Primary Questions:**
- How do I perform a threat assessment?
- How do I mitigate threats and express controls?
- What technical implementations satisfy policy requirements?

**Policy Sections Used:**
- `imports.catalogs` - Which threat-informed controls apply
- `adherence.assessment-plans` - Technical assessment procedures
- `adherence.evaluation-methods` - How to validate security controls

### ✅ Compliance Manager
**Primary Questions:**
- What do I need a policy for? What is my compliance scope?
- When is the policy active?
- How do I verify adherence to the policy?
- What type of evidence satisfies audit requirements?

**Policy Sections Used:**
- `scope` - What is included/excluded from policy applicability
- `implementation-plan` - When the policy becomes active
- `adherence.assessment-plans` - Verification procedures
- `adherence.evidence-requirements` - Audit evidence specifications

### ⚖️ Risk Manager
**Primary Questions:**
- What risks do these threats introduce into my environment?
- What am I mitigating? Accepting? Delegating to customers?
- How does my risk appetite influence policy decisions?

**Policy Sections Used:**
- `risks.mitigated` - Threats being addressed by controls
- `risks.accepted` - Known risks with justification
- `scope` - Risk boundaries (what's in/out of scope)
- `imports.catalogs.constraints` - Risk-based control modifications

---

## Risk-Based Policy Structure

Let's examine how the `examples/layer3-policy.yaml` demonstrates risk-based thinking across all three personas:

### Example: Corporate Password Policy

```yaml
title: "Example Corporate Password Policy"
metadata:
  id: "policy-001"
  version: "1.0.0"
  description: "Organizational policy for password complexity and rotation."
  mapping-references:
    - reference-id: "NIST-SP-800-53"
      item-id: "IA-5"
```

**Risk Context**: This policy addresses credential compromise risk (MITRE ATT&CK T1110 - Brute Force).

---

## Section-by-Section Persona Mapping

### 1. Scope: Compliance Manager's Compliance Boundaries

**Compliance Manager asks:** "What is my compliance scope? What do I include and exclude for this policy?"

```yaml
scope:
  in: # What is in-scope?
    technologies: ["Identity Providers", "Cloud Infrastructure"]
    geopolitical: ["Global"]
    sensitivity: ["Confidential", "Internal"]
  out: # What is out-of-scope?
    technologies: ["Legacy Air-gapped Systems"]
```

**Why this matters:**
- Defines **where** the policy applies (technologies, regions, data types)
- Establishes audit boundaries for compliance verification
- Prevents scope creep and audit confusion
- Documents conscious decisions about what is NOT covered

**Compliance Activity Output**: Scoping documents for auditors showing policy applicability

---

### 2. Risks: Risk Manager's Risk Treatment Decisions

**Risk Manager asks:** "What am I mitigating? What am I accepting? What am I delegating?"

```yaml
risks:
  mitigated: # What threats are we actively addressing?
    - reference-id: "MITRE-ATT&CK"
      item-id: "T1110" # Brute Force attacks

  accepted: # What risks are we consciously accepting?
    - risk:
        reference-id: "internal-risk-registry"
        item-id: "RISK-402"
      justification: "Legacy system does not support MFA; risk accepted until migration in Q3."
      scope: # WHERE we accept this risk
        in:
          technologies: ["Legacy-App-01"]
```

**Why this matters:**
- **Mitigated risks** document threat reduction through controls
- **Accepted risks** require explicit justification and executive approval
- Risk acceptance is **scoped** - only applies to specific systems/contexts
- Creates audit trail for risk treatment decisions

**Risk Activity Output**:
- Risk treatment plan showing mitigation strategies
- Risk acceptance documentation with justification
- Risk register updates

---

### 3. Imports: Security Engineer's Control Catalog

**Security Engineer asks:** "How do I mitigate threats and express controls?"

```yaml
imports:
  policies: ["global-security-framework-v2"]
  catalogs:
    - reference-id: "cis-benchmark-v8"
      constraints: # Risk-based control modifications
        - id: "min-length-12"
          target-id: "password-complexity"
          text: "Passwords must be at least 12 characters long."
          assessment-requirements: # Modified assessment for HIGH-RISK environments
            - id: "password-audit-mod-01"
              target-id: "cis-password-audit-original"
              modification-type: "replace"
              modification-rationale: "Standard quarterly audits are insufficient for high-privilege IAM roles; increasing frequency to monthly."
              # Modified content for high-risk scope
              requirement-id: "iam-verify-direct"
              frequency: "monthly" # Risk-based increase from quarterly
              evaluation-methods:
                - id: "manual-screenshot-verification"
                  type: "manual"
              evidence-requirements: "Visual confirmation of IAM password policy console."
```

**Why this matters:**
- **Assessment Requirement Modifiers** allow risk-based control tailoring
- Higher-risk environments (AWS Production) get MORE FREQUENT audits (monthly)
- Lower-risk environments (Corporate SSO) keep standard frequency (quarterly)
- Justification documents WHY the modification is necessary

**Security Activity Output**:
- Customized control implementation guide
- Risk-based assessment procedures
- Technical configuration requirements

---

### 4. Implementation Plan: Compliance Manager's Activation Timeline

**Compliance Manager asks:** "When is the policy active?"

```yaml
implementation-plan:
  notification-process: "Email blast to all employees and updates to the internal wiki."
  evaluation-timeline: # When assessment starts
    start: "2023-11-01T00:00:00Z"
    notes: "Initial baseline scan of current configurations."
  enforcement-timeline: # When enforcement begins
    start: "2024-01-01T00:00:00Z"
    notes: "Mandatory rotation enforced via IAM policy."
```

**Why this matters:**
- Separates **evaluation** (measuring current state) from **enforcement** (requiring compliance)
- Provides grace period for remediation
- Documents notification process for audit trail
- Establishes clear dates for compliance obligations

**Compliance Activity Output**:
- Policy rollout timeline
- Stakeholder notification records
- Enforcement activation documentation

---

### 5. Adherence: All Personas' Compliance Execution

**Compliance Manager asks:** "How do I verify adherence? What evidence satisfies audits?"
**Security Engineer asks:** "How do I perform assessments?"
**Risk Manager asks:** "How do we validate risk mitigation?"

```yaml
adherence:
  evaluation-methods: # HOW we check compliance
    - id: "automated-config-audit"
      type: "automatic"
    - id: "manual-screenshot-verification"
      type: "manual"

  assessment-plans: # WHEN and WHERE we check compliance
    # HIGH-RISK Plan: Monthly checks for privileged environments
    - id: "monthly-high-privilege-audit"
      requirement-id: "iam-verify-direct" # Links to assessment requirement modifier
      frequency: "monthly" # Risk-based frequency increase
      scope:
        in:
          technologies: ["Cloud Infrastructure"] # AWS Prod environments
      evaluation-methods:
        - id: "manual-screenshot-verification"
      evidence-requirements: "Visual confirmation of IAM password policy console."

    # STANDARD-RISK Plan: Quarterly checks for general users
    - id: "quarterly-iam-review"
      requirement-id: "password-policy-audit"
      frequency: "quarterly" # Standard frequency
      scope:
        in:
          technologies: ["Identity Providers"] # Corporate SSO
      evaluation-methods:
        - id: "iam-policy-scanner"
      evidence-requirements: "JSON exports of IAM password policy settings."

  enforcement-methods: # How we enforce compliance
    - id: "iam-policy-deny"
      type: "automatic"

  non-compliance: "Users with non-compliant passwords will be locked out of SSO after 3 grace period notifications."
```

**Why this matters:**
- **Assessment plans are risk-scoped**: High-privilege = monthly, Standard = quarterly
- **Multiple evaluation methods**: Automated scanning + manual verification
- **Evidence requirements** specify what auditors need to see
- **Enforcement** can be automatic (technical controls) or manual (procedures)

**Activity Outputs by Persona:**

**Compliance Manager:**
- Assessment schedule showing when audits occur
- Evidence collection procedures
- Audit artifacts (screenshots, JSON exports)
- Non-compliance tracking

**Security Engineer:**
- Technical assessment procedures
- Tool configuration for automated checks
- Remediation procedures

**Risk Manager:**
- Risk verification evidence
- Control effectiveness measurements
- Risk treatment validation

---

## The Risk-Based Assessment Modifier Pattern

### Key Concept: Different Risks = Different Controls

The **Assessment Requirement Modifier** is the mechanism for risk-based control tailoring:

```yaml
imports:
  catalogs:
    - reference-id: "cis-benchmark-v8"
      constraints:
        - id: "password-audit-mod-01"
          modification-type: "replace"
          modification-rationale: "High-privilege roles require more frequent verification"
          requirement-id: "iam-verify-direct"
          frequency: "monthly" # ← Increased from quarterly
```

This modifier says:
1. **WHAT**: We're modifying the CIS Benchmark password audit requirement
2. **HOW**: Replacing quarterly with monthly frequency
3. **WHY**: High-privilege roles introduce higher risk
4. **WHERE**: Applied specifically to Cloud Infrastructure (see assessment plan scope)

### How Assessment Plans Consume Modifiers

```yaml
adherence:
  assessment-plans:
    # Plan 1: Uses the MODIFIED requirement for high-risk scope
    - id: "monthly-high-privilege-audit"
      requirement-id: "iam-verify-direct" # ← References the modifier
      frequency: "monthly" # ← Matches the modified frequency
      scope:
        in:
          technologies: ["Cloud Infrastructure"] # HIGH-RISK scope

    # Plan 2: Uses STANDARD requirement for normal scope
    - id: "quarterly-iam-review"
      requirement-id: "password-policy-audit" # ← Original requirement
      frequency: "quarterly" # ← Standard frequency
      scope:
        in:
          technologies: ["Identity Providers"] # STANDARD-RISK scope
```

**When an auditor asks for proof of compliance:**
- For **AWS Production Environment** (Cloud Infrastructure): System pulls the `monthly-high-privilege-audit` plan
- For **Corporate SSO** (Identity Provider): System pulls the `quarterly-iam-review` plan

This demonstrates **risk-proportional controls** - applying stricter controls where risk is higher.

---

## Persona Workflows: From Questions to Activities

### Security Engineer Workflow

**Question**: "How do I perform a threat assessment and mitigate risks?"

**Step 1**: Review `risks.mitigated` to understand threats
```yaml
risks:
  mitigated:
    - reference-id: "MITRE-ATT&CK"
      item-id: "T1110" # Brute Force
```
**Output**: Threat T1110 (Brute Force) identified

**Step 2**: Review `imports.catalogs` to find controls
```yaml
imports:
  catalogs:
    - reference-id: "cis-benchmark-v8"
      constraints:
        - target-id: "password-complexity"
          text: "Passwords must be at least 12 characters long."
```
**Output**: CIS control requiring 12-character passwords

**Step 3**: Review `adherence.assessment-plans` to understand verification
```yaml
adherence:
  assessment-plans:
    - id: "monthly-high-privilege-audit"
      evaluation-methods:
        - id: "manual-screenshot-verification"
      evidence-requirements: "Visual confirmation of IAM password policy console."
```
**Output**: Assessment procedure for validating control implementation

**Step 4**: Execute technical implementation
- Configure IAM password policy (12+ chars, complexity rules)
- Implement automated scanning tool
- Document configuration in runbook

**Step 5**: Perform assessment
- Run automated config audit
- Capture screenshots for high-privilege environments
- Store evidence artifacts

---

### Compliance Manager Workflow

**Question**: "What is my compliance scope and how do I verify adherence?"

**Step 1**: Review `scope` to define boundaries
```yaml
scope:
  in:
    technologies: ["Identity Providers", "Cloud Infrastructure"]
    geopolitical: ["Global"]
    sensitivity: ["Confidential", "Internal"]
  out:
    technologies: ["Legacy Air-gapped Systems"]
```
**Output**: Scoping document for audit

**Step 2**: Review `implementation-plan` for timeline
```yaml
implementation-plan:
  evaluation-timeline:
    start: "2023-11-01T00:00:00Z"
  enforcement-timeline:
    start: "2024-01-01T00:00:00Z"
```
**Output**: Policy activation dates and grace periods

**Step 3**: Create assessment schedule from `adherence.assessment-plans`
```yaml
adherence:
  assessment-plans:
    - id: "monthly-high-privilege-audit"
      frequency: "monthly"
      scope:
        in:
          technologies: ["Cloud Infrastructure"]
    - id: "quarterly-iam-review"
      frequency: "quarterly"
      scope:
        in:
          technologies: ["Identity Providers"]
```
**Output**:
- Monthly audit calendar for Cloud Infrastructure
- Quarterly audit calendar for Identity Providers

**Step 4**: Collect evidence per `evidence-requirements`
- Screenshots for manual verification
- JSON exports for automated scans
- Store in compliance management system

**Step 5**: Report compliance status
- Track completion of assessment plans
- Document non-compliance findings
- Provide audit artifacts on request

---

### Risk Manager Workflow

**Question**: "What risks am I mitigating, accepting, or delegating?"

**Step 1**: Review `risks.mitigated` for active risk reduction
```yaml
risks:
  mitigated:
    - reference-id: "MITRE-ATT&CK"
      item-id: "T1110" # Brute Force
```
**Output**: Risk T1110 is being mitigated through this policy

**Step 2**: Review `risks.accepted` for residual risk
```yaml
risks:
  accepted:
    - risk:
        reference-id: "internal-risk-registry"
        item-id: "RISK-402"
      justification: "Legacy system does not support MFA; risk accepted until migration in Q3."
      scope:
        in:
          technologies: ["Legacy-App-01"]
```
**Output**:
- Risk RISK-402 accepted for Legacy-App-01
- Justification documented
- Remediation timeline (Q3 migration)

**Step 3**: Validate risk treatment through `adherence.assessment-plans`
```yaml
adherence:
  assessment-plans:
    - id: "monthly-high-privilege-audit" # High-risk = monthly checks
    - id: "quarterly-iam-review" # Standard-risk = quarterly checks
```
**Output**: Risk-proportional control verification

**Step 4**: Update risk register
- Mark T1110 as "Mitigated" with control reference
- Mark RISK-402 as "Accepted" with policy reference
- Document risk ownership (RACI contacts)

**Step 5**: Provide risk reporting
- Risk treatment status dashboard
- Residual risk with acceptance documentation
- Control effectiveness evidence from assessments

---

## Hands-On Exercises

### Exercise 6: Policy Modernization with Persona Mapping (Intermediate)

**Scenario**: You have a legacy "Remote Access Policy" from 2015 that says:

> "All remote connections must use VPN. Two-factor authentication is recommended. Remote access logs should be reviewed periodically."

**Your Task**: Convert this into a Gemara Layer 3 YAML artifact that serves all three personas.

**Required Elements**:

1. **For Risk Manager**: Add `risks` section
   - What threat(s) does this policy mitigate? (Hint: MITRE ATT&CK T1133 - External Remote Services)
   - Are there any accepted risks? (e.g., legacy systems)

2. **For Compliance Manager**: Add `scope` and `implementation-plan`
   - What technologies are in-scope? (VPN concentrators, jump servers, etc.)
   - What's excluded? (Internal network access)
   - When does the policy activate?

3. **For Security Engineer**: Add `imports` and `adherence`
   - Which control catalog applies? (CIS Controls, NIST 800-53)
   - How do you verify VPN usage? (Network flow logs, authentication logs)
   - What assessment methods? (Automated log analysis, manual review)

**Template Starter**:

```yaml
title: "Remote Access Security Policy"
metadata:
  id: "policy-002"
  version: "2.0.0"
  date: "2024-02-11"
  description: "Organizational policy for secure remote access."
  mapping-references:
    - reference-id: "NIST-SP-800-53"
      item-id: "AC-17"

contacts:
  responsible:
    - name: "Network Security Team"
      email: "netsec@example.com"
  accountable:
    - name: "CISO"
      email: "ciso@example.com"

# TODO: Add scope (Compliance Manager)
scope:
  in:
    technologies: [] # What technologies?
    sensitivity: [] # What data?
  out:
    technologies: [] # What's excluded?

# TODO: Add risks (Risk Manager)
risks:
  mitigated:
    - reference-id: "MITRE-ATT&CK"
      item-id: "" # Which threat?
  accepted: [] # Any accepted risks?

# TODO: Add imports (Security Engineer)
imports:
  catalogs:
    - reference-id: "" # Which control framework?
      constraints: []

# TODO: Add implementation plan (Compliance Manager)
implementation-plan:
  notification-process: ""
  evaluation-timeline:
    start: ""
  enforcement-timeline:
    start: ""

# TODO: Add adherence (All personas)
adherence:
  evaluation-methods: []
  assessment-plans: []
  enforcement-methods: []
```

**Success Criteria**:
- All three personas can answer their primary questions using your policy
- Risk Manager can identify mitigated/accepted risks
- Compliance Manager has clear scope and timeline
- Security Engineer has actionable assessment procedures

---

### Exercise 7: Risk-Based Assessment Plan Creation (Advanced)

**Scenario**: You are implementing a Data Classification Policy. Your organization has identified that:
- **HIGH-RISK**: Customer PII databases in cloud environments (risk of data breach)
- **MEDIUM-RISK**: Internal employee directories (privacy concerns)
- **LOW-RISK**: Public marketing materials (no sensitive data)

**Your Task**: Create risk-proportional assessment plans that apply different verification frequencies based on risk level.

**Requirements**:

1. **Risk Manager Input**: Define three risk levels in `risks` section
   - Mitigated threat: T1530 (Data from Cloud Storage)
   - Accepted risk: Legacy HR system lacks encryption (document justification)

2. **Security Engineer Input**: Create assessment plans with:
   - HIGH-RISK: Weekly automated scans + monthly manual reviews
   - MEDIUM-RISK: Monthly automated scans
   - LOW-RISK: Quarterly automated scans

3. **Compliance Manager Input**: Specify evidence requirements for each risk level
   - HIGH-RISK: Encryption validation + access logs + DLP alerts
   - MEDIUM-RISK: Access logs
   - LOW-RISK: Configuration snapshots

**Template Starter**:

```yaml
title: "Data Classification and Protection Policy"
metadata:
  id: "policy-003"
  version: "1.0.0"

scope:
  in:
    technologies: ["Cloud Storage", "Database Systems", "File Shares"]
    sensitivity: ["Confidential", "Internal", "Public"]

risks:
  mitigated:
    - reference-id: "MITRE-ATT&CK"
      item-id: "T1530"
  accepted:
    - risk:
        reference-id: "internal-risk-registry"
        item-id: "RISK-505"
      justification: "Legacy HR system lacks field-level encryption; accepted until Q4 replacement."
      scope:
        in:
          technologies: ["Legacy-HR-App"]

imports:
  catalogs:
    - reference-id: "nist-800-53-r5"
      constraints:
        - id: "data-encryption-high-risk"
          modification-rationale: "Customer PII requires weekly verification due to breach impact."
          requirement-id: "encryption-verify-high"
          frequency: "weekly"

adherence:
  evaluation-methods:
    - id: "automated-encryption-scan"
      type: "automatic"
    - id: "manual-dlp-review"
      type: "manual"

  assessment-plans:
    # TODO: Create HIGH-RISK plan (weekly + monthly)
    - id: "high-risk-data-audit"
      requirement-id: "encryption-verify-high"
      frequency: "weekly" # Automated component
      scope:
        in:
          technologies: ["Cloud Storage"]
          sensitivity: ["Confidential"] # PII data
      evaluation-methods:
        - id: "automated-encryption-scan"
      evidence-requirements: "Encryption status, access logs, DLP alert summary"

    # TODO: Create additional plan for monthly manual review of HIGH-RISK

    # TODO: Create MEDIUM-RISK plan (monthly)

    # TODO: Create LOW-RISK plan (quarterly)
```

**Success Criteria**:
- Three distinct assessment plans with different frequencies
- Risk-based justification for each frequency choice
- Evidence requirements match risk level
- Accepted risk properly scoped and justified

---

### Exercise 8: Cross-Layer Traceability with Persona Integration (Advanced)

**Scenario**: You need to create complete traceability from:
- **Layer 1**: NIST CSF PR.AC-7 (Identity Management)
- **Layer 2**: Control IAM-MFA-001 (Multi-Factor Authentication)
- **Layer 3**: Your organizational MFA policy

**Your Task**: Create a Layer 3 policy that demonstrates full traceability AND serves all three personas.

**Requirements**:

1. **Traceability Chain**:
   - `metadata.mapping-references` → Layer 1 guidance
   - `imports.catalogs` → Layer 2 control
   - `adherence.assessment-plans` → Operational verification

2. **Persona Requirements**:
   - **Risk Manager**: Identify what attack technique MFA mitigates (T1078 - Valid Accounts)
   - **Compliance Manager**: Define scope (all users vs. privileged users vs. contractors)
   - **Security Engineer**: Create risk-based assessment plans:
     - Admin accounts: Weekly verification
     - Standard users: Monthly verification

3. **Assessment Requirement Modifier**:
   - Modify the base MFA control to require hardware tokens for admin accounts
   - Justification: Software-based MFA insufficient for privileged access risk

**Template Starter**:

```yaml
title: "Multi-Factor Authentication Policy"
metadata:
  id: "policy-004"
  version: "1.0.0"
  mapping-references:
    - reference-id: "NIST-CSF"
      item-id: "PR.AC-7" # Layer 1 traceability

contacts:
  responsible:
    - name: "Identity and Access Management Team"
  accountable:
    - name: "CISO"

scope:
  in:
    technologies: ["Identity Providers", "VPN", "Cloud Platforms"]
    sensitivity: ["Confidential", "Internal"]
    # TODO: Should contractors be in-scope?
  out:
    technologies: [] # Any exclusions?

risks:
  mitigated:
    - reference-id: "MITRE-ATT&CK"
      item-id: "T1078" # Valid Accounts abuse

imports:
  catalogs:
    - reference-id: "iam-controls-catalog" # Layer 2 traceability
      constraints:
        - id: "mfa-hardware-admin"
          target-id: "IAM-MFA-001"
          modification-type: "replace"
          modification-rationale: "Privileged accounts require hardware MFA due to higher compromise impact."
          requirement-id: "mfa-admin-verify"
          frequency: "weekly"
          assessment-requirements:
            - id: "admin-mfa-check"
              requirement-id: "mfa-admin-verify"
              frequency: "weekly"
              evidence-requirements: "Hardware token serial numbers, authentication logs showing FIDO2/WebAuthn usage"

adherence:
  evaluation-methods:
    - id: "automated-mfa-check"
      type: "automatic"
    - id: "manual-token-audit"
      type: "manual"

  assessment-plans:
    # HIGH-RISK: Admin accounts with hardware tokens
    - id: "admin-mfa-weekly"
      requirement-id: "mfa-admin-verify"
      frequency: "weekly"
      scope:
        in:
          technologies: ["Identity Providers"]
          # TODO: How to scope to admin accounts specifically?
      evaluation-methods:
        - id: "manual-token-audit"
      evidence-requirements: "Hardware token serial numbers, authentication logs showing FIDO2/WebAuthn usage"

    # STANDARD-RISK: Regular users with software MFA
    # TODO: Create monthly assessment plan for standard users
```

**Success Criteria**:
- Complete Layer 1 → Layer 2 → Layer 3 traceability documented
- Risk-based control modification (hardware vs. software MFA) justified
- Separate assessment plans for admin vs. standard users
- All three personas can execute their workflows using this policy

---

## Common Patterns and Anti-Patterns

### ✅ Pattern: Risk-Proportional Controls

**Good Example**:
```yaml
adherence:
  assessment-plans:
    - id: "prod-db-daily-scan"
      frequency: "daily" # High-risk production databases
      scope:
        in:
          technologies: ["Production Databases"]

    - id: "dev-db-weekly-scan"
      frequency: "weekly" # Lower-risk development databases
      scope:
        in:
          technologies: ["Development Databases"]
```

**Why**: Different risk levels warrant different control intensity.

---

### ❌ Anti-Pattern: One-Size-Fits-All Controls

**Bad Example**:
```yaml
adherence:
  assessment-plans:
    - id: "all-systems-monthly"
      frequency: "monthly" # Same frequency for everything
      scope:
        in:
          technologies: ["All Systems"] # No risk differentiation
```

**Why**: Fails to apply controls proportional to risk; wastes resources on low-risk, under-protects high-risk.

---

### ✅ Pattern: Explicit Risk Acceptance

**Good Example**:
```yaml
risks:
  accepted:
    - risk:
        reference-id: "internal-risk-registry"
        item-id: "RISK-707"
      justification: "IoT devices lack encryption capability; mitigating with network segmentation instead."
      scope:
        in:
          technologies: ["Building Automation IoT"]
```

**Why**: Documents conscious risk decision with justification and compensating controls.

---

### ❌ Anti-Pattern: Undocumented Exceptions

**Bad Example**:
```yaml
scope:
  out:
    technologies: ["IoT Devices"] # Why excluded? What's the risk?
```

**Why**: Auditors will question exclusions without documented risk acceptance.

---

### ✅ Pattern: Evidence-Driven Assessment Plans

**Good Example**:
```yaml
adherence:
  assessment-plans:
    - id: "encryption-validation"
      evaluation-methods:
        - id: "automated-tls-scan"
      evidence-requirements: "TLS certificate chain, cipher suite configuration, protocol version logs"
```

**Why**: Specifies exactly what evidence proves compliance.

---

### ❌ Anti-Pattern: Vague Assessment Requirements

**Bad Example**:
```yaml
adherence:
  assessment-plans:
    - id: "check-encryption"
      evidence-requirements: "Proof of encryption" # What proof?
```

**Why**: Auditors and implementers don't know what satisfies the requirement.

---

## Summary: The Risk-Based Policy Lifecycle

```
┌─────────────────────────────────────────────────────────────┐
│  Risk Manager: Identify Threats & Risk Appetite             │
│  ↓ Output: risks.mitigated, risks.accepted                  │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  Security Engineer: Select Controls & Tailor to Risk        │
│  ↓ Output: imports.catalogs, constraints (modifiers)        │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  Compliance Manager: Define Scope & Implementation Timeline │
│  ↓ Output: scope, implementation-plan                       │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  Security Engineer: Design Assessment Procedures            │
│  ↓ Output: adherence.assessment-plans (risk-scoped)         │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  Compliance Manager: Execute Assessments & Collect Evidence │
│  ↓ Output: Audit artifacts per evidence-requirements        │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  Risk Manager: Validate Risk Treatment Effectiveness        │
│  ↓ Output: Risk register updates, residual risk analysis    │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Takeaways

1. **Layer 3 policies are risk-focused**: Every section connects back to organizational risk decisions.

2. **Three personas, one artifact**: The policy serves Risk Managers (risk treatment), Compliance Managers (verification procedures), and Security Engineers (technical implementation).

3. **Assessment Requirement Modifiers enable risk-based tailoring**: Apply stricter controls (higher frequency, different methods) where risk is higher.

4. **Scope + Assessment Plans = Risk-Proportional Controls**: Use `scope` to partition environments by risk level, then create different assessment plans for each partition.

5. **Evidence requirements bridge policy and audit**: Explicit evidence specifications prevent audit surprises and ensure repeatable verification.

6. **Risk acceptance requires explicit justification**: Never exclude scope or skip controls without documented risk acceptance with business justification.

---

## Next Steps

In **Module 5: Real-World Policy Implementation**, you'll apply these persona-based workflows to industry-specific scenarios:
- Financial Services (PCI-DSS risk tiers)
- Healthcare (HIPAA risk analysis)
- Technology (SOC 2 risk-based testing)

Each case study will demonstrate how different industries apply risk-proportional controls through the Gemara policy structure.
