'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Navigation() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isPracticeHubOpen, setIsPracticeHubOpen] = useState(false);
    const { user, logout, openLoginModal } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    // Close sidebar on route change
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const togglePracticeHub = () => setIsPracticeHubOpen(!isPracticeHubOpen);

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const scrollToCategories = (e) => {
        e.preventDefault();
        if (pathname !== '/') {
            router.push('/#categories-section');
        } else {
            const element = document.getElementById('categories-section');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setIsSidebarOpen(false);
    };

    return (
        <>
            {/* Header */}
            <header className="bg-white shadow-md sticky top-0 z-30">
                <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
                    {/* Hamburger Menu */}
                    <button
                        onClick={toggleSidebar}
                        className="text-gray-800 hover:text-purple-700 focus:outline-none p-2 -ml-3 flex items-center group relative"
                        aria-label="Toggle Sidebar"
                    >
                        <div className="relative">
                            <svg className="h-6 w-6 transform group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                            {/* Menu Badge - Only show if not logged in or some other condition? Keeping it static for now as per legacy */}
                            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                        </div>
                    </button>

                    <Link href="/" className="text-xl sm:text-2xl font-bold text-purple-700 md:hidden">
                        KTET Quiz Hub
                    </Link>

                    <div className="hidden md:block text-xl sm:text-2xl font-bold text-purple-700">
                        <Link href="/">KTET Quiz Hub</Link>
                    </div>

                    <div className="flex items-center">
                        <button
                            onClick={scrollToCategories}
                            className="bg-purple-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-center"
                        >
                            Start Quiz
                        </button>
                    </div>
                </nav>
            </header>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    <div className="p-4 border-b flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-purple-700">KTET Quiz Hub</h2>
                        <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-gray-800 md:hidden">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
                        <Link
                            href="/"
                            className="flex items-center px-4 py-2 text-gray-700 font-medium rounded-lg bg-gray-100 transition-colors"
                        >
                            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span>Home</span>
                        </Link>

                        {user && (
                            <Link
                                href="/dashboard"
                                className="flex items-center px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <span>Dashboard</span>
                            </Link>
                        )}

                        {/* Practice Hub */}
                        {user && (
                            <div>
                                <button
                                    onClick={togglePracticeHub}
                                    className="w-full flex items-center justify-between px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-300 group"
                                >
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                                            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <span className="font-semibold">Practice Hub</span>
                                            <span className="text-xs text-gray-500">Advanced practice options</span>
                                        </div>
                                    </div>
                                    <svg
                                        className={`h-5 w-5 transform transition-transform duration-200 text-purple-600 ${isPracticeHubOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {isPracticeHubOpen && (
                                    <div className="pl-8 py-3 space-y-2 bg-gradient-to-b from-purple-50 to-transparent rounded-b-lg">
                                        <Link
                                            href="/exam-test"
                                            className="flex items-center px-4 py-3 text-sm text-gray-700 font-medium rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 group"
                                        >
                                            <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-md flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                                                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div className="flex flex-col items-start">
                                                <span className="font-medium">Exam Day Experience</span>
                                                <span className="text-xs text-gray-500">Full-length simulation</span>
                                            </div>
                                        </Link>

                                        <div className="pt-2 mt-2 border-t border-purple-100">
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">Coming Soon</p>
                                            <p className="text-xs text-gray-400 px-4">New practice features will be added here</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <button
                            onClick={() => alert("Feedback feature coming soon!")}
                            className="w-full flex items-center px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            <span>Feedback</span>
                        </button>
                    </nav>

                    <div className="p-4 border-t">
                        <button
                            onClick={() => alert("Premium features coming soon!")}
                            className="w-full flex items-center px-4 py-2 text-purple-700 font-bold rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors border border-purple-200 mb-2"
                        >
                            <svg className="h-5 w-5 mr-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span>Go Premium</span>
                        </button>

                        {!user ? (
                            <button
                                onClick={() => {
                                    // Trigger login modal using AuthContext
                                    openLoginModal();
                                    setIsSidebarOpen(false);
                                }}
                                className="w-full flex items-center px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                <span>Login</span>
                            </button>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                <span>Logout</span>
                            </button>
                        )}
                    </div>
                </div>
            </aside >
        </>
    );
}
