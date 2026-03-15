# Neptune - RAG Chatbot

Neptune is a modern AI chatbot built with Next.js that uses Retrieval-Augmented Generation (RAG) to produce context-aware responses.  
It supports persistent conversation memory while remaining lightweight and simple.

The application runs without a dedicated backend or database and stores memory locally.

---

## Features

- Modern landing page with custom visual components
- Retrieval-Augmented Generation (RAG) for contextual responses
- Persistent conversation memory across sessions
- Multiple chat modes:
  - Default Assistant
  - Senior Developer
  - Explain Like I'm 5 (ELI5)
  - Roast Mode
- Voice input using the Web Speech API
- Dark and light theme support
- Fully responsive mobile-first interface
- Fast client-side performance
- No backend or database required

---

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory.

Choose one AI provider:


OPENAI_API_KEY=your_openai_api_key

OR

ANTHROPIC_API_KEY=your_anthropic_api_key

OR

GEMINI_API_KEY=your_gemini_api_key


---

### 2. Install Dependencies


npm install

or

pnpm install


---

### 3. Configure RAG Documents

Place your knowledge documents inside a directory such as:


/data
/documents
/knowledge


These files will be used by the retrieval system to provide additional context for the model.

---

### 4. Run the Application


npm run dev


Open the application in your browser:


http://localhost:3000


---

## Tech Stack

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- UI Components: shadcn/ui
- AI Providers: OpenAI, Anthropic, or Gemini
- Voice Input: Web Speech API
- Retrieval: Retrieval-Augmented Generation (RAG)
- Memory: Local persistent storage

---

## How Neptune Works

1. The user sends a message to the chatbot.
2. The system retrieves relevant content from local documents.
3. Retrieved context is injected into the prompt.
4. The AI model generates a response using that context.
5. The conversation is stored locally to maintain persistent memory.

This allows Neptune to maintain conversational awareness without requiring a database or backend service.

---

## Deployment

The application can be deployed easily using Vercel.

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Add your AI API key as an environment variable.

After deployment, the application will be available at your Vercel domain.

---

## Contributing

Contributions are welcome.

If you would like to improve Neptune, feel free to open issues or submit pull requests.
