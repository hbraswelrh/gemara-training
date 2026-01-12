// Module Manager - Handles loading and displaying module content
class ModuleManager {
    constructor() {
        this.modules = this.initializeModules();
        this.currentModule = null;
    }

    initializeModules() {
        return {
            1: {
                title: "Understanding the Gemara Framework",
                duration: "30 minutes",
                type: "Web-based with visual diagrams",
                objectives: [
                    "Understand the 6-layer Gemara model",
                    "Recognize how layers interact and build upon each other",
                    "Identify the role of Layer 3 policies in the overall GRC framework"
                ],
                content: this.getModule1Content(),
                quiz: 'module1-quiz',
                exercises: []
            },
            2: {
                title: "Layer 1 & Layer 2 Foundations",
                duration: "45 minutes",
                type: "Web + AI-assisted exploration",
                objectives: [
                    "Read and interpret Layer 1 guidance documents",
                    "Understand threat-informed Layer 2 controls",
                    "Map controls back to guidance sources"
                ],
                content: this.getModule2Content(),
                quiz: 'module2-quiz',
                exercises: ['exercise1']
            },
            3: {
                title: "Layer 3 Policy Writing Fundamentals",
                duration: "90 minutes",
                type: "Web + AI-assisted authoring",
                objectives: [
                    "Understand the purpose and structure of organizational policies",
                    "Write clear, enforceable policy statements",
                    "Create valid Gemara Layer 3 YAML artifacts"
                ],
                content: this.getModule3Content(),
                quiz: 'module3-quiz',
                exercises: ['exercise2', 'exercise3', 'exercise4']
            },
            4: {
                title: "Advanced Policy Authoring with AI",
                duration: "120 minutes",
                type: "Hybrid CLI + Web with intensive AI interaction",
                objectives: [
                    "Master the gemara-mcp-server tool suite",
                    "Use AI to accelerate policy development",
                    "Handle complex policy scenarios"
                ],
                content: this.getModule4Content(),
                quiz: 'module4-quiz',
                exercises: ['exercise5', 'exercise6', 'exercise7', 'exercise8']
            },
            5: {
                title: "Real-World Policy Implementation",
                duration: "60 minutes",
                type: "Case studies and scenario-based learning",
                objectives: [
                    "Apply policy writing skills to realistic scenarios",
                    "Navigate compliance audits",
                    "Communicate policies to stakeholders"
                ],
                content: this.getModule5Content(),
                quiz: 'module5-quiz',
                exercises: ['exercise9', 'exercise10']
            },
            6: {
                title: "Continuous Improvement and Mastery",
                duration: "30 minutes",
                type: "Resources and ongoing learning",
                objectives: [
                    "Establish ongoing policy maintenance practices",
                    "Stay current with evolving guidance and controls",
                    "Build advanced AI-assisted workflows"
                ],
                content: this.getModule6Content(),
                quiz: 'final-exam',
                exercises: []
            }
        };
    }

    loadModule(moduleNum) {
        const module = this.modules[moduleNum];
        if (!module) {
            console.error(`Module ${moduleNum} not found`);
            return;
        }

        this.currentModule = moduleNum;
        const container = document.getElementById('module-container');

        container.innerHTML = `
            <div class="module-content">
                <div class="module-header">
                    <span class="module-badge">Module ${moduleNum}</span>
                    <h2>${module.title}</h2>
                    <div class="module-meta">
                        <span class="meta-item">⏱️ ${module.duration}</span>
                        <span class="meta-item">📋 ${module.type}</span>
                    </div>
                </div>

                <div class="learning-objectives">
                    <h3>Learning Objectives</h3>
                    <ul>
                        ${module.objectives.map(obj => `<li>${obj}</li>`).join('')}
                    </ul>
                </div>

                <div class="module-body">
                    ${module.content}
                </div>

                <div class="module-navigation">
                    ${moduleNum > 1 ? `<button class="btn btn-secondary" id="prev-module">← Previous Module</button>` : '<div></div>'}
                    <div class="nav-actions">
                        ${module.quiz ? `<button class="btn btn-primary" id="take-quiz">Take Quiz</button>` : ''}
                        ${moduleNum < 6 ? `<button class="btn btn-primary" id="next-module">Next Module →</button>` : ''}
                    </div>
                </div>
            </div>
        `;

        // Add event listeners
        this.setupModuleNavigation(moduleNum);

        // Initialize code editors if any
        this.initializeCodeEditors();
    }

    setupModuleNavigation(moduleNum) {
        const prevBtn = document.getElementById('prev-module');
        const nextBtn = document.getElementById('next-module');
        const quizBtn = document.getElementById('take-quiz');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                window.app.loadModule(moduleNum - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                window.progressTracker.completeModule(moduleNum);
                window.app.loadModule(moduleNum + 1);
            });
        }

        if (quizBtn) {
            quizBtn.addEventListener('click', () => {
                const module = this.modules[moduleNum];
                window.quizManager.startQuiz(module.quiz, moduleNum);
            });
        }
    }

    initializeCodeEditors() {
        document.querySelectorAll('.yaml-editor').forEach(element => {
            if (!element.classList.contains('initialized')) {
                const editor = CodeMirror.fromTextArea(element, {
                    mode: 'yaml',
                    theme: 'monokai',
                    lineNumbers: true,
                    lineWrapping: true
                });
                element.classList.add('initialized');
                element.editor = editor;
            }
        });
    }

    getModule1Content() {
        return `
            <h3>Introduction to Gemara</h3>
            <p>Gemara (GRC Engineering Model for Automated Risk Assessment) is a framework that helps organizations manage cybersecurity governance, risk, and compliance (GRC) in a structured, machine-readable way.</p>

            <div class="info-box">
                <h4>Why Gemara?</h4>
                <p>Traditional GRC processes involve significant manual effort, rework, and disconnected tools. Gemara solves this by creating a standardized logical model that enables automated interoperability between compliance activities.</p>
            </div>

            <h3>The Six Layers</h3>
            <div class="layer-diagram" id="layer-diagram">
                <div class="layer" data-layer="6">
                    <div class="layer-number">Layer 6</div>
                    <div class="layer-title">Audit</div>
                    <div class="layer-desc">Review of organizational policy adherence</div>
                </div>
                <div class="layer" data-layer="5">
                    <div class="layer-number">Layer 5</div>
                    <div class="layer-title">Enforcement</div>
                    <div class="layer-desc">Prevention or remediation based on evaluation findings</div>
                </div>
                <div class="layer" data-layer="4">
                    <div class="layer-number">Layer 4</div>
                    <div class="layer-title">Evaluation</div>
                    <div class="layer-desc">Assessment of code, configurations, and deployments</div>
                </div>
                <div class="layer focus-layer" data-layer="3">
                    <div class="layer-number">Layer 3</div>
                    <div class="layer-title">Policy ⭐</div>
                    <div class="layer-desc">Organization-tailored governance rules based on risk appetite</div>
                </div>
                <div class="layer" data-layer="2">
                    <div class="layer-number">Layer 2</div>
                    <div class="layer-title">Controls</div>
                    <div class="layer-desc">Technology-specific security controls informed by Layer 1</div>
                </div>
                <div class="layer" data-layer="1">
                    <div class="layer-number">Layer 1</div>
                    <div class="layer-title">Guidance</div>
                    <div class="layer-desc">High-level cybersecurity best practices (NIST, ISO 27001, etc.)</div>
                </div>
            </div>

            <style>
                .layer-diagram {
                    margin: var(--spacing-xl) 0;
                }
                .layer {
                    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                    padding: var(--spacing-lg);
                    margin-bottom: var(--spacing-md);
                    border-radius: var(--radius-md);
                    border-left: 4px solid var(--primary-color);
                    cursor: pointer;
                    transition: all var(--transition-fast);
                }
                .layer:hover {
                    transform: translateX(8px);
                    box-shadow: var(--shadow-md);
                }
                .focus-layer {
                    background: linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(37, 99, 235, 0.05) 100%);
                    border-left-color: var(--accent-color);
                    border-left-width: 6px;
                }
                .layer-number {
                    font-size: 0.875rem;
                    color: var(--text-muted);
                    font-weight: 600;
                }
                .layer-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin: var(--spacing-xs) 0;
                }
                .layer-desc {
                    color: var(--text-secondary);
                }
            </style>

            <h3>How Layers Interact</h3>
            <p>Each layer builds upon the previous ones, creating a traceable chain from high-level industry guidance down to specific technical implementations:</p>

            <ol>
                <li><strong>Layer 1 (Guidance)</strong> provides industry best practices from frameworks like NIST, ISO 27001, and CIS Controls</li>
                <li><strong>Layer 2 (Controls)</strong> translates guidance into specific, technology-focused security controls</li>
                <li><strong>Layer 3 (Policy)</strong> tailors controls to your organization's specific risk appetite and operational context</li>
                <li><strong>Layer 4 (Evaluation)</strong> assesses whether implementations comply with policies</li>
                <li><strong>Layer 5 (Enforcement)</strong> takes action based on evaluation results</li>
                <li><strong>Layer 6 (Audit)</strong> reviews the entire process for compliance and effectiveness</li>
            </ol>

            <div class="info-box success">
                <h4>Your Focus: Layer 3 Policies</h4>
                <p>As a compliance professional, you'll primarily work with Layer 3, writing organizational policies that bridge the gap between industry controls (Layer 2) and your organization's specific needs.</p>
            </div>

            <h3>Machine-Readable Format</h3>
            <p>Gemara uses YAML (Yet Another Markup Language) to represent artifacts at each layer. This enables:</p>
            <ul>
                <li>Automated validation of policy compliance</li>
                <li>Programmatic querying and analysis</li>
                <li>Integration with development workflows</li>
                <li>Version control and change tracking</li>
            </ul>

            <h3>Example Artifact Flow</h3>
            <div class="info-box">
                <h4>Layer 1 → Layer 2 → Layer 3 Example</h4>
                <p><strong>Layer 1:</strong> NIST CSF recommends "Identify and authenticate users"</p>
                <p><strong>Layer 2:</strong> Control specifies "Implement multi-factor authentication (MFA) for all remote access"</p>
                <p><strong>Layer 3:</strong> Your policy states "All employees must use MFA when accessing company systems remotely. Exceptions require VP approval."</p>
            </div>

            <h3>Key Takeaways</h3>
            <ul>
                <li>Gemara provides a standardized, machine-readable framework for GRC</li>
                <li>The 6-layer model creates traceability from guidance to implementation</li>
                <li>Layer 3 policies are where compliance professionals add organizational context</li>
                <li>YAML format enables automation and tool integration</li>
            </ul>
        `;
    }

    getModule2Content() {
        return `
            <h3>Layer 1: Industry Guidance</h3>
            <p>Layer 1 contains high-level cybersecurity best practices from authoritative sources. These provide the foundation for all compliance activities.</p>

            <h4>Common Guidance Frameworks</h4>
            <div class="frameworks-grid">
                <div class="framework-card">
                    <h5>NIST CSF</h5>
                    <p>NIST Cybersecurity Framework - comprehensive guidance organized around Identify, Protect, Detect, Respond, and Recover functions.</p>
                </div>
                <div class="framework-card">
                    <h5>ISO 27001</h5>
                    <p>International standard for information security management systems with 114 controls across 14 domains.</p>
                </div>
                <div class="framework-card">
                    <h5>CIS Controls</h5>
                    <p>Center for Internet Security Controls - 18 prioritized cybersecurity best practices.</p>
                </div>
                <div class="framework-card">
                    <h5>FINOS CCC</h5>
                    <p>Common Cloud Controls - industry guidance for cloud security in financial services.</p>
                </div>
            </div>

            <style>
                .frameworks-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: var(--spacing-md);
                    margin: var(--spacing-lg) 0;
                }
                .framework-card {
                    background-color: var(--bg-color);
                    padding: var(--spacing-lg);
                    border-radius: var(--radius-md);
                    border: 1px solid var(--border-color);
                }
                .framework-card h5 {
                    color: var(--primary-color);
                    margin-bottom: var(--spacing-sm);
                }
            </style>

            <h4>Layer 1 YAML Structure</h4>
            <div class="code-editor-container">
                <div class="editor-header">
                    <span class="editor-title">Example: Layer 1 Guidance Artifact</span>
                </div>
                <textarea class="yaml-editor">title: "Identity Management and Access Control Guidance"
metadata:
  id: "nist-csf-pr-ac-1"
  description: "Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users and processes"
  author:
    id: nist
    name: "National Institute of Standards and Technology"
    type: Organization
    contact:
      name: "NIST Cybersecurity"
      affiliation: "U.S. Department of Commerce"
      email: "cyberframework@nist.gov"
  version: "1.1"
  mapping-references:
    - id: "NIST-CSF"
      title: "NIST Cybersecurity Framework"
      version: "1.1"
      description: "Framework for improving critical infrastructure cybersecurity"
      url: "https://www.nist.gov/cyberframework"
document-type: "Framework"
front-matter: "This guidance provides best practices for identity and access management."
families:
  - id: "access-control"
    title: "Access Control"
    description: "Controls for managing access to systems and data"
guidelines:
  - id: "PR.AC-1"
    title: "Identity Management"
    description: "Identities and credentials are issued, managed, verified, revoked, and audited"
    family: "access-control"
    mappings:
      - reference: "ISO-27001"
        target-id: "A.9.2.1"</textarea>
            </div>

            <h3>Layer 2: Technology Controls</h3>
            <p>Layer 2 translates abstract guidance into specific, implementable security controls. These are threat-informed and technology-specific.</p>

            <div class="info-box">
                <h4>What Makes a Control "Threat-Informed"?</h4>
                <p>Threat-informed controls are designed based on real-world attack patterns and security research, not just theoretical best practices. They address specific threats that organizations actually face.</p>
            </div>

            <h4>Layer 2 YAML Structure</h4>
            <div class="code-editor-container">
                <div class="editor-header">
                    <span class="editor-title">Example: Layer 2 Control Artifact</span>
                </div>
                <textarea class="yaml-editor">title: "Identity and Access Management Controls"
metadata:
  id: "iam-controls-catalog"
  description: "Catalog of identity and access management controls"
  author:
    id: security-team
    name: "Security Team"
    type: Human
    contact:
      name: "Security Architect"
      affiliation: "Security Department"
      email: "security@company.com"
  version: "2.0"
families:
  - id: "authentication"
    title: "Authentication Controls"
    description: "Controls for verifying user identity"
controls:
  - id: "IAM-MFA-001"
    title: "Multi-Factor Authentication for Remote Access"
    objective: "Require multi-factor authentication for all remote access to prevent credential-based attacks"
    family: "authentication"
    assessment-requirements:
      - id: "IAM-MFA-001-AR1"
        text: "Verify that MFA is enabled for all remote access mechanisms"
        applicability: ["remote-access", "vpn", "cloud"]
        recommendation: "Use TOTP or hardware tokens; avoid SMS-based MFA"
      - id: "IAM-MFA-001-AR2"
        text: "Confirm backup authentication methods are configured"
        applicability: ["remote-access"]
        recommendation: "Require at least one backup method per user"
    guideline-mappings:
      - reference: "nist-csf-pr-ac-1"
        target-id: "PR.AC-1"
    threat-mappings:
      - reference: "mitre-attack"
        target-id: "T1078"
threats:
  - id: "T1078"
    title: "Valid Accounts"
    description: "Adversaries may obtain and abuse credentials of existing accounts"
    capabilities: ["initial-access", "persistence", "privilege-escalation"]</textarea>
            </div>

            <h3>Guidance-to-Control Relationship</h3>
            <p>Understanding how Layer 1 guidance maps to Layer 2 controls is crucial for writing effective Layer 3 policies.</p>

            <div class="mapping-example">
                <div class="mapping-step">
                    <div class="step-label">Layer 1 Guidance</div>
                    <div class="step-content">
                        <strong>NIST CSF PR.AC-1:</strong> "Identities and credentials are issued, managed, verified, revoked, and audited"
                    </div>
                </div>
                <div class="mapping-arrow">↓</div>
                <div class="mapping-step">
                    <div class="step-label">Layer 2 Controls (Multiple)</div>
                    <div class="step-content">
                        • Multi-Factor Authentication<br>
                        • Password Complexity Requirements<br>
                        • Account Lifecycle Management<br>
                        • Access Review Processes<br>
                        • Privileged Access Management
                    </div>
                </div>
                <div class="mapping-arrow">↓</div>
                <div class="mapping-step">
                    <div class="step-label">Layer 3 Policy (Next Module!)</div>
                    <div class="step-content">
                        Your organization's specific rules for implementing these controls
                    </div>
                </div>
            </div>

            <style>
                .mapping-example {
                    margin: var(--spacing-xl) 0;
                    padding: var(--spacing-lg);
                    background-color: var(--bg-color);
                    border-radius: var(--radius-md);
                }
                .mapping-step {
                    background-color: var(--surface-color);
                    padding: var(--spacing-lg);
                    border-radius: var(--radius-md);
                    margin: var(--spacing-md) 0;
                }
                .step-label {
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: var(--primary-color);
                    margin-bottom: var(--spacing-sm);
                }
                .step-content {
                    color: var(--text-secondary);
                }
                .mapping-arrow {
                    text-align: center;
                    font-size: 1.5rem;
                    color: var(--primary-color);
                    margin: var(--spacing-sm) 0;
                }
            </style>

            <h3>AI-Assisted Exploration</h3>
            <div class="info-box warning">
                <h4>Exercise 1: Query and Explore</h4>
                <p>This is an AI-assisted exercise. Click the button below to open the AI assistant and begin exploring Layer 1 and Layer 2 artifacts.</p>
                <button class="btn btn-primary" id="start-exercise-1">Start Exercise 1</button>
            </div>

            <h3>Key Takeaways</h3>
            <ul>
                <li>Layer 1 provides industry guidance from frameworks like NIST, ISO, and CIS</li>
                <li>Layer 2 translates guidance into specific, threat-informed controls</li>
                <li>Controls are technology-specific and implementable</li>
                <li>One piece of guidance typically maps to multiple controls</li>
                <li>Understanding this relationship is essential for policy writing</li>
            </ul>
        `;
    }

    getModule3Content() {
        return `
            <h3>Welcome to Policy Writing!</h3>
            <p>Layer 3 is where you, as a compliance professional, add critical organizational context to industry controls. You'll learn to write policies that are clear, enforceable, and tailored to your organization's specific needs.</p>

            <h3>Policy vs. Procedure vs. Standard vs. Guideline</h3>
            <div class="comparison-grid">
                <div class="comparison-item">
                    <h4>Policy</h4>
                    <p><strong>What:</strong> High-level statement of intent</p>
                    <p><strong>Example:</strong> "All employees must use MFA"</p>
                    <p><strong>Audience:</strong> Everyone</p>
                </div>
                <div class="comparison-item">
                    <h4>Standard</h4>
                    <p><strong>What:</strong> Specific mandatory requirement</p>
                    <p><strong>Example:</strong> "MFA must use TOTP or WebAuthn"</p>
                    <p><strong>Audience:</strong> Implementers</p>
                </div>
                <div class="comparison-item">
                    <h4>Procedure</h4>
                    <p><strong>What:</strong> Step-by-step how-to</p>
                    <p><strong>Example:</strong> "1. Download Authenticator app 2. Scan QR code..."</p>
                    <p><strong>Audience:</strong> End users</p>
                </div>
                <div class="comparison-item">
                    <h4>Guideline</h4>
                    <p><strong>What:</strong> Recommended best practice</p>
                    <p><strong>Example:</strong> "Consider using hardware tokens for executives"</p>
                    <p><strong>Audience:</strong> Decision makers</p>
                </div>
            </div>

            <style>
                .comparison-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: var(--spacing-md);
                    margin: var(--spacing-xl) 0;
                }
                .comparison-item {
                    background-color: var(--bg-color);
                    padding: var(--spacing-lg);
                    border-radius: var(--radius-md);
                    border-top: 3px solid var(--primary-color);
                }
                .comparison-item h4 {
                    color: var(--primary-color);
                    margin-bottom: var(--spacing-md);
                }
                .comparison-item p {
                    font-size: 0.875rem;
                    margin-bottom: var(--spacing-sm);
                }
            </style>

            <h3>Characteristics of Effective Policies</h3>
            <div class="characteristics-list">
                <div class="characteristic">
                    <span class="char-icon">✓</span>
                    <div class="char-content">
                        <h4>Clear and Concise</h4>
                        <p>Use simple language that everyone can understand. Avoid jargon unless necessary.</p>
                    </div>
                </div>
                <div class="characteristic">
                    <span class="char-icon">✓</span>
                    <div class="char-content">
                        <h4>Enforceable</h4>
                        <p>Include specific requirements that can be objectively verified and measured.</p>
                    </div>
                </div>
                <div class="characteristic">
                    <span class="char-icon">✓</span>
                    <div class="char-content">
                        <h4>Risk-Based</h4>
                        <p>Align with organizational risk appetite and focus on material risks.</p>
                    </div>
                </div>
                <div class="characteristic">
                    <span class="char-icon">✓</span>
                    <div class="char-content">
                        <h4>Traceable</h4>
                        <p>Link back to source controls and guidance for compliance mapping.</p>
                    </div>
                </div>
                <div class="characteristic">
                    <span class="char-icon">✓</span>
                    <div class="char-content">
                        <h4>Maintainable</h4>
                        <p>Include version control, review dates, and ownership information.</p>
                    </div>
                </div>
            </div>

            <style>
                .characteristics-list {
                    margin: var(--spacing-xl) 0;
                }
                .characteristic {
                    display: flex;
                    gap: var(--spacing-md);
                    padding: var(--spacing-lg);
                    margin-bottom: var(--spacing-md);
                    background-color: var(--bg-color);
                    border-radius: var(--radius-md);
                }
                .char-icon {
                    flex-shrink: 0;
                    width: 32px;
                    height: 32px;
                    background-color: var(--secondary-color);
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                }
                .char-content h4 {
                    margin-bottom: var(--spacing-xs);
                    color: var(--text-primary);
                }
                .char-content p {
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                }
            </style>

            <h3>Layer 3 YAML Structure</h3>
            <p>Here's what a complete Layer 3 policy looks like in Gemara format:</p>

            <div class="code-editor-container">
                <div class="editor-header">
                    <span class="editor-title">Example: Complete Layer 3 Policy</span>
                    <div class="editor-actions">
                        <button class="btn btn-small btn-secondary" id="validate-yaml">Validate</button>
                    </div>
                </div>
                <textarea class="yaml-editor">metadata:
  id: "mfa-policy-001"
  description: "Multi-factor authentication policy for remote access and sensitive systems"
  version: "1.0.0"
  author:
    id: security-team
    name: "Security Team"
    type: Human
    contact:
      name: "Chief Information Security Officer"
      affiliation: "Security Department"
      email: "ciso@company.com"
  date:
    created: "2024-01-15"
    modified: "2024-01-15"
  mapping-references:
    - id: "NIST-800-53"
      title: "NIST Special Publication 800-53"
      version: "Rev. 5"
      description: "Security and Privacy Controls for Federal Information Systems"
      url: "https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final"
    - id: "SOC2"
      title: "SOC 2 Trust Service Criteria"
      version: "2017"
      description: "Trust Services Criteria for Security, Availability, Processing Integrity, Confidentiality, and Privacy"
      url: "https://www.aicpa.org/soc"
  draft: false

title: "Multi-Factor Authentication Policy"
purpose: "Require multi-factor authentication for all remote access and access to sensitive systems to protect against credential theft and unauthorized access"

contacts:
  responsible:
    - name: "IT Director"
      primary: true
      affiliation: "Information Technology Department"
      email: "it-director@company.com"
    - name: "Systems Administrator"
      primary: false
      affiliation: "Information Technology Department"
      email: "sysadmin@company.com"
  accountable:
    - name: "Chief Information Security Officer"
      primary: true
      affiliation: "Security Department"
      email: "ciso@company.com"
  consulted:
    - name: "Legal Counsel"
      affiliation: "Legal Department"
      email: "legal@company.com"
    - name: "Compliance Officer"
      affiliation: "Compliance Department"
      email: "compliance@company.com"
  informed:
    - name: "All Employees"
      affiliation: "Company-wide"
    - name: "External Auditors"
      affiliation: "External"

scope:
  in:
    technologies:
      - "VPN (Virtual Private Network)"
      - "Cloud Applications (SaaS)"
      - "Email Systems"
      - "Administrative Interfaces"
      - "Database Access"
    geopolitical:
      - "United States"
      - "European Union"
      - "Canada"
    data-sensitivity:
      - "Confidential"
      - "Highly Confidential"
      - "PII (Personally Identifiable Information)"
    user-roles:
      - "Employees"
      - "Contractors"
      - "Third-party Vendors"
      - "Administrators"
    groups:
      - "Remote Workers"
      - "Privileged Users"
  out:
    technologies:
      - "On-premises Desktop Systems"
      - "Physical Security Systems"
    user-roles:
      - "Service Accounts"
      - "System Accounts"
    groups:
      - "On-premises Only Workers"

imports:
  policies: []
  catalogs:
    - id: "iam-controls"
      location: "https://company.com/catalogs/iam-controls.yaml"
  guidance:
    - id: "nist-csf"
      location: "https://company.com/guidance/nist-csf.yaml"

adherence:
  evaluation-methods:
    - "Automated MFA enrollment compliance scans"
    - "Quarterly access control reviews"
    - "Authentication log analysis"
    - "User account audits"
  assessment-plans:
    - "Monthly MFA enrollment status reports"
    - "Quarterly authentication method reviews"
    - "Annual third-party security assessment"
  enforcement-methods:
    - "Conditional access policies in identity provider"
    - "VPN access requires MFA verification"
    - "Cloud application SSO enforces MFA"
    - "Account suspension for non-compliant users"
  non-compliance: "User accounts without MFA will receive a 30-day grace period warning. After 30 days, non-compliant accounts will be automatically disabled until MFA is enabled. Exceptions require VP-level approval and must include compensating controls."

implementation-plan:
  notification-processes:
    - "Email notification to all affected users 60 days before enforcement"
    - "Monthly reminder emails during grace period"
    - "Training sessions for MFA enrollment"
    - "Help desk support documentation"
  evaluation-timeline:
    start: "2024-02-01"
    end: "2024-03-01"
  enforcement-timeline:
    start: "2024-03-01"
    end: "2024-12-31"

risks:
  mitigated:
    - reference: "threat-model-001"
      risk-id: "RISK-AUTH-001"
    - reference: "threat-model-001"
      risk-id: "RISK-AUTH-002"
  accepted:
    - justification: "Legacy manufacturing control systems cannot support MFA due to technical limitations. Network segmentation and additional monitoring compensate."
      scope:
        technologies: ["Industrial Control Systems"]
        geopolitical: ["Manufacturing Facilities"]</textarea>
            </div>

            <h3>Writing Effective Policy Statements</h3>
            <div class="writing-tips">
                <div class="tip-section">
                    <h4>DO:</h4>
                    <ul>
                        <li>Use directive language: "must", "will", "shall"</li>
                        <li>Be specific about who, what, when, where</li>
                        <li>State the requirement clearly</li>
                        <li>Include measurable criteria</li>
                    </ul>
                </div>
                <div class="tip-section">
                    <h4>DON'T:</h4>
                    <ul>
                        <li>Use weak language: "should", "may", "consider"</li>
                        <li>Include implementation details (those go in procedures)</li>
                        <li>Make it too technical for the audience</li>
                        <li>Create unenforceable requirements</li>
                    </ul>
                </div>
            </div>

            <style>
                .writing-tips {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: var(--spacing-lg);
                    margin: var(--spacing-xl) 0;
                }
                .tip-section {
                    padding: var(--spacing-lg);
                    border-radius: var(--radius-md);
                }
                .tip-section:first-child {
                    background-color: rgba(16, 185, 129, 0.1);
                    border: 1px solid var(--secondary-color);
                }
                .tip-section:last-child {
                    background-color: rgba(239, 68, 68, 0.1);
                    border: 1px solid var(--danger-color);
                }
            </style>

            <div class="info-box success">
                <h4>Ready to Practice?</h4>
                <p>You now have the foundational knowledge to write Layer 3 policies. Complete the quiz to test your understanding, then move on to the hands-on exercises where you'll write real policies with AI assistance!</p>
            </div>
        `;
    }

    getModule4Content() {
        return `
            <h3>Mastering AI-Assisted Policy Development</h3>
            <p>In this module, you'll learn to leverage the gemara-mcp-server and AI agents to accelerate your policy writing workflow while maintaining quality and compliance.</p>

            <div class="info-box">
                <h4>What You'll Master</h4>
                <ul>
                    <li>Using gemara-mcp-server tools effectively</li>
                    <li>Crafting effective prompts for policy generation</li>
                    <li>Iterative refinement with AI feedback</li>
                    <li>Validating and storing policy artifacts</li>
                    <li>Building reusable policy templates</li>
                </ul>
            </div>

            <h3>Gemara MCP Server Tools</h3>
            <p>The MCP server provides these key capabilities:</p>

            <div class="tools-reference">
                <div class="tool-card">
                    <h4>store_layer3_yaml</h4>
                    <p class="tool-desc">Store a Layer 3 policy artifact</p>
                    <div class="tool-usage">
                        <strong>When to use:</strong> After creating or updating a policy
                    </div>
                </div>
                <div class="tool-card">
                    <h4>validate_gemara_yaml</h4>
                    <p class="tool-desc">Validate YAML syntax and schema compliance</p>
                    <div class="tool-usage">
                        <strong>When to use:</strong> Before storing to catch errors early
                    </div>
                </div>
                <div class="tool-card">
                    <h4>query_artifacts</h4>
                    <p class="tool-desc">Search and filter stored artifacts</p>
                    <div class="tool-usage">
                        <strong>When to use:</strong> Finding related policies or controls
                    </div>
                </div>
                <div class="tool-card">
                    <h4>check_applicability</h4>
                    <p class="tool-desc">Determine which policies apply to a context</p>
                    <div class="tool-usage">
                        <strong>When to use:</strong> Scoping compliance requirements
                    </div>
                </div>
            </div>

            <style>
                .tools-reference {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: var(--spacing-md);
                    margin: var(--spacing-xl) 0;
                }
                .tool-card {
                    background-color: var(--surface-color);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-md);
                    padding: var(--spacing-lg);
                }
                .tool-card h4 {
                    color: var(--primary-color);
                    font-family: var(--font-mono);
                    font-size: 1rem;
                    margin-bottom: var(--spacing-sm);
                }
                .tool-desc {
                    color: var(--text-secondary);
                    margin-bottom: var(--spacing-md);
                }
                .tool-usage {
                    font-size: 0.875rem;
                    padding-top: var(--spacing-md);
                    border-top: 1px solid var(--border-color);
                }
            </style>

            <h3>AI-Assisted Workflow</h3>
            <p>Follow this proven workflow for policy development:</p>

            <div class="workflow-steps">
                <div class="workflow-step">
                    <div class="step-num">1</div>
                    <div class="step-content">
                        <h4>Identify Source Controls</h4>
                        <p>Ask AI to query Layer 2 controls related to your policy domain</p>
                        <code>Example: "Show me all Layer 2 controls related to data encryption"</code>
                    </div>
                </div>
                <div class="workflow-step">
                    <div class="step-num">2</div>
                    <div class="step-content">
                        <h4>Generate Draft Policy</h4>
                        <p>Provide AI with controls and organizational context to generate initial draft</p>
                        <code>Example: "Create a Layer 3 policy for encryption at rest, suitable for a healthcare organization"</code>
                    </div>
                </div>
                <div class="workflow-step">
                    <div class="step-num">3</div>
                    <div class="step-content">
                        <h4>Refine with Feedback</h4>
                        <p>Iteratively improve the policy based on AI suggestions and validation</p>
                        <code>Example: "Make the policy statement more specific about key management"</code>
                    </div>
                </div>
                <div class="workflow-step">
                    <div class="step-num">4</div>
                    <div class="step-content">
                        <h4>Validate Schema</h4>
                        <p>Use validate_gemara_yaml to ensure correctness</p>
                        <code>Example: "Validate this policy against the Gemara schema"</code>
                    </div>
                </div>
                <div class="workflow-step">
                    <div class="step-num">5</div>
                    <div class="step-content">
                        <h4>Store Artifact</h4>
                        <p>Save the final policy using store_layer3_yaml</p>
                        <code>Example: "Store this policy as pol-data-encryption-001"</code>
                    </div>
                </div>
            </div>

            <style>
                .workflow-steps {
                    margin: var(--spacing-xl) 0;
                }
                .workflow-step {
                    display: flex;
                    gap: var(--spacing-lg);
                    margin-bottom: var(--spacing-lg);
                    padding: var(--spacing-lg);
                    background-color: var(--bg-color);
                    border-radius: var(--radius-md);
                }
                .step-num {
                    flex-shrink: 0;
                    width: 48px;
                    height: 48px;
                    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.25rem;
                    font-weight: 700;
                }
                .step-content h4 {
                    margin-bottom: var(--spacing-sm);
                }
                .step-content code {
                    display: block;
                    margin-top: var(--spacing-sm);
                    padding: var(--spacing-sm);
                    background-color: var(--surface-color);
                    border-radius: var(--radius-sm);
                    font-size: 0.875rem;
                    color: var(--primary-color);
                }
            </style>

            <h3>Hands-On Exercises</h3>
            <p>Complete these exercises to master AI-assisted policy authoring:</p>

            <div class="exercises-list">
                <div class="exercise-card">
                    <div class="exercise-header">
                        <h4>Exercise 5: Compliance Gap Analysis</h4>
                        <span class="difficulty">Intermediate</span>
                    </div>
                    <p>Use AI to analyze your control set and identify missing policies</p>
                    <button class="btn btn-primary btn-small" onclick="window.app.startExercise(5)">Start Exercise</button>
                </div>
                <div class="exercise-card">
                    <div class="exercise-header">
                        <h4>Exercise 6: Policy Modernization</h4>
                        <span class="difficulty">Intermediate</span>
                    </div>
                    <p>Transform a legacy policy document into Gemara format</p>
                    <button class="btn btn-primary btn-small" onclick="window.app.startExercise(6)">Start Exercise</button>
                </div>
                <div class="exercise-card">
                    <div class="exercise-header">
                        <h4>Exercise 7: Policy Family Creation</h4>
                        <span class="difficulty">Advanced</span>
                    </div>
                    <p>Build a complete policy family for access control</p>
                    <button class="btn btn-primary btn-small" onclick="window.app.startExercise(7)">Start Exercise</button>
                </div>
                <div class="exercise-card">
                    <div class="exercise-header">
                        <h4>Exercise 8: Cross-Layer Integration</h4>
                        <span class="difficulty">Advanced</span>
                    </div>
                    <p>Create end-to-end traceability from guidance to policy</p>
                    <button class="btn btn-primary btn-small" onclick="window.app.startExercise(8)">Start Exercise</button>
                </div>
            </div>

            <style>
                .exercises-list {
                    margin: var(--spacing-xl) 0;
                }
                .exercise-card {
                    background-color: var(--surface-color);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-md);
                    padding: var(--spacing-lg);
                    margin-bottom: var(--spacing-md);
                }
                .exercise-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: var(--spacing-sm);
                }
                .difficulty {
                    font-size: 0.75rem;
                    padding: var(--spacing-xs) var(--spacing-sm);
                    background-color: var(--primary-light);
                    color: white;
                    border-radius: var(--radius-sm);
                }
            </style>

            <div class="info-box success">
                <h4>Pro Tips</h4>
                <ul>
                    <li>Always validate before storing - catch errors early</li>
                    <li>Use AI to explain validation errors and suggest fixes</li>
                    <li>Build a library of prompt templates for common policy types</li>
                    <li>Review AI-generated content critically - you're the expert!</li>
                    <li>Save successful prompts for reuse</li>
                </ul>
            </div>
        `;
    }

    getModule5Content() {
        return `
            <h3>Applying Your Skills to Real Scenarios</h3>
            <p>Theory meets practice! In this module, you'll apply everything you've learned to realistic compliance scenarios.</p>

            <div class="case-studies">
                <h3>Industry Case Studies</h3>

                <div class="case-study">
                    <div class="case-header">
                        <h4>Case Study 1: Financial Services - PCI-DSS Compliance</h4>
                        <span class="industry-badge">Finance</span>
                    </div>
                    <div class="case-content">
                        <p><strong>Scenario:</strong> A regional bank needs to implement PCI-DSS requirements for cardholder data protection.</p>
                        <p><strong>Challenge:</strong> Balance strict security requirements with operational efficiency for 500+ employees.</p>
                        <p><strong>Your Task:</strong> Create Layer 3 policies that satisfy PCI-DSS while accommodating the bank's legacy systems.</p>
                        <button class="btn btn-secondary btn-small" onclick="window.app.loadCaseStudy(1)">View Full Case Study</button>
                    </div>
                </div>

                <div class="case-study">
                    <div class="case-header">
                        <h4>Case Study 2: Healthcare - HIPAA Privacy & Security</h4>
                        <span class="industry-badge">Healthcare</span>
                    </div>
                    <div class="case-content">
                        <p><strong>Scenario:</strong> A hospital system is migrating to cloud-based EHR and needs updated policies.</p>
                        <p><strong>Challenge:</strong> Ensure HIPAA compliance while enabling mobile access for physicians.</p>
                        <p><strong>Your Task:</strong> Develop policies for cloud data storage, mobile device usage, and access controls.</p>
                        <button class="btn btn-secondary btn-small" onclick="window.app.loadCaseStudy(2)">View Full Case Study</button>
                    </div>
                </div>

                <div class="case-study">
                    <div class="case-header">
                        <h4>Case Study 3: SaaS Company - SOC 2 Type II</h4>
                        <span class="industry-badge">Technology</span>
                    </div>
                    <div class="case-content">
                        <p><strong>Scenario:</strong> A growing SaaS startup needs SOC 2 Type II certification to win enterprise customers.</p>
                        <p><strong>Challenge:</strong> Build comprehensive policy framework quickly with limited compliance team.</p>
                        <p><strong>Your Task:</strong> Create policies covering all SOC 2 Trust Service Criteria using AI assistance.</p>
                        <button class="btn btn-secondary btn-small" onclick="window.app.loadCaseStudy(3)">View Full Case Study</button>
                    </div>
                </div>
            </div>

            <style>
                .case-studies {
                    margin: var(--spacing-xl) 0;
                }
                .case-study {
                    background-color: var(--surface-color);
                    border-left: 4px solid var(--primary-color);
                    border-radius: var(--radius-md);
                    margin-bottom: var(--spacing-lg);
                    overflow: hidden;
                }
                .case-header {
                    background-color: var(--bg-color);
                    padding: var(--spacing-lg);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .case-content {
                    padding: var(--spacing-lg);
                }
                .industry-badge {
                    font-size: 0.75rem;
                    padding: var(--spacing-xs) var(--spacing-md);
                    background-color: var(--secondary-color);
                    color: white;
                    border-radius: var(--radius-sm);
                }
            </style>

            <h3>Common Challenges in Policy Implementation</h3>
            <div class="challenges">
                <div class="challenge-item">
                    <h4>1. Stakeholder Resistance</h4>
                    <p><strong>Problem:</strong> Department heads push back on security policies that impact productivity</p>
                    <p><strong>Solution:</strong> Include business impact analysis in policies, offer exceptions process, communicate trade-offs clearly</p>
                </div>
                <div class="challenge-item">
                    <h4>2. Conflicting Requirements</h4>
                    <p><strong>Problem:</strong> Different compliance frameworks have overlapping but not identical requirements</p>
                    <p><strong>Solution:</strong> Map all requirements, identify common denominators, write policies that satisfy multiple frameworks</p>
                </div>
                <div class="challenge-item">
                    <h4>3. Resource Constraints</h4>
                    <p><strong>Problem:</strong> Limited budget and staff to implement all desired controls</p>
                    <p><strong>Solution:</strong> Risk-based prioritization, phased implementation, document compensating controls for gaps</p>
                </div>
                <div class="challenge-item">
                    <h4>4. Legacy Systems</h4>
                    <p><strong>Problem:</strong> Old systems can't meet modern security requirements</p>
                    <p><strong>Solution:</strong> Network segmentation, additional monitoring, planned sunset dates, exception management</p>
                </div>
            </div>

            <style>
                .challenges {
                    margin: var(--spacing-xl) 0;
                }
                .challenge-item {
                    padding: var(--spacing-lg);
                    margin-bottom: var(--spacing-md);
                    background-color: var(--bg-color);
                    border-radius: var(--radius-md);
                }
                .challenge-item h4 {
                    color: var(--accent-color);
                    margin-bottom: var(--spacing-sm);
                }
            </style>

            <h3>Hands-On Exercises</h3>
            <div class="info-box warning">
                <h4>Exercise 9: Case Study Application</h4>
                <p>Choose one of the case studies above and develop a complete policy set with AI assistance. Address all scenario-specific challenges.</p>
                <button class="btn btn-primary" onclick="window.app.startExercise(9)">Start Exercise 9</button>
            </div>

            <div class="info-box warning">
                <h4>Exercise 10: Audit Preparation</h4>
                <p>Use AI to review policy completeness, generate compliance matrices, and prepare for an audit simulation.</p>
                <button class="btn btn-primary" onclick="window.app.startExercise(10)">Start Exercise 10</button>
            </div>

            <h3>Communicating Policies Effectively</h3>
            <p>Writing the policy is only half the battle. You need to communicate it effectively:</p>

            <div class="communication-tips">
                <div class="tip">
                    <h4>Executive Summary</h4>
                    <ul>
                        <li>One page maximum</li>
                        <li>Focus on business value and risk reduction</li>
                        <li>Include cost-benefit analysis</li>
                        <li>Highlight compliance achievements</li>
                    </ul>
                </div>
                <div class="tip">
                    <h4>Training Materials</h4>
                    <ul>
                        <li>Create role-specific guides</li>
                        <li>Use examples and scenarios</li>
                        <li>Provide quick reference cards</li>
                        <li>Offer hands-on workshops</li>
                    </ul>
                </div>
                <div class="tip">
                    <h4>Rollout Strategy</h4>
                    <ul>
                        <li>Pilot with friendly departments first</li>
                        <li>Gather and address feedback</li>
                        <li>Phased enforcement</li>
                        <li>Monitor adoption metrics</li>
                    </ul>
                </div>
            </div>

            <style>
                .communication-tips {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: var(--spacing-lg);
                    margin: var(--spacing-xl) 0;
                }
                .tip {
                    background-color: var(--surface-color);
                    padding: var(--spacing-lg);
                    border-radius: var(--radius-md);
                    border: 1px solid var(--border-color);
                }
                .tip h4 {
                    color: var(--primary-color);
                    margin-bottom: var(--spacing-md);
                }
            </style>

            <div class="info-box success">
                <h4>You're Almost Done!</h4>
                <p>After completing this module's exercises, you'll have real-world experience applying Gemara policy writing to complex compliance scenarios. One more module to go!</p>
            </div>
        `;
    }

    getModule6Content() {
        return `
            <h3>Mastery and Beyond</h3>
            <p>Congratulations on making it to the final module! Here you'll learn how to maintain and continuously improve your policy framework.</p>

            <h3>Policy Lifecycle Management</h3>
            <div class="lifecycle-diagram">
                <div class="lifecycle-phase">
                    <div class="phase-icon">📝</div>
                    <h4>Create/Update</h4>
                    <p>Write new policies or update existing ones based on changes in business, technology, or threat landscape</p>
                </div>
                <div class="lifecycle-arrow">→</div>
                <div class="lifecycle-phase">
                    <div class="phase-icon">✓</div>
                    <h4>Review/Approve</h4>
                    <p>Stakeholder review and management approval process</p>
                </div>
                <div class="lifecycle-arrow">→</div>
                <div class="lifecycle-phase">
                    <div class="phase-icon">📢</div>
                    <h4>Communicate</h4>
                    <p>Roll out to affected teams with training and documentation</p>
                </div>
                <div class="lifecycle-arrow">→</div>
                <div class="lifecycle-phase">
                    <div class="phase-icon">⚙️</div>
                    <h4>Implement</h4>
                    <p>Deploy technical controls and processes to enforce the policy</p>
                </div>
                <div class="lifecycle-arrow">→</div>
                <div class="lifecycle-phase">
                    <div class="phase-icon">📊</div>
                    <h4>Monitor</h4>
                    <p>Track compliance, measure effectiveness, gather feedback</p>
                </div>
                <div class="lifecycle-arrow">→</div>
                <div class="lifecycle-phase">
                    <div class="phase-icon">🔄</div>
                    <h4>Review</h4>
                    <p>Periodic review (annually or as triggered by changes)</p>
                </div>
            </div>

            <style>
                .lifecycle-diagram {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    margin: var(--spacing-xl) 0;
                    padding: var(--spacing-lg);
                    background-color: var(--bg-color);
                    border-radius: var(--radius-lg);
                }
                .lifecycle-phase {
                    flex: 1;
                    min-width: 200px;
                    text-align: center;
                    padding: var(--spacing-md);
                }
                .phase-icon {
                    font-size: 2rem;
                    margin-bottom: var(--spacing-sm);
                }
                .lifecycle-phase h4 {
                    color: var(--primary-color);
                    margin-bottom: var(--spacing-xs);
                }
                .lifecycle-arrow {
                    font-size: 1.5rem;
                    color: var(--primary-color);
                    font-weight: bold;
                }
            </style>

            <h3>Staying Current</h3>
            <p>The compliance landscape is always evolving. Here's how to stay ahead:</p>

            <div class="staying-current-grid">
                <div class="current-item">
                    <h4>Monitor Framework Updates</h4>
                    <ul>
                        <li>Subscribe to NIST, ISO, CIS update notifications</li>
                        <li>Review framework changes quarterly</li>
                        <li>Assess impact on your policies</li>
                    </ul>
                </div>
                <div class="current-item">
                    <h4>Track Threat Intelligence</h4>
                    <ul>
                        <li>Follow security research and incident reports</li>
                        <li>Update threat context in policies</li>
                        <li>Adjust controls based on emerging threats</li>
                    </ul>
                </div>
                <div class="current-item">
                    <h4>Engage with Community</h4>
                    <ul>
                        <li>Join Gemara community discussions</li>
                        <li>Share policy templates and lessons learned</li>
                        <li>Contribute to framework improvements</li>
                    </ul>
                </div>
                <div class="current-item">
                    <h4>Continuous Learning</h4>
                    <ul>
                        <li>Attend compliance conferences</li>
                        <li>Take advanced GRC courses</li>
                        <li>Earn relevant certifications (CISA, CRISC, etc.)</li>
                    </ul>
                </div>
            </div>

            <style>
                .staying-current-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: var(--spacing-lg);
                    margin: var(--spacing-xl) 0;
                }
                .current-item {
                    background-color: var(--surface-color);
                    padding: var(--spacing-lg);
                    border-radius: var(--radius-md);
                    border: 1px solid var(--border-color);
                }
                .current-item h4 {
                    color: var(--primary-color);
                    margin-bottom: var(--spacing-md);
                }
            </style>

            <h3>Advanced Topics</h3>
            <div class="advanced-topics">
                <div class="topic-card">
                    <h4>Policy-as-Code</h4>
                    <p>Store policies in version control, use CI/CD pipelines to validate and deploy policy updates automatically.</p>
                    <a href="#" class="learn-more">Learn More →</a>
                </div>
                <div class="topic-card">
                    <h4>Custom MCP Tools</h4>
                    <p>Extend gemara-mcp-server with custom tools specific to your organization's needs.</p>
                    <a href="#" class="learn-more">Learn More →</a>
                </div>
                <div class="topic-card">
                    <h4>GRC Platform Integration</h4>
                    <p>Connect Gemara policies to platforms like ServiceNow GRC, Archer, or OneTrust.</p>
                    <a href="#" class="learn-more">Learn More →</a>
                </div>
                <div class="topic-card">
                    <h4>Automated Compliance Reporting</h4>
                    <p>Generate compliance matrices, audit reports, and evidence packages automatically from Gemara artifacts.</p>
                    <a href="#" class="learn-more">Learn More →</a>
                </div>
            </div>

            <style>
                .advanced-topics {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: var(--spacing-lg);
                    margin: var(--spacing-xl) 0;
                }
                .topic-card {
                    background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary-color) 100%);
                    color: white;
                    padding: var(--spacing-xl);
                    border-radius: var(--radius-lg);
                    text-align: center;
                }
                .topic-card h4 {
                    color: white;
                    margin-bottom: var(--spacing-md);
                    font-size: 1.25rem;
                }
                .topic-card p {
                    color: rgba(255, 255, 255, 0.9);
                    margin-bottom: var(--spacing-md);
                }
                .learn-more {
                    color: white;
                    text-decoration: none;
                    font-weight: 600;
                    border-bottom: 2px solid white;
                }
            </style>

            <h3>Community & Resources</h3>
            <div class="community-section">
                <div class="community-card">
                    <h4>Gemara GitHub</h4>
                    <p>Main framework repository</p>
                    <a href="https://github.com/ossf/gemara" target="_blank" class="btn btn-secondary btn-small">Visit →</a>
                </div>
                <div class="community-card">
                    <h4>MCP Server GitHub</h4>
                    <p>AI integration tools</p>
                    <a href="https://github.com/complytime/gemara-mcp-server" target="_blank" class="btn btn-secondary btn-small">Visit →</a>
                </div>
                <div class="community-card">
                    <h4>Policy Templates</h4>
                    <p>Community-contributed examples</p>
                    <a href="#" class="btn btn-secondary btn-small">Browse →</a>
                </div>
                <div class="community-card">
                    <h4>Discussion Forum</h4>
                    <p>Ask questions, share insights</p>
                    <a href="#" class="btn btn-secondary btn-small">Join →</a>
                </div>
            </div>

            <style>
                .community-section {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: var(--spacing-md);
                    margin: var(--spacing-xl) 0;
                }
                .community-card {
                    background-color: var(--bg-color);
                    padding: var(--spacing-lg);
                    border-radius: var(--radius-md);
                    text-align: center;
                }
                .community-card h4 {
                    margin-bottom: var(--spacing-sm);
                }
                .community-card p {
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                    margin-bottom: var(--spacing-md);
                }
            </style>

            <h3>Final Assessment</h3>
            <div class="info-box">
                <h4>Comprehensive Exam</h4>
                <p>Test your knowledge across all modules with our comprehensive final exam. You'll need 80% or higher to pass.</p>
                <button class="btn btn-primary" id="start-final-exam">Take Final Exam</button>
            </div>

            <div class="info-box success">
                <h4>Capstone Project</h4>
                <p>Put everything together by creating a complete policy framework for a fictional organization. This project demonstrates mastery of:</p>
                <ul>
                    <li>Gemara framework understanding</li>
                    <li>Policy writing skills</li>
                    <li>AI-assisted development workflows</li>
                    <li>Compliance mapping and traceability</li>
                </ul>
                <button class="btn btn-primary" id="start-capstone">Start Capstone Project</button>
            </div>

            <h3>Certification</h3>
            <p>Upon successful completion of all modules, quizzes, exercises, the final exam (80%+), and the capstone project, you'll earn:</p>

            <div class="certification-info">
                <h4>Gemara Policy Writing Certification</h4>
                <p>This certificate demonstrates your ability to:</p>
                <ul>
                    <li>Understand and apply the Gemara 6-layer model</li>
                    <li>Write effective Layer 3 organizational policies</li>
                    <li>Leverage AI assistance for policy development</li>
                    <li>Map policies to compliance frameworks</li>
                    <li>Use gemara-mcp-server tools proficiently</li>
                </ul>
                <p class="certificate-note">Your certificate will be available for download and sharing on LinkedIn.</p>
            </div>

            <style>
                .certification-info {
                    background: linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%);
                    padding: var(--spacing-xl);
                    border-radius: var(--radius-lg);
                    border: 2px solid var(--primary-color);
                    margin: var(--spacing-xl) 0;
                }
                .certification-info h4 {
                    color: var(--primary-color);
                    font-size: 1.5rem;
                    margin-bottom: var(--spacing-md);
                }
                .certificate-note {
                    margin-top: var(--spacing-md);
                    font-style: italic;
                    color: var(--text-secondary);
                }
            </style>

            <div class="completion-message">
                <h3>Congratulations on Completing the Course!</h3>
                <p>You now have the knowledge and skills to write effective Gemara Layer 3 policies with AI assistance. Keep practicing, stay engaged with the community, and continue refining your craft.</p>
                <p><strong>Next steps:</strong></p>
                <ol>
                    <li>Complete the final exam and capstone project</li>
                    <li>Download your certificate</li>
                    <li>Apply these skills in your organization</li>
                    <li>Share your experience with the Gemara community</li>
                    <li>Consider contributing policy templates back to the project</li>
                </ol>
            </div>

            <style>
                .completion-message {
                    background-color: var(--surface-color);
                    padding: var(--spacing-2xl);
                    border-radius: var(--radius-lg);
                    text-align: center;
                    margin-top: var(--spacing-2xl);
                    box-shadow: var(--shadow-lg);
                }
                .completion-message h3 {
                    color: var(--secondary-color);
                    margin-bottom: var(--spacing-lg);
                }
                .completion-message ol {
                    text-align: left;
                    max-width: 600px;
                    margin: var(--spacing-lg) auto;
                }
            </style>
        `;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.moduleManager = new ModuleManager();
});

// Stub for starting exercises
window.app = window.app || {};
window.app.startExercise = function(num) {
    alert(`Exercise ${num} would launch here with AI integration. Full implementation requires connecting to gemara-mcp-server.`);
};

window.app.loadCaseStudy = function(num) {
    alert(`Case Study ${num} details would be loaded here.`);
};
