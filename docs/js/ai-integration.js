// AI Integration Manager - Handles connection to gemara-mcp-server via Claude/Cursor
class AIIntegration {
    constructor() {
        this.connected = false;
        this.conversationHistory = [];
        this.currentExercise = null;
    }

    async connect() {
        // In a real implementation, this would establish connection to the MCP server
        // For this training platform, we provide instructions for manual setup

        const instructions = `
            <div class="ai-connection-guide">
                <h3>Connect Your AI Agent</h3>
                <p>To use AI assistance throughout this course, follow these steps:</p>

                <h4>Step 1: Ensure gemara-mcp-server is Running</h4>
                <div class="code-block">
                    <pre><code># If you haven't started it yet:
cd /path/to/gemara-mcp-server
./gemara-mcp-server

# Or using Docker:
docker run -p 8080:8080 complytime/gemara-mcp-server</code></pre>
                </div>

                <h4>Step 2: Open Claude Desktop or Cursor IDE</h4>
                <p>Make sure your Claude Desktop or Cursor IDE is configured to connect to the gemara-mcp-server.</p>

                <h4>Step 3: Test the Connection</h4>
                <p>In your AI agent, try this command:</p>
                <div class="code-block">
                    <pre><code>"List all available Gemara MCP tools"</code></pre>
                </div>

                <p>You should see tools like:</p>
                <ul>
                    <li>store_layer1_yaml</li>
                    <li>store_layer2_yaml</li>
                    <li>store_layer3_yaml</li>
                    <li>validate_gemara_yaml</li>
                </ul>

                <h4>Step 4: Keep Your AI Agent Open</h4>
                <p>Throughout the course, you'll be prompted to use specific AI commands for exercises. Keep your Claude/Cursor window open alongside this training interface.</p>

                <div class="ai-workflow-example">
                    <h4>Example Workflow</h4>
                    <p>When you reach an exercise, you'll see instructions like:</p>
                    <div class="exercise-prompt">
                        <strong>Exercise Prompt:</strong> "Ask your AI agent to query all Layer 2 controls related to access management"
                    </div>
                    <p>You would then switch to your Claude/Cursor window and paste that prompt.</p>
                </div>

                <div class="cta-section">
                    <button class="btn btn-primary" id="confirm-connection">I've Connected My AI Agent</button>
                    <button class="btn btn-secondary" id="troubleshoot">Troubleshooting Guide</button>
                </div>
            </div>
        `;

        window.app.showModal('Connect AI Agent', instructions, 'info', true);

        // Add event listeners for the modal buttons
        setTimeout(() => {
            document.getElementById('confirm-connection')?.addEventListener('click', () => {
                this.markAsConnected();
                document.querySelector('.modal-overlay')?.remove();
            });

            document.getElementById('troubleshoot')?.addEventListener('click', () => {
                this.showTroubleshooting();
            });
        }, 100);
    }

    markAsConnected() {
        this.connected = true;

        // Update UI
        const indicator = document.getElementById('ai-indicator');
        const statusText = document.getElementById('ai-status-text');
        const aiStatus = document.querySelector('.ai-status');

        if (indicator) {
            aiStatus.classList.add('connected');
            statusText.textContent = 'Connected';
        }

        // Change button text
        const connectBtn = document.getElementById('connect-ai-btn');
        if (connectBtn) {
            connectBtn.textContent = 'Open AI Panel';
            connectBtn.onclick = () => this.openPanel();
        }

        // Show success message
        window.app.showModal(
            'AI Agent Connected!',
            '<p>Great! You can now use AI assistance throughout the course. Click "Open AI Panel" in the sidebar anytime you need help.</p>',
            'success'
        );
    }

    showTroubleshooting() {
        const content = `
            <div class="troubleshooting-guide">
                <h3>Troubleshooting AI Connection</h3>

                <div class="trouble-section">
                    <h4>Issue: "gemara-mcp-server not found"</h4>
                    <p><strong>Solution:</strong></p>
                    <ol>
                        <li>Verify you've built the server: <code>go build ./cmd/gemara-mcp-server</code></li>
                        <li>Check the binary location: <code>ls -la ./gemara-mcp-server</code></li>
                        <li>Try running with full path: <code>./gemara-mcp-server</code></li>
                    </ol>
                </div>

                <div class="trouble-section">
                    <h4>Issue: "No MCP tools available"</h4>
                    <p><strong>Solution:</strong></p>
                    <ol>
                        <li>Check your Claude Desktop config file (usually at <code>~/.config/claude/config.json</code>)</li>
                        <li>Ensure the MCP server path is correct</li>
                        <li>Restart Claude Desktop after configuration changes</li>
                        <li>Check server logs for errors</li>
                    </ol>
                </div>

                <div class="trouble-section">
                    <h4>Issue: "Permission denied"</h4>
                    <p><strong>Solution:</strong></p>
                    <ol>
                        <li>Make the server executable: <code>chmod +x ./gemara-mcp-server</code></li>
                        <li>Check file permissions on artifacts directory</li>
                    </ol>
                </div>

                <div class="trouble-section">
                    <h4>Issue: Using Cursor IDE instead of Claude Desktop</h4>
                    <p><strong>Solution:</strong></p>
                    <ol>
                        <li>Open Cursor settings</li>
                        <li>Navigate to MCP configuration</li>
                        <li>Add gemara-mcp-server with the correct path</li>
                        <li>Reload Cursor window</li>
                    </ol>
                </div>

                <div class="trouble-section">
                    <h4>Still Having Issues?</h4>
                    <ul>
                        <li><a href="https://github.com/complytime/gemara-mcp-server/issues" target="_blank">Check GitHub Issues</a></li>
                        <li><a href="#" id="contact-support-link">Contact Course Support</a></li>
                        <li>Review the <a href="https://github.com/complytime/gemara-mcp-server/blob/main/CURSOR.md" target="_blank">CURSOR.md documentation</a></li>
                    </ul>
                </div>
            </div>
        `;

        window.app.showModal('Troubleshooting Guide', content, 'warning', true);
    }

    openPanel() {
        const panel = document.getElementById('ai-panel');
        if (panel) {
            panel.classList.add('open');
            this.initializeChat();
        }
    }

    closePanel() {
        const panel = document.getElementById('ai-panel');
        if (panel) {
            panel.classList.remove('open');
        }
    }

    initializeChat() {
        const messages = document.getElementById('ai-messages');
        if (!messages) return;

        if (this.conversationHistory.length === 0) {
            this.addMessage('assistant', `
                <p>Hello! I'm your AI assistant for the Gemara Policy Writing course.</p>
                <p>I can help you with:</p>
                <ul>
                    <li>Understanding Gemara concepts</li>
                    <li>Writing policy YAML</li>
                    <li>Validating your policies</li>
                    <li>Answering questions about exercises</li>
                </ul>
                <p><strong>Important:</strong> For hands-on exercises using the gemara-mcp-server, please use your Claude or Cursor IDE window directly, as those tools have access to the MCP server.</p>
                <p>How can I help you today?</p>
            `);
        }
    }

    sendMessage() {
        const input = document.getElementById('ai-input');
        if (!input || !input.value.trim()) return;

        const userMessage = input.value.trim();
        this.addMessage('user', userMessage);
        input.value = '';

        // Simulate AI response (in real implementation, this would call the AI)
        setTimeout(() => {
            this.handleAIResponse(userMessage);
        }, 1000);
    }

    addMessage(role, content) {
        const messages = document.getElementById('ai-messages');
        if (!messages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ai-message-${role}`;
        messageDiv.innerHTML = `
            <div class="message-avatar">${role === 'user' ? '👤' : '🤖'}</div>
            <div class="message-content">${content}</div>
        `;

        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;

        this.conversationHistory.push({ role, content });

        // Save to localStorage
        this.saveConversation();
    }

    handleAIResponse(userMessage) {
        // Simple rule-based responses for demonstration
        // In production, this would integrate with actual AI
        const lowerMessage = userMessage.toLowerCase();

        let response = '';

        if (lowerMessage.includes('layer 3') || lowerMessage.includes('policy')) {
            response = `
                <p>Layer 3 policies are organizational rules that tailor Layer 2 controls to your specific risk appetite. Key elements include:</p>
                <ul>
                    <li><strong>Policy Statement:</strong> Clear, directive language about what must be done</li>
                    <li><strong>Scope:</strong> Who and what the policy applies to</li>
                    <li><strong>Requirements:</strong> Specific, measurable obligations</li>
                    <li><strong>Exceptions:</strong> How to request and approve exceptions</li>
                </ul>
                <p>Would you like to see an example policy YAML?</p>
            `;
        } else if (lowerMessage.includes('yaml') || lowerMessage.includes('syntax')) {
            response = `
                <p>YAML (Yet Another Markup Language) is a human-readable data format. Key syntax rules:</p>
                <ul>
                    <li>Use spaces, not tabs, for indentation</li>
                    <li>Use 2 spaces per indentation level</li>
                    <li>Key-value pairs: <code>key: value</code></li>
                    <li>Lists use dashes: <code>- item</code></li>
                    <li>Multi-line text uses <code>></code> or <code>|</code></li>
                </ul>
                <p>For hands-on YAML validation, use the validate_gemara_yaml tool in your Claude/Cursor IDE.</p>
            `;
        } else if (lowerMessage.includes('mcp') || lowerMessage.includes('server')) {
            response = `
                <p>The gemara-mcp-server provides these tools for AI agents:</p>
                <ul>
                    <li><strong>store_layer3_yaml:</strong> Store a policy artifact</li>
                    <li><strong>validate_gemara_yaml:</strong> Validate YAML syntax and schema</li>
                    <li><strong>query_artifacts:</strong> Search stored artifacts</li>
                    <li><strong>check_applicability:</strong> Determine policy applicability</li>
                </ul>
                <p>Use these tools in your Claude or Cursor IDE window when working on exercises.</p>
            `;
        } else if (lowerMessage.includes('help') || lowerMessage.includes('stuck')) {
            response = `
                <p>I'm here to help! You can ask me about:</p>
                <ul>
                    <li>Gemara framework concepts (6 layers, YAML structure, etc.)</li>
                    <li>Policy writing best practices</li>
                    <li>Specific module content clarification</li>
                    <li>Exercise guidance</li>
                </ul>
                <p>What specific topic would you like help with?</p>
            `;
        } else {
            response = `
                <p>Thanks for your question! This is a demonstration AI panel. For full AI assistance including:</p>
                <ul>
                    <li>Querying Gemara artifacts</li>
                    <li>Generating policy YAML</li>
                    <li>Validating schemas</li>
                    <li>Complex policy authoring</li>
                </ul>
                <p>Please use your Claude or Cursor IDE window directly, as those tools have access to the gemara-mcp-server.</p>
                <p>I can still help answer general questions about the course content. What would you like to know?</p>
            `;
        }

        this.addMessage('assistant', response);
    }

    saveConversation() {
        try {
            localStorage.setItem('gemara-ai-conversation', JSON.stringify(this.conversationHistory));
        } catch (error) {
            console.error('Error saving conversation:', error);
        }
    }

    loadConversation() {
        try {
            const saved = localStorage.getItem('gemara-ai-conversation');
            if (saved) {
                this.conversationHistory = JSON.parse(saved);

                const messages = document.getElementById('ai-messages');
                if (messages) {
                    messages.innerHTML = '';
                    this.conversationHistory.forEach(msg => {
                        this.addMessage(msg.role, msg.content);
                    });
                }
            }
        } catch (error) {
            console.error('Error loading conversation:', error);
        }
    }

    // Exercise-specific AI prompts
    getExercisePrompt(exerciseNum) {
        const prompts = {
            1: {
                title: "Exercise 1: Query and Explore",
                instructions: `
                    <div class="exercise-prompt-box">
                        <h4>AI-Assisted Exercise</h4>
                        <p>Switch to your Claude or Cursor IDE window and try these prompts:</p>
                        <ol>
                            <li>
                                <strong>Query Layer 1 Guidance:</strong>
                                <div class="prompt-text">"List all available Layer 1 guidance documents in the gemara-mcp-server"</div>
                            </li>
                            <li>
                                <strong>Filter Layer 2 Controls:</strong>
                                <div class="prompt-text">"Show me Layer 2 controls related to access management"</div>
                            </li>
                            <li>
                                <strong>Generate Traceability Report:</strong>
                                <div class="prompt-text">"For control ctrl-iam-mfa-001, show me which Layer 1 guidance it derives from"</div>
                            </li>
                        </ol>
                        <p><strong>Deliverable:</strong> Take screenshots of your AI interactions and save the traceability information you gathered.</p>
                    </div>
                `
            },
            2: {
                title: "Exercise 2: Policy Analysis",
                instructions: `
                    <div class="exercise-prompt-box">
                        <h4>AI-Assisted Policy Analysis</h4>
                        <p>Use your AI agent to analyze policy examples:</p>
                        <ol>
                            <li>
                                <strong>Analyze Good Policy:</strong>
                                <div class="prompt-text">"Review the MFA policy example from Module 3. What makes it effective?"</div>
                            </li>
                            <li>
                                <strong>Identify Weaknesses:</strong>
                                <div class="prompt-text">"If this policy said 'Users should consider using MFA' instead of 'must use MFA', what would be the problem?"</div>
                            </li>
                            <li>
                                <strong>Suggest Improvements:</strong>
                                <div class="prompt-text">"How could we make the exception process in this policy more clear?"</div>
                            </li>
                        </ol>
                    </div>
                `
            },
            3: {
                title: "Exercise 3: Guided Policy Creation",
                instructions: `
                    <div class="exercise-prompt-box">
                        <h4>Create Your First Policy with AI</h4>
                        <ol>
                            <li>
                                <strong>Start with a Control:</strong>
                                <div class="prompt-text">"Query for Layer 2 control ctrl-iam-password-001"</div>
                            </li>
                            <li>
                                <strong>Draft Policy:</strong>
                                <div class="prompt-text">"Based on this control, create a Layer 3 password policy for a healthcare organization with 200 employees"</div>
                            </li>
                            <li>
                                <strong>Iterate:</strong>
                                <div class="prompt-text">"Make the password requirements more specific and add a section about password managers"</div>
                            </li>
                            <li>
                                <strong>Validate:</strong>
                                <div class="prompt-text">"Validate this policy YAML using the validate_gemara_yaml tool"</div>
                            </li>
                            <li>
                                <strong>Store:</strong>
                                <div class="prompt-text">"Store this policy as pol-iam-password-001"</div>
                            </li>
                        </ol>
                    </div>
                `
            }
            // Add more exercise prompts as needed
        };

        return prompts[exerciseNum] || null;
    }

    startExercise(exerciseNum) {
        const exercise = this.getExercisePrompt(exerciseNum);
        if (!exercise) {
            alert(`Exercise ${exerciseNum} prompts not yet available.`);
            return;
        }

        window.app.showModal(exercise.title, exercise.instructions, 'info', true);
    }
}

// Add AI message styles
const aiStyles = document.createElement('style');
aiStyles.textContent = `
    .ai-message {
        display: flex;
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-lg);
        animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .ai-message-user {
        flex-direction: row-reverse;
    }

    .message-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        flex-shrink: 0;
        background-color: var(--bg-color);
    }

    .message-content {
        flex: 1;
        background-color: var(--bg-color);
        padding: var(--spacing-md);
        border-radius: var(--radius-md);
        line-height: 1.6;
    }

    .ai-message-user .message-content {
        background-color: var(--primary-light);
        color: white;
    }

    .message-content code {
        background-color: rgba(0, 0, 0, 0.1);
        padding: 2px 6px;
        border-radius: 3px;
        font-family: var(--font-mono);
        font-size: 0.9em;
    }

    .message-content ul, .message-content ol {
        margin: var(--spacing-sm) 0;
        padding-left: var(--spacing-lg);
    }

    .message-content li {
        margin-bottom: var(--spacing-xs);
    }

    .exercise-prompt-box {
        background-color: var(--bg-color);
        padding: var(--spacing-lg);
        border-radius: var(--radius-md);
        border-left: 4px solid var(--accent-color);
    }

    .prompt-text {
        background-color: #1e1e1e;
        color: #d4d4d4;
        padding: var(--spacing-md);
        border-radius: var(--radius-sm);
        font-family: var(--font-mono);
        margin: var(--spacing-sm) 0;
        font-size: 0.9rem;
    }

    .ai-connection-guide .code-block {
        background-color: #1e1e1e;
        color: #d4d4d4;
        padding: var(--spacing-md);
        border-radius: var(--radius-md);
        margin: var(--spacing-md) 0;
        overflow-x: auto;
    }

    .ai-workflow-example {
        background-color: rgba(37, 99, 235, 0.1);
        padding: var(--spacing-lg);
        border-radius: var(--radius-md);
        margin: var(--spacing-lg) 0;
    }

    .trouble-section {
        margin-bottom: var(--spacing-xl);
        padding-bottom: var(--spacing-lg);
        border-bottom: 1px solid var(--border-color);
    }

    .trouble-section:last-child {
        border-bottom: none;
    }
`;
document.head.appendChild(aiStyles);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.aiIntegration = new AIIntegration();

    // Make startExercise available globally
    window.app = window.app || {};
    window.app.startExercise = (num) => {
        window.aiIntegration.startExercise(num);
    };
});
