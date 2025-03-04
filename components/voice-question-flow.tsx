"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Question } from "@/lib/form-extractor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Mic,
  MicOff,
  ArrowRight,
  CheckCircle2,
  Volume2,
  ArrowLeft,
} from "lucide-react";

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

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const result = event.results[current];
        const transcriptText = result[0].transcript;
        setTranscript(transcriptText);
      };

      recognitionRef.current.onerror = (event: any) => {
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

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      // Stop listening if active
      if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
      }

      // Remove the answer for the current question if it exists
      const updatedAnswers = [...answers];
      const currentQuestionId = questions[currentQuestionIndex].id;
      const answerIndex = updatedAnswers.findIndex(
        (a) => a.questionId === currentQuestionId,
      );

      if (answerIndex !== -1) {
        updatedAnswers.splice(answerIndex, 1);
        setAnswers(updatedAnswers);
      }

      // Go back to previous question
      setCurrentQuestionIndex(currentQuestionIndex - 1);

      // Set transcript to the previous answer if it exists
      const previousQuestionId = questions[currentQuestionIndex - 1].id;
      const previousAnswer = updatedAnswers.find(
        (a) => a.questionId === previousQuestionId,
      );

      if (previousAnswer) {
        setTranscript(previousAnswer.value.toString());
      } else {
        setTranscript("");
      }
    }
  };

  // Add a handler for manual transcript changes
  const handleTranscriptChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTranscript(e.target.value);
  };

  if (completed) {
    return (
      <div className="flex items-center justify-center p-6 bg-gradient-to-br from-sky-50 to-white min-h-screen">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="bg-sky-500/20 p-6 rounded-full inline-block mx-auto">
            <CheckCircle2 className="h-16 w-16 text-sky-600" />
          </div>
          <h1 className="text-4xl font-bold font-display tracking-tight text-slate-900">
            All Done!
          </h1>
          <p className="text-xl text-slate-600">
            Thank you for completing the form using your voice.
          </p>
          <div className="bg-white rounded-xl shadow-sm p-6 text-left border border-slate-200">
            <h2 className="text-xl font-semibold mb-4 text-slate-900">
              Your Responses:
            </h2>
            <div className="space-y-4">
              {answers.map((answer, index) => {
                const question = questions.find(
                  (q) => q.id === answer.questionId,
                );
                return (
                  <div
                    key={answer.questionId}
                    className="border-b border-slate-100 pb-3"
                  >
                    <p className="font-medium text-indigo-700">
                      {index + 1}. {question?.text}
                    </p>
                    <p className="text-slate-700 mt-1">
                      {answer.value.toString()}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <Button
            onClick={handleFinish}
            size="lg"
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-8 py-6"
          >
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-6 bg-gradient-to-br from-sky-50 to-white min-h-screen">
      {/* Background decoration */}
      <div className="absolute top-40 right-10 w-64 h-64 rounded-full bg-sky-100 opacity-70"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-indigo-50 opacity-70"></div>

      <div className="w-full max-w-2xl z-10">
        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-600 mb-2">
            <span className="font-medium">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress
            value={progress}
            className="h-2 bg-slate-100"
            indicatorClassName="bg-indigo-600"
          />
        </div>

        <Card className="p-6 bg-white border-slate-200 rounded-xl shadow-sm">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                  {currentQuestion.text}
                </h2>
                {currentQuestion.type === "choice" &&
                  currentQuestion.options && (
                    <div className="text-sm text-slate-600 mt-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="font-medium mb-1">Options:</p>
                      <ul className="space-y-1">
                        {currentQuestion.options.map(
                          (option: any, idx: any) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                              {option}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-1 text-slate-500"
                  onClick={speakQuestion}
                >
                  <Volume2 className="h-4 w-4 mr-1 text-sky-500" />
                  <span className="text-sky-500">Speak question</span>
                </Button>
              </div>
            </div>

            <div
              className={`relative min-h-[100px] ${
                isListening ? "animate-pulse" : ""
              }`}
            >
              <textarea
                value={transcript}
                onChange={handleTranscriptChange}
                placeholder={
                  isListening
                    ? "Listening... Speak now"
                    : "Click the microphone button to start speaking or type your answer here"
                }
                className={`w-full min-h-[100px] p-4 rounded-lg border resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                  isListening
                    ? "border-indigo-500 bg-indigo-500/5"
                    : "border-slate-200 bg-slate-50"
                }`}
              />

              {isListening && !transcript && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse delay-0"></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse delay-150"></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse delay-300"></div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Button
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="gap-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg px-5 py-2 disabled:bg-slate-50 disabled:text-slate-400"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div className="flex gap-2">
                <Button
                  onClick={toggleListening}
                  className={`gap-2 rounded-lg px-5 py-2 ${
                    isListening
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                  }`}
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
              </div>

              <Button
                onClick={submitAnswer}
                disabled={!transcript.trim()}
                className="gap-2 bg-sky-500 text-white hover:bg-sky-600 rounded-lg px-5 py-2 disabled:bg-slate-200 disabled:text-slate-500"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Custom fonts */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap");

        .font-display {
          font-family: "Inter", sans-serif;
        }
      `}</style>
    </div>
  );
}
