# Neptune - RAG Chatbot

A modern AI chatbot built with Next.js featuring Retrieval-Augmented Generation (RAG), persistent memory, and a clean, responsive interface.

Neptune is designed to remember conversations across sessions while remaining lightweight and simple. It does not rely on a backend server or database.

---

## Features

- Modern landing page with custom visual components
- Retrieval-Augmented Generation (RAG) for context-aware responses
- Persistent memory stored locally across sessions
- Multiple chat modes:
  - Default Assistant
  - Senior Developer
  - Explain Like I'm 5 (ELI5)
- Dark and light theme support
- Fully responsive mobile-first interface
- Fast client-side performance
- No backend required

---

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory.

Choose one AI provider:

```env
OPENAI_API_KEY=your_openai_api_key
# OR
ANTHROPIC_API_KEY=your_anthropic_api_key
# OR
GEMINI_API_KEY=your_gemini_api_key
