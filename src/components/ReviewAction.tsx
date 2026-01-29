"use client";

import React, { useState } from "react";
import { CheckCheck, Copy, ExternalLink, RefreshCw } from "lucide-react";
import { getGoogleReviewUrl } from "@/lib/google-url";

interface ReviewActionProps {
    initialReview: string;
    onReset: () => void;
}

export const ReviewAction: React.FC<ReviewActionProps> = ({
    initialReview,
    onReset,
}) => {
    const [review, setReview] = useState(initialReview);
    const [hasPosted, setHasPosted] = useState(false);

    const handlePost = async () => {
        // 1. Copy to clipboard
        try {
            await navigator.clipboard.writeText(review);
            setHasPosted(true);

            // 2. Open Google Review URL in new tab
            // Slight delay to allow user to register the "Copy" action mentally
            setTimeout(() => {
                window.open(getGoogleReviewUrl(), "_blank");
            }, 800);

        } catch (err) {
            console.error("Failed to copy:", err);
            // Fallback if clipboard fails: still open the URL
            window.open(getGoogleReviewUrl(), "_blank");
            alert("We couldn't copy the text automatically. Please select the text and copy it manually.");
        }
    };

    return (
        <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
                <label htmlFor="review-result" className="text-lg font-semibold leading-none text-slate-800 dark:text-slate-200">
                    Your Professional Review
                </label>
                <p className="text-sm text-slate-500">
                    We've polished your feedback! Feel free to edit anything below before posting.
                </p>

                <textarea
                    id="review-result"
                    className="flex min-h-[160px] w-full rounded-md border border-blue-200 bg-blue-50/50 px-4 py-3 text-base leading-relaxed text-slate-800 ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:ring-offset-slate-950 dark:focus-visible:ring-blue-500"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
            </div>

            <div className="space-y-3">
                <button
                    onClick={handlePost}
                    className="inline-flex h-14 w-full items-center justify-center rounded-md bg-green-600 px-8 text-lg font-bold text-white shadow-lg shadow-green-600/20 transition-all hover:bg-green-700 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 disabled:pointer-events-none disabled:opacity-50"
                >
                    {hasPosted ? (
                        <>
                            <CheckCheck className="mr-2 h-6 w-6" />
                            Copied! Opening Google...
                        </>
                    ) : (
                        <>
                            <ExternalLink className="mr-2 h-6 w-6" />
                            Post to Google
                        </>
                    )}
                </button>

                <p className="text-xs text-center text-slate-500 px-4">
                    Clicking will copy this text and open J & G Motor Club's Google page. Just paste it there!
                </p>

                <button
                    onClick={onReset}
                    className="w-full text-sm text-slate-500 mt-4 hover:text-slate-800 underline flex items-center justify-center gap-1"
                >
                    <RefreshCw className="w-3 h-3" /> Start Over
                </button>
            </div>
        </div>
    );
};
