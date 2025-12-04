import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
   const { name, email, age } = req.body;

   try {
      const result = await userServices.createUser(name, email, age);
      // console.log(result.rows[0]);

      res.status(201).json({
         success: true,
         message: "Data Inserted Successfully",
         data: result.rows[0],
      });
   } catch (err: any) {
      res.status(500).json({
         success: false,
         message: err.message,
      });
   }
};

const getUsers = async (req: Request, res: Response) => {
   try {
      const result = await userServices.getUsers();

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
};

const getSingleUser = async (req: Request, res: Response) => {
   try {
      const result = await userServices.getSingleUser(req.params.id as string);

      if (result.rows.length === 0) {
         res.status(404).json({
            success: false,
            message: "User not found",
         });
      } else {
         res.status(200).json({
            success: true,
            message: "Users fetched successfully",
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

const updateUser = async (req: Request, res: Response) => {
   const { name, email, age } = req.body;

   try {
      const result = await userServices.updateUser(
         name,
         email,
         age,
         req.params.id!
      );

      if (result.rows.length === 0) {
         res.status(404).json({
            success: false,
            message: "User not found",
         });
      } else {
         res.status(200).json({
            success: true,
            message: "Users updated successfully",
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

const deleteUser = async (req: Request, res: Response) => {
   try {
      const result = await userServices.deleteUser(req.params.id!);

      if (result.rowCount === 0) {
         res.status(404).json({
            success: false,
            message: "User not found",
         });
      } else {
         res.status(200).json({
            success: true,
            message: "Users deleted successfully",
            data: result.rows,
         });
      }
   } catch (err: any) {
      res.status(500).json({
         success: false,
         message: err.message,
      });
   }
};

export const userControllers = {
   createUser,
   getUsers,
   getSingleUser,
   updateUser,
   deleteUser,
};
