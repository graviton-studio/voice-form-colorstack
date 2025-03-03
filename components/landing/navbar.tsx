import Link from "next/link";
import { Mic } from "lucide-react";

export function Navbar() {
  return (
    <nav className="py-4 border-b border-slate-800">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-75"></div>
            <div className="relative bg-slate-900 p-1 rounded-full">
              <Mic className="h-5 w-5 text-white" />
            </div>
          </div>
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            VoiceForm
          </span>
        </Link>

        <div className="flex items-center space-x-6">
          <Link
            href="/features"
            className="text-slate-300 hover:text-white transition"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-slate-300 hover:text-white transition"
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            className="text-slate-300 hover:text-white transition"
          >
            Docs
          </Link>
          <Link
            href="/login"
            className="text-slate-300 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-2 rounded-md font-medium hover:opacity-90 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
