import { Request, Response } from "express";
import Task from "../models/task.model";
import User from "../models/user.model";
import Category from "../models/category.model";
import jwt from "jsonwebtoken";

// Obtener todas las tareas (admin)
export const getAllTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const headerToken = req.header("Authorization");
    if (headerToken != undefined && headerToken.startsWith("Bearer ")) {
      const bearerToken = headerToken.slice(7);
      const tokendata = jwt.verify(
        bearerToken,
        process.env.SECRET_KEY || ""
      ) as jwt.JwtPayload;
      if (tokendata.user.role == "admin") {
        console.log("es admin");
        const tasks = await Task.findAll({
          include: [
            { model: User, as: "assignedUser" },
            { model: Category, as: "category" },
          ],
        });
        res.json(tasks);
        return;
      } else {
        const task = await Task.findAll({
          where: { assignedUserId: tokendata.user.id },
        });
        res.json(task);
        return;
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
    return;
  }
};
// Obtener una tarea por su ID
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id, {
      include: [
        { model: User, as: "assignedUser" },
        { model: Category, as: "category" },
      ],
    });
    if (task) {
      res.json(task);
      return;
    } else {
      res.status(404).json({ message: "Task not found" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
    return;
  }
};

// Crear una tarea (admin)
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, assignedUserId, categoryId } = req.body;
    const task = await Task.create({
      title,
      description,
      assignedUserId,
      categoryId,
      status: "pending",
    });

    res.status(201).json(task);
    return;
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
    return;
  }
};

// Actualizar una tarea (admin/user)

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const { id } = req.params;
    const { status } = req.body;
    const task = await Task.findByPk(id);
    const headerToken = req.header("Authorization");
    if (headerToken != undefined && headerToken.startsWith("Bearer ")) {
      const bearerToken = headerToken.slice(7);
      const tokendata = jwt.verify(
        bearerToken,
        process.env.SECRET_KEY || ""
      ) as jwt.JwtPayload;
      if (tokendata.user.role == "admin") {
        console.log("es admin");
        const{title,description,status,assignedUserId, categoryId} = req.body;
        if (task) {
          const updateteTask = await task.update({
            title,
            description,
            status,
            assignedUserId,
            categoryId,
          });
          res.status(200).json(updateteTask);
          return;
        }
      } else {
        
        if (task) {
          if (status && ["in progress", "review"].includes(status)) {
            const updatedTask = await task.update({ status });
            res.status(200).json(updatedTask);
            return;
          }
    
          res.status(400).json({ message: "Invalid status transition" });
          return;
        } else {
          res.status(404).json({ message: "Task not found" });
          return;
        }
      }
    }

    
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
    return;
  }
};

// Eliminar una tarea (admin)
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (task) {
      await task.destroy();
      res.status(204).send();
      return;
    } else {
      res.status(404).json({ message: "Task not found" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
    return;
  }
};
