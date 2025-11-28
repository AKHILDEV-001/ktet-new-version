import { NextResponse } from 'next/server';

export async function POST(req) {
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

    if (!OPENROUTER_API_KEY) {
        return NextResponse.json({ error: 'Server Configuration Error' }, { status: 500 });
    }

    let body;
    try {
        body = await req.json();
    } catch (e) {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { question, userAnswer, correctAnswer } = body;

    // ENHANCED PROMPT WITH FACT-CHECKING AND FIRST PRINCIPLES
    const prompt = `
    Role: You are a wise, professional teacher with 60 years of experience. You specialize in explaining complex concepts simply to beginners using "First Principles" thinking (breaking problems down to their basic truths).
    
    Context:
    - Question: "${question}"
    - Student's Answer (Wrong): "${userAnswer}"
    - Website's Claimed Correct Answer: "${correctAnswer}"
    
    Your Task:
    1. **CRITICAL FACT CHECK:** First, analyze the Question and the "Website's Claimed Correct Answer". Is the website actually correct? 
       - If the website is WRONG, ignore the "Website's Claimed Correct Answer" and gently inform the student that the question/answer key has an error, then teach the TRUE correct answer.
       - If the website is CORRECT, proceed to teach the student why their answer was wrong.
    
    2. **First Principles Teaching:** Explain the fundamental rule or concept that governs this question. Don't just give the answer; explain *why* it is the answer based on the root definitions.
    
    3. **Memory Aids:** Provide a mnemonic, rhyme, or simple trick to help them remember this forever.
    
    Tone: Patient, kind, and encouraging (like a grandparent teaching a child).
    
    Response Format (Use HTML for styling):
    <div class="space-y-4 text-left font-sans">
        <div class="p-3 rounded-lg bg-red-50 border border-red-100">
            <p class="font-bold text-red-700 flex items-center gap-2">
                <span>🚫</span> Why "${userAnswer}" is not right:
            </p>
            <p class="text-gray-700 mt-1 text-sm">
                [Explain the error here. If the website itself was wrong, say: "Actually, you might be right! The website seems to have an error here. Let's look at the truth."]
            </p>
        </div>

        <div>
            <p class="font-bold text-purple-700 flex items-center gap-2">
                <span>🧠</span> The Core Concept (First Principles):
            </p>
            <p class="text-gray-700 mt-1 text-sm">
                [Break it down to the basics. Assume the student knows nothing about this topic. Define terms simply.]
            </p>
        </div>
        
        <div class="p-3 rounded-lg bg-green-50 border border-green-100">
            <p class="font-bold text-green-700 flex items-center gap-2">
                <span>✅</span> The Correct Answer:
            </p>
            <p class="text-gray-700 mt-1 text-sm">
                [State the correct answer clearly and briefly apply the concept above to prove it.]
            </p>
        </div>
        
        <div class="bg-yellow-50 p-3 rounded-lg border border-yellow-200 relative overflow-hidden">
            <div class="absolute top-0 right-0 -mt-2 -mr-2 w-8 h-8 bg-yellow-200 rounded-full opacity-50"></div>
            <p class="font-bold text-yellow-800 flex items-center gap-2 relative z-10">
                <span>💡</span> Guru's Memory Trick:
            </p>
            <p class="text-yellow-900 mt-1 text-sm italic relative z-10">
                [Give a mnemonic, rhyme, or real-life analogy to help them remember.]
            </p>
        </div>
    </div>
    `;

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "x-ai/grok-4.1-fast:free", // User requested specific model
                messages: [{ "role": "user", "content": prompt }],
                temperature: 0.3 // Lower temperature for more factual/consistent teaching
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("OpenRouter API Error:", errorText);
            return NextResponse.json({ error: "AI Service Error", details: errorText }, { status: response.status });
        }

        const data = await response.json();
        if (!data.choices || data.choices.length === 0) {
            console.error("Unexpected AI Response:", data);
            throw new Error("No AI response");
        }

        return NextResponse.json({ explanation: data.choices[0].message.content }, { status: 200 });

    } catch (error) {
        console.error("Explain API Error:", error);
        return NextResponse.json({ error: 'Failed to generate explanation' }, { status: 500 });
    }
}
