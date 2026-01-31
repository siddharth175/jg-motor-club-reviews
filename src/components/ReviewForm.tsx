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
};

interface ReviewFormProps {
    onGenerate: (data: ReviewData) => void;
    isLoading: boolean;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
    onGenerate,
    isLoading,
}) => {
    const [name, setName] = useState("");
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

        onGenerate({ name, service, experience });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="space-y-4">
                {/* Name Field */}
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium leading-none text-slate-300">
                        Name <span className="text-slate-500 font-normal">(Optional)</span>
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="flex h-12 w-full rounded-md border border-gold-500/30 bg-[#1a1a1a] px-3 py-2 text-sm text-slate-200 ring-offset-[#0F0F0F] placeholder:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 focus:border-gold-500/60"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isLoading}
                    />
                </div>

                {/* Service Dropdown */}
                <div className="space-y-2">
                    <label htmlFor="service" className="text-sm font-medium leading-none text-slate-300">
                        Service Received
                    </label>
                    <div className="relative">
                        <select
                            id="service"
                            className="flex h-12 w-full appearance-none rounded-md border border-gold-500/30 bg-[#1a1a1a] px-3 py-2 text-sm text-slate-200 ring-offset-[#0F0F0F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 focus:border-gold-500/60"
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            disabled={isLoading}
                        >
                            {SERVICES.map((s) => (
                                <option key={s} value={s} className="bg-[#1a1a1a] text-slate-200">
                                    {s}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gold-500/70">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Experience Textarea */}
                <div className="space-y-2">
                    <label htmlFor="experience" className="text-sm font-medium leading-none text-slate-300">
                        Your Experience
                    </label>
                    <textarea
                        id="experience"
                        className="flex min-h-[120px] w-full rounded-md border border-gold-500/30 bg-[#1a1a1a] px-3 py-2 text-sm text-slate-200 ring-offset-[#0F0F0F] placeholder:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 focus:border-gold-500/60"
                        placeholder="Example: Great service, fast oil change. The team was friendly."
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        disabled={isLoading}
                    />
                    {error && <p className="text-sm text-red-400 font-medium animate-pulse">{error}</p>}
                </div>
            </div>

            <button
                type="submit"
                className="group relative inline-flex h-12 w-full items-center justify-center rounded-md bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 px-8 text-base font-bold text-[#0a0a0a] shadow-lg shadow-gold-900/20 transition-all hover:scale-[1.02] hover:shadow-gold-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 disabled:pointer-events-none disabled:opacity-50 overflow-hidden"
                disabled={isLoading}
            >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin text-[#0a0a0a]" />
                        Writing Review...
                    </>
                ) : (
                    <>
                        <Sparkles className="mr-2 h-5 w-5 text-[#0a0a0a]" />
                        Generate Amazing Review
                    </>
                )}
            </button>
        </form>
    );
};
