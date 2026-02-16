// ... (imports)
import { useState } from "react";
import { ReviewForm, ReviewData } from "@/components/ReviewForm";
import { ReviewAction } from "@/components/ReviewAction";
// LandingSelection import removed

export default function Home() {
  const [step, setStep] = useState<"form" | "result">("form"); // Default to form
  const [generatedReview, setGeneratedReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (data: ReviewData) => {
    // ... (same as before)
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to generate review");

      const result = await response.json();
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
    <main className="min-h-screen bg-[#0a0a0a] text-slate-200 p-4 sm:p-8 flex items-center justify-center font-sans tracking-tight">
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-gold-600/10 rounded-full blur-[120px] opacity-40 animate-pulse" />
        <div className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] opacity-30" />
      </div>

      <div className="w-full max-w-5xl relative z-10">
        <header className="mb-10 text-center space-y-2">
          <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gold-500 mb-2">
            ✨ J & G Motor Club
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 font-serif tracking-tight">
            Review Assistant
          </h1>
        </header>

        {/* Layout Grid - Centered Single Column */}
        <div className="flex flex-col gap-8 max-w-3xl mx-auto">

          {/* Main Content Area */}
          <div className="w-full">
            <div className="relative group">
              {/* Border Gradient */}
              <div className="absolute -inset-[1px] bg-gradient-to-br from-gold-600/50 via-gold-400/20 to-gold-600/50 rounded-2xl blur-[1px] opacity-40" />

              <div className="relative bg-[#0F0F0F] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl">

                {step === "form" && (
                  <ReviewForm onGenerate={handleGenerate} isLoading={isLoading} />
                )}

                {step === "result" && (
                  <ReviewAction
                    initialReview={generatedReview}
                    onReset={() => setStep("form")}
                  />
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
