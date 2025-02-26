import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import config from "../config/appconfig.js";
import crypto from "crypto";

const generateJWTToken = (payload) => {
  return jwt.sign(payload, config.auth.jwt_secret, {
    jwtid: uuidv4(),
    subject: payload._id,
    audience: "ticktick",
    expiresIn: config.auth.jwt_expiresin,
    algorithm: "HS512",
  });
};

const encryptPassword = (password) => {
  return crypto.createHash("sha512").update(password).digest("hex");
};

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export { generateJWTToken, encryptPassword, validateEmail };
