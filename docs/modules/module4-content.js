// Module 4 Content - Advanced Policy Authoring (Risk-Based Approach)
// This content uses the examples/layer3-policy.yaml as the primary example
// and teaches risk-based policy writing through practical exercises focused on:
// 1. Risk-proportional controls (different frequencies based on risk)
// 2. Assessment requirement modifiers (customizing controls for risk levels)
// 3. Complete persona workflows (from questions to activities to outputs)

function getModule4Content() {
    return `
        <h3>Advanced Policy Authoring: Risk-Based Control Design</h3>
        <p>Welcome to Advanced Policy Authoring! In Module 3, you learned how policies serve different personas. Now you'll learn to write <strong>risk-based policies</strong> that apply controls proportional to risk levels.</p>

        <div class="info-box" style="margin: 2rem 0; padding: 1.5rem; background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1)); border-left: 4px solid #dc2626; border-radius: 8px;">
            <h4 style="margin-top: 0; color: #dc2626;">🎯 Core Principle: Risk Appetite</h4>
            <p style="margin-bottom: 0;"><strong>Risk appetite</strong> is the level of risk that the organization is willing to accept in pursuit of its objectives. Policies are <strong>risk-focused</strong> documents that translate risk appetite into operational controls.</p>
        </div>

        <h2>The Risk-Based Policy Pattern</h2>
        <p>Not all systems carry the same risk. A production database with customer credit cards requires <strong>stricter controls</strong> than a development environment with test data. Risk-based policies apply:</p>

        <div class="pattern-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
            <div style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.1)); border: 2px solid rgba(239, 68, 68, 0.4); border-radius: 12px; padding: 1.5rem;">
                <h4 style="color: #dc2626; margin-top: 0; text-align: center;">🔴 HIGH-RISK</h4>
                <p style="text-align: center; font-size: 0.9rem; margin: 0.5rem 0;"><strong>Production databases, admin accounts, customer PII</strong></p>
                <ul style="font-size: 0.875rem; color: var(--text-secondary);">
                    <li><strong>Daily</strong> or <strong>Weekly</strong> assessments</li>
                    <li>Manual + Automated verification</li>
                    <li>Comprehensive evidence requirements</li>
                    <li>Zero tolerance for non-compliance</li>
                </ul>
            </div>

            <div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.1)); border: 2px solid rgba(245, 158, 11, 0.4); border-radius: 12px; padding: 1.5rem;">
                <h4 style="color: #d97706; margin-top: 0; text-align: center;">🟡 MEDIUM-RISK</h4>
                <p style="text-align: center; font-size: 0.9rem; margin: 0.5rem 0;"><strong>Internal employee systems, standard user accounts</strong></p>
                <ul style="font-size: 0.875rem; color: var(--text-secondary);">
                    <li><strong>Monthly</strong> assessments</li>
                    <li>Primarily automated verification</li>
                    <li>Standard evidence requirements</li>
                    <li>Grace periods allowed</li>
                </ul>
            </div>

            <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.1)); border: 2px solid rgba(16, 185, 129, 0.4); border-radius: 12px; padding: 1.5rem;">
                <h4 style="color: #059669; margin-top: 0; text-align: center;">🟢 LOW-RISK</h4>
                <p style="text-align: center; font-size: 0.9rem; margin: 0.5rem 0;"><strong>Public websites, test environments, non-sensitive data</strong></p>
                <ul style="font-size: 0.875rem; color: var(--text-secondary);">
                    <li><strong>Quarterly</strong> assessments</li>
                    <li>Automated-only verification</li>
                    <li>Minimal evidence requirements</li>
                    <li>Flexible compliance timelines</li>
                </ul>
            </div>
        </div>

        <hr style="margin: 3rem 0; border: none; border-top: 2px solid var(--border-color);">

        <h2>Example: Corporate Password Policy (Risk-Based)</h2>
        <p>Let's examine <code>examples/layer3-policy.yaml</code> to see risk-based policy design in action. This policy addresses <strong>MITRE ATT&CK T1110 (Brute Force attacks)</strong> with different control intensities based on risk.</p>

        <div class="policy-overview" style="background-color: var(--bg-color); padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0; border: 2px solid var(--border-color);">
            <h4 style="margin-top: 0; color: var(--primary-color);">Policy Context</h4>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 0.5rem; font-weight: 600; width: 30%;">Title:</td>
                    <td style="padding: 0.5rem;">Example Corporate Password Policy</td>
                </tr>
                <tr>
                    <td style="padding: 0.5rem; font-weight: 600;">ID:</td>
                    <td style="padding: 0.5rem;"><code>policy-001</code></td>
                </tr>
                <tr>
                    <td style="padding: 0.5rem; font-weight: 600;">Threat Mitigated:</td>
                    <td style="padding: 0.5rem;"><strong>MITRE ATT&CK T1110</strong> - Brute Force attacks on credentials</td>
                </tr>
                <tr>
                    <td style="padding: 0.5rem; font-weight: 600;">Framework:</td>
                    <td style="padding: 0.5rem;">NIST SP 800-53 IA-5, CIS Benchmark v8</td>
                </tr>
            </table>
        </div>

        <h3>🔍 The Risk Question: "Are all passwords equal?"</h3>
        <p><strong>No!</strong> An AWS production administrator password carries <strong>vastly more risk</strong> than a corporate SSO password for a standard user:</p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
            <div style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05)); border: 2px solid rgba(239, 68, 68, 0.4); border-radius: 8px; padding: 1.5rem;">
                <h4 style="color: #dc2626; margin-top: 0;">🔴 HIGH-RISK: AWS Production Admin</h4>
                <p style="font-size: 0.9rem;"><strong>Impact of Compromise:</strong></p>
                <ul style="font-size: 0.875rem; margin: 0.5rem 0 1rem 1.5rem;">
                    <li>Access to ALL customer data</li>
                    <li>Ability to delete infrastructure</li>
                    <li>Potential for ransomware deployment</li>
                    <li>Regulatory breach notifications</li>
                    <li>Massive financial/reputational damage</li>
                </ul>
                <p style="font-weight: 600; color: #dc2626;">→ Requires MONTHLY verification</p>
            </div>

            <div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.05)); border: 2px solid rgba(245, 158, 11, 0.4); border-radius: 8px; padding: 1.5rem;">
                <h4 style="color: #d97706; margin-top: 0;">🟡 MEDIUM-RISK: Corporate SSO User</h4>
                <p style="font-size: 0.9rem;"><strong>Impact of Compromise:</strong></p>
                <ul style="font-size: 0.875rem; margin: 0.5rem 0 1rem 1.5rem;">
                    <li>Access to employee email</li>
                    <li>Limited data exposure (TLP:AMBER or lower)</li>
                    <li>No infrastructure control</li>
                    <li>Phishing/spam potential</li>
                    <li>Minor business disruption</li>
                </ul>
                <p style="font-weight: 600; color: #d97706;">→ Requires QUARTERLY verification</p>
            </div>
        </div>

        <h3>💡 Solution: Assessment Requirement Modifiers</h3>
        <p>The policy uses <strong>Assessment Requirement Modifiers</strong> to customize control verification based on risk:</p>

        <div class="code-block-container" style="margin: 1.5rem 0;">
            <div class="code-block-header" style="background-color: #1e293b; color: white; padding: 0.5rem 1rem; border-radius: 8px 8px 0 0; font-family: monospace; font-size: 0.875rem;">
                imports.catalogs.constraints (Assessment Requirement Modifier)
            </div>
            <pre class="code-block" style="margin: 0; padding: 1.5rem; background-color: #0f172a; color: #e2e8f0; border-radius: 0 0 8px 8px; overflow-x: auto; font-size: 0.875rem;"><code>imports:
  catalogs:
    - reference-id: "cis-benchmark-v8"
      constraints:
        - id: "min-length-12"
          target-id: "password-complexity"
          text: "Passwords must be at least 12 characters long."

          # 🎯 Risk-based modifier for HIGH-PRIVILEGE environments
          assessment-requirements:
            - id: "password-audit-mod-01"
              target-id: "cis-password-audit-original"
              modification-type: "replace"
              modification-rationale: "Standard quarterly audits are insufficient
                                       for high-privilege IAM roles; increasing
                                       frequency to monthly."

              # Modified requirements for high-risk scope
              requirement-id: "iam-verify-direct"
              frequency: "monthly"  # ← Increased from quarterly!
              evaluation-methods:
                - id: "manual-screenshot-verification"
                  type: "manual"
              evidence-requirements: "Visual confirmation of IAM password policy console."</code></pre>
        </div>

        <div class="key-insight" style="background-color: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
            <strong style="color: #3b82f6;">🔑 Key Understanding:</strong> This modifier says:
            <ul style="margin: 0.5rem 0 0 1.5rem;">
                <li><strong>WHAT:</strong> We're modifying the CIS Benchmark password audit requirement</li>
                <li><strong>HOW:</strong> Replacing quarterly frequency with monthly</li>
                <li><strong>WHY:</strong> High-privilege roles introduce higher risk</li>
                <li><strong>WHERE:</strong> Applied specifically to Cloud Infrastructure (defined in assessment plan scope)</li>
            </ul>
        </div>

        <hr style="margin: 3rem 0; border: none; border-top: 2px solid var(--border-color);">

        <h2>How Assessment Plans Consume Modifiers</h2>
        <p>The magic happens in the <code>adherence.assessment-plans</code> section, where we create <strong>two different assessment plans</strong> for the <strong>same control</strong>:</p>

        <div class="code-block-container" style="margin: 1.5rem 0;">
            <div class="code-block-header" style="background-color: #1e293b; color: white; padding: 0.5rem 1rem; border-radius: 8px 8px 0 0; font-family: monospace; font-size: 0.875rem;">
                adherence.assessment-plans (Risk-Scoped Plans)
            </div>
            <pre class="code-block" style="margin: 0; padding: 1.5rem; background-color: #0f172a; color: #e2e8f0; border-radius: 0 0 8px 8px; overflow-x: auto; font-size: 0.875rem;"><code>adherence:
  evaluation-methods:
    - id: "automated-config-audit"
      type: "automatic"
    - id: "manual-screenshot-verification"
      type: "manual"

  assessment-plans:
    # 🔴 HIGH-RISK Plan: Monthly checks for privileged environments
    - id: "monthly-high-privilege-audit"
      requirement-id: "iam-verify-direct"  # ← References the MODIFIED requirement
      frequency: "monthly"                  # ← Uses modified frequency
      scope:
        in:
          technologies: ["Cloud Infrastructure"]  # ← HIGH-RISK scope
      evaluation-methods:
        - id: "manual-screenshot-verification"
      evidence-requirements: "Visual confirmation of IAM password policy console."

    # 🟡 STANDARD-RISK Plan: Quarterly checks for general users
    - id: "quarterly-iam-review"
      requirement-id: "password-policy-audit"  # ← Original requirement
      frequency: "quarterly"                    # ← Standard frequency
      scope:
        in:
          technologies: ["Identity Providers"]  # ← STANDARD-RISK scope
      evaluation-methods:
        - id: "iam-policy-scanner"
      evidence-requirements: "JSON exports of IAM password policy settings."</code></pre>
        </div>

        <h3>📊 Risk-Proportional Control Execution</h3>
        <p>When an auditor asks for proof of compliance, the system automatically applies the correct assessment plan based on scope:</p>

        <table class="audit-table" style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; background-color: var(--bg-color); border: 2px solid var(--border-color);">
            <thead>
                <tr style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white;">
                    <th style="padding: 0.75rem; text-align: left;">Auditor Question</th>
                    <th style="padding: 0.75rem; text-align: left;">System Response</th>
                    <th style="padding: 0.75rem; text-align: left;">Assessment Plan Used</th>
                </tr>
            </thead>
            <tbody>
                <tr style="border-bottom: 1px solid var(--border-color);">
                    <td style="padding: 0.75rem;">"Show me password compliance for <strong>AWS Production</strong>"</td>
                    <td style="padding: 0.75rem; font-family: monospace; font-size: 0.875rem;">Scope = Cloud Infrastructure → <span style="color: #dc2626; font-weight: 600;">monthly plan</span></td>
                    <td style="padding: 0.75rem; font-weight: 600;">monthly-high-privilege-audit</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                    <td style="padding: 0.75rem;">"Show me password compliance for <strong>Corporate SSO</strong>"</td>
                    <td style="padding: 0.75rem; font-family: monospace; font-size: 0.875rem;">Scope = Identity Providers → <span style="color: #d97706; font-weight: 600;">quarterly plan</span></td>
                    <td style="padding: 0.75rem; font-weight: 600;">quarterly-iam-review</td>
                </tr>
            </tbody>
        </table>

        <div class="key-insight" style="background-color: rgba(16, 185, 129, 0.1); border-left: 4px solid #059669; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
            <strong style="color: #059669;">✨ This is risk-proportional controls in action!</strong> You're applying stricter controls (higher frequency, manual verification) where risk is highest, while avoiding over-engineering low-risk systems.
        </div>

        <hr style="margin: 3rem 0; border: none; border-top: 2px solid var(--border-color);">

        <h2>Persona Workflows: From Questions to Outputs</h2>
        <p>Let's walk through how each persona uses this risk-based policy to accomplish their work:</p>

        <div class="workflow-container" style="margin: 2rem 0;">
            <div style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05)); border: 2px solid rgba(239, 68, 68, 0.3); border-radius: 12px; padding: 2rem; margin-bottom: 2rem;">
                <h3 style="color: #dc2626; margin-top: 0; display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-size: 1.75rem;">🔒</span>
                    Security Engineer Workflow
                </h3>

                <div style="margin: 1.5rem 0;">
                    <div style="background-color: rgba(255, 255, 255, 0.5); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
                        <strong style="color: #dc2626;">Step 1: Review threats</strong>
                        <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">Check <code>risks.mitigated</code> → Find <strong>MITRE ATT&CK T1110 (Brute Force)</strong></p>
                    </div>

                    <div style="background-color: rgba(255, 255, 255, 0.5); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
                        <strong style="color: #dc2626;">Step 2: Identify controls</strong>
                        <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">Check <code>imports.catalogs</code> → CIS Benchmark v8 requires 12-character passwords</p>
                    </div>

                    <div style="background-color: rgba(255, 255, 255, 0.5); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
                        <strong style="color: #dc2626;">Step 3: Understand assessment requirements</strong>
                        <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">Check <code>adherence.assessment-plans</code> → Monthly manual checks for Cloud Infrastructure, quarterly automated for Identity Providers</p>
                    </div>

                    <div style="background-color: rgba(255, 255, 255, 0.5); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
                        <strong style="color: #dc2626;">Step 4: Implement controls</strong>
                        <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">Configure IAM password policies, deploy automated scanner, create manual verification runbook</p>
                    </div>

                    <div style="background-color: rgba(16, 185, 129, 0.2); padding: 1rem; border-radius: 6px; border: 2px solid #059669;">
                        <strong style="color: #059669;">✅ OUTPUT:</strong>
                        <ul style="margin: 0.5rem 0 0 1.5rem; font-size: 0.9rem;">
                            <li>AWS IAM password policy configured (12+ chars, complexity enabled)</li>
                            <li>Automated scanning tool deployed</li>
                            <li>Manual verification runbook created</li>
                            <li>Evidence collection procedures documented</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05)); border: 2px solid rgba(59, 130, 246, 0.3); border-radius: 12px; padding: 2rem; margin-bottom: 2rem;">
                <h3 style="color: #2563eb; margin-top: 0; display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-size: 1.75rem;">📋</span>
                    Compliance Manager Workflow
                </h3>

                <div style="margin: 1.5rem 0;">
                    <div style="background-color: rgba(255, 255, 255, 0.5); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
                        <strong style="color: #2563eb;">Step 1: Define scope</strong>
                        <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">Check <code>scope</code> → IN: Identity Providers + Cloud Infrastructure; OUT: Legacy Air-gapped Systems</p>
                    </div>

                    <div style="background-color: rgba(255, 255, 255, 0.5); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
                        <strong style="color: #2563eb;">Step 2: Identify activation dates</strong>
                        <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">Check <code>implementation-plan</code> → Evaluation starts 2023-11-01, Enforcement starts 2024-01-01</p>
                    </div>

                    <div style="background-color: rgba(255, 255, 255, 0.5); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
                        <strong style="color: #2563eb;">Step 3: Create assessment calendar</strong>
                        <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">Check <code>adherence.assessment-plans</code> → Schedule monthly Cloud Infrastructure audits, quarterly Identity Provider audits</p>
                    </div>

                    <div style="background-color: rgba(255, 255, 255, 0.5); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
                        <strong style="color: #2563eb;">Step 4: Collect evidence</strong>
                        <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">Gather screenshots (manual) and JSON exports (automated) per evidence requirements</p>
                    </div>

                    <div style="background-color: rgba(16, 185, 129, 0.2); padding: 1rem; border-radius: 6px; border: 2px solid #059669;">
                        <strong style="color: #059669;">✅ OUTPUT:</strong>
                        <ul style="margin: 0.5rem 0 0 1.5rem; font-size: 0.9rem;">
                            <li>Scoping document showing in/out boundaries</li>
                            <li>Policy rollout timeline with notification records</li>
                            <li>Monthly audit calendar for Cloud Infrastructure</li>
                            <li>Quarterly audit calendar for Identity Providers</li>
                            <li>Evidence artifacts stored in compliance system</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05)); border: 2px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 2rem;">
                <h3 style="color: #059669; margin-top: 0; display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-size: 1.75rem;">⚖️</span>
                    Risk Manager Workflow
                </h3>

                <div style="margin: 1.5rem 0;">
                    <div style="background-color: rgba(255, 255, 255, 0.5); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
                        <strong style="color: #059669;">Step 1: Identify mitigated risks</strong>
                        <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">Check <code>risks.mitigated</code> → T1110 (Brute Force) addressed by this policy</p>
                    </div>

                    <div style="background-color: rgba(255, 255, 255, 0.5); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
                        <strong style="color: #059669;">Step 2: Review accepted risks</strong>
                        <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">Check <code>risks.accepted</code> → RISK-402: Legacy-App-01 cannot support MFA; risk accepted until Q3 migration</p>
                    </div>

                    <div style="background-color: rgba(255, 255, 255, 0.5); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
                        <strong style="color: #059669;">Step 3: Validate risk-proportional controls</strong>
                        <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">Verify assessment plans match risk levels: monthly for high-risk, quarterly for standard-risk</p>
                    </div>

                    <div style="background-color: rgba(255, 255, 255, 0.5); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
                        <strong style="color: #059669;">Step 4: Update risk register</strong>
                        <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">Document risk treatment decisions and reference policy artifact</p>
                    </div>

                    <div style="background-color: rgba(16, 185, 129, 0.2); padding: 1rem; border-radius: 6px; border: 2px solid #059669;">
                        <strong style="color: #059669;">✅ OUTPUT:</strong>
                        <ul style="margin: 0.5rem 0 0 1.5rem; font-size: 0.9rem;">
                            <li>Risk register updated: T1110 marked "Mitigated" with policy reference</li>
                            <li>Risk acceptance documented: RISK-402 for Legacy-App-01 with justification</li>
                            <li>Risk treatment validation: Controls match risk levels</li>
                            <li>Residual risk report showing accepted risks and timelines</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <hr style="margin: 3rem 0; border: none; border-top: 2px solid var(--border-color);">

        <h2>🎯 Interactive Exercise: Build Your Risk-Based Policy</h2>
        <p>Now it's your turn! You'll create a Data Classification Policy with risk-proportional assessment plans.</p>

        <div class="exercise-box" style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(124, 58, 237, 0.05)); border: 2px solid rgba(139, 92, 246, 0.4); border-radius: 12px; padding: 2rem; margin: 2rem 0;">
            <h3 style="color: #7c3aed; margin-top: 0;">Exercise: Data Classification Policy</h3>

            <div style="background-color: rgba(255, 255, 255, 0.6); padding: 1.5rem; border-radius: 8px; margin: 1rem 0;">
                <h4 style="margin-top: 0;">📋 Scenario</h4>
                <p>Your organization stores data at three risk levels:</p>

                <ul style="line-height: 1.8;">
                    <li><strong>🔴 HIGH-RISK:</strong> Customer PII in cloud databases (risk of data breach → MITRE ATT&CK T1530)</li>
                    <li><strong>🟡 MEDIUM-RISK:</strong> Internal employee directories (privacy concerns but lower impact)</li>
                    <li><strong>🟢 LOW-RISK:</strong> Public marketing materials (no sensitive data)</li>
                </ul>

                <p style="margin-top: 1.5rem;"><strong>Your Task:</strong> Create risk-proportional assessment plans with different frequencies:</p>
                <ul style="line-height: 1.8;">
                    <li>HIGH-RISK: <strong>Weekly</strong> automated + <strong>Monthly</strong> manual reviews</li>
                    <li>MEDIUM-RISK: <strong>Monthly</strong> automated scans</li>
                    <li>LOW-RISK: <strong>Quarterly</strong> automated scans</li>
                </ul>
            </div>

            <div style="background-color: rgba(255, 255, 255, 0.6); padding: 1.5rem; border-radius: 8px; margin: 1rem 0;">
                <h4 style="margin-top: 0;">🎯 Required Sections</h4>

                <p><strong>1. Risk Manager Input:</strong></p>
                <div class="code-block-container" style="margin: 1rem 0;">
                    <pre class="code-block" style="margin: 0; padding: 1rem; background-color: #0f172a; color: #e2e8f0; border-radius: 6px; overflow-x: auto; font-size: 0.8rem;"><code>risks:
  mitigated:
    - reference-id: "MITRE-ATT&CK"
      item-id: "T1530"  # Data from Cloud Storage
  accepted:
    - risk:
        reference-id: "internal-risk-registry"
        item-id: "RISK-505"
      justification: "Legacy HR system lacks field-level encryption;
                      accepted until Q4 replacement."
      scope:
        in:
          technologies: ["Legacy-HR-App"]</code></pre>
                </div>

                <p><strong>2. Compliance Manager Input:</strong></p>
                <div class="code-block-container" style="margin: 1rem 0;">
                    <pre class="code-block" style="margin: 0; padding: 1rem; background-color: #0f172a; color: #e2e8f0; border-radius: 6px; overflow-x: auto; font-size: 0.8rem;"><code>scope:
  in:
    technologies: ["Cloud Storage", "Database Systems", "File Shares"]
    sensitivity: ["Confidential", "Internal", "Public"]</code></pre>
                </div>

                <p><strong>3. Security Engineer Input (Assessment Plans):</strong></p>
                <div class="code-block-container" style="margin: 1rem 0;">
                    <pre class="code-block" style="margin: 0; padding: 1rem; background-color: #0f172a; color: #e2e8f0; border-radius: 6px; overflow-x: auto; font-size: 0.8rem;"><code>adherence:
  assessment-plans:
    # HIGH-RISK: Weekly automated + monthly manual
    - id: "high-risk-data-weekly-auto"
      requirement-id: "encryption-verify-high"
      frequency: "weekly"
      scope:
        in:
          technologies: ["Cloud Storage"]
          sensitivity: ["Confidential"]
      evaluation-methods:
        - id: "automated-encryption-scan"
      evidence-requirements: "Encryption status, access logs"

    - id: "high-risk-data-monthly-manual"
      requirement-id: "encryption-verify-high-manual"
      frequency: "monthly"
      scope:
        in:
          technologies: ["Cloud Storage"]
          sensitivity: ["Confidential"]
      evaluation-methods:
        - id: "manual-dlp-review"
      evidence-requirements: "DLP alert summary, manual sampling of 10 files"

    # MEDIUM-RISK: Monthly automated
    - id: "medium-risk-data-monthly"
      requirement-id: "encryption-verify-medium"
      frequency: "monthly"
      scope:
        in:
          sensitivity: ["Internal"]
      evaluation-methods:
        - id: "automated-encryption-scan"
      evidence-requirements: "Encryption status report"

    # LOW-RISK: Quarterly automated
    - id: "low-risk-data-quarterly"
      requirement-id: "encryption-verify-low"
      frequency: "quarterly"
      scope:
        in:
          sensitivity: ["Public"]
      evaluation-methods:
        - id: "automated-encryption-scan"
      evidence-requirements: "Configuration snapshot"</code></pre>
                </div>
            </div>

            <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.1)); padding: 1.5rem; border-radius: 8px; border: 2px solid #059669; margin: 1rem 0;">
                <h4 style="color: #059669; margin-top: 0;">✅ Success Criteria</h4>
                <ul style="margin: 0.5rem 0 0 1.5rem; line-height: 1.8;">
                    <li>Three distinct assessment plans with different frequencies</li>
                    <li>Each plan scoped to appropriate risk level (sensitivity)</li>
                    <li>Evidence requirements match risk level (comprehensive for high, minimal for low)</li>
                    <li>Risk acceptance properly documented with justification and scope</li>
                </ul>
            </div>

            <div style="text-align: center; margin-top: 2rem; padding-top: 2rem; border-top: 2px solid rgba(139, 92, 246, 0.3);">
                <button style="background: linear-gradient(135deg, #7c3aed, #6d28d9); color: white; padding: 1rem 2rem; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    Download Exercise Template (YAML)
                </button>
                <p style="margin-top: 1rem; font-size: 0.875rem; color: var(--text-secondary);">
                    Use the template to complete this exercise, then validate with <code>validate_gemara_yaml</code>
                </p>
            </div>
        </div>

        <hr style="margin: 3rem 0; border: none; border-top: 2px solid var(--border-color);">

        <h2>Common Patterns & Anti-Patterns</h2>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
            <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05)); border: 2px solid rgba(16, 185, 129, 0.4); border-radius: 12px; padding: 1.5rem;">
                <h3 style="color: #059669; margin-top: 0;">✅ Pattern: Risk-Proportional Controls</h3>
                <div class="code-block-container" style="margin: 1rem 0;">
                    <pre class="code-block" style="margin: 0; padding: 1rem; background-color: #0f172a; color: #e2e8f0; border-radius: 6px; overflow-x: auto; font-size: 0.75rem;"><code>assessment-plans:
  - id: "prod-db-daily"
    frequency: "daily"
    scope:
      in:
        technologies: ["Production Databases"]

  - id: "dev-db-weekly"
    frequency: "weekly"
    scope:
      in:
        technologies: ["Development Databases"]</code></pre>
                </div>
                <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 1rem;"><strong>Why good:</strong> Different risk levels warrant different control intensity. Production databases get daily checks, development gets weekly.</p>
            </div>

            <div style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05)); border: 2px solid rgba(239, 68, 68, 0.4); border-radius: 12px; padding: 1.5rem;">
                <h3 style="color: #dc2626; margin-top: 0;">❌ Anti-Pattern: One-Size-Fits-All</h3>
                <div class="code-block-container" style="margin: 1rem 0;">
                    <pre class="code-block" style="margin: 0; padding: 1rem; background-color: #0f172a; color: #e2e8f0; border-radius: 6px; overflow-x: auto; font-size: 0.75rem;"><code>assessment-plans:
  - id: "all-systems-monthly"
    frequency: "monthly"
    scope:
      in:
        technologies: ["All Systems"]</code></pre>
                </div>
                <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 1rem;"><strong>Why bad:</strong> No risk differentiation. Wastes resources on low-risk systems while under-protecting high-risk systems.</p>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
            <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05)); border: 2px solid rgba(16, 185, 129, 0.4); border-radius: 12px; padding: 1.5rem;">
                <h3 style="color: #059669; margin-top: 0;">✅ Pattern: Explicit Risk Acceptance</h3>
                <div class="code-block-container" style="margin: 1rem 0;">
                    <pre class="code-block" style="margin: 0; padding: 1rem; background-color: #0f172a; color: #e2e8f0; border-radius: 6px; overflow-x: auto; font-size: 0.75rem;"><code>risks:
  accepted:
    - risk:
        reference-id: "internal-risk-registry"
        item-id: "RISK-707"
      justification: "IoT devices lack encryption;
                      mitigating with network segmentation."
      scope:
        in:
          technologies: ["Building Automation IoT"]</code></pre>
                </div>
                <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 1rem;"><strong>Why good:</strong> Documents conscious risk decision with justification and compensating controls.</p>
            </div>

            <div style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05)); border: 2px solid rgba(239, 68, 68, 0.4); border-radius: 12px; padding: 1.5rem;">
                <h3 style="color: #dc2626; margin-top: 0;">❌ Anti-Pattern: Undocumented Exceptions</h3>
                <div class="code-block-container" style="margin: 1rem 0;">
                    <pre class="code-block" style="margin: 0; padding: 1rem; background-color: #0f172a; color: #e2e8f0; border-radius: 6px; overflow-x: auto; font-size: 0.75rem;"><code>scope:
  out:
    technologies: ["IoT Devices"]</code></pre>
                </div>
                <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 1rem;"><strong>Why bad:</strong> No explanation for exclusion. Auditors will question why IoT is out of scope without documented risk acceptance.</p>
            </div>
        </div>

        <hr style="margin: 3rem 0; border: none; border-top: 2px solid var(--border-color);">

        <h2>Key Takeaways</h2>

        <div class="takeaways" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05)); border: 2px solid rgba(59, 130, 246, 0.4); border-radius: 12px; padding: 2rem; margin: 2rem 0;">
            <ol style="line-height: 2; margin: 0; padding-left: 1.5rem;">
                <li><strong>Policies are risk-focused:</strong> Every section connects to organizational risk appetite and risk treatment decisions.</li>

                <li><strong>Assessment Requirement Modifiers enable risk-based tailoring:</strong> Apply stricter controls (higher frequency, manual verification) where risk is higher.</li>

                <li><strong>Scope + Assessment Plans = Risk-Proportional Controls:</strong> Use scope to partition environments by risk, then create different assessment plans for each partition.</li>

                <li><strong>Evidence requirements bridge policy and audit:</strong> Explicit evidence specifications prevent audit surprises and ensure repeatable verification.</li>

                <li><strong>Risk acceptance requires explicit justification:</strong> Never exclude scope or skip controls without documented risk acceptance with business justification.</li>

                <li><strong>Three personas, one artifact:</strong> A well-written policy serves Risk Managers (risk treatment), Compliance Managers (verification procedures), and Security Engineers (technical implementation) simultaneously.</li>
            </ol>
        </div>

        <hr style="margin: 3rem 0; border: none; border-top: 2px solid var(--border-color);">

        <h2>The Risk-Based Policy Lifecycle</h2>

        <div style="background-color: var(--bg-color); padding: 2rem; border-radius: 12px; border: 2px solid var(--border-color); margin: 2rem 0;">
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                <div style="display: flex; align-items: start; gap: 1rem;">
                    <div style="background: linear-gradient(135deg, #059669, #047857); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">1</div>
                    <div style="flex: 1;">
                        <strong style="color: #059669;">Risk Manager: Identify Threats & Risk Appetite</strong>
                        <p style="margin: 0.25rem 0 0 0; font-size: 0.9rem; color: var(--text-secondary);">Output: <code>risks.mitigated</code>, <code>risks.accepted</code></p>
                    </div>
                </div>

                <div style="display: flex; align-items: start; gap: 1rem;">
                    <div style="background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">2</div>
                    <div style="flex: 1;">
                        <strong style="color: #dc2626;">Security Engineer: Select Controls & Tailor to Risk</strong>
                        <p style="margin: 0.25rem 0 0 0; font-size: 0.9rem; color: var(--text-secondary);">Output: <code>imports.catalogs</code>, <code>constraints</code> (modifiers)</p>
                    </div>
                </div>

                <div style="display: flex; align-items: start; gap: 1rem;">
                    <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">3</div>
                    <div style="flex: 1;">
                        <strong style="color: #2563eb;">Compliance Manager: Define Scope & Implementation Timeline</strong>
                        <p style="margin: 0.25rem 0 0 0; font-size: 0.9rem; color: var(--text-secondary);">Output: <code>scope</code>, <code>implementation-plan</code></p>
                    </div>
                </div>

                <div style="display: flex; align-items: start; gap: 1rem;">
                    <div style="background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">4</div>
                    <div style="flex: 1;">
                        <strong style="color: #dc2626;">Security Engineer: Design Assessment Procedures</strong>
                        <p style="margin: 0.25rem 0 0 0; font-size: 0.9rem; color: var(--text-secondary);">Output: <code>adherence.assessment-plans</code> (risk-scoped)</p>
                    </div>
                </div>

                <div style="display: flex; align-items: start; gap: 1rem;">
                    <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">5</div>
                    <div style="flex: 1;">
                        <strong style="color: #2563eb;">Compliance Manager: Execute Assessments & Collect Evidence</strong>
                        <p style="margin: 0.25rem 0 0 0; font-size: 0.9rem; color: var(--text-secondary);">Output: Audit artifacts per <code>evidence-requirements</code></p>
                    </div>
                </div>

                <div style="display: flex; align-items: start; gap: 1rem;">
                    <div style="background: linear-gradient(135deg, #059669, #047857); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">6</div>
                    <div style="flex: 1;">
                        <strong style="color: #059669;">Risk Manager: Validate Risk Treatment Effectiveness</strong>
                        <p style="margin: 0.25rem 0 0 0; font-size: 0.9rem; color: var(--text-secondary);">Output: Risk register updates, residual risk analysis</p>
                    </div>
                </div>
            </div>
        </div>

        <hr style="margin: 3rem 0; border: none; border-top: 2px solid var(--border-color);">

        <div style="text-align: center; margin: 3rem 0;">
            <h3 style="color: var(--primary-color);">Ready for Real-World Application?</h3>
            <p style="font-size: 1.125rem;">In Module 5, you'll apply these risk-based workflows to industry-specific scenarios:</p>
            <ul style="display: inline-block; text-align: left; margin: 1rem 0;">
                <li>Financial Services: PCI-DSS risk tiers (Cardholder Data Environment vs. general corporate)</li>
                <li>Healthcare: HIPAA risk analysis (PHI vs. non-PHI systems)</li>
                <li>Technology: SOC 2 risk-based testing (production vs. development)</li>
            </ul>
            <p style="margin-top: 2rem;">
                <button style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; padding: 1rem 2.5rem; border: none; border-radius: 8px; font-size: 1.125rem; font-weight: 600; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    Continue to Module 5: Real-World Policy Implementation
                </button>
            </p>
        </div>
    `;
}

// Export for use in modules.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getModule4Content };
}
