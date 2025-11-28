import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(request) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = await request.json();
        const secret = process.env.RAZORPAY_KEY_SECRET;

        // Create the expected signature using HMAC SHA256
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", secret)
            .update(body.toString())
            .digest("hex");

        // Compare expected signature with what Razorpay sent
        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            try {
                // Payment is valid! Update Firestore
                if (userId) {
                    // Calculate expiry date (30 days from now)
                    const now = new Date();
                    const expiryDate = new Date(now.setDate(now.getDate() + 30));

                    const { FieldValue, Timestamp } = await import('firebase-admin/firestore');

                    await adminDb.collection('users').doc(userId).set({
                        isPremium: true,
                        premiumExpiry: Timestamp.fromDate(expiryDate),
                        premiumSince: FieldValue.serverTimestamp(),
                        lastPaymentId: razorpay_payment_id
                    }, { merge: true });

                    console.log(`User ${userId} upgraded to Premium until ${expiryDate.toISOString()}.`);
                } else {
                    console.warn("Payment verified but no userId provided.");
                }

                return NextResponse.json({
                    success: true,
                    message: "Payment verified and account upgraded"
                });
            } catch (error) {
                console.error("Error updating database:", error);
                // We still return success to the frontend because the payment WAS successful,
                // but we log the error so we can fix the database manually if needed.
                return NextResponse.json({
                    success: true,
                    message: "Payment verified but account update failed. Please contact support."
                });
            }
        } else {
            return NextResponse.json(
                { success: false, message: "Invalid signature" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        return NextResponse.json(
            { success: false, message: "Verification failed" },
            { status: 500 }
        );
    }
}
