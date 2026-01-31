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
                <label htmlFor="review-result" className="text-lg font-serif text-slate-100 dark:text-slate-200">
                    Your Professional Review
                </label>
                <p className="text-sm text-slate-400">
                    We've polished your feedback! Feel free to edit anything below before posting.
                </p>

                <textarea
                    id="review-result"
                    className="flex min-h-[160px] w-full rounded-md border border-gold-500/30 bg-[#1a1a1a] px-4 py-3 text-base leading-relaxed text-slate-200 ring-offset-[#0F0F0F] placeholder:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
            </div>

            <div className="space-y-3">
                <button
                    onClick={handlePost}
                    className="group relative inline-flex h-14 w-full items-center justify-center rounded-md bg-gradient-to-r from-green-700 to-green-600 px-8 text-lg font-bold text-white shadow-lg shadow-green-900/20 transition-all hover:scale-[1.02] hover:shadow-green-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 disabled:pointer-events-none disabled:opacity-50 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
                    {hasPosted ? (
                        <>
                            <CheckCheck className="mr-2 h-6 w-6 text-gold-400" />
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
                    className="w-full text-sm text-slate-400 mt-4 hover:text-gold-400 underline flex items-center justify-center gap-1 transition-colors"
                >
                    <RefreshCw className="w-3 h-3" /> Start Over
                </button>
            </div>
        </div>
    );
};
