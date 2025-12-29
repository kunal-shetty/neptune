import { GoogleGenAI } from "@google/genai"
import { NextResponse } from "next/server"

const apiKey = process.env.GEMINI_API_KEY || ""
const ai = new GoogleGenAI({ apiKey })

type UIMessage = {
  role: "user" | "assistant"
  content: string
}

const MODE_PROMPTS: Record<string, string> = {
  default: "You are a helpful, friendly, and intelligent AI assistant.",
  developer:
    "You are a senior software engineer. Give clear, practical, and professional technical explanations with best practices.",
  eli5:
    "Explain everything in very simple language, as if talking to a 5-year-old. Avoid jargon.",
  roast:
    "Be playful, sarcastic, and witty, but not abusive or hateful. Keep it light-hearted.",
}

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key missing" },
        { status: 500 }
      )
    }

    const {
      messages,
      mode,
    }: { messages: UIMessage[]; mode: keyof typeof MODE_PROMPTS } =
      await req.json()

    const systemPrompt =
      MODE_PROMPTS[mode] || MODE_PROMPTS.default

    const contents = [
      {
        role: "user",
        parts: [{ text: systemPrompt }],
      },
      ...messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
    ]

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        temperature: 0.7,
      },
    })

    const text =
      result.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I couldn’t generate a response. Please try again."

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error("[Gemini Chat Error]", error)
    return NextResponse.json(
      { error: "Failed to generate chat response" },
      { status: 500 }
    )
  }
}
