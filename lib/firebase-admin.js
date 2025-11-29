// Firebase Admin SDK Configuration
// This file initializes Firebase Admin for server-side operations (API routes, server components)

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin (singleton pattern)
if (!getApps().length) {
    try {
        // Option 1: Using service account JSON (recommended for production)
        // Place your service account JSON in the root and add to .gitignore
        if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
            const serviceAccount = JSON.parse(
                process.env.FIREBASE_SERVICE_ACCOUNT_KEY
            );

            initializeApp({
                credential: cert(serviceAccount),
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            });
        } else {
            // Option 2: Using individual credentials for development
            initializeApp({
                credential: cert({
                    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: (process.env.FIREBASE_PRIVATE_KEY || process.env.FIREBASE_private_key)?.replace(/\\n/g, '\n'),
                }),
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            });
        }
    } catch (error) {
        console.error('Firebase admin initialization error:', error);
    }
}

let adminAuth;
let adminDb;

try {
    if (getApps().length) {
        adminAuth = getAuth();
        adminDb = getFirestore();
    }
} catch (error) {
    console.warn('Firebase Admin services not initialized:', error);
}

export { adminAuth, adminDb };
export default { adminAuth, adminDb };
