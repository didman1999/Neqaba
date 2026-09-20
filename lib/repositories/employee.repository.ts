// ============================================================
// Employee Repository — Demo Implementation
// Replace with SupabaseEmployeeRepository later
// ============================================================

import type { Employee, EmployeeFilters, PaginatedResult } from '@/types';
import { getEmployees, setEmployees } from '@/lib/demo-data/store';
import { generateId } from '@/lib/utils';

export class EmployeeRepository {
  getAll(): Employee[] {
    return getEmployees();
  }

  getById(id: string): Employee | null {
    return this.getAll().find((e) => e.id === id) ?? null;
  }

  getByEmployeeNumber(num: string): Employee | null {
    return this.getAll().find((e) => e.employeeNumber === num) ?? null;
  }

  search(filters: EmployeeFilters): PaginatedResult<Employee> {
    let data = this.getAll();

    if (filters.search) {
      const q = filters.search.toLowerCase();
      data = data.filter(
        (e) =>
          e.fullName.toLowerCase().includes(q) ||
          e.employeeNumber.toLowerCase().includes(q) ||
          e.nationalId.includes(q) ||
          e.email?.toLowerCase().includes(q) ||
          e.mobileNumber?.includes(q)
      );
    }
    if (filters.branchId && filters.branchId !== 'all') {
      data = data.filter((e) => e.branchId === filters.branchId);
    }
    if (filters.departmentId && filters.departmentId !== 'all') {
      data = data.filter((e) => e.departmentId === filters.departmentId);
    }
    if (filters.status && filters.status !== 'all') {
      data = data.filter((e) => e.status === filters.status);
    }
    if (filters.isUnionMember !== undefined) {
      data = data.filter((e) => e.isUnionMember === filters.isUnionMember);
    }

    const total = data.length;
    const page = filters.page ?? 1;
    const pageSize = filters.pageSize ?? 20;
    const totalPages = Math.ceil(total / pageSize);
    const paginated = data.slice((page - 1) * pageSize, page * pageSize);

    return { data: paginated, total, page, pageSize, totalPages };
  }

  create(data: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Employee {
    const employee: Employee = {
      ...data,
      id: generateId('emp'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const all = this.getAll();
    setEmployees([...all, employee]);
    return employee;
  }

  update(id: string, data: Partial<Employee>): Employee | null {
    const all = this.getAll();
    const idx = all.findIndex((e) => e.id === id);
    if (idx === -1) return null;
    const updated: Employee = { ...all[idx], ...data, updatedAt: new Date().toISOString() };
    all[idx] = updated;
    setEmployees(all);
    return updated;
  }

  delete(id: string): boolean {
    const all = this.getAll();
    const filtered = all.filter((e) => e.id !== id);
    if (filtered.length === all.length) return false;
    setEmployees(filtered);
    return true;
  }

  count(): number {
    return this.getAll().length;
  }

  countByBranch(): Record<string, number> {
    const result: Record<string, number> = {};
    this.getAll().forEach((e) => {
      result[e.branchId] = (result[e.branchId] ?? 0) + 1;
    });
    return result;
  }
}

export const employeeRepository = new EmployeeRepository();
