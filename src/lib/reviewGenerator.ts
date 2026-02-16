
export const generateReview = (service: string, experience: string): string => {
    // SEPARATE OPENERS INTO GENERAL AND LOCATION-SPECIFIC
    const openersGeneral = [
        "Just left J & G Motor Club and felt compelled to write a review.",
        "Great service at J & G Motor Club as always.",
        "Honestly, it's hard to find a good mechanic these days, but J & G is a gem.",
        "My experience at J & G Motor Club was outstanding from start to finish.",
        "Can't say enough good things about the team at J & G.",
        "Finally found a mechanic I can trust.",
        "Been taking my car here for months - consistently great.",
        "Friend recommended J & G and I'm so glad I listened.",
        "No BS, just honest work at J & G.",
        "Best automotive service I've had in years.",
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
        "Small shop, big results.",
        "I don't usually write reviews, but J & G deserves it.",
        "Service was above and beyond what I expected.",
        "J & G Motor Club is a hidden treasure.",
        "The team at J & G really knows their stuff.",
        "So happy I found this place.",
        "Exceptional service from start to finish.",
        "Reliable, honest, and skilled - hard to beat.",
        "J & G saved the day!",
        "Nothing but praise for J & G Motor Club.",
        "They made a stressful situation easy.",
        "Always a pleasure dealing with J & G.",
        "Car runs better than ever thanks to J & G.",
        "If you want it done right, go to J & G.",
        "Impressive service and expertise.",
        "J & G sets the bar for mechanics.",
        "Grateful for the honest advice and great work.",
        "The best car care experience I've had.",
        "J & G earned my trust immediately.",
    ];

    const openersLocation = [
        "I recently brought my car to J & G Motor Club in Chatham and had a fantastic experience.",
        "Highly recommend J & G Motor Club! Best place in Chatham for auto repair.",
        "I've been going to J & G in Chatham for years and they never disappoint.",
        "If you need car trouble fixed, this is the best place in Chatham to go.",
        "After trying several mechanics in the area, J & G stands out.",
        "Quick stop turned into finding my permanent shop in Chatham.",
        "Local gem right here in Chatham.",
        "Chatham locals know - J & G is the spot.",
        "Found my new go-to mechanic in Chatham.",
        "Top-notch auto repair in Chatham.",
    ];

    const serviceTemplates = [
        (s: string) => `I went in for a ${s} and the process was smooth and efficient.`,
        (s: string) => `Needed a ${s} and they got me in and out quickly.`,
        (s: string) => `The team handled my ${s} with great professionalism.`,
        (s: string) => `They took care of my ${s} faster than I expected.`,
        (s: string) => `Brought my car in for a ${s} and was impressed by their work.`,
        (s: string) => `Scheduled a ${s} and everything went perfectly.`,
        (s: string) => `My ${s} was done right the first time.`,
        (s: string) => `Got a ${s} and the quality shows.`,
        (s: string) => `They explained my ${s} thoroughly before starting.`,
        (s: string) => `${s} completed ahead of schedule.`,
        (s: string) => `Fair price for my ${s} compared to quotes elsewhere.`,
        (s: string) => `The ${s} was exactly what my car needed.`,
        (s: string) => `Dropped off for ${s}, picked up good as new.`,
        (s: string) => `Emergency ${s} handled without hassle.`,
        (s: string) => `They made the ${s} painless.`,
        (s: string) => `Quick and easy ${s}.`,
        (s: string) => `Best ${s} I've had.`,
        (s: string) => `They really know their way around a ${s}.`,
        (s: string) => `Very satisfied with the ${s}.`,
        (s: string) => `${s} was performed flawlessly.`,
        (s: string) => `I was worried about the ${s} but they made it simple.`,
        (s: string) => `Expert handling of my ${s}.`,
        (s: string) => `Top quality ${s}.`,
        (s: string) => `Reasonable time and cost for a ${s}.`,
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
        "Definitely a good mechanic you can rely on.",
        "Knowledgeable and courteous staff.",
        "They went the extra mile.",
        "Fair, fast, and friendly.",
        "The waiting room was comfortable and clean.",
        "They genuinely care about getting you back on the road safely.",
        "Honest diagnostics and solid repairs.",
        "A truly professional operation.",
        "Refreshing to find such integrity in a shop.",
        "Excellent communication throughout the process.",
        "They didn't push any unnecessary services.",
        "The work stands for itself.",
        "Good value for the money.",
        "I felt prioritized and respected.",
        "They exceeded my expectations.",
        "Efficient and skilled team.",
        "No surprises on the bill.",
        "Just a great group of people.",
    ];

    // SEPARATE CLOSINGS INTO GENERAL AND LOCATION-SPECIFIC
    const closingsGeneral = [
        "I'll definitely be coming back for future service.",
        "Five stars for the whole team!",
        "Thanks to J & G for keeping my car running smoothly.",
        "Highly recommended!",
        "A+ service.",
        "Will be recommending them to all my friends and family.",
        "Thank you J & G!",
        "Definitely my go-to shop from now on.",
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
        "So glad I found them.",
        "They have a customer for life.",
        "Don't hesitate to give them a call.",
        "A wonderful experience overall.",
        "Two thumbs up!",
        "Thanks again for the great work.",
        "I'll be sending everyone I know here.",
        "Simply the best.",
        "Couldn't ask for better service.",
        "See you guys next time.",
        "Ranked #1 in my book.",
        "A perfect 10/10.",
        "Grateful for their help.",
        "Highly satisfied.",
    ];

    const closingsLocation = [
        "If you need auto work in Chatham, this is the place to go.",
        "Best place in Chatham for sure.",
        "Nice to have a reliable mechanic nearby in Chatham.",
        "For anyone in Chatham looking for a mechanic, J & G is it.",
        "Proud to support this Chatham business.",
        "The go-to spot for Chatham drivers.",
        "Glad to have them here in Chatham.",
        "Chatham is lucky to have J & G.",
        "Best auto shop in the Chatham area.",
        "Worth the trip from anywhere in Chatham.",
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

    // --- LOGIC TO ENSURE ~50% LOCATION MENTION ---
    const shouldMentionLocation = Math.random() < 0.5; // Target: 50%
    let locationMentioned = false;

    // Helper to get an opener
    const getOpener = () => {
        if (shouldMentionLocation && !locationMentioned) {
            // 50% chance to do it in opener if we need to mention location
            if (Math.random() < 0.5) {
                locationMentioned = true;
                return pick(openersLocation);
            }
        }
        return pick(openersGeneral);
    };

    // Helper to get a closing
    const getClosing = () => {
        if (shouldMentionLocation && !locationMentioned) {
            // Must mention it now if we haven't yet
            locationMentioned = true;
            return pick(closingsLocation);
        }
        // If we already mentioned it, use general closing to avoid repetition
        // Or if we don't need to mention it, use general
        return pick(closingsGeneral);
    };
    // ---------------------------------------------

    // MORE STRUCTURE TYPES (increased from 6 to 10)
    const structureType = Math.floor(Math.random() * 10);
    let review = "";

    if (structureType === 0) {
        // Classic: Opener -> Service -> Experience -> Quality -> Closing
        const parts = [
            getOpener(),
            pick(serviceTemplates)(service),
            experienceSentences[0] || "",
            pick(qualityLines),
            getClosing()
        ];
        review = parts.filter(Boolean).join(" ");

    } else if (structureType === 1) {
        // Direct: Service -> Quality -> Experience -> Closing
        const parts = [
            pick(serviceTemplates)(service),
            experienceSentences[0] || "",
            pick(qualityLines),
            getClosing()
        ];
        review = parts.filter(Boolean).join(" ");

    } else if (structureType === 2) {
        // Experience Focused
        const parts = [
            getOpener(),
            experienceSentences[0] || "",
            pick(qualityLines),
            `They really made the ${service} an easy process.`,
            getClosing()
        ];
        review = parts.filter(Boolean).join(" ");

    } else if (structureType === 3) {
        // Short & Sweet (2-3 sentences)
        const parts = [
            pick(serviceTemplates)(service),
            experienceSentences[0] || pick(qualityLines),
            getClosing()
        ];
        review = parts.filter(Boolean).join(" ");

    } else if (structureType === 4) {
        // Detailed (use all customer sentences)
        const parts = [
            getOpener(),
            pick(serviceTemplates)(service),
            ...experienceSentences,
            pick(qualityLines),
            getClosing()
        ];
        review = parts.filter(Boolean).join(" ");

    } else if (structureType === 5) {
        // Recommendation-first
        const parts = [
            getClosing(),
            pick(serviceTemplates)(service),
            experienceSentences[0] || "",
            pick(qualityLines)
        ];
        review = parts.filter(Boolean).join(" ");

    } else if (structureType === 6) {
        // Quality-first (NEW)
        const parts = [
            pick(qualityLines),
            pick(serviceTemplates)(service),
            experienceSentences[0] || "",
            getClosing()
        ];
        review = parts.filter(Boolean).join(" ");

    } else if (structureType === 7) {
        // The "Hybrid" (NEW) - Mixes opener and service in reverse
        // Custom opener here, so check location manually
        let hybridOpener = `I decided to try J & G for a ${service} and I'm glad I did.`;
        if (shouldMentionLocation && !locationMentioned && Math.random() < 0.5) {
            hybridOpener = `I decided to try J & G in Chatham for a ${service} and I'm glad I did.`;
            locationMentioned = true;
        }

        const parts = [
            hybridOpener,
            pick(qualityLines),
            experienceSentences[0] || "",
            getClosing()
        ];
        review = parts.filter(Boolean).join(" ");

    } else if (structureType === 8) {
        // The "Concise Professional" (NEW)
        const parts = [
            pick(serviceTemplates)(service),
            "Professional, efficient, and fair.", // Hardcoded bridge for variety
            getClosing()
        ];
        review = parts.filter(Boolean).join(" ");

    } else {
        // The "Enthusiastic" (NEW)
        const parts = [
            getOpener(),
            "Seriously, just go here.",
            pick(serviceTemplates)(service),
            getClosing()
        ];
        review = parts.filter(Boolean).join(" ");
    }

    return review;
};
