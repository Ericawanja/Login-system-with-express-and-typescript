import { RequestHandler, Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { exec, query } from "../helpers/dbConnect";
import { generateToken, generateResetToken } from "../helpers/generateToken";
import jwt from "jsonwebtoken";

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
interface resetRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}
interface forgotPasswordRequest extends Request {
  body: {
    email: string;
  };
}
interface resetPasswordRequest extends Request {
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
      return res.status(400).json({ error: "invalid login creditials" });
    let bool = bcrypt.compare(password, user[0].password); //returns boolean true or false
    if (!bool)
      return res.status(400).json({ error: "invalid login creditials" });

    //generate the jwt

    const token = generateToken(
      user[0].email,
      user[0].id,
      user[0].isAdmin
    );
    return res.status(200).json({ status: "succesful login", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const forgotPassword = async (
  req: forgotPasswordRequest,
  res: Response
) => {
  const { email } = req.body;
  try {
    const user = await exec("getUserByEmail", { email });

    if (user.length === 0)
      return res.status(404).json({ error: "User does not exist" });

    let resetToken = generateResetToken(email);
    await query(
      `insert into passwordResetQueue(email, resetToken, isSent) values('${email}', '${resetToken}', 0 )`
    );

    res.send({ message: "Check your email for the reset password link" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const resetPassword = async (
  req: resetPasswordRequest,
  res: Response
) => {
  const { email, password } = req.body;
  try {
    const user = await exec("getUserByEmail", { email });
    if (user.length === 0)
      return res.status(404).json({ error: "The user doesn't exist" });

    const data = await exec("getUserInQueue", { email });
    console.log(data[0].resetToken);
    // let key: string = process.env.RESET_TOKEN as string;
    // const decodedData = await jwt.verify(
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndhbmphZXJpY2FAZ21haWwuY29tIiwiaWF0IjoxNjc3MjIyMTIyLCJleHAiOjE2NzcyMjIxMzJ9.1A9seL5YvKy7793SaHEDpwWdzlnZM3_gCSJNHP0APfc",
    //   key
    // );
    // console.log(decodedData, data)
    //   await exec("reset", { email, password });

    return res.status(200).json({ message: "Password reset succesful" });
  } catch (error) {
    return res.json(500).json({ error: error });
  }
};
