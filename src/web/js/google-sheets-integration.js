// Google Sheets Integration for Quiz Responses
class GoogleSheetsIntegration {
    constructor() {
        // Set this to your Google Apps Script web app URL after deployment
        this.scriptUrl = 'REPLACE_WITH_YOUR_GOOGLE_APPS_SCRIPT_URL';
        this.enabled = true; // Will be enabled once scriptUrl is set
    }

    /**
     * Send quiz results to Google Sheets
     * @param {Object} quizData - The quiz data to send
     */
    async sendQuizResults(quizData) {
        // Skip if not configured
        if (!this.enabled || this.scriptUrl === 'https://script.google.com/a/macros/redhat.com/s/AKfycbwCKLSAtVOYuLE4Q5Ve4hrJ0BvsqNB2Jq_iMnYO6wpjq0qEvBywL9OOcDQqTroojpj9/exec') {
            console.log('Google Sheets integration not configured. Quiz data:', quizData);
            return;
        }

        try {
            const response = await fetch(this.scriptUrl, {
                method: 'POST',
                mode: 'no-cors', // Required for Google Apps Script
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(quizData)
            });

            console.log('Quiz results sent to Google Sheets');
        } catch (error) {
            console.error('Error sending quiz results to Google Sheets:', error);
        }
    }

    /**
     * Prepare quiz data for submission
     * @param {string} quizId - The quiz identifier
     * @param {Object} quiz - The quiz object
     * @param {Array} answers - User's answers
     * @param {number} score - User's score
     * @param {number} percentage - Score percentage
     * @param {boolean} passed - Whether user passed
     */
    prepareQuizData(quizId, quiz, answers, score, percentage, passed) {
        const timestamp = new Date().toISOString();
        const userAgent = navigator.userAgent;

        // Get browser fingerprint for anonymous tracking (not personally identifiable)
        const fingerprint = this.generateFingerprint();

        return {
            timestamp: timestamp,
            fingerprint: fingerprint,
            quizId: quizId,
            quizTitle: quiz.title,
            totalQuestions: quiz.questions.length,
            correctAnswers: score,
            scorePercentage: percentage,
            passed: passed,
            passingScore: quiz.passingScore,
            answers: answers.map((answer, index) => ({
                questionNumber: index + 1,
                question: quiz.questions[index].question,
                selectedAnswer: quiz.questions[index].options[answer.selectedAnswer],
                correctAnswer: quiz.questions[index].options[quiz.questions[index].correct],
                isCorrect: answer.correct
            })),
            userAgent: userAgent
        };
    }

    /**
     * Generate a simple browser fingerprint for anonymous user tracking
     * This helps identify repeat attempts without collecting personal info
     */
    generateFingerprint() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('fingerprint', 2, 2);

        const data = canvas.toDataURL();

        // Simple hash function
        let hash = 0;
        for (let i = 0; i < data.length; i++) {
            const char = data.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }

        // Add screen resolution and timezone
        const fingerprint = `${hash}_${screen.width}x${screen.height}_${new Date().getTimezoneOffset()}`;

        return fingerprint;
    }

    /**
     * Send progress update to Google Sheets
     * @param {Object} progressData - The progress data to send
     */
    async sendProgressUpdate(progressData) {
        if (!this.enabled || this.scriptUrl === 'REPLACE_WITH_YOUR_GOOGLE_APPS_SCRIPT_URL') {
            console.log('Google Sheets integration not configured. Progress data:', progressData);
            return;
        }

        try {
            const response = await fetch(this.scriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'progress',
                    ...progressData
                })
            });

            console.log('Progress update sent to Google Sheets');
        } catch (error) {
            console.error('Error sending progress update to Google Sheets:', error);
        }
    }
}

// Initialize global instance
window.googleSheetsIntegration = new GoogleSheetsIntegration();
