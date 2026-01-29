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
                    <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 dark:text-slate-300">
                        Name <span className="text-slate-500 font-normal">(Optional)</span>
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="flex h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-blue-500"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isLoading}
                    />
                </div>

                {/* Service Dropdown */}
                <div className="space-y-2">
                    <label htmlFor="service" className="text-sm font-medium leading-none text-slate-700 dark:text-slate-300">
                        Service Received
                    </label>
                    <div className="relative">
                        <select
                            id="service"
                            className="flex h-12 w-full appearance-none rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:focus-visible:ring-blue-500"
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            disabled={isLoading}
                        >
                            {SERVICES.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                        {/* Custom arrow could go here, relying on browser default for simplicity/reliability */}
                    </div>
                </div>

                {/* Experience Textarea */}
                <div className="space-y-2">
                    <label htmlFor="experience" className="text-sm font-medium leading-none text-slate-700 dark:text-slate-300">
                        Your Experience
                    </label>
                    <textarea
                        id="experience"
                        className="flex min-h-[120px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-blue-500"
                        placeholder="Example: Great service, fast oil change. The team was friendly."
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        disabled={isLoading}
                    />
                    {error && <p className="text-sm text-red-500 font-medium animate-pulse">{error}</p>}
                </div>
            </div>

            <button
                type="submit"
                className="inline-flex h-12 w-full items-center justify-center rounded-md bg-blue-600 px-8 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:pointer-events-none disabled:opacity-50"
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Writing Review...
                    </>
                ) : (
                    <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Generate Amazing Review
                    </>
                )}
            </button>
        </form>
    );
};
