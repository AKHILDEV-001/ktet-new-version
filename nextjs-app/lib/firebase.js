// Firebase Client Configuration
// This file initializes Firebase for client-side operations (authentication, Firestore, etc.)

import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Debug: Check if keys are present
if (typeof window === 'undefined') {
    console.log('Firebase Config Check (Server-Side/Build):');
    console.log('API Key present:', !!firebaseConfig.apiKey);
    console.log('Project ID present:', !!firebaseConfig.projectId);
    if (!firebaseConfig.apiKey) {
        console.error('CRITICAL ERROR: NEXT_PUBLIC_FIREBASE_API_KEY is missing in environment variables!');
    }
}

// Initialize Firebase (singleton pattern)
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (only in browser)
export let analytics;
if (typeof window !== 'undefined') {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

// Configure Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export default app;

// ============================================
// Quiz Functions
// ============================================

import {
    collection,
    addDoc,
    doc,
    updateDoc,
    serverTimestamp,
    arrayUnion,
    getDoc,
    setDoc
} from 'firebase/firestore';

/**
 * Save quiz result to Firestore
 * @param {Object} user - Firebase auth user object
 * @param {number} score - Number of correct answers
 * @param {number} totalQuestions - Total number of questions
 * @param {string} category - Quiz category
 */
export async function saveQuizResult(user, score, totalQuestions, category) {
    if (!user) {
        console.warn('Cannot save quiz result: user not authenticated');
        return;
    }

    try {
        const percentage = Math.round((score / totalQuestions) * 100);

        await addDoc(collection(db, `users/${user.uid}/quizHistory`), {
            score,
            totalQuestions,
            category,
            percentage,
            timestamp: serverTimestamp()
        });

        console.log('Quiz result saved successfully');
    } catch (error) {
        console.error('Error saving quiz result:', error);
        throw error;
    }
}

/**
 * Update seen questions for a user
 * @param {Object} user - Firebase auth user object
 * @param {string} category - Quiz category
 * @param {Array<string>} questionIds - Array of question IDs to mark as seen
 */
export async function updateSeenQuestions(user, category, questionIds) {
    if (!user) {
        console.warn('Cannot update seen questions: user not authenticated');
        return;
    }

    try {
        const userRef = doc(db, 'users', user.uid);

        // Check if user document exists
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            // Create user document with seen questions
            await setDoc(userRef, {
                seenQuestions: {
                    [category]: questionIds
                },
                createdAt: serverTimestamp()
            });
        } else {
            // Update existing document
            await updateDoc(userRef, {
                [`seenQuestions.${category}`]: arrayUnion(...questionIds)
            });
        }

        console.log('Seen questions updated successfully');
    } catch (error) {
        console.error('Error updating seen questions:', error);
        throw error;
    }
}

/**
 * Get seen questions for a user and category
 * @param {Object} user - Firebase auth user object
 * @param {string} category - Quiz category
 * @returns {Array<string>} - Array of seen question IDs
 */
export async function getSeenQuestions(user, category) {
    if (!user) {
        return [];
    }

    try {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            return [];
        }

        const userData = userDoc.data();
        return (userData.seenQuestions && userData.seenQuestions[category]) || [];
    } catch (error) {
        console.error('Error getting seen questions:', error);
        return [];
    }
}
