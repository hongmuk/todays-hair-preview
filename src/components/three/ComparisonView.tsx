'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeftRight } from 'lucide-react';

interface ComparisonViewProps {
  beforeImage: string;
  afterImage: string;
  onConfirm: () => void;
  onBack: () => void;
}

export default function ComparisonView({
  beforeImage,
  afterImage,
  onConfirm,
  onBack,
}: ComparisonViewProps) {
  const [mode, setMode] = useState<'side-by-side' | 'toggle'>('side-by-side');
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Before / After 비교</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMode(mode === 'side-by-side' ? 'toggle' : 'side-by-side')}
          className="gap-2"
        >
          <ArrowLeftRight className="w-4 h-4" />
          {mode === 'side-by-side' ? '전환 모드' : '나란히 보기'}
        </Button>
      </div>

      {mode === 'side-by-side' ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-center font-semibold text-muted-foreground">Before</div>
            <div className="aspect-square bg-muted rounded-xl overflow-hidden relative">
              <Image src={beforeImage} alt="Before" fill className="object-cover" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-center font-semibold text-primary">After</div>
            <div className="aspect-square bg-muted rounded-xl overflow-hidden relative">
              <Image src={afterImage} alt="After" fill className="object-cover" />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-center font-semibold">
            {showAfter ? (
              <span className="text-primary">After</span>
            ) : (
              <span className="text-muted-foreground">Before</span>
            )}
          </div>
          <div
            className="aspect-square max-w-lg mx-auto bg-muted rounded-xl overflow-hidden cursor-pointer relative"
            onClick={() => setShowAfter(!showAfter)}
          >
            <Image
              src={showAfter ? afterImage : beforeImage}
              alt={showAfter ? 'After' : 'Before'}
              fill
              className="object-cover"
            />
          </div>
          <p className="text-center text-sm text-muted-foreground">
            클릭하여 전환
          </p>
        </div>
      )}

      <div className="flex gap-3 justify-center">
        <Button variant="outline" onClick={onBack}>
          돌아가기
        </Button>
        <Button onClick={onConfirm} size="lg">
          이 스타일로 확정
        </Button>
      </div>
    </div>
  );
}
