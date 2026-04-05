'use client';

import { useEditorStore } from '@/stores/editor-store';
import FadeControl from './FadeControl';
import LengthControl from './LengthControl';
import VolumeControl from './VolumeControl';
import StyleSelector from './StyleSelector';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Undo2, Redo2, RotateCcw } from 'lucide-react';

export default function HairControlPanel() {
  const { resetParams } = useEditorStore();
  const { undo, redo, pastStates, futureStates } = useEditorStore.temporal.getState();

  return (
    <div className="w-full lg:w-80 bg-card border rounded-xl p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">헤어 스타일 편집</h2>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => undo()}
            disabled={pastStates.length === 0}
            title="실행 취소"
          >
            <Undo2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => redo()}
            disabled={futureStates.length === 0}
            title="다시 실행"
          >
            <Redo2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={resetParams}
            title="초기화"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Separator />

      <StyleSelector />

      <Separator />

      <FadeControl />

      <Separator />

      <LengthControl />

      <Separator />

      <VolumeControl />

      <Separator />

      {/* Hair Color */}
      <div>
        <h3 className="text-sm font-semibold mb-3">헤어 컬러</h3>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={useEditorStore.getState().hairParams.hairColor}
            onChange={(e) =>
              useEditorStore.getState().setHairParam('hairColor', e.target.value)
            }
            className="w-10 h-10 rounded cursor-pointer border"
          />
          <div className="flex gap-2">
            {['#1a1a1a', '#3d2b1f', '#8b4513', '#d4a574', '#c0c0c0'].map((color) => (
              <button
                key={color}
                className="w-8 h-8 rounded-full border-2 border-transparent hover:border-primary transition-colors"
                style={{ backgroundColor: color }}
                onClick={() =>
                  useEditorStore.getState().setHairParam('hairColor', color)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
