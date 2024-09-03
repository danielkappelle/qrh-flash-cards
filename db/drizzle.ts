import { config } from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";
config({ path: ".env" });

if (!process.env.DB_URL) {
  throw new Error("DB Credentials Error");
}

const connection = mysql.createConnection(process.env.DB_URL);
export const db = drizzle(connection);
