"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Question } from "@/lib/form-extractor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Mic, MicOff, ArrowRight, CheckCircle2, Volume2 } from "lucide-react";

type Answer = {
  questionId: string;
  value: string | string[];
};

// Declare SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
    SpeechSynthesisUtterance: any;
    speechSynthesis: any;
  }
}

export function VoiceQuestionFlow({ questions }: { questions: Question[] }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const router = useRouter();

  const currentQuestion = questions[currentQuestionIndex];

  // Initialize speech recognition
  useEffect(() => {
    if (
      (typeof window !== "undefined" && "SpeechRecognition" in window) ||
      "webkitSpeechRecognition" in window
    ) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const result = event.results[current];
        const transcriptText = result[0].transcript;
        setTranscript(transcriptText);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Calculate initial progress
    updateProgress();

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Update progress when answers change
  useEffect(() => {
    updateProgress();
  }, [answers]);

  const updateProgress = () => {
    const progressValue = (answers.length / questions.length) * 100;
    setProgress(progressValue);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in your browser");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript("");
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const submitAnswer = () => {
    if (!transcript.trim()) return;

    // Save the answer
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      value: transcript,
    };

    setAnswers([...answers, newAnswer]);
    setTranscript("");

    // Move to next question or complete
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCompleted(true);
    }

    // Stop listening
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakQuestion = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(currentQuestion.text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleFinish = () => {
    // In a real app, you would submit the answers to your backend
    console.log("Answers:", answers);

    // Clear session storage and redirect to home
    sessionStorage.removeItem("formQuestions");
    router.push("/");
  };

  if (completed) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="bg-green-500/20 p-6 rounded-full inline-block mx-auto">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-4xl font-bold">All Done!</h1>
        <p className="text-xl text-slate-300">
          Thank you for completing the form using your voice.
        </p>
        <div className="bg-slate-800 rounded-lg p-6 text-left">
          <h2 className="text-xl font-semibold mb-4">Your Responses:</h2>
          <div className="space-y-4">
            {answers.map((answer, index) => {
              const question = questions.find(
                (q) => q.id === answer.questionId,
              );
              return (
                <div
                  key={answer.questionId}
                  className="border-b border-slate-700 pb-3"
                >
                  <p className="font-medium text-purple-400">
                    {index + 1}. {question?.text}
                  </p>
                  <p className="text-white mt-1">{answer.value.toString()}</p>
                </div>
              );
            })}
          </div>
        </div>
        <Button onClick={handleFinish} size="lg" className="mt-6">
          Return Home
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="p-6 bg-slate-800 border-slate-700">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-purple-500/20 p-2 rounded-full">
              <Mic className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                {currentQuestion.text}
              </h2>
              {currentQuestion.type === "choice" && currentQuestion.options && (
                <div className="text-sm text-slate-400 mt-2">
                  <p>Options: {currentQuestion.options.join(", ")}</p>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="mt-1 text-slate-400"
                onClick={speakQuestion}
              >
                <Volume2 className="h-4 w-4 mr-1" />
                <span>Speak question</span>
              </Button>
            </div>
          </div>
          <div
            className={`min-h-[100px] p-4 rounded-lg border ${
              isListening
                ? "border-purple-500 bg-purple-500/10 animate-pulse"
                : "border-slate-700 bg-slate-900"
            }`}
          >
            {transcript ? (
              <p className="text-white">{transcript}</p>
            ) : (
              <p className="text-slate-500">
                {isListening
                  ? "Listening... Speak now"
                  : "Click the microphone button to start speaking"}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant={isListening ? "destructive" : "outline"}
              onClick={toggleListening}
              className="gap-2"
            >
              {isListening ? (
                <>
                  <MicOff className="h-4 w-4" />
                  Stop Listening
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4" />
                  Start Speaking
                </>
              )}
            </Button>

            <Button
              onClick={submitAnswer}
              disabled={!transcript.trim()}
              className="gap-2"
            >
              Next Question
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
