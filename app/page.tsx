import { LandingHero } from "@/components/landing/landing-hero";
import { FormUrlInput } from "@/components/landing/form-url-input";
import { Navbar } from "@/components/landing/navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <LandingHero />
        <div className="mt-16 max-w-2xl mx-auto">
          <FormUrlInput />
        </div>
      </div>
    </main>
  );
}
