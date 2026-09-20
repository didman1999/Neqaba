// ============================================================
// Demo Store — initializes and manages all demo data
// Replaces Supabase in demo mode
// ============================================================

import {
  seedBranches,
  seedDepartments,
  seedEmployees,
  seedTelecomCompanies,
  seedTelecomPlans,
  seedMobileLines,
  seedMobileAddons,
  seedUnionMemberships,
  seedUnionSubscriptions,
  seedTelecomPayments,
  seedUsers,
  seedSettings,
  seedActivityLogs,
} from '@/lib/demo-data/seed';
import { storageGet, storageSet, storageClear, STORAGE_KEYS } from '@/lib/storage';
import type {
  Branch,
  Department,
  Employee,
  TelecomCompany,
  TelecomPlan,
  MobileLine,
  MobileAddon,
  UnionMembership,
  UnionSubscription,
  TelecomPayment,
  User,
  AppSettings,
  ActivityLog,
} from '@/types';

export function initDemoStore(): void {
  // Only initialize once per browser session
  const initialized = storageGet<boolean>(STORAGE_KEYS.INITIALIZED);
  if (initialized) {
    // Always re-seed settings so org name/logo changes take effect
    storageSet(STORAGE_KEYS.SETTINGS, seedSettings);
    return;
  }

  storageSet(STORAGE_KEYS.BRANCHES, seedBranches);
  storageSet(STORAGE_KEYS.DEPARTMENTS, seedDepartments);
  storageSet(STORAGE_KEYS.EMPLOYEES, seedEmployees);
  storageSet(STORAGE_KEYS.TELECOM_COMPANIES, seedTelecomCompanies);
  storageSet(STORAGE_KEYS.TELECOM_PLANS, seedTelecomPlans);
  storageSet(STORAGE_KEYS.MOBILE_LINES, seedMobileLines);
  storageSet(STORAGE_KEYS.MOBILE_ADDONS, seedMobileAddons);
  storageSet(STORAGE_KEYS.UNION_MEMBERSHIPS, seedUnionMemberships);
  storageSet(STORAGE_KEYS.UNION_SUBSCRIPTIONS, seedUnionSubscriptions);
  storageSet(STORAGE_KEYS.TELECOM_PAYMENTS, seedTelecomPayments);
  storageSet(STORAGE_KEYS.USERS, seedUsers);
  storageSet(STORAGE_KEYS.SETTINGS, seedSettings);
  storageSet(STORAGE_KEYS.ACTIVITY_LOGS, seedActivityLogs);
  storageSet(STORAGE_KEYS.INITIALIZED, true);
}

export function resetDemoStore(): void {
  storageClear();
  initDemoStore();
}

// ---- Typed Getters ----

export function getAll<T>(key: (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS]): T[] {
  return storageGet<T[]>(key) ?? [];
}

export function setAll<T>(key: (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS], data: T[]): void {
  storageSet(key, data);
}

export function getBranches(): Branch[] { return getAll(STORAGE_KEYS.BRANCHES); }
export function getDepartments(): Department[] { return getAll(STORAGE_KEYS.DEPARTMENTS); }
export function getEmployees(): Employee[] { return getAll(STORAGE_KEYS.EMPLOYEES); }
export function getTelecomCompanies(): TelecomCompany[] { return getAll(STORAGE_KEYS.TELECOM_COMPANIES); }
export function getTelecomPlans(): TelecomPlan[] { return getAll(STORAGE_KEYS.TELECOM_PLANS); }
export function getMobileLines(): MobileLine[] { return getAll(STORAGE_KEYS.MOBILE_LINES); }
export function getMobileAddons(): MobileAddon[] { return getAll(STORAGE_KEYS.MOBILE_ADDONS); }
export function getUnionMemberships(): UnionMembership[] { return getAll(STORAGE_KEYS.UNION_MEMBERSHIPS); }
export function getUnionSubscriptions(): UnionSubscription[] { return getAll(STORAGE_KEYS.UNION_SUBSCRIPTIONS); }
export function getTelecomPayments(): TelecomPayment[] { return getAll(STORAGE_KEYS.TELECOM_PAYMENTS); }
export function getUsers(): User[] { return getAll(STORAGE_KEYS.USERS); }
export function getSettings(): AppSettings { return storageGet<AppSettings>(STORAGE_KEYS.SETTINGS) ?? seedSettings; }
export function getActivityLogs(): ActivityLog[] { return getAll(STORAGE_KEYS.ACTIVITY_LOGS); }

export function setBranches(d: Branch[]): void { setAll(STORAGE_KEYS.BRANCHES, d); }
export function setDepartments(d: Department[]): void { setAll(STORAGE_KEYS.DEPARTMENTS, d); }
export function setEmployees(d: Employee[]): void { setAll(STORAGE_KEYS.EMPLOYEES, d); }
export function setTelecomCompanies(d: TelecomCompany[]): void { setAll(STORAGE_KEYS.TELECOM_COMPANIES, d); }
export function setTelecomPlans(d: TelecomPlan[]): void { setAll(STORAGE_KEYS.TELECOM_PLANS, d); }
export function setMobileLines(d: MobileLine[]): void { setAll(STORAGE_KEYS.MOBILE_LINES, d); }
export function setMobileAddons(d: MobileAddon[]): void { setAll(STORAGE_KEYS.MOBILE_ADDONS, d); }
export function setUnionMemberships(d: UnionMembership[]): void { setAll(STORAGE_KEYS.UNION_MEMBERSHIPS, d); }
export function setUnionSubscriptions(d: UnionSubscription[]): void { setAll(STORAGE_KEYS.UNION_SUBSCRIPTIONS, d); }
export function setTelecomPayments(d: TelecomPayment[]): void { setAll(STORAGE_KEYS.TELECOM_PAYMENTS, d); }
export function setUsers(d: User[]): void { setAll(STORAGE_KEYS.USERS, d); }
export function setSettings(d: AppSettings): void { storageSet(STORAGE_KEYS.SETTINGS, d); }
export function setActivityLogs(d: ActivityLog[]): void { setAll(STORAGE_KEYS.ACTIVITY_LOGS, d); }
