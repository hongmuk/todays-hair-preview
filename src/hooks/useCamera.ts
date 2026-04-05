'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

interface UseCameraOptions {
  width?: number;
  height?: number;
  facingMode?: 'user' | 'environment';
}

export function useCamera(options: UseCameraOptions = {}) {
  const { width = 1280, height = 720, facingMode = 'user' } = options;
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const start = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: width },
          height: { ideal: height },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsActive(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Camera access denied';
      setError(message);
      setIsActive(false);
    }
  }, [width, height, facingMode]);

  const stop = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
  }, []);

  const captureFrame = useCallback((): string | null => {
    const video = videoRef.current;
    if (!video || !isActive) return null;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.drawImage(video, 0, 0);
    return canvas.toDataURL('image/png');
  }, [isActive]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return { videoRef, isActive, error, start, stop, captureFrame };
}
