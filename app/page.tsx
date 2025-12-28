import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { GridScan } from "@/components/reactbits/grid-scan"
import { LightRays } from "@/components/reactbits/light-rays"
import { LightPillar } from "@/components/reactbits/light-pillar"
import { PixelTransition } from "@/components/reactbits/pixel-transition"
import { GlassCard } from "@/components/reactbits/glass-card"
import { SplashCursor } from "@/components/reactbits/splash-cursor"
import { Button } from "@/components/ui/button"
import { Sparkles, Mic, Zap, Brain, Shield, Rocket, MessageSquare, Code2, Heart, Laugh } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <GridScan />
      <PixelTransition />
      <SplashCursor />

      {/* Gradient Orbs */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
      <div
        className="fixed bottom-20 right-10 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <Navbar />

      <main className="relative z-10 pt-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-32 pb-24 text-center">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Powered by Advanced AI</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold leading-tight text-balance">
              <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Your Personal
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI Companion
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Experience the next generation of AI assistance with voice input, multiple personalities, and intelligent
              conversation memory. Your thoughts, amplified.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6 rounded-full shadow-2xl shadow-purple-500/50"
              >
                <Link href="/api/auth/signin">
                  <Rocket className="w-5 h-5 mr-2" />
                  Get Started Free
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 hover:bg-white/5 text-lg px-8 py-6 rounded-full backdrop-blur-sm bg-transparent"
              >
                <Link href="#features">
                  <Brain className="w-5 h-5 mr-2" />
                  Explore Features
                </Link>
              </Button>
            </div>

            {/* Light Pillar Effect */}
            <LightPillar className="w-full h-64 -mt-32" />
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { value: "99.9%", label: "Uptime" },
              { value: "<100ms", label: "Response Time" },
              { value: "10M+", label: "Messages Processed" },
              { value: "4.9/5", label: "User Rating" },
            ].map((stat, i) => (
              <GlassCard key={i} className="p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-balance">
              <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Intelligent Features
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Everything you need for meaningful AI conversations, powered by cutting-edge technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: MessageSquare,
                title: "Natural Conversations",
                description: "Engage in fluid, context-aware discussions that feel remarkably human",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: Mic,
                title: "Voice Input",
                description: "Speak naturally and watch your words transform into text instantly",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Code2,
                title: "Senior Developer Mode",
                description: "Get expert-level code reviews, debugging help, and architecture guidance",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Heart,
                title: "ELI5 Mode",
                description: "Complex topics explained simply, perfect for learning new concepts",
                color: "from-orange-500 to-red-500",
              },
              {
                icon: Laugh,
                title: "Roast Mode",
                description: "Playful, witty responses that add humor to your conversations",
                color: "from-yellow-500 to-orange-500",
              },
              {
                icon: Brain,
                title: "Chat Memory",
                description: "Context-aware conversations that remember your previous discussions",
                color: "from-indigo-500 to-purple-500",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Instant responses powered by optimized AI inference engines",
                color: "from-cyan-500 to-blue-500",
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Your conversations are encrypted and never shared with third parties",
                color: "from-red-500 to-pink-500",
              },
              {
                icon: Sparkles,
                title: "Always Improving",
                description: "Regular updates bring new features and enhanced capabilities",
                color: "from-purple-500 to-blue-500",
              },
            ].map((feature, i) => (
              <GlassCard key={i} className="p-8 hover:scale-105 transition-transform duration-300">
                <div className="mb-4">
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.color}`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-24">
          <GlassCard className="max-w-4xl mx-auto p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Ready to Transform Your Conversations?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Join thousands of users who are already experiencing the future of AI assistance
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-12 py-6 rounded-full shadow-2xl shadow-purple-500/50"
            >
              <Link href="/api/auth/signin">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Chatting Now
              </Link>
            </Button>
          </GlassCard>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-12 border-t border-white/10">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2025 NeuralChat. Built with Next.js and AI.</p>
          </div>
        </footer>
      </main>
    </div>
  )
}
