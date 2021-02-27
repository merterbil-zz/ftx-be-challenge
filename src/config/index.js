import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Could not found .env file");
}

export default {
  port: parseInt(process.env.port || 5000),
  ftx: {
    key: process.env.FTX_API_KEY,
    secret: process.env.FTX_API_SECRET
  },
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  api: {
    prefix: "/api/v1",
  },
};
