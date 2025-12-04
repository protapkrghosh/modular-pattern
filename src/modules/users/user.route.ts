import express, { Request, Response } from "express";
import { pool } from "../../config/db";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
   const { name, email, age } = req.body;

   try {
      const result = await pool.query(
         `INSERT INTO users(name, email, age) VALUES($1, $2, $3) RETURNING *`,
         [name, email, age]
      );

      // console.log(result.rows[0]);

      res.status(201).json({
         success: false,
         message: "Data Inserted Successfully",
         data: result.rows[0],
      });
   } catch (err: any) {
      res.status(500).json({
         success: false,
         message: err.message,
      });
   }
});

router.get("/", async (req: Request, res: Response) => {
   try {
      const result = await pool.query(`SELECT * FROM users`);
      res.status(200).json({
         success: true,
         message: "Users retrieved successfully",
         data: result.rows,
      });
   } catch (err: any) {
      res.status(500).json({
         success: false,
         message: err.message,
         details: err,
      });
   }
});

export const userRoutes = router;
