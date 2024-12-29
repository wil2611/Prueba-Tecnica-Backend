import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headerToken = req.header("Authorization");

  if (headerToken != undefined && headerToken.startsWith("Bearer ")) {
    try {
      const bearerToken = headerToken.slice(7);
      jwt.verify(bearerToken, process.env.SECRET_KEY || "");
      next();
    } catch (error) {
      res.status(401).json({ message: "Token no Valido" });
    }
  } else {
    res.status(401).json({ message: "Acceso Denegado" });
  }
};
export default validateToken;
