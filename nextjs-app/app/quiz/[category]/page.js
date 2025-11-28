'use client';

import { use, useEffect, useState } from 'react';
import QuizInterface from '@/components/QuizInterface';
import { useRouter } from 'next/navigation';

export default function QuizPage({ params }) {
    // Unwrap params using React.use()
    const unwrappedParams = use(params);
    const categorySlug = decodeURIComponent(unwrappedParams.category);
    const router = useRouter();
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        // Map slug to actual category name in JSON
        // This mapping should ideally come from a shared config or the JSON itself
        const categoryMapping = {
            'child-development-pedagogy': 'Child Development & Pedagogy',
            'mathematics': 'Mathematics',
            'malayalam': 'Malayalam',
            'english': 'English',
            'science': 'Science',
            'social-science': 'Social Science'
        };

        const name = categoryMapping[categorySlug] || categorySlug;
        setCategoryName(name);
    }, [categorySlug]);

    if (!categoryName) return null;

    return (
        <QuizInterface
            category={categoryName}
            mode="standard"
            onExit={() => router.push('/')}
        />
    );
}
