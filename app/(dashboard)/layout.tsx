'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { initDemoStore } from '@/lib/demo-data/store';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import type { User } from '@/types';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initDemoStore();
    const session = getSession();
    if (!session) {
      router.replace('/login');
      return;
    }
    setUser(session.user);
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="min-h-screen login-bg flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 shadow-lg mb-3">
            <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
          <p className="text-white text-sm">جارٍ التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar
        user={user}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <div className="main-content flex-1 flex flex-col min-w-0 w-full overflow-hidden">
        <Header user={user} onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 md:p-6 page-enter overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
