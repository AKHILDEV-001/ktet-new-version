import { NextResponse } from 'next/server';

export async function POST(req) {
    // 1. --- SECURITY AND INPUT VALIDATION ---
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    if (!OPENROUTER_API_KEY) {
        console.error('CRITICAL: OPENROUTER_API_KEY environment variable is not set.');
        return NextResponse.json({
            error: 'API Key Not Configured',
            details: 'The server is missing the required OPENROUTER_API_KEY. Please ensure this environment variable is set in your Vercel project settings.'
        }, { status: 500 });
    }

    // Allow the model to be configured via environment variables.
    // Note: Free models can be slower and less reliable. If you face persistent timeout or format errors,
    // consider upgrading to a paid model on OpenRouter (e.g., "google/gemini-pro", "anthropic/claude-3-haiku").
    // User requested specific model: "x-ai/grok-4.1-fast:free"
    const AI_MODEL = "x-ai/grok-4.1-fast:free";

    let body;
    try {
        body = await req.json();
    } catch (e) {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { topic = 'General Knowledge', count = 10, subject = 'KTET Exam' } = body;
    console.log(`Received request for topic: "${topic}" using model: ${AI_MODEL}`);

    if (topic === 'KTET Syllabus') {
        console.warn('Attempted to generate a quiz for the syllabus category. This is not supported.');
        return NextResponse.json({
            error: 'Invalid Category: "KTET Syllabus" is not a quiz topic.',
            details: 'Please select a valid quiz topic.'
        }, { status: 400 });
    }

    // 2. --- CONSTRUCT THE AI PROMPT ---
    const prompt = `
      You are an expert question generator for the Kerala Teacher Eligibility Test (KTET).
      Your task is to generate exactly ${count} multiple-choice questions.

      CRITICAL INSTRUCTIONS:
      1. The topic for these questions MUST be: <topic>${topic}</topic>. Do NOT generate questions on any other topic.
      2. The subject context is: <subject>${subject}</subject>.
      3. You MUST respond with ONLY a valid JSON object. Do not include any text, greetings, explanations, or markdown fences like \`\`\`json before or after the JSON object.
      4. The JSON structure MUST be: { "questions": [ ... ] }.
      5. Each question object inside the "questions" array must have these exact keys: "id" (a unique number), "question" (string), "options" (an array of exactly 4 strings), "correctIndex" (a number from 0 to 3), and "explanation" (a string explaining the correct answer).

      Now, generate the questions for the topic: <topic>${topic}</topic>.
    `;

    // 3. --- CALL THE OPENROUTER AI API WITH TIMEOUT ---
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 9000); // 9-second timeout

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            signal: controller.signal, // Attach the abort signal
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: AI_MODEL,
                messages: [
                    { "role": "system", "content": "You are a helpful assistant that only responds in valid, raw JSON format without any extra text or markdown." },
                    { "role": "user", "content": prompt }
                ]
            })
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`OpenRouter API Error (using model ${AI_MODEL}):`, errorText);
            return NextResponse.json({
                error: `The AI service failed to generate questions. Please try again later.`,
                details: errorText
            }, { status: response.status });
        }

        const aiData = await response.json();

        if (!aiData.choices || aiData.choices.length === 0 || !aiData.choices[0].message || !aiData.choices[0].message.content) {
            console.error('Invalid response structure from AI:', aiData);
            return NextResponse.json({
                error: 'The AI returned an unexpected response structure.',
                details: 'The response from the AI service was missing the expected content.'
            }, { status: 500 });
        }

        const jsonString = aiData.choices[0].message.content;

        // 4. --- PARSE AND RESPOND ---
        try {
            // Clean up potential markdown fences if the model ignores instructions
            const cleanedJsonString = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();
            const questionsJson = JSON.parse(cleanedJsonString);
            console.log(`Successfully generated and parsed ${questionsJson.questions.length} questions for topic "${topic}".`);
            return NextResponse.json(questionsJson, { status: 200 });
        } catch (parseError) {
            console.error('Failed to parse JSON from AI response:', parseError);
            console.error('Raw AI Response was:', jsonString);
            return NextResponse.json({
                error: 'The AI returned an invalid format. Could not parse the questions.',
                details: jsonString
            }, { status: 500 });
        }

    } catch (error) {
        if (error.name === 'AbortError') {
            console.error('API request timed out after 9 seconds.');
            return NextResponse.json({
                error: 'Gateway Timeout',
                details: 'The request to the AI service took too long to respond. This might be due to a slow model or high traffic. Try again later or consider using a faster model.'
            }, { status: 504 });
        }
        console.error('Failed to fetch from OpenRouter API:', error);
        return NextResponse.json({
            error: 'An unexpected error occurred while contacting the AI service.',
            details: error.message
        }, { status: 500 });
    }
}
