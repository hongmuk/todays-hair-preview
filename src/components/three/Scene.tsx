'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Suspense, type ReactNode } from 'react';

interface SceneProps {
  children: ReactNode;
  className?: string;
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="#cccccc" wireframe />
    </mesh>
  );
}

export default function Scene({ children, className }: SceneProps) {
  return (
    <div className={className ?? 'w-full h-full min-h-[400px]'}>
      <Canvas
        camera={{ position: [0, 0.2, 2], fov: 45 }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <directionalLight position={[-3, 3, -3]} intensity={0.3} />

          {children}

          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.4}
            scale={5}
            blur={2}
          />
          <Environment preset="studio" />
        </Suspense>

        <OrbitControls
          enablePan={false}
          minDistance={1}
          maxDistance={4}
          minPolarAngle={Math.PI * 0.2}
          maxPolarAngle={Math.PI * 0.8}
        />
      </Canvas>
    </div>
  );
}
