import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST() {
    try {
        // Initialize Razorpay with your secret keys
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        // Amount for premium subscription (99 INR)
        const amount = 99;

        const options = {
            amount: amount * 100, // Razorpay takes amount in "paise" (99 * 100 = 9900 paise)
            currency: "INR",
            receipt: "receipt_" + Date.now(), // Unique receipt ID
        };

        // Create order in Razorpay
        const order = await razorpay.orders.create(options);

        // Send the order details back to the frontend
        return NextResponse.json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
        });
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json(
            { error: "Failed to create order" },
            { status: 500 }
        );
    }
}
