'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, getQuizHistory, getUserData, resetCategoryProgress } from '../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import ProgressChart from '../../components/ProgressChart';
import Link from 'next/link';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quizHistory, setQuizHistory] = useState([]);
    const [stats, setStats] = useState({
        totalQuizzes: 0,
        averageScore: 0,
        topicsCovered: 0,
        studyTime: '0m'
    });
    const [categoryPerformance, setCategoryPerformance] = useState({});
    const [resetOptions, setResetOptions] = useState([]);
    const [selectedResetCategory, setSelectedResetCategory] = useState('');
    const [resetStatus, setResetStatus] = useState({ type: '', message: '' });
    const [userData, setUserData] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                await fetchData(currentUser);
            } else {
                router.push('/');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    const fetchData = async (currentUser) => {
        try {
            // Fetch Quiz History
            const historySnapshot = await getQuizHistory(currentUser.uid);
            const historyData = [];
            let totalScore = 0;
            let totalQuestions = 0;
            const categories = new Set();
            const catPerf = {};

            historySnapshot.forEach((doc) => {
                const data = doc.data();
                historyData.push({ id: doc.id, ...data });

                totalScore += data.score;
                totalQuestions += data.totalQuestions;
                categories.add(data.category);

                if (!catPerf[data.category]) {
                    catPerf[data.category] = { totalScore: 0, totalQuestions: 0, count: 0 };
                }
                catPerf[data.category].totalScore += data.score;
                catPerf[data.category].totalQuestions += data.totalQuestions;
                catPerf[data.category].count++;
            });

            setQuizHistory(historyData);
            setCategoryPerformance(catPerf);

            // Calculate Stats
            const totalQuizzes = historyData.length;
            const avgScore = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;
            const studyMinutes = totalQuestions * 5; // Est. 5 mins per question? Legacy says so.
            const hours = Math.floor(studyMinutes / 60);
            const minutes = studyMinutes % 60;
            const studyTime = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

            setStats({
                totalQuizzes,
                averageScore: avgScore,
                topicsCovered: categories.size,
                studyTime
            });

            // Fetch User Data for Reset Options
            const uData = await getUserData(currentUser.uid);
            setUserData(uData);
            if (uData && uData.seenQuestions) {
                const options = Object.keys(uData.seenQuestions).filter(
                    cat => uData.seenQuestions[cat] && uData.seenQuestions[cat].length > 0
                );
                setResetOptions(options);
                if (options.length > 0) setSelectedResetCategory(options[0]);
            }

        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    };

    const handleResetProgress = async () => {
        if (!selectedResetCategory || !user || !userData) return;

        if (confirm(`Are you sure you want to reset your progress for ${selectedResetCategory}? This will allow you to see questions you've already answered.`)) {
            try {
                await resetCategoryProgress(user.uid, selectedResetCategory, userData.seenQuestions);
                setResetStatus({ type: 'success', message: 'Reset Successful!' });

                // Refresh Data
                await fetchData(user);

                setTimeout(() => setResetStatus({ type: '', message: '' }), 3000);
            } catch (error) {
                console.error("Reset error:", error);
                setResetStatus({ type: 'error', message: 'Reset Failed' });
                setTimeout(() => setResetStatus({ type: '', message: '' }), 3000);
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    if (!user) return null; // Will redirect

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Dashboard Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">Your Learning Dashboard</h1>
                    <p className="text-gray-600 text-lg">Track your progress and continue your learning journey</p>
                </div>

                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-2xl font-bold mb-2">Welcome back, {user.displayName || user.email || 'Learner'}!</h2>
                            <p className="opacity-90">Ready to continue your KTET preparation?</p>
                        </div>
                        <div className="flex space-x-4">
                            <Link href="/" className="bg-white text-purple-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
                                Continue Learning
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>}
                        color="blue"
                        value={stats.totalQuizzes}
                        label="Quizzes Completed"
                    />
                    <StatsCard
                        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>}
                        color="green"
                        value={`${stats.averageScore}%`}
                        label="Average Score"
                    />
                    <StatsCard
                        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>}
                        color="purple"
                        value={stats.topicsCovered}
                        label="Topics Studied"
                    />
                    <StatsCard
                        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>}
                        color="amber"
                        value={stats.studyTime}
                        label="Study Time"
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Quiz History */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
                            <h3 className="text-xl font-bold text-white flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                </svg>
                                Recent Quiz Activity
                            </h3>
                        </div>
                        <div className="p-6 max-h-[500px] overflow-y-auto">
                            {quizHistory.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-600">No quiz history found.</p>
                                    <p className="text-gray-500 text-sm mt-2">Start your first quiz to see your progress here!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {quizHistory.map((item) => (
                                        <HistoryItem key={item.id} item={item} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Progress Chart */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
                            <h3 className="text-xl font-bold text-white flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                </svg>
                                Progress Overview
                            </h3>
                        </div>
                        <div className="p-6">
                            <ProgressChart categoryPerformance={categoryPerformance} />
                        </div>
                    </div>
                </div>

                {/* Reset Progress Section */}
                <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
                        <h3 className="text-xl font-bold text-white flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                            </svg>
                            Reset Progress
                        </h3>
                    </div>
                    <div className="p-6">
                        <p className="text-gray-600 mb-6">You can reset your seen questions for a category to start fresh. This will allow you to retake questions you've already seen.</p>

                        {resetOptions.length > 0 ? (
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                                <div className="flex-1 w-full sm:w-auto">
                                    <label htmlFor="reset-category-select" className="block text-sm font-medium text-gray-700 mb-2">Select Category</label>
                                    <select
                                        id="reset-category-select"
                                        value={selectedResetCategory}
                                        onChange={(e) => setSelectedResetCategory(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    >
                                        {resetOptions.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    onClick={handleResetProgress}
                                    className={`w-full sm:w-auto font-bold py-3 px-6 rounded-lg transition-colors shadow-md ${resetStatus.type === 'success' ? 'bg-green-500 text-white hover:bg-green-600' :
                                            resetStatus.type === 'error' ? 'bg-red-700 text-white' :
                                                'bg-red-500 text-white hover:bg-red-600'
                                        }`}
                                >
                                    {resetStatus.message || 'Reset Progress'}
                                </button>
                            </div>
                        ) : (
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-gray-600">No progress to reset.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

function StatsCard({ icon, color, value, label }) {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        purple: 'bg-purple-100 text-purple-600',
        amber: 'bg-amber-100 text-amber-600'
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {icon}
                    </svg>
                </div>
                <span className="text-sm text-gray-500">Total</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
            <p className="text-gray-600 text-sm">{label}</p>
        </div>
    );
}

function HistoryItem({ item }) {
    const date = item.timestamp?.toDate().toLocaleString() || 'Unknown Date';

    let scoreColor = 'text-red-600';
    if (item.percentage >= 80) scoreColor = 'text-green-600';
    else if (item.percentage >= 60) scoreColor = 'text-amber-600';

    return (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-800">{item.category}</h4>
                <span className={`${scoreColor} font-bold`}>{item.percentage}%</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Score: {item.score} / {item.totalQuestions}</span>
                <span>{date}</span>
            </div>
            <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
