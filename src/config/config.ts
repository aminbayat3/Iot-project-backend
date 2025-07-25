import dotenv from "dotenv";
dotenv.config();

const requiredEnv = [
  "PORT",
  "GCS_BUCKET",
  "PUBSUB_TOPIC",
  "FRONTEND_ORIGIN",
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export const config = {
  port: parseInt(process.env.PORT!, 10),
  pubsub:{
    topicName: process.env.PUBSUB_TOPIC!
  },
  storage: {
    bucketName: process.env.GCS_BUCKET!,
  },
  FrontendOrigin: process.env.FRONTEND_ORIGIN!,
};
