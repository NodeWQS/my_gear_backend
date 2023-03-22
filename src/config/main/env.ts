import { config, DotenvParseOutput } from "dotenv";

export class ConfigOptions {
  private data: DotenvParseOutput | undefined;
  constructor() {
    const { parsed, error } = config();
    if (!error) {
      this.data = parsed;
    } else {
      throw new Error(".env file not found.");
    }
  }
  public get(key: string): string {
    if (this.data) {
      return this.data[key];
    } else {
      throw new Error("key not found.");
    }
  }
}

const env = new ConfigOptions();
export default env;
