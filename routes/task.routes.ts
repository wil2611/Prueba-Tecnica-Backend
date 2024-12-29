import { Router } from "express";
import * as taskController from "../controllers/task.controller";
import authToken from "../middleware/role.auth";
import validateFields from "../middleware/validate";

const router = Router();
router.get(
    "/", 
    validateFields,
    taskController.getAllTasks
);

router.get(
    "/:id",
    validateFields,
    authToken, 
    taskController.getTaskById
);

router.post(
    "/",
    validateFields,
    authToken, 
    taskController.createTask
);

router.put
("/:id",
    validateFields, 
    taskController.updateTask
);

router.delete(
    "/:id",
    validateFields,
    authToken, 
    taskController.deleteTask
);

export default router;
