import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, service, experience } = body;

        // Simulate AI processing time
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Expanded library of components
        const openers = [
            "I recently brought my car to J & G Motor Club and had a fantastic experience.",
            "Highly recommend J & G Motor Club! I've been looking for a reliable mechanic in Chatham.",
            "Just left J & G Motor Club and felt compelled to write a review.",
            "Great service at J & G Motor Club as always.",
            "Honestly, it's hard to find a good mechanic these days, but J & G is a gem.",
            "My experience at J & G Motor Club was outstanding from start to finish.",
            "I've been going to J & G for years and they never disappoint.",
            "If you need car trouble fixed, this is the place to go.",
            "Can't say enough good things about the team at J & G.",
            "Finally found a mechanic I can trust.",
        ];

        const serviceTemplates = [
            (s: string) => `I went in for a ${s} and the process was smooth and efficient.`,
            (s: string) => `Needed a ${s} and they got me in and out quickly.`,
            (s: string) => `The team handled my ${s} with great professionalism.`,
            (s: string) => `They took care of my ${s} faster than I expected.`,
            (s: string) => `Brought my car in for a ${s} and was impressed by their work.`,
            (s: string) => `Scheduled a ${s} and everything went perfectly.`,
        ];

        const qualityLines = [
            "The staff was friendly and transparent about the work.",
            "It's hard to find a mechanic you can trust, but these guys are the real deal.",
            "They explained everything clearly and didn't try to upsell me.",
            "Quality work at a fair price.",
            "Super professional and honest.",
            "They really care about their customers.",
            "The pricing was very reasonable for the quality of work.",
            "Everything was explained to me in detail so I knew exactly what was happening.",
            "No hidden fees or surprise charges, just good honest work.",
        ];

        const closings = [
            "I'll definitely be coming back for future service.",
            "If you need auto work in the area, this is the place to go.",
            "Five stars for the whole team!",
            "Thanks to J & G for keeping my car running smoothly.",
            "Highly recommended!",
            "A+ service.",
            "Will be recommending them to all my friends and family.",
            "Thank you J & G!",
            "Definitely my go-to shop from now on.",
        ];

        const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

        // Polishing user input
        let polishedExperience = experience ? experience.trim() : "";
        if (polishedExperience && !/[.!?]$/.test(polishedExperience)) polishedExperience += ".";

        // Randomize Structure
        const structureType = Math.floor(Math.random() * 3);
        let review = "";

        if (structureType === 0) {
            // Classic: Opener -> Service -> Experience -> Quality -> Closing
            const parts = [
                pick(openers),
                pick(serviceTemplates)(service),
                polishedExperience,
                pick(qualityLines),
                pick(closings)
            ];
            review = parts.filter(Boolean).join(" ");
        } else if (structureType === 1) {
            // Direct: Service -> Quality -> Experience -> Closing (No generic opener)
            const parts = [
                pick(serviceTemplates)(service),
                pick(qualityLines),
                polishedExperience,
                pick(closings)
            ];
            review = parts.filter(Boolean).join(" ");
        } else {
            // Experience Focused: Opener -> Experience -> Quality -> Service mention at end
            const parts = [
                pick(openers),
                polishedExperience,
                pick(qualityLines),
                "They really made the " + service + " an easy process."
            ];
            review = parts.filter(Boolean).join(" ");
        }

        return NextResponse.json({ review });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Failed to generate review" },
            { status: 500 }
        );
    }
}
