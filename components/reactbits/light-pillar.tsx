"use client"

interface LightPillarProps {
  className?: string
}

export function LightPillar({ className = "" }: LightPillarProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 via-blue-500/30 to-transparent blur-xl" />
      <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 via-blue-500/40 to-transparent blur-2xl animate-pulse" />
    </div>
  )
}
