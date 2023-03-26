import { Router } from "express";
import productController from "./product.controller";

const productRouter = Router();

productRouter.get("/", productController.read);
productRouter.get("/:id", productController.getProduct);
productRouter.post("/", productController.add);
productRouter.delete("/:id", productController.deleteProduct);

export default productRouter;
