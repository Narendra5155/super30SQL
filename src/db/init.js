import { db } from "../config/db.js";

export const initDatabase = async () => {
  const DB_NAME = process.env.DB_NAME || "app_db";
  console.log(`Initializing Database: ${DB_NAME}`);

  await db.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
  await db.query(`USE ${DB_NAME}`);

  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId VARCHAR(50) UNIQUE NOT NULL,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      dob DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log("Database & Users table ready");
};
