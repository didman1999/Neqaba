'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Search, Plus, Filter, ChevronRight, ChevronLeft,
  Users, Eye, Pencil, Trash2, Phone, Mail, Building2, Badge,
  UserCheck, UserX, MoreVertical, Download,
} from 'lucide-react';
import { employeeRepository } from '@/lib/repositories/employee.repository';
import { branchRepository, departmentRepository } from '@/lib/repositories/branch.repository';
import { maskNationalId, EMPLOYEE_STATUS_LABELS, cn } from '@/lib/utils';
import type { Employee, Branch, Department, EmployeeFilters } from '@/types';

const STATUS_COLORS: Record<string, string> = {
  active: 'badge-active',
  inactive: 'badge-inactive',
  suspended: 'badge-suspended',
  retired: 'badge-inactive',
};

const PAGE_SIZE = 15;

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<EmployeeFilters>({
    search: '',
    branchId: 'all',
    departmentId: 'all',
    status: 'all',
    page: 1,
    pageSize: PAGE_SIZE,
  });

  const [showFilters, setShowFilters] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const result = employeeRepository.search(filters);
      setEmployees(result.data);
      setTotal(result.total);
      setTotalPages(result.totalPages);
      setLoading(false);
    }, 200);
  }, [filters]);

  useEffect(() => {
    setBranches(branchRepository.getActive());
    setDepartments(departmentRepository.getActive());
  }, []);

  useEffect(() => { load(); }, [load]);

  const getBranchName = (id: string) => branches.find((b) => b.id === id)?.name ?? '—';
  const getDeptName = (id: string) => departments.find((d) => d.id === id)?.name ?? '—';

  const setFilter = (key: keyof EmployeeFilters, value: string | number | boolean) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-heading">الموظفون</h1>
          <p className="section-subheading">إجمالي {total} موظف</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors',
              showFilters
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            )}
          >
            <Filter className="w-4 h-4" />
            فلاتر
          </button>
          <Link
            href="/employees/new"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            إضافة موظف
          </Link>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث بالاسم أو رقم الموظف أو الرقم القومي أو المحمول..."
            value={filters.search ?? ''}
            onChange={(e) => setFilter('search', e.target.value)}
            className="form-input pr-10"
          />
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-gray-100">
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">الفرع</label>
              <select value={filters.branchId} onChange={(e) => setFilter('branchId', e.target.value)} className="form-input text-sm">
                <option value="all">جميع الفروع</option>
                {branches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">القسم</label>
              <select value={filters.departmentId} onChange={(e) => setFilter('departmentId', e.target.value)} className="form-input text-sm">
                <option value="all">جميع الأقسام</option>
                {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">الحالة</label>
              <select value={filters.status} onChange={(e) => setFilter('status', e.target.value)} className="form-input text-sm">
                <option value="all">جميع الحالات</option>
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
                <option value="suspended">موقوف</option>
                <option value="retired">متقاعد</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">عضوية النقابة</label>
              <select
                onChange={(e) => {
                  const v = e.target.value;
                  setFilters((prev) => ({ ...prev, isUnionMember: v === 'all' ? undefined : v === 'true', page: 1 }));
                }}
                className="form-input text-sm"
              >
                <option value="all">الكل</option>
                <option value="true">عضو</option>
                <option value="false">غير عضو</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>رقم الموظف</th>
                <th>الاسم</th>
                <th>الرقم القومي</th>
                <th>الفرع</th>
                <th>القسم</th>
                <th>المحمول</th>
                <th>النقابة</th>
                <th>الحالة</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 9 }).map((__, j) => (
                      <td key={j}><div className="skeleton h-4 w-full max-w-[100px]" /></td>
                    ))}
                  </tr>
                ))
              ) : employees.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-16">
                    <div className="flex flex-col items-center gap-3">
                      <Users className="w-12 h-12 text-gray-200" />
                      <p className="text-gray-400 font-medium">لا يوجد موظفون</p>
                      <Link href="/employees/new" className="text-sm text-blue-600 hover:underline">إضافة موظف جديد</Link>
                    </div>
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>
                      <span className="font-mono text-sm font-semibold text-blue-600">{emp.employeeNumber}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold flex-shrink-0">
                          {emp.fullName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{emp.fullName}</p>
                          {emp.email && <p className="text-xs text-gray-400 truncate max-w-[160px]">{emp.email}</p>}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="font-mono text-sm text-gray-600 dir-ltr" dir="ltr">
                        {maskNationalId(emp.nationalId)}
                      </span>
                    </td>
                    <td>
                      <span className="text-sm text-gray-700">{getBranchName(emp.branchId)}</span>
                    </td>
                    <td>
                      <span className="text-sm text-gray-600">{getDeptName(emp.departmentId)}</span>
                    </td>
                    <td>
                      {emp.mobileNumber ? (
                        <span className="text-sm font-mono text-gray-600" dir="ltr">{emp.mobileNumber}</span>
                      ) : <span className="text-gray-300">—</span>}
                    </td>
                    <td>
                      {emp.isUnionMember ? (
                        <span className="badge badge-active flex items-center gap-1 w-fit">
                          <UserCheck className="w-3 h-3" /> عضو
                        </span>
                      ) : (
                        <span className="badge badge-inactive flex items-center gap-1 w-fit">
                          <UserX className="w-3 h-3" /> غير عضو
                        </span>
                      )}
                    </td>
                    <td>
                      <span className={`badge ${STATUS_COLORS[emp.status] ?? 'badge-inactive'}`}>
                        {EMPLOYEE_STATUS_LABELS[emp.status] ?? emp.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/employees/${emp.id}`}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="عرض الملف"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/employees/${emp.id}/edit`}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                          title="تعديل"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              عرض {((filters.page! - 1) * PAGE_SIZE) + 1} - {Math.min(filters.page! * PAGE_SIZE, total)} من {total}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setFilter('page', Math.max(1, filters.page! - 1))}
                disabled={filters.page === 1}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setFilter('page', page)}
                    className={cn(
                      'w-8 h-8 rounded-lg text-sm font-medium transition-colors',
                      filters.page === page
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    )}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => setFilter('page', Math.min(totalPages, filters.page! + 1))}
                disabled={filters.page === totalPages}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
