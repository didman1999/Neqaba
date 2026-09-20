'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Shield,
  Smartphone,
  Wallet,
  BarChart3,
  UserCog,
  Activity,
  Settings,
  ChevronRight,
  X,
} from 'lucide-react';
import type { User } from '@/types';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles: User['role'][];
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'لوحة التحكم', href: '/dashboard', icon: <LayoutDashboard className="icon" />, roles: ['super_admin', 'admin', 'collector'] },
  { label: 'الموظفون', href: '/employees', icon: <Users className="icon" />, roles: ['super_admin', 'admin'] },
  { label: 'النقابة', href: '/union', icon: <Shield className="icon" />, roles: ['super_admin', 'admin'] },
  { label: 'الاتصالات', href: '/telecom', icon: <Smartphone className="icon" />, roles: ['super_admin', 'admin'] },
  { label: 'التحصيل', href: '/collections', icon: <Wallet className="icon" />, roles: ['super_admin', 'admin', 'collector'] },
  { label: 'التقارير', href: '/reports', icon: <BarChart3 className="icon" />, roles: ['super_admin', 'admin'] },
  { label: 'المستخدمون', href: '/users', icon: <UserCog className="icon" />, roles: ['super_admin'] },
  { label: 'سجل النشاط', href: '/activity', icon: <Activity className="icon" />, roles: ['super_admin', 'admin'] },
  { label: 'الإعدادات', href: '/settings', icon: <Settings className="icon" />, roles: ['super_admin'] },
];

interface SidebarProps {
  user: User | null;
  mobileOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ user, mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const visibleItems = NAV_ITEMS.filter(
    (item) => !user || item.roles.includes(user.role)
  );

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'sidebar',
          mobileOpen ? 'open' : ''
        )}
        style={{ transform: mobileOpen ? 'translateX(0)' : undefined }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-700/50">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-white shadow-lg">
            <Image
              src="/logo.png"
              alt="شعار اللجنة"
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-xs leading-tight">اللجنة الادارية النقابية</p>
            <p className="text-slate-400 text-xs truncate">للعاملين بالهيئة</p>
          </div>
          {/* Mobile close */}
          <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-0.5">
            {visibleItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn('sidebar-nav-item', isActive(item.href) && 'active')}
                >
                  {item.icon}
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="text-xs bg-blue-500 text-white px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {isActive(item.href) && (
                    <ChevronRight className="w-4 h-4 opacity-60" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User info at bottom */}
        {user && (
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{user.name}</p>
                <p className="text-slate-400 text-xs truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Demo badge */}
        <div className="px-4 pb-3">
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 text-center">
            <p className="text-amber-400 text-xs font-medium">وضع تجريبي</p>
          </div>
        </div>
      </aside>
    </>
  );
}

