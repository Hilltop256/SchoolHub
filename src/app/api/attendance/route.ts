
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const schoolId = searchParams.get('schoolId')
    const date = searchParams.get('date')

    let query = supabase
      .from('attendance')
      .select(`
        id,
        date,
        status,
        remarks,
        student:students (
          id,
          first_name,
          last_name,
          student_number
        ),
        class:classes (
          id,
          name
        ),
        marked_by_user:users (
          id,
          first_name,
          last_name
        )
      `)
      .order('created_at', { ascending: false })

    if (schoolId) {
      query = query.eq('school_id', schoolId)
    }

    if (date) {
      query = query.eq('date', date)
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
      classId,
      termId,
      date,
      status,
      remarks,
    } = body

    const { data, error } = await supabase
      .from('attendance')
      .insert({
        school_id: schoolId,
        student_id: studentId,
        class_id: classId,
        term_id: termId,
        date,
        status,
        remarks,
        marked_by: (await supabase.auth.getUser()).data.user?.id,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
