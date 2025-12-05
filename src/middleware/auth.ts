import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

// Higher oder function => return a function
const auth = (...roles: string[]) => {
   return async (req: Request, res: Response, next: NextFunction) => {
      try {
         const token = req.headers.authorization;

         if (!token) {
            return res.status(500).json({ message: "You are not allowed!!" });
         }

         const decode = jwt.verify(
            token,
            config.jwtSecret as string
         ) as JwtPayload;
         req.user = decode;
         // console.log(decode);

         if (roles.length && !roles.includes(decode.role)) {
            return res.status(500).json({
               error: "unauthorized!!",
            });
         }

         next();
      } catch (err: any) {
         res.status(500).json({
            success: false,
            message: err.message,
         });
      }
   };
};

export default auth;
