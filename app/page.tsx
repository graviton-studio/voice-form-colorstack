"use client"
import { LandingHero } from "@/components/landing-hero"
import FormUrlInput from "@/components/form-url-input"
import { Mic } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 relative overflow-hidden flex items-center">
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-radial from-rose-400/10 via-rose-400/5 to-transparent blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-purple-400/10 via-purple-400/5 to-transparent blur-3xl"></div>
      
      <div className="absolute left-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none">
        <div className="absolute top-[15%] left-[20%] w-2 h-2 bg-rose-400 rounded-full"></div>
        <div className="absolute top-[20%] left-[40%] w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
        <div className="absolute top-[25%] left-[30%] w-2 h-2 bg-amber-400 rounded-full"></div>
        <div className="absolute top-[30%] left-[50%] w-1 h-1 bg-blue-400 rounded-full"></div>
        <div className="absolute top-[35%] left-[25%] w-1.5 h-1.5 bg-rose-400 rounded-full"></div>
        <div className="absolute top-[40%] left-[45%] w-1 h-1 bg-purple-400 rounded-full"></div>
        <div className="absolute top-[45%] left-[15%] w-2 h-2 bg-blue-400 rounded-full"></div>
        <div className="absolute top-[50%] left-[35%] w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
        <div className="absolute top-[55%] left-[25%] w-1 h-1 bg-rose-400 rounded-full"></div>
        <div className="absolute top-[60%] left-[40%] w-2 h-2 bg-purple-400 rounded-full"></div>
        <div className="absolute top-[65%] left-[20%] w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
        <div className="absolute top-[70%] left-[50%] w-1 h-1 bg-amber-400 rounded-full"></div>
        <div className="absolute top-[75%] left-[30%] w-2 h-2 bg-rose-400 rounded-full"></div>
        <div className="absolute top-[80%] left-[15%] w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 py-10 z-10 grid grid-cols-1 lg:grid-cols-10 gap-8">
        <div className="lg:col-span-7">
          <div className="text-left">
            <div className="inline-flex items-center justify-start mb-2">
            </div>
            
            <h1 className="relative font-display font-black tracking-tighter text-transparent">
              <span className="absolute inset-0 text-7xl md:text-9xl bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-rose-800 blur-[3px] transform -translate-y-[2px]">
                VoiceForm
              </span>
              
              <span className="relative text-7xl md:text-9xl bg-clip-text text-transparent bg-gradient-to-r from-red-300 to-pink-600 inline-block transform hover:scale-[1.01] transition-transform duration-300">
                Voice<span className="font-serif italic font-bold">Form</span>
              </span>
              
              <span className="absolute -top-3 left-[calc(50%-0.5rem)] md:left-[23rem] w-3 h-3 bg-orange-400 rounded-full"></span>
            </h1>
            
            <p className="font-sans text-2xl md:text-3xl font-light tracking-wide text-orange-400 max-w-3xl mt-6 mb-8 leading-relaxed">
              <span className="font-normal">Transform</span> any online form into an{" "}
              <span className="font-serif italic">interactive</span>{" "}
              <span className="font-medium">voice experience</span>.
            </p>
            
            <div className="flex items-center justify-start space-x-6 text-base md:text-lg mb-12">
              <span className="uppercase tracking-[0.25em] text-pink-400">Speak</span>
              <span className="text-gray-400">•</span>
              <span className="uppercase tracking-[0.25em] text-fuchsia-300">Listen</span>
              <span className="text-gray-400">•</span>
              <span className="uppercase tracking-[0.25em] text-rose-400">Complete</span>
            </div>
          </div>
          
          <div className="w-full items-center">
            <div className="w-[85%] backdrop-blur-sm bg-white/5 rounded-2xl p-4 border border-pink-100/20 shadow-xl">
              <FormUrlInput />
            </div>
          </div>
        </div>
        
        <div className="hidden lg:flex lg:col-span-3 items-center justify-center pointer-events-none">
          <div className="relative h-[400px] w-full flex items-center justify-center">
            <div className="absolute w-64 h-64 bg-gradient-radial from-rose-400/20 to-purple-400/5 rounded-full blur-xl"></div>
            
            <div className="relative w-60 h-60">
              <div className="absolute inset-0 border-2 border-rose-400/40 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
              <div className="absolute inset-4 border-2 border-purple-400/30 rounded-full animate-ping" style={{ animationDuration: '3.5s' }}></div>
              <div className="absolute inset-8 border-2 border-blue-400/20 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
              <div className="absolute inset-12 border-2 border-amber-400/30 rounded-full animate-ping" style={{ animationDuration: '4.5s' }}></div>
              <div className="absolute inset-16 border-2 border-rose-400/20 rounded-full animate-ping" style={{ animationDuration: '5s' }}></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-900 rounded-full p-6 shadow-lg">
                  <Mic className="h-12 w-12 text-rose-500" />
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700;900&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        
        /* Define font families */
        .font-display {
          font-family: 'Outfit', sans-serif;
        }
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        
        .font-sans {
          font-family: 'Outfit', system-ui, sans-serif;
        }
        
        @keyframes bounce {
          0% { transform: scaleY(0.7); }
          100% { transform: scaleY(1.3); }
        }
      `}</style>
    </main>
  )
}