import type { HairParameters } from '@/types/hair-params';

// Maps HairParameters slider values to morph target influence values
export interface MorphTargetMapping {
  morphName: string;
  paramKey: keyof HairParameters;
  min: number;
  max: number;
  invert?: boolean;
}

export const MORPH_MAPPINGS: MorphTargetMapping[] = [
  { morphName: 'fadeHeight', paramKey: 'fadeHeight', min: 0, max: 1 },
  { morphName: 'fadeGradient', paramKey: 'fadeGradient', min: 0, max: 1 },
  { morphName: 'topLength', paramKey: 'topLength', min: 0, max: 1 },
  { morphName: 'bangsLength', paramKey: 'bangsLength', min: 0, max: 1 },
  { morphName: 'sideLength', paramKey: 'sideLength', min: 0, max: 1 },
  { morphName: 'backLength', paramKey: 'backLength', min: 0, max: 1 },
  { morphName: 'volume', paramKey: 'overallVolume', min: 0, max: 1 },
  { morphName: 'thinning', paramKey: 'thinning', min: 0, max: 1 },
  { morphName: 'partPosition', paramKey: 'partPosition', min: -1, max: 1 },
  { morphName: 'texture', paramKey: 'textureAmount', min: 0, max: 1 },
];

export function applyParamsToMorphTargets(
  params: HairParameters,
  morphTargetDictionary: Record<string, number>,
  morphTargetInfluences: number[]
): void {
  for (const mapping of MORPH_MAPPINGS) {
    const morphIndex = morphTargetDictionary[mapping.morphName];
    if (morphIndex === undefined) continue;

    const rawValue = params[mapping.paramKey];
    if (typeof rawValue !== 'number') continue;

    const range = mapping.max - mapping.min;
    const normalized = (rawValue - mapping.min) / range;
    morphTargetInfluences[morphIndex] = mapping.invert ? 1 - normalized : normalized;
  }
}
