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
                    <li><strong>Layer 1 (Vectors & Guidance)</strong> provides foundational knowledge and regulations from frameworks like NIST, ISO 27001, and CIS Controls</li>
                    <li><strong>Layer 2 (Threats & Controls)</strong> translates guidance into technology-specific objectives addressing known threats</li>
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
                        <h4>Exercise 6: Policy Modernization</h4>
                        <span class="difficulty">Intermediate</span>
                    </div>
                    <p>Transform a legacy policy document into Gemara format</p>
                    <button class="btn btn-primary btn-small" onclick="window.moduleManager.startInteractiveExercise(6)">Start Exercise</button>
                </div>
                <div class="exercise-card">
                    <div class="exercise-header">
                        <h4>Exercise 7: Policy Family Creation</h4>
                        <span class="difficulty">Advanced</span>
                    </div>
                    <p>Build a complete policy family for access control</p>
                    <button class="btn btn-primary btn-small" onclick="window.moduleManager.startInteractiveExercise(7)">Start Exercise</button>
                </div>
                <div class="exercise-card">
                    <div class="exercise-header">
                        <h4>Exercise 8: Cross-Layer Integration</h4>
                        <span class="difficulty">Advanced</span>
                    </div>
                    <p>Create end-to-end traceability from guidance to policy</p>
                    <button class="btn btn-primary btn-small" onclick="window.moduleManager.startInteractiveExercise(8)">Start Exercise</button>
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
                starterCode: `metadata:
  id: "password-policy-001"
  description: "Password requirements for user accounts"
  version: "2.0.0"
  author:
    id: security-team
    name: "Security Team"
    type: Human
    contact:
      name: "IT Security Manager"
      affiliation: "IT Department"
      email: "security@company.com"
  date:
    created: "2024-01-15"
    modified: "2024-01-15"
  draft: false

title: "Password Security Policy"
purpose: ""

# Add contacts, scope, adherence, and other required sections below
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
                starterCode: `metadata:
  id: "iam-account-lifecycle-001"
  description: ""
  version: "1.0.0"
  author:
    id: security-team
    name: "Security Team"
    type: Human
  date:
    created: "2024-01-15"
    modified: "2024-01-15"

title: "User Account Lifecycle Management Policy"
purpose: ""

# Define the complete policy structure
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
                starterCode: `metadata:
  id: "certificate-auth-policy-001"
  description: "Certificate-based authentication requirements for privileged access"
  version: "1.0.0"
  author:
    id: security-team
    name: "Security Team"
    type: Human
  mapping-references:
    - id: "NIST-CSF"
      title: "NIST Cybersecurity Framework"
      version: "1.1"
      url: "https://www.nist.gov/cyberframework"

title: "Certificate-Based Authentication Policy"
purpose: ""

imports:
  catalogs:
    - id: "iam-controls"
      location: "https://company.com/catalogs/iam-controls.yaml"
  guidance:
    - id: "nist-csf"
      location: "https://company.com/guidance/nist-csf.yaml"

# Complete the policy with proper scope, adherence, and risk sections
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
                    <li>Understand and apply the Gemara 7-layer model</li>
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
