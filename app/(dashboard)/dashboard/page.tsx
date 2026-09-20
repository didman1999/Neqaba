'use client';

import { useEffect, useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {
  Users, Shield, Smartphone, CheckCircle2, XCircle,
  TrendingUp, AlertTriangle, DollarSign,
  RefreshCw,
} from 'lucide-react';
import {
  getDashboardStats,
  getMonthlyCollectionData,
  getPaidVsUnpaidData,
  getPaymentMethodData,
  getTelecomDistribution,
  getBranchCollectionData,
} from '@/lib/services/dashboard.service';
import { getBranches, getDepartments } from '@/lib/demo-data/store';
import { formatCurrency, getMonthName, ARABIC_MONTHS, getYearRange } from '@/lib/utils';
import type { DashboardStats, Branch, Department } from '@/types';
import { DEMO_CURRENT } from '@/lib/demo-data/seed';

// ---- Stat Card Component ----
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
  trend?: string;
  trendUp?: boolean;
  subtitle?: string;
}

function StatCard({ title, value, icon, iconBg, trend, trendUp, subtitle }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between mb-3">
        <div className={`stat-card-icon ${iconBg}`}>{icon}</div>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-1 number-ar">{value}</p>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
    </div>
  );
}

// ---- Custom Tooltip ----
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-700 mb-2">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
          {p.name}: <span className="font-bold">{typeof p.value === 'number' ? formatCurrency(p.value) : p.value}</span>
        </p>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [paidVsUnpaid, setPaidVsUnpaid] = useState<any[]>([]);
  const [methodData, setMethodData] = useState<any[]>([]);
  const [telecomDist, setTelecomDist] = useState<any[]>([]);
  const [branchData, setBranchData] = useState<any[]>([]);

  const [filterMonth, setFilterMonth] = useState(DEMO_CURRENT.month);
  const [filterYear, setFilterYear] = useState(DEMO_CURRENT.year);
  const [filterBranch, setFilterBranch] = useState('all');
  const [filterDept, setFilterDept] = useState('all');
  const [branches, setBranches] = useState<Branch[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      const filters = {
        month: filterMonth,
        year: filterYear,
        branchId: filterBranch,
        departmentId: filterDept,
      };
      setStats(getDashboardStats(filters));
      setMonthlyData(getMonthlyCollectionData(filterYear));
      setPaidVsUnpaid(getPaidVsUnpaidData(filterMonth, filterYear));
      setMethodData(getPaymentMethodData(filterMonth, filterYear));
      setTelecomDist(getTelecomDistribution());
      setBranchData(getBranchCollectionData(filterMonth, filterYear));
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    setBranches(getBranches());
    setDepartments(getDepartments());
  }, []);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterMonth, filterYear, filterBranch, filterDept]);

  const years = getYearRange(2024);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-heading">لوحة التحكم</h1>
          <p className="section-subheading">
            نظرة عامة — {getMonthName(filterMonth)} {filterYear}
          </p>
        </div>
        <button
          onClick={loadData}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
        >
          <RefreshCw className="w-4 h-4" />
          تحديث
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">الشهر</label>
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(+e.target.value)}
              className="form-input text-sm"
            >
              {ARABIC_MONTHS.map((m, i) => (
                <option key={i + 1} value={i + 1}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">السنة</label>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(+e.target.value)}
              className="form-input text-sm"
            >
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">الفرع</label>
            <select
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
              className="form-input text-sm"
            >
              <option value="all">جميع الفروع</option>
              {branches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">القسم</label>
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="form-input text-sm"
            >
              <option value="all">جميع الأقسام</option>
              {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="stat-card">
              <div className="skeleton w-12 h-12 rounded-xl mb-3" />
              <div className="skeleton w-20 h-7 mb-2" />
              <div className="skeleton w-32 h-4" />
            </div>
          ))}
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="إجمالي الموظفين"
            value={stats.totalEmployees}
            icon={<Users className="w-5 h-5 text-blue-600" />}
            iconBg="bg-blue-50"
            subtitle="موظف مسجل"
          />
          <StatCard
            title="أعضاء النقابة"
            value={stats.unionMembers}
            icon={<Shield className="w-5 h-5 text-purple-600" />}
            iconBg="bg-purple-50"
            subtitle={`${Math.round((stats.unionMembers / stats.totalEmployees) * 100)}% من الموظفين`}
          />
          <StatCard
            title="إجمالي خطوط المحمول"
            value={stats.totalMobileLines}
            icon={<Smartphone className="w-5 h-5 text-indigo-600" />}
            iconBg="bg-indigo-50"
            subtitle="خط نشط"
          />
          <StatCard
            title="تحصيل الشهر"
            value={formatCurrency(stats.totalMonthlyCollection)}
            icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
            iconBg="bg-emerald-50"
            trend="+12%"
            trendUp
          />
          <StatCard
            title="اشتراك النقابة مدفوع"
            value={stats.unionPaidThisMonth}
            icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}
            iconBg="bg-green-50"
            subtitle="عضو دفع هذا الشهر"
          />
          <StatCard
            title="اشتراك النقابة غير مدفوع"
            value={stats.unionUnpaidThisMonth}
            icon={<XCircle className="w-5 h-5 text-red-600" />}
            iconBg="bg-red-50"
            subtitle="عضو لم يدفع بعد"
          />
          <StatCard
            title="تحصيل الاتصالات"
            value={formatCurrency(stats.telecomCollectedThisMonth)}
            icon={<TrendingUp className="w-5 h-5 text-cyan-600" />}
            iconBg="bg-cyan-50"
            subtitle="هذا الشهر"
          />
          <StatCard
            title="إجمالي المتأخرات"
            value={formatCurrency(stats.totalOutstanding)}
            icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
            iconBg="bg-amber-50"
            subtitle="مستحق التحصيل"
          />
        </div>
      ) : null}

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Monthly Collections */}
        <div className="chart-container lg:col-span-2">
          <h3 className="font-semibold text-gray-800 mb-4">التحصيل خلال آخر 6 أشهر</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyData} margin={{ top: 5, right: 5, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: 'Cairo' }} />
              <YAxis tick={{ fontSize: 11, fontFamily: 'Cairo' }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={(v) => v === 'union' ? 'النقابة' : v === 'telecom' ? 'الاتصالات' : v} wrapperStyle={{ fontFamily: 'Cairo', fontSize: 12 }} />
              <Bar dataKey="union" name="union" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="telecom" name="telecom" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Paid vs Unpaid Pie */}
        <div className="chart-container">
          <h3 className="font-semibold text-gray-800 mb-4">مدفوع مقابل غير مدفوع</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={paidVsUnpaid}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                nameKey="name"
              >
                {paidVsUnpaid.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v, n) => [v, n]} contentStyle={{ fontFamily: 'Cairo', borderRadius: 12 }} />
              <Legend formatter={(v) => v} wrapperStyle={{ fontFamily: 'Cairo', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Payment Methods */}
        <div className="chart-container">
          <h3 className="font-semibold text-gray-800 mb-4">طرق الدفع</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={methodData} layout="vertical" margin={{ right: 10, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 11, fontFamily: 'Cairo' }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
              <YAxis type="category" dataKey="method" tick={{ fontSize: 11, fontFamily: 'Cairo' }} width={100} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" name="المبلغ" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Telecom Distribution */}
        <div className="chart-container">
          <h3 className="font-semibold text-gray-800 mb-4">توزيع خطوط الاتصالات</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={telecomDist} cx="50%" cy="50%" outerRadius={80} dataKey="lines" nameKey="company">
                {telecomDist.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontFamily: 'Cairo', borderRadius: 12 }} />
              <Legend formatter={(v) => v} wrapperStyle={{ fontFamily: 'Cairo', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Branch Collection */}
        <div className="chart-container">
          <h3 className="font-semibold text-gray-800 mb-4">التحصيل حسب الفرع</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={branchData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="branch" tick={{ fontSize: 10, fontFamily: 'Cairo' }} />
              <YAxis tick={{ fontSize: 10, fontFamily: 'Cairo' }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={(v) => v === 'union' ? 'النقابة' : 'الاتصالات'} wrapperStyle={{ fontFamily: 'Cairo', fontSize: 11 }} />
              <Bar dataKey="union" name="union" fill="#8b5cf6" radius={[3, 3, 0, 0]} />
              <Bar dataKey="telecom" name="telecom" fill="#3b82f6" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
