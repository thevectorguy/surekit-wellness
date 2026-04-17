import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema/index.js";

const { Pool } = pg;

let pool: pg.Pool | null = null;
let database: ReturnType<typeof drizzle> | null = null;

export function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL?.trim());
}

export function getPool() {
  const connectionString = process.env.DATABASE_URL?.trim();

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL must be set. Did you forget to provision a database?",
    );
  }

  if (!pool) {
    pool = new Pool({ connectionString });
  }

  return pool;
}

export function getDb() {
  if (!database) {
    database = drizzle(getPool(), { schema });
  }

  return database;
}

export * from "./schema/index.js";
