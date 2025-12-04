import { Request, Response } from "express";
import { todoServices } from "./todo.service";

const createTodo = async (req: Request, res: Response) => {
   const { user_id, title } = req.body;

   try {
      const result = await todoServices.createTodo(user_id, title);

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
};

const getTodos = async (req: Request, res: Response) => {
   try {
      const result = await todoServices.getTodos();

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
};

const getSingleTodo = async (req: Request, res: Response) => {
   try {
      const result = await todoServices.getSingleTodo(req.params.id!);

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
};

const updateTodo = async (req: Request, res: Response) => {
   const { title } = req.body;

   try {
      const result = await todoServices.updateTodo(
         title,
         req.params.id as string
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
};

const deleteTodo = async (req: Request, res: Response) => {
   try {
      const result = await todoServices.deleteTodo(req.params.id as string);

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
};

export const todoControllers = {
   createTodo,
   getTodos,
   getSingleTodo,
   updateTodo,
   deleteTodo,
};
