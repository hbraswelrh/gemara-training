# Personas for Gemara Policy Writing

**Risk appetite** is defined as the level of risk an organization is willing to accept in pursuit of its objectives.

## Goals

1. Understand how to express compliance activities and their outputs in a policy
2. Understand how to modify threat-informed controls based on scope and risk appetite (e.g., high-privilege accounts in AWS need a different review cycle than standard privileged accounts)
3. Write a policy that aligns with what is required to meet organizational goals and to _get your job done_

<!-- TODO: add reason for referencing `.` -->

## Security Engineer (Jasmine)

Jasmine's mission is to build the technical wall. She starts with the Threat Assessment. She needs to know what she is fighting before she can build. 

> OpenSSF [persona](https://github.com/ossf/toolbelt/blob/main/personas/securityengineer.md)

1. **How do I do a threat assessment?** 
   * Jasmine looks at the `imports` and `risks` fields of the policy. The CIS AWS Foundations guidance is imported and she identifies common threats like "Unauthorized S3 Access."
   * Jasmine can use the `MITRE ATT&CK Matrix` and filters for the "Financial Services" threat profile. She identifies T1567 (Exfiltration Over Web Service) as a high-probability threat. She uses the `imports.guidance` field to link this technique directly to her policy. By doing this, her "Threat Assessment" isn't just a list of fears; it's a mapping to a globally recognized library of adversary behaviors.
2. **How do I mitigate the threats and express controls?**
   * Jasmine looks at the adherence section of the policy where the `enforcement-methods` are defined. She expresses her control method as `autoremediation` "Auto-encrypt S3 buckets upon creation." This technical requirement is linked back to the policy `title` to ensure her engineering work is backed with legal reasoning. 

## Compliance Manager (Dominic)

Dominic cares about following the rules and proving it. He doesn't care about the code as much as the boundary and the timeline.

> OpenSSF [persona](https://github.com/ossf/toolbelt/blob/main/personas/dataoperationspractitioner.md#name-grear-grc-data-governance-analyst)

1. **What do I need a policy for?** 
   * Dominic looks at the metadata ID "POL-SEC-2024-001." This is his "North Star" for the upcoming audit.
2. **What is my compliance scope?**
   * He checks out the `scope` block in the policy. 
     * **Included:** `scope.in` is the PII data in AWS
     * **Excluded:** `scope.out` is the Legacy Mainframe, This saves him from auditing systems that aren't ready or applicable.  
3. **When is the policy active?** - Implementation Plan
   * Dominic checks out the `implementation-plan` block in the policy. The `evaluation-timeline` tells him that he has until June 30th to find gaps, and the `enforcement-timeline` tells him the "law" goes into full effect on July 1st.
   * Dominic alignment under `adherence.assessment-plans.evidence-requirements`, he no longer just asks for a "config screenshot." Instead, he requires Telemetry Logs showing than an automated attack simulation (e.g., Atomic Red Team) failed to execute a MITRE-specific technique. The evidence is now "Proof of Control Efficacy" rather than just "Proof of Control Existence."
4. **How do I verify those subject to the policy adherence to it?** - adherence 
      * Dominic reviews the `adherence.assessment-plans` block of the policy. He sees that for requirement `REQ-ENC-01`, there is a `frequency: monthly` check. 
5. **What type of evidence satisfies the audit requirements?**
   * He finds his answer in `evidence-requirements:` "Screenshot of AWS KMS console showing last rotation date." 

## Risk Manager (Tina)

* Tina balances the cost of security against the cost of a breach. Tina looks at the policy to see how the company is handling its "residual debt."

> OpenSSF [persona](https://github.com/ossf/toolbelt/blob/main/personas/securityengineer.md#name-finn-the-finder)

1. **What risks do these threats introduce into my environment?** Risks, 
   * She looks at `risks.mitigated` list. Each of the entries represents a threat (like `THREAT-001`) that the Security Engineer (Jasmine) has successfully neutralized.
2. **What am I mitigating? What am I accepting? What am I delegating to a customer?** Risks.mitigated, Risks, accepted AcceptedRisk 
   * The policy shows that Tina is mitigating "Unauthorized Access" via the new encryption controls.
     * **Accepting:** She spots an entry in `risks.accepted`, The "Legacy-VPC-Mainframe" **cannot** be encrypted. Under `justification`, she reads: "Legacy system does not support TLS 1.3." She signs off on this, knowing the risk is documented and visible.
   * **The Alignment:** When Tina looks at the `risks.mitigated`, she sees `MITRE-T1027`. She can explain to stakeholders, "We are specifically mitigating the risk of adversaries using tampered-with files to bypass our scanners." This makes her `risks.accepted` section much more defensible; she can prove that while she accepted some risks, she has covered the most "popular" techniques used by modern hackers.
   * **What am I delegating?** While the schema focuses on internal policy, she uses the `import.catalogs` block in the policy (NIST-SP-800-53) to see which controls are "Shared Responsibility" with the cloud provider.


## Summary

| Persona            | Question                    | Schema Field                                       |
|--------------------|-----------------------------|----------------------------------------------------|
| Security Engineer  | How to express controls?    | `adherence.enforcement-methods`                    |
| Compliance Manager | What is included/excluded?  | `scope.in`/`scope.out`                             |
| Compliance Manager | When does this start?       | `implementation-plan.enforcement-timeline`         |
| Compliance Manager | What is the audit proof?    | `adherence.assessment-plans.evidence-requirements` |
| Risk Manager       | What are we okay with?      | `risks.accepted`                                   |
| Risk Manager       | Why are we okay with it?    | `risks.accepted.justification`                     |
| --------------     | --------------------------- | --------------                                     |