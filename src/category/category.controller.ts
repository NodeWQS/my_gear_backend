import { ReqBody, ReqParams, ReqPBody } from "../config/network/network";
import categoryService from "./category.service";
import { Icategory, Idelete } from "./dto/category.dto";
import { Response, Request } from "express";

class CategoryController {
  public async create(req: ReqBody<Icategory>, res: Response) {
    const service = await categoryService.create(req.body);
    return res.status(service.status).json(service.payload);
  }

  public async read(req: Request, res: Response) {
    const service = await categoryService.read();
    return res.status(service.status).json(service.payload);
  }

  public async delete(req: ReqParams<Idelete>, res: Response) {
    const service = await categoryService.delete(req.params.id);
    return res.status(service.status).json(service.payload);
  }

  public async update(req: ReqPBody<Idelete, Icategory>, res: Response) {
    const service = await categoryService.update(req.params.id, req.body);
    return res.status(service.status).json(service.payload);
  }
}

const categoryController = new CategoryController();
export default categoryController;
