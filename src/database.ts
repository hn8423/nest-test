import { Pool } from 'pg';

export const pool = new Pool({
  user: 'hyun-in',
  host: 'localhost',
  database: 'localtestdb',
  port: 5432,
});
