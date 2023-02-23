import Joi from "joi";
import { forgotPassword } from "../Controllers/index";
export const registerSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  password: Joi.string().required().min(8).max(20),
  isAdmin: Joi.number(),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  password: Joi.string().required().min(8).max(20),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
});
