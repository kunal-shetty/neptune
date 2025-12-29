"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/reactbits/glass-card"
import { Send, Mic, MicOff, Loader2, Trash2, Sparkles } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const CHAT_MODES = {
  default: "Default Assistant",
  developer: "Senior Developer",
  eli5: "Explain Like I'm 5",
  roast: "Roast Mode",
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [mode, setMode] = useState<keyof typeof CHAT_MODES>("default")

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  // Speech recognition
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false

      recognitionRef.current.onresult = (event: any) => {
        setInput(event.results[0][0].transcript)
        setIsListening(false)
      }

      recognitionRef.current.onerror = () => setIsListening(false)
      recognitionRef.current.onend = () => setIsListening(false)
    }
  }, [])

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) return alert("Voice input not supported")
    isListening ? recognitionRef.current.stop() : recognitionRef.current.start()
    setIsListening(!isListening)
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          mode,
        }),
      })

      const data = await res.json()

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message,
          timestamp: new Date(),
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-10">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight
            bg-gradient-to-br from-purple-400 via-fuchsia-400 to-blue-400
            bg-clip-text text-transparent">
            AI Chat
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Talk naturally. Switch personalities. Think faster.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <Select value={mode} onValueChange={(v) => setMode(v as keyof typeof CHAT_MODES)}>
              <SelectTrigger className="w-full sm:w-56 bg-white/5 backdrop-blur-md border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CHAT_MODES).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setMessages([])}
              disabled={!messages.length}
              className="border-white/10 hover:bg-white/5"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>

        {/* CHAT */}
        <GlassCard
          className="
            relative h-[72vh] max-h-[820px]
            flex flex-col overflow-hidden
            border border-white/10 backdrop-blur-xl
          "
        >
          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 py-6 space-y-6">
            {!messages.length && !isLoading && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-400 space-y-3">
                  <Sparkles className="mx-auto w-8 h-8 text-purple-400" />
                  <p className="text-xl font-medium">Start a conversation</p>
                  <p className="text-sm opacity-70">
                    Ask anything — code, ideas, explanations, or fun.
                  </p>
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`
                    max-w-[85%] sm:max-w-[70%]
                    rounded-3xl px-5 py-4 shadow-lg
                    ${
                      m.role === "user"
                        ? "bg-gradient-to-br from-purple-600 via-fuchsia-600 to-blue-600 text-white"
                        : "bg-white/5 backdrop-blur-md text-gray-200"
                    }
                  `}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
                  <p className="text-[11px] opacity-60 mt-2 text-right">
                    {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 rounded-3xl px-5 py-4">
                  <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div className="border-t border-white/10 p-4 sm:p-6 bg-background/70 backdrop-blur-xl">
            <div className="flex items-end gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message AI…"
                disabled={isLoading}
                className="
                  flex-1 min-h-[52px]
                  rounded-2xl bg-white/5 border-white/10
                  px-5 text-base
                "
              />

              <Button
                size="icon"
                onClick={toggleVoiceInput}
                disabled={isLoading}
                className={`h-12 w-12 rounded-xl ${
                  isListening ? "bg-red-500 hover:bg-red-600" : "bg-white/5 hover:bg-white/10"
                }`}
              >
                {isListening ? <MicOff /> : <Mic />}
              </Button>

              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="
                  h-12 px-6 rounded-xl
                  bg-gradient-to-r from-purple-600 via-fuchsia-600 to-blue-600
                  hover:opacity-90
                "
              >
                {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
              </Button>
            </div>
          </div>
        </GlassCard>
      </main>
    </div>
  )
}
