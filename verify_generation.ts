
// Standalone verification script
import { generateReview } from "./src/lib/reviewGenerator";


async function run() {
    console.log("--- Generating 100 reviews to check for duplicates and location mentions ---");
    const reviews = new Set<string>();
    const total = 100;
    let duplicates = 0;
    let chathamCount = 0;

    for (let i = 0; i < total; i++) {
        const review = generateReview("Oil Change", "The waiting room was clean.");
        if (reviews.has(review)) {
            duplicates++;
            // console.log(`[DUPLICATE FOUND]: ${review}`);
        } else {
            reviews.add(review);
        }

        if (review.toLowerCase().includes("chatham")) {
            chathamCount++;
        }
    }

    console.log(`\nResults:`);
    console.log(`Total Generated: ${total}`);
    console.log(`Unique Reviews: ${reviews.size}`);
    console.log(`Duplicates: ${duplicates}`);
    console.log(`Reviews mentioning 'Chatham': ${chathamCount}`);
    console.log(`Location Mention Rate: ${chathamCount}%`);

    if (duplicates === 0) {
        console.log("SUCCESS: No duplicates found!");
    } else {
        console.log("WARNING: Duplicates detected.");
    }

    if (chathamCount >= 40 && chathamCount <= 60) {
        console.log("SUCCESS: Location frequency is within target range (40-60%).");
    } else {
        console.log("WARNING: Location frequency is outside target range.");
    }

    console.log("\n--- Sample of 5 Reviews ---");
    Array.from(reviews).slice(0, 5).forEach((r, i) => console.log(`[${i + 1}] ${r}\n`));
}


run();
