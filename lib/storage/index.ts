// ============================================================
// localStorage abstraction for demo persistence
// ============================================================

const KEYS = {
  EMPLOYEES: 'demo_employees',
  BRANCHES: 'demo_branches',
  DEPARTMENTS: 'demo_departments',
  TELECOM_COMPANIES: 'demo_telecom_companies',
  TELECOM_PLANS: 'demo_telecom_plans',
  MOBILE_LINES: 'demo_mobile_lines',
  MOBILE_ADDONS: 'demo_mobile_addons',
  UNION_MEMBERSHIPS: 'demo_union_memberships',
  UNION_SUBSCRIPTIONS: 'demo_union_subscriptions',
  TELECOM_PAYMENTS: 'demo_telecom_payments',
  USERS: 'demo_users',
  SETTINGS: 'demo_settings',
  ACTIVITY_LOGS: 'demo_activity_logs',
  AUTH_SESSION: 'demo_auth_session',
  INITIALIZED: 'demo_initialized',
} as const;

export type StorageKey = (typeof KEYS)[keyof typeof KEYS];

function isClient(): boolean {
  return typeof window !== 'undefined';
}

export function storageGet<T>(key: StorageKey): T | null {
  if (!isClient()) return null;
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function storageSet<T>(key: StorageKey, value: T): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn('localStorage write failed for key:', key);
  }
}

export function storageRemove(key: StorageKey): void {
  if (!isClient()) return;
  localStorage.removeItem(key);
}

export function storageClear(): void {
  if (!isClient()) return;
  Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
}

export { KEYS as STORAGE_KEYS };
