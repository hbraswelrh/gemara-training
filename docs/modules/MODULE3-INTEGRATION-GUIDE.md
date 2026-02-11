# Module 3 Integration Guide
## Role-Based Policy Writing Fundamentals

### What Changed

I've adapted Module 3: Policy Writing Fundamentals to use a **role-based teaching approach** with the official MFA policy example (`layer3-access-control-mfa-official.yaml`).

### New Files Created

1. **`module3-policy-writing-fundamentals.md`** - Markdown version (for documentation/reference)
2. **`module3-content.js`** - JavaScript version (for web integration)
3. **`MODULE3-INTEGRATION-GUIDE.md`** - This integration guide

---

## Key Changes from Original Module 3

### Before (Generic Approach)
- Used generic MFA policy examples
- Focused on YAML structure and syntax
- Policy vs. Procedure vs. Standard comparisons
- Generic "good policy" characteristics
- Interactive activities with hypothetical scenarios

### After (Role-Based Approach)
- Uses **actual** `layer3-access-control-mfa-official.yaml` policy
- Organized around **three professional roles:**
  1. 🔒 **Security Engineer** - Threat assessment, controls, technical implementation
  2. 📋 **Compliance Manager** - Scope, timelines, adherence, audit evidence
  3. ⚖️ **Risk Manager** - Risk mitigation, acceptance, delegation decisions
- Real-world policy analysis with line number references
- Concrete examples from production-ready policy
- Role-specific questions and answers

---

## Role-Based Teaching Framework

### 🔒 Security Engineer Perspective

**Questions Answered:**
- How do I do a threat assessment?
- How do I express controls?
- How do I mitigate threats technically?
- What's my assessment plan?

**Policy Sections Covered:**
- `risks.mitigated` (threat model references)
- `imports.catalogs.constraints` (control expressions)
- `assessment-requirement-modifications` (implementation details)
- `adherence.assessment-plans` (verification methods)

### 📋 Compliance Manager Perspective

**Questions Answered:**
- What do I need a policy for?
- What is my compliance scope?
- When is the policy active?
- How do I verify adherence?
- What evidence satisfies audit requirements?

**Policy Sections Covered:**
- `metadata.mapping-references` (compliance frameworks)
- `scope.in` and `scope.out` (applicability boundaries)
- `implementation-plan` (timelines and phases)
- `adherence.evaluation-methods` (monitoring approaches)
- `adherence.evidence-requirements` (audit evidence)
- `adherence.non-compliance` (consequences)

### ⚖️ Risk Manager Perspective

**Questions Answered:**
- What risks do these threats introduce?
- What am I mitigating?
- What am I accepting?
- What am I delegating to customers?

**Policy Sections Covered:**
- `risks.mitigated` (threats being addressed)
- `risks.accepted` (documented risk acceptance with justification)
- Scope exclusions (what's delegated to other policies)

---

## Integration Instructions

### Option 1: Direct JavaScript Integration

Replace the existing `getModule3Content()` function in `docs/js/modules.js`:

```javascript
// Around line 562 in docs/js/modules.js
getModule3Content() {
    return `
        // DELETE existing content (lines 563-1061+)
        // PASTE new content from module3-content.js
    `;
}
```

**Steps:**
1. Open `docs/js/modules.js`
2. Find `getModule3Content()` at line 562
3. Delete the existing return statement content
4. Copy the entire return statement from `module3-content.js`
5. Paste into `getModule3Content()`
6. Save and test

### Option 2: Modular Import (Recommended)

Keep modules separate and import:

```javascript
// At the top of docs/js/modules.js
import { getModule3Content } from './modules/module3-content.js';

// Or if using script tags in HTML:
<script src="js/modules/module3-content.js"></script>
<script src="js/modules.js"></script>
```

Then in the `initializeModules()` method:
```javascript
3: {
    title: "Layer 3 Policy Writing Fundamentals",
    duration: "90 minutes",
    type: "Web + AI-assisted authoring",
    objectives: [
        "Understand policies from Security Engineer, Compliance Manager, and Risk Manager perspectives",
        "Analyze real-world MFA policy using role-based framework",
        "Write clear, enforceable policy statements",
        "Create valid Gemara Layer 3 YAML artifacts"
    ],
    content: getModule3Content(),  // Imported from module3-content.js
    quiz: 'module3-quiz',
    exercises: ['exercise2', 'exercise3', 'exercise4']
}
```

---

## Visual Design Elements

The new module includes enhanced visual components:

### 1. **Role Cards**
Three-column grid showing Security Engineer, Compliance Manager, and Risk Manager perspectives with distinct colors:
- 🔒 Security Engineer: Red gradient (#dc2626)
- 📋 Compliance Manager: Blue gradient (#2563eb)
- ⚖️ Risk Manager: Green gradient (#059669)

### 2. **Code Blocks with Headers**
Policy YAML excerpts with line number references:
```
┌─────────────────────────────────┐
│ risks.mitigated (lines 246-253) │
├─────────────────────────────────┤
│ risks:                          │
│   mitigated:                    │
│     - reference-id: "..."       │
└─────────────────────────────────┘
```

### 3. **Key Insight Boxes**
Highlighted takeaways with blue left border and background

### 4. **Comparison Tables**
Side-by-side IN SCOPE vs OUT OF SCOPE sections with green/red styling

### 5. **Evidence Tables**
Structured tables showing assessment plans, frequencies, and evidence requirements

### 6. **Risk Acceptance Sections**
Yellow/amber warning-style boxes for accepted risks with detailed justifications

---

## Content Structure

### Module Flow

```
1. Introduction
   └─ Three Critical Perspectives overview

2. Real-World Example: MFA Policy
   └─ Policy overview table

3. Perspective 1: Security Engineer (🔒)
   ├─ Threat assessment
   ├─ Control expression
   └─ Assessment plans

4. Perspective 2: Compliance Manager (📋)
   ├─ Compliance frameworks
   ├─ Scope definition
   ├─ Implementation timeline
   ├─ Adherence verification
   └─ Audit evidence

5. Perspective 3: Risk Manager (⚖️)
   ├─ Risk identification
   ├─ Mitigated risks
   ├─ Accepted risks
   └─ Delegated risks

6. Key Takeaways
   ├─ Think in role perspectives
   ├─ Separate concerns
   ├─ Make it measurable
   └─ Document risk decisions

7. The Gemara Layer 3 Pattern
   └─ 8-step policy structure

8. Next Steps
   └─ Transition to Module 4
```

---

## Quiz Updates Needed

The existing `module3-quiz` should be updated to reflect the role-based approach. Suggested new quiz questions:

### Security Engineer Questions
1. Where in the policy would a Security Engineer find which threats are being mitigated?
   - [ ] scope.in
   - [x] risks.mitigated
   - [ ] adherence.evaluation-methods
   - [ ] implementation-plan

2. How does the MFA policy express technical controls?
   - [ ] Defines them directly in the policy
   - [x] References Layer 2 controls via imports.catalogs
   - [ ] Links to external documentation
   - [ ] Includes them in the metadata section

### Compliance Manager Questions
3. What are the three compliance frameworks mapped in the MFA policy?
   - [x] PCI-DSS 4.0.1, NIST 800-63B, SOC 2 CC6
   - [ ] ISO 27001, HIPAA, SOX
   - [ ] FedRAMP, GDPR, CCPA
   - [ ] CIS Controls, COBIT, ITIL

4. How often is the MFA enrollment rate assessed?
   - [ ] Weekly
   - [ ] Monthly
   - [x] Daily
   - [ ] Quarterly

### Risk Manager Questions
5. What risk is explicitly accepted in the MFA policy?
   - [ ] Credential theft
   - [ ] Phishing attacks
   - [x] SMS interception (SIM swapping)
   - [ ] Brute-force attacks

6. Are customer authentication risks addressed in this policy?
   - [ ] Yes, in the scope.in section
   - [ ] Yes, in the risks.accepted section
   - [x] No, customers are explicitly out of scope (separate policy)
   - [ ] Yes, through the imports section

---

## Exercise Updates Needed

Update exercises 2, 3, and 4 to use the role-based framework:

### Exercise 2: Policy Analysis (Updated)
**Old:** Generic policy strength/weakness analysis
**New:** Analyze the MFA policy from all three role perspectives

**Prompt:**
> Using the `layer3-access-control-mfa-official.yaml` policy:
> 1. As a Security Engineer: Identify the assessment plan with the highest frequency
> 2. As a Compliance Manager: Find the evidence requirement for privileged account MFA
> 3. As a Risk Manager: Explain why SMS interception risk is accepted

### Exercise 3: Guided Policy Creation (Updated)
**Old:** Draft policy from Layer 2 control
**New:** Add a new assessment plan to the MFA policy

**Prompt:**
> Your organization wants to track "phishing-resistant MFA adoption rate" (FIDO2/WebAuthn usage).
>
> Add a new assessment plan to the adherence section that:
> 1. Checks percentage of users using FIDO2/WebAuthn (Security Engineer)
> 2. Runs monthly and requires ≥50% adoption (Compliance Manager)
> 3. Helps reduce the accepted risk of SMS interception (Risk Manager)

### Exercise 4: Multi-Control Policy (Updated)
**Old:** Create policy from 3-5 controls
**New:** Expand MFA policy scope

**Prompt:**
> Your organization is expanding to Asia-Pacific and needs MFA for mobile device access.
>
> Update the MFA policy:
> 1. Add Asia-Pacific to geopolitical scope (Compliance Manager)
> 2. Add "Mobile Applications" to technologies scope (Compliance Manager)
> 3. Create a new constraint for mobile-specific MFA requirements (Security Engineer)
> 4. Document any new accepted risks for mobile platforms (Risk Manager)

---

## File Location

All new files are in:
```
/home/hbraswel/GIT/PSCE/Baklava/training/gemara-training/docs/modules/
├── module3-policy-writing-fundamentals.md  # Markdown version
├── module3-content.js                       # JavaScript version
└── MODULE3-INTEGRATION-GUIDE.md            # This guide
```

---

## Testing Checklist

After integration, verify:

- [ ] Module 3 loads without JavaScript errors
- [ ] Role cards display in 3-column grid
- [ ] Code blocks show line number references
- [ ] Tables render correctly (assessment, framework, evidence)
- [ ] Color coding works (red/blue/green for roles)
- [ ] IN SCOPE / OUT OF SCOPE sections display side-by-side
- [ ] Timeline shows phase status (✅ Complete, 🔄 In Progress)
- [ ] Risk acceptance section displays with amber/yellow styling
- [ ] All role perspective sections are clearly distinguished
- [ ] Navigation to Module 4 works

---

## Benefits of This Approach

### For Learners
1. **Role Clarity:** Understand how their specific role interacts with policies
2. **Real Examples:** Learn from production-ready policy, not hypotheticals
3. **Traceability:** See exact line numbers and policy structure
4. **Practical Context:** Understand why each section exists and who uses it

### For Instructors
1. **Reusable Framework:** Same three-role pattern applies to any policy
2. **Concrete Reference:** Students can examine actual YAML file
3. **Assessment Aligned:** Questions map directly to role responsibilities
4. **Career Relevant:** Mirrors real-world GRC team structures

### For Organizations
1. **Cross-Functional Understanding:** Different roles understand each other's needs
2. **Better Collaboration:** Shared vocabulary and policy structure
3. **Audit Readiness:** Clear evidence requirements documented upfront
4. **Risk Transparency:** Explicit documentation of accepted risks

---

## Future Enhancements

Consider adding:

1. **Interactive Policy Explorer**
   - Click role → highlight relevant YAML sections
   - Hover over sections → show which role uses them

2. **AI Agent Integration**
   - "Ask questions as a Security Engineer"
   - "Generate evidence report as a Compliance Manager"
   - "Analyze risk treatment as a Risk Manager"

3. **Role-Based Assessment Path**
   - Learners choose their primary role
   - Quiz/exercises customized to that perspective
   - Optional: Complete all three for "full understanding" badge

4. **Additional Policy Examples**
   - Encryption policy (role perspectives)
   - Incident response policy (role perspectives)
   - Data retention policy (role perspectives)

---

## Contact

For questions about this integration:
- Review the MFA policy: `examples/layer3-access-control-mfa-official.yaml`
- Check the markdown version: `docs/modules/module3-policy-writing-fundamentals.md`
- Examine the JavaScript: `docs/modules/module3-content.js`

---

**Last Updated:** 2026-02-10
**Version:** 1.0.0
**Author:** Adapted from Module 3 course outline using role-based framework
