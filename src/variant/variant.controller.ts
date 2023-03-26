import { Request, Response } from "express";
import { ReqBody, ReqParams, ReqPBody } from "../config/network/network";
import { Iparam, Ivariant } from "./dto/variant.dto";
import variantService from "./variant.service";

class VariantController {
  public async add(req: ReqBody<Ivariant>, res: Response) {
    const data = await variantService.addVariant(req.body);
    return res.status(data.status).json(data.payload);
  }

  public async read(req: Request, res: Response) {
    const data = await variantService.read();
    return res.status(data.status).json(data.payload);
  }

  public async update(req: ReqPBody<Iparam, Ivariant>, res: Response) {
    const data = await variantService.upadte(req.params.id, req.body);
    return res.status(data.status).json(data.payload);
  }

  public async delete(req: ReqParams<Iparam>, res: Response) {
    const data = await variantService.delete(req.params.id);
    return res.status(data.status).json(data);
  }
}

const varinatController = new VariantController();
export default varinatController;
