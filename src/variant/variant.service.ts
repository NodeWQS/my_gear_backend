import { BaseService } from "../config/main/BaseService";
import { Ivariant } from "./dto/variant.dto";

class VariantService extends BaseService {
  public async addVariant(data: Ivariant) {
    try {
      const addV = await this.client.variant.create({
        data: { ...data },
      });

      return { status: 201, payload: addV };
    } catch (error) {
      return { status: 403, payload: { msg: "Sorry! but variant is finded." } };
    }
  }

  public async read() {
    try {
      const variants = await this.client.variant.findMany();
      return { status: 200, payload: variants };
    } catch (error) {
      return { status: 502, payload: { msg: "Problem with server." } };
    }
  }

  public async upadte(id: string, data: Ivariant) {
    try {
      const upd = await this.client.variant.update({
        where: { id },
        data: { ...data },
      });

      return { status: 200, payload: upd };
    } catch (error) {
      return { status: 403, payload: { msg: "variant with this name found." } };
    }
  }

  public async delete(id: string) {
    try {
      const del = await this.client.variant.delete({
        where: { id },
      });

      return { status: 200, payload: del };
    } catch (error) {
      return { status: 404, payload: { msg: "Sorry! but variant not found." } };
    }
  }
}

const variantService = new VariantService();
export default variantService;
