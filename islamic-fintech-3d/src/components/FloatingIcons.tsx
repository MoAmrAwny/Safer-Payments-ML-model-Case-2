import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FloatingIcons() {
  return (
    <group>
      <BlockchainChain position={[-4, 2, -2]} />
      <AIOwl position={[4, 1, -1]} />
      <DigitalWallet position={[-3, -2, 1]} />
    </group>
  );
}

function BlockchainChain({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Chain links */}
      {[0, 1, 2].map((i) => (
        <group key={i} position={[i * 0.6, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <torusGeometry args={[0.2, 0.05, 16, 32]} />
            <meshStandardMaterial
              color="#00d4ff"
              emissive="#00d4ff"
              emissiveIntensity={1.5}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </group>
      ))}
      
      {/* Halal certification badge */}
      <mesh position={[1.8, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Holographic glow */}
      <pointLight position={[0, 0, 0]} color="#00d4ff" intensity={2} distance={3} />
    </group>
  );
}

function AIOwl({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 0.7) * 0.4;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Owl body */}
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.8}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      
      {/* Owl eyes */}
      <mesh position={[-0.15, 0.1, 0.35]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={3}
        />
      </mesh>
      <mesh position={[0.15, 0.1, 0.35]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={3}
        />
      </mesh>
      
      {/* Owl ears/horns */}
      <mesh position={[-0.25, 0.4, 0]} rotation={[0, 0, -0.3]}>
        <coneGeometry args={[0.1, 0.3, 8]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.8}
        />
      </mesh>
      <mesh position={[0.25, 0.4, 0]} rotation={[0, 0, 0.3]}>
        <coneGeometry args={[0.1, 0.3, 8]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.8}
        />
      </mesh>
      
      <pointLight position={[0, 0, 0]} color="#8b5cf6" intensity={2} distance={3} />
    </group>
  );
}

function DigitalWallet({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const scrollRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + 2) * 0.35;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
    if (scrollRef.current) {
      scrollRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3 - 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Scroll/wallet base */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={1.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Opening scroll effect */}
      <group ref={scrollRef}>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.8, 0.6, 0.02]} />
          <meshStandardMaterial
            color="#f5e6d3"
            emissive="#d4af37"
            emissiveIntensity={0.5}
            transparent
            opacity={0.9}
          />
        </mesh>
        
        {/* Contract lines */}
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[0, 0.1 + i * 0.15, 0.02]}>
            <boxGeometry args={[0.6, 0.02, 0.01]} />
            <meshStandardMaterial
              color="#00d4ff"
              emissive="#00d4ff"
              emissiveIntensity={2}
            />
          </mesh>
        ))}
      </group>
      
      <pointLight position={[0, 0, 0]} color="#d4af37" intensity={2} distance={3} />
    </group>
  );
}
