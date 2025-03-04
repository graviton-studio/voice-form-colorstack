import { Waves } from "lucide-react";
import { Mic } from "lucide-react";

export function LandingHero() {
  return (
    <div className="text-center space-y-6">
      <div className="inline-flex items-center justify-center mb-2"></div>

      <h1 className="relative font-display font-black tracking-tighter text-transparent">
        {/* Base shadow layer for depth */}
        <span className="absolute inset-0 text-7xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-rose-800 blur-[3px] transform -translate-y-[2px]">
          VoiceForm
        </span>

        {/* Main text layer with stylized typography */}
        <span className="relative text-7xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-red-300 to-pink-600 inline-block transform hover:scale-[1.01] transition-transform duration-300">
          Voice<span className="font-serif italic font-bold">Form</span>
        </span>

        <span className="absolute -top-3 right-[calc(50%-3.5rem)] w-3 h-3 bg-orange-400 rounded-full"></span>
      </h1>

      <p className="font-sans text-xl font-light tracking-wide text-orange-400 max-w-2xl mx-auto px-4 leading-relaxed">
        <span className="font-normal">Transform</span> any online form into an{" "}
        <span className="font-serif italic">interactive</span>{" "}
        <span className="font-medium">voice experience</span>.
      </p>

      <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
        <span className="uppercase tracking-[0.25em] text-pink-400">Speak</span>
        <span>•</span>
        <span className="uppercase tracking-[0.25em] text-orange-400">
          Listen
        </span>
        <span>•</span>
        <span className="uppercase tracking-[0.25em] text-pink-400">
          Complete
        </span>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700;900&family=Playfair+Display:ital,wght@0,700;1,700&display=swap");

        /* Define font families */
        .font-display {
          font-family: "Outfit", sans-serif;
        }

        .font-serif {
          font-family: "Playfair Display", serif;
        }

        .font-sans {
          font-family: "Outfit", system-ui, sans-serif;
        }
      `}</style>
    </div>
  );
}
