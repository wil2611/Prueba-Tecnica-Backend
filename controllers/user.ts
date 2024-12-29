import { Request, Response } from "express";
import Usuario from "../models/user.model";

export const getUsers = async (req: Request, res: Response) => {
  const users = await Usuario.findAll();
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await Usuario.findByPk(id);
  if (user) {
    res.json({
      user,
    });
  } else {
    res.status(404).json({
      msg: "No existe un usuario con el id " + id,
    });
  }
};
export const postUser = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const usuario = new Usuario();
    const existeEmail = await Usuario.findOne({
      where: {
        email: body.email,
      },
    });
    if (existeEmail) {
        res.status(400).json({
        msg: "Ya existe un usuario con el email " + body.email,
      });
    } else {
      usuario.set(body);
      await usuario.save();
      res.json({
        usuario,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
export const putUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      await usuario.update(body);
      res.json({
        usuario,
      });
    } else {
      res.status(404).json({
        msg: "No existe un usuario con el id " + id,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);
  if (usuario) {
    //await usuario.destroy();
    await usuario.update({ estado: false });
    res.json({
      usuario,
    });
  } else {
    res.status(404).json({
      msg: "No existe un usuario con el id " + id,
    });
  }
};
