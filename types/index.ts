// ============================================================
// Core Application Types
// Union & Telecom Management System — Demo Mode
// ============================================================

// --- User & Auth ---

export type UserRole = 'super_admin' | 'admin' | 'collector';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface AuthSession {
  user: User;
  token: string; // demo token
}

// --- Organization Settings ---

export interface AppSettings {
  organizationName: string;
  unionName: string;
  logoUrl?: string; // base64 or URL
  address?: string;
  phone?: string;
  email?: string;
  currency: string;
  defaultUnionFee: number;
}

// --- Branch & Department ---

export interface Branch {
  id: string;
  name: string;
  code: string;
  city?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  branchId?: string;
  isActive: boolean;
  createdAt: string;
}

// --- Employee ---

export type EmployeeStatus = 'active' | 'inactive' | 'suspended' | 'retired';

export interface Employee {
  id: string;
  employeeNumber: string;
  fullName: string;
  nationalId: string; // stored plain, displayed masked
  address?: string;
  mobileNumber?: string;
  email?: string;
  branchId: string;
  departmentId: string;
  isUnionMember: boolean;
  status: EmployeeStatus;
  notes?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// --- Employee Documents ---

export type DocumentType =
  | 'national_id_front'
  | 'national_id_back'
  | 'employee_photo'
  | 'other';

export interface EmployeeDocument {
  id: string;
  employeeId: string;
  documentType: DocumentType;
  fileName: string;
  fileSize?: number;
  mimeType?: string;
  previewUrl?: string; // base64 for demo
  uploadedAt: string;
  notes?: string;
}

// --- Union Membership ---

export type MembershipStatus = 'active' | 'suspended' | 'cancelled';

export interface UnionMembership {
  id: string;
  employeeId: string;
  membershipNumber: string;
  startDate: string;
  monthlyFee: number;
  status: MembershipStatus;
  createdAt: string;
}

// --- Union Subscription ---

export type PaymentStatus = 'paid' | 'unpaid' | 'partial';
export type PaymentMethod =
  | 'cash'
  | 'payroll_deduction'
  | 'cash_transfer'
  | 'not_collected';

export interface UnionSubscription {
  id: string;
  employeeId: string;
  membershipId: string;
  month: number; // 1–12
  year: number;
  amountDue: number;
  amountPaid: number;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  paymentDate?: string;
  collectorId?: string;
  transactionReference?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// --- Telecom Companies ---

export interface TelecomCompany {
  id: string;
  name: string;
  nameAr: string;
  color: string; // brand color for UI
  isActive: boolean;
  createdAt: string;
}

// --- Telecom Plans ---

export type PlanType = 'prepaid' | 'postpaid' | 'business';
export type PlanStatus = 'active' | 'discontinued';

export interface TelecomPlan {
  id: string;
  telecomCompanyId: string;
  planName: string;
  planType: PlanType;
  monthlyCost: number;
  status: PlanStatus;
  description?: string;
  createdAt: string;
}

// --- Mobile Lines ---

export type LineType = 'personal' | 'work' | 'data';
export type LineStatus = 'active' | 'suspended' | 'cancelled';

export interface MobileLine {
  id: string;
  employeeId: string;
  mobileNumber: string;
  telecomCompanyId: string;
  planId?: string;
  lineType: LineType;
  monthlyCost: number;
  activationDate: string;
  status: LineStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// --- Mobile Add-ons ---

export type AddonType = 'data' | 'minutes' | 'sms' | 'international' | 'other';
export type AddonStatus = 'active' | 'expired' | 'cancelled';

export interface MobileAddon {
  id: string;
  mobileLineId: string;
  addonName: string;
  addonType: AddonType;
  cost: number;
  startDate: string;
  endDate?: string;
  status: AddonStatus;
  createdAt: string;
}

// --- Telecom Payments ---

export interface TelecomPayment {
  id: string;
  employeeId: string;
  mobileLineId: string;
  month: number;
  year: number;
  basePlanCost: number;
  addonsCost: number;
  totalAmount: number;
  paidAmount: number;
  outstandingAmount: number;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  paymentDate?: string;
  collectorId?: string;
  transactionReference?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// --- Activity Log ---

export type ActivityModule =
  | 'auth'
  | 'employee'
  | 'union'
  | 'telecom'
  | 'payment'
  | 'settings'
  | 'user';

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  module: ActivityModule;
  recordId?: string;
  recordLabel?: string;
  details?: string;
  createdAt: string;
}

// --- Dashboard Stats ---

export interface DashboardStats {
  totalEmployees: number;
  unionMembers: number;
  totalMobileLines: number;
  unionPaidThisMonth: number;
  unionUnpaidThisMonth: number;
  telecomCollectedThisMonth: number;
  totalOutstanding: number;
  totalMonthlyCollection: number;
}

export interface MonthlyCollectionData {
  month: string;
  union: number;
  telecom: number;
  total: number;
}

export interface PaymentMethodData {
  method: string;
  amount: number;
  count: number;
}

export interface TelecomDistribution {
  company: string;
  lines: number;
  color: string;
}

export interface BranchCollection {
  branch: string;
  union: number;
  telecom: number;
}

// --- Pagination ---

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// --- Filters ---

export interface EmployeeFilters {
  search?: string;
  branchId?: string;
  departmentId?: string;
  status?: EmployeeStatus | 'all';
  isUnionMember?: boolean;
  page?: number;
  pageSize?: number;
}

export interface PaymentFilters {
  month?: number;
  year?: number;
  branchId?: string;
  departmentId?: string;
  employeeId?: string;
  employeeNumber?: string;
  paymentStatus?: PaymentStatus | 'all';
  paymentMethod?: PaymentMethod | 'all';
  telecomCompanyId?: string;
  collectorId?: string;
  page?: number;
  pageSize?: number;
}
