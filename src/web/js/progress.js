// Progress Tracker - Manages course completion tracking
class ProgressTracker {
    constructor() {
        this.progress = {
            modules: {
                1: { status: 'not-started', quizPassed: false, exercisesCompleted: [] },
                2: { status: 'not-started', quizPassed: false, exercisesCompleted: [] },
                3: { status: 'not-started', quizPassed: false, exercisesCompleted: [] },
                4: { status: 'not-started', quizPassed: false, exercisesCompleted: [] },
                5: { status: 'not-started', quizPassed: false, exercisesCompleted: [] }
            },
            finalExamPassed: false,
            certificateEarned: false,
            startDate: null,
            completionDate: null
        };

        this.loadProgress();
        this.updateUI();
    }

    updateModuleStatus(moduleNum, status) {
        if (!this.progress.modules[moduleNum]) return;

        this.progress.modules[moduleNum].status = status;

        // Mark start date if first module started
        if (!this.progress.startDate && status === 'in-progress') {
            this.progress.startDate = new Date().toISOString();
        }

        this.saveProgress();
        this.updateUI();
    }

    completeModule(moduleNum) {
        if (!this.progress.modules[moduleNum]) return;

        this.progress.modules[moduleNum].status = 'completed';
        this.saveProgress();
        this.updateUI();

        // Check if all modules completed
        this.checkOverallCompletion();
    }

    markQuizPassed(moduleNum) {
        if (!this.progress.modules[moduleNum]) return;

        this.progress.modules[moduleNum].quizPassed = true;
        this.saveProgress();
        this.updateUI();
    }

    markExerciseCompleted(moduleNum, exerciseId) {
        if (!this.progress.modules[moduleNum]) return;

        if (!this.progress.modules[moduleNum].exercisesCompleted.includes(exerciseId)) {
            this.progress.modules[moduleNum].exercisesCompleted.push(exerciseId);
            this.saveProgress();
            this.updateUI();
        }
    }

    markFinalExamPassed() {
        this.progress.finalExamPassed = true;
        this.saveProgress();
        this.updateUI();
        this.checkOverallCompletion();
    }

    checkOverallCompletion() {
        // Check if all requirements met for certification
        const allModulesCompleted = Object.values(this.progress.modules).every(m => m.status === 'completed');
        const allQuizzesPassed = Object.values(this.progress.modules).every(m => m.quizPassed);

        if (allModulesCompleted && allQuizzesPassed && this.progress.finalExamPassed) {
            this.earnCertificate();
        }
    }

    earnCertificate() {
        if (this.progress.certificateEarned) return;

        this.progress.certificateEarned = true;
        this.progress.completionDate = new Date().toISOString();
        this.saveProgress();
        this.updateUI();

        // Show celebration modal
        this.showCertificateEarned();
    }

    showCertificateEarned() {
        const content = `
            <div class="certificate-earned">
                <div class="celebration-icon">🎉</div>
                <h2>Congratulations!</h2>
                <p class="celebration-text">You've earned your Gemara Policy Writing Certification!</p>
                <p>You've successfully completed:</p>
                <ul class="achievement-list">
                    <li>✓ All 5 course modules</li>
                    <li>✓ All module quizzes (80%+)</li>
                    <li>✓ Final comprehensive exam</li>
                </ul>
                <p>Your certificate is ready to download and share!</p>
                <div class="cta-section">
                    <button class="btn btn-primary btn-large" onclick="window.app.showCertificate()">View Certificate</button>
                </div>
            </div>
        `;

        window.app.showModal('Certificate Earned!', content, 'success', true);
    }

    getOverallProgress() {
        const totalModules = 5;
        const completedModules = Object.values(this.progress.modules).filter(m => m.status === 'completed').length;
        const finalExamWeight = 0.2; // 20% of total
        const modulesWeight = 0.8; // 80% of total

        let progress = (completedModules / totalModules) * modulesWeight;

        if (this.progress.finalExamPassed) {
            progress += finalExamWeight;
        }

        return Math.round(progress * 100);
    }

    updateUI() {
        // Update overall progress bar
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        const overallProgress = this.getOverallProgress();

        if (progressFill) {
            progressFill.style.width = `${overallProgress}%`;
        }

        if (progressText) {
            progressText.textContent = `${overallProgress}% Complete`;
        }

        // Update module status indicators
        Object.keys(this.progress.modules).forEach(moduleNum => {
            const statusElement = document.getElementById(`status-${moduleNum}`);
            if (statusElement) {
                const module = this.progress.modules[moduleNum];
                switch (module.status) {
                    case 'completed':
                        statusElement.textContent = '✓';
                        statusElement.style.color = 'var(--secondary-color)';
                        break;
                    case 'in-progress':
                        statusElement.textContent = '◐';
                        statusElement.style.color = 'var(--accent-color)';
                        break;
                    default:
                        statusElement.textContent = '○';
                        statusElement.style.color = 'var(--text-muted)';
                }
            }
        });
    }

    saveProgress() {
        try {
            localStorage.setItem('gemara-training-progress', JSON.stringify(this.progress));
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    }

    loadProgress() {
        try {
            const saved = localStorage.getItem('gemara-training-progress');
            if (saved) {
                const loaded = JSON.parse(saved);
                // Merge with defaults to handle any new fields
                this.progress = { ...this.progress, ...loaded };
            }
        } catch (error) {
            console.error('Error loading progress:', error);
        }
    }

    restoreProgress(savedProgress) {
        this.progress = savedProgress;
        this.updateUI();
    }

    getProgress() {
        return this.progress;
    }

    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            localStorage.removeItem('gemara-training-progress');
            location.reload();
        }
    }

    exportProgress() {
        const dataStr = JSON.stringify(this.progress, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `gemara-training-progress-${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        URL.revokeObjectURL(url);
    }

    getStatistics() {
        const totalModules = 5;
        const completedModules = Object.values(this.progress.modules).filter(m => m.status === 'completed').length;
        const quizzesPassed = Object.values(this.progress.modules).filter(m => m.quizPassed).length;

        let totalExercises = 0;
        let completedExercises = 0;

        Object.values(this.progress.modules).forEach(module => {
            const exerciseCount = {
                1: 0,
                2: 1,
                3: 3,
                4: 4,
                5: 2
            };

            totalExercises += exerciseCount[module] || 0;
            completedExercises += module.exercisesCompleted.length;
        });

        let timeSpent = null;
        if (this.progress.startDate) {
            const start = new Date(this.progress.startDate);
            const end = this.progress.completionDate ? new Date(this.progress.completionDate) : new Date();
            const diffMs = end - start;
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

            if (diffDays > 0) {
                timeSpent = `${diffDays} day${diffDays > 1 ? 's' : ''}, ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
            } else {
                timeSpent = `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
            }
        }

        return {
            completedModules,
            totalModules,
            quizzesPassed,
            completedExercises,
            totalExercises,
            finalExamPassed: this.progress.finalExamPassed,
            certificateEarned: this.progress.certificateEarned,
            overallProgress: this.getOverallProgress(),
            timeSpent,
            startDate: this.progress.startDate,
            completionDate: this.progress.completionDate
        };
    }

    showStatistics() {
        const stats = this.getStatistics();

        const content = `
            <div class="statistics-dashboard">
                <h2>Your Progress Statistics</h2>

                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value">${stats.completedModules}/${stats.totalModules}</div>
                        <div class="stat-label">Modules Completed</div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-value">${stats.quizzesPassed}/${stats.totalModules}</div>
                        <div class="stat-label">Quizzes Passed</div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-value">${stats.completedExercises}/${stats.totalExercises}</div>
                        <div class="stat-label">Exercises Completed</div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-value">${stats.overallProgress}%</div>
                        <div class="stat-label">Overall Progress</div>
                    </div>
                </div>

                <div class="stats-details">
                    <h3>Milestones</h3>
                    <ul>
                        <li class="${stats.finalExamPassed ? 'completed' : ''}">
                            ${stats.finalExamPassed ? '✓' : '○'} Final Exam Passed
                        </li>
                        <li class="${stats.certificateEarned ? 'completed' : ''}">
                            ${stats.certificateEarned ? '✓' : '○'} Certificate Earned
                        </li>
                    </ul>
                </div>

                ${stats.timeSpent ? `
                    <div class="stats-time">
                        <h3>Time Investment</h3>
                        <p>You've spent <strong>${stats.timeSpent}</strong> on this course.</p>
                        ${stats.startDate ? `<p class="small-text">Started: ${new Date(stats.startDate).toLocaleDateString()}</p>` : ''}
                        ${stats.completionDate ? `<p class="small-text">Completed: ${new Date(stats.completionDate).toLocaleDateString()}</p>` : ''}
                    </div>
                ` : ''}

                <div class="stats-actions">
                    <button class="btn btn-secondary" onclick="window.progressTracker.exportProgress()">Export Progress</button>
                    <button class="btn btn-secondary" onclick="window.progressTracker.resetProgress()">Reset Progress</button>
                </div>
            </div>
        `;

        window.app.showModal('Progress Statistics', content, 'info', true);
    }
}

// Add progress styles
const progressStyles = document.createElement('style');
progressStyles.textContent = `
    .certificate-earned {
        text-align: center;
        padding: var(--spacing-xl);
    }

    .celebration-icon {
        font-size: 5rem;
        margin-bottom: var(--spacing-lg);
        animation: bounce 1s infinite;
    }

    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
    }

    .celebration-text {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--secondary-color);
        margin-bottom: var(--spacing-lg);
    }

    .achievement-list {
        text-align: left;
        max-width: 400px;
        margin: var(--spacing-lg) auto;
        list-style: none;
        padding: 0;
    }

    .achievement-list li {
        padding: var(--spacing-sm);
        margin-bottom: var(--spacing-sm);
        background-color: var(--bg-color);
        border-radius: var(--radius-sm);
    }

    .statistics-dashboard {
        padding: var(--spacing-lg);
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: var(--spacing-md);
        margin: var(--spacing-xl) 0;
    }

    .stat-card {
        background-color: var(--bg-color);
        padding: var(--spacing-lg);
        border-radius: var(--radius-md);
        text-align: center;
        border: 2px solid transparent;
        transition: all var(--transition-fast);
    }

    .stat-card:hover {
        border-color: var(--primary-color);
        transform: translateY(-2px);
    }

    .stat-value {
        font-size: 2rem;
        font-weight: 700;
        color: var(--primary-color);
        margin-bottom: var(--spacing-xs);
    }

    .stat-label {
        font-size: 0.875rem;
        color: var(--text-secondary);
    }

    .stats-details {
        margin: var(--spacing-xl) 0;
        padding: var(--spacing-lg);
        background-color: var(--bg-color);
        border-radius: var(--radius-md);
    }

    .stats-details ul {
        list-style: none;
        padding: 0;
    }

    .stats-details li {
        padding: var(--spacing-md);
        margin-bottom: var(--spacing-sm);
        background-color: var(--surface-color);
        border-radius: var(--radius-sm);
        opacity: 0.6;
    }

    .stats-details li.completed {
        opacity: 1;
        border-left: 3px solid var(--secondary-color);
    }

    .stats-time {
        margin: var(--spacing-xl) 0;
        padding: var(--spacing-lg);
        background: linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%);
        border-radius: var(--radius-md);
        text-align: center;
    }

    .stats-time .small-text {
        font-size: 0.875rem;
        color: var(--text-secondary);
        margin-top: var(--spacing-sm);
    }

    .stats-actions {
        display: flex;
        gap: var(--spacing-md);
        justify-content: center;
        margin-top: var(--spacing-xl);
    }
`;
document.head.appendChild(progressStyles);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.progressTracker = new ProgressTracker();

    // Add progress menu item to quick links
    const quickLinks = document.querySelector('.quick-links');
    if (quickLinks) {
        const statsLink = document.createElement('li');
        statsLink.innerHTML = '<a href="#" id="show-stats">View Statistics</a>';
        quickLinks.appendChild(statsLink);

        document.getElementById('show-stats')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.progressTracker.showStatistics();
        });
    }
});
