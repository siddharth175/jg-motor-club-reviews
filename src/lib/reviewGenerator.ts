
export const generateReview = (service: string, experience: string): string => {
    // We use a global variable to persist history across API routes in Next.js development
    if (!(global as any).reviewHistory) {
        (global as any).reviewHistory = new Set<string>();
        (global as any).historyQueue = [] as string[];
    }

    const maxHistoryCount = 2000;
    const historySet = (global as any).reviewHistory as Set<string>;
    const historyQueue = (global as any).historyQueue as string[];

    const createReview = (): string => {
        // SEPARATE OPENERS INTO GENERAL AND LOCATION-SPECIFIC
        const openersGeneral = [
            // Standard
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

            // Gen-Z vibe
            "lowkey the best spot in town.",
            "fr this place is goated.",
            "W mechanic. no cap.",
            "not them fixing my car in like 10 mins 😭",
            "it's giving reliable.",
            "the goat of local mechanics.",

            // Older Demographic
            "Good mechanic in town. Hard to find these days.",
            "Fast, easy in and out. Good people.",
            "Stopped in for the first time and I'm very impressed.",
            "A+ service from a good honest crew.",
            "Good honest mechanic in town.",
            "Back in my day it was hard to find a trustworthy shop, but these folks fit the bill.",

            // Professional 20-45 years
            "Super efficient. Dropped it off before work and picked it up after.",
            "Honestly just a hassle-free experience overall.",
            "My go-to spot now. Way better than the dealership.",
            "Five stars. Incredibly transparent pricing.",
            "Booking was easy, and the turnaround time was phenomenal."
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
            // Standard
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

            // Gen-Z vibe
            (s: string) => `needed a ${s} and they slayed.`,
            (s: string) => `slid in for a ${s} and they got it done super quick.`,
            (s: string) => `my car needed a ${s} and they understood the assignment.`,
            (s: string) => `got a ${s} and it didn't even break the bank.`,

            // Older Demographic
            (s: string) => `Came in for a ${s} and they took right care of it.`,
            (s: string) => `Got my ${s} sorted out without any fuss.`,
            (s: string) => `Needed a ${s} and they fixed it up right quick.`,
            (s: string) => `Brought her in for a ${s} and they did a bang-up job.`,

            // Professional 20-45 years
            (s: string) => `Booked a ${s} and the turnaround time was phenomenal.`,
            (s: string) => `Went in for a ${s} and they texted me updates the whole time.`,
            (s: string) => `The ${s} was handled perfectly and under budget.`,
            (s: string) => `Got a ${s} and they didn't try to tack on extra fees.`
        ];

        const qualityLines = [
            // Standard
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

            // Gen-Z vibe
            "vibes were immaculate.",
            "they didn't scam me, big W.",
            "S tier service tbh.",
            "literally so fast and easy.",
            "no red flags here.",
            "pass the vibe check for sure.",
            "mechanics usually give me anxiety but they were chill.",

            // Older Demographic
            "Reminds me of how businesses used to be run.",
            "Reasonable prices and no malarkey.",
            "Young men at the shop were very polite and respectful.",
            "Told them what was wrong, they fixed it. Simple as that.",
            "A square deal from honest folks.",
            "Excellent work from a good group of fellas.",

            // Professional 20-45 years
            "Great communication, they didn't try to upsell me.",
            "Solid team. Transparent pricing and clear explanations.",
            "Really appreciated the text updates.",
            "Very professional operation, highly recommend.",
            "They respect your budget and your time.",
            "Easy online booking and contactless payment made it a breeze."
        ];

        // SEPARATE CLOSINGS INTO GENERAL AND LOCATION-SPECIFIC
        const closingsGeneral = [
            // Standard
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

            // Gen-Z vibe
            "10/10 would recommend.",
            "never going anywhere else fr.",
            "big shoutout to the team.",
            "totally coming back.",
            "catch me here for my next oil change.",

            // Older Demographic
            "God bless this business.",
            "Will be telling my neighbors about them.",
            "Thank you kindly for the good work.",
            "Hard to find good people like this anymore.",
            "Keep up the good work, gentlemen.",

            // Professional 20-45 years
            "Will definitely use them again for future maintenance.",
            "Highly rate these guys.",
            "Saved me a trip to the dealer.",
            "Incredible value, will be back.",
            "Definitely adding them to my contacts."
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

        let polishedExperience = experience ? experience.trim() : "";
        if (polishedExperience && !/[.!?]$/.test(polishedExperience)) polishedExperience += ".";

        // Split customer experience for better integration
        const experienceSentences = polishedExperience
            .split(/[.!?]+/)
            .map(s => s.trim())
            .filter(s => s.length > 0)
            .map(s => s + ".");

        // --- SHUFFLE BAG LOGIC ---
        const getShuffleBag = <T>(id: string, arr: T[], resetIfEmpty = true): (() => T | undefined) => {
            // We use a global variable 'globalShuffleBags' rather than attaching to the function
            // because we are in a module scoped to the process. Route handlers in Next.js might 
            // recreate the module or use standard closures which persist.
            if (!(global as any).shuffleBags) {
                (global as any).shuffleBags = {};
            }

            const bags = (global as any).shuffleBags;

            if (!bags[id] || bags[id].length === 0) {
                // Shuffle copy of array
                bags[id] = [...arr].sort(() => Math.random() - 0.5);
            }

            return () => {
                if (bags[id].length === 0 && resetIfEmpty) {
                    bags[id] = [...arr].sort(() => Math.random() - 0.5);
                }
                return bags[id].pop();
            };
        };

        const nextOpenerGeneral = getShuffleBag<string>('openersGeneral', openersGeneral);
        const nextOpenerLocation = getShuffleBag<string>('openersLocation', openersLocation);
        const nextServiceTemplate = getShuffleBag<(s: string) => string>('serviceTemplates', serviceTemplates);
        const nextQualityLine = getShuffleBag<string>('qualityLines', qualityLines);
        const nextClosingGeneral = getShuffleBag<string>('closingsGeneral', closingsGeneral);
        const nextClosingLocation = getShuffleBag<string>('closingsLocation', closingsLocation);

        // Structure types 0 through 15
        const structureTypes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        const nextStructureType = getShuffleBag<number>('structureTypes', structureTypes);

        // --- LOGIC TO ENSURE ~50% LOCATION MENTION ---
        const shouldMentionLocation = Math.random() < 0.5; // Target: 50%
        let locationMentioned = false;

        // Helper to get an opener
        const getOpener = () => {
            if (shouldMentionLocation && !locationMentioned) {
                // 50% chance to do it in opener if we need to mention location
                if (Math.random() < 0.5) {
                    locationMentioned = true;
                    return nextOpenerLocation() as string;
                }
            }
            return nextOpenerGeneral() as string;
        };

        // Helper to get a closing
        const getClosing = () => {
            if (shouldMentionLocation && !locationMentioned) {
                // Must mention it now if we haven't yet
                locationMentioned = true;
                return nextClosingLocation() as string;
            }
            // If we already mentioned it, use general closing to avoid repetition
            // Or if we don't need to mention it, use general
            return nextClosingGeneral() as string;
        };
        // ---------------------------------------------

        // MORE STRUCTURE TYPES (increased from 6 to 10)
        const structureType = nextStructureType();
        let review = "";

        if (structureType === 0) {
            // Classic: Opener -> Service -> Experience -> Quality -> Closing
            const parts = [
                getOpener(),
                (nextServiceTemplate() as Function)(service),
                experienceSentences[0] || "",
                nextQualityLine(),
                getClosing()
            ];
            review = parts.filter(Boolean).join(" ");

        } else if (structureType === 1) {
            // Direct: Service -> Quality -> Experience -> Closing
            const parts = [
                (nextServiceTemplate() as Function)(service),
                experienceSentences[0] || "",
                nextQualityLine(),
                getClosing()
            ];
            review = parts.filter(Boolean).join(" ");

        } else if (structureType === 2) {
            // Experience Focused
            const parts = [
                getOpener(),
                experienceSentences[0] || "",
                nextQualityLine(),
                `They really made the ${service} an easy process.`,
                getClosing()
            ];
            review = parts.filter(Boolean).join(" ");

        } else if (structureType === 3) {
            // Short & Sweet (2-3 sentences)
            const parts = [
                (nextServiceTemplate() as Function)(service),
                experienceSentences[0] || nextQualityLine(),
                getClosing()
            ];
            review = parts.filter(Boolean).join(" ");

        } else if (structureType === 4) {
            // Detailed (use all customer sentences)
            const parts = [
                getOpener(),
                (nextServiceTemplate() as Function)(service),
                ...experienceSentences,
                nextQualityLine(),
                getClosing()
            ];
            review = parts.filter(Boolean).join(" ");

        } else if (structureType === 5) {
            // Recommendation-first
            const parts = [
                getClosing(),
                (nextServiceTemplate() as Function)(service),
                experienceSentences[0] || "",
                nextQualityLine()
            ];
            review = parts.filter(Boolean).join(" ");

        } else if (structureType === 6) {
            // Quality-first (NEW)
            const parts = [
                nextQualityLine(),
                (nextServiceTemplate() as Function)(service),
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
                nextQualityLine(),
                experienceSentences[0] || "",
                getClosing()
            ];
            review = parts.filter(Boolean).join(" ");

        } else if (structureType === 8) {
            // The "Concise Professional" (NEW)
            const parts = [
                (nextServiceTemplate() as Function)(service),
                "Professional, efficient, and fair.", // Hardcoded bridge for variety
                getClosing()
            ];
            review = parts.filter(Boolean).join(" ");

        } else if (structureType === 9) {
            // The "Enthusiastic" (NEW)
            const parts = [
                getOpener(),
                "Seriously, just go here.",
                (nextServiceTemplate() as Function)(service),
                getClosing()
            ];
            review = parts.filter(Boolean).join(" ");
        } else if (structureType === 10) {
            // Ultra short 1
            const parts = [getOpener()];
            review = parts.filter(Boolean).join(" ");
        } else if (structureType === 11) {
            // Ultra short 2
            const parts = [nextQualityLine()];
            review = parts.filter(Boolean).join(" ");
        } else if (structureType === 12) {
            // Ultra short 3
            const parts = [(nextServiceTemplate() as Function)(service)];
            review = parts.filter(Boolean).join(" ");
        } else if (structureType === 13) {
            // Long and rambling
            const parts = [
                getOpener(),
                ...experienceSentences,
                (nextServiceTemplate() as Function)(service),
                nextQualityLine(),
                "I honestly couldn't be happier with how it turned out.",
                getClosing()
            ];
            review = parts.filter(Boolean).join(" ");
        } else if (structureType === 14) {
            // Very detailed
            let intro = shouldMentionLocation && !locationMentioned ? nextOpenerLocation() as string : nextOpenerGeneral() as string;
            const parts = [
                intro,
                "They were super professional right from the start.",
                (nextServiceTemplate() as Function)(service),
                ...experienceSentences,
                nextQualityLine(),
                "It's really refreshing to see this level of dedication.",
                getClosing()
            ];
            review = parts.filter(Boolean).join(" ");
        } else {
            // Casual narrative
            const parts = [
                "So I was looking for a spot to get some work done.",
                (nextServiceTemplate() as Function)(service),
                nextQualityLine(),
                ...experienceSentences,
                "Turned out to be a great choice.",
                getClosing()
            ];
            review = parts.filter(Boolean).join(" ");
        }

        // Post-processing for human-like random variation
        const postProcess = (text: string): string => {
            let processed = text.replace(/\s+/g, ' ').trim();
            const variationType = Math.random();

            if (variationType < 0.15) {
                // All lowercase, Gen Z / casual style
                processed = processed.toLowerCase();
                processed = processed.replace(/\./g, '');
            } else if (variationType < 0.25) {
                // EXTREME ENTHUSIASM
                processed = processed.replace(/\./g, '!');
                if (!processed.endsWith('!')) processed += '!!!';
            } else if (variationType < 0.35) {
                // very casual
                processed = processed.replace(/\band\b/gi, '&');
                processed = processed.replace(/\byou\b/gi, 'u');
                processed = processed.replace(/\bare\b/gi, 'r');
                processed = processed.replace(/\bdefinitely\b/gi, 'def');
                processed = processed.toLowerCase();
            } else if (variationType < 0.45) {
                // Remove trailing punctuation
                processed = processed.replace(/[.!?]$/, '');
            } else if (variationType < 0.55) {
                // Add some leading filler
                const fillers = ["Honestly, ", "Tbh ", "Wow. ", "Okay so, ", "Man, ", "Just gonna say, "];
                const filler = fillers[Math.floor(Math.random() * fillers.length)];
                processed = filler + processed.charAt(0).toLowerCase() + processed.slice(1);
            } else if (variationType < 0.65) {
                // Typo injection or missing apostrophes
                processed = processed.replace(/I'm/g, 'Im').replace(/don't/g, 'dont').replace(/didn't/g, 'didnt').replace(/it's/ig, 'its');
            } else if (variationType < 0.70) {
                // UPPERCASE (angry/super excited) but only sometimes
                processed = processed.toUpperCase();
            }

            // Sometimes add a random emoji for flavor if it fits
            if (Math.random() < 0.15) {
                const emojis = ['🔥', '💯', '🙏', '🙌', '🚗', '👍', '👌', '😎', '⭐', '⭐⭐⭐⭐⭐', '🛠️', '✨'];
                const emoji = emojis[Math.floor(Math.random() * emojis.length)];
                processed += ` ${emoji}`;
            }

            return processed;
        };

        return postProcess(review);
    };

    let attempt = 0;
    const maxAttempts = 200;
    let finalReview = "";

    // Attempt to generate a unique review
    while (attempt < maxAttempts) {
        finalReview = createReview();

        if (!historySet.has(finalReview)) {
            // Unique review found! Break loop.
            break;
        }

        attempt++;
    }

    // Add to global history
    historySet.add(finalReview);
    historyQueue.push(finalReview);

    // Limit history size to prevent arbitrary memory growth and allow cycles eventually
    if (historyQueue.length > maxHistoryCount) {
        const oldestReview = historyQueue.shift();
        if (oldestReview) {
            historySet.delete(oldestReview);
        }
    }

    return finalReview;
};
