# NeuralChat - AI Chatbot Application

A modern, production-ready AI chatbot built with Next.js featuring Google OAuth authentication, multiple chat modes, voice input, and stunning visual effects.

## Features

- 🎨 **Super Modern Landing Page** with ReactBits components (GridScan, LightRays, LightPillar, etc.)
- 🔐 **Google OAuth Authentication** (Ready for NextAuth.js setup)
- 💬 **Multiple Chat Modes**:
  - Default Assistant
  - Senior Developer
  - Explain Like I'm 5 (ELI5)
  - Roast Mode (Playful & Funny)
- 🎤 **Voice Input** using Web Speech API
- 💾 **Chat Memory** (Ready for database integration)
- 🌓 **Dark/Light Mode** with smooth transitions
- 📱 **Fully Responsive** mobile-first design
- ⚡ **Lightning Fast** with optimized performance

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Google OAuth (for NextAuth.js)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# AI API (Choose one)
OPENAI_API_KEY=your_openai_api_key
# OR
ANTHROPIC_API_KEY=your_anthropic_api_key
# OR
GEMINI_API_KEY=your_gemini_api_key

# Database (Optional - for chat history)
DATABASE_URL=your_database_url
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env.local`

### 4. Integrate AI API

Update `/app/api/chat/route.ts` to use your preferred AI provider:

**For OpenAI:**
```typescript
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const completion = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'system', content: systemPrompt },
    ...messages,
  ],
})

const response = completion.choices[0].message.content
```

### 5. Set Up Authentication

Install NextAuth.js:
```bash
npm install next-auth
```

Create `/app/api/auth/[...nextauth]/route.ts` with Google provider configuration.

### 6. Database Setup (Optional)

For chat history persistence, integrate one of:
- **MongoDB**: Install `mongodb` package
- **PostgreSQL**: Install `pg` package
- **Supabase**: Install `@supabase/supabase-js`
- **SQLite**: Install `better-sqlite3`

### 7. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Authentication**: NextAuth.js (Ready to configure)
- **Voice**: Web Speech API
- **Animation**: Custom React components

## Project Structure

```
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # AI chat endpoint
│   ├── chat/
│   │   └── page.tsx               # Chat interface
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Landing page
│   └── globals.css                # Global styles
├── components/
│   ├── reactbits/                 # Custom visual effects
│   │   ├── grid-scan.tsx
│   │   ├── light-rays.tsx
│   │   ├── light-pillar.tsx
│   │   ├── pixel-transition.tsx
│   │   ├── glass-card.tsx
│   │   └── splash-cursor.tsx
│   ├── ui/                        # shadcn components
│   ├── navbar.tsx                 # Navigation bar
│   └── theme-provider.tsx         # Theme context
└── README.md
```

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Remember to add all environment variables in Vercel dashboard.

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License
