'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, History, FolderOpen } from 'lucide-react';

const navItems = [
  { href: '/admin', label: '대시보드', icon: LayoutDashboard },
  { href: '/admin/members', label: '회원 관리', icon: Users },
  { href: '/admin/sessions', label: '세션 이력', icon: History },
  { href: '/admin/assets', label: '에셋 관리', icon: FolderOpen },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-[calc(100vh-56px)]">
      {/* Sidebar */}
      <aside className="w-56 border-r bg-muted/30 p-4 hidden md:block">
        <h2 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-4">
          관리자 메뉴
        </h2>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">{children}</div>
    </div>
  );
}
