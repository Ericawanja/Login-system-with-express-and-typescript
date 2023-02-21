import { Router } from "express";
import { login, register, forgotPassword } from "../Controllers/index";
import { validator } from "../middlewares/validator";
import { loginSchema, registerSchema } from "../schemas";

const authRouter = Router();

authRouter.post("/register", validator(registerSchema), register);
authRouter.post("/login", validator(loginSchema), login);

authRouter.post("/forgotpassword", forgotPassword);

export default authRouter;
