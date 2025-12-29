"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { gsap } from "gsap"

interface MagneticButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary"
  size?: "default" | "large"
  onClick?: () => void
}

export function MagneticButton({
  children,
  variant = "primary",
  size = "default",
  onClick,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const rippleRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!buttonRef.current) return

    const button = buttonRef.current
    const text = textRef.current
    const ripple = rippleRef.current
    const glow = glowRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.4,
        ease: "power2.out",
      })

      gsap.to(text, {
        x: x * 0.15,
        y: y * 0.15,
        duration: 0.3,
        ease: "power2.out",
      })

      if (glow) {
        gsap.to(glow, {
          x: x * 0.5,
          y: y * 0.5,
          duration: 0.5,
          ease: "power2.out",
        })
      }
    }

    const handleMouseEnter = () => {
      setIsHovered(true)

      gsap.to(button, {
        scale: 1.05,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)",
      })

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        { scale: 2.5, opacity: 0, duration: 0.8, ease: "power2.out" }
      )

      gsap.to(glow, {
        opacity: 1,
        scale: 1.2,
        duration: 0.4,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      setIsHovered(false)

      gsap.to(button, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      })

      gsap.to(text, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      })

      gsap.to(glow, {
        opacity: 0,
        scale: 0.8,
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      })
    }

    const handleClick = () => {
      gsap
        .timeline()
        .to(button, { scale: 0.95, duration: 0.1, ease: "power2.in" })
        .to(button, { scale: 1.05, duration: 0.3, ease: "elastic.out(1, 0.5)" })

      onClick?.()
    }

    button.addEventListener("mousemove", handleMouseMove)
    button.addEventListener("mouseenter", handleMouseEnter)
    button.addEventListener("mouseleave", handleMouseLeave)
    button.addEventListener("click", handleClick)

    return () => {
      button.removeEventListener("mousemove", handleMouseMove)
      button.removeEventListener("mouseenter", handleMouseEnter)
      button.removeEventListener("mouseleave", handleMouseLeave)
      button.removeEventListener("click", handleClick)
    }
  }, [onClick])

  const isPrimary = variant === "primary"
  const isLarge = size === "large"

  return (
    <button
      ref={buttonRef}
      className={`
        relative overflow-hidden group rounded-full font-semibold
        ${isLarge ? "px-10 py-5 text-lg" : "px-8 py-4 text-base"}
        transition-colors duration-300
      `}
      style={{
        background: isPrimary
          ? "linear-gradient(135deg, oklch(0.68 0.24 285), oklch(0.64 0.26 315), oklch(0.62 0.25 250))"
          : "transparent",
        border: isPrimary
          ? "none"
          : "2px solid oklch(0.68 0.24 285 / 0.5)",
        color: isPrimary ? "white" : "oklch(0.68 0.24 285)",
        willChange: "transform",
      }}
    >
      {/* Animated gradient border for secondary */}
      {!isPrimary && (
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.24 285), oklch(0.64 0.26 315), oklch(0.62 0.25 250), oklch(0.68 0.24 285))",
            backgroundSize: "300% 300%",
            animation: isHovered ? "gradientShift 3s ease infinite" : "none",
            padding: "2px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}

      {/* Ripple */}
      <div
        ref={rippleRef}
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: isPrimary
            ? "radial-gradient(circle, oklch(0.95 0.02 280 / 0.35) 0%, transparent 70%)"
            : "radial-gradient(circle, oklch(0.68 0.24 285 / 0.25) 0%, transparent 70%)",
          transform: "scale(0)",
          opacity: 0,
        }}
      />

      {/* Text */}
      <span ref={textRef} className="relative z-10 inline-block">
        {children}
      </span>

      {/* Glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-full blur-xl -z-10"
        style={{
          background: isPrimary
            ? "linear-gradient(135deg, oklch(0.68 0.24 285 / 0.6), oklch(0.62 0.25 250 / 0.6))"
            : "oklch(0.68 0.24 285 / 0.4)",
          opacity: 0,
          transform: "scale(0.8)",
        }}
      />

      {/* Shine */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, oklch(0.98 0 0 / 0.25) 45%, oklch(0.98 0 0 / 0.35) 50%, oklch(0.98 0 0 / 0.25) 55%, transparent 60%)",
            animation: isHovered ? "shine 1.5s ease-in-out infinite" : "none",
          }}
        />
      </div>
    </button>
  )
}
