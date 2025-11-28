'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProgressChart({ categoryPerformance }) {
    if (!categoryPerformance || Object.keys(categoryPerformance).length === 0) {
        return (
            <div className="text-center p-4 h-full flex flex-col items-center justify-center">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                <p className="text-gray-600">Your progress charts will appear here once you complete some quizzes.</p>
            </div>
        );
    }

    const labels = Object.keys(categoryPerformance);
    const dataValues = labels.map(label => {
        const category = categoryPerformance[label];
        return ((category.totalScore / category.totalQuestions) * 100).toFixed(2);
    });

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Average Score',
                data: dataValues,
                backgroundColor: [
                    '#8B5CF6', // Purple
                    '#EC4899', // Pink
                    '#10B981', // Green
                    '#F59E0B', // Amber
                    '#3B82F6', // Blue
                    '#EF4444'  // Red
                ],
                borderColor: '#ffffff',
                borderWidth: 2,
                hoverOffset: 8
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        family: "'Inter', sans-serif",
                        size: 12
                    },
                    padding: 15,
                    usePointStyle: true,
                    pointStyle: 'rectRounded'
                }
            },
            title: {
                display: true,
                text: 'Average Score by Category',
                font: {
                    family: "'Inter', sans-serif",
                    size: 16,
                    weight: '600'
                },
                padding: {
                    top: 10,
                    bottom: 20
                }
            },
            tooltip: {
                backgroundColor: '#333',
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 12 },
                padding: 10,
                cornerRadius: 8,
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += context.parsed + '%';
                        }
                        return label;
                    }
                }
            }
        },
    };

    return (
        <div className="h-80 w-full">
            <Pie data={data} options={options} />
        </div>
    );
}
