import express, { Request, Response, urlencoded } from "express";
import config from "./config";
import initDB from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/users/user.route";
import { todoRoutes } from "./modules/todos/todo.route";
import { authRoutes } from "./modules/auth/auth.routes";

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

app.use("/users", userRoutes); // Users CRUD
app.use("/todos", todoRoutes); // TODO CRUD
app.use("/auth", authRoutes); // Auth Routes

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
