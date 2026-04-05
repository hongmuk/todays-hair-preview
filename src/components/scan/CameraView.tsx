'use client';

import { useEffect, useCallback } from 'react';
import { useCamera } from '@/hooks/useCamera';
import { useFaceLandmarker } from '@/hooks/useFaceLandmarker';
import { useScanStore } from '@/stores/scan-store';
import { Camera, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LandmarkVisualizer from './LandmarkVisualizer';

interface CameraViewProps {
  onCapture: (imageData: string) => void;
}

export default function CameraView({ onCapture }: CameraViewProps) {
  const { videoRef, isActive, error: cameraError, start, stop, captureFrame } = useCamera();
  const { isReady, isDetecting, initialize, startDetection, stopDetection } = useFaceLandmarker();
  const { landmarks, captureStatus, setCaptureStatus, setFaceTexture } = useScanStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (isActive && isReady && videoRef.current) {
      startDetection(videoRef.current);
    }
    return () => stopDetection();
  }, [isActive, isReady, videoRef, startDetection, stopDetection]);

  const handleCapture = useCallback(() => {
    const frame = captureFrame();
    if (frame) {
      setFaceTexture(frame);
      setCaptureStatus('captured');
      stopDetection();
      stop();
      onCapture(frame);
    }
  }, [captureFrame, setFaceTexture, setCaptureStatus, stopDetection, stop, onCapture]);

  const hasFace = landmarks !== null;

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover mirror"
          style={{ transform: 'scaleX(-1)' }}
          playsInline
          muted
        />

        {/* Landmark overlay */}
        {isDetecting && landmarks && (
          <LandmarkVisualizer landmarks={landmarks} />
        )}

        {/* Face detection indicator */}
        {isDetecting && (
          <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-medium ${
            hasFace
              ? 'bg-green-500/80 text-white'
              : 'bg-yellow-500/80 text-white'
          }`}>
            {hasFace ? '얼굴 감지됨' : '얼굴을 찾는 중...'}
          </div>
        )}

        {/* Capture status */}
        {captureStatus === 'captured' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-white text-xl font-bold">캡처 완료!</div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-3 mt-4 justify-center">
        {!isActive && captureStatus !== 'captured' && (
          <Button onClick={start} size="lg" className="gap-2">
            <Camera className="w-5 h-5" />
            카메라 시작
          </Button>
        )}

        {isActive && (
          <Button
            onClick={handleCapture}
            size="lg"
            disabled={!hasFace}
            className="gap-2"
          >
            <Camera className="w-5 h-5" />
            {hasFace ? '사진 캡처' : '얼굴을 인식해 주세요'}
          </Button>
        )}
      </div>

      {/* Error */}
      {cameraError && (
        <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>카메라 오류: {cameraError}</span>
        </div>
      )}
    </div>
  );
}
