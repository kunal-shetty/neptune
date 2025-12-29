import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useRef } from "react"

// Neptune Surface Material
const NeptuneMaterial = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0 },
  },
  vertexShader: `
    varying vec3 vPos;
    varying vec3 vNormal;
    void main() {
      vPos = position;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vPos;
    varying vec3 vNormal;
    uniform float time;

    float hash(vec3 p) {
      p = fract(p * vec3(443.537, 537.247, 247.428));
      p += dot(p, p.yxz + 19.19);
      return fract((p.x + p.y) * p.z);
    }

    float noise(vec3 p) {
      vec3 i = floor(p);
      vec3 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      
      return mix(
        mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
            mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
        mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
            mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
        f.z
      );
    }

    float fbm(vec3 p) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      
      for(int i = 0; i < 6; i++) {
        value += amplitude * noise(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }

    void main() {
      vec3 pos = normalize(vPos);
      
      // Latitude-based banding
      float lat = pos.y;
      float bands = sin(lat * 15.0 + fbm(pos * 3.0 + vec3(time * 0.1, 0, 0)) * 2.0);
      
      // Large-scale atmospheric flows
      float flow1 = fbm(pos * 2.0 + vec3(time * 0.05, time * 0.03, 0));
      float flow2 = fbm(pos * 4.0 - vec3(time * 0.08, 0, time * 0.06));
      
      // Storm systems
      vec3 stormCenter1 = vec3(0.3, 0.2, 0.9);
      vec3 stormCenter2 = vec3(-0.5, -0.3, 0.8);
      float storm1 = 1.0 - smoothstep(0.0, 0.3, length(pos - stormCenter1));
      float storm2 = 1.0 - smoothstep(0.0, 0.25, length(pos - stormCenter2));
      
      // Turbulent details
      float turbulence = fbm(pos * 8.0 + vec3(time * 0.2, 0, 0)) * 0.5;
      
      // Rich color palette
      vec3 deepBlue = vec3(0.01, 0.05, 0.15);
      vec3 richBlue = vec3(0.08, 0.15, 0.35);
      vec3 brightBlue = vec3(0.15, 0.35, 0.65);
      vec3 cyan = vec3(0.25, 0.55, 0.85);
      vec3 lightCyan = vec3(0.35, 0.65, 0.95);
      vec3 violet = vec3(0.25, 0.15, 0.45);
      
      // Color mixing
      float bandPattern = bands * 0.5 + 0.5;
      vec3 color = mix(deepBlue, richBlue, bandPattern);
      color = mix(color, brightBlue, flow1 * 0.6);
      color = mix(color, cyan, flow2 * 0.4);
      
      // Add storms
      color = mix(color, lightCyan, storm1 * 0.7);
      color = mix(color, mix(cyan, violet, 0.3), storm2 * 0.5);
      
      // Violet tints in dark regions
      float darkMask = smoothstep(0.3, 0.5, 1.0 - length(color));
      color = mix(color, violet, darkMask * 0.2);
      
      // Fine turbulent details
      color += vec3(turbulence * 0.08);
      
      // Remove dark border - brighten edges significantly
      vec3 viewDir = normalize(vec3(0, 0, 1));
      float edgeFactor = abs(dot(pos, viewDir));
      float edgeBrightness = smoothstep(0.0, 0.5, 1.0 - edgeFactor);
      color += edgeBrightness * vec3(0.3, 0.4, 0.6);
      color *= 1.0 + edgeBrightness * 0.4;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `,
})

// Cloud Layer Material
const CloudMaterial = new THREE.ShaderMaterial({
  transparent: true,
  uniforms: {
    time: { value: 0 },
  },
  vertexShader: `
    varying vec3 vPos;
    varying vec3 vNormal;
    void main() {
      vPos = position;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vPos;
    varying vec3 vNormal;
    uniform float time;

    float hash(vec3 p) {
      p = fract(p * vec3(443.537, 537.247, 247.428));
      p += dot(p, p.yxz + 19.19);
      return fract((p.x + p.y) * p.z);
    }

    float noise(vec3 p) {
      vec3 i = floor(p);
      vec3 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
            mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
        mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
            mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
        f.z
      );
    }

    void main() {
      vec3 pos = normalize(vPos);
      
      // High-frequency cloud wisps
      float wisps = noise(pos * 20.0 + vec3(time * 0.15, time * 0.1, 0));
      wisps += noise(pos * 35.0 - vec3(0, time * 0.2, time * 0.15)) * 0.5;
      
      // Large cloud formations
      float clouds1 = noise(pos * 8.0 + vec3(time * 0.05, 0, time * 0.08));
      float clouds2 = noise(pos * 12.0 - vec3(time * 0.07, time * 0.04, 0));
      
      // Combine layers
      float cloudDensity = wisps * 0.4 + clouds1 * 0.6 + clouds2 * 0.5;
      cloudDensity = smoothstep(0.3, 0.9, cloudDensity);
      
      // Lighting
      float cloudLight = max(0.0, dot(vNormal, normalize(vec3(1, 1, 1))));
      
      vec3 cloudColor = mix(
        vec3(0.3, 0.5, 0.8),
        vec3(0.6, 0.8, 1.0),
        cloudLight
      );
      
      float alpha = cloudDensity * 0.25;
      gl_FragColor = vec4(cloudColor, alpha);
    }
  `,
})

// Atmosphere Glow Material
const AtmosphereMaterial = new THREE.ShaderMaterial({
  side: THREE.BackSide,
  transparent: true,
  uniforms: {},
  vertexShader: `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    void main() {
      float intensity = pow(0.8 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
      vec3 glow = vec3(0.2, 0.5, 0.9);
      gl_FragColor = vec4(glow, intensity * 0.6);
    }
  `,
})

export default function Neptune() {
  const core = useRef<THREE.Mesh>(null)
  const clouds = useRef<THREE.Mesh>(null)
  const atmosphere = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    NeptuneMaterial.uniforms.time.value = t
    CloudMaterial.uniforms.time.value = t

    if (core.current) core.current.rotation.y += 0.0008
    if (clouds.current) clouds.current.rotation.y += 0.0012
  })

  return (
    <group ref={groupRef} name="Neptune">
      <mesh ref={core} name="NeptuneCore">
        <sphereGeometry args={[1, 256, 256]} />
        <primitive object={NeptuneMaterial} attach="material" />
      </mesh>

      <mesh ref={clouds} scale={1.02} name="NeptuneClouds">
        <sphereGeometry args={[1, 256, 256]} />
        <primitive object={CloudMaterial} attach="material" />
      </mesh>

      <mesh ref={atmosphere} scale={1.08} name="NeptuneAtmosphere">
        <sphereGeometry args={[1, 128, 128]} />
        <primitive object={AtmosphereMaterial} attach="material" />
      </mesh>
    </group>
  )
}