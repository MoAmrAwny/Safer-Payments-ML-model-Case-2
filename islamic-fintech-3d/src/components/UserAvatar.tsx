import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function UserAvatar() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[5, 1, 1]}>
      {/* Avatar body */}
      <mesh position={[0, -0.5, 0]}>
        <capsuleGeometry args={[0.3, 0.6, 16, 32]} />
        <meshStandardMaterial
          color="#4a5568"
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>
      
      {/* Avatar head */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color="#6b7280"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      
      {/* Tablet in hand */}
      <Tablet />
      
      <pointLight position={[0, 0, 0]} color="#00d4ff" intensity={1.5} distance={3} />
    </group>
  );
}

function Tablet() {
  const tabletRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (tabletRef.current) {
      tabletRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 - 0.3;
      tabletRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group ref={tabletRef} position={[0.4, -0.2, 0.3]}>
      {/* Tablet body */}
      <mesh>
        <boxGeometry args={[0.6, 0.8, 0.05]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Tablet screen */}
      <mesh position={[0, 0, 0.026]}>
        <boxGeometry args={[0.55, 0.75, 0.01]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={1.5}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* App interface elements on screen */}
      <AppInterface />
    </group>
  );
}

function AppInterface() {
  return (
    <group position={[0, 0, 0.032]}>
      {/* Header bar */}
      <mesh position={[0, 0.32, 0]}>
        <boxGeometry args={[0.5, 0.08, 0.005]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={2}
        />
      </mesh>
      
      {/* Islamic finance cards */}
      {[-0.15, 0, 0.15].map((y, i) => (
        <group key={i} position={[0, y, 0]}>
          <mesh>
            <boxGeometry args={[0.45, 0.12, 0.005]} />
            <meshStandardMaterial
              color="#2a2a3e"
              emissive="#00d4ff"
              emissiveIntensity={0.5}
            />
          </mesh>
          
          {/* Card icon */}
          <mesh position={[-0.15, 0, 0.003]}>
            <circleGeometry args={[0.03, 16]} />
            <meshStandardMaterial
              color="#d4af37"
              emissive="#d4af37"
              emissiveIntensity={2}
            />
          </mesh>
          
          {/* Card text lines */}
          <mesh position={[0.05, 0.02, 0.003]}>
            <boxGeometry args={[0.2, 0.01, 0.002]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={1}
            />
          </mesh>
          <mesh position={[0.05, -0.02, 0.003]}>
            <boxGeometry args={[0.15, 0.008, 0.002]} />
            <meshStandardMaterial
              color="#9ca3af"
              emissive="#9ca3af"
              emissiveIntensity={0.8}
            />
          </mesh>
        </group>
      ))}
      
      {/* Bottom navigation */}
      <mesh position={[0, -0.32, 0]}>
        <boxGeometry args={[0.5, 0.06, 0.005]} />
        <meshStandardMaterial
          color="#1a1a2e"
          emissive="#00d4ff"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Nav icons */}
      {[-0.15, -0.05, 0.05, 0.15].map((x, i) => (
        <mesh key={i} position={[x, -0.32, 0.003]}>
          <circleGeometry args={[0.015, 16]} />
          <meshStandardMaterial
            color="#d4af37"
            emissive="#d4af37"
            emissiveIntensity={2}
          />
        </mesh>
      ))}
    </group>
  );
}
