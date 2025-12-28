import { type NextRequest, NextResponse } from "next/server"

const SYSTEM_PROMPTS = {
  default: "You are a helpful AI assistant. Provide clear, concise, and accurate responses.",
  developer:
    "You are a Senior Software Developer with 15+ years of experience. Provide expert-level technical advice, code reviews, and architectural guidance. Be precise and thorough.",
  eli5: "You are an expert at explaining complex topics in simple terms that a 5-year-old could understand. Use analogies, simple language, and avoid jargon.",
  roast:
    "You are a witty, playful AI with a great sense of humor. Provide funny, lighthearted roasts and jokes. Keep it fun and never offensive or mean-spirited.",
}

export async function POST(req: NextRequest) {
  try {
    const { messages, mode = "default" } = await req.json()

    const systemPrompt = SYSTEM_PROMPTS[mode as keyof typeof SYSTEM_PROMPTS] || SYSTEM_PROMPTS.default

    // TODO: Replace with actual AI API call (OpenAI, Anthropic, etc.)
    // For now, return a mock response
    const mockResponse = generateMockResponse(messages[messages.length - 1].content, mode)

    return NextResponse.json({ message: mockResponse })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}

function generateMockResponse(userMessage: string, mode: string): string {
  const responses: Record<string, string> = {
    default: `I received your message: "${userMessage}". This is a mock response. To enable real AI responses, please add your AI API key (OpenAI, Anthropic, etc.) to the environment variables and update the /app/api/chat/route.ts file.`,
    developer: `As a senior developer, I'd approach "${userMessage}" by first analyzing the requirements, considering scalability and maintainability. This is a mock response - integrate your preferred AI API to get real technical guidance.`,
    eli5: `Imagine "${userMessage}" is like... well, this is a mock response! To get real simple explanations, add your AI API key and update the chat route.`,
    roast: `Oh, you want to talk about "${userMessage}"? That's adorable! 😄 This is a mock response though - set up your AI API to get actual witty roasts!`,
  }

  return responses[mode] || responses.default
}
