"use client";

import React from "react";
import { Sparkles, MapPin, ArrowRight } from "lucide-react";
import { getGoogleReviewUrl } from "@/lib/google-url";

interface LandingSelectionProps {
    onSelectAI: () => void;
}

export const LandingSelection: React.FC<LandingSelectionProps> = ({ onSelectAI }) => {

    const handleWriteOwn = () => {
        window.open(getGoogleReviewUrl(), "_blank");
    };

    return (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="space-y-2">
                <h2 className="text-3xl font-serif text-slate-100">
                    How would you like to review us?
                </h2>
                <p className="text-slate-400">
                    Choose the option that fits you best.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {/* Option 1: AI Assistant */}
                <button
                    onClick={onSelectAI}
                    className="group relative flex items-center p-6 bg-[#161616] border border-white/5 rounded-xl hover:border-gold-500/50 transition-all hover:bg-[#1a1a1a] text-left"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

                    <div className="h-12 w-12 rounded-full bg-gold-500/10 flex items-center justify-center mr-5 group-hover:scale-110 transition-transform">
                        <Sparkles className="h-6 w-6 text-gold-500" />
                    </div>

                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-100 group-hover:text-gold-400 transition-colors">
                            Use AI Assistant
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                            We'll help you write a perfect review in seconds.
                        </p>
                    </div>

                    <ArrowRight className="h-5 w-5 text-slate-600 group-hover:text-gold-500 group-hover:translate-x-1 transition-all" />
                </button>

                {/* Option 2: Write My Own */}
                <button
                    onClick={handleWriteOwn}
                    className="group relative flex items-center p-6 bg-[#161616] border border-white/5 rounded-xl hover:border-slate-500/50 transition-all hover:bg-[#1a1a1a] text-left"
                >
                    <div className="h-12 w-12 rounded-full bg-slate-800/50 flex items-center justify-center mr-5 group-hover:scale-110 transition-transform">
                        <MapPin className="h-6 w-6 text-slate-400" />
                    </div>

                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-100 group-hover:text-slate-200 transition-colors">
                            Write My Own Review
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                            Go directly to Google Maps to write it yourself.
                        </p>
                    </div>

                    <ArrowRight className="h-5 w-5 text-slate-600 group-hover:text-slate-300 group-hover:translate-x-1 transition-all" />
                </button>
            </div>
        </div>
    );
};
