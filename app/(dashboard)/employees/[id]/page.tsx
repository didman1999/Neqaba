'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight, Pencil, Phone, Mail, MapPin, Building2,
  Shield, Smartphone, DollarSign, FileText, Activity,
  UserCheck, UserX, AlertCircle, CheckCircle2,
} from 'lucide-react';
import { employeeRepository } from '@/lib/repositories/employee.repository';
import { branchRepository, departmentRepository } from '@/lib/repositories/branch.repository';
import {
  getUnionMemberships, getUnionSubscriptions,
  getMobileLines, getTelecomPayments,
  getTelecomCompanies, getActivityLogs,
} from '@/lib/demo-data/store';
import {
  formatCurrency, formatDate, maskNationalId, getMonthName,
  EMPLOYEE_STATUS_LABELS, PAYMENT_STATUS_LABELS, PAYMENT_METHOD_LABELS,
  LINE_STATUS_LABELS, LINE_TYPE_LABELS, cn,
} from '@/lib/utils';
import type { Employee, Branch, Department } from '@/types';

const STATUS_COLORS: Record<string, string> = {
  active: 'badge-active', inactive: 'badge-inactive', suspended: 'badge-suspended', retired: 'badge-inactive',
};
const PAY_STATUS_COLORS: Record<string, string> = {
  paid: 'badge-paid', unpaid: 'badge-unpaid', partial: 'badge-partial',
};

const TABS = [
  { id: 'info', label: 'البيانات الشخصية', icon: <FileText className="w-4 h-4" /> },
  { id: 'union', label: 'اشتراك النقابة', icon: <Shield className="w-4 h-4" /> },
  { id: 'lines', label: 'خطوط المحمول', icon: <Smartphone className="w-4 h-4" /> },
  { id: 'payments', label: 'المدفوعات', icon: <DollarSign className="w-4 h-4" /> },
  { id: 'activity', label: 'سجل النشاط', icon: <Activity className="w-4 h-4" /> },
];

interface Props { params: Promise<{ id: string }> }

export default function EmployeeProfilePage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [branch, setBranch] = useState<Branch | null>(null);
  const [department, setDepartment] = useState<Department | null>(null);
  const [activeTab, setActiveTab] = useState('info');
  const [loading, setLoading] = useState(true);

  // Derived data
  const [unionMembership, setUnionMembership] = useState<any>(null);
  const [unionSubs, setUnionSubs] = useState<any[]>([]);
  const [mobileLines, setMobileLines] = useState<any[]>([]);
  const [telecomPayments, setTelecomPayments] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);

  // Summary
  const [summary, setSummary] = useState({ unionOutstanding: 0, telecomOutstanding: 0, totalOutstanding: 0, linesCount: 0 });

  useEffect(() => {
    const emp = employeeRepository.getById(id);
    if (!emp) { router.push('/employees'); return; }

    setEmployee(emp);
    setBranch(branchRepository.getById(emp.branchId));
    setDepartment(departmentRepository.getById(emp.departmentId));

    // Union
    const memberships = getUnionMemberships().filter((m) => m.employeeId === emp.id);
    const membership = memberships[0] ?? null;
    setUnionMembership(membership);

    const subs = getUnionSubscriptions().filter((s) => s.employeeId === emp.id)
      .sort((a, b) => b.year * 100 + b.month - (a.year * 100 + a.month));
    setUnionSubs(subs);

    // Telecom
    const lines = getMobileLines().filter((l) => l.employeeId === emp.id);
    setMobileLines(lines);

    const payments = getTelecomPayments().filter((p) => p.employeeId === emp.id)
      .sort((a, b) => b.year * 100 + b.month - (a.year * 100 + a.month));
    setTelecomPayments(payments);

    // Activity
    const empLogs = getActivityLogs().filter((l) => l.recordId === emp.id);
    setLogs(empLogs);

    // Summary
    const unionOut = subs.reduce((s, sub) => s + (sub.amountDue - sub.amountPaid), 0);
    const telecomOut = payments.reduce((s, p) => s + p.outstandingAmount, 0);
    setSummary({ unionOutstanding: unionOut, telecomOutstanding: telecomOut, totalOutstanding: unionOut + telecomOut, linesCount: lines.length });

    setLoading(false);
  }, [id, router]);

  const telecomCompanies = getTelecomCompanies();
  const getCompanyName = (id: string) => telecomCompanies.find((c) => c.id === id)?.nameAr ?? '—';
  const getCompanyColor = (id: string) => telecomCompanies.find((c) => c.id === id)?.color ?? '#6b7280';

  if (loading) {
    return (
      <div className="space-y-5">
        <div className="skeleton h-48 rounded-2xl" />
        <div className="grid grid-cols-4 gap-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-24 rounded-xl" />)}</div>
        <div className="skeleton h-64 rounded-xl" />
      </div>
    );
  }

  if (!employee) return null;

  return (
    <div className="space-y-5 page-enter">
      {/* Back */}
      <div className="flex items-center gap-2">
        <Link href="/employees" className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
          <ArrowRight className="w-5 h-5" />
        </Link>
        <span className="text-sm text-gray-400">الموظفون / {employee.fullName}</span>
      </div>

      {/* Profile Header Card */}
      <div className="bg-gradient-to-l from-blue-600 to-blue-800 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-white" />
          <div className="absolute -right-10 -bottom-10 w-56 h-56 rounded-full bg-white" />
        </div>
        <div className="relative flex flex-col md:flex-row md:items-center gap-5">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl font-bold shadow-lg flex-shrink-0">
            {employee.fullName.charAt(0)}
          </div>
          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold">{employee.fullName}</h1>
              <span className={`badge ${STATUS_COLORS[employee.status]} bg-white/20 text-white border-0 text-xs`}>
                {EMPLOYEE_STATUS_LABELS[employee.status]}
              </span>
              {employee.isUnionMember ? (
                <span className="badge bg-green-400/20 text-white border-0 text-xs flex items-center gap-1">
                  <UserCheck className="w-3 h-3" /> عضو نقابة
                </span>
              ) : (
                <span className="badge bg-white/10 text-white/70 border-0 text-xs flex items-center gap-1">
                  <UserX className="w-3 h-3" /> غير عضو
                </span>
              )}
            </div>
            <p className="text-blue-200 font-mono text-sm mb-3">{employee.employeeNumber}</p>
            <div className="flex flex-wrap gap-4 text-sm text-blue-100">
              {branch && (
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" /> {branch.name}
                </span>
              )}
              {department && (
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> {department.name}
                </span>
              )}
              {employee.mobileNumber && (
                <span className="flex items-center gap-1.5" dir="ltr">
                  <Phone className="w-3.5 h-3.5" /> {employee.mobileNumber}
                </span>
              )}
            </div>
          </div>
          {/* Edit button */}
          <Link
            href={`/employees/${employee.id}/edit`}
            className="flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 rounded-xl text-sm font-medium transition-colors backdrop-blur self-start md:self-auto"
          >
            <Pencil className="w-4 h-4" /> تعديل
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="stat-card text-center">
          <p className="text-2xl font-bold text-blue-600">{summary.linesCount}</p>
          <p className="text-sm text-gray-500 mt-1">عدد خطوط المحمول</p>
        </div>
        <div className="stat-card text-center">
          <p className="text-2xl font-bold text-purple-600">{formatCurrency(summary.unionOutstanding)}</p>
          <p className="text-sm text-gray-500 mt-1">مديونية النقابة</p>
        </div>
        <div className="stat-card text-center">
          <p className="text-2xl font-bold text-cyan-600">{formatCurrency(summary.telecomOutstanding)}</p>
          <p className="text-sm text-gray-500 mt-1">مديونية الاتصالات</p>
        </div>
        <div className="stat-card text-center">
          <p className={cn('text-2xl font-bold', summary.totalOutstanding > 0 ? 'text-red-500' : 'text-green-600')}>
            {formatCurrency(summary.totalOutstanding)}
          </p>
          <p className="text-sm text-gray-500 mt-1">إجمالي المديونية</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
        {/* Tab Headers */}
        <div className="flex border-b border-gray-100 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px',
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              )}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-5">
          {/* Personal Info Tab */}
          {activeTab === 'info' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { label: 'الاسم الكامل', value: employee.fullName },
                { label: 'رقم الموظف', value: employee.employeeNumber, mono: true },
                { label: 'الرقم القومي', value: maskNationalId(employee.nationalId), mono: true },
                { label: 'رقم المحمول', value: employee.mobileNumber ?? '—', mono: true },
                { label: 'البريد الإلكتروني', value: employee.email ?? '—', mono: true },
                { label: 'العنوان', value: employee.address ?? '—' },
                { label: 'الفرع', value: branch?.name ?? '—' },
                { label: 'القسم', value: department?.name ?? '—' },
                { label: 'الحالة', value: EMPLOYEE_STATUS_LABELS[employee.status] },
                { label: 'عضوية النقابة', value: employee.isUnionMember ? 'عضو' : 'غير عضو' },
              ].map(({ label, value, mono }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-gray-400">{label}</span>
                  <span className={cn('text-sm font-medium text-gray-800', mono && 'font-mono')} dir={mono ? 'ltr' : undefined}>
                    {value}
                  </span>
                </div>
              ))}
              {employee.notes && (
                <div className="md:col-span-2">
                  <span className="text-xs font-medium text-gray-400 block mb-1">ملاحظات</span>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{employee.notes}</p>
                </div>
              )}
            </div>
          )}

          {/* Union Tab */}
          {activeTab === 'union' && (
            <div className="space-y-4">
              {!employee.isUnionMember ? (
                <div className="text-center py-10">
                  <UserX className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-400">هذا الموظف ليس عضواً في النقابة</p>
                </div>
              ) : !unionMembership ? (
                <div className="text-center py-10">
                  <AlertCircle className="w-12 h-12 text-amber-300 mx-auto mb-3" />
                  <p className="text-gray-400">لا توجد عضوية مسجلة</p>
                </div>
              ) : (
                <>
                  <div className="bg-blue-50 rounded-xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div><p className="text-xs text-blue-400 mb-0.5">رقم العضوية</p><p className="font-bold text-blue-800 font-mono">{unionMembership.membershipNumber}</p></div>
                    <div><p className="text-xs text-blue-400 mb-0.5">تاريخ الانضمام</p><p className="font-bold text-blue-800">{formatDate(unionMembership.startDate)}</p></div>
                    <div><p className="text-xs text-blue-400 mb-0.5">الاشتراك الشهري</p><p className="font-bold text-blue-800">{formatCurrency(unionMembership.monthlyFee)}</p></div>
                    <div><p className="text-xs text-blue-400 mb-0.5">الحالة</p><p className="font-bold text-blue-800">نشط</p></div>
                  </div>
                  <h3 className="font-semibold text-gray-700 mt-4">سجل الاشتراكات</h3>
                  <div className="overflow-x-auto">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>الشهر</th><th>المبلغ المستحق</th><th>المدفوع</th><th>المتبقي</th><th>الحالة</th><th>طريقة الدفع</th><th>تاريخ الدفع</th>
                        </tr>
                      </thead>
                      <tbody>
                        {unionSubs.map((sub) => (
                          <tr key={sub.id}>
                            <td>{getMonthName(sub.month)} {sub.year}</td>
                            <td>{formatCurrency(sub.amountDue)}</td>
                            <td className="text-green-600 font-medium">{formatCurrency(sub.amountPaid)}</td>
                            <td className={sub.amountDue - sub.amountPaid > 0 ? 'text-red-500 font-medium' : 'text-green-600'}>
                              {formatCurrency(sub.amountDue - sub.amountPaid)}
                            </td>
                            <td><span className={`badge ${PAY_STATUS_COLORS[sub.status]}`}>{PAYMENT_STATUS_LABELS[sub.status]}</span></td>
                            <td className="text-gray-500 text-xs">{PAYMENT_METHOD_LABELS[sub.paymentMethod]}</td>
                            <td className="text-gray-400 text-xs">{sub.paymentDate ? formatDate(sub.paymentDate) : '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Mobile Lines Tab */}
          {activeTab === 'lines' && (
            <div className="space-y-4">
              {mobileLines.length === 0 ? (
                <div className="text-center py-10">
                  <Smartphone className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-400">لا توجد خطوط محمول مسجلة</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mobileLines.map((line) => (
                    <div key={line.id} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ background: getCompanyColor(line.telecomCompanyId) }} />
                          <span className="font-semibold text-gray-800">{getCompanyName(line.telecomCompanyId)}</span>
                        </div>
                        <span className={`badge ${line.status === 'active' ? 'badge-active' : 'badge-suspended'}`}>
                          {LINE_STATUS_LABELS[line.status]}
                        </span>
                      </div>
                      <p className="font-mono text-lg font-bold text-gray-800 mb-2" dir="ltr">{line.mobileNumber}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                        <div><span className="text-xs text-gray-400 block">النوع</span>{LINE_TYPE_LABELS[line.lineType]}</div>
                        <div><span className="text-xs text-gray-400 block">التكلفة الشهرية</span>{formatCurrency(line.monthlyCost)}</div>
                        <div><span className="text-xs text-gray-400 block">تاريخ التفعيل</span>{formatDate(line.activationDate)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="space-y-4">
              {telecomPayments.length === 0 ? (
                <div className="text-center py-10">
                  <DollarSign className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-400">لا توجد مدفوعات مسجلة</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>الشهر</th><th>رقم الخط</th><th>الشركة</th><th>الإجمالي</th><th>المدفوع</th><th>المتبقي</th><th>الحالة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {telecomPayments.map((pay) => {
                        const line = mobileLines.find((l) => l.id === pay.mobileLineId);
                        return (
                          <tr key={pay.id}>
                            <td>{getMonthName(pay.month)} {pay.year}</td>
                            <td dir="ltr" className="font-mono text-sm">{line?.mobileNumber ?? '—'}</td>
                            <td>
                              <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full inline-block" style={{ background: getCompanyColor(pay.mobileLineId.includes(line?.id ?? '') ? line?.telecomCompanyId ?? '' : '') }} />
                                {line ? getCompanyName(line.telecomCompanyId) : '—'}
                              </span>
                            </td>
                            <td className="font-medium">{formatCurrency(pay.totalAmount)}</td>
                            <td className="text-green-600">{formatCurrency(pay.paidAmount)}</td>
                            <td className={pay.outstandingAmount > 0 ? 'text-red-500 font-medium' : 'text-green-600'}>
                              {formatCurrency(pay.outstandingAmount)}
                            </td>
                            <td><span className={`badge ${PAY_STATUS_COLORS[pay.paymentStatus]}`}>{PAYMENT_STATUS_LABELS[pay.paymentStatus]}</span></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="space-y-3">
              {logs.length === 0 ? (
                <div className="text-center py-10">
                  <Activity className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-400">لا يوجد نشاط مسجل</p>
                </div>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold flex-shrink-0 mt-0.5">
                      {log.userName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800"><span className="font-medium">{log.userName}</span> — {log.action}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{formatDate(log.createdAt)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
