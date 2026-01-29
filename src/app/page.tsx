"use client";

import { useState } from "react";
import { ReviewForm, ReviewData } from "@/components/ReviewForm";
import { ReviewAction } from "@/components/ReviewAction";

export default function Home() {
  const [step, setStep] = useState<"form" | "result">("form");
  const [generatedReview, setGeneratedReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (data: ReviewData) => {
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Header / Logo */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          J & G Motor Club
        </h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
          Review Assistant
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800 p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-center text-slate-800 dark:text-slate-100">
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
  );
}
