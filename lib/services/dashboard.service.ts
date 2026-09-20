// ============================================================
// Dashboard Service — Computes stats from demo data
// ============================================================

import type {
  DashboardStats,
  MonthlyCollectionData,
  PaymentMethodData,
  TelecomDistribution,
  BranchCollection,
} from '@/types';
import {
  getEmployees,
  getUnionMemberships,
  getMobileLines,
  getUnionSubscriptions,
  getTelecomPayments,
  getBranches,
  getTelecomCompanies,
} from '@/lib/demo-data/store';
import { getMonthName, PAYMENT_METHOD_LABELS } from '@/lib/utils';
import { DEMO_CURRENT } from '@/lib/demo-data/seed';

export function getDashboardStats(
  filters?: { month?: number; year?: number; branchId?: string; departmentId?: string }
): DashboardStats {
  const year = filters?.year ?? DEMO_CURRENT.year;
  const month = filters?.month ?? DEMO_CURRENT.month;

  let employees = getEmployees();
  if (filters?.branchId && filters.branchId !== 'all') {
    employees = employees.filter((e) => e.branchId === filters.branchId);
  }
  if (filters?.departmentId && filters.departmentId !== 'all') {
    employees = employees.filter((e) => e.departmentId === filters.departmentId);
  }
  const empIds = new Set(employees.map((e) => e.id));

  const unionMembers = getUnionMemberships().filter((m) => empIds.has(m.employeeId));
  const mobileLines = getMobileLines().filter((l) => empIds.has(l.employeeId) && l.status === 'active');

  const unionSubs = getUnionSubscriptions().filter(
    (s) => s.month === month && s.year === year && empIds.has(s.employeeId)
  );
  const telecomPayments = getTelecomPayments().filter(
    (p) => p.month === month && p.year === year && empIds.has(p.employeeId)
  );

  const unionPaid = unionSubs.filter((s) => s.status === 'paid').length;
  const unionUnpaid = unionSubs.filter((s) => s.status !== 'paid').length;

  const telecomCollected = telecomPayments.reduce((sum, p) => sum + p.paidAmount, 0);
  const unionCollected = unionSubs.reduce((sum, s) => sum + s.amountPaid, 0);

  const telecomOutstanding = telecomPayments.reduce((sum, p) => sum + p.outstandingAmount, 0);
  const unionOutstanding = unionSubs.reduce((sum, s) => sum + (s.amountDue - s.amountPaid), 0);

  return {
    totalEmployees: employees.length,
    unionMembers: unionMembers.length,
    totalMobileLines: mobileLines.length,
    unionPaidThisMonth: unionPaid,
    unionUnpaidThisMonth: unionUnpaid,
    telecomCollectedThisMonth: telecomCollected,
    totalOutstanding: telecomOutstanding + unionOutstanding,
    totalMonthlyCollection: telecomCollected + unionCollected,
  };
}

export function getMonthlyCollectionData(year?: number): MonthlyCollectionData[] {
  const y = year ?? DEMO_CURRENT.year;
  const result: MonthlyCollectionData[] = [];

  for (let m = 4; m <= DEMO_CURRENT.month; m++) {
    const unionTotal = getUnionSubscriptions()
      .filter((s) => s.month === m && s.year === y)
      .reduce((sum, s) => sum + s.amountPaid, 0);

    const telecomTotal = getTelecomPayments()
      .filter((p) => p.month === m && p.year === y)
      .reduce((sum, p) => sum + p.paidAmount, 0);

    result.push({
      month: getMonthName(m),
      union: unionTotal,
      telecom: telecomTotal,
      total: unionTotal + telecomTotal,
    });
  }
  return result;
}

export function getPaidVsUnpaidData(month?: number, year?: number): { name: string; value: number; color: string }[] {
  const m = month ?? DEMO_CURRENT.month;
  const y = year ?? DEMO_CURRENT.year;

  const unionSubs = getUnionSubscriptions().filter((s) => s.month === m && s.year === y);
  const telecomPay = getTelecomPayments().filter((p) => p.month === m && p.year === y);

  const allPayments = [...unionSubs.map((s) => s.status), ...telecomPay.map((p) => p.paymentStatus)];

  const paid = allPayments.filter((s) => s === 'paid').length;
  const unpaid = allPayments.filter((s) => s === 'unpaid').length;
  const partial = allPayments.filter((s) => s === 'partial').length;

  return [
    { name: 'مدفوع', value: paid, color: '#22c55e' },
    { name: 'غير مدفوع', value: unpaid, color: '#ef4444' },
    { name: 'مدفوع جزئياً', value: partial, color: '#f97316' },
  ];
}

export function getPaymentMethodData(month?: number, year?: number): PaymentMethodData[] {
  const m = month ?? DEMO_CURRENT.month;
  const y = year ?? DEMO_CURRENT.year;

  const allSubs = getUnionSubscriptions().filter((s) => s.month === m && s.year === y && s.status !== 'unpaid');
  const allPay = getTelecomPayments().filter((p) => p.month === m && p.year === y && p.paymentStatus !== 'unpaid');

  const methodAmounts: Record<string, { amount: number; count: number }> = {};
  [...allSubs, ...allPay].forEach((p) => {
    const method = p.paymentMethod;
    if (!methodAmounts[method]) methodAmounts[method] = { amount: 0, count: 0 };
    const amount = 'amountPaid' in p ? p.amountPaid : p.paidAmount;
    methodAmounts[method].amount += amount;
    methodAmounts[method].count += 1;
  });

  return Object.entries(methodAmounts)
    .filter(([method]) => method !== 'not_collected')
    .map(([method, { amount, count }]) => ({
      method: PAYMENT_METHOD_LABELS[method] ?? method,
      amount,
      count,
    }));
}

export function getTelecomDistribution(): TelecomDistribution[] {
  const companies = getTelecomCompanies();
  const lines = getMobileLines().filter((l) => l.status === 'active');

  return companies.map((c) => ({
    company: c.nameAr,
    lines: lines.filter((l) => l.telecomCompanyId === c.id).length,
    color: c.color,
  }));
}

export function getBranchCollectionData(month?: number, year?: number): BranchCollection[] {
  const m = month ?? DEMO_CURRENT.month;
  const y = year ?? DEMO_CURRENT.year;
  const branches = getBranches();
  const employees = getEmployees();

  return branches.map((br) => {
    const branchEmpIds = new Set(employees.filter((e) => e.branchId === br.id).map((e) => e.id));

    const unionTotal = getUnionSubscriptions()
      .filter((s) => s.month === m && s.year === y && branchEmpIds.has(s.employeeId))
      .reduce((sum, s) => sum + s.amountPaid, 0);

    const telecomTotal = getTelecomPayments()
      .filter((p) => p.month === m && p.year === y && branchEmpIds.has(p.employeeId))
      .reduce((sum, p) => sum + p.paidAmount, 0);

    return { branch: br.name, union: unionTotal, telecom: telecomTotal };
  });
}
