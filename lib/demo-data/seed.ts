// ============================================================
// Demo Seed Data — Realistic Arabic fictional data
// Union & Telecom Management System
// ============================================================

import type {
  Branch,
  Department,
  Employee,
  TelecomCompany,
  TelecomPlan,
  MobileLine,
  MobileAddon,
  UnionMembership,
  UnionSubscription,
  TelecomPayment,
  User,
  AppSettings,
  ActivityLog,
  PaymentStatus,
  PaymentMethod,
} from '@/types';

// Helper
const uid = (prefix: string, n: number | string) => `${prefix}_${n}`;
const now = () => new Date().toISOString();
const dateStr = (y: number, m: number, d: number) =>
  new Date(y, m - 1, d).toISOString().split('T')[0];

// ---- App Settings ----
export const seedSettings: AppSettings = {
  organizationName: 'اللجنة الادارية النقابية للعاملين بالهيئة',
  unionName: 'اللجنة الادارية النقابية للعاملين بالهيئة',
  logoUrl: '/logo.png',
  address: 'القاهرة، مصر',
  phone: '0225001234',
  email: 'info@ccba-demo.com',
  currency: 'ج.م',
  defaultUnionFee: 50,
};

// ---- Users ----
export const seedUsers: User[] = [
  {
    id: 'user_1',
    email: 'admin@demo.com',
    name: 'أحمد محمد السيد',
    role: 'super_admin',
    isActive: true,
    createdAt: dateStr(2024, 1, 1),
    lastLogin: new Date().toISOString(),
  },
  {
    id: 'user_2',
    email: 'manager@demo.com',
    name: 'محمد عبدالله حسن',
    role: 'admin',
    isActive: true,
    createdAt: dateStr(2024, 1, 5),
    lastLogin: new Date().toISOString(),
  },
  {
    id: 'user_3',
    email: 'collector@demo.com',
    name: 'سارة أحمد إبراهيم',
    role: 'collector',
    isActive: true,
    createdAt: dateStr(2024, 2, 1),
    lastLogin: new Date().toISOString(),
  },
];

// ---- Branches ----
export const seedBranches: Branch[] = [
  { id: 'br_1', name: 'فرع القاهرة', code: 'CAI', city: 'القاهرة', isActive: true, createdAt: dateStr(2024, 1, 1) },
  { id: 'br_2', name: 'فرع الإسكندرية', code: 'ALX', city: 'الإسكندرية', isActive: true, createdAt: dateStr(2024, 1, 1) },
  { id: 'br_3', name: 'فرع الجيزة', code: 'GIZ', city: 'الجيزة', isActive: true, createdAt: dateStr(2024, 1, 1) },
  { id: 'br_4', name: 'فرع الدقهلية', code: 'DAK', city: 'الدقهلية', isActive: true, createdAt: dateStr(2024, 1, 1) },
];

// ---- Departments ----
export const seedDepartments: Department[] = [
  { id: 'dep_1', name: 'الموارد البشرية', code: 'HR', isActive: true, createdAt: dateStr(2024, 1, 1) },
  { id: 'dep_2', name: 'الشؤون المالية', code: 'FIN', isActive: true, createdAt: dateStr(2024, 1, 1) },
  { id: 'dep_3', name: 'تقنية المعلومات', code: 'IT', isActive: true, createdAt: dateStr(2024, 1, 1) },
  { id: 'dep_4', name: 'الإدارة العامة', code: 'ADM', isActive: true, createdAt: dateStr(2024, 1, 1) },
  { id: 'dep_5', name: 'المبيعات والتسويق', code: 'MKT', isActive: true, createdAt: dateStr(2024, 1, 1) },
  { id: 'dep_6', name: 'خدمة العملاء', code: 'CS', isActive: true, createdAt: dateStr(2024, 1, 1) },
  { id: 'dep_7', name: 'اللوجستيات', code: 'LOG', isActive: true, createdAt: dateStr(2024, 1, 1) },
  { id: 'dep_8', name: 'الشؤون القانونية', code: 'LEG', isActive: true, createdAt: dateStr(2024, 1, 1) },
];

// ---- Telecom Companies ----
export const seedTelecomCompanies: TelecomCompany[] = [
  { id: 'tc_1', name: 'Vodafone', nameAr: 'فودافون', color: '#E60000', isActive: true, createdAt: dateStr(2024, 1, 1) },
  { id: 'tc_2', name: 'Orange', nameAr: 'أورانج', color: '#FF6600', isActive: true, createdAt: dateStr(2024, 1, 1) },
  { id: 'tc_3', name: 'Etisalat', nameAr: 'اتصالات', color: '#006633', isActive: true, createdAt: dateStr(2024, 1, 1) },
];

// ---- Telecom Plans ----
export const seedTelecomPlans: TelecomPlan[] = [
  // Vodafone
  { id: 'plan_1', telecomCompanyId: 'tc_1', planName: 'فودافون ريد 150', planType: 'postpaid', monthlyCost: 150, status: 'active', createdAt: dateStr(2024, 1, 1) },
  { id: 'plan_2', telecomCompanyId: 'tc_1', planName: 'فودافون ريد 250', planType: 'postpaid', monthlyCost: 250, status: 'active', createdAt: dateStr(2024, 1, 1) },
  { id: 'plan_3', telecomCompanyId: 'tc_1', planName: 'فودافون بيزنس 500', planType: 'business', monthlyCost: 500, status: 'active', createdAt: dateStr(2024, 1, 1) },
  // Orange
  { id: 'plan_4', telecomCompanyId: 'tc_2', planName: 'أورانج برو 200', planType: 'postpaid', monthlyCost: 200, status: 'active', createdAt: dateStr(2024, 1, 1) },
  { id: 'plan_5', telecomCompanyId: 'tc_2', planName: 'أورانج ليت 100', planType: 'postpaid', monthlyCost: 100, status: 'active', createdAt: dateStr(2024, 1, 1) },
  { id: 'plan_6', telecomCompanyId: 'tc_2', planName: 'أورانج بيزنس 400', planType: 'business', monthlyCost: 400, status: 'active', createdAt: dateStr(2024, 1, 1) },
  // Etisalat
  { id: 'plan_7', telecomCompanyId: 'tc_3', planName: 'اتصالات فلكس 180', planType: 'postpaid', monthlyCost: 180, status: 'active', createdAt: dateStr(2024, 1, 1) },
  { id: 'plan_8', telecomCompanyId: 'tc_3', planName: 'اتصالات سمارت 300', planType: 'postpaid', monthlyCost: 300, status: 'active', createdAt: dateStr(2024, 1, 1) },
  { id: 'plan_9', telecomCompanyId: 'tc_3', planName: 'اتصالات بيزنس 600', planType: 'business', monthlyCost: 600, status: 'active', createdAt: dateStr(2024, 1, 1) },
];

// ---- Employees ----
const employeeRawData = [
  ['EMP001', 'أحمد محمود علي', '29801010100001', 'القاهرة، حي مدينة نصر', '01001234501', 'ahmed.mahmoud@corp.com', 'br_1', 'dep_1', true, 'active'],
  ['EMP002', 'محمد سامي حسين', '29705150200002', 'الجيزة، حي الدقي', '01101234502', 'mo.sami@corp.com', 'br_3', 'dep_2', true, 'active'],
  ['EMP003', 'فاطمة إبراهيم عمر', '29902240300003', 'القاهرة، حي العباسية', '01201234503', 'fatma.ibrahim@corp.com', 'br_1', 'dep_3', true, 'active'],
  ['EMP004', 'علي عبدالرحمن خالد', '29803120400004', 'الإسكندرية، حي سيدي بشر', '01001234504', 'ali.abdo@corp.com', 'br_2', 'dep_4', false, 'active'],
  ['EMP005', 'نورا يوسف محمد', '30001200500005', 'الدقهلية، مركز المنصورة', '01101234505', 'nora.youssef@corp.com', 'br_4', 'dep_5', true, 'active'],
  ['EMP006', 'خالد أحمد مصطفى', '29706040600006', 'القاهرة، حي المعادي', '01201234506', 'khaled.a@corp.com', 'br_1', 'dep_6', true, 'active'],
  ['EMP007', 'مريم سالم العتيق', '29911180700007', 'الجيزة، حي الهرم', '01001234507', 'mariam.salem@corp.com', 'br_3', 'dep_7', false, 'active'],
  ['EMP008', 'طارق حسن رضا', '29808220800008', 'الإسكندرية، حي العجمي', '01101234508', 'tarek.hassan@corp.com', 'br_2', 'dep_8', true, 'active'],
  ['EMP009', 'هبة ماهر صالح', '30102300900009', 'القاهرة، حي الزيتون', '01201234509', 'heba.maher@corp.com', 'br_1', 'dep_1', true, 'active'],
  ['EMP010', 'عمر سعيد جابر', '29804161000010', 'الدقهلية، مركز طلخا', '01001234510', 'omar.saeed@corp.com', 'br_4', 'dep_2', true, 'active'],
  ['EMP011', 'ريم محمد الشافعي', '29910251100011', 'القاهرة، حي شبرا', '01101234511', 'reem.m@corp.com', 'br_1', 'dep_3', true, 'active'],
  ['EMP012', 'وليد فاروق النجار', '29706081200012', 'الجيزة، حي إمبابة', '01201234512', 'walid.f@corp.com', 'br_3', 'dep_4', false, 'active'],
  ['EMP013', 'آية محمود كمال', '30003151300013', 'الإسكندرية، حي الرمل', '01001234513', 'aya.m@corp.com', 'br_2', 'dep_5', true, 'active'],
  ['EMP014', 'يوسف طه أبو زيد', '29805241400014', 'القاهرة، حي التجمع', '01101234514', 'youssef.t@corp.com', 'br_1', 'dep_6', true, 'active'],
  ['EMP015', 'سهام رجب محمود', '29912091500015', 'الدقهلية، مركز ميت غمر', '01201234515', 'siham.r@corp.com', 'br_4', 'dep_7', false, 'active'],
  ['EMP016', 'حسام الدين عاطف', '29707121600016', 'القاهرة، حي عين شمس', '01001234516', 'hossam.a@corp.com', 'br_1', 'dep_8', true, 'active'],
  ['EMP017', 'منى سعيد العسال', '30104201700017', 'الجيزة، حي الشيخ زايد', '01101234517', 'mona.s@corp.com', 'br_3', 'dep_1', true, 'active'],
  ['EMP018', 'إبراهيم جمال الدين', '29807031800018', 'الإسكندرية، حي كفر الدوار', '01201234518', 'ibrahim.j@corp.com', 'br_2', 'dep_2', true, 'active'],
  ['EMP019', 'دينا محمد فريد', '29906171900019', 'القاهرة، حي حلوان', '01001234519', 'dina.m@corp.com', 'br_1', 'dep_3', false, 'active'],
  ['EMP020', 'أسامة عبدالحكيم', '29806052000020', 'الدقهلية، مركز أجا', '01101234520', 'osama.a@corp.com', 'br_4', 'dep_4', true, 'active'],
  ['EMP021', 'نادية كمال فوزي', '29711282100021', 'القاهرة، حي دار السلام', '01201234521', 'nadia.k@corp.com', 'br_1', 'dep_5', true, 'active'],
  ['EMP022', 'رامي أيمن ثابت', '30002132200022', 'الجيزة، حي أكتوبر', '01001234522', 'rami.a@corp.com', 'br_3', 'dep_6', true, 'active'],
  ['EMP023', 'شيماء حاتم الأزهري', '29908082300023', 'الإسكندرية، حي محرم بك', '01101234523', 'shimaa.h@corp.com', 'br_2', 'dep_7', false, 'active'],
  ['EMP024', 'بسام مختار عوض', '29803192400024', 'القاهرة، حي مصر القديمة', '01201234524', 'bassam.m@corp.com', 'br_1', 'dep_8', true, 'active'],
  ['EMP025', 'ولاء صلاح الدين', '30105262500025', 'الدقهلية، مركز بلقاس', '01001234525', 'wafaa.s@corp.com', 'br_4', 'dep_1', true, 'active'],
  ['EMP026', 'تامر عاصم البدوي', '29712102600026', 'القاهرة، حي المقطم', '01101234526', 'tamer.a@corp.com', 'br_1', 'dep_2', true, 'active'],
  ['EMP027', 'أميرة ناجي قاسم', '30003272700027', 'الجيزة، حي الوراق', '01201234527', 'amira.n@corp.com', 'br_3', 'dep_3', false, 'active'],
  ['EMP028', 'مصطفى جاد الحق', '29807062800028', 'الإسكندرية، حي ميامي', '01001234528', 'mostafa.j@corp.com', 'br_2', 'dep_4', true, 'active'],
  ['EMP029', 'منال علاء الدين', '29910242900029', 'القاهرة، حي فيصل', '01101234529', 'manal.a@corp.com', 'br_1', 'dep_5', true, 'inactive'],
  ['EMP030', 'صلاح حمدي سلامة', '29805303000030', 'الدقهلية، مركز شربين', '01201234530', 'salah.h@corp.com', 'br_4', 'dep_6', true, 'active'],
  ['EMP031', 'كريم عبدالعزيز لطفي', '29713013100031', 'القاهرة، حي الزمالك', '01001234531', 'karim.a@corp.com', 'br_1', 'dep_7', true, 'active'],
  ['EMP032', 'غادة محسن نور', '30006153200032', 'الجيزة، حي المنيل', '01101234532', 'ghada.m@corp.com', 'br_3', 'dep_8', false, 'active'],
  ['EMP033', 'زياد يحيى عيسى', '29811203300033', 'الإسكندرية، حي العامرية', '01201234533', 'ziad.y@corp.com', 'br_2', 'dep_1', true, 'active'],
  ['EMP034', 'لمياء حسين درويش', '29903083400034', 'القاهرة، حي الساحل', '01001234534', 'lamia.h@corp.com', 'br_1', 'dep_2', true, 'active'],
  ['EMP035', 'عادل رمضان حلمي', '29806283500035', 'الدقهلية، مركز السنبلاوين', '01101234535', 'adel.r@corp.com', 'br_4', 'dep_3', false, 'active'],
  ['EMP036', 'ياسمين عصام بدر', '30107053600036', 'القاهرة، حي النزهة', '01201234536', 'yasmin.e@corp.com', 'br_1', 'dep_4', true, 'active'],
  ['EMP037', 'شريف حمزة العقاد', '29714093700037', 'الجيزة، حي العجوزة', '01001234537', 'sherif.h@corp.com', 'br_3', 'dep_5', true, 'active'],
  ['EMP038', 'سمر عبدالله نصار', '30004213800038', 'الإسكندرية، حي الدخيلة', '01101234538', 'samar.a@corp.com', 'br_2', 'dep_6', true, 'active'],
  ['EMP039', 'محمود سلامة غانم', '29812113900039', 'القاهرة، حي بولاق', '01201234539', 'mahmoud.s@corp.com', 'br_1', 'dep_7', false, 'suspended'],
  ['EMP040', 'إيمان نبيل زهران', '30001024000040', 'الدقهلية، مركز المنزلة', '01001234540', 'eman.n@corp.com', 'br_4', 'dep_8', true, 'active'],
];

export const seedEmployees: Employee[] = employeeRawData.map((row) => ({
  id: uid('emp', row[0] as string),
  employeeNumber: row[0] as string,
  fullName: row[1] as string,
  nationalId: row[2] as string,
  address: row[3] as string,
  mobileNumber: row[4] as string,
  email: row[5] as string,
  branchId: row[6] as string,
  departmentId: row[7] as string,
  isUnionMember: row[8] as boolean,
  status: row[9] as Employee['status'],
  createdAt: dateStr(2024, 1, 15),
  updatedAt: dateStr(2024, 1, 15),
}));

// ---- Union Memberships ----
// Only employees with isUnionMember = true get memberships
const unionEmployeeIds = seedEmployees.filter((e) => e.isUnionMember).map((e) => e.id);

export const seedUnionMemberships: UnionMembership[] = unionEmployeeIds.map((empId, i) => ({
  id: uid('um', i + 1),
  employeeId: empId,
  membershipNumber: `MEM${String(i + 1).padStart(4, '0')}`,
  startDate: dateStr(2024, 1, 1),
  monthlyFee: 50,
  status: 'active',
  createdAt: dateStr(2024, 1, 1),
}));

// ---- Union Subscriptions — 6 months of data ----
// Current demo: March 2026 is "current month"
const DEMO_CURRENT_YEAR = 2026;
const DEMO_CURRENT_MONTH = 9; // September

export const seedUnionSubscriptions: UnionSubscription[] = [];

seedUnionMemberships.forEach((membership) => {
  for (let m = 4; m <= DEMO_CURRENT_MONTH; m++) {
    const randomChoice = Math.random();
    let status: PaymentStatus;
    let paidAmount: number;
    let paymentMethod: PaymentMethod;
    let paymentDate: string | undefined;
    let collectorId: string | undefined;

    if (m < DEMO_CURRENT_MONTH - 1) {
      // Older months: mostly paid
      if (randomChoice < 0.75) {
        status = 'paid'; paidAmount = 50;
        paymentMethod = randomChoice < 0.4 ? 'cash' : randomChoice < 0.7 ? 'payroll_deduction' : 'cash_transfer';
        paymentDate = dateStr(DEMO_CURRENT_YEAR, m, Math.floor(Math.random() * 20) + 1);
        collectorId = 'user_3';
      } else if (randomChoice < 0.9) {
        status = 'partial'; paidAmount = 25;
        paymentMethod = 'cash';
        paymentDate = dateStr(DEMO_CURRENT_YEAR, m, Math.floor(Math.random() * 20) + 1);
        collectorId = 'user_3';
      } else {
        status = 'unpaid'; paidAmount = 0;
        paymentMethod = 'not_collected';
      }
    } else {
      // Recent months: more unpaid
      if (randomChoice < 0.5) {
        status = 'paid'; paidAmount = 50;
        paymentMethod = randomChoice < 0.3 ? 'cash' : randomChoice < 0.6 ? 'payroll_deduction' : 'cash_transfer';
        paymentDate = dateStr(DEMO_CURRENT_YEAR, m, Math.floor(Math.random() * 10) + 1);
        collectorId = 'user_3';
      } else if (randomChoice < 0.65) {
        status = 'partial'; paidAmount = 25;
        paymentMethod = 'cash';
        paymentDate = dateStr(DEMO_CURRENT_YEAR, m, Math.floor(Math.random() * 10) + 1);
        collectorId = 'user_3';
      } else {
        status = 'unpaid'; paidAmount = 0;
        paymentMethod = 'not_collected';
      }
    }

    const subId = `us_${membership.id}_${DEMO_CURRENT_YEAR}_${m}`;
    seedUnionSubscriptions.push({
      id: subId,
      employeeId: membership.employeeId,
      membershipId: membership.id,
      month: m,
      year: DEMO_CURRENT_YEAR,
      amountDue: 50,
      amountPaid: paidAmount,
      status,
      paymentMethod,
      paymentDate,
      collectorId,
      createdAt: dateStr(DEMO_CURRENT_YEAR, m, 1),
      updatedAt: dateStr(DEMO_CURRENT_YEAR, m, 1),
    });
  }
});

// ---- Mobile Lines ----
const mobileLineData = [
  ['01001234501', 'tc_1', 'plan_1', 'work', 150, 'br_1', 'EMP001'],
  ['01001234502', 'tc_2', 'plan_4', 'work', 200, 'br_3', 'EMP002'],
  ['01001234503', 'tc_3', 'plan_7', 'personal', 180, 'br_1', 'EMP003'],
  ['01001234504', 'tc_1', 'plan_2', 'work', 250, 'br_2', 'EMP004'],
  ['01001234505', 'tc_2', 'plan_5', 'personal', 100, 'br_4', 'EMP005'],
  ['01001234506', 'tc_3', 'plan_8', 'work', 300, 'br_1', 'EMP006'],
  ['01001234507', 'tc_1', 'plan_3', 'business', 500, 'br_3', 'EMP007'],
  ['01001234508', 'tc_2', 'plan_6', 'business', 400, 'br_2', 'EMP008'],
  ['01001234509', 'tc_3', 'plan_9', 'business', 600, 'br_1', 'EMP009'],
  ['01001234510', 'tc_1', 'plan_1', 'personal', 150, 'br_4', 'EMP010'],
  ['01001234511', 'tc_2', 'plan_4', 'work', 200, 'br_1', 'EMP011'],
  ['01001234512', 'tc_3', 'plan_7', 'work', 180, 'br_3', 'EMP012'],
  ['01001234513', 'tc_1', 'plan_2', 'personal', 250, 'br_2', 'EMP013'],
  ['01001234514', 'tc_2', 'plan_5', 'work', 100, 'br_1', 'EMP014'],
  ['01001234515', 'tc_3', 'plan_8', 'work', 300, 'br_4', 'EMP015'],
  ['01001234516', 'tc_1', 'plan_1', 'work', 150, 'br_1', 'EMP016'],
  ['01001234517', 'tc_2', 'plan_4', 'personal', 200, 'br_3', 'EMP017'],
  ['01001234518', 'tc_3', 'plan_7', 'work', 180, 'br_2', 'EMP018'],
  ['01001234519', 'tc_1', 'plan_3', 'business', 500, 'br_1', 'EMP019'],
  ['01001234520', 'tc_2', 'plan_6', 'business', 400, 'br_4', 'EMP020'],
  ['01001234521', 'tc_1', 'plan_2', 'work', 250, 'br_1', 'EMP021'],
  ['01001234522', 'tc_3', 'plan_9', 'business', 600, 'br_3', 'EMP022'],
  ['01001234523', 'tc_2', 'plan_4', 'work', 200, 'br_2', 'EMP023'],
  ['01001234524', 'tc_1', 'plan_1', 'personal', 150, 'br_1', 'EMP024'],
  ['01001234525', 'tc_3', 'plan_8', 'work', 300, 'br_4', 'EMP025'],
  ['01001234526', 'tc_2', 'plan_5', 'work', 100, 'br_1', 'EMP026'],
  ['01001234527', 'tc_1', 'plan_2', 'work', 250, 'br_3', 'EMP027'],
  ['01001234528', 'tc_3', 'plan_7', 'personal', 180, 'br_2', 'EMP028'],
  ['01001234529', 'tc_2', 'plan_4', 'work', 200, 'br_1', 'EMP029'],
  ['01001234530', 'tc_1', 'plan_1', 'work', 150, 'br_4', 'EMP030'],
  ['01001234531', 'tc_3', 'plan_8', 'work', 300, 'br_1', 'EMP031'],
  ['01001234532', 'tc_2', 'plan_6', 'business', 400, 'br_3', 'EMP032'],
  ['01001234533', 'tc_1', 'plan_3', 'business', 500, 'br_2', 'EMP033'],
  ['01001234534', 'tc_3', 'plan_9', 'business', 600, 'br_1', 'EMP034'],
  ['01001234535', 'tc_2', 'plan_5', 'personal', 100, 'br_4', 'EMP035'],
  ['01001234536', 'tc_1', 'plan_2', 'work', 250, 'br_1', 'EMP036'],
  ['01001234537', 'tc_3', 'plan_7', 'work', 180, 'br_3', 'EMP037'],
  ['01001234538', 'tc_2', 'plan_4', 'work', 200, 'br_2', 'EMP038'],
  ['01001234539', 'tc_1', 'plan_1', 'personal', 150, 'br_1', 'EMP039'],
  ['01001234540', 'tc_3', 'plan_8', 'work', 300, 'br_4', 'EMP040'],
  // Extra lines (some employees have 2 lines)
  ['01501234501', 'tc_2', 'plan_4', 'personal', 200, 'br_1', 'EMP001'],
  ['01501234503', 'tc_1', 'plan_1', 'work', 150, 'br_1', 'EMP003'],
  ['01501234006', 'tc_3', 'plan_7', 'personal', 180, 'br_1', 'EMP006'],
  ['01501234009', 'tc_2', 'plan_5', 'personal', 100, 'br_1', 'EMP009'],
  ['01501234011', 'tc_3', 'plan_8', 'personal', 300, 'br_1', 'EMP011'],
  ['01501234016', 'tc_2', 'plan_4', 'personal', 200, 'br_1', 'EMP016'],
  ['01501234021', 'tc_3', 'plan_7', 'data', 180, 'br_1', 'EMP021'],
  ['01501234024', 'tc_1', 'plan_2', 'data', 250, 'br_1', 'EMP024'],
  ['01501234031', 'tc_2', 'plan_4', 'data', 200, 'br_1', 'EMP031'],
  ['01501234033', 'tc_3', 'plan_8', 'data', 300, 'br_2', 'EMP033'],
];

export const seedMobileLines: MobileLine[] = mobileLineData.map((row, i) => ({
  id: uid('ml', i + 1),
  employeeId: `emp_${row[6]}`,
  mobileNumber: row[0] as string,
  telecomCompanyId: row[1] as string,
  planId: row[2] as string,
  lineType: row[3] as MobileLine['lineType'],
  monthlyCost: row[4] as number,
  activationDate: dateStr(2024, 1, 1),
  status: 'active',
  createdAt: dateStr(2024, 1, 1),
  updatedAt: dateStr(2024, 1, 1),
}));

// ---- Mobile Addons ----
export const seedMobileAddons: MobileAddon[] = [
  { id: 'addon_1', mobileLineId: 'ml_1', addonName: 'باكج إنترنت 10 جيجا', addonType: 'data', cost: 30, startDate: dateStr(2026, 4, 1), status: 'active', createdAt: dateStr(2026, 4, 1) },
  { id: 'addon_2', mobileLineId: 'ml_3', addonName: 'دقائق دولي 200', addonType: 'international', cost: 50, startDate: dateStr(2026, 4, 1), status: 'active', createdAt: dateStr(2026, 4, 1) },
  { id: 'addon_3', mobileLineId: 'ml_6', addonName: 'باكج رسائل 500', addonType: 'sms', cost: 15, startDate: dateStr(2026, 4, 1), status: 'active', createdAt: dateStr(2026, 4, 1) },
  { id: 'addon_4', mobileLineId: 'ml_9', addonName: 'باكج إنترنت 20 جيجا', addonType: 'data', cost: 60, startDate: dateStr(2026, 4, 1), status: 'active', createdAt: dateStr(2026, 4, 1) },
  { id: 'addon_5', mobileLineId: 'ml_12', addonName: 'دقائق شبكات أخرى', addonType: 'minutes', cost: 25, startDate: dateStr(2026, 4, 1), status: 'active', createdAt: dateStr(2026, 4, 1) },
];

// ---- Telecom Payments — 6 months ----
export const seedTelecomPayments: TelecomPayment[] = [];

seedMobileLines.forEach((line, lineIdx) => {
  for (let m = 4; m <= DEMO_CURRENT_MONTH; m++) {
    const randomChoice = Math.random();
    const addons = seedMobileAddons.filter((a) => a.mobileLineId === line.id);
    const addonsCost = addons.reduce((sum, a) => sum + a.cost, 0);
    const totalAmount = line.monthlyCost + addonsCost;

    let status: PaymentStatus;
    let paidAmount: number;
    let paymentMethod: PaymentMethod;
    let paymentDate: string | undefined;
    let collectorId: string | undefined;

    if (m < DEMO_CURRENT_MONTH - 1) {
      if (randomChoice < 0.70) {
        status = 'paid'; paidAmount = totalAmount;
        paymentMethod = randomChoice < 0.35 ? 'cash' : randomChoice < 0.65 ? 'payroll_deduction' : 'cash_transfer';
        paymentDate = dateStr(DEMO_CURRENT_YEAR, m, Math.floor(Math.random() * 20) + 1);
        collectorId = 'user_3';
      } else if (randomChoice < 0.85) {
        status = 'partial'; paidAmount = Math.round(totalAmount * 0.5);
        paymentMethod = 'cash';
        paymentDate = dateStr(DEMO_CURRENT_YEAR, m, Math.floor(Math.random() * 20) + 1);
        collectorId = 'user_3';
      } else {
        status = 'unpaid'; paidAmount = 0; paymentMethod = 'not_collected';
      }
    } else {
      if (randomChoice < 0.45) {
        status = 'paid'; paidAmount = totalAmount;
        paymentMethod = randomChoice < 0.3 ? 'cash' : randomChoice < 0.6 ? 'payroll_deduction' : 'cash_transfer';
        paymentDate = dateStr(DEMO_CURRENT_YEAR, m, Math.floor(Math.random() * 10) + 1);
        collectorId = 'user_3';
      } else if (randomChoice < 0.6) {
        status = 'partial'; paidAmount = Math.round(totalAmount * 0.5);
        paymentMethod = 'cash';
        paymentDate = dateStr(DEMO_CURRENT_YEAR, m, Math.floor(Math.random() * 10) + 1);
        collectorId = 'user_3';
      } else {
        status = 'unpaid'; paidAmount = 0; paymentMethod = 'not_collected';
      }
    }

    seedTelecomPayments.push({
      id: `tp_${line.id}_${DEMO_CURRENT_YEAR}_${m}`,
      employeeId: line.employeeId,
      mobileLineId: line.id,
      month: m,
      year: DEMO_CURRENT_YEAR,
      basePlanCost: line.monthlyCost,
      addonsCost,
      totalAmount,
      paidAmount,
      outstandingAmount: totalAmount - paidAmount,
      paymentStatus: status,
      paymentMethod,
      paymentDate,
      collectorId,
      createdAt: dateStr(DEMO_CURRENT_YEAR, m, 1),
      updatedAt: dateStr(DEMO_CURRENT_YEAR, m, 1),
    });
  }
});

// ---- Activity Logs ----
export const seedActivityLogs: ActivityLog[] = [
  { id: 'log_1', userId: 'user_1', userName: 'أحمد محمد السيد', action: 'تسجيل الدخول', module: 'auth', createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: 'log_2', userId: 'user_3', userName: 'سارة أحمد إبراهيم', action: 'تسجيل دفعة اشتراك نقابة', module: 'payment', recordId: 'us_um_1_2026_8', recordLabel: 'أحمد محمود علي - أغسطس 2026', createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: 'log_3', userId: 'user_2', userName: 'محمد عبدالله حسن', action: 'تحديث بيانات موظف', module: 'employee', recordId: 'emp_EMP005', recordLabel: 'نورا يوسف محمد', createdAt: new Date(Date.now() - 14400000).toISOString() },
  { id: 'log_4', userId: 'user_3', userName: 'سارة أحمد إبراهيم', action: 'تسجيل دفعة اتصالات', module: 'payment', recordId: 'tp_ml_1_2026_8', recordLabel: 'أحمد محمود علي - أغسطس 2026', createdAt: new Date(Date.now() - 18000000).toISOString() },
  { id: 'log_5', userId: 'user_1', userName: 'أحمد محمد السيد', action: 'إضافة موظف جديد', module: 'employee', recordLabel: 'إيمان نبيل زهران', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'log_6', userId: 'user_2', userName: 'محمد عبدالله حسن', action: 'إضافة خط موبايل', module: 'telecom', recordLabel: '01501234501 - أحمد محمود علي', createdAt: new Date(Date.now() - 90000000).toISOString() },
  { id: 'log_7', userId: 'user_3', userName: 'سارة أحمد إبراهيم', action: 'تحديث حالة دفع', module: 'payment', recordLabel: 'محمد سامي حسين', createdAt: new Date(Date.now() - 172800000).toISOString() },
  { id: 'log_8', userId: 'user_1', userName: 'أحمد محمد السيد', action: 'تحديث إعدادات النظام', module: 'settings', createdAt: new Date(Date.now() - 259200000).toISOString() },
];

export const DEMO_CREDENTIALS = [
  { email: 'admin@demo.com', password: 'Demo@1234', role: 'super_admin' as const },
  { email: 'manager@demo.com', password: 'Demo@1234', role: 'admin' as const },
  { email: 'collector@demo.com', password: 'Demo@1234', role: 'collector' as const },
];

export const DEMO_CURRENT = { year: DEMO_CURRENT_YEAR, month: DEMO_CURRENT_MONTH };

