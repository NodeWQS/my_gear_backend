import { Router } from "express";
import authController from "./auth.controller";

const authRouter = Router();
authRouter.post("/signup", authController.addUser);
authRouter.post("/signin", authController.authUser);

export default authRouter;