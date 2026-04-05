import { create } from 'zustand';
import type { ScanData } from '@/types/session';

export type CaptureStatus = 'idle' | 'scanning' | 'captured' | 'error';

interface ScanState {
  landmarks: Float32Array | null;
  transformMatrix: Float32Array | null;
  faceTexture: string | null; // base64 data URL
  headPose: { pitch: number; yaw: number; roll: number } | null;
  captureStatus: CaptureStatus;
  scanData: ScanData | null;

  setLandmarks: (landmarks: Float32Array) => void;
  setTransformMatrix: (matrix: Float32Array) => void;
  setFaceTexture: (texture: string) => void;
  setHeadPose: (pose: { pitch: number; yaw: number; roll: number }) => void;
  setCaptureStatus: (status: CaptureStatus) => void;
  setScanData: (data: ScanData) => void;
  reset: () => void;
}

export const useScanStore = create<ScanState>((set) => ({
  landmarks: null,
  transformMatrix: null,
  faceTexture: null,
  headPose: null,
  captureStatus: 'idle',
  scanData: null,

  setLandmarks: (landmarks) => set({ landmarks }),
  setTransformMatrix: (matrix) => set({ transformMatrix: matrix }),
  setFaceTexture: (texture) => set({ faceTexture: texture }),
  setHeadPose: (pose) => set({ headPose: pose }),
  setCaptureStatus: (status) => set({ captureStatus: status }),
  setScanData: (data) => set({ scanData: data }),
  reset: () =>
    set({
      landmarks: null,
      transformMatrix: null,
      faceTexture: null,
      headPose: null,
      captureStatus: 'idle',
      scanData: null,
    }),
}));
