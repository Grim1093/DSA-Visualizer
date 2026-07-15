import { pool } from '../src/lib/db';

async function initDb() {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(255) PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255),
      image TEXT,
      points INTEGER DEFAULT 0,
      current_streak INTEGER DEFAULT 0,
      last_active_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createCompletedModulesTable = `
    CREATE TABLE IF NOT EXISTS completed_modules (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
      module_id VARCHAR(255) NOT NULL,
      completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, module_id)
    );
  `;

  try {
    await pool.query(createUsersTable);
    await pool.query(createCompletedModulesTable);
    console.log('Database tables initialized successfully.');
  } catch (err) {
    console.error('Error initializing database tables:', err);
  } finally {
    pool.end();
  }
}

initDb();
