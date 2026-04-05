'use client';

import dynamic from 'next/dynamic';
import HairControlPanel from '@/components/editor/HairControlPanel';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useSessionStore } from '@/stores/session-store';
import { Eye } from 'lucide-react';

// Dynamic import to avoid SSR issues with Three.js
const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false });
const HeadModel = dynamic(() => import('@/components/three/HeadModel'), { ssr: false });
const HairModel = dynamic(() => import('@/components/three/HairModel'), { ssr: false });

export default function EditorPage() {
  const router = useRouter();
  const { setStatus } = useSessionStore();

  const handlePreview = () => {
    setStatus('confirmed');
    router.push('/confirm/demo');
  };

  return (
    <div className="h-[calc(100vh-56px)] flex flex-col lg:flex-row">
      {/* 3D Viewport */}
      <div className="flex-1 relative bg-gradient-to-b from-muted/30 to-background">
        <Scene className="w-full h-full min-h-[300px]">
          <HeadModel />
          <HairModel />
        </Scene>

        {/* Preview button overlay */}
        <div className="absolute bottom-4 right-4">
          <Button onClick={handlePreview} size="lg" className="gap-2 shadow-lg">
            <Eye className="w-5 h-5" />
            미리보기
          </Button>
        </div>

        {/* Instructions overlay */}
        <div className="absolute top-4 left-4 bg-background/80 backdrop-blur rounded-lg px-3 py-2 text-sm text-muted-foreground">
          드래그하여 회전 | 스크롤하여 확대/축소
        </div>
      </div>

      {/* Control Panel */}
      <div className="lg:border-l p-4 overflow-auto">
        <HairControlPanel />
      </div>
    </div>
  );
}
