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
                    "Understand the 7-layer Gemara model",
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
                title: "Advanced Policy Authoring",
                duration: "90 minutes",
                type: "Interactive hands-on exercises",
                objectives: [
                    "Transform legacy policies into Gemara format",
                    "Build comprehensive policy families",
                    "Create cross-layer traceability from guidance to policy",
                    "Work with the complete Layer 3 policy schema",
                    "Apply policy writing skills to practical scenarios"
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

            <h3>The Seven Layers</h3>
            <div class="layer-diagram" id="layer-diagram">
                <div class="layer-category">
                    <h4>Measurement Layers (5-7)</h4>
                    <p class="category-desc">Inform next steps by providing measurements</p>
                </div>
                <div class="layer" data-layer="7">
                    <div class="layer-number">Layer 7</div>
                    <div class="layer-title">Audit & Continuous Monitoring</div>
                    <div class="layer-desc">Efficacy review of all previous outputs</div>
                </div>
                <div class="layer" data-layer="6">
                    <div class="layer-number">Layer 6</div>
                    <div class="layer-title">Preventive & Remediative Enforcement</div>
                    <div class="layer-desc">Corrective actions for noncompliance</div>
                </div>
                <div class="layer" data-layer="5">
                    <div class="layer-number">Layer 5</div>
                    <div class="layer-title">Intent & Behavior Evaluation</div>
                    <div class="layer-desc">Inspection of sensitive activities</div>
                </div>
                <div class="layer-category">
                    <h4>Sensitive Activities (Layer 4)</h4>
                </div>
                <div class="layer" data-layer="4">
                    <div class="layer-number">Layer 4</div>
                    <div class="layer-title">Sensitive Activities</div>
                    <div class="layer-desc">Actions that might introduce risk</div>
                </div>
                <div class="layer-category">
                    <h4>Definition Layers (1-3)</h4>
                    <p class="category-desc">Inform the execution of sensitive activities</p>
                </div>
                <div class="layer focus-layer" data-layer="3">
                    <div class="layer-number">Layer 3</div>
                    <div class="layer-title">Risk & Policy ⭐</div>
                    <div class="layer-desc">Organization-specific rules based on risk appetite</div>
                </div>
                <div class="layer" data-layer="2">
                    <div class="layer-number">Layer 2</div>
                    <div class="layer-title">Threats & Controls</div>
                    <div class="layer-desc">Technology-specific objectives informed by Layer 1</div>
                </div>
                <div class="layer" data-layer="1">
                    <div class="layer-number">Layer 1</div>
                    <div class="layer-title">Vectors & Guidance</div>
                    <div class="layer-desc">Foundational knowledge or regulations</div>
                </div>
            </div>

            <style>
                .layer-diagram {
                    margin: var(--spacing-xl) 0;
                }
                .layer-category {
                    margin: var(--spacing-lg) 0 var(--spacing-sm) 0;
                    padding: var(--spacing-sm) var(--spacing-md);
                    background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%);
                    border-left: 3px solid rgba(139, 92, 246, 0.6);
                    border-radius: var(--radius-sm);
                }
                .layer-category h4 {
                    margin: 0 0 var(--spacing-xs) 0;
                    font-size: 0.95rem;
                    font-weight: 700;
                    color: rgba(139, 92, 246, 1);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .layer-category .category-desc {
                    margin: 0;
                    font-size: 0.85rem;
                    color: var(--text-muted);
                    font-style: italic;
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
            <p>The seven layers are organized into three groups, creating a traceable chain from foundational guidance through sensitive activities to continuous monitoring:</p>

            <div class="info-box">
                <h4>Definition Layers (1-3)</h4>
                <p>These layers inform the execution of sensitive activities:</p>
                <ol>
                    <li><strong>Layer 1 (Vectors & Guidance)</strong> provides foundational knowledge and regulations from frameworks like NIST, ISO 27001, PCI-DSS, and HIPAA</li>
                    <li><strong>Layer 2 (Threats & Controls)</strong> translates guidance into technology-specific objectives addressing known threats, such as CIS Benchmarks and OSPS Baseline</li>
                    <li><strong>Layer 3 (Risk & Policy)</strong> tailors controls to your organization's specific risk appetite and operational context</li>
                </ol>
            </div>

            <div class="info-box">
                <h4>Sensitive Activities (Layer 4)</h4>
                <p><strong>Layer 4 (Sensitive Activities)</strong> represents actions that might introduce risk, such as code commits, configuration changes, or deployment activities</p>
            </div>

            <div class="info-box">
                <h4>Measurement Layers (5-7)</h4>
                <p>These layers inform next steps by providing measurements:</p>
                <ol start="5">
                    <li><strong>Layer 5 (Intent & Behavior Evaluation)</strong> inspects sensitive activities to assess compliance with policies</li>
                    <li><strong>Layer 6 (Preventive & Remediative Enforcement)</strong> takes corrective actions for noncompliance</li>
                    <li><strong>Layer 7 (Audit & Continuous Monitoring)</strong> reviews the efficacy of all previous outputs</li>
                </ol>
            </div>

            <div class="info-box success">
                <h4>Your Focus: Layer 3 Risk & Policy</h4>
                <p>As a compliance professional, you'll primarily work with Layer 3, writing organizational policies that bridge the gap between threat-informed controls (Layer 2) and your organization's specific needs.</p>
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
                <li>The 7-layer model creates traceability from guidance through sensitive activities to continuous monitoring</li>
                <li>Layer 3 (Risk & Policy) is where compliance professionals add organizational context</li>
                <li>The model is organized into Definition Layers (1-3), Sensitive Activities (4), and Measurement Layers (5-7)</li>
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

            <h3>Key Takeaways</h3>
            <ul>
                <li>Layer 1 provides industry guidance from frameworks like NIST, ISO, PCI-DSS, and HIPAA</li>
                <li>Layer 2 translates guidance into specific, threat-informed controls such as CIS Benchmarks and OSPS Baseline</li>
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

            <h3>Interactive Activity: Analyzing a Real Policy</h3>
            <div class="info-box">
                <h4>Learning from a Well-Written Policy</h4>
                <p>Let's analyze a real Gemara policy to understand how all these concepts come together. We'll be examining the <code>good-policy.yaml</code> from the official Gemara repository.</p>
            </div>

            <div class="policy-activity">
                <div class="activity-section">
                    <h4>Part 1: Metadata & Mapping References</h4>
                    <p>The policy includes mapping references to compliance frameworks:</p>
                    <pre class="code-block">mapping-references:
  - id: "NIST-800-53"
    title: "NIST Special Publication 800-53"
    version: "Rev. 5"
  - id: "ISO-27001"
    title: "ISO/IEC 27001"
    version: "2022"</pre>

                    <div class="activity-question">
                        <strong>Question 1:</strong> Your organization also needs to comply with PCI-DSS v4.0. Add a new mapping-reference entry for PCI-DSS that follows the same structure.
                        <details>
                            <summary>Show Answer</summary>
                            <pre class="code-block">  - id: "PCI-DSS"
    title: "Payment Card Industry Data Security Standard"
                    version: "4.0"
    description: "Security standards for organizations that handle credit cards"
    url: "https://www.pcisecuritystandards.org/"</pre>
                        </details>
                    </div>
                </div>

                <div class="activity-section">
                    <h4>Part 2: Scope Definition</h4>
                    <p>The policy defines scope across boundaries, technologies, and providers:</p>
                    <pre class="code-block">scope:
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
    - "Google Cloud Platform"</pre>

                    <div class="activity-question">
                        <strong>Question 2:</strong> Your organization is expanding to Asia-Pacific and will use Salesforce as a provider. Update the scope section accordingly.
                        <details>
                            <summary>Show Answer</summary>
                            <pre class="code-block">scope:
  boundaries:
    - "United States"
    - "European Union"
    - "Canada"
    - "Asia-Pacific"  # Added
  technologies:
    - "Cloud Computing"
    - "Mobile Devices"
    - "Web Applications"
    - "Database Systems"
  providers:
    - "Amazon Web Services"
    - "Microsoft Azure"
    - "Google Cloud Platform"
    - "Salesforce"  # Added</pre>
                        </details>
                    </div>
                </div>

                <div class="activity-section">
                    <h4>Part 3: Guidance References & In-Scope Analysis</h4>
                    <p>The policy specifies what's in-scope for NIST 800-53:</p>
                    <pre class="code-block">guidance-references:
  - reference-id: "NIST-800-53"
    in-scope:
      boundaries: ["United States"]
      technologies: ["Cloud Computing", "Web Applications"]
      providers: ["Amazon Web Services", "Microsoft Azure"]
    out-of-scope:
      boundaries: ["International"]
      technologies: ["Legacy Systems"]
      providers: ["On-premises Infrastructure"]</pre>

                    <div class="activity-question">
                        <strong>Question 3:</strong> Based on your Asia-Pacific expansion (Question 2), is NIST 800-53 in-scope for that region? Why or why not? Should you add PCI-DSS to guidance-references?
                        <details>
                            <summary>Show Answer</summary>
                            <p><strong>NIST 800-53 Scope:</strong> No, NIST 800-53 is currently out-of-scope for Asia-Pacific because only "United States" is listed in the in-scope boundaries. Asia-Pacific would fall under "International" which is explicitly out-of-scope.</p>
                            <p><strong>PCI-DSS:</strong> Yes, you should add PCI-DSS to guidance-references if you process payment cards. Here's an example:</p>
                            <pre class="code-block">  - reference-id: "PCI-DSS"
    in-scope:
      boundaries: ["United States", "European Union", "Canada", "Asia-Pacific"]
      technologies: ["Web Applications", "Database Systems"]
      providers: ["Amazon Web Services", "Microsoft Azure", "Google Cloud Platform"]
    out-of-scope:
      boundaries: []
      technologies: ["Legacy Systems"]
      providers: ["On-premises Infrastructure"]</pre>
                        </details>
                    </div>
                </div>

                <div class="activity-section">
                    <h4>Part 4: Control Modifications</h4>
                    <p>The policy enhances NIST 800-53 AC-1 (Access Control) for cloud environments:</p>
                    <pre class="code-block">control-modifications:
  - target-id: "AC-1"
    modification-type: "enhancement"
    modification-rationale: "Enhanced access control requirements for cloud environments"
    title: "Enhanced Access Control"
    objective: "Implement enhanced access controls for cloud environments"</pre>

                    <div class="activity-question">
                        <strong>Question 4:</strong> Based on the PCI-DSS mapping-reference you added, create a control-modification for PCI-DSS Requirement 8.3 (Multi-Factor Authentication). Your modification should enhance it for mobile device access.
                        <details>
                            <summary>Show Answer</summary>
                            <pre class="code-block">control-modifications:
  - target-id: "8.3"
    modification-type: "enhancement"
    modification-rationale: "Enhanced MFA requirements for mobile device access to cardholder data"
    title: "Enhanced Multi-Factor Authentication for Mobile"
    objective: "Require biometric or hardware token MFA for all mobile device access to payment systems"
    assessment-requirement-modifications:
      - target-id: "8.3.1"
        modification-type: "enhancement"
        modification-rationale: "Mobile devices pose higher risk due to potential loss or theft"
        text: "Mobile device access must use biometric authentication (fingerprint, face recognition) OR hardware security key in addition to password"
        applicability: ["mobile", "BYOD", "payment-systems"]
        recommendation: "Implement device attestation to verify device security posture"</pre>
                        </details>
                    </div>
                </div>

                <div class="activity-section">
                    <h4>Part 5: RACI Contacts</h4>
                    <p>The policy uses the RACI model for accountability:</p>
                    <pre class="code-block">contacts:
  responsible:  # Who does the work
    - name: "IT Director"
      primary: true
  accountable:  # Who is ultimately answerable
    - name: "Chief Information Security Officer"
      primary: true
  consulted:  # Who provides input
    - name: "Legal Counsel"
  informed:  # Who is kept updated
    - name: "All Employees"</pre>

                    <div class="activity-question">
                        <strong>Question 5:</strong> For PCI-DSS compliance, you need to add a PCI Compliance Manager who will be responsible for day-to-day compliance activities, while the CISO remains accountable. Update the contacts section.
                        <details>
                            <summary>Show Answer</summary>
                            <pre class="code-block">contacts:
  responsible:
    - name: "IT Director"
      primary: true
      affiliation: "Information Technology"
      email: "it-director@company.com"
    - name: "PCI Compliance Manager"  # Added
      primary: false
      affiliation: "Security & Compliance"
      email: "pci-compliance@company.com"
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
      affiliation: "Company-wide"</pre>
                            <p><strong>Key Points:</strong></p>
                            <ul>
                                <li>Responsible = Does the work (can have multiple, one should be primary)</li>
                                <li>Accountable = Ultimately answerable (typically only one)</li>
                                <li>Consulted = Provides expert input</li>
                                <li>Informed = Kept in the loop</li>
                            </ul>
                        </details>
                    </div>
                </div>

                <div class="activity-section">
                    <h4>Part 6: Putting It All Together</h4>
                    <div class="activity-question">
                        <strong>Capstone Question:</strong> Now that you've added PCI-DSS compliance to this policy, write a brief summary (3-5 sentences) explaining:
                        <ul>
                            <li>How the policy scope changed</li>
                            <li>Which controls were enhanced and why</li>
                            <li>Who is responsible vs. accountable for PCI compliance</li>
                        </ul>
                        <details>
                            <summary>Show Example Answer</summary>
                            <p><strong>Summary:</strong> The policy scope expanded to include Asia-Pacific operations and Salesforce as a cloud provider to support business growth. We added PCI-DSS v4.0 as a mapping reference since the organization processes payment cards, applying it globally across all regions and web/database technologies. Control 8.3 (Multi-Factor Authentication) was enhanced specifically for mobile device access to payment systems due to the increased security risk of mobile devices. The PCI Compliance Manager is responsible for day-to-day compliance activities, while the CISO remains accountable for overall compliance and security posture.</p>
                        </details>
                    </div>
                </div>

                <div class="info-box success">
                    <h4>View the Complete Policy</h4>
                    <p>You can view the full <code>good-policy.yaml</code> file in the Gemara repository:</p>
                    <a href="https://github.com/gemaraproj/gemara/blob/main/test-data/good-policy.yaml" target="_blank" class="btn btn-secondary btn-small">View on GitHub →</a>
                </div>
            </div>

            <style>
                .policy-activity {
                    margin: var(--spacing-xl) 0;
                }
                .activity-section {
                    background-color: var(--surface-color);
                    padding: var(--spacing-lg);
                    margin-bottom: var(--spacing-lg);
                    border-radius: var(--radius-md);
                    border-left: 4px solid var(--primary-color);
                }
                .activity-section h4 {
                    color: var(--primary-color);
                    margin-bottom: var(--spacing-md);
                }
                .code-block {
                    background-color: #2d3748;
                    color: #e2e8f0;
                    padding: var(--spacing-md);
                    border-radius: var(--radius-sm);
                    font-family: 'Courier New', Consolas, Monaco, monospace;
                    font-size: 0.9rem;
                    line-height: 1.6;
                    overflow-x: auto;
                    margin: var(--spacing-md) 0;
                    border: 1px solid #4a5568;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .activity-question {
                    background-color: var(--bg-color);
                    padding: var(--spacing-md);
                    margin-top: var(--spacing-md);
                    border-radius: var(--radius-sm);
                    border-left: 3px solid var(--accent-color);
                }
                .activity-question strong {
                    color: black;
                    display: block;
                    margin-bottom: var(--spacing-sm);
                }
                .activity-question details {
                    margin-top: var(--spacing-md);
                }
                .activity-question summary {
                    cursor: pointer;
                    color: var(--primary-color);
                    font-weight: 600;
                    padding: var(--spacing-sm);
                    background-color: var(--surface-color);
                    border-radius: var(--radius-sm);
                    user-select: none;
                }
                .activity-question summary:hover {
                    background-color: rgba(37, 99, 235, 0.1);
                }
                .activity-question details[open] summary {
                    margin-bottom: var(--spacing-md);
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
            <h3>Interactive Activity: The Story of the High-Privilege Pivot</h3>
            <p>Now that you understand the role-based perspectives, let's explore a real-world scenario at <strong>Nexus Tech</strong>, where three professionals collaborate to build a comprehensive password policy. You'll see how each persona works with different sections of the <code>layer3-policy.yaml</code> to address the same threat from their unique perspective.</p>

            <div class="info-box">
                <h4>The Threat</h4>
                <p>An attacker attempting to use <strong>Brute Force attacks (MITRE T1110)</strong> to compromise high-privilege accounts at Nexus Tech.</p>
            </div>

            <hr style="margin: var(--spacing-xl) 0;">

            <h4>Act 1: Sarah (Risk Manager) - Assessing the Threat Landscape</h4>

            <div class="persona-card risk">
                <h5>Sarah's Morning Challenge</h5>
                <p>Sarah, the Risk Manager, starts her day reviewing the organization's threat landscape. She identifies that <strong>Brute Force attacks (MITRE T1110)</strong> pose a primary threat to Nexus Tech's infrastructure. However, she discovers a complication: <strong>RISK-402</strong> indicates that a legacy finance application cannot support complex password requirements.</p>

                <h5>Sarah's Questions:</h5>
                <ul>
                    <li>What threats are we mitigating with this policy?</li>
                    <li>What risks must we accept, and under what conditions?</li>
                    <li>How do I limit the scope of accepted risks?</li>
                </ul>

                <h5>Sarah's Work - The <code>risks</code> Section:</h5>
                <pre><code class="language-yaml">risks: # Risk Manager - What are my risks?
  mitigated: # What threats does this policy address?
    - reference-id: "MITRE-ATT&CK"
      item-id: "T1110" # Brute Force

  accepted: # What risks am I accepting?
    - risk:
        reference-id: "internal-risk-registry"
        item-id: "RISK-402"
      justification: "Legacy system does not support MFA; risk accepted until migration in Q3."
      scope: # Limit where this risk is accepted
        in:
          technologies: ["Legacy-App-01"]</code></pre>

                <details>
                    <summary><strong>Question 1:</strong> Why does Sarah use the <code>scope</code> field within the <code>accepted</code> risk block?</summary>
                    <div class="answer-box">
                        <p><strong>Answer:</strong> Sarah uses <code>scope</code> to <strong>"fence in"</strong> the accepted risk so it only applies to <code>Legacy-App-01</code> and doesn't bleed into the rest of the organization. Without this scope limitation, the accepted risk would apply broadly, creating unnecessary security exposure across all systems.</p>
                        <p><strong>Key Insight:</strong> Accepted risks should always be scoped as narrowly as possible. Never accept a risk globally if you can limit it to specific technologies, users, or data classifications.</p>
                    </div>
                </details>
            </div>

            <hr style="margin: var(--spacing-xl) 0;">

            <h4>Act 2: Marcus (Security Engineer) - Building the Technical Blueprint</h4>

            <div class="persona-card security">
                <h5>Marcus's Challenge</h5>
                <p>Marcus, the Security Engineer, takes Sarah's threat assessment and transforms it into technical controls. He needs to strengthen the standard CIS Benchmark requirements for high-privilege AWS accounts, which require more frequent verification than standard quarterly checks.</p>

                <h5>Marcus's Questions:</h5>
                <ul>
                    <li>How do I import and customize industry controls?</li>
                    <li>How do I express control modifications for high-risk environments?</li>
                    <li>What's my rationale for deviating from standard requirements?</li>
                </ul>

                <h5>Marcus's Work - The <code>imports</code> Section:</h5>
                <pre><code class="language-yaml">imports: # External controls required by this policy
  catalogs:
    - reference-id: "cis-benchmark-v8"
      constraints: # Define minimum requirements
        - id: "min-length-12"
          target-id: "password-complexity"
          text: "Passwords must be at least 12 characters long."

      assessment-requirement-modifications: # Customize how we verify controls
        - id: "password-audit-mod-01"
          target-id: "cis-password-audit-original"
          modification-type: "replace"
          modification-rationale: "Standard quarterly audits are insufficient for high-privilege IAM roles; increasing frequency to monthly."
          text: "Perform a manual verification of IAM direct settings to ensure 12-character minimums are enforced."
          applicability: ["Cloud Infrastructure", "High-Privilege Accounts"]</code></pre>

                <details>
                    <summary><strong>Question 2:</strong> What is the purpose of the <code>assessment-requirement-modifications</code> section, and how does it differ from <code>constraints</code>?</summary>
                    <div class="answer-box">
                        <p><strong>Answer:</strong></p>
                        <ul>
                            <li><strong><code>constraints</code>:</strong> Define <strong>WHAT</strong> the minimum requirements are (e.g., "passwords must be at least 12 characters")</li>
                            <li><strong><code>assessment-requirement-modifications</code>:</strong> Define <strong>HOW</strong> you verify those requirements and allows you to customize the assessment method based on risk (e.g., changing quarterly automated checks to monthly manual verification for high-privilege accounts)</li>
                        </ul>
                        <p><strong>Marcus's Modification:</strong></p>
                        <ul>
                            <li><strong>What he's changing:</strong> The verification frequency and method from the original CIS requirement</li>
                            <li><strong>Why:</strong> High-privilege roles require more scrutiny than standard accounts</li>
                            <li><strong>How:</strong> Monthly manual verification instead of quarterly automated scans</li>
                            <li><strong>Where:</strong> Only for Cloud Infrastructure and High-Privilege Accounts</li>
                        </ul>
                        <p><strong>Key Insight:</strong> This is Marcus's "control expression"—he's telling the system exactly how the standard should be strengthened for Nexus Tech's specific risk profile.</p>
                    </div>
                </details>
            </div>

            <hr style="margin: var(--spacing-xl) 0;">

            <h4>Act 3: Elena (Compliance Manager) - Proving It Works</h4>

            <div class="persona-card compliance">
                <h5>Elena's Challenge</h5>
                <p>Elena, the Compliance Manager, must prove that Sarah's risk decisions and Marcus's technical controls are actually working. She needs to know where to look for evidence and how often to check, especially for Marcus's modified requirements.</p>

                <h5>Elena's Questions:</h5>
                <ul>
                    <li>What is my compliance scope?</li>
                    <li>How do I create different assessment plans for different risk levels?</li>
                    <li>What evidence do I need to collect for auditors?</li>
                </ul>

                <h5>Elena's Work - The <code>scope</code> and <code>adherence</code> Sections:</h5>
                <pre><code class="language-yaml">scope: # Compliance Manager - Where do I look?
  in:
    technologies: ["Identity Providers", "Cloud Infrastructure"]
    geopolitical: ["Global"]
    sensitivity: ["Confidential", "Internal"]
  out:
    technologies: ["Legacy Air-gapped Systems"]

adherence: # Compliance Manager - How do I verify compliance?
  evaluation-methods:
    - id: "automated-config-audit"
      type: "automated"
    - id: "manual-screenshot-verification"
      type: "manual"

  assessment-plans:
    # High-Privilege Plan - Consumes Marcus's modifier
    - id: "monthly-high-privilege-audit"
      requirement-id: "password-audit-mod-01" # Links to Marcus's modification
      frequency: "monthly"
      scope:
        in:
          technologies: ["Cloud Infrastructure"]
      evaluation-methods:
        - id: "manual-screenshot-verification"
      evidence-requirements: "Visual confirmation of IAM password policy console."

    # Standard Plan - For general users
    - id: "quarterly-iam-review"
      requirement-id: "password-policy-audit"
      frequency: "quarterly"
      scope:
        in:
          technologies: ["Identity Providers"]
      evaluation-methods:
        - id: "iam-policy-scanner"
          type: "automated"
      evidence-requirements: "JSON exports of IAM password policy settings."</code></pre>

                <details>
                    <summary><strong>Question 3:</strong> How does Elena's <code>monthly-high-privilege-audit</code> plan connect to Marcus's work? What would happen without this assessment plan?</summary>
                    <div class="answer-box">
                        <p><strong>The Connection:</strong></p>
                        <ul>
                            <li>Marcus created an <code>assessment-requirement-modification</code> with <code>id: "password-audit-mod-01"</code></li>
                            <li>Elena creates an <code>assessment-plan</code> that references <code>requirement-id: "password-audit-mod-01"</code></li>
                            <li>This linkage ensures Marcus's modified requirement is actually verified</li>
                        </ul>
                        <p><strong>What Elena Does Differently:</strong></p>
                        <ol>
                            <li><strong>Frequency:</strong> Monthly (not quarterly) to match the higher risk</li>
                            <li><strong>Scope:</strong> Only Cloud Infrastructure (where high-privilege accounts live)</li>
                            <li><strong>Method:</strong> Manual verification (not automated) for higher assurance</li>
                            <li><strong>Evidence:</strong> Screenshots of IAM console (visual proof)</li>
                        </ol>
                        <p><strong>Without This Plan:</strong></p>
                        <ul>
                            <li>Marcus's modification would exist in the policy but never be verified</li>
                            <li>Auditors wouldn't know how often to check or what evidence to collect</li>
                            <li>The heightened security requirement would be unenforceable</li>
                            <li>The policy would be "write-only"—defined but not validated</li>
                        </ul>
                        <p><strong>Key Insight:</strong> Assessment plans are where the policy becomes <strong>executable</strong>. Elena translates Marcus's technical requirements into operational verification activities. She creates a "Special Ops" plan for high-risk environments and a "Standard" plan for general users.</p>
                    </div>
                </details>
            </div>

            <hr style="margin: var(--spacing-xl) 0;">

            <h4>The Climax: Implementation Day</h4>

            <div class="info-box success">
                <p><strong>November 1st</strong> - The <code>implementation-plan</code> activates:</p>
                <pre><code class="language-yaml">implementation-plan:
  notification-process: "Email blast to all employees and updates to the internal wiki."
  evaluation-timeline:
    start: "2023-11-01T00:00:00Z"
    notes: "Initial baseline scan of current configurations."
  enforcement-timeline:
    start: "2024-01-01T00:00:00Z"
    notes: "Mandatory rotation enforced via IAM policy."</code></pre>
                <p>Elena sends the notification email. By January 1st, enforcement begins.</p>
            </div>

            <div class="warning-box">
                <h5>The Catch</h5>
                <p>A developer tries to set a 10-character password on a production database. Because of the <code>enforcement-methods</code>, the system automatically blocks the change:</p>
                <pre><code class="language-yaml">  enforcement-methods:
    - id: "iam-policy-deny"
      type: "automated"
  non-compliance: "Users with non-compliant passwords will be locked out of SSO after 3 grace period notifications."</code></pre>
            </div>

            <details>
                <summary><strong>Question 4:</strong> Trace the complete path from threat to enforcement. How do Sarah's, Marcus's, and Elena's sections work together?</summary>
                <div class="answer-box">
                    <h5>The Complete Path:</h5>
                    <ol>
                        <li><strong>Sarah (Risk Manager)</strong> identifies the threat:
                            <ul>
                                <li><code>risks.mitigated</code> → MITRE T1110 (Brute Force)</li>
                                <li><code>risks.accepted</code> → RISK-402 (Legacy app limitation, scoped to Legacy-App-01 only)</li>
                            </ul>
                        </li>
                        <li><strong>Marcus (Security Engineer)</strong> creates technical controls:
                            <ul>
                                <li><code>imports.catalogs</code> → References CIS Benchmark v8</li>
                                <li><code>constraints</code> → Defines 12-character minimum</li>
                                <li><code>assessment-requirement-modifications</code> → Strengthens verification for high-privilege accounts</li>
                            </ul>
                        </li>
                        <li><strong>Elena (Compliance Manager)</strong> makes it verifiable:
                            <ul>
                                <li><code>scope</code> → Defines where to look (Cloud Infrastructure + Identity Providers)</li>
                                <li><code>assessment-plans</code> → Creates two plans:
                                    <ul>
                                        <li>Monthly manual checks for Cloud Infrastructure (high-privilege)</li>
                                        <li>Quarterly automated checks for Identity Providers (general users)</li>
                                    </ul>
                                </li>
                                <li><code>enforcement-methods</code> → Automated blocking via IAM policies</li>
                                <li><code>non-compliance</code> → Defines consequences (lockout after warnings)</li>
                            </ul>
                        </li>
                        <li><strong>Implementation Plan</strong> → Defines when (Nov 1 evaluation, Jan 1 enforcement)</li>
                    </ol>
                    <h5>The Developer Scenario:</h5>
                    <ul>
                        <li>Developer tries 10-character password on production DB</li>
                        <li>System checks <code>constraints</code> → Requires 12 characters</li>
                        <li>System applies <code>enforcement-methods</code> → Automated IAM policy deny</li>
                        <li>Action is blocked immediately</li>
                        <li>If developer persists with non-compliant credentials → <code>non-compliance</code> → 3 warnings then SSO lockout</li>
                    </ul>
                    <p><strong>Key Insight:</strong> This is a risk-focused, threat-informed policy where all three personas contribute their expertise. Sarah identifies the threat and acceptable risk boundaries, Marcus builds the technical defenses with risk-based customizations, and Elena creates the verification and enforcement mechanisms. They all speak the same language through the YAML structure.</p>
                </div>
            </details>

            <hr style="margin: var(--spacing-xl) 0;">

            <div class="info-box">
                <h4>Reflection: Understanding the Three Perspectives</h4>
                <p>By following Sarah, Marcus, and Elena through this scenario, you can see how:</p>
                <ol>
                    <li><strong>Risk Managers</strong> use <code>risks</code> to document threat mitigation and risk acceptance with narrow scoping</li>
                    <li><strong>Security Engineers</strong> use <code>imports</code> and <code>assessment-requirement-modifications</code> to customize controls based on risk</li>
                    <li><strong>Compliance Managers</strong> use <code>scope</code>, <code>assessment-plans</code>, and <code>adherence</code> to make policies verifiable and enforceable</li>
                </ol>
                <p><strong>The Power of This Structure:</strong></p>
                <ul>
                    <li>Sarah's fears (brute force attacks)</li>
                    <li>Marcus's technical controls (modified CIS requirements)</li>
                    <li>Elena's audit evidence (monthly verification logs)</li>
                </ul>
                <p>All three are speaking the same language, documented in the same policy, traceable from threat → control → verification → enforcement.</p>
            </div>

            <hr style="margin: var(--spacing-xl) 0; border: 3px double var(--border-color);">

            <h3>Choose Your Adventure: Persona-Based Exercises</h3>
            <p>Now it's your turn! Choose your persona and work on the specific YAML sections that your role owns. Each exercise focuses on the fields you saw Sarah, Marcus, and Elena working with in the storyline.</p>

            <div class="info-box">
                <h4>📖 How This Works</h4>
                <p>Select your persona below to start your customized exercise. You'll work directly with the layer3-policy.yaml fields relevant to your role, just like Sarah, Marcus, and Elena did in the storyline.</p>
            </div>

            <div class="persona-selection">
                <div class="persona-exercise-card risk">
                    <div class="persona-icon">⚖️</div>
                    <h4>Risk Manager (Sarah)</h4>
                    <p class="persona-desc">Identify threats, document risk acceptance, and define risk boundaries</p>

                    <div class="exercise-details">
                        <h5>Your YAML Sections:</h5>
                        <ul>
                            <li><code>risks.mitigated</code> - What threats are you addressing?</li>
                            <li><code>risks.accepted</code> - What risks must you accept?</li>
                            <li><code>scope</code> - Where does accepted risk apply?</li>
                        </ul>

                        <h5>Your Exercise:</h5>
                        <p><strong>Scenario:</strong> Your organization faces a data exfiltration threat (MITRE T1048) but legacy SCADA systems cannot support modern encryption.</p>

                        <details>
                            <summary>View Exercise Details</summary>
                            <div class="exercise-content">
                                <p><strong>Your Tasks:</strong></p>
                                <ol>
                                    <li>Add <code>risks.mitigated</code> for T1048 (Data Exfiltration)</li>
                                    <li>Document an accepted risk (RISK-801: Legacy SCADA encryption limitation)</li>
                                    <li>Write justification explaining why you're accepting this risk</li>
                                    <li>Use <code>scope</code> to "fence in" the accepted risk to only Manufacturing SCADA systems</li>
                                </ol>

                                <h5>YAML Template:</h5>
<pre><code class="language-yaml">risks:
  mitigated:
    - reference-id: "MITRE-ATT&CK"
      item-id: # TODO: Add T1048 here

  accepted:
    - risk:
        reference-id: "internal-risk-registry"
        item-id: # TODO: Add RISK-801
      justification: # TODO: Why are you accepting this risk?
      scope:
        in:
          technologies: # TODO: Limit to Manufacturing SCADA only
</code></pre>

                                <h5>Success Criteria:</h5>
                                <ul>
                                    <li>✓ Threat T1048 listed in mitigated risks</li>
                                    <li>✓ RISK-801 documented with clear justification</li>
                                    <li>✓ Accepted risk scoped narrowly (not organization-wide)</li>
                                    <li>✓ Justification mentions compensating controls or timeline</li>
                                </ul>
                            </div>
                        </details>
                    </div>

                    <button class="btn btn-primary" onclick="window.moduleManager.loadPersonaExercise('risk')">Start as Risk Manager</button>
                </div>

                <div class="persona-exercise-card security">
                    <div class="persona-icon">🔒</div>
                    <h4>Security Engineer (Marcus)</h4>
                    <p class="persona-desc">Import controls, customize requirements, and express technical implementations</p>

                    <div class="exercise-details">
                        <h5>Your YAML Sections:</h5>
                        <ul>
                            <li><code>imports.catalogs</code> - Which control frameworks?</li>
                            <li><code>constraints</code> - Minimum requirements (WHAT)</li>
                            <li><code>assessment-requirement-modifications</code> - Custom verification (HOW)</li>
                        </ul>

                        <h5>Your Exercise:</h5>
                        <p><strong>Scenario:</strong> You need to implement SSH key rotation policy with different verification frequencies for production vs. development servers.</p>

                        <details>
                            <summary>View Exercise Details</summary>
                            <div class="exercise-content">
                                <p><strong>Your Tasks:</strong></p>
                                <ol>
                                    <li>Import NIST 800-53 control catalog</li>
                                    <li>Add constraint requiring SSH key rotation every 90 days</li>
                                    <li>Create an assessment-requirement-modification for production servers</li>
                                    <li>Increase verification frequency to weekly (instead of monthly) for high-risk production</li>
                                    <li>Document your modification-rationale</li>
                                </ol>

                                <h5>YAML Template:</h5>
<pre><code class="language-yaml">imports:
  catalogs:
    - reference-id: # TODO: Add NIST-800-53
      constraints:
        - id: "ssh-rotation-90"
          target-id: "IA-5"
          text: # TODO: Describe 90-day rotation requirement

      assessment-requirement-modifications:
        - id: "ssh-prod-weekly-check"
          target-id: # TODO: What requirement are you modifying?
          modification-type: "replace"
          modification-rationale: # TODO: Why weekly for production?
          text: # TODO: Describe weekly automated verification
          applicability: # TODO: Production Servers, High-Risk
</code></pre>

                                <h5>Success Criteria:</h5>
                                <ul>
                                    <li>✓ NIST 800-53 catalog imported</li>
                                    <li>✓ 90-day rotation constraint defined</li>
                                    <li>✓ Assessment modification created for production</li>
                                    <li>✓ Rationale explains risk-based frequency increase</li>
                                    <li>✓ Applicability targets production/high-risk scope</li>
                                </ul>
                            </div>
                        </details>
                    </div>

                    <button class="btn btn-primary" onclick="window.moduleManager.loadPersonaExercise('security')">Start as Security Engineer</button>
                </div>

                <div class="persona-exercise-card compliance">
                    <div class="persona-icon">📋</div>
                    <h4>Compliance Manager (Elena)</h4>
                    <p class="persona-desc">Define scope, create assessment plans, and specify evidence requirements</p>

                    <div class="exercise-details">
                        <h5>Your YAML Sections:</h5>
                        <ul>
                            <li><code>scope</code> - What's in/out of policy coverage?</li>
                            <li><code>adherence.evaluation-methods</code> - How to check?</li>
                            <li><code>adherence.assessment-plans</code> - When and where?</li>
                            <li><code>evidence-requirements</code> - What proof do auditors need?</li>
                        </ul>

                        <h5>Your Exercise:</h5>
                        <p><strong>Scenario:</strong> You need to create assessment plans for an API security policy with different risk levels (Customer PII APIs vs. Internal APIs).</p>

                        <details>
                            <summary>View Exercise Details</summary>
                            <div class="exercise-content">
                                <p><strong>Your Tasks:</strong></p>
                                <ol>
                                    <li>Define <code>scope.in</code> to include API Gateways and Microservices</li>
                                    <li>Define <code>scope.out</code> to exclude legacy monolith systems</li>
                                    <li>Create HIGH-RISK assessment plan for Customer PII APIs (daily checks)</li>
                                    <li>Create STANDARD-RISK assessment plan for Internal APIs (weekly checks)</li>
                                    <li>Specify different evidence requirements for each risk level</li>
                                    <li>Link your plans to Marcus's modifications (if applicable)</li>
                                </ol>

                                <h5>YAML Template:</h5>
<pre><code class="language-yaml">scope:
  in:
    technologies: # TODO: API Gateways, Microservices
    sensitivity: # TODO: What data classifications?
  out:
    technologies: # TODO: Legacy monolith

adherence:
  evaluation-methods:
    - id: # TODO: automated-api-scanner
      type: "automated"
    - id: # TODO: manual-code-review
      type: "manual"

  assessment-plans:
    # HIGH-RISK: Customer PII APIs
    - id: "daily-pii-api-check"
      requirement-id: # TODO: Link to security requirement
      frequency: # TODO: daily
      scope:
        in:
          technologies: # TODO: API Gateways
          sensitivity: # TODO: Customer PII
      evaluation-methods:
        - id: # TODO: automated-api-scanner
      evidence-requirements: # TODO: What proof? (API logs, auth tokens, encryption status)

    # STANDARD-RISK: Internal APIs
    - id: "weekly-internal-api-check"
      requirement-id: # TODO: Link to requirement
      frequency: # TODO: weekly
      scope:
        in:
          technologies: # TODO: Microservices
          sensitivity: # TODO: Internal
      evaluation-methods:
        - id: # TODO: automated-api-scanner
      evidence-requirements: # TODO: What proof? (Config snapshots)
</code></pre>

                                <h5>Success Criteria:</h5>
                                <ul>
                                    <li>✓ Scope clearly defines in/out boundaries</li>
                                    <li>✓ Two assessment plans with different frequencies</li>
                                    <li>✓ High-risk APIs checked more frequently (daily)</li>
                                    <li>✓ Evidence requirements match risk level (detailed for high-risk)</li>
                                    <li>✓ Scope within plans targets specific technologies</li>
                                </ul>
                            </div>
                        </details>
                    </div>

                    <button class="btn btn-primary" onclick="window.moduleManager.loadPersonaExercise('compliance')">Start as Compliance Manager</button>
                </div>
            </div>

            <div class="info-box success" style="margin-top: var(--spacing-xl);">
                <h4>💡 Collaboration Tip</h4>
                <p>In a real organization, these three personas work together! After completing your exercise, try doing the other two to see how all the sections interconnect to form a complete policy.</p>
            </div>

            <style>
                /* Persona Cards */
                .persona-card {
                    background-color: var(--surface-color);
                    border: 1px solid var(--border-color);
                    border-left: 4px solid var(--primary-color);
                    border-radius: var(--radius-md);
                    padding: var(--spacing-xl);
                    margin: var(--spacing-lg) 0;
                    color: #000;
                }
                .persona-card.risk {
                    border-left-color: #f39c12;
                }
                .persona-card.security {
                    border-left-color: #e74c3c;
                }
                .persona-card.compliance {
                    border-left-color: #2ecc71;
                }
                .persona-card h5 {
                    color: #000;
                    margin-top: var(--spacing-lg);
                    margin-bottom: var(--spacing-sm);
                    font-size: 1.3rem;
                    font-weight: 600;
                }
                .persona-card h5:first-child {
                    margin-top: 0;
                }
                .persona-card p,
                .persona-card ul,
                .persona-card li {
                    color: #000;
                }
                .persona-card ul li {
                    color: #2c5282;
                    font-weight: 500;
                    margin-bottom: 0.5rem;
                }

                /* Act Headings */
                h4 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #000;
                    margin: var(--spacing-xl) 0 var(--spacing-md) 0;
                }

                /* Interactive Details/Summary */
                details {
                    background: #f8f9fa;
                    padding: var(--spacing-md);
                    margin: var(--spacing-lg) 0;
                    border-radius: var(--radius-md);
                    border-left: 4px solid var(--primary-color);
                }
                summary {
                    cursor: pointer;
                    font-weight: 600;
                    color: var(--text-color);
                    padding: var(--spacing-sm);
                    list-style: none;
                }
                summary::-webkit-details-marker {
                    display: none;
                }
                summary:before {
                    content: "▶ ";
                    display: inline-block;
                    transition: transform 0.2s;
                }
                details[open] summary:before {
                    transform: rotate(90deg);
                }
                summary:hover {
                    color: var(--primary-color);
                }

                /* Answer Boxes */
                .answer-box {
                    margin-top: var(--spacing-md);
                    padding: var(--spacing-md);
                    background: white;
                    border-radius: var(--radius-sm);
                }
                .answer-box p:first-child {
                    margin-top: 0;
                }
                .answer-box p:last-child {
                    margin-bottom: 0;
                }

                /* Warning Box */
                .warning-box {
                    background: #fff3cd;
                    border: 1px solid #ffc107;
                    border-radius: var(--radius-md);
                    padding: var(--spacing-lg);
                    margin: var(--spacing-lg) 0;
                }
                .warning-box h5 {
                    color: #856404;
                    margin-top: 0;
                }

                /* Code Blocks in Activity */
                .persona-card pre {
                    margin: var(--spacing-md) 0;
                }

                /* Persona Selection Grid */
                .persona-selection {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: var(--spacing-xl);
                    margin: var(--spacing-xl) 0;
                }

                .persona-exercise-card {
                    background: white;
                    border: 2px solid var(--border-color);
                    border-radius: var(--radius-lg);
                    padding: var(--spacing-xl);
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .persona-exercise-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 5px;
                }

                .persona-exercise-card.risk::before {
                    background: #f39c12;
                }

                .persona-exercise-card.security::before {
                    background: #e74c3c;
                }

                .persona-exercise-card.compliance::before {
                    background: #2ecc71;
                }

                .persona-exercise-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
                }

                .persona-icon {
                    font-size: 3rem;
                    text-align: center;
                    margin-bottom: var(--spacing-md);
                }

                .persona-exercise-card h4 {
                    color: #000;
                    margin: var(--spacing-md) 0;
                    text-align: center;
                }

                .persona-desc {
                    color: #666;
                    text-align: center;
                    margin-bottom: var(--spacing-lg);
                    font-style: italic;
                }

                .exercise-details {
                    background: #f8f9fa;
                    padding: var(--spacing-md);
                    border-radius: var(--radius-md);
                    margin: var(--spacing-lg) 0;
                }

                .exercise-details h5 {
                    color: #000;
                    margin-top: var(--spacing-md);
                    margin-bottom: var(--spacing-sm);
                }

                .exercise-details h5:first-child {
                    margin-top: 0;
                }

                .exercise-details ul,
                .exercise-details ol,
                .exercise-details p {
                    color: #000;
                }

                .exercise-details code {
                    background: #fff;
                    padding: 2px 6px;
                    border-radius: 3px;
                    font-family: 'Courier New', monospace;
                    color: #e74c3c;
                }

                .exercise-content {
                    margin-top: var(--spacing-md);
                }

                .exercise-content ol {
                    padding-left: var(--spacing-lg);
                }

                .exercise-content ol li {
                    margin-bottom: var(--spacing-sm);
                }

                .persona-exercise-card .btn {
                    width: 100%;
                    margin-top: var(--spacing-md);
                }

                /* Exercises List */
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
                <h4>Exercise Tips</h4>
                <ul>
                    <li>Read the scenario carefully before starting</li>
                    <li>Fill in all fields marked with "# TODO" comments</li>
                    <li>Use the validation button to check your YAML syntax</li>
                    <li>Remember: all policies require title, metadata, contacts, and scope</li>
                    <li>Optional fields can be left empty or removed if not applicable</li>
                </ul>
            </div>

            <div class="optional-content-section">
                <h3>Optional: Advanced Policy Authoring with AI</h3>
                <p>Want to learn more about leveraging AI and gemara-mcp-server tools? Click below to explore advanced techniques.</p>
                <button class="btn btn-secondary" onclick="window.moduleManager.showAdvancedContent()">View Advanced Policy Authoring with AI</button>
            </div>

            <style>
                .optional-content-section {
                    margin: var(--spacing-xl) 0;
                    padding: var(--spacing-xl);
                    background-color: var(--bg-color);
                    border-radius: var(--radius-lg);
                    border: 2px dashed var(--border-color);
                    text-align: center;
                }
                .optional-content-section h3 {
                    margin-bottom: var(--spacing-md);
                }
                .optional-content-section p {
                    color: var(--text-secondary);
                    margin-bottom: var(--spacing-lg);
                }
            </style>

            <div id="advanced-content" style="display: none;">
                <hr style="margin: var(--spacing-xl) 0; border: none; border-top: 2px solid var(--border-color);">

                <h3>Advanced Policy Authoring with AI</h3>
                <p>Leverage the gemara-mcp-server and AI agents to accelerate your policy writing workflow while maintaining quality and compliance.</p>

                <div class="info-box">
                    <h4>What You'll Learn</h4>
                    <ul>
                        <li>Using gemara-mcp-server tools effectively</li>
                        <li>Crafting effective prompts for policy generation</li>
                        <li>Iterative refinement with AI feedback</li>
                        <li>Validating and storing policy artifacts</li>
                        <li>Building reusable policy templates</li>
                    </ul>
                </div>

                <h4>Gemara MCP Server Tools</h4>
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

                <h4>AI-Assisted Workflow</h4>
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

                <div class="info-box success">
                    <h4>Pro Tips for AI Assistance</h4>
                    <ul>
                        <li>Always validate before storing - catch errors early</li>
                        <li>Use AI to explain validation errors and suggest fixes</li>
                        <li>Build a library of prompt templates for common policy types</li>
                        <li>Review AI-generated content critically - you're the expert!</li>
                        <li>Save successful prompts for reuse</li>
                    </ul>
                </div>

                <button class="btn btn-secondary" onclick="window.moduleManager.hideAdvancedContent()">Hide Advanced Content</button>
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
                        <button class="btn btn-secondary btn-small" onclick="window.moduleManager.loadCaseStudy(1)">View Full Case Study</button>
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
                        <button class="btn btn-secondary btn-small" onclick="window.moduleManager.loadCaseStudy(2)">View Full Case Study</button>
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
                        <button class="btn btn-secondary btn-small" onclick="window.moduleManager.loadCaseStudy(3)">View Full Case Study</button>
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
                    <p><strong class="problem-label">Problem:</strong> Department heads push back on security policies that impact productivity</p>
                    <p><strong class="solution-label">Solution:</strong> Include business impact analysis in policies, offer exceptions process, communicate trade-offs clearly</p>
                </div>
                <div class="challenge-item">
                    <h4>2. Conflicting Requirements</h4>
                    <p><strong class="problem-label">Problem:</strong> Different compliance frameworks have overlapping but not identical requirements</p>
                    <p><strong class="solution-label">Solution:</strong> Map all requirements, identify common denominators, write policies that satisfy multiple frameworks</p>
                </div>
                <div class="challenge-item">
                    <h4>3. Resource Constraints</h4>
                    <p><strong class="problem-label">Problem:</strong> Limited budget and staff to implement all desired controls</p>
                    <p><strong class="solution-label">Solution:</strong> Risk-based prioritization, phased implementation, document compensating controls for gaps</p>
                </div>
                <div class="challenge-item">
                    <h4>4. Legacy Systems</h4>
                    <p><strong class="problem-label">Problem:</strong> Old systems can't meet modern security requirements</p>
                    <p><strong class="solution-label">Solution:</strong> Network segmentation, additional monitoring, planned sunset dates, exception management</p>
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
                    color: black;
                    margin-bottom: var(--spacing-sm);
                }
                .problem-label {
                    color: darkred;
                }
                .solution-label {
                    color: darkgreen;
                }
            </style>

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

    startInteractiveExercise(exerciseNum) {
        const exercises = {
            6: {
                title: "Exercise 6: Policy Modernization",
                description: "Transform a legacy policy document into Gemara format",
                question: `
                    <h3>Scenario</h3>
                    <p>You've been given the following legacy password policy document from 2015:</p>
                    <div class="legacy-policy">
                        <h4>Corporate Password Policy v1.2</h4>
                        <p><strong>Purpose:</strong> To ensure account security through strong passwords.</p>
                        <p><strong>Policy:</strong> All employees must use passwords that are at least 8 characters long, contain uppercase and lowercase letters, numbers, and special characters. Passwords must be changed every 90 days. Passwords cannot be reused within 12 months.</p>
                        <p><strong>Responsible Party:</strong> IT Department</p>
                        <p><strong>Effective Date:</strong> January 1, 2015</p>
                    </div>
                    <p><strong>Your Task:</strong> Convert this legacy policy into a proper Gemara Layer 3 YAML artifact. Include all required metadata, scope, adherence requirements, and map it to appropriate controls.</p>
                `,
                starterCode: `# Layer 3 Policy Schema Template
# Fill in all required fields marked with "# TODO"

title: "" # TODO: Policy title

metadata:
  id: "" # TODO: Unique policy identifier (e.g., "password-policy-001")
  description: "" # TODO: Brief description of the policy
  version: "" # TODO: Version number (e.g., "1.0.0")
  author:
    id: "" # TODO: Author identifier
    name: "" # TODO: Author name
    type: Human
  contact: # OPTIONAL: Primary contact (separate from author)
    name: "" # TODO: Contact name
    affiliation: "" # TODO: Department or organization
    email: "" # TODO: Contact email
  date: # OPTIONAL
    created: "" # TODO: Creation date (YYYY-MM-DD)
    modified: "" # TODO: Last modified date (YYYY-MM-DD)
  mapping-references: # OPTIONAL: External frameworks referenced
    - id: "" # TODO: Framework ID
      title: "" # TODO: Framework title
      version: "" # TODO: Framework version
      description: "" # TODO: Framework description
      url: "" # TODO: Framework URL
  applicability-categories: # OPTIONAL: Classification tags
    - id: "" # TODO: Category ID
      title: "" # TODO: Category title
      description: "" # TODO: Category description
  draft: false # TODO: Set to true if draft, false if final

organization-id: "" # OPTIONAL: Organization identifier

purpose: "" # OPTIONAL: High-level purpose statement

contacts: # REQUIRED: RACI roles
  responsible:
    - name: "" # TODO: Name
      affiliation: "" # TODO: Department
      email: "" # TODO: Email
  accountable:
    - name: ""
      affiliation: ""
      email: ""
  consulted:
    - name: ""
      affiliation: ""
  informed:
    - name: ""
      affiliation: ""

scope: # REQUIRED: Policy applicability
  boundaries: # OPTIONAL: Geographic regions or jurisdictions
    - "" # TODO: Add boundaries (e.g., "United States")
  technologies: # OPTIONAL: Technology categories
    - "" # TODO: Add technologies (e.g., "Cloud Computing")
  providers: # OPTIONAL: Service providers
    - "" # TODO: Add providers (e.g., "Amazon Web Services")

guidance-references: # OPTIONAL: Layer 1 references
  - reference-id: "" # TODO: Reference ID
    in-scope:
      boundaries: []
      technologies: []
      providers: []
    out-of-scope:
      boundaries: []
      technologies: []
      providers: []
    control-modifications: # OPTIONAL
      - target-id: ""
        modification-type: "" # enhancement, clarification, constraint
        modification-rationale: ""
        title: ""
        objective: ""

control-references: # OPTIONAL: Layer 2 references
  - reference-id: "" # TODO: Control catalog reference
    in-scope:
      boundaries: []
      technologies: []
      providers: []
    out-of-scope:
      boundaries: []
      technologies: []
      providers: []
    control-modifications: # OPTIONAL
      - target-id: ""
        modification-type: ""
        modification-rationale: ""
        title: ""
        objective: ""

adherence: # OPTIONAL: Compliance mechanisms
  evaluation:
    frequency: "" # TODO: How often evaluated (e.g., "quarterly")
    method: "" # TODO: Evaluation method
  enforcement:
    automated: false # TODO: true/false
    manual: false # TODO: true/false
    preventive: false # TODO: true/false
    detective: false # TODO: true/false

implementation-plan: # OPTIONAL
  phases:
    - phase: "" # TODO: Phase name
      timeline: "" # TODO: Timeline
      milestones:
        - "" # TODO: Milestone description

risks: # OPTIONAL
  - id: "" # TODO: Risk ID
    description: "" # TODO: Risk description
    likelihood: "" # TODO: low, medium, high
    impact: "" # TODO: low, medium, high
    mitigation: "" # TODO: Mitigation strategy
`
            },
            7: {
                title: "Exercise 7: Policy Family Creation",
                description: "Build a complete policy family for access control",
                question: `
                    <h3>Scenario</h3>
                    <p>Your organization needs a comprehensive access control policy family that covers:</p>
                    <ul>
                        <li>User account provisioning and de-provisioning</li>
                        <li>Role-based access control (RBAC)</li>
                        <li>Privileged access management</li>
                        <li>Access reviews and recertification</li>
                    </ul>
                    <p><strong>Your Task:</strong> Create the first policy in this family - the User Account Lifecycle Policy. This policy should define how user accounts are created, modified, and terminated throughout the employee lifecycle.</p>
                    <p><strong>Requirements:</strong></p>
                    <ul>
                        <li>Account provisioning must occur on or before first day of employment</li>
                        <li>Account termination must occur within 4 hours of separation</li>
                        <li>Access changes require manager approval</li>
                        <li>All actions must be logged and auditable</li>
                    </ul>
                `,
                starterCode: `# Layer 3 Policy Schema Template
# Fill in all required fields marked with "# TODO"

title: "" # TODO: Policy title

metadata:
  id: "" # TODO: Unique policy identifier (e.g., "iam-account-lifecycle-001")
  description: "" # TODO: Brief description of the policy
  version: "" # TODO: Version number (e.g., "1.0.0")
  author:
    id: "" # TODO: Author identifier
    name: "" # TODO: Author name
    type: Human
  contact: # OPTIONAL: Primary contact (separate from author)
    name: "" # TODO: Contact name
    affiliation: "" # TODO: Department or organization
    email: "" # TODO: Contact email
  date: # OPTIONAL
    created: "" # TODO: Creation date (YYYY-MM-DD)
    modified: "" # TODO: Last modified date (YYYY-MM-DD)
  mapping-references: # OPTIONAL: External frameworks referenced
    - id: "" # TODO: Framework ID
      title: "" # TODO: Framework title
      version: "" # TODO: Framework version
      description: "" # TODO: Framework description
      url: "" # TODO: Framework URL
  applicability-categories: # OPTIONAL: Classification tags
    - id: "" # TODO: Category ID
      title: "" # TODO: Category title
      description: "" # TODO: Category description
  draft: false # TODO: Set to true if draft, false if final

organization-id: "" # OPTIONAL: Organization identifier

purpose: "" # OPTIONAL: High-level purpose statement

contacts: # REQUIRED: RACI roles
  responsible:
    - name: "" # TODO: Name
      affiliation: "" # TODO: Department
      email: "" # TODO: Email
  accountable:
    - name: ""
      affiliation: ""
      email: ""
  consulted:
    - name: ""
      affiliation: ""
  informed:
    - name: ""
      affiliation: ""

scope: # REQUIRED: Policy applicability
  boundaries: # OPTIONAL: Geographic regions or jurisdictions
    - "" # TODO: Add boundaries (e.g., "United States")
  technologies: # OPTIONAL: Technology categories
    - "" # TODO: Add technologies (e.g., "Identity Management Systems")
  providers: # OPTIONAL: Service providers
    - "" # TODO: Add providers (e.g., "Okta", "Azure AD")

guidance-references: # OPTIONAL: Layer 1 references
  - reference-id: "" # TODO: Reference ID
    in-scope:
      boundaries: []
      technologies: []
      providers: []
    out-of-scope:
      boundaries: []
      technologies: []
      providers: []
    control-modifications: # OPTIONAL
      - target-id: ""
        modification-type: "" # enhancement, clarification, constraint
        modification-rationale: ""
        title: ""
        objective: ""

control-references: # OPTIONAL: Layer 2 references
  - reference-id: "" # TODO: Control catalog reference
    in-scope:
      boundaries: []
      technologies: []
      providers: []
    out-of-scope:
      boundaries: []
      technologies: []
      providers: []
    control-modifications: # OPTIONAL
      - target-id: ""
        modification-type: ""
        modification-rationale: ""
        title: ""
        objective: ""

adherence: # OPTIONAL: Compliance mechanisms
  evaluation:
    frequency: "" # TODO: How often evaluated (e.g., "quarterly")
    method: "" # TODO: Evaluation method
  enforcement:
    automated: false # TODO: true/false
    manual: false # TODO: true/false
    preventive: false # TODO: true/false
    detective: false # TODO: true/false

implementation-plan: # OPTIONAL
  phases:
    - phase: "" # TODO: Phase name
      timeline: "" # TODO: Timeline
      milestones:
        - "" # TODO: Milestone description

risks: # OPTIONAL
  - id: "" # TODO: Risk ID
    description: "" # TODO: Risk description
    likelihood: "" # TODO: low, medium, high
    impact: "" # TODO: low, medium, high
    mitigation: "" # TODO: Mitigation strategy
`
            },
            8: {
                title: "Exercise 8: Cross-Layer Integration",
                description: "Create end-to-end traceability from guidance to policy",
                question: `
                    <h3>Scenario</h3>
                    <p>You need to create a Layer 3 policy that demonstrates full traceability:</p>
                    <ul>
                        <li><strong>Layer 1 Guidance:</strong> NIST CSF PR.AC-7 "Users, devices, and other assets are authenticated"</li>
                        <li><strong>Layer 2 Control:</strong> IAM-AUTH-002 "Implement certificate-based authentication for privileged access"</li>
                    </ul>
                    <p><strong>Your Task:</strong> Create a Layer 3 policy that implements certificate-based authentication for system administrators accessing production systems. The policy must:</p>
                    <ul>
                        <li>Reference the Layer 1 guidance and Layer 2 control</li>
                        <li>Define scope (what systems, what roles)</li>
                        <li>Specify implementation requirements</li>
                        <li>Include enforcement and compliance verification methods</li>
                        <li>Address exceptions for emergency access</li>
                    </ul>
                `,
                starterCode: `# Layer 3 Policy Schema Template
# Fill in all required fields marked with "# TODO"
# This exercise focuses on cross-layer traceability

title: "" # TODO: Policy title

metadata:
  id: "" # TODO: Unique policy identifier (e.g., "certificate-auth-policy-001")
  description: "" # TODO: Brief description of the policy
  version: "" # TODO: Version number (e.g., "1.0.0")
  author:
    id: "" # TODO: Author identifier
    name: "" # TODO: Author name
    type: Human
  contact: # OPTIONAL: Primary contact (separate from author)
    name: "" # TODO: Contact name
    affiliation: "" # TODO: Department or organization
    email: "" # TODO: Contact email
  date: # OPTIONAL
    created: "" # TODO: Creation date (YYYY-MM-DD)
    modified: "" # TODO: Last modified date (YYYY-MM-DD)
  mapping-references: # OPTIONAL: External frameworks referenced
    - id: "" # TODO: Framework ID (e.g., "NIST-CSF")
      title: "" # TODO: Framework title
      version: "" # TODO: Framework version
      description: "" # TODO: Framework description
      url: "" # TODO: Framework URL
  applicability-categories: # OPTIONAL: Classification tags
    - id: "" # TODO: Category ID
      title: "" # TODO: Category title
      description: "" # TODO: Category description
  draft: false # TODO: Set to true if draft, false if final

organization-id: "" # OPTIONAL: Organization identifier

purpose: "" # OPTIONAL: High-level purpose statement

contacts: # REQUIRED: RACI roles
  responsible:
    - name: "" # TODO: Name
      affiliation: "" # TODO: Department
      email: "" # TODO: Email
  accountable:
    - name: ""
      affiliation: ""
      email: ""
  consulted:
    - name: ""
      affiliation: ""
  informed:
    - name: ""
      affiliation: ""

scope: # REQUIRED: Policy applicability
  boundaries: # OPTIONAL: Geographic regions or jurisdictions
    - "" # TODO: Add boundaries
  technologies: # OPTIONAL: Technology categories
    - "" # TODO: Add technologies (e.g., "Production Systems")
  providers: # OPTIONAL: Service providers
    - "" # TODO: Add providers

guidance-references: # OPTIONAL: Layer 1 references
  - reference-id: "" # TODO: Reference to Layer 1 guidance (e.g., "NIST-CSF")
    in-scope:
      boundaries: []
      technologies: []
      providers: []
    out-of-scope:
      boundaries: []
      technologies: []
      providers: []
    control-modifications: # OPTIONAL
      - target-id: "" # TODO: Specific guidance item (e.g., "PR.AC-7")
        modification-type: "" # enhancement, clarification, constraint
        modification-rationale: ""
        title: ""
        objective: ""

control-references: # OPTIONAL: Layer 2 references
  - reference-id: "" # TODO: Control catalog reference (e.g., "iam-controls")
    in-scope:
      boundaries: []
      technologies: []
      providers: []
    out-of-scope:
      boundaries: []
      technologies: []
      providers: []
    control-modifications: # OPTIONAL
      - target-id: "" # TODO: Specific control (e.g., "IAM-AUTH-002")
        modification-type: ""
        modification-rationale: ""
        title: ""
        objective: ""

adherence: # OPTIONAL: Compliance mechanisms
  evaluation:
    frequency: "" # TODO: How often evaluated
    method: "" # TODO: Evaluation method
  enforcement:
    automated: false # TODO: true/false
    manual: false # TODO: true/false
    preventive: false # TODO: true/false
    detective: false # TODO: true/false

implementation-plan: # OPTIONAL
  phases:
    - phase: "" # TODO: Phase name
      timeline: "" # TODO: Timeline
      milestones:
        - "" # TODO: Milestone description

risks: # OPTIONAL
  - id: "" # TODO: Risk ID
    description: "" # TODO: Risk description (e.g., "Emergency access scenarios")
    likelihood: "" # TODO: low, medium, high
    impact: "" # TODO: low, medium, high
    mitigation: "" # TODO: Mitigation strategy
`
            }
        };

        const exercise = exercises[exerciseNum];
        if (!exercise) {
            console.error(`Exercise ${exerciseNum} not found`);
            return;
        }

        const container = document.getElementById('module-container');
        container.innerHTML = `
            <div class="exercise-container">
                <div class="exercise-header">
                    <h2>${exercise.title}</h2>
                    <p class="exercise-description">${exercise.description}</p>
                    <button class="btn btn-secondary" onclick="window.moduleManager.loadModule(4)">← Back to Module</button>
                </div>

                <div class="exercise-content">
                    <div class="exercise-question">
                        ${exercise.question}
                    </div>

                    <div class="exercise-workspace">
                        <h3>Your Solution</h3>
                        <div class="code-editor-container">
                            <div class="editor-header">
                                <span class="editor-title">policy.yaml</span>
                                <div class="editor-actions">
                                    <button class="btn btn-small btn-secondary" onclick="window.moduleManager.validateExercise(${exerciseNum})">Validate YAML</button>
                                    <button class="btn btn-small btn-primary" onclick="window.moduleManager.submitExercise(${exerciseNum})">Submit Solution</button>
                                </div>
                            </div>
                            <textarea class="yaml-editor" id="exercise-${exerciseNum}-editor">${exercise.starterCode}</textarea>
                        </div>
                        <div id="exercise-feedback" class="exercise-feedback"></div>
                    </div>
                </div>
            </div>

            <style>
                .exercise-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .exercise-header {
                    margin-bottom: var(--spacing-xl);
                    padding-bottom: var(--spacing-lg);
                    border-bottom: 2px solid var(--border-color);
                }
                .exercise-description {
                    color: var(--text-secondary);
                    font-size: 1.1rem;
                    margin: var(--spacing-md) 0;
                }
                .exercise-content {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: var(--spacing-xl);
                }
                .exercise-question {
                    background-color: var(--bg-color);
                    padding: var(--spacing-xl);
                    border-radius: var(--radius-lg);
                    border-left: 4px solid var(--primary-color);
                }
                .legacy-policy {
                    background-color: var(--surface-color);
                    padding: var(--spacing-lg);
                    border-radius: var(--radius-md);
                    margin: var(--spacing-md) 0;
                    border: 1px solid var(--border-color);
                }
                .legacy-policy h4 {
                    color: var(--primary-color);
                    margin-bottom: var(--spacing-md);
                }
                .exercise-workspace {
                    background-color: var(--surface-color);
                    padding: var(--spacing-xl);
                    border-radius: var(--radius-lg);
                }
                .exercise-feedback {
                    margin-top: var(--spacing-lg);
                    padding: var(--spacing-md);
                    border-radius: var(--radius-md);
                    display: none;
                }
                .exercise-feedback.show {
                    display: block;
                }
                .exercise-feedback.success {
                    background-color: rgba(16, 185, 129, 0.1);
                    border: 1px solid var(--secondary-color);
                    color: var(--secondary-color);
                }
                .exercise-feedback.error {
                    background-color: rgba(239, 68, 68, 0.1);
                    border: 1px solid var(--danger-color);
                    color: var(--danger-color);
                }
                .code-editor-container {
                    margin: var(--spacing-lg) 0;
                }
                .submission-summary {
                    background-color: rgba(16, 185, 129, 0.05);
                    padding: var(--spacing-md);
                    border-radius: var(--radius-sm);
                    margin: var(--spacing-md) 0;
                }
                .submission-summary ul {
                    margin: var(--spacing-sm) 0;
                    padding-left: var(--spacing-lg);
                }
                .feedback-actions {
                    margin-top: var(--spacing-lg);
                    display: flex;
                    gap: var(--spacing-md);
                    flex-wrap: wrap;
                }
            </style>
        `;

        // Initialize the code editor
        this.initializeCodeEditors();
    }

    getEditorContent(exerciseNum) {
        const editor = document.querySelector(`#exercise-${exerciseNum}-editor`);
        if (!editor) {
            console.error(`Editor for exercise ${exerciseNum} not found`);
            return null;
        }

        // Get content from CodeMirror instance if initialized, otherwise from textarea
        return editor.editor ? editor.editor.getValue() : editor.value;
    }

    validateExercise(exerciseNum) {
        const feedback = document.getElementById('exercise-feedback');
        const yamlContent = this.getEditorContent(exerciseNum);

        if (yamlContent === null) {
            feedback.className = 'exercise-feedback show error';
            feedback.innerHTML = `
                <h4>✗ Validation Failed</h4>
                <p>Could not access the editor content. Please refresh and try again.</p>
            `;
            return false;
        }

        try {
            // Basic YAML validation
            if (!yamlContent.trim()) {
                throw new Error("YAML content is empty");
            }

            // Check for required top-level fields
            const requiredFields = ['metadata:', 'title:', 'purpose:'];
            const missingFields = requiredFields.filter(field => !yamlContent.includes(field));

            if (missingFields.length > 0) {
                throw new Error(`Missing required fields: ${missingFields.join(', ').replace(/:/g, '')}`);
            }

            // Check for required metadata fields
            const metadataFields = ['id:', 'description:', 'version:', 'author:'];
            const missingMetadata = metadataFields.filter(field => {
                const metadataSection = yamlContent.substring(yamlContent.indexOf('metadata:'));
                return !metadataSection.includes(field);
            });

            if (missingMetadata.length > 0) {
                throw new Error(`Missing required metadata fields: ${missingMetadata.join(', ').replace(/:/g, '')}`);
            }

            // Check for common YAML syntax issues
            const lines = yamlContent.split('\n');
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                // Skip empty lines and comments
                if (line.trim() === '' || line.trim().startsWith('#')) continue;

                // Check for tabs (YAML doesn't allow tabs for indentation)
                if (line.includes('\t')) {
                    throw new Error(`Line ${i + 1}: YAML does not allow tabs for indentation. Use spaces instead.`);
                }
            }

            feedback.className = 'exercise-feedback show success';
            feedback.innerHTML = `
                <h4>✓ Validation Passed</h4>
                <p>Your YAML structure looks good! All required fields are present.</p>
                <p><strong>Note:</strong> This is a basic validation. When you submit, your policy will be evaluated against the full Gemara schema.</p>
            `;
            return true;
        } catch (error) {
            feedback.className = 'exercise-feedback show error';
            feedback.innerHTML = `
                <h4>✗ Validation Failed</h4>
                <p>${error.message}</p>
                <p><strong>Tip:</strong> Review the example policies in Module 3 for reference.</p>
            `;
            return false;
        }
    }

    submitExercise(exerciseNum) {
        const feedback = document.getElementById('exercise-feedback');
        const yamlContent = this.getEditorContent(exerciseNum);

        if (yamlContent === null) {
            feedback.className = 'exercise-feedback show error';
            feedback.innerHTML = `
                <h4>✗ Submission Failed</h4>
                <p>Could not access the editor content. Please refresh and try again.</p>
            `;
            return;
        }

        // First validate before submitting
        const isValid = this.validateExercise(exerciseNum);

        if (!isValid) {
            // Validation already displayed error message
            const currentFeedback = feedback.innerHTML;
            feedback.innerHTML = currentFeedback.replace(
                '</p>',
                '</p><p><strong>Please fix validation errors before submitting.</strong></p>'
            );
            return;
        }

        // Store the submission data for future backend integration
        const submissionData = {
            exerciseNumber: exerciseNum,
            timestamp: new Date().toISOString(),
            yamlContent: yamlContent,
            contentLength: yamlContent.length,
            lineCount: yamlContent.split('\n').length
        };

        // Log for development purposes (will be replaced with API call)
        console.log('Exercise Submission:', submissionData);

        // Store in localStorage for now (temporary solution until backend is ready)
        try {
            const submissions = JSON.parse(localStorage.getItem('exerciseSubmissions') || '{}');
            submissions[`exercise-${exerciseNum}`] = submissionData;
            localStorage.setItem('exerciseSubmissions', JSON.stringify(submissions));
        } catch (error) {
            console.warn('Failed to store submission in localStorage:', error);
        }

        // Display success message
        feedback.className = 'exercise-feedback show success';
        feedback.innerHTML = `
            <h4>✓ Exercise Submitted Successfully!</h4>
            <p>Your solution has been submitted and saved.</p>
            <div class="submission-summary">
                <p><strong>Submission Summary:</strong></p>
                <ul>
                    <li>Exercise: ${exerciseNum}</li>
                    <li>Timestamp: ${new Date().toLocaleString()}</li>
                    <li>Lines of YAML: ${submissionData.lineCount}</li>
                </ul>
            </div>
            <p><strong>Next Steps:</strong></p>
            <ul>
                <li>Your solution will be evaluated against the Gemara schema (feature in development)</li>
                <li>Review the solution with AI assistance using the gemara-mcp-server</li>
                <li>Compare with example solutions in the learning portal</li>
                <li>Move on to the next exercise or return to the module</li>
            </ul>
            <div class="feedback-actions">
                <button class="btn btn-primary" onclick="window.moduleManager.loadModule(4)">Return to Module 4</button>
                <button class="btn btn-secondary" onclick="window.moduleManager.viewSubmission(${exerciseNum})">View Submission</button>
            </div>
        `;
    }

    viewSubmission(exerciseNum) {
        try {
            const submissions = JSON.parse(localStorage.getItem('exerciseSubmissions') || '{}');
            const submission = submissions[`exercise-${exerciseNum}`];

            if (!submission) {
                alert('No submission found for this exercise.');
                return;
            }

            // Create a modal or new view to display the submission
            const modal = document.createElement('div');
            modal.className = 'submission-modal';
            modal.innerHTML = `
                <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Exercise ${exerciseNum} Submission</h3>
                        <button class="modal-close" onclick="this.closest('.submission-modal').remove()">×</button>
                    </div>
                    <div class="modal-body">
                        <p><strong>Submitted:</strong> ${new Date(submission.timestamp).toLocaleString()}</p>
                        <p><strong>Lines:</strong> ${submission.lineCount}</p>
                        <pre><code class="language-yaml">${this.escapeHtml(submission.yamlContent)}</code></pre>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="this.closest('.submission-modal').remove()">Close</button>
                    </div>
                </div>
                <style>
                    .submission-modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        z-index: 1000;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .modal-overlay {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(0, 0, 0, 0.5);
                    }
                    .modal-content {
                        position: relative;
                        background: var(--surface-color);
                        border-radius: var(--radius-lg);
                        max-width: 800px;
                        max-height: 80vh;
                        overflow-y: auto;
                        box-shadow: var(--shadow-lg);
                        margin: var(--spacing-lg);
                    }
                    .modal-header {
                        padding: var(--spacing-lg);
                        border-bottom: 1px solid var(--border-color);
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .modal-close {
                        background: none;
                        border: none;
                        font-size: 2rem;
                        cursor: pointer;
                        color: var(--text-secondary);
                    }
                    .modal-body {
                        padding: var(--spacing-lg);
                    }
                    .modal-body pre {
                        background: var(--bg-color);
                        padding: var(--spacing-md);
                        border-radius: var(--radius-md);
                        overflow-x: auto;
                    }
                    .modal-footer {
                        padding: var(--spacing-lg);
                        border-top: 1px solid var(--border-color);
                        text-align: right;
                    }
                </style>
            `;
            document.body.appendChild(modal);
        } catch (error) {
            console.error('Error viewing submission:', error);
            alert('Failed to load submission. Please try again.');
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    loadCaseStudy(caseNum) {
        const caseStudies = {
            1: {
                title: "Case Study 1: Financial Services - PCI-DSS Compliance",
                industry: "Finance",
                organization: "Regional Community Bank",
                background: `
                    <h3>Organization Background</h3>
                    <p><strong>Name:</strong> Regional Community Bank (RCB)</p>
                    <p><strong>Size:</strong> 500+ employees across 25 branch locations</p>
                    <p><strong>Technology Stack:</strong></p>
                    <ul>
                        <li>Legacy on-premises core banking system (15 years old)</li>
                        <li>Cloud-based customer portal and mobile banking app</li>
                        <li>Hybrid payment processing infrastructure</li>
                        <li>Third-party vendors for ATM network and card processing</li>
                    </ul>
                    <p><strong>Compliance Status:</strong> Currently PCI-DSS 3.2.1 compliant, preparing for 4.0 migration</p>
                `,
                scenario: `
                    <h3>The Challenge</h3>
                    <p>RCB's annual PCI-DSS assessment is approaching, and the auditor has flagged several concerns:</p>
                    <ul>
                        <li>Existing policies were written 5 years ago and don't reflect current operations</li>
                        <li>Cloud migration of customer portal introduced new cardholder data flows not documented in policies</li>
                        <li>Legacy system limitations make some PCI-DSS 4.0 requirements difficult to implement</li>
                        <li>Multiple third-party vendors with varying levels of compliance maturity</li>
                        <li>Staff turnover has left gaps in security knowledge and policy awareness</li>
                    </ul>

                    <h3>Specific Requirements</h3>
                    <div class="requirement-box">
                        <h4>PCI-DSS Requirement 8: Identify users and authenticate access</h4>
                        <p><strong>8.3:</strong> Secure all individual non-console administrative access and all remote access to the CDE using multi-factor authentication.</p>
                        <p><strong>New in 4.0:</strong> MFA must be applied to all access into the CDE, not just remote access.</p>
                    </div>
                `,
                tasks: `
                    <h3>Your Tasks</h3>
                    <ol>
                        <li><strong>Policy Analysis:</strong> Review the existing access control policy and identify gaps relative to PCI-DSS 4.0 Requirement 8.3</li>
                        <li><strong>Scope Definition:</strong> Define what systems are in the Cardholder Data Environment (CDE) and which users need MFA</li>
                        <li><strong>Exception Handling:</strong> Determine how to handle legacy systems that cannot support modern MFA</li>
                        <li><strong>Layer 3 Policy Creation:</strong> Write a Gemara Layer 3 policy that:
                            <ul>
                                <li>Implements PCI-DSS Requirement 8.3</li>
                                <li>Accounts for hybrid cloud/on-premises environment</li>
                                <li>Documents exceptions with compensating controls</li>
                                <li>Includes enforcement and monitoring requirements</li>
                            </ul>
                        </li>
                    </ol>
                `,
                resources: `
                    <h3>Resources Provided</h3>
                    <ul>
                        <li>Current access control policy (legacy format)</li>
                        <li>Network diagram showing CDE boundaries</li>
                        <li>List of systems and their MFA capabilities</li>
                        <li>PCI-DSS 4.0 requirement text</li>
                    </ul>
                `,
                deliverables: `
                    <h3>Expected Deliverables</h3>
                    <ul>
                        <li>Gap analysis document comparing current state to PCI-DSS 4.0</li>
                        <li>Complete Layer 3 policy in Gemara YAML format</li>
                        <li>Exception request form for legacy systems</li>
                        <li>Implementation roadmap with timeline</li>
                    </ul>
                `
            },
            2: {
                title: "Case Study 2: Healthcare - HIPAA Privacy & Security",
                industry: "Healthcare",
                organization: "Metro Health System",
                background: `
                    <h3>Organization Background</h3>
                    <p><strong>Name:</strong> Metro Health System</p>
                    <p><strong>Size:</strong> 3 hospitals, 20 clinics, 2,500 employees</p>
                    <p><strong>Technology Stack:</strong></p>
                    <ul>
                        <li>Migrating from on-premises EHR to Epic cloud-hosted solution</li>
                        <li>BYOD program for physicians using personal tablets and smartphones</li>
                        <li>Third-party telehealth platform</li>
                        <li>Multiple legacy medical devices and departmental systems</li>
                    </ul>
                    <p><strong>Compliance Status:</strong> HIPAA compliant with on-premises systems, cloud migration introduces new risks</p>
                `,
                scenario: `
                    <h3>The Challenge</h3>
                    <p>Metro Health is undergoing digital transformation while maintaining HIPAA compliance:</p>
                    <ul>
                        <li>Physicians demand mobile access to patient records from personal devices</li>
                        <li>Cloud-based EHR introduces data residency and encryption questions</li>
                        <li>Telehealth platform requires video/audio recording and storage</li>
                        <li>Existing policies don't address cloud storage or mobile access</li>
                        <li>Need to balance security with clinical workflow efficiency</li>
                    </ul>

                    <h3>Specific Requirements</h3>
                    <div class="requirement-box">
                        <h4>HIPAA Security Rule: 164.312(a)(2)(i) - Access Control</h4>
                        <p><strong>Unique User Identification:</strong> Assign a unique name and/or number for identifying and tracking user identity.</p>
                        <p><strong>164.312(e)(1) - Transmission Security:</strong> Implement technical security measures to guard against unauthorized access to ePHI transmitted over electronic networks.</p>
                    </div>
                `,
                tasks: `
                    <h3>Your Tasks</h3>
                    <ol>
                        <li><strong>Risk Assessment:</strong> Identify risks associated with mobile access to ePHI from personal devices</li>
                        <li><strong>Policy Framework:</strong> Design a mobile device policy that satisfies HIPAA requirements while enabling physician productivity</li>
                        <li><strong>Cloud Considerations:</strong> Address data encryption, access controls, and audit logging for cloud-hosted EHR</li>
                        <li><strong>Layer 3 Policy Creation:</strong> Write Gemara Layer 3 policies for:
                            <ul>
                                <li>Mobile device access to ePHI</li>
                                <li>Cloud data storage and transmission</li>
                                <li>User authentication and authorization</li>
                                <li>Audit logging and monitoring</li>
                            </ul>
                        </li>
                    </ol>
                `,
                resources: `
                    <h3>Resources Provided</h3>
                    <ul>
                        <li>HIPAA Security Rule requirements (164.312)</li>
                        <li>Current mobile device policy (outdated)</li>
                        <li>Epic cloud BAA (Business Associate Agreement)</li>
                        <li>Mobile device management (MDM) capabilities</li>
                        <li>Risk assessment template</li>
                    </ul>
                `,
                deliverables: `
                    <h3>Expected Deliverables</h3>
                    <ul>
                        <li>Risk assessment for mobile ePHI access</li>
                        <li>Set of related Layer 3 policies in Gemara YAML format</li>
                        <li>Mobile device enrollment procedure for physicians</li>
                        <li>Monitoring and enforcement plan</li>
                        <li>Training materials for end users</li>
                    </ul>
                `
            },
            3: {
                title: "Case Study 3: SaaS Company - SOC 2 Type II",
                industry: "Technology",
                organization: "CloudFlow Analytics",
                background: `
                    <h3>Organization Background</h3>
                    <p><strong>Name:</strong> CloudFlow Analytics</p>
                    <p><strong>Size:</strong> 75 employees, fast-growing SaaS startup</p>
                    <p><strong>Technology Stack:</strong></p>
                    <ul>
                        <li>AWS cloud-native architecture</li>
                        <li>Microservices deployed via Kubernetes</li>
                        <li>Multi-tenant SaaS platform</li>
                        <li>Customer data analytics and reporting</li>
                    </ul>
                    <p><strong>Compliance Status:</strong> No formal compliance program, need SOC 2 to win enterprise customers</p>
                `,
                scenario: `
                    <h3>The Challenge</h3>
                    <p>CloudFlow is losing enterprise deals due to lack of SOC 2 certification:</p>
                    <ul>
                        <li>No documented security policies or procedures</li>
                        <li>Small team with limited compliance expertise</li>
                        <li>Rapid development pace with frequent deployments</li>
                        <li>Need SOC 2 Type II within 6 months to secure Series B funding</li>
                        <li>Must implement policies without slowing down product development</li>
                    </ul>

                    <h3>Specific Requirements</h3>
                    <div class="requirement-box">
                        <h4>SOC 2 Trust Service Criteria - Security (CC6)</h4>
                        <p><strong>CC6.1:</strong> The entity implements logical access security software, infrastructure, and architectures over protected information assets to protect them from security events.</p>
                        <p><strong>CC6.2:</strong> Prior to issuing system credentials and granting system access, the entity registers and authorizes new internal and external users.</p>
                        <p><strong>CC6.3:</strong> The entity authorizes, modifies, or removes access based on job responsibilities.</p>
                    </div>
                `,
                tasks: `
                    <h3>Your Tasks</h3>
                    <ol>
                        <li><strong>Rapid Policy Development:</strong> Use AI assistance to accelerate policy creation for all SOC 2 Trust Service Criteria</li>
                        <li><strong>Developer-Friendly Policies:</strong> Write policies that integrate with CI/CD pipelines and don't impede agile workflows</li>
                        <li><strong>Evidence Collection:</strong> Design policies with built-in evidence collection for audit purposes</li>
                        <li><strong>Layer 3 Policy Creation:</strong> Create a complete policy family covering:
                            <ul>
                                <li>Access control and user provisioning (CC6.1-6.3)</li>
                                <li>Change management for production systems</li>
                                <li>Incident response and security monitoring</li>
                                <li>Data protection and encryption</li>
                            </ul>
                        </li>
                    </ol>
                `,
                resources: `
                    <h3>Resources Provided</h3>
                    <ul>
                        <li>SOC 2 Trust Service Criteria documentation</li>
                        <li>AWS security best practices</li>
                        <li>Kubernetes RBAC configuration</li>
                        <li>Current development and deployment processes</li>
                        <li>gemara-mcp-server for AI-assisted policy generation</li>
                    </ul>
                `,
                deliverables: `
                    <h3>Expected Deliverables</h3>
                    <ul>
                        <li>Complete policy framework in Gemara format covering all SOC 2 requirements</li>
                        <li>Policy-as-code implementation integrated with CI/CD</li>
                        <li>Evidence collection automation scripts</li>
                        <li>User access management procedures</li>
                        <li>6-month implementation roadmap to SOC 2 readiness</li>
                    </ul>
                `
            }
        };

        const caseStudy = caseStudies[caseNum];
        if (!caseStudy) {
            console.error(`Case study ${caseNum} not found`);
            return;
        }

        const container = document.getElementById('module-container');
        container.innerHTML = `
            <div class="case-study-detail">
                <div class="case-study-header">
                    <span class="industry-badge">${caseStudy.industry}</span>
                    <h2>${caseStudy.title}</h2>
                    <p class="organization-name">${caseStudy.organization}</p>
                    <button class="btn btn-secondary" onclick="window.moduleManager.loadModule(5)">← Back to Module 5</button>
                </div>

                <div class="case-study-content">
                    <div class="case-section">
                        ${caseStudy.background}
                    </div>

                    <div class="case-section highlight">
                        ${caseStudy.scenario}
                    </div>

                    <div class="case-section">
                        ${caseStudy.tasks}
                    </div>

                    <div class="case-section-grid">
                        <div class="case-section">
                            ${caseStudy.resources}
                        </div>
                        <div class="case-section">
                            ${caseStudy.deliverables}
                        </div>
                    </div>

                    <div class="case-actions">
                        <h3>Ready to Start?</h3>
                        <p>This case study is designed for hands-on work with AI assistance. Use the gemara-mcp-server to help develop your solutions.</p>
                        <div class="action-buttons">
                            <button class="btn btn-primary" onclick="window.moduleManager.startCaseStudyWorkspace(${caseNum})">Start Working on Case Study</button>
                            <button class="btn btn-secondary" onclick="window.moduleManager.loadModule(5)">Return to Module 5</button>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                .case-study-detail {
                    max-width: 1000px;
                    margin: 0 auto;
                }
                .case-study-header {
                    margin-bottom: var(--spacing-xl);
                    padding-bottom: var(--spacing-lg);
                    border-bottom: 2px solid var(--border-color);
                }
                .organization-name {
                    font-size: 1.2rem;
                    color: var(--text-secondary);
                    margin: var(--spacing-sm) 0 var(--spacing-lg) 0;
                }
                .case-study-content {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-xl);
                }
                .case-section {
                    background-color: var(--surface-color);
                    padding: var(--spacing-xl);
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--border-color);
                }
                .case-section.highlight {
                    background: linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%);
                    border-left: 4px solid var(--primary-color);
                }
                .case-section h3 {
                    color: var(--primary-color);
                    margin-bottom: var(--spacing-md);
                }
                .case-section h4 {
                    color: var(--accent-color);
                    margin-top: var(--spacing-md);
                    margin-bottom: var(--spacing-sm);
                }
                .case-section-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: var(--spacing-lg);
                }
                .requirement-box {
                    background-color: var(--bg-color);
                    padding: var(--spacing-lg);
                    border-radius: var(--radius-md);
                    margin: var(--spacing-md) 0;
                    border-left: 3px solid var(--secondary-color);
                }
                .requirement-box h4 {
                    color: var(--secondary-color);
                    margin-top: 0;
                }
                .case-actions {
                    background-color: var(--surface-color);
                    padding: var(--spacing-xl);
                    border-radius: var(--radius-lg);
                    text-align: center;
                    border: 2px solid var(--primary-color);
                }
                .case-actions h3 {
                    color: var(--primary-color);
                    margin-bottom: var(--spacing-md);
                }
                .action-buttons {
                    display: flex;
                    gap: var(--spacing-md);
                    justify-content: center;
                    margin-top: var(--spacing-lg);
                    flex-wrap: wrap;
                }
                @media (max-width: 768px) {
                    .case-section-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        `;

        // Scroll to top
        window.scrollTo(0, 0);
    }

    startCaseStudyWorkspace(caseNum) {
        const container = document.getElementById('module-container');
        container.innerHTML = `
            <div class="workspace-container">
                <div class="workspace-header">
                    <h2>Case Study ${caseNum} Workspace</h2>
                    <button class="btn btn-secondary" onclick="window.moduleManager.loadCaseStudy(${caseNum})">← Back to Case Study</button>
                </div>

                <div class="workspace-content">
                    <div class="info-box">
                        <h3>AI-Assisted Workspace</h3>
                        <p>This workspace is designed for collaborative work with AI assistance using the gemara-mcp-server.</p>
                        <p><strong>Recommended Workflow:</strong></p>
                        <ol>
                            <li>Use AI to research relevant Layer 1 guidance and Layer 2 controls</li>
                            <li>Draft policy statements with AI assistance</li>
                            <li>Create YAML artifacts using the editor below</li>
                            <li>Validate and refine with AI feedback</li>
                            <li>Submit your completed work</li>
                        </ol>
                    </div>

                    <div class="workspace-editor">
                        <h3>Policy Development Area</h3>
                        <div class="code-editor-container">
                            <div class="editor-header">
                                <span class="editor-title">case-study-${caseNum}-policy.yaml</span>
                                <div class="editor-actions">
                                    <button class="btn btn-small btn-secondary" onclick="window.moduleManager.saveCaseStudyWork(${caseNum})">Save Work</button>
                                    <button class="btn btn-small btn-primary" onclick="window.moduleManager.submitCaseStudy(${caseNum})">Submit Case Study</button>
                                </div>
                            </div>
                            <textarea class="yaml-editor" id="case-study-${caseNum}-editor"># Case Study ${caseNum} - Policy Solution
# Start developing your policy here

metadata:
  id: ""
  description: ""
  version: "1.0.0"
  author:
    id: ""
    name: ""
    type: Human

title: ""
purpose: ""

# Continue building your policy...
</textarea>
                        </div>
                        <div id="case-study-feedback" class="exercise-feedback"></div>
                    </div>

                    <div class="workspace-notes">
                        <h3>Notes & Documentation</h3>
                        <textarea id="case-study-notes" placeholder="Take notes here about your approach, decisions made, assumptions, etc..."></textarea>
                        <button class="btn btn-secondary btn-small" onclick="window.moduleManager.saveNotes(${caseNum})">Save Notes</button>
                    </div>
                </div>
            </div>

            <style>
                .workspace-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .workspace-header {
                    margin-bottom: var(--spacing-xl);
                    padding-bottom: var(--spacing-lg);
                    border-bottom: 2px solid var(--border-color);
                }
                .workspace-content {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-xl);
                }
                .workspace-editor {
                    background-color: var(--surface-color);
                    padding: var(--spacing-xl);
                    border-radius: var(--radius-lg);
                }
                .workspace-notes {
                    background-color: var(--surface-color);
                    padding: var(--spacing-xl);
                    border-radius: var(--radius-lg);
                }
                .workspace-notes textarea {
                    width: 100%;
                    min-height: 200px;
                    padding: var(--spacing-md);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-md);
                    font-family: var(--font-mono);
                    font-size: 0.9rem;
                    resize: vertical;
                }
            </style>
        `;

        // Initialize code editor
        this.initializeCodeEditors();

        // Try to load saved work
        this.loadCaseStudyWork(caseNum);
    }

    saveCaseStudyWork(caseNum) {
        const editor = document.querySelector(`#case-study-${caseNum}-editor`);
        if (!editor) return;

        const yamlContent = editor.editor ? editor.editor.getValue() : editor.value;

        try {
            localStorage.setItem(`case-study-${caseNum}-work`, yamlContent);
            alert('Work saved successfully!');
        } catch (error) {
            console.error('Error saving work:', error);
            alert('Failed to save work. Please try again.');
        }
    }

    loadCaseStudyWork(caseNum) {
        try {
            const savedWork = localStorage.getItem(`case-study-${caseNum}-work`);
            const savedNotes = localStorage.getItem(`case-study-${caseNum}-notes`);

            if (savedWork) {
                const editor = document.querySelector(`#case-study-${caseNum}-editor`);
                if (editor) {
                    if (editor.editor) {
                        editor.editor.setValue(savedWork);
                    } else {
                        editor.value = savedWork;
                    }
                }
            }

            if (savedNotes) {
                const notesArea = document.getElementById('case-study-notes');
                if (notesArea) {
                    notesArea.value = savedNotes;
                }
            }
        } catch (error) {
            console.error('Error loading saved work:', error);
        }
    }

    saveNotes(caseNum) {
        const notesArea = document.getElementById('case-study-notes');
        if (!notesArea) return;

        try {
            localStorage.setItem(`case-study-${caseNum}-notes`, notesArea.value);
            alert('Notes saved successfully!');
        } catch (error) {
            console.error('Error saving notes:', error);
            alert('Failed to save notes. Please try again.');
        }
    }

    submitCaseStudy(caseNum) {
        const editor = document.querySelector(`#case-study-${caseNum}-editor`);
        const feedback = document.getElementById('case-study-feedback');
        const notesArea = document.getElementById('case-study-notes');

        if (!editor || !feedback) return;

        const yamlContent = editor.editor ? editor.editor.getValue() : editor.value;
        const notes = notesArea ? notesArea.value : '';

        const submissionData = {
            caseStudyNumber: caseNum,
            timestamp: new Date().toISOString(),
            yamlContent: yamlContent,
            notes: notes,
            contentLength: yamlContent.length,
            lineCount: yamlContent.split('\n').length
        };

        console.log('Case Study Submission:', submissionData);

        try {
            const submissions = JSON.parse(localStorage.getItem('caseStudySubmissions') || '{}');
            submissions[`case-study-${caseNum}`] = submissionData;
            localStorage.setItem('caseStudySubmissions', JSON.stringify(submissions));

            feedback.className = 'exercise-feedback show success';
            feedback.innerHTML = `
                <h4>✓ Case Study Submitted Successfully!</h4>
                <p>Your case study solution has been submitted and saved.</p>
                <div class="submission-summary">
                    <p><strong>Submission Summary:</strong></p>
                    <ul>
                        <li>Case Study: ${caseNum}</li>
                        <li>Timestamp: ${new Date().toLocaleString()}</li>
                        <li>Policy Lines: ${submissionData.lineCount}</li>
                        <li>Notes: ${notes ? 'Included' : 'None'}</li>
                    </ul>
                </div>
                <p><strong>Next Steps:</strong></p>
                <ul>
                    <li>Review your solution with AI assistance</li>
                    <li>Compare with industry best practices</li>
                    <li>Refine based on feedback</li>
                    <li>Move on to the next case study or module</li>
                </ul>
                <button class="btn btn-primary" onclick="window.moduleManager.loadModule(5)">Return to Module 5</button>
            `;
        } catch (error) {
            console.error('Error submitting case study:', error);
            feedback.className = 'exercise-feedback show error';
            feedback.innerHTML = `
                <h4>✗ Submission Failed</h4>
                <p>Failed to save your submission. Please try again.</p>
            `;
        }
    }

    showAdvancedContent() {
        const advancedContent = document.getElementById('advanced-content');
        if (advancedContent) {
            advancedContent.style.display = 'block';
            // Scroll to the advanced content section
            advancedContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    hideAdvancedContent() {
        const advancedContent = document.getElementById('advanced-content');
        if (advancedContent) {
            advancedContent.style.display = 'none';
            // Scroll back to top of module
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    loadPersonaExercise(persona) {
        alert(`Persona-based exercise for ${persona} is coming soon! For now, use your AI assistant to work through the exercise template shown above.`);

        // Scroll to the selected persona card
        const personaCards = document.querySelectorAll('.persona-exercise-card');
        personaCards.forEach(card => {
            if (card.classList.contains(persona)) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                card.style.boxShadow = '0 12px 24px rgba(0,0,0,0.2)';
                setTimeout(() => {
                    card.style.boxShadow = '';
                }, 2000);
            }
        });
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
