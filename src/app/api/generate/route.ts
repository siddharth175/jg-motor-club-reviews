import { NextResponse } from "next/server";
import { generateReview } from "@/lib/reviewGenerator";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, service, experience } = body as { name: string; service: string; experience: string };

        await new Promise((resolve) => setTimeout(resolve, 1500));

        // EXPANDED TEMPLATES (3x more variety)

        const review = generateReview(service as string, experience as string);


        return NextResponse.json({ review });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Failed to generate review" },
            { status: 500 }
        );
    }
}
