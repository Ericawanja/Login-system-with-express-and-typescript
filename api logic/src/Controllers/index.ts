import { RequestHandler, Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { exec } from "../helpers/dbConnect";
import { generateToken } from "../helpers/generateToken";

interface ExtendedRequest extends Request {
  body: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    isAdmin: number;
  };
}

interface loginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export const register = async (req: ExtendedRequest, res: Response) => {
  const { firstname, lastname, email, password, isAdmin } = req.body;

  try {
    //check if user exists
    const user = await exec("getUserByEmail", { email });
    if (user.length > 0) {
      return res.status(400).json({ error: "User with this email exists" });
    }

    const _id = uuidv4();
    //encrypt the password and store in db
    const hashedPassword = await bcrypt.hash(password, 7);
    await exec("registerUser", {
      _id,
      firstname,
      lastname,
      email,
      password,
      isAdmin,
    });
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const login = async (req: loginRequest, res: Response) => {
  try {
    let { password, email } = req.body;
    let user = await exec("getUserByEmail", { email });
    if (user.length === 0)
      return res.status(404).json({ error: "invalid login creditials" });
    let bool = bcrypt.compare(password, user[0].password); //returns boolean true or false
    if (!bool)
      return res.status(404).json({ error: "invalid login creditials" });

    //generate the jwt

    const token = generateToken(
      user[0].password,
      user[0].password,
      user[0].isAdmin
    );
    return res.status(200).json({ status: "succesful login", token });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error });
  }
};

export const updatePassword = (req: Request, res: Response) => {
  return res.status(200).json({ msg: "set up register updating" });
};
