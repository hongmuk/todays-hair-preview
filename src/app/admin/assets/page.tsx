'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Scissors, ToggleLeft, ToggleRight } from 'lucide-react';
import { AVAILABLE_STYLES } from '@/types/hair-params';
import { useState } from 'react';

interface HairAsset {
  id: string;
  name: string;
  nameKo: string;
  category: string;
  polygons: number;
  morphTargets: string[];
  isActive: boolean;
}

const demoAssets: HairAsset[] = AVAILABLE_STYLES.map((style) => ({
  id: style.id,
  name: style.name,
  nameKo: style.nameKo,
  category: style.category,
  polygons: Math.floor(Math.random() * 3000) + 2000,
  morphTargets: ['fadeHeight', 'topLength', 'bangsLength', 'sideLength', 'volume', 'thinning'],
  isActive: true,
}));

export default function AssetsPage() {
  const [assets, setAssets] = useState(demoAssets);

  const toggleActive = (id: string) => {
    setAssets(assets.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">헤어 에셋 관리</h1>
        <Button className="gap-2">
          <Upload className="w-4 h-4" />
          새 모델 업로드
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {assets.map((asset) => (
          <Card key={asset.id} className={!asset.isActive ? 'opacity-60' : ''}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{asset.nameKo}</CardTitle>
                  <p className="text-sm text-muted-foreground">{asset.name}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleActive(asset.id)}
                  title={asset.isActive ? '비활성화' : '활성화'}
                >
                  {asset.isActive ? (
                    <ToggleRight className="w-5 h-5 text-green-600" />
                  ) : (
                    <ToggleLeft className="w-5 h-5 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Placeholder for 3D model thumbnail */}
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-3">
                <Scissors className="w-12 h-12 text-muted-foreground/30" />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">카테고리</span>
                  <Badge variant="secondary">{asset.category}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">폴리곤</span>
                  <span>{asset.polygons.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">모프 타겟</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {asset.morphTargets.map((mt) => (
                      <Badge key={mt} variant="outline" className="text-xs">
                        {mt}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
