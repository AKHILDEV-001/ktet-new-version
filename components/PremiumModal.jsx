'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function PremiumModal({ isOpen, onClose }) {
    const { user } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async () => {
        if (!user) {
            alert("Please login to upgrade to Premium");
            return;
        }

        setIsProcessing(true);

        try {
            // Step 1: Fetch Razorpay Key and Create Order
            const [configRes, orderRes] = await Promise.all([
                fetch('/api/config'),
                fetch('/api/create-order', { method: 'POST' })
            ]);

            const config = await configRes.json();
            const orderData = await orderRes.json();

            if (!orderRes.ok) {
                throw new Error("Server error: " + (orderData.error || orderRes.statusText));
            }

            if (orderData.error) {
                alert("Error creating order: " + orderData.error);
                setIsProcessing(false);
                return;
            }

            // Step 2: Configure Razorpay Options
            const options = {
                key: config.key,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "KTET Quiz Hub",
                description: "1 Month Premium Membership",
                order_id: orderData.id,

                // Step 3: Handler - What happens when payment succeeds
                handler: async function (response) {
                    // Send proofs to server for verification
                    const verifyRes = await fetch('/api/verify-payment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            userId: user.uid
                        })
                    });

                    const verifyData = await verifyRes.json();

                    if (verifyData.success) {
                        alert("Payment Successful! Welcome to Premium.");
                        location.reload();
                    } else {
                        alert("Payment verification failed. Please contact support.");
                    }
                },
                prefill: {
                    name: user.displayName || "Learner",
                    email: user.email,
                    contact: ""
                },
                theme: {
                    color: "#6d28d9" // Purple theme
                }
            };

            // Step 4: Open Checkout
            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response) {
                alert("Payment Failed: " + response.error.description);
                setIsProcessing(false);
            });
            rzp1.open();

            setIsProcessing(false);
            onClose();

        } catch (error) {
            console.error("Payment initialization failed:", error);
            alert("Could not start payment. Please try again.");
            setIsProcessing(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10 p-2 rounded-full hover:bg-gray-100"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Header */}
                <div className="p-6 sm:p-8 pb-4 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Upgrade to Premium</h2>
                    <p className="text-gray-600">Unlock unlimited access and boost your preparation.</p>
                </div>

                {/* Comparison Table */}
                <div className="px-6 sm:px-8 pb-6 overflow-x-auto">
                    <table className="w-full border-collapse mb-6">
                        <thead>
                            <tr>
                                <th className="w-1/3 p-4 text-left font-semibold text-gray-700 bg-gray-50">Feature</th>
                                <th className="w-1/3 p-4 text-center font-semibold text-gray-700 bg-gray-50">Free</th>
                                <th className="w-1/3 p-4 text-center font-semibold text-purple-800 bg-purple-100 rounded-t-lg">Premium</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200">
                                <td className="p-4 font-medium text-gray-900">Quiz Sets per Day</td>
                                <td className="p-4 text-center text-gray-600 text-sm">2 Sets</td>
                                <td className="p-4 text-center bg-purple-50">
                                    <svg className="w-5 h-5 text-green-500 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="block text-sm font-bold text-purple-700">Unlimited</span>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="p-4 font-medium text-gray-900">Exam Day Experience</td>
                                <td className="p-4 text-center text-gray-600 text-sm">1 per Month</td>
                                <td className="p-4 text-center bg-purple-50">
                                    <svg className="w-5 h-5 text-green-500 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="block text-sm font-bold text-purple-700">Unlimited</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="p-4 font-medium text-gray-900">Ad-Free Experience</td>
                                <td className="p-4 text-center">
                                    <svg className="w-5 h-5 text-red-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </td>
                                <td className="p-4 text-center bg-purple-50 rounded-b-lg">
                                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isProcessing ? (
                            <>
                                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Processing...</span>
                            </>
                        ) : (
                            <>
                                <span>Upgrade for just ₹99 / Month</span>
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </>
                        )}
                    </button>
                    <p className="text-center text-xs text-gray-500 mt-3">Secure payment via Razorpay. Cancel anytime.</p>
                </div>
            </div>
        </div>
    );
}
