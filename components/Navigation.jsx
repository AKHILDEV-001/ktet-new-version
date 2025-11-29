'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import PremiumModal from '@/components/PremiumModal';
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Home, LayoutDashboard, BookOpen, MessageSquare, LogIn, LogOut, Crown } from "lucide-react";

export default function Navigation() {
    const [showPremiumModal, setShowPremiumModal] = useState(false);
    const { user, logout, openLoginModal } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    // Close sidebar on route change
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const handlePremiumClick = () => {
        if (!user) {
            openLoginModal();
            setOpen(false);
        } else {
            setShowPremiumModal(true);
            setOpen(false);
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
        setOpen(false);
    };

    return (
        <>
            <header className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-30">
                <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="-ml-2">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px] flex flex-col p-0 gap-0 h-[100dvh] max-h-[100dvh]">
                            <div className="p-6 border-b">
                                <SheetHeader>
                                    <SheetTitle className="text-left text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                        KTET Hub
                                    </SheetTitle>
                                </SheetHeader>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6">
                                <nav className="flex-col space-y-2">
                                    <Link
                                        href="/"
                                        className="flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                                        onClick={() => setOpen(false)}
                                    >
                                        <Home className="mr-3 h-5 w-5" />
                                        Home
                                    </Link>
                                    {user && (
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                                            onClick={() => setOpen(false)}
                                        >
                                            <LayoutDashboard className="mr-3 h-5 w-5" />
                                            Dashboard
                                        </Link>
                                    )}
                                    {user && (
                                        <div className="space-y-1">
                                            <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                                Practice
                                            </div>
                                            <Link
                                                href="/exam-test"
                                                className="flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                                                onClick={() => setOpen(false)}
                                            >
                                                <BookOpen className="mr-3 h-5 w-5" />
                                                Exam Simulation
                                            </Link>
                                        </div>
                                    )}
                                    <button
                                        onClick={() => {
                                            alert("Feedback feature coming soon!");
                                            setOpen(false);
                                        }}
                                        className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                                    >
                                        <MessageSquare className="mr-3 h-5 w-5" />
                                        Feedback
                                    </button>
                                </nav>
                            </div>

                            <div className="p-6 border-t bg-background mt-auto">
                                <div className="space-y-4">
                                    <Button
                                        onClick={handlePremiumClick}
                                        className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                                    >
                                        <Crown className="mr-2 h-4 w-4" />
                                        Go Premium
                                    </Button>

                                    {!user ? (
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => {
                                                openLoginModal();
                                                setOpen(false);
                                            }}
                                        >
                                            <LogIn className="mr-2 h-4 w-4" />
                                            Login
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                                            onClick={handleLogout}
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Logout
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>

                    <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent md:hidden">
                        KTET Hub
                    </Link>

                    <div className="hidden md:block text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        <Link href="/">KTET Quiz Hub</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button onClick={scrollToCategories}>
                            Start Quiz
                        </Button>
                    </div>
                </nav>
            </header>

            <PremiumModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
        </>
    );
}
