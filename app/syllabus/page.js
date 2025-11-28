import Link from 'next/link';

export const metadata = {
    title: "KTET Syllabus - Download PDF for Category 1, 2, 3 & 4",
    description: "Find and download the latest KTET syllabus for all categories. Get the official PDF for Category I (LP), Category II (UP), and Category III (HS).",
    robots: "index, follow",
    alternates: {
        canonical: "https://www.ktetpreparation.online/syllabus",
    },
};

export default function SyllabusPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-md sticky top-0 z-50">
                <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
                    <div className="text-xl sm:text-2xl font-bold text-purple-700">KTET Quiz Hub</div>
                    <div>
                        <Link href="/" className="text-gray-600 hover:text-purple-700 font-medium">
                            Home
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12">Select a Syllabus</h1>
                <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">

                    {/* KTET Category 1 */}
                    <Link
                        href="/syllabus/category-1"
                        className="block bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all group"
                    >
                        <h2 className="text-xl sm:text-2xl font-bold mb-3">KTET Category 1</h2>
                        <p className="text-gray-600 mb-4 sm:mb-6">View the complete syllabus for Category 1.</p>
                        <span className="w-full text-center bg-purple-600 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-md group-hover:bg-purple-700 transition-colors inline-block">
                            View Syllabus
                        </span>
                    </Link>

                    {/* KTET Category 2 */}
                    <Link
                        href="/syllabus/category-2"
                        className="block bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all group"
                    >
                        <h2 className="text-xl sm:text-2xl font-bold mb-3">KTET Category 2</h2>
                        <p className="text-gray-600 mb-4 sm:mb-6">View the complete syllabus for Category 2.</p>
                        <span className="w-full text-center bg-purple-600 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-md group-hover:bg-purple-700 transition-colors inline-block">
                            View Syllabus
                        </span>
                    </Link>

                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white mt-12 sm:mt-16 border-t">
                <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 text-center text-gray-500">
                    <p>&copy; 2024 KTET Quiz Hub. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}
