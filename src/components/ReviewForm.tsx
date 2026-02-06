"use client";

import React, { useState, useEffect, useRef } from "react";
import { Loader2, Sparkles, Mic, MicOff, Star, Copy, X } from "lucide-react";
import { RewardSelector, RewardId } from "./RewardSelector";

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
    rating: number;
    reward: RewardId | null;
    mode: "ai" | "manual";
};

interface ReviewFormProps {
    onGenerate: (data: ReviewData) => void;
    isLoading: boolean;
}

const StarRating = ({ rating, setRating }: { rating: number; setRating: (r: number) => void }) => {
    return (
        <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                >
                    <Star
                        className={`w-8 h-8 ${star <= rating
                                ? "fill-gold-500 text-gold-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]"
                                : "fill-transparent text-slate-600 hover:text-gold-500/50"
                            }`}
                        strokeWidth={1.5}
                    />
                </button>
            ))}
        </div>
    );
};

export const ReviewForm: React.FC<ReviewFormProps> = ({
    onGenerate,
    isLoading,
}) => {
    const [name, setName] = useState("");
    const [service, setService] = useState<string>(SERVICES[0]);
    const [experience, setExperience] = useState("");
    const [rating, setRating] = useState(5);
    const [reward, setReward] = useState<RewardId | null>(null);
    const [mode, setMode] = useState<"ai" | "manual">("ai");
    const [isListening, setIsListening] = useState(false);
    const [error, setError] = useState("");

    // Recognition ref
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = true;
                recognitionRef.current.interimResults = true;

                recognitionRef.current.onresult = (event: any) => {
                    let finalTranscript = "";
                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                        if (event.results[i].isFinal) {
                            finalTranscript += event.results[i][0].transcript;
                        }
                    }
                    if (finalTranscript) {
                        setExperience((prev) => prev + (prev ? " " : "") + finalTranscript);
                    }
                };

                recognitionRef.current.onerror = (event: any) => {
                    console.error("Speech recognition error", event.error);
                    setIsListening(false);
                };

                recognitionRef.current.onend = () => {
                    // Only stop logic handled by button, but if it stops automatically:
                    setIsListening(false);
                };
            }
        }
    }, []);

    const toggleListening = () => {
        if (!recognitionRef.current) {
            alert("Voice input is not supported in this browser. Please try Chrome or Safari.");
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!experience.trim() && mode === 'ai') {
            setError("Please share a bit about your experience so we can help write your review!");
            return;
        }

        if (!experience.trim() && mode === 'manual') {
            setError("Please write your review first!");
            return;
        }

        onGenerate({ name, service, experience, rating, reward, mode });
    };

    const addTag = (tag: string) => {
        setExperience((prev) => prev + (prev ? " " : "") + tag + ".");
    };

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-8">
            {/* Reward Selector */}
            <RewardSelector selectedReward={reward} onSelect={setReward} />

            <div className="space-y-6 bg-[#161616] p-6 rounded-xl border border-white/5">
                {/* Mode Toggle & Rating */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-300">Rating</label>
                        <StarRating rating={rating} setRating={setRating} />
                    </div>

                    <div className="bg-[#0F0F0F] p-1 rounded-lg border border-white/10 flex items-center">
                        <button
                            type="button"
                            onClick={() => setMode("ai")}
                            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${mode === "ai"
                                    ? "bg-gold-500 text-black shadow-lg"
                                    : "text-slate-500 hover:text-slate-300"
                                }`}
                        >
                            Use AI Assistant
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode("manual")}
                            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${mode === "manual"
                                    ? "bg-slate-700 text-white shadow-lg"
                                    : "text-slate-500 hover:text-slate-300"
                                }`}
                        >
                            Write My Own
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Name & Service Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                                Name <span className="text-slate-600 font-normal">(Optional)</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="flex h-10 w-full rounded-md border border-white/10 bg-[#0a0a0a] px-3 text-sm text-slate-200 placeholder:text-slate-700 focus:border-gold-500/50 focus:outline-none focus:ring-1 focus:ring-gold-500/50 transition-all"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
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
                    </div>

                    {/* Experience Area */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label htmlFor="experience" className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                                {mode === 'ai' ? "What details should we include?" : "Your Review"}
                            </label>
                            <button
                                type="button"
                                onClick={toggleListening}
                                className={`flex items-center space-x-1.5 px-2 py-1 rounded-full text-xs font-bold transition-all ${isListening
                                        ? "bg-red-500/20 text-red-400 animate-pulse border border-red-500/50"
                                        : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-gold-400"
                                    }`}
                            >
                                {isListening ? <Mic className="w-3 h-3" /> : <MicOff className="w-3 h-3" />}
                                <span>{isListening ? "Listening..." : "Dictate"}</span>
                            </button>
                        </div>

                        <div className="relative group">
                            <textarea
                                id="experience"
                                className="flex min-h-[100px] w-full rounded-md border border-white/10 bg-[#0a0a0a] px-3 py-3 text-sm text-slate-200 placeholder:text-slate-700 focus:border-gold-500/50 focus:outline-none focus:ring-1 focus:ring-gold-500/50 transition-all resize-none"
                                placeholder={mode === 'ai' ? "Ex: Fast service, Mike was helpful..." : "Write your review here..."}
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                                disabled={isLoading}
                            />
                            {/* Onboarding Hint */}
                            {!experience && !isListening && (
                                <div className="absolute top-3 right-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <span className="text-[10px] text-gold-500/50 bg-gold-900/10 px-2 py-1 rounded border border-gold-500/10">
                                        Tip: Try the mic! 🎙️
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Quick Tags */}
                        {mode === 'ai' && (
                            <div className="flex flex-wrap gap-2">
                                {["Fast Service ⚡", "Friendly Team 😊", "Fair Price 💰", "Clean Shop ✨"].map(tag => (
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
                        )}

                        {error && <p className="text-sm text-red-400 font-medium animate-pulse">{error}</p>}
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className={`group relative inline-flex h-14 w-full items-center justify-center rounded-xl px-8 text-base font-bold shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50 overflow-hidden ${mode === "ai"
                        ? "bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-black shadow-gold-900/20 hover:shadow-gold-500/20"
                        : "bg-slate-100 text-black hover:bg-white shadow-white/10"
                    }`}
                disabled={isLoading}
            >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        {mode === 'ai' ? "Magic in progress..." : "Preparing..."}
                    </>
                ) : (
                    mode === 'ai' ? (
                        <>
                            <Sparkles className="mr-2 h-5 w-5" />
                            Generate Amazing Review
                        </>
                    ) : (
                        <>
                            <Copy className="mr-2 h-5 w-5" />
                            Continue to Post
                        </>
                    )
                )}
            </button>
        </form>
    );
};
