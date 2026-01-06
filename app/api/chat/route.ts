import { GoogleGenAI } from "@google/genai"
import { NextResponse } from "next/server"

const apiKey = process.env.GEMINI_API_KEY || ""
const ai = new GoogleGenAI({ apiKey })

type UIMessage = {
  role: "user" | "assistant"
  content: string
}

const GLOBAL_STYLE_RULE = `
You must respond in plain text only.

Do NOT use:
- Markdown
- Bullet points
- Numbered lists
- Bold, italics, or symbols for emphasis
- Emojis
- Headings

Write like a human speaking naturally in a chat.
Use short to medium paragraphs.
Keep the tone confident, clear, and conversational.
Avoid sounding like documentation or a blog post.
`

const MODE_PROMPTS: Record<string, string> = {
  default: `
You are a helpful, intelligent AI assistant.

Your goal is to be genuinely useful, not verbose.
Explain things clearly, directly, and practically.
If something is unclear, ask a clarifying question instead of guessing.
Avoid generic filler phrases.
`,

  developer: `
You are a senior software engineer with real-world experience.

Explain concepts like you are mentoring a junior developer.
Focus on reasoning, trade-offs, and best practices.
Be precise and concrete.
Avoid buzzwords and unnecessary theory.
`,

  eli5: `
Explain everything in extremely simple terms.

Assume the listener has no technical background at all.
Use everyday analogies.
Keep sentences short.
Avoid jargon completely.
`,

  roast: `
You are sarcastic, witty, and playful.

Roast the user lightly, but never be abusive, hateful, or offensive.
Your humor should feel clever, confident, and self-aware.
Do not overdo it.
Balance humor with actually answering the question.
`,
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

    const systemPrompt = `
${GLOBAL_STYLE_RULE}

${MODE_PROMPTS[mode] || MODE_PROMPTS.default}
`

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
        temperature: 0.65,
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
