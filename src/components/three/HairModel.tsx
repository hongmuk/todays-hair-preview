'use client';

import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useEditorStore } from '@/stores/editor-store';
import {
  createProceduralHairGeometry,
  createHairMaterial,
} from '@/lib/three/morph-mappings';

// Hair style configurations for different base styles
const STYLE_CONFIGS: Record<
  string,
  {
    topScale: number;
    sideScale: number;
    bangsScale: number;
    yOffset: number;
    shape: 'round' | 'flat' | 'tall' | 'swept';
  }
> = {
  'crew-cut': { topScale: 0.3, sideScale: 0.2, bangsScale: 0.15, yOffset: 0.28, shape: 'round' },
  'fade-undercut': { topScale: 0.6, sideScale: 0.05, bangsScale: 0.3, yOffset: 0.3, shape: 'flat' },
  'pompadour': { topScale: 1.0, sideScale: 0.15, bangsScale: 0.8, yOffset: 0.35, shape: 'tall' },
  'textured-crop': { topScale: 0.5, sideScale: 0.15, bangsScale: 0.4, yOffset: 0.3, shape: 'round' },
  'side-part': { topScale: 0.6, sideScale: 0.2, bangsScale: 0.5, yOffset: 0.3, shape: 'swept' },
  'buzz-cut': { topScale: 0.1, sideScale: 0.1, bangsScale: 0.05, yOffset: 0.25, shape: 'round' },
};

export default function HairModel() {
  const groupRef = useRef<THREE.Group>(null);
  const hairParams = useEditorStore((s) => s.hairParams);

  const config = STYLE_CONFIGS[hairParams.baseStyleId] ?? STYLE_CONFIGS['crew-cut'];

  // Main top hair
  const topGeometry = useMemo(() => {
    return createProceduralHairGeometry({
      baseRadius: 0.52 + config.topScale * hairParams.topLength * 0.15,
      topHeight: config.topScale * hairParams.topLength,
      volume: 0.8 + hairParams.overallVolume * 0.4,
      fadeHeight: hairParams.fadeHeight,
      segments: 32,
    });
  }, [
    hairParams.topLength,
    hairParams.overallVolume,
    hairParams.fadeHeight,
    hairParams.baseStyleId,
    config.topScale,
  ]);

  // Bangs (front hair)
  const bangsGeometry = useMemo(() => {
    const geo = new THREE.BoxGeometry(
      0.35,
      0.04 + config.bangsScale * hairParams.bangsLength * 0.25,
      0.15,
      4,
      4,
      4
    );
    // Curve the bangs forward and down
    const positions = geo.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const z = positions.getZ(i);
      const y = positions.getY(i);
      if (z > 0) {
        positions.setY(i, y - z * 0.5 * hairParams.bangsLength);
      }
    }
    geo.computeVertexNormals();
    return geo;
  }, [hairParams.bangsLength, hairParams.baseStyleId, config.bangsScale]);

  // Side hair panels
  const sideGeometry = useMemo(() => {
    return new THREE.BoxGeometry(
      0.08,
      0.2 + config.sideScale * hairParams.sideLength * 0.3,
      0.4,
      2,
      4,
      4
    );
  }, [hairParams.sideLength, hairParams.baseStyleId, config.sideScale]);

  const hairMaterial = useMemo(
    () => createHairMaterial(hairParams.hairColor),
    [hairParams.hairColor]
  );

  // Thinning effect: adjust material opacity
  useEffect(() => {
    if (hairMaterial) {
      const opacity = 1 - hairParams.thinning * 0.4;
      hairMaterial.transparent = opacity < 1;
      hairMaterial.opacity = opacity;
    }
  }, [hairParams.thinning, hairMaterial]);

  // Part position animation
  useFrame(() => {
    if (groupRef.current) {
      // Shift hair slightly based on part position
      groupRef.current.rotation.z = hairParams.partPosition * 0.05;
    }
  });

  const yOffset = config.yOffset;

  return (
    <group ref={groupRef}>
      {/* Main top hair volume */}
      <mesh
        geometry={topGeometry}
        material={hairMaterial}
        position={[0, yOffset, 0]}
        castShadow
      />

      {/* Bangs */}
      {hairParams.bangsLength > 0.1 && (
        <mesh
          geometry={bangsGeometry}
          material={hairMaterial}
          position={[
            hairParams.partPosition * 0.05,
            yOffset - 0.05,
            0.4,
          ]}
          castShadow
        />
      )}

      {/* Right side */}
      <mesh
        geometry={sideGeometry}
        material={hairMaterial}
        position={[0.42, yOffset - 0.15, 0]}
        castShadow
      />

      {/* Left side */}
      <mesh
        geometry={sideGeometry}
        material={hairMaterial}
        position={[-0.42, yOffset - 0.15, 0]}
        castShadow
      />

      {/* Back hair */}
      <mesh
        material={hairMaterial}
        position={[0, yOffset - 0.1, -0.35]}
        castShadow
      >
        <boxGeometry
          args={[
            0.6,
            0.15 + hairParams.backLength * 0.25,
            0.12,
          ]}
        />
      </mesh>
    </group>
  );
}
