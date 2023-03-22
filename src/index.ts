import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import env from "./config/main/env";
import authRouter from "./auth/auth.module";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload({ limits: { fileSize: 15728640 }, abortOnLimit: true }));
app.use("/auth", authRouter);

const port = env.get("PORT") || 5000;
app.listen(port, (): void => {
  console.log(`server work in port ${port}`);
});
