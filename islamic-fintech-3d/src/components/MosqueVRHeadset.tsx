import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function MosqueVRHeadset() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = -1.5 + Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.5, -3]}>
      {/* VR Headset */}
      <VRHeadset />
      
      {/* Mosque Silhouette integrated into headset */}
      <MosqueSilhouette />
      
      <pointLight position={[0, 0, 0]} color="#d4af37" intensity={3} distance={5} />
    </group>
  );
}

function VRHeadset() {
  return (
    <group>
      {/* Main headset body */}
      <mesh>
        <boxGeometry args={[1.2, 0.6, 0.8]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.9}
          roughness={0.1}
          emissive="#00d4ff"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Lenses */}
      <mesh position={[-0.25, 0, 0.41]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={2}
          transparent
          opacity={0.8}
        />
      </mesh>
      <mesh position={[0.25, 0, 0.41]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={2}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Head strap */}
      <mesh position={[0, 0, -0.4]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.5, 0.05, 16, 32, Math.PI]} />
        <meshStandardMaterial
          color="#2a2a3e"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Side sensors */}
      <mesh position={[-0.6, 0.1, 0.2]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={2}
        />
      </mesh>
      <mesh position={[0.6, 0.1, 0.2]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  );
}

function MosqueSilhouette() {
  return (
    <group position={[0, 0, 0.42]} scale={0.3}>
      {/* Main dome */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.4, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={2}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Central minaret */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 1, 16]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={2}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Minaret top */}
      <mesh position={[0, 1.8, 0]}>
        <coneGeometry args={[0.12, 0.3, 16]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={2}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Crescent moon on top */}
      <mesh position={[0, 2.1, 0]} rotation={[0, 0, Math.PI / 6]}>
        <torusGeometry args={[0.1, 0.02, 16, 32, Math.PI * 1.5]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={3}
        />
      </mesh>
      
      {/* Side minarets */}
      <mesh position={[-0.6, 0.8, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.8, 16]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={2}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh position={[0.6, 0.8, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.8, 16]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={2}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Arched entrance */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.3, 0.5, 0.02]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={2}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}
