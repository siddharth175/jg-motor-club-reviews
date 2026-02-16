
// Standalone verification script
import { generateReview } from "./src/lib/reviewGenerator";


async function run() {
    console.log("--- Generating 100 reviews to check for duplicates ---");
    const reviews = new Set<string>();
    const total = 100;
    let duplicates = 0;

    for (let i = 0; i < total; i++) {
        const review = generateReview("Oil Change", "The waiting room was clean.");
        if (reviews.has(review)) {
            duplicates++;
            console.log(`[DUPLICATE FOUND]: ${review}`);
        } else {
            reviews.add(review);
        }
    }

    console.log(`\nResults:`);
    console.log(`Total Generated: ${total}`);
    console.log(`Unique Reviews: ${reviews.size}`);
    console.log(`Duplicates: ${duplicates}`);

    if (duplicates === 0) {
        console.log("SUCCESS: No duplicates found!");
    } else {
        console.log("WARNING: Duplicates detected.");
    }

    console.log("\n--- Sample of 5 Reviews ---");
    Array.from(reviews).slice(0, 5).forEach((r, i) => console.log(`[${i + 1}] ${r}\n`));
}


run();
