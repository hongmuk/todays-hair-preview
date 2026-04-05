'use client';

import Link from 'next/link';
import { Scissors, Home, ScanFace, Palette, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Scissors className="w-6 h-6 text-primary" />
          <span>오늘의 헤어</span>
        </Link>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" render={<Link href="/" />} className="gap-1.5">
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">홈</span>
          </Button>
          <Button variant="ghost" size="sm" render={<Link href="/scan" />} className="gap-1.5">
            <ScanFace className="w-4 h-4" />
            <span className="hidden sm:inline">스캔</span>
          </Button>
          <Button variant="ghost" size="sm" render={<Link href="/editor" />} className="gap-1.5">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">에디터</span>
          </Button>
          <Button variant="ghost" size="sm" render={<Link href="/admin" />} className="gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span className="hidden sm:inline">관리자</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
