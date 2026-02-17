import mysql from "mysql2/promise";

let pool = null;

export const getPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      waitForConnections: true,
      multipleStatements: true,
    });
  }
  return pool;
};

export const db = {
  query: (sql, values) => getPool().query(sql, values),
};
