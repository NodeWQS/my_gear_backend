import { BaseService } from "../config/main/BaseService";
import { Icategory } from "./dto/category.dto";

class CategoryService extends BaseService {
  public async create(data: Icategory) {
    try {
      const createCategory = await this.client.category.create({
        data: { ...data },
      });

      return { status: 201, payload: createCategory };
    } catch (error) {
      return {
        status: 403,
        payload: { msg: "Sorry! but category is finded." },
      };
    }
  }

  public async read() {
    try {
      const categoryData = await this.client.category.findMany();
      return { status: 200, payload: categoryData };
    } catch (error) {
      return { status: 502, payload: { msg: "problem with server." } };
    }
  }

  public async update(id: string, data: Icategory) {
    try {
      const updData = await this.client.category.update({
        where: { id },
        data: { ...data },
      });

      return { status: 200, payload: updData };
    } catch (error) {
      return {
        status: 403,
        payload: { msg: "category with this name is used." },
      };
    }
  }

  public async delete(id: string) {
    try {
      const del = await this.client.category.delete({ where: { id } });
      
      return { status: 200, payload: del };
    } catch (error) {
      return { status: 404, payload: { msg: "category not found." } };
    }
  }
}

const categoryService = new CategoryService();
export default categoryService;
