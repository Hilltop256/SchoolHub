
# School Hub — Uganda School Management System

A comprehensive multi-tenant school management platform built for Ugandan schools. Features student enrollment, fee tracking, payment recording with immutable ledger, report cards, attendance tracking, and SMS notifications.

## 📦 Features

- **Student Management**: Complete student lifecycle from enrollment to graduation
- **Fee Tracking**: Flexible fee structures per class and term
- **Payment Processing**: Multiple payment methods with automatic receipts
- **Immutable Ledger**: Financial audit trail that never modifies historical data
- **Report Cards**: Automated grade calculation and position ranking
- **Attendance Tracking**: Daily attendance with class-level reporting
- **SMS Notifications**: Automated fee reminders via Africa's Talking API
- **Multi-tenant**: One database serves multiple schools with complete data isolation

## 🚀 Quick Start (5 Minutes)

### Step 1: Create Project

```bash
npm create vite@latest school-hub -- --template react-ts
cd school-hub
npm install
```

### Step 2: Install Dependencies

```bash
npm install @supabase/supabase-js react-router-dom lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 3: Configure Tailwind

**tailwind.config.mjs:**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        success: { 500: '#10b981', 600: '#059669' },
        warning: { 500: '#f59e0b', 600: '#d97706' },
        danger: { 500: '#ef4444', 600: '#dc2626' },
      },
    },
  },
  plugins: [],
}
```

**src/index.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}
```

### Step 4: Add the Application

Copy `SchoolHub-App.tsx` into `src/App.tsx` or use the components individually.

Replace `src/main.tsx`:

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### Step 5: Run Development Server

```bash
npm run dev
```

Open http://localhost:5173 and login with demo credentials.

## 🔐 Demo Credentials

| Username | Password | Role |
|----------|----------|------|
| admin@sh.ug | admin | School Admin |
| bursar@sh.ug | bursar | Bursar |
| teacher@sh.ug | teacher | Teacher |
| parent@sh.ug | parent | Parent |

## 🔗 Connect to Supabase (Backend)

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy Project URL and Anon Key from **Project Settings → API**

### 2. Run Database Schema

1. Open Supabase SQL Editor
2. Copy contents of `supabase-schema.sql`
3. Run the script

### 3. Configure Authentication

1. Go to **Authentication → Providers**
2. Enable Phone auth (for OTP login)
3. Or keep Email auth and use `phone@schoolhub.ug` pattern

### 4. Set Environment Variables

Create `.env` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 5. Update Configuration

Uncomment the Supabase config at the top of `App.tsx`:

```typescript
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

## 🏗️ Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React App     │────▶│   Supabase      │────▶│   PostgreSQL    │
│   (Vite + TS)   │     │   (Auth + API)  │     │   (Multi-tenant)│
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                                               │
         │         ┌─────────────────┐                   │
         └────────▶│  Africa's Talk  │◀──────────────────┘
                   │  (SMS Gateway)  │
                   └─────────────────┘
```

## 🏢 Multi-Tenancy

- Every table has `school_id` column
- Row Level Security (RLS) policies enforce data isolation
- One database serves multiple schools
- Complete data separation between schools

## 💰 Payment Flow

```
1. Bursar records payment (Cash/Bank/MoMo)
   ↓
2. Auto-generates receipt number (RCP-YYYY-####)
   ↓
3. Triggers ledger transaction (CREDIT)
   ↓
4. Updates student balance
   ↓
5. SMS sent to parent (optional)
```

## 📜 Ledger Design (Immutable)

- `ledger_entries` table = audit trail
- Never update or delete — only append
- `balance_after` calculated per transaction
- `student_balances` auto-updated via trigger
- Full financial history preserved

## 📱 Features by Role

### School Admin
- Full dashboard with analytics
- Student enrollment & management
- Fee structure setup
- Payment recording & receipt generation
- Immutable finance ledger
- Report card management
- Attendance tracking
- SMS notifications (Africa's Talking)
- Staff/user management

### Bursar
- Dashboard focused on finances
- Payment recording
- Ledger view
- Student balance tracking
- Daily collection reports

### Teacher
- Class student list
- Report card entry
- Daily attendance
- Student performance tracking

### Parent (Mobile-First)
- View child's fee balance
- Payment history
- Report cards
- Receive SMS notifications
- View attendance records

## 📲 SMS Integration (Africa's Talking)

```typescript
import AfricasTalking from 'africastalking';

const at = AfricasTalking({
  apiKey: 'your-api-key',
  username: 'your-username'
});

const sms = at.SMS;
await sms.send({
  to: ['+256772123456'],
  message: 'Fee reminder: UGX 250,000 balance for Aisha. Due: 15th March 2026',
  from: 'SchoolHub'
});
```

## 🧪 Testing Checklist

Before going live, verify:

- [ ] Payment reflects in student balance
- [ ] Ledger shows correct running balance
- [ ] Receipt numbers are unique and sequential
- [ ] Parent sees only their child's data
- [ ] Teacher sees only their class
- [ ] Bursar cannot delete payments
- [ ] School admin sees all school data
- [ ] Multi-school data is isolated
- [ ] SMS delivers to parent phone
- [ ] Report cards display correctly

## 🚀 Deployment

### Option 1: Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Option 2: Netlify

```bash
npm run build
# Drag `dist/` folder to Netlify
```

### Option 3: Self-Hosted

```bash
npm run build
# Serve `dist/` with Nginx or Apache
```

## 📋 Phase 2 Roadmap

- [ ] MTN Mobile Money API integration
- [ ] Airtel Money API integration
- [ ] Android app (Capacitor/Cordova)
- [ ] Offline mode with sync
- [ ] Advanced analytics dashboard
- [ ] Bulk SMS campaigns
- [ ] Fee financing / installment plans
- [ ] UG Pay government integration

## 🛡️ Security Notes

- All financial records are immutable (ledger pattern)
- Row Level Security (RLS) enforced at database level
- Auth handled by Supabase (JWT)
- Phone OTP recommended for parent login
- Audit logs track all financial changes
- Receipt numbers are auto-generated and unique

## 📄 Database Schema

The `supabase-schema.sql` file includes:

- **Schools** - Multi-tenant root
- **Users** - Staff, teachers, parents
- **Students** - With parent relationships
- **Classes** - Grade levels and streams
- **Subjects** - Course catalog
- **Fee Structures** - Per class/term
- **Student Fees** - Individual assignments
- **Payments** - Transaction records
- **Ledger Entries** - Immutable financial audit trail
- **Attendance** - Daily records
- **Report Cards** - Academic results
- **SMS Notifications** - Communication log
- **Settings** - School configuration
- **Announcements** - School notices

## 🎯 Performance Optimizations

- Indexed foreign keys for fast joins
- Materialized views for dashboard stats
- Connection pooling via Supabase
- Client-side caching strategies
- Lazy loading for large datasets

## 📞 Support

For questions or issues:

1. Check Supabase logs in Dashboard → Logs
2. Verify RLS policies are enabled
3. Test with demo credentials first
4. Check browser console for errors

## 📄 License

MIT License - Feel free to use for your school management needs.

---

**Built with ❤️ for Ugandan Schools**
