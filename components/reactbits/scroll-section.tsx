"use client"

import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const stages = [
  {
    title: "Discover",
    description: "Explore ideas, questions, and possibilities with Neptune",
    word: "THINK",
  },
  {
    title: "Understand",
    description: "Break down complexity into clear, simple insights",
    word: "LEARN",
  },
  {
    title: "Create",
    description: "Turn thoughts into structured, actionable output",
    word: "BUILD",
  },
  {
    title: "Refine",
    description: "Improve clarity, quality, and precision effortlessly",
    word: "POLISH",
  },
  {
    title: "Deliver",
    description: "Confidently share results that make an impact",
    word: "SHIP",
  },
]


export function ScrollSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const stagesRef = useRef<HTMLDivElement[]>([])
  const progressRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current || !containerRef.current) return

    const ctx = gsap.context(() => {
      // 🔹 MASTER TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${stages.length * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      // 🔹 RESET EVERYTHING (CRITICAL)
      gsap.set(stagesRef.current, {
        opacity: 0,
        scale: 0.9,
        filter: "blur(20px)",
      })

      stagesRef.current.forEach((stage, i) => {
        if (!stage) return

        const title = stage.querySelector(".stage-title")
        const desc = stage.querySelector(".stage-desc")
        const word = stage.querySelector(".stage-word")
        const number = stage.querySelector(".stage-number")

        const label = `stage-${i}`

        // ================= ENTER =================
        tl.addLabel(label)

        tl.to(
          stage,
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.4,
            ease: "power2.out",
          },
          label
        )

        tl.fromTo(
          title,
          {
            y: 60,
            clipPath: "polygon(0 100%,100% 100%,100% 100%,0 100%)",
          },
          {
            y: 0,
            clipPath: "polygon(0 0%,100% 0%,100% 100%,0 100%)",
            duration: 0.4,
            ease: "power3.out",
          },
          label
        )

        tl.fromTo(
          desc,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
          label + "+=0.15"
        )

        tl.fromTo(
          word,
          { x: -120, opacity: 0 },
          { x: 0, opacity: 0.03, duration: 0.4, ease: "power2.out" },
          label
        )

        tl.fromTo(
          number,
          { scale: 0, rotation: -180 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          label
        )

        // ================= HOLD =================
        tl.to({}, { duration: 0.6 })

        // ================= EXIT =================
        if (i < stagesRef.current.length - 1) {
          tl.to(
            stage,
            {
              opacity: 0,
              scale: 1.05,
              filter: "blur(10px)",
              duration: 0.3,
              ease: "power2.in",
            },
            ">-0.2"
          )

          tl.to(
            word,
            {
              x: 120,
              opacity: 0,
              duration: 0.3,
              ease: "power2.in",
            },
            "<"
          )
        }
      })

      // 🔹 PROGRESS BAR
      tl.to(
        progressRef.current,
        {
          scaleX: 1,
          ease: "none",
        },
        0
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen bg-background overflow-hidden">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-border/20 z-20">
        <div
  ref={progressRef}
  className="h-full origin-left
    bg-gradient-to-r
    from-purple-600
    via-fuchsia-600
    to-blue-600
  "
  style={{ transform: "scaleX(0)" }}
/>

      </div>

      {/* Stage indicators */}
    

      <div ref={containerRef} className="relative h-full flex items-center justify-center">
        {stages.map((stage, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) stagesRef.current[i] = el
            }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            {/* Background word */}
            <div className="stage-word absolute text-[20vw] font-black text-foreground pointer-events-none select-none opacity-0">
              {stage.word}
            </div>

            {/* Stage number */}
            <div className="stage-number absolute top-20 right-20 text-9xl font-black
  bg-gradient-to-r from-purple-600 via-fuchsia-600 to-blue-600
  bg-clip-text text-transparent
  opacity-30
  pointer-events-none
  select-none
">
  0{i + 1}
</div>


            {/* Content */}
            <div className="relative z-10 text-center px-6">
              <h2 className="stage-title text-7xl md:text-9xl font-bold mb-6 text-primary">
                {stage.title}
              </h2>
              <p className="stage-desc text-2xl md:text-3xl text-muted-foreground max-w-2xl">
                {stage.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
