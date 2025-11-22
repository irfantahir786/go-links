import { Pool } from 'pg';

// Extend globalThis to include our pool
declare global {
  var pool: Pool | undefined;
}

let pool: Pool;

if (!globalThis.pool) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // Required for Neon
  });
  globalThis.pool = pool;
} else {
  pool = globalThis.pool;
}

export default pool;
