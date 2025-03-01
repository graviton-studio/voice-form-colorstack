import { LandingHero } from "@/components/landing-hero"
import { FormUrlInput } from "@/components/form-url-input"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <LandingHero />
        <div className="mt-12 max-w-2xl mx-auto">
          <FormUrlInput />
        </div>
      </div>
    </main>
  )
}

