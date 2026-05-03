
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const schoolId = searchParams.get('schoolId')
    const search = searchParams.get('search')
    const grade = searchParams.get('grade')

    let query = supabase
      .from('students')
      .select(`
        id,
        student_number,
        first_name,
        last_name,
        date_of_birth,
        gender,
        address,
        district,
        admission_date,
        is_active,
        class:classes (
          id,
          name,
          stream_name
        ),
        parent:users (
          id,
          first_name,
          last_name,
          email
        )
      `)
      .order('created_at', { ascending: false })

    if (schoolId) {
      query = query.eq('school_id', schoolId)
    }

    if (search) {
      query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,student_number.ilike.%${search}%`)
    }

    if (grade) {
      query = query.eq('class_id', grade)
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
      studentNumber,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      address,
      district,
      parentId,
      classId,
    } = body

    const { data, error } = await supabase
      .from('students')
      .insert({
        school_id: schoolId,
        student_number: studentNumber,
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dateOfBirth,
        gender,
        address,
        district,
        parent_id: parentId,
        class_id: classId,
        admission_date: new Date().toISOString().split('T')[0],
        is_active: true,
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

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    const { data, error } = await supabase
      .from('students')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
