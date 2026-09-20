'use client';

import { use } from 'react';
import { EmployeeForm } from '@/components/employees/employee-form';

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditEmployeePage({ params }: Props) {
  const { id } = use(params);
  return <EmployeeForm employeeId={id} />;
}
