// Quiz Manager
class QuizManager {
    constructor() {
        this.quizzes = this.initializeQuizzes();
        this.currentQuiz = null;
        this.currentQuestion = 0;
        this.answers = [];
        this.score = 0;
    }

    initializeQuizzes() {
        return {
            'module1-quiz': {
                title: "Module 1: Understanding Gemara Framework",
                passingScore: 80,
                questions: [
                    {
                        question: "What does Gemara stand for?",
                        options: [
                            "GRC Engineering Model for Automated Risk Assessment",
                            "General Risk and Compliance Management Architecture",
                            "Governance Enterprise Model for Application Risk Analysis",
                            "Global Risk Control and Management Assessment"
                        ],
                        correct: 0,
                        explanation: "Gemara stands for GRC Engineering Model for Automated Risk Assessment."
                    },
                    {
                        question: "Which layer represents organizational policies tailored to risk appetite?",
                        options: ["Layer 1", "Layer 2", "Layer 3", "Layer 4"],
                        correct: 2,
                        explanation: "Layer 3 (Risk & Policy) contains organizational policies that are tailored to the organization's specific risk appetite and operational context."
                    },
                    {
                        question: "What format does Gemara use for machine-readable artifacts?",
                        options: ["JSON", "XML", "YAML", "TOML"],
                        correct: 2,
                        explanation: "Gemara uses YAML (Yet Another Markup Language) for all its machine-readable artifacts."
                    },
                    {
                        question: "Which layer contains foundational knowledge and regulations from frameworks like NIST and ISO 27001?",
                        options: ["Layer 1: Vectors & Guidance", "Layer 2: Threats & Controls", "Layer 3: Risk & Policy", "Layer 7: Audit & Continuous Monitoring"],
                        correct: 0,
                        explanation: "Layer 1 (Vectors & Guidance) contains foundational knowledge and regulations from standards bodies like NIST and ISO."
                    },
                    {
                        question: "What is the primary benefit of using a machine-readable format for GRC?",
                        options: [
                            "It looks more professional",
                            "It enables automated validation and integration with development workflows",
                            "It's required by all compliance frameworks",
                            "It reduces file size"
                        ],
                        correct: 1,
                        explanation: "Machine-readable formats enable automated validation, programmatic querying, and integration with development tools and workflows."
                    },
                    {
                        question: "How are the seven Gemara layers organized?",
                        options: [
                            "Definition Layers (1-3), Sensitive Activities (4), Measurement Layers (5-7)",
                            "All layers are equal with no grouping",
                            "Input Layers (1-4), Output Layers (5-7)",
                            "Planning Layers (1-2), Execution Layers (3-5), Review Layers (6-7)"
                        ],
                        correct: 0,
                        explanation: "Gemara organizes the seven layers into three groups: Definition Layers (1-3) inform execution, Sensitive Activities (4) are actions that might introduce risk, and Measurement Layers (5-7) inform next steps."
                    },
                    {
                        question: "What does Layer 4 (Sensitive Activities) represent?",
                        options: [
                            "Industry best practices and guidance",
                            "Actions that might introduce risk, such as code commits or configuration changes",
                            "Automated compliance scanning",
                            "Policy writing and documentation"
                        ],
                        correct: 1,
                        explanation: "Layer 4 (Sensitive Activities) represents actions that might introduce risk, such as code commits, configuration changes, or deployment activities."
                    },
                    {
                        question: "Who is the primary audience for Layer 3 policies?",
                        options: [
                            "Only security engineers",
                            "Only compliance auditors",
                            "All employees and stakeholders affected by the policy",
                            "Only executive management"
                        ],
                        correct: 2,
                        explanation: "Layer 3 policies are written for all employees and stakeholders affected by them, which is why they must be clear and understandable."
                    },
                    {
                        question: "What is the primary purpose of Layer 5 (Intent & Behavior Evaluation)?",
                        options: [
                            "To audit the entire compliance program",
                            "To write new policies",
                            "To inspect sensitive activities and assess compliance with policies",
                            "To provide industry guidance"
                        ],
                        correct: 2,
                        explanation: "Layer 5 (Intent & Behavior Evaluation) inspects sensitive activities to assess whether they comply with policies defined in Layer 3."
                    },
                    {
                        question: "What problem does Gemara primarily solve?",
                        options: [
                            "Expensive cloud hosting costs",
                            "Manual rework and disconnected tools in GRC processes",
                            "Slow application performance",
                            "Lack of cybersecurity professionals"
                        ],
                        correct: 1,
                        explanation: "Gemara solves the problem of significant manual effort, rework, and disconnected tools in traditional GRC processes by providing a standardized, machine-readable framework."
                    }
                ]
            },
            'module2-quiz': {
                title: "Module 2: Layer 1 & Layer 2 Foundations",
                passingScore: 80,
                questions: [
                    {
                        question: "Which of the following is NOT a common Layer 1 guidance framework?",
                        options: ["NIST CSF", "ISO 27001", "CIS Controls", "Kubernetes"],
                        correct: 3,
                        explanation: "Kubernetes is a container orchestration platform, not a compliance guidance framework."
                    },
                    {
                        question: "What makes a Layer 2 control 'threat-informed'?",
                        options: [
                            "It's based on theoretical best practices",
                            "It's designed based on real-world attack patterns and security research",
                            "It's approved by management",
                            "It's implemented in cloud environments"
                        ],
                        correct: 1,
                        explanation: "Threat-informed controls are designed based on real-world attack patterns and security research, addressing actual threats organizations face."
                    },
                    {
                        question: "How many Layer 2 controls typically derive from a single Layer 1 guidance item?",
                        options: [
                            "Exactly one",
                            "Always two",
                            "Multiple controls can derive from one guidance item",
                            "It must be a one-to-one mapping"
                        ],
                        correct: 2,
                        explanation: "One piece of Layer 1 guidance typically maps to multiple Layer 2 controls, as guidance is high-level while controls are specific and technology-focused."
                    },
                    {
                        question: "What field in a Layer 2 control artifact shows which Layer 1 guidance it comes from?",
                        options: ["source_control", "derived_from", "parent_layer", "guidance_link"],
                        correct: 1,
                        explanation: "The 'derived_from' field in Layer 2 artifacts contains references to the Layer 1 guidance items that inform the control."
                    },
                    {
                        question: "Which YAML field typically contains MITRE ATT&CK technique mappings in Layer 2 controls?",
                        options: ["security_mappings", "threat_context", "attack_vectors", "mitre_references"],
                        correct: 1,
                        explanation: "The 'threat_context' field contains information about threats mitigated and MITRE ATT&CK technique mappings."
                    },
                    {
                        question: "What is the purpose of the 'applicability' field in controls and policies?",
                        options: [
                            "To specify which programming languages are supported",
                            "To determine which systems, users, or contexts the control applies to",
                            "To indicate the control's priority level",
                            "To show who wrote the control"
                        ],
                        correct: 1,
                        explanation: "The 'applicability' field specifies which systems, users, or contexts the control applies to, helping determine scope."
                    },
                    {
                        question: "ISO 27001 contains how many controls across how many domains?",
                        options: [
                            "18 controls across 5 domains",
                            "50 controls across 10 domains",
                            "114 controls across 14 domains",
                            "200 controls across 20 domains"
                        ],
                        correct: 2,
                        explanation: "ISO 27001 contains 114 controls organized across 14 security domains."
                    },
                    {
                        question: "In the example multi-factor authentication control, which attack technique is mitigated?",
                        options: [
                            "SQL Injection",
                            "Cross-Site Scripting",
                            "Valid Accounts (T1078)",
                            "Buffer Overflow"
                        ],
                        correct: 2,
                        explanation: "The MFA control mitigates MITRE ATT&CK technique T1078 (Valid Accounts) by requiring additional authentication factors."
                    }
                ]
            },
            'module3-quiz': {
                title: "Module 3: Policy Writing Fundamentals",
                passingScore: 80,
                questions: [
                    {
                        question: "What is the key difference between a policy and a procedure?",
                        options: [
                            "A policy is step-by-step instructions, a procedure is high-level intent",
                            "A policy is high-level statement of intent, a procedure is step-by-step how-to",
                            "They are the same thing with different names",
                            "A policy is for management, a procedure is for technical staff"
                        ],
                        correct: 1,
                        explanation: "A policy states high-level intent (what must be done), while a procedure provides step-by-step instructions (how to do it)."
                    },
                    {
                        question: "Which language should you use in policy statements?",
                        options: [
                            "Suggestive: 'should', 'may', 'consider'",
                            "Directive: 'must', 'will', 'shall'",
                            "Optional: 'could', 'might', 'possibly'",
                            "Technical: using complex jargon"
                        ],
                        correct: 1,
                        explanation: "Policy statements should use directive language like 'must', 'will', or 'shall' to make requirements clear and enforceable."
                    },
                    {
                        question: "What is a characteristic of an effective policy?",
                        options: [
                            "It includes detailed implementation steps",
                            "It is enforceable with specific, measurable requirements",
                            "It uses technical jargon to sound authoritative",
                            "It never allows exceptions"
                        ],
                        correct: 1,
                        explanation: "Effective policies are enforceable, meaning they contain specific requirements that can be objectively verified and measured."
                    },
                    {
                        question: "Where should detailed technical implementation steps go?",
                        options: [
                            "In the policy document",
                            "In a separate procedure or standard document",
                            "In the Layer 2 control",
                            "They should not be documented"
                        ],
                        correct: 1,
                        explanation: "Detailed technical implementation steps belong in procedures or standards, not in the high-level policy document."
                    },
                    {
                        question: "What should the 'derived_from_controls' field contain in a Layer 3 policy?",
                        options: [
                            "The names of people who wrote the controls",
                            "References to Layer 2 control IDs that the policy implements",
                            "A list of all possible controls",
                            "The policy's approval date"
                        ],
                        correct: 1,
                        explanation: "The 'derived_from_controls' field contains references to the Layer 2 control IDs that inform and are implemented by the policy."
                    },
                    {
                        question: "Why is it important to include a 'risk_context' section in policies?",
                        options: [
                            "It's required by all compliance frameworks",
                            "It helps stakeholders understand the 'why' behind the policy",
                            "It makes the policy longer and more impressive",
                            "It's only needed for technical policies"
                        ],
                        correct: 1,
                        explanation: "The risk context section explains the reasoning behind the policy, helping stakeholders understand why it's necessary and gaining buy-in."
                    },
                    {
                        question: "What is the purpose of documenting 'compensating_controls' in exception management?",
                        options: [
                            "To completely replace the original requirement",
                            "To provide alternative security measures when the primary control can't be implemented",
                            "To eliminate the need for the policy",
                            "To punish those who request exceptions"
                        ],
                        correct: 1,
                        explanation: "Compensating controls provide alternative security measures that achieve similar risk reduction when the primary control cannot be implemented."
                    },
                    {
                        question: "How often should policies typically be reviewed?",
                        options: [
                            "Never, once written they are permanent",
                            "Daily",
                            "Annually or when triggered by significant changes",
                            "Every 10 years"
                        ],
                        correct: 2,
                        explanation: "Policies should be reviewed at least annually, or more frequently when triggered by changes in business, technology, regulations, or threat landscape."
                    },
                    {
                        question: "What should a policy's 'scope' section define?",
                        options: [
                            "The programming languages used",
                            "Who/what the policy applies to (users, systems, data)",
                            "The policy's page count",
                            "The physical location of servers"
                        ],
                        correct: 1,
                        explanation: "The scope section defines who the policy applies to (employees, contractors, etc.) and what it covers (systems, data types, locations)."
                    },
                    {
                        question: "Why should policies avoid being too technical?",
                        options: [
                            "Technical details belong in implementation procedures, and policies need to be understandable by a broader audience",
                            "Technical details are never important",
                            "All policies are only for non-technical staff",
                            "Technical language makes policies invalid"
                        ],
                        correct: 0,
                        explanation: "Policies should be understandable by all affected stakeholders, not just technical staff. Technical implementation details belong in procedures and standards."
                    },
                    {
                        question: "What is the benefit of including 'compliance_mappings' in a Layer 3 policy?",
                        options: [
                            "It makes the policy longer",
                            "It shows which compliance frameworks (SOC 2, ISO 27001, etc.) the policy helps satisfy",
                            "It's required by law",
                            "It replaces the need for audits"
                        ],
                        correct: 1,
                        explanation: "Compliance mappings show which requirements from various frameworks (SOC 2, ISO 27001, PCI-DSS, etc.) the policy helps satisfy, aiding in compliance reporting."
                    },
                    {
                        question: "When writing a policy for a specific risk appetite, what should you consider?",
                        options: [
                            "Always choose the strictest possible requirements regardless of business impact",
                            "Balance security requirements with business needs and operational realities",
                            "Ignore business concerns entirely",
                            "Only consider what's easiest to implement"
                        ],
                        correct: 1,
                        explanation: "Effective policies balance security requirements with business needs, operational realities, and the organization's specific risk appetite."
                    }
                ]
            },
            'final-exam': {
                title: "Final Comprehensive Exam",
                passingScore: 80,
                questions: [
                    {
                        question: "In the Gemara model, what is the relationship between Layer 1, 2, and 3?",
                        options: [
                            "They are independent and unrelated",
                            "Layer 1 guidance informs Layer 2 controls, which inform Layer 3 policies",
                            "Layer 3 policies inform Layer 2 controls, which inform Layer 1 guidance",
                            "They all contain the same information in different formats"
                        ],
                        correct: 1,
                        explanation: "The layers build upon each other: Layer 1 provides industry guidance, Layer 2 translates that into specific controls, and Layer 3 tailors controls into organizational policies."
                    },
                    // Add more comprehensive exam questions here
                ]
            }
        };
    }

    startQuiz(quizId, moduleNum) {
        const quiz = this.quizzes[quizId];
        if (!quiz) {
            console.error(`Quiz ${quizId} not found`);
            return;
        }

        this.currentQuiz = quizId;
        this.currentQuestion = 0;
        this.answers = [];
        this.score = 0;

        window.app.showScreen('quiz-container');
        this.renderQuestion();
    }

    renderQuestion() {
        const quiz = this.quizzes[this.currentQuiz];
        const question = quiz.questions[this.currentQuestion];
        const container = document.getElementById('quiz-container');

        const progressPercent = ((this.currentQuestion / quiz.questions.length) * 100).toFixed(0);

        container.innerHTML = `
            <div class="quiz-content">
                <div class="quiz-header">
                    <h2>${quiz.title}</h2>
                    <div class="quiz-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progressPercent}%"></div>
                        </div>
                        <span class="progress-text">Question ${this.currentQuestion + 1} of ${quiz.questions.length}</span>
                    </div>
                </div>

                <div class="quiz-question">
                    <div class="question-number">Question ${this.currentQuestion + 1}</div>
                    <div class="question-text">${question.question}</div>

                    <ul class="quiz-options">
                        ${question.options.map((option, index) => `
                            <li class="quiz-option" data-index="${index}">
                                <input type="radio" name="answer" id="option-${index}" value="${index}">
                                <label for="option-${index}">${option}</label>
                            </li>
                        `).join('')}
                    </ul>

                    <div class="quiz-actions">
                        <button class="btn btn-primary" id="submit-answer" disabled>Submit Answer</button>
                    </div>

                    <div class="quiz-feedback hidden" id="quiz-feedback"></div>
                </div>
            </div>
        `;

        // Add event listeners
        this.setupQuizListeners();
    }

    setupQuizListeners() {
        const options = document.querySelectorAll('.quiz-option');
        const submitBtn = document.getElementById('submit-answer');

        options.forEach(option => {
            option.addEventListener('click', () => {
                // Remove selection from others
                options.forEach(opt => opt.classList.remove('selected'));

                // Select this one
                option.classList.add('selected');
                const radio = option.querySelector('input[type="radio"]');
                radio.checked = true;

                // Enable submit button
                submitBtn.disabled = false;
            });
        });

        submitBtn.addEventListener('click', () => {
            this.submitAnswer();
        });
    }

    submitAnswer() {
        const selected = document.querySelector('.quiz-option.selected');
        if (!selected) return;

        const selectedIndex = parseInt(selected.dataset.index);
        const quiz = this.quizzes[this.currentQuiz];
        const question = quiz.questions[this.currentQuestion];
        const isCorrect = selectedIndex === question.correct;

        this.answers.push({
            questionIndex: this.currentQuestion,
            selectedAnswer: selectedIndex,
            correct: isCorrect
        });

        if (isCorrect) {
            this.score++;
        }

        // Show feedback
        this.showFeedback(isCorrect, question);
    }

    showFeedback(isCorrect, question) {
        const feedback = document.getElementById('quiz-feedback');
        const options = document.querySelectorAll('.quiz-option');

        // Mark correct/incorrect
        options.forEach((option, index) => {
            if (index === question.correct) {
                option.classList.add('correct');
            } else if (option.classList.contains('selected') && !isCorrect) {
                option.classList.add('incorrect');
            }
            // Disable further selection
            option.style.pointerEvents = 'none';
        });

        feedback.className = `quiz-feedback info-box ${isCorrect ? 'success' : 'danger'}`;
        feedback.innerHTML = `
            <h4>${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</h4>
            <p>${question.explanation}</p>
            <button class="btn btn-primary" id="next-question">
                ${this.currentQuestion < this.quizzes[this.currentQuiz].questions.length - 1 ? 'Next Question' : 'See Results'}
            </button>
        `;

        document.getElementById('next-question').addEventListener('click', () => {
            this.nextQuestion();
        });

        document.getElementById('submit-answer').style.display = 'none';
    }

    nextQuestion() {
        this.currentQuestion++;

        if (this.currentQuestion >= this.quizzes[this.currentQuiz].questions.length) {
            this.showResults();
        } else {
            this.renderQuestion();
        }
    }

    showResults() {
        const quiz = this.quizzes[this.currentQuiz];
        const percentage = ((this.score / quiz.questions.length) * 100).toFixed(0);
        const passed = percentage >= quiz.passingScore;

        // Send quiz results to Google Sheets
        if (window.googleSheetsIntegration) {
            const quizData = window.googleSheetsIntegration.prepareQuizData(
                this.currentQuiz,
                quiz,
                this.answers,
                this.score,
                percentage,
                passed
            );
            window.googleSheetsIntegration.sendQuizResults(quizData);
        }

        const container = document.getElementById('quiz-container');

        container.innerHTML = `
            <div class="quiz-score">
                <h2>Quiz Results</h2>
                <div class="score-number ${passed ? 'pass' : 'fail'}">${percentage}%</div>
                <p class="score-text">You answered ${this.score} out of ${quiz.questions.length} questions correctly.</p>

                <div class="score-status info-box ${passed ? 'success' : 'danger'}">
                    <h4>${passed ? '✓ Passed!' : '✗ Did Not Pass'}</h4>
                    <p>${passed ?
                        `Congratulations! You've passed with ${percentage}%. You can now continue to the next module.` :
                        `You need ${quiz.passingScore}% to pass. Review the module content and try again.`
                    }</p>
                </div>

                <div class="quiz-actions">
                    ${passed ?
                        '<button class="btn btn-primary" id="continue-course">Continue to Next Module</button>' :
                        '<button class="btn btn-primary" id="retake-quiz">Retake Quiz</button>'
                    }
                    <button class="btn btn-secondary" id="review-answers">Review Answers</button>
                </div>
            </div>
        `;

        // Add event listeners
        document.getElementById('continue-course')?.addEventListener('click', () => {
            // Find current module number and go to next
            const moduleNum = parseInt(this.currentQuiz.replace('module', '').replace('-quiz', ''));
            window.progressTracker.completeModule(moduleNum);
            window.app.loadModule(moduleNum + 1);
        });

        document.getElementById('retake-quiz')?.addEventListener('click', () => {
            this.startQuiz(this.currentQuiz);
        });

        document.getElementById('review-answers')?.addEventListener('click', () => {
            this.reviewAnswers();
        });
    }

    reviewAnswers() {
        // Implementation for reviewing quiz answers
        alert('Answer review feature coming soon!');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.quizManager = new QuizManager();
});
