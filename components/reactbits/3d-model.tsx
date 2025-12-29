"use client"

import { GridScan } from "@/components/reactbits/grid-scan"
import { GlassCard } from "@/components/reactbits/glass-card"
import { Sparkles } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import NeptuneDetailedModel from "../Model"

export function NeptuneModelSection() {
  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 z-0 opacity-25">
        <GridScan />
      </div>

      {/* Gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-950/10 to-background" />

      <div className="container relative z-10 mx-auto px-4">
        <GlassCard className="max-w-7xl mx-auto p-6 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* TEXT SIDE */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-4 text-purple-300/70 text-xs sm:text-sm uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                Interactive Intelligence
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-balance">
                <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
                  Explore Neptune in 3D
                </span>
              </h2>

              <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                This is a fully procedural, real-time simulation of Neptune.
                Clouds, storms, and atmospheric flows are generated live using
                GPU shaders — not textures.
              </p>
            </div>

            {/* MODEL SIDE - Fully Responsive */}
            <div className="relative w-full aspect-square sm:aspect-square lg:h-[480px] rounded-xl overflow-hidden">
              <Canvas 
                camera={{ position: [0, 0, 3], fov: 45 }}
                gl={{ 
                  alpha: true, 
                  antialias: true,
                  preserveDrawingBuffer: true 
                }}
                style={{ background: 'transparent' }}
                dpr={[1, 2]}
              >
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 3, 5]} intensity={2.2} color="#ffffff" />
                <directionalLight position={[-5, -2, 5]} intensity={1.0} color="#6090ff" />
                <pointLight position={[-3, 2, -5]} intensity={1.0} color="#4080ff" />

                <NeptuneDetailedModel />

                <OrbitControls
                  enableDamping
                  dampingFactor={0.05}
                  rotateSpeed={0.5}
                  enableZoom={false}
                  enablePan={false}
                  minPolarAngle={Math.PI / 4}
                  maxPolarAngle={(3 * Math.PI) / 4}
                />
              </Canvas>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  )
}