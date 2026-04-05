'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useScanStore } from '@/stores/scan-store';
import { useSessionStore } from '@/stores/session-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, ArrowLeft, Download, Share2 } from 'lucide-react';

export default function ConfirmPage() {
  const router = useRouter();
  const { faceTexture } = useScanStore();
  const { confirmSession } = useSessionStore();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const beforeImage = faceTexture;
  const afterImage = faceTexture;

  const handleConfirm = () => {
    confirmSession();
    setIsConfirmed(true);
  };

  if (isConfirmed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold">스타일이 확정되었습니다!</h1>
        <p className="text-muted-foreground text-lg">
          디자이너와 고객 모두 동의하였습니다.<br />
          이제 시술을 시작할 수 있습니다.
        </p>
        <div className="flex gap-3 justify-center pt-4">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            이미지 저장
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 className="w-4 h-4" />
            공유하기
          </Button>
          <Button onClick={() => router.push('/')}>
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push('/editor')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">최종 확인</h1>
          <p className="text-muted-foreground">
            시술 전후를 비교하고 스타일을 확정해 주세요
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Before</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              {beforeImage ? (
                <img src={beforeImage} alt="Before" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <div className="text-muted-foreground text-center p-8">
                  <p className="text-lg font-medium">스캔 이미지</p>
                  <p className="text-sm mt-1">카메라 스캔 후 표시됩니다</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="text-center text-primary">After</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              {afterImage ? (
                <img src={afterImage} alt="After" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <div className="text-muted-foreground text-center p-8">
                  <p className="text-lg font-medium">3D 프리뷰 렌더</p>
                  <p className="text-sm mt-1">에디터에서 렌더링된 이미지</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold">이 스타일로 시술을 진행할까요?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                확정 후에는 세션 기록에 저장됩니다.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => router.push('/editor')}>
                수정하기
              </Button>
              <Button onClick={handleConfirm} size="lg" className="gap-2">
                <CheckCircle2 className="w-5 h-5" />
                스타일 확정
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
