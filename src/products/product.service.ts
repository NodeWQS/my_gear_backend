import { UploadedFile } from "express-fileupload";
import { BaseService } from "../config/main/BaseService";
import { FileService } from "../save_data/save.service";
import { Iproduct } from "./dto/product.dto";

class ProductService extends BaseService {
  private fileHandler: FileService;
  private limit: number;
  constructor() {
    super();
    this.limit = 10;
    this.fileHandler = new FileService();
  }

  private getFilename(name: string): string {
    const data = name.split("/");
    const index = data.findIndex(e => e === "photo");
    return data.splice(index, data.length - 1).join("");
  }

  public async readProducts(page = 1) {
    try {
      const pages = await this.client.product.count();
      const products = await this.client.product.findMany({
        take: page * this.limit,
        skip: (page - 1) * this.limit,
      });

      return {
        status: 200,
        payload: { count: Math.ceil(pages / this.limit), products },
      };
    } catch (error) {
      return {
        status: 502,
        payload: {
          msg: "Problem with server.",
        },
      };
    }
  }

  public async addProduct(data: Iproduct, file: UploadedFile) {
    try {
      const filename = `${Date.now()}-${file.name}`;
      const prdData = await this.client.product.create({
        data: { ...data, photo: `${this.env.get("HOST")}/${filename}` },
      });

      await this.fileHandler.add(file, filename);
      return { status: 200, payload: prdData };
    } catch (error) {
      return {
        status: 403,
        payload: { msg: "title or description is repeated." },
      };
    }
  }

  public async getOne(id: string) {
    try {
      const product = await this.client.product.findUniqueOrThrow({
        where: { id },
      });

      return { status: 200, payload: product };
    } catch (error) {
      return { status: 404, payload: { msg: "Sorry! but product not found." } };
    }
  }

  public async delete(id: string) {
    try {
      const product = await this.client.product.delete({
        where: { id },
      });

      await this.fileHandler.delete(this.getFilename(product.photo));
      return { status: 200, payload: { product } };
    } catch (error) {
      return { status: 404, payload: { msg: "Sorry! but product not found." } };
    }
  }
}

const productService = new ProductService();
export default productService;
