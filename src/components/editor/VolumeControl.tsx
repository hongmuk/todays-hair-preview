'use client';

import { useEditorStore } from '@/stores/editor-store';
import { Slider } from '@/components/ui/slider';

const val = (v: number | readonly number[]) => (Array.isArray(v) ? v[0] : v);

export default function VolumeControl() {
  const { hairParams, setHairParam } = useEditorStore();

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">볼륨 & 질감</h3>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>전체 볼륨</span>
            <span>{Math.round(hairParams.overallVolume * 100)}%</span>
          </div>
          <Slider
            value={[hairParams.overallVolume]}
            onValueChange={(v) => setHairParam('overallVolume', val(v))}
            min={0}
            max={1}
            step={0.01}
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>숱치기</span>
            <span>{Math.round(hairParams.thinning * 100)}%</span>
          </div>
          <Slider
            value={[hairParams.thinning]}
            onValueChange={(v) => setHairParam('thinning', val(v))}
            min={0}
            max={1}
            step={0.01}
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>가르마 위치</span>
            <span>{hairParams.partPosition > 0 ? '오른쪽' : hairParams.partPosition < 0 ? '왼쪽' : '중앙'}</span>
          </div>
          <Slider
            value={[hairParams.partPosition]}
            onValueChange={(v) => setHairParam('partPosition', val(v))}
            min={-1}
            max={1}
            step={0.01}
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>텍스처</span>
            <span>{Math.round(hairParams.textureAmount * 100)}%</span>
          </div>
          <Slider
            value={[hairParams.textureAmount]}
            onValueChange={(v) => setHairParam('textureAmount', val(v))}
            min={0}
            max={1}
            step={0.01}
          />
        </div>
      </div>
    </div>
  );
}
