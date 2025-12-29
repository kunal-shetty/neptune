"use client"

import Link from "next/link"
import { GridScan } from "@/components/reactbits/grid-scan"
import { LightPillar } from "@/components/reactbits/light-pillar"
import { GlassCard } from "@/components/reactbits/glass-card"
import { Button } from "@/components/ui/button"
import { Sparkles, Brain, Rocket } from "lucide-react"
import SplashCursor from "@/components/reactbits/splash-cursor"
import { ScrollSection } from "@/components/reactbits/scroll-section"
import { NeptuneFooter } from "@/components/neptune-hero"
import { MagneticButton } from "@/components/magnetic-button"

export default function Home() {
  return (
    <div className="min-h-screen relative bg-background">
      <SplashCursor />

      <main className="relative">
        {/* HERO */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <GridScan />
          </div>

          {/* Fade */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 sm:h-48 z-10 bg-gradient-to-b from-transparent to-background" />

          {/* Glows */}
          <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-purple-500/10 border border-purple-500/30 backdrop-blur-md">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                <span className="text-xs sm:text-sm md:text-base font-medium text-purple-300">
                  Powered by Google Gemini
                </span>
              </div>

              {/* Heading */}
              <h1
                className="
                  text-4xl
                  sm:text-5xl
                  md:text-6xl
                  lg:text-7xl
                  xl:text-8xl
                  font-black
                  tracking-tight
                  leading-tight
                  sm:leading-[1]
                  md:leading-[0.95]
                  text-balance
                "
              >
                <span className="block bg-gradient-to-br from-white via-white to-gray-300 bg-clip-text text-transparent">
                  Meet Neptune
                </span>
                <span className="block bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                  Your Personal AI Companion
                </span>
              </h1>

              {/* Description */}
              <p
                className="
                  text-base
                  sm:text-lg
                  md:text-xl
                  lg:text-2xl
                  text-gray-400
                  max-w-4xl
                  mx-auto
                  leading-relaxed
                  font-light
                "
              >
                Experience deep, natural conversations with{" "}
                <span className="text-white font-medium">Neptune</span> —
                an AI designed to understand context, adapt to you,
                and respond with clarity.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 sm:pt-8">
                <Button
                  asChild
                  size="lg"
                  className="
                    group
                    bg-gradient-to-r from-purple-600 via-fuchsia-600 to-blue-600
                    hover:from-purple-700 hover:via-fuchsia-700 hover:to-blue-700
                    text-white
                    text-base sm:text-lg
                    font-semibold
                    px-6 sm:px-10 md:px-12
                    py-4 sm:py-6 md:py-8
                    rounded-full
                    shadow-2xl shadow-purple-500/30
                    transition-all hover:scale-105
                  "
                >
                  <Link href="/">
                    <Rocket className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:rotate-12 transition-transform" />
                    Talk to Neptune
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="
                    border-2 border-white/20 hover:border-white/40 hover:bg-white/5
                    text-white
                    text-base sm:text-lg
                    font-semibold
                    px-6 sm:px-10 md:px-12
                    py-4 sm:py-6 md:py-8
                    rounded-full
                    backdrop-blur-md
                    transition-all hover:scale-105
                  "
                >
                  <Link href="#features">
                    <Brain className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                    What Neptune Can Do
                  </Link>
                </Button>
              </div>

              {/* Accent */}
              <div className="relative -mb-24 sm:-mb-32 mt-12 sm:mt-16">
                <LightPillar />
              </div>
            </div>
          </div>
        </section>
        {/* STATS */}
        <section className="relative py-20 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-[0.08]">
            <GridScan />
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {[
                { value: "99.9%", label: "Always Available" },
                { value: "<100ms", label: "Instant Responses" },
                { value: "10M+", label: "Conversations Powered" },
                { value: "4.9/5", label: "Loved by Users" },
              ].map((stat, i) => (
                <GlassCard key={i} className="p-6 sm:p-8 text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-br from-purple-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent mb-2 sm:mb-3">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="relative py-20 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent" />

          {/* Scroll cue */}
          <div className="mb-12 sm:mb-20 flex justify-center">
            <div className="flex flex-col items-center gap-2 text-purple-300/70 animate-pulse">
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <div className="w-[2px] h-8 sm:h-10 bg-gradient-to-b from-purple-400 to-transparent rounded-full" />
            </div>
          </div>

          <div className="relative z-10">
            <ScrollSection />
          </div>
        </section>
        {/* CTA */}
        <section className="relative py-20 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-30">
            <GridScan />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-background via-purple-950/10 to-background" />

          <div className="container relative z-10 mx-auto px-4">
            <GlassCard className="max-w-5xl mx-auto p-8 sm:p-16 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 text-balance">
                <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
                  Ready to Talk to Neptune?
                </span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                Discover a deeper, smarter, and more human AI experience —
                powered by Neptune.
              </p>
              <MagneticButton variant="primary" size="large">
                <Link href="/">
                  Start with Neptune
                </Link>
              </MagneticButton>
            </GlassCard>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative border-t border-white/5 py-10 sm:py-12">
          <div className="container mx-auto px-4 text-center text-gray-500">
            <p className="text-sm sm:text-base">
              Neptune — Depth. Intelligence. Clarity.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
