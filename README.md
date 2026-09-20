# Union & Telecom Management System
# نظام إدارة النقابة والاتصالات

نظام متكامل لإدارة اشتراكات النقابة وخطوط الاتصالات للموظفين — نسخة تجريبية احترافية.

## 🚀 Demo Features

- 🇦🇪 **Arabic RTL Interface** — واجهة عربية كاملة من اليمين إلى اليسار
- 📊 **Executive Dashboard** — لوحة تحكم مع رسوم بيانية تفاعلية
- 👥 **Employee Management** — إدارة 40 موظف وهمي
- 🛡️ **Union Membership** — إدارة اشتراكات النقابة
- 📱 **Mobile Lines** — إدارة 50 خط موبايل (فودافون، أورانج، اتصالات)
- 💰 **Collections** — شاشة التحصيل وإدارة المتأخرات
- 📋 **Reports** — تقارير تفصيلية مع تصدير PDF وExcel
- 🔐 **Role-based Access** — 3 مستويات صلاحيات

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Super Admin (مدير عام) | admin@demo.com | Demo@1234 |
| Admin (مدير) | manager@demo.com | Demo@1234 |
| Collector (محصل) | collector@demo.com | Demo@1234 |

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **State**: localStorage (demo mode)
- **Font**: Cairo (Arabic)

## 🏗️ Architecture

```
lib/
  demo-data/    ← Seed data + Store manager
  repositories/ ← Data access layer (swappable with Supabase)
  services/     ← Business logic
  auth/         ← Mock auth (swappable with Supabase Auth)
  storage/      ← localStorage abstraction
  utils.ts      ← Formatters, helpers

app/
  (auth)/login/         ← Login page
  (dashboard)/
    layout.tsx          ← Auth guard + Sidebar + Header
    dashboard/          ← Dashboard with charts
    employees/          ← Employee management
    union/              ← Union membership
    telecom/            ← Mobile lines & plans
    collections/        ← Outstanding payments & collection
    reports/            ← Reports & exports
    users/              ← User management
    activity/           ← Activity log
    settings/           ← App settings
```

## 🚀 Local Installation

```bash
git clone <repo-url>
cd neqaba
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🏗️ Build

```bash
npm run build
npm run start
```

## ☁️ Vercel Deployment

1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. No environment variables required for demo mode
4. Deploy!

The app runs entirely in demo mode with localStorage persistence.

## 📦 Demo Data

- 40 employees across 4 branches
- 8 departments
- 30 union members with 6 months of subscription history
- 50 mobile lines (Vodafone, Orange, Etisalat)
- Mix of paid, unpaid, and partial payment records

> ⚠️ **Note**: All data is fictional and for demonstration purposes only.
> Data resets when localStorage is cleared.

## 🔄 Adding Supabase Later

The architecture is Supabase-ready. To connect:
1. Create Supabase project
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`
3. Replace `DemoRepository` with `SupabaseRepository` in each service
4. Run the SQL migrations in `lib/supabase/migrations/`

---

**نظام تجريبي — جميع البيانات وهمية لأغراض العرض فقط**
