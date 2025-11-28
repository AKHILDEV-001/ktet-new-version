'use client';

import QuizInterface from '@/components/QuizInterface.jsx';

export default function ExamTestPage() {
    return (
        <QuizInterface
            category="Exam Day Experience"
            mode="exam"
            onExit={() => (window.location.href = '/')}
        />
    );
}
