import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export function IslamicGlobe() {
  const globeRef = useRef<THREE.Mesh>(null);
  const patternRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
    if (patternRef.current) {
      patternRef.current.rotation.y += 0.002;
      patternRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Main Globe */}
      <Sphere ref={globeRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.8}
          roughness={0.2}
          emissive="#00d4ff"
          emissiveIntensity={0.2}
        />
      </Sphere>

      {/* Islamic Pattern Overlay */}
      <Sphere ref={patternRef} args={[2.05, 64, 64]}>
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.3}
          wireframe
          side={THREE.DoubleSide}
        />
      </Sphere>

      {/* Glowing Islamic Geometric Patterns */}
      <IslamicPatterns />
    </group>
  );
}

function IslamicPatterns() {
  const patterns = useRef<THREE.Group>(null);

  useFrame(() => {
    if (patterns.current) {
      patterns.current.rotation.y -= 0.001;
    }
  });

  // Create star patterns around the globe
  const stars = [];
  for (let i = 0; i < 20; i++) {
    const phi = Math.acos(-1 + (2 * i) / 20);
    const theta = Math.sqrt(20 * Math.PI) * phi;
    
    const x = 2.1 * Math.cos(theta) * Math.sin(phi);
    const y = 2.1 * Math.sin(theta) * Math.sin(phi);
    const z = 2.1 * Math.cos(phi);

    stars.push(
      <group key={i} position={[x, y, z]}>
        <Star scale={0.15} />
      </group>
    );
  }

  return <group ref={patterns}>{stars}</group>;
}

function Star({ scale = 1 }: { scale?: number }) {
  const starShape = new THREE.Shape();
  const outerRadius = 0.5 * scale;
  const innerRadius = 0.2 * scale;
  const points = 8;

  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (i * Math.PI) / points;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    if (i === 0) {
      starShape.moveTo(x, y);
    } else {
      starShape.lineTo(x, y);
    }
  }
  starShape.closePath();

  const extrudeSettings = {
    depth: 0.05 * scale,
    bevelEnabled: false,
  };

  return (
    <mesh>
      <extrudeGeometry args={[starShape, extrudeSettings]} />
      <meshStandardMaterial
        color="#d4af37"
        emissive="#d4af37"
        emissiveIntensity={2}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}
