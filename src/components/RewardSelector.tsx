"use client";

import React from "react";
import { Battery, Wind, Tag, CheckCircle2 } from "lucide-react";

export type RewardId = "battery" | "filter" | "discount";

export const REWARDS = [
  {
    id: "battery" as RewardId,
    title: "Free Battery Check",
    icon: Battery,
    description: "Ensure you're ready for the road.",
    color: "from-green-400 to-emerald-600",
  },
  {
    id: "filter" as RewardId,
    title: "Free Filter Check",
    icon: Wind,
    description: "Breathe clean air in your cabin.",
    color: "from-blue-400 to-cyan-600",
  },
  {
    id: "discount" as RewardId,
    title: "5% Off Service",
    icon: Tag,
    description: "Save on your next visit.",
    color: "from-gold-400 to-amber-600",
  },
];

interface RewardSelectorProps {
  selectedReward: RewardId | null;
  onSelect: (id: RewardId) => void;
}

export const RewardSelector: React.FC<RewardSelectorProps> = ({
  selectedReward,
  onSelect,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-serif text-slate-200">
          🎁 Choose Your Gift
        </h3>
        {selectedReward && (
          <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full animate-pulse">
            Reward Selected
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {REWARDS.map((reward) => {
          const isSelected = selectedReward === reward.id;
          const Icon = reward.icon;

          return (
            <button
              key={reward.id}
              type="button"
              onClick={() => onSelect(reward.id)}
              className={`relative group flex flex-col items-center p-4 rounded-xl border transition-all duration-300 ${
                isSelected
                  ? "bg-gold-500/10 border-gold-500 shadow-[0_0_15px_rgba(234,179,8,0.3)] scale-[1.02]"
                  : "bg-[#1a1a1a] border-white/10 hover:border-white/20 hover:bg-[#222]"
              }`}
            >
              <div
                className={`p-3 rounded-full mb-3 bg-gradient-to-br ${reward.color} ${
                  isSelected ? "opacity-100" : "opacity-80 group-hover:opacity-100"
                }`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              
              <div className="text-center space-y-1">
                <p className={`text-sm font-bold ${isSelected ? "text-white" : "text-slate-300"}`}>
                  {reward.title}
                </p>
                <p className="text-[10px] text-slate-500 leading-tight">
                  {reward.description}
                </p>
              </div>

              {isSelected && (
                <div className="absolute top-2 right-2 text-gold-500">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
