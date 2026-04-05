import type { HairParameters } from './hair-params';

export type SessionStatus = 'scanning' | 'editing' | 'confirmed' | 'completed';

export interface ScanData {
  faceWidth: number;
  faceHeight: number;
  headPose: {
    pitch: number;
    yaw: number;
    roll: number;
  };
}

export interface Session {
  id: string;
  customerId: string;
  designerId: string;
  status: SessionStatus;
  hairParams: HairParameters;
  beforeImageUrl: string | null;
  afterImageUrl: string | null;
  scanData: ScanData | null;
  createdAt: number;
  confirmedAt: number | null;
  duration: number | null;
}
