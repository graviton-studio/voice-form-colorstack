"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import type { Question } from "@/lib/form-extractor"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Mic, MicOff, ArrowRight, CheckCircle2, Volume2 } from "lucide-react"

type Answer = {
  questionId: string
  value: string | string[]
}

// Declare SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
    SpeechSynthesisUtterance: any
    speechSynthesis: any
  }
}

export function VoiceQuestionFlow({ questions }: { questions: Question[] }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [completed, setCompleted] = useState(false)
  const [progress, setProgress] = useState(0)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const router = useRouter()

  const currentQuestion = questions[currentQuestionIndex]

  // Initialize speech recognition
  useEffect(() => {
    if ((typeof window !== "undefined" && "SpeechRecognition" in window) || "webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex
        const result = event.results[current]
        const transcriptText = result[0].transcript
        setTranscript(transcriptText)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }

    // Calculate initial progress
    updateProgress()

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  // Update progress when answers change
  useEffect(() => {
    updateProgress()
  }, [answers])

  const updateProgress = () => {
    const progressValue = (answers.length / questions.length) * 100
    setProgress(progressValue)
  }

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in your browser")
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      setTranscript("")
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const submitAnswer = () => {
    if (!transcript.trim()) return

    // Save the answer
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      value: transcript,
    }

    setAnswers([...answers, newAnswer])
    setTranscript("")

    // Move to next question or complete
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setCompleted(true)
    }

    // Stop listening
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const speakQuestion = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(currentQuestion.text)
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleFinish = () => {
    // In a real app, you would submit the answers to your backend
    console.log("Answers:", answers)

    // Clear session storage and redirect to home
    sessionStorage.removeItem("formQuestions")
    router.push("/")
  }

  if (completed) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="bg-rose-500/20 p-6 rounded-full inline-block mx-auto">
            <CheckCircle2 className="h-16 w-16 text-rose-500" />
          </div>
          <h1 className="text-4xl font-bold font-display tracking-tight">All Done!</h1>
          <p className="text-xl text-orange-400">Thank you for completing the form using your voice.</p>
          <div className="bg-white rounded-xl shadow-lg p-6 text-left border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-pink-900">Your Responses:</h2>
            <div className="space-y-4">
              {answers.map((answer, index) => {
                const question = questions.find((q) => q.id === answer.questionId)
                return (
                  <div key={answer.questionId} className="border-b border-pink-100 pb-3">
                    <p className="font-medium text-rose-500">
                      {index + 1}. {question?.text}
                    </p>
                    <p className="text-pink-700 mt-1">{answer.value.toString()}</p>
                  </div>
                )
              })}
            </div>
          </div>
          <Button onClick={handleFinish} size="lg" className="mt-6 bg-black hover:bg-gray-800 text-white rounded-full px-8 py-6">
            Return Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span className="font-medium">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2 bg-pink-100" indicatorClassName="bg-rose-500" />
        </div>

        <Card className="p-6 bg-white border-gray-100 rounded-xl shadow-lg">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{currentQuestion.text}</h2>
                {currentQuestion.type === "choice" && currentQuestion.options && (
                  <div className="text-sm text-gray-600 mt-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="font-medium mb-1">Options:</p>
                    <ul className="space-y-1">
                      {currentQuestion.options.map((option: any, idx: any) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-rose-400 rounded-full"></span>
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <Button variant="ghost" size="sm" className="mt-1 text-gray-500" onClick={speakQuestion}>
                  <Volume2 className="h-4 w-4 mr-1 text-pink-500" />
                  <span className="text-pink-500">Speak question</span>
                </Button>
              </div>
            </div>
            
            <div
              className={`min-h-[100px] p-4 rounded-lg border ${
                isListening 
                  ? "border-rose-500 bg-rose-500/5 animate-pulse" 
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              {transcript ? (
                <p className="text-gray-800">{transcript}</p>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  {isListening ? (
                    <>
                      <div className="flex space-x-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse delay-0"></div>
                        <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse delay-150"></div>
                        <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse delay-300"></div>
                      </div>
                      <p className="text-gray-600">Listening... Speak now</p>
                    </>
                  ) : (
                    <p className="text-gray-500">
                      Click the microphone button to start speaking
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Button 
                onClick={toggleListening} 
                className={`gap-2 rounded-full px-5 py-2 ${
                  isListening 
                    ? "bg-red-500 hover:bg-red-600 text-white" 
                    : "bg-pink-100 text-pink-800 hover:bg-pink-200"
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

              <Button 
                onClick={submitAnswer} 
                disabled={!transcript.trim()} 
                className="gap-2 bg-pink-100 text-pink-800 hover:bg-pink-200 rounded-full px-5 py-2"
              >
                Next Question
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Custom fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700;900&display=swap');
        
        .font-display {
          font-family: 'Outfit', sans-serif;
        }
      `}</style>
    </div>
  )
}