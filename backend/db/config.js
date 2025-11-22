const { Pool } = require('pg');

function db() {
    const pool = new Pool({
        connectionString: "postgresql://neondb_owner:npg_b74MBdVkZIXz@ep-raspy-truth-a1a4n44e-pooler.ap-southeast-1.aws.neon.tech/neondb",
        ssl: { rejectUnauthorized: false },
    });

    return pool;
}

module.exports = db;
