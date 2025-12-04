import { pool } from "../../config/db";

const createUser = async (name: string, email: string, age: number) => {
   const result = await pool.query(
      `INSERT INTO users(name, email, age) VALUES($1, $2, $3) RETURNING *`,
      [name, email, age]
   );

   return result;
};

const getUsers = async () => {
   const result = await pool.query(`SELECT * FROM users`);
   return result;
};

export const userServices = {
   createUser,
   getUsers,
};
