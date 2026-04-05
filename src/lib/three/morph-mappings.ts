// Procedural hair geometry generation utilities
// Used when glTF hair models are not available (demo fallback)

import * as THREE from 'three';

export interface ProceduralHairConfig {
  baseRadius: number;
  topHeight: number;
  sideHeight: number;
  bangsLength: number;
  volume: number;
  fadeHeight: number;
  segments: number;
}

const DEFAULT_CONFIG: ProceduralHairConfig = {
  baseRadius: 0.55,
  topHeight: 0.3,
  sideHeight: 0.15,
  bangsLength: 0.2,
  volume: 1.0,
  fadeHeight: 0.3,
  segments: 32,
};

export function createProceduralHairGeometry(
  config: Partial<ProceduralHairConfig> = {}
): THREE.BufferGeometry {
  const c = { ...DEFAULT_CONFIG, ...config };
  const geometry = new THREE.SphereGeometry(
    c.baseRadius * c.volume,
    c.segments,
    c.segments,
    0,
    Math.PI * 2,
    0,
    Math.PI * 0.6
  );

  // Scale top for height
  const positions = geometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const y = positions.getY(i);
    if (y > 0) {
      positions.setY(i, y * (1 + c.topHeight));
    }
    // Flatten bottom for fade effect
    if (y < -c.baseRadius * c.fadeHeight) {
      const scale = 1 - ((-y - c.baseRadius * c.fadeHeight) / (c.baseRadius * (1 - c.fadeHeight)));
      positions.setX(i, positions.getX(i) * Math.max(0.1, scale));
      positions.setZ(i, positions.getZ(i) * Math.max(0.1, scale));
    }
  }

  geometry.computeVertexNormals();
  return geometry;
}

export function createHairMaterial(color: string): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    roughness: 0.6,
    metalness: 0.0,
    sheen: 1.0,
    sheenColor: new THREE.Color(color).multiplyScalar(1.3),
    sheenRoughness: 0.3,
    side: THREE.DoubleSide,
  });
}
