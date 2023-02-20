import { RequestHandler, Request, Response } from "express";
import bcrypt from 'bcrypt'

interface ExtendedRequest extends Request {
  body: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    isAdmin?: number;
  };
}

export const register = (req: ExtendedRequest, res: Response) => {
  const { firstname, lastname, email, password, isAdmin } = req.body;
  
  try {
    
    return res.status(200).json({ msg: "set up register" });
  } catch (error) {
    return res.status(200).json({ msg: "set up register" });
  }
};

export const login = (req: Request, res: Response) => {
  return res.status(200).json({ msg: "set up login" });
};

export const updatePassword = (req: Request, res: Response) => {
  return res.status(200).json({ msg: "set up register updating" });
};
