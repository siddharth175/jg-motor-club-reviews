"use client";

import React, { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

const SERVICES = [
    "Oil Change",
    "Brake Service",
    "Tire Service",
    "State Inspection",
    "Engine Repair",
    "Suspension Work",
    "General Maintenance",
    "Other",
] as const;

export type ReviewData = {
    name: string;
    service: string;
    experience: string;
    rating: number; // defaulting to 5 internal
    mode: "ai"; // locked to ai
};

interface ReviewFormProps {
    onGenerate: (data: ReviewData) => void;
    isLoading: boolean;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
    onGenerate,
    isLoading,
}) => {

    const [service, setService] = useState<string>(SERVICES[0]);
    const [experience, setExperience] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!experience.trim()) {
            setError("Please share a bit about your experience so we can help write your review!");
            return;
        }

        // Always defaults to 5 stars, AI mode, and no name now
        onGenerate({ name: "", service, experience, rating: 5, mode: "ai" });
    };

    const addTag = (tag: string) => {
        setExperience((prev) => prev + (prev ? " " : "") + tag + ".");
    };

    return (
        <div className="flex flex-col w-full">
            {/* FULL WIDTH FORM */}
            <form onSubmit={handleSubmit} className="w-full space-y-8">
                <div className="space-y-6 bg-[#161616] p-6 rounded-xl border border-white/5">

                    <div className="space-y-4">
                        {/* Name & Service Row */}

                        <div className="space-y-2">
                            <label htmlFor="service" className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                                Service
                            </label>
                            <div className="relative">
                                <select
                                    id="service"
                                    className="flex h-10 w-full appearance-none rounded-md border border-white/10 bg-[#0a0a0a] px-3 text-sm text-slate-200 focus:border-gold-500/50 focus:outline-none focus:ring-1 focus:ring-gold-500/50 transition-all"
                                    value={service}
                                    onChange={(e) => setService(e.target.value)}
                                    disabled={isLoading}
                                >
                                    {SERVICES.map((s) => (
                                        <option key={s} value={s} className="bg-[#0a0a0a] text-slate-200">
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Experience Area */}
                        <div className="space-y-2">
                            <label htmlFor="experience" className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                                What details should we include?
                            </label>

                            <div className="relative group">
                                <textarea
                                    id="experience"
                                    className="flex min-h-[220px] w-full rounded-md border border-white/10 bg-[#0a0a0a] px-4 py-4 text-base text-slate-200 placeholder:text-slate-600 focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all resize-none shadow-inner"
                                    placeholder="Ex: Fast service, Mike was helpful..."
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Quick Tags */}
                            <div className="flex flex-wrap gap-2">
                                {[
                                    "Fast Service",
                                    "Friendly Team",
                                    "Fair Price",
                                    "Clean Shop",
                                    "Professional Staff",
                                    "Honest Mechanics",
                                    "Great Communication",
                                    "Trustworthy",
                                    "Quality Work",
                                    "Highly Recommended"
                                ].map(tag => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => addTag(tag)}
                                        className="text-[10px] font-medium bg-[#222] text-slate-400 px-2 py-1 rounded-md border border-white/5 hover:border-gold-500/30 hover:text-gold-400 transition-colors"
                                    >
                                        + {tag}
                                    </button>
                                ))}
                            </div>

                            {error && <p className="text-sm text-red-400 font-medium animate-pulse">{error}</p>}
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="group relative inline-flex h-14 w-full items-center justify-center rounded-xl px-8 text-base font-bold shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50 overflow-hidden bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-black shadow-gold-900/20 hover:shadow-gold-500/20"
                    disabled={isLoading}
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Magic in progress...
                        </>
                    ) : (
                        <>
                            <Sparkles className="mr-2 h-5 w-5" />
                            Generate Amazing Review
                        </>
                    )}
                </button>
            </form>

        </div>
    );
};
