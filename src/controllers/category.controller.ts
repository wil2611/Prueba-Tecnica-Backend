import { Request, Response } from "express";
import Category from "../models/category.model";

// Obtener todas las categorías
export const getAllCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("entro");
    const categories = await Category.findAll();
    if (!categories) {
      res.status(404).json({ message: "Categories not found" });
      return;
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};
// Obtener una categoría por su ID
export const getCategoryById = async (req: Request, res: Response): Promise<void>=> {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (category) {
      res.json(category);
      return;
    } else {
      res.status(404).json({ message: "Category not found" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error });
    return;
  }
};
// Crear una nueva categoría (admin)
export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({
      name,
      description,
      status: "active",
    });

    res.status(201).json(category);
    return;
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
    return;
  }
};

// Actualizar una categoría (admin)
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;
    const category = await Category.findByPk(id);
    if (category) {
      const updatedCategory = await category.update({
        name,
        description,
        status,
      });

      res.json(updatedCategory);
      return;
    } else {
      res.status(404).json({ message: "Category not found" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
    return
  }
};

// Eliminar una categoría (admin)
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (category) {
      await category.destroy();
      res.status(204).send();
      return;
    } else {
      res.status(404).json({ message: "Category not found" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
    return;
  }
};
