'use client';

import { useEditorStore } from '@/stores/editor-store';
import { Slider } from '@/components/ui/slider';

const val = (v: number | readonly number[]) => (Array.isArray(v) ? v[0] : v);

export default function LengthControl() {
  const { hairParams, setHairParam } = useEditorStore();

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">길이 조절</h3>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>윗머리 길이</span>
            <span>{Math.round(hairParams.topLength * 100)}%</span>
          </div>
          <Slider
            value={[hairParams.topLength]}
            onValueChange={(v) => setHairParam('topLength', val(v))}
            min={0}
            max={1}
            step={0.01}
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>앞머리 길이</span>
            <span>{Math.round(hairParams.bangsLength * 100)}%</span>
          </div>
          <Slider
            value={[hairParams.bangsLength]}
            onValueChange={(v) => setHairParam('bangsLength', val(v))}
            min={0}
            max={1}
            step={0.01}
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>옆머리 길이</span>
            <span>{Math.round(hairParams.sideLength * 100)}%</span>
          </div>
          <Slider
            value={[hairParams.sideLength]}
            onValueChange={(v) => setHairParam('sideLength', val(v))}
            min={0}
            max={1}
            step={0.01}
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>뒷머리 길이</span>
            <span>{Math.round(hairParams.backLength * 100)}%</span>
          </div>
          <Slider
            value={[hairParams.backLength]}
            onValueChange={(v) => setHairParam('backLength', val(v))}
            min={0}
            max={1}
            step={0.01}
          />
        </div>
      </div>
    </div>
  );
}
