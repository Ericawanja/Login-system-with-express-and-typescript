import { Router } from "express";
import { login, register, updatePassword } from "../Controllers/index";
import { validator } from '../middlewares/validator';
import { loginSchema, registerSchema } from "../schemas";

const authRouter = Router();

authRouter.post("/register",validator(registerSchema), register);
authRouter.post("/login",validator(loginSchema), login);
authRouter.post("/update", updatePassword);

export default authRouter;
