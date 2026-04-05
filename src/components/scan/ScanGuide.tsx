'use client';

import { useScanStore } from '@/stores/scan-store';

export default function ScanGuide() {
  const { captureStatus, headPose } = useScanStore();

  if (captureStatus === 'captured') return null;

  const getGuidance = () => {
    if (captureStatus === 'idle') {
      return {
        title: '카메라를 시작해 주세요',
        description: '얼굴 스캔을 위해 카메라 접근 권한이 필요합니다.',
      };
    }

    if (!headPose) {
      return {
        title: '얼굴을 화면에 맞춰 주세요',
        description: '정면을 바라보며 화면 중앙에 얼굴을 위치시켜 주세요.',
      };
    }

    const { pitch, yaw } = headPose;

    if (Math.abs(yaw) > 15) {
      return {
        title: '정면을 바라봐 주세요',
        description: `고개를 ${yaw > 0 ? '왼쪽' : '오른쪽'}으로 조금 돌려 주세요.`,
      };
    }

    if (Math.abs(pitch) > 15) {
      return {
        title: '고개를 바로 해 주세요',
        description: `고개를 ${pitch > 0 ? '아래' : '위'}로 조금 조절해 주세요.`,
      };
    }

    return {
      title: '좋습니다! 사진을 캡처하세요',
      description: '현재 위치가 적합합니다. 아래 버튼을 눌러 캡처해 주세요.',
    };
  };

  const guidance = getGuidance();

  return (
    <div className="text-center py-4">
      <h3 className="text-lg font-semibold">{guidance.title}</h3>
      <p className="text-muted-foreground mt-1">{guidance.description}</p>
    </div>
  );
}
