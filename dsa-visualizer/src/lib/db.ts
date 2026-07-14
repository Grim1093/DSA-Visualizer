process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('executed query', { text, duration, rows: res.rowCount });
  return res;
};
