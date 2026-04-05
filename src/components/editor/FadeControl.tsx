'use client';

import { useEditorStore } from '@/stores/editor-store';
import { Slider } from '@/components/ui/slider';

const val = (v: number | readonly number[]) => (Array.isArray(v) ? v[0] : v);

export default function FadeControl() {
  const { hairParams, setHairParam } = useEditorStore();

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">페이드 & 테이퍼</h3>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>페이드 높이</span>
            <span>{Math.round(hairParams.fadeHeight * 100)}%</span>
          </div>
          <Slider
            value={[hairParams.fadeHeight]}
            onValueChange={(v) => setHairParam('fadeHeight', val(v))}
            min={0}
            max={1}
            step={0.01}
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>페이드 그라디언트</span>
            <span>{Math.round(hairParams.fadeGradient * 100)}%</span>
          </div>
          <Slider
            value={[hairParams.fadeGradient]}
            onValueChange={(v) => setHairParam('fadeGradient', val(v))}
            min={0}
            max={1}
            step={0.01}
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>뒷머리 테이퍼</span>
            <span>{Math.round(hairParams.necklineTaper * 100)}%</span>
          </div>
          <Slider
            value={[hairParams.necklineTaper]}
            onValueChange={(v) => setHairParam('necklineTaper', val(v))}
            min={0}
            max={1}
            step={0.01}
          />
        </div>
      </div>
    </div>
  );
}
