import { RequestHandler, Request, Response } from "express";
import bcrypt from 'bcrypt'
import { exec } from "../helpers/dbConnect";

interface ExtendedRequest extends Request {
  body: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    isAdmin?: number;
  };
}

export const register = async(req: ExtendedRequest, res: Response) => {
  const { firstname, lastname, email, password, isAdmin } = req.body;
  
  try {
    const user = await exec('getUserByEmail', {email})
    return res.status(200).json({user});
  } catch (error) {
    console.log(error)
    return res.status(200).json({ error });
  }
};

export const login = (req: Request, res: Response) => {
  return res.status(200).json({ msg: "set up login" });
};

export const updatePassword = (req: Request, res: Response) => {
  return res.status(200).json({ msg: "set up register updating" });
};
