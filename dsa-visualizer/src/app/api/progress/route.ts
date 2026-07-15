import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { pool } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const userResult = await pool.query(
      'SELECT points, current_streak, last_active_at FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rowCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const completedResult = await pool.query(
      'SELECT module_id, completed_at FROM completed_modules WHERE user_id = $1',
      [userId]
    );

    return NextResponse.json({
      points: userResult.rows[0].points,
      currentStreak: userResult.rows[0].current_streak,
      lastActiveAt: userResult.rows[0].last_active_at,
      completedModules: completedResult.rows,
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await request.json();
    const { moduleId, points = 100 } = body;

    if (!moduleId) {
      return NextResponse.json({ error: 'Module ID is required' }, { status: 400 });
    }

    // Begin Transaction
    await pool.query('BEGIN');

    // 1. Insert into completed_modules. If it exists, do nothing (don't award points twice)
    const insertModuleResult = await pool.query(
      'INSERT INTO completed_modules (user_id, module_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [userId, moduleId]
    );

    // If a new module was completed, add points and update streak
    if (insertModuleResult.rowCount && insertModuleResult.rowCount > 0) {
      // Very basic streak logic: Just increment if active. In a real app, check if last active was yesterday.
      await pool.query(
        `UPDATE users 
         SET points = points + $1, 
             current_streak = current_streak + 1,
             last_active_at = CURRENT_TIMESTAMP
         WHERE id = $2`,
        [points, userId]
      );
    }

    await pool.query('COMMIT');

    return NextResponse.json({ success: true, newCompletion: insertModuleResult.rowCount && insertModuleResult.rowCount > 0 });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error updating progress:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
