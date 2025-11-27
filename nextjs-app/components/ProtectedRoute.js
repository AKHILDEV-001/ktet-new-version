'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { user, loading, openLoginModal } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            openLoginModal();
            // Optional: Redirect to home if you don't want to show the protected content underneath
            // router.push('/'); 
        }
    }, [user, loading, openLoginModal, router]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600"></div>
            </div>
        );
    }

    if (!user) {
        return null; // Don't render children if not authenticated
    }

    return <>{children}</>;
}
