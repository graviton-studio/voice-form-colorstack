"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { extractFormQuestions } from "@/lib/form-extractor"

export function FormUrlInput() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url) {
      setError("Please enter a form URL")
      return
    }

    try {
      setIsLoading(true)
      setError("")

      // Extract form questions from the URL
      const result = await extractFormQuestions(url)

      if (result.success) {
        // Store questions in session storage for the next page
        sessionStorage.setItem("formQuestions", JSON.stringify(result.questions))
        router.push("/answer")
      } else {
        setError(result.error || "Failed to extract form questions")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Enter your form URL</h2>
        <p className="text-slate-400">We support Google Forms, Airtable forms, Typeform, and more</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            type="url"
            placeholder="https://forms.google.com/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="bg-slate-800 border-slate-700 text-white pr-12 h-14"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-1 top-1 h-12 w-12 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
          </Button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <h3 className="font-medium mb-2">Supported form types:</h3>
          <ul className="text-sm text-slate-400 space-y-1">
            <li>• Google Forms</li>
            <li>• Airtable forms</li>
            <li>• Typeform</li>
            <li>• Microsoft Forms</li>
            <li>• Custom HTML forms</li>
          </ul>
        </div>
      </form>
    </div>
  )
}

