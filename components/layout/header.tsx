'use client';

import { useRouter, usePathname } from 'next/navigation';
import { logout } from '@/lib/auth';
import { USER_ROLE_LABELS } from '@/lib/utils';
import type { User } from '@/types';
import {
  Menu,
  Bell,
  LogOut,
  User as UserIcon,
  ChevronDown,
  Settings,
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const BREADCRUMB_MAP: Record<string, string> = {
  '/dashboard': 'لوحة التحكم',
  '/employees': 'الموظفون',
  '/union': 'النقابة',
  '/telecom': 'الاتصالات',
  '/collections': 'التحصيل',
  '/reports': 'التقارير',
  '/users': 'المستخدمون',
  '/activity': 'سجل النشاط',
  '/settings': 'الإعدادات',
};

interface HeaderProps {
  user: User | null;
  onMenuClick: () => void;
}

export function Header({ user, onMenuClick }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Build breadcrumb
  const segments = pathname.split('/').filter(Boolean);
  const currentSection = `/${segments[0]}`;
  const pageTitle = BREADCRUMB_MAP[currentSection] ?? 'لوحة التحكم';

  return (
    <header className="top-header gap-4">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Page title / breadcrumb */}
      <div className="flex-1">
        <h1 className="text-base font-semibold text-gray-900">{pageTitle}</h1>
        <p className="text-xs text-gray-400 hidden sm:block">
          نظام إدارة النقابة والاتصالات
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications bell (demo) */}
        <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              {user?.name.charAt(0) ?? 'U'}
            </div>
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900 leading-tight">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.role ? USER_ROLE_LABELS[user.role] : ''}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute left-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 z-20 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <ul className="py-1">
                  <li>
                    <Link
                      href="/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-gray-400" />
                      الإعدادات
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      تسجيل الخروج
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
