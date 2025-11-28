'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
    saveQuizResult,
    updateSeenQuestions,
    getSeenQuestions,
} from '@/lib/firebase';
import {
    loadQuestionsByCategory,
    assembleExamQuestions,
    calculatePercentage,
    formatTime,
    formatExamTimer,
} from '@/lib/quizHelpers';

export default function QuizInterface({ category, mode = 'standard', onExit }) {
    // Load questions data
    const [questionsData, setQuestionsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Quiz state
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    // Guru State
    const [guruExplanation, setGuruExplanation] = useState(null);
    const [isGuruLoading, setIsGuruLoading] = useState(false);
    const [showGuruModal, setShowGuruModal] = useState(false);

    // Exam start state
    const isExamMode = mode === 'exam';
    const [hasStarted, setHasStarted] = useState(!isExamMode);

    // Timer state (for exam mode)
    const [mainTimer, setMainTimer] = useState(9000); // 2.5 hours = 150 minutes = 9000 seconds
    const [questionTimer, setQuestionTimer] = useState(60); // 60 seconds per question

    const { user } = useAuth();

    // Load questions data on mount
    useEffect(() => {
        async function loadData() {
            try {
                const response = await fetch('/data/questions.json');
                if (!response.ok) {
                    throw new Error('Failed to load questions');
                }
                const data = await response.json();
                setQuestionsData(data);
                setLoading(false);
            } catch (err) {
                console.error('Error loading questions:', err);
                setError('Failed to load quiz questions. Please try again.');
                setLoading(false);
            }
        }
        loadData();
    }, []);

    // Initialize quiz when data is loaded
    useEffect(() => {
        if (!questionsData) return;

        async function initializeQuiz() {
            try {
                let quizQuestions = [];

                if (isExamMode) {
                    // Exam mode: 150 questions from 5 subjects
                    quizQuestions = assembleExamQuestions(questionsData);
                } else {
                    // Standard mode: 15 questions from selected category
                    const seenIds = user
                        ? await getSeenQuestions(user, category)
                        : [];
                    quizQuestions = loadQuestionsByCategory(
                        questionsData,
                        category,
                        seenIds
                    );
                }

                if (quizQuestions.length === 0) {
                    setError(`No questions found for category: ${category}`);
                    return;
                }

                setQuestions(quizQuestions);
            } catch (err) {
                console.error('Error initializing quiz:', err);
                setError(err.message || 'Failed to initialize quiz');
            }
        }

        initializeQuiz();
    }, [questionsData, category, mode, user, isExamMode]);

    // Main timer (exam mode only)
    useEffect(() => {
        if (!isExamMode || isFinished || !hasStarted) return;

        const interval = setInterval(() => {
            setMainTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    handleFinishQuiz();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isExamMode, isFinished, hasStarted]);

    // Question timer (exam mode only)
    useEffect(() => {
        if (!isExamMode || showFeedback || isFinished || !hasStarted) return;

        setQuestionTimer(60); // Reset timer for new question

        const interval = setInterval(() => {
            setQuestionTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    // Auto-advance to next question when timer expires
                    handleNext();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [currentQuestionIndex, isExamMode, showFeedback, isFinished, hasStarted]);

    // Handle option selection
    const handleOptionClick = (index) => {
        if (selectedAnswer !== null) return; // Already answered

        setSelectedAnswer(index);
        setShowFeedback(true);

        const currentQuestion = questions[currentQuestionIndex];
        if (index === currentQuestion.correctIndex) {
            setScore((prev) => prev + 1);
        }
    };

    // Handle next question
    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setSelectedAnswer(null);
            setShowFeedback(false);
        } else {
            handleFinishQuiz();
        }
    };

    // Handle quiz completion
    const handleFinishQuiz = async () => {
        setIsFinished(true);

        // Save results to Firestore if user is logged in
        if (user) {
            try {
                await saveQuizResult(user, score, questions.length, category);

                // Update seen questions for standard mode
                if (!isExamMode) {
                    const questionIds = questions.map((q) => q.id);
                    await updateSeenQuestions(user, category, questionIds);
                }
            } catch (err) {
                console.error('Error saving quiz results:', err);
            }
        }
    };

    // Handle restart/try again
    const handleRestart = () => {
        if (onExit) {
            onExit();
        } else {
            window.location.reload();
        }
    };

    // Start Exam Handler
    const handleStartExam = () => {
        setHasStarted(true);
    };

    // Guru Logic
    const fetchGuruExplanation = async (questionText, userAnswer, correctAnswer) => {
        setIsGuruLoading(true);
        setShowGuruModal(true);
        setGuruExplanation(null);

        try {
            const res = await fetch('/api/explain', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    question: questionText,
                    userAnswer: userAnswer,
                    correctAnswer: correctAnswer
                })
            });

            if (!res.ok) throw new Error('Failed to get explanation');

            const data = await res.json();
            setGuruExplanation(data.explanation);
        } catch (err) {
            console.error(err);
            setGuruExplanation('<p class="text-red-500">The Guru is meditating and cannot answer right now.</p>');
        } finally {
            setIsGuruLoading(false);
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">
                        {isExamMode
                            ? 'Assembling your full-length KTET exam...'
                            : 'Loading quiz questions...'}
                    </p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                    <div className="text-red-600 mb-4">
                        <svg
                            className="w-16 h-16 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={handleRestart}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    // Exam Start Screen
    if (isExamMode && !hasStarted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden">
                    <div className="p-8 text-center relative">
                        {/* Decorative background circle */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-50 rounded-full opacity-50 z-0"></div>

                        <div className="relative z-10">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>

                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                                KTET Exam Day Experience
                            </h1>
                            <p className="text-gray-600 text-lg mb-6">
                                This is a full-length simulation of the KTET exam.
                            </p>

                            <span className="inline-block bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-semibold mb-8">
                                For KTET Category I
                            </span>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 text-left border border-gray-100 relative z-10">
                            <div className="flex items-center mb-4">
                                <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="font-bold text-gray-900 text-lg">Exam Conditions:</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="font-semibold text-gray-800">Total Questions: 150</p>
                                        <p className="text-sm text-gray-600">30 questions from each core subject</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="font-semibold text-gray-800">Time Limit: 2 Hours, 30 Minutes</p>
                                        <p className="text-sm text-gray-600">Complete the exam within the allotted time</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1">
                                        <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="font-semibold text-gray-800">Time Per Question: 60 Seconds</p>
                                        <p className="text-sm text-gray-600">Unanswered questions will be automatically skipped</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleStartExam}
                            className="w-full mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex items-center justify-center group"
                        >
                            Begin Exam Now
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Results view
    if (isFinished) {
        const percentage = calculatePercentage(score, questions.length);
        const passed = percentage >= 60;

        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {isExamMode ? 'Exam Day Experience Results' : 'Quiz Complete!'}
                        </h2>
                        <p className="text-gray-600">
                            You scored {score} out of {questions.length}
                        </p>
                    </div>

                    {/* Score Circle */}
                    <div className="flex justify-center mb-8">
                        <div className="relative w-48 h-48">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="88"
                                    stroke="#e5e7eb"
                                    strokeWidth="12"
                                    fill="none"
                                />
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="88"
                                    stroke={passed ? '#10b981' : '#ef4444'}
                                    strokeWidth="12"
                                    fill="none"
                                    strokeDasharray={`${2 * Math.PI * 88}`}
                                    strokeDashoffset={`${2 * Math.PI * 88 * (1 - percentage / 100)}`}
                                    className="transition-all duration-1000 ease-out"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-5xl font-bold text-gray-900">
                                        {percentage}%
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        {passed ? 'Passed!' : 'Keep Learning'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleRestart}
                            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                        >
                            {isExamMode ? 'Try Again' : 'New Quiz'}
                        </button>
                        {onExit && (
                            <button
                                onClick={onExit}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-colors"
                            >
                                Exit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Quiz view
    if (questions.length === 0) {
        return null;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Timer Display (Exam Mode Only) */}
                {isExamMode && (
                    <div className="bg-white rounded-xl shadow-lg p-4 mb-6 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <svg
                                className="w-5 h-5 text-purple-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span className="font-semibold text-gray-700">
                                Exam Time: {formatExamTimer(mainTimer)}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg
                                className="w-5 h-5 text-orange-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span
                                className={`font-semibold ${questionTimer <= 10 ? 'text-red-600 animate-pulse' : 'text-gray-700'}`}
                            >
                                Question: {formatTime(questionTimer)}
                            </span>
                        </div>
                    </div>
                )}

                {/* Quiz Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-semibold text-gray-600">
                                Question {currentQuestionIndex + 1} of {questions.length}
                            </span>
                            <span className="text-sm font-semibold text-purple-600">
                                Score: {score}
                            </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-purple-600 h-full transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Question */}
                    <div className="p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 leading-relaxed">
                            {currentQuestion.question}
                        </h3>

                        {/* Options */}
                        <div className="space-y-3">
                            {currentQuestion.options.map((option, index) => {
                                const isSelected = selectedAnswer === index;
                                const isCorrect = index === currentQuestion.correctIndex;
                                const showCorrect = showFeedback && isCorrect;
                                const showIncorrect = showFeedback && isSelected && !isCorrect;

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleOptionClick(index)}
                                        disabled={selectedAnswer !== null}
                                        className={`w-full flex items-center p-4 rounded-xl border-2 transition-all ${showCorrect
                                            ? 'border-green-500 bg-green-50 text-green-700'
                                            : showIncorrect
                                                ? 'border-red-500 bg-red-50 text-red-700'
                                                : isSelected
                                                    ? 'border-purple-600 bg-purple-50'
                                                    : 'border-gray-200 hover:border-purple-600 hover:-translate-y-1'
                                            } ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                    >
                                        <span
                                            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 ${showCorrect
                                                ? 'bg-green-500 text-white'
                                                : showIncorrect
                                                    ? 'bg-red-500 text-white'
                                                    : isSelected
                                                        ? 'bg-purple-600 text-white'
                                                        : 'bg-gray-200 text-gray-600'
                                                }`}
                                        >
                                            {String.fromCharCode(65 + index)}
                                        </span>
                                        <span className="text-left font-medium">{option}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Feedback */}
                        {showFeedback && (
                            <div
                                className={`mt-6 p-4 rounded-xl ${selectedAnswer === currentQuestion.correctIndex
                                    ? 'bg-green-50 border-2 border-green-200'
                                    : 'bg-red-50 border-2 border-red-200'
                                    }`}
                            >
                                <p
                                    className={`font-semibold mb-2 ${selectedAnswer === currentQuestion.correctIndex
                                        ? 'text-green-800'
                                        : 'text-red-800'
                                        }`}
                                >
                                    {selectedAnswer === currentQuestion.correctIndex
                                        ? '✓ Correct!'
                                        : '✗ Incorrect'}
                                </p>
                                {currentQuestion.explanation && (
                                    <p className="text-gray-700 text-sm">
                                        {currentQuestion.explanation}
                                    </p>
                                )}

                                {/* Ask Guru Button for Incorrect Answers */}
                                {selectedAnswer !== currentQuestion.correctIndex && (
                                    <button
                                        onClick={() => fetchGuruExplanation(
                                            currentQuestion.question,
                                            currentQuestion.options[selectedAnswer],
                                            currentQuestion.options[currentQuestion.correctIndex]
                                        )}
                                        className="mt-4 flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors bg-white px-4 py-2 rounded-lg border border-purple-200 shadow-sm"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        Ask Guru for a detailed explanation
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-6 bg-gray-50 border-t border-gray-200">
                        <button
                            onClick={handleNext}
                            disabled={selectedAnswer === null}
                            className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all ${selectedAnswer === null
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-purple-600 hover:bg-purple-700 text-white'
                                }`}
                        >
                            {currentQuestionIndex === questions.length - 1
                                ? 'Finish Quiz'
                                : 'Next Question'}
                            <span className="ml-2">→</span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Guru Modal */}
            {showGuruModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowGuruModal(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="text-2xl">🧘‍♂️</span> Guru's Wisdom
                            </h3>
                            <button onClick={() => setShowGuruModal(false)} className="text-gray-400 hover:text-gray-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6">
                            {isGuruLoading ? (
                                <div className="flex flex-col items-center justify-center py-8">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
                                    <p className="text-purple-600 font-medium">Consulting the Guru...</p>
                                </div>
                            ) : (
                                <div
                                    className="prose prose-purple max-w-none"
                                    dangerouslySetInnerHTML={{ __html: guruExplanation }}
                                />
                            )}
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                            <button
                                onClick={() => setShowGuruModal(false)}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-colors"
                            >
                                Understood, Thank You!
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
