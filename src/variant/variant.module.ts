import { Router } from "express";
import varinatController from "./variant.controller";
import { findVariant } from "./variant.middleware";

const variantRouter = Router();
variantRouter.get("/", varinatController.read);
variantRouter.post("/", varinatController.add);
variantRouter.put("/:id", findVariant , varinatController.update);
variantRouter.delete("/:id", varinatController.delete);

export default variantRouter;