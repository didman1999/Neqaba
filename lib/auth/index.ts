// ============================================================
// Mock Authentication Service
// Demo mode — no real Supabase Auth
// ============================================================

import { DEMO_CREDENTIALS } from '@/lib/demo-data/seed';
import { storageGet, storageSet, storageRemove, STORAGE_KEYS } from '@/lib/storage';
import type { AuthSession, User } from '@/types';
import { getUsers } from '@/lib/demo-data/store';

export function login(email: string, password: string): AuthSession | null {
  const credential = DEMO_CREDENTIALS.find(
    (c) => c.email.toLowerCase() === email.toLowerCase() && c.password === password
  );
  if (!credential) return null;

  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return null;

  // Update lastLogin
  user.lastLogin = new Date().toISOString();

  const session: AuthSession = {
    user,
    token: `demo_token_${user.id}_${Date.now()}`,
  };

  storageSet(STORAGE_KEYS.AUTH_SESSION, session);
  return session;
}

export function logout(): void {
  storageRemove(STORAGE_KEYS.AUTH_SESSION);
}

export function getSession(): AuthSession | null {
  return storageGet<AuthSession>(STORAGE_KEYS.AUTH_SESSION);
}

export function getCurrentUser(): User | null {
  return getSession()?.user ?? null;
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}

// Permission helpers
export type Permission =
  | 'manage_users'
  | 'manage_settings'
  | 'delete_employees'
  | 'delete_transactions'
  | 'view_reports'
  | 'collect_payments'
  | 'manage_employees'
  | 'manage_union'
  | 'manage_telecom';

const ROLE_PERMISSIONS: Record<User['role'], Permission[]> = {
  super_admin: [
    'manage_users', 'manage_settings', 'delete_employees', 'delete_transactions',
    'view_reports', 'collect_payments', 'manage_employees', 'manage_union', 'manage_telecom',
  ],
  admin: [
    'view_reports', 'collect_payments', 'manage_employees', 'manage_union', 'manage_telecom',
  ],
  collector: [
    'collect_payments',
  ],
};

export function hasPermission(user: User | null, permission: Permission): boolean {
  if (!user) return false;
  return ROLE_PERMISSIONS[user.role]?.includes(permission) ?? false;
}

export function canViewModule(user: User | null, module: string): boolean {
  if (!user) return false;
  if (user.role === 'super_admin' || user.role === 'admin') return true;
  // Collector can only see: dashboard, collections
  const collectorModules = ['dashboard', 'collections'];
  return collectorModules.includes(module);
}
