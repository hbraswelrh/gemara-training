// Module 3 Content - Policy Writing Fundamentals (Role-Based Approach)
// This content uses the layer3-access-control-mfa-official.yaml as the primary example
// and teaches policy writing through three role perspectives:
// 1. Security Engineer (threat assessment, controls)
// 2. Compliance Manager (scope, implementation, adherence, evidence)
// 3. Risk Manager (risks mitigated, accepted, delegated)

function getModule3Content() {
    return `
        <h3>Welcome to Policy Writing!</h3>
        <p>Layer 3 is where you, as a compliance professional, add critical organizational context to industry controls. In this module, you'll learn to write policies that are clear, enforceable, and tailored to your organization's specific needs.</p>

        <p>We'll explore policies through the lens of <strong>three key roles</strong> in your organization, using a real-world example: the <strong>Multi-Factor Authentication (MFA) Policy</strong> from <code>layer3-access-control-mfa-official.yaml</code>.</p>

        <div class="info-box" style="margin: 2rem 0; padding: 1.5rem; background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1)); border-left: 4px solid var(--primary-color); border-radius: 8px;">
            <h4 style="margin-top: 0; color: var(--primary-color);">Three Perspectives, One Policy</h4>
            <p style="margin-bottom: 0;">Every well-written policy answers different questions for Security Engineers, Compliance Managers, and Risk Managers. Understanding these perspectives will help you write more effective policies.</p>
        </div>

        <h3>The Three Critical Perspectives</h3>
        <p>Every Layer 3 policy serves three distinct organizational roles, each with different questions and concerns:</p>

        <div class="role-cards-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
            <div class="role-card" style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1)); border: 2px solid rgba(239, 68, 68, 0.3); border-radius: 12px; padding: 1.5rem;">
                <h4 style="color: #dc2626; margin-top: 0; display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-size: 1.5rem;">🔒</span>
                    Security Engineer
                </h4>
                <ul style="margin: 1rem 0; padding-left: 1.5rem; color: var(--text-secondary);">
                    <li>How do I assess threats?</li>
                    <li>How do I express controls?</li>
                    <li>How do I mitigate risks technically?</li>
                    <li>What's my assessment plan?</li>
                </ul>
            </div>

            <div class="role-card" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1)); border: 2px solid rgba(59, 130, 246, 0.3); border-radius: 12px; padding: 1.5rem;">
                <h4 style="color: #2563eb; margin-top: 0; display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-size: 1.5rem;">📋</span>
                    Compliance Manager
                </h4>
                <ul style="margin: 1rem 0; padding-left: 1.5rem; color: var(--text-secondary);">
                    <li>What is my compliance scope?</li>
                    <li>When is the policy active?</li>
                    <li>How do I verify adherence?</li>
                    <li>What evidence do auditors need?</li>
                </ul>
            </div>

            <div class="role-card" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1)); border: 2px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 1.5rem;">
                <h4 style="color: #059669; margin-top: 0; display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-size: 1.5rem;">⚖️</span>
                    Risk Manager
                </h4>
                <ul style="margin: 1rem 0; padding-left: 1.5rem; color: var(--text-secondary);">
                    <li>What risks are we mitigating?</li>
                    <li>What risks are we accepting?</li>
                    <li>What are we delegating?</li>
                    <li>What's our risk treatment strategy?</li>
                </ul>
            </div>
        </div>

        <h3>Real-World Example: MFA Policy</h3>
        <p>Let's examine the official MFA policy (<code>layer3-access-control-mfa-official.yaml</code>) and see how it answers questions for each role.</p>

        <div class="policy-overview" style="background-color: var(--bg-color); padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0;">
            <h4 style="margin-top: 0; color: var(--primary-color);">Policy Overview</h4>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 0.5rem; font-weight: 600; width: 30%;">Title:</td>
                    <td style="padding: 0.5rem;">Multi-Factor Authentication (MFA) Policy</td>
                </tr>
                <tr>
                    <td style="padding: 0.5rem; font-weight: 600;">ID:</td>
                    <td style="padding: 0.5rem;"><code>access-control-mfa-policy-001</code></td>
                </tr>
                <tr>
                    <td style="padding: 0.5rem; font-weight: 600;">Purpose:</td>
                    <td style="padding: 0.5rem;">Establish multi-factor authentication requirements for accessing organizational systems and sensitive data to prevent unauthorized access</td>
                </tr>
                <tr>
                    <td style="padding: 0.5rem; font-weight: 600;">Frameworks:</td>
                    <td style="padding: 0.5rem;">PCI-DSS 4.0.1, NIST 800-63B, SOC 2 CC6</td>
                </tr>
            </table>
        </div>

        <hr style="margin: 3rem 0; border: none; border-top: 2px solid var(--border-color);">

        <h2 style="color: #dc2626; display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.75rem;">🔒</span>
            Perspective 1: Security Engineer
        </h2>

        <h3>❓ "How do I do a threat assessment?"</h3>
        <p>As a Security Engineer, you need to understand what threats this policy addresses. The policy references an external <strong>threat model</strong> in the <code>risks.mitigated</code> section:</p>

        <div class="code-block-container" style="margin: 1.5rem 0;">
            <div class="code-block-header" style="background-color: #1e293b; color: white; padding: 0.5rem 1rem; border-radius: 8px 8px 0 0; font-family: monospace; font-size: 0.875rem;">
                risks.mitigated (lines 246-253)
            </div>
            <pre class="code-block" style="margin: 0; padding: 1.5rem; background-color: #0f172a; color: #e2e8f0; border-radius: 0 0 8px 8px; overflow-x: auto;"><code>risks:
  mitigated:
    - reference-id: "threat-model-iam"
      entries:
        - reference-id: "credential-theft"
        - reference-id: "phishing-attacks"
        - reference-id: "brute-force-attacks"
        - reference-id: "session-replay"
        - reference-id: "insider-threat-unauthorized-access"</code></pre>
        </div>

        <div class="key-insight" style="background-color: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
            <strong style="color: #3b82f6;">💡 Key Understanding:</strong> The policy doesn't define threats itself—it points to a separate threat model document. This separation allows:
            <ul style="margin: 0.5rem 0 0 1.5rem;">
                <li>Security engineers to maintain technical threat assessments independently</li>
                <li>Policies to reference multiple threat models</li>
                <li>Threat models to be updated without changing policies</li>
            </ul>
        </div>

        <h3>❓ "How do I express controls and mitigate threats?"</h3>
        <p>Controls are expressed in the <strong><code>imports</code></strong> section, which links to Layer 2 controls:</p>

        <div class="code-block-container" style="margin: 1.5rem 0;">
            <div class="code-block-header" style="background-color: #1e293b; color: white; padding: 0.5rem 1rem; border-radius: 8px 8px 0 0; font-family: monospace; font-size: 0.875rem;">
                imports.catalogs.constraints (lines 92-98)
            </div>
            <pre class="code-block" style="margin: 0; padding: 1.5rem; background-color: #0f172a; color: #e2e8f0; border-radius: 0 0 8px 8px; overflow-x: auto;"><code>imports:
  catalogs:
    - reference-id: "internal-access-controls-catalog"
      constraints:
        - id: "mfa-required"
          target-id: "AC-MFA-001"
          text: "Multi-factor authentication MUST be enforced for
                 all remote access and privileged account access"
        - id: "phishing-resistant"
          target-id: "AC-MFA-002"
          text: "Phishing-resistant MFA methods (FIDO2, hardware tokens)
                 MUST be available for high-risk users"</code></pre>
        </div>

        <p><strong>Assessment Requirement Modifications</strong> provide implementation details:</p>

        <div class="code-block-container" style="margin: 1.5rem 0;">
            <div class="code-block-header" style="background-color: #1e293b; color: white; padding: 0.5rem 1rem; border-radius: 8px 8px 0 0; font-family: monospace; font-size: 0.875rem;">
                assessment-requirement-modifications (lines 100-106)
            </div>
            <pre class="code-block" style="margin: 0; padding: 1.5rem; background-color: #0f172a; color: #e2e8f0; border-radius: 0 0 8px 8px; overflow-x: auto; font-size: 0.875rem;"><code>assessment-requirement-modifications:
  - id: "mod-ac-mfa-001"
    target-id: "AC-MFA-001.1"
    modification-type: "clarification"
    modification-rationale: "Clarify acceptable MFA methods"
    text: "MFA implementation must use authenticator apps (TOTP),
           hardware security keys (FIDO2/WebAuthn), or SMS as
           fallback only"
    applicability:
      - "remote-access"
      - "cloud-applications"
      - "privileged-access"
    recommendation: "Prefer hardware security keys for administrators"</code></pre>
        </div>

        <h3>❓ "What's my assessment plan?"</h3>
        <p>The <code>adherence.assessment-plans</code> section defines <strong>how to verify</strong> that controls are working:</p>

        <table class="assessment-table" style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; background-color: var(--bg-color); border-radius: 8px; overflow: hidden;">
            <thead>
                <tr style="background-color: #dc2626; color: white;">
                    <th style="padding: 0.75rem; text-align: left;">Assessment Plan</th>
                    <th style="padding: 0.75rem; text-align: left;">Frequency</th>
                    <th style="padding: 0.75rem; text-align: left;">Evidence Required</th>
                </tr>
            </thead>
            <tbody>
                <tr style="border-bottom: 1px solid var(--border-color);">
                    <td style="padding: 0.75rem;"><strong>MFA Enrollment</strong></td>
                    <td style="padding: 0.75rem;">Daily</td>
                    <td style="padding: 0.75rem;">≥99% enrollment rate</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                    <td style="padding: 0.75rem;"><strong>MFA Usage</strong></td>
                    <td style="padding: 0.75rem;">Weekly</td>
                    <td style="padding: 0.75rem;">Zero non-MFA logins</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                    <td style="padding: 0.75rem;"><strong>Privileged Account MFA</strong></td>
                    <td style="padding: 0.75rem;">Weekly</td>
                    <td style="padding: 0.75rem;">100% MFA compliance</td>
                </tr>
                <tr>
                    <td style="padding: 0.75rem;"><strong>Approved Methods</strong></td>
                    <td style="padding: 0.75rem;">Quarterly</td>
                    <td style="padding: 0.75rem;">Only approved authenticators</td>
                </tr>
            </tbody>
        </table>

        <hr style="margin: 3rem 0; border: none; border-top: 2px solid var(--border-color);">

        <h2 style="color: #2563eb; display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.75rem;">📋</span>
            Perspective 2: Compliance Manager
        </h2>

        <h3>❓ "What do I need a policy for?"</h3>
        <p>The <strong><code>metadata.mapping-references</code></strong> section tells you which compliance frameworks require this policy:</p>

        <table class="framework-table" style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; background-color: var(--bg-color);">
            <thead>
                <tr style="background-color: #2563eb; color: white;">
                    <th style="padding: 0.75rem; text-align: left;">Framework</th>
                    <th style="padding: 0.75rem; text-align: left;">Version</th>
                    <th style="padding: 0.75rem; text-align: left;">Requirement</th>
                </tr>
            </thead>
            <tbody>
                <tr style="border-bottom: 1px solid var(--border-color);">
                    <td style="padding: 0.75rem;">PCI-DSS</td>
                    <td style="padding: 0.75rem;">4.0.1</td>
                    <td style="padding: 0.75rem;">Requirement 8 - User identification & authentication</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                    <td style="padding: 0.75rem;">NIST 800-63B</td>
                    <td style="padding: 0.75rem;">Revision B</td>
                    <td style="padding: 0.75rem;">Authenticator Assurance Level 2 (AAL2)</td>
                </tr>
                <tr>
                    <td style="padding: 0.75rem;">SOC 2</td>
                    <td style="padding: 0.75rem;">2017</td>
                    <td style="padding: 0.75rem;">CC6 - Logical and Physical Access Controls</td>
                </tr>
            </tbody>
        </table>

        <h3>❓ "What is my compliance scope?"</h3>
        <p>The <strong><code>scope</code></strong> section defines what's included and excluded:</p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1)); border: 2px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 1.5rem;">
                <h4 style="color: #059669; margin-top: 0;">✅ IN SCOPE</h4>
                <p><strong>Technologies:</strong></p>
                <ul style="font-size: 0.9rem; margin: 0.5rem 0;">
                    <li>VPN Access</li>
                    <li>Cloud Applications (O365, Salesforce)</li>
                    <li>Payment Processing Systems</li>
                    <li>Admin Interfaces</li>
                    <li>Source Code Repositories</li>
                </ul>
                <p><strong>Users:</strong></p>
                <ul style="font-size: 0.9rem; margin: 0.5rem 0;">
                    <li>Employees</li>
                    <li>Contractors</li>
                    <li>System Administrators</li>
                    <li>Third-party Vendors</li>
                </ul>
                <p><strong>Data Sensitivity:</strong></p>
                <ul style="font-size: 0.9rem; margin: 0.5rem 0;">
                    <li>Payment Card Data</li>
                    <li>PII</li>
                    <li>Confidential</li>
                </ul>
            </div>

            <div style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1)); border: 2px solid rgba(239, 68, 68, 0.3); border-radius: 8px; padding: 1.5rem;">
                <h4 style="color: #dc2626; margin-top: 0;">❌ OUT OF SCOPE</h4>
                <p><strong>Technologies:</strong></p>
                <ul style="font-size: 0.9rem; margin: 0.5rem 0;">
                    <li>Guest WiFi</li>
                    <li>Public Marketing Website</li>
                </ul>
                <p><strong>Users:</strong></p>
                <ul style="font-size: 0.9rem; margin: 0.5rem 0;">
                    <li>Customers (separate policy)</li>
                </ul>
                <p><strong>Data Sensitivity:</strong></p>
                <ul style="font-size: 0.9rem; margin: 0.5rem 0;">
                    <li>Public information</li>
                </ul>
            </div>
        </div>

        <h3>❓ "When is the policy active?"</h3>
        <p>The <strong><code>implementation-plan</code></strong> section provides timelines:</p>

        <div class="timeline" style="background-color: var(--bg-color); padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0;">
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                <div style="flex: 1; padding: 1rem; background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.1)); border-radius: 6px;">
                    <div style="font-weight: 600; color: #059669;">✅ Phase 1 (Complete)</div>
                    <div style="font-size: 0.875rem; margin-top: 0.5rem;">Initial communication + training materials</div>
                </div>
            </div>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                <div style="flex: 1; padding: 1rem; background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.1)); border-radius: 6px;">
                    <div style="font-weight: 600; color: #2563eb;">🔄 Phase 2 (In Progress)</div>
                    <div style="font-size: 0.875rem; margin-top: 0.5rem;">Monthly reminders to non-enrolled users</div>
                </div>
            </div>
            <div style="display: flex; gap: 1rem;">
                <div style="flex: 1; padding: 1rem; background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.1)); border-radius: 6px;">
                    <div style="font-weight: 600; color: #2563eb;">🔄 Phase 3 (Ongoing)</div>
                    <div style="font-size: 0.875rem; margin-top: 0.5rem;">New hire enrollment on day 1</div>
                </div>
            </div>

            <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
                <strong>Enforcement Timeline:</strong>
                <ul style="margin-top: 0.5rem;">
                    <li><strong>Start:</strong> March 1, 2025</li>
                    <li><strong>Grace Period:</strong> 90 days (expired May 30, 2025)</li>
                    <li><strong>Status:</strong> Full enforcement active</li>
                </ul>
            </div>
        </div>

        <h3>❓ "What evidence satisfies audit requirements?"</h3>
        <p>Each assessment plan specifies <strong>evidence requirements</strong>:</p>

        <table class="evidence-table" style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; background-color: var(--bg-color);">
            <thead>
                <tr style="background-color: #2563eb; color: white;">
                    <th style="padding: 0.75rem; text-align: left;">Assessment</th>
                    <th style="padding: 0.75rem; text-align: left;">Evidence Required</th>
                </tr>
            </thead>
            <tbody>
                <tr style="border-bottom: 1px solid var(--border-color);">
                    <td style="padding: 0.75rem; font-weight: 600;">MFA Enrollment</td>
                    <td style="padding: 0.75rem;">Identity provider reports showing ≥99% enrollment rate</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                    <td style="padding: 0.75rem; font-weight: 600;">MFA Usage</td>
                    <td style="padding: 0.75rem;">Authentication logs showing ZERO successful non-MFA logins</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                    <td style="padding: 0.75rem; font-weight: 600;">Privileged Access</td>
                    <td style="padding: 0.75rem;">100% of privileged authentications show MFA factors</td>
                </tr>
                <tr>
                    <td style="padding: 0.75rem; font-weight: 600;">Approved Methods</td>
                    <td style="padding: 0.75rem;">Report showing only approved types (FIDO2, TOTP, Hardware Token, SMS-fallback)</td>
                </tr>
            </tbody>
        </table>

        <hr style="margin: 3rem 0; border: none; border-top: 2px solid var(--border-color);">

        <h2 style="color: #059669; display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.75rem;">⚖️</span>
            Perspective 3: Risk Manager
        </h2>

        <h3>❓ "What risks do these threats introduce?"</h3>
        <p>The policy addresses <strong>five primary threats</strong> from the IAM threat model:</p>

        <div class="threats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
            <div style="padding: 1rem; background-color: rgba(239, 68, 68, 0.1); border-left: 3px solid #dc2626; border-radius: 4px;">
                <strong>Credential Theft</strong>
                <p style="font-size: 0.875rem; margin: 0.5rem 0 0 0;">Stolen passwords used for unauthorized access</p>
            </div>
            <div style="padding: 1rem; background-color: rgba(239, 68, 68, 0.1); border-left: 3px solid #dc2626; border-radius: 4px;">
                <strong>Phishing Attacks</strong>
                <p style="font-size: 0.875rem; margin: 0.5rem 0 0 0;">Social engineering to capture credentials</p>
            </div>
            <div style="padding: 1rem; background-color: rgba(239, 68, 68, 0.1); border-left: 3px solid #dc2626; border-radius: 4px;">
                <strong>Brute-force Attacks</strong>
                <p style="font-size: 0.875rem; margin: 0.5rem 0 0 0;">Automated password guessing</p>
            </div>
            <div style="padding: 1rem; background-color: rgba(239, 68, 68, 0.1); border-left: 3px solid #dc2626; border-radius: 4px;">
                <strong>Session Replay</strong>
                <p style="font-size: 0.875rem; margin: 0.5rem 0 0 0;">Reusing stolen session tokens</p>
            </div>
            <div style="padding: 1rem; background-color: rgba(239, 68, 68, 0.1); border-left: 3px solid #dc2626; border-radius: 4px;">
                <strong>Insider Threats</strong>
                <p style="font-size: 0.875rem; margin: 0.5rem 0 0 0;">Malicious insiders using stolen credentials</p>
            </div>
        </div>

        <h3>❓ "What am I mitigating?"</h3>
        <p>The <strong><code>risks.mitigated</code></strong> section lists all threats that MFA controls address. These risks are <strong>reduced</strong> (not eliminated) by requiring a second authentication factor.</p>

        <div class="key-insight" style="background-color: rgba(16, 185, 129, 0.1); border-left: 4px solid #059669; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
            <strong style="color: #059669;">💡 Risk Treatment:</strong> Even if an attacker obtains a password, they cannot access systems without the second factor. This significantly reduces the risk but doesn't eliminate it entirely.
        </div>

        <h3>❓ "What am I accepting?"</h3>
        <p>The <strong><code>risks.accepted</code></strong> section documents known vulnerabilities and explains why they're acceptable:</p>

        <div class="risk-acceptance" style="background-color: rgba(245, 158, 11, 0.1); border: 2px solid rgba(245, 158, 11, 0.3); border-radius: 8px; padding: 1.5rem; margin: 1.5rem 0;">
            <h4 style="color: #d97706; margin-top: 0;">⚠️ Accepted Risk: SMS Interception</h4>

            <table style="width: 100%; margin-top: 1rem;">
                <tr>
                    <td style="padding: 0.5rem; font-weight: 600; width: 30%;">Risk:</td>
                    <td style="padding: 0.5rem;">SIM swapping and SMS interception attacks</td>
                </tr>
                <tr>
                    <td style="padding: 0.5rem; font-weight: 600;">Scope:</td>
                    <td style="padding: 0.5rem;">SMS-based MFA (fallback method only)</td>
                </tr>
                <tr>
                    <td style="padding: 0.5rem; font-weight: 600; vertical-align: top;">Justification:</td>
                    <td style="padding: 0.5rem;">
                        <ul style="margin: 0; padding-left: 1.5rem;">
                            <li>SMS is temporary/transitional only</li>
                            <li>Users strongly encouraged to upgrade to TOTP/FIDO2</li>
                            <li>SMS accounts flagged for quarterly review</li>
                            <li>Better than no MFA at all</li>
                        </ul>
                    </td>
                </tr>
            </table>
        </div>

        <h3>❓ "What am I delegating to a customer?"</h3>
        <p><strong>Nothing is delegated</strong> in this policy. This is an <strong>internal</strong> policy for employees, contractors, and vendors.</p>

        <div class="key-insight" style="background-color: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">
            <strong style="color: #3b82f6;">💡 Key Understanding:</strong> The scope explicitly excludes customers. Customer authentication is governed by a <strong>separate policy</strong>, meaning customer authentication risks are managed elsewhere.
        </div>

        <hr style="margin: 3rem 0; border: none; border-top: 2px solid var(--border-color);">

        <h2>Key Takeaways: Writing Your Own Policies</h2>

        <h3>1. Think in Role Perspectives</h3>
        <p>When writing a policy, ask yourself:</p>
        <ul>
            <li><strong>Security Engineer:</strong> Can I trace this to a threat model and express technical controls?</li>
            <li><strong>Compliance Manager:</strong> Is my scope clear? Do I have timelines and evidence requirements?</li>
            <li><strong>Risk Manager:</strong> Do I document what I'm mitigating, accepting, and delegating?</li>
        </ul>

        <h3>2. Separate Concerns</h3>
        <p>Good policies:</p>
        <ul>
            <li>✅ Reference external threat models (don't redefine threats)</li>
            <li>✅ Import controls from catalogs (don't rewrite control text)</li>
            <li>✅ Define organizational scope and risk appetite</li>
            <li>✅ Specify implementation timelines</li>
            <li>✅ Document evidence requirements for audits</li>
        </ul>

        <h3>3. Make It Measurable</h3>
        <p>Every policy should include:</p>
        <ul>
            <li><strong>Objective criteria:</strong> "≥99% enrollment" not "most users enrolled"</li>
            <li><strong>Frequency:</strong> "daily", "weekly", "quarterly"</li>
            <li><strong>Evidence:</strong> Specific reports or logs required</li>
            <li><strong>Thresholds:</strong> Numeric values that define compliance</li>
        </ul>

        <h3>4. Document Risk Decisions</h3>
        <p>Transparency about risk acceptance builds trust:</p>
        <ul>
            <li>Explain <strong>why</strong> risks are accepted</li>
            <li>Define the <strong>scope</strong> of acceptance (limited vs. broad)</li>
            <li>Document <strong>compensating controls</strong></li>
            <li>Set <strong>review timelines</strong> for accepted risks</li>
        </ul>

        <hr style="margin: 3rem 0; border: none; border-top: 2px solid var(--border-color);">

        <h2>The Gemara Layer 3 Pattern</h2>
        <p>A well-written Layer 3 policy:</p>

        <ol style="line-height: 1.8;">
            <li><strong>References</strong> Layer 1 guidance (compliance frameworks)</li>
            <li><strong>Imports</strong> Layer 2 controls (technical requirements)</li>
            <li><strong>Defines</strong> organizational scope (what's in/out)</li>
            <li><strong>Specifies</strong> implementation timelines (when it's active)</li>
            <li><strong>Establishes</strong> assessment plans (how to verify)</li>
            <li><strong>Documents</strong> evidence requirements (what auditors need)</li>
            <li><strong>Declares</strong> risk treatment (mitigate, accept, delegate)</li>
            <li><strong>Assigns</strong> RACI accountability (who does what)</li>
        </ol>

        <div class="info-box" style="margin: 2rem 0; padding: 1.5rem; background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1)); border-left: 4px solid #059669; border-radius: 8px;">
            <h4 style="margin-top: 0; color: #059669;">Success!</h4>
            <p style="margin-bottom: 0;">This structure ensures that <strong>Security Engineers</strong>, <strong>Compliance Managers</strong>, and <strong>Risk Managers</strong> can all find the information they need to do their jobs effectively.</p>
        </div>

        <hr style="margin: 3rem 0; border: none; border-top: 2px solid var(--border-color);">

        <h2>Next Steps</h2>
        <p>In the next module, you'll practice writing your own policies using this framework. You'll learn to:</p>
        <ul>
            <li>Transform legacy policy documents into Gemara format</li>
            <li>Create policy families that work together</li>
            <li>Build complete traceability from guidance → controls → policies</li>
            <li>Use AI assistance to accelerate policy authoring</li>
        </ul>

        <div style="text-align: center; margin: 3rem 0;">
            <p style="font-size: 1.125rem; font-weight: 600; color: var(--primary-color);">Ready to continue? Proceed to Module 4: Advanced Policy Authoring</p>
        </div>
    `;
}

// Export for use in modules.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getModule3Content };
}
