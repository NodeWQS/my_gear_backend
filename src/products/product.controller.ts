import { Response } from "express";
import { ReqBody, ReqParams, ReqQuery } from "../config/network/network";
import { Ifilter, Ipagination, Iproduct } from "./dto/product.dto";
import productService from "./product.service";

class ProductController {
  public async read(req: ReqQuery<Ipagination>, res: Response) {
    const data = await productService.readProducts(req.query.page);
    return res.status(data.status).json(data.payload);
  }

  public async add(req: ReqBody<Iproduct>, res: Response) {
    // @ts-ignore
    const data = await productService.addProduct(req.body, req.files.avatar);
    return res.status(data.status).json(data.payload);
  }

  public async getProduct(req: ReqParams<Ifilter>, res: Response) {
    const data = await productService.getOne(req.params.id);
    return res.status(data.status).json(data.payload);
  }

  public async deleteProduct(req: ReqParams<Ifilter>, res: Response) {
    const data = await productService.delete(req.params.id);
    return res.status(data.status).json(data.payload);
  }
}

const productController = new ProductController();
export default productController;
