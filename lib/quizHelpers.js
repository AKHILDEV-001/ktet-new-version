/**
 * Quiz Helper Functions
 * Utility functions for quiz operations including question loading, filtering, and formatting
 */

/**
 * Load questions by category and filter out seen questions
 * @param {Object} questionsData - The full questions.json object
 * @param {string} category - Category name to filter by
 * @param {Array<string>} seenIds - Array of question IDs already seen by the user
 * @returns {Array} - Array of unseen questions (max 15)
 */
export function loadQuestionsByCategory(questionsData, category, seenIds = []) {
    if (!questionsData || !questionsData.categories) {
        return [];
    }

    // Find the matching category
    const categoryData = questionsData.categories.find(
        (cat) => cat.name === category
    );

    if (!categoryData || !categoryData.questions) {
        return [];
    }

    // Filter out seen questions
    const unseenQuestions = categoryData.questions.filter(
        (q) => !seenIds.includes(q.id)
    );

    // If all questions have been seen, reset and use all questions
    const questionsToUse =
        unseenQuestions.length > 0 ? unseenQuestions : categoryData.questions;

    // Shuffle and return 15 questions
    const shuffled = [...questionsToUse].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 15);
}

/**
 * Assemble exam mode questions: 30 questions from each of 5 core subjects (150 total)
 * @param {Object} questionsData - The full questions.json object
 * @returns {Array} - Array of 150 questions (30 from each subject)
 */
export function assembleExamQuestions(questionsData) {
    if (!questionsData || !questionsData.categories) {
        throw new Error('Invalid questions data');
    }

    // Define the 5 core subjects for KTET exam
    const coreSubjects = [
        'Child Development & Pedagogy',
        'Mathematics',
        'Science',
        'English',
        'Malayalam',
    ];

    const examQuestions = [];

    for (const subject of coreSubjects) {
        const categoryData = questionsData.categories.find(
            (cat) => cat.name === subject
        );

        if (!categoryData || !categoryData.questions) {
            console.warn(`Subject "${subject}" not found in questions data`);
            continue;
        }

        // Shuffle questions for this subject
        const shuffled = [...categoryData.questions].sort(
            () => Math.random() - 0.5
        );

        // Take 30 questions from this subject
        const subjectQuestions = shuffled.slice(0, 30);
        examQuestions.push(...subjectQuestions);
    }

    if (examQuestions.length < 150) {
        throw new Error(
            `Could not assemble 150 questions. Only found ${examQuestions.length} questions.`
        );
    }

    // Shuffle all questions together
    return examQuestions.sort(() => Math.random() - 0.5);
}

/**
 * Calculate percentage score
 * @param {number} score - Number of correct answers
 * @param {number} total - Total number of questions
 * @returns {number} - Percentage rounded to nearest integer
 */
export function calculatePercentage(score, total) {
    if (total === 0) return 0;
    return Math.round((score / total) * 100);
}

/**
 * Format seconds to MM:SS format
 * @param {number} seconds - Number of seconds
 * @returns {string} - Formatted time string (e.g., "02:30")
 */
export function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format seconds to "H Hours, M Minutes" format
 * @param {number} seconds - Number of seconds
 * @returns {string} - Formatted time string
 */
export function formatExamTimer(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
        return `${hours} Hours, ${minutes} Minutes`;
    }
    return `${minutes} Minutes, ${secs} Seconds`;
}

/**
 * Get all available categories from questions data
 * @param {Object} questionsData - The full questions.json object
 * @returns {Array<string>} - Array of category names
 */
export function getAvailableCategories(questionsData) {
    if (!questionsData || !questionsData.categories) {
        return [];
    }
    return questionsData.categories.map((cat) => cat.name);
}
