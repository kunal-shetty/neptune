"use client"

import { useEffect, useState } from "react"

interface Ripple {
  x: number
  y: number
  id: number
}

export function SplashCursor() {
  const [ripples, setRipples] = useState<Ripple[]>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newRipple = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      }
      setRipples((prev) => [...prev, newRipple])

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
      }, 1000)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/30 animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}
    </div>
  )
}
