import { Router } from "express";
import * as categoryController from "../controllers/category.controller";
import authToken from "../middleware/role.auth";
import validateFields from "../middleware/validate";

const router = Router();
router.get(
    "/", 
    validateFields, 
    categoryController.getAllCategories
);

router.get(
  "/:id",
  validateFields,
  authToken,
  categoryController.getCategoryById
);

router.post(
    "/", 
    validateFields, 
    authToken, 
    categoryController.createCategory
);

router.put(
  "/:id",
  validateFields,
  authToken,
  categoryController.updateCategory
);

router.delete(
  "/:id",
  validateFields,
  authToken,
  categoryController.deleteCategory
);

export default router;
