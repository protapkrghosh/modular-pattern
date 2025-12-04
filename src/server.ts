import express, { Request, Response, urlencoded } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/users/user.route";

const app = express();
const port = config.port;

// Parser
app.use(express.json());
app.use(express.urlencoded());

// Initializing DB
initDB();

app.get("/", logger, (req: Request, res: Response) => {
   res.send("Hello Next Level Developers!");
});

// Users CRUD
app.use("/users", userRoutes);

// TODO CRUD
app.post("/todos", async (req: Request, res: Response) => {
   const { user_id, title } = req.body;

   try {
      const result = await pool.query(
         `INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`,
         [user_id, title]
      );

      res.status(201).json({
         success: true,
         message: "Todo created",
         data: result.rows[0],
      });
   } catch (err: any) {
      res.status(500).json({
         success: false,
         message: err.message,
      });
   }
});

app.get("/todos", async (req: Request, res: Response) => {
   try {
      const result = await pool.query(`SELECT * FROM todos`);
      res.status(200).json({
         success: true,
         message: "Todos retrieved successfully",
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

app.get("/todos/:id", async (req: Request, res: Response) => {
   try {
      const result = await pool.query(`SELECT * FROM todos WHERE id=$1`, [
         req.params.id,
      ]);

      if (result.rows.length === 0) {
         res.status(404).json({
            success: false,
            message: "Todos not found",
         });
      } else {
         res.status(200).json({
            success: true,
            message: "Todos fetched successfully",
            data: result.rows[0],
         });
      }
   } catch (err: any) {
      res.status(500).json({
         success: false,
         message: err.message,
      });
   }
});

app.put("/todos/:id", async (req: Request, res: Response) => {
   const { title } = req.body;

   try {
      const result = await pool.query(
         `UPDATE todos SET title=$1 WHERE id=$2 RETURNING *`,
         [title, req.params.id]
      );

      if (result.rows.length === 0) {
         res.status(404).json({
            success: false,
            message: "Todos not found",
         });
      } else {
         res.send(200).json({
            success: true,
            message: "Todos fetched successfully",
            data: result.rows[0],
         });
      }
   } catch (err: any) {
      res.status(500).json({
         success: false,
         message: err.message,
         data: err,
      });
   }
});

app.delete("/todos/:id", async (req: Request, res: Response) => {
   try {
      const result = await pool.query(`DELETE FROM todos WHERE id=$1`, [
         req.params.id,
      ]);

      if (result.rows.length === 0) {
         res.status(404).json({
            success: false,
            message: "Todos not found",
         });
      } else {
         res.status(200).json({
            success: true,
            message: "Todos deleted successfully",
            data: result.rows[0],
         });
      }
   } catch (err: any) {
      res.status(500).json({
         success: false,
         message: err.message,
      });
   }
});

// Find not found route
app.use((req: Request, res: Response) => {
   res.status(404).json({
      success: false,
      message: "Route not found",
      path: req.path,
   });
});

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
