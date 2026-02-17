import { db } from "../config/db.js";

export const createUser = async (data) => {
  const { userId, name, email, password, dob } = data;

  const [result] = await db.query(
    `INSERT INTO users (userId, name, email, password, dob)
     VALUES (${userId}, '${name}', '${email}', '${password}', '${dob}')`,
  );

  return result.insertId;
};

export const findAllUsers = async () => {
  const [rows] = await db.query(`SELECT * FROM users`);
  return rows;
};

export const findUserById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM users WHERE userId = ?`, [id]);
  return rows[0];
};

export const findUserByEmail = async (email) => {
  const [rows] = await db.query(`SELECT * FROM users WHERE email = '${email}'`);

  return rows;
};

export const updateUser = async (id, data) => {
  const { name, email, dob } = data;

  const [result] = await db.query(
    `UPDATE users SET name = ?, email = ?, dob = ? WHERE id = ?`,
    [name, email, dob, id],
  );

  return result.affectedRows;
};

export const deleteUser = async (id) => {
  const [result] = await db.query(`DELETE FROM users WHERE id = ?`, [id]);
  return result.affectedRows;
};
