// Main Application Controller
class GemaraTrainingApp {
    constructor() {
        this.currentModule = null;
        this.currentScreen = 'welcome';
        this.init();
    }

    init() {
        // Initialize event listeners
        this.setupEventListeners();

        // Load saved progress
        this.loadProgress();

        // Show welcome screen
        this.showScreen('welcome-screen');
    }

    setupEventListeners() {
        // Start course button
        document.getElementById('start-course-btn')?.addEventListener('click', () => {
            this.startCourse();
        });

        // Setup guide button
        document.getElementById('setup-guide-btn')?.addEventListener('click', () => {
            this.showSetupGuide();
        });

        // Module navigation
        document.querySelectorAll('.module-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const moduleNum = parseInt(e.currentTarget.dataset.module);
                this.loadModule(moduleNum);
            });
        });

        // Quick links
        document.getElementById('show-outline')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showCourseOutline();
        });

        document.getElementById('show-resources')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showResources();
        });

        document.getElementById('show-help')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showHelp();
        });

        document.getElementById('show-certificate')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showCertificate();
        });

        // AI Panel controls
        document.getElementById('connect-ai-btn')?.addEventListener('click', () => {
            window.aiIntegration.connect();
        });

        document.getElementById('close-ai-panel')?.addEventListener('click', () => {
            window.aiIntegration.closePanel();
        });

        document.getElementById('send-ai-btn')?.addEventListener('click', () => {
            window.aiIntegration.sendMessage();
        });

        document.getElementById('ai-input')?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                window.aiIntegration.sendMessage();
            }
        });
    }

    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show selected screen
        const screen = document.getElementById(screenId);
        if (screen) {
            screen.classList.add('active');
            this.currentScreen = screenId;
        }
    }

    startCourse() {
        // Check prerequisites
        const prereqs = [
            document.getElementById('prereq-1'),
            document.getElementById('prereq-2'),
            document.getElementById('prereq-3'),
            document.getElementById('prereq-4')
        ];

        const allChecked = prereqs.every(checkbox => checkbox?.checked);

        if (!allChecked) {
            this.showModal(
                'Prerequisites Required',
                'Please review and check all prerequisites before starting the course. If you need help with setup, click the "Setup Guide" button.',
                'warning'
            );
            return;
        }

        // Load first module
        this.loadModule(1);
    }

    loadModule(moduleNum) {
        // Update active module in sidebar
        document.querySelectorAll('.module-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`.module-item[data-module="${moduleNum}"]`)?.classList.add('active');

        // Load module content
        this.currentModule = moduleNum;
        window.moduleManager.loadModule(moduleNum);
        this.showScreen('module-container');

        // Mark module as in progress
        window.progressTracker.updateModuleStatus(moduleNum, 'in-progress');
    }

    showSetupGuide() {
        const content = `
            <div class="setup-guide">
                <h2>Setup Guide</h2>
                <h3>Prerequisites Installation</h3>

                <div class="setup-section">
                    <h4>1. Install gemara-mcp-server</h4>
                    <p>The gemara-mcp-server provides AI assistance throughout the course.</p>

                    <h5>Option A: Using Go (Recommended)</h5>
                    <div class="code-block">
                        <pre><code>git clone https://github.com/complytime/gemara-mcp-server.git
cd gemara-mcp-server
go build ./cmd/gemara-mcp-server
./gemara-mcp-server</code></pre>
                    </div>

                    <h5>Option B: Using Docker/Podman</h5>
                    <div class="code-block">
                        <pre><code>docker pull complytime/gemara-mcp-server
docker run -p 8080:8080 complytime/gemara-mcp-server</code></pre>
                    </div>
                </div>

                <div class="setup-section">
                    <h4>2. Configure Claude or Cursor IDE</h4>
                    <p>You'll need either Claude Desktop or Cursor IDE to interact with the MCP server.</p>

                    <h5>Claude Desktop Configuration</h5>
                    <p>Add to your Claude Desktop configuration file:</p>
                    <div class="code-block">
                        <pre><code>{
  "mcpServers": {
    "gemara": {
      "command": "/path/to/gemara-mcp-server"
    }
  }
}</code></pre>
                    </div>

                    <h5>Cursor IDE Configuration</h5>
                    <p>Add the MCP server to your Cursor settings via the MCP configuration panel.</p>
                </div>

                <div class="setup-section">
                    <h4>3. Verify Setup</h4>
                    <p>Test your setup by asking Claude or Cursor:</p>
                    <div class="code-block">
                        <pre><code>"Can you list the available Gemara MCP tools?"</code></pre>
                    </div>
                    <p>You should see tools like store_layer1_yaml, store_layer3_yaml, etc.</p>
                </div>

                <div class="setup-section">
                    <h4>Need Help?</h4>
                    <ul>
                        <li><a href="https://github.com/complytime/gemara-mcp-server" target="_blank">gemara-mcp-server Documentation</a></li>
                        <li><a href="https://github.com/ossf/gemara" target="_blank">Gemara Framework Documentation</a></li>
                        <li><a href="#" id="contact-support">Contact Support</a></li>
                    </ul>
                </div>

                <div class="cta-section">
                    <button class="btn btn-primary" id="close-setup-guide">Got It!</button>
                </div>
            </div>
        `;

        this.showModal('Setup Guide', content, 'info', true);
    }

    showCourseOutline() {
        window.open('../../docs/course-outline.md', '_blank');
    }

    showResources() {
        const content = `
            <div class="resources-page">
                <h2>Course Resources</h2>

                <div class="resource-section">
                    <h3>Official Documentation</h3>
                    <ul>
                        <li><a href="https://github.com/ossf/gemara" target="_blank">Gemara Framework Repository</a></li>
                        <li><a href="https://github.com/complytime/gemara-mcp-server" target="_blank">gemara-mcp-server Repository</a></li>
                    </ul>
                </div>

                <div class="resource-section">
                    <h3>Compliance Frameworks</h3>
                    <ul>
                        <li><a href="https://www.nist.gov/cyberframework" target="_blank">NIST Cybersecurity Framework</a></li>
                        <li><a href="https://www.iso.org/isoiec-27001-information-security.html" target="_blank">ISO 27001</a></li>
                        <li><a href="https://www.cisecurity.org/controls" target="_blank">CIS Controls</a></li>
                    </ul>
                </div>

                <div class="resource-section">
                    <h3>YAML Resources</h3>
                    <ul>
                        <li><a href="https://yaml.org/" target="_blank">YAML Official Website</a></li>
                        <li><a href="https://learnxinyminutes.com/docs/yaml/" target="_blank">Learn YAML in Y Minutes</a></li>
                    </ul>
                </div>

                <div class="resource-section">
                    <h3>Policy Writing Guides</h3>
                    <ul>
                        <li><a href="#" class="internal-link">Layer 3 Policy Templates</a></li>
                        <li><a href="#" class="internal-link">Policy Writing Best Practices</a></li>
                        <li><a href="#" class="internal-link">Example Policy Library</a></li>
                    </ul>
                </div>
            </div>
        `;

        this.showModal('Resources', content, 'info', true);
    }

    showHelp() {
        const content = `
            <div class="help-page">
                <h2>Help & Support</h2>

                <div class="help-section">
                    <h3>Getting Started</h3>
                    <p>If you're new to the course, we recommend:</p>
                    <ol>
                        <li>Complete the setup guide to install all prerequisites</li>
                        <li>Start with Module 1 to understand the Gemara framework</li>
                        <li>Connect your AI agent before beginning hands-on exercises</li>
                        <li>Take quizzes at your own pace</li>
                    </ol>
                </div>

                <div class="help-section">
                    <h3>Using the AI Assistant</h3>
                    <p>The AI assistant is available throughout the course to help you:</p>
                    <ul>
                        <li>Understand complex concepts</li>
                        <li>Write and refine policies</li>
                        <li>Validate your YAML syntax</li>
                        <li>Get hints on exercises</li>
                    </ul>
                    <p>Click "Connect AI Agent" in the sidebar to get started.</p>
                </div>

                <div class="help-section">
                    <h3>Troubleshooting</h3>
                    <h4>AI Connection Issues</h4>
                    <p>If you can't connect to the AI assistant:</p>
                    <ul>
                        <li>Verify gemara-mcp-server is running</li>
                        <li>Check your Claude/Cursor IDE configuration</li>
                        <li>Restart your IDE and try again</li>
                    </ul>

                    <h4>Progress Not Saving</h4>
                    <p>Your progress is saved in browser localStorage. If it's not persisting:</p>
                    <ul>
                        <li>Check browser privacy settings</li>
                        <li>Ensure cookies/storage is enabled for this site</li>
                        <li>Try a different browser</li>
                    </ul>
                </div>

                <div class="help-section">
                    <h3>Contact Support</h3>
                    <p>Still need help? Reach out to us:</p>
                    <ul>
                        <li>Email: support@gemara-training.example.com</li>
                        <li>GitHub Issues: <a href="https://github.com/ossf/gemara/issues" target="_blank">Report an issue</a></li>
                    </ul>
                </div>
            </div>
        `;

        this.showModal('Help & Support', content, 'info', true);
    }

    showCertificate() {
        const progress = window.progressTracker.getOverallProgress();

        if (progress < 100) {
            this.showModal(
                'Certificate Not Yet Available',
                `You're ${progress}% complete! Finish all modules and assessments to earn your certificate.`,
                'warning'
            );
            return;
        }

        const content = `
            <div class="certificate-page">
                <div class="certificate">
                    <h2>Certificate of Completion</h2>
                    <div class="certificate-body">
                        <p class="certificate-text">This certifies that</p>
                        <h3 class="certificate-name">Professional User</h3>
                        <p class="certificate-text">has successfully completed</p>
                        <h4 class="certificate-course">Gemara Policy Writing Training</h4>
                        <p class="certificate-subtitle">Interactive AI-Assisted Course for Compliance Professionals</p>
                        <p class="certificate-date">Completed on ${new Date().toLocaleDateString()}</p>
                    </div>
                    <div class="certificate-footer">
                        <p>Skills Demonstrated:</p>
                        <ul>
                            <li>Gemara Framework Mastery</li>
                            <li>Layer 3 Policy Authoring</li>
                            <li>AI-Assisted Policy Development</li>
                            <li>Compliance Framework Application</li>
                        </ul>
                    </div>
                </div>
                <div class="cta-section mt-lg">
                    <button class="btn btn-primary" id="download-certificate">Download Certificate</button>
                    <button class="btn btn-secondary" id="share-certificate">Share</button>
                </div>
            </div>
        `;

        this.showModal('Your Certificate', content, 'success', true);
    }

    showModal(title, content, type = 'info', large = false) {
        // Remove existing modal if any
        const existingModal = document.querySelector('.modal-overlay');
        if (existingModal) {
            existingModal.remove();
        }

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal ${large ? 'modal-large' : ''} modal-${type}">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="close-btn modal-close">×</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add event listeners
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Handle dynamic buttons
        setTimeout(() => {
            modal.querySelector('#close-setup-guide')?.addEventListener('click', () => {
                modal.remove();
            });
        }, 100);
    }

    loadProgress() {
        try {
            const saved = localStorage.getItem('gemara-training-progress');
            if (saved) {
                const progress = JSON.parse(saved);
                window.progressTracker.restoreProgress(progress);
            }
        } catch (error) {
            console.error('Error loading progress:', error);
        }
    }

    saveProgress() {
        try {
            const progress = window.progressTracker.getProgress();
            localStorage.setItem('gemara-training-progress', JSON.stringify(progress));
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    }
}

// Add modal styles dynamically
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: fadeIn 0.2s;
    }

    .modal {
        background-color: white;
        border-radius: var(--radius-lg);
        max-width: 600px;
        max-height: 80vh;
        overflow: hidden;
        box-shadow: var(--shadow-xl);
        animation: slideUp 0.3s;
    }

    .modal-large {
        max-width: 900px;
    }

    .modal-header {
        padding: var(--spacing-lg);
        border-bottom: 1px solid var(--border-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .modal-body {
        padding: var(--spacing-lg);
        overflow-y: auto;
        max-height: calc(80vh - 80px);
    }

    .code-block {
        background-color: #1e1e1e;
        color: #d4d4d4;
        padding: var(--spacing-md);
        border-radius: var(--radius-md);
        margin: var(--spacing-md) 0;
        overflow-x: auto;
    }

    .code-block pre {
        margin: 0;
        font-family: var(--font-mono);
        font-size: 0.875rem;
    }

    .setup-section, .resource-section, .help-section {
        margin-bottom: var(--spacing-xl);
    }

    .certificate {
        border: 2px solid var(--primary-color);
        padding: var(--spacing-2xl);
        text-align: center;
        background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    }

    .certificate-body {
        margin: var(--spacing-xl) 0;
    }

    .certificate-name {
        font-size: 2rem;
        color: var(--primary-color);
        margin: var(--spacing-md) 0;
    }

    .certificate-course {
        font-size: 1.5rem;
        margin: var(--spacing-md) 0;
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(modalStyles);

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new GemaraTrainingApp();
});
