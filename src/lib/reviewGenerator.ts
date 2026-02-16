
export const generateReview = (service: string, experience: string): string => {
    // Expanded library of components with specific Chatham/Mechanic references
    const openers = [
        "I recently brought my car to J & G Motor Club in Chatham and had a fantastic experience.",
        "Highly recommend J & G Motor Club! Best place in Chatham for auto repair.",
        "Just left J & G Motor Club and felt compelled to write a review.",
        "Great service at J & G Motor Club as always.",
        "Honestly, it's hard to find a good mechanic these days, but J & G is a gem.",
        "My experience at J & G Motor Club was outstanding from start to finish.",
        "I've been going to J & G in Chatham for years and they never disappoint.",
        "If you need car trouble fixed, this is the best place in Chatham to go.",
        "Can't say enough good things about the team at J & G.",
        "Finally found a mechanic I can trust.",
        "After trying several mechanics in the area, J & G stands out as a good mechanic.",
        "Been taking my car here for months - consistently great.",
        "Friend recommended J & G and I'm so glad I listened.",
        "Quick stop turned into finding my permanent shop in Chatham.",
        "Local gem right here in Chatham.",
        "No BS, just honest work at J & G.",
        "Skeptical at first but J & G proved they are a good mechanic.",
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
        "Small shop, big results.",
        "I don't usually write reviews, but J & G deserves it.",
        "Found my new go-to mechanic in Chatham.",
        "Service was above and beyond what I expected.",
        "J & G Motor Club is a hidden treasure.",
        "The team at J & G really knows their stuff.",
        "So happy I found this place.",
        "Exceptional service from start to finish.",
        "Reliable, honest, and skilled - hard to beat.",
        "J & G saved the day!",
        "Top-notch auto repair in Chatham.",
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
        "This is why they are the best place in Chatham.",
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

    const closings = [
        "I'll definitely be coming back for future service.",
        "If you need auto work in Chatham, this is the place to go.",
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
        "Best place in Chatham for sure.",
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
        "Nice to have a reliable mechanic nearby.",
        "Highly satisfied.",
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

    // MORE STRUCTURE TYPES (increased from 6 to 10)
    const structureType = Math.floor(Math.random() * 10);
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
        // Short & Sweet (2-3 sentences)
        const parts = [
            pick(serviceTemplates)(service),
            experienceSentences[0] || pick(qualityLines),
            pick(closings)
        ];
        review = parts.filter(Boolean).join(" ");

    } else if (structureType === 4) {
        // Detailed (use all customer sentences)
        const parts = [
            pick(openers),
            pick(serviceTemplates)(service),
            ...experienceSentences,
            pick(qualityLines),
            pick(closings)
        ];
        review = parts.filter(Boolean).join(" ");

    } else if (structureType === 5) {
        // Recommendation-first
        const parts = [
            pick(closings),
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
            pick(closings)
        ];
        review = parts.filter(Boolean).join(" ");

    } else if (structureType === 7) {
        // The "Hybrid" (NEW) - Mixes opener and service in reverse
        const parts = [
            `I decided to try J & G for a ${service} and I'm glad I did.`,
            pick(qualityLines),
            experienceSentences[0] || "",
            pick(closings)
        ];
        review = parts.filter(Boolean).join(" ");

    } else if (structureType === 8) {
        // The "Concise Professional" (NEW)
        const parts = [
            pick(serviceTemplates)(service),
            "Professional, efficient, and fair.", // Hardcoded bridge for variety
            pick(closings)
        ];
        review = parts.filter(Boolean).join(" ");

    } else {
        // The "Enthusiastic" (NEW)
        const parts = [
            pick(openers),
            "Seriously, just go here.",
            pick(serviceTemplates)(service),
            pick(closings)
        ];
        review = parts.filter(Boolean).join(" ");
    }

    return review;
};
