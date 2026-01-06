"use client"

import { useState, useEffect } from "react"

/* Ghost SVG */
function GhostIcon({ jump }: { jump: boolean }) {
  return (
    <svg
      width="96"
      height="96"
      viewBox="0 0 24 24"
      fill="none"
      className={`
        text-white
        transition-transform duration-300
        ${jump ? "-translate-y-6 scale-105" : "translate-y-0"}
        animate-ghost-float
      `}
    >
      {/* Ghost body */}
      <path
        d="
          M6 10
          C6 6.5 8.5 4 12 4
          C15.5 4 18 6.5 18 10
          V18
          C17 17.2 16 17.2 15 18
          C14 18.8 13 18.8 12 18
          C11 17.2 10 17.2 9 18
          C8 18.8 7 18.8 6 18
          Z
        "
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinejoin="round"
      />

      {/* Eyes */}
      <circle cx="10" cy="11" r="0.9" fill="currentColor" className="animate-blink" />
      <circle cx="14" cy="11" r="0.9" fill="currentColor" className="animate-blink" />
    </svg>
  )
}

export default function NotFound() {
  const [jump, setJump] = useState(false)

  const triggerJump = () => {
    if (jump) return
    setJump(true)
    setTimeout(() => setJump(false), 400)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") triggerJump()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black text-white px-6">
      <div className="text-center space-y-2 max-w-md">
        {/* Ghost */}
        <div
          onClick={triggerJump}
          className="mx-auto w-fit cursor-pointer"
        >
          <GhostIcon jump={jump} />
        </div>

        {/* 404 */}
        <h1 className="text-6xl font-extrabold tracking-tight">404</h1>

        <p className="text-lg text-zinc-300 my-4">
          Oops… this page wandered off.
        </p>

      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes ghost-float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .animate-ghost-float {
          animation: ghost-float 3s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 90%, 100% {
            transform: scaleY(1);
          }
          92%, 96% {
            transform: scaleY(0.1);
          }
        }

        .animate-blink {
          transform-origin: center;
          animation: blink 2s infinite;
        }
      `}</style>
    </div>
  )
}
