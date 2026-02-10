
# Gemara Official Schema Reference

**Schema Version:** v0.17.0-dev
**Source:** https://github.com/gemaraproj/gemara
**Status:** Experimental (subject to change)

This document describes the official Gemara Layer 3 Policy schema as defined in the [gemaraproj/gemara](https://github.com/gemaraproj/gemara) repository.

## Layer 3 Policy Structure

### Complete Schema Definition

```yaml
# Layer 3 Policy Document (from layer-3.cue)
title: string                      # REQUIRED: Policy title
metadata: #Metadata                # REQUIRED: Policy metadata
organization-id: string            # OPTIONAL: Organization identifier
purpose: string                    # OPTIONAL: Policy purpose statement
contacts: #Contacts                # REQUIRED: RACI roles
scope: #Scope                      # REQUIRED: Applicability
guidance-references: [#GuidanceReference]  # OPTIONAL: Layer 1 references
control-references: [#ControlReference]    # OPTIONAL: Layer 2 references
adherence: #Adherence              # OPTIONAL: Compliance mechanisms
implementation-plan: #ImplementationPlan  # OPTIONAL
risks: #Risks                      # OPTIONAL
```

---

## Required Fields

### 1. `title` (string)

The human-readable name of the policy.

```yaml
title: "Information Security Policy"
```

### 2. `organization-id` (string) - OPTIONAL

Unique identifier for the organization implementing the policy.

```yaml
organization-id: "org-12345"
```

### 3. `purpose` (string) - OPTIONAL

High-level purpose statement for the policy.

```yaml
purpose: "Establish comprehensive information security controls and procedures to protect organizational assets"
```

### 4. `metadata` (#Metadata)

Descriptive information about the policy artifact.

**Required metadata fields:**
- `id` (string) - Unique identifier for this policy
- `description` (string) - High-level summary of purpose and scope
- `author` (#Actor) - Person or group responsible for authoring

**Optional metadata fields:**
- `version` (string) - Version identifier
- `date` (#Date) - ISO 8601 date
- `contact` (#Contact) - Primary contact information (separate from author)
- `mapping-references` - External standards/frameworks referenced
- `applicability-categories` - Classification tags (e.g., TLP levels, data sensitivity)
  - `id` (string) - Category identifier
  - `title` (string) - Category title
  - `description` (string) - Category description
- `draft` (boolean) - Draft status indicator
- `lexicon` (string) - Terms and definitions

#### Example:

```yaml
metadata:
  id: "security-policy-001"
  description: "Establish comprehensive information security controls and procedures to protect organizational assets"
  version: "2.1.0"
  author:
    id: security-team
    name: "Security Team"
    type: Human
  contact:
    name: "Security Team Lead"
    affiliation: "Security Department"
    email: "security-lead@company.com"
  mapping-references:
    - id: "NIST-800-53"
      title: "NIST Special Publication 800-53"
      version: "Rev. 5"
      description: "Security and Privacy Controls for Federal Information Systems"
      url: "https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final"
    - id: "ISO-27001"
      title: "ISO/IEC 27001"
      version: "2022"
      description: "Information security management systems"
      url: "https://www.iso.org/standard/27001"
```

### 5. `contacts` (#Contacts)

RACI (Responsible, Accountable, Consulted, Informed) framework for policy roles.

**Required contact types:**
- `responsible` - Person/group implementing technical controls
- `accountable` - Person/group evaluating and enforcing controls

**Optional contact types:**
- `consulted` - Advisory resources
- `informed` - Stakeholders receiving updates

#### Example:

```yaml
contacts:
  responsible:
    - name: "IT Director"
      primary: true
      affiliation: "Information Technology"
      email: "it-director@company.com"
    - name: "Compliance Officer"
      primary: false
      affiliation: "Legal & Compliance"
      email: "compliance@company.com"
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
```

### 6. `scope` (#Scope)

Defines the boundaries and dimensions of policy applicability.

**Dimensions available:**
- `boundaries` - Geographic regions or jurisdictions
- `technologies` - Technology categories or services
- `providers` - Service providers or platforms

#### Example:

```yaml
scope:
  boundaries:
    - "United States"
    - "European Union"
    - "Canada"
  technologies:
    - "Cloud Computing"
    - "Mobile Devices"
    - "Web Applications"
    - "Database Systems"
  providers:
    - "Amazon Web Services"
    - "Microsoft Azure"
    - "Google Cloud Platform"
```

### 7. `guidance-references` and `control-references` - OPTIONAL

External dependencies to Layer 1 guidance and Layer 2 control catalogs.

#### Guidance References (#GuidanceReference):

References to Layer 1 guidance documents with scoping and modifications.

```yaml
guidance-references:
  - reference-id: "NIST-800-53"
    in-scope:
      boundaries: ["United States"]
      technologies: ["Cloud Computing", "Web Applications"]
      providers: ["Amazon Web Services", "Microsoft Azure"]
    out-of-scope:
      boundaries: ["International"]
      technologies: ["Legacy Systems"]
      providers: ["On-premises Infrastructure"]
    control-modifications:
      - target-id: "AC-1"
        modification-type: "enhancement"
        modification-rationale: "Enhanced access control requirements for cloud environments"
        title: "Enhanced Access Control"
        objective: "Implement enhanced access controls for cloud environments"
        assessment-requirement-modifications:
          - target-id: "AC-1.1"
            modification-type: "clarification"
            modification-rationale: "Clarified assessment procedures for multi-cloud environments"
            text: "Assessment procedures must include multi-cloud environment considerations"
            applicability: ["cloud", "multi-cloud"]
            recommendation: "Conduct quarterly assessments"
```

#### Control References (#ControlReference):

References to Layer 2 control catalogs with scoping and modifications.

```yaml
control-references:
  - reference-id: "ISO-27001"
    in-scope:
      boundaries: ["European Union"]
      technologies: ["Database Systems", "Mobile Devices"]
      providers: ["Google Cloud Platform"]
    out-of-scope:
      boundaries: ["United States"]
      technologies: ["Legacy Systems"]
      providers: ["On-premises Infrastructure"]
    control-modifications:
      - target-id: "A.8.1.1"
        modification-type: "enhancement"
        modification-rationale: "Enhanced mobile device management requirements"
        title: "Enhanced Mobile Device Management"
        objective: "Implement comprehensive mobile device management controls"
        assessment-requirement-modifications:
          - target-id: "A.8.1.1.1"
            modification-type: "clarification"
            modification-rationale: "Clarified mobile device encryption requirements"
            text: "All mobile devices must use strong encryption for data at rest and in transit"
            applicability: ["mobile", "BYOD"]
            recommendation: "Use FIPS 140-2 validated encryption"
```

---

## Optional Fields

### 8. `adherence` (#Adherence)

Defines how the policy is evaluated and enforced.

**Components:**
- `evaluation-methods` - How compliance is assessed
- `assessment-plans` - Specific evaluation procedures
- `enforcement-methods` - How compliance is ensured
- `non-compliance` - Consequences of violations

#### Evaluation Methods (#AcceptedMethod):

```yaml
adherence:
  evaluation-methods:
    - type: manual
      description: "Quarterly access reviews"
      executor:
        id: security-team
        name: "Security Team"
        type: Human
    - type: automated
      description: "Daily automated scans"
      executor:
        id: scanner
        name: "Vulnerability Scanner"
        type: Software
    - type: behavioral
      description: "Runtime monitoring"
    - type: autoremediation
      description: "Automatic fixing"
    - type: gate
      description: "Block non-compliant deployments"
```

#### Assessment Plans (#AssessmentPlan):

```yaml
adherence:
  assessment-plans:
    - id: "assess-mfa-enrollment"
      requirement-id: "mfa-req-001"
      frequency: "daily"
      evaluation-methods:
        - type: automated
          description: "Check MFA enrollment rate"
      evidence-requirements: "MFA enrollment ≥99%"
      parameters:
        - id: "min-rate"
          label: "Minimum Enrollment Rate"
          description: "Required MFA enrollment percentage"
          accepted-values: ["99%", "100%"]
```

#### Non-Compliance:

```yaml
adherence:
  non-compliance: |
    CRITICAL: Immediate system isolation + CISO notification
    HIGH: 30-day remediation deadline
    MEDIUM: 90-day remediation deadline
```

### 9. `implementation-plan` (#ImplementationPlan)

Timeline for policy rollout and enforcement.

```yaml
implementation-plan:
  notification-process: "All users notified 90 days before enforcement"
  evaluation-timeline:
    start: "2026-03-01T00:00:00Z"
    end: "2026-12-31T23:59:59Z"
    notes: "Baseline assessment period"
  enforcement-timeline:
    start: "2026-06-01T00:00:00Z"
    notes: "Full enforcement begins; non-compliant systems blocked"
```

### 10. `risks` (#Risks)

Documents mitigated and accepted risks.

#### Mitigated Risks:

```yaml
risks:
  mitigated:
    - reference-id: "threat-catalog-001"
      entries:
        - reference-id: "MITM-attack"
        - reference-id: "credential-theft"
```

#### Accepted Risks:

```yaml
risks:
  accepted:
    - risk:
        reference-id: "threat-catalog-001"
        entry-id: "legacy-system-vulnerability"
      scope:
        technologies:
          - "Legacy Mainframe"
      justification: "System scheduled for decommission in 6 months; compensating controls in place (network segmentation, enhanced monitoring)"
```

---

## Complete Example

See `examples/layer3-encryption-policy-official.yaml` and `examples/layer3-access-control-mfa-official.yaml` for complete, validated policy examples.

---

## Validation

Policies can be validated using the official CUE schemas:

```bash
# Install CUE
go install cuelang.org/go/cmd/cue@latest

# Validate a policy
cue vet -d '#Policy' policy.yaml layer-3.cue
```

---

## Layer 2 Control Catalog Structure

### Required Fields for Catalog

```yaml
title: string                      # Catalog title
metadata: #Metadata                # Catalog metadata
```

### Optional Fields

```yaml
families: [#Family]                # Control families
controls: [#Control]               # Control definitions
imported-controls: [#MultiEntryMapping]  # External controls
```

### Family Structure (#Family)

```yaml
id: string                         # REQUIRED: Unique family ID
title: string                      # REQUIRED: Family title
description: string                # OPTIONAL: Family description
```

### Control Structure (#Control)

```yaml
id: string                         # REQUIRED: Unique ID
title: string                      # REQUIRED: Control title
objective: string                  # REQUIRED: What it achieves
family: string                     # REQUIRED: Family reference
assessment-requirements:           # REQUIRED: Verification steps
  - id: string
    text: string                   # MUST condition
    applicability: [string]        # When it applies
    recommendation: string         # Optional guidance
guideline-mappings:                # OPTIONAL: Layer 1 links
  - reference-id: string
    entries:
      - reference-id: string
        strength: 1-10             # 1=weak, 10=strong
        remarks: string
threat-mappings:                   # OPTIONAL: Threat links
  - reference-id: string
    entries:
      - reference-id: string
```

---

## Layer 1 Guidance Document Structure

### Required Fields

```yaml
title: string                      # Document title
metadata: #Metadata                # Document metadata
document-type: string              # Type of document
```

**Document Types:**
- `Standard`
- `Regulation`
- `Best Practice`
- `Framework`

### Optional Fields

```yaml
front-matter: string               # Introductory text or preamble
families: [#Family]                # Organization structure (control families)
guidelines: [#GuidanceItem]        # Specific guidance entries
```

### Guidance Item Structure (#GuidanceItem)

```yaml
id: string                         # REQUIRED: Unique ID
family: string                     # REQUIRED: Family reference
title: string                      # REQUIRED: Guideline title
objective: string                  # REQUIRED: What it achieves
rationale:                         # OPTIONAL: Justification
  importance: string
  goals: [string]
statements:                        # OPTIONAL: Detailed guidance
  - id: string
    title: string
    text: string
    recommendations: [string]
guideline-mappings:                # OPTIONAL: Cross-references
  - reference-id: string
    entries:
      - reference-id: string
        strength: 1-10             # 1=weak, 10=strong
        remarks: string
see-also: [string]                 # OPTIONAL: Related guidelines
```

---

## Common Types

### #Actor

```yaml
id: string
name: string
type: "Human" | "Software" | "Software-Assisted"
version: string                    # Optional
description: string                # Optional
uri: string                        # Optional
contact: #Contact                  # Optional
```

### #Contact

```yaml
name: string
affiliation: string                # Optional
email: #Email                      # Optional
primary: boolean                   # Optional
```

### #Date and #Datetime

- `#Date`: ISO 8601 date (YYYY-MM-DD)
- `#Datetime`: ISO 8601 datetime with timezone (2026-01-15T14:30:00Z)

---

## Important Notes

### Schema Source

This documentation is based on the **official test data** from the Gemara repository, specifically:
- Layer 1: `test-data/good-aigf.yaml` (AI Governance Framework)
- Layer 2: `test-data/good-ccc.yaml` (Cloud Control Catalog) and `test-data/good-osps.yml` (Open Source Project Security)
- Layer 3: `test-data/good-policy.yaml` (Information Security Policy)

### Schema Status

The Gemara schema is marked as **experimental** and may change without notice. Always refer to the official repository for the latest schema definitions:

- **Repository:** https://github.com/gemaraproj/gemara
- **Documentation:** https://gemara.openssf.org
- **Schemas:** https://github.com/gemaraproj/gemara/tree/main (*.cue files)
- **Test Data:** https://github.com/gemaraproj/gemara/tree/main/test-data

### Tool Compatibility

**Note:** Some Gemara tools (including `gemara-mcp-server`) may use different or older schema versions. Always verify which schema version a tool expects before creating artifacts.

The official schema is the authoritative source and should be used for:
- New policy development
- Training and education
- Long-term artifact storage
- Interoperability with other Gemara tools

### Migration Path

If you have existing policies in a different format:
1. Review the official schema structure above
2. Map your existing fields to official schema fields
3. Use constraints and assessment-requirement-modifications for custom requirements
4. Validate against official CUE schemas
5. Test with multiple Gemara-compatible tools

---

## Additional Resources

- **CUE Language:** https://cuelang.org/
- **Go SDK:** https://pkg.go.dev/github.com/gemaraproj/go-gemara
- **OpenSSF Gemara:** https://openssf.org/
- **Community:** OpenSSF Slack #gemara channel

---

*Last updated: 2026-02-10*
*Schema version: v0.17.0-dev*
*Source: github.com/gemaraproj/gemara test-data files*
