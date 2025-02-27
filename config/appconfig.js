import { config } from "dotenv";
config();

const appconfig = {
  app: {
    port: process.env.DEV_APP_PORT || 3000,
    appName: process.env.APP_NAME || "TickTick",
    env: process.env.NODE_ENV || "development",
  },
  db: {
    MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://chetamn33:Chetan64@cluster0.uglhz.mongodb.net/ticktick?retryWrites=true&w=majority&appName=Cluster0",
    logging: true,
  },
  winiston: {
    logpath: "/iLrnLogs/logs/",
  },
  auth: {
    jwt_secret: process.env.JWT_SECRET || "VmVyeVBvd2VyZnVsbFNlY3JldA==",
    jwt_expiresin: process.env.JWT_EXPIRES_IN || "7d",
    saltRounds: process.env.SALT_ROUND || 10,
    refresh_token_secret:
      process.env.REFRESH_TOKEN_SECRET || "VmVyeVBvd2VyZnVsbFNlY3JldA==",
    refresh_token_expiresin: process.env.REFRESH_TOKEN_EXPIRES_IN || "2d", // 2 days
  },
};

export default appconfig;
