process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const schema = `
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  "emailVerified" TIMESTAMPTZ,
  image TEXT
);

CREATE TABLE IF NOT EXISTS accounts (
  id SERIAL PRIMARY KEY,
  "userId" VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  "providerAccountId" VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  id_token TEXT,
  scope TEXT,
  session_state TEXT,
  token_type TEXT
);

CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  "userId" VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMPTZ NOT NULL,
  "sessionToken" VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS verification_token (
  identifier TEXT,
  expires TIMESTAMPTZ NOT NULL,
  token TEXT,
  PRIMARY KEY (identifier, token)
);

-- Our Custom Tables

CREATE TABLE IF NOT EXISTS challenges (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  difficulty VARCHAR(50) NOT NULL,
  category VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  constraints TEXT[] NOT NULL
);

CREATE TABLE IF NOT EXISTS testcases (
  id SERIAL PRIMARY KEY,
  challenge_id VARCHAR(255) REFERENCES challenges(id) ON DELETE CASCADE,
  input JSONB NOT NULL,
  expected_output JSONB NOT NULL,
  is_hidden BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS submissions (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
  challenge_id VARCHAR(255) REFERENCES challenges(id) ON DELETE CASCADE,
  language VARCHAR(50) NOT NULL,
  code TEXT NOT NULL,
  status VARCHAR(50) NOT NULL,
  execution_time FLOAT,
  memory_used FLOAT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_progress (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_submission_date DATE,
  completed_challenges VARCHAR(255)[] DEFAULT '{}'
);
`;

async function migrate() {
  try {
    console.log('Running migrations...');
    await pool.query(schema);
    console.log('Migrations completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await pool.end();
  }
}

migrate();
