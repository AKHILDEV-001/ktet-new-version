import Link from 'next/link';

export const metadata = {
    title: "KTET Category 1 Syllabus PDF - Lower Primary (LP)",
    description: "Download the official KTET Category 1 syllabus PDF for Lower Primary teachers. Complete syllabus covering Child Development, Malayalam, English, Mathematics, and Environmental Studies.",
    robots: "index, follow",
    alternates: {
        canonical: "https://www.ktetpreparation.online/syllabus/category-1",
    },
};

export default function Category1SyllabusPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-md sticky top-0 z-50">
                <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
                    <div className="text-xl sm:text-2xl font-bold text-purple-700">KTET Quiz Hub</div>
                    <div className="flex gap-4">
                        <Link href="/" className="text-gray-600 hover:text-purple-700 font-medium">
                            Home
                        </Link>
                        <Link href="/syllabus" className="text-gray-600 hover:text-purple-700 font-medium">
                            Back
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">KTET Category 1 Syllabus</h1>
                    <p className="text-center text-gray-600 mb-8">
                        Official syllabus for KTET Category I - Lower Primary (Classes I to V)
                    </p>

                    {/* PDF Viewer */}
                    <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
                        <iframe
                            src="/pdf/syllabus-ktet1.pdf"
                            className="w-full h-[600px] sm:h-[800px] rounded border border-gray-200"
                            title="KTET Category 1 Syllabus PDF"
                        />
                    </div>

                    {/* Download Button */}
                    <div className="text-center">
                        <a
                            href="/pdf/syllabus-ktet1.pdf"
                            download
                            className="inline-block bg-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-purple-700 transition-colors shadow-md"
                        >
                            Download PDF
                        </a>
                    </div>
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
