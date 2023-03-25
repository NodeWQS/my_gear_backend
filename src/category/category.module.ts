import { Router } from "express";
import categoryController from "./category.controller";
import { findCategory } from "./category.middleware";

const categoryRouter = Router();

categoryRouter.get("/", categoryController.read);
categoryRouter.post("/", categoryController.create);
categoryRouter.put("/:id", findCategory ,categoryController.update);
categoryRouter.delete("/:id", categoryController.delete);

export default categoryRouter;