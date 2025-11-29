import { Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL('https://www.ktetpreparation.online'),
  title: {
    default: "KTET Quiz Hub",
    template: "%s | KTET Quiz Hub",
  },
  description: "Free KTET preparation platform with quizzes and study materials",
};

import Navigation from "@/components/Navigation";
import LoginModal from "@/components/LoginModal";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased`}
      >
        <AuthProvider>
          <Navigation />
          <LoginModal />
          {children}
        </AuthProvider>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
