import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const login = async (req: Request, res: Response): Promise<void> => {
  console.log("login");
  try {
    const { email, password } = req.body;
    const user: any = await User.findOne({ where: { email: email } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const passwordvalid = await bcrypt.compare(password, user.password);
    if (!passwordvalid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const token = jwt.sign({ user: user }, process.env.SECRET_KEY || "", {
      expiresIn: "1h",
    });
    res.json({ token: token });
    return;
  } catch (error) {
    res.status(500).json({ message: "Error login", error});
    return;
  }
};
