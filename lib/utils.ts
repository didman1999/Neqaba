// ============================================================
// Utility helpers — formatters, maskers, etc.
// ============================================================

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ---- National ID Masking ----
export function maskNationalId(id: string): string {
  if (!id || id.length < 6) return id;
  const first = id.slice(0, 3);
  const last = id.slice(-2);
  const masked = '*'.repeat(id.length - 5);
  return `${first}${masked}${last}`;
}

// ---- Currency ----
export function formatCurrency(amount: number, currency = 'ج.م'): string {
  return `${amount.toLocaleString('ar-EG', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} ${currency}`;
}

// ---- Date ----
export function formatDate(dateStr: string | undefined, locale = 'ar-EG'): string {
  if (!dateStr) return '—';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

export function formatDateShort(dateStr: string | undefined): string {
  if (!dateStr) return '—';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ar-EG');
  } catch {
    return dateStr;
  }
}

// ---- Month names ----
export const ARABIC_MONTHS = [
  'يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

export function getMonthName(month: number): string {
  return ARABIC_MONTHS[month - 1] ?? `شهر ${month}`;
}

// ---- Payment Status Labels ----
export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  paid: 'مدفوع',
  unpaid: 'غير مدفوع',
  partial: 'مدفوع جزئياً',
};

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  cash: 'نقداً',
  payroll_deduction: 'خصم من الراتب',
  cash_transfer: 'تحويل بنكي',
  not_collected: 'لم يُحصّل',
};

export const EMPLOYEE_STATUS_LABELS: Record<string, string> = {
  active: 'نشط',
  inactive: 'غير نشط',
  suspended: 'موقوف',
  retired: 'متقاعد',
};

export const MEMBERSHIP_STATUS_LABELS: Record<string, string> = {
  active: 'نشط',
  suspended: 'موقوف',
  cancelled: 'ملغي',
};

export const LINE_STATUS_LABELS: Record<string, string> = {
  active: 'نشط',
  suspended: 'موقوف',
  cancelled: 'ملغي',
};

export const LINE_TYPE_LABELS: Record<string, string> = {
  personal: 'شخصي',
  work: 'عمل',
  data: 'بيانات',
};

export const PLAN_TYPE_LABELS: Record<string, string> = {
  prepaid: 'مدفوع مسبقاً',
  postpaid: 'دفع لاحق',
  business: 'أعمال',
};

export const USER_ROLE_LABELS: Record<string, string> = {
  super_admin: 'مدير عام',
  admin: 'مدير',
  collector: 'محصل',
};

export const MODULE_LABELS: Record<string, string> = {
  auth: 'تسجيل الدخول',
  employee: 'الموظفون',
  union: 'النقابة',
  telecom: 'الاتصالات',
  payment: 'المدفوعات',
  settings: 'الإعدادات',
  user: 'المستخدمون',
};

// ---- Generate ID ----
export function generateId(prefix = 'id'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

// ---- Year range ----
export function getYearRange(from = 2024): number[] {
  const current = new Date().getFullYear();
  const years: number[] = [];
  for (let y = current; y >= from; y--) years.push(y);
  return years;
}
