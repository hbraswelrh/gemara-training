# Gemara Schema Reference

Official schema documentation from https://github.com/ossf/gemara/tree/main/schemas

## Layer 3 Policy Structure

### Required Fields

```yaml
title: string                    # Policy title
metadata: #Metadata              # See metadata section below
contacts: #Contacts              # RACI framework contacts
scope: #Scope                    # What applies and what doesn't
imports: #Imports                # Dependencies on other documents
adherence: #Adherence            # Compliance mechanisms
```

### Optional Fields

```yaml
implementation-plan: #ImplementationPlan
risks: #Risks
```

### Metadata (Required)

```yaml
metadata:
  id: string                     # Required: Unique identifier
  description: string            # Required: Policy description
  author:                        # Required: Author information
    id: string
    name: string
    type: Human | Organization
    contact:
      name: string
      affiliation: string
      email: string
  version: string                # Optional
  date: #Date                    # Optional
  mapping-references:            # Optional
    - id: string
      title: string
      version: string
      description: string
      url: string
  applicability-categories: []   # Optional
  draft: boolean                 # Optional
  lexicon: string                # Optional
```

### Contacts (RACI Framework - Required)

```yaml
contacts:
  responsible:                   # Required: Who implements
    - name: string
      primary: boolean
      affiliation: string
      email: string
  accountable:                   # Required: Who evaluates
    - name: string
      primary: boolean
      affiliation: string
      email: string
  consulted:                     # Optional: Advisory resources
    - name: string
      affiliation: string
      email: string
  informed:                      # Optional: Stakeholders
    - name: string
      affiliation: string
```

### Scope (Required)

```yaml
scope:
  in:                            # What applies
    technologies: [string]
    geopolitical: [string]
    data-sensitivity: [string]
    user-roles: [string]
    groups: [string]
  out:                           # What doesn't apply
    technologies: [string]
    geopolitical: [string]
    data-sensitivity: [string]
    user-roles: [string]
    groups: [string]
```

### Imports (Required)

```yaml
imports:
  policies: [string]             # External policy references
  catalogs:                      # Control catalogs
    - id: string
      location: string
  guidance:                      # Guidance documents
    - id: string
      location: string
```

### Adherence (Required)

```yaml
adherence:
  evaluation-methods: [string]   # How to assess
  assessment-plans: [string]     # When to evaluate
  enforcement-methods: [string]  # How to enforce
  non-compliance: string         # What happens on violation
```

### Implementation Plan (Optional)

```yaml
implementation-plan:
  notification-processes: [string]
  evaluation-timeline:
    start: string
    end: string
  enforcement-timeline:
    start: string
    end: string
```

### Risks (Optional)

```yaml
risks:
  mitigated:
    - reference: string
      risk-id: string
  accepted:
    - justification: string
      scope:
        technologies: [string]
        geopolitical: [string]
```

## Layer 2 Control Catalog Structure

### Required Fields for Catalog

```yaml
title: string                    # Catalog title
```

### Optional Fields for Catalog

```yaml
metadata: #Metadata
families: [#Family]
controls: [#Control]
threats: [#Threat]
capabilities: [#Capability]
imported-controls: [#MultiMapping]
imported-threats: [#MultiMapping]
imported-capabilities: [#MultiMapping]
```

### Control Structure

```yaml
id: string                       # Required
title: string                    # Required
objective: string                # Required
family: string                   # Required
assessment-requirements:         # Required
  - id: string
    text: string
    applicability: [string]
    recommendation: string       # Optional
guideline-mappings:              # Optional
  - reference: string
    target-id: string
threat-mappings:                 # Optional
  - reference: string
    target-id: string
```

## Layer 1 Guidance Document Structure

### Required Fields

```yaml
title: string                    # Document title
metadata: #Metadata
document-type:                   # One of:
  - Standard
  - Regulation
  - "Best Practice"
  - Framework
```

### Optional Fields

```yaml
front-matter: string             # Introductory text
families: [#Family]              # Groupings
guidelines: [#Guideline]         # Individual rules
exemptions: [#Exemption]         # Where guidance doesn't apply
```

### Guideline Structure

```yaml
id: string
title: string
description: string
family: string                   # Must match a defined family
extends: string                  # Optional: Another guideline ID
mappings:                        # Optional
  - reference: string
    target-id: string
```

## Example: Complete Layer 3 Policy

```yaml
metadata:
  id: "mfa-policy-001"
  description: "Multi-factor authentication policy for remote access"
  version: "1.0.0"
  author:
    id: security-team
    name: "Security Team"
    type: Human
    contact:
      name: "CISO"
      affiliation: "Security Department"
      email: "ciso@company.com"
  mapping-references:
    - id: "NIST-800-53"
      title: "NIST Special Publication 800-53"
      version: "Rev. 5"
      url: "https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final"

title: "Multi-Factor Authentication Policy"
purpose: "Require MFA for all remote access to protect against credential theft"

contacts:
  responsible:
    - name: "IT Director"
      primary: true
      affiliation: "Information Technology"
      email: "it-director@company.com"
  accountable:
    - name: "Chief Information Security Officer"
      primary: true
      affiliation: "Executive Team"
      email: "ciso@company.com"
  consulted:
    - name: "Legal Counsel"
      affiliation: "Legal Department"
      email: "legal@company.com"
  informed:
    - name: "All Employees"
      affiliation: "Company-wide"

scope:
  in:
    technologies: ["VPN", "Cloud Applications", "Email"]
    user-roles: ["Employees", "Contractors", "Third-party"]
  out:
    technologies: ["On-premises only systems"]
    user-roles: ["Service accounts"]

imports:
  catalogs:
    - id: "nist-800-53-controls"
      location: "https://example.com/catalogs/nist-800-53.yaml"
  guidance:
    - id: "nist-csf"
      location: "https://example.com/guidance/nist-csf.yaml"

adherence:
  evaluation-methods:
    - "Automated compliance scans"
    - "Quarterly access reviews"
  assessment-plans:
    - "Monthly MFA enrollment reports"
    - "Quarterly authentication log reviews"
  enforcement-methods:
    - "Conditional access policies"
    - "Account suspension for non-compliance"
  non-compliance: "Accounts without MFA will be disabled after 30-day grace period"

implementation-plan:
  notification-processes:
    - "Email notification to all users"
    - "Training sessions for new enrollees"
  evaluation-timeline:
    start: "2024-02-01"
    end: "2024-03-01"
  enforcement-timeline:
    start: "2024-03-01"
    end: "2024-12-31"
```

## Key Differences from Common Mistakes

### ❌ Incorrect (Not Gemara Schema)

```yaml
policy_statement: "Users must use MFA"  # Wrong field name
requirements:                           # Not in schema
  - id: "req-001"
    description: "Something"
derived_from_controls:                  # Wrong field name
  - control_id: ctrl-001
```

### ✅ Correct (Gemara Schema)

```yaml
purpose: "Require MFA for remote access"  # Correct field name
adherence:                                # Correct structure
  evaluation-methods: ["Scans"]
  enforcement-methods: ["Conditional access"]
imports:                                  # Correct field name
  catalogs:
    - id: "control-catalog"
      location: "..."
```

## Validation

Use the gemara-mcp-server `validate_gemara_yaml` tool to validate your policies against the official schema.

```bash
# In Claude or Cursor IDE
"Validate this Layer 3 policy using validate_gemara_yaml"
```

## Resources

- **Official Schemas**: https://github.com/ossf/gemara/tree/main/schemas
- **Test Examples**: https://github.com/ossf/gemara/tree/main/test-data
- **Lexicon**: https://github.com/ossf/gemara/blob/main/lexicon.md
