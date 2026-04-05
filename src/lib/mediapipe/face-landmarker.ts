import {
  FaceLandmarker,
  FilesetResolver,
  type FaceLandmarkerResult,
} from '@mediapipe/tasks-vision';

let faceLandmarker: FaceLandmarker | null = null;
let initPromise: Promise<FaceLandmarker> | null = null;

export async function initFaceLandmarker(): Promise<FaceLandmarker> {
  if (faceLandmarker) return faceLandmarker;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const filesetResolver = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
    );

    faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
      baseOptions: {
        modelAssetPath:
          'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
        delegate: 'GPU',
      },
      runningMode: 'VIDEO',
      numFaces: 1,
      outputFaceBlendshapes: true,
      outputFacialTransformationMatrixes: true,
    });

    return faceLandmarker;
  })();

  return initPromise;
}

export function detectFace(
  video: HTMLVideoElement,
  timestamp: number
): FaceLandmarkerResult | null {
  if (!faceLandmarker) return null;
  try {
    return faceLandmarker.detectForVideo(video, timestamp);
  } catch {
    return null;
  }
}

export function extractLandmarksArray(
  result: FaceLandmarkerResult
): Float32Array | null {
  if (!result.faceLandmarks || result.faceLandmarks.length === 0) return null;

  const landmarks = result.faceLandmarks[0];
  const arr = new Float32Array(landmarks.length * 3);
  for (let i = 0; i < landmarks.length; i++) {
    arr[i * 3] = landmarks[i].x;
    arr[i * 3 + 1] = landmarks[i].y;
    arr[i * 3 + 2] = landmarks[i].z;
  }
  return arr;
}

export function extractHeadPose(
  result: FaceLandmarkerResult
): { pitch: number; yaw: number; roll: number } | null {
  if (
    !result.facialTransformationMatrixes ||
    result.facialTransformationMatrixes.length === 0
  )
    return null;

  const matrix = result.facialTransformationMatrixes[0].data;
  // Extract Euler angles from rotation matrix
  const pitch = Math.atan2(-matrix[6], Math.sqrt(matrix[0] ** 2 + matrix[3] ** 2));
  const yaw = Math.atan2(matrix[3], matrix[0]);
  const roll = Math.atan2(matrix[7], matrix[8]);

  return {
    pitch: (pitch * 180) / Math.PI,
    yaw: (yaw * 180) / Math.PI,
    roll: (roll * 180) / Math.PI,
  };
}

export function disposeFaceLandmarker(): void {
  if (faceLandmarker) {
    faceLandmarker.close();
    faceLandmarker = null;
    initPromise = null;
  }
}
