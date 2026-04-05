export interface HairParameters {
  baseStyleId: string;

  // Tapering & Fade
  fadeHeight: number;       // 0.0 (no fade) to 1.0 (high fade)
  fadeGradient: number;     // 0.0 (sharp) to 1.0 (gradual)
  necklineTaper: number;    // 0.0 (squared) to 1.0 (tapered)

  // Length
  topLength: number;        // 0.0 (shortest) to 1.0 (longest)
  bangsLength: number;
  sideLength: number;
  backLength: number;

  // Volume & Shape
  overallVolume: number;    // 0.0 (flat) to 1.0 (full)
  thinning: number;         // 0.0 (thick) to 1.0 (thinned)

  // Styling
  partPosition: number;     // -1.0 (left) to 1.0 (right)
  textureAmount: number;    // 0.0 (smooth) to 1.0 (textured)

  // Color
  hairColor: string;        // hex
}

export const DEFAULT_HAIR_PARAMS: HairParameters = {
  baseStyleId: 'crew-cut',
  fadeHeight: 0.3,
  fadeGradient: 0.5,
  necklineTaper: 0.5,
  topLength: 0.5,
  bangsLength: 0.5,
  sideLength: 0.3,
  backLength: 0.3,
  overallVolume: 0.5,
  thinning: 0.2,
  partPosition: 0.0,
  textureAmount: 0.3,
  hairColor: '#3d2b1f',
};

export interface HairStyle {
  id: string;
  name: string;
  nameKo: string;
  category: 'short' | 'medium' | 'long';
  thumbnailUrl?: string;
}

export const AVAILABLE_STYLES: HairStyle[] = [
  { id: 'crew-cut', name: 'Crew Cut', nameKo: '크루컷', category: 'short' },
  { id: 'fade-undercut', name: 'Fade Undercut', nameKo: '페이드 언더컷', category: 'short' },
  { id: 'pompadour', name: 'Pompadour', nameKo: '포마드', category: 'medium' },
  { id: 'textured-crop', name: 'Textured Crop', nameKo: '텍스처드 크롭', category: 'short' },
  { id: 'side-part', name: 'Side Part', nameKo: '사이드 파트', category: 'medium' },
  { id: 'buzz-cut', name: 'Buzz Cut', nameKo: '버즈컷', category: 'short' },
];
