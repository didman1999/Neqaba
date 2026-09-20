'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { ArrowRight, Save, UserPlus } from 'lucide-react';
import { employeeRepository } from '@/lib/repositories/employee.repository';
import { branchRepository, departmentRepository } from '@/lib/repositories/branch.repository';
import { generateId } from '@/lib/utils';
import type { Branch, Department } from '@/types';

const schema = z.object({
  employeeNumber: z.string().min(1, 'رقم الموظف مطلوب'),
  fullName: z.string().min(2, 'الاسم مطلوب (حرفان على الأقل)'),
  nationalId: z.string().min(14, 'الرقم القومي يجب أن يكون 14 رقم').max(14, 'الرقم القومي يجب أن يكون 14 رقم'),
  address: z.string().optional(),
  mobileNumber: z.string().optional(),
  email: z.string().email('البريد الإلكتروني غير صحيح').optional().or(z.literal('')),
  branchId: z.string().min(1, 'الفرع مطلوب'),
  departmentId: z.string().min(1, 'القسم مطلوب'),
  isUnionMember: z.boolean(),
  status: z.enum(['active', 'inactive', 'suspended', 'retired']),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface EmployeeFormProps {
  employeeId?: string; // if provided → edit mode
}

export function EmployeeForm({ employeeId }: EmployeeFormProps) {
  const router = useRouter();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const isEdit = Boolean(employeeId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      status: 'active',
      isUnionMember: false,
    },
  });

  useEffect(() => {
    setBranches(branchRepository.getActive());
    setDepartments(departmentRepository.getActive());

    if (employeeId) {
      const emp = employeeRepository.getById(employeeId);
      if (emp) {
        reset({
          employeeNumber: emp.employeeNumber,
          fullName: emp.fullName,
          nationalId: emp.nationalId,
          address: emp.address ?? '',
          mobileNumber: emp.mobileNumber ?? '',
          email: emp.email ?? '',
          branchId: emp.branchId,
          departmentId: emp.departmentId,
          isUnionMember: emp.isUnionMember,
          status: emp.status,
          notes: emp.notes ?? '',
        });
      }
    }
  }, [employeeId, reset]);

  const onSubmit = async (data: FormData) => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));

    if (isEdit && employeeId) {
      employeeRepository.update(employeeId, {
        ...data,
        email: data.email || undefined,
        address: data.address || undefined,
        mobileNumber: data.mobileNumber || undefined,
        notes: data.notes || undefined,
      });
    } else {
      employeeRepository.create({
        ...data,
        email: data.email || undefined,
        address: data.address || undefined,
        mobileNumber: data.mobileNumber || undefined,
        notes: data.notes || undefined,
      });
    }

    setSaving(false);
    setSuccess(true);
    setTimeout(() => router.push('/employees'), 1000);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/employees" className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
          <ArrowRight className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="section-heading">{isEdit ? 'تعديل بيانات موظف' : 'إضافة موظف جديد'}</h1>
          <p className="section-subheading">أدخل البيانات الأساسية للموظف</p>
        </div>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 font-medium text-sm flex items-center gap-2">
          <span>✅</span> تم الحفظ بنجاح! جاري التحويل...
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Card 1: Basic Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-blue-600" />
            البيانات الأساسية
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                رقم الموظف <span className="text-red-500">*</span>
              </label>
              <input {...register('employeeNumber')} className="form-input" placeholder="EMP001" dir="ltr" />
              {errors.employeeNumber && <p className="text-red-500 text-xs mt-1">{errors.employeeNumber.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                الاسم الكامل <span className="text-red-500">*</span>
              </label>
              <input {...register('fullName')} className="form-input" placeholder="أحمد محمد علي" />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                الرقم القومي <span className="text-red-500">*</span>
              </label>
              <input {...register('nationalId')} className="form-input" placeholder="29801010100001" dir="ltr" maxLength={14} />
              {errors.nationalId && <p className="text-red-500 text-xs mt-1">{errors.nationalId.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">رقم المحمول</label>
              <input {...register('mobileNumber')} className="form-input" placeholder="01001234567" dir="ltr" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">البريد الإلكتروني</label>
              <input {...register('email')} type="email" className="form-input" placeholder="ahmed@example.com" dir="ltr" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">العنوان</label>
              <input {...register('address')} className="form-input" placeholder="القاهرة، حي مدينة نصر" />
            </div>
          </div>
        </div>

        {/* Card 2: Work Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-4 h-4 text-blue-600">🏢</span>
            بيانات العمل
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                الفرع <span className="text-red-500">*</span>
              </label>
              <select {...register('branchId')} className="form-input">
                <option value="">اختر الفرع</option>
                {branches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
              {errors.branchId && <p className="text-red-500 text-xs mt-1">{errors.branchId.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                القسم <span className="text-red-500">*</span>
              </label>
              <select {...register('departmentId')} className="form-input">
                <option value="">اختر القسم</option>
                {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
              {errors.departmentId && <p className="text-red-500 text-xs mt-1">{errors.departmentId.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">حالة الموظف</label>
              <select {...register('status')} className="form-input">
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
                <option value="suspended">موقوف</option>
                <option value="retired">متقاعد</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="isUnionMember"
                {...register('isUnionMember')}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="isUnionMember" className="text-sm font-medium text-gray-700 cursor-pointer">
                عضو في النقابة
              </label>
            </div>
          </div>
        </div>

        {/* Card 3: Notes */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-800 mb-4">ملاحظات</h2>
          <textarea
            {...register('notes')}
            rows={3}
            className="form-input resize-none"
            placeholder="أي ملاحظات إضافية..."
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving || success}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors shadow-sm"
          >
            {saving ? (
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : <Save className="w-4 h-4" />}
            {saving ? 'جارٍ الحفظ...' : isEdit ? 'حفظ التعديلات' : 'إضافة الموظف'}
          </button>
          <Link
            href="/employees"
            className="px-5 py-2.5 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors text-sm"
          >
            إلغاء
          </Link>
        </div>
      </form>
    </div>
  );
}
