# 🎓 KTET Quiz Hub

> **Master the Kerala Teacher Eligibility Test (KTET) with Confidence**

![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)
![Firebase](https://img.shields.io/badge/Firebase-Backend-FFCA28?style=flat-square&logo=firebase)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

## 🚀 Overview

**KTET Quiz Hub** is a comprehensive, modern web platform designed to help aspiring teachers prepare for the Kerala Teacher Eligibility Test. Built with the latest **Next.js 15** App Router and **Tailwind CSS**, it offers a seamless, responsive, and engaging learning experience.

Unlike static quiz sites, our platform leverages **AI integration** (via OpenRouter) to generate fresh questions and provide detailed explanations, ensuring candidates truly understand the core concepts of Child Development, Pedagogy, Mathematics, and Language studies.

---

## ✨ Key Features

- **🤖 AI-Powered Quizzes:** Dynamic question generation ensures you never run out of practice material.
- **📊 Real-time Analytics:** Track your progress with interactive charts and detailed performance breakdowns.
- **📱 Mobile-First Design:** A fully responsive interface that looks beautiful on phones, tablets, and desktops.
- **📚 Comprehensive Syllabus:** Covers all major categories including Child Development, Mathematics, Science, Malayalam, and English.
- **⚡ Instant Feedback:** Get immediate results and explanations for every answer.
- **🔐 Secure Authentication:** Robust user management powered by Firebase Auth.
- **💳 Premium Features:** Integrated Razorpay payment gateway for unlocking advanced mock tests and materials.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + `tailwindcss-animate`
- **UI Components:** Custom components based on [Radix UI](https://www.radix-ui.com/) & [Lucide Icons](https://lucide.dev/)
- **Charts:** [Chart.js](https://www.chartjs.org/)

### Backend & Services
- **BaaS:** [Firebase](https://firebase.google.com/) (Firestore, Authentication, Storage)
- **AI:** [OpenRouter API](https://openrouter.ai/) (for question generation)
- **Payments:** [Razorpay](https://razorpay.com/)

---

## 🏁 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- A Firebase project
- An OpenRouter API key
- A Razorpay account (for payments)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/ktet-quiz-hub.git
    cd ktet-quiz-hub
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env.local` file in the root directory and populate it with your credentials:

    ```env
    # Firebase Client
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

    # Firebase Admin (Server-side)
    FIREBASE_CLIENT_EMAIL=your_client_email
    FIREBASE_PRIVATE_KEY="your_private_key"

    # AI Service
    OPENROUTER_API_KEY=your_openrouter_key

    # Payments
    RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_key_secret
    ```

4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📂 Project Structure

```
ktet-quiz-hub/
├── app/                  # Next.js App Router directory
│   ├── api/              # Server-side API routes (Next.js API)
│   ├── dashboard/        # User dashboard pages
│   ├── quiz/             # Quiz interface and logic
│   ├── syllabus/         # Syllabus pages
│   ├── layout.js         # Root layout structure
│   └── page.js           # Landing page
├── components/           # Reusable React components
│   ├── ui/               # Primitive UI elements (Buttons, Cards, etc.)
│   ├── QuizInterface.jsx # Main quiz logic component
│   └── ...
├── lib/                  # Utility functions & configurations
│   ├── firebase.js       # Firebase client setup
│   └── utils.js          # Helper functions
├── public/               # Static assets (Images, PDFs)
└── ...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).