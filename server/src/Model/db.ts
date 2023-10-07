import { Pool } from 'pg';

/**
 * The PostgreSQL connection pool.
 * @remarks
 * This pool is created using the `pg` library and is used to manage connections to the PostgreSQL database.
 */
export const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: Number(process.env.PG_PORT),
});

