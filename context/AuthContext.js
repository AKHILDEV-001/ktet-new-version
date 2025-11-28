'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    signOut,
    GoogleAuthProvider
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '@/lib/firebase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // User is signed in
                setUser(currentUser);

                // Sync user data to Firestore
                try {
                    await syncUserData(currentUser);
                } catch (error) {
                    console.error("Error syncing user data:", error);
                }
            } else {
                // User is signed out
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const syncUserData = async (user) => {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            // Create new user document
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                createdAt: serverTimestamp(),
                lastLogin: serverTimestamp(),
                isPremium: false,
                seenQuestions: {}, // Initialize for new users
                roles: ['user']
            });
        } else {
            // Update existing user document
            const updateData = {
                lastLogin: serverTimestamp(),
                displayName: user.displayName, // Update in case it changed
                photoURL: user.photoURL
            };

            // Initialize seenQuestions if it doesn't exist (legacy compatibility)
            if (!userSnap.data()?.seenQuestions) {
                updateData.seenQuestions = {};
            }

            await setDoc(userRef, updateData, { merge: true });
        }
    };


    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            setShowLoginModal(false);
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const loginWithEmail = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setShowLoginModal(false);
        } catch (error) {
            console.error("Email login failed:", error);
            throw error;
        }
    };

    const signUpWithEmail = async (email, password, displayName) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Update display name
            if (displayName) {
                await updateProfile(userCredential.user, { displayName });
            }
            setShowLoginModal(false);
        } catch (error) {
            console.error("Sign up failed:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const openLoginModal = () => setShowLoginModal(true);
    const closeLoginModal = () => setShowLoginModal(false);

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            loginWithGoogle,
            loginWithEmail,
            signUpWithEmail,
            logout,
            showLoginModal,
            openLoginModal,
            closeLoginModal
        }}>
            {children}
        </AuthContext.Provider>
    );
};
