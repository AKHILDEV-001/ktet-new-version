'use client';

import QuizInterface from '@/components/QuizInterface.jsx';

export default function QuizTestPage() {
    return (
        <QuizInterface
            category="Child Development & Pedagogy"
            mode="standard"
            onExit={() => (window.location.href = '/')}
        />
    );
}
