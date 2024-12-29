import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";

// Obtener todos los usuarios (admin)
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.findAll();
    res.json(users);
    return;
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
    return;
  }
};
// Obtener un usuario por su ID
export const getUserByEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ where: { email } });
    if (user) {
      res.json(user);
      return;
    } else {
      res.status(404).json({ message: "User not found" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
    return;
  }
};

// Crear un nuevo usuario (admin)
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, lastname, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      lastname,
      email,
      password: hashedPassword,
      role,
      status: "active",
    });

    res.status(201).json(user);
    return;
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
    return;
  }
};

// Actualizar un usuario (admin)
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, lastname, email, password, role, status } = req.body;
    const user = await User.findByPk(id);
    if (user) {
      const updatedUser = await user.update({
        name,
        lastname,
        email,
        password,
        role,
        status,
      });
      res.json(updatedUser);
      return;
    } else {
      res.status(404).json({ message: "User not found" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
    return;
  }
};

// Eliminar un usuario (admin)
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.status(204).send();
      return;
    } else {
      res.status(404).json({ message: "User not found" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
    return;
  }
};
