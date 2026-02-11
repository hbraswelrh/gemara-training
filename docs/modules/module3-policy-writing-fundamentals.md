# Module 3: Policy Writing Fundamentals
## Understanding Layer 3 Policies Through Role-Based Perspectives

### Welcome to Policy Writing!

Layer 3 is where you, as a compliance professional, add critical organizational context to industry controls. In this module, you'll learn to write policies that are clear, enforceable, and tailored to your organization's specific needs.

We'll explore policies through the lens of three key roles in your organization, using a real-world example: the **Multi-Factor Authentication (MFA) Policy** from `layer3-access-control-mfa-official.yaml`.

---

## The Three Critical Perspectives

Every Layer 3 policy serves three distinct organizational roles, each with different questions and concerns:

<div class="role-cards">
  <div class="role-card security">
    <h3>🔒 Security Engineer</h3>
    <ul>
      <li>How do I assess threats?</li>
      <li>How do I express controls?</li>
      <li>How do I mitigate risks technically?</li>
    </ul>
  </div>

  <div class="role-card compliance">
    <h3>📋 Compliance Manager</h3>
    <ul>
      <li>What is my compliance scope?</li>
      <li>When is the policy active?</li>
      <li>How do I verify adherence?</li>
      <li>What evidence do auditors need?</li>
    </ul>
  </div>

  <div class="role-card risk">
    <h3>⚖️ Risk Manager</h3>
    <ul>
      <li>What risks are we mitigating?</li>
      <li>What risks are we accepting?</li>
      <li>What are we delegating to customers?</li>
    </ul>
  </div>
</div>

---

## Real-World Example: MFA Policy

Let's examine the official MFA policy (`layer3-access-control-mfa-official.yaml`) and see how it answers questions for each role.

### Policy Overview

**Title:** Multi-Factor Authentication (MFA) Policy
**ID:** access-control-mfa-policy-001
**Purpose:** Establish multi-factor authentication requirements for accessing organizational systems and sensitive data to prevent unauthorized access

**Compliance Frameworks:**
- PCI-DSS 4.0.1 (Requirement 8)
- NIST 800-63B (Authenticator Assurance Level)
- SOC 2 CC6 (Logical and Physical Access Controls)

---

## 🔒 Perspective 1: Security Engineer

### "How do I do a threat assessment?"

As a Security Engineer, you need to understand what threats this policy addresses. The policy references an external **threat model** in the `risks.mitigated` section:

```yaml
risks:
  mitigated:
    - reference-id: "threat-model-iam"
      entries:
        - reference-id: "credential-theft"
        - reference-id: "phishing-attacks"
        - reference-id: "brute-force-attacks"
        - reference-id: "session-replay"
        - reference-id: "insider-threat-unauthorized-access"
```

**Key Understanding:** The policy doesn't define threats itself—it points to a separate threat model document. This separation allows:
- Security engineers to maintain technical threat assessments independently
- Policies to reference multiple threat models
- Threat models to be updated without changing policies

### "How do I express controls and mitigate threats?"

Controls are expressed in the **`imports`** section, which links to Layer 2 controls:

```yaml
imports:
  catalogs:
    - reference-id: "internal-access-controls-catalog"
      constraints:
        - id: "mfa-required"
          target-id: "AC-MFA-001"
          text: "Multi-factor authentication MUST be enforced for all remote access and privileged account access"
        - id: "phishing-resistant"
          target-id: "AC-MFA-002"
          text: "Phishing-resistant MFA methods (FIDO2, hardware tokens) MUST be available for high-risk users"
```

**Assessment Requirement Modifications** provide implementation details:

```yaml
assessment-requirement-modifications:
  - id: "mod-ac-mfa-001"
    target-id: "AC-MFA-001.1"
    modification-type: "clarification"
    modification-rationale: "Clarify acceptable MFA methods and implementation timeline"
    text: "MFA implementation must use authenticator apps (TOTP), hardware security keys (FIDO2/WebAuthn), or SMS as fallback only"
    applicability: ["remote-access", "cloud-applications", "privileged-access"]
    recommendation: "Prefer hardware security keys for administrators; authenticator apps for general users; SMS only as temporary fallback"
```

### "What's my assessment plan?"

The `adherence.assessment-plans` section defines **how to verify** that controls are working:

```yaml
adherence:
  assessment-plans:
    - id: "assess-mfa-enrollment"
      requirement-id: "mfa-enrollment-rate"
      frequency: "daily"
      evaluation-methods:
        - type: automated
          description: "Check MFA enrollment percentage across all active users"
      evidence-requirements: "Identity provider reports showing ≥99% MFA enrollment rate for all active accounts"
```

**Four Assessment Plans:**
1. **Daily:** MFA enrollment rate (≥99%)
2. **Weekly:** MFA usage verification (zero non-MFA logins)
3. **Weekly:** Privileged account MFA compliance (100%)
4. **Quarterly:** Approved MFA methods review

---

## 📋 Perspective 2: Compliance Manager

### "What do I need a policy for?"

The **`metadata.mapping-references`** section tells you which compliance frameworks require this policy:

```yaml
mapping-references:
  - id: "PCI-DSS-4"
    title: "Payment Card Industry Data Security Standard"
    version: "4.0.1"
    description: "Requirement 8 - Identify users and authenticate access to system components"
  - id: "NIST-800-63B"
    title: "NIST Digital Identity Guidelines"
    version: "800-63B"
    description: "Authentication and Lifecycle Management"
  - id: "SOC2-CC6"
    title: "SOC 2 Trust Services Criteria"
    version: "2017"
    description: "CC6 - Logical and Physical Access Controls"
```

### "What is my compliance scope?"

The **`scope`** section defines what's included and excluded:

**IN SCOPE:**
```yaml
scope:
  in:
    technologies:
      - "VPN Access"
      - "Cloud Applications (Office 365, Salesforce, etc.)"
      - "Payment Processing Systems"
      - "Administrative Interfaces"
      - "Remote Desktop Access"
      - "Source Code Repositories"
    geopolitical:
      - "United States"
      - "Canada"
      - "United Kingdom"
    sensitivity:
      - "Payment Card Data"
      - "PII"
      - "Confidential"
      - "Internal"
    users:
      - "Employees"
      - "Contractors"
      - "System Administrators"
      - "Developers"
      - "Third-party Vendors"
```

**OUT OF SCOPE:**
```yaml
  out:
    technologies:
      - "Guest WiFi"
      - "Public-facing Marketing Website"
    sensitivity:
      - "Public"
    users:
      - "Customers (customer-facing applications use separate authentication policy)"
```

### "When is the policy active?"

The **`implementation-plan`** section provides timelines:

```yaml
implementation-plan:
  evaluation-timeline:
    start: "2025-01-01T00:00:00Z"
    end: "2025-12-31T23:59:59Z"
    notes: "Continuous evaluation through 2025 with monthly reporting to executive team"
  enforcement-timeline:
    start: "2025-03-01T00:00:00Z"
    notes: "Full enforcement began March 1, 2025. No new accounts can be created without MFA enrollment. Existing accounts had 90-day grace period (expired May 30, 2025)."
```

**Implementation Phases:**
- ✅ **Phase 1 (Complete):** Initial communication + training materials
- 🔄 **Phase 2 (In Progress):** Monthly reminders to non-enrolled users
- 🔄 **Phase 3 (Ongoing):** New hire enrollment on day 1

### "How do I verify adherence?"

The **`adherence.evaluation-methods`** section lists how compliance is monitored:

```yaml
adherence:
  evaluation-methods:
    - type: automated
      description: "Automated MFA enrollment status monitoring via identity provider APIs"
      executor:
        id: okta-api-scanner
        name: "Okta API Integration"
        type: Software
    - type: automated
      description: "Authentication log analysis to detect non-MFA authentication attempts"
      executor:
        id: siem-system
        name: "Security Information and Event Management System"
        type: Software
    - type: manual
      description: "Quarterly user access reviews to verify MFA enrollment and usage"
      executor:
        id: iam-team
        name: "IAM Team"
        type: Human
```

### "What evidence satisfies audit requirements?"

Each assessment plan specifies **evidence requirements**:

| Assessment | Evidence Required |
|-----------|------------------|
| MFA Enrollment | Identity provider reports showing ≥99% enrollment rate |
| MFA Usage | Authentication logs showing ZERO successful non-MFA logins |
| Privileged Access | 100% of privileged authentications show MFA factors |
| Approved Methods | Report showing only approved authenticator types (FIDO2, TOTP, Hardware Token, SMS-fallback) |

### "What happens when there's non-compliance?"

The **`adherence.non-compliance`** section defines consequences:

```yaml
non-compliance: |
  MFA policy violations are handled as follows:

  CRITICAL VIOLATIONS (MFA disabled on production systems):
  - Immediate escalation to CISO
  - System access may be restricted until MFA is restored
  - Incident investigation required
  - Potential security breach notification

  HIGH VIOLATIONS (User not enrolled in MFA beyond grace period):
  - Account automatically suspended after 7-day grace period
  - Manager notification sent
  - Requires CISO approval to reinstate without MFA
  - Annual security awareness training required

  MEDIUM VIOLATIONS (Weak MFA method in use - SMS only):
  - User receives upgrade notice
  - 30-day period to switch to stronger MFA method
  - After 30 days, SMS MFA disabled and account suspended until upgraded

  EXCEPTIONS:
  - Temporary exceptions may be granted for up to 14 days by IT Security Manager
  - Requires documented business justification and compensating controls
  - Must be approved in writing by CISO for extensions beyond 14 days
```

---

## ⚖️ Perspective 3: Risk Manager

### "What risks do these threats introduce into my environment?"

The policy addresses **five primary threats** from the IAM threat model:

1. **Credential Theft** - Stolen passwords used for unauthorized access
2. **Phishing Attacks** - Social engineering to capture user credentials
3. **Brute-force Attacks** - Automated password guessing attempts
4. **Session Replay** - Reusing stolen session tokens
5. **Insider Threat Unauthorized Access** - Malicious insiders using stolen/shared credentials

### "What am I mitigating?"

The **`risks.mitigated`** section lists all threats that MFA controls address:

```yaml
risks:
  mitigated:
    - reference-id: "threat-model-iam"
      entries:
        - reference-id: "credential-theft"
        - reference-id: "phishing-attacks"
        - reference-id: "brute-force-attacks"
        - reference-id: "session-replay"
        - reference-id: "insider-threat-unauthorized-access"
```

**Risk Treatment:** These risks are **reduced** (not eliminated) by requiring a second authentication factor. Even if an attacker obtains a password, they cannot access systems without the second factor.

### "What am I accepting?"

The **`risks.accepted`** section documents known vulnerabilities:

```yaml
risks:
  accepted:
    - risk:
        reference-id: "threat-model-iam"
        entry-id: "sms-interception"
      scope:
        technologies:
          - "SMS-based MFA (fallback only)"
      justification: "SMS-based MFA is vulnerable to SIM swapping and interception attacks. This risk is accepted as SMS is only permitted as a temporary fallback method, and users are strongly encouraged to upgrade to TOTP or FIDO2. SMS MFA accounts are flagged for quarterly review and users are nudged to upgrade."
```

**Risk Acceptance Decision:**
- **Risk:** SMS interception via SIM swapping attacks
- **Scope:** Limited to SMS-based MFA (fallback method only)
- **Justification:**
  - SMS is temporary/transitional only
  - Users encouraged to upgrade to stronger methods
  - Quarterly reviews ensure users migrate away
  - Better than no MFA at all

### "What am I delegating to a customer?"

**Nothing is delegated** in this policy.

The scope explicitly **excludes customers** (line 87):

```yaml
out:
  users:
    - "Customers (customer-facing applications use separate authentication policy)"
```

**Key Understanding:** This is an **internal** policy for employees, contractors, and vendors. Customer authentication is governed by a separate policy, meaning customer authentication risks are managed elsewhere.

---

## Understanding Activities and Expressing Outputs

### How Policies Connect to Activities (Layer 4)

While policies (Layer 3) define **what must be done**, activities (Layer 4) describe **sensitive actions** that might introduce risk. The policy influences how these activities are performed.

**Example Activities Related to MFA Policy:**

| Activity | How Policy Affects It |
|----------|---------------------|
| **User Login** | Must include MFA challenge after password entry |
| **VPN Connection** | Gateway enforces MFA before granting network access |
| **Admin Console Access** | Requires phishing-resistant MFA (FIDO2/hardware token) |
| **API Authentication** | Service accounts may use alternative methods (not user MFA) |
| **New User Provisioning** | Must enroll in MFA on day 1 (enforcement method) |

### How to Express Control Outputs

The policy expresses expected **outputs** through:

#### 1. **Evidence Requirements** (Compliance Output)
```yaml
evidence-requirements: "Identity provider reports showing ≥99% MFA enrollment rate for all active accounts"
```

#### 2. **Enforcement Methods** (Technical Output)
```yaml
enforcement-methods:
  - type: automated
    description: "Identity provider enforces MFA at authentication time - cannot bypass"
    executor:
      id: okta-enforcement
      name: "Okta Identity Platform"
      type: Software
```

#### 3. **Assessment Parameters** (Measurable Output)
```yaml
parameters:
  - id: "min-enrollment-rate"
    label: "Minimum MFA Enrollment Rate"
    description: "Minimum percentage of users enrolled in MFA"
    accepted-values: ["99%", "100%"]
```

---

## Key Takeaways: Writing Your Own Policies

### 1. **Think in Role Perspectives**

When writing a policy, ask yourself:
- **Security Engineer:** Can I trace this to a threat model and express technical controls?
- **Compliance Manager:** Is my scope clear? Do I have timelines and evidence requirements?
- **Risk Manager:** Do I document what I'm mitigating, accepting, and delegating?

### 2. **Separate Concerns**

Good policies:
- Reference external threat models (don't redefine threats)
- Import controls from catalogs (don't rewrite control text)
- Define organizational scope and risk appetite
- Specify implementation timelines
- Document evidence requirements for audits

### 3. **Make It Measurable**

Every policy should include:
- **Objective criteria:** "≥99% enrollment" not "most users enrolled"
- **Frequency:** "daily", "weekly", "quarterly"
- **Evidence:** Specific reports or logs required
- **Thresholds:** Numeric values that define compliance

### 4. **Document Risk Decisions**

Transparency about risk acceptance builds trust:
- Explain why risks are accepted
- Define the scope of acceptance (limited vs. broad)
- Document compensating controls
- Set review timelines for accepted risks

---

## Interactive Activity: Analyze the MFA Policy

Now that you understand the role-based perspectives, let's practice analyzing the policy:

### Question 1: Security Engineer Perspective
**Scenario:** Your organization wants to add protection against "account takeover via OAuth token theft" to the threat model.

**Task:** Should this threat be added to `risks.mitigated`? Why or why not?

<details>
<summary>Show Answer</summary>

**Answer:** Not necessarily. MFA protects the **initial authentication** but doesn't prevent OAuth token theft **after** successful login. This would require additional controls like:
- Token rotation policies
- Device binding
- Continuous authentication
- Session timeout controls

You would need to create a separate policy or enhance this one with additional controls beyond MFA.

**Key Insight:** Understand the **scope of protection** each control provides. Don't claim to mitigate threats that controls don't actually address.
</details>

### Question 2: Compliance Manager Perspective
**Scenario:** Your auditor asks for evidence that privileged users are using MFA.

**Task:** Which assessment plan provides this evidence? How often is it checked?

<details>
<summary>Show Answer</summary>

**Answer:**
- **Assessment Plan:** `assess-privileged-mfa` (line 166-172)
- **Frequency:** Weekly
- **Evidence:** "100% of privileged account authentications show MFA factors used"
- **Method:** Automated log analysis

**How to provide evidence:** Export authentication logs from your identity provider showing:
1. List of privileged accounts
2. Authentication events for those accounts
3. MFA factors used (TOTP, FIDO2, etc.)
4. 100% compliance rate

**Key Insight:** Evidence requirements are specified in the policy, so you know exactly what auditors need before they ask.
</details>

### Question 3: Risk Manager Perspective
**Scenario:** Your organization wants to allow SMS MFA indefinitely for all users (not just as a fallback).

**Task:** How would you update the `risks.accepted` section? What additional considerations arise?

<details>
<summary>Show Answer</summary>

**Answer:** You would need to expand the accepted risk:

```yaml
risks:
  accepted:
    - risk:
        reference-id: "threat-model-iam"
        entry-id: "sms-interception"
      scope:
        technologies:
          - "SMS-based MFA (all users)"  # Expanded scope
        users:
          - "Employees"
          - "Contractors"
          - "Developers"
      justification: "SMS-based MFA is vulnerable to SIM swapping and interception attacks. This risk is accepted due to user convenience and limited availability of hardware tokens. Compensating controls include: (1) SMS provider uses anti-fraud detection, (2) Users trained to recognize SIM swap indicators, (3) High-value accounts (executives, admins) still required to use FIDO2."
```

**Additional Considerations:**
1. Does this violate compliance requirements? (Check PCI-DSS, NIST AAL2)
2. What compensating controls are needed?
3. Should different user groups have different requirements?
4. What's the business justification?

**Key Insight:** Risk acceptance requires **business justification** and often **compensating controls**. You can't just accept risks without documented reasoning.
</details>

---

## Summary: The Gemara Layer 3 Pattern

A well-written Layer 3 policy:

1. **References** Layer 1 guidance (compliance frameworks)
2. **Imports** Layer 2 controls (technical requirements)
3. **Defines** organizational scope (what's in/out)
4. **Specifies** implementation timelines (when it's active)
5. **Establishes** assessment plans (how to verify)
6. **Documents** evidence requirements (what auditors need)
7. **Declares** risk treatment (mitigate, accept, delegate)
8. **Assigns** RACI accountability (who does what)

This structure ensures that **Security Engineers**, **Compliance Managers**, and **Risk Managers** can all find the information they need to do their jobs effectively.

---

## Next Steps

In the next module, you'll practice writing your own policies using this framework. You'll learn to:
- Transform legacy policy documents into Gemara format
- Create policy families that work together
- Build complete traceability from guidance → controls → policies
- Use AI assistance to accelerate policy authoring

**Ready to continue? Proceed to Module 4: Advanced Policy Authoring**
