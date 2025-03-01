import { Mic } from "lucide-react"

export function LandingHero() {
  return (
    <div className="text-center space-y-6">
      <div className="relative inline-block">
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-75 animate-pulse"></div>
        <div className="relative bg-slate-900 p-6 rounded-full">
          <Mic className="h-16 w-16 text-white" />
        </div>
      </div>
      <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
        VoiceForm
      </h1>
      <p className="text-xl text-slate-300 max-w-2xl mx-auto">
        Transform any online form into an interactive voice experience. Simply paste a form URL, and answer questions
        using your voice.
      </p>
    </div>
  )
}

