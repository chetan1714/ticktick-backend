import express from "express";
import json from "body-parser";
import config from "./config/appconfig.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { handleUnsupportedMethods } from "./middlewares/handleUnsupportedMethods.js";
import { handleBadRoutes } from "./middlewares/handleBadRoutes.js";
import { addResponseMetadata } from "./middlewares/responseMiddleware.js";

const app = express();

app.use(json());

app.use(addResponseMetadata);

app.use("/v1", userRoutes);
app.use("/v1", taskRoutes);

app.get("/", async (req, res) => {
  res.locals.data = {
    message: "Bad request"
  };
  res.status(400).json(res.locals.data);
});

app.use(handleUnsupportedMethods);
app.use(handleBadRoutes);

app.listen(config.app.port, () => {
  console.info(`Server running on port ${config.app.port}`);
});
