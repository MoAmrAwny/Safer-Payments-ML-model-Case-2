import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ParticleEffects() {
  return (
    <>
      <CoinExplosion position={[3, -1, 2]} />
      <DataStreams />
    </>
  );
}

function CoinExplosion({ position }: { position: [number, number, number] }) {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 200;
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Initial positions (clustered at origin)
      positions[i3] = (Math.random() - 0.5) * 0.2;
      positions[i3 + 1] = (Math.random() - 0.5) * 0.2;
      positions[i3 + 2] = (Math.random() - 0.5) * 0.2;
      
      // Velocities for explosion effect
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const speed = Math.random() * 0.02 + 0.01;
      
      velocities[i3] = Math.sin(phi) * Math.cos(theta) * speed;
      velocities[i3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
      velocities[i3 + 2] = Math.cos(phi) * speed;
      
      // Gold color
      colors[i3] = 0.83;
      colors[i3 + 1] = 0.69;
      colors[i3 + 2] = 0.22;
    }
    
    return { positions, velocities, colors };
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Update positions
        positions[i3] += particles.velocities[i3];
        positions[i3 + 1] += particles.velocities[i3 + 1];
        positions[i3 + 2] += particles.velocities[i3 + 2];
        
        // Reset particles that go too far
        const distance = Math.sqrt(
          positions[i3] ** 2 + 
          positions[i3 + 1] ** 2 + 
          positions[i3 + 2] ** 2
        );
        
        if (distance > 3) {
          positions[i3] = (Math.random() - 0.5) * 0.2;
          positions[i3 + 1] = (Math.random() - 0.5) * 0.2;
          positions[i3 + 2] = (Math.random() - 0.5) * 0.2;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={particlesRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function DataStreams() {
  const streamsRef = useRef<THREE.Group>(null);
  
  const streamCount = 5;
  const streams = useMemo(() => {
    return Array.from({ length: streamCount }, (_, i) => {
      const angle = (i / streamCount) * Math.PI * 2;
      const radius = 4;
      
      return {
        startX: Math.cos(angle) * radius,
        startY: 2,
        startZ: Math.sin(angle) * radius,
        angle,
      };
    });
  }, []);

  return (
    <group ref={streamsRef}>
      {streams.map((stream, i) => (
        <DataStream
          key={i}
          startPosition={[stream.startX, stream.startY, stream.startZ]}
          targetPosition={[0, 0, 0]}
          delay={i * 0.5}
        />
      ))}
    </group>
  );
}

function DataStream({ 
  startPosition, 
  targetPosition, 
  delay 
}: { 
  startPosition: [number, number, number];
  targetPosition: [number, number, number];
  delay: number;
}) {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 50;
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const t = i / particleCount;
      
      positions[i3] = startPosition[0] + (targetPosition[0] - startPosition[0]) * t;
      positions[i3 + 1] = startPosition[1] + (targetPosition[1] - startPosition[1]) * t;
      positions[i3 + 2] = startPosition[2] + (targetPosition[2] - startPosition[2]) * t;
      
      // Cyan color
      colors[i3] = 0;
      colors[i3 + 1] = 0.83;
      colors[i3 + 2] = 1;
    }
    
    return { positions, colors };
  }, [startPosition, targetPosition]);

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime + delay;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const t = ((i / particleCount) + time * 0.2) % 1;
        
        positions[i3] = startPosition[0] + (targetPosition[0] - startPosition[0]) * t;
        positions[i3 + 1] = startPosition[1] + (targetPosition[1] - startPosition[1]) * t + Math.sin(time + i * 0.1) * 0.2;
        positions[i3 + 2] = startPosition[2] + (targetPosition[2] - startPosition[2]) * t;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
