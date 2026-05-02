# Technical Context: School Hub Uganda - Technology Stack

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | UI library |
| Next.js | 16.x | React framework with App Router |
| TypeScript | 5.9.x | Type-safe JavaScript |
| CSS | Native | Styling |
| Supabase | Latest | Backend (Auth, DB, Storage) |
| PostgreSQL | Latest | Multi-tenant database |

## Quality Checks

- TypeScript: 0 errors
- ESLint: 0 errors
- Build: Success
- Responsive: Desktop & Mobile

## Database

- PostgreSQL with Supabase
- Multi-tenant architecture (school_id on all tables)
- Row Level Security (RLS) policies
- Immutable financial ledger
- Triggers for automation

## Key Features

- Role-Based Access (Admin, Bursar, Teacher, Parent)
- Student enrollment & management
- Fee tracking & payment processing
- Immutable financial ledger
- SMS notifications
- Report card automation
- Attendance tracking
- Multi-school support
