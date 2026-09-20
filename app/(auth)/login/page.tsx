'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { login } from '@/lib/auth';
import { initDemoStore } from '@/lib/demo-data/store';
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';

const DEMO_ACCOUNTS = [
  { label: 'مدير عام', email: 'admin@demo.com', password: 'Demo@1234', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { label: 'مدير', email: 'manager@demo.com', password: 'Demo@1234', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { label: 'محصل', email: 'collector@demo.com', password: 'Demo@1234', color: 'bg-green-100 text-green-700 border-green-200' },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initDemoStore();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay for realism
    await new Promise((r) => setTimeout(r, 600));

    const session = login(email, password);
    if (!session) {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      setLoading(false);
      return;
    }

    router.push('/dashboard');
  };

  const fillDemo = (acc: typeof DEMO_ACCOUNTS[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setError('');
  };

  return (
    <div className="min-h-screen login-bg flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-600 opacity-10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-indigo-600 opacity-10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-900 opacity-5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-xl shadow-black/30 mb-4 overflow-hidden">
            <Image
              src="/logo.png"
              alt="شعار اللجنة"
              width={80}
              height={80}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-xl font-bold text-white mb-1">اللجنة الادارية النقابية للعاملين بالهيئة</h1>
          <p className="text-blue-300 text-sm">C.C.B.A — نظام إدارة النقابة والاتصالات</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl shadow-black/20 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">تسجيل الدخول</h2>

          {error && (
            <div className="flex items-center gap-2 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input pr-10"
                  placeholder="أدخل البريد الإلكتروني"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input pr-10 pl-10"
                  placeholder="أدخل كلمة المرور"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>جارٍ تسجيل الدخول...</span>
                </>
              ) : (
                'تسجيل الدخول'
              )}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-6">
            <p className="text-xs text-gray-500 text-center mb-3 font-medium">حسابات تجريبية</p>
            <div className="space-y-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => fillDemo(acc)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-sm transition-all hover:opacity-80 ${acc.color}`}
                >
                  <span className="font-semibold">{acc.label}</span>
                  <span className="text-xs opacity-70 direction-ltr" dir="ltr">{acc.email}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">كلمة المرور لجميع الحسابات: <span className="font-mono font-semibold text-gray-600">Demo@1234</span></p>
          </div>
        </div>

        <p className="text-center text-blue-400 text-xs mt-6">
          نظام تجريبي — جميع البيانات وهمية لأغراض العرض
        </p>
      </div>
    </div>
  );
}

