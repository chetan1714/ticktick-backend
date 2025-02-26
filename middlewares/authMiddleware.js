import jwt from "jsonwebtoken";
import config from "../config/appconfig.js";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ statusCode: 401, error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, config.auth.jwt_secret);
    req.user = decoded; 
    next();
  } catch (e) {
    res.status(401).send({ statusCode: 401, error: "Invalid token" });
  }
};

const optionalAuthMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, config.auth.jwt_secret);
    req.user = decoded; 
  } catch (e) {
    req.user = null;
  } finally {
    next();
  }
};

export { authMiddleware, optionalAuthMiddleware };
