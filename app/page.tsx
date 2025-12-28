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
    <div className="min-h-screen relative bg-background">
      {/* Global Effects */}
      <SplashCursor />

      <Navbar />

      <main className="relative">
        {/* Hero Section with GridScan Background */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <GridScan />
          </div>

          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse"
            style={{ animationDelay: "2s" }}
          />

          <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="max-w-6xl mx-auto space-y-10">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-500/10 border border-purple-500/30 backdrop-blur-md">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span className="text-base font-medium text-purple-300">Powered by Google Gemini AI</span>
              </div>

              <h1 className="text-7xl md:text-9xl font-black leading-[0.9] tracking-tight text-balance">
                <span className="block bg-gradient-to-br from-white via-white to-gray-300 bg-clip-text text-transparent">
                  Your Personal
                </span>
                <span className="block bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                  AI Companion
                </span>
              </h1>

              <p className="text-2xl md:text-3xl text-gray-400 max-w-4xl mx-auto text-pretty leading-relaxed font-light">
                Experience conversations that feel <span className="text-white font-medium">remarkably human</span> with
                voice input, multiple personalities, and intelligent memory.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                <Button
                  asChild
                  size="lg"
                  className="group relative bg-gradient-to-r from-purple-600 via-fuchsia-600 to-blue-600 hover:from-purple-700 hover:via-fuchsia-700 hover:to-blue-700 text-white text-xl font-semibold px-12 py-8 rounded-full shadow-2xl shadow-purple-500/30 transition-all hover:scale-105 hover:shadow-purple-500/50"
                >
                  <Link href="/api/auth/signin">
                    <Rocket className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                    Get Started Free
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/20 hover:border-white/40 hover:bg-white/5 text-white text-xl font-semibold px-12 py-8 rounded-full backdrop-blur-md bg-transparent transition-all hover:scale-105"
                >
                  <Link href="#features">
                    <Brain className="w-6 h-6 mr-3" />
                    Explore Features
                  </Link>
                </Button>
              </div>

              <div className="relative -mb-32 mt-16">
                <LightPillar />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section with LightRays Background */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <LightRays />
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                { value: "99.9%", label: "Uptime Guarantee" },
                { value: "<100ms", label: "Response Time" },
                { value: "10M+", label: "Messages Sent" },
                { value: "4.9/5", label: "User Rating" },
              ].map((stat, i) => (
                <GlassCard key={i} className="p-8 text-center hover:scale-105 transition-all duration-300">
                  <div className="text-5xl md:text-6xl font-black bg-gradient-to-br from-purple-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent mb-3">
                    {stat.value}
                  </div>
                  <div className="text-base text-gray-400 font-medium">{stat.label}</div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section with PixelTransition Background */}
        <section id="features" className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-40">
            <PixelTransition />
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent" />

          <div className="container relative z-10 mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-6xl md:text-7xl font-black mb-6 text-balance">
                <span className="bg-gradient-to-br from-white via-purple-100 to-blue-100 bg-clip-text text-transparent">
                  Intelligent Features
                </span>
              </h2>
              <p className="text-2xl text-gray-400 max-w-3xl mx-auto text-pretty font-light">
                Everything you need for meaningful AI conversations,{" "}
                <span className="text-white font-medium">powered by cutting-edge technology</span>
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {[
                {
                  icon: MessageSquare,
                  title: "Natural Conversations",
                  description: "Engage in fluid, context-aware discussions that feel remarkably human and intuitive",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  icon: Mic,
                  title: "Voice Input",
                  description: "Speak naturally and watch your words transform into text with real-time transcription",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Code2,
                  title: "Senior Developer Mode",
                  description: "Expert-level code reviews, debugging assistance, and architecture guidance on demand",
                  gradient: "from-green-500 to-emerald-500",
                },
                {
                  icon: Heart,
                  title: "ELI5 Mode",
                  description: "Complex topics explained simply and clearly, perfect for learning new concepts quickly",
                  gradient: "from-orange-500 to-red-500",
                },
                {
                  icon: Laugh,
                  title: "Roast Mode",
                  description: "Playful, witty responses that add humor and personality to your conversations",
                  gradient: "from-yellow-500 to-orange-500",
                },
                {
                  icon: Brain,
                  title: "Chat Memory",
                  description: "Context-aware conversations that remember and build upon your previous discussions",
                  gradient: "from-indigo-500 to-purple-500",
                },
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description: "Near-instant responses powered by optimized Google Gemini AI inference engines",
                  gradient: "from-cyan-500 to-blue-500",
                },
                {
                  icon: Shield,
                  title: "Secure & Private",
                  description: "Your conversations are encrypted end-to-end and never shared with third parties",
                  gradient: "from-red-500 to-pink-500",
                },
                {
                  icon: Sparkles,
                  title: "Always Improving",
                  description: "Regular updates bring new features, enhanced capabilities, and better performance",
                  gradient: "from-purple-500 to-blue-500",
                },
              ].map((feature, i) => (
                <GlassCard
                  key={i}
                  className="group p-10 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  <div className="mb-6">
                    <div
                      className={`inline-flex p-4 rounded-3xl bg-gradient-to-br ${feature.gradient} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-base">{feature.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section with GridScan Background */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-30">
            <GridScan />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-background via-purple-950/10 to-background" />

          <div className="container relative z-10 mx-auto px-4">
            <GlassCard className="max-w-5xl mx-auto p-16 text-center hover:scale-105 transition-all duration-500">
              <h2 className="text-5xl md:text-6xl font-black mb-8 text-balance">
                <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
                  Ready to Transform Your Conversations?
                </span>
              </h2>
              <p className="text-2xl text-gray-400 mb-12 text-pretty max-w-3xl mx-auto font-light leading-relaxed">
                Join thousands of users experiencing the future of{" "}
                <span className="text-white font-medium">AI-powered communication</span>
              </p>
              <Button
                asChild
                size="lg"
                className="group bg-gradient-to-r from-purple-600 via-fuchsia-600 to-blue-600 hover:from-purple-700 hover:via-fuchsia-700 hover:to-blue-700 text-white text-xl font-semibold px-16 py-8 rounded-full shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/60 transition-all hover:scale-110"
              >
                <Link href="/api/auth/signin">
                  <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                  Start Chatting Now
                </Link>
              </Button>
            </GlassCard>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative border-t border-white/5 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center text-gray-500">
              <p className="text-base">&copy; 2025 NeuralChat. Built with Next.js, Google Gemini AI, and passion.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
