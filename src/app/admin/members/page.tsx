'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Search, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DemoMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'designer';
  sessions: number;
  joinDate: string;
}

const demoMembers: DemoMember[] = [
  { id: '1', name: '관리자', email: 'admin@salon.com', role: 'admin', sessions: 0, joinDate: '2026-01-15' },
  { id: '2', name: '김디자이너', email: 'kim@salon.com', role: 'designer', sessions: 156, joinDate: '2026-02-01' },
  { id: '3', name: '이디자이너', email: 'lee@salon.com', role: 'designer', sessions: 132, joinDate: '2026-02-15' },
  { id: '4', name: '박디자이너', email: 'park@salon.com', role: 'designer', sessions: 98, joinDate: '2026-03-01' },
  { id: '5', name: '최디자이너', email: 'choi@salon.com', role: 'designer', sessions: 74, joinDate: '2026-03-10' },
];

export default function MembersPage() {
  const [search, setSearch] = useState('');
  const [members] = useState(demoMembers);

  const filtered = members.filter(
    (m) =>
      m.name.includes(search) || m.email.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">회원 관리</h1>
        <Dialog>
          <DialogTrigger render={<Button className="gap-2" />}>
            <UserPlus className="w-4 h-4" />
            디자이너 추가
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>새 디자이너 추가</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>이름</Label>
                <Input placeholder="디자이너 이름" />
              </div>
              <div className="space-y-2">
                <Label>이메일</Label>
                <Input type="email" placeholder="email@salon.com" />
              </div>
              <div className="space-y-2">
                <Label>역할</Label>
                <Select defaultValue="designer">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="designer">디자이너</SelectItem>
                    <SelectItem value="admin">관리자</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>임시 비밀번호</Label>
                <Input type="password" placeholder="********" />
              </div>
              <Button className="w-full">추가하기</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="이름 또는 이메일 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Members Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">이름</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">이메일</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">역할</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">세션 수</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">가입일</th>
                  <th className="text-right py-3 px-2 font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((member) => (
                  <tr key={member.id} className="border-b last:border-0">
                    <td className="py-3 px-2 font-medium">{member.name}</td>
                    <td className="py-3 px-2 text-muted-foreground">{member.email}</td>
                    <td className="py-3 px-2">
                      <Badge variant={member.role === 'admin' ? 'default' : 'secondary'}>
                        {member.role === 'admin' ? '관리자' : '디자이너'}
                      </Badge>
                    </td>
                    <td className="py-3 px-2">{member.sessions}</td>
                    <td className="py-3 px-2 text-muted-foreground">{member.joinDate}</td>
                    <td className="py-3 px-2 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
                          <MoreVertical className="w-4 h-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Pencil className="w-3 h-3" /> 수정
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="w-3 h-3" /> 삭제
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
