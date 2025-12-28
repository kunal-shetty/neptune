"use client"

export function LightRays() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/30 to-transparent animate-pulse"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/30 to-transparent animate-pulse"
        style={{ animationDelay: "2s" }}
      />
    </div>
  )
}
