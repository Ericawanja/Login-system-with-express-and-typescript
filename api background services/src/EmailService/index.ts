import dotenv from "dotenv";
import ejs from "ejs";
import path from "path";
import { exec } from "../helpers/dbConnect";
import sendMail from "../helpers/email";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const sendWelcomeEmail = async () => {
  const emailList = await exec("getResetEmailList");
  let user = { email: "wanjaerica@gmail.com" };
  for (let user of emailList) {
    ejs.renderFile(
      "Templates/reset.ejs",
      { name: "there" },
      async (error, html) => {
        const message = {
          from: process.env.FROM,
          to: user.email,
          subject: "testing",
          html,
        };

        try {
          await sendMail(message);

          await exec("updateResetQueue", { email: user.email });
        } catch (error) {
          console.log("erro here");
          console.log("error", error);
        }
      }
    );
  }
};
export default sendWelcomeEmail;
