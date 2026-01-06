"use client"

import { useState, useRef, useEffect } from "react"
import {
  Send,
  Loader2,
  Sparkles,
  MessageSquare,
  Power,
  Menu,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: number
}

const STORAGE_KEY = "neptune-chat-history"

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()


  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  /* Load from localStorage */
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) setMessages(JSON.parse(stored))
  }, [])

  /* Persist to localStorage */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  /* Autofocus */
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const clearChat = () => {
    setMessages([])
    localStorage.removeItem(STORAGE_KEY)
  }

  const typeAssistantMessage = (text: string) => {
    let index = 0

    const newMessage: Message = {
      role: "assistant",
      content: "",
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, newMessage])

    const interval = setInterval(() => {
      index++
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content: text.slice(0, index),
        }
        return updated
      })

      if (index >= text.length) clearInterval(interval)
    }, 18)
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      const data = await res.json()
      typeAssistantMessage(data.message)
    } catch {
      typeAssistantMessage("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-full bg-background text-zinc-100 overflow-hidden font-[Inter,system-ui,sans-serif]">

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-[280px]
          flex flex-col border-r border-white/10
          bg-background/80 backdrop-blur-md
          transform transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0
        `}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-purple-400" />
            <h1 className="font-semibold tracking-wide text-lg">
              Neptune AI
            </h1>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-zinc-500 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 p-4 space-y-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg
            bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <MessageSquare className="h-4 w-4" />
            Chat
          </button>

          <Button
            variant="ghost"
            onClick={clearChat}
            className="w-full justify-start text-zinc-400 hover:text-red-500"
          >
            Clear conversation
          </Button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col min-h-0">

        {/* HEADER */}
        <header className="h-16 border-b border-white/10 bg-background/70 backdrop-blur-sm
          flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-zinc-500 hover:text-white"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="text-sm text-purple-400/60">
              Chat with Neptune            </span>
          </div>

          <button
  className="p-2 text-zinc-500 hover:text-red-500"
  onClick={() => router.push("/notfound")}
>
  <Power className="h-4 w-4" />
</button>
        </header>

        {/* CHAT */}
        <div className="flex-1 flex flex-col min-h-0 bg-background/40">

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8 space-y-6">
            {!messages.length && !isLoading && (
              <div className="h-full flex items-center justify-center opacity-50">
                <div className="text-center space-y-2">
                  <Sparkles className="mx-auto h-8 w-8 text-purple-400" />
                  <p className="text-base">
                    Ask anything — code, ideas, explanations, or fun.
                  </p>
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`
                    max-w-[80%] md:max-w-[65%]
                    rounded-3xl px-5 py-4 text-[15px] leading-relaxed
                    ${m.role === "user"
                      ? "bg-gradient-to-br from-purple-600 via-fuchsia-600 to-blue-600 text-white"
                      : "bg-white/5 backdrop-blur-md text-gray-200"}
                  `}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 rounded-3xl px-5 py-4">
                  <Loader2 className="h-5 w-5 animate-spin text-purple-400" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div className="border-t border-white/10 p-4 md:p-6 bg-background/70 backdrop-blur-xl">
            <div className="max-w-4xl mx-auto flex items-end gap-3">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Message Neptune…"
                disabled={isLoading}
                className="flex-1 min-h-[52px] rounded-2xl bg-white/5 border-white/10 px-5 text-[15px]"
              />

              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="h-12 px-6 rounded-xl
                  bg-gradient-to-r from-purple-600 via-fuchsia-600 to-blue-600"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
              </Button>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
