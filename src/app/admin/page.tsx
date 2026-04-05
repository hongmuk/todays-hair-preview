'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Scissors, Clock, TrendingUp } from 'lucide-react';

// Demo statistics data
const stats = [
  { title: '총 세션', value: '1,247', change: '+12%', icon: Scissors },
  { title: '활성 디자이너', value: '8', change: '+2', icon: Users },
  { title: '평균 소요 시간', value: '4.2분', change: '-0.3분', icon: Clock },
  { title: '확정률', value: '87%', change: '+5%', icon: TrendingUp },
];

const recentSessions = [
  { id: 1, customer: '고객 A', designer: '김디자이너', style: '페이드 언더컷', status: '확정', date: '2026-04-06' },
  { id: 2, customer: '고객 B', designer: '이디자이너', style: '크루컷', status: '편집중', date: '2026-04-06' },
  { id: 3, customer: '고객 C', designer: '김디자이너', style: '포마드', status: '확정', date: '2026-04-05' },
  { id: 4, customer: '고객 D', designer: '박디자이너', style: '사이드 파트', status: '확정', date: '2026-04-05' },
  { id: 5, customer: '고객 E', designer: '이디자이너', style: '텍스처드 크롭', status: '스캔', date: '2026-04-04' },
];

const popularStyles = [
  { name: '페이드 언더컷', count: 342, percentage: 27 },
  { name: '크루컷', count: 285, percentage: 23 },
  { name: '포마드', count: 231, percentage: 19 },
  { name: '텍스처드 크롭', count: 198, percentage: 16 },
  { name: '사이드 파트', count: 124, percentage: 10 },
  { name: '버즈컷', count: 67, percentage: 5 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">대시보드</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                </div>
                <stat.icon className="w-8 h-8 text-muted-foreground/50" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>최근 세션</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium">{session.customer}</p>
                    <p className="text-xs text-muted-foreground">
                      {session.designer} | {session.style}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={cn(
                        'text-xs px-2 py-0.5 rounded-full',
                        session.status === '확정'
                          ? 'bg-green-100 text-green-700'
                          : session.status === '편집중'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      )}
                    >
                      {session.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">{session.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Styles */}
        <Card>
          <CardHeader>
            <CardTitle>인기 스타일</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {popularStyles.map((style) => (
                <div key={style.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{style.name}</span>
                    <span className="text-muted-foreground">{style.count}회 ({style.percentage}%)</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${style.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
