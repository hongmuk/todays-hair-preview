'use client';

import { useEditorStore } from '@/stores/editor-store';
import { AVAILABLE_STYLES } from '@/types/hair-params';
import { cn } from '@/lib/utils';
import { Scissors } from 'lucide-react';

export default function StyleSelector() {
  const { hairParams, setHairParam } = useEditorStore();

  return (
    <div>
      <h3 className="text-sm font-semibold mb-3">베이스 스타일</h3>
      <div className="grid grid-cols-2 gap-2">
        {AVAILABLE_STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => setHairParam('baseStyleId', style.id)}
            className={cn(
              'flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all text-sm',
              hairParams.baseStyleId === style.id
                ? 'border-primary bg-primary/5'
                : 'border-transparent bg-muted/50 hover:bg-muted'
            )}
          >
            <Scissors className="w-6 h-6 text-muted-foreground" />
            <span className="font-medium">{style.nameKo}</span>
            <span className="text-xs text-muted-foreground">{style.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
