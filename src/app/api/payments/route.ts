
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const schoolId = searchParams.get('schoolId')
    const studentId = searchParams.get('studentId')

    let query = supabase
      .from('payments')
      .select(`
        id,
        amount,
        payment_date,
        reference_number,
        transaction_id,
        status,
        created_at,
        student:students (
          id,
          first_name,
          last_name,
          student_number
        ),
        payment_method:payment_methods (
          id,
          name
        ),
        recorded_by_user:users (
          id,
          first_name,
          last_name
        )
      `)
      .order('created_at', { ascending: false })

    if (schoolId) {
      query = query.eq('school_id', schoolId)
    }

    if (studentId) {
      query = query.eq('student_id', studentId)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      schoolId,
      studentId,
      studentFeeId,
      paymentMethodId,
      amount,
      referenceNumber,
      notes,
    } = body

    // Insert payment
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        school_id: schoolId,
        student_id: studentId,
        student_fee_id: studentFeeId,
        payment_method_id: paymentMethodId,
        amount: parseFloat(amount),
        reference_number: referenceNumber,
        notes,
        recorded_by: (await supabase.auth.getUser()).data.user?.id,
        status: 'confirmed',
        confirmed_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (paymentError) {
      return NextResponse.json({ error: paymentError.message }, { status: 500 })
    }

    // Update student fee balance (handled by trigger)
    return NextResponse.json({ data: payment }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
