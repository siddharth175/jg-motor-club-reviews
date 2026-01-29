import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, service, experience } = body;

        // Simulate AI processing time (makes it feel more advanced/real)
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // In a production environment, you would call OpenAI/Gemini here.
        // Example:
        // const completion = await openai.chat.completions.create({ ... });
        // const review = completion.choices[0].message.content;

        // For this standalone delivery without API keys, we use a Smart Template Engine
        // that constructs a professional-sounding review based on inputs.

        // 1. Select an opener
        const openers = [
            "I recently brought my car to J & G Motor Club and had a fantastic experience.",
            "Highly recommend J & G Motor Club! I've been looking for a reliable mechanic in Chatham.",
            "Just left J & G Motor Club and felt compelled to write a review.",
            "Great service at J & G Motor Club as always."
        ];

        // 2. Describe the service
        const serviceLines = [
            `I went in for a ${service} and the process was smooth and efficient.`,
            `Needed a ${service} and they got me in and out quickly.`,
            `The team handled my ${service} with great professionalism.`,
        ];

        // 3. Incorporate user experience (polishing it slightly)
        // We append their text but ensure it flows.
        let polishedExperience = experience;
        if (!experience.endsWith('.')) polishedExperience += '.';

        const qualityLines = [
            "The staff was friendly and transparent about the work.",
            "It's hard to find a mechanic you can trust, but these guys are the real deal.",
            "They explained everything clearly and didn't try to upsell me.",
            "Quality work at a fair price."
        ];

        // 4. Recommendation
        const recommendations = [
            "I'll definitely be coming back for future service.",
            "If you need auto work in the area, this is the place to go.",
            "Five stars for the whole team!",
            "Thanks to J & G for keeping my car running smoothly."
        ];

        const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

        const review = `${pick(openers)} ${pick(serviceLines)} ${polishedExperience} ${pick(qualityLines)} ${pick(recommendations)}`;

        return NextResponse.json({ review });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Failed to generate review" },
            { status: 500 }
        );
    }
}
