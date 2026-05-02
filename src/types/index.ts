// Type definitions for SchoolHub Uganda
export type UserRole = 'super_admin' | 'admin' | 'teacher' | 'accountant' | 'staff' | 'parent';
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';
export type PaymentStatus = 'pending' | 'confirmed' | 'cancelled';
export type FeeStatus = 'pending' | 'partial' | 'paid' | 'overdue';
export type Gender = 'Male' | 'Female' | 'Other';
export type SMSStatus = 'pending' | 'sent' | 'failed';

export interface School {
  id: string;
  name: string;
  code: string;
  address?: string;
  district?: string;
  region?: string;
  phone?: string;
  email?: string;
  logo_url?: string;
  currency: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  school_id: string;
  email: string;
  role: UserRole;
  first_name: string;
  last_name: string;
  phone?: string;
  avatar_url?: string;
  is_active: boolean;
  created_at: string;
}

export interface Student {
  id: string;
  school_id: string;
  student_number: string;
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  gender?: Gender;
  blood_group?: string;
  address?: string;
  district?: string;
  parent_id?: string;
  class_id?: string;
  admission_date: string;
  is_active: boolean;
  parent?: User | null;
  class?: Class | null;
}

export interface Class {
  id: string;
  school_id: string;
  name: string;
  stream_name?: string;
  class_teacher_id?: string;
  teacher?: User | null;
  capacity: number;
  created_at: string;
}

export interface Subject {
  id: string;
  school_id: string;
  name: string;
  code?: string;
  is_active: boolean;
}

export interface Term {
  id: string;
  school_id: string;
  name: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

export interface AcademicYear {
  id: string;
  school_id: string;
  year_name: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
}

export interface FeeStructure {
  id: string;
  school_id: string;
  name: string;
  class_id?: string;
  term_id: string;
  term?: Term;
  academic_year_id: string;
  total_amount: number;
  due_date: string;
  description?: string;
  is_mandatory: boolean;
}

export interface StudentFee {
  id: string;
  school_id: string;
  student_id: string;
  fee_structure_id: string;
  amount_due: number;
  amount_paid: number;
  balance: number;
  status: FeeStatus;
  fee_structure?: FeeStructure;
  student?: Student;
}

export interface PaymentMethod {
  id: string;
  school_id: string;
  name: string;
  description?: string;
  is_active: boolean;
}

export interface Payment {
  id: string;
  school_id: string;
  student_id: string;
  student_fee_id?: string;
  payment_method_id: string;
  amount: number;
  payment_date: string;
  reference_number?: string;
  transaction_id?: string;
  recorded_by: string;
  notes?: string;
  status: PaymentStatus;
  confirmed_at?: string;
  student?: Student;
  payment_method?: PaymentMethod;
  recorded_by_user?: User;
}

export interface LedgerEntry {
  id: string;
  school_id: string;
  entry_date: string;
  account_code: string;
  account_name: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  reference_type: string;
  reference_id: string;
}

export interface TeacherSubject {
  id: string;
  teacher_id: string;
  subject_id: string;
  class_id: string;
  academic_year_id?: string;
  teacher?: User;
  subject?: Subject;
  class?: Class;
}

export interface AttendanceRecord {
  id: string;
  school_id: string;
  student_id: string;
  class_id: string;
  term_id: string;
  date: string;
  status: AttendanceStatus;
  marked_by: string;
  remarks?: string;
  student?: Student;
}

export interface ReportCard {
  id: string;
  school_id: string;
  student_id: string;
  class_id: string;
  term_id: string;
  academic_year_id: string;
  total_score?: number;
  grade?: string;
  position?: number;
  remarks?: string;
  prepared_by?: string;
  approved_by?: string;
  published: boolean;
  student?: Student;
  marks?: ReportCardMark[];
}

export interface ReportCardMark {
  id: string;
  report_card_id: string;
  subject_id: string;
  score?: number;
  grade?: string;
  remarks?: string;
  subject?: Subject;
}

export interface SMSNotification {
  id: string;
  school_id: string;
  recipient_phone: string;
  message: string;
  sent_by: string;
  status: SMSStatus;
  sent_at?: string;
  error_message?: string;
  created_at: string;
}

export interface Setting {
  id: string;
  school_id: string;
  sms_provider?: string;
  sms_api_key?: string;
  sms_sender_id?: string;
  fee_reminder_days: number;
  auto_reminders: boolean;
  timezone: string;
}

export interface Announcement {
  id: string;
  school_id: string;
  title: string;
  content: string;
  target_roles: string;
  created_by: string;
  expires_at?: string;
  is_active: boolean;
}

export interface DashboardStats {
  total_students: number;
  total_teachers: number;
  total_classes: number;
  total_revenue: number;
  outstanding_balance: number;
  attendance_rate: number;
  recent_payments: Payment[];
  pending_fees: StudentFee[];
}
