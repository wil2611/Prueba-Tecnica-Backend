import { Router } from "express";

import * as userController from "../controllers/user.controller";
import validateFields from "../middleware/validate";
import authToken from "../middleware/role.auth";
const router = Router();

router.get("/",  validateFields, userController.getAllUsers);

router.get("/:email", validateFields, userController.getUserByEmail);

router.post("/", authToken, validateFields, userController.createUser);

router.put("/:id", authToken, validateFields, userController.updateUser);

router.delete("/:id", authToken, validateFields, userController.deleteUser);

export default router;
