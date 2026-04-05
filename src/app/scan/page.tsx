'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import CameraView from '@/components/scan/CameraView';
import ScanGuide from '@/components/scan/ScanGuide';
import { useScanStore } from '@/stores/scan-store';
import { useSessionStore } from '@/stores/session-store';

export default function ScanPage() {
  const router = useRouter();
  const { scanData } = useScanStore();
  const { startSession } = useSessionStore();

  const handleCapture = useCallback(
    (_imageData: string) => {
      // Create a new session and navigate to editor
      const sessionId = `session_${Date.now()}`;
      startSession(sessionId, 'anonymous', 'designer_demo');
      // Small delay to show capture feedback
      setTimeout(() => {
        router.push('/editor');
      }, 1000);
    },
    [router, startSession]
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">얼굴 스캔</h1>
        <p className="text-muted-foreground mt-2">
          카메라로 고객의 얼굴을 스캔하여 3D 아바타를 생성합니다
        </p>
      </div>

      <ScanGuide />
      <CameraView onCapture={handleCapture} />

      {scanData && (
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold text-sm mb-2">스캔 데이터</h3>
          <pre className="text-xs text-muted-foreground">
            {JSON.stringify(scanData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
