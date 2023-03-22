import { PrismaClient } from "@prisma/client";
import env, { ConfigOptions } from "./env";

export class BaseService {
  protected env: ConfigOptions;
  protected client: PrismaClient;

  constructor() {
    this.env = env;
    this.client = new PrismaClient();
  }
}
