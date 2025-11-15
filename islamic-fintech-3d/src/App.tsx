import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import { IslamicGlobe } from './components/IslamicGlobe';
import { FloatingIcons } from './components/FloatingIcons';
import { ParticleEffects } from './components/ParticleEffects';
import { MosqueVRHeadset } from './components/MosqueVRHeadset';
import { UserAvatar } from './components/UserAvatar';
import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas
        camera={{ position: [0, 2, 10], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#00d4ff" />
        <pointLight position={[0, 0, 0]} intensity={2} color="#d4af37" distance={15} />
        
        {/* Background */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* 3D Elements */}
        <IslamicGlobe />
        <FloatingIcons />
        <ParticleEffects />
        <MosqueVRHeadset />
        <UserAvatar />
        
        {/* Camera Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          minDistance={5}
          maxDistance={20}
        />
        
        {/* Post-processing Effects */}
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            height={300}
          />
          <DepthOfField
            focusDistance={0.01}
            focalLength={0.2}
            bokehScale={3}
          />
        </EffectComposer>
      </Canvas>
      
      {/* Dashboard UI Overlay */}
      <Dashboard />
    </div>
  );
}

export default App;
