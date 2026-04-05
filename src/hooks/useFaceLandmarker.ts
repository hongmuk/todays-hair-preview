'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import {
  initFaceLandmarker,
  detectFace,
  extractLandmarksArray,
  extractHeadPose,
  disposeFaceLandmarker,
} from '@/lib/mediapipe/face-landmarker';
import { useScanStore } from '@/stores/scan-store';

export function useFaceLandmarker() {
  const [isReady, setIsReady] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const { setLandmarks, setHeadPose, setCaptureStatus } = useScanStore();

  const initialize = useCallback(async () => {
    try {
      await initFaceLandmarker();
      setIsReady(true);
    } catch (err) {
      console.error('Failed to initialize FaceLandmarker:', err);
      setCaptureStatus('error');
    }
  }, [setCaptureStatus]);

  const startDetection = useCallback(
    (video: HTMLVideoElement) => {
      if (!isReady) return;
      setIsDetecting(true);
      setCaptureStatus('scanning');

      const detect = () => {
        if (!video.paused && !video.ended) {
          const result = detectFace(video, performance.now());
          if (result) {
            const landmarks = extractLandmarksArray(result);
            if (landmarks) setLandmarks(landmarks);

            const pose = extractHeadPose(result);
            if (pose) setHeadPose(pose);
          }
        }
        animationFrameRef.current = requestAnimationFrame(detect);
      };

      detect();
    },
    [isReady, setLandmarks, setHeadPose, setCaptureStatus]
  );

  const stopDetection = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setIsDetecting(false);
  }, []);

  useEffect(() => {
    return () => {
      stopDetection();
      disposeFaceLandmarker();
    };
  }, [stopDetection]);

  return { isReady, isDetecting, initialize, startDetection, stopDetection };
}
