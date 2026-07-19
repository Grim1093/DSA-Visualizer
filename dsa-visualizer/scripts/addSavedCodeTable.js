process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function run() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS saved_code (
      user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
      module_id VARCHAR(255) NOT NULL,
      language VARCHAR(50) NOT NULL,
      code TEXT NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id, module_id, language)
    );
  `;

  try {
    console.log('Creating saved_code table...');
    await pool.query(createTableQuery);
    console.log('Successfully created saved_code table!');
  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    pool.end();
  }
}

run();
