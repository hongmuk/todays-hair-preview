'use client';

import { useRef, useEffect } from 'react';

interface LandmarkVisualizerProps {
  landmarks: Float32Array;
}

export default function LandmarkVisualizer({ landmarks }: LandmarkVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw landmark points
    const numPoints = landmarks.length / 3;
    for (let i = 0; i < numPoints; i++) {
      // Mirror x to match flipped video
      const x = (1 - landmarks[i * 3]) * canvas.width;
      const y = landmarks[i * 3 + 1] * canvas.height;

      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 255, 128, 0.6)';
      ctx.fill();
    }

    // Draw face outline (connecting key landmarks)
    const FACE_OUTLINE = [
      10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288,
      397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136,
      172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109, 10,
    ];

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 200, 255, 0.4)';
    ctx.lineWidth = 1;

    for (let i = 0; i < FACE_OUTLINE.length; i++) {
      const idx = FACE_OUTLINE[i];
      if (idx * 3 + 1 >= landmarks.length) continue;
      const x = (1 - landmarks[idx * 3]) * canvas.width;
      const y = landmarks[idx * 3 + 1] * canvas.height;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }, [landmarks]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
