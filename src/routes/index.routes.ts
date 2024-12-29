import { Router } from "express";
import userRoutes from "./user.routes";
import categoryRoutes from "./category.routes";
import taskRoutes from "./task.routes";
import validateToken from "../middleware/validate.token";
import * as login from "../controllers/login.controller";
import authToken from "../middleware/role.auth";
import { check } from "express-validator";
import validateFields from "../middleware/validate";

const router = Router();

router.use(
  "/users", 
  userRoutes
);

router.use(
  "/categories", 
  categoryRoutes
);

router.use(
  "/tasks", 
  taskRoutes
);

router.post(
  "/login",
  check("email", "invalid email").isEmail(),
  check("password", "password is required").notEmpty(),
  validateFields,
  login.login
);

// router.get(
//     "/:id",
//     [
//       check("id", i18n.__("router.id-required")).notEmpty(),
//       validateFields,
//       validateJWT,
//     ],
//     getAction
//   );

export default router;
