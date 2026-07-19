import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { pool } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { moduleId, language, code } = await request.json();

    if (!moduleId || !language || !code) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const query = `
      INSERT INTO saved_code (user_id, module_id, language, code, updated_at)
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
      ON CONFLICT (user_id, module_id, language) 
      DO UPDATE SET code = EXCLUDED.code, updated_at = CURRENT_TIMESTAMP
    `;
    await pool.query(query, [userId, moduleId, language, code]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving code:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
