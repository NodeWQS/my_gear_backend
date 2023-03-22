import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { BaseService } from "../config/main/BaseService";
import { Iauth, Isign } from "./dto/auth.dto";

export class AuthService extends BaseService {
  public async signup(data: Isign) {
    const password = await hash(data.password, 10);
    const user = await this.client.user.create({
      data: { ...data, password },
    });

    return { status: 201, payload: user };
  }

  public async auth({ email, password }: Iauth) {
    const user = await this.client.user.findUniqueOrThrow({
      where: { email },
    });
    const validation = await compare(password, user.password);

    if (validation) {
      const token = sign({ id: user.id, email }, this.env.get("TOKEN"));
      return { status: 200, payload: { token } };
    }

    return {
      status: 403,
      payload: { msg: "Sorry! but password not correct." },
    };
  }
}