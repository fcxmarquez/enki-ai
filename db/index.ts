import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/utils/env";

const connectionString = env.DATABASE_URL;

export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client);
