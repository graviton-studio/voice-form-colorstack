"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { VoiceQuestionFlow } from "@/components/voice-question-flow";
import type { Question } from "@/lib/form-extractor";
import { Loader2 } from "lucide-react";

export default function AnswerPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const formId = params?.id as string;

  useEffect(() => {
    // Retrieve questions from session storage
    const storedQuestions = sessionStorage.getItem("formQuestions");

    if (!storedQuestions) {
      // If no questions found, redirect back to home
      router.push("/");
      return;
    }

    try {
      const parsedQuestions = JSON.parse(storedQuestions);
      setQuestions(parsedQuestions);
    } catch (error) {
      console.error("Error parsing stored questions:", error);
      router.push("/");
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-purple-500" />
          <p className="text-xl">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gradient-to-br from-sky-50 text-white">
      <div className="container mx-auto px-4 py-16">
        <VoiceQuestionFlow questions={questions} formId={formId} />
      </div>
    </main>
  );
}
