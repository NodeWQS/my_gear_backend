import { Response } from "express";
import { ReqBody } from "../config/network/network";
import { authService } from "./auth.service";
import { Iauth, Isign, Itoken } from "./dto/auth.dto";

class AuthController {
  public async addUser(req: ReqBody<Isign>, res: Response) {
    const reg = await authService.signup(req.body);
    return res.status(reg.status).json(reg.payload);
  }

  public async authUser(req: ReqBody<Iauth>, res: Response) {
    const auth = await authService.auth(req.body);
    return res.status(auth.status).json(auth.payload);
  }

  public verifyUser(req: ReqBody<Itoken>, res: Response) {
    const data = authService.verifyToken(req.body.token);
    return res.status(data.status).json(data.payload);
  }
}

const authController = new AuthController();
export default authController;
