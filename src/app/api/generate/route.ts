import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, service, experience } = body as { name: string; service: string; experience: string };

        await new Promise((resolve) => setTimeout(resolve, 1500));

        // EXPANDED TEMPLATES (3x more variety)
        const openers = [
            // Your original 10...
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

            // NEW ADDITIONS:
            "After trying several mechanics in the area, J & G stands out.",
            "Been taking my car here for months - consistently great.",
            "Friend recommended J & G and I'm so glad I listened.",
            "Quick stop turned into finding my permanent shop.",
            "Local gem right here in Chatham.",
            "No BS, just honest work at J & G.",
            "Skeptical at first but J & G proved me wrong.",
            "Best automotive service I've had in years.",
            "Chatham locals know - J & G is the spot.",
            "Needed help fast and J & G delivered.",
            "Clean shop, fair prices, great work.",
            "My whole family goes to J & G now.",
            "Stopped by on a whim - best decision.",
            "Finally a mechanic who doesn't oversell.",
            "J & G keeps my car running like new.",
            "Trustworthy team at J & G Motor Club.",
            "These guys actually care about their car.",
            "No more mechanic anxiety thanks to J & G.",
            "Professional service without the corporate feel.",
            "Small shop, big results."
        ];

        const serviceTemplates = [
            (s: string) => `I went in for a ${s} and the process was smooth and efficient.`,
            (s: string) => `Needed a ${s} and they got me in and out quickly.`,
            (s: string) => `The team handled my ${s} with great professionalism.`,
            (s: string) => `They took care of my ${s} faster than I expected.`,
            (s: string) => `Brought my car in for a ${s} and was impressed by their work.`,
            (s: string) => `Scheduled a ${s} and everything went perfectly.`,

            // NEW:
            (s: string) => `My ${s} was done right the first time.`,
            (s: string) => `Got a ${s} and the quality shows.`,
            (s: string) => `They explained my ${s} thoroughly before starting.`,
            (s: string) => `${s} completed ahead of schedule.`,
            (s: string) => `Fair price for my ${s} compared to quotes elsewhere.`,
            (s: string) => `The ${s} was exactly what my car needed.`,
            (s: string) => `Dropped off for ${s}, picked up good as new.`,
            (s: string) => `Emergency ${s} handled without hassle.`,
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

            // NEW:
            "Felt like I was talking to a friend, not a salesperson.",
            "They showed me exactly what needed fixing.",
            "Straightforward pricing with no games.",
            "Workmanship you can count on.",
            "Attention to detail is impressive.",
            "They treat every car like it's their own.",
            "Communication was clear from start to finish.",
            "Got a text when my car was ready.",
            "Clean waiting area and friendly atmosphere.",
            "They respect your time and budget.",
            "Old-school customer service done right.",
            "Won't go anywhere else from now on.",
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

            // NEW:
            "You won't regret choosing J & G.",
            "Support this local business - they're worth it.",
            "Earned a loyal customer today.",
            "See you at the next oil change!",
            "Keep up the great work J & G!",
            "My car and wallet are both happy.",
            "This is how car service should be.",
            "Already scheduled my next appointment.",
            "Tell your friends about J & G.",
            "Easy 5 stars.",
        ];

        const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

        let polishedExperience = experience ? experience.trim() : "";
        if (polishedExperience && !/[.!?]$/.test(polishedExperience)) polishedExperience += ".";

        // Split customer experience for better integration
        const experienceSentences = polishedExperience
            .split(/[.!?]+/)
            .map(s => s.trim())
            .filter(s => s.length > 0)
            .map(s => s + ".");

        // MORE STRUCTURE TYPES (increased from 3 to 6)
        const structureType = Math.floor(Math.random() * 6);
        let review = "";

        if (structureType === 0) {
            // Classic: Opener -> Service -> Experience -> Quality -> Closing
            const parts = [
                pick(openers),
                pick(serviceTemplates)(service),
                experienceSentences[0] || "",
                pick(qualityLines),
                pick(closings)
            ];
            review = parts.filter(Boolean).join(" ");

        } else if (structureType === 1) {
            // Direct: Service -> Quality -> Experience -> Closing
            const parts = [
                pick(serviceTemplates)(service),
                experienceSentences[0] || "",
                pick(qualityLines),
                pick(closings)
            ];
            review = parts.filter(Boolean).join(" ");

        } else if (structureType === 2) {
            // Experience Focused
            const parts = [
                pick(openers),
                experienceSentences[0] || "",
                pick(qualityLines),
                `They really made the ${service} an easy process.`,
                pick(closings)
            ];
            review = parts.filter(Boolean).join(" ");

        } else if (structureType === 3) {
            // NEW: Short & Sweet (2-3 sentences)
            const parts = [
                pick(serviceTemplates)(service),
                experienceSentences[0] || pick(qualityLines),
                pick(closings)
            ];
            review = parts.filter(Boolean).join(" ");

        } else if (structureType === 4) {
            // NEW: Detailed (use all customer sentences)
            const parts = [
                pick(openers),
                pick(serviceTemplates)(service),
                ...experienceSentences,
                pick(qualityLines),
                pick(closings)
            ];
            review = parts.filter(Boolean).join(" ");

        } else {
            // NEW: Recommendation-first
            const parts = [
                pick(closings),
                pick(serviceTemplates)(service),
                experienceSentences[0] || "",
                pick(qualityLines)
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
