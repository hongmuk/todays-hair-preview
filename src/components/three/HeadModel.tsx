'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useScanStore } from '@/stores/scan-store';

export default function HeadModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  const faceTexture = useScanStore((s) => s.faceTexture);

  // Create head geometry (ellipsoid approximation of a human head)
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(0.5, 64, 64);
    // Scale to head proportions: slightly taller, slightly narrower side-to-side
    const positions = geo.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
      positions.setX(i, x * 0.9);   // narrower
      positions.setY(i, y * 1.15);   // taller
      positions.setZ(i, z * 0.95);   // slightly flatter
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Create material with or without face texture
  const material = useMemo(() => {
    if (faceTexture) {
      const img = new Image();
      img.src = faceTexture;
      const tex = new THREE.Texture(img);
      img.onload = () => {
        tex.needsUpdate = true;
      };
      tex.colorSpace = THREE.SRGBColorSpace;

      return new THREE.MeshPhysicalMaterial({
        map: tex,
        roughness: 0.7,
        metalness: 0.0,
        clearcoat: 0.1,
        color: '#f5d0b0',
      });
    }

    return new THREE.MeshPhysicalMaterial({
      color: '#f5d0b0',
      roughness: 0.7,
      metalness: 0.0,
      clearcoat: 0.1,
    });
  }, [faceTexture]);

  // Subtle idle animation
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Head */}
      <mesh ref={meshRef} geometry={geometry} material={material} castShadow />

      {/* Neck */}
      <mesh position={[0, -0.65, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.2, 0.35, 16]} />
        <meshPhysicalMaterial color="#f0c8a0" roughness={0.7} />
      </mesh>

      {/* Ears */}
      <mesh position={[0.47, 0.0, 0]} castShadow>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshPhysicalMaterial color="#e8b898" roughness={0.7} />
      </mesh>
      <mesh position={[-0.47, 0.0, 0]} castShadow>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshPhysicalMaterial color="#e8b898" roughness={0.7} />
      </mesh>

      {/* Nose */}
      <mesh position={[0, -0.05, 0.47]} castShadow>
        <coneGeometry args={[0.04, 0.1, 8]} />
        <meshPhysicalMaterial color="#f0c8a0" roughness={0.7} />
      </mesh>

      {/* Eyes */}
      <mesh position={[0.15, 0.08, 0.42]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#2c1810" />
      </mesh>
      <mesh position={[-0.15, 0.08, 0.42]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#2c1810" />
      </mesh>
    </group>
  );
}
