import Link from 'next/link';

export const metadata = {
  title: "KTET Quiz App - Free Practice for Kerala Teacher Eligibility Test",
  description: "Free KTET practice quiz for Category 1, 2, 3, and 4. Prepare for the Kerala Teacher Eligibility Test with our mock tests and syllabus guides.",
  keywords: "KTET, Kerala Teacher Eligibility Test, KTET Quiz, KTET Mock Test, KTET Syllabus, KTET Preparation, KTET Online, KTET Exam, KTET Category 1, KTET Category 2, KTET Category 3, KTET Category 4",
  robots: "index, follow",
  openGraph: {
    title: "KTET Quiz App & Syllabus - Kerala Teacher Eligibility Test Practice",
    description: "Practice for the Kerala Teacher Eligibility Test with our free quiz and study materials.",
    type: "website",
    url: "https://www.ktetpreparation.online/",
  },
  twitter: {
    card: "summary",
  },
  alternates: {
    canonical: "https://www.ktetpreparation.online/",
  },
};

// Cache bust: 2025-11-28 12:57
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 animated-gradient-text">
              Your Path to KTET Success Starts Here
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xs sm:max-w-md md:max-w-3xl mx-auto">
              The intelligent platform for your complete KTET preparation.
            </p>
          </div>

          {/* Animated Marquee */}
          <div className="relative animate-marquee-container">
            <div className="animate-marquee">
              <div className="flex items-center gap-6 mx-3">
                <div className="marquee-card">
                  <h3 className="font-bold text-lg text-purple-700">AI-Generated Quizzes</h3>
                  <p className="text-sm text-gray-600 mt-1">Fresh questions every time you practice.</p>
                </div>
                <div className="marquee-card">
                  <h3 className="font-bold text-lg text-red-700">Instant Feedback</h3>
                  <p className="text-sm text-gray-600 mt-1">Learn from your mistakes immediately.</p>
                </div>
                <div className="marquee-card bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                  <h3 className="font-bold text-lg">Create an Account</h3>
                  <p className="text-sm opacity-90 mt-1">To unlock your personal dashboard!</p>
                </div>
                <div className="marquee-card">
                  <h3 className="font-bold text-lg text-blue-700">Full Syllabus Coverage</h3>
                  <p className="text-sm text-gray-600 mt-1">Covering all categories of the KTET exam.</p>
                </div>
                <div className="marquee-card">
                  <h3 className="font-bold text-lg text-amber-700">Mobile Friendly</h3>
                  <p className="text-sm text-gray-600 mt-1">Practice anytime, anywhere, on any device.</p>
                </div>
                <div className="marquee-card">
                  <h3 className="font-bold text-lg text-green-700">Detailed Analytics</h3>
                  <p className="text-sm text-gray-600 mt-1">Track your progress and identify weak areas.</p>
                </div>
              </div>
            </div>
            <div className="animate-marquee" aria-hidden="true">
              <div className="flex items-center gap-6 mx-3">
                <div className="marquee-card">
                  <h3 className="font-bold text-lg text-purple-700">AI-Generated Quizzes</h3>
                  <p className="text-sm text-gray-600 mt-1">Fresh questions every time you practice.</p>
                </div>
                <div className="marquee-card">
                  <h3 className="font-bold text-lg text-red-700">Instant Feedback</h3>
                  <p className="text-sm text-gray-600 mt-1">Learn from your mistakes immediately.</p>
                </div>
                <div className="marquee-card bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                  <h3 className="font-bold text-lg">Create an Account</h3>
                  <p className="text-sm opacity-90 mt-1">To unlock your personal dashboard!</p>
                </div>
                <div className="marquee-card">
                  <h3 className="font-bold text-lg text-blue-700">Full Syllabus Coverage</h3>
                  <p className="text-sm text-gray-600 mt-1">Covering all categories of the KTET exam.</p>
                </div>
                <div className="marquee-card">
                  <h3 className="font-bold text-lg text-amber-700">Mobile Friendly</h3>
                  <p className="text-sm text-gray-600 mt-1">Practice anytime, anywhere, on any device.</p>
                </div>
                <div className="marquee-card">
                  <h3 className="font-bold text-lg text-green-700">Detailed Analytics</h3>
                  <p className="text-sm text-gray-600 mt-1">Track your progress and identify weak areas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="text-center py-8 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Prepare for the Kerala Teacher Eligibility Test (KTET)
          </h2>
          <p className="max-w-3xl mx-auto text-gray-700">
            Our free interactive quiz is designed to help you master the KTET syllabus. Practice with
            questions covering Child Development & Pedagogy, Mathematics, Science, and more. Select a
            category and start your preparation today to secure your teaching career in Kerala.
          </p>
        </div>
      </section>

      {/* Category Cards Section */}
      <section id="categories-section" className="mt-12 sm:mt-16 md:mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">Explore Our Quiz Categories</h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12">
            All quizzes are based on the KTET Category I syllabus.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Child Development & Pedagogy */}
            <div className="category-card bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl h-full flex flex-col">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold">Child Development & Pedagogy</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base mb-4">
                Crucial topics for understanding student psychology and teaching methods.
              </p>
              <Link href="/quiz/child-development-pedagogy" className="w-full text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all btn-bounce mt-auto block">
                <span>Start Section</span>
              </Link>
            </div>

            {/* Mathematics */}
            <div className="category-card bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl h-full flex flex-col">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold">Mathematics</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base mb-4">
                Sharpen your quantitative reasoning skills.
              </p>
              <Link href="/quiz/mathematics" className="w-full text-center bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all btn-bounce mt-auto block">
                <span>Start Section</span>
              </Link>
            </div>

            {/* Malayalam */}
            <div className="category-card bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl h-full flex flex-col">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold">Malayalam</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base mb-4">
                Test your knowledge of Malayalam grammar and comprehension.
              </p>
              <Link href="/quiz/malayalam" className="w-full text-center bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all btn-bounce mt-auto block">
                <span>Start Section</span>
              </Link>
            </div>

            {/* English */}
            <div className="category-card bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl h-full flex flex-col">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold">English</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base mb-4">
                Improve your English language and comprehension skills.
              </p>
              <Link href="/quiz/english" className="w-full text-center bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all btn-bounce mt-auto block">
                <span>Start Section</span>
              </Link>
            </div>

            {/* Science */}
            <div className="category-card bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl h-full flex flex-col">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold">Science</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base mb-4">
                Test your scientific aptitude and knowledge.
              </p>
              <Link href="/quiz/science" className="w-full text-center bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-3 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all btn-bounce mt-auto block">
                <span>Start Section</span>
              </Link>
            </div>

            {/* KTET Syllabus */}
            <Link
              href="/syllabus"
              className="category-card block bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl group h-full flex flex-col"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold">KTET Syllabus</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base mb-4">
                Access the complete syllabus for all categories.
              </p>
              <span className="w-full mt-auto block text-center bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold py-3 rounded-lg group-hover:from-indigo-600 group-hover:to-indigo-700 transition-all">
                View Options
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">What is the KTET exam?</h3>
              <p className="text-gray-600 mt-1">
                The Kerala Teacher Eligibility Test (KTET) is an exam to assess the quality of teacher candidates
                for Lower Primary, Upper Primary, and High School classes in Kerala.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Which categories are covered in this quiz?</h3>
              <p className="text-gray-600 mt-1">
                This quiz app provides questions for all major categories of the KTET exam, helping you prepare
                comprehensively.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Is this quiz app free?</h3>
              <p className="text-gray-600 mt-1">
                Yes, this practice quiz is completely free to use. Our goal is to provide accessible resources for
                all KTET aspirants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white mt-12 sm:mt-16 border-t">
        <div className="container mx-auto px-6 py-6 text-center text-gray-500 text-sm">
          <p>&copy; 2024 KTET Quiz Hub. All Rights Reserved.</p>
          <p className="mt-1">Last updated: Nov 27, 2025</p>
        </div>
      </footer>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Quiz",
            name: "KTET Practice Quiz",
            description: "A free practice quiz to help you prepare for the Kerala Teacher Eligibility Test (KTET).",
            hasPart: [
              { "@type": "Question", name: "General Knowledge and Current Affairs" },
              { "@type": "Question", name: "Child Development and Pedagogy" },
              { "@type": "Question", name: "Mathematics & Science" }
            ],
            educationalLevel: "Teacher Certification",
            about: {
              "@type": "Event",
              name: "Kerala Teacher Eligibility Test (KTET)"
            },
            mainEntity: {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is KTET?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "KTET stands for Kerala Teacher Eligibility Test. It is an eligibility exam for teachers for Lower Primary, Upper Primary, and High School classes in Kerala."
                  }
                },
                {
                  "@type": "Question",
                  name: "How can this quiz help me prepare for KTET?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "This quiz provides practice questions based on the official KTET syllabus. It helps you test your knowledge, identify weak areas, and get familiar with the exam pattern."
                  }
                }
              ]
            }
          }),
        }}
      />
    </div>
  );
}
