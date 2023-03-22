import { Response } from "express";
import { ReqBody } from "../config/network/network";
import { AuthService } from "./auth.service";
import { Iauth, Isign } from "./dto/auth.dto";

class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  public async addUser(req: ReqBody<Isign>, res: Response) {
    const reg = await this.authService.signup(req.body);
    return res.status(reg.status).json(reg.payload);
  }

  public async authUser(req: ReqBody<Iauth>, res: Response) {
    const auth = await this.authService.auth(req.body);
    return res.status(auth.status).json(auth.payload);
  }
}

const authController = new AuthController();
export default authController;
