import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
   const { name, email, age } = req.body;

   try {
      const result = await userServices.createUser(name, email, age);
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

export const userControllers = {
   createUser,
   getUsers,
};
