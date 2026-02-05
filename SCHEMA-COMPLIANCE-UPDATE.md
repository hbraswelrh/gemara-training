# Gemara Schema Compliance Update

**Date:** 2026-02-05
**Status:** ✅ COMPLETED
**Impact:** Training materials now comply with official Gemara schema

---

## Summary

The training content has been updated to match the **official Gemara schema** from [github.com/gemaraproj/gemara](https://github.com/gemaraproj/gemara) (v0.17.0-dev).

Previous training materials used an unofficial/custom schema format that did not match the authoritative source. This has been corrected.

---

## What Changed

### ✅ Updated Files

1. **`docs/schema-reference.md`**
   - Complete rewrite to match official Layer 3 schema
   - Added detailed field documentation
   - Included validation instructions
   - Added tool compatibility notes

2. **`examples/layer3-encryption-policy-official.yaml`** (NEW)
   - Healthcare encryption-in-transit policy
   - Full schema compliance
   - Demonstrates all required and optional fields
   - Production-ready example with HIPAA/NIST mappings

3. **`examples/layer3-access-control-mfa-official.yaml`** (NEW)
   - Financial services MFA policy
   - Full schema compliance
   - Shows complex adherence requirements
   - PCI-DSS/NIST-800-63B/SOC2 mappings

### ❌ Deprecated Files

These files use the old/incorrect schema and should **NOT** be used as examples:

- `example-encryption-policy.yaml` (incorrect schema)
- Any policies in `gemara-mcp-server/artifacts/layer3/` created before this update

---

## Schema Differences

### Old Schema (INCORRECT - Do Not Use)

```yaml
# ❌ This was our training content before - WRONG!
policy-statement:
  purpose: "..."
  scope:
    applies-to: ["..."]
  requirements:
    - id: req-001
      text: "..."
      priority: critical
      enforcement: mandatory
  exceptions:
    process: "..."
risk-context:
  threats-addressed: ["..."]
  business-impact-if-not-followed: ["..."]
compliance-mappings:
  - framework: "HIPAA"
    requirements: ["..."]
derived-from-controls:
  - layer: 2
    control-id: "ctrl-001"
```

### Official Schema (CORRECT - Use This)

```yaml
# ✅ Official Gemara Layer 3 schema - CORRECT!
title: "Policy Title"
metadata:
  id: "policy-001"
  description: "..."
  author:
    id: team-id
    name: "Team Name"
    type: Human
contacts:
  responsible: [...]
  accountable: [...]
scope:
  in:
    technologies: ["..."]
    geopolitical: ["..."]
    sensitivity: ["..."]
  out:
    technologies: ["..."]
imports:
  catalogs:
    - reference-id: "catalog-id"
      constraints:
        - id: "constraint-001"
          target-id: "CTRL-001"
          text: "Requirement text"
  guidance:
    - reference-id: "guidance-doc-id"
      constraints: [...]
adherence:
  evaluation-methods: [...]
  assessment-plans: [...]
  enforcement-methods: [...]
  non-compliance: "..."
implementation-plan:
  notification-process: "..."
  evaluation-timeline: {...}
  enforcement-timeline: {...}
risks:
  mitigated: [...]
  accepted: [...]
```

---

## Key Concept Changes

| Old Concept | New Official Concept |
|------------|---------------------|
| `policy-statement` top-level section | Use `title` + `metadata.description` |
| `requirements` list | Use `imports.catalogs` with `constraints` |
| `exceptions` section | Part of `adherence` structure |
| `risk-context` section | Use `risks.mitigated` and `risks.accepted` |
| `compliance-mappings` | Use `imports.guidance` with framework references |
| `derived-from-controls` | Use `imports.catalogs` referencing control catalogs |
| `enforcement` field on requirements | Use `adherence.enforcement-methods` |
| `roles-and-responsibilities` | Use `contacts` (RACI framework) |

---

## How to Write Requirements Now

### ❌ Old Way (Don't Use)

```yaml
requirements:
  - id: req-encrypt-001
    text: "All web applications MUST enforce TLS 1.2+"
    priority: critical
    enforcement: mandatory
```

### ✅ New Way (Official Schema)

```yaml
imports:
  catalogs:
    - reference-id: "internal-controls-catalog"
      constraints:
        - id: "encrypt-web-apps"
          target-id: "CTRL-ENCRYPT-001"  # References a Layer 2 control
          text: "All web applications MUST enforce TLS 1.2 or higher"
```

**Then add assessment and enforcement:**

```yaml
adherence:
  assessment-plans:
    - id: "assess-tls"
      requirement-id: "encrypt-web-apps"
      frequency: "weekly"
      evaluation-methods:
        - type: automated
          description: "SSL Labs scan"

  enforcement-methods:
    - type: gate
      description: "CI/CD blocks deployment if TLS < 1.2"
```

---

## Tool Compatibility Note

### ⚠️ Important: gemara-mcp-server Uses Different Schema

The `gemara-mcp-server` currently uses a **forked/different schema** (from `github.com/sonupreetam/mcp-layers-research`) that does NOT match the official Gemara schema.

**MCP Server Schema (Non-Standard):**
- Uses `organization-id`, `purpose`, `guidance-references`, `control-references`
- Different structure from official schema
- May not validate with official CUE schemas

**Recommendation:**
- **For training:** Learn the official schema (what we teach now)
- **For MCP server:** Be aware it uses a different format
- **Long term:** MCP server should migrate to official schema

**Tracking:**
- MCP server schema: `github.com/sonupreetam/mcp-layers-research`
- Official schema: `github.com/gemaraproj/gemara`

---

## Migration Path for Existing Policies

If you have policies in the old format:

### Step 1: Map Top-Level Fields

| Old Field | New Location |
|-----------|-------------|
| `policy-statement.purpose` | `metadata.description` |
| `policy-statement.scope.applies-to` | `scope.in.*` dimensions |
| `policy-statement.requirements` | `imports.catalogs` + `constraints` |
| `policy-statement.exceptions` | Document in `adherence.non-compliance` |
| `risk-context` | `risks` section |
| `compliance-mappings` | `imports.guidance` |
| `derived-from-controls` | `imports.catalogs.reference-id` |
| `enforcement.*` | `adherence.enforcement-methods` |

### Step 2: Restructure Requirements

Old requirements become catalog constraints:

```yaml
# Old
requirements:
  - id: req-001
    text: "Users MUST use MFA"

# New
imports:
  catalogs:
    - reference-id: "iam-controls"
      constraints:
        - id: "mfa-requirement"
          target-id: "IAM-MFA-001"
          text: "Users MUST use multi-factor authentication"
```

### Step 3: Add RACI Contacts

```yaml
contacts:
  responsible:
    - name: "IT Director"
      primary: true
      affiliation: "IT"
      email: "it@company.com"
  accountable:
    - name: "CISO"
      primary: true
      affiliation: "Security"
      email: "ciso@company.com"
```

### Step 4: Structure Adherence

```yaml
adherence:
  evaluation-methods:
    - type: automated
      description: "Daily MFA enrollment scan"

  assessment-plans:
    - id: "check-mfa"
      requirement-id: "mfa-requirement"
      frequency: "daily"
      evaluation-methods:
        - type: automated

  enforcement-methods:
    - type: gate
      description: "Block login without MFA"

  non-compliance: |
    Accounts without MFA are suspended after 7-day grace period.
```

### Step 5: Validate

```bash
cue vet -d '#Policy' your-policy.yaml layer-3.cue
```

---

## Training Content Status

### ✅ Compliant

- `docs/schema-reference.md` - Fully updated
- `examples/layer3-encryption-policy-official.yaml` - Official schema
- `examples/layer3-access-control-mfa-official.yaml` - Official schema

### 🔄 Needs Update (Future Work)

- `src/web/js/modules.js` - Training module content
- Exercise prompts and examples
- Quiz questions referencing schema fields
- Demo YAML snippets in training UI

### ⚠️ Non-Compliant (Don't Use)

- `example-encryption-policy.yaml` - Old schema
- Previous demo files

---

## Next Steps

1. ✅ **DONE:** Create official schema-compliant examples
2. ✅ **DONE:** Update schema reference documentation
3. 🔄 **TODO:** Update training modules (Module 3) to teach official schema
4. 🔄 **TODO:** Update exercise prompts to reference correct fields
5. 🔄 **TODO:** Update quiz questions to test official schema knowledge
6. 🔄 **TODO:** Add schema version notes to training introduction

---

## Validation

All new example policies have been validated against the structure defined in:
- `https://github.com/gemaraproj/gemara/blob/main/layer-3.cue`

Manual validation confirms:
- ✅ All required fields present
- ✅ Correct field types
- ✅ Proper nesting structure
- ✅ Valid references format
- ✅ Compliant datetime formats

---

## References

- **Official Schema:** https://github.com/gemaraproj/gemara
- **Documentation:** https://gemara.openssf.org
- **CUE Language:** https://cuelang.org
- **OpenSSF:** https://openssf.org

---

*This update ensures our training materials teach the authoritative, community-standard Gemara schema used across the OpenSSF ecosystem.*
