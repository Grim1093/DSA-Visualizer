import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { pool } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { searchParams } = new URL(request.url);
    const moduleId = searchParams.get('moduleId');
    const language = searchParams.get('language');

    if (!moduleId || !language) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await pool.query(
      'SELECT code FROM saved_code WHERE user_id = $1 AND module_id = $2 AND language = $3',
      [userId, moduleId, language]
    );

    if (result.rows.length > 0) {
      return NextResponse.json({ code: result.rows[0].code });
    } else {
      return NextResponse.json({ code: null });
    }
  } catch (error) {
    console.error('Error loading code:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
