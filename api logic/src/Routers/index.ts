import { Router } from "express";
import { login, register, forgotPassword, resetPassword } from "../Controllers/index";
import { validator } from "../middlewares/validator";
import { loginSchema, registerSchema, forgotPasswordSchema } from "../schemas";


const authRouter = Router();

authRouter.post("/register", validator(registerSchema), register);
authRouter.post("/login", validator(loginSchema), login);
authRouter.post("/forgotpassword",validator(forgotPasswordSchema), forgotPassword);
authRouter.post("/reset", validator(loginSchema), resetPassword)

export default authRouter;
