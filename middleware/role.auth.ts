import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authToken = async (req: Request, res: Response, next: NextFunction) => {
  const headerToken = req.header("Authorization");

  if (headerToken != undefined && headerToken.startsWith("Bearer ")) {
    try {
      const bearerToken = headerToken.slice(7);
      const tokendata = jwt.verify(
        bearerToken,
        process.env.SECRET_KEY || ""
      ) as jwt.JwtPayload;
      if (tokendata.user.role == "admin") {
        next();
        console.log("es admin");
      } else {
        res.status(401).json({ message: "No eres Admin" });
      }
    } catch (error) {
      res.status(401).json({ message: "Acceso Denegado" });
    }
  } else {
    res.status(401).json({ message: "Acceso Denegado" });
  }
};
export default authToken;

