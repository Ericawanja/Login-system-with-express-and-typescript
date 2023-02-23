import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const generateToken = (
  email: string,
  _id: string,
  isAdmin: string | number
) => {
  return jwt.sign(
    { email, id: _id, isAdmin },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
    }
  );
};

export const generateResetToken = (email: string) => {
  return jwt.sign({ email }, process.env.RESET_KEY as string, {
    expiresIn: "10s",
  });
};
