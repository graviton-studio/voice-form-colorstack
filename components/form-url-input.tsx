"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { extractFormQuestions } from "@/lib/form-extractor"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

const FormUrlInput = () => {
  const [url, setUrl] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [idToPushTo, setIdToPushTo] = useState<string>("")
  const router = useRouter()
  const addQuestionForm = useMutation(api.replies.addQuestionForm)
  
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
      const idVal = await addQuestionForm({ url })
      setIdToPushTo(idVal)
      const result = await extractFormQuestions(url, idVal)
      
      if (result.success) {
        sessionStorage.setItem("formQuestions", JSON.stringify(result.questions))
        router.push(`/answer/${idVal}`) // Use idVal instead of idToPushTo
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
    <div className="max-w-xl mx-auto">
      <div className="bg-transparent rounded-xl dark:border-slate-800">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Input
              type="url"
              placeholder="https://forms.google.com/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-amber-600 text-gray-900 dark:text-white pr-12 h-14 rounded-lg shadow-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1.5 top-1.5 h-11 w-11 rounded-lg bg-blue-600 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
            </Button>
          </div>
          
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default FormUrlInput;