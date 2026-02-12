## **The Story of the High-Privilege Pivot**

### **1\. The Risk Manager: Sarah’s Threat Landscape**

Sarah starts her morning in the **Risks** section. She isn't looking at code; she’s looking at threats. She sees that an attacker using **Brute Force (MITRE T1110)** is the primary threat to Nexus Tech.

She maps this threat directly to the policy's **mitigated** list. However, she spots a problem: **RISK-402**. A legacy application used by the finance team can't handle complex passwords. Sarah doesn't ignore it; she uses the **accepted** risk block. She justifies it because a migration is coming in Q3, but she uses **scope** to "fence in" this risk so it only applies to Legacy-App-01 and doesn't bleed into the rest of the company.

```yaml
risks: # Risk Manager - What are my risks? Mitigated and accepted risks addressed by this policy.
  mitigated: # Risk Manager - What are my mitigated risks?
    - reference-id: "MITRE-ATT&CK" # Controls addressing risks are identified through threat mappings.
      item-id: "T1110" # Brute Force
  accepted: # Risk Manager - What are my accepted risks?
    - risk: # Controls addressing risks are identified through threat mappings.
        reference-id: "internal-risk-registry"
        item-id: "RISK-402"
      justification: "Legacy system does not support MFA; risk accepted until migration in Q3."
      scope: # Scope and justification are only required for accepted risks (e.g., risk is accepted for TLP:Green and TLP:Clear because they contain non-sensitive data)
        in:
          technologies: ["Legacy-App-01"]
```

---

### **2\. The Security Engineer: Marcus’s Blueprint**

Marcus takes Sarah’s threat assessment and turns it into technical reality. He looks at the **Imports** section. He pulls in the **CIS Benchmark v8**, but he realizes the standard "quarterly check" isn't enough for their AWS root accounts.

Marcus uses the **Assessment Requirement Modifier**. He identifies the specific CIS target and uses modification-type: replace. He writes a **modification-rationale** explaining that high-privilege roles need more eyes on them. He defines the **text** for a new manual check. This is his "control expression"—he is telling the system exactly how the standard should be strengthened for Nexus Tech’s specific needs.

```yaml
imports: # External policies, controls, and guidelines required by this policy.
  policies: ["global-security-framework-v2"] # Policies to be imported to complement this policy.
  catalogs: # Threat-informed control catalogs to include for this policy.
    - reference-id: "cis-benchmark-v8"
      constraints: # Define ad-hoc minimum requirements (e.g. "Review at least x times per year")
        - id: "min-length-12"
          target-id: "password-complexity"
          text: "Passwords must be at least 12 characters long." # Updated text of the assessment requirement within the cis-benchmark-v8
      assessment-requirement-modifications: # Assessment Requirement Modifier - customize assessment requirements based on how the organization wants to gather evidence for the objective.
        - id: "password-audit-mod-01" # Modification to the target-id from the cis-benchmark-v8
          target-id: "cis-password-audit-original" # The ID of the requirement in the source catalog (what you are changing)
          modification-type: "replace" # Replace or add will trigger a review of "what to replace for the requirement" (How)
          modification-rationale: "Standard quarterly audits are insufficient for high-privilege IAM roles; increasing frequency to monthly." # Why
          text: "Perform a manual verification of IAM direct settings to ensure 12-character minimums are enforced."
          applicability: [ "Cloud Infrastructure", "High-Privilege Accounts" ]
          # Actual modified content
```

---

### **3\. The Compliance Manager: Elena’s Enforcement**

Elena is the one who has to prove this all works. She spends her time in the **Scope** and **Adherence** sections.

First, she checks the **Scope**. She needs to know exactly where her team needs to hunt for data. The policy tells her: "Look at Identity Providers and Cloud Infrastructure globally." She ignores the "Air-gapped Systems" because the policy explicitly lists them as out.

Next, she builds the **Assessment Plans**. She sees Marcus’s modifier and creates a specific plan for it:

* **The High-Privilege Plan:** This is her "Special Ops" plan. Because Marcus modified the requirement, she sets the **frequency** to monthly and only targets Cloud Infrastructure.
* **The Standard Plan:** For general users in the Identity Providers (like the office Wi-Fi or email), she keeps the frequency at quarterly using an automated scanner.

```yaml
scope: # Compliance Managers - what is my scope? What do I include and exclude for this policy?
  in: # What is in-scope?
    technologies: ["Identity Providers", "Cloud Infrastructure"] # Technology categories or services
    geopolitical: ["Global"] # Optional list of geopolitical regions
    sensitivity: ["Confidential", "Internal"] # Optional list of data classification levels )
  out: # What is out-of-scope?
    technologies: ["Legacy Air-gapped Systems"]

#-------------------- imports (Marcus' job)----------------------------
#---------------------implementation plan for Elena---------------------

adherence: # Compliance Managers - what is my adherence? How do I verify those subject to the policy? Execution of those imports requirements.
  evaluation-methods: # What method will I use to evaluate my adherence? Behavioral, Manual, Automated, Auto-remediation, Gate?
    - id: "automated-config-audit" # Automation for evaluation
      type: "automated"
    - id: "manual-screenshot-verification" # Added to match the assessment requirement modifier's method
      type: "manual"
  assessment-plans: # Defines how specific assessment requirements are evaluated.
    # New Plan - consume Assessment Requirement Modifier for Targeted High-Privilege Plan environments using modifier
    - id: "monthly-high-privilege-audit"
      requirement-id: "password-audit-mod-01" # Matches the requirement-id of the assessment requirement modifier
      frequency: "monthly" # Matches the frequency in the assessment requirement modifier
      scope:
        in: # If the auditor asks to prove compliance for AWS Prod Env, a system pulls the "monthly" plan; For corporate SSO (Identity Provider), it pulls the "quarterly" plan
          technologies: ["Cloud Infrastructure"] # Specifically, targeting the high privilege (Think AWS Prod Env)
      evaluation-methods:
        - id: "manual-screenshot-verification" # Assessment Requirement Modifier isn't just a global change - it's a risk-based adjustment applied specifically where the highest threat exists.
      evidence-requirements: "Visual confirmation of IAM password policy console."

    # Standard Plan - References Non High-Privileged users for remaining scope and baseline requirements
    - id: "quarterly-iam-review"
      requirement-id: "password-policy-audit"
      frequency: "quarterly"
      scope:
        in:
          technologies: ["Identity Providers"] # General targeting
      evaluation-methods:
        - id: "iam-policy-scanner"
          type: "automated"
      evidence-requirements: "JSON exports of IAM password policy settings."
  enforcement-methods: # What method will I use to enforce my adherence?
    - id: "iam-policy-deny" # Accepted Method for enforcement - automatic
      type: "automated" # Behavioral, Manual, Automated, Auto-remediation, Gate?
  non-compliance: "Users with non-compliant passwords will be locked out of SSO after 3 grace period notifications." # Notifications
```

---

### **The Climax: The Implementation & Catch**

On November 1st, the **Implementation-plan** kicks in. Elena sends the **notification-process** email blast. By January, the **enforcement-timeline** is reached.

A developer tries to set a 10-character password on a production database. Because of the **enforcement-methods** (iam-policy-deny), the system automatically blocks the change. If the developer persists with non-compliant credentials, the **non-compliance** field dictates their fate: they get three warnings, then they are locked out of SSO.

```yaml
implementation-plan: # Compliance Managers - defines when and how the policy becomes active.
  notification-process: "Email blast to all employees and updates to the internal wiki." # The how
  evaluation-timeline: # Timeline for Policy implementation
    start: "2023-11-01T00:00:00Z"
    notes: "Initial baseline scan of current configurations." # The when
  enforcement-timeline: # Timeline for Enforcement of Policy implementation
    start: "2024-01-01T00:00:00Z"
    notes: "Mandatory rotation enforced via IAM policy." # The enforcement timeline
```

By using this structured YAML, Nexus Tech ensures that Sarah's fears, Marcus's technical controls, and Elena's audit logs are all speaking the same language.