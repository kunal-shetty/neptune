"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { GridScan } from "@/components/reactbits/grid-scan"
import { GlassCard } from "@/components/reactbits/glass-card"
import { Sparkles } from "lucide-react"
import { MagneticButton } from "./magnetic-button"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function NeptuneFooter() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Initial hidden state (NO style change, just transform/opacity)
      gsap.set([titleRef.current, descRef.current, ctaWrapRef.current], {
        opacity: 0,
        y: 40,
      })

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      })
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .to(
          descRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          ctaWrapRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "back.out(1.6)",
          },
          "-=0.3"
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* CTA FOOTER SECTION */}
      <section
        ref={sectionRef}
        className="relative py-20 sm:py-32 overflow-hidden"
      >
        {/* Background grid */}
        <div className="absolute inset-0 z-0 opacity-30">
          <GridScan />
        </div>

        {/* Gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-purple-950/10 to-background" />

        <div className="container relative z-10 mx-auto px-4">
          <GlassCard className="max-w-5xl mx-auto p-8 sm:p-16 text-center">
            <h2
              ref={titleRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 text-balance"
            >
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
                Ready to Talk to Neptune?
              </span>
            </h2>

            <p
              ref={descRef}
              className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-12 max-w-3xl mx-auto font-light leading-relaxed"
            >
              Discover a deeper, smarter, and more human AI experience —
              powered by Neptune.
            </p>

            {/* IMPORTANT: MagneticButton is untouched */}
            <div ref={ctaWrapRef} className="flex justify-center">
              <MagneticButton variant="primary" size="large">
                <Link href="/">
                  Start with Neptune
                </Link>
              </MagneticButton>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* FINAL FOOTER */}
      <footer className="relative border-t border-white/5 py-10 sm:py-12">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p className="text-sm sm:text-base">
            Neptune — Depth. Intelligence. Clarity.
          </p>
        </div>
      </footer>
    </>
  )
}
