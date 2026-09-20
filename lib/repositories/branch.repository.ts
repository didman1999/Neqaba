// ============================================================
// Branch & Department Repositories
// ============================================================

import type { Branch, Department } from '@/types';
import { getBranches, setBranches, getDepartments, setDepartments } from '@/lib/demo-data/store';
import { generateId } from '@/lib/utils';

export class BranchRepository {
  getAll(): Branch[] { return getBranches(); }
  getById(id: string): Branch | null { return this.getAll().find((b) => b.id === id) ?? null; }
  getActive(): Branch[] { return this.getAll().filter((b) => b.isActive); }

  create(data: Omit<Branch, 'id' | 'createdAt'>): Branch {
    const branch: Branch = { ...data, id: generateId('br'), createdAt: new Date().toISOString() };
    setBranches([...this.getAll(), branch]);
    return branch;
  }

  update(id: string, data: Partial<Branch>): Branch | null {
    const all = this.getAll();
    const idx = all.findIndex((b) => b.id === id);
    if (idx === -1) return null;
    all[idx] = { ...all[idx], ...data };
    setBranches(all);
    return all[idx];
  }

  delete(id: string): boolean {
    const filtered = this.getAll().filter((b) => b.id !== id);
    if (filtered.length === this.getAll().length) return false;
    setBranches(filtered);
    return true;
  }
}

export class DepartmentRepository {
  getAll(): Department[] { return getDepartments(); }
  getById(id: string): Department | null { return this.getAll().find((d) => d.id === id) ?? null; }
  getActive(): Department[] { return this.getAll().filter((d) => d.isActive); }

  create(data: Omit<Department, 'id' | 'createdAt'>): Department {
    const dept: Department = { ...data, id: generateId('dep'), createdAt: new Date().toISOString() };
    setDepartments([...this.getAll(), dept]);
    return dept;
  }

  update(id: string, data: Partial<Department>): Department | null {
    const all = this.getAll();
    const idx = all.findIndex((d) => d.id === id);
    if (idx === -1) return null;
    all[idx] = { ...all[idx], ...data };
    setDepartments(all);
    return all[idx];
  }

  delete(id: string): boolean {
    const filtered = this.getAll().filter((d) => d.id !== id);
    if (filtered.length === this.getAll().length) return false;
    setDepartments(filtered);
    return true;
  }
}

export const branchRepository = new BranchRepository();
export const departmentRepository = new DepartmentRepository();
