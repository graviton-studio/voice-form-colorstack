"use client";
import FormUrlInput from "@/components/form-url-input";
import { PricingSection } from "@/components/pricing-section";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Mic, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-white text-slate-800 relative overflow-hidden">
      {/* Abstract shapes in background */}
      <div className="absolute top-40 right-10 w-64 h-64 rounded-full bg-sky-100 opacity-70"></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-indigo-50 opacity-70"></div>
      <div className="absolute bottom-40 right-10 w-16 h-16 rounded-full bg-indigo-200 opacity-70"></div>
      <div className="absolute top-80 left-1/4 w-24 h-24 rounded-full bg-purple-100 opacity-60"></div>

      {/* Header with Navbar */}
      <header className="relative z-10 border-b border-slate-200">
        <Navbar />
      </header>

      {/* Hero Section - Completely Redesigned */}
      <section id="home" className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-sm font-medium">
                <span className="flex h-2 w-2 rounded-full bg-sky-500"></span>
                New: Multi-language support
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6 leading-tight">
                Fill Forms with Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">
                  Voice
                </span>
                , Not Your Fingers
              </h1>

              <p className="text-slate-600 text-xl mb-8 leading-relaxed">
                Transform any online form into a voice-responsive experience.
                Save time, reduce errors, and make form-filling accessible to
                everyone.
              </p>

              <div className="mb-12">
                <div className="w-full backdrop-blur-sm bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                  <FormUrlInput />
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                {/* Main mockup */}
                <div className="relative z-10 bg-white rounded-xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden w-full max-w-md">
                  {/* Mockup header */}
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex space-x-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-sky-500"></div>
                        voiceform.app
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-2 bg-slate-200 rounded-full"></div>
                      <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
                    </div>
                  </div>

                  {/* Form content */}
                  <div className="p-5">
                    <div className="mb-6">
                      <div className="w-full h-8 bg-slate-100 rounded-lg mb-2"></div>
                      <div className="w-2/3 h-3 bg-slate-100 rounded-full"></div>
                    </div>

                    <div className="mt-6 space-y-5">
                      <div className="border border-slate-200 rounded-lg p-4 bg-sky-50 relative">
                        <div className="mb-3">
                          <div className="w-2/3 h-5 bg-slate-100 rounded-lg"></div>
                        </div>

                        <div className="flex items-center gap-3 text-sm font-medium">
                          <div className="flex items-center justify-center bg-sky-100 w-8 h-8 rounded-full">
                            <div className="w-4 h-4 bg-sky-500 rounded-full"></div>
                          </div>

                          {/* Voice waveform visualization */}
                          <div className="flex items-center gap-1">
                            {[...Array(6)].map((_, i) => (
                              <div
                                key={i}
                                className="w-1 bg-sky-500 rounded-full animate-waveform"
                                style={{
                                  height: `${12 + (i % 3) * 4}px`,
                                  animationDelay: `${i * 0.1}s`,
                                  opacity: 0.7 + i * 0.05,
                                }}
                              ></div>
                            ))}
                          </div>

                          <span className="ml-2 text-sky-700">
                            Recording answer...
                          </span>
                        </div>

                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-sky-500 rounded-full text-white flex items-center justify-center text-xs font-bold">
                          1
                        </div>
                      </div>

                      <div className="border border-slate-200 rounded-lg p-4">
                        <div className="mb-3">
                          <div className="w-3/4 h-5 bg-slate-100 rounded-lg"></div>
                        </div>

                        <div className="relative border border-slate-200 rounded-lg p-3 bg-white">
                          <div className="w-full h-12 bg-slate-50 rounded"></div>
                          <div className="absolute -top-2 -right-2 w-5 h-5 bg-slate-300 rounded-full text-white flex items-center justify-center text-xs font-bold">
                            2
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-sky-100 to-indigo-100 rounded-full opacity-50 blur-xl"></div>
                <div className="absolute -right-4 -bottom-4 -z-10 w-24 h-24 bg-indigo-100 rounded-xl"></div>
                <div className="absolute -left-6 top-1/4 -z-10 w-16 h-16 bg-sky-100 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature highlights */}
      <section id="features" className="relative z-10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How VoiceForm transforms your workflow
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Fill out forms faster and more naturally using just your voice -
              no more typing required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-lg flex items-center justify-center mb-5">
                <Mic className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Voice-Powered Forms
              </h3>
              <p className="text-slate-600">
                Simply speak your answers and watch them fill in automatically,
                reducing form completion time by up to 80%.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-5">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Works Everywhere
              </h3>
              <p className="text-slate-600">
                Compatible with Google Forms, Typeform, SurveyMonkey, Airtable,
                and virtually any web form.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-5">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Instant Setup
              </h3>
              <p className="text-slate-600">
                No coding or installation required. Just paste your form URL and
                start speaking right away.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sky-600 font-medium hover:text-sky-700"
            >
              View all features
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing">
        <PricingSection />
      </section>

      {/* About Section - Optional */}
      <section id="about" className="relative z-10 py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              About VoiceForm
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              We're on a mission to make form-filling accessible, efficient, and
              enjoyable for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Our Story
              </h3>
              <p className="text-slate-600 mb-4">
                VoiceForm was born from a simple observation: filling out forms
                is tedious and time-consuming. We wanted to create a solution
                that leverages the power of voice technology to make this
                everyday task easier.
              </p>
              <p className="text-slate-600">
                Today, we're proud to help thousands of users save time and
                reduce the friction of form completion, making digital
                experiences more accessible to everyone.
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-sky-50 p-8 rounded-xl border border-indigo-100">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Our Values
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-lg mr-3 mt-1">
                    <svg
                      className="w-4 h-4 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">
                      Accessibility First
                    </h4>
                    <p className="text-sm text-slate-600">
                      Making technology work for everyone, regardless of
                      ability.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-sky-100 p-2 rounded-lg mr-3 mt-1">
                    <svg
                      className="w-4 h-4 text-sky-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Innovation</h4>
                    <p className="text-sm text-slate-600">
                      Constantly pushing the boundaries of what's possible.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3 mt-1">
                    <svg
                      className="w-4 h-4 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">
                      Privacy & Security
                    </h4>
                    <p className="text-sm text-slate-600">
                      Your data is yours. We keep it safe and secure.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

        body {
          font-family: "Inter", sans-serif;
          background-color: #f8fafc;
        }

        @keyframes waveform {
          0%,
          100% {
            transform: scaleY(0.7);
          }
          50% {
            transform: scaleY(1.3);
          }
        }

        .animate-waveform {
          animation: waveform 1.2s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
