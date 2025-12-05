import bcrypt from "bcryptjs";
import { pool } from "../../config/db";

const createUser = async (payload: Record<string, unknown>) => {
   const { name, role, email, password, age } = payload;

   const hashedPass = await bcrypt.hash(password as string, 10);

   const result = await pool.query(
      `INSERT INTO users(name, role, email, password, age) VALUES($1, $2, $3, $4, $5) RETURNING *`,
      [name, role, email, hashedPass, age]
   );

   return result;
};

const getUsers = async () => {
   const result = await pool.query(`SELECT * FROM users`);
   return result;
};

const getSingleUser = async (id: string) => {
   const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
   return result;
};

const updateUser = async (
   name: string,
   email: string,
   age: number,
   id: string
) => {
   const result = await pool.query(
      `UPDATE users SET name=$1, email=$2, age=$3 WHERE id=$4 RETURNING *`,
      [name, email, age, id]
   );

   return result;
};

const deleteUser = async (id: string) => {
   const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);

   return result;
};

export const userServices = {
   createUser,
   getUsers,
   getSingleUser,
   updateUser,
   deleteUser,
};
