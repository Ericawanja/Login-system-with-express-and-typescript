import { Router } from "express";
import { login, register, updatePassword } from "../Controllers/index";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/update", updatePassword);

export default authRouter
