"use client";

import { useState } from "react";
import { ReviewForm, ReviewData } from "@/components/ReviewForm";
import { ReviewAction } from "@/components/ReviewAction";

export default function Home() {
  const [step, setStep] = useState<"form" | "result">("form");
  const [generatedReview, setGeneratedReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (data: ReviewData) => {
    // If manual mode, skip the AI generation
    if (data.mode === 'manual') {
      setGeneratedReview(data.experience);
      setStep("result");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to generate review");

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      setGeneratedReview(result.review);
      setStep("result");
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">


      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gold-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Header / Logo */}
      <div className="mb-12 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-serif tracking-wider text-white drop-shadow-md" style={{ fontFamily: '"Playfair Display", serif' }}>
          J & G MOTOR CLUB
        </h1>
        <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto my-4" />
        <p className="text-gold-400 text-lg tracking-[0.2em] uppercase font-light">
          Review Assistant
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-lg relative group">

        {/* Card Border Gradient */}
        <div className="absolute -inset-[1px] bg-gradient-to-br from-gold-600/50 via-gold-400/20 to-gold-600/50 rounded-xl blur-[1px] opacity-70" />

        <div className="relative bg-[#0F0F0F] rounded-xl shadow-2xl overflow-hidden border border-white/10 p-1">
          <div className="bg-[#0F0F0F] border border-gold-500/20 rounded-lg p-6 sm:p-10 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-serif text-slate-100/90 drop-shadow-sm">
                {step === "form" ? "Share Your Experience" : "Ready to Post!"}
              </h2>
            </div>

            {step === "form" ? (
              <ReviewForm onGenerate={handleGenerate} isLoading={isLoading} />
            ) : (
              <ReviewAction
                initialReview={generatedReview}
                onReset={() => setStep("form")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
