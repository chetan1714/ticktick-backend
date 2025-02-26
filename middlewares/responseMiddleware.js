import { v4 as uuidv4 } from "uuid";

export const addResponseMetadata = (req, res, next) => {
  const originalJson = res.json;

  res.json = function (body) {
    if (res.statusCode === 200) {
      body.success = true;
    }
    body = {
      statusCode: res.statusCode || 200,
      requestId: uuidv4(),
      ...body
    };
    originalJson.call(this, body);
  };

  next();
};