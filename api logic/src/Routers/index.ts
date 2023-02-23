import { Router } from "express";
import { login, register, forgotPassword, resetPassword } from "../Controllers/index";
import { validator } from "../middlewares/validator";
import { loginSchema, registerSchema } from "../schemas";
import { forgotPasswordSchema } from '../schemas/index';

const authRouter = Router();

authRouter.post("/register", validator(registerSchema), register);
authRouter.post("/login", validator(loginSchema), login);
authRouter.post("/forgotpassword",validator(forgotPasswordSchema), forgotPassword);
authRouter.post("/resetPassword", validator(loginSchema), resetPassword)

export default authRouter;
