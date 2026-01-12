# Gemara Schema Compliance Update Summary

## Overview

All YAML examples throughout the training course have been updated to comply with the official Gemara schemas from https://github.com/ossf/gemara/tree/main/schemas.

## Changes Made

### 1. Web Interface Examples (`src/web/js/modules.js`)

#### Module 2: Layer 1 Guidance Example (Lines 356-388)
**Before:**
- Used incorrect fields: `version`, `type`, `id` at root level
- Flat metadata structure

**After:**
- Proper Layer 1 structure with:
  - `title` (required)
  - `metadata` with complete author information
  - `document-type` ("Framework")
  - `families` and `guidelines` arrays
  - Proper `mapping-references` structure

#### Module 2: Layer 2 Control Catalog Example (Lines 404-445)
**Before:**
- Individual control artifact with `derived_from`, `threat_context`, etc.

**After:**
- Complete catalog structure with:
  - `title` (required)
  - `metadata` with author details
  - `families` array
  - `controls` array with proper assessment-requirements
  - `threats` array
  - Correct `guideline-mappings` and `threat-mappings` structure

#### Module 3: Layer 3 Policy Example (Lines 665-807)
**Before:**
```yaml
version: "1.0"
type: layer3-policy
id: pol-iam-mfa-001
policy_statement: >
  All employees must use MFA...
requirements:
  - id: "req-001"
    description: "..."
derived_from_controls:
  - control_id: ctrl-iam-mfa-001
```

**After:**
```yaml
metadata:
  id: "mfa-policy-001"
  description: "..."
  author: {...}
  version: "1.0.0"
  date: {...}
  mapping-references: [...]
  draft: false
title: "Multi-Factor Authentication Policy"
purpose: "Require multi-factor authentication..."
contacts:
  responsible: [...]
  accountable: [...]
  consulted: [...]
  informed: [...]
scope:
  in:
    technologies: [...]
    user-roles: [...]
  out:
    technologies: [...]
imports:
  catalogs: [...]
adherence:
  evaluation-methods: [...]
  enforcement-methods: [...]
  non-compliance: "..."
implementation-plan:
  notification-processes: [...]
  evaluation-timeline: {...}
risks:
  mitigated: [...]
  accepted: [...]
```

### 2. CLI Tool Templates (`cmd/gemara-trainer/main.go`)

Updated all 6 policy templates to use correct schema:

#### `getMFATemplate()` (Lines 618-670)
- ✅ Removed: `version`, `type`, `policy_statement`, `requirements`, `derived_from_controls`
- ✅ Added: `purpose`, `contacts` (RACI), `scope` (in/out), `imports`, `adherence`

#### `getPasswordTemplate()` (Lines 672-721)
- ✅ Simplified template with correct field names
- ✅ Added proper RACI contacts structure
- ✅ Replaced `requirements` with `adherence`

#### `getEncryptionTemplate()` (Lines 723-774)
- ✅ Added data-sensitivity scope
- ✅ Proper adherence structure with evaluation and enforcement methods

#### `getAccessControlTemplate()` (Lines 776-827)
- ✅ Complete RACI contacts
- ✅ Proper scope structure with in/out dimensions

#### `getIncidentResponseTemplate()` (Lines 829-880)
- ✅ Security operations focused contacts
- ✅ Adherence includes incident response drills

#### `getBackupTemplate()` (Lines 882-934)
- ✅ Business continuity focused
- ✅ Recovery testing in adherence plans

## Key Schema Differences

### Fields REMOVED (Not in Official Schema)
- ❌ `version` (at root level)
- ❌ `type` (at root level)
- ❌ `policy_statement`
- ❌ `requirements` (as a top-level array)
- ❌ `derived_from_controls`
- ❌ `exceptions` (as top-level field)
- ❌ `risk_context` (as top-level field)
- ❌ `enforcement` (as top-level field)
- ❌ `compliance_mappings` (at root level)

### Fields ADDED (Required by Official Schema)
- ✅ `purpose` - Replaces `policy_statement`
- ✅ `contacts` - RACI framework (responsible, accountable, consulted, informed)
- ✅ `scope` - in/out structure with dimensions (technologies, geopolitical, data-sensitivity, user-roles, groups)
- ✅ `imports` - References to policies, catalogs, and guidance
- ✅ `adherence` - evaluation-methods, assessment-plans, enforcement-methods, non-compliance
- ✅ `metadata.author` - Complete author object with id, name, type, contact
- ✅ `metadata.mapping-references` - External framework references
- ✅ `implementation-plan` - Optional: notification-processes, timelines
- ✅ `risks` - Optional: mitigated and accepted risks

## Validation

All updated templates can now be validated using:

```bash
# Using gemara-mcp-server (if installed)
"Validate this Layer 3 policy using validate_gemara_yaml"

# Or using the official CUE validator
cue vet policy.yaml layer-3.cue
```

## Documentation References

- **Official Schemas**: https://github.com/ossf/gemara/tree/main/schemas
  - `layer-1.cue` - Guidance documents
  - `layer-2.cue` - Control catalogs
  - `layer-3.cue` - Organizational policies
  - `metadata.cue` - Metadata structure

- **Test Examples**: https://github.com/ossf/gemara/tree/main/test-data
  - `good-policy.yaml` - Valid Layer 3 example

- **Course Documentation**:
  - `docs/schema-reference.md` - Complete schema documentation
  - `docs/correct-examples.yaml` - Schema-compliant examples

## Benefits of Schema Compliance

1. **Validation** - Examples can now be validated against official schemas
2. **Tool Compatibility** - Compatible with gemara-mcp-server and other Gemara tools
3. **Traceability** - Proper imports and mappings create audit trails
4. **Standardization** - Follows community standards
5. **Education** - Students learn the correct schema from the start

## Testing

The updated examples have been:
- ✅ Built successfully (Go binary compiles)
- ✅ Formatted correctly (YAML syntax valid)
- ✅ Aligned with official schemas (field names and structure match)

Students can now learn to write Gemara policies using the actual, official schema structure.
