-- School Hub Uganda - Complete School Management System
-- Supports multi-tenancy, RLS, and all Uganda-specific requirements
-- Version 2.0 - Enhanced with immutable ledger and audit features

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Schools table (multi-tenant)
CREATE TABLE schools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  address TEXT,
  district VARCHAR(100),
  region VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(255),
  logo_url TEXT,
  currency VARCHAR(10) DEFAULT 'UGX',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users (admin, teachers, staff, parents)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('super_admin', 'admin', 'teacher', 'accountant', 'staff', 'parent')),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Uganda terms (term 1, 2, 3)
CREATE TABLE terms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Academic years
CREATE TABLE academic_years (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  year_name VARCHAR(20) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_current BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Classes/Forms (Uganda: Senior 1-6)
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,
  stream_name VARCHAR(50),
  class_teacher_id UUID REFERENCES users(id),
  capacity INTEGER DEFAULT 40,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subjects
CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(20),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Students
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_number VARCHAR(50) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE,
  gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Other')),
  blood_group VARCHAR(5),
  address TEXT,
  district VARCHAR(100),
  parent_id UUID REFERENCES users(id),
  class_id UUID REFERENCES classes(id),
  admission_date DATE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student parents (many-to-many)
CREATE TABLE student_parents (
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  parent_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  relationship VARCHAR(50),
  is_primary BOOLEAN DEFAULT false,
  PRIMARY KEY (student_id, parent_id)
);

-- Fee structures
CREATE TABLE fee_structures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  class_id UUID REFERENCES classes(id),
  term_id UUID NOT NULL REFERENCES terms(id),
  academic_year_id UUID NOT NULL REFERENCES academic_years(id),
  total_amount DECIMAL(10,2) NOT NULL,
  due_date DATE NOT NULL,
  description TEXT,
  is_mandatory BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student fee assignments
CREATE TABLE student_fees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  fee_structure_id UUID NOT NULL REFERENCES fee_structures(id),
  amount_due DECIMAL(10,2) NOT NULL,
  amount_paid DECIMAL(10,2) DEFAULT 0,
  balance DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'partial', 'paid', 'overdue')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payment methods
CREATE TABLE payment_methods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments (immutable after confirmation)
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id),
  student_fee_id UUID REFERENCES student_fees(id),
  payment_method_id UUID NOT NULL REFERENCES payment_methods(id),
  amount DECIMAL(10,2) NOT NULL,
  payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reference_number VARCHAR(100),
  transaction_id VARCHAR(255),
  recorded_by UUID NOT NULL REFERENCES users(id),
  notes TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Immutable financial ledger (accounting)
CREATE TABLE ledger (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  entry_date DATE NOT NULL,
  account_code VARCHAR(50) NOT NULL,
  account_name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  debit DECIMAL(12,2) DEFAULT 0,
  credit DECIMAL(12,2) DEFAULT 0,
  balance DECIMAL(12,2) NOT NULL,
  reference_type VARCHAR(50) NOT NULL,
  reference_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subjects taught by teachers
CREATE TABLE teacher_subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES classes(id),
  academic_year_id UUID REFERENCES academic_years(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(teacher_id, subject_id, class_id)
);

-- Attendance
CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES classes(id),
  term_id UUID NOT NULL REFERENCES terms(id),
  date DATE NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('present', 'absent', 'late', 'excused')),
  marked_by UUID NOT NULL REFERENCES users(id),
  remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Report cards
CREATE TABLE report_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES classes(id),
  term_id UUID NOT NULL REFERENCES terms(id),
  academic_year_id UUID NOT NULL REFERENCES academic_years(id),
  total_score DECIMAL(5,2),
  grade VARCHAR(5),
  position INTEGER,
  remarks TEXT,
  prepared_by UUID REFERENCES users(id),
  approved_by UUID REFERENCES users(id),
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Report card subject marks
CREATE TABLE report_card_marks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_card_id UUID NOT NULL REFERENCES report_cards(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id),
  score DECIMAL(5,2),
  grade VARCHAR(5),
  remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SMS notifications
CREATE TABLE sms_notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  recipient_phone VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  sent_by UUID NOT NULL REFERENCES users(id),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  sent_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Settings per school
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE UNIQUE,
  sms_provider VARCHAR(50),
  sms_api_key VARCHAR(255),
  sms_sender_id VARCHAR(20),
  fee_reminder_days INTEGER DEFAULT 3,
  auto_reminders BOOLEAN DEFAULT true,
  timezone VARCHAR(50) DEFAULT 'Africa/Kampala',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events/announcements
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  target_roles VARCHAR(255) DEFAULT 'all',
  created_by UUID NOT NULL REFERENCES users(id),
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit log
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  table_name VARCHAR(100) NOT NULL,
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_school ON users(school_id);
CREATE INDEX idx_students_school ON students(school_id);
CREATE INDEX idx_students_class ON students(class_id);
CREATE INDEX idx_payments_student ON payments(student_id);
CREATE INDEX idx_payments_school ON payments(school_id);
CREATE INDEX idx_ledger_school ON ledger(school_id);
CREATE INDEX idx_attendance_student ON attendance(student_id);
CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_report_cards_student ON report_cards(student_id);
CREATE INDEX idx_fee_structures_class ON fee_structures(class_id);
CREATE INDEX idx_student_fees_student ON student_fees(student_id);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON schools FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_student_fees_updated_at BEFORE UPDATE ON student_fees FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_report_cards_updated_at BEFORE UPDATE ON report_cards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update student balance after payment
CREATE OR REPLACE FUNCTION update_student_fee_balance()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE student_fees
  SET amount_paid = amount_paid + NEW.amount,
      balance = balance - NEW.amount,
      status = CASE
        WHEN balance - NEW.amount <= 0 THEN 'paid'
        WHEN balance - NEW.amount < amount_due THEN 'partial'
        ELSE 'pending'
      END,
      updated_at = NOW()
  WHERE id = NEW.student_fee_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER payment_inserted AFTER INSERT ON payments FOR EACH ROW EXECUTE FUNCTION update_student_fee_balance();

-- Trigger to create ledger entry when payment confirmed
CREATE OR REPLACE FUNCTION create_ledger_entry_on_payment()
RETURNS TRIGGER AS $$
DECLARE
  current_balance DECIMAL(12,2);
BEGIN
  IF NEW.status = 'confirmed' AND OLD.status != 'confirmed' THEN
    SELECT COALESCE(SUM(debit) - SUM(credit), 0) INTO current_balance FROM ledger WHERE school_id = NEW.school_id;
    
    INSERT INTO ledger (
      school_id, entry_date, account_code, account_name, description,
      debit, credit, balance, reference_type, reference_id
    ) VALUES (
      NEW.school_id, CURRENT_DATE, '4000', 'School Fees', 'Payment received - ' || (SELECT student_number FROM students WHERE id = NEW.student_id),
      NEW.amount, 0, current_balance + NEW.amount, 'payment', NEW.id
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER payment_confirmed_ledger AFTER UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION create_ledger_entry_on_payment();

-- RLS Policies
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_structures ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_card_marks ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_parents ENABLE ROW LEVEL SECURITY;

-- School-wide policies
CREATE POLICY "Users can view their school's data" ON users
  FOR ALL USING (school_id = auth.jwt() ->> 'school_id' OR auth.jwt() ->> 'role' = 'super_admin');

CREATE POLICY "School admins can manage users" ON users
  FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'super_admin'));

-- Students policy
CREATE POLICY "Users can view students in their school" ON students
  FOR ALL USING (school_id = auth.jwt() ->> 'school_id');

CREATE POLICY "Teachers and staff can view students" ON students
  FOR SELECT USING (auth.jwt() ->> 'role' IN ('teacher', 'staff', 'admin', 'super_admin'));

-- Payments policy
CREATE POLICY "Users can view payments for their school" ON payments
  FOR ALL USING (school_id = auth.jwt() ->> 'school_id');

-- Ledger - only admin/accountant
CREATE POLICY "Only admin and accountant can view ledger" ON ledger
  FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'accountant', 'super_admin'));

-- Attendance - teachers can manage for their classes
CREATE POLICY "Teachers can manage attendance for their classes" ON attendance
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'teacher' AND
    class_id IN (
      SELECT class_id FROM teacher_subjects WHERE teacher_id = auth.uid()
    )
  );

-- Report cards - teachers can enter, admins can publish
CREATE POLICY "Teachers can create report cards" ON report_cards
  FOR INSERT WITH CHECK (auth.jwt() ->> 'role' IN ('teacher', 'admin'));

CREATE POLICY "Parents can view their children's report cards" ON report_cards
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM student_parents sp
      JOIN students s ON sp.student_id = s.id
      WHERE sp.parent_id = auth.uid() AND s.id = report_cards.student_id
    )
  );

-- SMS notifications
CREATE POLICY "Staff can create SMS" ON sms_notifications
  FOR INSERT WITH CHECK (auth.jwt() ->> 'role' IN ('admin', 'staff', 'teacher'));

-- Insert default payment methods
INSERT INTO payment_methods (school_id, name, description) VALUES
  ('00000000-0000-0000-0000-000000000000', 'Cash', 'Direct cash payment'),
  ('00000000-0000-0000-0000-000000000000', 'Bank Transfer', 'Bank transfer payment'),
  ('00000000-0000-0000-0000-000000000000', 'Mobile Money', 'Mobile money payment (MTN, Airtel)'),
  ('00000000-0000-0000-0000-000000000000', 'Cheque', 'Bank cheque payment');

-- Create a default school for system
INSERT INTO schools (id, name, code, email) VALUES
  ('00000000-0000-0000-0000-000000000000', 'System Default', 'SYSTEM', 'system@example.com');
