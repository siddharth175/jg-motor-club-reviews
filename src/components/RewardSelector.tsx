"use client";

import React from "react";
import { Battery, Wind, Tag } from "lucide-react";

const ADS = [
    {
        id: "battery",
        title: "FREE Battery Check",
        subtitle: "Valid Today Only",
        icon: Battery,
        description: "Don't get stranded! Ask at the counter.",
        color: "text-green-400",
        bg: "bg-green-400/10",
        border: "border-green-400/30",
    },
    {
        id: "filter",
        title: "FREE AC Filter Check",
        subtitle: "Breathe Clean",
        icon: Wind,
        description: "Keep your cabin air fresh & clean.",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/30",
    },
    {
        id: "discount",
        title: "5% OFF Next Visit",
        subtitle: "Reviewer Special",
        icon: Tag,
        description: "Show your review to claim.",
        color: "text-gold-400",
        bg: "bg-gold-400/10",
        border: "border-gold-500/30",
    },
];

export const RewardSidebar = () => {
    return (
        <div className="space-y-4 h-full">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold bg-white/10 px-2 py-0.5 rounded text-slate-300 uppercase tracking-wider">
                    Daily Perks
                </span>
            </div>

            <div className="space-y-3">
                {ADS.map((ad) => {
                    const Icon = ad.icon;
                    return (
                        <div
                            key={ad.id}
                            className={`relative p-4 rounded-xl border-dashed border-2 ${ad.border} ${ad.bg} flex flex-col gap-1 transition-transform hover:scale-[1.02] cursor-default group`}
                        >
                            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Icon className="w-12 h-12" />
                            </div>

                            <div className="flex items-center gap-2">
                                <Icon className={`w-4 h-4 ${ad.color}`} />
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${ad.color}`}>
                                    {ad.subtitle}
                                </span>
                            </div>

                            <h3 className="text-sm font-bold text-slate-100 leading-tight">
                                {ad.title}
                            </h3>

                            <p className="text-[11px] text-slate-400 leading-tight">
                                {ad.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
