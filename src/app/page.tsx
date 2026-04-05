'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ScanFace, Palette, CheckCircle, ArrowRight, Scissors } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center space-y-6 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
          <Scissors className="w-4 h-4" />
          MVP Demo
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          오늘의 헤어 엿보기
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          첫 가위질 전, 디자이너와 고객이 함께 만드는
          <br className="hidden sm:block" />
          시각적 헤어스타일 프리뷰
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Button size="lg" render={<Link href="/scan" />} className="gap-2">
            시작하기 <ArrowRight className="w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline" render={<Link href="/editor" />}>
            에디터 바로가기
          </Button>
        </div>
      </section>

      {/* How it works */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">어떻게 작동하나요?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <ScanFace className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>1. 얼굴 스캔</CardTitle>
              <CardDescription>
                스마트폰이나 태블릿 카메라로 고객의 얼굴을 스캔하여 3D 디지털 아바타를 생성합니다.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <Palette className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>2. 스타일 편집</CardTitle>
              <CardDescription>
                디자이너가 슬라이더로 페이드 높이, 길이, 볼륨 등을 실시간 조절하며 최적의 스타일을 찾습니다.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>3. 시각적 확인</CardTitle>
              <CardDescription>
                Before/After를 나란히 비교하고, 양측이 합의한 후 시술을 시작합니다.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-8">주요 기능</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: '대화형 리터칭', desc: '슬라이더로 실시간 헤어스타일 수정' },
            { title: '테이퍼링 & 트리밍', desc: '페이드 높이 조절, 숱치기 시뮬레이션' },
            { title: '길이 & 볼륨 조절', desc: '앞머리, 옆머리, 윗머리 길이 개별 조절' },
            { title: '6가지 베이스 스타일', desc: '크루컷, 페이드 언더컷, 포마드 등' },
            { title: 'Before/After 비교', desc: '시술 전후 나란히 비교 확인' },
            { title: '관리자 대시보드', desc: '회원 관리, 사용 통계, 세션 이력' },
          ].map((feature) => (
            <Card key={feature.title}>
              <CardContent className="pt-6">
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
