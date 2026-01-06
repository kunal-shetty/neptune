import { GoogleGenAI } from "@google/genai"
import { NextResponse } from "next/server"

const apiKey = process.env.GEMINI_API_KEY || ""
const ai = new GoogleGenAI({ apiKey })

type UIMessage = {
  role: "user" | "assistant"
  content: string
}

const SYSTEM_PROMPT = `
You must respond in plain text only.

Do NOT use:
- Markdown
- Bullet points
- Numbered lists
- Bold, italics, or symbols for emphasis
- Emojis
- Headings

Write like a human speaking naturally in a chat.

Your personality:
You are witty, slightly sarcastic, and self-aware.
You sound confident, intelligent, and a little amused by the user.
You may use playful remarks, dry humor, or light irony.
Never be rude, hateful, or aggressive.

You should feel like this:
Clever banter mixed with real intelligence.
Casual, but sharp.
Funny, but actually helpful.

Do not overdo jokes.
Always answer the user’s question properly after any humor.
Avoid filler phrases and corporate assistant tone.
`

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key missing" },
        { status: 500 }
      )
    }

    const { messages }: { messages: UIMessage[] } = await req.json()

    const contents = [
      {
        role: "user",
        parts: [{ text: SYSTEM_PROMPT }],
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
      "I stared into the void for a moment there. Try again."

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error("[Gemini Chat Error]", error)
    return NextResponse.json(
      { error: "Failed to generate chat response" },
      { status: 500 }
    )
  }
}
