import { Mic, MousePointer, AudioWaveform, Accessibility } from "lucide-react";

export function LandingHero() {
  return (
    <div className="text-center space-y-8">
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
        Transform any online form into an interactive voice experience. Simply
        paste a form URL, and answer questions using your voice.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-pink-500/50 transition">
          <div className="bg-gradient-to-r from-pink-500 to-violet-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <MousePointer className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Simple Integration</h3>
          <p className="text-slate-400">
            Just paste any form URL and our AI will automatically map all fields
            for voice input.
          </p>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-pink-500/50 transition">
          <div className="bg-gradient-to-r from-pink-500 to-violet-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <AudioWaveform className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Natural Conversation</h3>
          <p className="text-slate-400">
            Our AI guides you through forms with natural conversation, making
            form-filling effortless.
          </p>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-pink-500/50 transition">
          <div className="bg-gradient-to-r from-pink-500 to-violet-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <Accessibility className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Accessibility First</h3>
          <p className="text-slate-400">
            Make any form accessible to everyone, regardless of ability or
            technical skill.
          </p>
        </div>
      </div>
    </div>
  );
}
