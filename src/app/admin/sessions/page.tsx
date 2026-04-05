'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Eye, Download } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DemoSession {
  id: string;
  customer: string;
  designer: string;
  style: string;
  status: 'scanning' | 'editing' | 'confirmed' | 'completed';
  duration: string;
  date: string;
}

const statusLabels: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' | 'destructive' }> = {
  scanning: { label: '스캔중', variant: 'outline' },
  editing: { label: '편집중', variant: 'secondary' },
  confirmed: { label: '확정', variant: 'default' },
  completed: { label: '완료', variant: 'default' },
};

const demoSessions: DemoSession[] = [
  { id: 'S001', customer: '고객 A', designer: '김디자이너', style: '페이드 언더컷', status: 'confirmed', duration: '3분 45초', date: '2026-04-06 14:30' },
  { id: 'S002', customer: '고객 B', designer: '이디자이너', style: '크루컷', status: 'editing', duration: '2분 10초', date: '2026-04-06 13:15' },
  { id: 'S003', customer: '고객 C', designer: '김디자이너', style: '포마드', status: 'confirmed', duration: '5분 20초', date: '2026-04-05 16:45' },
  { id: 'S004', customer: '고객 D', designer: '박디자이너', style: '사이드 파트', status: 'completed', duration: '4분 10초', date: '2026-04-05 11:20' },
  { id: 'S005', customer: '고객 E', designer: '이디자이너', style: '텍스처드 크롭', status: 'confirmed', duration: '3분 55초', date: '2026-04-04 15:00' },
  { id: 'S006', customer: '고객 F', designer: '최디자이너', style: '버즈컷', status: 'completed', duration: '1분 30초', date: '2026-04-04 10:30' },
  { id: 'S007', customer: '고객 G', designer: '김디자이너', style: '페이드 언더컷', status: 'confirmed', duration: '4분 25초', date: '2026-04-03 14:00' },
  { id: 'S008', customer: '고객 H', designer: '박디자이너', style: '크루컷', status: 'scanning', duration: '-', date: '2026-04-03 09:45' },
];

export default function SessionsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = demoSessions.filter((s) => {
    const matchSearch =
      s.customer.includes(search) ||
      s.designer.includes(search) ||
      s.style.includes(search);
    const matchStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">세션 이력</h1>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="고객, 디자이너, 스타일 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? 'all')}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="상태 필터" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="scanning">스캔중</SelectItem>
            <SelectItem value="editing">편집중</SelectItem>
            <SelectItem value="confirmed">확정</SelectItem>
            <SelectItem value="completed">완료</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sessions Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">ID</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">고객</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">디자이너</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">스타일</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">상태</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">소요 시간</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">일시</th>
                  <th className="text-right py-3 px-2 font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((session) => {
                  const statusInfo = statusLabels[session.status];
                  return (
                    <tr key={session.id} className="border-b last:border-0">
                      <td className="py-3 px-2 font-mono text-xs">{session.id}</td>
                      <td className="py-3 px-2">{session.customer}</td>
                      <td className="py-3 px-2">{session.designer}</td>
                      <td className="py-3 px-2">{session.style}</td>
                      <td className="py-3 px-2">
                        <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                      </td>
                      <td className="py-3 px-2 text-muted-foreground">{session.duration}</td>
                      <td className="py-3 px-2 text-muted-foreground">{session.date}</td>
                      <td className="py-3 px-2 text-right">
                        <div className="flex gap-1 justify-end">
                          <Button variant="ghost" size="icon" title="상세보기">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="icon" title="다운로드">
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
